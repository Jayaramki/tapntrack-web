import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { AuthStore } from '../../core/stores/auth.store';
import { BookContextStore } from '../../core/stores/book-context.store';
import { CollectionReport, LoanReport, ReportFilter } from '../../core/models/dashboard.model';
import { Line } from '../../core/models/line.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, TitleCasePipe,
            ButtonModule, SelectModule, DatePickerModule, ToastModule],
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
    .report-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:16px; }
    .report-card  { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                    border-radius:12px; overflow:hidden; }
    .card-header  { display:flex; align-items:center; justify-content:space-between;
                    padding:12px 16px; border-bottom:1px solid var(--p-surface-border); background:var(--p-surface-50); }
    .card-title   { font-weight:700; font-size:0.95rem; margin:0; }
    .card-body    { padding:0; max-height:300px; overflow-y:auto; }
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

    <!-- Report Cards -->
    <div class="report-cards">

      <!-- Collection Report -->
      <div class="report-card">
        <div class="card-header">
          <h3 class="card-title">📥 Collection Report</h3>
          <p-button icon="pi pi-download" label="CSV" severity="secondary" size="small"
                    [disabled]="collectionReport().length === 0"
                    (onClick)="exportCsv('collection')"></p-button>
        </div>
        <div class="card-body">
          @if (collectionReport().length === 0) {
            <div class="empty-state">No data. Click Generate to load.</div>
          } @else {
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
                    <td>{{row.customer_name}}</td>
                    <td><span class="badge" [class]="row.mode">{{row.mode | titlecase}}</span></td>
                    <td class="amt">{{row.amount | currency:'INR':'symbol':'1.0-0'}}</td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>
      </div>

      <!-- Loan Summary Report -->
      <div class="report-card">
        <div class="card-header">
          <h3 class="card-title">📋 Loan Summary Report</h3>
          <p-button icon="pi pi-download" label="CSV" severity="secondary" size="small"
                    [disabled]="loanReport().length === 0"
                    (onClick)="exportCsv('loans')"></p-button>
        </div>
        <div class="card-body">
          @if (loanReport().length === 0) {
            <div class="empty-state">No data. Click Generate to load.</div>
          } @else {
            <table class="report-table">
              <thead><tr>
                <th>Loan #</th><th>Customer</th><th>Type</th>
                <th class="amt">Loan Amt</th><th class="amt">Collected</th><th class="amt">Balance</th>
              </tr></thead>
              <tbody>
                @for (row of loanReport(); track $index) {
                  <tr>
                    <td><strong>{{row.loan_number}}</strong></td>
                    <td>{{row.customer_name}}</td>
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
          }
        </div>
      </div>

    </div>
  `,
})
export class ReportsComponent implements OnInit {
  private data = inject(DataService);
  private msg  = inject(MessageService);
  private bookCtx = inject(BookContextStore);

  collectionReport = signal<CollectionReport[]>([]);
  loanReport       = signal<LoanReport[]>([]);
  loading          = signal(false);

  filterFrom: Date | null = null;
  filterTo:   Date | null = null;
  filterType: string | null = null;
  filterLine: string | null = null;

  readonly typeOptions = [
    { label: 'Daily',   value: 'daily'   },
    { label: 'Weekly',  value: 'weekly'  },
    { label: 'Monthly', value: 'monthly' },
  ];
  readonly lines = signal<Line[]>([]);

  ngOnInit() {
    // Default: current month
    const now = new Date();
    this.filterFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    this.filterTo   = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const bookId = this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID;
    this.data.lines.getAll(bookId).subscribe(r => this.lines.set(r.data));
    this.generate();
  }

  generate() {
    const bookId = this.bookCtx.bookId() ?? AuthStore.DEFAULT_BOOK_ID;
    const from   = this.filterFrom ? this.toISO(this.filterFrom) : this.toISO(new Date());
    const to     = this.filterTo   ? this.toISO(this.filterTo)   : this.toISO(new Date());

    const filter: ReportFilter = {
      book_id:   bookId,
      from_date: from,
      to_date:   to,
      ...(this.filterType && { loan_type: this.filterType }),
      ...(this.filterLine && { line: this.filterLine }),
    };
    this.loading.set(true);

    forkJoin({
      col:   this.data.reports.getCollectionReport(filter),
      loans: this.data.reports.getLoanReport(filter),
    }).subscribe(({ col, loans }) => {
      this.collectionReport.set(col.data ?? []);
      this.loanReport.set(loans.data ?? []);
      this.loading.set(false);
    });
  }

  exportCsv(type: 'collection' | 'loans') {
    let csv = '';
    let filename = '';
    if (type === 'collection') {
      csv = ['Date,Loan #,Customer,Mode,Amount',
             ...this.collectionReport().map(r =>
               `${r.date},${r.loan_number},"${r.customer_name}",${r.mode},${r.amount}`)
            ].join('\n');
      filename = 'collection-report.csv';
    } else {
      csv = ['Loan #,Customer,Type,Loan Amount,Collected,Balance,Issued Date,Completed',
             ...this.loanReport().map(r =>
               `${r.loan_number},"${r.customer_name}",${r.loan_type},${r.loan_amount},${r.total_collected},${r.remaining_balance},${r.issued_date},${r.completed_date ?? ''}`)
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

  private toISO(d: Date): string { return d.toISOString().slice(0, 10); }
}
