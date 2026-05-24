import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Exact breakpoints matching our plan and Tailwind defaults
const BP_MOBILE  = '(max-width: 767px)';
const BP_TABLET  = '(min-width: 768px) and (max-width: 1023px)';
const BP_DESKTOP = '(min-width: 1024px)';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  private bp = inject(BreakpointObserver);

  isMobile = toSignal(
    this.bp.observe(BP_MOBILE).pipe(map(r => r.matches)),
    { initialValue: window.innerWidth < 768 }
  );

  isTablet = toSignal(
    this.bp.observe(BP_TABLET).pipe(map(r => r.matches)),
    { initialValue: window.innerWidth >= 768 && window.innerWidth < 1024 }
  );

  isDesktop = toSignal(
    this.bp.observe(BP_DESKTOP).pipe(map(r => r.matches)),
    { initialValue: window.innerWidth >= 1024 }
  );
}
