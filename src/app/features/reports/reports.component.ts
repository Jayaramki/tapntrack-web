import { Component, effect, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { AuthStore } from '../../core/stores/auth.store';
import { BookContextStore } from '../../core/stores/book-context.store';
import { CollectionReport, LoanReport, ReportFilter } from '../../core/models/dashboard.model';
import { Line } from '../../core/models/line.model';
import { isoDateStr } from '../../core/utils/date.util';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, TitleCasePipe,
            ButtonModule, SelectModule, DatePickerModule, TabsModule, ToastModule],
  providers: [MessageService],
  styles: [`
    :host { display:block; padding:16px; }
    .page-header  { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:20px; }
    .page-title   { font-size:1.3rem; font-weight:700; margin:0; }
    .filters      { display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end; margin-bottom:20px;
                    background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                    border-radius:10px; padding:14px 16px; }
    .filter-group { display:flex; flex-direction:column; gap:4px; }
    .filter-label { font-size:0.78rem; font-weight:600; color:var(--p-text-muted-color); }
    .report-card  { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                    border-radius:12px; overflow:hidden; }
    .tab-toolbar  { display:flex; align-items:center; justify-content:space-between; gap:12px;
                    padding:4px 2px 12px; }
    .row-count    { font-size:0.78rem; color:var(--p-text-muted-color); font-weight:600; }
    .table-wrap   { max-height:calc(100vh - 340px); min-height:160px; overflow:auto;
                    border:1px solid var(--p-surface-border); border-radius:8px; }
    .report-table { width:100%; border-collapse:collapse; font-size:0.84rem; }
    .report-table th { position:sticky; top:0; z-index:1; text-align:left; padding:8px 12px;
                       font-size:0.76rem; font-weight:600; color:var(--p-text-muted-color);
                       background:var(--p-surface-50); border-bottom:1px solid var(--p-surface-border); }
    .report-table td { padding:8px 12px; border-bottom:1px solid var(--p-surface-border); }
    .report-table tr:last-child td { border-bottom:none; }
    .report-table tr:hover td { background:var(--p-surface-hover); }
    .amt { text-align:right; font-variant-numeric:tabular-nums; font-weight:600; }
    .empty-state { text-align:center; padding:32px; color:var(--p-text-muted-color); font-size:0.9rem; }
    .badge { display:inline-block; padding:2px 8px; border-radius:10px; font-size:0.74rem; font-weight:600;
             background:var(--p-surface-hover); }
    .badge.cash  { background:rgba(76,175,80,.15);  color:#388E3C; }
    .badge.gpay  { background:rgba(33,150,243,.15);  color:#1976D2; }
    .badge.daily   { background:rgba(156,39,176,.12); color:#7B1FA2; }
    .badge.weekly  { background:rgba(255,152,0,.15);  color:#F57C00; }
    .badge.monthly { background:rgba(0,188,212,.15);  color:#0097A7; }
  `],
  template: `
    <p-toast />
    <div class="page-header">
      <h2 class="page-title">Reports</h2>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <label class="filter-label">From Date</label>
        <p-datepicker [(ngModel)]="filterFrom" [showIcon]="true" dateFormat="yy-mm-dd" placeholder="From"></p-datepicker>
      </div>
      <div class="filter-group">
        <label class="filter-label">To Date</label>
        <p-datepicker [(ngModel)]="filterTo" [showIcon]="true" dateFormat="yy-mm-dd" placeholder="To"></p-datepicker>
      </div>
      <div class="filter-group">
        <label class="filter-label">Loan Type</label>
        <p-select [(ngModel)]="filterType" [options]="typeOptions" optionLabel="label" optionValue="value" placeholder="All Types" [showClear]="true" style="width:140px"></p-select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Line</label>
        <p-select [(ngModel)]="filterLine" [options]="lines()" optionLabel="name" optionValue="name" placeholder="All Lines" [showClear]="true" style="width:130px"></p-select>
      </div>
      <div class="filter-group" style="justify-content:flex-end">
        <label class="filter-label">&nbsp;</label>
        <p-button label="Generate" icon="pi pi-refresh" (onClick)="generate()" [loading]="loading()"></p-button>
      </div>
    </div>

    <!-- Report Tabs -->
    <div class="report-card">
      <p-tabs value="collection">
        <p-tablist>
          <p-tab value="collection">📥 Collection Report</p-tab>
          <p-tab value="loans">📋 Loan Summary Report</p-tab>
        </p-tablist>
        <p-tabpanels>

          <!-- Collection Report -->
          <p-tabpanel value="collection">
            <div class="tab-toolbar">
              <span class="row-count">{{ collectionReport().length }} rows</span>
              <p-button icon="pi pi-download" label="Export CSV" severity="secondary" size="small"
                        [disabled]="collectionReport().length === 0"
                        (onClick)="exportCsv('collection')"></p-button>
            </div>
            @if (collectionReport().length === 0) {
              <div class="empty-state">No data. Click Generate to load.</div>
            } @else {
              <div class="table-wrap">
                <table class="report-table">
                  <thead><tr>
                    <th>Date</th><th>Loan #</th><th>Customer</th>
                    <th>Mode</th><th class="amt">Amount</th>
                  </tr></thead>
                  <tbody>
                    @for (row of collectionReport(); track $index) {
                      <tr>
                        <td>{{row.date}}</td>
                        <td><strong>{{row.loan_number}}</strong></td>
                        <td>
                          @if (row.customer_number != null) {
                            <span class="cust-num">#{{row.customer_number}}</span>
                          }
                          {{row.customer_name}}
                        </td>
                        <td><span class="badge" [class]="row.mode">{{row.mode | titlecase}}</span></td>
                        <td class="amt">{{row.amount | currency:'INR':'symbol':'1.0-0'}}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </p-tabpanel>

          <!-- Loan Summary Report -->
          <p-tabpanel value="loans">
            <div class="tab-toolbar">
              <span class="row-count">{{ loanReport().length }} rows</span>
              <p-button icon="pi pi-download" label="Export CSV" severity="secondary" size="small"
                        [disabled]="loanReport().length === 0"
                        (onClick)="exportCsv('loans')"></p-button>
            </div>
            @if (loanReport().length === 0) {
              <div class="empty-state">No data. Click Generate to load.</div>
            } @else {
              <div class="table-wrap">
                <table class="report-table">
                  <thead><tr>
                    <th>Loan #</th><th>Customer</th><th>Type</th>
                    <th class="amt">Loan Amt</th><th class="amt">Collected</th><th class="amt">Balance</th>
                  </tr></thead>
                  <tbody>
                    @for (row of loanReport(); track $index) {
                      <tr>
                        <td><strong>{{row.loan_number}}</strong></td>
                        <td>
                          @if (row.customer_number != null) {
                            <span class="cust-num">#{{row.customer_number}}</span>
                          }
                          {{row.customer_name}}
                        </td>
                        <td><span class="badge" [class]="row.loan_type">{{row.loan_type | titlecase}}</span></td>
                        <td class="amt">{{row.loan_amount | currency:'INR':'symbol':'1.0-0'}}</td>
                        <td class="amt">{{row.total_collected | currency:'INR':'symbol':'1.0-0'}}</td>
                        <td class="amt" [style.color]="row.remaining_balance > 0 ? 'var(--p-red-500)' : 'var(--p-green-500)'">
                          {{row.remaining_balance | currency:'INR':'symbol':'1.0-0'}}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </p-tabpanel>

        </p-tabpanels>
      </p-tabs>
    </div>
  `,
})
export class ReportsComponent {
  private data = inject(DataService);
  private msg  = inject(MessageService);
  private bookCtx = inject(BookContextStore);

