import { TenantStatus } from './admin.model';

export interface PlanLimits {
  plan: string;
  label: string;
  max_active_loans: number | null;
  max_users: number | null;
  max_books: number | null;
}

export interface PlanUsage {
  active_loans: number;
  users: number;
  books: number;
}

export interface Subscription {
  plan: string;
  status: TenantStatus;
  trial_ends_at: string | null;
  limits: PlanLimits;
  usage: PlanUsage;
}
