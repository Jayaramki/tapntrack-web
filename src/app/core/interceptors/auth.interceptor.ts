import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../stores/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = AuthStore.token();
  const tenantSlug = AuthStore.tenantSlug();

  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  // Tenant the SPA is acting under; backend cross-checks it against the token.
  if (tenantSlug) headers['X-Tenant'] = tenantSlug;

  const authReq = Object.keys(headers).length ? req.clone({ setHeaders: headers }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        AuthStore.clear();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
