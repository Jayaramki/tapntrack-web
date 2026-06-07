import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';
import { Loan, ArchiveLoan, CreateLoanRequest, UpdateLoanRequest, PendingLoan } from '../../core/models/loan.model';
import { BaseLoanService } from '../../core/services/base-loan.service';
import { MOCK_LOANS, MOCK_ARCHIVE_LOANS } from '../data/loans.mock';
import { MOCK_CUSTOMERS } from '../data/customers.mock';
import { MOCK_DAILY_ENTRIES } from '../data/daily-entries.mock';

function calcTotalCollected(loanId: number): number {
  return MOCK_DAILY_ENTRIES.filter(e => e.loan_id === loanId).reduce((sum, e) => sum + e.amount, 0);
}

function calcPendingDays(loan: Loan): number {
  const entries = MOCK_DAILY_ENTRIES.filter(e => e.loan_id === loan.id);
  const lastDate = entries.length
    ? entries.reduce((latest, e) => e.entry_date > latest ? e.entry_date : latest, entries[0].entry_date)
    : loan.issued_date;
  const diff = new Date('2026-05-23').getTime() - new Date(lastDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function enrichLoan(loan: Loan): Loan {
  const customer = MOCK_CUSTOMERS.find(c => c.id === loan.customer_id);
  const total = calcTotalCollected(loan.id);
  return {
    ...loan,
    customer_name: customer?.name ?? '',
    total_collected: total,
    remaining_balance: loan.loan_amount - total,
  };
}

function isOverdue(loan: Loan, pendingDays: number): boolean {
  if (loan.loan_type === 'daily') return pendingDays > 3;
  if (loan.loan_type === 'weekly') return pendingDays > 14;
  if (loan.loan_type === 'monthly') return pendingDays > 60;
  return false;
}

@Injectable({ providedIn: 'root' })
export class MockLoanService extends BaseLoanService {
  private loans: Loan[] = [...MOCK_LOANS];
  private archiveLoans: ArchiveLoan[] = [...MOCK_ARCHIVE_LOANS];

  getAll(book_id: number): Observable<ApiResponse<Loan[]>> {
    const active = this.loans
      .filter(l => l.book_id === book_id && !l.is_deleted)
      .map(enrichLoan);
    return of({ success: true, data: active }).pipe(delay(200));
  }

  getDeleted(book_id: number): Observable<ApiResponse<Loan[]>> {
    const deleted = this.loans
      .filter(l => l.book_id === book_id && l.is_deleted)
      .map(enrichLoan);
    return of({ success: true, data: deleted }).pipe(delay(200));
  }

  getArchived(book_id: number): Observable<ApiResponse<ArchiveLoan[]>> {
    const archived = this.archiveLoans.filter(l => l.book_id === book_id);
    return of({ success: true, data: archived }).pipe(delay(200));
  }

  getPending(book_id: number): Observable<ApiResponse<PendingLoan[]>> {
    const pending: PendingLoan[] = this.loans
      .filter(l => l.book_id === book_id && !l.is_deleted && !l.completed_date)
      .map(loan => {
        const days = calcPendingDays(loan);
        return {
          ...enrichLoan(loan),
          act_pending_days: days,
          is_overdue: isOverdue(loan, days),
        };
      })
      .filter(l => l.act_pending_days > 0);
    return of({ success: true, data: pending }).pipe(delay(200));
  }

  getById(id: number): Observable<ApiResponse<Loan>> {
    const loan = this.loans.find(l => l.id === id);
    return of({ success: true, data: enrichLoan(loan!) }).pipe(delay(200));
  }

  create(data: CreateLoanRequest): Observable<ApiResponse<Loan>> {
    const newLoan: Loan = {
      id: Math.max(...this.loans.map(l => l.id)) + 1,
      ...data,
      completed_date: null,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.loans.push(newLoan);
    return of({ success: true, data: enrichLoan(newLoan), message: 'Loan created successfully' }).pipe(delay(300));
  }

  update(id: number, data: UpdateLoanRequest): Observable<ApiResponse<Loan>> {
    const idx = this.loans.findIndex(l => l.id === id);
    this.loans[idx] = { ...this.loans[idx], ...data, updated_at: new Date().toISOString() };
    return of({ success: true, data: enrichLoan(this.loans[idx]), message: 'Loan updated successfully' }).pipe(delay(300));
  }

  softDelete(id: number): Observable<ApiResponse<null>> {
    const idx = this.loans.findIndex(l => l.id === id);
    this.loans[idx] = { ...this.loans[idx], is_deleted: true, updated_at: new Date().toISOString() };
    return of({ success: true, data: null, message: 'Loan deleted' }).pipe(delay(200));
  }

  restore(id: number): Observable<ApiResponse<Loan>> {
    const idx = this.loans.findIndex(l => l.id === id);
    this.loans[idx] = { ...this.loans[idx], is_deleted: false, updated_at: new Date().toISOString() };
    return of({ success: true, data: enrichLoan(this.loans[idx]), message: 'Loan restored' }).pipe(delay(200));
  }

  archive(id: number): Observable<ApiResponse<null>> {
    const idx = this.loans.findIndex(l => l.id === id);
    const loan = this.loans[idx];
    const archived: ArchiveLoan = {
      ...enrichLoan(loan),
      archived_at: new Date().toISOString(),
    };
    this.archiveLoans.push(archived);
    this.loans.splice(idx, 1);
    return of({ success: true, data: null, message: 'Loan archived' }).pipe(delay(300));
  }

  unarchive(id: number): Observable<ApiResponse<Loan>> {
    const idx = this.archiveLoans.findIndex(l => l.id === id);
    const { archived_at, ...loan } = this.archiveLoans[idx];
    this.loans.push(loan as Loan);
    this.archiveLoans.splice(idx, 1);
    return of({ success: true, data: loan as Loan, message: 'Loan restored from archive' }).pipe(delay(300));
  }

  permanentDelete(id: number): Observable<ApiResponse<null>> {
    this.archiveLoans = this.archiveLoans.filter(l => l.id !== id);
    return of({ success: true, data: null, message: 'Loan permanently deleted' }).pipe(delay(200));
  }

  hardDelete(id: number): Observable<ApiResponse<null>> {
    this.loans = this.loans.filter(l => l.id !== id);
    return of({ success: true, data: null, message: 'Loan permanently deleted' }).pipe(delay(200));
  }
}
