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

import { NextResponse } from "next/server";
import { verifyWebhookSignature, parseWebhook } from "@/lib/voice/webhook-verify";
import { extractClaimIntake, extractSupportInteraction } from "@/lib/voice/extract";
import { agentById, agentRole } from "@/lib/voice/agents-registry";
import type { ElevenLabsTranscriptionWebhook } from "@/lib/voice/types";

// Force dynamic — we read the raw request body, no caching.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function jsonResponse(status: number, body: Record<string, unknown>): NextResponse {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Raw body required for HMAC — don't use request.json() here.
    const rawBody = await request.text();
    const signatureHeader =
      request.headers.get("elevenlabs-signature") ??
      request.headers.get("ElevenLabs-Signature") ??
      "";
    const secret = process.env.ELEVENLABS_WEBHOOK_SECRET ?? "";

    const verified = verifyWebhookSignature({
      secret,
      rawBody,
      signatureHeader,
    });
    if (!verified.ok) {
      console.error("[voice/webhook] signature verification failed:", verified.reason);
      return jsonResponse(401, { received: false, error: verified.reason ?? "unauthorised" });
    }

    // Parse to discover event type + agent_id for logging.
    let parsed;
    try {
      parsed = parseWebhook(rawBody);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "parse-error";
      console.error("[voice/webhook] parse failed:", msg);
      return jsonResponse(400, { received: false, error: "malformed-payload" });
    }

    const agentId =
      "data" in parsed && parsed.data && typeof parsed.data === "object"
        ? (parsed.data as { agent_id?: string }).agent_id
        : undefined;
    const agent = agentId ? agentById(agentId) : undefined;

    // Flag-off: acknowledge and log; do not hydrate domain records.
    if (process.env.VOICE_AGENT_ENABLED !== "true") {
      console.info(
        `[voice/webhook] flag-off ack: type=${parsed.type} agent_id=${agentId ?? "unknown"} agent=${agent?.name ?? "unregistered"}`,
      );
      return jsonResponse(200, { received: true, agent_disabled: true });
    }

    // Flag-on path. For now we only log the extracted shape — DR-710..DR-716
    // will wire persistence, dispatch, and operator notifications.
    if (parsed.type === "post_call_transcription" && agentId) {
      const role = agentRole(agentId);
      const tx = parsed as ElevenLabsTranscriptionWebhook;
      if (role === "claims-intake") {
        const intake = extractClaimIntake(tx);
        console.info(
          `[voice/webhook] ClaimIntake conversation=${intake.conversationId} service=${intake.service} urgency=${intake.urgency} postcode=${intake.propertyPostcode}`,
        );
      } else if (role === "support-chat") {
        const si = extractSupportInteraction(tx);
        console.info(
          `[voice/webhook] SupportInteraction conversation=${si.conversationId} topic=${si.topic} escalate=${si.escalateToSarah}`,
        );
      } else {
        console.warn(`[voice/webhook] unknown agent_id=${agentId}; no extractor ran`);
      }
    } else {
      console.info(`[voice/webhook] received type=${parsed.type} — no extractor configured`);
    }

    return jsonResponse(200, { received: true });
  } catch (err) {
    // Never throw. Log and return 200 to avoid EL retry storms on our bugs;
    // 5xx would have EL retry the webhook, which is worse than silent drop
    // during the flag-off phase.
    const msg = err instanceof Error ? err.message : "unknown-error";
    console.error("[voice/webhook] unexpected error:", msg);
    return jsonResponse(200, { received: true, error: "internal" });
  }
}
