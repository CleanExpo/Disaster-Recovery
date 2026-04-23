// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Output filtering + SMS body sanitisation. Every tool response MUST be
// routed through filterToolOutput, and every outbound SMS MUST be routed
// through sanitiseSmsBody. The agent never supplies SMS text — bodies are
// server-side constants — but we sanitise defensively.

/**
 * Strip unexpected keys from a tool output. One level of recursion for nested
 * plain objects (so { meta: { covered: true, secret: 'x' } } + allowedKeys
 * ['meta'] would still carry the whole nested object — the caller is expected
 * to pass a flat allow-list for the top level and rely on typed business logic
 * for nested values. We recurse one level just to defensively strip surprise
 * keys in plain objects returned by business logic.)
 */
export function filterToolOutput<T extends Record<string, unknown>>(output: T, allowedKeys: readonly (keyof T | string)[]): Partial<T> {
  if (!output || typeof output !== 'object') return {} as Partial<T>;
  const allowSet = new Set<string>(allowedKeys as string[]);
  const result: Record<string, unknown> = {};
  for (const k of Object.keys(output)) {
    if (!allowSet.has(k)) continue;
    const v = (output as Record<string, unknown>)[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      // Shallow-clone nested plain objects so mutation of the source doesn't
      // leak post-filter. We do NOT recurse further — this is one level deep.
      result[k] = { ...(v as Record<string, unknown>) };
    } else {
      result[k] = v;
    }
  }
  return result as Partial<T>;
}

const REDACTED = '[REDACTED]';

// Redact patterns — live API key prefixes, JWT-ish base64, webhook secrets, UUIDs.
const PATTERNS: RegExp[] = [
  /sk_live_[A-Za-z0-9_-]+/g,
  /rk_live_[A-Za-z0-9_-]+/g,
  /whsec_[A-Za-z0-9_-]+/g,
  /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, // JWT three-part
  /eyJ[A-Za-z0-9_-]{8,}/g, // bare base64 JWT header fragments
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, // UUID
];

export function sanitiseSmsBody(body: string): string {
  if (!body) return '';
  let out = body;
  for (const rx of PATTERNS) out = out.replace(rx, REDACTED);
  return out;
}
