import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Loan, ArchiveLoan, CreateLoanRequest, UpdateLoanRequest, PendingLoan } from '../models/loan.model';

export interface LoanNumberSuggestion {
  mode: 'manual' | 'auto';
  reset: 'yearly' | 'never';
  prefix: string;
  next_number: string;
}

export abstract class BaseLoanService {
  abstract getAll(book_id: string): Observable<ApiResponse<Loan[]>>;
  abstract getNextNumber(book_id: string, date?: string): Observable<ApiResponse<LoanNumberSuggestion>>;
  abstract getDeleted(book_id: string): Observable<ApiResponse<Loan[]>>;
  abstract getArchived(book_id: string): Observable<ApiResponse<ArchiveLoan[]>>;
  abstract getPending(book_id: string): Observable<ApiResponse<PendingLoan[]>>;
  abstract getById(id: string): Observable<ApiResponse<Loan>>;
  abstract create(data: CreateLoanRequest): Observable<ApiResponse<Loan>>;
  abstract update(id: string, data: UpdateLoanRequest): Observable<ApiResponse<Loan>>;
  abstract softDelete(id: string): Observable<ApiResponse<null>>;
  abstract restore(id: string): Observable<ApiResponse<Loan>>;
  abstract archive(id: string): Observable<ApiResponse<null>>;
  abstract unarchive(id: string): Observable<ApiResponse<Loan>>;
  abstract permanentDelete(id: string): Observable<ApiResponse<null>>;
  abstract hardDelete(id: string): Observable<ApiResponse<null>>;
}
