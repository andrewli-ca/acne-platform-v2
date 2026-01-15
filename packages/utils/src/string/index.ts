/**
 * @acne/utils - String Utilities
 *
 * A collection of string manipulation utilities organized by category.
 * All functions are tree-shakeable and vendor-agnostic.
 *
 * @example
 * ```ts
 * import {
 *   capitalize,
 *   toKebabCase,
 *   truncate,
 *   slugify,
 *   isBlank,
 *   escapeHtml
 * } from '@acne/utils';
 *
 * // Case conversion
 * capitalize('hello');              // "Hello"
 * toKebabCase('helloWorld');        // "hello-world"
 *
 * // Transformations
 * truncate('long text...', 10);     // "long te..."
 * slugify('Hello World!');          // "hello-world"
 *
 * // Validation
 * isBlank('   ');                   // true
 *
 * // HTML
 * escapeHtml('<div>');              // "&lt;div&gt;"
 * ```
 */

// =============================================================================
// Case Conversion
// =============================================================================

export {
  capitalize,
  capitalizeWords,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './case';

// =============================================================================
// Transformations
// =============================================================================

export { padString, pluralize, reverse, slugify, truncate } from './transform';

// =============================================================================
// Whitespace
// =============================================================================

export { isBlank, normalizeWhitespace, removeWhitespace } from './whitespace';

// =============================================================================
// HTML
// =============================================================================

export { escapeHtml, stripHtml } from './html';

// =============================================================================
// Validation
// =============================================================================

export { containsIgnoreCase, countOccurrences } from './validation';
