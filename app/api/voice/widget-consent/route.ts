/**
 * POST /api/voice/widget-consent
 *
 * APP 8 cross-border-disclosure consent receipt for the in-browser
 * ElevenLabs convai widget. Posted by `<VoiceConsentModal>` immediately
 * after the user clicks "Yes, OK to continue", BEFORE the widget script
 * loads.
 *
 * The 7-year compliance ledger needs to know:
 *   - which agent the user agreed to talk to (olivia / sarah)
 *   - which version of the consent text they saw (CONSENT_UTTERANCE_VERSION)
 *   - timestamp + an ip-fingerprint for correlation (no raw IP stored)
 *
 * Rate-limited via the global middleware (see src/middleware.ts —
 * `/api/voice/tools/send-payment-link` rule covers similar voice
 * surfaces; we add this route to the rule registry in a follow-up).
 *
 * Returns 200 even when COMPLIANCE_EVENTS_ENABLED is off — caller is
 * a UX-blocking modal, must not fail the consent flow on logging
 * issues. Failures are captured via Vercel observability.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { CONSENT_UTTERANCE, CONSENT_UTTERANCE_VERSION } from '@/lib/voice/consent-utterance';
import { requestLogger, captureException } from '@/lib/observability';
import { createHash } from 'node:crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BodySchema = z.object({
  agent: z.enum(['olivia', 'sarah']),
  consentVersion: z.string().min(3).max(64),
  surface: z.literal('web_widget'),
});

function ipFingerprint(req: NextRequest): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  // Hash so we never store raw IP — APP 11 + privacy.md §6.
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/voice/widget-consent' });

  try {
    const body = await request.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 });
    }

    const { agent, consentVersion } = parsed.data;
    const ipHash = ipFingerprint(request);

    // Generate a per-session correlation id (caller may not yet have a
    // claim or contractor row — this links the consent receipt to the
    // subsequent draft claim / application via the same id stored in
    // the EL conversation metadata).
    const correlationId = `widget-${agent}-${Date.now()}-${ipHash.slice(0, 6)}`;

    await logComplianceEvent({
      eventType: 'claim_intake_consent_given',
      correlationId,
      correlationType: agent === 'sarah' ? 'claim' : 'contractor_membership',
      entityType: agent === 'sarah' ? 'customer' : 'contractor',
      entityIdentifier: ipHash, // already hashed, but logComplianceEvent will hash again — fine
      consentCopyHash: hashIdentifier(CONSENT_UTTERANCE),
      consentVersion,
      consentMethod: 'web_widget',
      metadata: {
        agent,
        surface: 'web_widget',
        ip_hash: ipHash,
        consent_version_at_server: CONSENT_UTTERANCE_VERSION,
        request_id: log.requestId,
      },
    });

    log.info('widget consent granted', {
      agent,
      correlationId,
      consentVersion,
    });

    return NextResponse.json({ ok: true, correlationId });
  } catch (err) {
    log.error('widget consent log failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    captureException(err, {
      tags: { route: '/api/voice/widget-consent' },
      extra: { requestId: log.requestId },
    });
    // Never fail the consent flow — return 200 so the widget still loads.
    return NextResponse.json({ ok: true, logged: false });
  }
}
