/**
 * NOT LEGAL ADVICE — retention cron is defence-in-depth, not a compliance
 * substitute. Counsel review required.
 *
 * DR-714 voice-channel retention cron (epic DR-706).
 *
 * Schedule via Vercel Cron (see docs/voice-retention-runbook.md).
 * Gated by:
 *   - authorization: Bearer ${CRON_SECRET}
 *   - VOICE_RETENTION_CRON_ENABLED=true
 */

import { NextResponse } from 'next/server';
import { RETENTION_POLICY } from '@/lib/voice/retention';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CronResult {
  audio_deleted: number;
  raw_transcripts_deleted: number;
  draft_scrubbed: number;
}

export async function GET(req: Request): Promise<NextResponse> {
  // Auth gate
  const auth = req.headers.get('authorization') ?? '';
  const expected = `Bearer ${process.env.CRON_SECRET ?? ''}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Feature flag
  if (process.env.VOICE_RETENTION_CRON_ENABLED !== 'true') {
    return NextResponse.json({ skipped: true, reason: 'feature_flag_off' });
  }

  const result: CronResult = {
    audio_deleted: 0,
    raw_transcripts_deleted: 0,
    draft_scrubbed: 0,
  };

  // TODO(DR-714): Twilio recordings cleanup
  //   - List recordings older than RETENTION_POLICY.audio_days via Twilio REST API
  //   - DELETE each recording, increment result.audio_deleted
  //   - No-op when TWILIO_ACCOUNT_SID is absent (current state)
  if (!process.env.TWILIO_ACCOUNT_SID) {
    // no-op
  }

  // TODO(DR-714): voice_raw_transcripts hard-delete
  //   - SELECT id FROM voice_raw_transcripts WHERE created_at < now() - interval '90 days'
  //   - DELETE and increment result.raw_transcripts_deleted
  //   - Table doesn't exist yet — no-op
  void RETENTION_POLICY.raw_transcript_days;

  // TODO(DR-714): claim_drafts PII-scrub
  //   - Requires DR-710 in-memory draft store to expose an iterator + update hook
  //   - For unfilled drafts older than 30d: null out name/phone/email,
  //     retain damage_type + postcode + created_at for analytics
  //   - Increment result.draft_scrubbed
  //   - For now, log intent only
  void RETENTION_POLICY.draft_claim_unfilled_days;

  // TODO(DR-714): write compliance_events row
  //   - event_type: 'retention_cron_run'
  //   - payload: { ...result }
  //   - Supabase/compliance_events table TBD
  const complianceEvent = {
    event_type: 'retention_cron_run',
    ts: new Date().toISOString(),
    counts: result,
  };
  // eslint-disable-next-line no-console
  console.log('[voice-retention-cron]', JSON.stringify(complianceEvent));

  return NextResponse.json(result);
}
