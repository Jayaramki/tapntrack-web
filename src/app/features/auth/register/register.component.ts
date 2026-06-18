import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { AuthStore } from '../../../core/stores/auth.store';
import { DataService } from '../../../core/services/data.service';
import { RegisterPayload } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    InputTextModule, PasswordModule, ButtonModule, MessageModule, CardModule,
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
    .auth-card { width: 100%; max-width: 460px; }
    .brand { text-align: center; margin-bottom: 24px; }
    .brand-icon { font-size: 2.5rem; color: var(--p-primary-color); }
    .brand-title { font-size: 1.5rem; font-weight: 700; color: var(--p-primary-color); margin: 8px 0 4px; }
    .brand-sub { font-size: 0.875rem; color: var(--p-text-muted-color); }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; color: var(--p-text-color); }
    .field-hint { font-size: 0.75rem; color: var(--p-text-muted-color); margin-top: 4px; }
    .field-error { font-size: 0.75rem; color: var(--p-red-500); margin-top: 4px; }
    .slug-preview { font-size: 0.75rem; color: var(--p-text-muted-color); margin-top: 4px; }
    .slug-preview b { color: var(--p-primary-color); }
    .row { display: flex; gap: 12px; }
    .row > .field { flex: 1; }
  `],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="brand">
          <i class="pi pi-bolt brand-icon"></i>
          <div class="brand-title">Start your free trial</div>
          <div class="brand-sub">Create your TapNTrack workspace in seconds</div>
        </div>

        <p-card>
          <h2 style="margin:0 0 20px; font-size:1.25rem; font-weight:600;">Create workspace</h2>

          @if (errorMessage()) {
            <p-message severity="error" [text]="errorMessage()!" styleClass="w-full mb-4" />
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field">
              <label for="tenant_name">Business / Workspace name</label>
              <input pInputText id="tenant_name" formControlName="tenant_name"
                     placeholder="e.g. Balaji Finance" class="w-full"
                     (input)="onNameInput()" [class.ng-invalid]="isInvalid('tenant_name')" />
              @if (isInvalid('tenant_name')) { <div class="field-error">Workspace name is required</div> }
            </div>

            <div class="field">
              <label for="slug">Workspace handle</label>
              <input pInputText id="slug" formControlName="slug"
                     placeholder="balaji" class="w-full" autocapitalize="off"
                     (input)="slugTouched = true" [class.ng-invalid]="isInvalid('slug')" />
              <div class="slug-preview">Your login URL: app.tapntrack.in/<b>{{ form.value.slug || 'handle' }}</b></div>
              @if (isInvalid('slug')) {
                <div class="field-error">Use 3+ lowercase letters, numbers or hyphens.</div>
              }
            </div>

            <div class="row">
              <div class="field">
                <label for="username">Admin username</label>
                <input pInputText id="username" formControlName="username"
                       placeholder="username" class="w-full" autocapitalize="off"
                       [class.ng-invalid]="isInvalid('username')" />
                @if (isInvalid('username')) { <div class="field-error">Username is required</div> }
              </div>
              <div class="field">
                <label for="password">Password</label>
                <p-password id="password" formControlName="password"
                            placeholder="Min 6 characters" [feedback]="false" [toggleMask]="true"
                            styleClass="w-full" inputStyleClass="w-full"
                            [class.ng-invalid]="isInvalid('password')" />
                @if (isInvalid('password')) { <div class="field-error">Min 6 characters</div> }
              </div>
            </div>

            <div class="field">
              <label for="email">Email <span style="font-weight:400;color:var(--p-text-muted-color)">(optional)</span></label>
              <input pInputText id="email" formControlName="email"
                     placeholder="you@example.com" class="w-full" />
            </div>

            <p-button type="submit" label="Create workspace & start trial" icon="pi pi-check"
                      [loading]="loading()" [fluid]="true" />
          </form>

          <div style="text-align:center; margin-top:16px; font-size:0.875rem;">
            Already have a workspace?
            <a routerLink="/login" style="color:var(--p-primary-color); text-decoration:none; font-weight:600;">Sign in</a>
          </div>
        </p-card>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly data = inject(DataService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected slugTouched = false;

  protected readonly form = this.fb.group({
    tenant_name: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/), Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.]+$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: [''],
  });

  /** Auto-suggest the slug from the workspace name until the user edits it. */
  protected onNameInput(): void {
    if (this.slugTouched) return;
    const slug = (this.form.value.tenant_name ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 32);
    this.form.patchValue({ slug }, { emitEvent: false });
  }

  protected isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);

    const v = this.form.value;
    const payload: RegisterPayload = {
      tenant_name: v.tenant_name!.trim(),
      slug: v.slug!.trim().toLowerCase(),
      username: v.username!.trim(),
      password: v.password!,
      ...(v.email?.trim() ? { email: v.email.trim() } : {}),
    };

    this.data.auth.register(payload).subscribe({
      next: (res) => {
        AuthStore.setUser(res.data);
        this.router.navigate([AuthStore.landingRoute()]);
      },
      error: (err) => {
        this.loading.set(false);
        const errors = err?.error?.errors as Record<string, string[]> | undefined;
        const first = errors ? Object.values(errors)[0]?.[0] : null;
        this.errorMessage.set(first ?? err?.error?.message ?? 'Registration failed. Please try again.');
      },
    });
  }
}
