export interface DashboardStats {
  book_id: string;
  date_range: { from: string; to: string };
  total_cash: number;
  total_gpay: number;
  total_collection: number;
  total_interest_income: number;
  income_overall: number;
  expense_by_category: Record<string, number>;
  expense_overall: number;
  net_profit: number;
  active_loans: number;
  completed_loans_this_period: number;
  pending_loans: number;
  total_customers: number;
}

export interface ReportFilter {
  book_id: string;
  from_date: string;
  to_date: string;
  loan_type?: string;
  line?: string;
}

export interface CollectionReport {
  date: string;
  loan_number: string;
  customer_name: string;
  customer_number?: number | null;
  amount: number;
  mode: string;
}

export interface LoanReport {
  loan_number: string;
  customer_name: string;
  customer_number?: number | null;
  loan_amount: number;
  total_collected: number;
  remaining_balance: number;
  issued_date: string;
  completed_date: string | null;
  loan_type: string;
  line: string;
}
