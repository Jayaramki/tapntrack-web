export interface Book {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBookRequest {
  name: string;
  is_active: boolean;
}

export type UpdateBookRequest = Partial<CreateBookRequest>;
