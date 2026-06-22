import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { AppSetting, UpdateSettingRequest } from '../../core/models/app-setting.model';
import { DashboardStats, ReportFilter, CollectionReport, LoanReport } from '../../core/models/dashboard.model';
import { BaseSettingsService, BaseDashboardService, BaseReportsService } from '../../core/services/base-settings.service';
import { MOCK_APP_SETTINGS } from '../data/app-settings.mock';
import { MOCK_DAILY_ENTRIES } from '../data/daily-entries.mock';
import { MOCK_EXPENSES } from '../data/expenses.mock';
import { MOCK_LOANS } from '../data/loans.mock';
import { MOCK_CUSTOMERS } from '../data/customers.mock';
import { MOCK_EXPENSE_CATEGORIES } from '../data/expense-categories.mock';
import { AuthStore } from '../../core/stores/auth.store';

@Injectable({ providedIn: 'root' })
export class MockSettingsService extends BaseSettingsService {
  private settings: AppSetting[] = [...MOCK_APP_SETTINGS];

  getAll(book_id: string): Observable<ApiResponse<AppSetting[]>> {
    return of({ success: true, data: this.settings.filter(s => s.book_id === book_id) }).pipe(delay(200));
  }

  update(book_id: string, data: UpdateSettingRequest): Observable<ApiResponse<AppSetting>> {
    const idx = this.settings.findIndex(s => s.book_id === book_id && s.key === data.key);
    if (idx === -1) {
      const newSetting: AppSetting = {
        id: crypto.randomUUID(),
        book_id,
        key: data.key,
        value: data.value,
        updated_by: AuthStore.user()?.id ?? '',
        updated_at: new Date().toISOString(),
      };
      this.settings.push(newSetting);
      return of({ success: true, data: newSetting }).pipe(delay(300));
    }
    this.settings[idx] = { ...this.settings[idx], value: data.value, updated_at: new Date().toISOString() };
    return of({ success: true, data: this.settings[idx] }).pipe(delay(300));
  }
}

@Injectable({ providedIn: 'root' })
export class MockDashboardService extends BaseDashboardService {
  getStats(book_id: string, from: string, to: string): Observable<ApiResponse<DashboardStats>> {
    const entries = MOCK_DAILY_ENTRIES.filter(
      e => e.book_id === book_id && e.entry_date >= from && e.entry_date <= to
    );
    const expenses = MOCK_EXPENSES.filter(
      ex => ex.book_id === book_id && ex.expense_date >= from && ex.expense_date <= to && ex.is_active
    );
    const activeLoans = MOCK_LOANS.filter(l => l.book_id === book_id && !l.is_deleted && !l.completed_date);

    const totalCash = entries.filter(e => e.mode === 'cash').reduce((s, e) => s + e.amount, 0);
    const totalGpay = entries.filter(e => e.mode === 'gpay').reduce((s, e) => s + e.amount, 0);
    const totalCollection = totalCash + totalGpay;

    // Build dynamic expense_by_category from active categories for this book
    const bookCats = MOCK_EXPENSE_CATEGORIES.filter(c => c.book_id === book_id && c.is_active);
    const expenseByCategory: Record<string, number> = {};
    for (const cat of bookCats) {
      expenseByCategory[cat.name] = expenses.filter(ex => ex.category === cat.name).reduce((s, ex) => s + ex.amount, 0);
    }

    const stats: DashboardStats = {
      book_id,
      date_range: { from, to },
      total_cash: totalCash,
      total_gpay: totalGpay,
      total_collection: totalCollection,
      total_interest_income: MOCK_LOANS.filter(l => l.book_id === book_id).reduce((s, l) => s + l.interest_amount, 0),
      income_overall: totalCollection,
      expense_by_category: expenseByCategory,
      expense_overall: expenses.reduce((s, ex) => s + ex.amount, 0),
      net_profit: totalCollection - expenses.reduce((s, ex) => s + ex.amount, 0),
      active_loans: activeLoans.length,
      completed_loans_this_period: 0,
      pending_loans: activeLoans.filter(l => {
        const lastEntry = MOCK_DAILY_ENTRIES.filter(e => e.loan_id === l.id).sort((a, b) => b.entry_date.localeCompare(a.entry_date))[0];
        const lastDate = lastEntry?.entry_date ?? l.issued_date;
        const days = Math.floor((new Date('2026-05-23').getTime() - new Date(lastDate).getTime()) / 86400000);
        if (l.loan_type === 'daily') return days > 3;
        if (l.loan_type === 'weekly') return days > 14;
        return days > 60;
      }).length,
      total_customers: MOCK_CUSTOMERS.filter(c => c.book_id === book_id).length,
    };
    return of({ success: true, data: stats }).pipe(delay(300));
  }
}

@Injectable({ providedIn: 'root' })
export class MockReportsService extends BaseReportsService {
  getCollectionReport(filter: ReportFilter): Observable<ApiResponse<CollectionReport[]>> {
    const entries = MOCK_DAILY_ENTRIES.filter(
      e => e.book_id === filter.book_id && e.entry_date >= filter.from_date && e.entry_date <= filter.to_date
    );
    const report: CollectionReport[] = entries.map(e => {
      const loan = MOCK_LOANS.find(l => l.id === e.loan_id);
      const customer = loan ? MOCK_CUSTOMERS.find(c => c.id === loan.customer_id) : null;
      return {
        date: e.entry_date,
        loan_number: loan?.loan_number ?? '',
        customer_name: customer?.name ?? '',
        customer_number: customer?.customer_number,
        amount: e.amount,
        mode: e.mode,
      };
    });
    return of({ success: true, data: report }).pipe(delay(300));
  }

  getLoanReport(filter: ReportFilter): Observable<ApiResponse<LoanReport[]>> {
    const loans = MOCK_LOANS.filter(l => l.book_id === filter.book_id && !l.is_deleted);
    const report: LoanReport[] = loans.map(l => {
      const customer = MOCK_CUSTOMERS.find(c => c.id === l.customer_id);
      const total = MOCK_DAILY_ENTRIES.filter(e => e.loan_id === l.id).reduce((s, e) => s + e.amount, 0);
      return {
        loan_number: l.loan_number,
        customer_name: customer?.name ?? '',
        customer_number: customer?.customer_number,
        loan_amount: l.loan_amount,
        total_collected: total,
        remaining_balance: l.loan_amount - total,
        issued_date: l.issued_date,
        completed_date: l.completed_date,
        loan_type: l.loan_type,
        line: l.line,
      };
    });
    return of({ success: true, data: report }).pipe(delay(300));
  }
}
