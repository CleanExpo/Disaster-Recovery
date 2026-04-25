/**
 * Unit tests for client-logger.
 *
 * Captures console.log / console.error to assert structured JSON output.
 * Mocks captureException to verify error forwarding semantics.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the vercel module BEFORE importing the logger.
vi.mock('../vercel', () => ({
  captureException: vi.fn(),
}));

import { clientLogger } from '../client-logger';
import { captureException } from '../vercel';

describe('clientLogger', () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (captureException as unknown as ReturnType<typeof vi.fn>).mockClear();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('info emits structured JSON via console.log', () => {
    clientLogger.info('hello', { source: 'test', extra: 1 });
    expect(logSpy).toHaveBeenCalledOnce();
    const line = logSpy.mock.calls[0]?.[0];
    expect(typeof line).toBe('string');
    const parsed = JSON.parse(String(line));
    expect(parsed.level).toBe('info');
    expect(parsed.msg).toBe('hello');
    expect(parsed.source).toBe('test');
    expect(parsed.extra).toBe(1);
  });

  it('debug routes to console.log', () => {
    clientLogger.debug('d', { source: 'test' });
    expect(logSpy).toHaveBeenCalledOnce();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('warn routes to console.error (not console.log)', () => {
    clientLogger.warn('w', { source: 'test' });
    expect(errorSpy).toHaveBeenCalledOnce();
    expect(logSpy).not.toHaveBeenCalled();
    const line = errorSpy.mock.calls[0]?.[0];
    const parsed = JSON.parse(String(line));
    expect(parsed.level).toBe('warn');
  });

  it('error routes to console.error and forwards to captureException when err is provided', () => {
    const err = new Error('boom');
    clientLogger.error('broken', { source: 'test', route: '/x' }, err);
    expect(errorSpy).toHaveBeenCalledOnce();
    const line = errorSpy.mock.calls[0]?.[0];
    const parsed = JSON.parse(String(line));
    expect(parsed.level).toBe('error');
    expect(parsed.error).toBe('boom');

    expect(captureException).toHaveBeenCalledOnce();
    const [passedErr, opts] = (captureException as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(passedErr).toBe(err);
    expect(opts?.tags?.source).toBe('test');
  });

  it('error does NOT forward to captureException when err is omitted', () => {
    clientLogger.error('no-err', { source: 'test' });
    expect(errorSpy).toHaveBeenCalledOnce();
    expect(captureException).not.toHaveBeenCalled();
  });
});
