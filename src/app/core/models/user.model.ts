export type UserRole = 'super_admin' | 'book_admin' | 'field_agent';

export interface User {
  id: number;
  book_id: number | null;
  first_name: string;
  last_name: string;
  username: string;
  role: UserRole;
  phone?: string;
  is_active: boolean;
}

export interface AuthUser extends User {
  permissions: string[];
  token: string;
}
