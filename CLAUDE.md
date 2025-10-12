# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Visitor Counter is a modern Next.js application that displays country flags of GitHub profile visitors. It provides a customizable visitor counter widget that developers can embed in their GitHub README files. The service is deployed on Vercel and integrates with the Flag Counter API to generate visitor tracking images with four different display modes.

**Live Demo**: https://github-visitor-counter-tau.vercel.app
**Main API Endpoint**: `/api?username=YOUR_USERNAME`
**Interactive Dashboard**: `/dashboard`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 3, shadcn/ui
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Runtime**: Node.js with ES6 modules

## Development Commands

### Local Development
```bash
# Start Next.js development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Deployment
```bash
# Deploy to production
npm run deploy
```

## Architecture

### Core Components

**1. API Layer** (`/src/app/api/route.ts`)
- Next.js API Route handling all API requests
- Accepts GET requests with query parameters
- Returns 301 redirect to Flag Counter service
- Implements caching strategy (1-hour cache via s-maxage)
- Error handling with HTML redirect to /api-help for browsers, JSON for API clients
- TypeScript with full type safety

**2. Parameter Processing** (`/src/lib/params.ts`)
- Validates and sanitizes user input
- Maps user-friendly parameters to Flag Counter format
- Applies theme configurations from constants
- Enforces limits: columns (1-8), maxflags (1-250)
- Handles boolean conversions and default values
- Supports four display modes: topCountries, flagMap, flagsFrom, miniCounter

**3. URL Generation** (`/src/lib/flagCounter.ts`)
- Generates unique counter IDs based on provided parameters
- **Multiple identification methods** with priority:
  1. Official Counter ID (`counterId`) - use directly
  2. Username + Repo - for per-repository counters (6-char hash)
  3. Full repo path (username/repo) - auto-parse (6-char hash)
  4. Username + Project - for custom projects (6-char hash)
  5. Username only - legacy support (4-char hash for backward compatibility)
- Constructs Flag Counter URLs based on display mode
- Four URL generation functions:
  - `generateTopCountriesUrl()`: Default mode showing top visiting countries
  - `generateFlagMapUrl()`: World map visualization
  - `generateFlagsFromUrl()`: Filter by specific country (US/CA)
  - `generateMiniCounterUrl()`: Compact counter display
- Important: Same identifier combination + same parameters = same counter
- Different identifiers or parameters create different/independent counters

**4. Configuration** (`/src/lib/constants.ts`)
- Defines all themes with color schemes (default, dark, github, github_dark, transparent)
- Sets default values for all parameters
- Maps user-friendly values to Flag Counter API values
- Display mode constants and type definitions
- Quick preset configurations for common use cases
- TypeScript type definitions for CounterConfig
- Flag Counter base URL: `https://s01.flagcounter.com`

**5. Frontend Pages**
- **Landing Page** (`/src/app/page.tsx`): Marketing homepage with hero, features, demo sections
- **Dashboard** (`/src/app/dashboard/page.tsx`): Interactive configuration tool with live preview
- **API Help** (`/src/app/api-help/page.tsx`): Comprehensive API documentation

**6. React Components** (`/src/components/`)
- **UI Components** (`ui/`): shadcn/ui components (Button, Card, Select, Slider, etc.)
- **Landing Components** (`landing/`): Hero, Features, LiveDemo, HowItWorks, CTA sections
- **Dashboard Components** (`dashboard/`):
  - `ConfigForm`: Form for all counter parameters
  - `PreviewPanel`: Real-time preview with generated markdown
  - `ActionToolbar`: Quick actions (reset, clear colors, presets)
  - `ConfigProgress`: Visual progress indicator
  - `ConfigImportExport`: JSON import/export functionality
  - `KeyboardShortcutsHelp`: Keyboard shortcuts documentation
- **Shared Components** (`shared/`): Header, Footer

### Request Flow

1. User embeds image in GitHub README: `![](https://...vercel.app/api?username=XXX&displayMode=topCountries)`
2. GitHub requests the image from Vercel API endpoint
3. Next.js API Route (`/src/app/api/route.ts`) receives the request
4. API parses parameters and validates input using `parseParams()`
5. Generates unique Flag Counter URL based on username, display mode, and parameters using `generateFlagCounterUrl()`
6. Returns 301 redirect to Flag Counter service
7. Response cached for 1 hour (s-maxage=3600) via Vercel CDN
8. Flag Counter returns the actual visitor tracking image

### Key Design Decisions

**User ID Generation**: Uses MD5 hash of lowercase username (first 4 chars) to ensure:
- Same username always gets same base counter
- Deterministic and reproducible
- No database needed

**Parameter Uniqueness**: Each unique combination of parameters creates a separate counter on Flag Counter's end. This is intentional to allow users to have different styled counters.

