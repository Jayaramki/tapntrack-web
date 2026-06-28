import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { AuthUser, RegisterPayload, DeviceSession } from '../../core/models/user.model';
import { BaseAuthService, SessionMeta } from '../../core/services/base-auth.service';
import { MOCK_USERS } from '../data/users.mock';

@Injectable({ providedIn: 'root' })
export class MockAuthService extends BaseAuthService {

  csrf(): Observable<unknown> {
    return of(null).pipe(delay(50));
  }

  login(username: string, password: string, _tenantSlug?: string | null): Observable<ApiResponse<AuthUser>> {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password && u.is_active);
    if (!user) {
      return throwError(() => ({ status: 401, error: { message: 'Invalid username or password' } })).pipe(delay(300));
    }
    const authUser: AuthUser = {
      id: user.id,
      book_id: user.book_id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      role: user.role,
      phone: user.phone,
      is_active: user.is_active,
      permissions: user.permissions,
    };
    return of({ success: true, data: authUser, message: 'Login successful' }).pipe(delay(300));
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthUser>> {
    const authUser: AuthUser = {
      id: `mock-${payload.slug}`,
      tenant_id: `mock-tenant-${payload.slug}`,
      tenant_slug: payload.slug,
      book_id: null,
      first_name: payload.username,
      last_name: '',
      username: payload.username,
      role: 'tenant_admin',
      phone: payload.phone,
      is_active: true,
      permissions: ['manage-books', 'manage-users', 'manage-customers', 'manage-settings', 'manage-billing', 'view-dashboard'],
    };
    return of({ success: true, data: authUser, message: 'Registration successful' }).pipe(delay(300));
  }

  logout(): Observable<ApiResponse<null>> {
    return of({ success: true, data: null, message: 'Logged out' }).pipe(delay(200));
  }

  me(): Observable<ApiResponse<AuthUser>> {
    const user = MOCK_USERS[0];
    const authUser: AuthUser = { ...user };
    return of({ success: true, data: authUser }).pipe(delay(200));
  }

  forgotPassword(_email: string): Observable<ApiResponse<null>> {
    return of({ success: true, data: null, message: 'If that email is registered, a reset link has been sent.' }).pipe(delay(400));
  }

  resetPassword(_token: string, _email: string, _password: string): Observable<ApiResponse<null>> {
    return of({ success: true, data: null, message: 'Your password has been reset.' }).pipe(delay(400));
  }

  changePassword(current: string, newPass: string): Observable<ApiResponse<null>> {
    return of({ success: true, data: null, message: 'Password changed successfully' }).pipe(delay(300));
  }

  reauth(_password: string): Observable<ApiResponse<SessionMeta>> {
    return of({ success: true, data: { idle_timeout_minutes: 60, absolute_expires_at: new Date(Date.now() + 12 * 3600_000).toISOString() } }).pipe(delay(300));
  }

  sessions(): Observable<ApiResponse<DeviceSession[]>> {
    const data: DeviceSession[] = [
      { id: 'mock-current', device: 'Chrome on Windows', device_type: 'Desktop', ip_address: '127.0.0.1', last_active: new Date().toISOString(), is_current: true },
      { id: 'mock-phone', device: 'Safari on iPhone', device_type: 'Mobile', ip_address: '192.168.1.5', last_active: new Date(Date.now() - 3600_000).toISOString(), is_current: false },
    ];
    return of({ success: true, data }).pipe(delay(300));
  }

  revokeSession(_id: string): Observable<ApiResponse<null>> {
    return of({ success: true, data: null }).pipe(delay(200));
  }

  logoutOthers(): Observable<ApiResponse<{ revoked: number }>> {
    return of({ success: true, data: { revoked: 1 } }).pipe(delay(200));
  }
}
