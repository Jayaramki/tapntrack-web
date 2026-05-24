import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { Book, CreateBookRequest, UpdateBookRequest } from '../models/book.model';

export abstract class BaseBookService {
  abstract getAll(): Observable<ApiResponse<Book[]>>;
  abstract getById(id: number): Observable<ApiResponse<Book>>;
  abstract create(data: CreateBookRequest): Observable<ApiResponse<Book>>;
  abstract update(id: number, data: UpdateBookRequest): Observable<ApiResponse<Book>>;
  abstract toggleActive(id: number): Observable<ApiResponse<Book>>;
  abstract delete(id: number): Observable<ApiResponse<null>>;
}
