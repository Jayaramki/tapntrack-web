import { Component, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { SettingKey } from '../../core/models/app-setting.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, ToastModule],
  providers: [MessageService],
  styles: [`
    :host { display:block; padding:16px; }
    .page-title  { font-size:1.3rem; font-weight:700; margin:0 0 24px; }
    .section     { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                   border-radius:12px; margin-bottom:20px; overflow:hidden; max-width:640px; }
    .sec-header  { padding:12px 18px; border-bottom:1px solid var(--p-surface-border);
                   background:var(--p-surface-50); font-weight:700; font-size:0.95rem; }
    .sec-body    { padding:18px; }
    .setting-row { display:flex; align-items:center; gap:12px; padding:10px 0;
                   border-bottom:1px solid var(--p-surface-border); flex-wrap:wrap; }
    .setting-row:last-child { border-bottom:none; }
    .setting-label { flex:0 0 180px; font-size:0.88rem; color:var(--p-text-muted-color); }
    .setting-value { flex:1; min-width:140px; }
    .setting-value input { width:100%; }
    .save-btn    { flex:0 0 auto; }
  `],
  template: `
    <p-toast />
    <h2 class="page-title">Settings</h2>

    <div class="section">
      <div class="sec-header">⚙️ App Settings</div>
      <div class="sec-body">
        @for (key of settingKeys; track key.key) {
          <div class="setting-row">
            <div class="setting-label">{{key.label}}</div>
            <div class="setting-value">
              <input pInputText [(ngModel)]="settingValues[key.key]" [placeholder]="key.placeholder" />
            </div>
            <div class="save-btn">
              <p-button size="small" label="Save" icon="pi pi-check"
                        [loading]="savingKey() === key.key"
                        (onClick)="saveSetting(key.key)"></p-button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class SettingsComponent {
  private data    = inject(DataService);
  private msg     = inject(MessageService);
  private bookCtx = inject(BookContextStore);

  savingKey = signal<string>('');
  settingValues: Record<string, string> = {};

  readonly settingKeys: { key: SettingKey; label: string; placeholder: string }[] = [
    { key: 'APP_NAME',            label: 'App / Book Name',     placeholder: 'e.g. Chennai Branch Finance' },
    { key: 'INTEREST_PERCENTAGE', label: 'Interest %',          placeholder: 'e.g. 20' },
    { key: 'DAYS_TO_PAY',         label: 'Default Days to Pay', placeholder: 'e.g. 100' },
  ];

  constructor() {
    effect(() => {
      const bookId = this.bookCtx.bookId();
      if (bookId) {
        this.data.settings.getAll(bookId).subscribe(res => {
          (res.data ?? []).forEach(s => { this.settingValues[s.key] = s.value; });
        });
      }
    });
  }

  saveSetting(key: SettingKey) {
    const bookId = this.bookCtx.bookId();
    const value  = this.settingValues[key] ?? '';
    if (!bookId || !value.trim()) return;
    this.savingKey.set(key);
    this.data.settings.update(bookId, { key, value }).subscribe({
      next: () => {
        this.savingKey.set('');
        this.msg.add({ severity: 'success', summary: 'Saved', detail: 'Setting updated', life: 2000 });
      },
      error: () => {
        this.savingKey.set('');
        this.msg.add({ severity: 'error', summary: 'Save failed', detail: 'Please try again', life: 3000 });
      },
    });
  }
}
