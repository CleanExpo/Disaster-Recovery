/**
 * Next.js instrumentation — runs once on server startup.
 *
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * Two jobs:
 *   1. Register Vercel OpenTelemetry so captureException() / captureMessage()
 *      in src/lib/observability flow into Vercel Monitoring + Log Drains.
 *   2. Validate required environment variables before the first request.
 *      A clear startup error is better than a cryptic 500 deep in a handler.
 */

import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel({ serviceName: 'disaster-recovery' });

  // Only run env validation on the Node.js runtime (not Edge).
  // P0 hotfix 2026-04-28: validateEnv() throws on missing required env.
  // If RESEND_API_KEY or CLAIM_NOTIFICATION_EMAIL is absent in Vercel prod
  // the throw cascades through every server-side request as an opaque
  // HTML 500 (Vercel's runtime fallback when instrumentation fails) —
  // every API route appears dead. Wrap in try/catch so a missing-env
  // condition logs loudly but still lets routes serve. Env-bound
  // features (claim email notifications) simply degrade — they re-check
  // env at call time.
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { validateEnv } = await import('@/lib/env');
      validateEnv();
    } catch (error) {
      console.error(
        '[instrumentation] env validation failed (non-fatal):',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
