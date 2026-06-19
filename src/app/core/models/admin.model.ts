export type TenantStatus = 'trial' | 'active' | 'past_due' | 'suspended';

export interface AdminPlan {
  code: string;
  label: string;
  max_active_loans: number | null;
  max_users: number | null;
  max_books: number | null;
  sort_order: number;
}

export interface AdminTenant {
  id: string;
  name: string;
  slug: string;
  owner_name?: string | null;
  email?: string | null;
  phone?: string | null;
  status: TenantStatus;
  plan: string;
  plan_label?: string;
  trial_ends_at?: string | null;
  created_at: string;
  books_count: number;
  users_count: number;
  active_loans_count: number;
}
