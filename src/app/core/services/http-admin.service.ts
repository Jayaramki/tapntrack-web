import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AdminTenant, TenantStatus } from '../models/admin.model';

/**
 * Platform-admin (super_admin) API. Surfaces tenant metadata only; borrower data
 * is reached via audited impersonation.
 */
@Injectable({ providedIn: 'root' })
export class HttpAdminService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/admin`;

  getTenants(): Observable<ApiResponse<AdminTenant[]>> {
    return this.http.get<ApiResponse<AdminTenant[]>>(`${this.url}/tenants`);
  }

  updateStatus(id: string, status: TenantStatus): Observable<ApiResponse<AdminTenant>> {
    return this.http.patch<ApiResponse<AdminTenant>>(`${this.url}/tenants/${id}/status`, { status });
  }

  updatePlan(id: string, plan: string): Observable<ApiResponse<AdminTenant>> {
    return this.http.patch<ApiResponse<AdminTenant>>(`${this.url}/tenants/${id}/plan`, { plan });
  }

  impersonate(id: string): Observable<ApiResponse<{ slug: string; name: string }>> {
    return this.http.post<ApiResponse<{ slug: string; name: string }>>(`${this.url}/tenants/${id}/impersonate`, {});
  }

  stopImpersonate(slug: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.url}/stop-impersonate`, { slug });
  }
}
