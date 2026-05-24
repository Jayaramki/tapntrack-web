import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef, ColGroupDef, GridApi, GridReadyEvent, CellValueChangedEvent,
  GetRowIdParams, AllCommunityModule, ModuleRegistry, themeQuartz,
} from 'ag-grid-community';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { AuthStore } from '../../core/stores/auth.store';
import { LedgerData, LedgerCell } from '../../core/models/daily-entry.model';
import { LoanLine } from '../../core/models/loan.model';
import { LedgerCellEditorComponent } from './ledger-cell-editor.component';

ModuleRegistry.registerModules([AllCommunityModule]);

const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

@Component({
  selector: 'app-ledger',
  standalone: true,
  imports: [FormsModule, AgGridAngular, SelectModule, ButtonModule, ToastModule, TooltipModule],
  providers: [MessageService],
  styles: [`
    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 12px; margin-bottom: 16px;
    }
    .page-title  { font-size: 1.25rem; font-weight: 600; margin: 0; }
    .header-actions { display: flex; gap: 8px; }

    .controls {
      display: flex; gap: 12px; flex-wrap: wrap;
      align-items: flex-end; margin-bottom: 12px;
    }
    .control-group { display: flex; flex-direction: column; gap: 4px; }
    .control-label { font-size: 0.8rem; color: var(--p-text-muted-color); }

    .legend {
      display: flex; align-items: center; gap: 14px;
      margin-left: auto; font-size: 0.78rem; color: var(--p-text-muted-color);
      flex-wrap: wrap;
    }
    .legend-dot { width: 10px; height: 10px; border-radius: 2px; display: inline-block; margin-right: 4px; }

    @media print {
      .no-print { display: none !important; }
    }
  `],
  template: `
    <p-toast />

    <div class="page-header">
      <h1 class="page-title">Ledger — Entry Sheet</h1>
      <div class="header-actions no-print">
        <p-button label="Export CSV" icon="pi pi-download" size="small" [outlined]="true"
                  severity="secondary" (onClick)="onExportCsv()" [disabled]="!rowData.length" />
        <p-button label="Print" icon="pi pi-print" size="small" [outlined]="true"
                  severity="secondary" (onClick)="onPrint()" />
      </div>
    </div>

    <div class="controls no-print">
      <div class="control-group">
        <span class="control-label">Year</span>
        <p-select [options]="yearOptions" optionLabel="label" optionValue="value"
                  [(ngModel)]="selectedYear" (ngModelChange)="loadLedger()"
                  styleClass="w-24" />
      </div>
      <div class="control-group">
        <span class="control-label">Month</span>
        <p-select [options]="monthOptions" optionLabel="label" optionValue="value"
                  [(ngModel)]="selectedMonth" (ngModelChange)="loadLedger()"
                  styleClass="min-w-36" />
      </div>
      <div class="control-group">
        <span class="control-label">Line</span>
        <p-select [options]="lineOptions" optionLabel="label" optionValue="value"
                  [(ngModel)]="selectedLine" (ngModelChange)="onLineChange()"
                  styleClass="min-w-36" />
      </div>

      <div class="legend">
        <span><span class="legend-dot" style="background:#E8F5E9;border:1px solid #2E7D32"></span>Cash</span>
        <span><span class="legend-dot" style="background:#E3F2FD;border:1px solid #1565C0"></span>GPay</span>
        <span><span class="legend-dot" style="background:#f5f5f5;border:1px solid #ccc"></span>Empty — click to add</span>
      </div>
    </div>

    @if (loading()) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-spin pi-spinner" style="font-size:2rem"></i>
        <p class="mt-2">Loading ledger…</p>
      </div>
    } @else if (rowData.length === 0 && ledgerData()) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-inbox" style="font-size:2rem"></i>
        <p class="mt-2">No loans found for the selected filters.</p>
      </div>
    } @else if (ledgerData()) {
      <ag-grid-angular
        [theme]="agTheme"
        [columnDefs]="colDefs"
        [rowData]="rowData"
        [defaultColDef]="defaultColDef"
        [pinnedBottomRowData]="pinnedBottomRowData()"
        [rowHeight]="34"
        [headerHeight]="42"
        [groupHeaderHeight]="34"
        [singleClickEdit]="true"
        [getRowId]="getRowId"
        [suppressRowHoverHighlight]="false"
        [animateRows]="false"
        (gridReady)="onGridReady($event)"
        (cellValueChanged)="onCellValueChanged($event)"
        style="width:100%; height:calc(100vh - 210px); min-height:400px"
      />
    }
  `,
})
export class LedgerComponent implements OnInit {
  private readonly data = inject(DataService);
  private readonly toastSvc = inject(MessageService);

