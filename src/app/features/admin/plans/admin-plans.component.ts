import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { HttpAdminService } from '../../../core/services/http-admin.service';
import { AdminPlan } from '../../../core/models/admin.model';

@Component({
  selector: 'app-admin-plans',
  standalone: true,
  imports: [
    FormsModule, TableModule, ButtonModule, InputNumberModule, InputTextModule, ToastModule, MessageModule,
  ],
  providers: [MessageService],
  styles: [`
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 4px; }
    .page-sub { font-size: 0.85rem; color: var(--p-text-muted-color); margin-bottom: 20px; }
    .limit-cell { width: 130px; }
    .limit-cell input { width: 100%; }
    .hint { font-size: 0.72rem; color: var(--p-text-muted-color); }
    code { background: var(--p-surface-100); padding: 1px 6px; border-radius: 4px; }
  `],
  template: `
    <p-toast />
    <h1 class="page-title">Plans</h1>
    <div class="page-sub">
      Edit each tier's limits — changes apply immediately to every tenant on that plan. Leave a limit blank for <b>unlimited</b>.
    </div>

    <p-table [value]="plans()" [loading]="loading()" styleClass="p-datatable-sm" [tableStyle]="{'min-width':'52rem'}">
      <ng-template #header>
        <tr>
          <th>Plan</th>
          <th style="width:160px">Name</th>
          <th class="limit-cell">Max active loans</th>
          <th class="limit-cell">Max users</th>
          <th class="limit-cell">Max books</th>
          <th style="width:90px"></th>
        </tr>
      </ng-template>
      <ng-template #body let-p>
        <tr>
          <td><code>{{ p.code }}</code></td>
          <td><input pInputText [(ngModel)]="p.label" /></td>
          <td class="limit-cell">
            <p-inputNumber [(ngModel)]="p.max_active_loans" [min]="0" placeholder="Unlimited" [useGrouping]="false" />
          </td>
          <td class="limit-cell">
            <p-inputNumber [(ngModel)]="p.max_users" [min]="1" placeholder="Unlimited" [useGrouping]="false" />
          </td>
          <td class="limit-cell">
            <p-inputNumber [(ngModel)]="p.max_books" [min]="1" placeholder="Unlimited" [useGrouping]="false" />
          </td>
          <td>
            <p-button label="Save" icon="pi pi-check" size="small"
                      [loading]="savingCode() === p.code" (onClick)="save(p)" />
          </td>
        </tr>
      </ng-template>
      <ng-template #empty>
        <tr><td colspan="6" class="text-center p-6" style="color:var(--p-text-muted-color)">No plans.</td></tr>
      </ng-template>
    </p-table>
  `,
})
export class AdminPlansComponent implements OnInit {
  private readonly admin = inject(HttpAdminService);
  private readonly toastSvc = inject(MessageService);

  protected readonly plans = signal<AdminPlan[]>([]);
  protected readonly loading = signal(true);
  protected readonly savingCode = signal<string>('');

  ngOnInit(): void {
    this.admin.getPlans().subscribe({
      next: (res) => { this.plans.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  protected save(p: AdminPlan): void {
    this.savingCode.set(p.code);
    this.admin.savePlanLimits(p.code, {
      label: p.label,
      max_active_loans: p.max_active_loans ?? null,
      max_users: p.max_users ?? null,
      max_books: p.max_books ?? null,
    }).subscribe({
      next: (res) => {
        this.savingCode.set('');
        this.plans.update(list => list.map(x => x.code === p.code ? res.data : x));
        this.toastSvc.add({ severity: 'success', summary: 'Plan saved', detail: res.data.label, life: 2500 });
      },
      error: () => {
        this.savingCode.set('');
        this.toastSvc.add({ severity: 'error', summary: 'Save failed', detail: p.label, life: 3000 });
      },
    });
  }
}
