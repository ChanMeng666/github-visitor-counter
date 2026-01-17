/**
 * URL Builder - Single source of truth for API URL generation
 * Used by both client-side (PreviewPanel) and provides consistent URL generation
 */

import type { CounterConfig } from './constants';
import { API_BASE_URL, THEMES, DEFAULTS } from './constants';

export interface URLBuilderOptions {
  config: CounterConfig;
  /** Include default values in URL (useful for explicit parameters) */
  includeDefaults?: boolean;
}

/**
 * Build API URL from CounterConfig (client-side usage)
 * This creates the URL that points to our API endpoint
 */
export function buildApiUrl({ config, includeDefaults = false }: URLBuilderOptions): string {
  const params = new URLSearchParams();

  // Identifier parameters (priority order matching flagCounter.ts)
  appendIdentifierParams(params, config);

  // Display mode
  params.append('displayMode', config.displayMode);

  // Theme (only if not default, unless includeDefaults)
  if (includeDefaults || config.theme !== 'default') {
    params.append('theme', config.theme);
  }

  // Mode-specific parameters
  appendModeSpecificParams(params, config, includeDefaults);

  // Custom colors
  appendCustomColorParams(params, config);

  return `${API_BASE_URL}/api?${params.toString()}`;
}

/**
 * Append identifier parameters based on priority
 */
function appendIdentifierParams(params: URLSearchParams, config: CounterConfig): void {
  if (config.counterId) {
    params.append('counterId', config.counterId);
  } else if (config.username && config.repo) {
    params.append('username', config.username);
    params.append('repo', config.repo);
  } else if (config.repo) {
    params.append('repo', config.repo);
  } else if (config.username && config.project) {
    params.append('username', config.username);
    params.append('project', config.project);
  } else if (config.username) {
    params.append('username', config.username);
  } else {
    // Fallback for preview
    params.append('username', 'github');
  }
}

/**
 * Append mode-specific parameters
 */
function appendModeSpecificParams(
  params: URLSearchParams,
  config: CounterConfig,
  includeDefaults: boolean
): void {
  const { displayMode } = config;

  // Top Countries & Flags From mode parameters
  if (displayMode === 'topCountries' || displayMode === 'flagsFrom') {
    if (includeDefaults || (config.columns && config.columns !== DEFAULTS.COLUMNS)) {
      params.append('columns', String(config.columns ?? DEFAULTS.COLUMNS));
    }

    if (includeDefaults || (config.maxflags && config.maxflags !== DEFAULTS.MAX_FLAGS)) {
      params.append('maxflags', String(config.maxflags ?? DEFAULTS.MAX_FLAGS));
    }

    if (config.showlabels) {
      params.append('showlabels', 'true');
    }

    if (includeDefaults || (config.visitortype && config.visitortype !== DEFAULTS.VISITOR_TYPE)) {
      params.append('visitortype', config.visitortype ?? DEFAULTS.VISITOR_TYPE);
    }

    if (includeDefaults || (config.size && config.size !== DEFAULTS.FLAG_SIZE)) {
      params.append('size', config.size ?? DEFAULTS.FLAG_SIZE);
    }
  }

  // Flags From specific
  if (displayMode === 'flagsFrom' && config.flagsFromCountry) {
    params.append('flagsFromCountry', config.flagsFromCountry);
  }

  // Map mode specific
  if (displayMode === 'flagMap') {
    if (includeDefaults || (config.mapSize && config.mapSize !== DEFAULTS.MAP_SIZE)) {
      params.append('mapSize', config.mapSize ?? DEFAULTS.MAP_SIZE);
    }
  }

  // Mini Counter specific
  if (displayMode === 'miniCounter') {
    if (includeDefaults || (config.miniDisplay && config.miniDisplay !== DEFAULTS.MINI_DISPLAY)) {
      params.append('miniDisplay', config.miniDisplay ?? DEFAULTS.MINI_DISPLAY);
    }
  }

  // Label & count (for all except mini counter)
  if (displayMode !== 'miniCounter') {
    if (includeDefaults || (config.label && config.label !== DEFAULTS.LABEL)) {
      params.append('label', config.label ?? DEFAULTS.LABEL);
    }

    if (config.showcount === false) {
      params.append('showcount', 'false');
    }
  }
}

/**
 * Append custom color parameters
 */
function appendCustomColorParams(params: URLSearchParams, config: CounterConfig): void {
  const selectedTheme = THEMES[config.theme] || THEMES.default;

  // Background color (not for map mode which doesn't support bg)
  if (
    config.displayMode !== 'flagMap' &&
    config.customColors?.bg &&
    config.customColors.bg !== selectedTheme.bg
  ) {
    params.append('bg', config.customColors.bg);
  }

  if (config.customColors?.text && config.customColors.text !== selectedTheme.text) {
    params.append('text', config.customColors.text);
  }

  if (config.customColors?.border && config.customColors.border !== selectedTheme.border) {
    params.append('border', config.customColors.border);
  }
}

/**
 * Generate markdown code for embedding
 */
export function generateMarkdown(config: CounterConfig): string {
  const url = buildApiUrl({ config });
  return `![](${url})`;
}

/**
 * Get effective colors (theme + custom overrides)
 */
export function getEffectiveColors(config: CounterConfig): { bg: string; text: string; border: string } {
  const theme = THEMES[config.theme] || THEMES.default;
  return {
    bg: config.customColors?.bg || theme.bg,
    text: config.customColors?.text || theme.text,
    border: config.customColors?.border || theme.border,
  };
}

/**
 * Get display mode info message
 */
export function getDisplayModeInfo(config: CounterConfig): string {
  switch (config.displayMode) {
    case 'topCountries':
      return 'Shows top countries visiting your GitHub profile with flag visualization';
    case 'flagMap':
      return 'Displays an interactive world map showing visitor distribution';
    case 'flagsFrom':
      return `Shows detailed flag breakdown from ${config.flagsFromCountry === 'us' ? 'United States' : 'Canada'}`;
    case 'miniCounter':
      return 'Compact counter showing either total flags or pageview count';
    default:
      return 'Each parameter combination creates its own visitor counter';
  }
}
