/**
 * Date formatting helpers shared across collection / reporting screens.
 *
 * Two formatters exist on purpose:
 *  - `localDateStr` uses the browser's local date parts (how collection
 *    `entry_date`s are keyed) — use this for anything tied to "the collection day".
 *  - `isoDateStr` uses `toISOString()` (UTC) and is used by the report/dashboard
 *    date-range filters. NOTE: in non-UTC timezones this can differ from
 *    `localDateStr` by a day near midnight; kept separate to preserve existing
 *    filter behavior. A future cleanup may unify on `localDateStr`.
 */

/** Local-timezone `YYYY-MM-DD`. */
export function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Today as a local `YYYY-MM-DD` string. */
export function todayStr(): string {
  return localDateStr(new Date());
}

/** UTC `YYYY-MM-DD` (via `toISOString`) — for report/dashboard range filters. */
export function isoDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}
