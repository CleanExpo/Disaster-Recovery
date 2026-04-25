/**
 * NOT LEGAL ADVICE.
 *
 * ClaimIntake + SupportInteraction extractors. Pure — no I/O.
 *
 * Ported from DR-Sandbox (voice/webhook.ts, latter half) as part of DR-708.
 * Strategy: trust `analysis.data_collection_results` first (if the agent was
 * configured with data-collection fields), fall back to transcript regex when
 * not present. Always preserve the raw transcript.
 */

import type {
  ClaimIntake,
  DrService,
  ElevenLabsAnalysis,
  ElevenLabsTranscriptionWebhook,
  ElevenLabsTurn,
  SupportInteraction,
  SupportTopic,
  UrgencyLevel,
} from "./types";

// ────────────────────────────────────────────────────────────────────────────
// ClaimIntake extraction
// ────────────────────────────────────────────────────────────────────────────

const SERVICE_KEYWORDS: Array<[DrService, RegExp]> = [
  ["water", /\b(water|flood|leak|burst pipe|overflow|soak|wet)\b/i],
  ["fire", /\b(fire|smoke|burn|scorched|char)\b/i],
  ["mould", /\b(mould|mold|mildew|fungal|spore)\b/i],
  ["storm", /\b(storm|wind|hail|cyclone|roof)\b/i],
  ["biohazard", /\b(biohazard|blood|needle|meth|trauma|hoarding)\b/i],
  ["sewage", /\b(sewage|sewer|overflow|effluent|toilet backup)\b/i],
];

const URGENCY_KEYWORDS: Array<[UrgencyLevel, RegExp]> = [
  ["immediate", /\b(right now|immediately|urgent|emergency|actively|still (rising|running|leaking)|just (burst|happened|started)|water everywhere|water is everywhere|water coming in|sinking|flooding)\b/i],
  ["same-day", /\b(today|this morning|this afternoon|same day|within the hour|a few hours)\b/i],
  ["next-day", /\b(tomorrow|tonight|first thing|early morning|next day)\b/i],
  ["scheduled", /\b(next week|in a few days|schedule|later|whenever)\b/i],
];

const PROPERTY_TYPE_KEYWORDS = {
  commercial: /\b(office|shop|store|warehouse|factory|hotel|clinic|school|business|commercial|retail|restaurant)\b/i,
  residential: /\b(home|house|apartment|unit|flat|residence|my place|our place|bedroom|living room|kitchen)\b/i,
};

const AUS_STATE_RX = /\b(NSW|VIC|QLD|SA|WA|TAS|NT|ACT)\b/;
const AUS_POSTCODE_RX = /\b(0[289]\d{2}|[2-8]\d{3})\b/;
const PHONE_RX = /\b(?:\+?61\s?|0)([2-478])[ -]?(\d{4})[ -]?(\d{4})\b/;
const EMAIL_RX = /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i;

function firstMatch<T>(items: Array<[T, RegExp]>, text: string): T | null {
  for (const [val, rx] of items) {
    if (rx.test(text)) return val;
  }
  return null;
}

function joinTranscript(turns: ElevenLabsTurn[], role?: "user" | "agent"): string {
  return turns.filter((t) => !role || t.role === role).map((t) => t.message).join(" \n ");
}

function pluckFromAnalysis(a: ElevenLabsAnalysis | undefined, key: string): string | null {
  const v = a?.data_collection_results?.[key]?.value;
  if (typeof v === "string" && v.trim().length > 0) return v.trim();
  return null;
}

/**
 * Produce a ClaimIntake from a transcription webhook.
 */
