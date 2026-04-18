import validator from 'validator';

/**
 * Sanitizes a string by:
 * - Trimming whitespace
 * - Stripping low ASCII control characters
 * - Escaping HTML entities (< > & " ')
 * Returns empty string if input is not a string.
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim();
  const stripped = validator.stripLow(trimmed, true);
  return validator.escape(stripped);
}

/**
 * Sanitizes but does NOT escape HTML entities.
 * Use for fields where you want clean text but will display as-is.
 * e.g. names, addresses — you still want & to appear as & not &amp;
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim();
  return validator.stripLow(trimmed, true);
}

/**
 * Sanitizes an array of strings.
 */
export function sanitizeArray(input: string[]): string[] {
  return input.map((item) => sanitizeInput(item)).filter(Boolean);
}

/**
 * Sanitizes optional text — returns undefined if empty after sanitization.
 */
export function sanitizeOptional(input: unknown): string | undefined {
  const result = sanitizeInput(input);
  return result.length > 0 ? result : undefined;
}
