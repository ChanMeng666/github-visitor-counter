import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get('username');

    if (!username) {
      throw new Error('Username parameter is required');
    }

    // Temporary simple redirect for testing
    const flagCounterUrl = `https://s01.flagcounter.com/count2/test/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_Visitors/labels_0/pageviews_1/flags_1/percent_0/`;

    const response = NextResponse.redirect(flagCounterUrl, 301);
    response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    response.headers.set('X-GitHub-Username', username);

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid request parameters';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}
