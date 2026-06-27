import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../stores/auth.store';
import { ImpersonationStore } from '../stores/impersonation.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = AuthStore.token();
  const tenantSlug = AuthStore.tenantSlug();
  const impersonateSlug = ImpersonationStore.slug();

  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  // Tenant the SPA is acting under; backend cross-checks it against the token.
  if (tenantSlug) headers['X-Tenant'] = tenantSlug;
  // Platform admin acting as a tenant (audited); grants scoped data access.
  if (impersonateSlug) headers['X-Impersonate-Tenant'] = impersonateSlug;

  const authReq = Object.keys(headers).length ? req.clone({ setHeaders: headers }) : req;

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
