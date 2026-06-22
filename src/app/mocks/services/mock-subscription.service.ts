import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { Subscription } from '../../core/models/subscription.model';
import { BaseSubscriptionService } from '../../core/services/base-subscription.service';

/** Demo-mode subscription so the Billing screen works without a backend. */
@Injectable({ providedIn: 'root' })
export class MockSubscriptionService extends BaseSubscriptionService {
  get(): Observable<ApiResponse<Subscription>> {
    const data: Subscription = {
      plan: 'standard',
      status: 'active',
      trial_ends_at: null,
      limits: { plan: 'standard', label: 'Standard', max_active_loans: 600, max_users: 5, max_books: null },
      usage: { active_loans: 42, users: 3, books: 2 },
    };
    return of({ success: true, data }).pipe(delay(150));
  }
}
