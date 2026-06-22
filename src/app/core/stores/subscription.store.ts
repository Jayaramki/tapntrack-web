import { Injectable, computed, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from '../models/subscription.model';

/**
 * Holds the effective tenant's subscription (plan/status/limits/usage). Loaded
 * once a tenant context exists (a workspace user, or a platform admin while
 * impersonating). Drives the read-only banner and the Plan & Usage page.
 */
@Injectable({ providedIn: 'root' })
export class SubscriptionStore {
  private readonly api = inject(DataService).subscription;
  private readonly _sub = signal<Subscription | null>(null);

  readonly subscription = this._sub.asReadonly();
  readonly isReadOnly = computed(() => {
    const s = this._sub();
    return !!s && (s.status === 'suspended' || s.status === 'past_due');
  });

  load(): void {
    this.api.get().subscribe({
      next: (r) => this._sub.set(r.data),
      error: () => this._sub.set(null),
    });
  }

  clear(): void {
    this._sub.set(null);
  }
}
