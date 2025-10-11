import crypto from 'crypto';
import {
  FLAG_COUNTER_BASE_URL,
  FLAG_SIZES,
  FLAGS_FROM_COUNTRIES,
  VISITOR_TYPES,
  MAP_SIZES,
  MINI_DISPLAY_TYPES,
  type DisplayMode,
} from './constants';
import { validateHexColor, sanitizeLabel, type ParsedParams } from './params';

/**
 * Generate a unique 4-character user ID based on GitHub username
 * Uses MD5 hash to ensure the same username always gets the same ID
 */
export function generateUserId(username: string): string {
  const normalizedUsername = username.toLowerCase();
  const hash = crypto.createHash('md5').update(normalizedUsername).digest('hex');
  return hash.substring(0, 4);
}

/**
 * Generate Flag Counter URL based on display mode
 */
export function generateFlagCounterUrl(params: ParsedParams): string {
  const { displayMode } = params;

  switch (displayMode) {
    case 'topCountries':
      return generateTopCountriesUrl(params);
    case 'flagMap':
      return generateFlagMapUrl(params);
    case 'flagsFrom':
      return generateFlagsFromUrl(params);
    case 'miniCounter':
      return generateMiniCounterUrl(params);
    default:
      return generateTopCountriesUrl(params);
  }
}

/**
 * Generate Top Countries mode URL
 * Format: /count2/{userId}/bg_XXX/txt_XXX/border_XXX/columns_X/maxflags_X/viewers_XXX/labels_X/pageviews_X/flags_X/percent_X/
 */
function generateTopCountriesUrl(params: ParsedParams): string {
  const {
    username,
    columns,
    maxflags,
    label,
    showcount,
    showlabels,
    visitortype,
    size,
    bg,
    text,
    border,
  } = params;

  const userId = generateUserId(username);
  const bgColor = validateHexColor(bg) ? bg : 'FFFFFF';
  const textColor = validateHexColor(text) ? text : '000000';
  const borderColor = validateHexColor(border) ? border : 'CCCCCC';

  // Process label
  let labelParam = '';
  if (label.toLowerCase() === 'none') {
    labelParam = '0';
  } else {
    const sanitizedLabel = sanitizeLabel(label);
    labelParam = sanitizedLabel.replace(/\s+/g, '%2520');
  }

  const flagParams = [
    `bg_${bgColor}`,
    `txt_${textColor}`,
    `border_${borderColor}`,
    `columns_${columns}`,
    `maxflags_${maxflags}`,
    `viewers_${labelParam}`,
    `labels_${showlabels ? '1' : '0'}`,
    `pageviews_${showcount ? '1' : '0'}`,
    `flags_${size}`,
    `percent_${visitortype}`,
  ];

  return `${FLAG_COUNTER_BASE_URL}/count2/${userId}/${flagParams.join('/')}/`;
}

/**
 * Generate Flag Map mode URL
 * Format: /map/{userId}/size_X/txt_XXX/border_XXX/pageviews_X/viewers_XXX/flags_0/
 */
function generateFlagMapUrl(params: ParsedParams): string {
  const { username, mapSize, label, showcount, text, border } = params;

  const userId = generateUserId(username);
  const textColor = validateHexColor(text) ? text : '000000';
  const borderColor = validateHexColor(border) ? border : 'CCCCCC';

  // Process label
  let labelParam = '';
  if (label.toLowerCase() === 'none') {
    labelParam = '0';
  } else {
    const sanitizedLabel = sanitizeLabel(label);
    labelParam = sanitizedLabel.replace(/\s+/g, '%2520');
  }

  const mapParams = [
    `size_${mapSize}`,
    `txt_${textColor}`,
    `border_${borderColor}`,
    `pageviews_${showcount ? '1' : '0'}`,
    `viewers_${labelParam}`,
    `flags_0`, // Always 0 for map mode
  ];

  return `${FLAG_COUNTER_BASE_URL}/map/${userId}/${mapParams.join('/')}/`;
}

/**
 * Generate Flags From mode URL (US or CA)
 * Format: /count2_US/{userId}/bg_XXX/txt_XXX/border_XXX/columns_X/maxflags_X/viewers_XXX/labels_X/pageviews_X/flags_X/percent_X/
 */
function generateFlagsFromUrl(params: ParsedParams): string {
  const {
    username,
    flagsFromCountry,
    columns,
    maxflags,
    label,
    showcount,
    showlabels,
    visitortype,
    size,
    bg,
    text,
    border,
  } = params;

  const userId = generateUserId(username);
  const bgColor = validateHexColor(bg) ? bg : 'FFFFFF';
  const textColor = validateHexColor(text) ? text : '000000';
  const borderColor = validateHexColor(border) ? border : 'CCCCCC';

  // Process label
  let labelParam = '';
  if (label.toLowerCase() === 'none') {
    labelParam = '0';
  } else {
    const sanitizedLabel = sanitizeLabel(label);
    labelParam = sanitizedLabel.replace(/\s+/g, '%2520');
  }

  const flagParams = [
    `bg_${bgColor}`,
    `txt_${textColor}`,
    `border_${borderColor}`,
    `columns_${columns}`,
    `maxflags_${maxflags}`,
    `viewers_${labelParam}`,
    `labels_${showlabels ? '1' : '0'}`,
    `pageviews_${showcount ? '1' : '0'}`,
    `flags_${size}`,
    `percent_${visitortype}`,
  ];

  // IMPORTANT: Use count2_US or count2_CA instead of count2
  const countryCode = FLAGS_FROM_COUNTRIES[flagsFromCountry];
  return `${FLAG_COUNTER_BASE_URL}/count2_${countryCode}/${userId}/${flagParams.join('/')}/`;
}

/**
 * Generate Mini Counter mode URL
 * Format: /mini/{userId}/bg_XXX/txt_XXX/border_XXX/flags_X/
 */
function generateMiniCounterUrl(params: ParsedParams): string {
  const { username, miniDisplay, bg, text, border } = params;

  const userId = generateUserId(username);
  const bgColor = validateHexColor(bg) ? bg : 'FFFFFF';
  const textColor = validateHexColor(text) ? text : '000000';
  const borderColor = validateHexColor(border) ? border : 'CCCCCC';

  const miniParams = [
    `bg_${bgColor}`,
    `txt_${textColor}`,
    `border_${borderColor}`,
    `flags_${miniDisplay}`,
  ];

  return `${FLAG_COUNTER_BASE_URL}/mini/${userId}/${miniParams.join('/')}/`;
}
