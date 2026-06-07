import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AppSetting, UpdateSettingRequest } from '../models/app-setting.model';
import { DashboardStats, ReportFilter, CollectionReport, LoanReport } from '../models/dashboard.model';

export abstract class BaseSettingsService {
  abstract getAll(book_id: number): Observable<ApiResponse<AppSetting[]>>;
  abstract update(book_id: number, data: UpdateSettingRequest): Observable<ApiResponse<AppSetting>>;
}

export abstract class BaseDashboardService {
  abstract getStats(book_id: number, from: string, to: string): Observable<ApiResponse<DashboardStats>>;
}

export abstract class BaseReportsService {
  abstract getCollectionReport(filter: ReportFilter): Observable<ApiResponse<CollectionReport[]>>;
  abstract getLoanReport(filter: ReportFilter): Observable<ApiResponse<LoanReport[]>>;
}
