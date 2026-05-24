import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models/customer.model';

export abstract class BaseCustomerService {
  abstract getAll(book_id: number): Observable<ApiResponse<Customer[]>>;
  abstract getById(id: number): Observable<ApiResponse<Customer>>;
  abstract search(book_id: number, query: string): Observable<ApiResponse<Customer[]>>;
  abstract create(data: CreateCustomerRequest): Observable<ApiResponse<Customer>>;
  abstract update(id: number, data: UpdateCustomerRequest): Observable<ApiResponse<Customer>>;
  abstract toggleActive(id: number): Observable<ApiResponse<Customer>>;
}
