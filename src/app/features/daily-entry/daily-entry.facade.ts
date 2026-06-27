import { Injectable, computed, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { AuthStore } from '../../core/stores/auth.store';
import { LoanLine } from '../../core/models/loan.model';
import { Loan } from '../../core/models/loan.model';
import { DailyEntry } from '../../core/models/daily-entry.model';
import { localDateStr } from '../../core/utils/date.util';

export interface EntryRow {
  loan: Loan;
  amount: number | null;
  mode: 'cash' | 'gpay';
  existingEntry: DailyEntry | null;   // single-date mode
  coveredDates: string[];             // multi-date mode: dates already entered
  saving: boolean;
}

interface RowsRequest {
  bookId: string;
  line: LoanLine;
  multi: boolean;
  single: string;     // localDateStr of selectedDate
  dates: string[];    // localDateStr of each selected date (multi mode)
}

/**
 * Owns the Daily Entry screen's orchestration, derived state and commands so the
 * component is a thin view. Data loads via `rxResource` keyed on book/line/date(s)
 * — switching any of them auto-cancels the prior in-flight request (no stale rows).
 */
@Injectable()
export class DailyEntryFacade {
  private readonly data = inject(DataService);
  private readonly bookCtx = inject(BookContextStore);
  private readonly toast = inject(MessageService);

  // ── User-driven state ──────────────────────────────────────────────
  readonly multiDateMode = signal(false);
  readonly selectedDate = signal<Date>(new Date());
  readonly selectedDates = signal<Date[]>([]);
  readonly submittingAll = signal(false);

  /** Line selection resets to none whenever the active book changes. */
  readonly selectedLine = linkedSignal<string | null, LoanLine | ''>({
    source: () => this.bookCtx.bookId(),
    computation: () => '',
  });

  private readonly bookId = computed(() => this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID);
  private readonly singleKey = computed(() => localDateStr(this.selectedDate()));
  private readonly multiKeys = computed(() => this.selectedDates().map(localDateStr));

  // ── Lines for the active book ──────────────────────────────────────
  private readonly linesRes = rxResource({
    params: () => this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID,
    stream: ({ params: bookId }) => this.data.lines.getAll(bookId).pipe(map(r => r.data)),
    defaultValue: [],
  });
  readonly lines = this.linesRes.value;

  // ── Rows: active loans for the line + their entries for the date(s) ─
  private readonly rowsRes = rxResource<EntryRow[], RowsRequest | undefined>({
    params: () => {
      const line = this.selectedLine();
      if (!line) return undefined;                       // no line → idle
      const dates = this.multiKeys();
      if (this.multiDateMode() && dates.length === 0) return undefined; // multi but no dates → idle
      return { bookId: this.bookId(), line, multi: this.multiDateMode(), single: this.singleKey(), dates };
    },
    stream: ({ params }) => params ? this.fetchRows(params) : of<EntryRow[]>([]),
    defaultValue: [],
  });

  /** Server rows, locally writable: amount/mode edits persist; reset on reload. */
  readonly rows = linkedSignal(() => this.rowsRes.value());
  readonly loading = this.rowsRes.isLoading;

  // ── Derived ────────────────────────────────────────────────────────
  readonly totalCash = computed(() =>
    this.rows().filter(r => !r.existingEntry && r.mode === 'cash' && (r.amount ?? 0) > 0)
      .reduce((s, r) => s + (r.amount ?? 0), 0)
    + this.rows().filter(r => r.existingEntry?.mode === 'cash')
      .reduce((s, r) => s + (r.existingEntry?.amount ?? 0), 0)
  );

  readonly totalGpay = computed(() =>
    this.rows().filter(r => !r.existingEntry && r.mode === 'gpay' && (r.amount ?? 0) > 0)
      .reduce((s, r) => s + (r.amount ?? 0), 0)
    + this.rows().filter(r => r.existingEntry?.mode === 'gpay')
      .reduce((s, r) => s + (r.existingEntry?.amount ?? 0), 0)
  );

  // row.amount is a plain prop mutated by [(ngModel)]; bump this to recompute.
  private readonly dirty = signal(0);
  markDirty(): void { this.dirty.update(n => n + 1); }

  readonly nothingToSubmit = computed(() => {
    this.dirty();
    if (this.multiDateMode()) {
      if (!this.selectedDates().length) return true;
      return this.rows().every(r => !(r.amount && r.amount > 0));
    }
    return this.rows().every(r => !!r.existingEntry || !(r.amount && r.amount > 0));
  });

  /** Total new entries that will be created across all selected dates. */
  readonly pendingEntryCount = computed(() => {
    this.dirty();
    if (!this.multiDateMode()) return 0;
    const dates = this.multiKeys();
    return this.rows()
      .filter(r => (r.amount ?? 0) > 0)
      .reduce((count, r) => count + dates.filter(d => !r.coveredDates.includes(d)).length, 0);
  });

  // ── Commands ───────────────────────────────────────────────────────
  setMode(multi: boolean): void {
    this.multiDateMode.set(multi);
    if (multi) this.selectedDates.set([]);
    // The rows resource reacts to these signals automatically.
  }

  saveRow(row: EntryRow): void {
    if (!row.amount || row.amount <= 0) return;
    row.saving = true;
    this.data.dailyEntries.create({
      book_id: this.bookId(), loan_id: row.loan.id,
      entry_date: this.singleKey(), amount: row.amount, mode: row.mode,
    }).subscribe({
      next: (res) => {
        row.existingEntry = res.data;
        row.amount = null;
        row.saving = false;
        this.rows.update(r => [...r]);
        this.toast.add({ severity: 'success', summary: 'Saved', detail: row.loan.customer_name, life: 1500 });
      },
      error: () => {
        row.saving = false;
        this.rows.update(r => [...r]);
        this.toast.add({ severity: 'error', summary: 'Save failed', detail: row.loan.customer_name, life: 2500 });
      },
    });
  }

  submitAll(): void {
    const bookId = this.bookId();

    if (!this.multiDateMode()) {
      const pending = this.rows().filter(r => !r.existingEntry && r.amount && r.amount > 0);
      if (!pending.length) return;
      this.submittingAll.set(true);
      this.data.dailyEntries.bulkCreate({
        book_id: bookId, entry_date: this.singleKey(),
        entries: pending.map(r => ({ loan_id: r.loan.id, amount: r.amount!, mode: r.mode })),
      }).subscribe({
        next: (res) => {
          res.data.forEach(entry => {
            const row = this.rows().find(r => r.loan.id === entry.loan_id);
            if (row) { row.existingEntry = entry; row.amount = null; }
          });
          this.rows.update(r => [...r]);
          this.submittingAll.set(false);
          this.toast.add({ severity: 'success', summary: 'Submitted', detail: `${pending.length} entries recorded`, life: 2500 });
        },
        error: () => {
          this.submittingAll.set(false);
          this.toast.add({ severity: 'error', summary: 'Submit failed', detail: 'Please try again', life: 3000 });
        },
      });
    } else {
      const rows = this.rows().filter(r => (r.amount ?? 0) > 0);
      if (!rows.length) return;
      const dates = this.multiKeys();
      this.submittingAll.set(true);

      const dateObs: Observable<{ data: DailyEntry[] }>[] = dates.map(dateStr => {
        const pending = rows.filter(r => !r.coveredDates.includes(dateStr));
        if (!pending.length) return of({ data: [] as DailyEntry[] });
        return this.data.dailyEntries.bulkCreate({
          book_id: bookId, entry_date: dateStr,
          entries: pending.map(r => ({ loan_id: r.loan.id, amount: r.amount!, mode: r.mode })),
        });
      });

      forkJoin(dateObs).subscribe({
        next: (results) => {
          const totalCreated = results.reduce((n, r) => n + r.data.length, 0);
          const skipped = (rows.length * dates.length) - totalCreated;
          this.rows.update(rowList => rowList.map(r =>
            (r.amount ?? 0) > 0 ? { ...r, coveredDates: dates, amount: null } : r
          ));
          this.submittingAll.set(false);
          this.toast.add({
            severity: 'success', summary: 'Multi-date entries saved',
            detail: `${totalCreated} entries created across ${dates.length} days${skipped > 0 ? ` (${skipped} skipped – already existed)` : ''}`,
            life: 4000,
          });
        },
        error: () => {
          this.submittingAll.set(false);
          this.toast.add({ severity: 'error', summary: 'Submit failed', detail: 'Please try again', life: 3000 });
        },
      });
    }
  }

  // ── Data loading ───────────────────────────────────────────────────
  private fetchRows(p: RowsRequest): Observable<EntryRow[]> {
    return this.data.loans.getAll(p.bookId).pipe(
      switchMap(loansRes => {
        const loans = loansRes.data.filter(l => l.line === p.line && !l.completed_date);

        if (!p.multi) {
          return this.data.dailyEntries.getByDate(p.bookId, p.single).pipe(
            map(entriesRes => loans.map<EntryRow>(loan => ({
              loan, amount: null, mode: 'cash',
              existingEntry: entriesRes.data.find(e => e.loan_id === loan.id) ?? null,
              coveredDates: [], saving: false,
            })))
          );
        }

        // Multi-date: coverage per loan across every selected date, in parallel.
        return forkJoin(p.dates.map(d => this.data.dailyEntries.getByDate(p.bookId, d))).pipe(
          map(results => {
            const coverage = new Map<string, string[]>();
            results.forEach((res, i) => res.data.forEach(e => {
              const arr = coverage.get(e.loan_id) ?? [];
              arr.push(p.dates[i]);
              coverage.set(e.loan_id, arr);
            }));
            return loans.map<EntryRow>(loan => ({
              loan, amount: null, mode: 'cash',
              existingEntry: null, coveredDates: coverage.get(loan.id) ?? [], saving: false,
            }));
          })
        );
      })
    );
  }
}
