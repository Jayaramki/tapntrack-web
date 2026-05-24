export type SettingKey = 'APP_NAME' | 'INTEREST_PERCENTAGE' | 'DAYS_TO_PAY';

export interface AppSetting {
  id: number;
  book_id: number;
  key: SettingKey;
  value: string;
  updated_by: number;
  updated_at: string;
}

export interface UpdateSettingRequest {
  key: SettingKey;
  value: string;
}
