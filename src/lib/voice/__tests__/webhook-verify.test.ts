/**
 * NOT LEGAL ADVICE.
 *
 * Smoke test for verifyWebhookSignature. DR-708.
 *
 * The repo has no vitest/jest configured yet, so this is a plain TS script
 * with throw-on-failure assertions. Run with:
 *
 *   npx tsx src/lib/voice/__tests__/webhook-verify.test.ts
 *
 * Exits 0 on all-pass, non-zero on any failure. When a test runner is
 * added to the repo, this file converts cleanly to `describe/it/expect`.
 */

import { createHmac } from "node:crypto";
import { verifyWebhookSignature } from "../webhook-verify";

function assert(cond: unknown, msg: string): void {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

function signedHeader(secret: string, rawBody: string, t: number): string {
  const sig = createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  return `t=${t},v0=${sig}`;
}

const secret = "test-secret-abc";
const body = JSON.stringify({
  type: "post_call_transcription",
  event_timestamp: 1,
  data: { conversation_id: "x" },
});

// Happy path — valid signature within window.
{
  const t = Math.floor(Date.now() / 1000);
  const header = signedHeader(secret, body, t);
  const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: header });
  assert(res.ok === true, `valid signature should pass; got ${JSON.stringify(res)}`);
}

// Tampered body.
{
  const t = Math.floor(Date.now() / 1000);
  const header = signedHeader(secret, body, t);
  const tampered = body.replace("post_call_transcription", "post_call_transcription_x");
  const res = verifyWebhookSignature({ secret, rawBody: tampered, signatureHeader: header });
  assert(res.ok === false, "tampered body should fail");
  assert(res.reason === "signature-mismatch", `expected signature-mismatch, got ${res.reason}`);
}

// Expired timestamp.
{
  const t = Math.floor(Date.now() / 1000) - 10_000;
  const header = signedHeader(secret, body, t);
  const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: header });
  assert(res.ok === false && res.reason === "timestamp-out-of-range", "expired ts should fail");
}

// Missing header.
{
  const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: "" });
  assert(res.ok === false, "missing header should fail");
}

// Empty secret.
{
  const t = Math.floor(Date.now() / 1000);
  const header = signedHeader(secret, body, t);
  const res = verifyWebhookSignature({ secret: "", rawBody: body, signatureHeader: header });
  assert(res.ok === false, "empty secret should fail");
}

console.log("OK: webhook-verify smoke test passed");
