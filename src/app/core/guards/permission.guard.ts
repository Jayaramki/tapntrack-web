import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const required: string = route.data['permission'];

  if (!AuthStore.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (required && !AuthStore.hasPermission(required)) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
