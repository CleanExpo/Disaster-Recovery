/**
 * NOT LEGAL ADVICE
 *
 * DR-715: Admin voice status route.
 *
 * GET — combined snapshot of the feature flag + circuit breaker state.
 *       Observability fields (recent_errors, webhook_last_received) are
 *       placeholders pending downstream telemetry work.
 *
 * Auth: bearer admin secret (same as /admin/voice/kill-switch).
 */

import { NextRequest, NextResponse } from 'next/server';
import { circuitBreakerState } from '@/lib/voice/kill-switch';

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

export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  }

  return NextResponse.json({
    feature_flag: process.env.VOICE_AGENT_ENABLED === 'true',
    circuit_breaker: circuitBreakerState(),
    recent_errors: null, // TODO observability (DR follow-up)
    webhook_last_received: null, // TODO observability (DR follow-up)
  });
}
