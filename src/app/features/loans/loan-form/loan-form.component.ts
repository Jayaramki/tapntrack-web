import { Component, signal, inject, OnInit, computed, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';
import { AuthStore } from '../../../core/stores/auth.store';
import { Customer } from '../../../core/models/customer.model';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink, DecimalPipe,
    InputTextModule, InputNumberModule, ButtonModule, SelectModule,
    AutoCompleteModule, DatePickerModule, CardModule,
    ToastModule, MessageModule, FormsModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .form-wrap { max-width: 760px; }
    .form-grid { display: grid; grid-template-columns: 1fr; gap: 0 24px; }
    @media (min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; } }
    .field { margin-bottom: 18px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .full-width { grid-column: 1 / -1; }
    .section-title {
      font-size: 0.875rem; font-weight: 600; color: var(--p-text-muted-color);
      text-transform: uppercase; letter-spacing: 0.05em;
      margin: 20px 0 12px; padding-bottom: 6px;
      border-bottom: 1px solid var(--p-surface-border);
      grid-column: 1 / -1;
    }
    .info-panel {
      background: var(--p-surface-50); border: 1px solid var(--p-surface-border);
      border-radius: 8px; padding: 16px;
      display: flex; gap: 24px; flex-wrap: wrap;
      grid-column: 1 / -1;
    }
    .info-item { display: flex; flex-direction: column; gap: 4px; }
    .info-label { font-size: 0.75rem; color: var(--p-text-muted-color); text-transform: uppercase; letter-spacing: 0.05em; }
    .info-value { font-size: 1.1rem; font-weight: 600; }
    .form-actions { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 8px; }
    .form-actions p-button { flex: 1; min-width: 120px; }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                severity="secondary" routerLink="/loans" />
      <h1 class="page-title">{{ isEdit() ? 'Edit Loan' : 'New Loan' }}</h1>
    </div>

    <div class="form-wrap">
      <p-card>
        @if (loadError()) {
          <p-message severity="error" [text]="loadError()!" styleClass="w-full mb-4" />
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-grid">

            @if (isSuperAdmin()) {
              <div class="field full-width" style="max-width:280px">
                <label>Book <span style="color:var(--p-red-500)">*</span></label>
                <p-select formControlName="book_id" [options]="books()" optionLabel="name"
                          optionValue="id" placeholder="Select book"
                          styleClass="w-full" (onChange)="onBookChange($event.value)" />
              </div>
            }

            <div class="section-title">Loan Details</div>

            <div class="field full-width">
              <label>Customer <span style="color:var(--p-red-500)">*</span></label>
              <p-autocomplete name="customerSearch"
                              [suggestions]="customerSuggestions()"
                              [ngModel]="autocompleteCustomer()"
                              (ngModelChange)="autocompleteCustomer.set($event)"
                              [ngModelOptions]="{standalone: true}"
                              (completeMethod)="searchCustomers($event)"
                              (onSelect)="onCustomerSelected($event)"
                              (onClear)="onCustomerCleared()"
                              field="name"
                              optionLabel="name" [forceSelection]="true"
                              placeholder="Type to search customer…"
                              styleClass="w-full" inputStyleClass="w-full"
                              [class.ng-invalid]="form.get('customer_id')?.invalid && form.get('customer_id')?.touched" />
              @if (form.get('customer_id')?.invalid && form.get('customer_id')?.touched) {
                <div class="field-error">Customer is required.</div>
              }
            </div>

            <div class="field">
              <label>Loan Number <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="loan_number" placeholder="e.g. CHN-001"
                     class="w-full" [class.ng-invalid]="isInvalid('loan_number')" />
              @if (isInvalid('loan_number')) {
                <div class="field-error">Loan number is required.</div>
              }
            </div>

            <div class="field">
              <label>Loan Type <span style="color:var(--p-red-500)">*</span></label>
              <p-select formControlName="loan_type" [options]="loanTypeOptions"
                        optionLabel="label" optionValue="value"
                        placeholder="Select type" styleClass="w-full"
                        [class.ng-invalid]="isInvalid('loan_type')" />
              @if (isInvalid('loan_type')) {
                <div class="field-error">Loan type is required.</div>
              }
            </div>

            <div class="field">
              <label>Loan Amount (₹) <span style="color:var(--p-red-500)">*</span></label>
              <p-inputnumber formControlName="loan_amount" placeholder="e.g. 10000"
                             mode="decimal" [min]="1" styleClass="w-full" inputStyleClass="w-full"
                             [class.ng-invalid]="isInvalid('loan_amount')" />
              @if (isInvalid('loan_amount')) {
                <div class="field-error">Loan amount is required.</div>
              }
            </div>

            <div class="field">
              <label>Interest Amount (₹) <span style="color:var(--p-red-500)">*</span></label>
              <p-inputnumber formControlName="interest_amount" placeholder="e.g. 2000"
                             mode="decimal" [min]="0" styleClass="w-full" inputStyleClass="w-full"
                             [class.ng-invalid]="isInvalid('interest_amount')" />
              @if (isInvalid('interest_amount')) {
                <div class="field-error">Interest amount is required.</div>
              }
            </div>

            <div class="field">
              <label>Line <span style="color:var(--p-red-500)">*</span></label>
              <p-select formControlName="line" [options]="lineOptions"
                        optionLabel="label" optionValue="value"
                        placeholder="Select line" styleClass="w-full"
                        [class.ng-invalid]="isInvalid('line')" />
              @if (isInvalid('line')) {
                <div class="field-error">Line is required.</div>
              }
            </div>

            <div class="field">
              <label>Issued Date <span style="color:var(--p-red-500)">*</span></label>
              <p-datepicker formControlName="issued_date" [showIcon]="true" dateFormat="dd/mm/yy"
                            [maxDate]="today" styleClass="w-full" inputStyleClass="w-full"
                            [class.ng-invalid]="isInvalid('issued_date')" />
              @if (isInvalid('issued_date')) {
                <div class="field-error">Issued date is required.</div>
              }
            </div>

            <!-- Computed Info Panel -->
            @if (loanSummary().total > 0) {
              <div class="info-panel">
                <div class="info-item">
                  <span class="info-label">Total to Collect</span>
                  <span class="info-value">₹{{ loanSummary().total | number }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Interest %</span>
                  <span class="info-value">{{ loanSummary().interestPct }}%</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Daily Instalment</span>
                  <span class="info-value">₹{{ loanSummary().dailyAmt | number:'1.0-0' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Days to Pay</span>
                  <span class="info-value">{{ daysToPay }}</span>
                </div>
              </div>
            }

          </div>

          <div class="form-actions">
            <p-button type="submit" [label]="isEdit() ? 'Save Changes' : 'Create Loan'"
                      icon="pi pi-check" [loading]="saving()" [fluid]="true" />
            <p-button label="Cancel" icon="pi pi-times" severity="secondary"
                      [outlined]="true" routerLink="/loans" [fluid]="true" />
          </div>
        </form>
      </p-card>
    </div>
  `,
})
export class LoanFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly saving = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly loanId = signal<number | null>(null);
  protected readonly books = signal<Book[]>([]);
  protected readonly allCustomers = signal<Customer[]>([]);
  protected readonly customerSuggestions = signal<Customer[]>([]);
  protected readonly autocompleteCustomer = signal<Customer | null>(null);
  protected readonly today = new Date();

  protected readonly isEdit = computed(() => this.loanId() !== null);
  protected readonly isSuperAdmin = computed(() => AuthStore.role() === 'super_admin');

  protected readonly daysToPay = 100; // Loaded from settings in real app

  protected readonly loanSummary = computed(() => {
    const amt = this.form.get('loan_amount')?.value ?? 0;
    const interest = this.form.get('interest_amount')?.value ?? 0;
    const total = (amt as number) + (interest as number);
    const interestPct = amt > 0 ? +((interest as number / (amt as number)) * 100).toFixed(1) : 0;
    const dailyAmt = this.daysToPay > 0 ? total / this.daysToPay : 0;
    return { total, interestPct, dailyAmt };
  });

  protected readonly loanTypeOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];
  protected readonly lineOptions = ['line1','line2','line3','line4','line5','line6']
    .map(l => ({ label: l.replace('line', 'Line '), value: l }));

  protected readonly form = this.fb.group({
    book_id:         [AuthStore.bookId() ?? 1, Validators.required],
    customer_id:     [null as number | null, Validators.required],
    loan_number:     ['', Validators.required],
    loan_amount:     [null as number | null, [Validators.required, Validators.min(1)]],
    interest_amount: [null as number | null, [Validators.required, Validators.min(0)]],
    loan_type:       ['', Validators.required],
    line:            ['', Validators.required],
    issued_date:     [null as Date | null, Validators.required],
  });

  ngOnInit(): void {
    // Re-compute summary when amount/interest change
    this.form.get('loan_amount')!.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {});
    this.form.get('interest_amount')!.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {});

    const bookId = AuthStore.bookId() ?? 1;

    if (this.isSuperAdmin()) {
      this.data.books.getAll().subscribe(r => {
        this.books.set(r.data);
        this.loadCustomers(bookId);
      });
    } else {
      this.loadCustomers(bookId);
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loanId.set(Number(id));
      this.data.loans.getById(Number(id)).subscribe({
        next: (res) => {
          const l = res.data;
          this.form.patchValue({
            book_id: l.book_id,
            customer_id: l.customer_id,
            loan_number: l.loan_number,
            loan_amount: l.loan_amount,
            interest_amount: l.interest_amount,
            loan_type: l.loan_type,
            line: l.line,
            issued_date: new Date(l.issued_date),
          });
          // Resolve customer name for display
          this.data.customers.getById(l.customer_id).subscribe(cr => {
            this.autocompleteCustomer.set(cr.data);
            this.cdr.detectChanges();
          });
          this.cdr.detectChanges();
        },
        error: () => this.loadError.set('Loan not found.'),
      });
    }
  }

  private loadCustomers(bookId: number): void {
    this.data.customers.getAll(bookId).subscribe(r => this.allCustomers.set(r.data));
  }

  protected onBookChange(bookId: number): void {
    this.form.patchValue({ book_id: bookId, customer_id: null });
    this.autocompleteCustomer.set(null);
    this.loadCustomers(bookId);
  }

  protected searchCustomers(event: { query: string }): void {
    const q = event.query.toLowerCase();
    this.customerSuggestions.set(
      this.allCustomers().filter(c => c.name.toLowerCase().includes(q) && c.is_active)
    );
  }

  protected onCustomerSelected(event: { value: Customer }): void {
    this.form.patchValue({ customer_id: event.value.id });
    this.form.get('customer_id')?.markAsTouched();
  }

  protected onCustomerCleared(): void {
    this.autocompleteCustomer.set(null);
    this.form.patchValue({ customer_id: null });
  }

  protected onCustomerSelect(_event: unknown): void {} // kept for compat

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected onSubmit(): void {
    if (!this.autocompleteCustomer()) this.form.get('customer_id')?.markAsTouched();
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const v = this.form.value;
    const rawDate = v.issued_date;
    const issuedDate = rawDate instanceof Date
      ? rawDate.toISOString().split('T')[0]
      : String(rawDate ?? '');

    const payload = {
      book_id: v.book_id!, customer_id: v.customer_id!,
      loan_number: v.loan_number!, loan_amount: v.loan_amount!,
      interest_amount: v.interest_amount!, loan_type: v.loan_type! as any,
      line: v.line! as any, issued_date: issuedDate,
    };

    const req$ = this.isEdit()
      ? this.data.loans.update(this.loanId()!, payload)
      : this.data.loans.create(payload);

    req$.subscribe({
      next: (res) => {
        this.toastSvc.add({
          severity: 'success',
          summary: this.isEdit() ? 'Loan Updated' : 'Loan Created',
          detail: res.data.loan_number, life: 2500,
        });
        setTimeout(() => this.router.navigate(['/loans']), 800);
      },
      error: () => {
        this.saving.set(false);
        this.loadError.set('Failed to save. Please try again.');
      },
    });
  }
}

