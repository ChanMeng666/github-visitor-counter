/**
 * Parameter validation utilities with type safety
 * Provides validators for all API parameters with proper fallbacks
 */

import {
  DISPLAY_MODES,
  THEMES,
  FLAG_SIZES,
  FLAGS_FROM_COUNTRIES,
  VISITOR_TYPES,
  MAP_SIZES,
  MINI_DISPLAY_TYPES,
  type DisplayMode,
  type ThemeName,
  type FlagSize,
  type FlagsFromCountry,
  type VisitorType,
  type MapSize,
  type MiniDisplay,
} from '../constants';

/**
 * Validation result with type-safe value
 */
export interface ValidationResult<T> {
  valid: boolean;
  value: T;
  error?: string;
}

/**
 * Validate display mode
 */
export function validateDisplayMode(value: unknown): ValidationResult<DisplayMode> {
  if (typeof value === 'string' && value in DISPLAY_MODES) {
    return { valid: true, value: value as DisplayMode };
  }
  return { valid: false, value: 'topCountries', error: `Invalid display mode: ${value}` };
}

/**
 * Validate theme name
 */
export function validateTheme(value: unknown): ValidationResult<ThemeName> {
  if (typeof value === 'string' && value in THEMES) {
    return { valid: true, value: value as ThemeName };
  }
  return { valid: false, value: 'default', error: `Invalid theme: ${value}` };
}

/**
 * Validate numeric value within range
 */
export function validateNumericRange(
  value: unknown,
  min: number,
  max: number,
  defaultValue: number
): ValidationResult<number> {
  const num = typeof value === 'string' ? parseInt(value, 10) :
              typeof value === 'number' ? value : NaN;

  if (isNaN(num)) {
    return { valid: false, value: defaultValue };
  }

  const clamped = Math.max(min, Math.min(max, num));
  return { valid: num === clamped, value: clamped };
}

/**
 * Validate flag size
 */
export function validateFlagSize(value: unknown): ValidationResult<FlagSize> {
  if (typeof value === 'string' && value in FLAG_SIZES) {
    return { valid: true, value: value as FlagSize };
  }
  return { valid: false, value: 'medium' };
}

/**
 * Validate visitor type
 */
export function validateVisitorType(value: unknown): ValidationResult<VisitorType> {
  if (typeof value === 'string' && value in VISITOR_TYPES) {
    return { valid: true, value: value as VisitorType };
  }
  return { valid: false, value: 'number' };
}

/**
 * Validate map size
 */
export function validateMapSize(value: unknown): ValidationResult<MapSize> {
  if (typeof value === 'string' && value in MAP_SIZES) {
    return { valid: true, value: value as MapSize };
  }
  return { valid: false, value: 'small' };
}

/**
 * Validate mini display type
 */
export function validateMiniDisplay(value: unknown): ValidationResult<MiniDisplay> {
  if (typeof value === 'string' && value in MINI_DISPLAY_TYPES) {
    return { valid: true, value: value as MiniDisplay };
  }
  return { valid: false, value: 'flags' };
}

/**
 * Validate flags from country
 */
export function validateFlagsFromCountry(value: unknown): ValidationResult<FlagsFromCountry> {
  if (typeof value === 'string' && value in FLAGS_FROM_COUNTRIES) {
    return { valid: true, value: value as FlagsFromCountry };
  }
  return { valid: false, value: 'us' };
}

/**
 * Validate boolean from string
 */
export function validateBoolean(value: unknown, defaultValue: boolean): ValidationResult<boolean> {
  if (value === 'true') return { valid: true, value: true };
  if (value === 'false') return { valid: true, value: false };
  return { valid: false, value: defaultValue };
}

/**
 * Pre-compiled regex for GitHub username validation
 */
const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

/**
 * Validate GitHub username format
 */
export function validateGitHubUsername(username: string): boolean {
  if (!username || username.trim() === '') return false;
  return GITHUB_USERNAME_REGEX.test(username);
}

/**
 * Get username validation status
 */
export function getGitHubUsernameStatus(username: string): 'idle' | 'valid' | 'invalid' {
  if (!username || username.trim() === '') return 'idle';
  return GITHUB_USERNAME_REGEX.test(username) ? 'valid' : 'invalid';
}
