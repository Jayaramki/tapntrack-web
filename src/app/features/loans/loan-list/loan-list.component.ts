import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataService } from '../../../core/services/data.service';
import { AuthStore } from '../../../core/stores/auth.store';
import { Loan } from '../../../core/models/loan.model';
import { Book } from '../../../core/models/book.model';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { CardPaginatorComponent } from '../../../shared/components/card-paginator/card-paginator.component';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    RouterLink, FormsModule, DatePipe, DecimalPipe, TitleCasePipe,
    TableModule, ButtonModule, InputTextModule, SelectModule,
    TagModule, ToastModule, ConfirmDialogModule, TooltipModule,
    CardPaginatorComponent,
  ],
  providers: [MessageService, ConfirmationService],
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
    .table-wrap { overflow-x: auto; }
    .sub-nav { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
    .loan-cards { display: flex; flex-direction: column; gap: 10px; }
    .loan-card {
      background-color: #ffffff;
      background: var(--p-surface-card, #ffffff);
      border: 1px solid var(--p-surface-border, #e2e8f0);
      border-radius: 10px; padding: 14px;
    }
    .loan-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .loan-number { font-family: monospace; font-size: 0.9rem; font-weight: 600; color: var(--p-primary-color); }
    .loan-card-name { font-weight: 600; font-size: 1rem; margin-bottom: 6px; }
    .loan-card-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; font-size: 0.82rem; color: var(--p-text-muted-color); }
    .sep { color: var(--p-surface-border, #ccc); }
    .loan-card-balance { font-size: 0.88rem; margin-bottom: 10px; }
    .loan-card-actions { display: flex; gap: 4px; border-top: 1px solid var(--p-surface-border, #e2e8f0); padding-top: 8px; margin-top: 4px; }
  `],
  template: `
    <p-toast />
    <p-confirmdialog />

    <div class="page-header">
      <h1 class="page-title">Loans</h1>
      <p-button label="New Loan" icon="pi pi-plus" routerLink="/loans/new" />
    </div>

    <div class="sub-nav">
      <p-button label="Archived" icon="pi pi-box" severity="secondary" [outlined]="true"
                size="small" routerLink="/loans/archived" />
      <p-button label="Deleted" icon="pi pi-trash" severity="secondary" [outlined]="true"
                size="small" routerLink="/loans/deleted" />
    </div>

    @if (isSuperAdmin()) {
      <div style="margin-bottom: 16px; max-width: 280px;">
        <p-select [options]="books()" optionLabel="name" optionValue="id"
                  [ngModel]="selectedBookId()" (ngModelChange)="onBookChange($event)"
                  placeholder="Select Book" styleClass="w-full" />
      </div>
    }

    <div class="filters">
      <input pInputText [ngModel]="searchText()" (ngModelChange)="searchText.set($event)"
             placeholder="Search customer / loan #" style="min-width:200px" />
      <p-select [options]="typeOptions" optionLabel="label" optionValue="value"
                [ngModel]="filterType()" (ngModelChange)="filterType.set($event ?? '')"
                placeholder="All Types" [showClear]="true" styleClass="min-w-32" />
      <p-select [options]="lineOptions" optionLabel="label" optionValue="value"
                [ngModel]="filterLine()" (ngModelChange)="filterLine.set($event ?? '')"
                placeholder="All Lines" [showClear]="true" styleClass="min-w-32" />
      <p-select [options]="statusOptions" optionLabel="label" optionValue="value"
                [ngModel]="filterStatus()" (ngModelChange)="filterStatus.set($event ?? '')"
                placeholder="All Status" [showClear]="true" styleClass="min-w-36" />
    </div>

    @if (!responsive.isMobile()) {
      <div class="table-wrap">
        <p-table [value]="filtered()" [loading]="loading()" [paginator]="true" [rows]="15"
                 [rowsPerPageOptions]="[10,15,25]" stripedRows
                 [tableStyle]="{'min-width':'820px'}" responsiveLayout="scroll">
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="loan_number">Loan # <p-sortIcon field="loan_number" /></th>
              <th pSortableColumn="customer_name">Customer <p-sortIcon field="customer_name" /></th>
              <th pSortableColumn="loan_amount" class="hidden md:table-cell">Amount <p-sortIcon field="loan_amount" /></th>
              <th class="hidden md:table-cell">Type</th>
              <th class="hidden lg:table-cell">Line</th>
              <th pSortableColumn="issued_date" class="hidden lg:table-cell">Issued <p-sortIcon field="issued_date" /></th>
              <th pSortableColumn="remaining_balance">Balance <p-sortIcon field="remaining_balance" /></th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-loan>
            <tr>
              <td><span class="font-mono text-sm">{{ loan.loan_number }}</span></td>
              <td>{{ loan.customer_name }}</td>
              <td class="hidden md:table-cell">&#8377;{{ loan.loan_amount | number }}</td>
              <td class="hidden md:table-cell">
                <p-tag [value]="loan.loan_type" [severity]="typeSeverity(loan.loan_type)" styleClass="capitalize" />
              </td>
              <td class="hidden lg:table-cell">{{ loan.line | titlecase }}</td>
              <td class="hidden lg:table-cell">{{ loan.issued_date | date:'dd/MM/yyyy' }}</td>
              <td [style]="(loan.remaining_balance ?? 0) <= 0 ? 'color:var(--p-green-600);font-weight:600' : ''">
                &#8377;{{ (loan.remaining_balance ?? 0) | number }}
              </td>
              <td>
                @if (loan.completed_date) {
                  <p-tag value="Completed" severity="success" />
                } @else {
                  <p-tag value="Active" severity="info" />
                }
              </td>
              <td>
                <div class="flex gap-1">
                  <p-button icon="pi pi-eye" [text]="true" [rounded]="true" severity="secondary"
                            pTooltip="View" [routerLink]="['/loans', loan.id]" />
                  <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" severity="info"
                            pTooltip="Edit" [routerLink]="['/loans', loan.id, 'edit']" />
                  @if (loan.completed_date) {
                    <p-button icon="pi pi-box" [text]="true" [rounded]="true" severity="warn"
                              pTooltip="Archive" (onClick)="onArchive(loan)" />
                  }
                  <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger"
                            pTooltip="Delete" (onClick)="onDelete(loan)" />
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="9" class="text-center py-8" style="color:var(--p-text-muted-color)">
                No loans found.
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    } @else {
      <div class="loan-cards">
        @if (loading()) {
          <div style="text-align:center;padding:48px 0"><i class="pi pi-spin pi-spinner" style="font-size:2rem"></i></div>
        } @else {
          @for (loan of pagedLoans(); track loan.id) {
            <div class="loan-card">
              <div class="loan-card-header">
                <span class="loan-number">{{ loan.loan_number }}</span>
                @if (loan.completed_date) {
                  <p-tag value="Completed" severity="success" />
                } @else {
                  <p-tag value="Active" severity="info" />
                }
              </div>
              <div class="loan-card-name">{{ loan.customer_name }}</div>
              <div class="loan-card-meta">
                <span>&#8377;{{ loan.loan_amount | number }}</span>
                <span class="sep">·</span>
                <p-tag [value]="loan.loan_type" [severity]="typeSeverity(loan.loan_type)" styleClass="capitalize" />
                <span class="sep">·</span>
                <span>{{ loan.line | titlecase }}</span>
                <span class="sep">·</span>
                <span>{{ loan.issued_date | date:'dd/MM/yy' }}</span>
              </div>
              <div class="loan-card-balance">
                Balance: <strong [style]="(loan.remaining_balance ?? 0) <= 0 ? 'color:var(--p-green-600)' : ''">
                  &#8377;{{ (loan.remaining_balance ?? 0) | number }}
                </strong>
              </div>
              <div class="loan-card-actions">
                <p-button icon="pi pi-eye" [text]="true" size="small" severity="secondary"
                          pTooltip="View" [routerLink]="['/loans', loan.id]" />
                <p-button icon="pi pi-pencil" [text]="true" size="small" severity="info"
                          pTooltip="Edit" [routerLink]="['/loans', loan.id, 'edit']" />
                @if (loan.completed_date) {
                  <p-button icon="pi pi-box" [text]="true" size="small" severity="warn"
                            pTooltip="Archive" (onClick)="onArchive(loan)" />
                }
                <p-button icon="pi pi-trash" [text]="true" size="small" severity="danger"
                          pTooltip="Delete" (onClick)="onDelete(loan)" />
              </div>
            </div>
          }
          @if (filtered().length === 0) {
            <div style="text-align:center;padding:48px 0;color:var(--p-text-muted-color)">No loans found.</div>
          }
          <app-card-paginator [page]="mobilePage()" [totalPages]="totalPages()"
                              (pageChange)="mobilePage.set($event)" />
        }
      </div>
    }
  `,
})
export class LoanListComponent implements OnInit {
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);
  private readonly confirmSvc = inject(ConfirmationService);
  protected readonly responsive = inject(ResponsiveService);

  protected readonly loading = signal(true);
  protected readonly loans = signal<Loan[]>([]);
  protected readonly books = signal<Book[]>([]);
  protected readonly selectedBookId = signal<number>(AuthStore.bookId() ?? 1);
  protected readonly searchText = signal('');
  protected readonly filterType = signal('');
  protected readonly filterLine = signal('');
  protected readonly filterStatus = signal('');
  protected readonly mobilePage = signal(0);
  private readonly mobilePageSize = 10;

  protected readonly isSuperAdmin = computed(() => AuthStore.role() === 'super_admin');

  protected readonly typeOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];
  protected readonly lineOptions = ['line1','line2','line3','line4','line5','line6']
    .map(l => ({ label: l.replace('line', 'Line '), value: l }));
  protected readonly statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  protected readonly filtered = computed(() => {
    const s = this.searchText().toLowerCase();
    const type = this.filterType();
    const line = this.filterLine();
    const status = this.filterStatus();
    return this.loans().filter(l => {
      const matchSearch = !s || l.loan_number.toLowerCase().includes(s)
        || (l.customer_name ?? '').toLowerCase().includes(s);
      const matchType = !type || l.loan_type === type;
      const matchLine = !line || l.line === line;
      const matchStatus = !status
        || (status === 'completed' && !!l.completed_date)
        || (status === 'active' && !l.completed_date);
      return matchSearch && matchType && matchLine && matchStatus;
    });
  });

  // Reset mobile page when filters change
  protected readonly _ = computed(() => { this.filtered(); this.mobilePage.set(0); });

  protected readonly totalPages = computed(() =>
    Math.ceil(this.filtered().length / this.mobilePageSize)
  );

  protected readonly pagedLoans = computed(() => {
    const start = this.mobilePage() * this.mobilePageSize;
    return this.filtered().slice(start, start + this.mobilePageSize);
  });

  ngOnInit(): void {
    if (this.isSuperAdmin()) {
      this.data.books.getAll().subscribe(r => {
        this.books.set(r.data);
        if (r.data.length) this.selectedBookId.set(r.data[0].id);
        this.loadLoans();
      });
    } else {
      this.loadLoans();
    }
  }

  protected onBookChange(id: number): void {
    this.selectedBookId.set(id);
    this.loadLoans();
  }

  private loadLoans(): void {
    this.loading.set(true);
    const bookId = this.isSuperAdmin() ? this.selectedBookId() : (AuthStore.bookId() ?? 1);
    this.data.loans.getAll(bookId).subscribe(r => {
      this.loans.set(r.data);
      this.loading.set(false);
    });
  }

  protected typeSeverity(type: string): 'info' | 'success' | 'warn' {
    return type === 'daily' ? 'info' : type === 'weekly' ? 'success' : 'warn';
  }

  protected onArchive(loan: Loan): void {
    this.confirmSvc.confirm({
      message: `Archive loan <b>${loan.loan_number}</b>? It will move to the archive.`,
      header: 'Archive Loan', icon: 'pi pi-box',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
        this.data.loans.archive(loan.id).subscribe(() => {
          this.loans.update(list => list.filter(l => l.id !== loan.id));
          this.toastSvc.add({ severity: 'warn', summary: 'Archived', detail: loan.loan_number, life: 2500 });
        });
      },
    });
  }

  protected onDelete(loan: Loan): void {
    this.confirmSvc.confirm({
      message: `Delete loan <b>${loan.loan_number}</b>? You can recover it from Deleted Loans.`,
      header: 'Delete Loan', icon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.data.loans.softDelete(loan.id).subscribe(() => {
          this.loans.update(list => list.filter(l => l.id !== loan.id));
          this.toastSvc.add({ severity: 'error', summary: 'Deleted', detail: loan.loan_number, life: 2500 });
        });
      },
    });
  }
}