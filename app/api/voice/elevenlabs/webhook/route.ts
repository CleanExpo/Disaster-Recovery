/**
 * NOT LEGAL ADVICE.
 *
 * ElevenLabs post-call webhook receiver.
 *
 * DR-708 — flag-off port from DR-Sandbox. While `VOICE_AGENT_ENABLED !== 'true'`
 * the route verifies HMAC (so we can exercise the wire path in staging) and
 * responds 200 with `{ received: true, agent_disabled: true }` without calling
 * any extractor. Once DR-710..DR-716 land, flip the flag and the route will
 * hydrate ClaimIntake / SupportInteraction records.
 *
 * Never throws — always returns a JSON response. Logs errors via console.error
 * with minimal PII (conversation_id + agent_id only, no transcript text).
 */

import { NextResponse } from 'next/server';
import { verifyWebhookSignature, parseWebhook } from '@/lib/voice/webhook-verify';
import { extractClaimIntake, extractSupportInteraction } from '@/lib/voice/extract';
import { agentById, agentRole } from '@/lib/voice/agents-registry';
import type { ElevenLabsTranscriptionWebhook } from '@/lib/voice/types';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';
import { upsertVoiceCall, appendTranscript } from '@/lib/voice/persistence';
import { redactTranscript } from '@/lib/voice/redaction';

// Force dynamic — we read the raw request body, no caching.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function jsonResponse(status: number, body: Record<string, unknown>): NextResponse {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/voice/elevenlabs/webhook' });
  try {
    // Raw body required for HMAC — don't use request.json() here.
    const rawBody = await request.text();
    const signatureHeader =
      request.headers.get('elevenlabs-signature') ??
      request.headers.get('ElevenLabs-Signature') ??
      '';
    const secret = process.env.ELEVENLABS_WEBHOOK_SECRET ?? '';

    const verified = verifyWebhookSignature({
      secret,
      rawBody,
      signatureHeader,
    });
    if (!verified.ok) {
      log.error('signature verification failed', { reason: verified.reason });
      return jsonResponse(401, { received: false, error: verified.reason ?? 'unauthorised' });
    }

    // Parse to discover event type + agent_id for logging.
    let parsed;
    try {
      parsed = parseWebhook(rawBody);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'parse-error';
      log.error('parse failed', { error: msg });
      return jsonResponse(400, { received: false, error: 'malformed-payload' });
    }

    const agentId =
      'data' in parsed && parsed.data && typeof parsed.data === 'object'
        ? (parsed.data as { agent_id?: string }).agent_id
        : undefined;
    const agent = agentId ? agentById(agentId) : undefined;

    // Flag-off: acknowledge and log; do not hydrate domain records.
    if (process.env.VOICE_AGENT_ENABLED !== 'true') {
      log.info('flag-off ack', {
        type: parsed.type,
        agent_id: agentId ?? 'unknown',
        agent: agent?.name ?? 'unregistered',
      });
      return jsonResponse(200, { received: true, agent_disabled: true });
    }

    // Flag-on path. Extract domain shape AND persist VoiceCall + CallTranscript
    // (audit B13 follow-up). Persistence helpers are flag-gated via
    // VOICE_AGENT_ENABLED — when off they return null silently. When on, the
    // upsert is keyed on conversation_id for idempotent retries.
    if (parsed.type === 'post_call_transcription' && agentId) {
      const role = agentRole(agentId);
      const tx = parsed as ElevenLabsTranscriptionWebhook;
      let correlationClaimId: string | null = null;
      if (role === 'claims-intake') {
        const intake = extractClaimIntake(tx);
        correlationClaimId = intake.conversationId;
        log.info('ClaimIntake', {
          conversation: intake.conversationId,
          service: intake.service,
          urgency: intake.urgency,
          postcode: intake.propertyPostcode,
        });
      } else if (role === 'support-chat') {
        const si = extractSupportInteraction(tx);
        log.info('SupportInteraction', {
          conversation: si.conversationId,
          topic: si.topic,
          escalate: si.escalateToSarah,
        });
      } else {
        log.warn('unknown agent_id; no extractor ran', { agent_id: agentId });
      }

      // Persist VoiceCall + CallTranscript (B13 follow-up).
      // Wrapped in try/catch so the webhook always returns 200 — never trigger
      // EL retry storms on our DB issues. Errors logged via captureException
      // with conversation id only (no PII).
      try {
        const startedAt = tx.data.metadata?.start_time_unix_secs
          ? new Date(tx.data.metadata.start_time_unix_secs * 1000)
          : new Date();
        const durationSeconds = tx.data.metadata?.call_duration_secs ?? null;
        const endedAt =
          tx.data.metadata?.start_time_unix_secs && durationSeconds
            ? new Date((tx.data.metadata.start_time_unix_secs + durationSeconds) * 1000)
            : null;
        const turns = tx.data.transcript ?? [];
        const flatText = turns.map((t) => `[${t.role}] ${t.message}`).join('\n');
        const redactedText = redactTranscript(flatText);
        const redactedSummary = redactedText.slice(0, 500);

        const call = await upsertVoiceCall({
          agentId,
          agentRole: role ?? 'unknown',
          conversationId: tx.data.conversation_id,
          channel: agent?.channel ?? 'voice',
          surface: tx.data.metadata?.phone_call ? 'phone' : 'web_widget',
          consentMethod: 'voice_sarah',
          startedAt,
          endedAt,
          durationSeconds,
          outcome: tx.data.status ?? null,
          redactedSummary,
          correlationClaimId,
          metadata: {
            phone_direction: tx.data.metadata?.phone_call?.direction ?? null,
            from_number_present: !!tx.data.metadata?.phone_call?.from_number,
          },
        });

        if (call && redactedText.length > 0) {
          await appendTranscript({
            voiceCallId: call.id,
            redactedText,
            wordCount: redactedText.split(/\s+/).filter(Boolean).length,
            redactionApplied: true,
          });
        }

        log.info('VoiceCall persisted', {
          conversation: tx.data.conversation_id,
          persisted: !!call,
        });
      } catch (err) {
        log.error('VoiceCall persistence failed', {
          conversation: tx.data.conversation_id,
          error: err instanceof Error ? err.message : String(err),
        });
        captureException(err, {
          tags: { route: '/api/voice/elevenlabs/webhook', phase: 'persistence' },
          extra: { requestId: log.requestId, conversation: tx.data.conversation_id },
        });
        // Fall through — webhook still returns 200 below.
      }
    } else {
      log.info('received; no extractor configured', { type: parsed.type });
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/voice/elevenlabs/webhook',
        request_id: log.requestId,
        webhook_type: parsed.type,
        agent_id: agentId ?? null,
        agent_role: agentId ? agentRole(agentId) : null,
        flag_on: process.env.VOICE_AGENT_ENABLED === 'true',
      },
    });

    return jsonResponse(200, { received: true });
  } catch (err) {
    // Never throw. Log and return 200 to avoid EL retry storms on our bugs;
    // 5xx would have EL retry the webhook, which is worse than silent drop
    // during the flag-off phase.
    const msg = err instanceof Error ? err.message : 'unknown-error';
    log.error('unexpected error', { error: msg });
    captureException(err, {
      tags: { route: '/api/voice/elevenlabs/webhook' },
      extra: { requestId: log.requestId },
    });
    return jsonResponse(200, { received: true, error: 'internal' });
  }
}
