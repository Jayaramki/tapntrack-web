import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { firstValueFrom, timeout, switchMap } from 'rxjs';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { AppTheme } from './core/theme';
import { provideServiceWorker } from '@angular/service-worker';
import { AuthStore } from './core/stores/auth.store';
import { DataService } from './core/services/data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    // Cookie-based session (Sanctum SPA): on load, prime the CSRF cookie then ask
    // /auth/me who we are. A valid session cookie → rehydrate the user; a 401 →
    // not logged in (the guard redirects to login). One quick call per cold load;
    // network errors / timeouts (8s) leave us logged-out rather than hanging.
    provideAppInitializer(() => {
      const auth = inject(DataService).auth;
      return firstValueFrom(auth.csrf().pipe(switchMap(() => auth.me()), timeout(8000)))
        .then(res => AuthStore.setUser(res.data))
        .catch(() => AuthStore.clear());
    }),
    // Root-level MessageService so the errorInterceptor (root injector) can
    // always resolve it. Components may still provide their own for local toasts.
    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: AppTheme,
        options: { darkModeSelector: '.dark-mode' },
      },
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
