import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { Line, CreateLineRequest, UpdateLineRequest } from '../../core/models/line.model';
import { BaseLineService } from '../../core/services/base-line.service';
import { MOCK_LINES } from '../data/lines.mock';

@Injectable({ providedIn: 'root' })
export class MockLineService extends BaseLineService {
  private lines: Line[] = [...MOCK_LINES];

  getAll(book_id: string): Observable<ApiResponse<Line[]>> {
    return of({ success: true, data: this.lines.filter(l => l.book_id === book_id && l.is_active) }).pipe(delay(150));
  }

  create(data: CreateLineRequest): Observable<ApiResponse<Line>> {
    const line: Line = { id: crypto.randomUUID(), color: '#546E7A', is_active: true, ...data };
    this.lines.push(line);
    return of({ success: true, data: line, message: 'Line created' }).pipe(delay(200));
  }

  update(id: string, data: UpdateLineRequest): Observable<ApiResponse<Line>> {
    const idx = this.lines.findIndex(l => l.id === id);
    this.lines[idx] = { ...this.lines[idx], ...data };
    return of({ success: true, data: this.lines[idx] }).pipe(delay(200));
  }

  delete(id: string): Observable<ApiResponse<null>> {
    this.lines = this.lines.filter(l => l.id !== id);
    return of({ success: true, data: null, message: 'Line deleted' }).pipe(delay(200));
  }
}
