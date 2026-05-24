export interface Customer {
  id: number;
  book_id: number;
  name: string;
  father_name: string;
  phone: string;
  address: string;
  profession?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerRequest {
  book_id: number;
  name: string;
  father_name: string;
  phone: string;
  address: string;
  profession?: string;
  is_active: boolean;
}

export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;
