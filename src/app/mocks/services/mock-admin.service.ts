import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { AdminTenant, AdminPlan, TenantStatus } from '../../core/models/admin.model';
import { BaseAdminService } from '../../core/services/base-admin.service';

/** Demo-mode platform-admin data so the admin screens work without a backend. */
@Injectable({ providedIn: 'root' })
export class MockAdminService extends BaseAdminService {
  private plans: AdminPlan[] = [
    { code: 'basic',    label: 'Basic',    max_active_loans: 150,  max_users: 2,    max_books: null, sort_order: 1 },
    { code: 'standard', label: 'Standard', max_active_loans: 600,  max_users: 5,    max_books: null, sort_order: 2 },
    { code: 'premium',  label: 'Premium',  max_active_loans: null, max_users: null, max_books: null, sort_order: 3 },
  ];

  private tenants: AdminTenant[] = [
    {
      id: 't-demo', name: 'Balaji Finance', slug: 'balaji', owner_name: 'Vignesh',
      email: 'owner@balaji.test', phone: '9000000000', status: 'active', plan: 'standard',
      plan_label: 'Standard', trial_ends_at: null, created_at: '2026-01-01',
      books_count: 2, users_count: 3, active_loans_count: 42,
    },
  ];

  getTenants(): Observable<ApiResponse<AdminTenant[]>> {
    return of({ success: true, data: this.tenants }).pipe(delay(150));
  }

  updateStatus(id: string, status: TenantStatus): Observable<ApiResponse<AdminTenant>> {
    const t = this.tenants.find(x => x.id === id)!;
    t.status = status;
    return of({ success: true, data: t, message: 'Status updated' }).pipe(delay(150));
  }

  updatePlan(id: string, plan: string): Observable<ApiResponse<AdminTenant>> {
    const t = this.tenants.find(x => x.id === id)!;
    t.plan = plan;
    t.plan_label = this.plans.find(p => p.code === plan)?.label;
    return of({ success: true, data: t, message: 'Plan updated' }).pipe(delay(150));
  }

  impersonate(id: string): Observable<ApiResponse<{ slug: string; name: string }>> {
    const t = this.tenants.find(x => x.id === id)!;
    return of({ success: true, data: { slug: t.slug, name: t.name } }).pipe(delay(150));
  }

  stopImpersonate(): Observable<ApiResponse<null>> {
    return of({ success: true, data: null }).pipe(delay(100));
  }

  getPlans(): Observable<ApiResponse<AdminPlan[]>> {
    return of({ success: true, data: this.plans }).pipe(delay(150));
  }

  savePlanLimits(code: string, data: Partial<AdminPlan>): Observable<ApiResponse<AdminPlan>> {
    const p = this.plans.find(x => x.code === code)!;
    Object.assign(p, data);
    return of({ success: true, data: p, message: 'Plan saved' }).pipe(delay(150));
  }
}
