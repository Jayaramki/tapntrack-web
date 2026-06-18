import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { AuthStore } from '../../../core/stores/auth.store';
import { DataService } from '../../../core/services/data.service';
import { currentUrlTenant } from '../../../core/config/tenant';
import { LOGIN_PRESETS } from '../../../mocks/data/users.mock';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    InputTextModule, PasswordModule, ButtonModule,
    CheckboxModule, MessageModule, CardModule,
  ],
  styles: [`
    .auth-page {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--p-surface-ground);
      padding: 16px;
    }
    .auth-card {
      width: 100%;
      max-width: 420px;
    }
    .brand {
      text-align: center;
      margin-bottom: 24px;
    }
    .brand-icon {
      font-size: 2.5rem;
      color: var(--p-primary-color);
    }
    .brand-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--p-primary-color);
      margin: 8px 0 4px;
    }
    .brand-sub {
      font-size: 0.875rem;
      color: var(--p-text-muted-color);
    }
    .field { margin-bottom: 16px; }
    .field label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--p-text-color);
    }
    .field-error {
      font-size: 0.75rem;
      color: var(--p-red-500);
      margin-top: 4px;
    }
    .form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .presets {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--p-surface-border);
    }
    .presets-label {
      font-size: 0.75rem;
      color: var(--p-text-muted-color);
      margin-bottom: 8px;
    }
    .preset-btns { display: flex; flex-wrap: wrap; gap: 6px; }
  `],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="brand">
          <i class="pi pi-bolt brand-icon"></i>
          <div class="brand-title">TapNTrack</div>
          <div class="brand-sub">Microfinance Collection System</div>
        </div>

        <p-card>
          <h2 style="margin:0 0 20px; font-size:1.25rem; font-weight:600;">Sign In</h2>

          @if (errorMessage()) {
            <p-message severity="error" [text]="errorMessage()!" styleClass="w-full mb-4" />
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            @if (urlTenant) {
              <div class="field">
                <label>Workspace</label>
                <div style="font-weight:600; color:var(--p-primary-color);">{{ urlTenant }}</div>
              </div>
            } @else {
              <div class="field">
                <label for="workspace">Workspace</label>
                <input pInputText id="workspace" formControlName="tenantSlug"
                       placeholder="your-workspace" class="w-full" autocapitalize="off" />
                <div class="field-error" style="color:var(--p-text-muted-color);">
                  Leave blank if you have a single workspace.
                </div>
              </div>
            }

            <div class="field">
              <label for="username">Username</label>
              <input pInputText id="username" formControlName="username"
                     placeholder="Enter username" class="w-full"
                     [class.ng-invalid]="isInvalid('username')" />
              @if (isInvalid('username')) {
                <div class="field-error">Username is required</div>
              }
            </div>

            <div class="field">
              <label for="password">Password</label>
              <p-password id="password" formControlName="password"
                          placeholder="Enter password" [feedback]="false" [toggleMask]="true"
                          styleClass="w-full" inputStyleClass="w-full"
                          [class.ng-invalid]="isInvalid('password')" />
              @if (isInvalid('password')) {
                <div class="field-error">Password is required</div>
              }
            </div>

            <div class="form-footer">
              <div class="flex items-center gap-2">
                <p-checkbox formControlName="rememberMe" [binary]="true" inputId="remember" />
                <label for="remember" style="font-size:0.875rem; cursor:pointer;">Remember me</label>
              </div>
              <a routerLink="/forgot-password"
                 style="font-size:0.875rem; color:var(--p-primary-color); text-decoration:none;">
                Forgot password?
              </a>
            </div>

            <p-button type="submit" label="Sign In" icon="pi pi-sign-in"
                      [loading]="loading()" [fluid]="true" />
          </form>

          <div style="text-align:center; margin-top:16px; font-size:0.875rem;">
            New here?
            <a routerLink="/register"
               style="color:var(--p-primary-color); text-decoration:none; font-weight:600;">
              Create a workspace
            </a>
          </div>

          <!-- Dev presets -->
          <div class="presets">
            <div class="presets-label">🔑 Dev login presets:</div>
            <div class="preset-btns">
              @for (preset of loginPresets; track preset.username) {
                <p-button [label]="preset.hint" size="small" [outlined]="true"
                          severity="secondary" (onClick)="fillPreset(preset)" />
              }
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly data = inject(DataService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly loginPresets = LOGIN_PRESETS;

  // When the URL is /<slug>/login the tenant is fixed by the path.
  protected readonly urlTenant = currentUrlTenant();

  protected readonly form = this.fb.group({
    tenantSlug: [this.urlTenant ?? AuthStore.lastTenantSlug() ?? ''],
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected fillPreset(preset: { username: string; password: string }): void {
    this.form.patchValue({ username: preset.username, password: preset.password });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { username, password, tenantSlug } = this.form.value;
    const slug = this.urlTenant ?? (tenantSlug?.trim().toLowerCase() || null);
    this.data.auth.login(username!, password!, slug).subscribe({
      next: (res) => {
        AuthStore.setUser(res.data);
        // The URL style you log in with is the one you keep: a flat /login lands
        // on /dashboard; a tenant /<slug>/login lands on /<slug>/dashboard — the
        // router base href set at bootstrap supplies the prefix. No reload.
        this.router.navigate([AuthStore.landingRoute()]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message ?? 'Invalid username or password');
      },
    });
  }
}

