/**
 * Server-side guard: /api/claims/submit refuses a claim unless the homeowner
 * ticked "I understand the contractor will quote a call-out fee that I pay to
 * them." and never records a Disaster Recovery fee amount.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const enquiryWrite = vi.fn();
const insuranceCreate = vi.fn();
const complianceLog = vi.fn();

vi.mock('@/lib/rate-limit', () => ({ rateLimit: vi.fn().mockResolvedValue({ allowed: true }) }));
vi.mock('@/lib/compliance/events', () => ({
  logComplianceEvent: (...args: unknown[]) => complianceLog(...args),
  hashIdentifier: () => 'hash',
}));
vi.mock('@/lib/claims/enquiry-fallback', () => ({
  writeEnquiryFromClaimBody: (...args: unknown[]) => enquiryWrite(...args),
}));
vi.mock('@/lib/auth/require-session', () => ({
  getCallerIdentity: vi.fn().mockResolvedValue({ role: 'anonymous' }),
}));
vi.mock('@/lib/encryption', () => ({
  encrypt: vi.fn(),
  decrypt: vi.fn(),
  isConfigured: () => true,
}));
vi.mock('@/lib/notifications', () => ({ dispatchClaimStatusNotification: vi.fn() }));
vi.mock('@/lib/email', () => ({ sendEmail: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@/lib/claim-support-pack', () => ({
  generateClaimSupportPackEmail: vi.fn().mockReturnValue({}),
}));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    insuranceClaimAU: { create: (...args: unknown[]) => insuranceCreate(...args) },
    enquiry: { findUnique: vi.fn().mockResolvedValue(null), update: vi.fn() },
  },
}));

const { POST } = await import('../route');

const baseClaim = {
  fullName: 'Joe Smith',
  email: 'joe@example.com',
  phone: '0412345678',
  propertyAddress: '42 Smith St',
  suburb: 'Brisbane',
  state: 'QLD',
  postcode: '4000',
  damageTypes: ['Water/Flood Damage'],
  damageDescription: 'burst pipe in kitchen',
  urgencyLevel: 'urgent',
};

function post(body: unknown) {
  return POST(
    new NextRequest('http://localhost/api/claims/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
      body: JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  enquiryWrite.mockReset().mockResolvedValue({
    enquiryId: 'enq-1',
    writtenAt: new Date().toISOString(),
  });
  insuranceCreate.mockReset().mockResolvedValue({ id: 'iclaim-1' });
  complianceLog.mockReset().mockResolvedValue(undefined);
});

describe('POST /api/claims/submit — call-out fee acknowledgement', () => {
  it.each([
    ['missing', baseClaim],
    ['false', { ...baseClaim, calloutFeeAcknowledged: false }],
    ['string "true"', { ...baseClaim, calloutFeeAcknowledged: 'true' }],
  ])('refuses the claim when the acknowledgement is %s', async (_label, body) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(enquiryWrite).not.toHaveBeenCalled();
    expect(insuranceCreate).not.toHaveBeenCalled();
  });

  it('accepts the claim, stores the acknowledgement and records no DR fee', async () => {
    const res = await post({ ...baseClaim, calloutFeeAcknowledged: true, paymentConfirmed: true });
    expect(res.status).toBe(201);

    expect(enquiryWrite).toHaveBeenCalledTimes(1);
    expect(enquiryWrite.mock.calls[0][1]).toMatchObject({ calloutFeeAcknowledged: true });

    const data = insuranceCreate.mock.calls[0][0].data;
    expect(data.totalClaimAmountAUD).toBe(0);
    expect(data.paymentAmountAUD).toBeNull();

    const intakeEvent = complianceLog.mock.calls
      .map(([e]) => e as { metadata?: Record<string, unknown> })
      .find((e) => e.metadata?.outcome === 'dual_write');
    expect(intakeEvent?.metadata?.callout_fee_acknowledged).toBe(true);
  });
});
