import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Loan, ArchiveLoan, CreateLoanRequest, UpdateLoanRequest, PendingLoan } from '../models/loan.model';
import { BaseLoanService, LoanNumberSuggestion } from './base-loan.service';

@Injectable({ providedIn: 'root' })
export class HttpLoanService extends BaseLoanService {
  private readonly url = `${environment.apiUrl}/loans`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(book_id: string): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(this.url, { params: { book_id } });
  }

  getNextNumber(book_id: string, date?: string): Observable<ApiResponse<LoanNumberSuggestion>> {
    return this.http.get<ApiResponse<LoanNumberSuggestion>>(`${this.url}/next-number`, {
      params: { book_id, ...(date ? { date } : {}) },
    });
  }

  getDeleted(book_id: string): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(`${this.url}/deleted`, { params: { book_id } });
  }

  getArchived(book_id: string): Observable<ApiResponse<ArchiveLoan[]>> {
    return this.http.get<ApiResponse<ArchiveLoan[]>>(`${this.url}/archived`, { params: { book_id } });
  }

  getPending(book_id: string): Observable<ApiResponse<PendingLoan[]>> {
    return this.http.get<ApiResponse<PendingLoan[]>>(`${this.url}/pending`, { params: { book_id } });
  }

  getById(id: string): Observable<ApiResponse<Loan>> {
    return this.http.get<ApiResponse<Loan>>(`${this.url}/${id}`);
  }

  create(data: CreateLoanRequest): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(this.url, data);
  }

  update(id: string, data: UpdateLoanRequest): Observable<ApiResponse<Loan>> {
    return this.http.put<ApiResponse<Loan>>(`${this.url}/${id}`, data);
  }

  softDelete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }

  restore(id: string): Observable<ApiResponse<Loan>> {
    return this.http.patch<ApiResponse<Loan>>(`${this.url}/${id}/restore`, {});
  }

  archive(id: string): Observable<ApiResponse<null>> {
    return this.http.patch<ApiResponse<null>>(`${this.url}/${id}/archive`, {});
  }

  unarchive(id: string): Observable<ApiResponse<Loan>> {
    return this.http.patch<ApiResponse<Loan>>(`${this.url}/${id}/unarchive`, {});
  }

  permanentDelete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}/permanent`);
  }

  hardDelete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}/force`);
  }
}
