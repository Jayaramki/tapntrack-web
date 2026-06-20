import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest, CollectLookup } from '../models/customer.model';
import { BaseCustomerService } from './base-customer.service';

@Injectable({ providedIn: 'root' })
export class HttpCustomerService extends BaseCustomerService {
  private readonly url = `${environment.apiUrl}/customers`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(book_id: string): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.url, { params: { book_id } });
  }

  getById(id: string): Observable<ApiResponse<Customer>> {
    return this.http.get<ApiResponse<Customer>>(`${this.url}/${id}`);
  }

  search(book_id: string, query: string): Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.url, {
      params: { book_id, search: query },
    });
  }

  lookup(book_id: string, number: number): Observable<ApiResponse<CollectLookup>> {
    return this.http.get<ApiResponse<CollectLookup>>(`${this.url}/lookup`, {
      params: { book_id, number },
    });
  }

  create(data: CreateCustomerRequest): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(this.url, data);
  }

  update(id: string, data: UpdateCustomerRequest): Observable<ApiResponse<Customer>> {
    return this.http.put<ApiResponse<Customer>>(`${this.url}/${id}`, data);
  }

  toggleActive(id: string): Observable<ApiResponse<Customer>> {
    return this.http.patch<ApiResponse<Customer>>(`${this.url}/${id}/toggle-status`, {});
  }
}
