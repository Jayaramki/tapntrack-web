import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthStore } from '../../core/stores/auth.store';
import { AuthUser } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ButtonModule, TagModule, ToastModule],
  providers: [MessageService],
  styles: [`
    :host { display:block; padding:16px; max-width:600px; }
    .page-title  { font-size:1.3rem; font-weight:700; margin:0 0 24px; }
    .profile-card { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                    border-radius:16px; overflow:hidden; }
    .avatar-banner { height:80px; background:linear-gradient(135deg, var(--p-primary-color) 0%, var(--p-primary-400) 100%); }
    .avatar-wrap   { display:flex; align-items:flex-end; gap:16px; padding:0 20px; margin-top:-32px; }
    .avatar        { width:64px; height:64px; border-radius:50%; border:3px solid var(--p-surface-card);
                     background:var(--p-primary-color); display:flex; align-items:center; justify-content:center;
                     font-size:1.6rem; font-weight:700; color:#fff; flex-shrink:0; }
    .name-role     { padding-bottom:4px; }
    .full-name     { font-size:1.1rem; font-weight:700; line-height:1.2; }
    .username      { font-size:0.82rem; color:var(--p-text-muted-color); }
    .info-grid     { display:grid; grid-template-columns:1fr 1fr; gap:0; margin:0 0 0; }
    .info-cell     { padding:14px 20px; border-top:1px solid var(--p-surface-border); }
    .info-cell:nth-child(odd) { border-right:1px solid var(--p-surface-border); }
    .info-label    { font-size:0.74rem; font-weight:600; text-transform:uppercase; letter-spacing:.06em;
                     color:var(--p-text-muted-color); margin-bottom:4px; }
    .info-value    { font-size:0.92rem; font-weight:500; }
    .actions       { padding:16px 20px; border-top:1px solid var(--p-surface-border);
                     display:flex; gap:10px; flex-wrap:wrap; }
    .role-badge    { display:inline-block; padding:3px 10px; border-radius:12px; font-size:0.76rem;
                     font-weight:700; text-transform:uppercase; letter-spacing:.04em; }
    .role-super_admin { background:rgba(156,39,176,.15); color:#7B1FA2; }
    .role-book_admin  { background:rgba(33,150,243,.15);  color:#1565C0; }
    .role-field_agent { background:rgba(76,175,80,.15);   color:#2E7D32; }
    @media(max-width:480px) { .info-grid { grid-template-columns:1fr; }
      .info-cell:nth-child(odd) { border-right:none; } }
  `],
  template: `
    <p-toast />
    <h2 class="page-title">My Profile</h2>

    @if (user()) {
      <div class="profile-card">
        <div class="avatar-banner"></div>
        <div class="avatar-wrap">
          <div class="avatar">{{initials()}}</div>
          <div class="name-role">
            <div class="full-name">{{user()!.first_name}} {{user()!.last_name}}</div>
            <div class="username">@{{user()!.username}}</div>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-cell">
            <div class="info-label">Role</div>
            <div class="info-value">
              <span class="role-badge role-{{user()!.role}}">{{roleLabel()}}</span>
            </div>
          </div>
          <div class="info-cell">
            <div class="info-label">Phone</div>
            <div class="info-value">{{user()!.phone || '—'}}</div>
          </div>
          <div class="info-cell">
            <div class="info-label">Status</div>
            <div class="info-value">
              <p-tag [value]="user()!.is_active ? 'Active' : 'Inactive'"
                     [severity]="user()!.is_active ? 'success' : 'secondary'"></p-tag>
            </div>
          </div>
          <div class="info-cell">
            <div class="info-label">Book ID</div>
            <div class="info-value">{{user()!.book_id ?? 'All Books'}}</div>
          </div>
        </div>
        <div class="actions">
          <p-button label="Change Password" icon="pi pi-lock"
                    severity="secondary"
                    (onClick)="router.navigate(['/change-password'])"></p-button>
          <p-button label="Logout" icon="pi pi-sign-out"
                    severity="danger" [outlined]="true"
                    (onClick)="logout()"></p-button>
        </div>
      </div>
    }
  `,
})
export class ProfileComponent implements OnInit {
  readonly router = inject(Router);
  private  msg    = inject(MessageService);

  user = signal<AuthUser | null>(null);

  initials = () => {
    const u = this.user();
    if (!u) return '?';
    return ((u.first_name?.[0] ?? '') + (u.last_name?.[0] ?? '')) || (u.username?.[0] ?? '?');
  };

  roleLabel = () => {
    const map: Record<string, string> = {
      super_admin:  'Super Admin',
      book_admin:   'Book Admin',
      field_agent:  'Field Agent',
    };
    return map[this.user()?.role ?? ''] ?? this.user()?.role ?? '';
  };

  ngOnInit() {
    this.user.set(AuthStore.user());
  }

  logout() {
    AuthStore.clear();
    this.router.navigate(['/login']);
  }
}
