import {
  DEFAULTS,
  FLAG_SIZES,
  THEMES,
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
} from './constants';

export interface ParsedParams {
  username: string;
  displayMode: DisplayMode;

  // Top Countries & Flags From mode parameters
  columns: number;
  maxflags: number;
  showlabels: boolean;
  visitortype: number; // 0 for number, 1 for percentage
  size: number; // 0 for small, 1 for medium, 2 for large

  // Flags From mode specific
  flagsFromCountry: FlagsFromCountry;

  // Map mode specific
  mapSize: string; // 't', 's', 'm', 'l'

  // Mini Counter mode specific
  miniDisplay: string; // '0' for flags count, '1' for pageviews

  // Common parameters
  label: string;
  showcount: boolean;

  // Colors
  bg: string;
  text: string;
  border: string;
}

/**
 * Parse and validate query parameters from API request
 */
export function parseParams(query: Record<string, string | string[] | undefined>): ParsedParams {
  const {
    username,
    displayMode,
    theme = 'default',
    columns,
    maxflags,
    label,
    showcount,
    showlabels,
    flagsFromCountry,
    visitortype,
    size,
    mapSize,
    miniDisplay,
    bg,
    text,
    border,
  } = query;

  // Extract string values from potential arrays
  const getString = (value: string | string[] | undefined): string | undefined => {
    if (Array.isArray(value)) return value[0];
    return value;
  };

  const usernameStr = getString(username);
  const displayModeStr = (getString(displayMode) as DisplayMode) || DEFAULTS.DISPLAY_MODE;
  const themeStr = getString(theme) as ThemeName;
  const columnsStr = getString(columns);
  const maxflagsStr = getString(maxflags);
  const labelStr = getString(label);
  const showcountStr = getString(showcount);
  const showlabelsStr = getString(showlabels);
  const flagsFromCountryStr = (getString(flagsFromCountry) as FlagsFromCountry) || DEFAULTS.FLAGS_FROM_COUNTRY;
  const visitortypeStr = getString(visitortype) as VisitorType | undefined;
  const sizeStr = getString(size) as FlagSize | undefined;
  const mapSizeStr = (getString(mapSize) as MapSize) || DEFAULTS.MAP_SIZE;
  const miniDisplayStr = (getString(miniDisplay) as MiniDisplay) || DEFAULTS.MINI_DISPLAY;
  const bgStr = getString(bg);
  const textStr = getString(text);
  const borderStr = getString(border);

  if (!usernameStr) {
    throw new Error('Username parameter is required');
  }

  const selectedTheme = THEMES[themeStr] || THEMES.default;

  // Validate and parse columns (1-8)
  let parsedColumns = parseInt(columnsStr || '') || DEFAULTS.COLUMNS;
  parsedColumns = Math.max(1, Math.min(8, parsedColumns));

  // Validate and parse maxflags (1-250)
  let parsedMaxFlags = parseInt(maxflagsStr || '') || DEFAULTS.MAX_FLAGS;
  parsedMaxFlags = Math.max(1, Math.min(250, parsedMaxFlags));

  const params: ParsedParams = {
    username: usernameStr.trim(),
    displayMode: displayModeStr,

    // Top Countries & Flags From parameters
    columns: parsedColumns,
    maxflags: parsedMaxFlags,
    showlabels: showlabelsStr === 'true',
    visitortype:
      visitortypeStr && VISITOR_TYPES[visitortypeStr] !== undefined
        ? VISITOR_TYPES[visitortypeStr]
        : VISITOR_TYPES[DEFAULTS.VISITOR_TYPE],
    size:
      sizeStr && FLAG_SIZES[sizeStr] !== undefined
        ? FLAG_SIZES[sizeStr]
        : FLAG_SIZES[DEFAULTS.FLAG_SIZE],

    // Flags From specific
    flagsFromCountry: flagsFromCountryStr,

    // Map mode specific
    mapSize: MAP_SIZES[mapSizeStr],

    // Mini Counter specific
    miniDisplay: MINI_DISPLAY_TYPES[miniDisplayStr],

    // Common
    label: labelStr || DEFAULTS.LABEL,
    showcount: showcountStr !== 'false',

    // Colors
    bg: bgStr || selectedTheme.bg,
    text: textStr || selectedTheme.text,
    border: borderStr || selectedTheme.border,
  };

  return params;
}

/**
 * Validate hex color format (6 characters, 0-9A-Fa-f)
 */
export function validateHexColor(color: string): boolean {
  return /^[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Sanitize label text - only allow alphanumeric, spaces, hyphens, underscores
 * Max length: 30 characters
 */
export function sanitizeLabel(label: string): string {
  return label.replace(/[^a-zA-Z0-9\s\-_]/g, '').substring(0, 30);
}
