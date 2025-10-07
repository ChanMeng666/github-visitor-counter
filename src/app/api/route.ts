import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore - JS modules in TypeScript project
import { parseParams } from '@/utils/params.js';
// @ts-ignore - JS modules in TypeScript project
import { generateFlagCounterUrl } from '@/utils/flagCounter.js';
// @ts-ignore - JS modules in TypeScript project
import { DEFAULTS } from '@/constants.js';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query: Record<string, string> = {};

    // Convert URLSearchParams to object
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    const params = parseParams(query);
    const flagCounterUrl = generateFlagCounterUrl(params);

    // Return redirect response with proper headers
    const response = NextResponse.redirect(flagCounterUrl, 301);
    response.headers.set('Cache-Control', `s-maxage=${DEFAULTS.CACHE_SECONDS}, stale-while-revalidate`);
    response.headers.set('X-GitHub-Username', params.username);

    return response;
  } catch (error: unknown) {
    console.error('Error processing request:', error);

    // Check if request accepts HTML (browser request)
    const acceptsHtml = request.headers.get('accept')?.includes('text/html');

    if (acceptsHtml) {
      // Redirect to API help page for browser requests
      return NextResponse.redirect(new URL('/api-help', request.url), 302);
    } else {
      // Return JSON for API requests
      const errorMessage = error instanceof Error ? error.message : 'Invalid request parameters';
      return NextResponse.json(
        {
          error: errorMessage,
          documentation: 'https://github-visitor-counter-zeta.vercel.app/api-help',
          usage: 'https://github.com/ChanMeng666/github-visitor-counter#usage'
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 's-maxage=300'
          }
        }
      );
    }
  }
}
