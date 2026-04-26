/**
 * Feature flags registry — single source of truth.
 *
 * Health-check audit finding A10 (P3, 2026-04-26): flags were scattered across
 * call sites with no central registry, making it hard to grep "what flags
 * exist" or "is voice on?" without searching multiple files.
 *
 * Convention (CLAUDE.md §5.3):
 *   - `NEXT_PUBLIC_<FEATURE>_ENABLED` — read by client bundle. Inlined at
 *     build time by Next.js. Use when a UI needs to conditionally render.
 *   - `<FEATURE>_ENABLED` — server-only. Use when a flag only gates
 *     server-side behaviour (API routes, webhooks, cron). Voice agent,
 *     compliance events, retention cron, Reddit orchestrator etc.
 *
 * Default: every flag is OFF unless explicitly set to the literal string
 * `'true'`. This file enforces that convention — any other value (including
 * `'TRUE'`, `'1'`, `'yes'`) reads as false.
 *
 * Adding a flag here does NOT enable it. The env var still has to be set
 * to `'true'` in Vercel project settings (or `.env.local` for local dev).
 *
 * Removing a flag from this file does NOT disable it in code that reads
 * `process.env.X` directly — find every call site, migrate to this
 * registry, then remove. Do not silent-drop.
 */

/**
 * Resolve an env var to a boolean using the canonical 'true' literal rule.
 */
function isTrue(value: string | undefined): boolean {
  return value === 'true';
}

export const FEATURE_FLAGS = {
  // ── CLIENT-READABLE (NEXT_PUBLIC_*) ──────────────────────────────────────
  /**
   * Stripe Checkout for consumer-facing callout payments (DR-712). When off,
   * the consumer payment surface returns 503 + the marketing page hides the
   * "pay online" CTA.
   */
  CONSUMER_PAYMENTS: isTrue(process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED),

  /**
   * Equipped Commercial Finance referral surface. When off, the consent
   * form is hidden and `/finance/handoff` returns 503.
   */
  EQUIPPED_REFERRAL: isTrue(process.env.NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED),

  /**
   * iOS native bridge for the contractor mobile app shell. Client-side
   * because the web bundle has to know whether window.dr_native exists.
   */
  IOS_NATIVE_BRIDGE: isTrue(process.env.NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED),

  // ── SERVER-ONLY (no NEXT_PUBLIC_ prefix) ─────────────────────────────────
  /**
   * compliance_events writer (DR-624). When off, logComplianceEvent is a
   * no-op. When on, events are persisted to the append-only ledger.
   */
  COMPLIANCE_EVENTS: isTrue(process.env.COMPLIANCE_EVENTS_ENABLED),

  /**
   * Sarah voice agent (DR-706 epic). 5-layer kill switch — this flag is
   * layer 1. Voice runs entirely server-side via Twilio + ElevenLabs
   * webhooks; no client-side bundle reads it, hence no NEXT_PUBLIC prefix.
   */
  VOICE_AGENT: isTrue(process.env.VOICE_AGENT_ENABLED),

  /**
   * Voice retention cron (DR-714). When on, the daily cron purges voice
   * call records older than the retention window. Off by default until
   * VoiceCall persistence ships (B13 in 2026-04-26 audit).
   */
  VOICE_RETENTION_CRON: isTrue(process.env.VOICE_RETENTION_CRON_ENABLED),

  /**
   * Reddit orchestrator (the Reddit-content cron). Server-only.
   */
  REDDIT_ORCHESTRATOR: isTrue(process.env.REDDIT_ORCHESTRATOR_ENABLED),

  /**
   * Google Business Profile API integration for live star rating on
   * location pages. Server-only — the API call is server-side; results
   * are passed to the page render.
   */
  GBP: isTrue(process.env.GBP_ENABLED),
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
