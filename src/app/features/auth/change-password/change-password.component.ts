import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DataService } from '../../../core/services/data.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('newPassword');
  const confirm = control.get('confirmPassword');
  if (pw && confirm && pw.value !== confirm.value) {
    confirm.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    PasswordModule, ButtonModule, MessageModule, CardModule,
  ],
  styles: [`
    .page {
      max-width: 480px;
      margin: 0 auto;
      padding: 16px;
    }
    .page-header {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 24px;
    }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .success-box {
      text-align: center; padding: 24px 0;
    }
  `],
  template: `
    <div class="page">
      <div class="page-header">
        <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                  severity="secondary" routerLink="/profile" />
        <h1 class="page-title">Change Password</h1>
      </div>

      <p-card>
        @if (success()) {
          <div class="success-box">
            <i class="pi pi-check-circle" style="font-size:3rem; color:var(--p-green-500);"></i>
            <h3 style="margin:12px 0 8px;">Password Changed!</h3>
            <p style="color:var(--p-text-muted-color); font-size:0.875rem;">
              Your password has been updated.
            </p>
            <p-button label="Back to Profile" icon="pi pi-user"
                      routerLink="/profile" styleClass="mt-4" />
          </div>
        } @else {
          @if (errorMessage()) {
            <p-message severity="error" [text]="errorMessage()!" styleClass="w-full mb-4" />
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field">
              <label for="current">Current Password</label>
              <p-password id="current" formControlName="currentPassword"
                          placeholder="Enter current password"
                          [feedback]="false" [toggleMask]="true"
                          styleClass="w-full" inputStyleClass="w-full" />
              @if (isInvalid('currentPassword')) {
                <div class="field-error">Current password is required</div>
              }
            </div>

            <div class="field">
              <label for="newPassword">New Password</label>
              <p-password id="newPassword" formControlName="newPassword"
                          placeholder="Min. 6 characters" [toggleMask]="true"
                          styleClass="w-full" inputStyleClass="w-full" />
              @if (isInvalid('newPassword')) {
                <div class="field-error">Minimum 6 characters required</div>
              }
            </div>

            <div class="field">
              <label for="confirmPassword">Confirm New Password</label>
              <p-password id="confirmPassword" formControlName="confirmPassword"
                          placeholder="Repeat new password"
                          [feedback]="false" [toggleMask]="true"
                          styleClass="w-full" inputStyleClass="w-full" />
              @if (form.get('confirmPassword')?.errors?.['passwordMismatch'] && form.get('confirmPassword')?.touched) {
                <div class="field-error">Passwords do not match</div>
              }
            </div>

            <p-button type="submit" label="Update Password" icon="pi pi-check"
                      [loading]="loading()" [fluid]="true" />
          </form>
        }
      </p-card>
    </div>
  `,
})
export class ChangePasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly success = signal(false);

  protected readonly form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { currentPassword, newPassword } = this.form.value;
    this.data.auth.changePassword(currentPassword!, newPassword!).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Could not change password. Check your current password.');
      },
    });
  }
}

