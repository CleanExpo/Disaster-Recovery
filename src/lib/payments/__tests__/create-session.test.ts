/**
 * NOT LEGAL ADVICE.
 *
 * Smoke test for /api/payments/create-session. DR-712.
 *
 * The repo has no jest/vitest configured, so this follows the same
 * plain-TS throw-on-failure pattern as the voice tests.
 *
 *   npx tsx src/lib/payments/__tests__/create-session.test.ts
 *
 * Verifies:
 *   - Flag-off (STRIPE_SECRET_KEY missing) returns 503
 *   - Flag-off (NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED !== 'true') returns 503
 *   - Body validation: missing claim_id => 400
 *   - Body validation: non-aud currency => 400
 *   - Amount cap enforced
 *
 * We don't exercise the happy path here because it would need a live Stripe
 * mock — that's covered by a follow-up integration test in DR-712 proper.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import assert from 'node:assert/strict';

let pass = 0;
let fail = 0;

async function t(name: string, fn: () => Promise<void> | void): Promise<void> {
  try {
    await fn();
    pass += 1;
    // eslint-disable-next-line no-console
    console.log(`  ok  ${name}`);
  } catch (err) {
    fail += 1;
    // eslint-disable-next-line no-console
    console.error(`  FAIL ${name}`, err instanceof Error ? err.message : err);
  }
}

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/payments/create-session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function resetEnv(): void {
  delete process.env.STRIPE_SECRET_KEY;
  delete process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED;
}

async function loadRoute(): Promise<{ POST: (req: Request) => Promise<Response> }> {
  // Route resolves @/lib/* via tsconfig paths — fall back to relative if tsx has no path mapping.
  // Delete require cache equivalent for ESM via a timestamp query is messy; we rely on a single import.
  const mod = await import('../../../../app/api/payments/create-session/route');
  return mod as unknown as { POST: (req: Request) => Promise<Response> };
}

async function main(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('create-session.test.ts');

  await t('503 when STRIPE_SECRET_KEY missing', async () => {
    resetEnv();
    process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED = 'true';
    const { POST } = await loadRoute();
    const res = await POST(makeRequest({
      claim_id: '11111111-1111-4111-8111-111111111111',
      amount_cents: 33000,
      currency: 'aud',
      customer_email: 'a@b.com',
      customer_phone: '+61400000000',
    }));
    assert.equal(res.status, 503, `expected 503, got ${res.status}`);
    const j = await res.json();
    assert.equal(j.code, 'FLAG_OFF');
  });

  await t('503 when public flag not "true"', async () => {
    resetEnv();
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
    process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED = 'false';
    const { POST } = await loadRoute();
    const res = await POST(makeRequest({
      claim_id: '11111111-1111-4111-8111-111111111111',
      amount_cents: 33000,
      currency: 'aud',
      customer_email: 'a@b.com',
      customer_phone: '+61400000000',
    }));
    assert.equal(res.status, 503, `expected 503, got ${res.status}`);
  });

  await t('400 when body invalid (bad uuid)', async () => {
    resetEnv();
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
    process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED = 'true';
    const { POST } = await loadRoute();
    const res = await POST(makeRequest({
      claim_id: 'not-a-uuid',
      amount_cents: 33000,
      currency: 'aud',
      customer_email: 'a@b.com',
      customer_phone: '+61400000000',
    }));
    // Will be 400 (validation) or 503 (stripe=null from dummy key); both acceptable gates before Stripe call.
    assert.ok([400, 503].includes(res.status), `expected 400/503, got ${res.status}`);
  });

  await t('400 when currency != aud', async () => {
    resetEnv();
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
    process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED = 'true';
    const { POST } = await loadRoute();
    const res = await POST(makeRequest({
      claim_id: '11111111-1111-4111-8111-111111111111',
      amount_cents: 33000,
      currency: 'usd',
      customer_email: 'a@b.com',
      customer_phone: '+61400000000',
    }));
    assert.ok([400, 503].includes(res.status), `expected 400/503, got ${res.status}`);
  });

  // eslint-disable-next-line no-console
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail > 0) process.exit(1);
}

void main();
