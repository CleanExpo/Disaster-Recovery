/**
 * Dispatch domain types — ported from DR-Sandbox agents/dispatch + voice/types.
 *
 * Minimal subset: only the types the dispatcher pure function needs. The full
 * ElevenLabs webhook + Maya support types stay in DR-Sandbox until their
 * corresponding features land in production.
 *
 * Source: https://github.com/CleanExpo/DR-Sandbox (voice/types.ts @ main)
 * Linear: DR-627
 */

export type DrService = "water" | "fire" | "mould" | "storm" | "biohazard" | "sewage";

export type UrgencyLevel = "immediate" | "same-day" | "next-day" | "scheduled";

/**
 * Structured claim intake. In production this is written by the claim-form
 * API handler at `/api/claims/submit` and/or by Sarah's post-call webhook
 * handler (not yet landed — DR-698 tracks the DR-Sandbox prototype).
 */
export interface ClaimIntake {
  conversationId: string;
  agentId: string;
  capturedAt: string;

  service: DrService | null;
  urgency: UrgencyLevel | null;

  callerName: string | null;
  callerPhone: string | null;
  callerEmail: string | null;

  propertyAddress: string | null;
  propertySuburb: string | null;
  propertyState: string | null;
  propertyPostcode: string | null;
  propertyType: "residential" | "commercial" | "unknown";

  insurer: string | null;
  policyNumber: string | null;

  summary: string;
  callSuccessful: boolean | null;
  callDurationSecs: number | null;
  fromNumber: string | null;
  toNumber: string | null;
}

/**
 * Output of the dispatcher. Consumed by:
 *   - The ops dashboard (shows `rationale` + `matchSignals` to supervisors)
 *   - The contractor mobile app (reads `contractorId` + `responseSlaMinutes`)
 *   - The claims table (persists `contractorId`, `confidence`, `escalation`)
 */
export interface DispatchDecision {
  contractorId: string | null;
  contractorName: string | null;
  rationale: string;
  responseSlaMinutes: number | null;
  matchSignals: Array<{ signal: string; value: string; weight: number }>;
  confidence: number;
  escalation?: "none" | "ops-review" | "human-phone" | "on-call";
}

/**
 * NRPG contractor entry. In production this is loaded from the `contractors`
 * Supabase table via `loadRoster()` (see roster.ts — TODO follow-up PR).
 */
export interface RosterEntry {
  contractorId: string;
  contractorName: string;
  postcodes: string[];
  suburbs?: string[];
  homeCity?: string;
  serviceMix: DrService[];
  activeJobs?: number;
  maxDailyJobs?: number;
}
