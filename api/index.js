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
    res.status(400).json({
      error: error.message || 'Invalid request parameters',
      usage: 'https://github.com/yourusername/github-visitor-counter#usage'
    });
  }
}