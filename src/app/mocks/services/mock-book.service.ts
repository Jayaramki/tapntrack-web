import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { Book, CreateBookRequest, UpdateBookRequest } from '../../core/models/book.model';
import { BaseBookService } from '../../core/services/base-book.service';
import { MOCK_BOOKS } from '../data/books.mock';

@Injectable({ providedIn: 'root' })
export class MockBookService extends BaseBookService {
  private books: Book[] = [...MOCK_BOOKS];

  getAll(): Observable<ApiResponse<Book[]>> {
    return of({ success: true, data: this.books.filter(b => !b.is_deleted) }).pipe(delay(200));
  }

  getById(id: number): Observable<ApiResponse<Book>> {
    const book = this.books.find(b => b.id === id);
    return of({ success: true, data: book! }).pipe(delay(200));
  }

  create(data: CreateBookRequest): Observable<ApiResponse<Book>> {
    const newBook: Book = {
      id: Math.max(...this.books.map(b => b.id)) + 1,
      name: data.name,
      is_active: data.is_active,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.books.push(newBook);
    return of({ success: true, data: newBook, message: 'Book created successfully' }).pipe(delay(300));
  }

  update(id: number, data: UpdateBookRequest): Observable<ApiResponse<Book>> {
    const idx = this.books.findIndex(b => b.id === id);
    this.books[idx] = { ...this.books[idx], ...data, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.books[idx], message: 'Book updated successfully' }).pipe(delay(300));
  }

  toggleActive(id: number): Observable<ApiResponse<Book>> {
    const idx = this.books.findIndex(b => b.id === id);
    this.books[idx] = { ...this.books[idx], is_active: !this.books[idx].is_active, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.books[idx] }).pipe(delay(200));
  }

  delete(id: number): Observable<ApiResponse<null>> {
    const idx = this.books.findIndex(b => b.id === id);
    this.books[idx] = { ...this.books[idx], is_deleted: true, updated_at: new Date().toISOString() };
    return of({ success: true, data: null, message: 'Book deleted successfully' }).pipe(delay(200));
  }
}