  protected readonly loading = signal(false);
  protected readonly ledgerData = signal<LedgerData | null>(null);
  protected readonly pinnedBottomRowData = signal<any[]>([]);

  protected colDefs: (ColDef | ColGroupDef)[] = [];
  protected rowData: any[] = [];
  protected gridApi: GridApi | null = null;

  protected selectedYear  = new Date().getFullYear();
  protected selectedMonth = new Date().getMonth() + 1;
  protected selectedLine: LoanLine | 'all' = 'all';

  protected readonly agTheme = themeQuartz.withParams({ fontFamily: 'inherit', fontSize: 13 });

  protected readonly defaultColDef: ColDef = {
    resizable: true,
    sortable: false,
    suppressMovable: true,
    suppressSizeToFit: true,
  };

  protected readonly getRowId = (p: GetRowIdParams) => String(p.data.loan_id);

  protected readonly yearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = new Date().getFullYear() - 2 + i;
    return { label: String(y), value: y };
  });

  protected readonly monthOptions = MONTH_NAMES.map((label, i) => ({ label, value: i + 1 }));

  protected readonly lineOptions = [
    { label: 'All Lines', value: 'all' },
    ...(['line1','line2','line3','line4','line5','line6'] as LoanLine[])
      .map(l => ({ label: l.replace('line', 'Line '), value: l })),
  ];

  ngOnInit(): void { this.loadLedger(); }

  protected onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }

  protected loadLedger(): void {
    this.loading.set(true);
    const bookId = AuthStore.bookId() ?? 1;
    this.data.ledger.getLedger(bookId, this.selectedYear, this.selectedMonth).subscribe(res => {
      this.ledgerData.set(res.data);
      this.colDefs = this.buildColDefs(res.data);
      this.rowData = this.buildRowData(res.data);
      this.pinnedBottomRowData.set([this.buildTotalRow(this.rowData, res.data)]);
      this.loading.set(false);
    });
  }

  /** Line filter change — re-filter in memory, no API call */
  protected onLineChange(): void {
    const ledger = this.ledgerData();
    if (!ledger) return;
    this.rowData = this.buildRowData(ledger);
    this.pinnedBottomRowData.set([this.buildTotalRow(this.rowData, ledger)]);
  }

  // ─── Column Definitions ──────────────────────────────────────────────────

  private buildColDefs(data: LedgerData): (ColDef | ColGroupDef)[] {
    const monthPad = String(data.month).padStart(2, '0');

    const leftCols: ColDef[] = [
      {
        field: 'loan_number',
        headerName: 'Loan #',
        pinned: 'left',
        width: 105,
        lockPinned: true,
        cellStyle: (p: any) => ({
          fontFamily: 'monospace',
          fontSize: '0.82rem',
          fontWeight: p.node.rowPinned ? '700' : '400',
          backgroundColor: 'var(--p-surface-50)',
        }),
      },
      {
        field: 'customer_name',
        headerName: 'Customer',
        pinned: 'left',
        width: 158,
        lockPinned: true,
        cellStyle: (p: any) => ({
          fontSize: '0.88rem',
          fontWeight: p.node.rowPinned ? '700' : '400',
          backgroundColor: 'var(--p-surface-50)',
        }),
      },
      {
        field: 'loan_amount',
        headerName: 'Opening Bal.',
        pinned: 'left',
        width: 118,
        lockPinned: true,
        valueFormatter: (p: any) => p.value != null ? `₹${Number(p.value).toLocaleString('en-IN')}` : '—',
        cellStyle: (p: any) => ({
          fontWeight: p.node.rowPinned ? '700' : '500',
          color: '#5C35BE',
          textAlign: 'right',
          backgroundColor: 'var(--p-surface-50)',
          fontSize: '0.82rem',
        }),
      },
    ];

    const dayCols = data.days.map(day => {
      const dateStr = `${data.year}-${monthPad}-${String(day).padStart(2, '0')}`;
      return {
        field: `day_${day}`,
        headerName: String(day),
        width: 76,
        editable: (p: any) => !p.node.rowPinned,
        cellEditor: LedgerCellEditorComponent,
        cellEditorParams: { date: dateStr },
        // Only suppress Escape (let editor handle it); allow Enter/Tab to navigate like Excel
        suppressKeyboardEvent: (p: any) => p.editing && p.event.key === 'Escape',
        valueGetter: (p: any) => p.data?.[`day_${day}`] as LedgerCell | null,
        valueSetter: (p: any) => { p.data[`day_${day}`] = p.newValue; return true; },
        cellRenderer: (p: any) => this.renderDayCell(p),
        cellStyle: (p: any) => {
          if (p.node.rowPinned) return {
            backgroundColor: '#F9FBE7',
            padding: '0 2px',
            textAlign: 'center',
          };
          const cell = p.value as LedgerCell | null;
          return {
            backgroundColor: cell?.amount
              ? (cell.mode === 'gpay' ? '#E3F2FD' : '#E8F5E9')
              : 'transparent',
            padding: '0 2px',
            cursor: 'pointer',
          };
        },
        headerClass: 'ag-right-aligned-header',
      };
    });

    const dayGroup: ColGroupDef = {
      headerName: `${MONTH_NAMES[data.month - 1]} ${data.year}`,
      children: dayCols as unknown as ColDef[],
    };

    const rightCols: ColDef[] = [
      {
        field: 'total_collected',
        headerName: 'Collected',
        pinned: 'right',
        width: 108,
        lockPinned: true,
        valueFormatter: (p: any) => p.value != null ? `₹${Number(p.value).toLocaleString('en-IN')}` : '—',
        cellStyle: (p: any) => ({
          fontWeight: '700',
          color: '#2E7D32',
          textAlign: 'right',
          backgroundColor: 'var(--p-surface-50)',
          fontSize: p.node.rowPinned ? '0.85rem' : '0.82rem',
        }),
      },
      {
        field: 'remaining_balance',
        headerName: 'Balance',
        pinned: 'right',
        width: 108,
        lockPinned: true,
        valueFormatter: (p: any) => p.value != null ? `₹${Number(p.value).toLocaleString('en-IN')}` : '—',
        cellStyle: (p: any) => ({
          fontWeight: '700',
          color: '#E65100',
          textAlign: 'right',
          backgroundColor: 'var(--p-surface-50)',
          fontSize: p.node.rowPinned ? '0.85rem' : '0.82rem',
        }),
      },
    ];

    return [...leftCols, dayGroup, ...rightCols];
  }

  private renderDayCell(p: any): string {
    const cell = p.value as LedgerCell | null;

    // Pinned total row
    if (p.node.rowPinned) {
      if (!cell?.amount) return '';
      return `<span style="font-weight:700;font-size:0.78rem;display:block;text-align:center;padding:0 2px">
                ₹${cell.amount.toLocaleString('en-IN')}
              </span>`;
    }

    // Empty cell
    if (!cell?.amount) {
      return `<span style="color:#ccc;display:block;text-align:center;
                           line-height:34px;cursor:pointer;user-select:none;font-size:0.85rem">—</span>`;
    }

    // Filled cell — color by mode
    const color = cell.mode === 'gpay' ? '#1565C0' : '#2E7D32';
    return `<span style="color:${color};font-weight:600;font-size:0.82rem;
                         display:block;text-align:right;
                         padding:4px 6px;cursor:pointer;line-height:1.4">
              ₹${cell.amount.toLocaleString('en-IN')}
            </span>`;
  }

  // ─── Row Data ────────────────────────────────────────────────────────────

  private buildRowData(data: LedgerData): any[] {
    const monthPad = String(data.month).padStart(2, '0');
    const rows = this.selectedLine !== 'all'
      ? data.rows.filter(r => r.line === this.selectedLine)
      : data.rows;

    return rows.map(row => {
      const flat: any = {
        loan_id: row.loan_id,
        loan_number: row.loan_number,
        customer_name: row.customer_name,
        loan_amount: row.loan_amount,
        total_collected: row.total_collected,
        remaining_balance: row.remaining_balance,
        line: row.line,
      };
      data.days.forEach(day => {
        const dateStr = `${data.year}-${monthPad}-${String(day).padStart(2, '0')}`;
        flat[`day_${day}`] = row.cells[dateStr] ?? null;
      });
      return flat;
    });
  }

  /** Pinned bottom row: one entry per day column summing all amounts */
  private buildTotalRow(rowData: any[], data: LedgerData): any {
    const monthPad = String(data.month).padStart(2, '0');
    const total: any = {
      loan_number: 'TOTAL',
      customer_name: '',
      loan_amount: rowData.reduce((s, r) => s + (r.loan_amount ?? 0), 0),
      total_collected: rowData.reduce((s, r) => s + (r.total_collected ?? 0), 0),
      remaining_balance: rowData.reduce((s, r) => s + (r.remaining_balance ?? 0), 0),
    };
    data.days.forEach(day => {
      const daySum = rowData.reduce((s, r) => {
        const cell = r[`day_${day}`] as LedgerCell | null;
        return s + (cell?.amount ?? 0);
      }, 0);
      const dateStr = `${data.year}-${monthPad}-${String(day).padStart(2, '0')}`;
      total[`day_${day}`] = daySum > 0 ? { loan_id: 0, date: dateStr, amount: daySum, mode: null } : null;
    });
    return total;
  }

  // ─── Cell Edit Handler ────────────────────────────────────────────────────

  protected onCellValueChanged(event: CellValueChangedEvent): void {
    if (event.node.rowPinned) return;
    const field = event.colDef.field;
    if (!field?.startsWith('day_')) return;

    const oldCell = event.oldValue as LedgerCell | null;
    const newCell = event.newValue as LedgerCell | null;
    const bookId  = AuthStore.bookId() ?? 1;

    const oldAmt = oldCell?.amount ?? 0;
    const newAmt = newCell?.amount ?? 0;

    // Delete requested via Delete key in editor
    const deleteRequested = !!(event as any).api && (event.colDef as any)._deleteRequested;
    (event.colDef as any)._deleteRequested = false;

    // Nothing changed
    if (!deleteRequested && oldAmt === newAmt && (oldCell?.mode ?? 'cash') === (newCell?.mode ?? 'cash')) return;

    if (!deleteRequested && newAmt > 0) {
      if (oldCell?.id) {
        // ── UPDATE existing entry ─────────────────────────────────────────
        this.data.dailyEntries.update(oldCell.id, {
          amount: newAmt,
          mode: newCell?.mode ?? 'cash',
        }).subscribe(res => {
          event.data[field] = {
            ...newCell,
            id: res.data.id,
            amount: res.data.amount,
            mode: res.data.mode,
          };
          this.applyDelta(event.data, oldAmt, res.data.amount);
          this.refreshAfterEdit(event);
          this.toastSvc.add({ severity: 'success', summary: 'Updated', detail: `${event.data.customer_name} — ${newCell?.date}`, life: 1800 });
        });
      } else {
        // ── CREATE new entry ──────────────────────────────────────────────
        this.data.dailyEntries.create({
          book_id: bookId,
          loan_id: event.data.loan_id,
          entry_date: newCell?.date ?? '',
          amount: newAmt,
          mode: newCell?.mode ?? 'cash',
        }).subscribe(res => {
          event.data[field] = {
            id: res.data.id,
            loan_id: res.data.loan_id,
            date: res.data.entry_date,
            amount: res.data.amount,
            mode: res.data.mode,
          };
          this.applyDelta(event.data, 0, res.data.amount);
          this.refreshAfterEdit(event);
          this.toastSvc.add({ severity: 'success', summary: 'Saved', detail: `${event.data.customer_name} — ${res.data.entry_date}`, life: 1800 });
        });
      }
    } else if ((deleteRequested || newAmt === 0) && oldAmt > 0 && oldCell?.id) {
      // ── DELETE entry ────────────────────────────────────────────────────
      this.data.dailyEntries.delete(oldCell.id).subscribe(() => {
        event.data[field] = null;
        this.applyDelta(event.data, oldAmt, 0);
        this.refreshAfterEdit(event);
        this.toastSvc.add({ severity: 'info', summary: 'Removed', detail: `${event.data.customer_name} — ${oldCell.date}`, life: 1800 });
      });
    }
  }

  /** Apply a delta to the row's running totals (in-place mutation is safe — same object in rowData) */
  private applyDelta(rowData: any, oldAmt: number, newAmt: number): void {
    const delta = newAmt - oldAmt;
    rowData.total_collected  = (rowData.total_collected  ?? 0) + delta;
    rowData.remaining_balance = rowData.loan_amount - rowData.total_collected;
  }

  /** Refresh the edited cell + row total columns + rebuild the pinned total row */
  private refreshAfterEdit(event: CellValueChangedEvent): void {
    this.gridApi?.refreshCells({
      rowNodes: [event.node],
      columns: [event.colDef.field!, 'total_collected', 'remaining_balance'],
      force: true,
    });
    const ledger = this.ledgerData();
    if (ledger) {
      this.pinnedBottomRowData.set([this.buildTotalRow(this.rowData, ledger)]);
    }
  }

  // ─── Export / Print ───────────────────────────────────────────────────────

  protected onExportCsv(): void {
    this.gridApi?.exportDataAsCsv({
      fileName: `ledger-${this.selectedYear}-${String(this.selectedMonth).padStart(2,'0')}.csv`,
      skipPinnedBottom: true,
      processCellCallback: (p: any) => {
        const field: string = p.column.getColDef().field ?? '';
        if (field.startsWith('day_')) {
          const cell = p.node.data?.[field] as LedgerCell | null;
          return cell?.amount != null ? String(cell.amount) : '';
        }
        return p.value ?? '';
      },
    });
  }

  protected onPrint(): void { window.print(); }
}

