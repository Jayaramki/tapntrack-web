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
  permissions: computed(() => _authUser()?.permissions ?? []),

  hasPermission(permission: string): boolean {
    return (_authUser()?.permissions ?? []).includes(permission);
  },

  setUser(user: AuthUser): void {
    _authUser.set(user);
    localStorage.setItem('auth_token', user.token);
    localStorage.setItem('auth_user', JSON.stringify(user));
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
