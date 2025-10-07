# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Visitor Counter is a serverless application that displays country flags of GitHub profile visitors. It provides a customizable visitor counter widget that developers can embed in their GitHub README files. The service is deployed on Vercel and integrates with the Flag Counter API to generate visitor tracking images.

**Live Demo**: https://github-visitor-counter-tau.vercel.app
**Main API Endpoint**: `/api?username=YOUR_USERNAME`

## Development Commands

### Local Development
```bash
# Start development server (static files only)
npm run dev

# Start Vercel development environment (with serverless functions)
npm run dev:vercel
```

### Deployment
```bash
# Deploy to production
npm run deploy
```

## Architecture

### Core Components

**1. API Layer** (`/api/index.js`)
- Single serverless function handling all API requests
- Accepts GET requests with query parameters
- Returns 301 redirect to Flag Counter service
- Implements caching strategy (1-hour cache via s-maxage)
- Error handling with HTML redirect to help page for browsers, JSON for API clients

**2. Parameter Processing** (`/src/utils/params.js`)
- Validates and sanitizes user input
- Maps user-friendly parameters to Flag Counter format
- Applies theme configurations from constants
- Enforces limits: columns (1-8), maxflags (1-250)
- Handles boolean conversions and default values

**3. URL Generation** (`/src/utils/flagCounter.js`)
- Generates deterministic user IDs from GitHub usernames (MD5 hash, first 4 chars)
- Constructs Flag Counter URLs with all visual parameters
- Important: Same username + same parameters = same counter
- Different parameters create different/independent counters

**4. Configuration** (`/src/constants.js`)
- Defines all themes with color schemes
- Sets default values for all parameters
- Maps user-friendly values to Flag Counter API values
- Flag Counter base URL: `https://s01.flagcounter.com`

**5. Frontend** (`/public/`)
- `index.html`: Interactive configuration tool with live preview
- `script.js`: Real-time parameter updates and markdown generation
- `style.css`: Modern responsive design
- `api-help.html`: Documentation for API usage

### Request Flow

1. User embeds image in GitHub README: `![](https://...vercel.app/api?username=XXX)`
2. GitHub requests the image from Vercel API endpoint
3. API parses parameters and validates input
4. Generates unique Flag Counter URL based on username + parameters
5. Returns 301 redirect to Flag Counter service
6. Response cached for 1 hour (Vercel CDN)
7. Flag Counter returns the actual visitor tracking image

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
- Browser requests (Accept: text/html) → Redirect to `/api-help.html`
- API requests → JSON error response with documentation links

## Available Themes

- `default`: White background, black text, gray border
- `dark`: GitHub dark mode colors (0D1117 bg)
- `github`: GitHub light theme (24292E bg)
- `github_dark`: GitHub dark theme variant (161B22 bg)
- `transparent`: White background with white border (seamless integration)

## API Parameters Reference

**Required**:
- `username`: GitHub username (string)

**Optional**:
- `theme`: Pre-defined theme (default: 'default')
- `columns`: Layout columns 1-8 (default: 2)
- `maxflags`: Max flags to show 1-250 (default: 10)
- `label`: Label text or 'none' to hide (default: 'Visitors')
- `showcount`: Show visitor count true/false (default: true)
- `showlabels`: Show country names true/false (default: false)
- `visitortype`: Display as 'number' or 'percentage' (default: 'number')
- `size`: Flag size 'small', 'medium', 'large' (default: 'medium')
- `flagsfrom`: Filter by country 'all', 'us', 'ca' (default: 'all')
- `bg`, `text`, `border`: Custom hex colors (6 digits, no #)

## Vercel Configuration

**Functions** (`vercel.json`):
- Memory: 128MB per function
- Max duration: 10 seconds
- CORS enabled on `/api` endpoint

**Rewrites**:
- `/` → `/public/index.html` (configuration tool)
- Static assets served from `/public/`
- Support for favicon, robots.txt, sitemap.xml, llms.txt

## Project Structure

```
/api/index.js              # Main serverless function endpoint
/src/
  constants.js             # Themes, defaults, mappings
  utils/
    params.js              # Parameter parsing & validation
    flagCounter.js         # URL generation & user ID hashing
/public/
  index.html               # Interactive configuration tool
  api-help.html           # API documentation page
  js/script.js            # Frontend logic
  css/style.css           # Styling
  *.svg                   # Logos and assets
  llms.txt                # AI integration guide
```

## Testing Locally

1. Test static configuration tool: `npm run dev` → http://localhost:3000
2. Test API with serverless: `npm run dev:vercel` → http://localhost:3000/api?username=test
3. Verify parameter parsing by checking different theme/layout combinations
4. Test error handling by omitting required parameters

## Common Development Tasks

**Adding a new theme**:
1. Add theme object to `THEMES` in `/src/constants.js`
2. Update frontend theme selector in `/public/index.html`
3. Document the theme in README.md

**Modifying parameter validation**:
1. Update `parseParams()` in `/src/utils/params.js`
2. Update Flag Counter URL construction in `/src/utils/flagCounter.js`
3. Update frontend form in `/public/index.html`

**Changing cache duration**:
- Modify `CACHE_SECONDS` in `/src/constants.js`

## Important Notes

- **No Database**: System is stateless, all data stored by Flag Counter service
- **ES6 Modules**: Project uses `"type": "module"` in package.json
- **Unique Counters**: Each parameter combination creates a separate counter
- **Privacy**: No personal data stored, only country-level analytics
- **Dependencies**: Minimal (only crypto for hashing, vercel for deployment)