export function extractClaimIntake(w: ElevenLabsTranscriptionWebhook): ClaimIntake {
  const turns = w.data.transcript ?? [];
  const allText = joinTranscript(turns);
  const userText = joinTranscript(turns, "user");
  const a = w.data.analysis;

  const summary =
    (typeof a?.transcript_summary === "string" && a.transcript_summary.trim()) ||
    userText.slice(0, 400) ||
    "(no summary)";

  const addressRaw = pluckFromAnalysis(a, "property_address");
  const postcodeMatch = (addressRaw ?? userText).match(AUS_POSTCODE_RX);
  const stateMatch = (addressRaw ?? userText).match(AUS_STATE_RX);
  const suburbAnalysis = pluckFromAnalysis(a, "property_suburb");
  const phoneAnalysis = pluckFromAnalysis(a, "caller_phone");
  const phoneInText = userText.match(PHONE_RX)?.[0];
  const emailMatch = userText.match(EMAIL_RX)?.[1] ?? null;

  const callSuccessfulRaw = a?.call_successful;
  const callSuccessful =
    typeof callSuccessfulRaw === "boolean"
      ? callSuccessfulRaw
      : typeof callSuccessfulRaw === "string"
        ? /success|true|complete/i.test(callSuccessfulRaw)
        : null;

  const propertyTypeText = allText;
  const propertyType = PROPERTY_TYPE_KEYWORDS.commercial.test(propertyTypeText)
    ? "commercial"
    : PROPERTY_TYPE_KEYWORDS.residential.test(propertyTypeText)
      ? "residential"
      : "unknown";

  return {
    conversationId: w.data.conversation_id,
    agentId: w.data.agent_id,
    capturedAt: new Date(w.event_timestamp * 1000).toISOString(),
    service:
      (pluckFromAnalysis(a, "service") as DrService | null) ??
      firstMatch(SERVICE_KEYWORDS, userText) ??
      firstMatch(SERVICE_KEYWORDS, allText),
    urgency:
      (pluckFromAnalysis(a, "urgency") as UrgencyLevel | null) ??
      firstMatch(URGENCY_KEYWORDS, userText) ??
      firstMatch(URGENCY_KEYWORDS, allText),
    callerName: pluckFromAnalysis(a, "caller_name"),
    callerPhone: phoneAnalysis ?? phoneInText ?? w.data.metadata?.phone_call?.from_number ?? null,
    callerEmail: pluckFromAnalysis(a, "caller_email") ?? emailMatch,
    propertyAddress: addressRaw,
    propertySuburb: suburbAnalysis,
    propertyState: stateMatch?.[1] ?? null,
    propertyPostcode: postcodeMatch?.[0] ?? null,
    propertyType,
    insurer: pluckFromAnalysis(a, "insurer"),
    policyNumber: pluckFromAnalysis(a, "policy_number"),
    summary,
    callSuccessful,
    callDurationSecs: w.data.metadata?.call_duration_secs ?? null,
    fromNumber: w.data.metadata?.phone_call?.from_number ?? null,
    toNumber: w.data.metadata?.phone_call?.to_number ?? null,
    rawTranscript: turns,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Maya (support-chat) extraction
// ────────────────────────────────────────────────────────────────────────────

const TOPIC_KEYWORDS: Array<[SupportTopic, RegExp]> = [
  ["service-coverage", /\b(do you (cover|service)|service area|cover my|coverage|available in|near me|nearest)\b/i],
  ["pricing", /\b(cost|price|pricing|quote|how much|charge|fee|rate)\b/i],
  ["insurance-question", /\b(insurance|insurer|covered by|claim approval|approved|policy)\b/i],
  ["claim-followup", /\b(my claim|existing claim|claim number|update on|following up|spoke to|last week|last time)\b/i],
  ["complaint", /\b(complaint|unhappy|dissatisfied|terrible|awful|bad service|refund|manager)\b/i],
  ["escalate-to-sarah", /\b(right now|flood(ing)?|actively|still (rising|leaking|running)|emergency|urgent|today|home is damaged|property is damaged)\b/i],
];

/**
 * Produce a SupportInteraction from a transcription webhook whose agent_id
 * resolves to Maya. Reuses the same EL envelope shape; different domain fields.
 */
export function extractSupportInteraction(w: ElevenLabsTranscriptionWebhook): SupportInteraction {
  const turns = w.data.transcript ?? [];
  const allText = joinTranscript(turns);
  const userText = joinTranscript(turns, "user");
  const a = w.data.analysis;

  const summary =
    (typeof a?.transcript_summary === "string" && a.transcript_summary.trim()) ||
    userText.slice(0, 400) ||
    "(no summary)";

  const topicFromAnalysis = pluckFromAnalysis(a, "topic") as SupportTopic | null;
  const topic = topicFromAnalysis ?? firstMatch(TOPIC_KEYWORDS, userText) ?? firstMatch(TOPIC_KEYWORDS, allText);

  const resolvedRaw = a?.data_collection_results?.resolved?.value;
  const resolved =
    typeof resolvedRaw === "boolean"
      ? resolvedRaw
      : typeof resolvedRaw === "string"
        ? /true|yes|resolved/i.test(resolvedRaw)
        : null;

  const escalateRaw = a?.data_collection_results?.escalate_to_sarah?.value;
  const escalateAnalysis =
    typeof escalateRaw === "boolean"
      ? escalateRaw
      : typeof escalateRaw === "string"
        ? /true|yes|escalate/i.test(escalateRaw)
        : null;
  // If analysis doesn't flag it, infer from topic
  const escalateToSarah = escalateAnalysis ?? topic === "escalate-to-sarah";

  return {
    conversationId: w.data.conversation_id,
    agentId: w.data.agent_id,
    capturedAt: new Date(w.event_timestamp * 1000).toISOString(),
    topic,
    resolved,
    escalateToSarah,
    callerName: pluckFromAnalysis(a, "caller_name"),
    callerContact:
      pluckFromAnalysis(a, "caller_contact") ??
      pluckFromAnalysis(a, "caller_email") ??
      pluckFromAnalysis(a, "caller_phone"),
    followUpAction: pluckFromAnalysis(a, "follow_up_action"),
    summary,
    rawTranscript: turns,
  };
}
