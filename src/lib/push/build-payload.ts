/**
 * APNs notification payload builder.
 *
 * RA-1633 iOS epic — Phase 3b. Safe template → payload translation.
 * Extracted from the route handler so it can be tested without HTTP
 * mocking.
 *
 * Privacy (.claude/rules/privacy.md §1–§3):
 *   APNs payloads leave our infra, pass through Apple, and terminate on
 *   the user's device lock screen. Treat the body + title as PUBLIC.
 *   NEVER interpolate raw email, phone, address, or status verbs into
 *   the body. The template whitelist below is the guard — adding a new
 *   template requires reviewing this file AND the build-payload tests.
 *
 * Env setup (when the Apple credentials arrive — see Phase 3
 * prerequisites doc):
 *   APNS_KEY_ID            10-char Apple key id
 *   APNS_TEAM_ID           10-char Apple team id
 *   APNS_P8_BASE64         base64-encoded .p8 file contents
 *   INTERNAL_PUSH_SHARED_SECRET  bearer guard for the dispatcher route
 *
 * NOT LEGAL ADVICE.
 */

export const PUSH_TEMPLATE_KEYS = [
  'claim_status_update',
  'contractor_assigned',
  'contractor_on_the_way',
] as const;

export type PushTemplateKey = (typeof PUSH_TEMPLATE_KEYS)[number];

export interface BuiltPushPayload {
  /** APNs `aps` payload, ready to JSON.stringify into the HTTP/2 body. */
  aps: {
    alert: {
      title: string;
      body: string;
    };
    sound: string;
  };
  /** Custom keys — claim id only, no PII, used by the app to deep-link. */
  claimId: string;
}

/**
 * Truncate a claim id for display. Never exposes more than 8 chars and
 * never exposes an email-like or phone-like fragment (claim ids are
 * cuid/uuid shaped, but we guard anyway).
 */
export function shortClaimId(claimId: string): string {
  const trimmed = claimId.trim();
  if (trimmed.length <= 8) return trimmed;
  return trimmed.slice(0, 8);
}

/**
 * Last-line privacy guard. If a body somehow picked up an email or AU
 * phone number (param substitution bug, future template regression),
 * throw rather than send it to Apple.
 */
function assertNoPii(body: string): void {
  // Basic email pattern.
  if (/[\w.+-]+@[\w-]+\.[\w.-]+/.test(body)) {
    throw new Error('push_body_contains_email');
  }
  // AU mobile or landline roughly.
  if (/\b0[234578]\d{2}\s?\d{3}\s?\d{3}\b/.test(body)) {
    throw new Error('push_body_contains_phone');
  }
}

function substitute(template: string, params: Record<string, string> | undefined): string {
  if (!params) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, key: string) => {
    const value = params[key];
    return typeof value === 'string' ? value : '';
  });
}

/**
 * Build the APNs payload for a given template. Throws on unknown
 * template keys and on PII leaks.
 */
export function buildPushPayload(
  templateKey: PushTemplateKey | string,
  claimId: string,
  params?: Record<string, string>,
): BuiltPushPayload {
  if (!PUSH_TEMPLATE_KEYS.includes(templateKey as PushTemplateKey)) {
    throw new Error(`unknown_template:${templateKey}`);
  }

  // Run the PII guard against the raw claim id before any truncation
  // — truncating first would hide an email/phone that slipped in.
  assertNoPii(claimId);
  const short = shortClaimId(claimId);
  let title: string;
  let body: string;

  switch (templateKey as PushTemplateKey) {
    case 'claim_status_update':
      title = 'Update on your claim';
      body = substitute(`Tap to view claim #${short}`, params);
      break;
    case 'contractor_assigned':
      title = 'Contractor assigned';
      body = substitute('Your claim is being serviced. Tap to view.', params);
      break;
    case 'contractor_on_the_way':
      title = 'Contractor en route';
      body = substitute('Estimated arrival soon. Tap to view.', params);
      break;
    default:
      // Exhaustiveness — should never reach here because of the guard above.
      throw new Error(`unknown_template:${String(templateKey)}`);
  }

  assertNoPii(title);
  assertNoPii(body);

  return {
    aps: {
      alert: { title, body },
      sound: 'default',
    },
    claimId,
  };
}