  filterFrom: Date | null = null;
  filterTo:   Date | null = null;
  filterType: string | null = null;
  filterLine: string | null = null;

  readonly typeOptions = [
    { label: 'Daily',   value: 'daily'   },
    { label: 'Weekly',  value: 'weekly'  },
    { label: 'Monthly', value: 'monthly' },
  ];

  // Generate is explicit (button / book-change): generate() snapshots the filters
  // into `query`, which drives the resource and auto-cancels a superseded run.
  private readonly query = signal<ReportFilter | null>(null);
  private readonly reportRes = rxResource({
    params: () => this.query(),
    stream: ({ params }) => params
      ? forkJoin({
          col:   this.data.reports.getCollectionReport(params),
          loans: this.data.reports.getLoanReport(params),
        }).pipe(map(({ col, loans }) => ({ col: col.data ?? [], loans: loans.data ?? [] })))
      : of({ col: [] as CollectionReport[], loans: [] as LoanReport[] }),
    defaultValue: { col: [], loans: [] },
  });
  readonly collectionReport = computed(() => this.reportRes.value().col);
  readonly loanReport       = computed(() => this.reportRes.value().loans);
  readonly loading          = this.reportRes.isLoading;

  private readonly linesRes = rxResource({
    params: () => this.bookCtx.bookId(),
    stream: ({ params }) => params ? this.data.lines.getAll(params).pipe(map(r => r.data)) : of<Line[]>([]),
    defaultValue: [],
  });
  readonly lines = this.linesRes.value;

  constructor() {
    // Default date range: current month (once).
    const now = new Date();
    this.filterFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    this.filterTo   = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Re-run the report whenever the active book changes (header picker).
    effect(() => {
      if (this.bookCtx.bookId()) this.generate();
    });
  }

  generate() {
    this.query.set({
      book_id:   this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID,
      from_date: this.filterFrom ? isoDateStr(this.filterFrom) : isoDateStr(new Date()),
      to_date:   this.filterTo   ? isoDateStr(this.filterTo)   : isoDateStr(new Date()),
      ...(this.filterType && { loan_type: this.filterType }),
      ...(this.filterLine && { line: this.filterLine }),
    });
  }

  exportCsv(type: 'collection' | 'loans') {
    let csv = '';
    let filename = '';
    if (type === 'collection') {
      csv = ['Date,Loan #,Cust #,Customer,Mode,Amount',
             ...this.collectionReport().map(r =>
               `${r.date},${r.loan_number},${r.customer_number ?? ''},"${r.customer_name}",${r.mode},${r.amount}`)
            ].join('\n');
      filename = 'collection-report.csv';
    } else {
      csv = ['Loan #,Cust #,Customer,Type,Loan Amount,Collected,Balance,Issued Date,Completed',
             ...this.loanReport().map(r =>
               `${r.loan_number},${r.customer_number ?? ''},"${r.customer_name}",${r.loan_type},${r.loan_amount},${r.total_collected},${r.remaining_balance},${r.issued_date},${r.completed_date ?? ''}`)
            ].join('\n');
      filename = 'loan-report.csv';
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    this.msg.add({ severity: 'success', summary: 'Downloaded', detail: filename, life: 2500 });
  }
}
