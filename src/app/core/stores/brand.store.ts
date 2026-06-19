import { Injectable, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';

const DEFAULT_BRAND = 'TapNTrack';

/**
 * Per-tenant branding: the display name shown in the app shell (topbar + sidebar)
 * is the active book's APP_NAME setting, so each workspace sees its own name.
 * Falls back to "TapNTrack" (platform / before a book is selected / on error).
 */
@Injectable({ providedIn: 'root' })
export class BrandStore {
  private readonly data = inject(DataService);
  private readonly _name = signal<string>(DEFAULT_BRAND);

  readonly name = this._name.asReadonly();

  loadForBook(bookId: string | null): void {
    if (!bookId) {
      this._name.set(DEFAULT_BRAND);
      return;
    }
    this.data.settings.getAll(bookId).subscribe({
      next: (r) => {
        const appName = (r.data ?? []).find(s => s.key === 'APP_NAME')?.value?.trim();
        this._name.set(appName || DEFAULT_BRAND);
      },
      error: () => this._name.set(DEFAULT_BRAND),
    });
  }

  reset(): void {
    this._name.set(DEFAULT_BRAND);
  }
}
