import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export interface PaymentIntentParams {
  amount: number;
  currency: string;
  customerId?: string | null;
  metadata?: Record<string, string>;
}

export interface RefundParams {
  paymentIntentId: string;
  amount?: number;
  reason?: string;
}

export interface CustomerParams {
  email: string;
  name: string;
  metadata?: Record<string, string>;
}

export interface ConnectedAccountParams {
  email: string;
  businessType: 'individual' | 'company';
  country: string;
}

// Fee calculations
export function calculateFees(amount: number) {
  const processingFee = amount * 0.029 + 0.30; // Stripe fee
  const platformFee = amount * 0.05; // 5% platform fee
  const netAmount = amount - processingFee - platformFee;

  return {
    processingFee: Math.round(processingFee * 100) / 100,
    platformFee: Math.round(platformFee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
  };
}

// Customer operations
export async function createCustomer(params: CustomerParams) {
  return stripe.customers.create({
    email: params.email,
    name: params.name,
    metadata: params.metadata,
  });
}

export async function getCustomer(customerId: string) {
  return stripe.customers.retrieve(customerId);
}

export async function updateCustomer(customerId: string, params: Partial<CustomerParams>) {
  return stripe.customers.update(customerId, params);
}

export async function deleteCustomer(customerId: string) {
  return stripe.customers.del(customerId);
}

// Payment Intent operations
export async function createPaymentIntent(params: PaymentIntentParams) {
  const intentParams: Stripe.PaymentIntentCreateParams = {
    amount: Math.round(params.amount * 100), // Convert to cents
    currency: params.currency,
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: params.metadata || {},
  };

  if (params.customerId) {
    intentParams.customer = params.customerId;
  }

  return stripe.paymentIntents.create(intentParams);
}

export async function getPaymentIntent(paymentIntentId: string) {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}

export async function confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string) {
  return stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: paymentMethodId,
  });
}

export async function cancelPaymentIntent(paymentIntentId: string) {
  return stripe.paymentIntents.cancel(paymentIntentId);
}

// Refund operations
export async function createRefund(params: RefundParams) {
  const refundParams: Stripe.RefundCreateParams = {
    payment_intent: params.paymentIntentId,
  };

  if (params.amount) {
    refundParams.amount = Math.round(params.amount * 100);
  }

  if (params.reason) {
    refundParams.reason = params.reason as Stripe.RefundCreateParams.Reason;
  }

  return stripe.refunds.create(refundParams);
}

export async function getRefund(refundId: string) {
  return stripe.refunds.retrieve(refundId);
}

// Connected Account operations (for contractors)
export async function createConnectedAccount(params: ConnectedAccountParams) {
  return stripe.accounts.create({
    type: 'express',
    country: params.country,
    email: params.email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: params.businessType,
  });
}

export async function getConnectedAccount(accountId: string) {
  return stripe.accounts.retrieve(accountId);
}

export async function createAccountLink(accountId: string, returnUrl: string, refreshUrl: string) {
  return stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
}

export async function createLoginLink(accountId: string) {
  return stripe.accounts.createLoginLink(accountId);
}

// Transfer operations
export async function createTransfer(
  amount: number,
  destination: string,
  transferGroup?: string
) {
  return stripe.transfers.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    destination,
    transfer_group: transferGroup,
  });
}

// Webhook signature verification
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Payment methods
export async function listPaymentMethods(customerId: string, type: string = 'card') {
  return stripe.paymentMethods.list({
    customer: customerId,
    type: type as Stripe.PaymentMethodListParams.Type,
  });
}

export async function attachPaymentMethod(paymentMethodId: string, customerId: string) {
  return stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });
}

export async function detachPaymentMethod(paymentMethodId: string) {
  return stripe.paymentMethods.detach(paymentMethodId);
}

export default stripe;
