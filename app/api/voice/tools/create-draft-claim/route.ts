// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Tool 2: create_draft_claim(name, phone, email, postcode, damage_type, description)
//   → { draft_id, next_step: 'sms_signature' }
//
// TODO: Replace the in-memory draft store with Prisma model `VoiceClaimDraft`
// once the migration lands.

import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { preflight, z } from '@/lib/voice/route-helpers';
import { filterToolOutput } from '@/lib/voice/output-filter';
import { saveDraft } from '@/lib/voice/draft-store';
import { logEvent } from '@/lib/compliance/events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const InputSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(6).max(32),
  email: z.string().email().max(320),
  postcode: z.string().min(4).max(5),
  damage_type: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  const pre = await preflight(request, {
    toolName: 'create_draft_claim',
    schema: InputSchema,
    rateLimitMax: 3,
  });
  if (!pre.ok) return pre.response;

  const draft_id = randomUUID();
  const input = pre.body!;
  saveDraft({
    draft_id,
    name: input.name,
    phone: input.phone,
    email: input.email,
    postcode: input.postcode,
    damage_type: input.damage_type,
    description: input.description,
    created_at: Date.now(),
  });

  const raw = { draft_id, next_step: 'sms_signature' as const };
  const filtered = filterToolOutput(raw, ['draft_id', 'next_step']);

  await logEvent({
    session_id: pre.sessionId,
    event_type: 'voice_tool_invoked',
    tool_name: 'create_draft_claim',
    outcome: 'ok',
    metadata: { draft_id, postcode: pre.body.postcode, damage_type: pre.body.damage_type },
  });

  return NextResponse.json(filtered);
}
