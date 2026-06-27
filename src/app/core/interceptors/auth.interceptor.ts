import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../stores/auth.store';
import { ImpersonationStore } from '../stores/impersonation.store';

/** Read a non-httpOnly cookie (e.g. Sanctum's XSRF-TOKEN) by name. */
function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tenantSlug = AuthStore.tenantSlug();
  const impersonateSlug = ImpersonationStore.slug();

  const headers: Record<string, string> = {};
  // Tenant the SPA is acting under; backend cross-checks it against the session.
  if (tenantSlug) headers['X-Tenant'] = tenantSlug;
  // Platform admin acting as a tenant (audited); grants scoped data access.
  if (impersonateSlug) headers['X-Impersonate-Tenant'] = impersonateSlug;
  // CSRF: echo Sanctum's readable XSRF-TOKEN cookie back as a header. Angular's
  // built-in XSRF interceptor doesn't fire cross-subdomain, so we do it here.
  const xsrf = readCookie('XSRF-TOKEN');
  if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;

  // withCredentials so the httpOnly session cookie is sent cross-subdomain.
  const authReq = req.clone({ setHeaders: headers, withCredentials: true });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        AuthStore.clear();
        // Redirect once; concurrent 401s (and the startup check) won't stack
        // history or re-trigger navigation when already heading to login.
        if (!router.url.startsWith('/login')) {
          router.navigateByUrl('/login', { replaceUrl: true });
        }
      }
      return throwError(() => error);
    })
  );
};
