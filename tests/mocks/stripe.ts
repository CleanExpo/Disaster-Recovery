import { faker } from '@faker-js/faker';

export const mockStripeCustomer = {
  id: `cus_${faker.string.alphanumeric(14)}`,
  object: 'customer',
  email: faker.internet.email(),
  name: faker.person.fullName(),
  created: Math.floor(Date.now() / 1000),
  metadata: {},
};

export const mockStripePaymentMethod = {
  id: `pm_${faker.string.alphanumeric(24)}`,
  object: 'payment_method',
  type: 'card',
  card: {
    brand: 'visa',
    last4: '4242',
    exp_month: 12,
    exp_year: 2025,
    funding: 'credit',
  },
  customer: mockStripeCustomer.id,
  created: Math.floor(Date.now() / 1000),
};

export const mockStripePaymentIntent = {
  id: `pi_${faker.string.alphanumeric(24)}`,
  object: 'payment_intent',
  amount: 5000,
  amount_received: 5000,
  currency: 'usd',
  status: 'succeeded',
  client_secret: `pi_${faker.string.alphanumeric(24)}_secret_${faker.string.alphanumeric(24)}`,
  customer: mockStripeCustomer.id,
  payment_method: mockStripePaymentMethod.id,
  created: Math.floor(Date.now() / 1000),
  metadata: {},
};

export const mockStripeRefund = {
  id: `re_${faker.string.alphanumeric(24)}`,
  object: 'refund',
  amount: 5000,
  charge: `ch_${faker.string.alphanumeric(24)}`,
  currency: 'usd',
  payment_intent: mockStripePaymentIntent.id,
  status: 'succeeded',
  created: Math.floor(Date.now() / 1000),
};

export const mockStripeConnectedAccount = {
  id: `acct_${faker.string.alphanumeric(16)}`,
  object: 'account',
  type: 'express',
  email: faker.internet.email(),
  charges_enabled: true,
  payouts_enabled: true,
  details_submitted: true,
  created: Math.floor(Date.now() / 1000),
};

export const mockStripeTransfer = {
  id: `tr_${faker.string.alphanumeric(24)}`,
  object: 'transfer',
  amount: 4250, // After platform fee
  currency: 'usd',
  destination: mockStripeConnectedAccount.id,
  source_transaction: `ch_${faker.string.alphanumeric(24)}`,
  created: Math.floor(Date.now() / 1000),
};

export const mockStripeWebhookEvent = (type: string, data: any = {}) => ({
  id: `evt_${faker.string.alphanumeric(24)}`,
  object: 'event',
  type,
  data: {
    object: data,
  },
  created: Math.floor(Date.now() / 1000),
  livemode: false,
  pending_webhooks: 0,
  request: {
    id: `req_${faker.string.alphanumeric(14)}`,
    idempotency_key: faker.string.uuid(),
  },
  api_version: '2023-10-16',
});

// Mock Stripe SDK
export const mockStripe = {
  customers: {
    create: jest.fn().mockResolvedValue(mockStripeCustomer),
    retrieve: jest.fn().mockResolvedValue(mockStripeCustomer),
    update: jest.fn().mockResolvedValue(mockStripeCustomer),
    del: jest.fn().mockResolvedValue({ id: mockStripeCustomer.id, deleted: true }),
    list: jest.fn().mockResolvedValue({ data: [mockStripeCustomer], has_more: false }),
  },
  paymentIntents: {
    create: jest.fn().mockResolvedValue(mockStripePaymentIntent),
    retrieve: jest.fn().mockResolvedValue(mockStripePaymentIntent),
    update: jest.fn().mockResolvedValue(mockStripePaymentIntent),
    confirm: jest.fn().mockResolvedValue({ ...mockStripePaymentIntent, status: 'succeeded' }),
    cancel: jest.fn().mockResolvedValue({ ...mockStripePaymentIntent, status: 'canceled' }),
    capture: jest.fn().mockResolvedValue({ ...mockStripePaymentIntent, status: 'succeeded' }),
  },
  paymentMethods: {
    create: jest.fn().mockResolvedValue(mockStripePaymentMethod),
    retrieve: jest.fn().mockResolvedValue(mockStripePaymentMethod),
    attach: jest.fn().mockResolvedValue(mockStripePaymentMethod),
    detach: jest.fn().mockResolvedValue(mockStripePaymentMethod),
    list: jest.fn().mockResolvedValue({ data: [mockStripePaymentMethod], has_more: false }),
  },
  refunds: {
    create: jest.fn().mockResolvedValue(mockStripeRefund),
    retrieve: jest.fn().mockResolvedValue(mockStripeRefund),
    list: jest.fn().mockResolvedValue({ data: [mockStripeRefund], has_more: false }),
  },
  accounts: {
    create: jest.fn().mockResolvedValue(mockStripeConnectedAccount),
    retrieve: jest.fn().mockResolvedValue(mockStripeConnectedAccount),
    update: jest.fn().mockResolvedValue(mockStripeConnectedAccount),
    del: jest.fn().mockResolvedValue({ id: mockStripeConnectedAccount.id, deleted: true }),
  },
  transfers: {
    create: jest.fn().mockResolvedValue(mockStripeTransfer),
    retrieve: jest.fn().mockResolvedValue(mockStripeTransfer),
    list: jest.fn().mockResolvedValue({ data: [mockStripeTransfer], has_more: false }),
  },
  webhooks: {
    constructEvent: jest.fn().mockImplementation((body, sig, secret) => {
      return JSON.parse(body);
    }),
  },
};

// Export mock factory functions
export const createMockPaymentIntent = (overrides: any = {}) => ({
  ...mockStripePaymentIntent,
  id: `pi_${faker.string.alphanumeric(24)}`,
  ...overrides,
});

export const createMockCustomer = (overrides: any = {}) => ({
  ...mockStripeCustomer,
  id: `cus_${faker.string.alphanumeric(14)}`,
  ...overrides,
});

export const createMockRefund = (overrides: any = {}) => ({
  ...mockStripeRefund,
  id: `re_${faker.string.alphanumeric(24)}`,
  ...overrides,
});
