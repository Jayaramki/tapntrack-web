import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { HttpSubscriptionService } from '../../core/services/http-subscription.service';
import { Subscription } from '../../core/models/subscription.model';
import { TenantStatus } from '../../core/models/admin.model';

const STATUS_SEVERITY: Record<TenantStatus, 'success' | 'info' | 'warn' | 'danger'> = {
  active: 'success', trial: 'info', past_due: 'warn', suspended: 'danger',
};

interface Meter { label: string; used: number; max: number | null; }

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [DatePipe, CardModule, TagModule, ProgressBarModule, MessageModule],
  styles: [`
    .page-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 4px; }
    .page-sub { font-size: 0.85rem; color: var(--p-text-muted-color); margin-bottom: 20px; }
    .plan-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .plan-name { font-size: 1.4rem; font-weight: 700; }
    .meters { display: grid; gap: 18px; margin-top: 8px; }
    .meter-head { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px; }
    .meter-head .val { color: var(--p-text-muted-color); font-variant-numeric: tabular-nums; }
    .near { color: var(--p-orange-600); font-weight: 600; }
    .upgrade-note { margin-top: 20px; }
  `],
  template: `
    <h1 class="page-title">Plan &amp; Usage</h1>
    <div class="page-sub">Your subscription and how much of it you're using.</div>

    @if (sub(); as s) {
      <p-card>
        <div class="plan-row">
          <span class="plan-name">{{ s.limits.label }}</span>
          <p-tag [value]="statusLabel(s.status)" [severity]="statusSeverity(s.status)" />
        </div>
        @if (s.status === 'trial' && s.trial_ends_at) {
          <div class="page-sub">Trial ends {{ s.trial_ends_at | date:'dd MMM yyyy' }}.</div>
        }

        <div class="meters">
          @for (m of meters(); track m.label) {
            <div>
              <div class="meter-head">
                <span>{{ m.label }}</span>
                <span class="val" [class.near]="isNear(m)">
                  {{ m.used }} / {{ m.max === null ? 'Unlimited' : m.max }}
                </span>
              </div>
              <p-progressBar [value]="pct(m)" [showValue]="false" [style]="{ height: '8px' }" />
            </div>
          }
        </div>

        <div class="upgrade-note">
          @if (anyNear()) {
            <p-message severity="warn" styleClass="w-full"
              text="You're close to a limit. Upgrading unlocks more capacity — online upgrades are coming soon; contact us to change your plan." />
          } @else {
            <p-message severity="info" styleClass="w-full"
              text="Need more capacity? Online plan upgrades are coming soon — contact us to change your plan." />
          }
        </div>
      </p-card>
    } @else if (loadError()) {
      <p-message severity="error" [text]="loadError()!" styleClass="w-full" />
    }
  `,
})
export class BillingComponent implements OnInit {
  private readonly api = inject(HttpSubscriptionService);

  protected readonly sub = signal<Subscription | null>(null);
  protected readonly loadError = signal<string | null>(null);

  protected readonly meters = computed<Meter[]>(() => {
    const s = this.sub();
    if (!s) return [];
    return [
      { label: 'Active loans', used: s.usage.active_loans, max: s.limits.max_active_loans },
      { label: 'Users',        used: s.usage.users,        max: s.limits.max_users },
      { label: 'Books',        used: s.usage.books,        max: s.limits.max_books },
    ];
  });
  protected readonly anyNear = computed(() => this.meters().some(m => this.isNear(m)));

  ngOnInit(): void {
    this.api.get().subscribe({
      next: (r) => this.sub.set(r.data),
      error: () => this.loadError.set('Could not load your subscription.'),
    });
  }

  protected pct(m: Meter): number {
    if (m.max === null || m.max === 0) return 0;
    return Math.min(100, Math.round((m.used / m.max) * 100));
  }
  protected isNear(m: Meter): boolean {
    return m.max !== null && m.used >= m.max * 0.8;
  }
  protected statusLabel(s: TenantStatus): string { return s.replace('_', ' '); }
  protected statusSeverity(s: TenantStatus) { return STATUS_SEVERITY[s] ?? 'info'; }
}
