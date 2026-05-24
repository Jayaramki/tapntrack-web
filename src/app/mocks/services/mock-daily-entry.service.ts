import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { DailyEntry, CreateDailyEntryRequest, BulkDailyEntryRequest, DaySummary, LedgerData, LedgerRow, LedgerCell } from '../../core/models/daily-entry.model';
import { BaseDailyEntryService, BaseLedgerService } from '../../core/services/base-daily-entry.service';
import { MOCK_DAILY_ENTRIES } from '../data/daily-entries.mock';
import { MOCK_LOANS } from '../data/loans.mock';
import { MOCK_CUSTOMERS } from '../data/customers.mock';
import { MOCK_EXPENSES } from '../data/expenses.mock';

function enrichEntry(entry: DailyEntry): DailyEntry {
  const loan = MOCK_LOANS.find(l => l.id === entry.loan_id);
  const customer = loan ? MOCK_CUSTOMERS.find(c => c.id === loan.customer_id) : null;
  return { ...entry, loan_number: loan?.loan_number, customer_name: customer?.name, line: loan?.line };
}

@Injectable({ providedIn: 'root' })
export class MockDailyEntryService extends BaseDailyEntryService {
  private entries: DailyEntry[] = [...MOCK_DAILY_ENTRIES];

  getByLoan(loan_id: number): Observable<ApiResponse<DailyEntry[]>> {
    const result = this.entries.filter(e => e.loan_id === loan_id).map(enrichEntry);
    return of({ success: true, data: result }).pipe(delay(200));
  }

  getByDate(book_id: number, date: string): Observable<ApiResponse<DailyEntry[]>> {
    const result = this.entries.filter(e => e.book_id === book_id && e.entry_date === date).map(enrichEntry);
    return of({ success: true, data: result }).pipe(delay(200));
  }

  create(data: CreateDailyEntryRequest): Observable<ApiResponse<DailyEntry>> {
    const newEntry: DailyEntry = {
      id: Math.max(...this.entries.map(e => e.id)) + 1,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.entries.push(newEntry);
    return of({ success: true, data: enrichEntry(newEntry), message: 'Entry recorded' }).pipe(delay(300));
  }

  bulkCreate(data: BulkDailyEntryRequest): Observable<ApiResponse<DailyEntry[]>> {
    const created: DailyEntry[] = data.entries.map((item, i) => {
      const entry: DailyEntry = {
        id: Math.max(...this.entries.map(e => e.id)) + 1 + i,
        book_id: data.book_id,
        loan_id: item.loan_id,
        entry_date: data.entry_date,
        amount: item.amount,
        mode: item.mode,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.entries.push(entry);
      return enrichEntry(entry);
    });
    return of({ success: true, data: created, message: `${created.length} entries recorded` }).pipe(delay(400));
  }

  update(id: number, data: Partial<CreateDailyEntryRequest>): Observable<ApiResponse<DailyEntry>> {
    const idx = this.entries.findIndex(e => e.id === id);
    this.entries[idx] = { ...this.entries[idx], ...data, updated_at: new Date().toISOString() };
    return of({ success: true, data: enrichEntry(this.entries[idx]) }).pipe(delay(300));
  }

  delete(id: number): Observable<ApiResponse<null>> {
    this.entries = this.entries.filter(e => e.id !== id);
    return of({ success: true, data: null, message: 'Entry deleted' }).pipe(delay(200));
  }

  getDaySummary(book_id: number, date: string): Observable<ApiResponse<DaySummary>> {
    const dayEntries = this.entries.filter(e => e.book_id === book_id && e.entry_date === date).map(enrichEntry);
    const totalCash = dayEntries.filter(e => e.mode === 'cash').reduce((s, e) => s + e.amount, 0);
    const totalGpay = dayEntries.filter(e => e.mode === 'gpay').reduce((s, e) => s + e.amount, 0);
    const totalCollection = totalCash + totalGpay;
    const dayExpenses = MOCK_EXPENSES.filter(ex => ex.book_id === book_id && ex.expense_date === date && ex.is_active);
    const totalExpenses = dayExpenses.reduce((s, ex) => s + ex.amount, 0);
    const summary: DaySummary = {
      date,
      book_id,
      total_cash: totalCash,
      total_gpay: totalGpay,
      total_collection: totalCollection,
      total_expenses: totalExpenses,
      net: totalCollection - totalExpenses,
      entries: dayEntries,
    };
    return of({ success: true, data: summary }).pipe(delay(200));
  }
}

@Injectable({ providedIn: 'root' })
export class MockLedgerService extends BaseLedgerService {
  private entries: DailyEntry[] = [...MOCK_DAILY_ENTRIES];

  getLedger(book_id: number, year: number, month: number): Observable<ApiResponse<LedgerData>> {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const loans = MOCK_LOANS.filter(l => l.book_id === book_id && !l.is_deleted);
    const monthPad = String(month).padStart(2, '0');

    const rows: LedgerRow[] = loans.map(loan => {
      const customer = MOCK_CUSTOMERS.find(c => c.id === loan.customer_id);
      const loanEntries = this.entries.filter(e =>
        e.loan_id === loan.id &&
        e.entry_date.startsWith(`${year}-${monthPad}`)
      );
      const cells: Record<string, LedgerCell> = {};
      days.forEach(d => {
        const dateStr = `${year}-${monthPad}-${String(d).padStart(2, '0')}`;
        const entry = loanEntries.find(e => e.entry_date === dateStr);
        cells[dateStr] = {
          id: entry?.id,                    // needed for update/delete
          loan_id: loan.id,
          date: dateStr,
          amount: entry?.amount ?? null,
          mode: entry?.mode ?? null,
        };
      });
      const totalCollected = this.entries.filter(e => e.loan_id === loan.id).reduce((s, e) => s + e.amount, 0);
      return {
        loan_id: loan.id,
        loan_number: loan.loan_number,
        customer_name: customer?.name ?? '',
        loan_amount: loan.loan_amount,
        line: loan.line,                    // for line filter
        total_collected: totalCollected,
        remaining_balance: loan.loan_amount - totalCollected,
        cells,
      };
    });

    return of({
      success: true,
      data: { book_id, year, month, days, rows },
    }).pipe(delay(300));
  }
}
