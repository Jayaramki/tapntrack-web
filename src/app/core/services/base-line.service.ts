import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Line, CreateLineRequest, UpdateLineRequest } from '../models/line.model';

export abstract class BaseLineService {
  abstract getAll(book_id: string): Observable<ApiResponse<Line[]>>;
  abstract create(data: CreateLineRequest): Observable<ApiResponse<Line>>;
  abstract update(id: string, data: UpdateLineRequest): Observable<ApiResponse<Line>>;
  abstract delete(id: string): Observable<ApiResponse<null>>;
}
