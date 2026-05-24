import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card-paginator',
  standalone: true,
  imports: [ButtonModule],
  styles: [`
    .card-paginator {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 4px; margin-top: 4px;
    }
    .card-page-info { font-size: 0.82rem; color: var(--p-text-muted-color); }
  `],
  template: `
    @if (totalPages() > 1) {
      <div class="card-paginator">
        <p-button icon="pi pi-chevron-left" [text]="true" size="small"
                  [disabled]="page() === 0" (onClick)="pageChange.emit(page() - 1)" />
        <span class="card-page-info">Page {{ page() + 1 }} of {{ totalPages() }}</span>
        <p-button icon="pi pi-chevron-right" [text]="true" size="small"
                  [disabled]="page() >= totalPages() - 1" (onClick)="pageChange.emit(page() + 1)" />
      </div>
    }
  `,
})
export class CardPaginatorComponent {
  page = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();
}
