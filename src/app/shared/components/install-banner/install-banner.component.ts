import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-install-banner',
  standalone: true,
  imports: [ButtonModule],
  styles: [`
    .install-banner {
      position: fixed; bottom: 70px; left: 50%; transform: translateX(-50%);
      background: var(--p-surface-card); border: 1px solid var(--p-surface-border);
      border-radius: 14px; padding: 12px 16px;
      display: flex; align-items: center; gap: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,.18); z-index: 1000;
      max-width: 360px; width: calc(100vw - 32px);
      animation: slideUp .3s ease;
    }
    @keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    .banner-icon { font-size: 1.8rem; flex-shrink: 0; }
    .banner-text { flex: 1; }
    .banner-text strong { display: block; font-size: 0.9rem; }
    .banner-text small  { color: var(--p-text-muted-color); font-size: 0.78rem; }
    .banner-actions { display: flex; gap: 6px; flex-shrink: 0; }
    @media (min-width: 768px) { .install-banner { bottom: 24px; } }
  `],
  template: `
    @if (showBanner()) {
      <div class="install-banner" role="banner">
        <span class="banner-icon">📲</span>
        <div class="banner-text">
          <strong>Add to Home Screen</strong>
          <small>Install TapNTrack for quick access</small>
        </div>
        <div class="banner-actions">
          <p-button label="Install" size="small" (onClick)="install()"></p-button>
          <p-button icon="pi pi-times" [text]="true" size="small" severity="secondary" (onClick)="dismiss()"></p-button>
        </div>
      </div>
    }
  `,
})
export class InstallBannerComponent implements OnInit {
  showBanner = signal(false);
  private deferredPrompt: any = null;

  ngOnInit() {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (sessionStorage.getItem('pwa-banner-dismissed')) return;
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showBanner.set(true);
    });
  }

  install() {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then(() => {
      this.deferredPrompt = null;
      this.showBanner.set(false);
    });
  }

  dismiss() {
    sessionStorage.setItem('pwa-banner-dismissed', '1');
    this.showBanner.set(false);
  }
}
