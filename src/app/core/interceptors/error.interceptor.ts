import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const msg = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const code = error.error?.errors?.code;
      if (error.status === 0) {
        msg.add({ severity: 'error', summary: 'No Connection', detail: 'Check your internet connection', life: 4000 });
      } else if (error.status >= 500) {
        msg.add({ severity: 'error', summary: `Server Error (${error.status})`, detail: error.error?.message ?? 'Something went wrong', life: 4000 });
      } else if (error.status === 402) {
        msg.add({ severity: 'warn', summary: 'Upgrade required', detail: error.error?.message ?? 'You have reached your plan limit.', life: 5000 });
      } else if (error.status === 403 && code === 'subscription_inactive') {
        msg.add({ severity: 'warn', summary: 'Read-only', detail: error.error?.message ?? 'Your subscription is inactive.', life: 5000 });
      } else if (error.status === 403) {
        msg.add({ severity: 'warn', summary: 'Access Denied', detail: 'You do not have permission for this action', life: 3000 });
      }
      return throwError(() => error);
    })
  );
};
