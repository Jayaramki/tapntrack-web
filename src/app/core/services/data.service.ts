import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

// Auth
import { BaseAuthService } from '../services/base-auth.service';
import { MockAuthService } from '../../mocks/services/mock-auth.service';

// Book
import { BaseBookService } from '../services/base-book.service';
import { MockBookService } from '../../mocks/services/mock-book.service';

// User
import { BaseUserService } from '../services/base-user.service';
import { MockUserService } from '../../mocks/services/mock-user.service';

// Customer
import { BaseCustomerService } from '../services/base-customer.service';
import { MockCustomerService } from '../../mocks/services/mock-customer.service';

// Loan
import { BaseLoanService } from '../services/base-loan.service';
import { MockLoanService } from '../../mocks/services/mock-loan.service';

// Daily Entry + Ledger
import { BaseDailyEntryService, BaseLedgerService } from '../services/base-daily-entry.service';
import { MockDailyEntryService, MockLedgerService } from '../../mocks/services/mock-daily-entry.service';

// Expense
import { BaseExpenseService } from '../services/base-expense.service';
import { MockExpenseService } from '../../mocks/services/mock-expense.service';

// Settings, Dashboard, Reports
import { BaseSettingsService, BaseDashboardService, BaseReportsService } from '../services/base-settings.service';
import { MockSettingsService, MockDashboardService, MockReportsService } from '../../mocks/services/mock-settings.service';

/**
 * DataService acts as a service locator.
 * When environment.useMocks is true, it returns mock implementations.
 * When false, it returns real HTTP implementations (to be added in a future task).
 *
 * Usage in components:
 *   private data = inject(DataService);
 *   this.data.loans.getAll(bookId).subscribe(...)
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  readonly auth: BaseAuthService;
  readonly books: BaseBookService;
  readonly users: BaseUserService;
  readonly customers: BaseCustomerService;
  readonly loans: BaseLoanService;
  readonly dailyEntries: BaseDailyEntryService;
  readonly ledger: BaseLedgerService;
  readonly expenses: BaseExpenseService;
  readonly settings: BaseSettingsService;
  readonly dashboard: BaseDashboardService;
  readonly reports: BaseReportsService;

  constructor() {
    if (environment.useMocks) {
      this.auth = inject(MockAuthService);
      this.books = inject(MockBookService);
      this.users = inject(MockUserService);
      this.customers = inject(MockCustomerService);
      this.loans = inject(MockLoanService);
      this.dailyEntries = inject(MockDailyEntryService);
      this.ledger = inject(MockLedgerService);
      this.expenses = inject(MockExpenseService);
      this.settings = inject(MockSettingsService);
      this.dashboard = inject(MockDashboardService);
      this.reports = inject(MockReportsService);
    } else {
      // Real HTTP services — to be implemented when Laravel backend is ready
      // Replace each line below with inject(HttpXxxService) once created
      this.auth = inject(MockAuthService);
      this.books = inject(MockBookService);
      this.users = inject(MockUserService);
      this.customers = inject(MockCustomerService);
      this.loans = inject(MockLoanService);
      this.dailyEntries = inject(MockDailyEntryService);
      this.ledger = inject(MockLedgerService);
      this.expenses = inject(MockExpenseService);
      this.settings = inject(MockSettingsService);
      this.dashboard = inject(MockDashboardService);
      this.reports = inject(MockReportsService);
    }
  }
}
