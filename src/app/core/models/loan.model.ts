export type LoanType = 'daily' | 'weekly' | 'monthly';
export type LoanLine = 'line1' | 'line2' | 'line3' | 'line4' | 'line5' | 'line6';

export interface Loan {
  id: number;
  book_id: number;
  customer_id: number;
  loan_number: string;
  loan_amount: number;
  interest_amount: number;
  loan_type: LoanType;
  line: LoanLine;
  issued_date: string;
  completed_date: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  // Joined/computed fields
  customer_name?: string;
  total_collected?: number;
  remaining_balance?: number;
  act_pending_days?: number;
}

export interface ArchiveLoan extends Omit<Loan, 'is_deleted'> {
  archived_at: string;
}

export interface CreateLoanRequest {
  book_id: number;
  customer_id: number;
  loan_number: string;
  loan_amount: number;
  interest_amount: number;
  loan_type: LoanType;
  line: LoanLine;
  issued_date: string;
}

export type UpdateLoanRequest = Partial<CreateLoanRequest>;

export interface PendingLoan extends Loan {
  act_pending_days: number;
  is_overdue: boolean;
}
