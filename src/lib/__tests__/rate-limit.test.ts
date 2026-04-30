/**
 * Unit tests for src/lib/rate-limit.ts
 *
 * Sliding-window in-memory rate limiter — 5 requests / 60 seconds /
 * (key + ip) bucket. Module-level state is intentional but means
 * tests must use unique IPs per test to avoid cross-test bleed.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { rateLimit } from '../rate-limit';

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-30T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows the first request', async () => {
    const result = await rateLimit('1.1.1.1', 'test-allow-first');
    expect(result.allowed).toBe(true);
  });

  it('allows up to 5 requests in the window', async () => {
    for (let i = 0; i < 5; i++) {
      const result = await rateLimit('2.2.2.2', 'test-allow-five');
      expect(result.allowed, `request ${i + 1}`).toBe(true);
    }
  });

  it('blocks the 6th request and surfaces a retryAfter (seconds)', async () => {
    for (let i = 0; i < 5; i++) {
      await rateLimit('3.3.3.3', 'test-block-sixth');
    }
    const sixth = await rateLimit('3.3.3.3', 'test-block-sixth');
    expect(sixth.allowed).toBe(false);
    expect(sixth.retryAfter).toBeGreaterThan(0);
    expect(sixth.retryAfter).toBeLessThanOrEqual(60);
  });

  it('namespaces buckets by key (different keys are independent)', async () => {
    for (let i = 0; i < 5; i++) await rateLimit('4.4.4.4', 'key-a');
    // key-a is now full; key-b for the same IP should still be allowed.
    const result = await rateLimit('4.4.4.4', 'key-b');
    expect(result.allowed).toBe(true);
  });

  it('namespaces buckets by IP (different IPs are independent)', async () => {
    for (let i = 0; i < 5; i++) await rateLimit('5.5.5.5', 'shared-key');
    const otherIp = await rateLimit('6.6.6.6', 'shared-key');
    expect(otherIp.allowed).toBe(true);
  });

  it('allows another request once the window slides past', async () => {
    for (let i = 0; i < 5; i++) await rateLimit('7.7.7.7', 'window-expiry');

    // Advance past the 60-second window.
    vi.advanceTimersByTime(61_000);

    const afterWindow = await rateLimit('7.7.7.7', 'window-expiry');
    expect(afterWindow.allowed).toBe(true);
  });
});
