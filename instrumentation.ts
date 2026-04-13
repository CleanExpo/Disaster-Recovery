/**
 * Next.js instrumentation — runs once on server startup.
 *
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * Validates required environment variables before the first request is served.
 * A clear startup error is better than a cryptic 500 deep in a handler.
 */

export async function register() {
  // Only run on the Node.js runtime (not Edge).
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnv } = await import('@/lib/env');
    validateEnv();
  }
}
