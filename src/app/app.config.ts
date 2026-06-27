import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { firstValueFrom, timeout } from 'rxjs';

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
    // Restore the saved session, then validate it against the server once at
    // startup so a stale/expired token bounces to login on load — instead of
    // leaving the user on a dead screen until the next API call happens to 401.
    // One quick call per cold load only; mid-session expiry is still caught by
    // the 401 handling in authInterceptor.
    provideAppInitializer(() => {
      AuthStore.loadFromStorage();
      if (!AuthStore.token()) return;
      const auth = inject(DataService).auth;
      return firstValueFrom(auth.me().pipe(timeout(8000)))
        .then(res => AuthStore.setUser(res.data))
        // Only a real 401 means the session is dead → clear it. A network error
        // or timeout shouldn't log the user out: keep the stored session and let
        // later API calls (and the interceptor's 401 handling) decide.
        .catch((err: { status?: number }) => { if (err?.status === 401) AuthStore.clear(); });
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
