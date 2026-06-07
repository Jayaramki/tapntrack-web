import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { DailyEntry, CreateDailyEntryRequest, BulkDailyEntryRequest, DaySummary, LedgerData } from '../models/daily-entry.model';

export abstract class BaseDailyEntryService {
  abstract getByLoan(loan_id: number): Observable<ApiResponse<DailyEntry[]>>;
  abstract getByDate(book_id: number, date: string): Observable<ApiResponse<DailyEntry[]>>;
  abstract create(data: CreateDailyEntryRequest): Observable<ApiResponse<DailyEntry>>;
  abstract bulkCreate(data: BulkDailyEntryRequest): Observable<ApiResponse<DailyEntry[]>>;
  abstract update(id: number, data: Partial<CreateDailyEntryRequest>): Observable<ApiResponse<DailyEntry>>;
  abstract delete(id: number): Observable<ApiResponse<null>>;
  abstract getDaySummary(book_id: number, date: string): Observable<ApiResponse<DaySummary>>;
}

export abstract class BaseLedgerService {
  abstract getLedger(book_id: number, year: number, month: number): Observable<ApiResponse<LedgerData>>;
}
