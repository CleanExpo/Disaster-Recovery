/**
 * Smoke test for the Vercel-native observability wrapper.
 * Run with: npx tsx src/lib/observability/__tests__/vercel.test.ts
 */

import { trace, type Span, type Attributes } from '@opentelemetry/api';
import { captureException, captureMessage, setUser, setTag } from '../vercel';

let failures = 0;
function assert(cond: unknown, label: string): void {
  if (cond) {
    // eslint-disable-next-line no-console
    console.log(`  PASS  ${label}`);
  } else {
    // eslint-disable-next-line no-console
    console.error(`  FAIL  ${label}`);
    failures += 1;
  }
}

// 1. captureException doesn't throw without an active span.
{
  let threw = false;
  try {
    captureException(new Error('boom'));
    captureException('string-error');
    captureException(new Error('boom'), { tags: { route: '/x' }, user: { id: 'u1' } });
  } catch {
    threw = true;
  }
  assert(!threw, 'captureException does not throw without active span');
}

// 2. captureMessage doesn't throw.
{
  let threw = false;
  try {
    captureMessage('hello');
    captureMessage('hello', { tags: { a: 'b' }, extra: { n: 1 } });
  } catch {
    threw = true;
  }
  assert(!threw, 'captureMessage does not throw without active span');
}

// 3. setUser(null) and setTag don't throw without an active span.
{
  let threw = false;
  try {
    setUser(null);
    setUser({ id: 'u1', email: 'u@example.test' });
    setTag('route', '/x');
  } catch {
    threw = true;
  }
  assert(!threw, 'setUser / setTag do not throw without active span');
}

// 4. captureException records to the active span when one exists.
//    (The global NoopContextManager doesn't propagate span contexts without a
//    real SDK, so we stub trace.getActiveSpan directly to simulate the on-Vercel
//    runtime where @vercel/otel has installed a real context manager.)
{
  const attrs: Record<string, unknown> = {};
  let recordedException: unknown = null;
  let statusCode: number | null = null;

  const fakeSpan: Partial<Span> = {
    recordException(err) {
      recordedException = err;
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
      statusCode = s.code;
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

  const traceApi = trace as unknown as { getActiveSpan: () => Span | undefined };
  const originalGetActiveSpan = traceApi.getActiveSpan;
  traceApi.getActiveSpan = () => fakeSpan as Span;

  try {
    captureException(new Error('kaboom'), {
      tags: { route: '/api/x' },
      user: { id: 'u-42' },
      extra: { reqId: 'abc' },
    });
  } finally {
    traceApi.getActiveSpan = originalGetActiveSpan;
  }

  assert(
    recordedException instanceof Error && (recordedException as Error).message === 'kaboom',
    'records exception on active span',
  );
  assert(attrs['dr.route'] === '/api/x', 'writes tag as dr.* attribute');
  assert(attrs['enduser.id'] === 'u-42', 'writes user id as enduser.id attribute');
  assert(attrs['dr.extra.reqId'] === 'abc', 'writes extras under dr.extra.* namespace');
  assert(statusCode === 2, 'sets span status to ERROR (2)');
}

if (failures > 0) {
  // eslint-disable-next-line no-console
  console.error(`\n${failures} failing assertion(s)`);
  process.exit(1);
} else {
  // eslint-disable-next-line no-console
  console.log('\nAll assertions passed.');
}
