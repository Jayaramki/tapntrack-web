import { Component, signal, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { rxResource } from '@angular/core/rxjs-interop';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { DashboardStats } from '../../core/models/dashboard.model';
import { PendingLoan } from '../../core/models/loan.model';
import { isoDateStr } from '../../core/utils/date.util';

type DatePreset = 'today' | 'week' | 'month' | 'custom';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, NgClass,
            ButtonModule, DatePickerModule, TagModule, TooltipModule],
  styles: [`
    :host { display:block; padding:16px; }
    .page-header  { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:20px; }
    .page-title   { font-size:1.3rem; font-weight:700; margin:0; }

    /* Date range controls */
    .date-controls { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
    .preset-group  { display:flex; gap:4px; }
    .preset-btn    { padding:4px 12px; border-radius:16px; font-size:0.82rem; cursor:pointer;
                     border:1px solid var(--p-surface-border); background:var(--p-surface-card);
                     color:var(--p-text-color); transition:all .15s; }
    .preset-btn.active { background:var(--p-primary-color); color:#fff; border-color:var(--p-primary-color); }
    .date-range-pickers { display:flex; gap:8px; align-items:center; }

    /* Section */
    .section       { margin-bottom:24px; }
    .section-title { font-size:0.82rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
                     color:var(--p-text-muted-color); margin:0 0 10px; }

    /* Cards grid */
    .cards-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(148px,1fr)); gap:12px; }
    .stat-card  { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                  border-radius:12px; padding:14px 16px; position:relative; overflow:hidden; }
    .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:12px 12px 0 0; }
    .stat-card.green::before { background:var(--p-green-500); }
    .stat-card.blue::before  { background:var(--p-blue-500); }
    .stat-card.purple::before{ background:var(--p-purple-500); }
    .stat-card.orange::before{ background:var(--p-orange-500); }
    .stat-card.red::before   { background:var(--p-red-500); }
    .stat-card.teal::before  { background:var(--p-teal-500); }
    .stat-card.amber::before  { background:var(--p-amber-500); }
    .stat-card.indigo::before { background:var(--p-indigo-500); }
    .card-label { font-size:0.75rem; color:var(--p-text-muted-color); margin-bottom:4px; }
    .card-value { font-size:1.2rem; font-weight:700; font-variant-numeric:tabular-nums; }
    .card-value.positive { color:var(--p-green-500); }
    .card-value.negative { color:var(--p-red-500); }
    .card-sub   { font-size:0.7rem; color:var(--p-text-muted-color); margin-top:2px; }

    /* Pending loans table */
    .pending-table { width:100%; border-collapse:collapse; font-size:0.87rem; }
    .pending-table th { text-align:left; padding:7px 10px; font-size:0.76rem; font-weight:600;
                        color:var(--p-text-muted-color); border-bottom:2px solid var(--p-surface-border);
                        background:var(--p-surface-50); }
    .pending-table td { padding:9px 10px; border-bottom:1px solid var(--p-surface-border); vertical-align:middle; }
    .pending-table tr:last-child td { border-bottom:none; }
    .overdue-badge { display:inline-flex; align-items:center; gap:3px;
                     padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600; }
    .overdue-badge.warn { background:rgba(var(--p-orange-500-rgb),0.15); color:var(--p-orange-500); }
    .overdue-badge.critical { background:rgba(var(--p-red-500-rgb),0.15); color:var(--p-red-500); }
    .empty-state { text-align:center; padding:32px; color:var(--p-text-muted-color); font-size:0.9rem; }

    /* Loading skeleton */
    .skeleton { background:linear-gradient(90deg, var(--p-surface-border) 25%, var(--p-surface-hover) 50%, var(--p-surface-border) 75%);
                background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:6px; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .skeleton-card { height:72px; border-radius:12px; }
    .skeleton-row  { height:40px; margin-bottom:4px; }

    @media (max-width:600px) {
      .cards-grid { grid-template-columns:repeat(2,1fr); }
      .date-controls { flex-direction:column; align-items:stretch; }
    }
  `],
  template: `
    <div class="page-header">
      <h2 class="page-title">Dashboard</h2>
      <div class="date-controls">
        <div class="preset-group">
          @for (p of presets; track p.key) {
            <button class="preset-btn" [class.active]="activePreset()===p.key" (click)="applyPreset(p.key)">{{p.label}}</button>
          }
        </div>
        @if (activePreset()==='custom') {
          <div class="date-range-pickers">
            <p-datepicker [(ngModel)]="customFrom" [showIcon]="true" dateFormat="yy-mm-dd" placeholder="From" (ngModelChange)="onCustomDateChange()"></p-datepicker>
            <span style="color:var(--p-text-muted-color)">–</span>
            <p-datepicker [(ngModel)]="customTo" [showIcon]="true" dateFormat="yy-mm-dd" placeholder="To" (ngModelChange)="onCustomDateChange()"></p-datepicker>
          </div>
        }
      </div>
    </div>

    @if (loading()) {
      <div class="section">
        <div class="section-title">Income</div>
        <div class="cards-grid">
          @for (i of [1,2,3,4]; track i) { <div class="skeleton skeleton-card"></div> }
        </div>
      </div>
      <div class="section">
        <div class="section-title">Expenses</div>
        <div class="cards-grid">
          @for (i of [1,2,3,4,5]; track i) { <div class="skeleton skeleton-card"></div> }
        </div>
      </div>
      <div class="section">
        <div class="section-title">Portfolio</div>
        <div class="cards-grid">
          @for (i of [1,2,3]; track i) { <div class="skeleton skeleton-card"></div> }
        </div>
      </div>
    } @else if (stats()) {

      <!-- INCOME -->
      <div class="section">
        <div class="section-title">�� Income  <small style="font-weight:400;text-transform:none;letter-spacing:0"> — {{rangeLabel()}}</small></div>
        <div class="cards-grid">
          <div class="stat-card green">
            <div class="card-label">Cash Collected</div>
            <div class="card-value">{{stats()!.total_cash | currency:'INR':'symbol':'1.0-0'}}</div>
          </div>
          <div class="stat-card blue">
            <div class="card-label">GPay Collected</div>
            <div class="card-value">{{stats()!.total_gpay | currency:'INR':'symbol':'1.0-0'}}</div>
          </div>
          <div class="stat-card purple">
            <div class="card-label">Total Collection</div>
            <div class="card-value">{{stats()!.total_collection | currency:'INR':'symbol':'1.0-0'}}</div>
          </div>
          <div class="stat-card teal">
            <div class="card-label">Interest Income</div>
            <div class="card-value">{{stats()!.total_interest_income | currency:'INR':'symbol':'1.0-0'}}</div>
            <div class="card-sub">All time</div>
          </div>
        </div>
      </div>

      <!-- EXPENSES -->
      <div class="section">
        <div class="section-title">🧾 Expenses</div>
        <div class="cards-grid">
          @for (cat of expCategoryEntries(); track cat[0]) {
            <div class="stat-card orange">
              <div class="card-label">{{cat[0]}}</div>
              <div class="card-value">{{cat[1] | currency:'INR':'symbol':'1.0-0'}}</div>
            </div>
          }
          <div class="stat-card red">
            <div class="card-label">Total Expenses</div>
            <div class="card-value">{{stats()!.expense_overall | currency:'INR':'symbol':'1.0-0'}}</div>
          </div>
          <div class="stat-card" [ngClass]="stats()!.net_profit >= 0 ? 'green' : 'red'">
            <div class="card-label">Net Profit</div>
            <div class="card-value" [ngClass]="stats()!.net_profit >= 0 ? 'positive' : 'negative'">
              {{stats()!.net_profit | currency:'INR':'symbol':'1.0-0'}}
            </div>
          </div>
        </div>
      </div>

      <!-- PORTFOLIO -->
      <div class="section">
        <div class="section-title">📋 Portfolio</div>
        <div class="cards-grid">
          <div class="stat-card blue">
            <div class="card-label">Active Loans</div>
            <div class="card-value">{{stats()!.active_loans}}</div>
          </div>
          <div class="stat-card amber">
            <div class="card-label">Pending / Overdue</div>
            <div class="card-value">{{stats()!.pending_loans}}</div>
            <div class="card-sub">No payment for days</div>
          </div>
          <div class="stat-card indigo">
            <div class="card-label">Total Customers</div>
            <div class="card-value">{{stats()!.total_customers}}</div>
          </div>
        </div>
      </div>

      <!-- PENDING LOANS PREVIEW -->
      <div class="section">
        <div class="section-title" style="display:flex;justify-content:space-between;align-items:center">
          <span>⚠️ Pending Loans (Top 5)</span>
          <button pButton severity="secondary" size="small" label="View All" (click)="router.navigate(['/loans/pending'])"></button>
        </div>
        @if (pendingLoans().length === 0) {
          <div class="empty-state">🎉 No overdue loans. All up to date!</div>
        } @else {
          <table class="pending-table">
            <thead>
              <tr>
                <th>Loan #</th>
                <th>Customer</th>
                <th>Type</th>
                <th style="text-align:right">Amount</th>
                <th style="text-align:right">Remaining</th>
                <th style="text-align:center">Pending Days</th>
              </tr>
            </thead>
            <tbody>
              @for (loan of pendingLoans().slice(0,5); track loan.id) {
                <tr style="cursor:pointer" (click)="router.navigate(['/loans',loan.id])">
                  <td><strong>{{loan.loan_number}}</strong></td>
                  <td>
                    @if (loan.customer_number != null) {
                      <span class="cust-num">#{{loan.customer_number}}</span>
                    }
                    {{loan.customer_name}}
                  </td>
                  <td><span style="text-transform:capitalize;font-size:0.78rem">{{loan.loan_type}}</span></td>
                  <td style="text-align:right">{{loan.loan_amount | currency:'INR':'symbol':'1.0-0'}}</td>
                  <td style="text-align:right">{{(loan.remaining_balance ?? 0) | currency:'INR':'symbol':'1.0-0'}}</td>
                  <td style="text-align:center">
                    <span class="overdue-badge" [ngClass]="loan.act_pending_days > 14 ? 'critical' : 'warn'">
                      {{loan.act_pending_days}}d
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    }
  `,
})
export class DashboardComponent {
  private data    = inject(DataService);
  private bookCtx = inject(BookContextStore);
  readonly router = inject(Router);

