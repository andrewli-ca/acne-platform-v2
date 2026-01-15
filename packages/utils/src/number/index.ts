/**
 * @acne/utils - Number Utilities
 *
 * Number formatting utilities using the Intl API for locale-aware formatting.
 * All functions are vendor-agnostic and use native JavaScript APIs.
 *
 * @example
 * ```ts
 * import {
 *   formatCurrency,
 *   formatNumber,
 *   formatPercent,
 *   formatCompact,
 *   formatFileSize
 * } from '@acne/utils';
 *
 * // Currency
 * formatCurrency(1234.56);                    // "$1,234.56"
 * formatCurrency(1234.56, { currency: 'EUR' }); // "€1,234.56"
 *
 * // Numbers
 * formatNumber(1234567.89);                   // "1,234,567.89"
 * formatCompact(1234567);                     // "1.2M"
 *
 * // Percentages
 * formatPercent(0.1234);                      // "12%"
 *
 * // File sizes
 * formatFileSize(1048576);                    // "1.0 MB"
 * ```
 */

// =============================================================================
// Formatting
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
} from './format';
