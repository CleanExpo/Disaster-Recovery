/**
 * NOT LEGAL ADVICE.
 *
 * Equipped Commercial Finance webhook signature verification (DR-691).
 *
 * Mirrors the Stripe-style scheme already in use for ElevenLabs
 * (see src/lib/voice/webhook-verify.ts):
 *
 *   header format:  t=<unix-seconds>,v0=<hex-hmac-sha256(t.rawBody)>
 *
 * The secret lives in EQUIPPED_WEBHOOK_SECRET. Feature-flagged at the
 * route layer via NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED — this helper
 * itself is flag-agnostic and safe to call from tests.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

export interface VerifyOptions {
  /** Shared secret from Equipped's partner portal. */
  secret: string;
  /** Raw request body exactly as received. */
  rawBody: string;
  /** Value of the `Equipped-Signature` header. */
  signatureHeader: string;
  /** Max age allowed for the signed timestamp, in seconds. Default 300. */
  maxAgeSecs?: number;
  /** Clock injection for tests. Defaults to `Date.now()` in seconds. */
  nowSecs?: () => number;
}

export function verifyEquippedSignature(opts: VerifyOptions): { ok: boolean; reason?: string } {
  if (!opts.secret) return { ok: false, reason: "missing-secret" };
  if (!opts.signatureHeader) return { ok: false, reason: "missing-header" };

  const parts = Object.fromEntries(
    opts.signatureHeader.split(",").map((kv) => {
      const i = kv.indexOf("=");
      return i >= 0 ? [kv.slice(0, i).trim(), kv.slice(i + 1).trim()] : [kv, ""];
    }),
  );
  const t = parts.t;
  const v0 = parts.v0;
  if (!t || !v0) return { ok: false, reason: "malformed-header" };

  const timestamp = Number.parseInt(t, 10);
  if (!Number.isFinite(timestamp)) return { ok: false, reason: "bad-timestamp" };

  const maxAge = opts.maxAgeSecs ?? 300;
  const now = (opts.nowSecs ?? (() => Math.floor(Date.now() / 1000)))();
  if (Math.abs(now - timestamp) > maxAge) {
    return { ok: false, reason: "timestamp-out-of-range" };
  }

  const expected = createHmac("sha256", opts.secret)
    .update(`${t}.${opts.rawBody}`)
    .digest("hex");

  let eq = false;
  try {
    eq =
      expected.length === v0.length &&
      timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(v0, "hex"));
  } catch {
    eq = false;
  }
  if (!eq) return { ok: false, reason: "signature-mismatch" };
  return { ok: true };
}

/** Helper for tests: build a valid signature header for a body + secret. */
export function signForTest(rawBody: string, secret: string, t: number): string {
  const v0 = createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  return `t=${t},v0=${v0}`;
}
