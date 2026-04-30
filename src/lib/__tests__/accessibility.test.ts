/**
 * Unit tests for src/lib/accessibility.ts
 *
 * Covers the pure helpers and the screen-reader announcement DOM
 * helper. `trapFocus` requires a real focus chain and is exercised
 * indirectly via the focus-trap a11y suite (C12, planned).
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { generateHeadingId, announceToScreenReader, validationMessages } from '../accessibility';

describe('generateHeadingId', () => {
  it('lowercases the input', () => {
    expect(generateHeadingId('Water Damage Restoration')).toBe('water-damage-restoration');
  });

  it('replaces non-alphanumeric runs with a single hyphen', () => {
    expect(generateHeadingId("What's Next? 5 Steps!")).toBe('what-s-next-5-steps');
  });

  it('strips leading and trailing hyphens', () => {
    expect(generateHeadingId('---hello---')).toBe('hello');
    expect(generateHeadingId('!Mould!')).toBe('mould');
  });

  it('returns an empty string for fully non-alphanumeric input', () => {
    expect(generateHeadingId('!!!')).toBe('');
  });

  it('keeps digits and lowercase letters intact', () => {
    expect(generateHeadingId('IICRC S500 2024')).toBe('iicrc-s500-2024');
  });
});

describe('validationMessages', () => {
  it('exposes the required + email + postcode + pattern static strings', () => {
    expect(validationMessages.required).toMatch(/required/i);
    expect(validationMessages.email).toMatch(/email/i);
    expect(validationMessages.postcode).toMatch(/postcode/i);
    expect(validationMessages.pattern).toMatch(/format/i);
  });

  it('formats minLength + maxLength dynamically with the bound', () => {
    expect(validationMessages.minLength(5)).toBe('Must be at least 5 characters');
    expect(validationMessages.maxLength(140)).toBe('Must be no more than 140 characters');
  });
});

describe('announceToScreenReader', () => {
  let appendSpy: ReturnType<typeof vi.spyOn>;
  let removeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    appendSpy = vi.spyOn(document.body, 'appendChild');
    removeSpy = vi.spyOn(document.body, 'removeChild');
  });

  afterEach(() => {
    vi.useRealTimers();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('appends an aria-live="polite" region by default', () => {
    announceToScreenReader('Hello');
    expect(appendSpy).toHaveBeenCalledTimes(1);
    const node = appendSpy.mock.calls[0][0] as HTMLElement;
    expect(node.getAttribute('role')).toBe('status');
    expect(node.getAttribute('aria-live')).toBe('polite');
    expect(node.getAttribute('aria-atomic')).toBe('true');
    expect(node.className).toBe('sr-only');
    expect(node.textContent).toBe('Hello');
  });

  it('honours the assertive priority override', () => {
    announceToScreenReader('Urgent', 'assertive');
    const node = appendSpy.mock.calls[0][0] as HTMLElement;
    expect(node.getAttribute('aria-live')).toBe('assertive');
  });

  it('removes the announcement node 1 second later', () => {
    announceToScreenReader('Hello');
    expect(removeSpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
