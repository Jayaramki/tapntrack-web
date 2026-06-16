export interface Line {
  id: string;
  book_id: string;
  name: string;
  color: string;
  is_active: boolean;
}

export interface CreateLineRequest {
  book_id: string;
  name: string;
  color?: string;
  is_active?: boolean;
}

export type UpdateLineRequest = Partial<Omit<CreateLineRequest, 'book_id'>>;