  activePreset = signal<DatePreset>('month');

  customFrom: Date | null = null;
  customTo:   Date | null = null;

  // The selected range drives the resource; switching preset/book/custom dates
  // updates `query` and auto-cancels a superseded load.
  private readonly query = signal<{ bookId: string; from: string; to: string } | null>(null);
  private readonly dashRes = rxResource({
    params: () => this.query(),
    stream: ({ params }) => params
      ? forkJoin({
          statsRes:   this.data.dashboard.getStats(params.bookId, params.from, params.to),
          pendingRes: this.data.loans.getPending(params.bookId),
        }).pipe(map(({ statsRes, pendingRes }) => ({
          stats: statsRes.data ?? null,
          pending: (pendingRes.data ?? []).slice().sort((a, b) => b.act_pending_days - a.act_pending_days),
        })))
      : of({ stats: null as DashboardStats | null, pending: [] as PendingLoan[] }),
    defaultValue: { stats: null as DashboardStats | null, pending: [] as PendingLoan[] },
  });
  readonly stats        = computed(() => this.dashRes.value().stats);
  readonly pendingLoans = computed(() => this.dashRes.value().pending);
  readonly loading      = this.dashRes.isLoading;

  readonly presets = [
    { key: 'today' as DatePreset, label: 'Today'     },
    { key: 'week'  as DatePreset, label: 'This Week' },
    { key: 'month' as DatePreset, label: 'This Month'},
    { key: 'custom'as DatePreset, label: 'Custom'    },
  ];

