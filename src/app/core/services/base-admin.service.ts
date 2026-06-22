import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AdminTenant, AdminPlan, TenantStatus } from '../models/admin.model';

/** Platform-admin (super_admin) API: tenant metadata + plan limits. */
export abstract class BaseAdminService {
  abstract getTenants(): Observable<ApiResponse<AdminTenant[]>>;
  abstract updateStatus(id: string, status: TenantStatus): Observable<ApiResponse<AdminTenant>>;
  abstract updatePlan(id: string, plan: string): Observable<ApiResponse<AdminTenant>>;
  abstract impersonate(id: string): Observable<ApiResponse<{ slug: string; name: string }>>;
  abstract stopImpersonate(slug: string): Observable<ApiResponse<null>>;
  abstract getPlans(): Observable<ApiResponse<AdminPlan[]>>;
  abstract savePlanLimits(code: string, data: Partial<AdminPlan>): Observable<ApiResponse<AdminPlan>>;
}
