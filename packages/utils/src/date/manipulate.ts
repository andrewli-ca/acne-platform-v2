/**
 * Date manipulation utilities
 *
 * All functions accept native Date objects and return new Date objects.
 * The underlying implementation (dayjs) is not exposed.
 *
 * @example
 * ```ts
 * import { addDays, startOfMonth } from '@acne/utils';
 *
 * const nextWeek = addDays(new Date(), 7);
 * const monthStart = startOfMonth(new Date());
 * ```
 */

import dayjs from 'dayjs';

import type { DateInput } from './format';

// =============================================================================
// Time Unit Addition
// =============================================================================

/**
 * Add days to a date (negative to subtract)
 *
 * @example
 * ```ts
 * addDays(new Date(), 7);   // 7 days from now
 * addDays(new Date(), -1);  // yesterday
 * ```
 */
export function addDays(date: DateInput, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

/**
 * Add weeks to a date (negative to subtract)
 *
 * @example
 * ```ts
 * addWeeks(new Date(), 2);  // 2 weeks from now
 * ```
 */
export function addWeeks(date: DateInput, weeks: number): Date {
  return dayjs(date).add(weeks, 'week').toDate();
}

/**
 * Add months to a date (negative to subtract)
 *
 * @example
 * ```ts
 * addMonths(new Date(), 3);   // 3 months from now
 * addMonths(new Date(), -1);  // 1 month ago
 * ```
 */
export function addMonths(date: DateInput, months: number): Date {
  return dayjs(date).add(months, 'month').toDate();
}

/**
 * Add years to a date (negative to subtract)
 *
 * @example
 * ```ts
 * addYears(new Date(), 1);  // 1 year from now
 * ```
 */
export function addYears(date: DateInput, years: number): Date {
  return dayjs(date).add(years, 'year').toDate();
}

// =============================================================================
// Day Boundaries
// =============================================================================

/**
 * Get the start of day (00:00:00.000)
 *
 * @example
 * ```ts
 * startOfDay(new Date()); // Today at midnight
 * ```
 */
export function startOfDay(date: DateInput): Date {
  return dayjs(date).startOf('day').toDate();
}

/**
 * Get the end of day (23:59:59.999)
 *
 * @example
 * ```ts
 * endOfDay(new Date()); // Today at 23:59:59.999
 * ```
 */
export function endOfDay(date: DateInput): Date {
  return dayjs(date).endOf('day').toDate();
}

// =============================================================================
// Week Boundaries
// =============================================================================

/**
 * Get the start of the week (Sunday 00:00:00.000)
 *
 * @example
 * ```ts
 * startOfWeek(new Date()); // Sunday of this week
 * ```
 */
export function startOfWeek(date: DateInput): Date {
  return dayjs(date).startOf('week').toDate();
}

/**
 * Get the end of the week (Saturday 23:59:59.999)
 *
 * @example
 * ```ts
 * endOfWeek(new Date()); // Saturday of this week
 * ```
 */
export function endOfWeek(date: DateInput): Date {
  return dayjs(date).endOf('week').toDate();
}

// =============================================================================
// Month Boundaries
// =============================================================================

/**
 * Get the start of the month
 *
 * @example
 * ```ts
 * startOfMonth(new Date()); // 1st of this month at midnight
 * ```
 */
export function startOfMonth(date: DateInput): Date {
  return dayjs(date).startOf('month').toDate();
}

/**
 * Get the end of the month
 *
 * @example
 * ```ts
 * endOfMonth(new Date()); // Last day of this month at 23:59:59.999
 * ```
 */
export function endOfMonth(date: DateInput): Date {
  return dayjs(date).endOf('month').toDate();
}

// =============================================================================
// Year Boundaries
// =============================================================================

/**
 * Get the start of the year
 *
 * @example
 * ```ts
 * startOfYear(new Date()); // Jan 1 of this year at midnight
 * ```
 */
export function startOfYear(date: DateInput): Date {
  return dayjs(date).startOf('year').toDate();
}

/**
 * Get the end of the year
 *
 * @example
 * ```ts
 * endOfYear(new Date()); // Dec 31 of this year at 23:59:59.999
 * ```
 */
export function endOfYear(date: DateInput): Date {
  return dayjs(date).endOf('year').toDate();
}

// =============================================================================
// Date Getters
// =============================================================================

/**
 * Get the year from a date
 *
 * @example
 * ```ts
 * getYear(new Date('2026-07-15')); // 2026
 * ```
 */
export function getYear(date: DateInput): number {
  return dayjs(date).year();
}

/**
 * Get the month from a date (0-11)
 *
 * @example
 * ```ts
 * getMonth(new Date('2026-07-15')); // 6 (July)
 * ```
 */
export function getMonth(date: DateInput): number {
  return dayjs(date).month();
}

/**
 * Get the day of the month (1-31)
 *
 * @example
 * ```ts
 * getDayOfMonth(new Date('2026-07-15')); // 15
 * ```
 */
export function getDayOfMonth(date: DateInput): number {
  return dayjs(date).date();
}

/**
 * Get the number of days in the month for a given date
 *
 * @example
 * ```ts
 * getDaysInMonth(new Date('2026-02-15')); // 28
 * getDaysInMonth(new Date('2024-02-15')); // 29 (leap year)
 * ```
 */
export function getDaysInMonth(date: DateInput): number {
  return dayjs(date).daysInMonth();
}

/**
 * Create a date from year, month, day
 *
 * @example
 * ```ts
 * createDate(2026, 0, 14); // Jan 14, 2026
 * createDate(2026, 6, 15); // Jul 15, 2026
 * ```
 */
export function createDate(year: number, month: number, day: number): Date {
  return dayjs().year(year).month(month).date(day).startOf('day').toDate();
}

// =============================================================================
// Utilities
// =============================================================================

/**
 * Convert any date input to a Date object
 *
 * @example
 * ```ts
 * toDate('2026-01-14');       // Date object
 * toDate(1736841600000);      // Date object
 * toDate(existingDate);       // Same Date object
 * ```
 */
export function toDate(date: DateInput): Date {
  return dayjs(date).toDate();
}

/**
 * Get the current date/time as a Date object
 * Useful for dependency injection in tests
 *
 * @example
 * ```ts
 * const now = getCurrentDate();
 * ```
 */
export function getCurrentDate(): Date {
  return new Date();
}
