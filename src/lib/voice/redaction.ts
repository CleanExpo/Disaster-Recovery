/**
 * NOT LEGAL ADVICE — redaction is defence-in-depth, not a compliance substitute.
 * Counsel review required.
 *
 * Transcript redaction pipeline for voice channel (DR-714, epic DR-706).
 *
 * Targets:
 *   - Luhn-valid PAN (13-19 digits)
 *   - CVV (3-4 digits near CVV/CVC/CCV/security code)
 *   - BSB + account number
 *   - Medicare number
 *   - Driver licence
 *   - DOB
 *   - Full street address (postcode + suburb preserved)
 *   - Email (non-caller)
 *   - Phone (AU formats, non-caller)
 *   - Secret prefixes (sk_live_, rk_live_, whsec_, xoxb-, ghp_, JWT eyJ...)
 *   - Contractor-name deny-list
 *
 * All redactors emit placeholders ONLY — never the raw matched content.
 */

export interface RedactionOptions {
  contractorDenyList?: string[];
  preserveCallerEmail?: string;
  preserveCallerPhone?: string;
}

export interface RedactionFlags {
  secret_leak: boolean;
  internal_leak: boolean;
  count_by_type: Record<string, number>;
}

export interface RedactionResult {
  text: string;
  flags: RedactionFlags;
}

// ---------------------------------------------------------------------------
// Pattern sources (frozen). Keep regex source strings — tests read these.
// ---------------------------------------------------------------------------

