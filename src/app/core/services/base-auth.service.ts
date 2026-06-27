import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { AuthUser, RegisterPayload } from '../models/user.model';

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
}
