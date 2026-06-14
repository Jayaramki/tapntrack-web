import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Book, CreateBookRequest, UpdateBookRequest } from '../models/book.model';
import { BaseBookService } from './base-book.service';

@Injectable({ providedIn: 'root' })
export class HttpBookService extends BaseBookService {
  private readonly url = `${environment.apiUrl}/books`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(): Observable<ApiResponse<Book[]>> {
    return this.http.get<ApiResponse<Book[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(`${this.url}/${id}`);
  }

  create(data: CreateBookRequest): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>(this.url, data);
  }

  update(id: string, data: UpdateBookRequest): Observable<ApiResponse<Book>> {
    return this.http.put<ApiResponse<Book>>(`${this.url}/${id}`, data);
  }

  toggleActive(id: string): Observable<ApiResponse<Book>> {
    return this.http.patch<ApiResponse<Book>>(`${this.url}/${id}/toggle-active`, {});
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }
}
