/**
 * Unit tests for src/lib/env.ts
 *
 * Validates the startup env-var gate (REQUIRED throws, RECOMMENDED
 * warns) and the typed `env` accessor surface. Each test snapshots
 * + restores `process.env` so subsequent tests aren't polluted.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const REQUIRED_KEYS = ['RESEND_API_KEY', 'CLAIM_NOTIFICATION_EMAIL'] as const;

describe('validateEnv', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    savedEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = savedEnv;
    vi.resetModules();
  });

  it('returns { valid: true } when every REQUIRED variable is set', async () => {
    for (const key of REQUIRED_KEYS) process.env[key] = 'present';
    const { validateEnv } = await import('../env');
    const result = validateEnv();
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it('throws when a REQUIRED variable is missing', async () => {
    delete process.env.RESEND_API_KEY;
    process.env.CLAIM_NOTIFICATION_EMAIL = 'present';
    const { validateEnv } = await import('../env');
    expect(() => validateEnv()).toThrow(/RESEND_API_KEY/);
  });

  it('the thrown error names every missing REQUIRED variable', async () => {
    for (const key of REQUIRED_KEYS) delete process.env[key];
    const { validateEnv } = await import('../env');
    try {
      validateEnv();
      throw new Error('expected validateEnv to throw');
    } catch (err) {
      const message = (err as Error).message;
      for (const key of REQUIRED_KEYS) {
        expect(message).toContain(key);
      }
    }
  });

  it('does NOT throw when only RECOMMENDED variables are missing', async () => {
    for (const key of REQUIRED_KEYS) process.env[key] = 'present';
    delete process.env.DATABASE_URL;
    delete process.env.STRIPE_SECRET_KEY;
    const { validateEnv } = await import('../env');
    expect(() => validateEnv()).not.toThrow();
  });

  it('reports RECOMMENDED gaps via the warnings array (length > 0)', async () => {
    for (const key of REQUIRED_KEYS) process.env[key] = 'present';
    delete process.env.DATABASE_URL;
    const { validateEnv } = await import('../env');
    const result = validateEnv();
    expect(result.warnings.some((w) => w.includes('DATABASE_URL'))).toBe(true);
  });
});

describe('env accessor surface', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    savedEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = savedEnv;
    vi.resetModules();
  });

  it('resendApiKey() returns the env value when set', async () => {
    process.env.RESEND_API_KEY = 're_test_123';
    const { env } = await import('../env');
    expect(env.resendApiKey()).toBe('re_test_123');
  });

  it('resendApiKey() throws when unset (required accessor)', async () => {
    delete process.env.RESEND_API_KEY;
    const { env } = await import('../env');
    expect(() => env.resendApiKey()).toThrow(/RESEND_API_KEY/);
  });

  it('emailFrom() falls back to noreply@disasterrecovery.au when unset', async () => {
    delete process.env.RESEND_FROM_EMAIL;
    const { env } = await import('../env');
    expect(env.emailFrom()).toBe('noreply@disasterrecovery.au');
  });

  it('emailFrom() honours an override', async () => {
    process.env.RESEND_FROM_EMAIL = 'hello@example.com';
    const { env } = await import('../env');
    expect(env.emailFrom()).toBe('hello@example.com');
  });

  it('nextauthUrl() falls back to https://disasterrecovery.com.au when unset', async () => {
    delete process.env.NEXTAUTH_URL;
    const { env } = await import('../env');
    expect(env.nextauthUrl()).toBe('https://disasterrecovery.com.au');
  });

  it('optional accessors return empty string for unset Stripe + Supabase keys', async () => {
    for (const key of [
      'STRIPE_SECRET_KEY',
      'STRIPE_PUBLISHABLE_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'NEXT_PUBLIC_GA_ID',
    ]) {
      delete process.env[key];
    }
    const { env } = await import('../env');
    expect(env.stripeSecretKey()).toBe('');
    expect(env.stripePublishableKey()).toBe('');
    expect(env.stripeWebhookSecret()).toBe('');
    expect(env.supabaseUrl()).toBe('');
    expect(env.supabaseAnonKey()).toBe('');
    expect(env.supabaseServiceRoleKey()).toBe('');
    expect(env.gaId()).toBe('');
  });
});
