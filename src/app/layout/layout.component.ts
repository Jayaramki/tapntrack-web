import { Component, signal, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';
import { ResponsiveService } from '../core/services/responsive.service';
import { InstallBannerComponent } from '../shared/components/install-banner/install-banner.component';
import { SwUpdateComponent } from '../shared/components/sw-update/sw-update.component';
import { ImpersonationStore } from '../core/stores/impersonation.store';
import { SubscriptionStore } from '../core/stores/subscription.store';
import { AuthStore } from '../core/stores/auth.store';
import { DataService } from '../core/services/data.service';
import { IdleService } from '../core/services/idle.service';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SidebarComponent, TopbarComponent, InstallBannerComponent,
            SwUpdateComponent, ToastModule, DialogModule, ButtonModule, PasswordModule],
  providers: [MessageService],
  styles: [`
    :host { display: contents; }
    .shell {
      display: flex;
      height: 100dvh;
      overflow: hidden;
      background: var(--p-surface-ground);
    }
    .main-col {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    @media (min-width: 768px)  { .content-area { padding: 24px; } }
    @media (min-width: 1024px) { .content-area { padding: 32px; } }

    /* Space so mobile content isn't hidden behind the fixed bottom nav */
    .mobile-spacer { height: 60px; flex-shrink: 0; }

    .impersonation-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: #92400e;
      color: #fff;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .impersonation-bar .grow { flex: 1; }
    .impersonation-bar .exit-btn {
      background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.4);
      color: #fff;
      padding: 4px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .impersonation-bar .exit-btn:hover { background: rgba(255,255,255,0.3); }

    .readonly-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: #b91c1c;
      color: #fff;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
  `],
  template: `
    <div class="shell">
      <app-sw-update />
      <p-toast position="bottom-right" />

      <!--
        Desktop (≥1024px): permanent inline sidebar — hamburger collapses to icon-only
        Tablet (768–1023px): permanent inline sidebar — hamburger hides/shows it
        Mobile (<768px):     no inline sidebar — bottom nav + slide-in drawer
      -->
      @if (!responsive.isMobile() && showSidebar()) {
        <app-sidebar [collapsed]="sidebarCollapsed()" />
      }

      <!-- Main column -->
      <div class="main-col">
        @if (impersonating()) {
          <div class="impersonation-bar">
            <i class="pi pi-eye"></i>
            <span class="grow">Viewing <strong>{{ impersonatingName() }}</strong> as platform admin — actions are audited.</span>
            <button class="exit-btn" (click)="exitImpersonation()">Exit</button>
          </div>
        }
        @if (readOnly()) {
          <div class="readonly-bar">
            <i class="pi pi-lock"></i>
            <span>This workspace is <strong>read-only</strong> — the subscription is {{ subStatus() }}. Renew to make changes; your data is safe.</span>
          </div>
        }
        <app-topbar (menuToggle)="onMenuToggle()" />

        <main class="content-area">
          <router-outlet />
        </main>

        <!-- Spacer keeps content above bottom nav on mobile -->
        @if (responsive.isMobile()) {
          <div class="mobile-spacer"></div>
        }
      </div>

      <!-- Mobile: bottom nav + slide-in drawer -->
      @if (responsive.isMobile()) {
        <app-sidebar [drawerOpen]="mobileDrawerOpen()" (drawerClose)="mobileDrawerOpen.set(false)" />
      }
      <app-install-banner />

      <!-- Idle warning: a click keeps the session alive -->
      <p-dialog [visible]="idle.idleWarn()" [modal]="true" [closable]="false" [draggable]="false"
                header="Still there?" [style]="{ width: '380px' }">
        <p style="margin:0">You'll be signed out in <strong>{{ idle.countdown() }}s</strong> due to inactivity.</p>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">
          <p-button label="Log out" severity="secondary" [text]="true" (onClick)="idle.logoutNow()" />
          <p-button label="Stay signed in" icon="pi pi-check" (onClick)="idle.stayActive()" />
        </div>
      </p-dialog>

      <!-- Absolute timeout: only the real user (password) can renew -->
      <p-dialog [visible]="idle.reauthWarn()" [modal]="true" [closable]="false" [draggable]="false"
                header="Confirm it's you" [style]="{ width: '410px' }">
        <p style="margin:0 0 12px">For your security, re-enter your password to keep working.
          Signing out in <strong>{{ idle.countdown() }}s</strong>.</p>
        <p-password [(ngModel)]="reauthPassword" [feedback]="false" [toggleMask]="true"
                    styleClass="w-full" inputStyleClass="w-full" placeholder="Your password"
                    (keyup.enter)="onReauth()" />
        @if (reauthError()) {
          <div style="color:var(--p-red-500);font-size:0.8rem;margin-top:6px">{{ reauthError() }}</div>
        }
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">
          <p-button label="Log out" severity="secondary" [text]="true" (onClick)="idle.logoutNow()" />
          <p-button label="Continue" icon="pi pi-lock-open" [loading]="reauthBusy()"
                    [disabled]="!reauthPassword" (onClick)="onReauth()" />
        </div>
      </p-dialog>
    </div>
  `,
})
export class LayoutComponent implements OnDestroy {
  protected readonly responsive = inject(ResponsiveService);
  private readonly admin = inject(DataService).admin;
  private readonly subscription = inject(SubscriptionStore);
  protected readonly idle = inject(IdleService);

