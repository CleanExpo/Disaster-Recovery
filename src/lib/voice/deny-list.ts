// NOT LEGAL ADVICE — classifier is defence-in-depth, not a substitute for the tool-surface boundary.
//
// DR-711: Deny-list of strings the voice agent must never speak.
// Two layers:
//   1. SECRET_PREFIX_TOKENS — universal API/secret prefixes that must never leak.
//   2. DEFAULT_INTERNAL_DENY_LIST — env-loaded contractor trading names (CRM-sourced).
//
// IMPORTANT: Never hard-code real contractor names in source. Always pull from
// `process.env.VOICE_DENY_LIST_JSON` so a compromised source file cannot leak the panel.

/**
 * Universal high-risk secret prefixes. Never speak any token starting with these.
 * Add to this list as new partners (Slack, GitHub, Stripe live, webhooks etc.) come online.
 */
export const SECRET_PREFIX_TOKENS: readonly string[] = Object.freeze([
  'sk_live_',
  'rk_live_',
  'whsec_',
  'xoxb-',
  'ghp_',
]);

/**
 * Contractor trading names the agent must not voice.
 *
 * INTENTIONALLY EMPTY at build time. Ops populates this via the
 * `VOICE_DENY_LIST_JSON` env var, sourced from the CRM. Do NOT hard-code
 * contractor identities here — see docs/voice-topic-classifier-tuning.md.
 */
export const DEFAULT_INTERNAL_DENY_LIST: readonly string[] = Object.freeze([]);

/**
 * Read VOICE_DENY_LIST_JSON (a JSON-stringified array of strings) and return
 * a deduped, trimmed list. Falls back to DEFAULT_INTERNAL_DENY_LIST on absence
 * or malformed input.
 */
export function loadDenyListFromEnv(): string[] {
  const raw = process.env.VOICE_DENY_LIST_JSON;
  if (!raw) return [...DEFAULT_INTERNAL_DENY_LIST];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...DEFAULT_INTERNAL_DENY_LIST];
    const cleaned = parsed
      .filter((x): x is string => typeof x === 'string')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return Array.from(new Set(cleaned));
  } catch {
    return [...DEFAULT_INTERNAL_DENY_LIST];
  }
}

export interface DenyListMatch {
  matched: string;
  position: number;
}

/**
 * Detect every occurrence of any deny-list term in the text.
 * Case-insensitive substring match. Also checks SECRET_PREFIX_TOKENS.
 */
export function detectDenyListHit(text: string, list?: string[]): DenyListMatch[] {
  const out: DenyListMatch[] = [];
  if (!text || typeof text !== 'string') return out;

  const haystack = text.toLowerCase();
  const terms = [
    ...(list ?? loadDenyListFromEnv()),
    ...SECRET_PREFIX_TOKENS,
  ];

  for (const term of terms) {
    if (!term) continue;
    const needle = term.toLowerCase();
    let from = 0;
    while (from <= haystack.length) {
      const idx = haystack.indexOf(needle, from);
      if (idx === -1) break;
      out.push({ matched: term, position: idx });
      from = idx + needle.length;
    }
  }

  return out;
}
