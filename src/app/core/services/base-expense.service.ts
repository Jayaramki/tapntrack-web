import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Expense, CreateExpenseRequest, UpdateExpenseRequest, ExpenseCategoryConfig, CreateExpenseCategoryRequest } from '../models/expense.model';

export abstract class BaseExpenseService {
  abstract getAll(book_id: number): Observable<ApiResponse<Expense[]>>;
  abstract getById(id: number): Observable<ApiResponse<Expense>>;
  abstract create(data: CreateExpenseRequest): Observable<ApiResponse<Expense>>;
  abstract update(id: number, data: UpdateExpenseRequest): Observable<ApiResponse<Expense>>;
  abstract toggleActive(id: number): Observable<ApiResponse<Expense>>;

  abstract getCategories(book_id: number): Observable<ApiResponse<ExpenseCategoryConfig[]>>;
  abstract createCategory(data: CreateExpenseCategoryRequest): Observable<ApiResponse<ExpenseCategoryConfig>>;
  abstract updateCategory(id: number, data: Partial<CreateExpenseCategoryRequest>): Observable<ApiResponse<ExpenseCategoryConfig>>;
  abstract deleteCategory(id: number): Observable<ApiResponse<null>>;
}
