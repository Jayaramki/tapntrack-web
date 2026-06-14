import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { AuthStore } from '../../core/stores/auth.store';
import { AppSetting, SettingKey } from '../../core/models/app-setting.model';
import { ExpenseCategoryConfig, CreateExpenseCategoryRequest } from '../../core/models/expense.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
            ButtonModule, InputTextModule, InputNumberModule,
            ToastModule, TooltipModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  styles: [`
    :host { display:block; padding:16px; }
    .page-title  { font-size:1.3rem; font-weight:700; margin:0 0 24px; }
    .section     { background:var(--p-surface-card); border:1px solid var(--p-surface-border);
                   border-radius:12px; margin-bottom:20px; overflow:hidden; }
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
    /* Categories */
    .cat-list    { display:flex; flex-direction:column; gap:8px; }
    .cat-item    { display:flex; align-items:center; gap:10px; padding:8px 10px;
                   border-radius:8px; border:1px solid var(--p-surface-border); background:var(--p-surface-0); }
    .cat-color   { width:18px; height:18px; border-radius:50%; flex-shrink:0; cursor:pointer; border:2px solid rgba(0,0,0,.1); }
    .cat-name    { flex:1; font-size:0.88rem; }
    .cat-name-input { flex:1; border:1px solid var(--p-primary-color); border-radius:6px;
                      padding:4px 8px; font-size:0.88rem; background:var(--p-surface-0);
                      color:var(--p-text-color); outline:none; }
    .cat-name-input:focus { box-shadow:0 0 0 2px var(--p-primary-200); }
    .cat-inactive { opacity:.45; }
    .add-cat-row { display:flex; gap:8px; align-items:center; margin-top:12px; }
    .add-cat-row input[type=text] { flex:1; border:1px solid var(--p-surface-border);
                                    border-radius:6px; padding:6px 10px; font-size:0.88rem;
                                    background:var(--p-surface-0); color:var(--p-text-color); outline:none; }
    .add-cat-row input[type=text]:focus { border-color:var(--p-primary-color);
                                          box-shadow:0 0 0 2px var(--p-primary-200); }
  `],
  template: `
    <p-toast />
    <p-confirmDialog />
    <h2 class="page-title">Settings</h2>

    <!-- App Settings -->
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

    <!-- Expense Categories -->
    <div class="section">
      <div class="sec-header">🏷️ Expense Categories</div>
      <div class="sec-body">
        @if (loadingCats()) {
          <div style="color:var(--p-text-muted-color);font-size:.9rem;padding:8px 0">Loading...</div>
        } @else {
          <div class="cat-list">
            @for (cat of categories(); track cat.id) {
              <div class="cat-item" [class.cat-inactive]="!cat.is_active">
                <!-- Color swatch — clicking opens native color picker -->
                <input type="color" [value]="cat.color"
                       style="width:22px;height:22px;padding:0;border:none;border-radius:50%;cursor:pointer;background:none"
                       (change)="onCatColorChange(cat, $event)" />
                @if (editingCatId() === cat.id) {
                  <input class="cat-name-input"
                         [(ngModel)]="editingCatName"
                         (keydown.enter)="saveCatName(cat)"
                         (keydown.escape)="editingCatId.set(null)"
                         (blur)="saveCatName(cat)" />
                } @else {
                  <span class="cat-name" style="cursor:text" (click)="startEdit(cat)">{{cat.name}}</span>
                }
                <p-button [icon]="cat.is_active ? 'pi pi-eye-slash' : 'pi pi-eye'"
                          severity="secondary" [text]="true" size="small"
                          [pTooltip]="cat.is_active ? 'Deactivate' : 'Activate'"
                          (onClick)="toggleCat(cat)"></p-button>
                <p-button icon="pi pi-trash" severity="danger" [text]="true" size="small"
                          pTooltip="Delete"
                          (onClick)="deleteCat(cat)"></p-button>
              </div>
            }
          </div>

          <!-- Add new category -->
          <div class="add-cat-row">
            <input type="color" [(ngModel)]="newCatColor"
                   style="width:32px;height:32px;padding:0;border:none;border-radius:6px;cursor:pointer" />
            <input type="text" [(ngModel)]="newCatName" placeholder="New category name"
                   (keydown.enter)="addCategory()" />
            <p-button label="Add" icon="pi pi-plus" size="small" (onClick)="addCategory()"
                      [disabled]="!newCatName.trim()"></p-button>
          </div>
        }
      </div>
    </div>
  `,
})
export class SettingsComponent implements OnInit {
  private data    = inject(DataService);
  private msg     = inject(MessageService);
  private confirm = inject(ConfirmationService);

