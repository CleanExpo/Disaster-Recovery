// @vitest-environment node
/**
 * B9 — Claim state machine tests.
 *
 * Pure-function tests; no Prisma, no DB. Covers happy-path, illegal
 * transitions, terminal states, self-transition rejection, and the
 * `legalNextStatuses` / `isTerminalStatus` helpers.
 */

import { describe, expect, it } from 'vitest';

import {
  isTerminalStatus,
  legalNextStatuses,
  transitionClaim,
} from '../state-machine';

describe('transitionClaim — happy path', () => {
  it('walks the canonical lifecycle end-to-end', () => {
    const lifecycle = [
      ['draft', 'submitted'],
      ['submitted', 'triaged'],
      ['triaged', 'assigned'],
      ['assigned', 'in_progress'],
      ['in_progress', 'make_safe_complete'],
      ['make_safe_complete', 'awaiting_kpi_review'],
      ['awaiting_kpi_review', 'kpi_passed'],
      ['kpi_passed', 'closed'],
    ] as const;

    for (const [from, to] of lifecycle) {
      const result = transitionClaim(from, to);
      expect(result.ok, `expected ${from} -> ${to} to be legal`).toBe(true);
    }
  });

  it('allows kpi_failed to loop back to in_progress (remediation)', () => {
    expect(transitionClaim('kpi_failed', 'in_progress').ok).toBe(true);
  });

  it('allows closed -> disputed (post-completion dispute)', () => {
    expect(transitionClaim('closed', 'disputed').ok).toBe(true);
  });

  it('allows cancellation from any non-terminal state', () => {
    expect(transitionClaim('submitted', 'cancelled').ok).toBe(true);
    expect(transitionClaim('in_progress', 'cancelled').ok).toBe(true);
    expect(transitionClaim('awaiting_kpi_review', 'cancelled').ok).toBe(true);
  });
});

describe('transitionClaim — illegal transitions', () => {
  it('rejects skipping straight from submitted to closed', () => {
    const result = transitionClaim('submitted', 'closed');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/illegal transition/i);
    }
  });

  it('rejects transitioning out of a terminal status (closed -> assigned)', () => {
    const result = transitionClaim('closed', 'assigned');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/cannot transition|illegal transition/i);
    }
  });

  it('rejects un-cancelling a cancelled claim', () => {
    const result = transitionClaim('cancelled', 'submitted');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/terminal/i);
    }
  });

  it('rejects withdrawn -> in_progress (terminal)', () => {
    const result = transitionClaim('withdrawn', 'in_progress');
    expect(result.ok).toBe(false);
  });

  it('rejects self-transition (from === to)', () => {
    const result = transitionClaim('triaged', 'triaged');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/self-transition/i);
    }
  });

  it('rejects assigning before triage', () => {
    expect(transitionClaim('submitted', 'assigned').ok).toBe(false);
  });
});

describe('legalNextStatuses', () => {
  it('returns the adjacency list for a non-terminal status', () => {
    const next = legalNextStatuses('submitted');
    expect(next).toContain('triaged');
    expect(next).toContain('cancelled');
    expect(next).toContain('withdrawn');
    expect(next).toContain('ineligible');
  });

  it('returns an empty list for a terminal status', () => {
    expect(legalNextStatuses('cancelled')).toEqual([]);
    expect(legalNextStatuses('withdrawn')).toEqual([]);
  });
});

describe('isTerminalStatus', () => {
  it('flags terminal states', () => {
    expect(isTerminalStatus('cancelled')).toBe(true);
    expect(isTerminalStatus('withdrawn')).toBe(true);
    expect(isTerminalStatus('ineligible')).toBe(true);
    expect(isTerminalStatus('disputed')).toBe(true);
  });

  it('does not flag mid-lifecycle states as terminal', () => {
    expect(isTerminalStatus('submitted')).toBe(false);
    expect(isTerminalStatus('in_progress')).toBe(false);
    expect(isTerminalStatus('closed')).toBe(false); // closed -> disputed still possible
  });
});
