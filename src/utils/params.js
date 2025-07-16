import { DEFAULTS, FLAG_SIZES, THEMES, FLAGS_FROM_OPTIONS, VISITOR_TYPES } from '../constants.js';

export function parseParams(query) {
  const {
    username,
    theme = 'default',
    columns,
    maxflags,
    label,
    showcount,
    showlabels,
    flagsfrom,
    visitortype,
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
  
  // Validate and parse columns (1-8)
  let parsedColumns = parseInt(columns) || DEFAULTS.COLUMNS;
  parsedColumns = Math.max(1, Math.min(8, parsedColumns));
  
  // Validate and parse maxflags (1-250)
  let parsedMaxFlags = parseInt(maxflags) || DEFAULTS.MAX_FLAGS;
  parsedMaxFlags = Math.max(1, Math.min(250, parsedMaxFlags));
  
  const params = {
    username: username.trim(),
    columns: parsedColumns,
    maxflags: parsedMaxFlags,
    label: label || DEFAULTS.LABEL,
    showcount: showcount !== 'false',
    showlabels: showlabels === 'true',
    flagsfrom: FLAGS_FROM_OPTIONS[flagsfrom] !== undefined ? FLAGS_FROM_OPTIONS[flagsfrom] : FLAGS_FROM_OPTIONS.all,
    visitortype: VISITOR_TYPES[visitortype] !== undefined ? VISITOR_TYPES[visitortype] : VISITOR_TYPES.number,
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