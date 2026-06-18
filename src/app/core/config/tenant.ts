/**
 * Path-based tenancy (GitHub-style): the tenant slug is the first URL segment,
 * e.g. app.tapntrack.in/<slug>/login. We detect it at bootstrap and set
 * APP_BASE_HREF to `/<slug>/`, so the Angular router transparently prefixes
 * every URL and all existing absolute links keep working unchanged.
 *
 * A first segment that matches a real app route (or infra word) is NOT a tenant
 * — it's a legacy flat URL (e.g. /dashboard) which must keep working. Tenants
 * can never register these handles (the backend RESERVED_SLUGS blocks them), so
 * there is no collision.
 */
export const RESERVED_SEGMENTS = new Set<string>([
  // public auth routes
  'login', 'register', 'forgot-password', 'change-password',
  // protected app routes (first segment of every route in app.routes.ts)
  'dashboard', 'books', 'users', 'customers', 'loans', 'pending-loans',
  'daily-entry', 'day-summary', 'ledger', 'expenses', 'reports', 'masters',
  'settings', 'profile',
  // infra / reserved words
  'assets', 'api', 'admin', 'app', 'www', 'health', 'billing', 'subscription',
  'tenant', 'tenants', 'webhooks',
]);

/**
 * Returns the tenant slug from a URL path, or null when there is none
 * (root, or a reserved/route first segment). Lowercased.
 */
export function tenantFromPath(pathname: string): string | null {
  const seg = (pathname.split('/').filter(Boolean)[0] ?? '').toLowerCase();
  return seg && !RESERVED_SEGMENTS.has(seg) ? seg : null;
}

/** The tenant slug the SPA is currently being served under (null if none). */
export function currentUrlTenant(): string | null {
  return tenantFromPath(window.location.pathname);
}
