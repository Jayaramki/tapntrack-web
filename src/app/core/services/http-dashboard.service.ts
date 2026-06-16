import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { DashboardStats, ReportFilter, CollectionReport, LoanReport } from '../models/dashboard.model';
import { BaseDashboardService, BaseReportsService } from './base-settings.service';

@Injectable({ providedIn: 'root' })
export class HttpDashboardService extends BaseDashboardService {
  private readonly url = `${environment.apiUrl}/dashboard`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getStats(book_id: string, from: string, to: string): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(this.url, { params: { book_id, from, to } });
  }
}

@Injectable({ providedIn: 'root' })
export class HttpReportsService extends BaseReportsService {
  private readonly url = `${environment.apiUrl}/reports`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getCollectionReport(filter: ReportFilter): Observable<ApiResponse<CollectionReport[]>> {
    return this.http.get<ApiResponse<CollectionReport[]>>(`${this.url}/collections`, {
      params: this.toParams(filter),
    });
  }

  getLoanReport(filter: ReportFilter): Observable<ApiResponse<LoanReport[]>> {
    return this.http.get<ApiResponse<LoanReport[]>>(`${this.url}/loans`, {
      params: this.toParams(filter),
    });
  }

  private toParams(filter: ReportFilter): Record<string, string> {
    const params: Record<string, string> = {
      book_id: filter.book_id,
      from_date: filter.from_date,
      to_date: filter.to_date,
    };
    if (filter.loan_type) params['loan_type'] = filter.loan_type;
    if (filter.line) params['line'] = filter.line;
    return params;
  }
}
