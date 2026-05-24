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
  selector: 'app-loan-deleted',
  standalone: true,
  imports: [
    RouterLink, FormsModule, DatePipe, DecimalPipe,
    TableModule, ButtonModule, InputTextModule, SelectModule,
    TagModule, ToastModule, ConfirmDialogModule, TooltipModule,
    DatePipe, DecimalPipe, TitleCasePipe,
  ],
  providers: [MessageService, ConfirmationService],
  styles: [`
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
    .table-wrap { overflow-x: auto; }
  `],
  template: `
    <p-toast />
    <p-confirmdialog />

    <div class="page-header">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                severity="secondary" routerLink="/loans" />
      <h1 class="page-title">Deleted Loans</h1>
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
    </div>

    <div class="table-wrap">
      <p-table [value]="filtered()" [loading]="loading()" [paginator]="true" [rows]="15"
               [rowsPerPageOptions]="[10,15,25]" stripedRows
               [tableStyle]="{'min-width':'820px'}" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="loan_number">Loan # <p-sortIcon field="loan_number" /></th>
            <th pSortableColumn="customer_name">Customer <p-sortIcon field="customer_name" /></th>
            <th class="hidden md:table-cell">Amount</th>
            <th class="hidden md:table-cell">Type</th>
            <th class="hidden lg:table-cell">Line</th>
            <th pSortableColumn="issued_date" class="hidden lg:table-cell">Issued <p-sortIcon field="issued_date" /></th>
            <th pSortableColumn="updated_at">Deleted On <p-sortIcon field="updated_at" /></th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-loan>
          <tr style="opacity:0.75">
            <td><span class="font-mono text-sm">{{ loan.loan_number }}</span></td>
            <td>{{ loan.customer_name }}</td>
            <td class="hidden md:table-cell">₹{{ loan.loan_amount | number }}</td>
            <td class="hidden md:table-cell">
              <p-tag [value]="loan.loan_type" [severity]="typeSeverity(loan.loan_type)" styleClass="capitalize" />
            </td>
            <td class="hidden lg:table-cell">{{ loan.line | titlecase }}</td>
            <td class="hidden lg:table-cell">{{ loan.issued_date | date:'dd/MM/yyyy' }}</td>
            <td>{{ loan.updated_at | date:'dd/MM/yyyy' }}</td>
            <td>
              <div class="flex gap-1">
                <p-button icon="pi pi-undo" [text]="true" [rounded]="true" severity="success"
                          pTooltip="Recover" (onClick)="onRecover(loan)" />
                <p-button icon="pi pi-times-circle" [text]="true" [rounded]="true" severity="danger"
                          pTooltip="Permanent Delete" (onClick)="onPermanentDelete(loan)" />
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="8" class="text-center py-8" style="color:var(--p-text-muted-color)">
              No deleted loans found.
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class LoanDeletedComponent implements OnInit {
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);
  private readonly confirmSvc = inject(ConfirmationService);

  protected readonly loading = signal(true);
  protected readonly loans = signal<Loan[]>([]);
  protected readonly books = signal<Book[]>([]);
  protected readonly selectedBookId = signal<number>(AuthStore.bookId() ?? 1);
  protected readonly searchText = signal('');
  protected readonly isSuperAdmin = computed(() => AuthStore.role() === 'super_admin');

  protected readonly filtered = computed(() => {
    const s = this.searchText().toLowerCase();
    return this.loans().filter(l =>
      !s || l.loan_number.toLowerCase().includes(s)
        || (l.customer_name ?? '').toLowerCase().includes(s)
    );
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
    this.data.loans.getDeleted(bookId).subscribe(r => {
      this.loans.set(r.data);
      this.loading.set(false);
    });
  }

  protected typeSeverity(type: string): 'info' | 'success' | 'warn' {
    return type === 'daily' ? 'info' : type === 'weekly' ? 'success' : 'warn';
  }

  protected onRecover(loan: Loan): void {
    this.confirmSvc.confirm({
      message: `Recover loan <b>${loan.loan_number}</b> back to active loans?`,
      header: 'Recover Loan', icon: 'pi pi-undo',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.data.loans.restore(loan.id).subscribe(() => {
          this.loans.update(list => list.filter(l => l.id !== loan.id));
          this.toastSvc.add({ severity: 'success', summary: 'Recovered', detail: loan.loan_number, life: 2500 });
        });
      },
    });
  }

  protected onPermanentDelete(loan: Loan): void {
    this.confirmSvc.confirm({
      message: `Permanently delete <b>${loan.loan_number}</b>? This cannot be undone.`,
      header: 'Permanent Delete', icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.data.loans.hardDelete(loan.id).subscribe(() => {
          this.loans.update(list => list.filter(l => l.id !== loan.id));
          this.toastSvc.add({ severity: 'error', summary: 'Deleted', detail: loan.loan_number, life: 2500 });
        });
      },
    });
  }
}

