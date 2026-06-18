import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { AuthUser, RegisterPayload } from '../models/user.model';

export abstract class BaseAuthService {
  abstract login(username: string, password: string, tenantSlug?: string | null): Observable<ApiResponse<AuthUser>>;
  abstract register(payload: RegisterPayload): Observable<ApiResponse<AuthUser>>;
  abstract logout(): Observable<ApiResponse<null>>;
  abstract me(): Observable<ApiResponse<AuthUser>>;
  abstract forgotPassword(username: string, answer: string, newPassword: string, tenantSlug?: string | null): Observable<ApiResponse<null>>;
  abstract getSecurityQuestion(username: string, tenantSlug?: string | null): Observable<ApiResponse<{ question: string }>>;
  abstract changePassword(current: string, newPass: string): Observable<ApiResponse<null>>;
}
