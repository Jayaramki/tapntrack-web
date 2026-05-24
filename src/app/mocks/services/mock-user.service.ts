import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { User } from '../../core/models/user.model';
import { BaseUserService, CreateUserRequest, UpdateUserRequest } from '../../core/services/base-user.service';
import { MOCK_USERS, MockUser } from '../data/users.mock';

@Injectable({ providedIn: 'root' })
export class MockUserService extends BaseUserService {
  private users: MockUser[] = [...MOCK_USERS];

  getAll(book_id?: number): Observable<ApiResponse<User[]>> {
    const filtered = book_id !== undefined
      ? this.users.filter(u => !u.is_deleted && (u.book_id === book_id || u.role === 'super_admin'))
      : this.users.filter(u => !u.is_deleted);
    return of({ success: true, data: filtered as User[] }).pipe(delay(200));
  }

  getById(id: number): Observable<ApiResponse<User>> {
    const user = this.users.find(u => u.id === id);
    return of({ success: true, data: user as User }).pipe(delay(200));
  }

  create(data: CreateUserRequest): Observable<ApiResponse<User>> {
    const newUser: MockUser = {
      id: Math.max(...this.users.map(u => u.id)) + 1,
      book_id: data.book_id,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
      role: data.role as any,
      phone: data.phone,
      is_active: true,
      security_question: data.security_question,
      security_answer: data.security_answer,
      permissions: [],
    };
    this.users.push(newUser);
    return of({ success: true, data: newUser as User, message: 'User created successfully' }).pipe(delay(300));
  }

  update(id: number, data: UpdateUserRequest): Observable<ApiResponse<User>> {
    const idx = this.users.findIndex(u => u.id === id);
    this.users[idx] = { ...this.users[idx], ...(data as Partial<MockUser>) };
    return of({ success: true, data: this.users[idx] as User, message: 'User updated successfully' }).pipe(delay(300));
  }

  toggleActive(id: number): Observable<ApiResponse<User>> {
    const idx = this.users.findIndex(u => u.id === id);
    this.users[idx] = { ...this.users[idx], is_active: !this.users[idx].is_active };
    return of({ success: true, data: this.users[idx] as User }).pipe(delay(200));
  }

  delete(id: number): Observable<ApiResponse<null>> {
    this.users = this.users.filter(u => u.id !== id);
    return of({ success: true, data: null, message: 'User deleted successfully' }).pipe(delay(200));
  }
}
