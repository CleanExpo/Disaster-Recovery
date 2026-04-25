/**
 * NOT LEGAL ADVICE
 *
 * DR-715: Voice agent kill switch (Layer 2 of the 5-layer kill chain).
 *
 * In-memory circuit breaker used to disable the voice agent without a redeploy.
 * This is one of five independent layers — any single one disables the agent:
 *   1. Twilio number reroute (<60s)       — manual, Twilio console
 *   2. Feature flag / this circuit breaker (<30s)
 *   3. ElevenLabs agent disable (<2min)   — manual, ElevenLabs dashboard
 *   4. HMAC rotation (<5min)              — manual, Vercel + ElevenLabs
 *   5. Automated trip (instant)           — DR-711 / DR-714 call tripCircuitBreaker()
 *
 * State is process-local. On multi-instance deployments, every instance must be
 * tripped independently — or the feature flag / Twilio reroute (layers 1, 4) should
 * be used instead. This is intentional: the circuit breaker is a fast local kill,
 * not distributed state.
 *
 * See docs/voice-kill-switch-runbook.md for the ops runbook.
 */

type BreakerSnapshot = {
  tripped: boolean;
  reason?: string;
  trippedAt?: Date;
};

const state = new Map<string, BreakerSnapshot>();
state.set('default', { tripped: false });

function getDefault(): BreakerSnapshot {
  const current = state.get('default');
  if (!current) {
    const fresh: BreakerSnapshot = { tripped: false };
    state.set('default', fresh);
    return fresh;
  }
  return current;
}

/**
 * Best-effort compliance audit log. Never throws — the kill switch must work
 * even if the audit pipeline is down.
 */
async function logComplianceEvent(
  eventType: string,
  metadata: Record<string, unknown>,
): Promise<void> {
  try {
    // Lazy-load via a string indirection so a missing module never breaks the
    // breaker, and so TypeScript doesn't require the module to exist at build time.
    // The compliance writer is expected at src/lib/compliance/events.ts; if it's
    // not there yet, this is a silent no-op.
    const modulePath = '../compliance/events';
    const mod: unknown = await (new Function('p', 'return import(p)') as (p: string) => Promise<unknown>)(modulePath)
      .catch(() => null);
    const writer = (mod as { writeComplianceEvent?: (t: string, m: Record<string, unknown>) => Promise<void> } | null)?.writeComplianceEvent;
    if (typeof writer === 'function') {
      await writer(eventType, metadata);
    }
  } catch {
    // Swallow — kill switch must remain operational regardless.
  }
}

/**
 * Returns true only if the VOICE_AGENT_ENABLED flag is explicitly 'true' AND
 * the in-memory circuit breaker has not been tripped.
 */
export function isVoiceAgentEnabled(): boolean {
  const flag = process.env.VOICE_AGENT_ENABLED === 'true';
  return flag && !getDefault().tripped;
}

/**
 * Trip the circuit breaker. Idempotent. Always logs a compliance event (best
 * effort). Call from automated tripwires (topic classifier, output filter) or
 * from the admin POST route.
 */
export function tripCircuitBreaker(reason: string): void {
  const trippedAt = new Date();
  state.set('default', { tripped: true, reason, trippedAt });
  void logComplianceEvent('voice_kill_switch_tripped', {
    reason,
    tripped_at: trippedAt.toISOString(),
  });
}

/**
 * Reset the circuit breaker. Requires dual-secret auth at the route layer —
 * never call this from automated code paths.
 */
export function resetCircuitBreaker(): void {
  state.set('default', { tripped: false });
  void logComplianceEvent('voice_kill_switch_reset', {
    reset_at: new Date().toISOString(),
  });
}

/**
 * Snapshot of the current breaker state. Returns a defensive copy.
 */
export function circuitBreakerState(): BreakerSnapshot {
  const s = getDefault();
  return {
    tripped: s.tripped,
    reason: s.reason,
    trippedAt: s.trippedAt,
  };
}
