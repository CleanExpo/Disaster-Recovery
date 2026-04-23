/**
 * NOT LEGAL ADVICE.
 *
 * DR-691 — Equipped Commercial Finance status webhook.
 *
 * Receives status updates on finance referrals (Reg 25 referrer arrangement
 * with SME Consulting Group Pty Ltd ABN 53 662 478 408, trading as Equipped
 * Commercial Finance). DR writes a `finance_referral_handoff` row to
 * compliance_events for every status transition.
 *
 * Flag-gated: returns 503 unless NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED === "true".
 * No actual API calls to Equipped — this route only receives callbacks.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyEquippedSignature } from "@/lib/finance/webhook-verify";
import {
  eventKey,
  hasSeen,
  markSeen,
  upsertReferral,
  type ReferralStage,
} from "@/lib/finance/referral-store";
import { logComplianceEvent } from "@/lib/compliance/events";

export const runtime = "nodejs";

const KNOWN_STAGES = [
  "received",
  "qualified",
  "approved",
  "funded",
  "declined",
  "withdrawn",
] as const;

const PayloadSchema = z.object({
  referralId: z.string().min(1),
  status: z.string().min(1),
  stage: z.string().min(1),
  timestamp: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

function toStage(stage: string): { stage: ReferralStage; unknown: boolean } {
  const normalised = stage.toLowerCase().trim();
  if ((KNOWN_STAGES as readonly string[]).includes(normalised)) {
    return { stage: normalised as ReferralStage, unknown: false };
  }
  return { stage: "unknown", unknown: true };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (process.env.NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED !== "true") {
    return NextResponse.json(
      { error: "equipped_referral_disabled" },
      { status: 503 },
    );
  }

  const secret = process.env.EQUIPPED_WEBHOOK_SECRET ?? "";
  const signatureHeader = req.headers.get("equipped-signature") ?? "";
  const rawBody = await req.text();

  const verdict = verifyEquippedSignature({ secret, rawBody, signatureHeader });
  if (!verdict.ok) {
    return NextResponse.json(
      { error: "signature_invalid", reason: verdict.reason },
      { status: 401 },
    );
  }

  let parsed: z.infer<typeof PayloadSchema>;
  try {
    parsed = PayloadSchema.parse(JSON.parse(rawBody));
  } catch (err) {
    return NextResponse.json(
      { error: "invalid_payload", message: err instanceof Error ? err.message : "parse_failed" },
      { status: 400 },
    );
  }

  const key = eventKey(parsed.referralId, parsed.timestamp);
  if (hasSeen(key)) {
    return NextResponse.json({ received: true, duplicate: true });
  }
  markSeen(key);

  const { stage, unknown } = toStage(parsed.stage);

  upsertReferral({
    referralId: parsed.referralId,
    stage,
    lastStatus: parsed.status,
    smsSent: Boolean(parsed.metadata?.sms_sent),
    consentVersion: typeof parsed.metadata?.consent_version === "string"
      ? (parsed.metadata.consent_version as string)
      : undefined,
    entityIdentifierHash: typeof parsed.metadata?.entity_identifier_hash === "string"
      ? (parsed.metadata.entity_identifier_hash as string)
      : undefined,
    metadata: parsed.metadata,
  });

  await logComplianceEvent({
    eventType: "finance_referral_handoff",
    correlationId: parsed.referralId,
    correlationType: "finance_referral",
    entityType: "finance_partner",
    metadata: {
      stage,
      status: parsed.status,
      timestamp: parsed.timestamp,
      unknownStage: unknown,
      source: "equipped_webhook",
      ...(parsed.metadata ?? {}),
    },
  });

  return NextResponse.json({ received: true, ...(unknown ? { unknownStage: true } : {}) });
}
