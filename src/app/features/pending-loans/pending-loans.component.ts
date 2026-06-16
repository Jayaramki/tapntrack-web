import { Component, signal, inject, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { PendingLoan } from '../../core/models/loan.model';
import { Line } from '../../core/models/line.model';
import { ResponsiveService } from '../../core/services/responsive.service';
import { CardPaginatorComponent } from '../../shared/components/card-paginator/card-paginator.component';

@Component({
  selector: 'app-pending-loans',
  standalone: true,
  imports: [
    FormsModule, DecimalPipe, NgTemplateOutlet, RouterLink, TitleCasePipe,
    TableModule, ButtonModule, SelectModule,
    TabsModule, TagModule, TooltipModule, CardPaginatorComponent,
  ],
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
    .table-wrap { overflow-x: auto; }
    .row-overdue td { background: var(--p-red-50) !important; }
    .row-warning td { background: var(--p-yellow-50) !important; }
    .legend { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; font-size: 0.8rem; }
    .legend-item { display: flex; align-items: center; gap: 6px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .loan-cards { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
    .loan-card {
      background-color: #ffffff;
      background: var(--p-surface-card, #ffffff);
      border: 1px solid var(--p-surface-border, #e2e8f0);
      border-radius: 10px; padding: 14px;
    }
    .loan-card.overdue { border-left: 4px solid var(--p-red-400, #f87171); }
    .loan-card.warning { border-left: 4px solid var(--p-yellow-400, #facc15); }
    .loan-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .loan-number { font-family: monospace; font-size: 0.9rem; font-weight: 600; color: var(--p-primary-color); }
    .loan-card-name { font-weight: 600; font-size: 1rem; margin-bottom: 6px; }
    .loan-card-meta { font-size: 0.82rem; color: var(--p-text-muted-color); margin-bottom: 6px; }
    .loan-card-stats { display: flex; gap: 16px; margin-bottom: 10px; }
    .stat-item { display: flex; flex-direction: column; }
    .stat-label { font-size: 0.7rem; color: var(--p-text-muted-color); text-transform: uppercase; }
    .stat-value { font-size: 0.95rem; font-weight: 700; }
    .loan-card-actions { display: flex; gap: 4px; border-top: 1px solid var(--p-surface-border, #e2e8f0); padding-top: 8px; }
  `],
  template: `
    <div class="page-header">
      <h1 class="page-title">Pending Loans</h1>
    </div>


    <div class="filters">
      <p-select [options]="lines()" optionLabel="name" optionValue="name"
                [ngModel]="filterLine()" (ngModelChange)="filterLine.set($event ?? '')"
                placeholder="All Lines" [showClear]="true" styleClass="min-w-36" />
      <span style="font-size:0.85rem; color:var(--p-text-muted-color)">
        {{ activeTabLoans().length }} loan(s)
      </span>
    </div>

    <div class="legend">
      <div class="legend-item">
        <div class="dot" style="background:var(--p-red-200)"></div>
        <span>Overdue (daily &gt;3d / weekly &gt;14d / monthly &gt;60d)</span>
      </div>
      <div class="legend-item">
        <div class="dot" style="background:var(--p-yellow-200)"></div>
        <span>Approaching threshold</span>
      </div>
    </div>

    <p-tabs [value]="activeTab()" (valueChange)="onTabChange($event)">
      <p-tablist>
        <p-tab value="daily">
          Daily <p-tag [value]="countByType('daily')" severity="info" styleClass="ml-2" />
        </p-tab>
        <p-tab value="weekly">
          Weekly <p-tag [value]="countByType('weekly')" severity="success" styleClass="ml-2" />
        </p-tab>
        <p-tab value="monthly">
          Monthly <p-tag [value]="countByType('monthly')" severity="warn" styleClass="ml-2" />
        </p-tab>
      </p-tablist>

      <p-tabpanels>
        <p-tabpanel value="daily">
          <ng-container *ngTemplateOutlet="loanTable; context: { $implicit: activeTabLoans(), threshold: 3 }" />
        </p-tabpanel>
        <p-tabpanel value="weekly">
          <ng-container *ngTemplateOutlet="loanTable; context: { $implicit: activeTabLoans(), threshold: 14 }" />
        </p-tabpanel>
        <p-tabpanel value="monthly">
          <ng-container *ngTemplateOutlet="loanTable; context: { $implicit: activeTabLoans(), threshold: 60 }" />
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>

    <ng-template #loanTable let-loans let-threshold="threshold">
      @if (!responsive.isMobile()) {
        <div class="table-wrap" style="margin-top:8px">
          <p-table [value]="loans" [loading]="loading()" [paginator]="true" [rows]="15"
                   [rowsPerPageOptions]="[10,15,25]"
                   [tableStyle]="{'min-width':'700px'}" responsiveLayout="scroll"
                   sortField="act_pending_days" [sortOrder]="-1">
            <ng-template pTemplate="header">
              <tr>
                <th pSortableColumn="loan_number">Loan # <p-sortIcon field="loan_number" /></th>
                <th pSortableColumn="customer_name">Customer <p-sortIcon field="customer_name" /></th>
                <th class="hidden md:table-cell">Line</th>
                <th pSortableColumn="issued_date" class="hidden lg:table-cell">Issued <p-sortIcon field="issued_date" /></th>
                <th pSortableColumn="act_pending_days">Days Pending <p-sortIcon field="act_pending_days" /></th>
                <th pSortableColumn="remaining_balance">Balance <p-sortIcon field="remaining_balance" /></th>
                <th>Status</th>
                <th class="hidden md:table-cell">Action</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-loan>
              <tr [class]="rowClass(loan, threshold)">
                <td><span class="font-mono text-sm">{{ loan.loan_number }}</span></td>
                <td>{{ loan.customer_name }}</td>
                <td class="hidden md:table-cell">{{ loan.line }}</td>
                <td class="hidden lg:table-cell">{{ loan.issued_date }}</td>
                <td>
                  <span [style]="loan.is_overdue ? 'color:var(--p-red-600);font-weight:700' : ''">
                    {{ loan.act_pending_days }}d
                  </span>
                </td>
                <td>&#8377;{{ (loan.remaining_balance ?? 0) | number }}</td>
                <td>
                  @if (loan.is_overdue) {
                    <p-tag value="Overdue" severity="danger" />
                  } @else {
                    <p-tag value="Pending" severity="warn" />
                  }
                </td>
                <td class="hidden md:table-cell">
                  <p-button icon="pi pi-eye" [text]="true" [rounded]="true" severity="info"
                            pTooltip="View Loan" [routerLink]="['/loans', loan.id]" />
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
              <tr>
                <td colspan="8" class="text-center py-8" style="color:var(--p-text-muted-color)">
                  No pending loans for this type.
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      } @else {
        <div class="loan-cards">
          @for (loan of pendingPagedLoans(loans); track loan.loan_number) {
            <div class="loan-card"
                 [class.overdue]="loan.act_pending_days > threshold"
                 [class.warning]="loan.act_pending_days > threshold * 0.7 && loan.act_pending_days <= threshold">
              <div class="loan-card-header">
                <span class="loan-number">{{ loan.loan_number }}</span>
                @if (loan.is_overdue) {
                  <p-tag value="Overdue" severity="danger" />
                } @else {
                  <p-tag value="Pending" severity="warn" />
                }
              </div>
              <div class="loan-card-name">{{ loan.customer_name }}</div>
              <div class="loan-card-meta">{{ loan.line }} · {{ loan.loan_type | titlecase }}</div>
              <div class="loan-card-stats">
                <div class="stat-item">
                  <span class="stat-label">Days Pending</span>
                  <span class="stat-value" [style]="loan.is_overdue ? 'color:var(--p-red-600)' : ''">
                    {{ loan.act_pending_days }}d
                  </span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Balance</span>
                  <span class="stat-value">&#8377;{{ (loan.remaining_balance ?? 0) | number }}</span>
                </div>
              </div>
              <div class="loan-card-actions">
                <p-button icon="pi pi-eye" [text]="true" size="small" severity="info"
                          label="View Loan" [routerLink]="['/loans', loan.id]" />
              </div>
            </div>
          }
          @if (loans.length === 0) {
            <div style="text-align:center;padding:48px 0;color:var(--p-text-muted-color)">
              No pending loans for this type.
            </div>
          }
          <app-card-paginator [page]="mobilePage()" [totalPages]="pendingTotalPages(loans)"
                              (pageChange)="mobilePage.set($event)" />
        </div>
      }
    </ng-template>
  `,
})
export class PendingLoansComponent {
  private readonly data = inject(DataService);
  protected readonly responsive = inject(ResponsiveService);

  private readonly bookCtx = inject(BookContextStore);

  protected readonly loading = signal(true);
  protected readonly allPending = signal<PendingLoan[]>([]);
  protected readonly activeTab = signal<string>('daily');
  protected readonly filterLine = signal('');

  protected readonly mobilePage = signal(0);
  private readonly mobilePageSize = 10;

  protected pendingTotalPages(loans: PendingLoan[]): number {
    return Math.ceil(loans.length / this.mobilePageSize);
  }

  protected pendingPagedLoans(loans: PendingLoan[]): PendingLoan[] {
    const start = this.mobilePage() * this.mobilePageSize;
    return loans.slice(start, start + this.mobilePageSize);
  }

  protected readonly lines = signal<Line[]>([]);

  protected readonly activeTabLoans = computed(() => {
    const type = this.activeTab();
    const line = this.filterLine();
    return this.allPending().filter(l =>
      l.loan_type === type && (!line || l.line === line)
    );
  });

  protected onTabChange(val: string | number | undefined): void {
    if (val != null) { this.activeTab.set(String(val)); this.mobilePage.set(0); }
  }

  protected countByType(type: string): string {
    return String(this.allPending().filter(l => l.loan_type === type).length);
  }

  protected rowClass(loan: PendingLoan, threshold: number): string {
    if (loan.act_pending_days > threshold) return 'row-overdue';
    if (loan.act_pending_days > threshold * 0.7) return 'row-warning';
    return '';
  }

  constructor() {
    effect(() => {
      const bookId = this.bookCtx.bookId();
      if (bookId) this.loadPending(bookId);
    });
  }

  private loadPending(bookId: string): void {
    this.loading.set(true);
    this.data.loans.getPending(bookId).subscribe(r => {
      this.allPending.set(r.data);
      this.loading.set(false);
    });
    this.data.lines.getAll(bookId).subscribe(r => this.lines.set(r.data));
  }
}