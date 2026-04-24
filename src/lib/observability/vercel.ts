/**
 * Vercel-native observability wrapper.
 *
 * Uses @vercel/otel + @opentelemetry/api so errors captured here surface in:
 *   - Vercel Monitoring (Observability tab)
 *   - Vercel Log Drains (if configured)
 *   - Runtime logs
 *
 * Keeps the same API as the prior Sentry scaffold so existing callers
 * (captureException, captureMessage, setUser, setTag) don't need to change.
 *
 * NB: Vercel's OTel integration is automatic on Vercel runtimes — this
 * wrapper uses the OTel API to attach events to the active trace span.
 * On local dev where no OTel exporter is configured, calls degrade to
 * structured console output (visible in terminal and Vercel build logs).
 */

import { trace } from '@opentelemetry/api';

export interface ObservabilityContext {
  user?: { id?: string; email?: string };
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

/**
 * Record an exception against the active trace span.
 * On Vercel runtimes: surfaces in the Observability tab and log drains.
 * On local dev: structured JSON log line.
 */
export function captureException(error: unknown, ctx?: ObservabilityContext): void {
  const span = trace.getActiveSpan();
  const err = error instanceof Error ? error : new Error(String(error));

  if (span) {
    span.recordException(err);
    if (ctx?.tags) {
      for (const [k, v] of Object.entries(ctx.tags)) span.setAttribute(`dr.${k}`, v);
    }
    if (ctx?.user?.id) span.setAttribute('enduser.id', ctx.user.id);
    if (ctx?.extra) {
      for (const [k, v] of Object.entries(ctx.extra)) {
        span.setAttribute(`dr.extra.${k}`, typeof v === 'string' ? v : JSON.stringify(v));
      }
    }
    span.setStatus({ code: 2, message: err.message }); // 2 = ERROR
    return;
  }

  // Fallback: structured console so it surfaces in Vercel runtime logs even
  // without an active span (e.g. during module init).
  // eslint-disable-next-line no-console
  console.error(
    JSON.stringify({
      level: 'error',
      source: 'observability',
      error: { name: err.name, message: err.message, stack: err.stack },
      ctx,
    }),
  );
}

/**
 * Record an informational event on the active trace span.
 */
export function captureMessage(message: string, ctx?: ObservabilityContext): void {
  const span = trace.getActiveSpan();
  if (span) {
    span.addEvent(message, {
      ...(ctx?.tags ?? {}),
      ...(ctx?.extra
        ? Object.fromEntries(
            Object.entries(ctx.extra).map(([k, v]) => [
              `dr.${k}`,
              typeof v === 'string' ? v : JSON.stringify(v),
            ]),
          )
        : {}),
    });
    return;
  }
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ level: 'info', source: 'observability', message, ctx }));
}

/**
 * Attach user context to the active trace span.
 */
export function setUser(user: { id: string; email?: string } | null): void {
  const span = trace.getActiveSpan();
  if (!span) return;
  if (user === null) return; // No-op; OTel spans don't have a "clear" primitive
  span.setAttribute('enduser.id', user.id);
  if (user.email) span.setAttribute('enduser.email', user.email);
}

/**
 * Set a semantic tag on the active trace span. Prefixed `dr.*` to
 * distinguish app tags from OTel semantic conventions.
 */
export function setTag(key: string, value: string): void {
  const span = trace.getActiveSpan();
  if (!span) return;
  span.setAttribute(`dr.${key}`, value);
}
