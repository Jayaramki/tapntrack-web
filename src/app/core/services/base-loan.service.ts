import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Loan, ArchiveLoan, CreateLoanRequest, UpdateLoanRequest, PendingLoan } from '../models/loan.model';

export abstract class BaseLoanService {
  abstract getAll(book_id: number): Observable<ApiResponse<Loan[]>>;
  abstract getDeleted(book_id: number): Observable<ApiResponse<Loan[]>>;
  abstract getArchived(book_id: number): Observable<ApiResponse<ArchiveLoan[]>>;
  abstract getPending(book_id: number): Observable<ApiResponse<PendingLoan[]>>;
  abstract getById(id: number): Observable<ApiResponse<Loan>>;
  abstract create(data: CreateLoanRequest): Observable<ApiResponse<Loan>>;
  abstract update(id: number, data: UpdateLoanRequest): Observable<ApiResponse<Loan>>;
  abstract softDelete(id: number): Observable<ApiResponse<null>>;
  abstract restore(id: number): Observable<ApiResponse<Loan>>;
  abstract archive(id: number): Observable<ApiResponse<null>>;
  abstract unarchive(id: number): Observable<ApiResponse<Loan>>;
  abstract permanentDelete(id: number): Observable<ApiResponse<null>>;
  abstract hardDelete(id: number): Observable<ApiResponse<null>>;
}
