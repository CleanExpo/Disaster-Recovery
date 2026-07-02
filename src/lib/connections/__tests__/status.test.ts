import { describe, it, expect } from 'vitest';
import { buildDisasterRecoveryConnectionStatus } from '../status';

const EMPTY_ENV = {} as NodeJS.ProcessEnv;

const FULL_ENV = {
  VERCEL_ENV: 'production',
  DATABASE_URL: 'postgresql://user:redacted@host/db',
  NEXTAUTH_SECRET: 'nextauth-secret-value',
  NEXTAUTH_URL: 'https://disasterrecovery.example',
  NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon-key-value',
  ANTHROPIC_API_KEY: 'sk-ant-value',
  OPENAI_API_KEY: 'sk-openai-value',
  ELEVENLABS_API_KEY: 'elevenlabs-key-value',
  STRIPE_SECRET_KEY: 'sk_test_value',
  STRIPE_WEBHOOK_SECRET: 'whsec_value',
  RESEND_API_KEY: 're_value',
  TWILIO_ACCOUNT_SID: 'twilio-sid-value',
  TWILIO_AUTH_TOKEN: 'twilio-token-value',
} as NodeJS.ProcessEnv;

describe('buildDisasterRecoveryConnectionStatus', () => {
  it('reports blocked states when env is empty', () => {
    const status = buildDisasterRecoveryConnectionStatus(EMPTY_ENV, '2026-07-02T00:00:00.000Z');
    const byId = Object.fromEntries(status.connections.map((c) => [c.id, c]));

    expect(byId.database.state).toBe('blocked');
    expect(byId.auth.state).toBe('blocked');
    expect(byId.supabase.state).toBe('blocked');
    expect(byId.ai_anthropic.state).toBe('blocked');
    expect(byId.ai_openai.state).toBe('blocked');
    expect(byId.voice_elevenlabs.state).toBe('blocked');
    expect(byId.stripe.state).toBe('blocked');
    expect(byId.email.state).toBe('blocked');
    expect(byId.sms_twilio.state).toBe('blocked');
    expect(byId.unite_group.state).toBe('ready');
    expect(status.summary.total).toBe(status.connections.length);
    expect(status.summary.blocked).toBeGreaterThan(0);
  });

  it('reports connected/ready states with a fully configured env', () => {
    const status = buildDisasterRecoveryConnectionStatus(FULL_ENV, '2026-07-02T00:00:00.000Z');
    const byId = Object.fromEntries(status.connections.map((c) => [c.id, c]));

    expect(byId.database.state).toBe('connected');
    expect(byId.auth.state).toBe('connected');
    expect(byId.supabase.state).toBe('ready');
    expect(byId.ai_anthropic.state).toBe('ready');
    expect(byId.ai_openai.state).toBe('ready');
    expect(byId.voice_elevenlabs.state).toBe('ready');
    expect(byId.stripe.state).toBe('ready');
    expect(byId.email.state).toBe('ready');
    expect(byId.sms_twilio.state).toBe('ready');
    expect(status.project.environment).toBe('production');
    expect(status.summary.blocked).toBe(0);
  });

  it('flags a missing Stripe webhook secret without blocking', () => {
    const env = { ...FULL_ENV, STRIPE_WEBHOOK_SECRET: '' } as NodeJS.ProcessEnv;
    const status = buildDisasterRecoveryConnectionStatus(env, '2026-07-02T00:00:00.000Z');
    const stripe = status.connections.find((c) => c.id === 'stripe');

    expect(stripe?.state).toBe('ready');
    expect(stripe?.nextAction).toBe('Set STRIPE_WEBHOOK_SECRET.');
  });

  it('never leaks secret values into the payload', () => {
    const status = buildDisasterRecoveryConnectionStatus(FULL_ENV, '2026-07-02T00:00:00.000Z');
    const serialized = JSON.stringify(status);

    for (const secret of [
      'sk-ant-value',
      'sk-openai-value',
      'sk_test_value',
      'whsec_value',
      're_value',
      'anon-key-value',
      'nextauth-secret-value',
      'elevenlabs-key-value',
      'twilio-sid-value',
      'twilio-token-value',
      'redacted',
    ]) {
      expect(serialized).not.toContain(secret);
    }
  });
});
