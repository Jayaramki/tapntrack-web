import { Component, computed, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { AuthStore } from '../core/stores/auth.store';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ButtonModule, AvatarModule, TooltipModule],
  styles: [`
    :host { display: contents; }
    .topbar {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      background: var(--p-surface-card);
      border-bottom: 1px solid var(--p-surface-border);
      gap: 12px;
      flex-shrink: 0;
    }
    .topbar-left { display: flex; align-items: center; gap: 10px; }
    .topbar-right { display: flex; align-items: center; gap: 8px; }
    .app-title { font-weight: 600; font-size: 1rem; color: var(--p-primary-color); }
    .user-name { font-size: 0.85rem; color: var(--p-text-muted-color); }
    @media (max-width: 767px) { .user-name { display: none; } }
  `],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <p-button icon="pi pi-bars" [text]="true" [rounded]="true" severity="secondary"
                  (onClick)="menuToggle.emit()" pTooltip="Toggle menu" tooltipPosition="bottom" />
        <span class="app-title">{{ appTitle() }}</span>
      </div>

      <div class="topbar-right">
        <span class="user-name">{{ userName() }}</span>
        <p-avatar [label]="avatarLabel()" shape="circle" size="normal"
                  styleClass="cursor-pointer" (click)="goToProfile()"
                  pTooltip="Profile" tooltipPosition="bottom" />
        <p-button icon="pi pi-sign-out" [text]="true" [rounded]="true" severity="secondary"
                  (onClick)="logout()" pTooltip="Logout" tooltipPosition="bottom" />
      </div>
    </header>
  `,
})
export class TopbarComponent {
  readonly menuToggle = output<void>();

  private readonly router = inject(Router);
  private readonly data = inject(DataService);

  protected readonly userName = computed(() => {
    const u = AuthStore.user();
    return u ? `${u.first_name} ${u.last_name}` : '';
  });

  protected readonly avatarLabel = computed(() => {
    const u = AuthStore.user();
    return u ? `${u.first_name[0]}${u.last_name[0]}`.toUpperCase() : '?';
  });

  protected readonly appTitle = computed(() => 'TapNTrack');

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.data.auth.logout().subscribe(() => {
      AuthStore.clear();
      this.router.navigate(['/login']);
    });
  }
}
