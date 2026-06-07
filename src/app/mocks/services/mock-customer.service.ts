import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../../core/models/customer.model';
import { BaseCustomerService } from '../../core/services/base-customer.service';
import { MOCK_CUSTOMERS } from '../data/customers.mock';

@Injectable({ providedIn: 'root' })
export class MockCustomerService extends BaseCustomerService {
  private customers: Customer[] = [...MOCK_CUSTOMERS];

  getAll(book_id: number): Observable<ApiResponse<Customer[]>> {
    return of({ success: true, data: this.customers.filter(c => c.book_id === book_id) }).pipe(delay(200));
  }

  getById(id: number): Observable<ApiResponse<Customer>> {
    const customer = this.customers.find(c => c.id === id);
    return of({ success: true, data: customer! }).pipe(delay(200));
  }

  search(book_id: number, query: string): Observable<ApiResponse<Customer[]>> {
    const q = query.toLowerCase();
    const results = this.customers.filter(
      c => c.book_id === book_id && c.is_active && c.name.toLowerCase().includes(q)
    );
    return of({ success: true, data: results }).pipe(delay(150));
  }

  create(data: CreateCustomerRequest): Observable<ApiResponse<Customer>> {
    const newCustomer: Customer = {
      id: Math.max(...this.customers.map(c => c.id)) + 1,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.customers.push(newCustomer);
    return of({ success: true, data: newCustomer, message: 'Customer created successfully' }).pipe(delay(300));
  }

  update(id: number, data: UpdateCustomerRequest): Observable<ApiResponse<Customer>> {
    const idx = this.customers.findIndex(c => c.id === id);
    this.customers[idx] = { ...this.customers[idx], ...data, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.customers[idx], message: 'Customer updated successfully' }).pipe(delay(300));
  }

  toggleActive(id: number): Observable<ApiResponse<Customer>> {
    const idx = this.customers.findIndex(c => c.id === id);
    this.customers[idx] = { ...this.customers[idx], is_active: !this.customers[idx].is_active, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.customers[idx] }).pipe(delay(200));
  }
}
