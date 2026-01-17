/**
 * Color validation and processing helpers
 * Extracted from flagCounter.ts to eliminate code duplication
 */

// Pre-compiled regex for performance
const HEX_COLOR_REGEX = /^[0-9A-Fa-f]{6}$/;

/**
 * Color set interface for consistent color handling
 */
export interface ColorSet {
  bg: string;
  text: string;
  border: string;
}

/**
 * Default colors used when validation fails
 */
export const DEFAULT_COLORS: ColorSet = {
  bg: 'FFFFFF',
  text: '000000',
  border: 'CCCCCC',
};

/**
 * Validate hex color format (6 characters, 0-9A-Fa-f)
 */
export function validateHexColor(color: string | undefined | null): color is string {
  if (!color) return false;
  return HEX_COLOR_REGEX.test(color);
}

/**
 * Normalize hex color to uppercase
 */
export function normalizeHexColor(color: string): string {
  return color.toUpperCase();
}

/**
 * Validate and get color with fallback to default
 */
export function getValidColor(color: string | undefined, defaultColor: string): string {
  return validateHexColor(color) ? color : defaultColor;
}

/**
 * Resolve colors from input, applying defaults for invalid values
 */
export function resolveColors(
  colors: Partial<ColorSet>,
  defaults: ColorSet = DEFAULT_COLORS
): ColorSet {
  return {
    bg: getValidColor(colors.bg, defaults.bg),
    text: getValidColor(colors.text, defaults.text),
    border: getValidColor(colors.border, defaults.border),
  };
}

/**
 * Sanitize hex color input (remove invalid characters and normalize)
 */
export function sanitizeHexColorInput(input: string): string {
  return input.replace(/[^0-9A-Fa-f]/g, '').toUpperCase().substring(0, 6);
}
