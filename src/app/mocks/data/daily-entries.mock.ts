import { DailyEntry } from '../../core/models/daily-entry.model';

// Daily entries for May 2026 (current month as of 2026-05-23)
// Covers loans in Book 1 (id 1–10) and Book 2 (id 13–22)

export const MOCK_DAILY_ENTRIES: DailyEntry[] = [
  // --- Book 1 entries ---
  // Loan 1 (CHN-001, daily, ₹10000)
  { id: 1,  book_id: 1, loan_id: 1, entry_date: '2026-05-02', amount: 200, mode: 'cash', created_at: '2026-05-02T10:00:00Z', updated_at: '2026-05-02T10:00:00Z' },
  { id: 2,  book_id: 1, loan_id: 1, entry_date: '2026-05-05', amount: 200, mode: 'cash', created_at: '2026-05-05T10:00:00Z', updated_at: '2026-05-05T10:00:00Z' },
  { id: 3,  book_id: 1, loan_id: 1, entry_date: '2026-05-08', amount: 200, mode: 'cash', created_at: '2026-05-08T10:00:00Z', updated_at: '2026-05-08T10:00:00Z' },
  { id: 4,  book_id: 1, loan_id: 1, entry_date: '2026-05-12', amount: 200, mode: 'cash', created_at: '2026-05-12T10:00:00Z', updated_at: '2026-05-12T10:00:00Z' },
  { id: 5,  book_id: 1, loan_id: 1, entry_date: '2026-05-16', amount: 200, mode: 'cash', created_at: '2026-05-16T10:00:00Z', updated_at: '2026-05-16T10:00:00Z' },
  { id: 6,  book_id: 1, loan_id: 1, entry_date: '2026-05-20', amount: 200, mode: 'cash', created_at: '2026-05-20T10:00:00Z', updated_at: '2026-05-20T10:00:00Z' },

  // Loan 2 (CHN-002, daily, ₹15000)
  { id: 7,  book_id: 1, loan_id: 2, entry_date: '2026-05-02', amount: 300, mode: 'cash', created_at: '2026-05-02T10:05:00Z', updated_at: '2026-05-02T10:05:00Z' },
  { id: 8,  book_id: 1, loan_id: 2, entry_date: '2026-05-05', amount: 300, mode: 'gpay', created_at: '2026-05-05T10:05:00Z', updated_at: '2026-05-05T10:05:00Z' },
  { id: 9,  book_id: 1, loan_id: 2, entry_date: '2026-05-09', amount: 300, mode: 'gpay', created_at: '2026-05-09T10:05:00Z', updated_at: '2026-05-09T10:05:00Z' },
  { id: 10, book_id: 1, loan_id: 2, entry_date: '2026-05-14', amount: 300, mode: 'cash', created_at: '2026-05-14T10:05:00Z', updated_at: '2026-05-14T10:05:00Z' },
  { id: 11, book_id: 1, loan_id: 2, entry_date: '2026-05-19', amount: 300, mode: 'cash', created_at: '2026-05-19T10:05:00Z', updated_at: '2026-05-19T10:05:00Z' },

  // Loan 3 (CHN-003, daily, ₹20000)
  { id: 12, book_id: 1, loan_id: 3, entry_date: '2026-05-03', amount: 400, mode: 'cash', created_at: '2026-05-03T10:10:00Z', updated_at: '2026-05-03T10:10:00Z' },
  { id: 13, book_id: 1, loan_id: 3, entry_date: '2026-05-07', amount: 400, mode: 'cash', created_at: '2026-05-07T10:10:00Z', updated_at: '2026-05-07T10:10:00Z' },
  { id: 14, book_id: 1, loan_id: 3, entry_date: '2026-05-13', amount: 400, mode: 'gpay', created_at: '2026-05-13T10:10:00Z', updated_at: '2026-05-13T10:10:00Z' },
  { id: 15, book_id: 1, loan_id: 3, entry_date: '2026-05-20', amount: 400, mode: 'cash', created_at: '2026-05-20T10:10:00Z', updated_at: '2026-05-20T10:10:00Z' },

  // Loan 4 (CHN-004, weekly, ₹8000) — no entry this month (pending)
  // Loan 5 (CHN-005, daily, ₹25000)
  { id: 16, book_id: 1, loan_id: 5, entry_date: '2026-05-06', amount: 500, mode: 'cash', created_at: '2026-05-06T10:15:00Z', updated_at: '2026-05-06T10:15:00Z' },
  { id: 17, book_id: 1, loan_id: 5, entry_date: '2026-05-13', amount: 500, mode: 'cash', created_at: '2026-05-13T10:15:00Z', updated_at: '2026-05-13T10:15:00Z' },
  { id: 18, book_id: 1, loan_id: 5, entry_date: '2026-05-20', amount: 500, mode: 'gpay', created_at: '2026-05-20T10:15:00Z', updated_at: '2026-05-20T10:15:00Z' },

  // Loan 6 (CHN-006, daily, ₹12000)
  { id: 19, book_id: 1, loan_id: 6, entry_date: '2026-05-02', amount: 240, mode: 'cash', created_at: '2026-05-02T10:20:00Z', updated_at: '2026-05-02T10:20:00Z' },
  { id: 20, book_id: 1, loan_id: 6, entry_date: '2026-05-09', amount: 240, mode: 'cash', created_at: '2026-05-09T10:20:00Z', updated_at: '2026-05-09T10:20:00Z' },
  { id: 21, book_id: 1, loan_id: 6, entry_date: '2026-05-16', amount: 240, mode: 'cash', created_at: '2026-05-16T10:20:00Z', updated_at: '2026-05-16T10:20:00Z' },

  // Loan 7 (CHN-007, monthly, ₹30000) — 1 entry
  { id: 22, book_id: 1, loan_id: 7, entry_date: '2026-05-15', amount: 3000, mode: 'gpay', created_at: '2026-05-15T10:25:00Z', updated_at: '2026-05-15T10:25:00Z' },

  // Loan 8 (CHN-008, daily, ₹18000)
  { id: 23, book_id: 1, loan_id: 8, entry_date: '2026-05-05', amount: 360, mode: 'cash', created_at: '2026-05-05T10:30:00Z', updated_at: '2026-05-05T10:30:00Z' },
  { id: 24, book_id: 1, loan_id: 8, entry_date: '2026-05-12', amount: 360, mode: 'cash', created_at: '2026-05-12T10:30:00Z', updated_at: '2026-05-12T10:30:00Z' },
  { id: 25, book_id: 1, loan_id: 8, entry_date: '2026-05-19', amount: 360, mode: 'cash', created_at: '2026-05-19T10:30:00Z', updated_at: '2026-05-19T10:30:00Z' },

  // Loan 9 (CHN-009, weekly, ₹5000) — no entry this month (overdue)
  // Loan 10 (CHN-010, daily, ₹40000)
  { id: 26, book_id: 1, loan_id: 10, entry_date: '2026-05-04', amount: 800, mode: 'cash', created_at: '2026-05-04T10:35:00Z', updated_at: '2026-05-04T10:35:00Z' },
  { id: 27, book_id: 1, loan_id: 10, entry_date: '2026-05-11', amount: 800, mode: 'gpay', created_at: '2026-05-11T10:35:00Z', updated_at: '2026-05-11T10:35:00Z' },
  { id: 28, book_id: 1, loan_id: 10, entry_date: '2026-05-18', amount: 800, mode: 'gpay', created_at: '2026-05-18T10:35:00Z', updated_at: '2026-05-18T10:35:00Z' },

  // --- Book 2 entries ---
  // Loan 13 (MDU-001, daily, ₹10000)
  { id: 29, book_id: 2, loan_id: 13, entry_date: '2026-05-02', amount: 200, mode: 'cash', created_at: '2026-05-02T11:00:00Z', updated_at: '2026-05-02T11:00:00Z' },
  { id: 30, book_id: 2, loan_id: 13, entry_date: '2026-05-09', amount: 200, mode: 'cash', created_at: '2026-05-09T11:00:00Z', updated_at: '2026-05-09T11:00:00Z' },
  { id: 31, book_id: 2, loan_id: 13, entry_date: '2026-05-16', amount: 200, mode: 'cash', created_at: '2026-05-16T11:00:00Z', updated_at: '2026-05-16T11:00:00Z' },

  // Loan 14 (MDU-002, daily, ₹20000)
  { id: 32, book_id: 2, loan_id: 14, entry_date: '2026-05-03', amount: 400, mode: 'gpay', created_at: '2026-05-03T11:05:00Z', updated_at: '2026-05-03T11:05:00Z' },
  { id: 33, book_id: 2, loan_id: 14, entry_date: '2026-05-10', amount: 400, mode: 'gpay', created_at: '2026-05-10T11:05:00Z', updated_at: '2026-05-10T11:05:00Z' },
  { id: 34, book_id: 2, loan_id: 14, entry_date: '2026-05-17', amount: 400, mode: 'cash', created_at: '2026-05-17T11:05:00Z', updated_at: '2026-05-17T11:05:00Z' },

  // Loan 17 (MDU-005, daily, ₹25000)
  { id: 35, book_id: 2, loan_id: 17, entry_date: '2026-05-05', amount: 500, mode: 'cash', created_at: '2026-05-05T11:10:00Z', updated_at: '2026-05-05T11:10:00Z' },
  { id: 36, book_id: 2, loan_id: 17, entry_date: '2026-05-12', amount: 500, mode: 'cash', created_at: '2026-05-12T11:10:00Z', updated_at: '2026-05-12T11:10:00Z' },
  { id: 37, book_id: 2, loan_id: 17, entry_date: '2026-05-19', amount: 500, mode: 'cash', created_at: '2026-05-19T11:10:00Z', updated_at: '2026-05-19T11:10:00Z' },

  // Loan 22 (MDU-010, daily, ₹50000)
  { id: 38, book_id: 2, loan_id: 22, entry_date: '2026-05-06', amount: 1000, mode: 'cash', created_at: '2026-05-06T11:15:00Z', updated_at: '2026-05-06T11:15:00Z' },
  { id: 39, book_id: 2, loan_id: 22, entry_date: '2026-05-13', amount: 1000, mode: 'gpay', created_at: '2026-05-13T11:15:00Z', updated_at: '2026-05-13T11:15:00Z' },
  { id: 40, book_id: 2, loan_id: 22, entry_date: '2026-05-20', amount: 1000, mode: 'gpay', created_at: '2026-05-20T11:15:00Z', updated_at: '2026-05-20T11:15:00Z' },
];
