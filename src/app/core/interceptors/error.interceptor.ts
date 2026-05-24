import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const msg = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        msg.add({ severity: 'error', summary: 'No Connection', detail: 'Check your internet connection', life: 4000 });
      } else if (error.status >= 500) {
        msg.add({ severity: 'error', summary: `Server Error (${error.status})`, detail: error.error?.message ?? 'Something went wrong', life: 4000 });
      } else if (error.status === 403) {
        msg.add({ severity: 'warn', summary: 'Access Denied', detail: 'You do not have permission for this action', life: 3000 });
      }
      return throwError(() => error);
    })
  );
};
