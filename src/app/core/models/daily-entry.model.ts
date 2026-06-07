import { LoanLine } from './loan.model';

export type PaymentMode = 'cash' | 'gpay';
export interface DailyEntry {
  id: number;
  book_id: number;
  loan_id: number;
  entry_date: string;
  amount: number;
  mode: PaymentMode;
  created_at: string;
  updated_at: string;
  // Joined fields
  loan_number?: string;
  customer_name?: string;
  line?: LoanLine;
}

export interface CreateDailyEntryRequest {
  book_id: number;
  loan_id: number;
  entry_date: string;
  amount: number;
  mode: PaymentMode;
}

export interface BulkEntryItem {
  loan_id: number;
  amount: number;
  mode: PaymentMode;
}

export interface BulkDailyEntryRequest {
  book_id: number;
  entry_date: string;
  entries: BulkEntryItem[];
}

export interface DaySummary {
  date: string;
  book_id: number;
  total_cash: number;
  total_gpay: number;
  total_collection: number;
  total_expenses: number;
  net: number;
  entries: DailyEntry[];
}

export interface LedgerCell {
  id?: number;          // entry id — present for existing entries, undefined for empty cells
  loan_id: number;
  date: string;
  amount: number | null;
  mode: PaymentMode | null;
}

export interface LedgerRow {
  loan_id: number;
  loan_number: string;
  customer_name: string;
  loan_amount: number;
  total_collected: number;
  remaining_balance: number;
  line?: LoanLine;      // for line filter in ledger
  cells: Record<string, LedgerCell>; // key = 'YYYY-MM-DD'
}

export interface LedgerData {
  book_id: number;
  year: number;
  month: number;
  days: number[]; // [1..31] for the month
  rows: LedgerRow[];
}
