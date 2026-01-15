/**
 * Date format constants
 *
 * Use these with formatDate() instead of raw format strings.
 * This keeps the underlying library (dayjs) as an implementation detail.
 *
 * @example
 * ```ts
 * import { formatDate, DateFormat } from '@acme/utils/date';
 *
 * formatDate(new Date(), DateFormat.SHORT);      // "Jan 14, 2026"
 * formatDate(new Date(), DateFormat.ISO);        // "2026-01-14"
 * formatDate(new Date(), DateFormat.WITH_TIME);  // "Jan 14, 2026 3:30 PM"
 * ```
 */

/** Available date format options */
export const DateFormat = {
  /** "Jan 14, 2026" */
  SHORT: 'SHORT',
  /** "January 14, 2026" */
  LONG: 'LONG',
  /** "2026-01-14" */
  ISO: 'ISO',
  /** "Jan 14, 2026 3:30 PM" */
  WITH_TIME: 'WITH_TIME',
  /** "3:30 PM" */
  TIME: 'TIME',
  /** "01/14/2026" */
  NUMERIC: 'NUMERIC',
  /** "Jan 14" (no year) */
  SHORT_NO_YEAR: 'SHORT_NO_YEAR',
  /** "January 14" (no year) */
  LONG_NO_YEAR: 'LONG_NO_YEAR',
  /** "Wed, Jan 14" */
  WITH_WEEKDAY: 'WITH_WEEKDAY',
  /** "Wednesday, January 14, 2026" */
  FULL: 'FULL',
  /** "Jan 2026" */
  MONTH_YEAR: 'MONTH_YEAR',
  /** "January 2026" */
  MONTH_YEAR_LONG: 'MONTH_YEAR_LONG',
  /** "Jan 14 2026" (no comma) */
  SHORT_NO_COMMA: 'SHORT_NO_COMMA',
  /** "2026" */
  YEAR: 'YEAR',
  /** "Jan" */
  MONTH_SHORT: 'MONTH_SHORT',
} as const;

/** Type for DateFormat values */
export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

/**
 * Internal mapping to dayjs format strings.
 * NOT exported - this is an implementation detail.
 * @internal
 */
export const FORMAT_STRINGS: Record<DateFormat, string> = {
  [DateFormat.SHORT]: 'MMM D, YYYY',
  [DateFormat.LONG]: 'MMMM D, YYYY',
  [DateFormat.ISO]: 'YYYY-MM-DD',
  [DateFormat.WITH_TIME]: 'MMM D, YYYY h:mm A',
  [DateFormat.TIME]: 'h:mm A',
  [DateFormat.NUMERIC]: 'MM/DD/YYYY',
  [DateFormat.SHORT_NO_YEAR]: 'MMM D',
  [DateFormat.LONG_NO_YEAR]: 'MMMM D',
  [DateFormat.WITH_WEEKDAY]: 'ddd, MMM D',
  [DateFormat.FULL]: 'dddd, MMMM D, YYYY',
  [DateFormat.MONTH_YEAR]: 'MMM YYYY',
  [DateFormat.MONTH_YEAR_LONG]: 'MMMM YYYY',
  [DateFormat.SHORT_NO_COMMA]: 'MMM D YYYY',
  [DateFormat.YEAR]: 'YYYY',
  [DateFormat.MONTH_SHORT]: 'MMM',
};
