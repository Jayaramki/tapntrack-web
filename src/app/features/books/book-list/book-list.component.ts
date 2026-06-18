import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Book } from '../../../core/models/book.model';
import { DataService } from '../../../core/services/data.service';
import { ResponsiveService } from '../../../core/services/responsive.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    FormsModule, DatePipe,
    TableModule, ButtonModule, InputTextModule, TagModule,
    ConfirmDialogModule, ToastModule, TooltipModule, IconFieldModule, InputIconModule,
  ],
  providers: [ConfirmationService, MessageService],
  styles: [`
    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
    }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  `],
  template: `
    <p-toast />
    <p-confirmDialog />

    <div class="page-header">
      <h1 class="page-title">Books</h1>
      <div class="toolbar">
        <p-iconfield>
          <p-inputicon styleClass="pi pi-search" />
          <input pInputText [(ngModel)]="searchTerm" placeholder="Search books…"
                 (input)="onSearch()" style="width:200px" />
        </p-iconfield>
        <p-button label="Add Book" icon="pi pi-plus" (onClick)="router.navigate(['/books/new'])" />
      </div>
    </div>

    <p-table [value]="filtered()" [loading]="loading()" [paginator]="true" [rows]="10"
             [rowsPerPageOptions]="[10,25,50]" [tableStyle]="{'min-width':'100%'}"
             styleClass="p-datatable-sm p-datatable-striped" responsiveLayout="scroll">

      <ng-template #header>
        <tr>
          <th pSortableColumn="name">Name <p-sortIcon field="name" /></th>
          <th [hidden]="responsive.isMobile()">Status</th>
          <th [hidden]="responsive.isMobile()" pSortableColumn="created_at">
            Created <p-sortIcon field="created_at" />
          </th>
          <th style="width:140px">Actions</th>
        </tr>
      </ng-template>

      <ng-template #body let-book>
        <tr>
          <td><span class="font-medium">{{ book.name }}</span></td>
          <td [hidden]="responsive.isMobile()">
            <p-tag [value]="book.is_active ? 'Active' : 'Inactive'"
                   [severity]="book.is_active ? 'success' : 'danger'" />
          </td>
          <td [hidden]="responsive.isMobile()">
            {{ book.created_at | date:'dd MMM yyyy' }}
          </td>
          <td>
            <div class="flex gap-1">
              <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" size="small"
                        severity="info" pTooltip="Edit"
                        (onClick)="router.navigate(['/books', book.id, 'edit'])" />
              <p-button [icon]="book.is_active ? 'pi pi-ban' : 'pi pi-check-circle'"
                        [text]="true" [rounded]="true" size="small"
                        [severity]="book.is_active ? 'warn' : 'success'"
                        [pTooltip]="book.is_active ? 'Disable' : 'Enable'"
                        (onClick)="toggleActive(book)" />
              <p-button icon="pi pi-trash" [text]="true" [rounded]="true" size="small"
                        severity="danger" pTooltip="Delete"
                        (onClick)="confirmDelete(book)" />
            </div>
          </td>
        </tr>
      </ng-template>

      <ng-template #empty>
        <tr><td colspan="4" class="text-center p-6" style="color:var(--p-text-muted-color)">
          No books found.
        </td></tr>
      </ng-template>
    </p-table>
  `,
})
export class BookListComponent implements OnInit {
  protected readonly router = inject(Router);
  private readonly data = inject(DataService);
  private readonly confirmSvc = inject(ConfirmationService);
  private readonly toastSvc = inject(MessageService);
  protected readonly responsive = inject(ResponsiveService);

  protected readonly loading = signal(true);
  protected readonly books = signal<Book[]>([]);
  protected searchTerm = '';

  protected readonly filtered = computed(() => {
    const q = this.searchTerm.toLowerCase();
    return q
      ? this.books().filter(b => b.name.toLowerCase().includes(q))
      : this.books();
  });

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.data.books.getAll().subscribe({
      next: (res) => {
        this.books.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  protected onSearch(): void { /* filtered() is reactive */ }

  protected toggleActive(book: Book): void {
    this.data.books.toggleActive(book.id).subscribe(res => {
      this.books.update(list => list.map(b => b.id === book.id ? res.data : b));
      this.toastSvc.add({
        severity: res.data.is_active ? 'success' : 'warn',
        summary: res.data.is_active ? 'Book Enabled' : 'Book Disabled',
        detail: res.data.name,
        life: 3000,
      });
    });
  }

  protected confirmDelete(book: Book): void {
    this.confirmSvc.confirm({
      message: `Delete "<strong>${book.name}</strong>"? This cannot be undone.`,
      header: 'Confirm Delete',
      icon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.data.books.delete(book.id).subscribe(() => {
          this.books.update(list => list.filter(b => b.id !== book.id));
          this.toastSvc.add({ severity: 'info', summary: 'Deleted', detail: book.name, life: 3000 });
        });
      },
    });
  }
}

