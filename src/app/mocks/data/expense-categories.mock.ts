import { ExpenseCategoryConfig } from '../../core/models/expense.model';

export const MOCK_EXPENSE_CATEGORIES: ExpenseCategoryConfig[] = [
  // Book 1 — default categories (users can rename, delete, or add their own)
  { id: 1, book_id: 1, name: 'Cheetu',  color: '#E65100', is_active: true },
  { id: 2, book_id: 1, name: 'Vatti',   color: '#C62828', is_active: true },
  { id: 3, book_id: 1, name: 'GPay',    color: '#1565C0', is_active: true },
  { id: 4, book_id: 1, name: 'Other',   color: '#546E7A', is_active: true },

  // Book 2 — different set of categories
  { id: 5, book_id: 2, name: 'Cheetu',  color: '#E65100', is_active: true },
  { id: 6, book_id: 2, name: 'Vatti',   color: '#C62828', is_active: true },
  { id: 7, book_id: 2, name: 'Travel',  color: '#2E7D32', is_active: true },
  { id: 8, book_id: 2, name: 'Other',   color: '#546E7A', is_active: true },
];
