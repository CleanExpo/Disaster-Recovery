/**
 * NOT LEGAL ADVICE — v1 consent script; review by privacy counsel required before production go-live.
 *
 * APP 8 (Cross-border disclosure) caller-consent gate for the Sarah voice AI assistant.
 *
 * This utterance is played by the Twilio layer (TwiML <Say> + <Gather>) at call open,
 * before any audio is streamed to the ElevenLabs SIP trunk. The caller must either
 * say "yes" / press 1 to continue, or they are transferred to a human operator and
 * no audio reaches ElevenLabs.
 *
 * Refs: DR-706 (epic), DR-713 (this ticket).
 */

/**
 * Version pin for the consent script. Bump when the wording changes so that
 * call records can be tied to the exact script the caller heard.
 */
export const CONSENT_UTTERANCE_VERSION = 'v1.0-2026-04-23' as const

/**
 * The exact opening script Sarah plays. Must be kept in sync with the
 * privacy policy at /privacy (Voice AI Assistant section) and with the
 * ElevenLabs/Twilio data processing agreements.
 *
 * Word count target: 40-60 words.
 */
export const CONSENT_UTTERANCE =
  `You've reached Disaster Recovery Australia. This call is answered by an AI assistant ` +
  `and is recorded and transcribed. Audio and transcripts are processed by overseas providers ` +
  `in the United States. Say "yes" or press 1 to continue, or stay on the line to be ` +
  `transferred to a human operator.`

/**
 * Describes the fallback path if the caller does not give consent. Enforced at the
 * Twilio layer: the <Gather> times out or captures a decline, the call is bridged
 * straight to the human queue, and no media is ever streamed to ElevenLabs.
 */
export const CONSENT_DECLINE_HANDLING =
  `If the caller does not say "yes" or press 1 within the Gather window, or explicitly ` +
  `declines, the call is immediately transferred to the human operator queue. No audio ` +
  `is streamed to the ElevenLabs SIP trunk, no transcript is generated, and only the ` +
  `redacted call-metadata audit record (call SID, timestamp, consent outcome) is ` +
  `retained for the 7-year compliance window.`
