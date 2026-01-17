/**
 * Label processing helpers
 * Extracted from flagCounter.ts to eliminate code duplication
 */

// Pre-compiled regex for performance
const LABEL_SANITIZE_REGEX = /[^a-zA-Z0-9\s\-_]/g;
const WHITESPACE_REGEX = /\s+/g;

/**
 * Sanitize label text - only allow alphanumeric, spaces, hyphens, underscores
 * Max length: 30 characters
 */
export function sanitizeLabel(label: string): string {
  return label.replace(LABEL_SANITIZE_REGEX, '').substring(0, 30);
}

/**
 * Check if label should be hidden
 */
export function isLabelHidden(label: string): boolean {
  return label.toLowerCase() === 'none';
}

/**
 * Process label for Flag Counter URL parameter
 * Returns '0' for hidden labels, or encoded label string
 */
export function processLabelForUrl(label: string): string {
  if (isLabelHidden(label)) {
    return '0';
  }
  const sanitized = sanitizeLabel(label);
  // Double-encode spaces for Flag Counter URL format
  return sanitized.replace(WHITESPACE_REGEX, '%2520');
}
