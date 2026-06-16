import { Component, signal, inject, effect } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { Line } from '../../core/models/line.model';
import { ExpenseCategoryConfig } from '../../core/models/expense.model';
import { MasterManagerComponent, MasterItem } from './master-manager.component';

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [TabsModule, CardModule, ToastModule, MasterManagerComponent],
  providers: [MessageService],
  styles: [`
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 16px; }
    .master-wrap { max-width: 640px; }
    .hint { font-size: 0.8rem; color: var(--p-text-muted-color); margin: 4px 0 14px; }
  `],
  template: `
    <p-toast />
    <h1 class="page-title">Masters</h1>

    <div class="master-wrap">
      <p-tabs value="lines">
        <p-tablist>
          <p-tab value="lines">Lines</p-tab>
          <p-tab value="categories">Expense Categories</p-tab>
        </p-tablist>
        <p-tabpanels>
          <p-tabpanel value="lines">
            <p class="hint">Collection lines used when issuing loans. A line in use by any loan can't be deleted.</p>
            <app-master-manager
              noun="line" [items]="lineItems()"
              (create)="addLine($event)" (rename)="renameLine($event)"
              (recolor)="recolorLine($event)" (remove)="removeLine($event)" />
          </p-tabpanel>
          <p-tabpanel value="categories">
            <p class="hint">Categories used when recording expenses. A category in use by any expense can't be deleted.</p>
            <app-master-manager
              noun="category" [items]="categoryItems()"
              (create)="addCategory($event)" (rename)="renameCategory($event)"
              (recolor)="recolorCategory($event)" (remove)="removeCategory($event)" />
          </p-tabpanel>
        </p-tabpanels>
      </p-tabs>
    </div>
  `,
})
export class MastersComponent {
  private readonly data = inject(DataService);
  private readonly bookCtx = inject(BookContextStore);
  private readonly toast = inject(MessageService);

  protected readonly lineItems = signal<MasterItem[]>([]);
  protected readonly categoryItems = signal<MasterItem[]>([]);

  constructor() {
    effect(() => {
      const bookId = this.bookCtx.bookId();
      if (bookId) this.reload(bookId);
    });
  }

  private reload(bookId: string): void {
    this.data.lines.getAll(bookId).subscribe(r => this.lineItems.set(r.data as Line[]));
    this.data.expenses.getCategories(bookId).subscribe(r => this.categoryItems.set(r.data as ExpenseCategoryConfig[]));
  }

  private bookId(): string {
    return this.bookCtx.bookId()!;
  }

  // ── Lines ──────────────────────────────────────────────────────────────────
  protected addLine(e: { name: string; color: string }): void {
    this.data.lines.create({ book_id: this.bookId(), name: e.name, color: e.color })
      .subscribe(() => { this.reload(this.bookId()); this.ok('Line added'); });
  }
  protected renameLine(e: { id: string; name: string }): void {
    this.data.lines.update(e.id, { name: e.name }).subscribe(() => this.reload(this.bookId()));
  }
  protected recolorLine(e: { id: string; color: string }): void {
    this.data.lines.update(e.id, { color: e.color }).subscribe(() => this.reload(this.bookId()));
  }
  protected removeLine(e: { id: string; name: string }): void {
    this.data.lines.delete(e.id).subscribe({
      next: () => { this.reload(this.bookId()); this.ok(`Line "${e.name}" deleted`); },
      error: (err) => this.fail(err, 'line'),
    });
  }

  // ── Expense Categories ──────────────────────────────────────────────────────
  protected addCategory(e: { name: string; color: string }): void {
    this.data.expenses.createCategory({ book_id: this.bookId(), name: e.name, color: e.color })
      .subscribe(() => { this.reload(this.bookId()); this.ok('Category added'); });
  }
  protected renameCategory(e: { id: string; name: string }): void {
    this.data.expenses.updateCategory(e.id, { name: e.name }).subscribe(() => this.reload(this.bookId()));
  }
  protected recolorCategory(e: { id: string; color: string }): void {
    this.data.expenses.updateCategory(e.id, { color: e.color }).subscribe(() => this.reload(this.bookId()));
  }
  protected removeCategory(e: { id: string; name: string }): void {
    this.data.expenses.deleteCategory(e.id).subscribe({
      next: () => { this.reload(this.bookId()); this.ok(`Category "${e.name}" deleted`); },
      error: (err) => this.fail(err, 'category'),
    });
  }

  private ok(detail: string): void {
    this.toast.add({ severity: 'success', summary: 'Done', detail, life: 2500 });
  }
  private fail(err: unknown, noun: string): void {
    const msg = (err as { error?: { message?: string } })?.error?.message
      ?? `This ${noun} can't be deleted.`;
    this.toast.add({ severity: 'warn', summary: 'Cannot delete', detail: msg, life: 4000 });
  }
}
