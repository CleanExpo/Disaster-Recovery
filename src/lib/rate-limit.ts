/**
 * Sliding-window in-memory rate limiter.
 *
 * Uses a module-level Map so each serverless function instance enforces limits
 * independently. This is intentional and sufficient for abuse prevention on
 * public form endpoints — a distributed store (Upstash/Redis) can be swapped
 * in later if cross-instance coordination becomes necessary.
 *
 * Window: 60 seconds. Limit: 5 requests per IP per key.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

interface WindowEntry {
  timestamps: number[];
}

// Module-level store — persists across requests within the same function instance.
const store = new Map<string, WindowEntry>();

/**
 * Purge stale entries older than the sliding window.
 * Called on every check to keep memory bounded.
 */
function prune(entry: WindowEntry, now: number): void {
  const cutoff = now - WINDOW_MS;
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

/**
 * Check whether the given IP is within the rate limit for the specified key.
 *
 * @param ip   - Caller IP address (used as part of the bucket key).
 * @param key  - Endpoint identifier (e.g. "contact-submit") to namespace buckets.
 * @returns    `allowed: true` when under limit, or `allowed: false` with `retryAfter`
 *             in seconds when the limit is exceeded.
 */
export async function rateLimit(
  ip: string,
  key: string,
): Promise<RateLimitResult> {
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();

  let entry = store.get(bucketKey);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(bucketKey, entry);
  }

  prune(entry, now);

  if (entry.timestamps.length >= MAX_REQUESTS) {
    const oldest = entry.timestamps[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1_000);
    return { allowed: false, retryAfter: retryAfter > 0 ? retryAfter : 60 };
  }

  entry.timestamps.push(now);
  return { allowed: true };
}
