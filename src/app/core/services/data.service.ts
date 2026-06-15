import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

// Auth
import { BaseAuthService } from '../services/base-auth.service';
import { MockAuthService } from '../../mocks/services/mock-auth.service';
import { HttpAuthService } from '../services/http-auth.service';

// Book
import { BaseBookService } from '../services/base-book.service';
import { MockBookService } from '../../mocks/services/mock-book.service';
import { HttpBookService } from '../services/http-book.service';

// User
import { BaseUserService } from '../services/base-user.service';
import { MockUserService } from '../../mocks/services/mock-user.service';

// Customer
import { BaseCustomerService } from '../services/base-customer.service';
import { MockCustomerService } from '../../mocks/services/mock-customer.service';
import { HttpCustomerService } from '../services/http-customer.service';

// Loan
import { BaseLoanService } from '../services/base-loan.service';
import { MockLoanService } from '../../mocks/services/mock-loan.service';
import { HttpLoanService } from '../services/http-loan.service';

// Daily Entry + Ledger
import { BaseDailyEntryService, BaseLedgerService } from '../services/base-daily-entry.service';
import { MockDailyEntryService, MockLedgerService } from '../../mocks/services/mock-daily-entry.service';
import { HttpDailyEntryService, HttpLedgerService } from '../services/http-daily-entry.service';

// Expense
import { BaseExpenseService } from '../services/base-expense.service';
import { MockExpenseService } from '../../mocks/services/mock-expense.service';
import { HttpExpenseService } from '../services/http-expense.service';

// Settings, Dashboard, Reports
import { BaseSettingsService, BaseDashboardService, BaseReportsService } from '../services/base-settings.service';
import { MockSettingsService, MockDashboardService, MockReportsService } from '../../mocks/services/mock-settings.service';
import { HttpSettingsService } from '../services/http-settings.service';

/**
 * DataService acts as a service locator.
 * Auth can be routed to the backend when environment.useApiAuth is enabled.
 * Other domains remain mocked until their HTTP services are implemented.
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
    if (environment.useApiAuth) {
      this.auth = inject(HttpAuthService);
    } else if (environment.useMocks) {
      this.auth = inject(MockAuthService);
    } else {
      this.auth = inject(MockAuthService);
    }

    this.books = environment.useMocks ? inject(MockBookService) : inject(HttpBookService);
    this.users = inject(MockUserService);
    this.customers = environment.useMocks ? inject(MockCustomerService) : inject(HttpCustomerService);
    this.loans = environment.useMocks ? inject(MockLoanService) : inject(HttpLoanService);
    this.dailyEntries = environment.useMocks ? inject(MockDailyEntryService) : inject(HttpDailyEntryService);
    this.ledger = environment.useMocks ? inject(MockLedgerService) : inject(HttpLedgerService);
    this.expenses = environment.useMocks ? inject(MockExpenseService) : inject(HttpExpenseService);
    this.settings = environment.useMocks ? inject(MockSettingsService) : inject(HttpSettingsService);
    this.dashboard = inject(MockDashboardService);
    this.reports = inject(MockReportsService);
  }
}
