/**
 * Hash generation helpers with caching
 * Extracted from flagCounter.ts with added caching for performance
 */

import crypto from 'crypto';

// Simple cache for MD5 hashes to avoid repeated calculations
const hashCache = new Map<string, string>();
const MAX_CACHE_SIZE = 1000;

/**
 * Compute MD5 hash with caching
 * Uses LRU-like eviction when cache is full
 */
export function computeHashCached(input: string, length: number): string {
  const cacheKey = `${input}:${length}`;

  // Return cached value if available
  const cached = hashCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  // Evict oldest entry if cache is full
  if (hashCache.size >= MAX_CACHE_SIZE) {
    const firstKey = hashCache.keys().next().value;
    if (firstKey) {
      hashCache.delete(firstKey);
    }
  }

  // Compute and cache the hash
  const hash = crypto.createHash('md5').update(input).digest('hex').substring(0, length);
  hashCache.set(cacheKey, hash);

  return hash;
}

/**
 * Clear the hash cache (useful for testing)
 */
export function clearHashCache(): void {
  hashCache.clear();
}

/**
 * Get current cache size (useful for debugging)
 */
export function getHashCacheSize(): number {
  return hashCache.size;
}
