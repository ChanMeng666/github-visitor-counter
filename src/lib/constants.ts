export const FLAG_COUNTER_BASE_URL = 'https://s01.flagcounter.com';
export const API_BASE_URL = 'https://github-visitor-counter-tau.vercel.app';

// Display Modes - Four types of counters
export const DISPLAY_MODES = {
  topCountries: 'topCountries',    // Default: /count2/{userId}/...
  flagMap: 'flagMap',              // Map view: /map/{userId}/...
  flagsFrom: 'flagsFrom',          // Country-specific: /count2_US/{userId}/...
  miniCounter: 'miniCounter',      // Mini: /mini/{userId}/...
} as const;

export const DEFAULTS = {
  DISPLAY_MODE: 'topCountries' as DisplayMode,
  COLUMNS: 2,
  MAX_FLAGS: 10,
  LABEL: 'Visitors',
  SHOW_COUNT: true,
  SHOW_LABELS: false,
  FLAGS_FROM_COUNTRY: 'us' as FlagsFromCountry,
  VISITOR_TYPE: 'number' as VisitorType,
  FLAG_SIZE: 'medium' as FlagSize,
  MAP_SIZE: 'small' as MapSize,
  MINI_DISPLAY: 'flags' as MiniDisplay,
  CACHE_SECONDS: 3600,
} as const;

// Flag sizes for Top Countries and Flags From modes
export const FLAG_SIZES = {
  small: 0,
  medium: 1,
  large: 2,
} as const;

// Country options for Flags From mode
export const FLAGS_FROM_COUNTRIES = {
  us: 'US',
  ca: 'CA',
} as const;

// Visitor display types
export const VISITOR_TYPES = {
  number: 0,
  percentage: 1,
} as const;

// Map sizes for Flag Map mode
export const MAP_SIZES = {
  tiny: 't',
  small: 's',
  medium: 'm',
  large: 'l',
} as const;

// Display types for Mini Counter mode
export const MINI_DISPLAY_TYPES = {
  flags: '0',      // Number of flags
  pageviews: '1',  // Pageview count
} as const;

export const THEMES = {
  default: {
    bg: 'FFFFFF',
    text: '000000',
    border: 'CCCCCC',
  },
  dark: {
    bg: '0D1117',
    text: 'C9D1D9',
    border: '30363D',
  },
  github: {
    bg: '24292E',
    text: 'FFFFFF',
    border: '444D56',
  },
  github_dark: {
    bg: '161B22',
    text: 'E6EDF3',
    border: '30363D',
  },
  transparent: {
    bg: 'FFFFFF',
    text: '000000',
    border: 'FFFFFF',
  },
} as const;

// Type definitions
export type DisplayMode = keyof typeof DISPLAY_MODES;
export type ThemeName = keyof typeof THEMES;
export type FlagSize = keyof typeof FLAG_SIZES;
export type FlagsFromCountry = keyof typeof FLAGS_FROM_COUNTRIES;
export type VisitorType = keyof typeof VISITOR_TYPES;
export type MapSize = keyof typeof MAP_SIZES;
export type MiniDisplay = keyof typeof MINI_DISPLAY_TYPES;

// Counter configuration interface
export interface CounterConfig {
  username: string;
  displayMode: DisplayMode;
  theme: ThemeName;

  // Top Countries & Flags From mode parameters
  columns?: number;
  maxflags?: number;
  showlabels?: boolean;
  visitortype?: VisitorType;
  size?: FlagSize;

  // Flags From mode specific
  flagsFromCountry?: FlagsFromCountry;

  // Map mode specific
  mapSize?: MapSize;

  // Mini Counter mode specific
  miniDisplay?: MiniDisplay;

  // Common parameters
  label?: string;
  showcount?: boolean;

  // Custom colors
  customColors?: {
    bg?: string;
    text?: string;
    border?: string;
  };
}

// Quick preset configurations
export const QUICK_PRESETS = {
  'dark-minimal': {
    displayMode: 'topCountries' as DisplayMode,
    theme: 'dark' as ThemeName,
    columns: 2,
    maxflags: 10,
    label: 'none',
    showcount: false,
    showlabels: false,
    visitortype: 'number' as VisitorType,
    size: 'small' as FlagSize,
  },
  'light-detailed': {
    displayMode: 'topCountries' as DisplayMode,
    theme: 'default' as ThemeName,
    columns: 4,
    maxflags: 20,
    label: 'Visitors',
    showcount: true,
    showlabels: true,
    visitortype: 'number' as VisitorType,
    size: 'medium' as FlagSize,
  },
  'github-style': {
    displayMode: 'topCountries' as DisplayMode,
    theme: 'github_dark' as ThemeName,
    columns: 3,
    maxflags: 15,
    label: 'Visitors',
    showcount: true,
    showlabels: false,
    visitortype: 'percentage' as VisitorType,
    size: 'medium' as FlagSize,
  },
  'world-map': {
    displayMode: 'flagMap' as DisplayMode,
    theme: 'default' as ThemeName,
    mapSize: 'medium' as MapSize,
    label: 'Visitors',
    showcount: true,
  },
  'mini-clean': {
    displayMode: 'miniCounter' as DisplayMode,
    theme: 'transparent' as ThemeName,
    miniDisplay: 'flags' as MiniDisplay,
  },
} as const;

export type PresetName = keyof typeof QUICK_PRESETS;
