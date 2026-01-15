/**
 * Number formatting options
 */
export interface CurrencyFormatOptions {
  /**
   * Currency code (e.g., 'USD', 'EUR', 'GBP')
   * @default 'USD'
   */
  currency?: string;
  /**
   * Locale for formatting (e.g., 'en-US', 'en-GB', 'de-DE')
   * @default 'en-US'
   */
  locale?: string;
  /**
   * Minimum number of fraction digits
   * @default 2
   */
  minimumFractionDigits?: number;
  /**
   * Maximum number of fraction digits
   * @default 2
   */
  maximumFractionDigits?: number;
}

export interface NumberFormatOptions {
  /**
   * Locale for formatting
   * @default 'en-US'
   */
  locale?: string;
  /**
   * Minimum number of fraction digits
   */
  minimumFractionDigits?: number;
  /**
   * Maximum number of fraction digits
   */
  maximumFractionDigits?: number;
  /**
   * Whether to use grouping separators (e.g., commas)
   * @default true
   */
  useGrouping?: boolean;
}

export interface PercentFormatOptions {
  /**
   * Locale for formatting
   * @default 'en-US'
   */
  locale?: string;
  /**
   * Minimum number of fraction digits
   * @default 0
   */
  minimumFractionDigits?: number;
  /**
   * Maximum number of fraction digits
   * @default 2
   */
  maximumFractionDigits?: number;
}

/**
 * Format a number as currency
 *
 * @example
 * ```ts
 * formatCurrency(1234.56);                           // "$1,234.56"
 * formatCurrency(1234.56, { currency: 'EUR' });      // "€1,234.56"
 * formatCurrency(1234.56, { locale: 'de-DE' });      // "1.234,56 $"
 * formatCurrency(1234, { minimumFractionDigits: 0 }); // "$1,234"
 * ```
 */
export function formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Format a number with locale-aware grouping and decimal separators
 *
 * @example
 * ```ts
 * formatNumber(1234567.89);                              // "1,234,567.89"
 * formatNumber(1234567.89, { locale: 'de-DE' });         // "1.234.567,89"
 * formatNumber(1234.5, { minimumFractionDigits: 2 });    // "1,234.50"
 * formatNumber(1234, { useGrouping: false });            // "1234"
 * ```
 */
export function formatNumber(value: number, options: NumberFormatOptions = {}): string {
  const {
    locale = 'en-US',
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping = true,
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }).format(value);
}

/**
 * Format a number as a percentage
 *
 * @example
 * ```ts
 * formatPercent(0.1234);                           // "12%"
 * formatPercent(0.1234, { maximumFractionDigits: 2 }); // "12.34%"
 * formatPercent(0.5);                              // "50%"
 * formatPercent(1.5);                              // "150%"
 * ```
 */
export function formatPercent(value: number, options: PercentFormatOptions = {}): string {
  const { locale = 'en-US', minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a number in compact notation (e.g., 1.2K, 3.4M)
 *
 * @example
 * ```ts
 * formatCompact(1234);          // "1.2K"
 * formatCompact(1234567);       // "1.2M"
 * formatCompact(1234567890);    // "1.2B"
 * formatCompact(123);           // "123"
 * ```
 */
export function formatCompact(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format a number as an ordinal (1st, 2nd, 3rd, etc.)
 * Note: Only works with locales that support ordinal formatting
 *
 * @example
 * ```ts
 * formatOrdinal(1);   // "1st"
 * formatOrdinal(2);   // "2nd"
 * formatOrdinal(3);   // "3rd"
 * formatOrdinal(21);  // "21st"
 * ```
 */
export function formatOrdinal(value: number, locale = 'en-US'): string {
  const pr = new Intl.PluralRules(locale, { type: 'ordinal' });
  const suffixes: Record<string, string> = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  };
  const rule = pr.select(value);
  const suffix = suffixes[rule];
  return `${value}${suffix}`;
}

/**
 * Format file size in human-readable format
 *
 * @example
 * ```ts
 * formatFileSize(1024);           // "1 KB"
 * formatFileSize(1536);           // "1.5 KB"
 * formatFileSize(1048576);        // "1 MB"
 * formatFileSize(1073741824);     // "1 GB"
 * ```
 */
export function formatFileSize(bytes: number, decimals = 1): string {
  // Input validation
  if (!Number.isFinite(bytes)) {
    throw new RangeError('bytes must be a finite number');
  }
  if (bytes < 0) {
    throw new RangeError('bytes must be non-negative');
  }
  if (bytes === 0) return '0 Bytes';
  if (bytes < 1) return '<1 Byte';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(decimals)} ${sizes[i]}`;
}
