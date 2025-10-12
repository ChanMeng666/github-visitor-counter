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
 * Generate a unique counter ID based on the provided parameters
 * Supports multiple identification methods with priority:
 * 1. Official Counter ID (counterId) - use directly
 * 2. Username + Repo - for per-repository counters
 * 3. Full repo path (username/repo) - auto-parse
 * 4. Username + Project - for custom projects
 * 5. Username only - legacy support (global profile counter)
 */
export function generateUserId(params: {
  counterId?: string;
  username?: string;
  repo?: string;
  project?: string;
}): string {
  const { counterId, username, repo, project } = params;

  // Priority 1: Use official Counter ID directly
  if (counterId) {
    return counterId;
  }

  // Priority 2: Username + Repo combination (per-repository counter)
  if (username && repo) {
    const normalizedUsername = username.toLowerCase();
    const normalizedRepo = repo.toLowerCase();
    const combined = `${normalizedUsername}:${normalizedRepo}`;
    const hash = crypto.createHash('md5').update(combined).digest('hex');
    return hash.substring(0, 6); // Use 6 chars to reduce collision risk
  }

  // Priority 3: Full repo path (e.g., "ChanMeng666/gradient-svg-generator")
  if (repo && repo.includes('/')) {
    const normalizedRepo = repo.toLowerCase();
    const hash = crypto.createHash('md5').update(normalizedRepo).digest('hex');
    return hash.substring(0, 6);
  }

  // Priority 4: Username + Project combination (custom projects)
  if (username && project) {
    const normalizedUsername = username.toLowerCase();
    const normalizedProject = project.toLowerCase();
    const combined = `${normalizedUsername}:${normalizedProject}`;
    const hash = crypto.createHash('md5').update(combined).digest('hex');
    return hash.substring(0, 6);
  }

  // Priority 5: Username only (legacy, global profile counter)
  if (username) {
    const normalizedUsername = username.toLowerCase();
    const hash = crypto.createHash('md5').update(normalizedUsername).digest('hex');
    return hash.substring(0, 4); // Keep 4 chars for backward compatibility
  }

  // If none provided, throw error
  throw new Error('Must provide at least one of: counterId, username, or repo');
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
    counterId,
    repo,
    project,
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

  const userId = generateUserId({ counterId, username, repo, project });
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
  const { username, counterId, repo, project, mapSize, label, showcount, text, border } = params;

  const userId = generateUserId({ counterId, username, repo, project });
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
    counterId,
    repo,
    project,
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

  const userId = generateUserId({ counterId, username, repo, project });
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
  const { username, counterId, repo, project, miniDisplay, bg, text, border } = params;

  const userId = generateUserId({ counterId, username, repo, project });
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
