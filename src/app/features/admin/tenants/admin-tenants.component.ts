import { Component, signal, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpAdminService } from '../../../core/services/http-admin.service';
import { AdminTenant, TenantStatus } from '../../../core/models/admin.model';
import { ImpersonationStore } from '../../../core/stores/impersonation.store';

const STATUS_SEVERITY: Record<TenantStatus, 'success' | 'info' | 'warn' | 'danger'> = {
  active: 'success', trial: 'info', past_due: 'warn', suspended: 'danger',
};

@Component({
  selector: 'app-admin-tenants',
  standalone: true,
  imports: [
    DatePipe, TableModule, ButtonModule, TagModule, ToastModule, TooltipModule, ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  styles: [`
    .page-header { margin-bottom: 20px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .page-sub { font-size: 0.85rem; color: var(--p-text-muted-color); margin-top: 4px; }
    .num { font-variant-numeric: tabular-nums; text-align: right; }
  `],
  template: `
    <p-toast />
    <p-confirmDialog />

    <div class="page-header">
      <h1 class="page-title">Tenants</h1>
      <div class="page-sub">
        Platform overview — metadata only. Use “Act as” to open a workspace’s data (audited).
      </div>
    </div>

    <p-table [value]="tenants()" [loading]="loading()" [paginator]="tenants().length > 15" [rows]="15"
             styleClass="p-datatable-sm p-datatable-striped" [tableStyle]="{'min-width':'60rem'}">
      <ng-template #header>
        <tr>
          <th>Workspace</th>
          <th>Handle</th>
          <th>Status</th>
          <th class="num">Books</th>
          <th class="num">Users</th>
          <th class="num">Active loans</th>
          <th>Created</th>
          <th style="width:170px">Actions</th>
        </tr>
      </ng-template>
      <ng-template #body let-t>
        <tr>
          <td>
            <div style="font-weight:600">{{ t.name }}</div>
            @if (t.email) { <div style="font-size:0.75rem;color:var(--p-text-muted-color)">{{ t.email }}</div> }
          </td>
          <td><code>{{ t.slug }}</code></td>
          <td><p-tag [value]="t.status" [severity]="statusSeverity(t.status)" /></td>
          <td class="num">{{ t.books_count }}</td>
          <td class="num">{{ t.users_count }}</td>
          <td class="num">{{ t.active_loans_count }}</td>
          <td>{{ t.created_at | date:'dd MMM yyyy' }}</td>
          <td>
            <div class="flex gap-1">
              <p-button label="Act as" icon="pi pi-eye" size="small" [text]="true"
                        pTooltip="Open this workspace’s data (audited)" (onClick)="actAs(t)" />
              <p-button [icon]="t.status === 'suspended' ? 'pi pi-check-circle' : 'pi pi-ban'"
                        size="small" [text]="true" [rounded]="true"
                        [severity]="t.status === 'suspended' ? 'success' : 'danger'"
                        [pTooltip]="t.status === 'suspended' ? 'Reactivate' : 'Suspend'"
                        (onClick)="confirmToggle(t)" />
            </div>
          </td>
        </tr>
      </ng-template>
      <ng-template #empty>
        <tr><td colspan="8" class="text-center p-6" style="color:var(--p-text-muted-color)">No tenants yet.</td></tr>
      </ng-template>
    </p-table>
  `,
})
export class AdminTenantsComponent implements OnInit {
  private readonly admin = inject(HttpAdminService);
  private readonly toastSvc = inject(MessageService);
  private readonly confirmSvc = inject(ConfirmationService);

  protected readonly tenants = signal<AdminTenant[]>([]);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    this.admin.getTenants().subscribe({
      next: (res) => { this.tenants.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  protected statusSeverity(s: TenantStatus) { return STATUS_SEVERITY[s] ?? 'info'; }

  protected actAs(t: AdminTenant): void {
    this.admin.impersonate(t.id).subscribe({
      next: (res) => {
        ImpersonationStore.start(res.data.slug, res.data.name);
        // Full reload so the X-Impersonate-Tenant header applies everywhere.
        window.location.assign('/dashboard');
      },
      error: () => this.toastSvc.add({ severity: 'error', summary: 'Could not start', detail: t.name, life: 3000 }),
    });
  }

  protected confirmToggle(t: AdminTenant): void {
    const suspend = t.status !== 'suspended';
    this.confirmSvc.confirm({
      header: suspend ? 'Suspend workspace' : 'Reactivate workspace',
      message: suspend
        ? `Suspend "<strong>${t.name}</strong>"? Its users will be locked out of changes.`
        : `Reactivate "<strong>${t.name}</strong>"?`,
      icon: suspend ? 'pi pi-ban' : 'pi pi-check-circle',
      acceptButtonStyleClass: suspend ? 'p-button-danger' : '',
      accept: () => {
        const next: TenantStatus = suspend ? 'suspended' : 'active';
        this.admin.updateStatus(t.id, next).subscribe({
          next: (res) => {
            this.tenants.update(list => list.map(x => x.id === t.id ? res.data : x));
            this.toastSvc.add({ severity: 'success', summary: 'Updated', detail: `${t.name} → ${next}`, life: 2500 });
          },
          error: () => this.toastSvc.add({ severity: 'error', summary: 'Update failed', detail: t.name, life: 3000 }),
        });
      },
    });
  }
}
