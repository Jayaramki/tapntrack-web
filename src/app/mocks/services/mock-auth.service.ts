import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { AuthUser, RegisterPayload } from '../../core/models/user.model';
import { BaseAuthService } from '../../core/services/base-auth.service';
import { MOCK_USERS } from '../data/users.mock';

@Injectable({ providedIn: 'root' })
export class MockAuthService extends BaseAuthService {

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
      token: `mock-token-${user.username}-${Date.now()}`,
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
      token: `mock-token-${payload.username}-${Date.now()}`,
    };
    return of({ success: true, data: authUser, message: 'Registration successful' }).pipe(delay(300));
  }

  logout(): Observable<ApiResponse<null>> {
    return of({ success: true, data: null, message: 'Logged out' }).pipe(delay(200));
  }

  me(): Observable<ApiResponse<AuthUser>> {
    const user = MOCK_USERS[0];
    const authUser: AuthUser = { ...user, token: 'mock-token-session' };
    return of({ success: true, data: authUser }).pipe(delay(200));
  }

  getSecurityQuestion(username: string): Observable<ApiResponse<{ question: string }>> {
    const user = MOCK_USERS.find(u => u.username === username);
    if (!user) {
      return throwError(() => ({ status: 404, error: { message: 'Username not found' } })).pipe(delay(300));
    }
    return of({ success: true, data: { question: user.security_question } }).pipe(delay(300));
  }

  forgotPassword(username: string, answer: string, newPassword: string): Observable<ApiResponse<null>> {
    const user = MOCK_USERS.find(u => u.username === username);
    if (!user || user.security_answer !== answer.toLowerCase()) {
      return throwError(() => ({ status: 400, error: { message: 'Security answer is incorrect' } })).pipe(delay(300));
    }
    user.password = newPassword;
    return of({ success: true, data: null, message: 'Password reset successful' }).pipe(delay(400));
  }

  changePassword(current: string, newPass: string): Observable<ApiResponse<null>> {
    return of({ success: true, data: null, message: 'Password changed successfully' }).pipe(delay(300));
  }
}
