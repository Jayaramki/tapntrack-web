import { Component, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { SettingKey } from '../../core/models/app-setting.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, SelectModule, ToastModule],
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
              <input pInputText [ngModel]="settingValues()[key.key]" (ngModelChange)="setVal(key.key, $event)" [placeholder]="key.placeholder" />
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

    <div class="section">
      <div class="sec-header">🔢 Loan Numbering</div>
      <div class="sec-body">
        <div class="setting-row">
          <div class="setting-label">Numbering</div>
          <div class="setting-value">
            <p-select [options]="modeOptions" optionLabel="label" optionValue="value"
                      [ngModel]="settingValues()['LOAN_NUMBER_MODE']" (ngModelChange)="setVal('LOAN_NUMBER_MODE', $event)" appendTo="body" styleClass="w-full" />
          </div>
          <div class="save-btn">
            <p-button size="small" label="Save" icon="pi pi-check"
                      [loading]="savingKey() === 'LOAN_NUMBER_MODE'" (onClick)="saveSetting('LOAN_NUMBER_MODE')" />
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label">Reset sequence</div>
          <div class="setting-value">
            <p-select [options]="resetOptions" optionLabel="label" optionValue="value"
                      [ngModel]="settingValues()['LOAN_NUMBER_RESET']" (ngModelChange)="setVal('LOAN_NUMBER_RESET', $event)" appendTo="body" styleClass="w-full" />
          </div>
          <div class="save-btn">
            <p-button size="small" label="Save" icon="pi pi-check"
                      [loading]="savingKey() === 'LOAN_NUMBER_RESET'" (onClick)="saveSetting('LOAN_NUMBER_RESET')" />
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label">Prefix</div>
          <div class="setting-value">
            <input pInputText [ngModel]="settingValues()['LOAN_NUMBER_PREFIX']" (ngModelChange)="setVal('LOAN_NUMBER_PREFIX', $event)" placeholder="e.g. BF-" />
          </div>
          <div class="save-btn">
            <p-button size="small" label="Save" icon="pi pi-check"
                      [loading]="savingKey() === 'LOAN_NUMBER_PREFIX'" (onClick)="saveSetting('LOAN_NUMBER_PREFIX')" />
          </div>
        </div>
        <div style="font-size:0.78rem; color:var(--p-text-muted-color); margin-top:10px;">
          Auto-generate fills the loan number when adding a loan (still editable).
          Example next number: <strong>{{ preview() }}</strong>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="sec-header">🕶️ Field Agent</div>
      <div class="sec-body">
        <div class="setting-row">
          <div class="setting-label">Show loan balance</div>
          <div class="setting-value">
            <p-select [options]="balanceOptions" optionLabel="label" optionValue="value"
                      [ngModel]="settingValues()['AGENT_SHOW_BALANCE']" (ngModelChange)="setVal('AGENT_SHOW_BALANCE', $event)" appendTo="body" styleClass="w-full" />
          </div>
          <div class="save-btn">
            <p-button size="small" label="Save" icon="pi pi-check"
                      [loading]="savingKey() === 'AGENT_SHOW_BALANCE'" (onClick)="saveSetting('AGENT_SHOW_BALANCE')" />
          </div>
        </div>
        <div style="font-size:0.78rem; color:var(--p-text-muted-color); margin-top:10px;">
          When hidden, field agents don't see the remaining/collected balance anywhere — only the customer, loan and the amount box. Admins always see balances.
        </div>
      </div>
    </div>
  `,
})
export class SettingsComponent {
  private data    = inject(DataService);
  private msg     = inject(MessageService);
  private bookCtx = inject(BookContextStore);

  savingKey = signal<string>('');
  // Signal so the view re-renders when settings load asynchronously (zoneless).
  settingValues = signal<Record<string, string>>({});

  setVal(key: string, value: string): void {
    this.settingValues.update(m => ({ ...m, [key]: value }));
  }

  readonly settingKeys: { key: SettingKey; label: string; placeholder: string }[] = [
    { key: 'APP_NAME',            label: 'App / Book Name',     placeholder: 'e.g. Chennai Branch Finance' },
    { key: 'INTEREST_PERCENTAGE', label: 'Interest %',          placeholder: 'e.g. 20' },
    { key: 'DAYS_TO_PAY',         label: 'Default Days to Pay', placeholder: 'e.g. 100' },
  ];

  readonly modeOptions = [
    { label: 'Manual entry', value: 'manual' },
    { label: 'Auto-generate', value: 'auto' },
  ];
  readonly resetOptions = [
    { label: 'Yearly (restart at 1 each January)', value: 'yearly' },
    { label: 'Never (keep counting)', value: 'never' },
  ];
  readonly balanceOptions = [
    { label: 'Show to agents', value: 'true' },
    { label: 'Hide from agents', value: 'false' },
  ];

  /** Live example of the next number for the current prefix/reset choice. */
  preview(): string {
    const v = this.settingValues();
    const prefix = v['LOAN_NUMBER_PREFIX'] ?? '';
    const yearly = (v['LOAN_NUMBER_RESET'] ?? 'yearly') === 'yearly';
    const yy = String(new Date().getFullYear()).slice(-2);
    return `${prefix}${yearly ? yy + '-' : ''}001`;
  }

  constructor() {
    effect(() => {
      const bookId = this.bookCtx.bookId();
      if (bookId) {
        this.data.settings.getAll(bookId).subscribe(res => {
          const map: Record<string, string> = {};
          (res.data ?? []).forEach(s => { map[s.key] = s.value; });
          this.settingValues.set(map);
        });
      }
    });
  }

  saveSetting(key: SettingKey) {
    const bookId = this.bookCtx.bookId();
    const value  = this.settingValues()[key] ?? '';
    if (!bookId) return;  // empty value allowed (e.g. blank prefix)
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
