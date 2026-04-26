/**
 * NOT LEGAL ADVICE.
 *
 * Persistence helpers for VoiceCall + CallTranscript (audit B13).
 * Flag-gated via VOICE_AGENT_ENABLED — when off, every helper returns
 * null silently. When on, they upsert rows keyed on the EL conversation_id
 * for idempotent retries.
 *
 * IMPORTANT: insert path MUST run the DR-714 redactor before persisting
 * transcript text. Helpers here ASSUME redactedText is already redacted.
 *
 * The webhook handler at app/api/voice/elevenlabs/webhook/route.ts is the
 * caller; it lives in a separate PR so the scaffold can land without
 * touching the production webhook surface.
 */

import { prisma } from '@/lib/prisma';
import type { CallTranscript, Prisma, VoiceCall } from '@prisma/client';

const DEFAULT_TRANSCRIPT_RETENTION_DAYS = 90;

function enabled(): boolean {
  return process.env.VOICE_AGENT_ENABLED === 'true';
}

export type UpsertVoiceCallInput = Omit<
  Prisma.VoiceCallUncheckedCreateInput,
  'id' | 'createdAt' | 'updatedAt'
>;

export async function upsertVoiceCall(input: UpsertVoiceCallInput): Promise<VoiceCall | null> {
  if (!enabled()) return null;
  const { conversationId, ...rest } = input;
  return prisma.voiceCall.upsert({
    where: { conversationId },
    create: { conversationId, ...rest },
    update: rest,
  });
}

export type AppendTranscriptInput = Omit<
  Prisma.CallTranscriptUncheckedCreateInput,
  'id' | 'createdAt' | 'retentionExpiresAt'
> & { retentionExpiresAt?: Date };

export async function appendTranscript(
  input: AppendTranscriptInput,
): Promise<CallTranscript | null> {
  if (!enabled()) return null;
  const retentionExpiresAt =
    input.retentionExpiresAt ??
    new Date(Date.now() + DEFAULT_TRANSCRIPT_RETENTION_DAYS * 86_400_000);
  return prisma.callTranscript.create({
    data: { ...input, retentionExpiresAt },
  });
}

export async function findCallByConversationId(conversationId: string): Promise<VoiceCall | null> {
  if (!enabled()) return null;
  return prisma.voiceCall.findUnique({ where: { conversationId } });
}
