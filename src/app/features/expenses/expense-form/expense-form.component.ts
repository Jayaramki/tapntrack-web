import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';
import { AuthStore } from '../../../core/stores/auth.store';
import { ExpenseCategoryConfig } from '../../../core/models/expense.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule,
            ButtonModule, InputTextModule, InputNumberModule,
            SelectModule, DatePickerModule, ToastModule],
  providers: [MessageService],
  styles: [`
    .form-card   { max-width:560px; background:var(--p-surface-card); border:1px solid var(--p-surface-border); border-radius:12px; padding:28px; }
    .form-title  { font-size:1.15rem; font-weight:600; margin:0 0 24px; }
    .field       { display:flex; flex-direction:column; gap:6px; margin-bottom:20px; }
    .field label { font-size:0.85rem; font-weight:500; }
    .field-error { font-size:0.78rem; color:var(--p-red-500); margin-top:2px; }
    .form-footer { display:flex; gap:10px; justify-content:flex-end; margin-top:8px; }
    .back-link   { display:flex; align-items:center; gap:6px; font-size:0.85rem;
                   color:var(--p-text-muted-color); cursor:pointer; margin-bottom:16px; width:fit-content; }
    .back-link:hover { color:var(--p-primary-color); }
    .cat-dot     { width:10px; height:10px; border-radius:50%; display:inline-block; margin-right:6px; }
  `],
  template: `
    <p-toast />

    <div class="back-link" (click)="router.navigate(['/expenses'])">
      <i class="pi pi-arrow-left"></i> Back to Expenses
    </div>

    <div class="form-card">
      <h2 class="form-title">{{ isEdit ? 'Edit Expense' : 'Add Expense' }}</h2>

      @if (loading()) {
        <div class="text-center py-8" style="color:var(--p-text-muted-color)">
          <i class="pi pi-spin pi-spinner" style="font-size:1.5rem"></i>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="submit()">

          <div class="field">
            <label for="expense_date">Date <span style="color:red">*</span></label>
            <p-datepicker formControlName="expense_date" inputId="expense_date"
                          dateFormat="d M yy" [showIcon]="true"
                          [maxDate]="today" styleClass="w-full" />
            @if (form.get('expense_date')?.invalid && form.get('expense_date')?.touched) {
              <span class="field-error">Date is required</span>
            }
          </div>

          <div class="field">
            <label for="category">Category <span style="color:red">*</span></label>
            <p-select formControlName="category" inputId="category"
                      [options]="catOptions" optionLabel="label" optionValue="value"
                      placeholder="Select category" styleClass="w-full" />
            @if (form.get('category')?.invalid && form.get('category')?.touched) {
              <span class="field-error">Category is required</span>
            }
            @if (catOptions.length === 0 && !loading()) {
              <span class="field-error">
                No categories configured.
                <span (click)="router.navigate(['/settings'])" style="cursor:pointer;text-decoration:underline">
                  Add categories in Settings.
                </span>
              </span>
            }
          </div>

          <div class="field">
            <label for="amount">Amount (Rs.) <span style="color:red">*</span></label>
            <p-inputnumber formControlName="amount" inputId="amount"
                           [min]="1" mode="decimal" placeholder="0"
                           inputStyleClass="w-full" styleClass="w-full" />
            @if (form.get('amount')?.invalid && form.get('amount')?.touched) {
              <span class="field-error">Amount must be greater than 0</span>
            }
          </div>

          <div class="field">
            <label for="description">Description <span style="color:red">*</span></label>
            <input pInputText formControlName="description" id="description"
                   placeholder="e.g. Office Rent - May 2026" class="w-full" />
            @if (form.get('description')?.invalid && form.get('description')?.touched) {
              <span class="field-error">Description is required</span>
            }
          </div>

          <div class="form-footer">
            <p-button label="Cancel" [outlined]="true" severity="secondary" type="button"
                      (onClick)="router.navigate(['/expenses'])" />
            <p-button [label]="isEdit ? 'Update' : 'Save'" icon="pi pi-check"
                      type="submit" [disabled]="form.invalid || saving()" />
          </div>
        </form>
      }
    </div>
  `,
})
export class ExpenseFormComponent implements OnInit {
  protected readonly router  = inject(Router);
  private  readonly route    = inject(ActivatedRoute);
  private  readonly fb       = inject(FormBuilder);
  private  readonly data     = inject(DataService);
  private  readonly toastSvc = inject(MessageService);

  protected readonly loading = signal(false);
  protected readonly saving  = signal(false);

  protected catOptions: { label: string; value: string; color: string }[] = [];
  protected isEdit    = false;
  private   expenseId: number | null = null;
  protected readonly today = new Date();

  protected form: FormGroup = this.fb.group({
    expense_date: [new Date(), Validators.required],
    category:     [null,       Validators.required],
    amount:       [null,       [Validators.required, Validators.min(1)]],
    description:  ['',         Validators.required],
  });

  ngOnInit(): void {
    const id     = this.route.snapshot.paramMap.get('id');
    const bookId = AuthStore.bookId() ?? 1;
    this.loading.set(true);

    if (id) {
      this.isEdit    = true;
      this.expenseId = Number(id);
      forkJoin([
        this.data.expenses.getById(this.expenseId),
        this.data.expenses.getCategories(bookId),
      ]).subscribe(([expRes, catRes]) => {
        this.catOptions = catRes.data.map((c: ExpenseCategoryConfig) => ({ label: c.name, value: c.name, color: c.color }));
        const e = expRes.data;
        this.form.patchValue({
          expense_date: new Date(e.expense_date),
          category:     e.category,
          amount:       e.amount,
          description:  e.description,
        });
        this.loading.set(false);
      });
    } else {
      this.data.expenses.getCategories(bookId).subscribe(res => {
        this.catOptions = res.data.map((c: ExpenseCategoryConfig) => ({ label: c.name, value: c.name, color: c.color }));
        this.loading.set(false);
      });
    }
  }

  protected submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);

    const v      = this.form.value;
    const bookId = AuthStore.bookId() ?? 1;
    const dateStr = (v.expense_date as Date).toISOString().split('T')[0];

    const payload = {
      book_id:      bookId,
      expense_date: dateStr,
      category:     v.category as string,
      amount:       v.amount,
      description:  v.description,
    };

    const req$ = this.isEdit && this.expenseId
      ? this.data.expenses.update(this.expenseId, payload)
      : this.data.expenses.create(payload);

    req$.subscribe({
      next: () => {
        this.toastSvc.add({ severity: 'success', summary: this.isEdit ? 'Updated' : 'Saved', detail: payload.description, life: 2000 });
        setTimeout(() => this.router.navigate(['/expenses']), 800);
      },
      error: () => {
        this.saving.set(false);
        this.toastSvc.add({ severity: 'error', summary: 'Error', detail: 'Failed to save expense.' });
      },
    });
  }
}
