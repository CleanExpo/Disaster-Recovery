/**
 * Claim state machine — B9 (DR-700 audit refresh 2026-04-28).
 *
 * Pure transition helper. Postgres enforces the value-set via the
 * `ClaimStatus` enum (see `prisma/schema.prisma`); this module enforces
 * the legal *graph* of transitions on top of that.
 *
 * Lifecycle (canonical, mirrors `.context/domain-models.md`):
 *
 *     draft -> submitted -> triaged -> assigned -> in_progress
 *       -> make_safe_complete -> awaiting_kpi_review
 *       -> kpi_passed | kpi_failed -> closed
 *
 *   plus terminal off-happy-path branches:
 *     - `cancelled` from any non-terminal state (admin-cancel)
 *     - `disputed` from `closed` (post-completion dispute)
 *     - `withdrawn` from `submitted` | `triaged` (client pull-out)
 *     - `ineligible` from `submitted` | `triaged` (operator triage reject)
 *     - re-loop: `kpi_failed` -> `in_progress` (remediation required)
 *
 * Terminal states (no outgoing transitions):
 *   `closed`, `disputed`, `withdrawn`, `ineligible`
 *
 * `cancelled` is treated as terminal in normal operation; if you need to
 * "un-cancel" a claim, file a new one.
 *
 * Usage:
 *   const result = transitionClaim(claim.status, 'triaged');
 *   if (!result.ok) throw new Error(result.reason);
 *   await prisma.insuranceClaimAU.update({ where: { id }, data: { status: 'triaged' } });
 *
 * NOTE: this helper is the *gate*; it does NOT perform the DB write. The
 * caller owns the write so we keep the transaction boundary explicit and
 * the helper remains pure + cheap to test.
 */

/**
 * `ClaimStatusValue` was originally typed via `@prisma/client`'s generated
 * `ClaimStatus` enum. Decoupled 2026-04-29 (#303 follow-up) because the
 * Prisma enum is currently unused by any model — Prisma doesn't export
 * unused enums, which broke the build.
 *
 * The string-union below is the canonical source for this state machine
 * until the restoration-lifecycle redesign (DR-XXX) lands and re-attaches
 * the enum to a Prisma model.
 */
export type ClaimStatusValue =
  | 'draft'
  | 'submitted'
  | 'triaged'
  | 'assigned'
  | 'in_progress'
  | 'make_safe_complete'
  | 'awaiting_kpi_review'
  | 'kpi_passed'
  | 'kpi_failed'
  | 'closed'
  | 'cancelled'
  | 'disputed'
  | 'withdrawn'
  | 'ineligible';

export type TransitionResult = { ok: true } | { ok: false; reason: string };

/**
 * Adjacency map of legal `from -> to` transitions. Empty array = terminal.
 *
 * Order is irrelevant for correctness; we keep happy-path transitions first
 * for readability.
 */
const TRANSITIONS: Record<ClaimStatusValue, readonly ClaimStatusValue[]> = {
  draft: ['submitted', 'cancelled'],
  submitted: ['triaged', 'cancelled', 'withdrawn', 'ineligible'],
  triaged: ['assigned', 'cancelled', 'withdrawn', 'ineligible'],
  assigned: ['in_progress', 'cancelled'],
  in_progress: ['make_safe_complete', 'cancelled'],
  make_safe_complete: ['awaiting_kpi_review', 'cancelled'],
  awaiting_kpi_review: ['kpi_passed', 'kpi_failed', 'cancelled'],
  kpi_passed: ['closed'],
  // KPI failure can loop back to in_progress for remediation, or terminate.
  kpi_failed: ['in_progress', 'closed'],
  // Terminal states — no outgoing transitions except `closed -> disputed`.
  closed: ['disputed'],
  cancelled: [],
  disputed: [],
  withdrawn: [],
  ineligible: [],
};

/**
 * Validate a state transition. Pure — no I/O.
 *
 * Returns `{ ok: true }` if the transition is legal, otherwise
 * `{ ok: false, reason }` with a human-readable explanation suitable for
 * logging or surfacing in an error response.
 *
 * Self-transitions (`from === to`) are rejected — write your update path
 * to noop instead.
 */
export function transitionClaim(from: ClaimStatusValue, to: ClaimStatusValue): TransitionResult {
  if (from === to) {
    return {
      ok: false,
      reason: `Refusing self-transition '${from}' -> '${to}'. Skip the write instead.`,
    };
  }

  const allowed = TRANSITIONS[from];
  if (!allowed) {
    // Defensive — should be impossible given the enum, but TS narrows safer.
    return { ok: false, reason: `Unknown source status '${from}'.` };
  }

  if (!allowed.includes(to)) {
    return {
      ok: false,
      reason:
        allowed.length === 0
          ? `'${from}' is terminal — cannot transition to '${to}'.`
          : `Illegal transition '${from}' -> '${to}'. Allowed: ${allowed.join(', ')}.`,
    };
  }

  return { ok: true };
}

/**
 * Returns the set of statuses reachable from `from` in one step. Useful for
 * UI surfaces (admin claim editor) that need to render a status dropdown
 * without re-implementing the graph.
 */
export function legalNextStatuses(from: ClaimStatusValue): readonly ClaimStatusValue[] {
  return TRANSITIONS[from] ?? [];
}

/**
 * True if the claim has no further legal transitions.
 */
export function isTerminalStatus(status: ClaimStatusValue): boolean {
  return (TRANSITIONS[status] ?? []).length === 0;
}
