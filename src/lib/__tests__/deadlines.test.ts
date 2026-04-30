/**
 * Unit tests for src/lib/deadlines.ts
 *
 * Covers the pure date-state machine that decides whether a disaster-
 * assistance program is `active`, `closing-soon`, `extended`, or
 * `closed` for a given evaluation date. Date inputs are passed in
 * explicitly (no `new Date()` reliance) so tests are time-stable.
 */

import { describe, it, expect } from 'vitest';
import {
  PROGRAM_DEADLINES,
  getDeadlineState,
  deadlineStatusText,
  type ProgramKey,
} from '../deadlines';

const ALFRED: ProgramKey = 'alfred-fnq-qld-assistance';
const NARELLE: ProgramKey = 'narelle-wa-emergency-hardship';

describe('PROGRAM_DEADLINES — table integrity', () => {
  it('every entry has key === record key', () => {
    for (const [key, value] of Object.entries(PROGRAM_DEADLINES)) {
      expect(value.key).toBe(key);
    }
  });

  it('every entry has openDate before closeDate', () => {
    for (const value of Object.values(PROGRAM_DEADLINES)) {
      expect(new Date(value.openDate).getTime()).toBeLessThan(new Date(value.closeDate).getTime());
    }
  });

  it('every entry lists at least one LGA', () => {
    for (const value of Object.values(PROGRAM_DEADLINES)) {
      expect(value.lgaList.length).toBeGreaterThan(0);
    }
  });
});

describe('getDeadlineState', () => {
  it('returns "active" when more than 7 days remain and no extension', () => {
    // Alfred closes 2026-04-27. Evaluate 2026-04-15 → 12+ days remain.
    const result = getDeadlineState(ALFRED, new Date('2026-04-15T00:00:00Z'));
    expect(result.state).toBe('active');
    expect(result.daysRemaining).toBeGreaterThan(7);
  });

  it('returns "closing-soon" when 7 or fewer days remain', () => {
    // Alfred closes 2026-04-27. Evaluate 2026-04-22 → ~5 days remain.
    const result = getDeadlineState(ALFRED, new Date('2026-04-22T00:00:00Z'));
    expect(result.state).toBe('closing-soon');
    expect(result.daysRemaining).toBeGreaterThan(0);
    expect(result.daysRemaining).toBeLessThanOrEqual(7);
  });

  it('returns "closed" once the close-date end-of-day AEST has passed', () => {
    // Alfred closes 2026-04-27. Evaluate 2026-05-01 → past closure.
    const result = getDeadlineState(ALFRED, new Date('2026-05-01T00:00:00Z'));
    expect(result.state).toBe('closed');
    expect(result.daysRemaining).toBeLessThanOrEqual(0);
  });

  it('returns the program record alongside the state', () => {
    const result = getDeadlineState(NARELLE, new Date('2026-04-15T00:00:00Z'));
    expect(result.program.key).toBe(NARELLE);
    expect(result.program.lgaList).toContain('Exmouth');
  });

  it('produces an Australian-formatted closeDateLabel', () => {
    const result = getDeadlineState(ALFRED, new Date('2026-04-15T00:00:00Z'));
    // toLocaleDateString en-AU with timeZone Australia/Brisbane → "27 April 2026"
    expect(result.closeDateLabel).toMatch(/^\d{1,2} April 2026$/);
  });
});

describe('deadlineStatusText', () => {
  it('says "This program has closed." once the deadline passes', () => {
    const text = deadlineStatusText(ALFRED, new Date('2026-05-01T00:00:00Z'));
    expect(text).toBe('This program has closed.');
  });

  it('mentions the close date when active', () => {
    const text = deadlineStatusText(ALFRED, new Date('2026-04-15T00:00:00Z'));
    expect(text).toMatch(/Applications close .* AEST\.$/);
  });

  it('uses singular "day" when exactly 1 day remains', () => {
    // closeDate 2026-04-27 end-of-day AEST = 2026-04-27 14:00Z.
    // Evaluate at 2026-04-26 18:00Z → ~20h remaining → daysRemaining ceils to 1.
    const text = deadlineStatusText(ALFRED, new Date('2026-04-26T18:00:00Z'));
    expect(text).toMatch(/Closing soon — 1 day remaining\./);
    expect(text).not.toMatch(/1 days/);
  });

  it('uses plural "days" when more than 1 day remains', () => {
    const text = deadlineStatusText(ALFRED, new Date('2026-04-22T00:00:00Z'));
    expect(text).toMatch(/Closing soon — \d+ days remaining\./);
  });
});
