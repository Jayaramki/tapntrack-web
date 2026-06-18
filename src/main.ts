import { APP_BASE_HREF } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { tenantFromPath } from './app/core/config/tenant';
import { App } from './app/app';

// Path-based tenancy: if the URL is /<slug>/..., serve the router under that
// base so every route is transparently tenant-prefixed (existing links unchanged).
const tenant = tenantFromPath(window.location.pathname);

// Normalize a bare /<slug> (no trailing slash) to /<slug>/ so the base-href
// stripping matches — otherwise the empty route can't resolve.
if (tenant && window.location.pathname === `/${tenant}`) {
  history.replaceState(history.state, '', `/${tenant}/${window.location.search}${window.location.hash}`);
}

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    ...(tenant ? [{ provide: APP_BASE_HREF, useValue: `/${tenant}/` }] : []),
  ],
})
  .catch((err) => console.error(err));
