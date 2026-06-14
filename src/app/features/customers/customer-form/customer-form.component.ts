import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';
import { AuthStore } from '../../../core/stores/auth.store';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    InputTextModule, TextareaModule, ButtonModule,
    CheckboxModule, CardModule, ToastModule, MessageModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .form-wrap { max-width: 720px; }
    .form-grid {
      display: grid; grid-template-columns: 1fr; gap: 0 24px;
    }
    @media (min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; } }
    .field { margin-bottom: 18px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .full-width { grid-column: 1 / -1; }
    .form-actions { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 8px; }
    .form-actions p-button { flex: 1; min-width: 120px; }
    .hint { font-size: 0.75rem; color: var(--p-text-muted-color); margin-top: 4px; }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                severity="secondary" routerLink="/customers" />
      <h1 class="page-title">{{ isEdit() ? 'Edit Customer' : 'Add Customer' }}</h1>
    </div>

    <div class="form-wrap">
      <p-card>
        @if (loadError()) {
          <p-message severity="error" [text]="loadError()!" styleClass="w-full mb-4" />
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="field">
              <label>Name <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="name"
                     placeholder="Full name"
                     class="w-full" [class.ng-invalid]="isInvalid('name')" />
              @if (isInvalid('name')) {
                <div class="field-error">Name is required (2–100 chars).</div>
              }
            </div>

            <div class="field">
              <label>Father Name <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="father_name"
                     placeholder="Father's name"
                     class="w-full" [class.ng-invalid]="isInvalid('father_name')" />
              @if (isInvalid('father_name')) {
                <div class="field-error">Father name is required (2–100 chars).</div>
              }
            </div>

            <div class="field">
              <label>Phone <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="phone" placeholder="10-digit mobile"
                     class="w-full" [class.ng-invalid]="isInvalid('phone')" />
              @if (isInvalid('phone')) {
                <div class="field-error">Valid 10-digit phone required.</div>
              }
            </div>

            <div class="field">
              <label>Profession</label>
              <input pInputText formControlName="profession"
                     placeholder="e.g. Tailor, Vendor" class="w-full" />
            </div>

            <div class="field full-width">
              <label>Address <span style="color:var(--p-red-500)">*</span></label>
              <textarea pTextarea formControlName="address" rows="3"
                        placeholder="Residential address" class="w-full"
                        [class.ng-invalid]="isInvalid('address')"></textarea>
              @if (isInvalid('address')) {
                <div class="field-error">Address is required (min 5 chars).</div>
              }
            </div>

            <div class="field">
              <div class="flex items-center gap-3">
                <p-checkbox formControlName="is_active" [binary]="true" inputId="isActive" />
                <label for="isActive" style="cursor:pointer; margin:0;">Active</label>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <p-button type="submit" [label]="isEdit() ? 'Save Changes' : 'Add Customer'"
                      icon="pi pi-check" [loading]="saving()" [fluid]="true" />
            <p-button label="Cancel" icon="pi pi-times" severity="secondary"
                      [outlined]="true" routerLink="/customers" [fluid]="true" />
          </div>
        </form>
      </p-card>
    </div>
  `,
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);

  protected readonly saving = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly customerId = signal<number | null>(null);
  protected readonly isEdit = computed(() => this.customerId() !== null);

  protected readonly form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    father_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    phone:       ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address:     ['', [Validators.required, Validators.minLength(5)]],
    profession:  [''],
    is_active:   [true],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId.set(Number(id));
      this.data.customers.getById(Number(id)).subscribe({
        next: (res) => this.form.patchValue(res.data),
        error: () => this.loadError.set('Customer not found.'),
      });
    }
  }

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const v = this.form.value;
    const bookId = AuthStore.bookId() ?? 1;
    const payload = {
      book_id: bookId, name: v.name!, father_name: v.father_name!,
      phone: v.phone!, address: v.address!,
      profession: v.profession || undefined, is_active: v.is_active!,
    };

    const req$ = this.isEdit()
      ? this.data.customers.update(this.customerId()!, payload)
      : this.data.customers.create(payload);

    req$.subscribe({
      next: (res) => {
        this.toastSvc.add({
          severity: 'success',
          summary: this.isEdit() ? 'Customer Updated' : 'Customer Added',
          detail: res.data.name, life: 2500,
        });
        setTimeout(() => this.router.navigate(['/customers']), 800);
      },
      error: () => {
        this.saving.set(false);
        this.loadError.set('Failed to save. Please try again.');
      },
    });
  }
}

