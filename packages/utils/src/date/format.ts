/**
 * Date formatting utilities
 *
 * All functions accept native Date objects and return strings.
 * The underlying implementation (dayjs) is not exposed.
 *
 * @example
 * ```ts
 * import { formatDate, DateFormat } from '@acme/utils';
 *
 * formatDate(new Date(), DateFormat.SHORT); // "Jan 14, 2026"
 * ```
 */

import dayjs from 'dayjs';

import { FORMAT_STRINGS, type DateFormat } from './formats';

/** Acceptable date input types */
export type DateInput = Date | string | number;

/**
 * Format a date using a predefined format
 *
 * @param date - Date object, ISO string, or timestamp
 * @param format - Format to use (from DateFormat enum)
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date(), DateFormat.SHORT);     // "Jan 14, 2026"
 * formatDate('2026-01-14', DateFormat.LONG);    // "January 14, 2026"
 * formatDate(1736841600000, DateFormat.ISO);    // "2026-01-14"
 * ```
 */
export function formatDate(date: DateInput, format: DateFormat): string {
  return dayjs(date).format(FORMAT_STRINGS[format]);
}

/**
 * Format a date as ISO 8601 date string (YYYY-MM-DD)
 *
 * @example
 * ```ts
 * toISODateString(new Date(2026, 0, 14)); // "2026-01-14"
 * ```
 */
export function toISODateString(date: DateInput): string {
  return dayjs(date).format('YYYY-MM-DD');
}

/**
 * Format a date as ISO 8601 datetime string
 *
 * @example
 * ```ts
 * toISOString(new Date()); // "2026-01-14T15:30:00.000Z"
 * ```
 */
export function toISOString(date: DateInput): string {
  return dayjs(date).toISOString();
}

/**
 * Format a date range as a human-readable string
 *
 * @example
 * ```ts
 * formatDateRange(jan1, jan31);           // "Jan 1 – 31, 2026"
 * formatDateRange(jan1, mar31);           // "Jan 1 – Mar 31, 2026"
 * formatDateRange(dec2025, jan2026);      // "Dec 1, 2025 – Jan 31, 2026"
 * ```
 */
export function formatDateRange(start: DateInput, end: DateInput): string {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const sameYear = startDate.year() === endDate.year();
  const sameMonth = sameYear && startDate.month() === endDate.month();

  if (sameMonth) {
    // "Jan 1 – 31, 2026"
    return `${startDate.format('MMM D')} – ${endDate.format('D, YYYY')}`;
  }

  if (sameYear) {
    // "Jan 1 – Mar 31, 2026"
    return `${startDate.format('MMM D')} – ${endDate.format('MMM D, YYYY')}`;
  }

  // "Dec 1, 2025 – Jan 31, 2026"
  return `${startDate.format('MMM D, YYYY')} – ${endDate.format('MMM D, YYYY')}`;
}

/**
 * Format a relative time string (e.g., "2 days ago", "in 3 hours")
 *
 * @example
 * ```ts
 * formatRelativeTime(yesterday);  // "1 day ago"
 * formatRelativeTime(tomorrow);   // "in 1 day"
 * ```
 */
export function formatRelativeTime(date: DateInput): string {
  const now = new Date();
  const target = dayjs(date).toDate();
  const diffMs = target.getTime() - now.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffDays) >= 1) {
    return rtf.format(diffDays, 'day');
  }
  if (Math.abs(diffHours) >= 1) {
    return rtf.format(diffHours, 'hour');
  }
  if (Math.abs(diffMins) >= 1) {
    return rtf.format(diffMins, 'minute');
  }
  return rtf.format(diffSecs, 'second');
}
