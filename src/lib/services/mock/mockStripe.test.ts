/**
 * Mock Stripe Service Tests
 * Critical for investor demo functionality
 */

import { mockStripeService, getMockStripe } from './mockStripe';

describe('Mock Stripe Service', () => {
  beforeEach(() => {
    // Reset any state between tests
    jest.clearAllMocks();
  });

  test('should create payment intent with correct amount', async () => {
    const result = await mockStripeService.createPaymentIntent({
      amount: 275000, // $2,750 booking fee
      currency: 'aud',
      metadata: {
        bookingId: 'test-booking-123'
      }
    });

    expect(result.amount).toBe(275000);
    expect(result.currency).toBe('aud');
    expect(result.status).toBe('requires_payment_method');
    expect(result.metadata.bookingId).toBe('test-booking-123');
    expect(result.id).toMatch(/^pi_mock_\d+_[a-z0-9]+$/);
    expect(result.client_secret).toMatch(/^pi_mock_secret_[a-z0-9]+$/);
  });

  test('should simulate payment processing delay', (done) => {
    mockStripeService.createPaymentIntent({
      amount: 100000,
      currency: 'aud'
    }).then(paymentIntent => {
      expect(paymentIntent.status).toBe('requires_payment_method');

      // After 2+ seconds, status should change to succeeded
      setTimeout(() => {
        expect(paymentIntent.status).toBe('succeeded');
        done();
      }, 2100);
    });
  }, 5000);

  test('should create checkout session with correct parameters', async () => {
    const session = await mockStripeService.createCheckoutSession({
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      line_items: [
        {
          price_data: {
            currency: 'aud',
            unit_amount: 275000,
            product_data: {
              name: 'Emergency Restoration Service'
            }
          },
          quantity: 1
        }
      ],
      customer_email: 'test@example.com'
    });

    expect(session.amount_total).toBe(275000);
    expect(session.payment_status).toBe('unpaid');
    expect(session.customer).toBe('test@example.com');
    expect(session.success_url).toBe('https://example.com/success');
    expect(session.cancel_url).toBe('https://example.com/cancel');
    expect(session.id).toMatch(/^cs_mock_\d+_[a-z0-9]+$/);
  });

  test('should create customer with correct details', async () => {
    const customer = await mockStripeService.createCustomer({
      email: 'john@example.com',
      name: 'John Smith',
      metadata: {
        contractorId: 'contractor-123'
      }
    });

    expect(customer.email).toBe('john@example.com');
    expect(customer.name).toBe('John Smith');
    expect(customer.metadata.contractorId).toBe('contractor-123');
    expect(customer.id).toMatch(/^cus_mock_\d+_[a-z0-9]+$/);
  });

  test('should create transfer for contractor payout', async () => {
    const transfer = await mockStripeService.createTransfer({
      amount: 220000, // $2,200 contractor portion
      currency: 'aud',
      destination: 'acct_contractor123',
      metadata: {
        bookingId: 'booking-456',
        contractorId: 'contractor-123'
      }
    });

    expect(transfer.amount).toBe(220000);
    expect(transfer.currency).toBe('aud');
    expect(transfer.destination).toBe('acct_contractor123');
    expect(transfer.status).toBe('pending');
    expect(transfer.metadata.bookingId).toBe('booking-456');
    expect(transfer.id).toMatch(/^tr_mock_\d+_[a-z0-9]+$/);
  });

  test('should create refund correctly', async () => {
    // First create a payment intent
    const paymentIntent = await mockStripeService.createPaymentIntent({
      amount: 275000,
      currency: 'aud'
    });

    // Then refund it
    const refund = await mockStripeService.createRefund({
      payment_intent: paymentIntent.id,
      amount: 275000, // Full refund
      reason: 'requested_by_customer'
    });

    expect(refund.amount).toBe(275000);
    expect(refund.currency).toBe('aud');
    expect(refund.payment_intent).toBe(paymentIntent.id);
    expect(refund.reason).toBe('requested_by_customer');
    expect(refund.status).toBe('succeeded');
    expect(refund.id).toMatch(/^re_mock_\d+_[a-z0-9]+$/);
  });

  test('should construct webhook event', () => {
    const event = mockStripeService.constructEvent(
      { type: 'payment_intent.succeeded' },
      'mock_signature',
      'mock_secret'
    );

    expect(event.type).toBe('payment_intent.succeeded');
    expect(event.id).toMatch(/^evt_mock_\d+$/);
    expect(event.data.object.status).toBe('succeeded');
  });
});

