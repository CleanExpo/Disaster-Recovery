// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Tool 1: lookup_coverage(postcode, suburb?)
//   → { covered: boolean, typical_response_hours: number }
//
// PUBLIC output only — NO contractor counts or identities. The response is
// limited to a yes/no and a rough ETA derived from metro/regional postcode
// banding.

import { NextResponse } from 'next/server';
import { preflight, z } from '@/lib/voice/route-helpers';
import { filterToolOutput } from '@/lib/voice/output-filter';
import { logComplianceEvent } from '@/lib/voice/route-helpers';
import { requestLogger, captureException } from '@/lib/observability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const InputSchema = z.object({
  postcode: z.string().min(4).max(5),
  suburb: z.string().optional(),
});

const METRO_BANDS: Array<[number, number]> = [
  [200, 299], // ACT metro
  [1000, 2999], // NSW metro
  [3000, 3999], // VIC metro
  [4000, 4999], // QLD metro
  [5000, 5999], // SA metro
  [6000, 6999], // WA metro
];

function isMetroPostcode(postcode: string): boolean {
  const digits = postcode.trim();
  if (!/^\d{4}$/.test(digits)) return false;
  const n = Number.parseInt(digits, 10);
  return METRO_BANDS.some(([lo, hi]) => n >= lo && n <= hi);
}

export async function POST(request: Request) {
  const log = requestLogger(request, { route: '/api/voice/tools/lookup-coverage' });
  try {
    const pre = await preflight(request, {
      toolName: 'lookup_coverage',
      schema: InputSchema,
      rateLimitMax: 10,
    });
    if (!pre.ok) return pre.response;

    const { postcode } = pre.body;
    const covered = true; // national network; the honest answer is always yes.
    const typical_response_hours = isMetroPostcode(postcode) ? 1 : 4;

    const raw = { covered, typical_response_hours };
    const filtered = filterToolOutput(raw, ['covered', 'typical_response_hours']);

    await logComplianceEvent({
      session_id: pre.sessionId,
      event_type: 'voice_tool_invoked',
      tool_name: 'lookup_coverage',
      outcome: 'ok',
      metadata: { postcode, typical_response_hours },
    });

    return NextResponse.json(filtered);
  } catch (error) {
    log.error('handler failed', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/voice/tools/lookup-coverage' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