**Caching Strategy**:
- Successful responses: 1 hour cache (`s-maxage=3600`)
- Error responses: 5 minutes cache (`s-maxage=300`)

**Error Handling**:
- Browser requests (Accept: text/html) → Redirect to `/api-help` page
- API requests → JSON error response with documentation links

## Display Modes

The application supports four distinct display modes, each generating different Flag Counter URL formats:

1. **Top Countries** (`topCountries`) - Default mode
   - Shows flags of top visiting countries
   - URL format: `/count2/{userId}/bg_XXX/txt_XXX/border_XXX/columns_X/maxflags_X/...`
   - Supports: columns, maxflags, label, showcount, showlabels, visitortype, size, colors

2. **Flag Map** (`flagMap`)
   - World map visualization of visitor locations
   - URL format: `/map/{userId}/size_X/txt_XXX/border_XXX/pageviews_X/...`
   - Supports: mapSize (tiny/small/medium/large), label, showcount, text/border colors

3. **Flags From** (`flagsFrom`)
   - Filter visitors from specific country (US or CA)
   - URL format: `/count2_US/{userId}/bg_XXX/txt_XXX/border_XXX/columns_X/...`
   - Supports: flagsFromCountry, columns, maxflags, label, showcount, showlabels, visitortype, size, colors

4. **Mini Counter** (`miniCounter`)
   - Compact counter display
   - URL format: `/mini/{userId}/bg_XXX/txt_XXX/border_XXX/flags_X/`
   - Supports: miniDisplay (flags count or pageviews), colors

## Available Themes

