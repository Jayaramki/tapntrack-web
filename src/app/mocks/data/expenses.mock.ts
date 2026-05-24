import { Expense } from '../../core/models/expense.model';

export const MOCK_EXPENSES: Expense[] = [
  // Book 1 — Chennai Branch
  { id: 1,  book_id: 1, expense_date: '2026-05-01', description: 'Office Rent - May 2026',           category: 'Other',  amount: 5000,  is_active: true,  created_at: '2026-05-01T09:00:00Z', updated_at: '2026-05-01T09:00:00Z' },
  { id: 2,  book_id: 1, expense_date: '2026-05-05', description: 'GPay Transaction Charges',          category: 'GPay',   amount: 150,   is_active: true,  created_at: '2026-05-05T10:00:00Z', updated_at: '2026-05-05T10:00:00Z' },
  { id: 3,  book_id: 1, expense_date: '2026-05-10', description: 'Cheetu Monthly Payment - May',      category: 'Cheetu', amount: 10000, is_active: true,  created_at: '2026-05-10T11:00:00Z', updated_at: '2026-05-10T11:00:00Z' },
  { id: 4,  book_id: 1, expense_date: '2026-05-15', description: 'Vatti - Capital Interest May',      category: 'Vatti',  amount: 3000,  is_active: true,  created_at: '2026-05-15T12:00:00Z', updated_at: '2026-05-15T12:00:00Z' },
  { id: 5,  book_id: 1, expense_date: '2026-05-20', description: 'Stationery and Office Supplies',    category: 'Other',  amount: 500,   is_active: true,  created_at: '2026-05-20T09:00:00Z', updated_at: '2026-05-20T09:00:00Z' },
  { id: 6,  book_id: 1, expense_date: '2026-04-15', description: 'Previous Month Expense (inactive)', category: 'Other',  amount: 800,   is_active: false, created_at: '2026-04-15T09:00:00Z', updated_at: '2026-05-01T09:00:00Z' },

  // Book 2 — Madurai Branch
  { id: 7,  book_id: 2, expense_date: '2026-05-01', description: 'Branch Electricity Bill - May',     category: 'Other',  amount: 1200,  is_active: true,  created_at: '2026-05-01T09:30:00Z', updated_at: '2026-05-01T09:30:00Z' },
  { id: 8,  book_id: 2, expense_date: '2026-05-07', description: 'GPay Service Fee',                  category: 'GPay',   amount: 200,   is_active: true,  created_at: '2026-05-07T10:30:00Z', updated_at: '2026-05-07T10:30:00Z' },
  { id: 9,  book_id: 2, expense_date: '2026-05-10', description: 'Cheetu - May Contribution',         category: 'Cheetu', amount: 8000,  is_active: true,  created_at: '2026-05-10T11:30:00Z', updated_at: '2026-05-10T11:30:00Z' },
  { id: 10, book_id: 2, expense_date: '2026-05-12', description: 'Interest Paid on Capital',          category: 'Vatti',  amount: 2500,  is_active: true,  created_at: '2026-05-12T12:30:00Z', updated_at: '2026-05-12T12:30:00Z' },
  { id: 11, book_id: 2, expense_date: '2026-05-18', description: 'Travel Expense - Field Visit',      category: 'Travel', amount: 650,   is_active: true,  created_at: '2026-05-18T09:30:00Z', updated_at: '2026-05-18T09:30:00Z' },
];

