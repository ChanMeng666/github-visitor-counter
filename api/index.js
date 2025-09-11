import { parseParams } from '../src/utils/params.js';
import { generateFlagCounterUrl } from '../src/utils/flagCounter.js';
import { DEFAULTS } from '../src/constants.js';

export default function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const params = parseParams(req.query);
    const flagCounterUrl = generateFlagCounterUrl(params);
    
    res.setHeader('Cache-Control', `s-maxage=${DEFAULTS.CACHE_SECONDS}, stale-while-revalidate`);
    res.setHeader('X-GitHub-Username', params.username);
    
    res.redirect(301, flagCounterUrl);
  } catch (error) {
    console.error('Error processing request:', error);
    
    res.setHeader('Cache-Control', 's-maxage=300');
    
    // Check if request accepts HTML (browser request)
    const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
    
    if (acceptsHtml) {
      // Redirect to API help page for browser requests
      res.redirect(302, '/api-help.html');
    } else {
      // Return JSON for API requests
      res.status(400).json({
        error: error.message || 'Invalid request parameters',
        documentation: 'https://github-visitor-counter-zeta.vercel.app/api-help.html',
        usage: 'https://github.com/ChanMeng666/github-visitor-counter#usage'
      });
    }
  }
}