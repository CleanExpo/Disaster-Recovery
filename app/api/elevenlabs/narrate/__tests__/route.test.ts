/**
 * Billing-boundary tests for the paid /api/elevenlabs/narrate endpoint.
 *
 * The endpoint performs a metered ElevenLabs fetch. A direct POST must be
 * rejected BEFORE that fetch when the demo surface is disabled, and rate-limited
 * per IP when enabled — otherwise it is an open metered-cost abuse primitive
 * (gating only the /demo page does NOT protect the API).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/observability', () => ({
  requestLogger: () => ({ requestId: 'req_test', info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
  captureException: vi.fn(),
}));
vi.mock('@/lib/compliance/events', () => ({
  logComplianceEvent: vi.fn(async () => {}),
}));

import { POST } from '../route';

const fetchSpy = vi.fn();

function makeRequest(ip: string) {
  return new NextRequest('http://localhost/api/elevenlabs/narrate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify({ text: 'bill me' }),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  fetchSpy.mockResolvedValue({ ok: true, body: null });
  vi.stubGlobal('fetch', fetchSpy);
  process.env.ELEVENLABS_API_KEY = 'test-key'; // ensure the paid path would run if not gated
  delete process.env.ENABLE_DEMO_FORMS;
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.ENABLE_DEMO_FORMS;
});

describe('narrate billing boundary', () => {
  it('rejects a direct POST with 404 and never calls ElevenLabs when the demo flag is unset', async () => {
    const res = await POST(makeRequest('20.0.0.1'));
    expect(res.status).toBe(404);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rate-limits per IP once the demo flag is enabled', async () => {
    process.env.ENABLE_DEMO_FORMS = 'true';
    const ip = '20.9.9.9';
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(ip));
      expect(res.status).not.toBe(429);
    }
    const fetchesBefore = fetchSpy.mock.calls.length;
    const blocked = await POST(makeRequest(ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('Retry-After')).toBeTruthy();
    // The rate-limited request must not reach the paid fetch.
    expect(fetchSpy.mock.calls.length).toBe(fetchesBefore);
  });
});
