import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Subscription } from '../models/subscription.model';

@Injectable({ providedIn: 'root' })
export class HttpSubscriptionService {
  private readonly http = inject(HttpClient);

  get(): Observable<ApiResponse<Subscription>> {
    return this.http.get<ApiResponse<Subscription>>(`${environment.apiUrl}/subscription`);
  }
}
