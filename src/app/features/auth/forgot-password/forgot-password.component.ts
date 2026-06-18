import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { DataService } from '../../../core/services/data.service';
import { currentUrlTenant } from '../../../core/config/tenant';

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
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    InputTextModule, PasswordModule, ButtonModule,
    MessageModule, CardModule,
  ],
  styles: [`
    .auth-page {
      min-height: 100dvh; display: flex;
      align-items: center; justify-content: center;
      background: var(--p-surface-ground); padding: 16px;
    }
    .auth-card { width: 100%; max-width: 440px; }
    .brand { text-align: center; margin-bottom: 24px; }
    .brand-icon { font-size: 2rem; color: var(--p-primary-color); }
    .brand-title { font-size: 1.25rem; font-weight: 700; color: var(--p-primary-color); margin: 6px 0 0; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .step-indicator {
      display: flex; align-items: center; gap: 8px; margin-bottom: 20px;
      font-size: 0.875rem; color: var(--p-text-muted-color);
    }
    .step-dot {
      width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--p-surface-border);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem; font-weight: 600;
    }
    .step-dot.active { border-color: var(--p-primary-color); color: var(--p-primary-color); background: var(--p-primary-50); }
    .step-dot.done { background: var(--p-primary-color); color: #fff; border-color: var(--p-primary-color); }
    .step-line { flex: 1; height: 2px; background: var(--p-surface-border); }
    .security-question {
      padding: 12px; background: var(--p-surface-50);
      border-radius: 6px; border: 1px solid var(--p-surface-border);
      margin-bottom: 16px; font-size: 0.9rem;
    }
  `],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="brand">
          <i class="pi pi-bolt brand-icon"></i>
          <div class="brand-title">TapNTrack</div>
        </div>

        <p-card>
          <h2 style="margin:0 0 20px; font-size:1.25rem; font-weight:600;">Reset Password</h2>

          <!-- Step indicator -->
          <div class="step-indicator">
            <div class="step-dot" [class.active]="step() === 1" [class.done]="step() > 1">1</div>
            <div class="step-line"></div>
            <div class="step-dot" [class.active]="step() === 2" [class.done]="step() > 2">2</div>
            <div class="step-line"></div>
            <div class="step-dot" [class.active]="step() === 3" [class.done]="step() > 3">✓</div>
          </div>

          @if (errorMessage()) {
            <p-message severity="error" [text]="errorMessage()!" styleClass="w-full mb-4" />
          }

          <!-- Step 1: Enter username -->
          @if (step() === 1) {
            <form [formGroup]="step1Form" (ngSubmit)="onStep1()">
              <p style="font-size:0.875rem; color:var(--p-text-muted-color); margin-bottom:16px;">
                Enter your username to find your security question.
              </p>
              <div class="field">
                <label for="username">Username</label>
                <input pInputText id="username" formControlName="username"
                       placeholder="Enter your username" class="w-full"
                       [class.ng-invalid]="step1Invalid('username')" />
                @if (step1Invalid('username')) {
                  <div class="field-error">Username is required</div>
                }
              </div>
              <p-button type="submit" label="Continue" icon="pi pi-arrow-right"
                        iconPos="right" [loading]="loading()" [fluid]="true" />
            </form>
          }

          <!-- Step 2: Answer security question + new password -->
          @if (step() === 2) {
            <form [formGroup]="step2Form" (ngSubmit)="onStep2()">
              <p style="font-size:0.875rem; color:var(--p-text-muted-color); margin-bottom:12px;">
                Answer your security question and set a new password.
              </p>
              <div class="security-question">
                <strong>Security Question:</strong><br />
                {{ securityQuestion() }}
              </div>
              <div class="field">
                <label for="answer">Answer</label>
                <input pInputText id="answer" formControlName="answer"
                       placeholder="Your answer" class="w-full"
                       [class.ng-invalid]="step2Invalid('answer')" />
                @if (step2Invalid('answer')) {
                  <div class="field-error">Answer is required</div>
                }
              </div>
              <div class="field">
                <label for="newPassword">New Password</label>
                <p-password id="newPassword" formControlName="newPassword"
                            placeholder="Min. 6 characters" [toggleMask]="true"
                            styleClass="w-full" inputStyleClass="w-full" />
                @if (step2Invalid('newPassword')) {
                  <div class="field-error">Minimum 6 characters required</div>
                }
              </div>
              <div class="field">
                <label for="confirmPassword">Confirm Password</label>
                <p-password id="confirmPassword" formControlName="confirmPassword"
                            placeholder="Repeat new password" [feedback]="false" [toggleMask]="true"
                            styleClass="w-full" inputStyleClass="w-full" />
                @if (step2Form.get('confirmPassword')?.errors?.['passwordMismatch'] && step2Form.get('confirmPassword')?.touched) {
                  <div class="field-error">Passwords do not match</div>
                }
              </div>
              <div class="flex gap-2">
                <p-button label="Back" icon="pi pi-arrow-left" [outlined]="true"
                          severity="secondary" (onClick)="step.set(1)" class="flex-1" />
                <p-button type="submit" label="Reset Password" icon="pi pi-check"
                          [loading]="loading()" class="flex-1" />
              </div>
            </form>
          }

          <!-- Step 3: Success -->
          @if (step() === 3) {
            <div style="text-align:center; padding: 16px 0;">
              <i class="pi pi-check-circle" style="font-size:3rem; color:var(--p-green-500);"></i>
              <h3 style="margin:12px 0 8px;">Password Reset!</h3>
              <p style="color:var(--p-text-muted-color); font-size:0.875rem;">
                Your password has been updated successfully.
              </p>
              <p-button label="Back to Login" icon="pi pi-sign-in" routerLink="/login"
                        styleClass="mt-4" />
            </div>
          }

          @if (step() < 3) {
            <div style="text-align:center; margin-top:16px;">
              <a routerLink="/login"
                 style="font-size:0.875rem; color:var(--p-primary-color); text-decoration:none;">
                ← Back to Login
              </a>
            </div>
          }
        </p-card>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataService);

  protected readonly step = signal(1);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly securityQuestion = signal('');

  private username = '';
  // Tenant from the URL (/<slug>/forgot-password), if any.
  protected readonly urlTenant = currentUrlTenant();

  protected readonly step1Form = this.fb.group({
    username: ['', Validators.required],
  });

  protected readonly step2Form = this.fb.group({
    answer: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  protected step1Invalid(field: string): boolean {
    const c = this.step1Form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected step2Invalid(field: string): boolean {
    const c = this.step2Form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected onStep1(): void {
    if (this.step1Form.invalid) { this.step1Form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.username = this.step1Form.value.username!;
    this.data.auth.getSecurityQuestion(this.username, this.urlTenant).subscribe({
      next: (res) => {
        this.securityQuestion.set(res.data.question);
        this.loading.set(false);
        this.step.set(2);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Username not found');
      },
    });
  }

  protected onStep2(): void {
    if (this.step2Form.invalid) { this.step2Form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { answer, newPassword } = this.step2Form.value;
    this.data.auth.forgotPassword(this.username, answer!, newPassword!, this.urlTenant).subscribe({
      next: () => {
        this.loading.set(false);
        this.step.set(3);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Security answer is incorrect');
      },
    });
  }
}

