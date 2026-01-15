/**
 * Quarter-based date utilities
 *
 * Functions for working with fiscal/calendar quarters.
 * All functions accept native Date objects and return Date objects.
 *
 * @example
 * ```ts
 * import { getQuarter, getQuarterRange, getCurrentQuarter } from '@acme/utils';
 *
 * getQuarter(new Date());              // 0-3 (Q1-Q4)
 * getQuarterRange(2026, 0);            // { start: Date, end: Date }
 * getCurrentQuarter(new Date());       // QuarterInfo
 * ```
 */

import dayjs from 'dayjs';

import type { DateInput } from './format';

// =============================================================================
// Quarter Calculations
// =============================================================================

/**
 * Get the quarter number (0-3) for a given date
 *
 * - Q1 = 0 (Jan-Mar)
 * - Q2 = 1 (Apr-Jun)
 * - Q3 = 2 (Jul-Sep)
 * - Q4 = 3 (Oct-Dec)
 *
 * @example
 * ```ts
 * getQuarter(new Date('2026-01-15')); // 0 (Q1)
 * getQuarter(new Date('2026-07-15')); // 2 (Q3)
 * ```
 */
export function getQuarter(date: DateInput): number {
  return Math.floor(dayjs(date).month() / 3);
}

/**
 * Get the human-readable quarter label (Q1, Q2, Q3, Q4)
 *
 * @example
 * ```ts
 * getQuarterLabel(0); // "Q1"
 * getQuarterLabel(3); // "Q4"
 * ```
 */
export function getQuarterLabel(quarter: number): string {
  return `Q${quarter + 1}`;
}

// =============================================================================
// Quarter Boundaries
// =============================================================================

/**
 * Get the start date of a quarter for a given year and quarter number (0-3)
 *
 * @example
 * ```ts
 * getQuarterStart(2026, 0); // Jan 1, 2026
 * getQuarterStart(2026, 2); // Jul 1, 2026
 * ```
 */
export function getQuarterStart(year: number, quarter: number): Date {
  const month = quarter * 3;
  return dayjs().year(year).month(month).startOf('month').toDate();
}

/**
 * Get the end date of a quarter for a given year and quarter number (0-3)
 *
 * @example
 * ```ts
 * getQuarterEnd(2026, 0); // Mar 31, 2026 23:59:59.999
 * getQuarterEnd(2026, 2); // Sep 30, 2026 23:59:59.999
 * ```
 */
export function getQuarterEnd(year: number, quarter: number): Date {
  const month = quarter * 3 + 2;
  return dayjs().year(year).month(month).endOf('month').toDate();
}

/** Date range with start and end */
export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Get the start and end dates of a quarter for a given year and quarter number (0-3)
 *
 * @example
 * ```ts
 * getQuarterRange(2026, 0); // { start: Jan 1, end: Mar 31 }
 * ```
 */
export function getQuarterRange(year: number, quarter: number): DateRange {
  return {
    start: getQuarterStart(year, quarter),
    end: getQuarterEnd(year, quarter),
  };
}

// =============================================================================
// Relative Quarter Navigation
// =============================================================================

/** Quarter info including dates and identifiers */
export interface QuarterInfo extends DateRange {
  year: number;
  quarter: number;
}

/**
 * Get the quarter info for a given date
 *
 * @example
 * ```ts
 * getCurrentQuarter(new Date('2026-02-15'));
 * // { start: Jan 1, end: Mar 31, year: 2026, quarter: 0 }
 * ```
 */
export function getCurrentQuarter(date: DateInput): QuarterInfo {
  const d = dayjs(date);
  const quarter = Math.floor(d.month() / 3);
  const year = d.year();

  return {
    start: getQuarterStart(year, quarter),
    end: getQuarterEnd(year, quarter),
    year,
    quarter,
  };
}

/**
 * Get the previous quarter relative to a given date
 *
 * @example
 * ```ts
 * getPreviousQuarter(new Date('2026-02-15'));
 * // { start: Oct 1 2025, end: Dec 31 2025, year: 2025, quarter: 3 }
 * ```
 */
export function getPreviousQuarter(date: DateInput): QuarterInfo {
  const d = dayjs(date);
  const currentQuarter = Math.floor(d.month() / 3);
  const currentYear = d.year();

  let prevQuarter: number;
  let prevYear: number;

  if (currentQuarter === 0) {
    // If current is Q1, previous is Q4 of previous year
    prevQuarter = 3;
    prevYear = currentYear - 1;
  } else {
    prevQuarter = currentQuarter - 1;
    prevYear = currentYear;
  }

  return {
    start: getQuarterStart(prevYear, prevQuarter),
    end: getQuarterEnd(prevYear, prevQuarter),
    year: prevYear,
    quarter: prevQuarter,
  };
}

/**
 * Get the next quarter relative to a given date
 *
 * @example
 * ```ts
 * getNextQuarter(new Date('2026-02-15'));
 * // { start: Apr 1 2026, end: Jun 30 2026, year: 2026, quarter: 1 }
 * ```
 */
export function getNextQuarter(date: DateInput): QuarterInfo {
  const d = dayjs(date);
  const currentQuarter = Math.floor(d.month() / 3);
  const currentYear = d.year();

  let nextQuarter: number;
  let nextYear: number;

  if (currentQuarter === 3) {
    // If current is Q4, next is Q1 of next year
    nextQuarter = 0;
    nextYear = currentYear + 1;
  } else {
    nextQuarter = currentQuarter + 1;
    nextYear = currentYear;
  }

  return {
    start: getQuarterStart(nextYear, nextQuarter),
    end: getQuarterEnd(nextYear, nextQuarter),
    year: nextYear,
    quarter: nextQuarter,
  };
}

/**
 * Get all quarters for a given year
 *
 * @example
 * ```ts
 * getQuartersForYear(2026);
 * // [{ start, end, year: 2026, quarter: 0 }, ..., { ..., quarter: 3 }]
 * ```
 */
export function getQuartersForYear(year: number): QuarterInfo[] {
  return [0, 1, 2, 3].map((quarter) => ({
    start: getQuarterStart(year, quarter),
    end: getQuarterEnd(year, quarter),
    year,
    quarter,
  }));
}
