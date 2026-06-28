import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { AuthUser, RegisterPayload, DeviceSession } from '../models/user.model';

export interface SessionMeta {
  idle_timeout_minutes: number;
  absolute_expires_at: string;
}

export abstract class BaseAuthService {
  /** Prime the CSRF cookie (Sanctum SPA) before any mutating/auth request. */
  abstract csrf(): Observable<unknown>;
  abstract login(username: string, password: string, tenantSlug?: string | null): Observable<ApiResponse<AuthUser>>;
  abstract register(payload: RegisterPayload): Observable<ApiResponse<AuthUser>>;
  abstract logout(): Observable<ApiResponse<null>>;
  abstract me(): Observable<ApiResponse<AuthUser>>;
  /** Email a single-use reset link (always succeeds — no account enumeration). */
  abstract forgotPassword(email: string): Observable<ApiResponse<null>>;
  /** Consume an emailed token and set a new password. */
  abstract resetPassword(token: string, email: string, password: string): Observable<ApiResponse<null>>;
  abstract changePassword(current: string, newPass: string): Observable<ApiResponse<null>>;
  /** Re-authenticate (password) to reset the absolute-timeout clock. */
  abstract reauth(password: string): Observable<ApiResponse<SessionMeta>>;
  /** Active devices/sessions for the current user. */
  abstract sessions(): Observable<ApiResponse<DeviceSession[]>>;
  abstract revokeSession(id: string): Observable<ApiResponse<null>>;
  abstract logoutOthers(): Observable<ApiResponse<{ revoked: number }>>;
}
