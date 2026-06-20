import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest, CollectLookup } from '../models/customer.model';

export abstract class BaseCustomerService {
  abstract getAll(book_id: string): Observable<ApiResponse<Customer[]>>;
  abstract getById(id: string): Observable<ApiResponse<Customer>>;
  abstract search(book_id: string, query: string): Observable<ApiResponse<Customer[]>>;
  abstract lookup(book_id: string, number: number): Observable<ApiResponse<CollectLookup>>;
  abstract create(data: CreateCustomerRequest): Observable<ApiResponse<Customer>>;
  abstract update(id: string, data: UpdateCustomerRequest): Observable<ApiResponse<Customer>>;
  abstract toggleActive(id: string): Observable<ApiResponse<Customer>>;
}
