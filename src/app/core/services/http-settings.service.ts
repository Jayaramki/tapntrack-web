import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AppSetting, UpdateSettingRequest } from '../models/app-setting.model';
import { BaseSettingsService } from './base-settings.service';

@Injectable({ providedIn: 'root' })
export class HttpSettingsService extends BaseSettingsService {
  private readonly url = `${environment.apiUrl}/settings`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(book_id: string): Observable<ApiResponse<AppSetting[]>> {
    return this.http.get<ApiResponse<AppSetting[]>>(this.url, {
      params: { book_id },
    });
  }

  update(book_id: string, data: UpdateSettingRequest): Observable<ApiResponse<AppSetting>> {
    return this.http.put<ApiResponse<AppSetting>>(this.url, { book_id, ...data });
  }
}