  categories   = signal<ExpenseCategoryConfig[]>([]);
  loadingCats  = signal(true);
  savingKey    = signal<string>('');
  editingCatId = signal<string | null>(null);
  editingCatName = '';

  newCatName  = '';
  newCatColor = '#607D8B';

  settingValues: Record<string, string> = {};

  readonly settingKeys: { key: SettingKey; label: string; placeholder: string }[] = [
    { key: 'APP_NAME',            label: 'App / Book Name',     placeholder: 'e.g. Chennai Branch Finance' },
    { key: 'INTEREST_PERCENTAGE', label: 'Interest %',          placeholder: 'e.g. 20' },
    { key: 'DAYS_TO_PAY',         label: 'Default Days to Pay', placeholder: 'e.g. 100' },
  ];

  ngOnInit() {
    const bookId = AuthStore.bookId() ?? AuthStore.DEFAULT_BOOK_ID;
    forkJoin({
      settings:   this.data.settings.getAll(bookId),
      categories: this.data.expenses.getCategories(bookId),
    }).subscribe(({ settings, categories }) => {
      (settings.data ?? []).forEach(s => { this.settingValues[s.key] = s.value; });
      this.categories.set(categories.data ?? []);
      this.loadingCats.set(false);
    });
  }

  saveSetting(key: SettingKey) {
    const bookId = AuthStore.bookId() ?? AuthStore.DEFAULT_BOOK_ID;
    const value  = this.settingValues[key] ?? '';
    if (!value.trim()) return;
    this.savingKey.set(key);
    this.data.settings.update(bookId, { key, value }).subscribe(() => {
      this.savingKey.set('');
      this.msg.add({ severity: 'success', summary: 'Saved', detail: 'Setting updated', life: 2000 });
    });
  }

  startEdit(cat: ExpenseCategoryConfig) {
    this.editingCatId.set(cat.id);
    this.editingCatName = cat.name;
  }

  saveCatName(cat: ExpenseCategoryConfig) {
    const name = this.editingCatName.trim();
    this.editingCatId.set(null);
    if (!name || name === cat.name) return;
    this.data.expenses.updateCategory(cat.id, { name }).subscribe(res => {
      if (res.data) {
        this.categories.update(list => list.map(c => c.id === cat.id ? res.data! : c));
        this.msg.add({ severity: 'success', summary: 'Renamed', detail: `Category renamed to "${name}"`, life: 2000 });
      }
    });
  }

  onCatColorChange(cat: ExpenseCategoryConfig, event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.data.expenses.updateCategory(cat.id, { color }).subscribe(res => {
      if (res.data) {
        this.categories.update(list => list.map(c => c.id === cat.id ? res.data! : c));
      }
    });
  }

  toggleCat(cat: ExpenseCategoryConfig) {
    this.data.expenses.updateCategory(cat.id, { is_active: !cat.is_active }).subscribe(res => {
      if (res.data) {
        this.categories.update(list => list.map(c => c.id === cat.id ? res.data! : c));
        const action = cat.is_active ? 'deactivated' : 'activated';
        this.msg.add({ severity: 'info', summary: 'Updated', detail: `"${cat.name}" ${action}`, life: 2000 });
      }
    });
  }

  deleteCat(cat: ExpenseCategoryConfig) {
    this.confirm.confirm({
      message: `Delete category "${cat.name}"? Existing expenses using this category will still show the name.`,
      header: 'Delete Category',
      icon: 'pi pi-trash',
      accept: () => {
        this.data.expenses.deleteCategory(cat.id).subscribe(() => {
          this.categories.update(list => list.filter(c => c.id !== cat.id));
          this.msg.add({ severity: 'success', summary: 'Deleted', detail: `"${cat.name}" removed`, life: 2000 });
        });
      }
    });
  }

  addCategory() {
    const name = this.newCatName.trim();
    if (!name) return;
    const bookId = AuthStore.bookId() ?? AuthStore.DEFAULT_BOOK_ID;
    const req: CreateExpenseCategoryRequest = { book_id: bookId, name, color: this.newCatColor };
    this.data.expenses.createCategory(req).subscribe(res => {
      if (res.data) {
        this.categories.update(list => [...list, res.data!]);
        this.newCatName  = '';
        this.newCatColor = '#607D8B';
        this.msg.add({ severity: 'success', summary: 'Added', detail: `"${name}" category created`, life: 2000 });
      }
    });
  }
}
