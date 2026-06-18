import { signal, computed } from '@angular/core';

/**
 * Tracks the tenant a platform admin (super_admin) is currently impersonating.
 * The auth interceptor sends the slug as `X-Impersonate-Tenant`, which is the
 * ONLY way a super_admin gets access to a tenant's borrower data. Persisted so
 * it survives reloads.
 */
const _slug = signal<string | null>(localStorage.getItem('impersonate_slug'));
const _name = signal<string | null>(localStorage.getItem('impersonate_name'));

export const ImpersonationStore = {
  slug: computed(() => _slug()),
  name: computed(() => _name()),
  isActive: computed(() => !!_slug()),

  start(slug: string, name: string): void {
    _slug.set(slug);
    _name.set(name);
    localStorage.setItem('impersonate_slug', slug);
    localStorage.setItem('impersonate_name', name);
  },

  stop(): void {
    _slug.set(null);
    _name.set(null);
    localStorage.removeItem('impersonate_slug');
    localStorage.removeItem('impersonate_name');
  },
};
