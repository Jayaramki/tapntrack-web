import { Component, signal, inject, effect, OnInit, computed, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { AuthStore } from '../../core/stores/auth.store';
import { BookContextStore } from '../../core/stores/book-context.store';
import { Loan, LoanLine } from '../../core/models/loan.model';
import { Line } from '../../core/models/line.model';
import { DailyEntry } from '../../core/models/daily-entry.model';

interface EntryRow {
  loan: Loan;
  amount: number | null;
  mode: 'cash' | 'gpay';
  existingEntry: DailyEntry | null;   // single-date mode
  coveredDates: string[];             // multi-date mode: dates already entered
  saving: boolean;
}

@Component({
  selector: 'app-daily-entry',
  standalone: true,
  imports: [
    FormsModule, DecimalPipe,
    DatePickerModule, SelectModule, ButtonModule,
    InputNumberModule, ToastModule, TableModule, TagModule, TooltipModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; margin-bottom: 12px; }
    .control-group { display: flex; flex-direction: column; gap: 4px; }
    .control-label { font-size: 0.8rem; color: var(--p-text-muted-color); }

    .dates-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 16px; }
    .date-chip {
      display: inline-flex; align-items: center; gap: 4px;
      background: var(--p-primary-100); color: var(--p-primary-700);
      border-radius: 20px; padding: 2px 10px; font-size: 0.82rem; font-weight: 500;
    }

    /* Mobile cards */
    .cards { display: flex; flex-direction: column; gap: 12px; }
    .entry-card {
      background: var(--p-surface-card);
      border: 1px solid var(--p-surface-border);
      border-radius: 10px; padding: 14px;
    }
    .entry-card.paid { opacity: 0.6; background: var(--p-surface-50); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .card-name { font-weight: 600; font-size: 1rem; }
    .card-loan { font-size: 0.8rem; color: var(--p-text-muted-color); font-family: monospace; }
    .card-balance { font-size: 0.85rem; color: var(--p-text-muted-color); }
    .card-inputs { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .card-inputs p-inputnumber { flex: 1; min-width: 120px; }

    /* Sticky footer */
    .sticky-footer {
      position: fixed; bottom: 64px; left: 0; right: 0;
      background-color: #ffffff;
      border-top: 2px solid var(--p-surface-border, #e2e8f0);
      padding: 10px 16px;
      display: flex; justify-content: space-between; align-items: center;
      gap: 12px; flex-wrap: wrap; z-index: 100;
    }
    .footer-stats { display: flex; gap: 16px; flex-wrap: wrap; }
    .stat { display: flex; flex-direction: column; }
    .stat-label { font-size: 0.7rem; color: var(--p-text-muted-color); text-transform: uppercase; }
    .stat-value { font-size: 1rem; font-weight: 700; }
    .mobile-spacer { height: 100px; }

    /* Desktop totals bar */
    .totals-bar {
      display: flex; gap: 24px; padding: 12px 16px;
      background: var(--p-surface-50); border: 1px solid var(--p-surface-border);
      border-radius: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center;
    }
    .totals-divider { width: 1px; background: var(--p-surface-border); align-self: stretch; }
    .mode-toggle { min-width: 90px; }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <h1 class="page-title">Daily Collection Entry</h1>
    </div>

    <!-- Controls -->
    <div class="controls">
      <!-- Entry mode toggle -->
      <div class="control-group">
        <span class="control-label">Mode</span>
        <div class="flex gap-1">
          <p-button label="Single Date" size="small" icon="pi pi-calendar"
                    [severity]="!multiDateMode() ? 'primary' : 'secondary'"
                    [outlined]="multiDateMode()" (onClick)="setMode(false)" />
          <p-button label="Multi-date" size="small" icon="pi pi-calendar-plus"
                    [severity]="multiDateMode() ? 'primary' : 'secondary'"
                    [outlined]="!multiDateMode()" (onClick)="setMode(true)"
                    pTooltip="Enter collection for multiple missed dates at once" />
        </div>
      </div>

      <!-- Date / Dates picker -->
      <div class="control-group">
        <span class="control-label">{{ multiDateMode() ? 'Select Missed Dates' : 'Date' }}</span>
        @if (!multiDateMode()) {
          <p-datepicker [(ngModel)]="selectedDate" [showIcon]="true" dateFormat="dd/mm/yy"
                        [maxDate]="today" (ngModelChange)="onDateChange()" styleClass="w-44" />
        } @else {
          <p-datepicker [(ngModel)]="selectedDatesArr" selectionMode="multiple"
                        [showIcon]="true" dateFormat="dd/mm/yy" [maxDate]="today"
                        (ngModelChange)="onMultiDatesChange()" styleClass="w-52"
                        placeholder="Pick missed dates…" />
        }
      </div>

      <div class="control-group">
        <span class="control-label">Line</span>
        <p-select [options]="lines()" optionLabel="name" optionValue="name"
                  [(ngModel)]="selectedLine" (ngModelChange)="onLineChange()"
                  placeholder="Select line" styleClass="min-w-36" />
      </div>
    </div>

    <!-- Multi-date: selected dates chips -->
    @if (multiDateMode() && selectedDatesArr.length) {
      <div class="dates-chips">
        <span class="control-label">Selected:</span>
        @for (d of selectedDatesArr; track d) {
          <span class="date-chip"><i class="pi pi-calendar" style="font-size:0.7rem"></i>{{ fmtDate(d) }}</span>
        }
        <span class="control-label" style="margin-left:4px">
          — amounts entered once will apply to all {{ selectedDatesArr.length }} dates
        </span>
      </div>
    }

    @if (loading()) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-spin pi-spinner" style="font-size:2rem"></i>
        <p class="mt-2">Loading loans…</p>
      </div>
    } @else if (!selectedLine) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-info-circle" style="font-size:2rem"></i>
        <p class="mt-2">Select a line to load loans</p>
      </div>
    } @else if (multiDateMode() && !selectedDatesArr.length) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-calendar-plus" style="font-size:2rem"></i>
        <p class="mt-2">Select the missed dates above to load loans</p>
      </div>
    } @else if (rows().length === 0) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        No active loans for {{ selectedLine }}.
      </div>
    } @else {

      <!-- Desktop table -->
      @if (!isMobile()) {
        <div class="totals-bar">
          <div class="stat">
            <span class="stat-label">Cash</span>
            <span class="stat-value" style="color:var(--p-green-600)">₹{{ totalCash() | number }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">GPay</span>
            <span class="stat-value" style="color:var(--p-blue-600)">₹{{ totalGpay() | number }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">{{ multiDateMode() ? 'Per Day' : 'Total' }}</span>
            <span class="stat-value">₹{{ (totalCash() + totalGpay()) | number }}</span>
          </div>
          @if (multiDateMode() && selectedDatesArr.length > 1) {
            <div class="totals-divider"></div>
            <div class="stat">
              <span class="stat-label">× Dates</span>
              <span class="stat-value">{{ selectedDatesArr.length }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Grand Total</span>
              <span class="stat-value" style="color:var(--p-primary-color)">
                ₹{{ ((totalCash() + totalGpay()) * selectedDatesArr.length) | number }}
              </span>
            </div>
            <div class="stat">
              <span class="stat-label">New Entries</span>
              <span class="stat-value">{{ pendingEntryCount() }}</span>
            </div>
          }
          <div style="flex:1"></div>
          <p-button [label]="multiDateMode() ? 'Submit All Dates' : 'Submit All'"
                    icon="pi pi-check-circle" [loading]="submittingAll()"
                    (onClick)="onSubmitAll()" [disabled]="nothingToSubmit()" />
        </div>

        <p-table [value]="rows()" stripedRows>
          <ng-template pTemplate="header">
            <tr>
              <th>Loan #</th>
              <th>Customer</th>
              <th>Balance</th>
              <th style="min-width:140px">Amount (₹)</th>
              <th style="min-width:120px">Mode</th>
              @if (!multiDateMode()) {
                <th>Status</th>
              } @else {
                <th>Coverage</th>
              }
              @if (!multiDateMode()) { <th>Action</th> }
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-row>
            <tr [style]="row.existingEntry ? 'opacity:0.6;background:var(--p-surface-50)' : ''">
              <td><span class="font-mono text-sm">{{ row.loan.loan_number }}</span></td>
              <td>{{ row.loan.customer_name }}</td>
              <td>₹{{ (row.loan.remaining_balance ?? 0) | number }}</td>
              <td>
                @if (!multiDateMode() && row.existingEntry) {
                  <span class="font-semibold">₹{{ row.existingEntry.amount | number }}</span>
                } @else if (multiDateMode() && row.coveredDates.length === selectedDatesArr.length) {
                  <span class="text-sm" style="color:var(--p-text-muted-color)">All dates entered</span>
                } @else {
                  <p-inputnumber [(ngModel)]="row.amount" [min]="0"
                                 mode="decimal" inputStyleClass="w-full" styleClass="w-full"
                                 (ngModelChange)="onAmountChange()" />
                }
              </td>
              <td>
                @if (!multiDateMode() && row.existingEntry) {
                  <p-tag [value]="row.existingEntry.mode === 'cash' ? 'Cash' : 'GPay'"
                         [severity]="row.existingEntry.mode === 'cash' ? 'success' : 'info'" />
                } @else if (multiDateMode() && row.coveredDates.length === selectedDatesArr.length) {
                  <!-- all covered, no mode toggle needed -->
                } @else {
                  <div class="flex gap-2">
                    <p-button label="Cash" [outlined]="row.mode !== 'cash'" size="small"
                              [severity]="row.mode === 'cash' ? 'success' : 'secondary'"
                              (onClick)="row.mode = 'cash'" styleClass="mode-toggle" />
                    <p-button label="GPay" [outlined]="row.mode !== 'gpay'" size="small"
                              [severity]="row.mode === 'gpay' ? 'info' : 'secondary'"
                              (onClick)="row.mode = 'gpay'" styleClass="mode-toggle" />
                  </div>
                }
              </td>
              @if (!multiDateMode()) {
                <td>
                  @if (row.existingEntry) {
                    <p-tag value="Paid" severity="success" />
                  } @else {
                    <p-tag value="Pending" severity="warn" />
                  }
                </td>
              } @else {
                <td>
                  @if (row.coveredDates.length === 0) {
                    <p-tag value="All pending" severity="warn" />
                  } @else if (row.coveredDates.length === selectedDatesArr.length) {
                    <p-tag value="All entered" severity="success" />
                  } @else {
                    <p-tag [value]="row.coveredDates.length + '/' + selectedDatesArr.length + ' done'"
                           severity="info"
                           [pTooltip]="'Already entered: ' + row.coveredDates.join(', ')" />
                  }
                </td>
              }
              @if (!multiDateMode()) {
                <td>
                  @if (!row.existingEntry) {
                    <p-button icon="pi pi-save" [text]="true" [rounded]="true" severity="success"
                              pTooltip="Save" [loading]="row.saving" (onClick)="onSaveRow(row)"
                              [disabled]="!row.amount || row.amount <= 0" />
                  }
                </td>
              }
            </tr>
          </ng-template>
        </p-table>
      }

      <!-- Mobile cards -->
      @if (isMobile()) {
        <div class="cards">
          @for (row of rows(); track row.loan.id) {
            <div class="entry-card"
                 [class.paid]="!multiDateMode() && !!row.existingEntry ||
                               multiDateMode() && row.coveredDates.length === selectedDatesArr.length">
              <div class="card-header">
                <div>
                  <div class="card-name">{{ row.loan.customer_name }}</div>
                  <div class="card-loan">{{ row.loan.loan_number }}</div>
                </div>
                <div class="text-right">
                  <div class="card-balance">Balance</div>
                  <div class="font-semibold">₹{{ (row.loan.remaining_balance ?? 0) | number }}</div>
                </div>
              </div>

              @if (!multiDateMode() && row.existingEntry) {
                <div class="flex gap-3 items-center">
                  <p-tag value="Paid" severity="success" />
                  <span class="font-semibold">₹{{ row.existingEntry.amount | number }}</span>
                  <p-tag [value]="row.existingEntry.mode === 'cash' ? 'Cash' : 'GPay'"
                         [severity]="row.existingEntry.mode === 'cash' ? 'success' : 'info'" />
                </div>
              } @else if (multiDateMode() && row.coveredDates.length === selectedDatesArr.length) {
                <div class="flex gap-3 items-center">
                  <p-tag value="All Entered" severity="success" />
                  <span class="text-sm" style="color:var(--p-text-muted-color)">All {{ selectedDatesArr.length }} dates recorded</span>
                </div>
              } @else {
                <div class="card-inputs">
                  <p-inputnumber [(ngModel)]="row.amount" [min]="0"
                                 placeholder="Amount" mode="decimal"
                                 inputStyleClass="w-full" styleClass="w-full"
                                 (ngModelChange)="onAmountChange()" />
                  <p-button label="Cash" [outlined]="row.mode !== 'cash'" size="small"
                            [severity]="row.mode === 'cash' ? 'success' : 'secondary'"
                            (onClick)="row.mode = 'cash'" />
                  <p-button label="GPay" [outlined]="row.mode !== 'gpay'" size="small"
                            [severity]="row.mode === 'gpay' ? 'info' : 'secondary'"
                            (onClick)="row.mode = 'gpay'" />
                </div>
                @if (multiDateMode() && row.coveredDates.length > 0) {
                  <div class="mt-2">
                    <p-tag [value]="row.coveredDates.length + '/' + selectedDatesArr.length + ' dates already entered'"
                           severity="info" />
                  </div>
                }
              }
            </div>
          }
        </div>
        <div class="mobile-spacer"></div>

        <!-- Sticky footer for mobile -->
        <div class="sticky-footer">
          <div class="footer-stats">
            <div class="stat">
              <span class="stat-label">Cash</span>
              <span class="stat-value" style="color:var(--p-green-600)">₹{{ totalCash() | number }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">GPay</span>
              <span class="stat-value" style="color:var(--p-blue-600)">₹{{ totalGpay() | number }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">{{ multiDateMode() ? 'Per Day' : 'Total' }}</span>
              <span class="stat-value">₹{{ (totalCash() + totalGpay()) | number }}</span>
            </div>
            @if (multiDateMode() && selectedDatesArr.length > 1) {
              <div class="stat">
                <span class="stat-label">× {{ selectedDatesArr.length }} days</span>
                <span class="stat-value" style="color:var(--p-primary-color)">
                  ₹{{ ((totalCash() + totalGpay()) * selectedDatesArr.length) | number }}
                </span>
              </div>
            }
          </div>
          <p-button [label]="multiDateMode() ? 'Submit All' : 'Submit All'"
                    icon="pi pi-check-circle" [loading]="submittingAll()"
                    (onClick)="onSubmitAll()" [disabled]="nothingToSubmit()" size="small" />
        </div>
      }
    }
  `,
})
export class DailyEntryComponent implements OnInit, OnDestroy {
  private readonly data = inject(DataService);
  private readonly bookCtx = inject(BookContextStore);
  private readonly toastSvc = inject(MessageService);
  private readonly resizeListener = () => this.isMobile.set(window.innerWidth < 768);

  protected readonly loading = signal(false);
  protected readonly submittingAll = signal(false);
  protected readonly rows = signal<EntryRow[]>([]);
  protected readonly isMobile = signal(window.innerWidth < 768);
  protected readonly multiDateMode = signal(false);

  protected selectedDate: Date = new Date();
  protected selectedDatesArr: Date[] = [];
  protected selectedLine: LoanLine | '' = '';
  protected readonly today = new Date();

  protected readonly lines = signal<Line[]>([]);

  // Single-date totals: pending + existing
  protected readonly totalCash = computed(() =>
    this.rows().filter(r => !r.existingEntry && r.mode === 'cash' && (r.amount ?? 0) > 0)
      .reduce((s, r) => s + (r.amount ?? 0), 0)
    + this.rows().filter(r => r.existingEntry?.mode === 'cash')
      .reduce((s, r) => s + (r.existingEntry?.amount ?? 0), 0)
  );

  protected readonly totalGpay = computed(() =>
    this.rows().filter(r => !r.existingEntry && r.mode === 'gpay' && (r.amount ?? 0) > 0)
      .reduce((s, r) => s + (r.amount ?? 0), 0)
    + this.rows().filter(r => r.existingEntry?.mode === 'gpay')
      .reduce((s, r) => s + (r.existingEntry?.amount ?? 0), 0)
  );

  protected readonly dirtyAmount = signal(0);
  protected onAmountChange(): void { this.dirtyAmount.update(n => n + 1); }

  protected readonly nothingToSubmit = computed(() => {
    this.dirtyAmount(); // track row.amount mutations (plain props, not signals)
    if (this.multiDateMode()) {
      if (!this.selectedDatesArr.length) return true;
      return this.rows().every(r => !(r.amount && r.amount > 0));
    }
    return this.rows().every(r => !!r.existingEntry || !(r.amount && r.amount > 0));
  });

  /** Total new entries that will be created across all selected dates */
  protected readonly pendingEntryCount = computed(() => {
    if (!this.multiDateMode()) return 0;
    const dates = this.selectedDatesArr.map(d => this.toDateStr(d));
    return this.rows()
      .filter(r => (r.amount ?? 0) > 0)
      .reduce((count, r) => count + dates.filter(d => !r.coveredDates.includes(d)).length, 0);
  });

  constructor() {
    // Active book changed (header picker): reload its lines and reset the grid
    // so stale rows/line from the previous book don't linger.
    effect(() => {
      const bookId = this.bookCtx.bookId();
      if (!bookId) return;
      this.data.lines.getAll(bookId).subscribe(r => this.lines.set(r.data));
      this.selectedLine = '';
      this.rows.set([]);
    });
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.resizeListener);
  }
  ngOnDestroy(): void { window.removeEventListener('resize', this.resizeListener); }

  protected setMode(multi: boolean): void {
    this.multiDateMode.set(multi);
    this.rows.set([]);
    if (multi) this.selectedDatesArr = [];
    // Reload for the new mode (single → today's entries for the line; multi →
    // no-op until dates are picked) so we don't show a stale "no loans" message.
    this.loadRows();
  }

  protected onDateChange(): void { this.loadRows(); }
  protected onLineChange(): void { this.loadRows(); }
  protected onMultiDatesChange(): void { this.loadRows(); }

  protected fmtDate(d: Date): string {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${String(d.getDate()).padStart(2,'0')} ${months[d.getMonth()]}`;
  }

  protected toDateStr(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  private loadRows(): void {
    if (!this.selectedLine) return;
    if (this.multiDateMode() && !this.selectedDatesArr.length) return;
    this.loading.set(true);
    const bookId = this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID;

    this.data.loans.getAll(bookId).subscribe({
      next: (loansRes) => {
        const loans = loansRes.data.filter(l => l.line === this.selectedLine && !l.completed_date);

        if (!this.multiDateMode()) {
          this.data.dailyEntries.getByDate(bookId, this.toDateStr(this.selectedDate)).subscribe({
            next: (entriesRes) => {
              this.rows.set(loans.map(loan => ({
                loan, amount: null, mode: 'cash',
                existingEntry: entriesRes.data.find(e => e.loan_id === loan.id) ?? null,
                coveredDates: [], saving: false,
              })));
              this.loading.set(false);
            },
            error: () => this.loading.set(false),
          });
        } else {
          // Multi-date: check coverage for every selected date in parallel
          const dates = this.selectedDatesArr.map(d => this.toDateStr(d));
          const dateChecks: Observable<{ data: DailyEntry[] }>[] =
            dates.map(d => this.data.dailyEntries.getByDate(bookId, d));

          forkJoin(dateChecks).subscribe({
            next: (results) => {
              const coverageMap = new Map<string, string[]>();
              results.forEach((res, i) => {
                res.data.forEach(e => {
                  if (!coverageMap.has(e.loan_id)) coverageMap.set(e.loan_id, []);
                  coverageMap.get(e.loan_id)!.push(dates[i]);
                });
              });
              this.rows.set(loans.map(loan => ({
                loan, amount: null, mode: 'cash',
                existingEntry: null,
                coveredDates: coverageMap.get(loan.id) ?? [],
                saving: false,
              })));
              this.loading.set(false);
            },
            error: () => this.loading.set(false),
          });
        }
      },
      error: () => this.loading.set(false),
    });
  }

  protected onSaveRow(row: EntryRow): void {
    if (!row.amount || row.amount <= 0) return;
    row.saving = true;
    const bookId = this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID;
    this.data.dailyEntries.create({
      book_id: bookId, loan_id: row.loan.id,
      entry_date: this.toDateStr(this.selectedDate), amount: row.amount, mode: row.mode,
    }).subscribe({
      next: (res) => {
        row.existingEntry = res.data;
        row.amount = null;
        row.saving = false;
        this.rows.update(r => [...r]);
        this.toastSvc.add({ severity: 'success', summary: 'Saved', detail: row.loan.customer_name, life: 1500 });
      },
      error: () => {
        row.saving = false;
        this.rows.update(r => [...r]);
        this.toastSvc.add({ severity: 'error', summary: 'Save failed', detail: row.loan.customer_name, life: 2500 });
      },
    });
  }

  protected onSubmitAll(): void {
    const bookId = this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID;

    if (!this.multiDateMode()) {
      const pending = this.rows().filter(r => !r.existingEntry && r.amount && r.amount > 0);
      if (!pending.length) return;
      this.submittingAll.set(true);
      this.data.dailyEntries.bulkCreate({
        book_id: bookId,
        entry_date: this.toDateStr(this.selectedDate),
        entries: pending.map(r => ({ loan_id: r.loan.id, amount: r.amount!, mode: r.mode })),
      }).subscribe({
        next: (res) => {
          res.data.forEach(entry => {
            const row = this.rows().find(r => r.loan.id === entry.loan_id);
            if (row) { row.existingEntry = entry; row.amount = null; }
          });
          this.rows.update(r => [...r]);
          this.submittingAll.set(false);
          this.toastSvc.add({ severity: 'success', summary: 'Submitted', detail: `${pending.length} entries recorded`, life: 2500 });
        },
        error: () => {
          this.submittingAll.set(false);
          this.toastSvc.add({ severity: 'error', summary: 'Submit failed', detail: 'Please try again', life: 3000 });
        },
      });
    } else {
      // Multi-date: one bulkCreate per date (skip dates already covered per loan)
      const rows = this.rows().filter(r => (r.amount ?? 0) > 0);
      if (!rows.length) return;
      const dates = this.selectedDatesArr.map(d => this.toDateStr(d));
      this.submittingAll.set(true);

      const dateObs: Observable<{ data: DailyEntry[] }>[] = dates.map(dateStr => {
        const pending = rows.filter(r => !r.coveredDates.includes(dateStr));
        if (!pending.length) return of({ data: [] });
        return this.data.dailyEntries.bulkCreate({
          book_id: bookId, entry_date: dateStr,
          entries: pending.map(r => ({ loan_id: r.loan.id, amount: r.amount!, mode: r.mode })),
        });
      });

      forkJoin(dateObs).subscribe({
        next: (results) => {
          const totalCreated = results.reduce((n, r) => n + r.data.length, 0);
          const skipped = (rows.length * dates.length) - totalCreated;
          // Mark all dates as covered for submitted rows
          this.rows.update(rowList => rowList.map(r =>
            (r.amount ?? 0) > 0 ? { ...r, coveredDates: dates, amount: null } : r
          ));
          this.submittingAll.set(false);
          this.toastSvc.add({
            severity: 'success', summary: 'Multi-date entries saved',
            detail: `${totalCreated} entries created across ${dates.length} days${skipped > 0 ? ` (${skipped} skipped – already existed)` : ''}`,
            life: 4000,
          });
        },
        error: () => {
          this.submittingAll.set(false);
          this.toastSvc.add({ severity: 'error', summary: 'Submit failed', detail: 'Please try again', life: 3000 });
        },
      });
    }
  }
}

