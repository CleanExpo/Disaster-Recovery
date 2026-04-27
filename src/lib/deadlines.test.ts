/**
 * deadlines.test.ts — DR-794 / GAP-121 regression coverage.
 *
 * Locks the explicit AEST (+10:00) timezone parsing fix that resolves the
 * "closes in 2 days" prerender bug observed on 27 Apr 2026 event pages.
 */

import { describe, it, expect } from 'vitest';
import { getDeadlineState, deadlineStatusText } from './deadlines';

describe('getDeadlineState — DR-794 timezone hardening', () => {
  // QLD floods program closes 2026-04-27. State flips to 'closed' at 00:00 AEST 28 Apr.
  // 28 Apr 00:00 AEST = 27 Apr 14:00 UTC (Brisbane = UTC+10, no DST).
  const qld = 'qld-floods-2026-extended-esha' as const;

  it('renders closing-soon (not closed) at 00:12 AEST on the close date', () => {
    // 00:12 AEST 27 Apr 2026 = 14:12 UTC 26 Apr 2026
    const now = new Date('2026-04-26T14:12:00.000Z');
    const result = getDeadlineState(qld, now);

    expect(result.state).toBe('closing-soon');
    // ~23h 47m remaining; floor → 0 days → "closes today" copy
    expect(result.daysRemaining).toBe(0);
  });

  it('renders closing-soon with daysRemaining=1 at 23:00 AEST the day before close', () => {
    // 23:00 AEST 26 Apr 2026 = 13:00 UTC 26 Apr 2026
    const now = new Date('2026-04-26T13:00:00.000Z');
    const result = getDeadlineState(qld, now);

    expect(result.state).toBe('closing-soon');
    // ~25h until 00:00 AEST 28 Apr → floor(25/24) = 1
    expect(result.daysRemaining).toBe(1);
  });

  it('renders closed at 00:01 AEST the day after close', () => {
    // 00:01 AEST 28 Apr 2026 = 14:01 UTC 27 Apr 2026
    const now = new Date('2026-04-27T14:01:00.000Z');
    const result = getDeadlineState(qld, now);

    expect(result.state).toBe('closed');
    expect(result.daysRemaining).toBe(0);
  });

  it('renders closing-soon at 23:59 AEST on the close date', () => {
    // 23:59 AEST 27 Apr 2026 = 13:59 UTC 27 Apr 2026
    const now = new Date('2026-04-27T13:59:00.000Z');
    const result = getDeadlineState(qld, now);

    expect(result.state).toBe('closing-soon');
    expect(result.daysRemaining).toBe(0);
  });

  it('does not overstate days during a long prerender lifetime (the original bug)', () => {
    // Before fix: prerender at 22:00 AEST 26 Apr would compute Math.ceil(26h/24h) = 2 days.
    // After fix: floor(26h/24h) = 1 day, so "closes in 1 day" copy is correct
    // both immediately AND if cached for the next ~22h.
    const now = new Date('2026-04-26T12:00:00.000Z'); // 22:00 AEST 26 Apr
    const result = getDeadlineState(qld, now);
    expect(result.daysRemaining).toBe(1);
    expect(result.state).toBe('closing-soon');
  });

  it('label uses the AEST display date, not UTC', () => {
    const now = new Date('2026-04-20T00:00:00.000Z');
    const { closeDateLabel } = getDeadlineState(qld, now);
    // Brisbane locale renders 27 April 2026 — the AEST calendar date, not 26 April UTC.
    expect(closeDateLabel).toContain('27');
    expect(closeDateLabel).toContain('April');
    expect(closeDateLabel).toContain('2026');
  });
});

describe('deadlineStatusText', () => {
  it('reports closed once past the AEST rollover', () => {
    const now = new Date('2026-04-27T14:30:00.000Z'); // 00:30 AEST 28 Apr
    expect(deadlineStatusText('qld-floods-2026-extended-esha', now)).toBe(
      'This program has closed.',
    );
  });

  it('reports day count and AEST close label while active', () => {
    const now = new Date('2026-04-26T13:00:00.000Z'); // 23:00 AEST 26 Apr
    const text = deadlineStatusText('qld-floods-2026-extended-esha', now);
    expect(text).toContain('1 day');
    expect(text).toContain('AEST');
  });
});
