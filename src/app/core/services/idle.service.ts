import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { SessionMeta } from './base-auth.service';
import { ApiResponse } from '../models/api-response.model';
import { AuthStore } from '../stores/auth.store';

const WARN_BEFORE = 60; // seconds of warning before an auto-logout

/**
 * Drives the two session warnings from a single 1-second tick:
 *  - Idle: user inactive → "Stay signed in?" (a click pings the server, resetting idle).
 *  - Absolute: hard cap reached → "Re-enter your password" (only the real user can renew).
 * Either countdown reaching 0 logs out. Active use also keeps the server's idle clock
 * in sync via a throttled /auth/me ping.
 */
@Injectable({ providedIn: 'root' })
export class IdleService {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  readonly idleWarn = signal(false);
  readonly reauthWarn = signal(false);
  readonly countdown = signal(WARN_BEFORE);

  private lastActivity = Date.now();
  private lastPing = Date.now();
  private intervalId?: ReturnType<typeof setInterval>;
  private running = false;
  private readonly events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
  private readonly onActivity = () => this.activity();

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastActivity = this.lastPing = Date.now();
    this.events.forEach(e => window.addEventListener(e, this.onActivity, { passive: true }));
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  stop(): void {
    this.running = false;
    this.events.forEach(e => window.removeEventListener(e, this.onActivity));
    if (this.intervalId) clearInterval(this.intervalId);
    this.idleWarn.set(false);
    this.reauthWarn.set(false);
  }

  /** "Stay signed in" — ping the server so its idle clock resets too. */
  stayActive(): void {
    this.lastActivity = this.lastPing = Date.now();
    this.idleWarn.set(false);
    this.data.auth.me().subscribe({ next: () => {}, error: () => {} });
  }

  reauth(password: string): Observable<ApiResponse<SessionMeta>> {
    return this.data.auth.reauth(password);
  }

  /** Apply a successful re-auth: new absolute deadline + close the dialog. */
  onReauthed(absoluteExpiresAt: string): void {
    AuthStore.extendAbsolute(absoluteExpiresAt);
    this.lastActivity = this.lastPing = Date.now();
    this.reauthWarn.set(false);
  }

  logoutNow(): void {
    this.stop();
    this.data.auth.logout().subscribe({ next: () => {}, error: () => {} });
    AuthStore.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  private activity(): void {
    // While a warning is up, require the explicit button (so the server is pinged).
    if (this.idleWarn() || this.reauthWarn()) return;
    this.lastActivity = Date.now();
    const idleMs = AuthStore.idleTimeoutMinutes() * 60_000;
    if (Date.now() - this.lastPing > idleMs / 2) {
      this.lastPing = Date.now();
      this.data.auth.me().subscribe({ next: () => {}, error: () => {} });
    }
  }

  private tick(): void {
    if (!AuthStore.isAuthenticated()) return;
    const now = Date.now();
    const idleRemaining = AuthStore.idleTimeoutMinutes() * 60 - Math.floor((now - this.lastActivity) / 1000);
    const absAt = AuthStore.absoluteExpiresAt();
    const absRemaining = absAt ? Math.floor((absAt - now) / 1000) : Infinity;

    if (absRemaining <= 0 || idleRemaining <= 0) { this.logoutNow(); return; }

    if (absRemaining <= WARN_BEFORE) {
      // Absolute takes priority — it needs a password, not just a click.
      this.reauthWarn.set(true);
      this.idleWarn.set(false);
      this.countdown.set(absRemaining);
    } else if (idleRemaining <= WARN_BEFORE) {
      this.idleWarn.set(true);
      this.reauthWarn.set(false);
      this.countdown.set(idleRemaining);
    } else {
      this.idleWarn.set(false);
      this.reauthWarn.set(false);
    }
  }
}
