/**
 * Vitest Batch 2 (DR-791) — observability surface characterisation tests.
 *
 * Complements the existing request-logger.test.ts and vercel.test.ts with
 * five higher-level tests that organise around the contract callers actually
 * rely on: a logger object with a stable shape, a unique requestId per call,
 * captureException tolerance for non-Error inputs, and PII-shaped extras
 * not crashing the wrapper.
 *
 * We do NOT assert PII redaction here — that lives in src/lib/compliance/*
 * and has its own tests. The contract this file recognises is:
 * "captureException is a forgiving entry point; redaction is a layered concern".
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { requestLogger } from '../request-logger';
import { captureException } from '../vercel';

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request('https://example.test/api/observability-batch-2', { headers });
}

describe('observability — requestLogger contract', () => {
  it('returns an object with info/warn/error and a string requestId', () => {
    const log = requestLogger(makeRequest(), { route: '/x' });

    expect(log).toMatchObject({
      info: expect.any(Function),
      warn: expect.any(Function),
      error: expect.any(Function),
    });
    expect(typeof log.requestId).toBe('string');
    expect(log.requestId.length).toBeGreaterThan(0);
  });

  it('generates a unique requestId per call when no header is supplied', () => {
    const a = requestLogger(makeRequest(), { route: '/a' });
    const b = requestLogger(makeRequest(), { route: '/b' });
    // randomUUID() collisions are astronomically unlikely; this characterises
    // that we are NOT reusing a module-level id across calls.
    expect(a.requestId).not.toBe(b.requestId);
  });

  it('includes the bound context (requestId + route) in the structured log line', () => {
    // Spy on console.log because the fallback path emits JSON there for
    // non-error levels. The shared logger may also be invoked, but at minimum
    // the call must not throw and must surface the request_id somewhere.
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const log = requestLogger(makeRequest({ 'x-request-id': 'batch-2-rid' }), {
      route: '/api/test',
    });
    log.info('hello batch 2', { foo: 'bar' });

    // Either spy may have been called depending on logger delegation.
    const allCalls = [...logSpy.mock.calls, ...errSpy.mock.calls]
      .flat()
      .map((c) => (typeof c === 'string' ? c : JSON.stringify(c)))
      .join(' ');
    expect(allCalls).toContain('batch-2-rid');

    logSpy.mockRestore();
    errSpy.mockRestore();
  });
});

describe('observability — captureException tolerance', () => {
  // Quiet the fallback console.error so the suite output stays readable.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not throw when called with various error shapes', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      captureException(new Error('real error'));
      captureException('plain string error');
      captureException(undefined);
      captureException({ weird: 'object', not: 'an Error' });
      captureException(42);
      captureException(null);
    }).not.toThrow();
  });

  it('does not crash when extras contain PII-shaped fields', () => {
    // We are NOT asserting redaction; we are asserting that handing the
    // wrapper PII-shaped data does not blow up. Redaction is the caller's
    // responsibility per .claude/rules/privacy.md §3.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      captureException(new Error('processing failure'), {
        tags: { route: '/api/claim' },
        user: { id: 'u-1', email: 'jane@example.com' },
        extra: {
          email: 'jane@example.com',
          phone: '0400 000 000',
          address: '123 Example Street, Brisbane QLD 4000',
          notes: 'Customer reported water damage in the kitchen.',
        },
      });
    }).not.toThrow();
  });
});
