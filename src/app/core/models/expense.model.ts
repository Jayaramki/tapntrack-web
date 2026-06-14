export interface ExpenseCategoryConfig {
  id: string;
  book_id: string;
  name: string;
  color: string;
  is_active: boolean;
}

export interface Expense {
  id: string;
  book_id: string;
  expense_date: string;
  description: string;
  category: string;       // free string — matches ExpenseCategoryConfig.name
  amount: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseRequest {
  book_id: string;
  expense_date: string;
  description: string;
  category: string;
  amount: number;
}

export type UpdateExpenseRequest = Partial<CreateExpenseRequest>;

export interface CreateExpenseCategoryRequest {
  book_id: string;
  name: string;
  color: string;
  is_active?: boolean;
}
