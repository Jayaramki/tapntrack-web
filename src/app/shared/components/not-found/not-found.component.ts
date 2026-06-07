import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonModule],
  styles: [`
    :host { display:flex; align-items:center; justify-content:center; min-height:100dvh;
            background:var(--p-surface-ground); }
    .wrap { text-align:center; padding:32px; max-width:400px; }
    .big  { font-size:6rem; font-weight:900; line-height:1;
            background:linear-gradient(135deg, var(--p-primary-color), var(--p-primary-400));
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .title { font-size:1.4rem; font-weight:700; margin:8px 0 4px; }
    .sub   { color:var(--p-text-muted-color); font-size:0.92rem; margin-bottom:24px; }
    .actions { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
  `],
  template: `
    <div class="wrap">
      <div class="big">404</div>
      <div class="title">Page not found</div>
      <p class="sub">The page you're looking for doesn't exist or has been moved.</p>
      <div class="actions">
        <p-button label="Go to Dashboard" icon="pi pi-home" (onClick)="router.navigate(['/dashboard'])"></p-button>
        <p-button label="Go Back" icon="pi pi-arrow-left" severity="secondary"
                  (onClick)="history.back()"></p-button>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  constructor(readonly router: Router) {}
  readonly history = window.history;
}
