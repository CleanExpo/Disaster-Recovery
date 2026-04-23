/**
 * NOT LEGAL ADVICE.
 *
 * ElevenLabs webhook signature verification + payload parsing.
 *
 * Ported from DR-Sandbox (voice/webhook.ts) as part of DR-708. Only the
 * HMAC-verify and parse helpers live here — the extract helpers moved to
 * `./extract.ts` so consumers can tree-shake.
 *
 * Header format (Stripe-style):
 *   t=<unix-seconds>,v0=<hex-hmac-sha256(t.rawBody)>
 *
 * Uses Node's `node:crypto` — already used elsewhere in the codebase
 * (see `src/lib/compliance/events.ts`).
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import type { ElevenLabsWebhook } from "./types";

export interface VerifyOptions {
  /** Shared secret from the ElevenLabs dashboard webhook config. */
  secret: string;
  /** Raw request body as received (bytes / string). Must be exact. */
  rawBody: string;
  /** Value of the `ElevenLabs-Signature` header. */
  signatureHeader: string;
  /** Max age allowed for the signed timestamp, in seconds. Default 300. */
  maxAgeSecs?: number;
  /** Clock injection for tests. Defaults to `Date.now()` in seconds. */
  nowSecs?: () => number;
}

/**
 * Verify ElevenLabs HMAC signature. Header format (Stripe-style):
 *
 *   t=<unix-seconds>,v0=<hex-hmac-sha256(t.rawBody)>
 */
export function verifyWebhookSignature(opts: VerifyOptions): { ok: boolean; reason?: string } {
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

/** Parse raw JSON body into a discriminated ElevenLabsWebhook. Throws on malformed. */
export function parseWebhook(rawBody: string): ElevenLabsWebhook {
  const obj = JSON.parse(rawBody);
  if (!obj || typeof obj !== "object" || !("type" in obj)) {
    throw new Error("payload missing 'type' field");
  }
  return obj as ElevenLabsWebhook;
}
