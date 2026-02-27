/**
 * Middleware-level Rate Limiting via Upstash Redis
 * ==================================================
 * Replaces the in-memory withRateLimit() in auth-middleware.ts which
 * resets on every Vercel cold start. This persists across invocations.
 *
 * Usage: called from src/middleware.ts for all /api/* routes.
 *
 * Configuration:
 *   UPSTASH_REDIS_REST_URL  — from Upstash console
 *   UPSTASH_REDIS_REST_TOKEN — from Upstash console
 *
 * When env vars are missing, rate limiting is silently skipped
 * (so local dev works without Redis).
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Rate limit tiers
// ---------------------------------------------------------------------------

type TierName = 'auth' | 'forms' | 'upload' | 'search' | 'default';

const TIER_CONFIG: Record<TierName, { requests: number; window: string }> = {
  auth:    { requests: 5,  window: '1 m' },  // brute-force protection
  forms:   { requests: 10, window: '1 m' },  // claim/contact/lead submission
  upload:  { requests: 5,  window: '1 m' },  // file uploads
  search:  { requests: 30, window: '1 m' },  // search queries
  default: { requests: 20, window: '1 m' },  // everything else
};

// Paths that are exempt from rate limiting
const EXEMPT_PREFIXES = [
  '/api/stripe/webhook',
  '/api/cron/',
  '/api/og',        // OG image generation (called by crawlers)
  '/api/rating',    // cached GET, no abuse vector
];

// ---------------------------------------------------------------------------
// Resolve tier from pathname
// ---------------------------------------------------------------------------

function getTier(pathname: string): TierName | null {
  // Check exemptions first
  for (const prefix of EXEMPT_PREFIXES) {
    if (pathname.startsWith(prefix)) return null;
  }

  if (pathname.startsWith('/api/auth/') || pathname === '/api/contractor/login') {
    return 'auth';
  }
  if (
    pathname.startsWith('/api/claims/') ||
    pathname.startsWith('/api/contact/') ||
    pathname.startsWith('/api/leads/') ||
    pathname.startsWith('/api/tickets/')
  ) {
    return 'forms';
  }
  if (pathname === '/api/upload') {
    return 'upload';
  }
  if (pathname === '/api/search') {
    return 'search';
  }
  return 'default';
}

// ---------------------------------------------------------------------------
// Rate limiter instances (lazy-initialised)
// ---------------------------------------------------------------------------

let limiters: Record<TierName, Ratelimit> | null = null;

function getLimiters(): Record<TierName, Ratelimit> | null {
  if (limiters) return limiters;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Silently skip — local dev without Redis
    return null;
  }

  const redis = new Redis({ url, token });

  limiters = {} as Record<TierName, Ratelimit>;
  for (const [name, cfg] of Object.entries(TIER_CONFIG)) {
    limiters[name as TierName] = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(cfg.requests, cfg.window as any),
      prefix: `ratelimit:${name}`,
      analytics: true,
    });
  }

  return limiters;
}

// ---------------------------------------------------------------------------
// Public: apply rate limit in middleware
// ---------------------------------------------------------------------------

/**
 * Returns a 429 NextResponse if rate-limited, or null if allowed.
 * Call from middleware.ts — only for /api/* paths.
 */
export async function applyRateLimit(
  request: NextRequest,
): Promise<NextResponse | null> {
  const pathname = request.nextUrl.pathname;
  const tier = getTier(pathname);

  // Exempt path or tier resolution failed
  if (!tier) return null;

  const allLimiters = getLimiters();
  if (!allLimiters) return null; // No Redis configured

  const limiter = allLimiters[tier];
  if (!limiter) return null;

  // Use IP as identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '127.0.0.1';
  const identifier = `${ip}:${tier}`;

  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.',
            details: { retryAfter },
          },
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(reset / 1000)),
          },
        },
      );
    }

    // Allowed — headers will be added by middleware after handler runs
    return null;
  } catch (error) {
    // Redis failure should not block the request — fail open
    console.error('[rate-limit] Upstash error (failing open):', error);
    return null;
  }
}