export const REDACTION_PATTERNS = Object.freeze({
  PAN: '(?:\\d[\\s-]?){12,18}\\d',
  CVV_CONTEXT: '(?:CVV|CVC|CCV|security\\s+code)',
  BSB: '\\b\\d{3}-?\\d{3}\\b',
  MEDICARE: '\\b[2-6]\\d{3}\\s?\\d{5}\\s?\\d\\b',
  DL_CONTEXT: '(?:licen[cs]e)',
  DOB_CONTEXT: '(?:born|DOB|birthday|date\\s+of\\s+birth)',
  DOB_DATE: '\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}',
  STREET:
    '\\b\\d+\\s+[A-Za-z][A-Za-z\\s]*?\\s+(?:Road|Rd|Street|St|Ave|Avenue|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl|Crescent|Cres|Boulevard|Blvd|Highway|Hwy|Parade|Pde|Terrace|Tce)\\b',
  EMAIL: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}',
  PHONE_AU:
    '(?:\\+614\\d{8}|\\b04\\d{8}\\b|\\b0[2378]\\s?\\d{4}\\s?\\d{4}\\b|\\b1300\\s?\\d{3}\\s?\\d{3}\\b|\\b1800\\s?\\d{3}\\s?\\d{3}\\b)',
  SECRET_PREFIX: '(?:sk_live_|rk_live_|whsec_|ghp_)[A-Za-z0-9_]+',
  SECRET_SLACK: 'xoxb-[A-Za-z0-9-]+',
  SECRET_JWT: 'eyJ[\\w-]{5,}\\.[\\w-]{5,}\\.[\\w-]{5,}',
} as const);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function luhnValid(digits: string): boolean {
  const s = digits.replace(/\D/g, '');
  if (s.length < 13 || s.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = parseInt(s[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function normaliseAuPhone(p: string): string {
  return p.replace(/[\s-]/g, '');
}

interface Ctx {
  counts: Record<string, number>;
  secretHit: boolean;
  internalHit: boolean;
}

function bump(ctx: Ctx | undefined, key: string) {
  if (!ctx) return;
  ctx.counts[key] = (ctx.counts[key] ?? 0) + 1;
}

// ---------------------------------------------------------------------------
// Individual redactors
// ---------------------------------------------------------------------------

export function redactPAN(input: string, ctx?: Ctx): string {
  const re = new RegExp(REDACTION_PATTERNS.PAN, 'g');
  return input.replace(re, (m) => {
    if (luhnValid(m)) {
      bump(ctx, 'PAN');
      return '[REDACTED_PAN]';
    }
    return m;
  });
}

export function redactCVV(input: string, ctx?: Ctx): string {
  // CVV: 3-4 digits within 15 chars of a CVV keyword (before or after).
  const ctxRe = new RegExp(REDACTION_PATTERNS.CVV_CONTEXT, 'gi');
  let out = input;
  // Look for "CVV <spaces/punct> digits" and "digits <spaces/punct> CVV".
  const pattern = new RegExp(
    `(${REDACTION_PATTERNS.CVV_CONTEXT}[^\\d]{0,15})\\d{3,4}\\b|\\b\\d{3,4}([^\\d]{0,15}${REDACTION_PATTERNS.CVV_CONTEXT})`,
    'gi',
  );
  out = out.replace(pattern, (_m, pre, post) => {
    bump(ctx, 'CVV');
    if (pre) return `${pre}[REDACTED_CVV]`;
    return `[REDACTED_CVV]${post}`;
  });
  void ctxRe;
  return out;
}

export function redactBSB(input: string, ctx?: Ctx): string {
  // Two shapes: "BSB 062-000" (keyword within 25 chars) OR "062-000 12345678" (BSB followed by 6-10 digit account).
  const keywordPattern = new RegExp(
    `(BSB[^\\d]{0,25})${REDACTION_PATTERNS.BSB}(?:[^\\d]{0,10}\\d{6,10})?`,
    'gi',
  );
  let out = input.replace(keywordPattern, () => {
    bump(ctx, 'BSB');
    return '[REDACTED_BANK]';
  });
  const pairPattern = new RegExp(`${REDACTION_PATTERNS.BSB}\\s+(?:acc(?:ount)?\\s*)?\\d{6,10}\\b`, 'gi');
  out = out.replace(pairPattern, () => {
    bump(ctx, 'BSB');
    return '[REDACTED_BANK]';
  });
  return out;
}

export function redactMedicare(input: string, ctx?: Ctx): string {
  const re = new RegExp(REDACTION_PATTERNS.MEDICARE, 'g');
  return input.replace(re, () => {
    bump(ctx, 'MEDICARE');
    return '[REDACTED_MEDICARE]';
  });
}

export function redactDriverLicence(input: string, ctx?: Ctx): string {
  // 6-10 alphanumeric within 20 chars of "licence"/"license".
  const pattern = new RegExp(
    `(${REDACTION_PATTERNS.DL_CONTEXT}[^A-Za-z0-9]{0,20})[A-Za-z0-9]{6,10}\\b|\\b[A-Za-z0-9]{6,10}([^A-Za-z0-9]{0,20}${REDACTION_PATTERNS.DL_CONTEXT})`,
    'gi',
  );
  return input.replace(pattern, (_m, pre, post) => {
    bump(ctx, 'DL');
    if (pre) return `${pre}[REDACTED_DL]`;
    return `[REDACTED_DL]${post}`;
  });
}

export function redactDOB(input: string, ctx?: Ctx): string {
  const pattern = new RegExp(
    `(${REDACTION_PATTERNS.DOB_CONTEXT}[^\\d]{0,15})${REDACTION_PATTERNS.DOB_DATE}|${REDACTION_PATTERNS.DOB_DATE}([^\\d]{0,15}${REDACTION_PATTERNS.DOB_CONTEXT})`,
    'gi',
  );
  return input.replace(pattern, (_m, pre, post) => {
    bump(ctx, 'DOB');
    if (pre) return `${pre}[REDACTED_DOB]`;
    return `[REDACTED_DOB]${post ?? ''}`;
  });
}

export function redactStreetAddress(input: string, ctx?: Ctx): string {
  const re = new RegExp(REDACTION_PATTERNS.STREET, 'gi');
  return input.replace(re, () => {
    bump(ctx, 'ADDRESS');
    return '[REDACTED_ADDRESS]';
  });
}

export function redactEmail(input: string, ctx?: Ctx, preserve?: string): string {
  const re = new RegExp(REDACTION_PATTERNS.EMAIL, 'g');
  const preserveNorm = preserve?.toLowerCase();
  return input.replace(re, (m) => {
    if (preserveNorm && m.toLowerCase() === preserveNorm) return m;
    bump(ctx, 'EMAIL');
    return '[REDACTED_EMAIL]';
  });
}

export function redactPhone(input: string, ctx?: Ctx, preserve?: string): string {
  const re = new RegExp(REDACTION_PATTERNS.PHONE_AU, 'g');
  const preserveNorm = preserve ? normaliseAuPhone(preserve) : undefined;
  return input.replace(re, (m) => {
    if (preserveNorm && normaliseAuPhone(m) === preserveNorm) return m;
    bump(ctx, 'PHONE');
    return '[REDACTED_PHONE]';
  });
}

export function redactSecretPrefix(input: string, ctx?: Ctx): string {
  let out = input;
  const patterns = [
    REDACTION_PATTERNS.SECRET_PREFIX,
    REDACTION_PATTERNS.SECRET_SLACK,
    REDACTION_PATTERNS.SECRET_JWT,
  ];
  for (const p of patterns) {
    const re = new RegExp(p, 'g');
    out = out.replace(re, () => {
      if (ctx) {
        ctx.secretHit = true;
        bump(ctx, 'SECRET');
      }
      return '[REDACTED_SECRET]';
    });
  }
  return out;
}

export function redactDenyList(input: string, denyList: string[] | undefined, ctx?: Ctx): string {
  if (!denyList || denyList.length === 0) return input;
  let out = input;
  for (const term of denyList) {
    if (!term) continue;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escaped, 'gi');
    out = out.replace(re, () => {
      if (ctx) {
        ctx.internalHit = true;
        bump(ctx, 'INTERNAL');
      }
      return '[REDACTED_INTERNAL]';
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

/**
 * Apply all redactors in sequence. O(n * k) where k = number of patterns.
 * Secret-prefix runs FIRST so leaked secrets are never carried through
 * subsequent regex engines (defence-in-depth).
 */
export function redactTranscriptWithFlags(
  input: string,
  options: RedactionOptions = {},
): RedactionResult {
  const ctx: Ctx = { counts: {}, secretHit: false, internalHit: false };
  let s = input;
  s = redactSecretPrefix(s, ctx);
  s = redactPAN(s, ctx);
  s = redactCVV(s, ctx);
  s = redactBSB(s, ctx);
  s = redactMedicare(s, ctx);
  s = redactDriverLicence(s, ctx);
  s = redactDOB(s, ctx);
  s = redactStreetAddress(s, ctx);
  s = redactEmail(s, ctx, options.preserveCallerEmail);
  s = redactPhone(s, ctx, options.preserveCallerPhone);
  s = redactDenyList(s, options.contractorDenyList, ctx);
  return {
    text: s,
    flags: {
      secret_leak: ctx.secretHit,
      internal_leak: ctx.internalHit,
      count_by_type: ctx.counts,
    },
  };
}

export function redactTranscript(input: string, options: RedactionOptions = {}): string {
  return redactTranscriptWithFlags(input, options).text;
}
