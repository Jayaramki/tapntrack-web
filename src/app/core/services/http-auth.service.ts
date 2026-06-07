import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AuthUser } from '../models/user.model';
import { BaseAuthService } from './base-auth.service';

@Injectable({ providedIn: 'root' })
export class HttpAuthService extends BaseAuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  login(username: string, password: string): Observable<ApiResponse<AuthUser>> {
    return this.http.post<ApiResponse<AuthUser>>(`${this.authUrl}/login`, { username, password });
  }

  logout(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/logout`, {});
  }

  me(): Observable<ApiResponse<AuthUser>> {
    return this.http.get<ApiResponse<AuthUser>>(`${this.authUrl}/me`);
  }

  getSecurityQuestion(username: string): Observable<ApiResponse<{ question: string }>> {
    return this.http.get<ApiResponse<{ question: string }>>(`${this.authUrl}/security-question`, {
      params: { username },
    });
  }

  forgotPassword(username: string, answer: string, newPassword: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/forgot-password`, {
      username,
      answer,
      new_password: newPassword,
    });
  }

  changePassword(current: string, newPass: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.authUrl}/change-password`, {
      current_password: current,
      new_password: newPass,
    });
  }
}
