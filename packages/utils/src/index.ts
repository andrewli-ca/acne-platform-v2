/**
 * @acme/utils - Public API
 *
 * Utility functions for dates, strings, numbers, and more.
 * All utilities use native JavaScript APIs where possible - implementations are abstracted.
 *
 * @example
 * ```ts
 * import { formatDate, DateFormat, capitalize, slugify, formatCurrency } from '@acme/utils';
 *
 * formatDate(new Date(), DateFormat.SHORT);  // "Jan 14, 2026"
 * capitalize('hello');                        // "Hello"
 * formatCurrency(1234.56);                    // "$1,234.56"
 * ```
 */

// =============================================================================
// Date Utilities
// =============================================================================

export {
  // Format constants
  DateFormat,
  // Formatting
  formatDate,
  formatDateRange,
  formatRelativeTime,
  toISODateString,
  toISOString,
  type DateInput,
  // Manipulation
  addDays,
  addMonths,
  addWeeks,
  addYears,
  createDate,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getCurrentDate,
  getDayOfMonth,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  toDate,
  // Comparison
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  isAfter,
  isBefore,
  isFuture,
  isPast,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isTomorrow,
  isValidDate,
  isWithinRange,
  isYesterday,
  // Quarter
  getCurrentQuarter,
  getNextQuarter,
  getPreviousQuarter,
  getQuarter,
  getQuarterEnd,
  getQuarterLabel,
  getQuarterRange,
  getQuarterStart,
  getQuartersForYear,
  type DateRange,
  type QuarterInfo,
} from './date';

// =============================================================================
// String Utilities
// =============================================================================

export {
  capitalize,
  capitalizeWords,
  containsIgnoreCase,
  countOccurrences,
  escapeHtml,
  isBlank,
  normalizeWhitespace,
  padString,
  pluralize,
  removeWhitespace,
  reverse,
  slugify,
  stripHtml,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  truncate,
} from './string';

// =============================================================================
// Number Utilities
// =============================================================================

export {
  formatCompact,
  formatCurrency,
  formatFileSize,
  formatNumber,
  formatOrdinal,
  formatPercent,
  type CurrencyFormatOptions,
  type NumberFormatOptions,
  type PercentFormatOptions,
} from './number';
