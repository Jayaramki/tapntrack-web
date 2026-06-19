import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Public auth routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'change-password',
    loadComponent: () => import('./features/auth/change-password/change-password.component').then(m => m.ChangePasswordComponent),
  },

  // Protected routes (inside app shell)
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [permissionGuard], data: { permission: 'view-dashboard' } },
      { path: 'books', loadComponent: () => import('./features/books/book-list/book-list.component').then(m => m.BookListComponent), canActivate: [permissionGuard], data: { permission: 'manage-books' } },
      { path: 'books/new', loadComponent: () => import('./features/books/book-form/book-form.component').then(m => m.BookFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-books' } },
      { path: 'books/:id/edit', loadComponent: () => import('./features/books/book-form/book-form.component').then(m => m.BookFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-books' } },
      { path: 'users', loadComponent: () => import('./features/users/user-list/user-list.component').then(m => m.UserListComponent), canActivate: [permissionGuard], data: { permission: 'manage-users' } },
      { path: 'users/new', loadComponent: () => import('./features/users/user-form/user-form.component').then(m => m.UserFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-users' } },
      { path: 'users/:id/edit', loadComponent: () => import('./features/users/user-form/user-form.component').then(m => m.UserFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-users' } },
      { path: 'customers', loadComponent: () => import('./features/customers/customer-list/customer-list.component').then(m => m.CustomerListComponent), canActivate: [permissionGuard], data: { permission: 'manage-customers' } },
      { path: 'customers/new', loadComponent: () => import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-customers' } },
      { path: 'customers/:id/edit', loadComponent: () => import('./features/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-customers' } },
      { path: 'loans', loadComponent: () => import('./features/loans/loan-list/loan-list.component').then(m => m.LoanListComponent), canActivate: [permissionGuard], data: { permission: 'view-loans' } },
      { path: 'loans/new', loadComponent: () => import('./features/loans/loan-form/loan-form.component').then(m => m.LoanFormComponent), canActivate: [permissionGuard], data: { permission: 'create-loans' } },
      { path: 'loans/archived', loadComponent: () => import('./features/loans/loan-archived/loan-archived.component').then(m => m.LoanArchivedComponent), canActivate: [permissionGuard], data: { permission: 'archive-loans' } },
      { path: 'loans/deleted', loadComponent: () => import('./features/loans/loan-deleted/loan-deleted.component').then(m => m.LoanDeletedComponent), canActivate: [permissionGuard], data: { permission: 'delete-loans' } },
      { path: 'loans/:id', loadComponent: () => import('./features/loans/loan-view/loan-view.component').then(m => m.LoanViewComponent), canActivate: [permissionGuard], data: { permission: 'view-loans' } },
      { path: 'loans/:id/edit', loadComponent: () => import('./features/loans/loan-form/loan-form.component').then(m => m.LoanFormComponent), canActivate: [permissionGuard], data: { permission: 'edit-loans' } },
      { path: 'pending-loans', loadComponent: () => import('./features/pending-loans/pending-loans.component').then(m => m.PendingLoansComponent), canActivate: [permissionGuard], data: { permission: 'view-pending-loans' } },
      { path: 'daily-entry', loadComponent: () => import('./features/daily-entry/daily-entry.component').then(m => m.DailyEntryComponent), canActivate: [permissionGuard], data: { permission: 'record-collection' } },
      { path: 'day-summary', loadComponent: () => import('./features/day-summary/day-summary.component').then(m => m.DaySummaryComponent), canActivate: [permissionGuard], data: { permission: 'view-day-summary' } },
      { path: 'ledger', loadComponent: () => import('./features/ledger/ledger.component').then(m => m.LedgerComponent), canActivate: [permissionGuard], data: { permission: 'view-ledger' } },
      { path: 'expenses', loadComponent: () => import('./features/expenses/expense-list/expense-list.component').then(m => m.ExpenseListComponent), canActivate: [permissionGuard], data: { permission: 'manage-expenses' } },
      { path: 'expenses/new', loadComponent: () => import('./features/expenses/expense-form/expense-form.component').then(m => m.ExpenseFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-expenses' } },
      { path: 'expenses/:id/edit', loadComponent: () => import('./features/expenses/expense-form/expense-form.component').then(m => m.ExpenseFormComponent), canActivate: [permissionGuard], data: { permission: 'manage-expenses' } },
      { path: 'reports', loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent), canActivate: [permissionGuard], data: { permission: 'view-reports' } },
      { path: 'masters', loadComponent: () => import('./features/masters/masters.component').then(m => m.MastersComponent), canActivate: [permissionGuard], data: { permission: 'manage-settings' } },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent), canActivate: [permissionGuard], data: { permission: 'manage-settings' } },
      { path: 'billing', loadComponent: () => import('./features/billing/billing.component').then(m => m.BillingComponent), canActivate: [permissionGuard], data: { permission: 'manage-billing' } },
      { path: 'admin/tenants', loadComponent: () => import('./features/admin/tenants/admin-tenants.component').then(m => m.AdminTenantsComponent), canActivate: [permissionGuard], data: { permission: 'manage-tenants' } },
      { path: 'profile', loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
    ],
  },

  // 404
  { path: '**', loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
