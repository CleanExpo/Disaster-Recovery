import { prismaMock } from '@tests/mocks/prisma';
import { createMockRequest } from '@tests/utils/testHelpers';

const constructWebhookEventMock = jest.fn();

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/stripe', () => ({
  constructWebhookEvent: (...args: unknown[]) => constructWebhookEventMock(...args),
}));

describe('Stripe webhook API', () => {
  const originalWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
  });

  afterAll(() => {
    process.env.STRIPE_WEBHOOK_SECRET = originalWebhookSecret;
  });

  async function loadHandler() {
    const module = await import('@/app/api/stripe/webhook/route');
    return module.POST;
  }

  it('returns 400 when Stripe signature header is missing', async () => {
    const POST = await loadHandler();
    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/stripe/webhook',
      body: {},
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('returns 500 when STRIPE_WEBHOOK_SECRET is missing', async () => {
    const POST = await loadHandler();
    delete process.env.STRIPE_WEBHOOK_SECRET;

    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/stripe/webhook',
      headers: { 'stripe-signature': 'sig_test' },
      body: {},
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });

  it('marks NRPG callout as paid from checkout.session.completed', async () => {
    const POST = await loadHandler();
    constructWebhookEventMock.mockImplementation((payload: unknown) => JSON.parse(payload as string));

    const session = {
      id: 'cs_test_123',
      metadata: {
        type: 'NRPG_CALLOUT',
        serviceRequestId: 'sr_test_123',
        clientId: 'user_test_123',
      },
      payment_intent: 'pi_test_123',
    };

    const event = {
      id: 'evt_test_123',
      type: 'checkout.session.completed',
      data: { object: session },
    };

    prismaMock.serviceRequest.findUnique.mockResolvedValue({ userId: 'user_test_123' } as any);
    prismaMock.serviceRequestCalloutPayment.upsert.mockResolvedValue({ id: 'callout_test_123' } as any);

    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/stripe/webhook',
      headers: { 'stripe-signature': 'sig_test' },
      body: event,
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ received: true });

    expect(constructWebhookEventMock).toHaveBeenCalledTimes(1);
    expect(typeof constructWebhookEventMock.mock.calls[0]?.[0]).toBe('string');

    expect(prismaMock.serviceRequestCalloutPayment.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { serviceRequestId: 'sr_test_123' },
        update: expect.objectContaining({
          status: 'PAID',
          stripeCheckoutSessionId: 'cs_test_123',
          stripePaymentIntentId: 'pi_test_123',
        }),
      })
    );
  });

  it('marks NRPG callout as paid from payment_intent.succeeded', async () => {
    const POST = await loadHandler();
    constructWebhookEventMock.mockImplementation((payload: unknown) => JSON.parse(payload as string));

    const paymentIntent = { id: 'pi_test_456' };

    const event = {
      id: 'evt_test_456',
      type: 'payment_intent.succeeded',
      data: { object: paymentIntent },
    };

    prismaMock.serviceRequestCalloutPayment.updateMany.mockResolvedValue({ count: 1 } as any);

    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/stripe/webhook',
      headers: { 'stripe-signature': 'sig_test' },
      body: event,
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ received: true });

    expect(prismaMock.serviceRequestCalloutPayment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          stripePaymentIntentId: 'pi_test_456',
        }),
        data: { status: 'PAID' },
      })
    );
  });
});
