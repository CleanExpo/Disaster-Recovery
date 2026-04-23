/**
 * NOT LEGAL ADVICE.
 *
 * Voice intake types — ElevenLabs agent "Sarah" integration.
 *
 * Ported from DR-Sandbox (voice/types.ts) as part of DR-708. Kept as-is:
 * agent-side behaviour is unchanged, only the consuming surface differs.
 *
 * Sarah is a 24/7 claims intake agent that receives calls on DR's 1300
 * number, triages the caller, and captures the structured intake we need
 * to dispatch a contractor. ElevenLabs posts to our webhook after each
 * call; this module parses that payload and produces a ClaimIntake record.
 */

/** ElevenLabs post-call webhook envelope types. */
export type ElevenLabsWebhookType =
  | "post_call_transcription"
  | "post_call_audio"
  | "call_initiation_failure";

/**
 * Transcription webhook — the primary type we care about. Contains the full
 * conversation, analysis, and metadata ElevenLabs captured during the call.
 *
 * Shape approximated from EL docs as of 2026-04-20. Fields added after that
 * date (e.g. has_audio booleans) are accepted but not required by us.
 */
export interface ElevenLabsTranscriptionWebhook {
  type: "post_call_transcription";
  event_timestamp: number;
  data: {
    agent_id: string;
    conversation_id: string;
    status: string;
    user_id?: string;
    transcript: ElevenLabsTurn[];
    metadata: ElevenLabsMetadata;
    analysis?: ElevenLabsAnalysis;
    conversation_initiation_client_data?: Record<string, unknown>;
    has_audio?: boolean;
    has_user_audio?: boolean;
    has_response_audio?: boolean;
  };
}

export interface ElevenLabsTurn {
  role: "user" | "agent" | "system";
  message: string;
  time_in_call_secs?: number;
  tool_calls?: Array<{ tool_name: string; params?: Record<string, unknown>; result?: unknown }>;
}

export interface ElevenLabsMetadata {
  start_time_unix_secs?: number;
  call_duration_secs?: number;
  cost?: { total?: number; currency?: string };
  phone_call?: {
    direction?: "inbound" | "outbound";
    from_number?: string;
    to_number?: string;
    provider?: string;
  };
  deletion_settings?: { deletion_time_unix_secs?: number };
  feedback?: { overall_score?: number | null };
}

export interface ElevenLabsAnalysis {
  evaluation_criteria_results?: Record<string, { result?: string; rationale?: string }>;
  data_collection_results?: Record<string, { value?: unknown; rationale?: string }>;
  transcript_summary?: string;
  call_successful?: string | boolean;
}

/** Audio-only webhook. We store the base64 blob but don't parse it. */
export interface ElevenLabsAudioWebhook {
  type: "post_call_audio";
  event_timestamp: number;
  data: { agent_id: string; conversation_id: string; full_audio: string };
}

/** Call initiation failure (EL couldn't connect the call). */
export interface ElevenLabsInitFailureWebhook {
  type: "call_initiation_failure";
  event_timestamp: number;
  data: {
    agent_id: string;
    conversation_id?: string;
    error?: string;
    provider_error?: Record<string, unknown>;
  };
}

export type ElevenLabsWebhook =
  | ElevenLabsTranscriptionWebhook
  | ElevenLabsAudioWebhook
  | ElevenLabsInitFailureWebhook;

// ────────────────────────────────────────────────────────────────────────────
// DR domain types — what we extract from Sarah's conversations.
// ────────────────────────────────────────────────────────────────────────────

export type DrService = "water" | "fire" | "mould" | "storm" | "biohazard" | "sewage";
export type UrgencyLevel = "immediate" | "same-day" | "next-day" | "scheduled";

export interface ClaimIntake {
  /** Matches the ElevenLabs conversation_id for traceability. */
  conversationId: string;
  agentId: string;
  capturedAt: string;

  /** Best-effort classification. Always fill with what we have; null when unknown. */
  service: DrService | null;
  urgency: UrgencyLevel | null;

  /** Contact. We expect Sarah to confirm these even if caller ID gives us from_number. */
  callerName: string | null;
  callerPhone: string | null;
  callerEmail: string | null;

  /** Property details. */
  propertyAddress: string | null;
  propertySuburb: string | null;
  propertyState: string | null;
  propertyPostcode: string | null;
  propertyType: "residential" | "commercial" | "unknown";

  /** Insurance handoff fields. */
  insurer: string | null;
  policyNumber: string | null;

  /** The claim narrative — 1-3 sentence summary from Sarah's transcript summary. */
  summary: string;

  /** Did Sarah consider the call successful (e.g. intake complete)? */
  callSuccessful: boolean | null;

  /** Call metadata. */
  callDurationSecs: number | null;
  fromNumber: string | null;
  toNumber: string | null;

  /** Raw transcript (array of turns) preserved verbatim for review. */
  rawTranscript: ElevenLabsTurn[];
}

export interface DispatchDecision {
  /** NRPG contractor we want to dispatch to. Null if no match yet. */
  contractorId: string | null;
  contractorName: string | null;
  /** Explanation for the decision — shown in the ops dashboard. */
  rationale: string;
  /** If urgency is "immediate", the SLA in minutes we are promising the caller. */
  responseSlaMinutes: number | null;
  /** Matched on these signals. */
  matchSignals: Array<{ signal: string; value: string; weight: number }>;
  /** How confident we are in the match. 0..1. */
  confidence: number;
  /** If we can't match automatically, escalation tier: 'ops-review' | 'human-phone' | 'on-call'. */
  escalation?: "none" | "ops-review" | "human-phone" | "on-call";
}

// ────────────────────────────────────────────────────────────────────────────
// SupportInteraction — what we extract from Maya (chat-based support).
// Distinct from ClaimIntake. Shares the webhook envelope with Sarah but
// different domain fields and routing.
// ────────────────────────────────────────────────────────────────────────────

export type SupportTopic =
  | "service-coverage"
  | "pricing"
  | "insurance-question"
  | "claim-followup"
  | "complaint"
  | "escalate-to-sarah"
  | "other";

export interface SupportInteraction {
  conversationId: string;
  agentId: string;
  capturedAt: string;
  topic: SupportTopic | null;
  resolved: boolean | null;
  /** Maya flags this when the user is reporting live damage and should be on Sarah instead. */
  escalateToSarah: boolean;
  callerName: string | null;
  callerContact: string | null;
  /** Next step (e.g. "send-pricing-link", "callback-24h", "assign-to-ops"). */
  followUpAction: string | null;
  summary: string;
  rawTranscript: ElevenLabsTurn[];
}
