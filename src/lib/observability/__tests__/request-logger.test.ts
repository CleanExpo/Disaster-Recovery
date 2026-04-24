/**
 * Smoke test for observability primitives. Plain-TS assertion script.
 * Run with: npx tsx src/lib/observability/__tests__/request-logger.test.ts
 */

import { requestLogger } from '../request-logger';
import { captureException, captureMessage } from '../sentry';

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

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request('https://example.test/api/x', { headers });
}

// 1. requestLogger returns a logger with a requestId.
{
  const log = requestLogger(makeRequest(), { route: '/x' });
  assert(typeof log.requestId === 'string' && log.requestId.length > 0, 'requestLogger returns a requestId');
  assert(typeof log.info === 'function', 'returns info()');
  assert(typeof log.warn === 'function', 'returns warn()');
  assert(typeof log.error === 'function', 'returns error()');
  assert(typeof log.debug === 'function', 'returns debug()');
}

// 2. Honours x-request-id header when present.
{
  const log = requestLogger(makeRequest({ 'x-request-id': 'abc-123' }), { route: '/x' });
  assert(log.requestId === 'abc-123', 'reads x-request-id header');
}

// 3. Honours x-vercel-id as secondary source.
{
  const log = requestLogger(makeRequest({ 'x-vercel-id': 'ver-999' }), { route: '/x' });
  assert(log.requestId === 'ver-999', 'reads x-vercel-id header when x-request-id absent');
}

// 4. Level methods never throw, even on error input.
{
  const log = requestLogger(makeRequest(), { route: '/x' });
  let threw = false;
  try {
    log.info('info msg', { k: 'v' });
    log.warn('warn msg');
    log.error('error msg', { error: new Error('boom') });
    log.debug('debug msg');
  } catch {
    threw = true;
  }
  assert(!threw, 'log methods do not throw');
}

// 5. captureException is a no-op when SENTRY_DSN is unset.
{
  // SENTRY_DSN is assumed unset in test env.
  let threw = false;
  try {
    captureException(new Error('x'));
    captureException('plain string error');
    captureMessage('hello');
  } catch {
    threw = true;
  }
  assert(!threw, 'sentry stub functions do not throw');
}

if (failures > 0) {
  // eslint-disable-next-line no-console
  console.error(`\n${failures} failing assertion(s)`);
  process.exit(1);
} else {
  // eslint-disable-next-line no-console
  console.log('\nAll assertions passed.');
}
