/**
 * Call-out fee notice for the public claim form (`/claim`).
 *
 * Homeowners pay nothing to Disaster Recovery. The assigned NRPG
 * contractor sets and collects their own call-out and make-safe fee, and
 * quotes any further work after inspection. Both the JS form
 * (`app/claim/ClaimFormClient.tsx`) and the no-JS fallback form
 * (`app/claim/page.tsx`) render this exact wording, and
 * `/api/claims/submit` refuses a claim without the acknowledgement.
 *
 * Wording approved by the founder, 02/11/2026. Do not reword without
 * founder sign-off.
 */

export const CALLOUT_FEE_EXPLAINER =
  'We want your home safe as quickly as possible, so here is what happens next. ' +
  'A qualified local NRPG contractor will contact you. Before they start, they will ' +
  'tell you their call-out and make-safe fee. That fee is set by the contractor, not ' +
  'by Disaster Recovery, and you pay it directly to them once you agree. They will ' +
  'make the property safe and inspect the damage. Any further work is quoted ' +
  'separately by the contractor after the inspection, and nothing goes ahead without ' +
  'your approval. If you have insurance, check your policy or ask your insurer what ' +
  'it covers.';

export const CALLOUT_FEE_ACK_LABEL =
  'I understand the contractor will quote a call-out fee that I pay to them.';

/** Form field name used by the no-JS fallback form. */
export const CALLOUT_FEE_ACK_FIELD = 'calloutFeeAcknowledged';
