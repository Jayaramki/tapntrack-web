import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Subscription } from '../models/subscription.model';

/** Current tenant's subscription: plan, status, limits and usage. */
export abstract class BaseSubscriptionService {
  abstract get(): Observable<ApiResponse<Subscription>>;
}
