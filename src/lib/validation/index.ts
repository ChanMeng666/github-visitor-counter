/**
 * Validation utilities index
 * Re-exports all validation functions for convenient imports
 */

export {
  validateDisplayMode,
  validateTheme,
  validateNumericRange,
  validateFlagSize,
  validateVisitorType,
  validateMapSize,
  validateMiniDisplay,
  validateFlagsFromCountry,
  validateBoolean,
  validateGitHubUsername,
  getGitHubUsernameStatus,
  type ValidationResult,
} from './paramValidator';

// Re-export color validation from helpers
export { validateHexColor, sanitizeHexColorInput } from '../helpers/colorHelpers';

// Re-export label sanitization from helpers
export { sanitizeLabel } from '../helpers/labelHelpers';
