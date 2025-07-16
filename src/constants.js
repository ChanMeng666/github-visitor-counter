export const FLAG_COUNTER_BASE_URL = 'https://s01.flagcounter.com';

export const DEFAULTS = {
  COLUMNS: 2,
  MAX_FLAGS: 10,
  LABEL: 'Visitors',
  SHOW_COUNT: true,
  FLAG_SIZE: 'medium',
  CACHE_SECONDS: 3600
};

export const FLAG_SIZES = {
  small: 0,
  medium: 1,
  large: 2
};

export const THEMES = {
  default: {
    bg: 'FFFFFF',
    text: '000000',
    border: 'CCCCCC'
  },
  dark: {
    bg: '0D1117',
    text: 'C9D1D9',
    border: '30363D'
  },
  github: {
    bg: '24292E',
    text: 'FFFFFF',
    border: '444D56'
  },
  github_dark: {
    bg: '161B22',
    text: 'E6EDF3',
    border: '30363D'
  },
  transparent: {
    bg: 'FFFFFF',
    text: '000000',
    border: 'FFFFFF'
  }
};