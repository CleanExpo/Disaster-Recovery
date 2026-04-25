/**
 * Request-bound structured logger.
 *
 * Wraps src/lib/logger.ts and binds it to a per-request context:
 *   - requestId (UUID per request; surfaces in every log line for trace)
 *   - userId (if resolved from session)
 *   - route path
 *
 * Usage:
 *   export async function POST(request: Request) {
 *     const log = requestLogger(request, { route: '/api/claims/submit' });
 *     log.info('claim intake received', { email: input.email });
 *     try {
 *       // ...
 *     } catch (err) {
 *       log.error('claim intake failed', { error: err });
 *       throw err;
 *     }
 *   }
 *
 * Falls back to a structured console JSON line if the shared logger is absent
 * or the level method is not callable with (msg, payload) — see src/lib/logger.ts,
 * whose public API is category-first. The fallback keeps call sites uniform.
 */

import { randomUUID } from 'node:crypto';

export interface RequestLoggerContext {
  route: string;
  userId?: string;
}

export interface BoundLogger {
  requestId: string;
  info: (msg: string, extra?: Record<string, unknown>) => void;
  warn: (msg: string, extra?: Record<string, unknown>) => void;
  error: (msg: string, extra?: Record<string, unknown>) => void;
  debug: (msg: string, extra?: Record<string, unknown>) => void;
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export function requestLogger(request: Request, ctx: RequestLoggerContext): BoundLogger {
  const requestId =
    request.headers.get('x-request-id') ??
    request.headers.get('x-vercel-id') ??
    randomUUID();

  const base: Record<string, unknown> = {
    request_id: requestId,
    route: ctx.route,
    user_id: ctx.userId,
    ua: request.headers.get('user-agent') ?? undefined,
    ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined,
  };

  const log = (level: LogLevel, msg: string, extra?: Record<string, unknown>) => {
    const payload = { ...base, ...(extra ?? {}) };

    // Best-effort delegation to the shared logger singleton. Its public API
    // is category-first (`info('api', msg, context, meta)`), so we pass the
    // route as the category and our payload as the metadata object.
    try {
      const loggerModule = require('@/lib/logger') as {
        default?: {
          info?: (...args: unknown[]) => void;
          warn?: (...args: unknown[]) => void;
          error?: (...args: unknown[]) => void;
          debug?: (...args: unknown[]) => void;
        };
      };
      const shared = loggerModule.default;
      if (shared && typeof shared[level] === 'function') {
        shared[level]!('api', msg, { requestId, route: ctx.route, userId: ctx.userId }, payload);
        return;
      }
    } catch {
      // Shared logger unavailable — fall through to structured console.
    }

    const line = JSON.stringify({ level, msg, ...payload });
    if (level === 'error' || level === 'warn') {
      // eslint-disable-next-line no-console
      console.error(line);
    } else {
      // eslint-disable-next-line no-console
      console.log(line);
    }
  };

  return {
    requestId,
    info: (msg, extra) => log('info', msg, extra),
    warn: (msg, extra) => log('warn', msg, extra),
    error: (msg, extra) => log('error', msg, extra),
    debug: (msg, extra) => log('debug', msg, extra),
  };
}
