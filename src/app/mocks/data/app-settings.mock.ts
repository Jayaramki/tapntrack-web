import { AppSetting } from '../../core/models/app-setting.model';

export const MOCK_APP_SETTINGS: AppSetting[] = [
  // Book 1 — Chennai Branch
  { id: '1', book_id: '1', key: 'APP_NAME',             value: 'Chennai Branch Finance', updated_by: '2', updated_at: '2025-01-05T00:00:00Z' },
  { id: '2', book_id: '1', key: 'INTEREST_PERCENTAGE',  value: '20',                     updated_by: '2', updated_at: '2025-01-05T00:00:00Z' },
  { id: '3', book_id: '1', key: 'DAYS_TO_PAY',          value: '100',                    updated_by: '2', updated_at: '2025-01-05T00:00:00Z' },

  // Book 2 — Madurai Branch
  { id: '4', book_id: '2', key: 'APP_NAME',             value: 'Madurai Branch Finance', updated_by: '4', updated_at: '2025-01-20T00:00:00Z' },
  { id: '5', book_id: '2', key: 'INTEREST_PERCENTAGE',  value: '18',                     updated_by: '4', updated_at: '2025-01-20T00:00:00Z' },
  { id: '6', book_id: '2', key: 'DAYS_TO_PAY',          value: '90',                     updated_by: '4', updated_at: '2025-01-20T00:00:00Z' },
];
