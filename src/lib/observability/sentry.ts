/**
 * Sentry client scaffold.
 *
 * Env-gated via `SENTRY_DSN`. When the DSN is unset (current state —
 * Sentry account creation is blocked on Phill's email recovery), every
 * function in this module is a no-op. When the DSN is set, these calls
 * will delegate to @sentry/nextjs once it's installed (TODO).
 *
 * This is intentionally a stub, NOT a real Sentry integration. It exists
 * so API route code can already call captureException() and be ready to
 * flip on the day the DSN lands.
 */

export interface SentryContext {
  user?: { id?: string; email?: string };
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

const ENABLED = !!process.env.SENTRY_DSN;

export function captureException(error: unknown, ctx?: SentryContext): void {
  if (!ENABLED) return;
  // TODO: import('@sentry/nextjs').then(Sentry => Sentry.captureException(error, ctx))
  // For now: structured log so it's at least visible in Vercel logs.
  // eslint-disable-next-line no-console
  console.error(
    JSON.stringify({
      level: 'error',
      source: 'sentry-stub',
      error:
        error instanceof Error
          ? { name: error.name, message: error.message, stack: error.stack }
          : String(error),
      ctx,
    }),
  );
}

export function captureMessage(message: string, ctx?: SentryContext): void {
  if (!ENABLED) return;
  // TODO: Sentry.captureMessage(message, ctx)
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ level: 'info', source: 'sentry-stub', message, ctx }));
}

export function setUser(_user: { id: string; email?: string } | null): void {
  if (!ENABLED) return;
  // TODO: Sentry.setUser(user)
}

export function setTag(_key: string, _value: string): void {
  if (!ENABLED) return;
  // TODO: Sentry.setTag(key, value)
}
