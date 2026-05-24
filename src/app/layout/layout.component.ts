import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';
import { ResponsiveService } from '../core/services/responsive.service';
import { InstallBannerComponent } from '../shared/components/install-banner/install-banner.component';
import { SwUpdateComponent } from '../shared/components/sw-update/sw-update.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, InstallBannerComponent, SwUpdateComponent, ToastModule],
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
    </div>
  `,
})
export class LayoutComponent {
  protected readonly responsive = inject(ResponsiveService);

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

