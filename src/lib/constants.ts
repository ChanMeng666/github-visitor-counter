export const FLAG_COUNTER_BASE_URL = 'https://s01.flagcounter.com';
export const API_BASE_URL = 'https://github-visitor-counter-tau.vercel.app';

export const DEFAULTS = {
  COLUMNS: 2,
  MAX_FLAGS: 10,
  LABEL: 'Visitors',
  SHOW_COUNT: true,
  SHOW_LABELS: false,
  FLAGS_FROM: 'all',
  VISITOR_TYPE: 'number',
  FLAG_SIZE: 'medium',
  CACHE_SECONDS: 3600,
} as const;

export const FLAG_SIZES = {
  small: 0,
  medium: 1,
  large: 2,
} as const;

export const FLAGS_FROM_OPTIONS = {
  all: '',
  us: 'US',
  ca: 'CA',
} as const;

export const VISITOR_TYPES = {
  number: 0,
  percentage: 1,
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

export type ThemeName = keyof typeof THEMES;
export type FlagSize = keyof typeof FLAG_SIZES;
export type FlagsFrom = keyof typeof FLAGS_FROM_OPTIONS;
export type VisitorType = keyof typeof VISITOR_TYPES;

export interface CounterConfig {
  username: string;
  theme: ThemeName;
  columns: number;
  maxflags: number;
  label: string;
  showcount: boolean;
  showlabels: boolean;
  flagsfrom: FlagsFrom;
  visitortype: VisitorType;
  size: FlagSize;
  customColors?: {
    bg?: string;
    text?: string;
    border?: string;
  };
}
