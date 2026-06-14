import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

export interface CreateUserRequest {
  book_id: string | null;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  role: string;
  phone?: string;
  security_question: string;
  security_answer: string;
}

export type UpdateUserRequest = Partial<Omit<CreateUserRequest, 'password'>>;

export abstract class BaseUserService {
  abstract getAll(book_id?: string): Observable<ApiResponse<User[]>>;
  abstract getById(id: string): Observable<ApiResponse<User>>;
  abstract create(data: CreateUserRequest): Observable<ApiResponse<User>>;
  abstract update(id: string, data: UpdateUserRequest): Observable<ApiResponse<User>>;
  abstract toggleActive(id: string): Observable<ApiResponse<User>>;
  abstract delete(id: string): Observable<ApiResponse<null>>;
}
