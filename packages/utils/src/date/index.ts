/**
 * @acne/utils - Date Utilities
 *
 * A vendor-agnostic date utility library. The underlying implementation (dayjs)
 * is not exposed - all functions use native Date objects at the boundaries.
 *
 * This means you can swap the underlying library without changing any calling code.
 *
 * @example
 * ```ts
 * import {
 *   formatDate,
 *   DateFormat,
 *   addDays,
 *   isToday,
 *   getCurrentQuarter
 * } from '@acne/utils';
 *
 * // Formatting
 * formatDate(new Date(), DateFormat.SHORT);  // "Jan 14, 2026"
 *
 * // Manipulation
 * const nextWeek = addDays(new Date(), 7);
 *
 * // Comparison
 * if (isToday(someDate)) { ... }
 *
 * // Quarters
 * const q = getCurrentQuarter(new Date());
 * ```
 */

// =============================================================================
// Format Constants
// =============================================================================

export { DateFormat } from './formats';

// =============================================================================
// Formatting - Date → String
// =============================================================================

export {
  formatDate,
  formatDateRange,
  formatRelativeTime,
  toISODateString,
  toISOString,
  type DateInput,
} from './format';

// =============================================================================
// Manipulation - Date Arithmetic & Boundaries
// =============================================================================

export {
  // Addition
  addDays,
  addMonths,
  addWeeks,
  addYears,
  // Day boundaries
  endOfDay,
  startOfDay,
  // Week boundaries
  endOfWeek,
  startOfWeek,
  // Month boundaries
  endOfMonth,
  startOfMonth,
  // Year boundaries
  endOfYear,
  startOfYear,
  // Date getters
  createDate,
  getDayOfMonth,
  getDaysInMonth,
  getMonth,
  getYear,
  // Utilities
  getCurrentDate,
  toDate,
} from './manipulate';

// =============================================================================
// Comparison - Date Comparisons & Differences
// =============================================================================

export {
  // Relative to now
  isFuture,
  isPast,
  isToday,
  isTomorrow,
  isYesterday,
  // Date to date
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  isWithinRange,
  // Differences
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  // Validation
  isValidDate,
} from './compare';

// =============================================================================
// Quarter - Quarter-based Operations
// =============================================================================

export {
  // Calculations
  getQuarter,
  getQuarterLabel,
  // Boundaries
  getQuarterEnd,
  getQuarterRange,
  getQuarterStart,
  // Navigation
  getCurrentQuarter,
  getNextQuarter,
  getPreviousQuarter,
  getQuartersForYear,
  // Types
  type DateRange,
  type QuarterInfo,
} from './quarter';