describe('Mock Stripe SDK Structure', () => {
  test('should mimic real Stripe SDK structure', () => {
    const mockStripe = getMockStripe();

    expect(mockStripe.paymentIntents).toBeDefined();
    expect(mockStripe.checkout).toBeDefined();
    expect(mockStripe.customers).toBeDefined();
    expect(mockStripe.transfers).toBeDefined();
    expect(mockStripe.refunds).toBeDefined();
    expect(mockStripe.webhooks).toBeDefined();

    expect(typeof mockStripe.paymentIntents.create).toBe('function');
    expect(typeof mockStripe.paymentIntents.retrieve).toBe('function');
    expect(typeof mockStripe.checkout.sessions.create).toBe('function');
    expect(typeof mockStripe.customers.create).toBe('function');
    expect(typeof mockStripe.transfers.create).toBe('function');
    expect(typeof mockStripe.refunds.create).toBe('function');
    expect(typeof mockStripe.webhooks.constructEvent).toBe('function');
  });

  test('should handle payment intent creation through SDK interface', async () => {
    const mockStripe = getMockStripe();
    
    const paymentIntent = await mockStripe.paymentIntents.create({
      amount: 275000,
      currency: 'aud',
      metadata: { test: 'demo' }
    });

    expect(paymentIntent.amount).toBe(275000);
    expect(paymentIntent.currency).toBe('aud');
    expect(paymentIntent.metadata.test).toBe('demo');
  });

  test('should retrieve payment intent by ID', async () => {
    const mockStripe = getMockStripe();
    
    // Create payment intent first
    const created = await mockStripe.paymentIntents.create({
      amount: 100000,
      currency: 'aud'
    });

    // Then retrieve it
    const retrieved = await mockStripe.paymentIntents.retrieve(created.id);
    
    expect(retrieved?.id).toBe(created.id);
    expect(retrieved?.amount).toBe(100000);
  });

  test('should return null for non-existent payment intent', async () => {
    const mockStripe = getMockStripe();
    
    const retrieved = await mockStripe.paymentIntents.retrieve('non-existent-id');
    
    expect(retrieved).toBeNull();
  });
});

describe('Demo Mode Business Logic', () => {
  test('should handle standard booking flow amounts', async () => {
    const mockStripe = getMockStripe();
    
    // Create payment for standard booking ($2,750)
    const paymentIntent = await mockStripe.paymentIntents.create({
      amount: 275000,
      currency: 'aud',
      metadata: {
        serviceType: 'water-damage',
        urgencyLevel: 'standard',
        bookingFee: '2750',
        serviceFee: '550',
        contractorFee: '2200'
      }
    });

    expect(paymentIntent.amount).toBe(275000);
    expect(paymentIntent.metadata.serviceType).toBe('water-damage');
    expect(paymentIntent.metadata.bookingFee).toBe('2750');

    // Simulate contractor payout
    const transfer = await mockStripe.transfers.create({
      amount: 220000, // $2,200 to contractor
      currency: 'aud',
      destination: 'contractor_account',
      metadata: {
        paymentIntentId: paymentIntent.id,
        contractorShare: '2200'
      }
    });

    expect(transfer.amount).toBe(220000);
    expect(transfer.metadata.contractorShare).toBe('2200');
  });

  test('should simulate emergency booking premium', async () => {
    const mockStripe = getMockStripe();
    
    // Emergency bookings might have higher fees
    const emergencyPayment = await mockStripe.paymentIntents.create({
      amount: 330000, // $3,300 for emergency
      currency: 'aud',
      metadata: {
        serviceType: 'water-damage',
        urgencyLevel: 'emergency',
        emergencyPremium: '550'
      }
    });

    expect(emergencyPayment.amount).toBe(330000);
    expect(emergencyPayment.metadata.urgencyLevel).toBe('emergency');
  });
});