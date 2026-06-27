import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DataService } from '../../../core/services/data.service';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirm');
  if (confirm && pw !== confirm.value) { confirm.setErrors({ mismatch: true }); return { mismatch: true }; }
  return null;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PasswordModule, ButtonModule, MessageModule, CardModule],
  styles: [`
    .auth-page { min-height: 100dvh; display: flex; align-items: center; justify-content: center;
      background: var(--p-surface-ground); padding: 16px; }
    .auth-card { width: 100%; max-width: 440px; }
    .brand { text-align: center; margin-bottom: 24px; }
    .brand-title { font-size: 1.25rem; font-weight: 700; color: var(--p-primary-color); margin: 6px 0 0; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .hint { font-size: 0.75rem; color: var(--p-text-muted-color); margin-top: 4px; }
    .actions { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
    .muted { text-align: center; font-size: 0.85rem; color: var(--p-text-muted-color); margin-top: 14px; }
  `],
  template: `
    <div class="auth-page">
      <p-card styleClass="auth-card">
        <div class="brand">
          <i class="pi pi-key" style="font-size:2rem;color:var(--p-primary-color)"></i>
          <div class="brand-title">Set a new password</div>
        </div>

        @if (done()) {
          <p-message severity="success" text="Your password has been reset. You can now log in." styleClass="w-full" />
          <div class="muted"><a routerLink="/login">Go to login</a></div>
        } @else if (!token || !email) {
          <p-message severity="error" styleClass="w-full"
            text="This reset link is invalid or incomplete. Please request a new one." />
          <div class="muted"><a routerLink="/forgot-password">Request a new link</a></div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="field">
              <label>New password</label>
              <p-password formControlName="password" [toggleMask]="true" [feedback]="true"
                          styleClass="w-full" inputStyleClass="w-full" />
              <div class="hint">Min 10 chars, with upper &amp; lower case, a number and a symbol.</div>
              @if (invalid('password')) { <div class="field-error">Password doesn't meet the requirements.</div> }
            </div>
            <div class="field">
              <label>Confirm password</label>
              <p-password formControlName="confirm" [toggleMask]="true" [feedback]="false"
                          styleClass="w-full" inputStyleClass="w-full" />
              @if (form.get('confirm')?.errors?.['mismatch'] && form.get('confirm')?.touched) {
                <div class="field-error">Passwords don't match.</div>
              }
            </div>
            @if (error()) { <p-message severity="error" [text]="error()!" styleClass="w-full" /> }
            <div class="actions">
              <p-button type="submit" label="Reset password" icon="pi pi-check"
                        [loading]="loading()" styleClass="w-full" />
              <a routerLink="/login" style="text-align:center;font-size:0.85rem">Back to login</a>
            </div>
          </form>
        }
      </p-card>
    </div>
  `,
})
export class ResetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected token = '';
  protected email = '';
  protected readonly loading = signal(false);
  protected readonly done = signal(false);
  protected readonly error = signal<string | null>(null);

  // Mirror the backend policy (min 10, mixed case, number, symbol).
  protected readonly form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(10),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]],
    confirm: ['', [Validators.required]],
  }, { validators: passwordsMatch });

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  protected invalid(ctrl: string): boolean {
    const c = this.form.get(ctrl);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  protected submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set(null);
    this.data.auth.resetPassword(this.token, this.email, this.form.value.password!).subscribe({
      next: () => {
        this.loading.set(false);
        this.done.set(true);
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.status === 429
          ? 'Too many attempts. Please try again later.'
          : (err?.error?.message ?? 'This reset link is invalid or has expired.'));
      },
    });
  }
}
