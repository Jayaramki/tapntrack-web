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

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    RouterLink, FormsModule, DatePipe, DecimalPipe,
    TableModule, ButtonModule, InputTextModule, SelectModule,
    TagModule, ToastModule, ConfirmDialogModule, TooltipModule,
    DatePipe, DecimalPipe, TitleCasePipe,
  ],
  providers: [MessageService, ConfirmationService],
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
    .table-wrap { overflow-x: auto; }
    .sub-nav { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
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
            <td class="hidden md:table-cell">₹{{ loan.loan_amount | number }}</td>
            <td class="hidden md:table-cell">
              <p-tag [value]="loan.loan_type" [severity]="typeSeverity(loan.loan_type)"
                     styleClass="capitalize" />
            </td>
            <td class="hidden lg:table-cell">{{ loan.line | titlecase }}</td>
            <td class="hidden lg:table-cell">{{ loan.issued_date | date:'dd/MM/yyyy' }}</td>
            <td [style]="(loan.remaining_balance ?? 0) <= 0 ? 'color:var(--p-green-600);font-weight:600' : ''">
              ₹{{ (loan.remaining_balance ?? 0) | number }}
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
  `,
})
export class LoanListComponent implements OnInit {
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);
  private readonly confirmSvc = inject(ConfirmationService);

  protected readonly loading = signal(true);
  protected readonly loans = signal<Loan[]>([]);
  protected readonly books = signal<Book[]>([]);
  protected readonly selectedBookId = signal<number>(AuthStore.bookId() ?? 1);
  protected readonly searchText = signal('');
  protected readonly filterType = signal('');
  protected readonly filterLine = signal('');
  protected readonly filterStatus = signal('');

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

