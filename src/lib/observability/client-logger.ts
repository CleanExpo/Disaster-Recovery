/**
 * Client + library logger.
 *
 * Uses structured console output suitable for Vercel runtime logs and
 * the browser console. For errors, ALSO calls captureException() which
 * records against the active @vercel/otel trace span.
 *
 * Do NOT use in API routes — prefer requestLogger() there for request
 * correlation.
 */

import { captureException } from './vercel';

export interface ClientLoggerContext {
  source: string;          // module/component name for grep-ability
  [key: string]: unknown;  // arbitrary extra fields
}

function log(level: 'info' | 'warn' | 'error' | 'debug', msg: string, ctx: ClientLoggerContext): void {
  const payload = { level, msg, ...ctx };
  const line = JSON.stringify(payload);
  if (level === 'error' || level === 'warn') {
    // eslint-disable-next-line no-console
    console.error(line);
  } else {
    // eslint-disable-next-line no-console
    console.log(line);
  }
}

export const clientLogger = {
  info: (msg: string, ctx: ClientLoggerContext) => log('info', msg, ctx),
  warn: (msg: string, ctx: ClientLoggerContext) => log('warn', msg, ctx),
  error: (msg: string, ctx: ClientLoggerContext, err?: unknown) => {
    log('error', msg, { ...ctx, error: err instanceof Error ? err.message : String(err) });
    // Also surface to Vercel OTel if we're server-side or in an OTel-instrumented runtime
    if (err !== undefined) {
      captureException(err, { tags: { source: ctx.source }, extra: ctx });
    }
  },
  debug: (msg: string, ctx: ClientLoggerContext) => log('debug', msg, ctx),
};
