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
  token: computed(() => _authUser()?.token ?? null),
  tenantId: computed(() => _authUser()?.tenant_id ?? null),
  tenantSlug: computed(() => _authUser()?.tenant_slug ?? null),
  permissions: computed(() => _authUser()?.permissions ?? []),

  /** Last workspace slug used, for prefilling the login form (survives logout). */
  lastTenantSlug(): string | null {
    return localStorage.getItem('tenant_slug');
  },

  hasPermission(permission: string): boolean {
    return (_authUser()?.permissions ?? []).includes(permission);
  },

  /** First route the current user is permitted to see (avoids landing on a denied page). */
  landingRoute(): string {
    if (this.hasPermission('view-dashboard')) return '/dashboard';
    if (this.hasPermission('view-loans')) return '/loans';
    if (this.hasPermission('record-collection')) return '/daily-entry';
    return '/profile';
  },

  setUser(user: AuthUser): void {
    _authUser.set(user);
    localStorage.setItem('auth_token', user.token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    // Remember the workspace so the login form can prefill it next time.
    if (user.tenant_slug) {
      localStorage.setItem('tenant_slug', user.tenant_slug);
    }
  },

  loadFromStorage(): void {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        _authUser.set(JSON.parse(stored));
      } catch {
        _authUser.set(null);
      }
    }
  },

  clear(): void {
    _authUser.set(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
};
