/**
 * Abuse-hardening tests for the public /api/leads/capture endpoint.
 *
 * This endpoint is unauthenticated and triggers billable/notifying downstream
 * actions (PartnerBilling.create + partner/admin emails). These tests encode the
 * hardening contract:
 *   (a) malformed / oversized / missing-field payloads are rejected with 400
 *   (b) rapid repeated submissions from the same IP are rate-limited (429)
 *   (c) a duplicate submission (same email+phone within the dedupe window) does
 *       NOT create a second lead and does NOT re-trigger the downstream billing/email
 *
 * All I/O collaborators are mocked so a real DB / email call would surface loudly.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// --- Mock collaborators -----------------------------------------------------
const leadCreate = vi.fn(async (args: any) => ({ id: 'lead_new_1', ...args.data }));
const leadUpdate = vi.fn(async () => ({}));
const leadFindFirst = vi.fn(async () => null); // no prior lead by default
const partnerBillingCreate = vi.fn(async () => ({}));
const leadTrackingCreate = vi.fn(async () => ({}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      create: (a: any) => leadCreate(a),
      update: (a: any) => leadUpdate(a),
      findFirst: (a: any) => leadFindFirst(a),
    },
    partnerBilling: { create: (a: any) => partnerBillingCreate(a) },
    leadTracking: { create: (a: any) => leadTrackingCreate(a) },
  },
}));

const sendEmail = vi.fn(async () => ({}));
vi.mock('@/lib/email', () => ({
  sendEmail: (...a: any[]) => sendEmail(...a),
  emailTemplates: {
    partnerLeadAssignment: () => ({}),
    leadNotification: () => ({}),
  },
}));

const assignLeadToPartner = vi.fn(async () => null); // unassigned by default
vi.mock('@/lib/lead-management', () => ({
  calculateLeadValue: () => 500,
  assignLeadToPartner: (...a: any[]) => assignLeadToPartner(...a),
}));

vi.mock('@/lib/observability', () => ({
  requestLogger: () => ({
    requestId: 'req_test',
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
  captureException: vi.fn(),
}));

vi.mock('@/lib/compliance/events', () => ({
  logComplianceEvent: vi.fn(async () => {}),
  hashIdentifier: (s: string) => `hash(${s})`,
}));

import { POST } from '../route';

// --- Helpers ----------------------------------------------------------------
// A payload that scores >= 50 so it passes the existing quality gate and
// reaches the create path (lets us prove dedupe short-circuits it).
function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    fullName: 'Jane Smith',
    phone: '0400000000',
    email: 'jane@example.com',
    propertyType: 'residential',
    propertyAddress: '1 Test St',
    suburb: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    damageType: ['Fire/Smoke Damage'],
    damageDate: '2026-07-01',
    damageDescription: 'Kitchen fire damage across the ground floor.',
    estimatedAreaAffected: 'multiple_rooms',
    hasInsurance: true,
    insuranceCompany: 'AAMI',
    claimNumber: 'CLM123',
    urgencyLevel: 'emergency',
    propertyValue: '1500000',
    isBusinessProperty: true,
    requiresAccommodation: true,
    hasPhotos: true,
    readyToStart: 'immediately',
    decisionMaker: true,
    source: 'test',
    ...overrides,
  };
}

function makeRequest(body: unknown, ip: string) {
  return new NextRequest('http://localhost/api/leads/capture', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  leadFindFirst.mockResolvedValue(null);
  assignLeadToPartner.mockResolvedValue(null);
});

// --- (a) input validation ---------------------------------------------------
describe('input validation', () => {
  it('rejects a payload missing required fields with 400 + schema error', async () => {
    const res = await POST(makeRequest({ email: 'x@y.com' }, '10.0.0.1'));
    expect(res.status).toBe(400);
    const json: any = await res.json();
    expect(json.success).toBe(false);
    expect(Array.isArray(json.errors)).toBe(true);
    expect(json.errors.length).toBeGreaterThan(0);
    // must never reach the DB create on invalid input
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it('rejects an oversized field with 400 and does not hit the database', async () => {
    const res = await POST(
      makeRequest(validPayload({ damageDescription: 'A'.repeat(20_000) }), '10.0.0.2'),
    );
    expect(res.status).toBe(400);
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it('rejects a malformed email with 400', async () => {
    const res = await POST(makeRequest(validPayload({ email: 'not-an-email' }), '10.0.0.3'));
    expect(res.status).toBe(400);
    expect(leadCreate).not.toHaveBeenCalled();
  });
});

// --- (b) rate limiting ------------------------------------------------------
describe('rate limiting', () => {
  it('returns 429 after the per-IP request quota is exceeded', async () => {
    const ip = '10.9.9.9';
    // The shared limiter allows 5 requests / 60s / IP. Fire 5 (allowed),
    // vary the email so dedupe never short-circuits, then the 6th must 429.
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validPayload({ email: `flood${i}@example.com` }), ip));
      expect(res.status).not.toBe(429);
    }
    const blocked = await POST(makeRequest(validPayload({ email: 'flood-final@example.com' }), ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('Retry-After')).toBeTruthy();
  });
});

// --- (c) idempotency / dedupe ----------------------------------------------
describe('duplicate submission dedupe', () => {
  it('does not create a second lead or re-trigger downstream billing/email for a duplicate', async () => {
    const ip = '10.5.5.5';
    // First submission: no prior lead -> creates + downstream runs.
    assignLeadToPartner.mockResolvedValue({ id: 'p1', email: 'p@x.com', businessName: 'P' });
    const first = await POST(makeRequest(validPayload(), ip));
    expect(first.status).toBe(200);
    expect(leadCreate).toHaveBeenCalledTimes(1);
    const emailCallsAfterFirst = sendEmail.mock.calls.length;
    const billingCallsAfterFirst = partnerBillingCreate.mock.calls.length;
    expect(billingCallsAfterFirst).toBeGreaterThan(0);

    // Second, identical submission within the window: the route should find the
    // prior lead and short-circuit.
    leadFindFirst.mockResolvedValue({ id: 'lead_new_1', createdAt: new Date() });
    const second = await POST(makeRequest(validPayload(), ip));
    const json: any = await second.json();
    expect(second.status).toBe(200);
    expect(json.duplicate).toBe(true);
    expect(json.leadId).toBe('lead_new_1');
    // No second create, no additional billing, no additional emails.
    expect(leadCreate).toHaveBeenCalledTimes(1);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingCallsAfterFirst);
    expect(sendEmail.mock.calls.length).toBe(emailCallsAfterFirst);
  });
});
