import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export interface MasterItem {
  id: string;
  name: string;
  color: string;
  is_active: boolean;
}

/**
 * Presentational CRUD list for a simple master (Lines / Expense Categories):
 * name + color swatch, inline rename, recolor, add and delete. The parent owns
 * the data + service calls and reacts to the emitted events.
 */
@Component({
  selector: 'app-master-manager',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, TooltipModule],
  styles: [`
    .add-row { display: flex; gap: 8px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
    .add-row input[pInputText] { flex: 1; min-width: 160px; }
    input[type=color] { width: 34px; height: 34px; padding: 0; border: none; border-radius: 6px; cursor: pointer; background: none; }
    .empty { color: var(--p-text-muted-color); padding: 16px 4px; }
    .row {
      display: flex; align-items: center; gap: 10px; padding: 8px 4px;
      border-bottom: 1px solid var(--p-surface-border);
    }
    .row .name { flex: 1; font-weight: 500; }
    .row .name-input { flex: 1; }
  `],
  template: `
    <div class="add-row">
      <input pInputText [(ngModel)]="newName" [placeholder]="'New ' + noun() + ' name'"
             (keyup.enter)="add()" />
      <input type="color" [(ngModel)]="newColor" [attr.aria-label]="'Color'" />
      <p-button label="Add" icon="pi pi-plus" (onClick)="add()" [disabled]="!newName.trim()" />
    </div>

    @if (!items().length) {
      <div class="empty">No {{ noun() }}s yet. Add one above.</div>
    }

    @for (item of items(); track item.id) {
      <div class="row">
        <input type="color" [ngModel]="item.color"
               (ngModelChange)="recolor.emit({ id: item.id, color: $event })" />
        @if (editingId() === item.id) {
          <input pInputText class="name-input" [(ngModel)]="editName"
                 (keyup.enter)="saveRename(item)" (keyup.escape)="editingId.set(null)" />
          <p-button icon="pi pi-check" [text]="true" [rounded]="true" severity="success"
                    (onClick)="saveRename(item)" pTooltip="Save" />
        } @else {
          <span class="name">{{ item.name }}</span>
          <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" severity="secondary"
                    (onClick)="startEdit(item)" pTooltip="Rename" />
        }
        <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger"
                  (onClick)="remove.emit({ id: item.id, name: item.name })" pTooltip="Delete" />
      </div>
    }
  `,
})
export class MasterManagerComponent {
  readonly noun = input<string>('item');
  readonly items = input.required<MasterItem[]>();

  readonly create = output<{ name: string; color: string }>();
  readonly rename = output<{ id: string; name: string }>();
  readonly recolor = output<{ id: string; color: string }>();
  readonly remove = output<{ id: string; name: string }>();

  protected newName = '';
  protected newColor = '#546E7A';
  protected readonly editingId = signal<string | null>(null);
  protected editName = '';

  protected add(): void {
    const name = this.newName.trim();
    if (!name) return;
    this.create.emit({ name, color: this.newColor });
    this.newName = '';
    this.newColor = '#546E7A';
  }

  protected startEdit(item: MasterItem): void {
    this.editingId.set(item.id);
    this.editName = item.name;
  }

  protected saveRename(item: MasterItem): void {
    const name = this.editName.trim();
    this.editingId.set(null);
    if (name && name !== item.name) {
      this.rename.emit({ id: item.id, name });
    }
  }
}
