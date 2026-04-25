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
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnv } = await import('@/lib/env');
    validateEnv();
  }
}
