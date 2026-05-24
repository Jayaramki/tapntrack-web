import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { Expense, CreateExpenseRequest, UpdateExpenseRequest, ExpenseCategoryConfig, CreateExpenseCategoryRequest } from '../../core/models/expense.model';
import { BaseExpenseService } from '../../core/services/base-expense.service';
import { MOCK_EXPENSES } from '../data/expenses.mock';
import { MOCK_EXPENSE_CATEGORIES } from '../data/expense-categories.mock';

@Injectable({ providedIn: 'root' })
export class MockExpenseService extends BaseExpenseService {
  private expenses: Expense[] = [...MOCK_EXPENSES];
  private categories: ExpenseCategoryConfig[] = [...MOCK_EXPENSE_CATEGORIES];

  getAll(book_id: number): Observable<ApiResponse<Expense[]>> {
    return of({ success: true, data: this.expenses.filter(e => e.book_id === book_id) }).pipe(delay(200));
  }

  getById(id: number): Observable<ApiResponse<Expense>> {
    const expense = this.expenses.find(e => e.id === id);
    return of({ success: true, data: expense! }).pipe(delay(200));
  }

  create(data: CreateExpenseRequest): Observable<ApiResponse<Expense>> {
    const newExpense: Expense = {
      id: Math.max(...this.expenses.map(e => e.id)) + 1,
      ...data,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.expenses.push(newExpense);
    return of({ success: true, data: newExpense, message: 'Expense recorded' }).pipe(delay(300));
  }

  update(id: number, data: UpdateExpenseRequest): Observable<ApiResponse<Expense>> {
    const idx = this.expenses.findIndex(e => e.id === id);
    this.expenses[idx] = { ...this.expenses[idx], ...data, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.expenses[idx], message: 'Expense updated' }).pipe(delay(300));
  }

  toggleActive(id: number): Observable<ApiResponse<Expense>> {
    const idx = this.expenses.findIndex(e => e.id === id);
    this.expenses[idx] = { ...this.expenses[idx], is_active: !this.expenses[idx].is_active, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.expenses[idx] }).pipe(delay(200));
  }

  // ── Category management ───────────────────────────────────────────────────

  getCategories(book_id: number): Observable<ApiResponse<ExpenseCategoryConfig[]>> {
    return of({ success: true, data: this.categories.filter(c => c.book_id === book_id && c.is_active) }).pipe(delay(150));
  }

  createCategory(data: CreateExpenseCategoryRequest): Observable<ApiResponse<ExpenseCategoryConfig>> {
    const newCat: ExpenseCategoryConfig = {
      id: Math.max(...this.categories.map(c => c.id)) + 1,
      ...data,
      is_active: true,
    };
    this.categories.push(newCat);
    return of({ success: true, data: newCat, message: 'Category created' }).pipe(delay(250));
  }

  updateCategory(id: number, data: Partial<CreateExpenseCategoryRequest>): Observable<ApiResponse<ExpenseCategoryConfig>> {
    const idx = this.categories.findIndex(c => c.id === id);
    this.categories[idx] = { ...this.categories[idx], ...data };
    return of({ success: true, data: this.categories[idx] }).pipe(delay(250));
  }

  deleteCategory(id: number): Observable<ApiResponse<null>> {
    const idx = this.categories.findIndex(c => c.id === id);
    this.categories[idx] = { ...this.categories[idx], is_active: false };
    return of({ success: true, data: null, message: 'Category removed' }).pipe(delay(200));
  }
}