  expCategoryEntries = computed((): [string, number][] => {
    const s = this.stats();
    if (!s) return [];
    return Object.entries(s.expense_by_category) as [string, number][];
  });

  rangeLabel = computed(() => {
    const s = this.stats();
    if (!s) return '';
    if (s.date_range.from === s.date_range.to) return s.date_range.from;
    return `${s.date_range.from}  →  ${s.date_range.to}`;
  });

  constructor() {
    // Reload when the active book (top-bar picker) or the selected preset changes.
    effect(() => {
      const bookId = this.bookCtx.bookId();
      const preset = this.activePreset();
      if (!bookId || preset === 'custom') return;
      const [from, to] = this.getPresetRange(preset);
      this.query.set({ bookId, from, to });
    });
  }

  applyPreset(preset: DatePreset) {
    this.activePreset.set(preset); // effect reloads (non-custom presets)
  }

  onCustomDateChange() {
    const bookId = this.bookCtx.bookId();
    if (!bookId || !this.customFrom || !this.customTo) return;
    this.query.set({ bookId, from: isoDateStr(this.customFrom), to: isoDateStr(this.customTo) });
  }

  private getPresetRange(preset: DatePreset): [string, string] {
    const today = new Date();
    if (preset === 'today') return [isoDateStr(today), isoDateStr(today)];
    if (preset === 'week') {
      const mon = new Date(today); mon.setDate(today.getDate() - today.getDay() + 1);
      const sun = new Date(mon);   sun.setDate(mon.getDate() + 6);
      return [isoDateStr(mon), isoDateStr(sun)];
    }
    // month
    const from = new Date(today.getFullYear(), today.getMonth(), 1);
    const to   = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [isoDateStr(from), isoDateStr(to)];
  }
}
