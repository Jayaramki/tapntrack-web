import { Component, computed, effect, input, output, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { AuthStore } from '../core/stores/auth.store';
import { ImpersonationStore } from '../core/stores/impersonation.store';
import { BrandStore } from '../core/stores/brand.store';
import { ResponsiveService } from '../core/services/responsive.service';

interface MenuItem {
  label: string;
  shortLabel: string;
  icon: string;
  route: string;
  permission: string;
}

// Daily-use screens — kept flat (one tap) for quick access.
const OPERATIONAL_ITEMS: MenuItem[] = [
  { label: 'Dashboard',    shortLabel: 'Home',    icon: 'pi pi-home',         route: '/dashboard',    permission: 'view-dashboard' },
  { label: 'Customers',    shortLabel: 'Customers',icon: 'pi pi-user',         route: '/customers',    permission: 'manage-customers' },
  { label: 'Loans',        shortLabel: 'Loans',   icon: 'pi pi-credit-card',  route: '/loans',        permission: 'view-loans' },
  { label: 'Pending',      shortLabel: 'Pending', icon: 'pi pi-clock',        route: '/pending-loans',permission: 'view-pending-loans' },
  { label: 'Daily Entry',  shortLabel: 'Entry',   icon: 'pi pi-plus-circle',  route: '/daily-entry',  permission: 'record-collection' },
  { label: 'Day Summary',  shortLabel: 'Summary', icon: 'pi pi-chart-bar',    route: '/day-summary',  permission: 'view-day-summary' },
  { label: 'Ledger',       shortLabel: 'Ledger',  icon: 'pi pi-table',        route: '/ledger',       permission: 'view-ledger' },
  { label: 'Expenses',     shortLabel: 'Expense', icon: 'pi pi-wallet',       route: '/expenses',     permission: 'manage-expenses' },
  { label: 'Reports',      shortLabel: 'Reports', icon: 'pi pi-chart-line',   route: '/reports',      permission: 'view-reports' },
];

// Rarely-touched admin/config screens — grouped under one collapsible header.
const ADMIN_ITEMS: MenuItem[] = [
  { label: 'Books',        shortLabel: 'Books',   icon: 'pi pi-building',     route: '/books',        permission: 'manage-books' },
  { label: 'Users',        shortLabel: 'Users',   icon: 'pi pi-users',        route: '/users',        permission: 'manage-users' },
  { label: 'Masters',      shortLabel: 'Masters', icon: 'pi pi-database',     route: '/masters',      permission: 'manage-settings' },
  { label: 'Settings',     shortLabel: 'Settings',icon: 'pi pi-cog',          route: '/settings',     permission: 'manage-settings' },
  { label: 'Plan & Usage', shortLabel: 'Plan',    icon: 'pi pi-chart-pie',    route: '/billing',      permission: 'manage-billing' },
];

// Platform-operator screens — shown only to a super_admin who is NOT
// impersonating (when impersonating, they see the tenant menu instead).
const PLATFORM_ITEMS: MenuItem[] = [
  { label: 'Tenants',      shortLabel: 'Tenants', icon: 'pi pi-sitemap',      route: '/admin/tenants',permission: 'manage-tenants' },
];

const ADMIN_ROUTES = ADMIN_ITEMS.map(i => i.route);

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TooltipModule],
  styles: [`
    :host { display: contents; }

    .sidebar {
      width: 240px;
      min-width: 240px;
      background: var(--p-surface-card);
      border-right: 1px solid var(--p-surface-border);
      transition: width 0.2s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
    .sidebar.collapsed {
      width: 64px;
      min-width: 64px;
    }

    .sidebar-brand {
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 10px;
      border-bottom: 1px solid var(--p-surface-border);
      font-weight: 700;
      font-size: 1rem;
      color: var(--p-primary-color);
      white-space: nowrap;
      overflow: hidden;
    }
    .brand-icon { font-size: 1.25rem; }

    .menu-list {
      list-style: none;
      margin: 0;
      padding: 8px 0;
      flex: 1;
      overflow-y: auto;
    }
    .menu-item a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      color: var(--p-text-color);
      text-decoration: none;
      border-radius: 6px;
      margin: 1px 8px;
      transition: background 0.15s;
      white-space: nowrap;
      overflow: hidden;
      font-size: 0.9rem;
    }
    .menu-item a:hover {
      background: var(--p-content-hover-background);
    }
    .menu-item a.active-link {
      background: var(--p-primary-50);
      color: var(--p-primary-color);
      font-weight: 600;
    }
    .menu-item i { font-size: 1rem; min-width: 1rem; }

    /* Collapsible group header (Administration) */
    .group-header {
      display: flex;
      align-items: center;
      gap: 10px;
      width: calc(100% - 16px);
      padding: 10px 16px;
      margin: 1px 8px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--p-text-color);
      border-radius: 6px;
      font-size: 0.9rem;
      font-family: inherit;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      transition: background 0.15s;
    }
    .group-header:hover { background: var(--p-content-hover-background); }
    .group-header .group-label { flex: 1; }
    .group-header .chevron { font-size: 0.75rem; min-width: 0.75rem; transition: transform 0.15s; }
    .group-header.open .chevron { transform: rotate(90deg); }
    .group-header.has-active { color: var(--p-primary-color); font-weight: 600; }

    .submenu-item a { padding-left: 38px; }
    .submenu-item i { font-size: 0.95rem; }

    .sidebar-footer {
      padding: 8px;
      border-top: 1px solid var(--p-surface-border);
    }
    .sidebar-footer a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 8px;
      color: var(--p-text-color);
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: background 0.15s;
    }
    .sidebar-footer a:hover { background: var(--p-content-hover-background); }
    .sidebar-footer a.active-link { color: var(--p-primary-color); font-weight: 600; }

    /* Bottom nav (mobile) */
    .bottom-nav {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 60px;
      background-color: #ffffff;
      border-top: 1px solid var(--p-surface-border, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 100;
      padding: 0 4px;
    }
    .bottom-nav-item a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      color: var(--p-text-muted-color);
      text-decoration: none;
      border-radius: 8px;
      min-width: 52px;
      font-size: 0.65rem;
      transition: color 0.15s;
    }
    .bottom-nav-item a.active-link {
      color: var(--p-primary-color);
    }
    .bottom-nav-item i { font-size: 1.1rem; }

    /* Mobile drawer overlay */
    .drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 200;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .drawer {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 280px;
      background-color: #ffffff;
      z-index: 201;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 4px 0 24px rgba(0,0,0,0.18);
      animation: slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to   { transform: translateX(0); }
    }

    .drawer-header {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      border-bottom: 1px solid var(--p-surface-border, #e2e8f0);
      flex-shrink: 0;
      background-color: #ffffff;
    }
    .drawer-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1rem;
      color: var(--p-primary-color);
    }
    .drawer-close {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--p-text-muted-color);
      font-size: 1.1rem;
      padding: 6px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      transition: background 0.15s, color 0.15s;
    }
    .drawer-close:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    .drawer-menu {
      list-style: none;
      margin: 0;
      padding: 8px 0;
      flex: 1;
      overflow-y: auto;
    }
    .drawer-menu li a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 13px 20px;
      color: var(--p-text-color);
      text-decoration: none;
      font-size: 0.95rem;
      transition: background 0.15s;
    }
    .drawer-menu li a:hover {
      background: var(--p-content-hover-background);
    }
    .drawer-menu li a.active-link {
      background: var(--p-primary-50);
      color: var(--p-primary-color);
      font-weight: 600;
    }
    .drawer-menu li a i { font-size: 1.15rem; min-width: 1.15rem; }

    .drawer-footer {
      padding: 8px 0;
      border-top: 1px solid var(--p-surface-border);
    }
    .drawer-footer a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 13px 20px;
      color: var(--p-text-color);
      text-decoration: none;
      font-size: 0.95rem;
      transition: background 0.15s;
    }
    .drawer-footer a:hover { background: var(--p-content-hover-background); }
    .drawer-footer a.active-link { color: var(--p-primary-color); font-weight: 600; }
  `],
  template: `
    <!-- Desktop / Tablet Sidebar -->
    @if (!responsive.isMobile()) {
      <aside class="sidebar" [class.collapsed]="collapsed()">
        <div class="sidebar-brand">
          <i class="pi pi-bolt brand-icon"></i>
          @if (!collapsed()) { <span>{{ brandName() }}</span> }
        </div>

        <ul class="menu-list">
          @for (item of platformItems(); track item.route) {
            <li class="menu-item">
              <a [routerLink]="item.route" routerLinkActive="active-link"
                 [pTooltip]="collapsed() ? item.label : ''" tooltipPosition="right">
                <i [class]="item.icon"></i>
                @if (!collapsed()) { <span>{{ item.label }}</span> }
              </a>
            </li>
          }

          @for (item of operationalItems(); track item.route) {
            <li class="menu-item">
              <a [routerLink]="item.route" routerLinkActive="active-link"
                 [pTooltip]="collapsed() ? item.label : ''" tooltipPosition="right">
                <i [class]="item.icon"></i>
                @if (!collapsed()) { <span>{{ item.label }}</span> }
              </a>
            </li>
          }

          @if (adminItems().length) {
            <li class="menu-item">
              <button type="button" class="group-header"
                      [class.open]="adminOpen()" [class.has-active]="adminActive()"
                      (click)="toggleAdmin()"
                      [pTooltip]="collapsed() ? 'Administration' : ''" tooltipPosition="right">
                <i class="pi pi-shield"></i>
                @if (!collapsed()) {
                  <span class="group-label">Administration</span>
                  <i class="pi pi-chevron-right chevron"></i>
                }
              </button>
            </li>
            @if (adminOpen() || collapsed()) {
              @for (item of adminItems(); track item.route) {
                <li class="menu-item submenu-item">
                  <a [routerLink]="item.route" routerLinkActive="active-link"
                     [pTooltip]="collapsed() ? item.label : ''" tooltipPosition="right">
                    <i [class]="item.icon"></i>
                    @if (!collapsed()) { <span>{{ item.label }}</span> }
                  </a>
                </li>
              }
            }
          }
        </ul>

        <div class="sidebar-footer">
          <a routerLink="/profile" routerLinkActive="active-link"
             [pTooltip]="collapsed() ? 'Profile' : ''" tooltipPosition="right">
            <i class="pi pi-user"></i>
            @if (!collapsed()) { <span>Profile</span> }
          </a>
        </div>
      </aside>
    }

    <!-- Mobile Bottom Navigation -->
    @if (responsive.isMobile()) {
      <nav class="bottom-nav">
        @for (item of bottomNavItems(); track item.route) {
          <div class="bottom-nav-item">
            <a [routerLink]="item.route" routerLinkActive="active-link">
              <i [class]="item.icon"></i>
              <span>{{ item.shortLabel }}</span>
            </a>
          </div>
        }
      </nav>

      <!-- Mobile slide-in drawer -->
      @if (drawerOpen()) {
        <div class="drawer-backdrop" (click)="drawerClose.emit()"></div>
        <div class="drawer">
          <div class="drawer-header">
            <div class="drawer-brand">
              <i class="pi pi-bolt brand-icon"></i>
              <span>{{ brandName() }}</span>
            </div>
            <button class="drawer-close" (click)="drawerClose.emit()">
              <i class="pi pi-times"></i>
            </button>
          </div>

          <ul class="drawer-menu">
            @for (item of platformItems(); track item.route) {
              <li>
                <a [routerLink]="item.route" routerLinkActive="active-link"
                   (click)="drawerClose.emit()">
                  <i [class]="item.icon"></i>
                  <span>{{ item.label }}</span>
                </a>
              </li>
            }

            @for (item of operationalItems(); track item.route) {
              <li>
                <a [routerLink]="item.route" routerLinkActive="active-link"
                   (click)="drawerClose.emit()">
                  <i [class]="item.icon"></i>
                  <span>{{ item.label }}</span>
                </a>
              </li>
            }

            @if (adminItems().length) {
              <li>
                <button type="button" class="group-header"
                        [class.open]="adminOpen()" [class.has-active]="adminActive()"
                        (click)="toggleAdmin()">
                  <i class="pi pi-shield"></i>
                  <span class="group-label">Administration</span>
                  <i class="pi pi-chevron-right chevron"></i>
                </button>
              </li>
              @if (adminOpen()) {
                @for (item of adminItems(); track item.route) {
                  <li class="submenu-item">
                    <a [routerLink]="item.route" routerLinkActive="active-link"
                       (click)="drawerClose.emit()">
                      <i [class]="item.icon"></i>
                      <span>{{ item.label }}</span>
                    </a>
                  </li>
                }
              }
            }
          </ul>

          <div class="drawer-footer">
            <a routerLink="/profile" routerLinkActive="active-link"
               (click)="drawerClose.emit()">
              <i class="pi pi-user"></i>
              <span>Profile</span>
            </a>
          </div>
        </div>
      }
    }
  `,
})
export class SidebarComponent {
  collapsed = input<boolean>(false);
  drawerOpen = input<boolean>(false);
  drawerClose = output<void>();

