/**
 * Authorisation boundary tests for POST /api/payments/refund.
 *
 * The route issues real Stripe refunds, so it must be admin-only and must
 * only refund a payment that belongs to the booking named in the request.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

const mocks = vi.hoisted(() => {
  // The route picks the mock Stripe client only when no key is set.
  delete process.env.STRIPE_SECRET_KEY;
  return {
    refundsCreate: vi.fn(),
    requireAdmin: vi.fn(),
    paymentFindFirst: vi.fn(),
    paymentUpdateMany: vi.fn(),
  };
});

vi.mock('@/lib/services/mock/mockStripe', () => ({
  getMockStripe: () => ({ refunds: { create: mocks.refundsCreate } }),
}));
vi.mock('@/lib/admin-auth', () => ({ requireAdmin: mocks.requireAdmin }));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    payment: { findFirst: mocks.paymentFindFirst, updateMany: mocks.paymentUpdateMany },
  },
}));
vi.mock('@/lib/observability', () => ({
  requestLogger: () => ({ requestId: 'req_test', info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
  captureException: vi.fn(),
}));
vi.mock('@/lib/compliance/events', () => ({
  logComplianceEvent: vi.fn(async () => {}),
}));

import { POST } from '../route';

const body = {
  bookingId: 'booking_1',
  paymentIntentId: 'pi_123',
  reason: 'other',
  amount: 5000,
  customerEmail: 'customer@example.com',
  customerName: 'Customer',
  bookingDate: new Date().toISOString(),
};

function makeRequest() {
  return new NextRequest('http://localhost/api/payments/refund', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.refundsCreate.mockResolvedValue({ id: 're_1', status: 'succeeded' });
  mocks.paymentUpdateMany.mockResolvedValue({ count: 1 });
  mocks.requireAdmin.mockResolvedValue({
    user: { id: 'u1', email: 'admin@example.com', name: 'Admin', role: 'ADMIN' },
  });
  mocks.paymentFindFirst.mockResolvedValue({ id: 'pay_1' });
});

describe('refund route authorisation', () => {
  it('refuses a request with no session with 401 and never calls Stripe', async () => {
    mocks.requireAdmin.mockResolvedValue(
      NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    );
    const res = await POST(makeRequest());
    expect(res.status).toBe(401);
    expect(mocks.refundsCreate).toHaveBeenCalledTimes(0);
  });

  it('refuses a signed-in user who is not an admin with 403 and never calls Stripe', async () => {
    mocks.requireAdmin.mockResolvedValue(
      NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    );
    const res = await POST(makeRequest());
    expect(res.status).toBe(403);
    expect(mocks.refundsCreate).toHaveBeenCalledTimes(0);
  });

  it('refuses an admin request whose payment is not on the named booking and never calls Stripe', async () => {
    mocks.paymentFindFirst.mockResolvedValue(null);
    const res = await POST(makeRequest());
    expect(res.status).toBe(404);
    expect(mocks.paymentFindFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { stripePaymentIntentId: 'pi_123', bookingId: 'booking_1' },
      }),
    );
    expect(mocks.refundsCreate).toHaveBeenCalledTimes(0);
  });

  it('refunds for an admin when the payment belongs to the booking', async () => {
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(mocks.refundsCreate).toHaveBeenCalledTimes(1);
    expect(mocks.refundsCreate.mock.calls[0][0]).toMatchObject({ payment_intent: 'pi_123' });
  });
});
