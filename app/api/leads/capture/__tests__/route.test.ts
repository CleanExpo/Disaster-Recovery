/**
 * Abuse-hardening tests for the public /api/leads/capture endpoint.
 *
 * This endpoint is unauthenticated and triggers billable/notifying downstream
 * actions (PartnerBilling.create + partner/admin emails). These tests encode the
 * hardening contract:
 *   (a) malformed / oversized / missing-field / out-of-enum payloads -> 400
 *   (b) rapid repeated submissions from the same IP are rate-limited (429), and
 *       the rate-limited request performs NO downstream side effects
 *   (c) a duplicate submission does NOT create a second lead / re-bill / re-email,
 *       including the CONCURRENT case where both requests pass the pre-check and
 *       the DB unique index (P2002) is the only thing that saves us
 *
 * All I/O collaborators are mocked so a real DB / email call would surface loudly.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// --- Mock collaborators -----------------------------------------------------
const leadCreate = vi.fn(async (args: any) => ({ id: 'lead_new_1', ...args.data }));
const leadUpdate = vi.fn(async () => ({}));
const leadFindFirst = vi.fn(async () => null as any);
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

const assignLeadToPartner = vi.fn(async () => null as any);
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
  leadCreate.mockImplementation(async (args: any) => ({ id: 'lead_new_1', ...args.data }));
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

  it('rejects empty / out-of-enum values that previously passed', async () => {
    const cases: Array<Record<string, unknown>> = [
      { propertyValue: '' }, // empty numeric string
      { damageType: [''] }, // empty damage entry
      { state: 'ZZ' }, // not a real state
      { urgencyLevel: 'whenever' }, // not an urgency enum
      { propertyType: 'castle' }, // not a property enum
      { readyToStart: 'someday' }, // not a readiness enum
      { postcode: 'ABCD' }, // not 4 digits
      { phone: '123' }, // not an AU phone
    ];
    let i = 0;
    for (const patch of cases) {
      const res = await POST(makeRequest(validPayload(patch), `10.1.0.${i++}`));
      expect(res.status, `expected 400 for ${JSON.stringify(patch)}`).toBe(400);
    }
    expect(leadCreate).not.toHaveBeenCalled();
  });
});

// --- (b) rate limiting ------------------------------------------------------
describe('rate limiting', () => {
  it('returns 429 after the quota and performs no side effects on the blocked request', async () => {
    const ip = '10.9.9.9';
    assignLeadToPartner.mockResolvedValue({ id: 'p1', email: 'p@x.com', businessName: 'P' });
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validPayload({ email: `flood${i}@example.com` }), ip));
      expect(res.status).not.toBe(429);
    }
    // Snapshot side-effect counts, then fire the request that must be blocked.
    const createsBefore = leadCreate.mock.calls.length;
    const billingBefore = partnerBillingCreate.mock.calls.length;
    const emailsBefore = sendEmail.mock.calls.length;

    const blocked = await POST(makeRequest(validPayload({ email: 'flood-final@example.com' }), ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('Retry-After')).toBeTruthy();
    // No lead, no billing, no email for the rate-limited request.
    expect(leadCreate.mock.calls.length).toBe(createsBefore);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingBefore);
    expect(sendEmail.mock.calls.length).toBe(emailsBefore);
  });
});

// --- (c) idempotency / dedupe ----------------------------------------------
describe('duplicate submission dedupe', () => {
  it('sequential replay: short-circuits before create, no downstream', async () => {
    const ip = '10.5.5.5';
    assignLeadToPartner.mockResolvedValue({ id: 'p1', email: 'p@x.com', businessName: 'P' });
    const first = await POST(makeRequest(validPayload(), ip));
    expect(first.status).toBe(200);
    expect(leadCreate).toHaveBeenCalledTimes(1);
    const emailsAfterFirst = sendEmail.mock.calls.length;
    const billingAfterFirst = partnerBillingCreate.mock.calls.length;
    expect(billingAfterFirst).toBeGreaterThan(0);

    // Pre-check now finds the prior lead by dedupeKey.
    leadFindFirst.mockResolvedValue({ id: 'lead_new_1' });
    const second = await POST(makeRequest(validPayload(), ip));
    const json: any = await second.json();
    expect(second.status).toBe(200);
    expect(json.duplicate).toBe(true);
    expect(json.leadId).toBe('lead_new_1');
    expect(leadCreate).toHaveBeenCalledTimes(1);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingAfterFirst);
    expect(sendEmail.mock.calls.length).toBe(emailsAfterFirst);
  });

  it('concurrent double-submit: DB unique violation yields exactly one lead/bill/email', async () => {
    const ip = '10.6.6.6';
    assignLeadToPartner.mockResolvedValue({ id: 'p1', email: 'p@x.com', businessName: 'P' });

    // Both requests pass the pre-check (neither sees the other), then the P2002
    // lookup returns the winning lead.
    leadFindFirst
      .mockResolvedValueOnce(null) // req1 pre-check
      .mockResolvedValueOnce(null) // req2 pre-check
      .mockResolvedValueOnce({ id: 'lead_new_1' }); // req2 P2002 lookup

    // req1 create succeeds; req2 create loses the race with a unique violation.
    leadCreate
      .mockImplementationOnce(async (args: any) => ({ id: 'lead_new_1', ...args.data }))
      .mockImplementationOnce(async () => {
        throw { code: 'P2002', message: 'Unique constraint failed on dedupeKey' };
      });

    const first = await POST(makeRequest(validPayload(), ip));
    expect(first.status).toBe(200);
    const billingAfterFirst = partnerBillingCreate.mock.calls.length;
    const emailsAfterFirst = sendEmail.mock.calls.length;
    expect(billingAfterFirst).toBe(1);

    const second = await POST(makeRequest(validPayload(), ip));
    const json: any = await second.json();
    expect(second.status).toBe(200);
    expect(json.duplicate).toBe(true);
    expect(json.leadId).toBe('lead_new_1');

    // Both creates were ATTEMPTED, but only one billable row + one email set.
    expect(leadCreate).toHaveBeenCalledTimes(2);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingAfterFirst);
    expect(sendEmail.mock.calls.length).toBe(emailsAfterFirst);
  });
});
