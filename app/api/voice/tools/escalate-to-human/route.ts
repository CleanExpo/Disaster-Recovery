// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Tool 5: escalate_to_human(reason) → { escalated: true, queue_position? }
//
// No rate limit — safety-critical. Every call is logged as
// `voice_escalation_requested` for compliance audit.

import { NextResponse } from 'next/server';
import { preflight, z } from '@/lib/voice/route-helpers';
import { filterToolOutput } from '@/lib/voice/output-filter';
import { logComplianceEvent } from '@/lib/voice/route-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ReasonEnum = z.enum([
  'emergency_000',
  'identity_claim',
  'caller_request',
  'agent_confusion',
  'complaint',
  'secret_probe',
  'life_safety',
]);

const InputSchema = z.object({
  reason: ReasonEnum,
});

export async function POST(request: Request) {
  const pre = await preflight(request, {
    toolName: 'escalate_to_human',
    schema: InputSchema,
    // No rate limit on escalation — intentional.
  });
  if (!pre.ok) return pre.response;

  const { reason } = pre.body;

  await logComplianceEvent({
    session_id: pre.sessionId,
    actor: 'voice_agent',
    event_type: 'voice_escalation_requested',
    tool_name: 'escalate_to_human',
    outcome: 'ok',
    metadata: { reason },
  });

  // TODO: Integrate with live queue depth once we have a real human handoff.
  const raw = { escalated: true as const, queue_position: null as number | null };
  const filtered = filterToolOutput(raw, ['escalated', 'queue_position']);

  return NextResponse.json(filtered);
}
