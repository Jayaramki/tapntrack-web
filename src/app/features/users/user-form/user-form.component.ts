import { Component, signal, inject, OnInit, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';
import { Book } from '../../../core/models/book.model';
import { AuthStore } from '../../../core/stores/auth.store';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('password');
  const confirm = control.get('confirmPassword');
  if (pw && confirm && pw.value && pw.value !== confirm.value) {
    confirm.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

/** Empty is allowed (edit = keep current); a provided value must match the
 *  backend policy (min 10, mixed case, number, symbol). */
function strongOrEmpty(c: AbstractControl): ValidationErrors | null {
  const v = c.value as string;
  if (!v) return null;
  const ok = v.length >= 10 && /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);
  return ok ? null : { weakPassword: true };
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    InputTextModule, PasswordModule, ButtonModule,
    SelectModule, CardModule, ToastModule, MessageModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .form-wrap { max-width: 720px; }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0 24px;
    }
    @media (min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; } }
    .field { margin-bottom: 18px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .section-title {
      font-size: 0.875rem; font-weight: 600; color: var(--p-text-muted-color);
      text-transform: uppercase; letter-spacing: 0.05em;
      margin: 20px 0 12px; padding-bottom: 6px;
      border-bottom: 1px solid var(--p-surface-border);
      grid-column: 1 / -1;
    }
    .full-width { grid-column: 1 / -1; }
    .form-actions { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 8px; }
    .form-actions p-button { flex: 1; min-width: 120px; }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                severity="secondary" routerLink="/users" />
      <h1 class="page-title">{{ isEdit() ? 'Edit User' : 'Add User' }}</h1>
    </div>

    <div class="form-wrap">
      <p-card>
        @if (loadError()) {
          <p-message severity="error" [text]="loadError()!" styleClass="w-full mb-4" />
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Personal -->
            <div class="section-title">Personal Info</div>

            <div class="field">
              <label>First Name <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="first_name" placeholder="First name"
                     class="w-full" [class.ng-invalid]="isInvalid('first_name')" />
              @if (isInvalid('first_name')) {
                <div class="field-error">First name is required (2–50 chars).</div>
              }
            </div>

            <div class="field">
              <label>Last Name <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="last_name" placeholder="Last name"
                     class="w-full" [class.ng-invalid]="isInvalid('last_name')" />
              @if (isInvalid('last_name')) {
                <div class="field-error">Last name is required (2–50 chars).</div>
              }
            </div>

            <div class="field">
              <label>Phone</label>
              <input pInputText formControlName="phone" placeholder="10-digit mobile"
                     class="w-full" />
            </div>

            <div class="field">
              <label>Email <span style="font-weight:400;color:var(--p-text-muted-color)">(for password reset)</span></label>
              <input pInputText type="email" formControlName="email" placeholder="user@example.com"
                     class="w-full" [class.ng-invalid]="isInvalid('email')" />
              @if (isInvalid('email')) { <div class="field-error">Enter a valid email.</div> }
            </div>

            <!-- Account -->
            <div class="section-title">Account</div>

            <div class="field">
              <label>Username <span style="color:var(--p-red-500)">*</span></label>
              <input pInputText formControlName="username" placeholder="Unique username"
                     class="w-full" [class.ng-invalid]="isInvalid('username')" />
              @if (isInvalid('username')) {
                <div class="field-error">Username required (4–50 alphanumeric chars).</div>
              }
            </div>

            <div class="field">
              <label>Role <span style="color:var(--p-red-500)">*</span></label>
              <p-select formControlName="role" [options]="roleOptions()" optionLabel="label"
                        optionValue="value" placeholder="Select role"
                        styleClass="w-full" [class.ng-invalid]="isInvalid('role')" />
              @if (isInvalid('role')) {
                <div class="field-error">Role is required.</div>
              }
            </div>

            @if (showBookField()) {
              <div class="field">
                <label>Book <span style="color:var(--p-red-500)">*</span></label>
                <p-select formControlName="book_id" [options]="books()" optionLabel="name"
                          optionValue="id" placeholder="Select book"
                          styleClass="w-full" [class.ng-invalid]="isInvalid('book_id')" />
                @if (isInvalid('book_id')) {
                  <div class="field-error">Book is required.</div>
                }
              </div>
            }

            <div class="section-title">{{ isEdit() ? 'Reset Password (optional)' : 'Password' }}</div>
            <div class="field">
              <label>
                @if (isEdit()) { New Password } @else { Password <span style="color:var(--p-red-500)">*</span> }
              </label>
              <p-password formControlName="password"
                          [placeholder]="isEdit() ? 'Leave blank to keep current' : 'Strong password'"
                          [toggleMask]="true" styleClass="w-full" inputStyleClass="w-full" />
              <div class="field-error" style="color:var(--p-text-muted-color)">Min 10 chars, upper &amp; lower, number, symbol.</div>
              @if (isInvalid('password')) {
                <div class="field-error">Password doesn't meet the requirements.</div>
              }
            </div>
            @if (!isEdit() || form.get('password')?.value) {
              <div class="field">
                <label>Confirm Password <span style="color:var(--p-red-500)">*</span></label>
                <p-password formControlName="confirmPassword" placeholder="Repeat password"
                            [feedback]="false" [toggleMask]="true"
                            styleClass="w-full" inputStyleClass="w-full" />
                @if (form.get('confirmPassword')?.errors?.['passwordMismatch'] && form.get('confirmPassword')?.touched) {
                  <div class="field-error">Passwords do not match.</div>
                }
              </div>
            }
          </div>

          <div class="form-actions">
            <p-button type="submit" [label]="isEdit() ? 'Save Changes' : 'Create User'"
                      icon="pi pi-check" [loading]="saving()" [fluid]="true" />
            <p-button label="Cancel" icon="pi pi-times" severity="secondary"
                      [outlined]="true" routerLink="/users" [fluid]="true" />
          </div>
        </form>
      </p-card>
    </div>
  `,
})
export class UserFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);

  protected readonly saving = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly userId = signal<string | null>(null);
  protected readonly books = signal<Book[]>([]);
  protected readonly selectedRole = signal<string>('');
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isEdit = computed(() => this.userId() !== null);
  protected readonly isSuperAdmin = computed(() => AuthStore.role() === 'super_admin');

  protected readonly roleOptions = computed<{label: string; value: string}[]>(() => {
    const role = AuthStore.role();
    if (role === 'book_admin') {
      return [{ label: 'Field Agent', value: 'field_agent' }];
    }
    if (role === 'tenant_admin') {
      // Tenant admins manage their own books/agents, not the platform.
      return [
        { label: 'Book Admin', value: 'book_admin' },
        { label: 'Field Agent', value: 'field_agent' },
      ];
    }
    return [
      { label: 'Super Admin', value: 'super_admin' },
      { label: 'Tenant Admin', value: 'tenant_admin' },
      { label: 'Book Admin', value: 'book_admin' },
      { label: 'Field Agent', value: 'field_agent' },
    ];
  });

  protected readonly showBookField = computed(() => {
    const current = AuthStore.role();
    if (current !== 'super_admin' && current !== 'tenant_admin') return false;
    const role = this.selectedRole();
    return role === 'book_admin' || role === 'field_agent';
  });

  protected readonly form = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    last_name:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    username:   ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    role:       ['', Validators.required],
    book_id:    [null as string | null],
    phone:      [''],
    email:      ['', [Validators.email]],
    password:   [''],
    confirmPassword: [''],
  }, { validators: passwordMatchValidator });

  ngOnInit(): void {
    // Keep selectedRole signal in sync with the form control
    this.form.get('role')!.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.selectedRole.set(v ?? ''));

    this.data.books.getAll().subscribe(res => this.books.set(res.data));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId.set(id);
      // Edit: password optional (blank = keep current), but strong if provided.
      this.form.get('password')?.setValidators([strongOrEmpty]);
      this.form.get('confirmPassword')?.clearValidators();
      this.data.users.getById(id).subscribe({
        next: (res) => {
          const u = res.data;
          this.form.patchValue({
            first_name: u.first_name, last_name: u.last_name,
            username: u.username, role: u.role,
            book_id: u.book_id, phone: u.phone ?? '', email: u.email ?? '',
          });
          this.selectedRole.set(u.role);
        },
        error: () => this.loadError.set('User not found.'),
      });
    } else {
      this.form.get('password')?.setValidators([Validators.required, strongOrEmpty]);
      this.form.get('confirmPassword')?.setValidators(Validators.required);
    }
    // Pre-fill book for BookAdmin
    if (AuthStore.role() === 'book_admin') {
      this.form.patchValue({ book_id: AuthStore.bookId(), role: 'field_agent' });
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
    const payload: any = {
      first_name: v.first_name!, last_name: v.last_name!,
      username: v.username!, role: v.role!,
      book_id: v.book_id ?? null, phone: v.phone || undefined,
      email: v.email || undefined,
    };
    // Password on create, or on edit only when an admin enters a new one.
    if (v.password) payload.password = v.password;

    const req$ = this.isEdit()
      ? this.data.users.update(this.userId()!, payload)
      : this.data.users.create(payload);

    req$.subscribe({
      next: (res) => {
        this.toastSvc.add({
          severity: 'success',
          summary: this.isEdit() ? 'User Updated' : 'User Created',
          detail: `${res.data.first_name} ${res.data.last_name}`,
          life: 2500,
        });
        setTimeout(() => this.router.navigate(['/users']), 800);
      },
      error: () => {
        this.saving.set(false);
        this.loadError.set('Failed to save. Please try again.');
      },
    });
  }
}

