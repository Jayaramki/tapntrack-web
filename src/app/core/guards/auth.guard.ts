import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (AuthStore.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
