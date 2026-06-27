export type UserRole = 'super_admin' | 'tenant_admin' | 'book_admin' | 'field_agent';

export interface User {
  id: string;
  book_id: string | null;
  first_name: string;
  last_name: string;
  username: string;
  role: UserRole;
  phone?: string;
  email?: string | null;
  is_active: boolean;
}

export interface AuthUser extends User {
  tenant_id?: string | null;
  tenant_slug?: string | null;
  hide_balance?: boolean;
  permissions: string[];
  // No token field: auth is an httpOnly session cookie (Sanctum SPA), never in JS.
}

/** Self-signup payload — creates a tenant + its first tenant_admin + starter book. */
export interface RegisterPayload {
  tenant_name: string;
  slug: string;
  username: string;
  password: string;
  owner_name?: string;
  email?: string;
  phone?: string;
  security_question?: string;
  security_answer?: string;
}
