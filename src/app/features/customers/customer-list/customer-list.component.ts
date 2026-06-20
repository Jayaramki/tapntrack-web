import { Component, signal, inject, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MessageService } from 'primeng/api';
import { Customer } from '../../../core/models/customer.model';
import { DataService } from '../../../core/services/data.service';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { BookContextStore } from '../../../core/stores/book-context.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    FormsModule, TableModule, ButtonModule, InputTextModule,
    TagModule, ToastModule, TooltipModule, IconFieldModule, InputIconModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
    }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .cust-name { font-weight: 500; }
    .cust-father { font-size: 0.8rem; color: var(--p-text-muted-color); }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <h1 class="page-title">Customers</h1>
      <div class="toolbar">
        <p-iconfield>
          <p-inputicon styleClass="pi pi-search" />
          <input pInputText [(ngModel)]="searchTerm" placeholder="Search by name…"
                 style="width:200px" />
        </p-iconfield>
        <p-button label="Add Customer" icon="pi pi-plus"
                  (onClick)="router.navigate(['/customers/new'])" />
      </div>
    </div>

    <p-table [value]="filtered()" [loading]="loading()" [paginator]="true" [rows]="10"
             [rowsPerPageOptions]="[10,25,50]" [tableStyle]="{'min-width':'100%'}"
             styleClass="p-datatable-sm p-datatable-striped" responsiveLayout="scroll">

      <ng-template #header>
        <tr>
          <th pSortableColumn="customer_number" style="width:64px">#</th>
          <th pSortableColumn="name">Name <p-sortIcon field="name" /></th>
          <th [hidden]="responsive.isMobile()">Father Name</th>
          <th>Phone</th>
          <th [hidden]="responsive.isMobile()">Profession</th>
          <th [hidden]="responsive.isMobile()">Status</th>
          <th style="width:100px">Actions</th>
        </tr>
      </ng-template>

      <ng-template #body let-c>
        <tr>
          <td style="font-variant-numeric:tabular-nums; font-weight:600;">{{ c.customer_number }}</td>
          <td>
            <div class="cust-name">{{ c.name }}</div>
            @if (responsive.isMobile()) {
              <div class="cust-father">s/o {{ c.father_name }}</div>
            }
          </td>
          <td [hidden]="responsive.isMobile()">{{ c.father_name }}</td>
          <td>{{ c.phone }}</td>
          <td [hidden]="responsive.isMobile()">{{ c.profession || '—' }}</td>
          <td [hidden]="responsive.isMobile()">
            <p-tag [value]="c.is_active ? 'Active' : 'Inactive'"
                   [severity]="c.is_active ? 'success' : 'danger'" />
          </td>
          <td>
            <div class="flex gap-1">
              <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" size="small"
                        severity="info" pTooltip="Edit"
                        (onClick)="router.navigate(['/customers', c.id, 'edit'])" />
              <p-button [icon]="c.is_active ? 'pi pi-ban' : 'pi pi-check-circle'"
                        [text]="true" [rounded]="true" size="small"
                        [severity]="c.is_active ? 'warn' : 'success'"
                        [pTooltip]="c.is_active ? 'Disable' : 'Enable'"
                        (onClick)="toggleActive(c)" />
            </div>
          </td>
        </tr>
      </ng-template>

      <ng-template #empty>
        <tr><td colspan="7" class="text-center p-6" style="color:var(--p-text-muted-color)">
          No customers found.
        </td></tr>
      </ng-template>
    </p-table>
  `,
})
export class CustomerListComponent {
  protected readonly router = inject(Router);
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);
  protected readonly responsive = inject(ResponsiveService);
  private readonly bookCtx = inject(BookContextStore);

  protected readonly loading = signal(true);
  protected readonly customers = signal<Customer[]>([]);
  protected searchTerm = '';

  protected readonly filtered = computed(() => {
    const q = this.searchTerm.toLowerCase();
    return q
      ? this.customers().filter(c => c.name.toLowerCase().includes(q))
      : this.customers();
  });

  constructor() {
    // Reload whenever the active book changes (super_admin top-bar picker).
    effect(() => {
      const bookId = this.bookCtx.bookId();
      if (!bookId) return;
      this.loading.set(true);
      this.data.customers.getAll(bookId).subscribe({
        next: (res) => {
          this.customers.set(res.data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    });
  }

  protected toggleActive(customer: Customer): void {
    this.data.customers.toggleActive(customer.id).subscribe(res => {
      this.customers.update(list => list.map(c => c.id === customer.id ? res.data : c));
      this.toastSvc.add({
        severity: res.data.is_active ? 'success' : 'warn',
        summary: res.data.is_active ? 'Customer Enabled' : 'Customer Disabled',
        detail: res.data.name, life: 3000,
      });
    });
  }
}

