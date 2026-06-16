import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { BaseUserService, CreateUserRequest, UpdateUserRequest } from './base-user.service';

@Injectable({ providedIn: 'root' })
export class HttpUserService extends BaseUserService {
  private readonly url = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(book_id?: string): Observable<ApiResponse<User[]>> {
    const params: Record<string, string> = book_id ? { book_id } : {};
    return this.http.get<ApiResponse<User[]>>(this.url, { params });
  }

  getById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.url}/${id}`);
  }

  create(data: CreateUserRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.url, data);
  }

  update(id: string, data: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.url}/${id}`, data);
  }

  toggleActive(id: string): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.url}/${id}/toggle-status`, {});
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }
}
