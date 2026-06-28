import { signal, computed } from '@angular/core';
import { AuthUser } from '../models/user.model';
import { DEFAULT_BOOK_ID } from '../config/app.constants';

const _authUser = signal<AuthUser | null>(null);

export const AuthStore = {
  /** Book-context fallback for super_admin on selector-less screens (former `?? 1`). */
  DEFAULT_BOOK_ID,

  user: computed(() => _authUser()),
  isAuthenticated: computed(() => !!_authUser()),
  role: computed(() => _authUser()?.role ?? null),
  bookId: computed(() => _authUser()?.book_id ?? null),
  tenantId: computed(() => _authUser()?.tenant_id ?? null),
  tenantSlug: computed(() => _authUser()?.tenant_slug ?? null),
  /** Field agent whose book hides loan balances. */
  hideBalance: computed(() => _authUser()?.hide_balance ?? false),
  /** Inverse of hideBalance — show balance columns/figures. */
  showBalance: computed(() => !(_authUser()?.hide_balance ?? false)),
  permissions: computed(() => _authUser()?.permissions ?? []),

  /** Session policy for the idle/absolute warning timers. */
  idleTimeoutMinutes: computed(() => _authUser()?.idle_timeout_minutes ?? 60),
  /** Absolute (hard) logout deadline in epoch ms, or null. */
  absoluteExpiresAt: computed(() => {
    const iso = _authUser()?.absolute_expires_at;
    return iso ? Date.parse(iso) : null;
  }),

  /** After a successful re-auth: push the new absolute deadline into the user. */
  extendAbsolute(absoluteExpiresAt: string): void {
    _authUser.update(u => (u ? { ...u, absolute_expires_at: absoluteExpiresAt } : u));
  },

  /** Last workspace slug used, for prefilling the login form (survives logout). */
  lastTenantSlug(): string | null {
    return localStorage.getItem('tenant_slug');
  },

  hasPermission(permission: string): boolean {
    return (_authUser()?.permissions ?? []).includes(permission);
  },

  /** First route the current user is permitted to see (avoids landing on a denied page). */
  landingRoute(): string {
    // Platform owner lands on the tenants console (they have no tenant data).
    if (this.hasPermission('manage-tenants')) return '/admin/tenants';
    if (this.hasPermission('view-dashboard')) return '/dashboard';
    if (this.hasPermission('view-loans')) return '/loans';
    if (this.hasPermission('record-collection')) return '/daily-entry';
    return '/profile';
  },

  setUser(user: AuthUser): void {
    // The session lives in an httpOnly cookie; only the (non-sensitive) profile is
    // held in memory, rehydrated from /auth/me on load. Nothing sensitive in storage.
    _authUser.set(user);
    if (user.tenant_slug) {
      localStorage.setItem('tenant_slug', user.tenant_slug);
    }
  },

  clear(): void {
    _authUser.set(null);
  },
};
