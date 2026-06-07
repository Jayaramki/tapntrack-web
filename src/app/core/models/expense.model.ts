export interface ExpenseCategoryConfig {
  id: number;
  book_id: number;
  name: string;
  color: string;
  is_active: boolean;
}

export interface Expense {
  id: number;
  book_id: number;
  expense_date: string;
  description: string;
  category: string;       // free string — matches ExpenseCategoryConfig.name
  amount: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseRequest {
  book_id: number;
  expense_date: string;
  description: string;
  category: string;
  amount: number;
}

export type UpdateExpenseRequest = Partial<CreateExpenseRequest>;

export interface CreateExpenseCategoryRequest {
  book_id: number;
  name: string;
  color: string;
  is_active?: boolean;
}
