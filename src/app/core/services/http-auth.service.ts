import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AuthUser, RegisterPayload, DeviceSession } from '../models/user.model';
import { BaseAuthService, SessionMeta } from './base-auth.service';

@Injectable({ providedIn: 'root' })
export class HttpAuthService extends BaseAuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;
  // /sanctum/csrf-cookie sits at the API root, not under /v1.
  private readonly csrfUrl = `${environment.apiUrl.replace(/\/v1\/?$/, '')}/sanctum/csrf-cookie`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  csrf(): Observable<unknown> {
    return this.http.get(this.csrfUrl, { responseType: 'text' });
  }

  login(username: string, password: string, tenantSlug?: string | null): Observable<ApiResponse<AuthUser>> {
    // Prime the CSRF cookie, then authenticate (session-cookie login).
    return this.csrf().pipe(switchMap(() =>
      this.http.post<ApiResponse<AuthUser>>(`${this.authUrl}/login`, {
        username,
        password,
        ...(tenantSlug ? { tenant_slug: tenantSlug } : {}),
      })
    ));
  }

  register(payload: RegisterPayload): Observable<ApiResponse<AuthUser>> {
    return this.csrf().pipe(switchMap(() =>
      this.http.post<ApiResponse<AuthUser>>(`${this.authUrl}/register`, payload)
    ));
  }

  logout(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/logout`, {});
  }

  me(): Observable<ApiResponse<AuthUser>> {
    return this.http.get<ApiResponse<AuthUser>>(`${this.authUrl}/me`);
  }

  forgotPassword(email: string): Observable<ApiResponse<null>> {
    return this.csrf().pipe(switchMap(() =>
      this.http.post<ApiResponse<null>>(`${this.authUrl}/forgot-password`, { email })
    ));
  }

  resetPassword(token: string, email: string, password: string): Observable<ApiResponse<null>> {
    return this.csrf().pipe(switchMap(() =>
      this.http.post<ApiResponse<null>>(`${this.authUrl}/reset-password`, { token, email, password })
    ));
  }

  changePassword(current: string, newPass: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/change-password`, {
      current_password: current,
      new_password: newPass,
    });
  }

  reauth(password: string): Observable<ApiResponse<SessionMeta>> {
    return this.http.post<ApiResponse<SessionMeta>>(`${this.authUrl}/reauth`, { password });
  }

  sessions(): Observable<ApiResponse<DeviceSession[]>> {
    return this.http.get<ApiResponse<DeviceSession[]>>(`${this.authUrl}/sessions`);
  }

  revokeSession(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.authUrl}/sessions/${id}`);
  }

  logoutOthers(): Observable<ApiResponse<{ revoked: number }>> {
    return this.http.post<ApiResponse<{ revoked: number }>>(`${this.authUrl}/sessions/logout-others`, {});
  }
}
