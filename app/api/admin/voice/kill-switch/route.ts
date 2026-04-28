/**
 * NOT LEGAL ADVICE
 *
 * DR-715: Admin kill-switch route.
 *
 * GET  — return current circuit-breaker state (bearer auth).
 * POST — trip or reset the circuit breaker.
 *        body: { action: 'trip' | 'reset', reason?: string }
 *        auth: bearer admin secret; reset additionally requires x-reset-secret.
 *
 * See docs/voice-kill-switch-runbook.md for the runbook.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  circuitBreakerState,
  resetCircuitBreaker,
  tripCircuitBreaker,
} from '@/lib/voice/kill-switch';
import { requestLogger, captureException } from '@/lib/observability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorised(req: NextRequest): boolean {
  const expected = process.env.KILL_SWITCH_ADMIN_SECRET;
  if (!expected) return false;
  const header = req.headers.get('authorization') ?? '';
  const prefix = 'Bearer ';
  if (!header.startsWith(prefix)) return false;
  const provided = header.slice(prefix.length).trim();
  return provided.length > 0 && provided === expected;
}

function hasResetSecret(req: NextRequest): boolean {
  const expected = process.env.KILL_SWITCH_RESET_SECRET;
  if (!expected) return false;
  const provided = req.headers.get('x-reset-secret') ?? '';
  return provided.length > 0 && provided === expected;
}

async function logComplianceEvent(
  eventType: string,
  metadata: Record<string, unknown>,
): Promise<void> {
  try {
    // String-indirected import so a missing compliance module does not break
    // TypeScript compilation or runtime. Expected path: src/lib/compliance/events.
    const modulePath = '@/lib/compliance/events';
    const mod: unknown = await (
      new Function('p', 'return import(p)') as (p: string) => Promise<unknown>
    )(modulePath).catch(() => null);
    const writer = (
      mod as {
        writeComplianceEvent?: (t: string, m: Record<string, unknown>) => Promise<void>;
      } | null
    )?.writeComplianceEvent;
    if (typeof writer === 'function') {
      await writer(eventType, metadata);
    }
  } catch {
    // Never block the admin action on audit-log failure.
  }
}

export async function GET(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/admin/voice/kill-switch' });
  try {
    if (!isAuthorised(req)) {
      return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
    }
    return NextResponse.json(circuitBreakerState());
  } catch (error) {
    log.error('handler failed', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/admin/voice/kill-switch' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/admin/voice/kill-switch' });
  try {
    if (!isAuthorised(req)) {
      return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
    }

    let body: { action?: string; reason?: string } = {};
    try {
      body = (await req.json()) as { action?: string; reason?: string };
    } catch {
      return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }

    const action = body.action;

    if (action === 'trip') {
      const reason = (body.reason ?? '').trim() || 'no_reason_provided';
      tripCircuitBreaker(reason);
      await logComplianceEvent('voice_kill_switch_admin_trip', {
        reason,
        at: new Date().toISOString(),
      });
      return NextResponse.json(circuitBreakerState());
    }

    if (action === 'reset') {
      if (!hasResetSecret(req)) {
        return NextResponse.json({ error: 'reset_secret_required' }, { status: 403 });
      }
      resetCircuitBreaker();
      await logComplianceEvent('voice_kill_switch_admin_reset', {
        at: new Date().toISOString(),
      });
      return NextResponse.json(circuitBreakerState());
    }

    return NextResponse.json({ error: 'invalid_action' }, { status: 400 });
  } catch (error) {
    log.error('handler failed', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/admin/voice/kill-switch' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
