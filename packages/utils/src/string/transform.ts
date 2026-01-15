/**
 * Truncate a string to a specified length with ellipsis
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (!str || str.length <= length) return str;
  if (length <= suffix.length) return str.slice(0, length);
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Reverse a string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Pad a string to a specified length with a character
 */
export function padString(
  str: string,
  length: number,
  char = ' ',
  position: 'start' | 'end' = 'start'
): string {
  if (str.length >= length) return str;
  const padLength = length - str.length;
  const padding = char.repeat(Math.ceil(padLength / char.length)).slice(0, padLength);
  return position === 'start' ? padding + str : str + padding;
}

/**
 * Generate a slug from a string (URL-friendly)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Pluralize a word based on count
 */
export function pluralize(word: string, count: number, plural?: string): string {
  if (count === 1) return word;
  return plural || `${word}s`;
}
