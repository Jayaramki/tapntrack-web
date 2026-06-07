import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { AuthUser } from '../models/user.model';

export abstract class BaseAuthService {
  abstract login(username: string, password: string): Observable<ApiResponse<AuthUser>>;
  abstract logout(): Observable<ApiResponse<null>>;
  abstract me(): Observable<ApiResponse<AuthUser>>;
  abstract forgotPassword(username: string, answer: string, newPassword: string): Observable<ApiResponse<null>>;
  abstract getSecurityQuestion(username: string): Observable<ApiResponse<{ question: string }>>;
  abstract changePassword(current: string, newPass: string): Observable<ApiResponse<null>>;
}
