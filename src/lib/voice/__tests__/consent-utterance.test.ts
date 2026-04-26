/**
 * Vitest Batch 3 — consent utterance invariants (audit goal C3).
 *
 * Guards the canonical APP 8 consent script + Sarah/Tannika opening
 * line against drift. Wording is load-bearing for compliance
 * (`.claude/rules/compliance.md` §3) — any change to these strings
 * MUST bump `CONSENT_UTTERANCE_VERSION` and re-run counsel review.
 *
 * NOT LEGAL ADVICE.
 */

import { describe, it, expect } from 'vitest';
import {
  CONSENT_UTTERANCE,
  CONSENT_UTTERANCE_VERSION,
  CLAIMS_ASSISTANT_INTRO,
} from '../consent-utterance';

describe('CONSENT_UTTERANCE (APP 8 gate)', () => {
  it('opens with the canonical "Hi, you\'ve reached Disaster Recovery" greeting', () => {
    expect(CONSENT_UTTERANCE.startsWith("Hi, you've reached Disaster Recovery")).toBe(true);
  });

  it('mentions the canonical "press 0" opt-out path (guards against inverted opt-in)', () => {
    // Per compliance.md §3: opt-out is press-0 / "say no" / silence.
    // A previous draft inverted this to opt-IN; this assertion stops
    // a regression that would silently re-introduce the inversion.
    expect(CONSENT_UTTERANCE).toContain('press 0');
  });
});

describe('CONSENT_UTTERANCE_VERSION', () => {
  it('matches the vN.N-YYYY-MM-DD pin format', () => {
    expect(CONSENT_UTTERANCE_VERSION).toMatch(/^v\d+\.\d+-\d{4}-\d{2}-\d{2}$/);
  });
});

describe('CLAIMS_ASSISTANT_INTRO (Sarah/Tannika opener)', () => {
  it('contains "NRPG" network reference and the "general guidance" hedge', () => {
    // ACL s18/s29 + NCCP Reg 25 hedge — Sarah must NOT imply legal
    // or insurance advice. The intro frames her output as "general
    // guidance ... not legal or insurance advice".
    expect(CLAIMS_ASSISTANT_INTRO).toContain('NRPG');
    expect(CLAIMS_ASSISTANT_INTRO).toContain('general guidance');
  });
});