  protected readonly responsive = inject(ResponsiveService);
  protected readonly brandName = inject(BrandStore).name;
  private readonly router = inject(Router);

  // Current URL, tracked reactively so the Administration group can auto-open
  // and highlight when one of its routes is active.
  private readonly currentUrl = signal(this.router.url);

  // Platform context = a super_admin who is NOT impersonating. They operate the
  // platform (Tenants), not a workspace, so the tenant menu is hidden for them.
  private readonly platformContext = computed(() =>
    AuthStore.role() === 'super_admin' && !ImpersonationStore.isActive()
  );

  protected readonly platformItems = computed(() =>
    this.platformContext()
      ? PLATFORM_ITEMS.filter(item => AuthStore.hasPermission(item.permission))
      : []
  );
  protected readonly operationalItems = computed(() =>
    this.platformContext()
      ? []
      : OPERATIONAL_ITEMS.filter(item => AuthStore.hasPermission(item.permission))
  );
  protected readonly adminItems = computed(() =>
    this.platformContext()
      ? []
      : ADMIN_ITEMS.filter(item => AuthStore.hasPermission(item.permission))
  );

  // Bottom nav (mobile): platform items for the platform operator, else the
  // first few operational items (admin screens live in the drawer).
  protected readonly bottomNavItems = computed(() =>
    this.platformContext() ? this.platformItems() : this.operationalItems().slice(0, 5)
  );

  // Is an Administration route currently active?
  protected readonly adminActive = computed(() => {
    const url = this.currentUrl();
    return ADMIN_ROUTES.some(route => url === route || url.startsWith(route + '/'));
  });

  protected readonly adminOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.currentUrl.set(e.urlAfterRedirects));

    // Auto-expand the group when navigating into an admin screen.
    effect(() => {
      if (this.adminActive()) this.adminOpen.set(true);
    });
  }

  protected toggleAdmin(): void {
    this.adminOpen.update(open => !open);
  }
}
