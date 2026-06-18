import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AuthUser, RegisterPayload } from '../models/user.model';
import { BaseAuthService } from './base-auth.service';

@Injectable({ providedIn: 'root' })
export class HttpAuthService extends BaseAuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  login(username: string, password: string, tenantSlug?: string | null): Observable<ApiResponse<AuthUser>> {
    return this.http.post<ApiResponse<AuthUser>>(`${this.authUrl}/login`, {
      username,
      password,
      ...(tenantSlug ? { tenant_slug: tenantSlug } : {}),
    });
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthUser>> {
    return this.http.post<ApiResponse<AuthUser>>(`${this.authUrl}/register`, payload);
  }

  logout(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/logout`, {});
  }

  me(): Observable<ApiResponse<AuthUser>> {
    return this.http.get<ApiResponse<AuthUser>>(`${this.authUrl}/me`);
  }

  getSecurityQuestion(username: string, tenantSlug?: string | null): Observable<ApiResponse<{ question: string }>> {
    return this.http.get<ApiResponse<{ question: string }>>(`${this.authUrl}/security-question`, {
      params: { username, ...(tenantSlug ? { tenant_slug: tenantSlug } : {}) },
    });
  }

  forgotPassword(username: string, answer: string, newPassword: string, tenantSlug?: string | null): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/forgot-password`, {
      username,
      answer,
      new_password: newPassword,
      ...(tenantSlug ? { tenant_slug: tenantSlug } : {}),
    });
  }

  changePassword(current: string, newPass: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/change-password`, {
      current_password: current,
      new_password: newPass,
    });
  }
}
