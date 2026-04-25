// NOT LEGAL ADVICE — flag-gated scaffold.
//
// HMAC verification + in-memory per-session rate limiting for voice tool webhooks.

import crypto from 'crypto';

const MAX_TIMESTAMP_SKEW_SECONDS = 300;

/**
 * Verify an ElevenLabs tool webhook signature.
 *
 * Signature header format (Stripe-style):
 *   t=<unix_seconds>,v0=<hex_hmac_sha256>
 *
 * The signed payload is `${t}.${rawBody}`.
 * Compared in constant time. Reject if timestamp is >300s old (or in the future by >300s).
 */
export function verifyToolWebhookSignature(rawBody: string, signatureHeader: string | null | undefined): boolean {
  const secret = process.env.ELEVENLABS_TOOL_WEBHOOK_SECRET;
  if (!secret) return false;
  if (!signatureHeader || typeof signatureHeader !== 'string') return false;

  const parts = signatureHeader.split(',').map((p) => p.trim());
  let t: string | null = null;
  let v0: string | null = null;
  for (const part of parts) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const k = part.slice(0, eq);
    const v = part.slice(eq + 1);
    if (k === 't') t = v;
    else if (k === 'v0') v0 = v;
  }
  if (!t || !v0) return false;

  const ts = Number.parseInt(t, 10);
  if (!Number.isFinite(ts)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > MAX_TIMESTAMP_SKEW_SECONDS) return false;

  const signedPayload = `${t}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex');

  // Constant-time compare. Must be same length to use timingSafeEqual.
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(v0, 'utf8');
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, per-session. Expires 30 minutes after first call.
// TODO: Move to Redis / KV once we have horizontal-scale traffic.
// ---------------------------------------------------------------------------

type Counter = { count: number; expiresAt: number };
const RATE_WINDOW_MS = 30 * 60 * 1000;
const buckets = new Map<string, Counter>();

/**
 * Returns true when the call is permitted, false when the caller has hit the cap.
 * Counter is per (sessionId, toolName) and expires 30 min after first hit.
 *
 * If sessionId is missing/empty, we fall back to a shared bucket keyed on the
 * tool name — rare in practice because ElevenLabs always sends a session_id.
 */
export function rateLimitCheck(sessionId: string | undefined | null, toolName: string, max: number): boolean {
  const key = `${sessionId || '_anon'}::${toolName}`;
  const now = Date.now();

  // Opportunistic sweep — keep the map from growing unbounded.
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) if (v.expiresAt <= now) buckets.delete(k);
  }

  const existing = buckets.get(key);
  if (!existing || existing.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (existing.count >= max) return false;
  existing.count += 1;
  return true;
}

export function _resetRateLimits() {
  buckets.clear();
}
