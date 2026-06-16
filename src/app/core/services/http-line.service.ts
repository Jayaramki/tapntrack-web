import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Line, CreateLineRequest, UpdateLineRequest } from '../models/line.model';
import { BaseLineService } from './base-line.service';

@Injectable({ providedIn: 'root' })
export class HttpLineService extends BaseLineService {
  private readonly url = `${environment.apiUrl}/lines`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getAll(book_id: string): Observable<ApiResponse<Line[]>> {
    return this.http.get<ApiResponse<Line[]>>(this.url, { params: { book_id } });
  }

  create(data: CreateLineRequest): Observable<ApiResponse<Line>> {
    return this.http.post<ApiResponse<Line>>(this.url, data);
  }

  update(id: string, data: UpdateLineRequest): Observable<ApiResponse<Line>> {
    return this.http.put<ApiResponse<Line>>(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`);
  }
}
