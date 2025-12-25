import { faker } from '@faker-js/faker';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'DISPUTED'
  | 'CANCELLED';

export type PaymentMethod = 'CARD' | 'BANK_TRANSFER' | 'CHECK' | 'CASH' | 'INSURANCE';

export interface MockPayment {
  id: string;
  bookingId: string;
  clientId: string;
  contractorId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripePaymentIntentId: string | null;
  stripeChargeId: string | null;
  description: string;
  metadata: Record<string, any>;
  processingFee: number;
  platformFee: number;
  netAmount: number;
  refundedAmount: number;
  refundReason: string | null;
  failureReason: string | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockInvoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  clientId: string;
  contractorId: string;
  items: MockInvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  dueDate: Date;
  paidDate: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockInvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface MockStripeEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, any>;
  };
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  api_version: string;
}

export const createMockPayment = (overrides: Partial<MockPayment> = {}): MockPayment => {
  const amount = overrides.amount || faker.number.float({ min: 100, max: 50000, fractionDigits: 2 });
  const processingFee = amount * 0.029 + 0.30; // Stripe fee
  const platformFee = amount * 0.05; // 5% platform fee
  const netAmount = amount - processingFee - platformFee;

  return {
    id: faker.string.uuid(),
    bookingId: faker.string.uuid(),
    clientId: faker.string.uuid(),
    contractorId: faker.string.uuid(),
    amount,
    currency: 'usd',
    status: 'COMPLETED',
    paymentMethod: 'CARD',
    stripePaymentIntentId: `pi_${faker.string.alphanumeric(24)}`,
    stripeChargeId: `ch_${faker.string.alphanumeric(24)}`,
    description: faker.lorem.sentence(),
    metadata: {},
    processingFee,
    platformFee,
    netAmount,
    refundedAmount: 0,
    refundReason: null,
    failureReason: null,
    paidAt: faker.date.recent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
};

export const createMockInvoiceItem = (
  overrides: Partial<MockInvoiceItem> = {}
): MockInvoiceItem => {
  const quantity = overrides.quantity || faker.number.int({ min: 1, max: 10 });
  const unitPrice = overrides.unitPrice || faker.number.float({ min: 50, max: 500, fractionDigits: 2 });

  return {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    quantity,
    unitPrice,
    total: quantity * unitPrice,
    ...overrides,
  };
};

export const createMockInvoice = (overrides: Partial<MockInvoice> = {}): MockInvoice => {
  const items = overrides.items || Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => createMockInvoiceItem()
  );
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return {
    id: faker.string.uuid(),
    invoiceNumber: `INV-${faker.date.recent().getFullYear()}-${faker.string.numeric(6)}`,
    bookingId: faker.string.uuid(),
    clientId: faker.string.uuid(),
    contractorId: faker.string.uuid(),
    items,
    subtotal,
    tax,
    total,
    status: 'SENT',
    dueDate: faker.date.future(),
    paidDate: null,
    notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
};

export const createMockStripePaymentIntent = (overrides: Record<string, any> = {}) => ({
  id: `pi_${faker.string.alphanumeric(24)}`,
  object: 'payment_intent',
  amount: faker.number.int({ min: 10000, max: 5000000 }),
  amount_received: faker.number.int({ min: 10000, max: 5000000 }),
  currency: 'usd',
  status: 'succeeded',
  client_secret: `pi_${faker.string.alphanumeric(24)}_secret_${faker.string.alphanumeric(24)}`,
  created: Math.floor(Date.now() / 1000),
  customer: `cus_${faker.string.alphanumeric(14)}`,
  description: faker.lorem.sentence(),
  metadata: {},
  payment_method: `pm_${faker.string.alphanumeric(24)}`,
  ...overrides,
});

export const createMockStripeEvent = (
  type: string,
  data: Record<string, any> = {}
): MockStripeEvent => ({
  id: `evt_${faker.string.alphanumeric(24)}`,
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

export const createMockPayments = (count: number): MockPayment[] =>
  Array.from({ length: count }, () => createMockPayment());
