export type SettingKey = 'APP_NAME' | 'INTEREST_PERCENTAGE' | 'DAYS_TO_PAY';

export interface AppSetting {
  id: string;
  book_id: string;
  key: SettingKey;
  value: string;
  updated_by: string;
  updated_at: string;
}

export interface UpdateSettingRequest {
  key: SettingKey;
  value: string;
}