- `default`: White background (#FFFFFF), black text (#000000), gray border (#CCCCCC)
- `dark`: GitHub dark mode (#0D1117 bg, #C9D1D9 text, #30363D border)
- `github`: GitHub light theme (#24292E bg, #FFFFFF text, #444D56 border)
- `github_dark`: GitHub dark theme variant (#161B22 bg, #E6EDF3 text, #30363D border)
- `transparent`: Seamless integration (#FFFFFF bg/border, #000000 text)

## API Parameters Reference

**Identifier Parameters** (at least one required):
- `username`: GitHub username (string) - for profile or combined with repo/project
- `counterId`: Official Flag Counter ID (string) - from flagcounter.com
- `repo`: Repository name or full path (string) - for per-repository counters
- `project`: Custom project identifier (string) - for custom projects

**Usage Scenarios**:
- Profile counter: `username` only
- Repository counter: `username` + `repo` or `repo` (full path)
- Official ID: `counterId` only
- Custom project: `username` + `project`

**Optional - Common**:
- `displayMode`: Counter display type - 'topCountries', 'flagMap', 'flagsFrom', 'miniCounter' (default: 'topCountries')
- `theme`: Pre-defined theme - 'default', 'dark', 'github', 'github_dark', 'transparent' (default: 'default')
- `label`: Label text or 'none' to hide (default: 'Visitors')
- `showcount`: Show visitor count true/false (default: true)
- `bg`, `text`, `border`: Custom hex colors (6 digits, no #)

**Optional - Top Countries & Flags From modes**:
- `columns`: Layout columns 1-8 (default: 2)
- `maxflags`: Max flags to show 1-250 (default: 10)
- `showlabels`: Show country names true/false (default: false)
- `visitortype`: Display as 'number' or 'percentage' (default: 'number')
- `size`: Flag size 'small', 'medium', 'large' (default: 'medium')

**Optional - Flags From mode specific**:
- `flagsFromCountry`: Filter by country 'us' or 'ca' (default: 'us')

**Optional - Flag Map mode specific**:
- `mapSize`: Map size 'tiny', 'small', 'medium', 'large' (default: 'small')

**Optional - Mini Counter mode specific**:
- `miniDisplay`: Display type 'flags' (flag count) or 'pageviews' (page views) (default: 'flags')

## Vercel Configuration

**Next.js Configuration** (`next.config.mjs`):
- React Strict Mode enabled
- Remote image patterns configured for flagcdn.com and s01.flagcounter.com
- Automatic optimization for production builds

**CORS Configuration** (`vercel.json`):
- Access-Control-Allow-Origin: * for `/api` routes
- Enables cross-origin API requests

## Project Structure

```
/src/
  app/                           # Next.js App Router
    api/
      route.ts                   # Main API endpoint (Next.js API Route)
    dashboard/
      page.tsx                   # Interactive configuration dashboard
    api-help/
      page.tsx                   # API documentation page
    page.tsx                     # Landing page
    layout.tsx                   # Root layout with metadata
    globals.css                  # Global styles with Tailwind

  components/                    # React components
    ui/                          # shadcn/ui components
      button.tsx, card.tsx, input.tsx, select.tsx, slider.tsx, etc.
      animated-gradient-with-svg.tsx  # Custom SVG gradient animation
    landing/                     # Landing page sections
      hero-section.tsx           # Hero with CTA
      features-section.tsx       # Feature highlights
      live-demo-section.tsx      # Live demo showcase
      how-it-works-section.tsx   # Process explanation
      cta-section.tsx            # Call to action
      infinite-flags-scroll.tsx  # Animated flag carousel
    dashboard/                   # Dashboard components
      config-form.tsx            # Configuration form
      preview-panel.tsx          # Live preview
      action-toolbar.tsx         # Quick actions & presets
      config-progress.tsx        # Progress indicator
      config-import-export.tsx   # JSON import/export
      keyboard-shortcuts-help.tsx # Shortcuts documentation
      page-header.tsx            # Dashboard header
    shared/                      # Shared components
      header.tsx                 # Site header with navigation
      footer.tsx                 # Site footer
    hooks/
      use-debounced-dimensions.tsx  # Custom React hook

  lib/                           # Utility libraries (TypeScript)
    constants.ts                 # Themes, defaults, display modes, types
    params.ts                    # Parameter parsing & validation
    flagCounter.ts               # URL generation for all 4 display modes
    utils.ts                     # Helper utilities

  hooks/                         # Custom React hooks
    useKeyboardShortcuts.ts      # Keyboard shortcut management

/public/                         # Static assets
  *.svg                          # Logos and icon files
  llms.txt                       # AI integration guide
  robots.txt                     # SEO configuration
  sitemap.xml                    # Sitemap

/package.json                    # Next.js 15, React 19, TypeScript dependencies
/next.config.mjs                 # Next.js configuration
/tailwind.config.ts              # Tailwind CSS configuration
/tsconfig.json                   # TypeScript configuration
/vercel.json                     # Vercel CORS configuration
```

## Testing Locally

1. **Start development server**: `npm run dev` → http://localhost:3000
2. **Test landing page**: Navigate to http://localhost:3000
3. **Test dashboard**: Navigate to http://localhost:3000/dashboard
4. **Test API endpoint**: http://localhost:3000/api?username=test&displayMode=topCountries
5. **Test different display modes**:
   - Top Countries: `?username=test&displayMode=topCountries&columns=3&maxflags=15`
   - Flag Map: `?username=test&displayMode=flagMap&mapSize=medium`
   - Flags From: `?username=test&displayMode=flagsFrom&flagsFromCountry=us`
   - Mini Counter: `?username=test&displayMode=miniCounter&miniDisplay=flags`
6. **Test themes**: Try different theme combinations with display modes
7. **Test error handling**: Omit required parameters to see error responses

## Common Development Tasks

**Adding a new theme**:
1. Add theme object to `THEMES` in `/src/lib/constants.ts`
2. Update theme selector in `/src/components/dashboard/config-form.tsx`
3. Document the theme in README.md

**Adding a new display mode**:
1. Add mode to `DISPLAY_MODES` in `/src/lib/constants.ts`
2. Create URL generation function in `/src/lib/flagCounter.ts`
3. Update `generateFlagCounterUrl()` switch statement
4. Add mode option to dashboard `ConfigForm` component
5. Document the mode in README.md and API help page

**Modifying parameter validation**:
1. Update type definitions in `/src/lib/constants.ts`
2. Update `parseParams()` in `/src/lib/params.ts`
3. Update URL generation functions in `/src/lib/flagCounter.ts`
4. Update dashboard form in `/src/components/dashboard/config-form.tsx`

**Adding new UI components**:
1. Use shadcn/ui CLI: `npx shadcn@latest add <component-name>`
2. Components are added to `/src/components/ui/`
3. Import and use in your React components

**Changing cache duration**:
- Modify `CACHE_SECONDS` in `/src/lib/constants.ts`
- Update cache header in `/src/app/api/route.ts`

**Adding keyboard shortcuts**:
1. Update shortcuts array in `/src/app/dashboard/page.tsx`
2. Add description to `KeyboardShortcutsHelp` component
3. Test functionality with `useKeyboardShortcuts` hook

## Important Notes

- **No Database**: System is stateless, all data stored by Flag Counter service
- **TypeScript**: Full type safety throughout the application
- **Next.js 15**: Uses App Router for routing and API routes
- **React 19**: Latest React features with server/client components
- **Four Display Modes**: topCountries, flagMap, flagsFrom, miniCounter
- **Unique Counters**: Each parameter combination creates a separate counter on Flag Counter's end
- **Privacy**: No personal data stored, only country-level analytics
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Animations**: Framer Motion for smooth transitions
- **Keyboard Shortcuts**: Dashboard supports keyboard shortcuts for productivity
- **Import/Export**: Configuration can be saved/loaded as JSON
- **Quick Presets**: Pre-configured settings for common use cases
- **Real-time Preview**: Dashboard shows live preview of counter configuration
