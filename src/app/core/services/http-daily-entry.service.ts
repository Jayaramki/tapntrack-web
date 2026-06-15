import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  DailyEntry, CreateDailyEntryRequest, BulkDailyEntryRequest, DaySummary, LedgerData,
} from '../models/daily-entry.model';
import { BaseDailyEntryService, BaseLedgerService } from './base-daily-entry.service';

@Injectable({ providedIn: 'root' })
export class HttpDailyEntryService extends BaseDailyEntryService {
  private readonly url = `${environment.apiUrl}/daily-entries`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getByLoan(loan_id: string): Observable<ApiResponse<DailyEntry[]>> {
    return this.http.get<ApiResponse<DailyEntry[]>>(`${this.url}/by-loan`, { params: { loan_id } });
  }

  getByDate(book_id: string, date: string): Observable<ApiResponse<DailyEntry[]>> {
    return this.http.get<ApiResponse<DailyEntry[]>>(this.url, { params: { book_id, date } });
  }

  create(data: CreateDailyEntryRequest): Observable<ApiResponse<DailyEntry>> {
    return this.http.post<ApiResponse<DailyEntry>>(this.url, data);
  }

  bulkCreate(data: BulkDailyEntryRequest): Observable<ApiResponse<DailyEntry[]>> {
    return this.http.post<ApiResponse<DailyEntry[]>>(`${this.url}/bulk`, data);
  }

  update(id: string, data: Partial<CreateDailyEntryRequest>): Observable<ApiResponse<DailyEntry>> {
    return this.http.put<ApiResponse<DailyEntry>>(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }

  getDaySummary(book_id: string, date: string): Observable<ApiResponse<DaySummary>> {
    return this.http.get<ApiResponse<DaySummary>>(`${this.url}/summary`, { params: { book_id, date } });
  }
}

@Injectable({ providedIn: 'root' })
export class HttpLedgerService extends BaseLedgerService {
  private readonly url = `${environment.apiUrl}/ledger`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getLedger(book_id: string, year: number, month: number): Observable<ApiResponse<LedgerData>> {
    return this.http.get<ApiResponse<LedgerData>>(this.url, { params: { book_id, year, month } });
  }
}
