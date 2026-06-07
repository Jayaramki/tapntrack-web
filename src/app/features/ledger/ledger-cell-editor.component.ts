import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { LedgerCell } from '../../core/models/daily-entry.model';

@Component({
  selector: 'app-ledger-cell-editor',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    :host {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0;
    }
    .cell-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    input[type=number] {
      width: 100%;
      height: 100%;
      border: none;
      outline: 2px solid var(--p-primary-color);
      outline-offset: -2px;
      background: #fffde7;
      font-size: 0.85rem;
      font-weight: 600;
      text-align: right;
      padding: 0 6px;
    }
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    input[type=number] { -moz-appearance: textfield; }
    .mode-badge {
      position: absolute;
      left: 2px;
      top: 2px;
      font-size: 0.58rem;
      font-weight: 700;
      padding: 0px 3px;
      border-radius: 3px;
      cursor: pointer;
      user-select: none;
      opacity: 0.85;
      letter-spacing: 0.02em;
    }
    .mode-badge.cash { background: #C8E6C9; color: #2E7D32; }
    .mode-badge.gpay { background: #BBDEFB; color: #1565C0; }
  `],
  template: `
    <div class="cell-wrap">
      <span class="mode-badge" [class]="mode" (click)="toggleMode($event)"
            title="Click to toggle Cash/GPay">{{ mode === 'cash' ? 'C' : 'G' }}</span>
      <input #inp type="number" [(ngModel)]="amount" min="0"
             (keydown.enter)="save()"
             (keydown.escape)="doCancel()"
             (keydown.delete)="doDelete()"
             (keydown.backspace)="onBackspace($event)" />
    </div>
  `,
})
export class LedgerCellEditorComponent implements ICellEditorAngularComp {
  @ViewChild('inp') inp!: ElementRef<HTMLInputElement>;

  protected amount: number | null = null;
  protected mode: 'cash' | 'gpay' = 'cash';

  private params!: ICellEditorParams;
  private oldCell: LedgerCell | null = null;
  private _cancelled = false;
  private _delete = false;

  agInit(params: ICellEditorParams): void {
    this.params = params;
    const cell = params.value as LedgerCell | null;
    this.oldCell = cell;
    this.amount = cell?.amount ?? null;
    this.mode = (cell?.mode as 'cash' | 'gpay') ?? 'cash';

    // If cell is empty and a char key started editing, pre-fill with that digit
    const key = (params as any).eventKey as string | null;
    if (key && /^\d$/.test(key)) {
      this.amount = Number(key);
    } else if (key === 'Delete' || key === 'Backspace') {
      this.amount = null;
    }
  }

  getValue(): LedgerCell | null {
    const date: string = (this.params as any).date ?? this.oldCell?.date ?? '';
    const loanId: number = this.oldCell?.loan_id ?? (this.params.data as any)?.loan_id ?? 0;

    if (this._delete || this._cancelled) {
      return this.oldCell; // onCellValueChanged won't fire if isCancelAfterEnd = true
    }
    if (!this.amount || this.amount <= 0) return this.oldCell ?? null;
    return { id: this.oldCell?.id, loan_id: loanId, date, amount: this.amount, mode: this.mode };
  }

  isPopup(): boolean { return false; }
  isCancelAfterEnd(): boolean { return this._cancelled || this._delete; }

  afterGuiAttached(): void {
    setTimeout(() => {
      const el = this.inp?.nativeElement;
      if (el) { el.focus(); el.select(); }
    }, 0);
  }

  protected toggleMode(e: MouseEvent): void {
    e.stopPropagation();
    this.mode = this.mode === 'cash' ? 'gpay' : 'cash';
    this.inp?.nativeElement.focus();
  }

  protected save(): void { this.params.stopEditing(); }

  protected doCancel(): void {
    this._cancelled = true;
    this.params.stopEditing(true);
  }

  protected doDelete(): void {
    if (this.oldCell?.id) {
      this._delete = true;
      // Signal delete: return null amount so onCellValueChanged can call the delete API
      (this.params as any)._deleteRequested = true;
      this.params.stopEditing();
    }
  }

  protected onBackspace(_e: Event): void {
    // Allow normal backspace inside the input — don't treat as delete
  }
}
