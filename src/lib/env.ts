import { clientLogger } from '@/lib/observability/client-logger';
/**
 * Environment variable validation — server-side only.
 *
 * Validated at startup via instrumentation.ts.
 * Fails fast with a clear message rather than surfacing a cryptic
 * runtime error deep in a request handler.
 *
 * Usage:
 *   import { validateEnv } from '@/src/lib/env'  // in instrumentation.ts
 *   import { env } from '@/src/lib/env'           // anywhere on server
 */

const REQUIRED: Record<string, string> = {
  RESEND_API_KEY: 'Resend API key — required for claim submission email notifications',
  CLAIM_NOTIFICATION_EMAIL: 'Email address to receive claim notifications from the submission form',
};

const RECOMMENDED: Record<string, string> = {
  DATABASE_URL: 'PostgreSQL connection string — required for Prisma ORM (claim storage)',
  NEXTAUTH_SECRET: 'NextAuth JWT signing secret — required for admin portal authentication',
  STRIPE_SECRET_KEY: 'Stripe secret key — required for payment processing',
  STRIPE_PUBLISHABLE_KEY: 'Stripe publishable key — required for client-side Stripe elements',
  NEXT_PUBLIC_GA_ID: 'Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)',
  NEXT_PUBLIC_GTM_ID: 'Google Tag Manager container ID (e.g. GTM-XXXXXXX)',
  NEXT_PUBLIC_CLARITY_ID: 'Microsoft Clarity project ID for session recording',
  NEXT_PUBLIC_SUPABASE_URL: 'Supabase project URL — required for real-time contractor matching',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Supabase anonymous key — required for real-time features',
  SUPABASE_SERVICE_ROLE_KEY: 'Supabase service role key — required for RLS bypass operations',
  AUTOMATION_BYPASS_SECRET: 'Internal automation secret — required for boardroom agent integration',
};

export interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Validates environment variables at startup.
 *
 * Throws if any REQUIRED variable is absent.
 * Logs warnings for missing RECOMMENDED variables (non-fatal).
 *
 * Called from instrumentation.ts — runs once per server start.
 */
export function validateEnv(): EnvValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  for (const [key, description] of Object.entries(REQUIRED)) {
    if (!process.env[key]) {
      missing.push(`  ✗ ${key}\n    ${description}`);
    }
  }

  for (const [key, description] of Object.entries(RECOMMENDED)) {
    if (!process.env[key]) {
      warnings.push(`  ⚠ ${key}\n    ${description}`);
    }
  }

  if (missing.length > 0) {
    const lines = [
      '',
      '┌────────────────────────────────────────────────────────────┐',
      '│  FATAL: Required environment variables are missing         │',
      '│  disasterrecovery.com.au — Disaster Recovery consumer site │',
      '└────────────────────────────────────────────────────────────┘',
      '',
      ...missing,
      '',
      'Set these in Vercel project settings → Environment Variables.',
      'See src/lib/env.ts for the full list.',
      '',
    ];
    throw new Error(lines.join('\n'));
  }

  if (warnings.length > 0 && process.env.NODE_ENV !== 'test') {
    clientLogger.warn([
        '',
        '┌──────────────────────────────────────────────────────────────┐',
        '│  WARNING: Recommended environment variables are missing      │',
        '│  disasterrecovery.com.au — some features will be unavailable │',
        '└──────────────────────────────────────────────────────────────┘',
        '',
        ...warnings,
        '',
        'Add these in Vercel project settings → Environment Variables.',
        '',
      ].join('\n'), { source: 'lib/env' });
  }

  return { valid: true, missing: [], warnings: warnings.map((w) => w.trim()) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Typed, validated env accessors (server-side only unless NEXT_PUBLIC_)
// ─────────────────────────────────────────────────────────────────────────────

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

function optional(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

export const env = {
  // Email / claim notifications
  resendApiKey: () => required('RESEND_API_KEY'),
  claimNotificationEmail: () => required('CLAIM_NOTIFICATION_EMAIL'),
  emailFrom: () => optional('RESEND_FROM_EMAIL', 'noreply@disasterrecovery.com.au'),

  // Database
  databaseUrl: () => optional('DATABASE_URL'),

  // Auth (admin portal)
  nextauthSecret: () => optional('NEXTAUTH_SECRET'),
  nextauthUrl: () => optional('NEXTAUTH_URL', 'https://disasterrecovery.com.au'),

  // Payments
  stripeSecretKey: () => optional('STRIPE_SECRET_KEY'),
  stripePublishableKey: () => optional('STRIPE_PUBLISHABLE_KEY'),
  stripeWebhookSecret: () => optional('STRIPE_WEBHOOK_SECRET'),

  // Supabase (contractor matching phase 4)
  supabaseUrl: () => optional('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: () => optional('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: () => optional('SUPABASE_SERVICE_ROLE_KEY'),

  // Internal automation
  automationBypassSecret: () => optional('AUTOMATION_BYPASS_SECRET'),

  // Analytics (client-side — accessed via process.env directly in components)
  gaId: () => optional('NEXT_PUBLIC_GA_ID'),
  gtmId: () => optional('NEXT_PUBLIC_GTM_ID'),
  clarityId: () => optional('NEXT_PUBLIC_CLARITY_ID'),
} as const;
