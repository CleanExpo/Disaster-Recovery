/**
 * Unit tests for observability primitives (Vitest).
 */

import { describe, it, expect } from 'vitest';
import { requestLogger } from '../request-logger';
import { captureException, captureMessage } from '../vercel';

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request('https://example.test/api/x', { headers });
}

describe('requestLogger', () => {
  it('returns a logger with a requestId and level methods', () => {
    const log = requestLogger(makeRequest(), { route: '/x' });
    expect(typeof log.requestId).toBe('string');
    expect(log.requestId.length).toBeGreaterThan(0);
    expect(typeof log.info).toBe('function');
    expect(typeof log.warn).toBe('function');
    expect(typeof log.error).toBe('function');
    expect(typeof log.debug).toBe('function');
  });

  it('reads x-request-id header when present', () => {
    const log = requestLogger(makeRequest({ 'x-request-id': 'abc-123' }), { route: '/x' });
    expect(log.requestId).toBe('abc-123');
  });

  it('falls back to x-vercel-id when x-request-id absent', () => {
    const log = requestLogger(makeRequest({ 'x-vercel-id': 'ver-999' }), { route: '/x' });
    expect(log.requestId).toBe('ver-999');
  });

  it('generates a requestId when no header is present', () => {
    const log = requestLogger(makeRequest(), { route: '/x' });
    expect(log.requestId).toMatch(/.+/);
  });

  it('level methods never throw', () => {
    const log = requestLogger(makeRequest(), { route: '/x' });
    expect(() => {
      log.info('info msg', { k: 'v' });
      log.warn('warn msg');
      log.error('error msg', { error: new Error('boom') });
      log.debug('debug msg');
    }).not.toThrow();
  });
});

describe('vercel observability wrappers (no active span)', () => {
  it('captureException does not throw', () => {
    expect(() => {
      captureException(new Error('x'));
      captureException('plain string error');
    }).not.toThrow();
  });

  it('captureMessage does not throw', () => {
    expect(() => captureMessage('hello')).not.toThrow();
  });
});
