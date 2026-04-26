/**
 * NOT LEGAL ADVICE — v2 consent + intro scripts; review by privacy counsel
 * required before production go-live.
 *
 * Two surfaces, one constant each:
 *
 * 1. CONSENT_UTTERANCE — APP 8 cross-border-disclosure caller-consent gate.
 *    Played by the Twilio layer (TwiML <Say> + <Gather>) at call open,
 *    BEFORE any audio is streamed to the ElevenLabs SIP trunk. The caller
 *    must either say "yes" / press any non-0 key to continue, or they are
 *    transferred to a human operator and no audio reaches ElevenLabs.
 *
 * 2. CLAIMS_ASSISTANT_INTRO — Sarah's first utterance AFTER consent is
 *    granted. Configured as the ElevenLabs agent "first_message" /
 *    greeting and mirrored at the top of `sarah-prompt.ts` so the model
 *    cannot drift. Sets caller expectations: scope, AI status, AU/NZ
 *    coverage, "general guidance not legal/insurance advice", email-link
 *    handoff for payment.
 *
 * v2 — 2026-04-26: aligned CONSENT_UTTERANCE to canonical wording in
 * `.claude/rules/compliance.md §3` (was inverted opt-out + missing APP
 * reference + named US specifically). Added CLAIMS_ASSISTANT_INTRO.
 *
 * Refs: DR-706 (epic), DR-713 (consent utterance), DR-724 (intro).
 */

/**
 * Version pin for both scripts. Bump when EITHER changes so call records
 * can be tied to the exact wording the caller heard. Mirrored on the
 * `X-DR-Consent-Version` response header in the TwiML routes.
 */
export const CONSENT_UTTERANCE_VERSION = 'v2.0-2026-04-26' as const;

/**
 * APP 8 consent gate — canonical wording from `.claude/rules/compliance.md §3`.
 * MUST be played before any LLM processing of caller audio.
 *
 * Word count: 53. Opt-out path: press 0 at any time, or stay silent for
 * the Gather window (8s) — both route straight to a human, no audio is
 * ever streamed to ElevenLabs.
 */
export const CONSENT_UTTERANCE =
  `Hi, you've reached Disaster Recovery. This call may be handled by ` +
  `an AI assistant and recorded so we can help you. Your information ` +
  `may be processed by our technology providers overseas under the ` +
  `Australian Privacy Principles. Is that OK to continue? You can ` +
  `press 0 at any time to speak to a person.`;

/**
 * Sarah's opening utterance, played by the ElevenLabs agent immediately
 * after the Twilio layer hands the call over (i.e. AFTER consent has
 * been granted).
 *
 * IMPORTANT — deployment: this same string MUST be configured as the
 * agent's "first_message" in the ElevenLabs dashboard (Convai > Agents
 * > Sarah > Agent Settings > First Message). The system prompt
 * (`sarah-prompt.ts`) also references this opener so the model cannot
 * paraphrase it.
 *
 * Scope set by this script:
 *   - identifies as AI (honesty / APP 8 consistency)
 *   - scopes capability (claim/service portal, AU + NZ network)
 *   - disclaims advice ("general guidance ... not legal or insurance
 *     advice") — ACL s18/s29 + NCCP Reg 25 hedge
 *   - sets the email-link expectation up front (payment handoff)
 */
export const CLAIMS_ASSISTANT_INTRO =
  `Hi, you've reached Disaster Recovery. I'm the AI assistant for our ` +
  `online claim and service portal. I can help explain the property ` +
  `restoration process, guide you through lodging a claim request, and ` +
  `connect you with certified restoration professionals through the ` +
  `Disaster Recovery and NRPG network. The information I provide is ` +
  `general guidance based on our website and recognised restoration ` +
  `practices for Australia and New Zealand. It's not legal or insurance ` +
  `advice. I can help you complete the application and email you a ` +
  `secure link with your details ready to review and proceed with ` +
  `payment. To get started, please tell me what's happened at the ` +
  `property.`;

/**
 * Describes the fallback path if the caller does not give consent.
 * Enforced at the Twilio layer: the <Gather> times out, the caller
 * presses 0, or speech matches a decline phrase — the call is bridged
 * straight to the human queue, and no media is ever streamed to
 * ElevenLabs.
 */
export const CONSENT_DECLINE_HANDLING =
  `If the caller presses 0, says "no" / "human" / "person", does not ` +
  `respond within the Gather window, or otherwise declines, the call is ` +
  `immediately transferred to the human operator queue. No audio is ` +
  `streamed to the ElevenLabs SIP trunk, no transcript is generated, ` +
  `and only the redacted call-metadata audit record (call SID, ` +
  `timestamp, consent outcome) is retained for the 7-year compliance ` +
  `window.`;
