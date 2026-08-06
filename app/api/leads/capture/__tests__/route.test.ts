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
 *       INCLUDING two identical requests whose timestamps straddle a 10-minute
 *       boundary (the case the old fixed-bucket key got wrong)
 *
 * The prisma mock is store-backed so the advisory-lock transaction's window
 * dedupe is exercised for real; a live DB / email call would surface loudly.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// --- Store-backed prisma mock ----------------------------------------------
let leadStore: Array<{ id: string; createdAt: Date; email?: string; phone?: string; dedupeKey?: string }> = [];

const leadCreate = vi.fn(async (args: any) => {
  const lead = { id: `lead_${leadStore.length + 1}`, createdAt: new Date(Date.now()), ...args.data };
  leadStore.push(lead);
  return lead;
});
const leadUpdate = vi.fn(async () => ({}));

// Emulates prisma findFirst for the shapes this route uses: {dedupeKey} (legacy)
// and {email, phone, createdAt:{gte}} (current window dedupe).
function matchLead(args: any) {
  const w = args?.where ?? {};
  let c = leadStore.slice();
  if (w.dedupeKey !== undefined) c = c.filter((l) => l.dedupeKey === w.dedupeKey);
  if (w.email !== undefined) c = c.filter((l) => l.email === w.email);
  if (w.phone !== undefined) c = c.filter((l) => l.phone === w.phone);
  if (w.createdAt?.gte) c = c.filter((l) => l.createdAt >= w.createdAt.gte);
  c.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return c[0] ? { id: c[0].id } : null;
}
const leadFindFirst = vi.fn(async (args: any) => matchLead(args));

const partnerBillingCreate = vi.fn(async () => ({}));
const leadTrackingCreate = vi.fn(async () => ({}));
const execRaw = vi.fn(async () => 0);

const txClient = {
  lead: { findFirst: (a: any) => leadFindFirst(a), create: (a: any) => leadCreate(a) },
  $executeRaw: (...a: any[]) => execRaw(...a),
};

vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      create: (a: any) => leadCreate(a),
      update: (a: any) => leadUpdate(a),
      findFirst: (a: any) => leadFindFirst(a),
    },
    partnerBilling: { create: (a: any) => partnerBillingCreate(a) },
    leadTracking: { create: (a: any) => leadTrackingCreate(a) },
    $executeRaw: (...a: any[]) => execRaw(...a),
    $transaction: async (fn: any) => fn(txClient),
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
    propertyValue: '2000000',
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
  leadStore = [];
  leadCreate.mockImplementation(async (args: any) => {
    const lead = { id: `lead_${leadStore.length + 1}`, createdAt: new Date(Date.now()), ...args.data };
    leadStore.push(lead);
    return lead;
  });
  leadFindFirst.mockImplementation(async (args: any) => matchLead(args));
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
      { propertyValue: '' }, // empty
      { propertyValue: '999999999' }, // arbitrary digit string not in the fixed set
      { excessAmount: '7' }, // not a fixed excess bucket
      { budget: '123' }, // not a fixed budget bucket
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
    const createsBefore = leadCreate.mock.calls.length;
    const billingBefore = partnerBillingCreate.mock.calls.length;
    const emailsBefore = sendEmail.mock.calls.length;

    const blocked = await POST(makeRequest(validPayload({ email: 'flood-final@example.com' }), ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('Retry-After')).toBeTruthy();
    expect(leadCreate.mock.calls.length).toBe(createsBefore);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingBefore);
    expect(sendEmail.mock.calls.length).toBe(emailsBefore);
  });
});

// --- (c) idempotency / dedupe ----------------------------------------------
describe('duplicate submission dedupe', () => {
  it('sequential replay: short-circuits inside the lock, no downstream re-run', async () => {
    const ip = '10.5.5.5';
    assignLeadToPartner.mockResolvedValue({ id: 'p1', email: 'p@x.com', businessName: 'P' });
    const first = await POST(makeRequest(validPayload(), ip));
    expect(first.status).toBe(200);
    expect(leadCreate).toHaveBeenCalledTimes(1);
    const emailsAfterFirst = sendEmail.mock.calls.length;
    const billingAfterFirst = partnerBillingCreate.mock.calls.length;
    expect(billingAfterFirst).toBeGreaterThan(0);

    const second = await POST(makeRequest(validPayload(), ip));
    const json: any = await second.json();
    expect(second.status).toBe(200);
    expect(json.duplicate).toBe(true);
    expect(leadCreate).toHaveBeenCalledTimes(1);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingAfterFirst);
    expect(sendEmail.mock.calls.length).toBe(emailsAfterFirst);
  });

  it('across a 10-minute bucket boundary: two identical submits still yield exactly one lead/bill/email', async () => {
    // Two requests ~2ms apart but on opposite sides of a 10-minute boundary.
    // The old fixed-bucket key gave them different keys -> two bills. The
    // advisory-lock + recent-window guard collapses them to one.
    const WINDOW_MS = 10 * 60 * 1000;
    const boundary = WINDOW_MS * 3_000_000; // an exact bucket boundary in ms
    const tA = boundary - 1; // bucket N-1
    const tB = boundary + 1; // bucket N (different bucket, 2ms later)

    assignLeadToPartner.mockResolvedValue({ id: 'p1', email: 'p@x.com', businessName: 'P' });
    const nowSpy = vi.spyOn(Date, 'now');

    nowSpy.mockReturnValue(tA);
    const first = await POST(makeRequest(validPayload(), '10.7.7.7'));
    expect(first.status).toBe(200);
    expect(leadCreate).toHaveBeenCalledTimes(1);
    const billingAfterFirst = partnerBillingCreate.mock.calls.length;
    const emailsAfterFirst = sendEmail.mock.calls.length;
    expect(billingAfterFirst).toBe(1);

    nowSpy.mockReturnValue(tB);
    const second = await POST(makeRequest(validPayload(), '10.7.7.7'));
    const json: any = await second.json();
    expect(second.status).toBe(200);
    expect(json.duplicate).toBe(true);

    // Exactly one lead, one bill, one notification set — despite the boundary.
    expect(leadCreate).toHaveBeenCalledTimes(1);
    expect(partnerBillingCreate.mock.calls.length).toBe(billingAfterFirst);
    expect(sendEmail.mock.calls.length).toBe(emailsAfterFirst);

    nowSpy.mockRestore();
  });
});
