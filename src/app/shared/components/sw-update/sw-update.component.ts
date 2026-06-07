import { Component, OnInit, signal, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sw-update',
  standalone: true,
  imports: [ButtonModule],
  styles: [`
    .update-bar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 2000;
      background: var(--p-primary-color); color: #fff;
      display: flex; align-items: center; justify-content: center; gap: 12px;
      padding: 10px 16px; font-size: 0.88rem; font-weight: 500;
      animation: slideDown .3s ease;
    }
    @keyframes slideDown { from { transform:translateY(-100%); } to { transform:translateY(0); } }
  `],
  template: `
    @if (showUpdate()) {
      <div class="update-bar">
        <span>New version available!</span>
        <p-button label="Reload" icon="pi pi-refresh" size="small"
                  severity="contrast" (onClick)="reload()"></p-button>
        <p-button icon="pi pi-times" [text]="true" size="small"
                  severity="contrast" (onClick)="showUpdate.set(false)"></p-button>
      </div>
    }
  `,
})
export class SwUpdateComponent implements OnInit {
  showUpdate = signal(false);
  private swUpdate = inject(SwUpdate);

  ngOnInit() {
    if (!this.swUpdate.isEnabled) return;
    this.swUpdate.versionUpdates.pipe(
      filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY')
    ).subscribe(() => this.showUpdate.set(true));
  }

  reload() { window.location.reload(); }
}
