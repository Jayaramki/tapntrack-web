import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';
import { AuthStore } from '../../../core/stores/auth.store';
import { Expense, ExpenseCategoryConfig } from '../../../core/models/expense.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [FormsModule, DatePipe, CurrencyPipe,
            ButtonModule, SelectModule, DatePickerModule,
            TagModule, ToastModule, TooltipModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  styles: [`
    .page-header  { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:16px; }
    .page-title   { font-size:1.25rem; font-weight:600; margin:0; }
    .filters      { display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end; margin-bottom:16px; }
    .filter-group { display:flex; flex-direction:column; gap:4px; }
    .filter-label { font-size:0.8rem; color:var(--p-text-muted-color); }
    .summary-bar  { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
    .summary-card { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                    border-radius:10px; padding:12px 18px; flex:1; min-width:130px; }
    .summary-card .label { font-size:0.75rem; color:var(--p-text-muted-color); margin-bottom:2px; }
    .summary-card .value { font-size:1.1rem; font-weight:700; }
    .expense-table { width:100%; border-collapse:collapse; font-size:0.88rem; }
    .expense-table th { text-align:left; padding:8px 12px; font-size:0.78rem; font-weight:600;
                        color:var(--p-text-muted-color); border-bottom:2px solid var(--p-surface-border);
                        background:var(--p-surface-50); }
    .expense-table td { padding:10px 12px; border-bottom:1px solid var(--p-surface-border); vertical-align:middle; }
    .expense-table tr:hover td { background:var(--p-surface-hover); }
    .expense-table tr.inactive td { opacity:0.45; }
    .amount-col  { text-align:right; font-weight:600; font-variant-numeric:tabular-nums; }
    .actions-col { text-align:right; white-space:nowrap; }
    .cat-badge   { display:inline-flex; align-items:center; gap:4px; padding:2px 8px;
                   border-radius:12px; font-size:0.76rem; font-weight:600; }
    .empty-state { text-align:center; padding:48px 0; color:var(--p-text-muted-color); }
    @media (max-width: 767px) {
      .col-category, .col-status { display: none; }
      .desc-meta { display: inline-flex; margin-left: 6px; }
    }
    @media (min-width: 768px) {
      .desc-meta { display: none; }
    }
  `],
  template: `
    <p-toast />
    <p-confirmdialog />

    <div class="page-header">
      <h1 class="page-title">Expenses</h1>
      <p-button label="Add Expense" icon="pi pi-plus" size="small"
                (onClick)="router.navigate(['/expenses/new'])" />
    </div>

    <div class="filters">
      <div class="filter-group">
        <span class="filter-label">Category</span>
        <p-select [options]="categoryFilterOptions()" optionLabel="label" optionValue="value"
                  [(ngModel)]="selectedCategory" (ngModelChange)="applyFilters()"
                  styleClass="min-w-36" />
      </div>
      <div class="filter-group">
        <span class="filter-label">Date Range</span>
        <p-datepicker [(ngModel)]="dateRange" selectionMode="range" [readonlyInput]="true"
                      (ngModelChange)="applyFilters()" placeholder="All dates"
                      dateFormat="d M yy" styleClass="min-w-48" />
      </div>
      <div class="filter-group">
        <span class="filter-label">Status</span>
        <p-select [options]="statusOptions" optionLabel="label" optionValue="value"
                  [(ngModel)]="selectedStatus" (ngModelChange)="applyFilters()"
                  styleClass="min-w-32" />
      </div>
      @if (isFiltered()) {
        <p-button label="Clear" icon="pi pi-times" size="small" [outlined]="true"
                  severity="secondary" (onClick)="clearFilters()" styleClass="align-self-end" />
      }
    </div>

    <div class="summary-bar">
      @for (cat of categories(); track cat.id) {
        <div class="summary-card">
          <div class="label">{{ cat.name }}</div>
          <div class="value" [style.color]="cat.color">{{ catTotal(cat.name) | currency:'INR':'symbol':'1.0-0' }}</div>
        </div>
      }
      <div class="summary-card" style="border-color:var(--p-primary-color)">
        <div class="label">Total (filtered)</div>
        <div class="value" style="color:var(--p-primary-color)">{{ grandTotal() | currency:'INR':'symbol':'1.0-0' }}</div>
      </div>
    </div>

    @if (loading()) {
      <div class="empty-state"><i class="pi pi-spin pi-spinner" style="font-size:2rem"></i></div>
    } @else if (filtered().length === 0) {
      <div class="empty-state">
        <i class="pi pi-inbox" style="font-size:2.5rem"></i>
        <p class="mt-2">No expenses found.</p>
      </div>
    } @else {
      <table class="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th class="col-category">Category</th>
            <th class="amount-col">Amount</th>
            <th class="col-status">Status</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (exp of filtered(); track exp.id) {
            <tr [class.inactive]="!exp.is_active">
              <td style="white-space:nowrap;color:var(--p-text-muted-color);font-size:0.82rem">
                {{ exp.expense_date | date:'d MMM yyyy' }}
              </td>
              <td>
                {{ exp.description }}
                <span class="desc-meta cat-badge"
                      [style.background]="catColor(exp.category) + '22'"
                      [style.color]="catColor(exp.category)">
                  {{ exp.category }}
                </span>
              </td>
              <td class="col-category">
                <span class="cat-badge"
                      [style.background]="catColor(exp.category) + '22'"
                      [style.color]="catColor(exp.category)">
                  {{ exp.category }}
                </span>
              </td>
              <td class="amount-col">{{ exp.amount | currency:'INR':'symbol':'1.0-0' }}</td>
              <td class="col-status">
                <p-tag [value]="exp.is_active ? 'Active' : 'Inactive'"
                       [severity]="exp.is_active ? 'success' : 'secondary'" />
              </td>
              <td class="actions-col">
                <p-button icon="pi pi-pencil" size="small" [text]="true" severity="info"
                          pTooltip="Edit" tooltipPosition="top"
                          (onClick)="router.navigate(['/expenses', exp.id, 'edit'])" />
                <p-button [icon]="exp.is_active ? 'pi pi-eye-slash' : 'pi pi-eye'"
                          size="small" [text]="true"
                          [severity]="exp.is_active ? 'warn' : 'success'"
                          [pTooltip]="exp.is_active ? 'Deactivate' : 'Activate'"
                          tooltipPosition="top"
                          (onClick)="confirmToggle(exp)" />
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
})
export class ExpenseListComponent implements OnInit {
  protected readonly router    = inject(Router);
  private  readonly data       = inject(DataService);
  private  readonly toastSvc   = inject(MessageService);
  private  readonly confirmSvc = inject(ConfirmationService);

  protected readonly loading    = signal(false);
  private  readonly expenses    = signal<Expense[]>([]);
  protected readonly filtered   = signal<Expense[]>([]);
  protected readonly categories = signal<ExpenseCategoryConfig[]>([]);

  protected selectedCategory = 'all';
  protected selectedStatus: 'all' | 'active' | 'inactive' = 'all';
  protected dateRange: Date[] | null = null;

  protected readonly categoryFilterOptions = computed(() => [
    { label: 'All Categories', value: 'all' },
    ...this.categories().map(c => ({ label: c.name, value: c.name })),
  ]);

  protected readonly statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Active',     value: 'active' },
    { label: 'Inactive',   value: 'inactive' },
  ];

  protected readonly grandTotal = computed(() =>
    this.filtered().reduce((s, e) => s + e.amount, 0)
  );

  protected catTotal(name: string): number {
    return this.filtered().filter(e => e.category === name).reduce((s, e) => s + e.amount, 0);
  }

  protected catColor(name: string): string {
    return this.categories().find(c => c.name === name)?.color ?? '#888';
  }

  protected isFiltered(): boolean {
    return this.selectedCategory !== 'all' || this.selectedStatus !== 'all' || !!this.dateRange?.[0];
  }

  ngOnInit(): void { this.load(); }

  private load(): void {
    this.loading.set(true);
    const bookId = AuthStore.bookId() ?? 1;
    forkJoin([
      this.data.expenses.getAll(bookId),
      this.data.expenses.getCategories(bookId),
    ]).subscribe(([expRes, catRes]) => {
      this.expenses.set(expRes.data);
      this.categories.set(catRes.data);
      this.applyFilters();
      this.loading.set(false);
    });
  }

  protected applyFilters(): void {
    let list = this.expenses();
    if (this.selectedCategory !== 'all')    list = list.filter(e => e.category === this.selectedCategory);
    if (this.selectedStatus === 'active')   list = list.filter(e => e.is_active);
    if (this.selectedStatus === 'inactive') list = list.filter(e => !e.is_active);
    if (this.dateRange?.[0]) {
      const from = this.dateRange[0].getTime();
      const to   = (this.dateRange[1] ?? this.dateRange[0]).getTime();
      list = list.filter(e => {
        const d = new Date(e.expense_date).getTime();
        return d >= from && d <= to;
      });
    }
    this.filtered.set(list);
  }

  protected clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedStatus   = 'all';
    this.dateRange        = null;
    this.applyFilters();
  }

  protected confirmToggle(exp: Expense): void {
    this.confirmSvc.confirm({
      message: `Are you sure you want to ${exp.is_active ? 'deactivate' : 'activate'} this expense?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.doToggle(exp),
    });
  }

  private doToggle(exp: Expense): void {
    this.data.expenses.toggleActive(exp.id).subscribe(res => {
      const updated = res.data;
      this.expenses.update(list => list.map(e => e.id === updated.id ? updated : e));
      this.applyFilters();
      this.toastSvc.add({
        severity: updated.is_active ? 'success' : 'info',
        summary: updated.is_active ? 'Activated' : 'Deactivated',
        detail: updated.description,
        life: 2000,
      });
    });
  }
}