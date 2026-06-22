import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../core/services/data.service';
import { BookContextStore } from '../../core/stores/book-context.store';
import { AuthStore } from '../../core/stores/auth.store';
import { CollectLookup, CollectLoan } from '../../core/models/customer.model';
import { todayStr } from '../../core/utils/date.util';

@Component({
  selector: 'app-collect',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputNumberModule, ButtonModule, MessageModule, ToastModule],
  providers: [MessageService],
  styles: [`
    :host { display:block; }
    .collect { max-width: 480px; margin: 0 auto; padding: 8px; }
    .title { font-size: 1.2rem; font-weight: 700; margin: 4px 0 16px; }
    .num-row { display:flex; gap:8px; margin-bottom: 16px; }
    .num-row input { flex:1; font-size: 1.4rem; text-align:center; height: 52px; }
    .cust { font-size: 1.1rem; font-weight: 700; margin: 6px 0; }
    .cust .sub { color: var(--p-text-muted-color); font-weight: 500; font-size: 0.85rem; }
    .loan-card {
      border: 2px solid var(--p-surface-border); border-radius: 10px;
      padding: 12px 14px; margin-bottom: 10px; cursor: pointer; transition: border-color .12s, background .12s;
    }
    .loan-card.selected { border-color: var(--p-primary-color); background: var(--p-primary-50); }
    .loan-card .ln { font-weight: 700; }
    .loan-card .meta { color: var(--p-text-muted-color); font-size: 0.85rem; margin-top: 2px; }
    .loan-card .rem { margin-top: 4px; font-weight: 600; }
    .loan-card .done { margin-top: 4px; color: var(--p-green-600); font-weight: 600; font-size: 0.85rem; }
    .pay { margin-top: 16px; }
    .pay ::ng-deep .p-inputnumber, .pay ::ng-deep input { width:100%; }
    .pay ::ng-deep input { font-size: 1.6rem; text-align:center; height: 56px; }
    .modes { display:flex; gap:8px; margin: 12px 0; }
    .modes button {
      flex:1; height:44px; border-radius:8px; border:2px solid var(--p-surface-border);
      background:var(--p-surface-card); font-weight:600; cursor:pointer; font-size:1rem;
    }
    .modes button.active { border-color: var(--p-primary-color); background: var(--p-primary-50); color: var(--p-primary-color); }
    .save ::ng-deep .p-button { width:100%; height:56px; font-size:1.2rem; font-weight:700; }
  `],
  template: `
    <p-toast position="top-center" />
    <div class="collect">
      <div class="title">Collect</div>

      <div class="num-row">
        <input pInputText inputmode="numeric" [(ngModel)]="numberInput"
               (keyup.enter)="find()" placeholder="Customer #" autocomplete="off" />
        <p-button icon="pi pi-search" [loading]="loading()" (onClick)="find()" />
      </div>

      @if (error()) { <p-message severity="warn" [text]="error()!" styleClass="w-full" /> }

      @if (result(); as r) {
        <div class="cust">{{ r.customer.name }} <span class="sub">· #{{ r.customer.customer_number }} · {{ r.customer.phone }}</span></div>

        @if (r.loans.length === 0) {
          <p-message severity="info" text="No active loan for this customer." styleClass="w-full" />
        } @else {
          @for (loan of r.loans; track loan.id) {
            <div class="loan-card" [class.selected]="selectedId() === loan.id" (click)="select(loan.id)">
              <div class="ln">{{ loan.loan_number }}</div>
              <div class="meta">{{ loan.line }} · {{ loan.loan_type }} · ₹{{ loan.loan_amount }}</div>
              @if (showBalance() && loan.remaining_balance != null) { <div class="rem">Balance ₹{{ loan.remaining_balance }}</div> }
              @if (loan.today_entry) { <div class="done">✓ Collected ₹{{ loan.today_entry.amount }} today</div> }
            </div>
          }

          @if (selectedLoan(); as sl) {
            @if (sl.today_entry) {
              <p-message severity="info" styleClass="w-full"
                [text]="'Already collected ₹' + sl.today_entry.amount + ' today — only an admin can change it.'" />
            } @else {
              <div class="pay">
                <p-inputNumber [(ngModel)]="amount" [min]="1" [useGrouping]="false" placeholder="Amount ₹" />
                <div class="modes">
                  <button [class.active]="mode() === 'cash'" (click)="mode.set('cash')">Cash</button>
                  <button [class.active]="mode() === 'gpay'" (click)="mode.set('gpay')">GPay</button>
                </div>
                <div class="save">
                  <p-button label="SAVE" icon="pi pi-check" [loading]="saving()" [disabled]="!amount" (onClick)="save()" />
                </div>
              </div>
            }
          }
        }
      }
    </div>
  `,
})
export class CollectComponent {
  private readonly data = inject(DataService);
  private readonly bookCtx = inject(BookContextStore);
  private readonly toast = inject(MessageService);

  protected numberInput = '';
  protected amount: number | null = null;
  protected readonly mode = signal<'cash' | 'gpay'>('cash');

  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly result = signal<CollectLookup | null>(null);
  protected readonly selectedId = signal<string | null>(null);

  protected readonly selectedLoan = computed<CollectLoan | null>(() =>
    this.result()?.loans.find(l => l.id === this.selectedId()) ?? null
  );
  protected readonly showBalance = AuthStore.showBalance;

  protected find(): void {
    const num = parseInt(this.numberInput, 10);
    if (!num || num < 1) return;
    const bookId = this.bookCtx.bookId();
    if (!bookId) return;

    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);
    this.selectedId.set(null);
    this.amount = null;

    this.data.customers.lookup(bookId, num).subscribe({
      next: (res) => {
        this.result.set(res.data);
        if (res.data.loans.length === 1) this.selectedId.set(res.data.loans[0].id);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'Customer not found.');
      },
    });
  }

  protected select(id: string): void {
    this.selectedId.set(id);
    this.amount = null;
  }

  protected save(): void {
    const loan = this.selectedLoan();
    const bookId = this.bookCtx.bookId();
    if (!loan || !bookId || !this.amount || this.amount <= 0) return;

    this.saving.set(true);
    this.data.dailyEntries.create({
      book_id: bookId,
      loan_id: loan.id,
      entry_date: todayStr(),
      amount: this.amount,
      mode: this.mode(),
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.add({ severity: 'success', summary: 'Saved', detail: `${loan.loan_number} · ₹${this.amount}`, life: 2000 });
        this.reset();
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.add({ severity: 'error', summary: 'Not saved', detail: err?.error?.message ?? 'Try again', life: 3500 });
      },
    });
  }

  private reset(): void {
    this.numberInput = '';
    this.amount = null;
    this.mode.set('cash');
    this.result.set(null);
    this.selectedId.set(null);
    this.error.set(null);
  }
}
