import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DataService } from '../../core/services/data.service';
import { AuthStore } from '../../core/stores/auth.store';
import { DaySummary } from '../../core/models/daily-entry.model';
import { LoanLine } from '../../core/models/loan.model';

@Component({
  selector: 'app-day-summary',
  standalone: true,
  imports: [
    FormsModule, DecimalPipe,
    DatePickerModule, SelectModule, ButtonModule,
    TableModule, TagModule,
  ],
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
    .page-title  { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; margin-bottom: 20px; }
    .control-group { display: flex; flex-direction: column; gap: 4px; }
    .control-label { font-size: 0.8rem; color: var(--p-text-muted-color); }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 14px;
      margin-bottom: 24px;
    }
    @media (max-width: 1023px) { .summary-cards { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 600px)  { .summary-cards { grid-template-columns: repeat(2, 1fr); } }

    .summary-card {
      background: var(--p-surface-card);
      border: 1px solid var(--p-surface-border);
      border-radius: 12px; padding: 16px 18px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .card-icon  { font-size: 1.4rem; }
    .card-label { font-size: 0.75rem; text-transform: uppercase; color: var(--p-text-muted-color); letter-spacing: 0.04em; }
    .card-value { font-size: 1.4rem; font-weight: 700; }

    .table-footer {
      display: flex; gap: 24px; padding: 10px 14px;
      background: var(--p-surface-50); border: 1px solid var(--p-surface-border);
      border-radius: 0 0 8px 8px; flex-wrap: wrap;
    }
    .foot-stat  { display: flex; flex-direction: column; }
    .foot-label { font-size: 0.72rem; color: var(--p-text-muted-color); text-transform: uppercase; }
    .foot-value { font-size: 1rem; font-weight: 700; }

    @media print {
      .no-print { display: none !important; }
      .summary-cards { grid-template-columns: repeat(5, 1fr); }
    }
  `],
  template: `
    <div class="page-header">
      <h1 class="page-title">Day Summary</h1>
      <p-button label="Print" icon="pi pi-print" [outlined]="true" severity="secondary"
                styleClass="no-print" (onClick)="onPrint()" />
    </div>

    <div class="controls no-print">
      <div class="control-group">
        <span class="control-label">Date</span>
        <p-datepicker [(ngModel)]="selectedDate" [showIcon]="true" dateFormat="dd/mm/yy"
                      [maxDate]="today" (ngModelChange)="loadSummary()" styleClass="w-44" />
      </div>
      <div class="control-group">
        <span class="control-label">Line</span>
        <p-select [options]="lineOptions" optionLabel="label" optionValue="value"
                  [ngModel]="selectedLine()" (ngModelChange)="selectedLine.set($event)"
                  styleClass="min-w-36" />
      </div>
      <div class="control-group">
        <span class="control-label">Mode</span>
        <p-select [options]="modeOptions" optionLabel="label" optionValue="value"
                  [ngModel]="selectedMode()" (ngModelChange)="selectedMode.set($event)"
                  styleClass="min-w-28" />
      </div>
    </div>

    @if (loading()) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-spin pi-spinner" style="font-size:2rem"></i>
        <p class="mt-2">Loading…</p>
      </div>
    } @else if (summary()) {

      <!-- Summary cards — always full-day totals, unaffected by line/mode filter -->
      <div class="summary-cards">
        <div class="summary-card">
          <i class="pi pi-money-bill card-icon" style="color:var(--p-green-600)"></i>
          <span class="card-label">Cash</span>
          <span class="card-value" style="color:var(--p-green-600)">₹{{ summary()!.total_cash | number }}</span>
        </div>
        <div class="summary-card">
          <i class="pi pi-mobile card-icon" style="color:var(--p-blue-600)"></i>
          <span class="card-label">GPay</span>
          <span class="card-value" style="color:var(--p-blue-600)">₹{{ summary()!.total_gpay | number }}</span>
        </div>
        <div class="summary-card">
          <i class="pi pi-wallet card-icon" style="color:var(--p-primary-color)"></i>
          <span class="card-label">Total Collection</span>
          <span class="card-value" style="color:var(--p-primary-color)">₹{{ summary()!.total_collection | number }}</span>
        </div>
        <div class="summary-card">
          <i class="pi pi-arrow-circle-down card-icon" style="color:var(--p-red-500)"></i>
          <span class="card-label">Expenses</span>
          <span class="card-value" style="color:var(--p-red-500)">₹{{ summary()!.total_expenses | number }}</span>
        </div>
        <div class="summary-card">
          <i class="pi pi-chart-bar card-icon"
             [style]="'color:' + (summary()!.net >= 0 ? 'var(--p-green-600)' : 'var(--p-red-500)')"></i>
          <span class="card-label">Net</span>
          <span class="card-value"
                [style]="'color:' + (summary()!.net >= 0 ? 'var(--p-green-600)' : 'var(--p-red-500)')">
            ₹{{ summary()!.net | number }}
          </span>
        </div>
      </div>

      <!-- Filtered entries table -->
      @if (filteredEntries().length === 0) {
        <div class="text-center py-10" style="color:var(--p-text-muted-color)">
          <i class="pi pi-inbox" style="font-size:2rem"></i>
          <p class="mt-2">No entries for the selected filters.</p>
        </div>
      } @else {
        <p-table [value]="filteredEntries()" stripedRows>
          <ng-template pTemplate="header">
            <tr>
              <th style="width:48px">#</th>
              <th>Loan #</th>
              <th>Customer</th>
              <th>Line</th>
              <th class="text-right">Amount (₹)</th>
              <th>Mode</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-entry let-i="rowIndex">
            <tr>
              <td class="text-sm" style="color:var(--p-text-muted-color)">{{ i + 1 }}</td>
              <td><span class="font-mono text-sm">{{ entry.loan_number }}</span></td>
              <td>{{ entry.customer_name }}</td>
              <td class="text-sm" style="color:var(--p-text-muted-color)">
                {{ entry.line ? entry.line.replace('line', 'Line ') : '—' }}
              </td>
              <td class="text-right font-semibold">₹{{ entry.amount | number }}</td>
              <td>
                <p-tag [value]="entry.mode === 'cash' ? 'Cash' : 'GPay'"
                       [severity]="entry.mode === 'cash' ? 'success' : 'info'" />
              </td>
            </tr>
          </ng-template>
        </p-table>

        <!-- Filtered totals bar -->
        <div class="table-footer">
          <div class="foot-stat">
            <span class="foot-label">Showing</span>
            <span class="foot-value">{{ filteredEntries().length }} entries</span>
          </div>
          <div class="foot-stat">
            <span class="foot-label">Cash</span>
            <span class="foot-value" style="color:var(--p-green-600)">₹{{ filteredCash() | number }}</span>
          </div>
          <div class="foot-stat">
            <span class="foot-label">GPay</span>
            <span class="foot-value" style="color:var(--p-blue-600)">₹{{ filteredGpay() | number }}</span>
          </div>
          <div class="foot-stat">
            <span class="foot-label">Total</span>
            <span class="foot-value">₹{{ (filteredCash() + filteredGpay()) | number }}</span>
          </div>
        </div>
      }

    } @else {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-calendar" style="font-size:2rem"></i>
        <p class="mt-2">Select a date to view the summary.</p>
      </div>
    }
  `,
})
export class DaySummaryComponent implements OnInit {
  private readonly data = inject(DataService);

  protected readonly loading = signal(false);
  protected readonly summary = signal<DaySummary | null>(null);
  protected readonly selectedLine = signal<LoanLine | 'all'>('all');
  protected readonly selectedMode = signal<'all' | 'cash' | 'gpay'>('all');

  protected selectedDate: Date = new Date();
  protected readonly today = new Date();

  protected readonly lineOptions = [
    { label: 'All Lines', value: 'all' },
    ...(['line1','line2','line3','line4','line5','line6'] as LoanLine[])
      .map(l => ({ label: l.replace('line', 'Line '), value: l })),
  ];
  protected readonly modeOptions = [
    { label: 'All Modes', value: 'all' as const },
    { label: 'Cash',      value: 'cash' as const },
    { label: 'GPay',      value: 'gpay' as const },
  ];

  protected readonly filteredEntries = computed(() => {
    const s = this.summary();
    if (!s) return [];
    return s.entries.filter(e => {
      if (this.selectedLine() !== 'all' && e.line !== this.selectedLine()) return false;
      if (this.selectedMode() !== 'all' && e.mode !== this.selectedMode()) return false;
      return true;
    });
  });

  protected readonly filteredCash = computed(() =>
    this.filteredEntries().filter(e => e.mode === 'cash').reduce((s, e) => s + e.amount, 0)
  );
  protected readonly filteredGpay = computed(() =>
    this.filteredEntries().filter(e => e.mode === 'gpay').reduce((s, e) => s + e.amount, 0)
  );

  ngOnInit(): void { this.loadSummary(); }

  protected loadSummary(): void {
    this.loading.set(true);
    const bookId = AuthStore.bookId() ?? 1;
    const d = this.selectedDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.data.dailyEntries.getDaySummary(bookId, dateStr).subscribe(res => {
      this.summary.set(res.data);
      this.loading.set(false);
    });
  }

  protected onPrint(): void { window.print(); }
}

