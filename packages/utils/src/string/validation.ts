/**
 * Check if a string contains a substring (case-insensitive)
 */
export function containsIgnoreCase(str: string, searchString: string): boolean {
  return str.toLowerCase().includes(searchString.toLowerCase());
}

/**
 * Count occurrences of a substring in a string
 */
export function countOccurrences(str: string, searchString: string): number {
  if (!searchString) return 0;
  return str.split(searchString).length - 1;
}
