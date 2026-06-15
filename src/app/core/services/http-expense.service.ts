import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  Expense, CreateExpenseRequest, UpdateExpenseRequest,
  ExpenseCategoryConfig, CreateExpenseCategoryRequest,
} from '../models/expense.model';
import { BaseExpenseService } from './base-expense.service';

@Injectable({ providedIn: 'root' })
export class HttpExpenseService extends BaseExpenseService {
  private readonly url = `${environment.apiUrl}/expenses`;
  private readonly catUrl = `${environment.apiUrl}/expense-categories`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(book_id: string): Observable<ApiResponse<Expense[]>> {
    return this.http.get<ApiResponse<Expense[]>>(this.url, { params: { book_id } });
  }

  getById(id: string): Observable<ApiResponse<Expense>> {
    return this.http.get<ApiResponse<Expense>>(`${this.url}/${id}`);
  }

  create(data: CreateExpenseRequest): Observable<ApiResponse<Expense>> {
    return this.http.post<ApiResponse<Expense>>(this.url, data);
  }

  update(id: string, data: UpdateExpenseRequest): Observable<ApiResponse<Expense>> {
    return this.http.put<ApiResponse<Expense>>(`${this.url}/${id}`, data);
  }

  toggleActive(id: string): Observable<ApiResponse<Expense>> {
    return this.http.patch<ApiResponse<Expense>>(`${this.url}/${id}/toggle-status`, {});
  }

  getCategories(book_id: string): Observable<ApiResponse<ExpenseCategoryConfig[]>> {
    return this.http.get<ApiResponse<ExpenseCategoryConfig[]>>(this.catUrl, { params: { book_id } });
  }

  createCategory(data: CreateExpenseCategoryRequest): Observable<ApiResponse<ExpenseCategoryConfig>> {
    return this.http.post<ApiResponse<ExpenseCategoryConfig>>(this.catUrl, data);
  }

  updateCategory(id: string, data: Partial<CreateExpenseCategoryRequest>): Observable<ApiResponse<ExpenseCategoryConfig>> {
    return this.http.put<ApiResponse<ExpenseCategoryConfig>>(`${this.catUrl}/${id}`, data);
  }

  deleteCategory(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.catUrl}/${id}`);
  }
}
