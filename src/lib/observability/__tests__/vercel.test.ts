/**
 * Unit tests for the Vercel-native observability wrapper (Vitest).
 */

import { describe, it, expect, afterEach } from 'vitest';
import { trace, type Span, type Attributes } from '@opentelemetry/api';
import { captureException, captureMessage, setUser, setTag } from '../vercel';

describe('observability/vercel — no active span', () => {
  it('captureException does not throw', () => {
    expect(() => {
      captureException(new Error('boom'));
      captureException('string-error');
      captureException(new Error('boom'), { tags: { route: '/x' }, user: { id: 'u1' } });
    }).not.toThrow();
  });

  it('captureMessage does not throw', () => {
    expect(() => {
      captureMessage('hello');
      captureMessage('hello', { tags: { a: 'b' }, extra: { n: 1 } });
    }).not.toThrow();
  });

  it('setUser(null) and setUser({...}) and setTag do not throw', () => {
    expect(() => {
      setUser(null);
      setUser({ id: 'u1', email: 'u@example.test' });
      setTag('route', '/x');
    }).not.toThrow();
  });
});

describe('observability/vercel — with a fake active span', () => {
  const traceApi = trace as unknown as { getActiveSpan: () => Span | undefined };
  const originalGetActiveSpan = traceApi.getActiveSpan;

  afterEach(() => {
    traceApi.getActiveSpan = originalGetActiveSpan;
  });

  function installFakeSpan() {
    const attrs: Record<string, unknown> = {};
    const state: { recordedException: unknown; statusCode: number | null } = {
      recordedException: null,
      statusCode: null,
    };

    const fakeSpan: Partial<Span> = {
      recordException(err) {
        state.recordedException = err;
      },
      setAttribute(k: string, v: unknown) {
        attrs[k] = v;
        return this as Span;
      },
      setAttributes(a: Attributes) {
        Object.assign(attrs, a);
        return this as Span;
      },
      addEvent() {
        return this as Span;
      },
      setStatus(s) {
        state.statusCode = s.code;
        return this as Span;
      },
      end() {},
      isRecording() {
        return true;
      },
      spanContext() {
        return { traceId: 't', spanId: 's', traceFlags: 1 };
      },
      updateName() {
        return this as Span;
      },
    };

    traceApi.getActiveSpan = () => fakeSpan as Span;
    return { attrs, state };
  }

  it('records exception on the active span and tags/extras are attached', () => {
    const { attrs, state } = installFakeSpan();

    captureException(new Error('kaboom'), {
      tags: { route: '/api/x' },
      user: { id: 'u-42' },
      extra: { reqId: 'abc' },
    });

    expect(state.recordedException).toBeInstanceOf(Error);
    expect((state.recordedException as Error).message).toBe('kaboom');
    expect(attrs['dr.route']).toBe('/api/x');
    expect(attrs['enduser.id']).toBe('u-42');
    expect(attrs['dr.extra.reqId']).toBe('abc');
    expect(state.statusCode).toBe(2); // OTel SpanStatusCode.ERROR
  });
});
