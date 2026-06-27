import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputTextModule, ButtonModule, MessageModule, CardModule],
  styles: [`
    .auth-page { min-height: 100dvh; display: flex; align-items: center; justify-content: center;
      background: var(--p-surface-ground); padding: 16px; }
    .auth-card { width: 100%; max-width: 440px; }
    .brand { text-align: center; margin-bottom: 24px; }
    .brand-title { font-size: 1.25rem; font-weight: 700; color: var(--p-primary-color); margin: 6px 0 0; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .actions { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
    .muted { text-align: center; font-size: 0.85rem; color: var(--p-text-muted-color); margin-top: 14px; }
  `],
  template: `
    <div class="auth-page">
      <p-card styleClass="auth-card">
        <div class="brand">
          <i class="pi pi-lock" style="font-size:2rem;color:var(--p-primary-color)"></i>
          <div class="brand-title">Reset your password</div>
        </div>

        @if (sent()) {
          <p-message severity="success" styleClass="w-full"
            text="If that email is registered, a reset link has been sent. Check your inbox (and spam)." />
          <div class="muted"><a routerLink="/login">Back to login</a></div>
        } @else {
          <p style="font-size:0.88rem;color:var(--p-text-muted-color);margin-bottom:16px">
            Enter your account email and we'll send you a link to set a new password.
          </p>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="field">
              <label>Email</label>
              <input pInputText type="email" formControlName="email" class="w-full"
                     placeholder="you@example.com" autocomplete="email"
                     [class.ng-invalid]="invalid('email')" />
              @if (invalid('email')) { <div class="field-error">Enter a valid email.</div> }
            </div>
            @if (error()) { <p-message severity="error" [text]="error()!" styleClass="w-full" /> }
            <div class="actions">
              <p-button type="submit" label="Send reset link" icon="pi pi-send"
                        [loading]="loading()" styleClass="w-full" />
              <a routerLink="/login" style="text-align:center;font-size:0.85rem">Back to login</a>
            </div>
          </form>
        }
      </p-card>
    </div>
  `,
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataService);

  protected readonly loading = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected invalid(ctrl: string): boolean {
    const c = this.form.get(ctrl);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  protected submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set(null);
    this.data.auth.forgotPassword(this.form.value.email!).subscribe({
      // Always show the same neutral confirmation (no account enumeration).
      next: () => { this.loading.set(false); this.sent.set(true); },
      error: (err) => {
        this.loading.set(false);
        // 429 (rate limited) is the only error worth surfacing; otherwise stay neutral.
        if (err?.status === 429) this.error.set('Too many attempts. Please try again later.');
        else this.sent.set(true);
      },
    });
  }
}