  protected reauthPassword = '';
  protected readonly reauthError = signal<string | null>(null);
  protected readonly reauthBusy = signal(false);

  protected readonly impersonating = ImpersonationStore.isActive;
  protected readonly impersonatingName = ImpersonationStore.name;
  protected readonly readOnly = this.subscription.isReadOnly;
  protected readonly subStatus = () => this.subscription.subscription()?.status?.replace('_', ' ') ?? '';

  constructor() {
    // Load the subscription when a tenant context exists (a workspace user, or a
    // platform admin while impersonating). Drives the read-only banner.
    if (AuthStore.role() !== 'super_admin' || ImpersonationStore.isActive()) {
      this.subscription.load();
    }
    // Idle + absolute session warnings run only inside the authenticated shell.
    this.idle.start();
  }

  ngOnDestroy(): void {
    this.idle.stop();
  }

  protected onReauth(): void {
    if (!this.reauthPassword || this.reauthBusy()) return;
    this.reauthBusy.set(true);
    this.reauthError.set(null);
    this.idle.reauth(this.reauthPassword).subscribe({
      next: (res) => {
        this.idle.onReauthed(res.data.absolute_expires_at);
        this.reauthPassword = '';
        this.reauthBusy.set(false);
      },
      error: (err) => {
        this.reauthBusy.set(false);
        this.reauthError.set(err?.status === 422 ? 'Incorrect password. Try again.' : 'Could not verify — please try again.');
      },
    });
  }

  protected exitImpersonation(): void {
    const slug = ImpersonationStore.slug();
    if (slug) this.admin.stopImpersonate(slug).subscribe({ error: () => {} });
    ImpersonationStore.stop();
    // Full reload clears tenant/book state and returns to the console.
    window.location.assign('/admin/tenants');
  }

  // On tablet/desktop the sidebar is visible by default
  protected readonly showSidebar = signal(true);
  // Desktop only: collapse to icon-only mode
  protected readonly sidebarCollapsed = signal(false);
  // Mobile: slide-in drawer
  protected readonly mobileDrawerOpen = signal(false);

  onMenuToggle(): void {
    if (this.responsive.isDesktop()) {
      // Desktop hamburger → toggle icon-only collapse
      this.sidebarCollapsed.update(v => !v);
    } else if (this.responsive.isTablet()) {
      // Tablet hamburger → show/hide the whole sidebar
      this.showSidebar.update(v => !v);
    } else {
      // Mobile hamburger → open slide-in drawer
      this.mobileDrawerOpen.update(v => !v);
    }
  }
}

