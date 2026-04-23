// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Compliance events writer. Feature-flagged via COMPLIANCE_EVENTS_ENABLED.
// When the flag is unset (default), logEvent no-ops — this keeps the scaffold
// safe to ship behind feature flags without depending on a Prisma model that
// isn't in the schema yet.
//
// TODO: Move to Prisma model `ComplianceEvent` once migration lands.

export type ComplianceEventInput = {
  session_id?: string | null;
  actor?: string | null; // e.g. 'voice_agent', 'system'
  event_type: string; // e.g. 'voice_tool_invoked', 'voice_escalation_requested'
  tool_name?: string | null;
  outcome?: 'ok' | 'error' | 'rate_limited' | 'rejected' | 'queued';
  metadata?: Record<string, unknown>;
};

const isEnabled = () => process.env.COMPLIANCE_EVENTS_ENABLED === 'true';

// In-memory sink for dev/preview. Replace with Prisma insert once model exists.
const memorySink: Array<ComplianceEventInput & { ts: string }> = [];

export async function logEvent(evt: ComplianceEventInput): Promise<void> {
  if (!isEnabled()) {
    // Flag off: no-op. Intentional.
    return;
  }
  try {
    memorySink.push({ ...evt, ts: new Date().toISOString() });
    // eslint-disable-next-line no-console
    console.log('[compliance_event]', JSON.stringify({ ...evt, ts: new Date().toISOString() }));
  } catch (err) {
    // Never throw from the writer; compliance logging must not break callers.
    // eslint-disable-next-line no-console
    console.warn('[compliance_event] write failed', err);
  }
}

export function _peekMemorySink() {
  return memorySink.slice();
}
