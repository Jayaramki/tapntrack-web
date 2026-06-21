import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DataService } from '../../../core/services/data.service';
import { AuthStore } from '../../../core/stores/auth.store';
import { Loan } from '../../../core/models/loan.model';

@Component({
  selector: 'app-loan-view',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe, CardModule, ButtonModule, TagModule, MessageModule],
  styles: [`
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0; flex: 1; }
    .detail-grid {
      display: grid; grid-template-columns: 1fr; gap: 0 32px;
    }
    @media (min-width: 640px)  { .detail-grid { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1024px) { .detail-grid { grid-template-columns: 1fr 1fr 1fr; } }
    .detail-item { padding: 12px 0; border-bottom: 1px solid var(--p-surface-border); }
    .detail-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--p-text-muted-color); margin-bottom: 4px; }
    .detail-value { font-size: 1rem; font-weight: 500; }
    .section-title {
      font-size: 0.875rem; font-weight: 600; color: var(--p-text-muted-color);
      text-transform: uppercase; letter-spacing: 0.05em;
      margin: 24px 0 8px; padding-bottom: 6px;
      border-bottom: 2px solid var(--p-primary-color);
      grid-column: 1 / -1;
    }
    .summary-bar {
      display: flex; gap: 24px; flex-wrap: wrap;
      background: var(--p-surface-50); border: 1px solid var(--p-surface-border);
      border-radius: 8px; padding: 16px; margin-top: 20px;
    }
    .stat { display: flex; flex-direction: column; gap: 4px; }
    .stat-label { font-size: 0.75rem; color: var(--p-text-muted-color); text-transform: uppercase; letter-spacing: 0.05em; }
    .stat-value { font-size: 1.25rem; font-weight: 700; }
  `],
  template: `
    @if (loadError()) {
      <p-message severity="error" [text]="loadError()!" styleClass="w-full" />
    }

    <div class="page-header">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true"
                severity="secondary" routerLink="/loans" />
      <h1 class="page-title">
        Loan Details
        @if (loan()) {
          &nbsp;<span class="font-mono" style="color:var(--p-text-muted-color)">#{{ loan()!.loan_number }}</span>
        }
      </h1>
      @if (canEdit() && loan()) {
        <p-button label="Edit" icon="pi pi-pencil" severity="info"
                  [routerLink]="['/loans', loan()!.id, 'edit']" />
      }
    </div>

    @if (loan(); as l) {
      <p-card>
        <div class="detail-grid">
          <div class="section-title">Loan Info</div>

          <div class="detail-item">
            <div class="detail-label">Loan Number</div>
            <div class="detail-value font-mono">{{ l.loan_number }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Customer</div>
            <div class="detail-value">{{ l.customer_name }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Type</div>
            <div class="detail-value">
              <p-tag [value]="l.loan_type" [severity]="typeSeverity(l.loan_type)" styleClass="capitalize" />
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Line</div>
            <div class="detail-value">{{ l.line }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Issued Date</div>
            <div class="detail-value">{{ l.issued_date | date:'dd MMM yyyy' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Status</div>
            <div class="detail-value">
              @if (l.completed_date) {
                <p-tag value="Completed" severity="success" />
              } @else {
                <p-tag value="Active" severity="info" />
              }
            </div>
          </div>

          <div class="section-title">Financial</div>

          <div class="detail-item">
            <div class="detail-label">Loan Amount (to collect)</div>
            <div class="detail-value">₹{{ l.loan_amount | number }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Interest (withheld upfront)</div>
            <div class="detail-value">₹{{ l.interest_amount | number }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Disbursed to Customer</div>
            <div class="detail-value">₹{{ (l.loan_amount - l.interest_amount) | number }}</div>
          </div>
          @if (showBalance()) {
            <div class="detail-item">
              <div class="detail-label">Total Collected</div>
              <div class="detail-value" style="color:var(--p-green-600)">
                ₹{{ (l.total_collected ?? 0) | number }}
              </div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Remaining Balance</div>
              <div class="detail-value"
                   [style]="(l.remaining_balance ?? 0) <= 0 ? 'color:var(--p-green-600)' : 'color:var(--p-red-600)'">
                ₹{{ (l.remaining_balance ?? 0) | number }}
              </div>
            </div>
          }
          <div class="detail-item">
            <div class="detail-label">Days Pending</div>
            <div class="detail-value">{{ l.act_pending_days ?? '—' }}</div>
          </div>

          @if (l.completed_date) {
            <div class="section-title">Completion</div>
            <div class="detail-item">
              <div class="detail-label">Completed Date</div>
              <div class="detail-value">{{ l.completed_date | date:'dd MMM yyyy' }}</div>
            </div>
          }
        </div>

        <div class="summary-bar">
          @if (showBalance()) {
            <div class="stat">
              <span class="stat-label">Progress</span>
              <span class="stat-value">{{ progressPct(l) }}%</span>
            </div>
            <div class="stat">
              <span class="stat-label">Collected</span>
              <span class="stat-value" style="color:var(--p-green-600)">₹{{ (l.total_collected ?? 0) | number }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Balance</span>
              <span class="stat-value" style="color:var(--p-red-600)">₹{{ (l.remaining_balance ?? 0) | number }}</span>
            </div>
          }
          <div class="stat">
            <span class="stat-label">To Collect</span>
            <span class="stat-value">₹{{ l.loan_amount | number }}</span>
          </div>
        </div>
      </p-card>
    } @else if (!loadError()) {
      <div class="text-center py-12" style="color:var(--p-text-muted-color)">
        <i class="pi pi-spin pi-spinner" style="font-size:2rem"></i>
      </div>
    }
  `,
})
export class LoanViewComponent implements OnInit {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);

  protected readonly loan = signal<Loan | null>(null);
  // Balance figures hidden for a field agent whose book has AGENT_SHOW_BALANCE off.
  protected readonly showBalance = computed(() => !AuthStore.hideBalance());
  protected readonly loadError = signal<string | null>(null);
  protected readonly canEdit = computed(() => AuthStore.hasPermission('edit-loans'));

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.data.loans.getById(id).subscribe({
      next: (res) => this.loan.set(res.data),
      error: () => this.loadError.set('Loan not found.'),
    });
  }

  protected typeSeverity(type: string): 'info' | 'success' | 'warn' {
    return type === 'daily' ? 'info' : type === 'weekly' ? 'success' : 'warn';
  }

  protected progressPct(loan: Loan): number {
    const total = loan.loan_amount; // interest is withheld upfront; collect loan_amount
    if (!total) return 0;
    return Math.min(100, Math.round(((loan.total_collected ?? 0) / total) * 100));
  }
}
