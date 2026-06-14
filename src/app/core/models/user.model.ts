export type UserRole = 'super_admin' | 'book_admin' | 'field_agent';

export interface User {
  id: string;
  book_id: string | null;
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
