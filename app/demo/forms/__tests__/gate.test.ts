/**
 * The public /demo/forms page drives the billable /api/elevenlabs/narrate
 * endpoint with mock data and has no business value to anonymous visitors.
 * It must be gated behind an env flag so it is not publicly exploitable.
 */
import { describe, it, expect } from 'vitest';
import { demoFormsEnabled } from '../gate';

describe('demoFormsEnabled', () => {
  it('is disabled by default when the flag is unset', () => {
    expect(demoFormsEnabled({})).toBe(false);
  });

  it('is disabled for any value other than the explicit opt-in', () => {
    expect(demoFormsEnabled({ ENABLE_DEMO_FORMS: '' })).toBe(false);
    expect(demoFormsEnabled({ ENABLE_DEMO_FORMS: 'false' })).toBe(false);
    expect(demoFormsEnabled({ ENABLE_DEMO_FORMS: '1' })).toBe(false);
  });

  it('is enabled only when explicitly set to "true"', () => {
    expect(demoFormsEnabled({ ENABLE_DEMO_FORMS: 'true' })).toBe(true);
  });
});
