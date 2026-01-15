/**
 * Remove all whitespace from a string
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, '');
}

/**
 * Trim and normalize whitespace (replace multiple spaces with single space)
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * Check if a string is empty or contains only whitespace
 */
export function isBlank(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}
