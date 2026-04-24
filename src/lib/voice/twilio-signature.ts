/**
 * NOT LEGAL ADVICE.
 *
 * Twilio request signature verification. DR-707.
 *
 * Twilio signs every webhook with SHA-1 HMAC using your account's Auth Token.
 * The signature is the base64-encoded HMAC of:
 *
 *   full_webhook_URL (including protocol, host, path and query) +
 *   each POSTed param name+value concatenated, sorted alphabetically by name.
 *
 * Ref: https://www.twilio.com/docs/usage/webhooks/webhooks-security
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verify a Twilio `X-Twilio-Signature` header.
 *
 * @param authToken  Your Twilio account Auth Token (server-only env var).
 * @param url        The EXACT URL Twilio POSTed to. Must match scheme, host,
 *                   path and query string Twilio sees. Behind a proxy that
 *                   rewrites the scheme/host, reconstruct from forwarded
 *                   headers before calling this.
 * @param params     The form-encoded POST params as a plain object. For
 *                   application/x-www-form-urlencoded bodies this is the
 *                   parsed body. For non-form bodies, pass `{}`.
 * @param header     Value of the `X-Twilio-Signature` request header.
 * @returns          `true` only on a constant-time match.
 */
export function verifyTwilioSignature(
  authToken: string,
  url: string,
  params: Record<string, string>,
  header: string | null | undefined,
): boolean {
  if (!authToken || !header) return false;

  // Sort keys alphabetically, then concatenate key+value with no separator.
  const sortedKeys = Object.keys(params).sort();
  let data = url;
  for (const key of sortedKeys) {
    data += key + params[key];
  }

  const expected = createHmac('sha1', authToken).update(data).digest('base64');

  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(header);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
