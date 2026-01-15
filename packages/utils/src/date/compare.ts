/**
 * Date comparison utilities
 *
 * All functions accept native Date objects.
 * The underlying implementation (dayjs) is not exposed.
 *
 * @example
 * ```ts
 * import { isToday, isBefore, differenceInDays } from '@acme/utils';
 *
 * isToday(new Date());                        // true
 * isBefore(startDate, endDate);               // true/false
 * differenceInDays(endDate, startDate);       // number
 * ```
 */

import dayjs from 'dayjs';

import type { DateInput } from './format';

// =============================================================================
// Relative Comparisons (vs now)
// =============================================================================

/**
 * Check if a date is today
 *
 * @example
 * ```ts
 * isToday(new Date());           // true
 * isToday('2020-01-01');         // false
 * ```
 */
export function isToday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * Check if a date is yesterday
 *
 * @example
 * ```ts
 * isYesterday(addDays(new Date(), -1)); // true
 * ```
 */
export function isYesterday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * Check if a date is tomorrow
 *
 * @example
 * ```ts
 * isTomorrow(addDays(new Date(), 1)); // true
 * ```
 */
export function isTomorrow(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
}

/**
 * Check if a date is in the past
 *
 * @example
 * ```ts
 * isPast('2020-01-01');  // true
 * isPast('2030-01-01');  // false
 * ```
 */
export function isPast(date: DateInput): boolean {
  return dayjs(date).isBefore(dayjs());
}

/**
 * Check if a date is in the future
 *
 * @example
 * ```ts
 * isFuture('2030-01-01');  // true
 * isFuture('2020-01-01');  // false
 * ```
 */
export function isFuture(date: DateInput): boolean {
  return dayjs(date).isAfter(dayjs());
}

// =============================================================================
// Date-to-Date Comparisons
// =============================================================================

/**
 * Check if dateA is before dateB
 *
 * @example
 * ```ts
 * isBefore('2026-01-01', '2026-01-15'); // true
 * ```
 */
export function isBefore(dateA: DateInput, dateB: DateInput): boolean {
  return dayjs(dateA).isBefore(dayjs(dateB));
}

/**
 * Check if dateA is after dateB
 *
 * @example
 * ```ts
 * isAfter('2026-01-15', '2026-01-01'); // true
 * ```
 */
export function isAfter(dateA: DateInput, dateB: DateInput): boolean {
  return dayjs(dateA).isAfter(dayjs(dateB));
}

/**
 * Check if two dates are on the same day
 *
 * @example
 * ```ts
 * isSameDay('2026-01-14T10:00', '2026-01-14T22:00'); // true
 * isSameDay('2026-01-14', '2026-01-15');             // false
 * ```
 */
export function isSameDay(dateA: DateInput, dateB: DateInput): boolean {
  return dayjs(dateA).isSame(dayjs(dateB), 'day');
}

/**
 * Check if two dates are in the same month
 *
 * @example
 * ```ts
 * isSameMonth('2026-01-01', '2026-01-31'); // true
 * isSameMonth('2026-01-01', '2026-02-01'); // false
 * ```
 */
export function isSameMonth(dateA: DateInput, dateB: DateInput): boolean {
  return dayjs(dateA).isSame(dayjs(dateB), 'month');
}

/**
 * Check if two dates are in the same year
 *
 * @example
 * ```ts
 * isSameYear('2026-01-01', '2026-12-31'); // true
 * isSameYear('2026-01-01', '2027-01-01'); // false
 * ```
 */
export function isSameYear(dateA: DateInput, dateB: DateInput): boolean {
  return dayjs(dateA).isSame(dayjs(dateB), 'year');
}

/**
 * Check if a date falls within a range (inclusive)
 *
 * @example
 * ```ts
 * isWithinRange('2026-01-15', '2026-01-01', '2026-01-31'); // true
 * isWithinRange('2026-02-15', '2026-01-01', '2026-01-31'); // false
 * ```
 */
export function isWithinRange(
  date: DateInput,
  rangeStart: DateInput,
  rangeEnd: DateInput
): boolean {
  const d = dayjs(date);
  const start = dayjs(rangeStart);
  const end = dayjs(rangeEnd);
  return (d.isAfter(start) || d.isSame(start)) && (d.isBefore(end) || d.isSame(end));
}

// =============================================================================
// Difference Calculations
// =============================================================================

/**
 * Get the difference in days between two dates
 *
 * @example
 * ```ts
 * differenceInDays('2026-01-15', '2026-01-10'); // 5
 * differenceInDays('2026-01-10', '2026-01-15'); // -5
 * ```
 */
export function differenceInDays(dateA: DateInput, dateB: DateInput): number {
  return dayjs(dateA).diff(dayjs(dateB), 'day');
}

/**
 * Get the difference in weeks between two dates
 *
 * @example
 * ```ts
 * differenceInWeeks('2026-01-21', '2026-01-07'); // 2
 * ```
 */
export function differenceInWeeks(dateA: DateInput, dateB: DateInput): number {
  return dayjs(dateA).diff(dayjs(dateB), 'week');
}

/**
 * Get the difference in months between two dates
 *
 * @example
 * ```ts
 * differenceInMonths('2026-06-01', '2026-01-01'); // 5
 * ```
 */
export function differenceInMonths(dateA: DateInput, dateB: DateInput): number {
  return dayjs(dateA).diff(dayjs(dateB), 'month');
}

/**
 * Get the difference in years between two dates
 *
 * @example
 * ```ts
 * differenceInYears('2030-01-01', '2026-01-01'); // 4
 * ```
 */
export function differenceInYears(dateA: DateInput, dateB: DateInput): number {
  return dayjs(dateA).diff(dayjs(dateB), 'year');
}

// =============================================================================
// Validation
// =============================================================================

/**
 * Check if a value is a valid date
 *
 * @example
 * ```ts
 * isValidDate('2026-01-14');     // true
 * isValidDate('not-a-date');     // false
 * isValidDate(null);             // false
 * ```
 */
export function isValidDate(value: unknown): boolean {
  if (value == null) return false;
  if (value instanceof Date) return !isNaN(value.getTime());
  if (typeof value === 'string' || typeof value === 'number') {
    if (typeof value === 'string' && value === '') return false;
    return dayjs(value).isValid();
  }
  return false;
}
