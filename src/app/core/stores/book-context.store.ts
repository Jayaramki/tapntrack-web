import { Injectable, computed, inject, signal } from '@angular/core';
import { Book } from '../models/book.model';
import { DataService } from '../services/data.service';
import { AuthStore } from './auth.store';
import { ImpersonationStore } from './impersonation.store';

/**
 * Global book context.
 *
 * - book_admin / field_agent: the effective book is always their own
 *   (`AuthStore.bookId()`) — they never see a picker.
 * - super_admin / tenant_admin: have no inherent book, so they pick one from the
 *   top-bar selector. The choice is persisted and shared by every book-scoped
 *   screen, defaulting to the first available book until they choose.
 *   (super_admin sees every tenant's books; tenant_admin only their own — the
 *   API scopes the list.)
 *
 * Screens read `bookId()` instead of deriving the book themselves, and react
 * to changes (e.g. via `effect`) so switching books reloads their data.
 */
@Injectable({ providedIn: 'root' })
export class BookContextStore {
  private static readonly STORAGE_KEY = 'current_book_id';

  private readonly data = inject(DataService);

  readonly books = signal<Book[]>([]);
  private readonly _selected = signal<string | null>(
    localStorage.getItem(BookContextStore.STORAGE_KEY),
  );

  readonly isSuperAdmin = computed(() => AuthStore.role() === 'super_admin');

  /**
   * Roles with no inherent book that pick one from the top-bar selector.
   * tenant_admin always; super_admin (platform) only while impersonating a
   * tenant — otherwise they have no tenant data to pick from.
   */
  readonly usesPicker = computed(() => {
    const role = AuthStore.role();
    if (role === 'tenant_admin') return true;
    if (role === 'super_admin') return ImpersonationStore.isActive();
    return false;
  });

  /** The effective book id for the current user (null only before books load). */
  readonly bookId = computed<string | null>(() => {
    if (!this.usesPicker()) {
      return AuthStore.bookId();
    }
    return this._selected() ?? this.books()[0]?.id ?? null;
  });

  /** Currently selected id for binding the picker (super_admin / tenant_admin). */
  readonly selectedBookId = computed(() => this.bookId());

  /** Load the book list for the picker; default to the first book. */
  loadBooks(): void {
    if (!this.usesPicker()) {
      return;
    }
    this.data.books.getAll().subscribe(res => {
      this.books.set(res.data);
      const current = this._selected();
      const stillValid = current && res.data.some(b => b.id === current);
      if (!stillValid && res.data.length) {
        this.setBook(res.data[0].id);
      }
    });
  }

  setBook(id: string): void {
    this._selected.set(id);
    localStorage.setItem(BookContextStore.STORAGE_KEY, id);
  }

  clear(): void {
    this.books.set([]);
    this._selected.set(null);
    localStorage.removeItem(BookContextStore.STORAGE_KEY);
  }
}
