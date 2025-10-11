import { NextRequest, NextResponse } from 'next/server';
import { parseParams } from '@/lib/params';
import { generateFlagCounterUrl } from '@/lib/flagCounter';
import { DEFAULTS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Convert URLSearchParams to Record<string, string>
    const query: Record<string, string> = {};
    request.nextUrl.searchParams.forEach((value, key) => {
      query[key] = value;
    });

    // Parse and validate parameters
    const params = parseParams(query);

    // Generate Flag Counter URL based on all parameters
    const flagCounterUrl = generateFlagCounterUrl(params);

    // Create 301 redirect response
    const response = NextResponse.redirect(flagCounterUrl, 301);

    // Set cache headers for 1 hour
    response.headers.set(
      'Cache-Control',
      `s-maxage=${DEFAULTS.CACHE_SECONDS}, stale-while-revalidate`
    );

    // Add custom header for debugging
    response.headers.set('X-GitHub-Username', params.username);

    return response;
  } catch (error: unknown) {
    console.error('Error processing request:', error);

    const errorMessage = error instanceof Error ? error.message : 'Invalid request parameters';

    // Set shorter cache for errors (5 minutes)
    const headers = {
      'Cache-Control': 's-maxage=300',
    };

    // Check if request accepts HTML (browser request)
    const acceptHeader = request.headers.get('accept');
    const acceptsHtml = acceptHeader && acceptHeader.includes('text/html');

    if (acceptsHtml) {
      // Redirect to API help page for browser requests
      const helpUrl = new URL('/api-help', request.nextUrl.origin);
      const response = NextResponse.redirect(helpUrl, 302);
      response.headers.set('Cache-Control', headers['Cache-Control']);
      return response;
    } else {
      // Return JSON for API requests
      return NextResponse.json(
        {
          error: errorMessage,
          documentation: `${request.nextUrl.origin}/api-help`,
          usage: 'https://github.com/ChanMeng666/github-visitor-counter#usage',
        },
        {
          status: 400,
          headers,
        }
      );
    }
  }
}
