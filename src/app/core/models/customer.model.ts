export interface Customer {
  id: string;
  book_id: string;
  customer_number?: number | null;
  name: string;
  father_name: string;
  phone: string;
  address: string;
  profession?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerRequest {
  book_id: string;
  customer_number?: number;
  name: string;
  father_name: string;
  phone: string;
  address: string;
  profession?: string;
  is_active: boolean;
}

// On edit, customer_number may be sent as null to clear it (freeing the number
// to be assigned to another customer); the unique-per-book rule then applies.
export type UpdateCustomerRequest = Partial<Omit<CreateCustomerRequest, 'customer_number'>>
  & { customer_number?: number | null };

/** A customer's active loan, brief, for the quick-collection screen. */
export interface CollectLoan {
  id: string;
  loan_number: string;
  loan_amount: number;
  loan_type: string;
  line: string;
  today_entry: { id: string; amount: number; mode: 'cash' | 'gpay' } | null;
  total_collected?: number;   // omitted when balances are hidden from agents
  remaining_balance?: number;
}

export interface CollectLookup {
  customer: { id: string; customer_number: number; name: string; phone: string; is_active: boolean };
  loans: CollectLoan[];
}
