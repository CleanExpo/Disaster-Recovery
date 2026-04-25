/**
 * NOT LEGAL ADVICE.
 * Unit tests for verifyWebhookSignature (Vitest). DR-708.
 */

import { describe, it, expect } from 'vitest';
import { createHmac } from 'node:crypto';
import { verifyWebhookSignature } from '../webhook-verify';

function signedHeader(secret: string, rawBody: string, t: number): string {
  const sig = createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex');
  return `t=${t},v0=${sig}`;
}

const secret = 'test-secret-abc';
const body = JSON.stringify({
  type: 'post_call_transcription',
  event_timestamp: 1,
  data: { conversation_id: 'x' },
});

describe('verifyWebhookSignature', () => {
  it('accepts a valid signature within the freshness window', () => {
    const t = Math.floor(Date.now() / 1000);
    const header = signedHeader(secret, body, t);
    const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: header });
    expect(res.ok).toBe(true);
  });

  it('rejects a tampered body with signature-mismatch', () => {
    const t = Math.floor(Date.now() / 1000);
    const header = signedHeader(secret, body, t);
    const tampered = body.replace('post_call_transcription', 'post_call_transcription_x');
    const res = verifyWebhookSignature({ secret, rawBody: tampered, signatureHeader: header });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('signature-mismatch');
  });

  it('rejects a stale timestamp with timestamp-out-of-range', () => {
    const t = Math.floor(Date.now() / 1000) - 10_000;
    const header = signedHeader(secret, body, t);
    const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: header });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('timestamp-out-of-range');
  });

  it('rejects a missing signature header', () => {
    const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: '' });
    expect(res.ok).toBe(false);
  });

  it('rejects when secret is empty', () => {
    const t = Math.floor(Date.now() / 1000);
    const header = signedHeader(secret, body, t);
    const res = verifyWebhookSignature({ secret: '', rawBody: body, signatureHeader: header });
    expect(res.ok).toBe(false);
  });

  it('rejects a malformed header (no t/v0 parts)', () => {
    const res = verifyWebhookSignature({
      secret,
      rawBody: body,
      signatureHeader: 'garbage-without-parts',
    });
    expect(res.ok).toBe(false);
  });

  it('rejects when the v0 component is tampered', () => {
    const t = Math.floor(Date.now() / 1000);
    const header = `t=${t},v0=deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef`;
    const res = verifyWebhookSignature({ secret, rawBody: body, signatureHeader: header });
    expect(res.ok).toBe(false);
  });
});
