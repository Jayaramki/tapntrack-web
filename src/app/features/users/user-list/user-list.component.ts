import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UserRole } from '../../../core/models/user.model';
import { Book } from '../../../core/models/book.model';
import { DataService } from '../../../core/services/data.service';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { AuthStore } from '../../../core/stores/auth.store';

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  book_admin: 'Book Admin',
  field_agent: 'Field Agent',
};
const ROLE_SEVERITY: Record<UserRole, string> = {
  super_admin: 'danger',
  book_admin: 'warn',
  field_agent: 'info',
};

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    FormsModule, TableModule, ButtonModule, InputTextModule,
    TagModule, SelectModule, ConfirmDialogModule, ToastModule,
    TooltipModule, IconFieldModule, InputIconModule,
  ],
  providers: [ConfirmationService, MessageService],
  styles: [`
    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
    }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .user-name { font-weight: 500; }
    .user-username { font-size: 0.8rem; color: var(--p-text-muted-color); }
  `],
  template: `
    <p-toast />
    <p-confirmDialog />

    <div class="page-header">
      <h1 class="page-title">Users</h1>
      <div class="toolbar">
        <p-iconfield>
          <p-inputicon styleClass="pi pi-search" />
          <input pInputText [(ngModel)]="searchTerm" placeholder="Search…" style="width:180px" />
        </p-iconfield>
        @if (!responsive.isMobile()) {
          <p-select [(ngModel)]="filterRole" [options]="roleOptions" optionLabel="label"
                    optionValue="value" placeholder="All Roles" [showClear]="true"
                    style="width:140px" />
        }
        <p-button label="Add User" icon="pi pi-plus"
                  (onClick)="router.navigate(['/users/new'])" />
      </div>
    </div>

    <p-table [value]="filtered()" [loading]="loading()" [paginator]="true" [rows]="10"
             [rowsPerPageOptions]="[10,25,50]" [tableStyle]="{'min-width':'100%'}"
             styleClass="p-datatable-sm p-datatable-striped" responsiveLayout="scroll">

      <ng-template #header>
        <tr>
          <th pSortableColumn="first_name">Name <p-sortIcon field="first_name" /></th>
          <th [hidden]="responsive.isMobile()">Username</th>
          <th>Role</th>
          <th [hidden]="responsive.isMobile()">Book</th>
          <th [hidden]="responsive.isMobile()">Status</th>
          <th style="width:140px">Actions</th>
        </tr>
      </ng-template>

      <ng-template #body let-user>
        <tr>
          <td>
            <div class="user-name">{{ user.first_name }} {{ user.last_name }}</div>
            @if (responsive.isMobile()) {
              <div class="user-username">&#64;{{ user.username }}</div>
            }
          </td>
          <td [hidden]="responsive.isMobile()">
            <span class="user-username">&#64;{{ user.username }}</span>
          </td>
          <td>
            <p-tag [value]="roleLabel(user.role)" [severity]="roleSeverity(user.role)" />
          </td>
          <td [hidden]="responsive.isMobile()">
            {{ bookName(user.book_id) }}
          </td>
          <td [hidden]="responsive.isMobile()">
            <p-tag [value]="user.is_active ? 'Active' : 'Inactive'"
                   [severity]="user.is_active ? 'success' : 'danger'" />
          </td>
          <td>
            <div class="flex gap-1">
              <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" size="small"
                        severity="info" pTooltip="Edit"
                        (onClick)="router.navigate(['/users', user.id, 'edit'])" />
              <p-button [icon]="user.is_active ? 'pi pi-ban' : 'pi pi-check-circle'"
                        [text]="true" [rounded]="true" size="small"
                        [severity]="user.is_active ? 'warn' : 'success'"
                        [pTooltip]="user.is_active ? 'Disable' : 'Enable'"
                        (onClick)="toggleActive(user)" />
              <p-button icon="pi pi-trash" [text]="true" [rounded]="true" size="small"
                        severity="danger" pTooltip="Delete"
                        (onClick)="confirmDelete(user)" />
            </div>
          </td>
        </tr>
      </ng-template>

      <ng-template #empty>
        <tr><td colspan="6" class="text-center p-6" style="color:var(--p-text-muted-color)">
          No users found.
        </td></tr>
      </ng-template>
    </p-table>
  `,
})
export class UserListComponent implements OnInit {
  protected readonly router = inject(Router);
  private readonly data = inject(DataService);
  private readonly confirmSvc = inject(ConfirmationService);
  private readonly toastSvc = inject(MessageService);
  protected readonly responsive = inject(ResponsiveService);

  protected readonly loading = signal(true);
  protected readonly users = signal<User[]>([]);
  protected readonly books = signal<Book[]>([]);
  protected searchTerm = '';
  protected filterRole: string | null = null;

  protected readonly roleOptions = [
    { label: 'Super Admin', value: 'super_admin' },
    { label: 'Book Admin', value: 'book_admin' },
    { label: 'Field Agent', value: 'field_agent' },
  ];

  protected readonly filtered = computed(() => {
    let list = this.users();
    if (this.filterRole) list = list.filter(u => u.role === this.filterRole);
    const q = this.searchTerm.toLowerCase();
    if (q) list = list.filter(u =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    );
    return list;
  });

  ngOnInit(): void {
    const bookId = AuthStore.bookId() ?? undefined;
    this.data.users.getAll(bookId).subscribe(res => {
      this.users.set(res.data);
      this.loading.set(false);
    });
    this.data.books.getAll().subscribe(res => this.books.set(res.data));
  }

  protected roleLabel(role: UserRole): string { return ROLE_LABELS[role] ?? role; }
  protected roleSeverity(role: UserRole): 'success'|'info'|'warn'|'danger'|'secondary' {
    return (ROLE_SEVERITY[role] as any) ?? 'secondary';
  }
  protected bookName(bookId: string | null): string {
    if (!bookId) return '— (Global)';
    return this.books().find(b => b.id === bookId)?.name ?? `Book #${bookId}`;
  }

  protected toggleActive(user: User): void {
    this.data.users.toggleActive(user.id).subscribe(res => {
      this.users.update(list => list.map(u => u.id === user.id ? res.data : u));
      this.toastSvc.add({
        severity: res.data.is_active ? 'success' : 'warn',
        summary: res.data.is_active ? 'User Enabled' : 'User Disabled',
        detail: `${res.data.first_name} ${res.data.last_name}`,
        life: 3000,
      });
    });
  }

  protected confirmDelete(user: User): void {
    this.confirmSvc.confirm({
      message: `Delete user "<strong>${user.first_name} ${user.last_name}</strong>"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.data.users.delete(user.id).subscribe(() => {
          this.users.update(list => list.filter(u => u.id !== user.id));
          this.toastSvc.add({ severity: 'info', summary: 'Deleted', detail: `${user.first_name} ${user.last_name}`, life: 3000 });
        });
      },
    });
  }
}

