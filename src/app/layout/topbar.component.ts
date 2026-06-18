import { Component, computed, output, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { AuthStore } from '../core/stores/auth.store';
import { BookContextStore } from '../core/stores/book-context.store';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, ButtonModule, AvatarModule, TooltipModule, SelectModule],
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
    :host ::ng-deep .book-picker { min-width: 170px; }
    @media (max-width: 767px) {
      .user-name { display: none; }
      :host ::ng-deep .book-picker { min-width: 130px; }
    }
  `],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <p-button icon="pi pi-bars" [text]="true" [rounded]="true" severity="secondary"
                  (onClick)="menuToggle.emit()" pTooltip="Toggle menu" tooltipPosition="bottom" />
        <span class="app-title">{{ appTitle() }}</span>

        @if (bookCtx.usesPicker()) {
          <p-select [options]="bookCtx.books()" optionLabel="name" optionValue="id"
                    [ngModel]="bookCtx.selectedBookId()" (ngModelChange)="bookCtx.setBook($event)"
                    placeholder="Select book" styleClass="book-picker"
                    [filter]="bookCtx.books().length > 6" filterBy="name" appendTo="body"
                    pTooltip="Active book" tooltipPosition="bottom" />
        }
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
export class TopbarComponent implements OnInit {
  readonly menuToggle = output<void>();

  private readonly router = inject(Router);
  private readonly data = inject(DataService);
  protected readonly bookCtx = inject(BookContextStore);

  ngOnInit(): void {
    this.bookCtx.loadBooks();
  }

  protected readonly userName = computed(() => {
    const u = AuthStore.user();
    if (!u) return '';
    const name = `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim();
    return name || u.username || '';
  });

  protected readonly avatarLabel = computed(() => {
    const u = AuthStore.user();
    if (!u) return '?';
    const initials = `${u.first_name?.[0] ?? ''}${u.last_name?.[0] ?? ''}`.trim();
    return (initials || u.username?.[0] || '?').toUpperCase();
  });

  protected readonly appTitle = computed(() => 'TapNTrack');

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.data.auth.logout().subscribe(() => {
      AuthStore.clear();
      this.bookCtx.clear();
      this.router.navigate(['/login']);
    });
  }
}
