import { DEFAULTS, FLAG_SIZES, THEMES } from '../constants.js';

export function parseParams(query) {
  const {
    username,
    theme = 'default',
    columns,
    maxflags,
    label,
    showcount,
    size,
    bg,
    text,
    border,
    ...rest
  } = query;

  if (!username) {
    throw new Error('Username parameter is required');
  }

  const selectedTheme = THEMES[theme] || THEMES.default;
  
  const params = {
    username: username.trim(),
    columns: parseInt(columns) || DEFAULTS.COLUMNS,
    maxflags: parseInt(maxflags) || DEFAULTS.MAX_FLAGS,
    label: label || DEFAULTS.LABEL,
    showcount: showcount !== 'false',
    size: FLAG_SIZES[size] !== undefined ? FLAG_SIZES[size] : FLAG_SIZES.medium,
    bg: bg || selectedTheme.bg,
    text: text || selectedTheme.text,
    border: border || selectedTheme.border
  };

  return params;
}

export function validateHexColor(color) {
  return /^[0-9A-Fa-f]{6}$/.test(color);
}

export function sanitizeLabel(label) {
  return label.replace(/[^a-zA-Z0-9\s\-_]/g, '').substring(0, 30);
}