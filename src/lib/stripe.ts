import Stripe from 'stripe';

// Only initialize Stripe if the secret key is available
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20' as const,
      typescript: true })
  : null;

// Helper function to check if Stripe is configured
export const isStripeConfigured = () => !!process.env.STRIPE_SECRET_KEY;

// Stripe Price IDs for different payment types
export const STRIPE_PRICES = {
  APPLICATION_FEE: process.env.STRIPE_APPLICATION_FEE_PRICE_ID || 'price_application_275',
  JOINING_FEE: process.env.STRIPE_JOINING_FEE_PRICE_ID || 'price_joining_2200',
  SUBSCRIPTION: {
    MONTH_1: process.env.STRIPE_SUB_MONTH_1_PRICE_ID || 'price_sub_month1_free',
    MONTH_2: process.env.STRIPE_SUB_MONTH_2_PRICE_ID || 'price_sub_month2_198',
    MONTH_3: process.env.STRIPE_SUB_MONTH_3_PRICE_ID || 'price_sub_month3_247',
    REGULAR: process.env.STRIPE_SUB_REGULAR_PRICE_ID || 'price_sub_regular_495' }
};

// Payment amounts in cents (for Stripe)
export const PAYMENT_AMOUNTS = {
  APPLICATION_FEE: 27500, // $275.00
  JOINING_FEE: 220000, // $2,200.00
  SUBSCRIPTION: {
    MONTH_1: 0, // Free
    MONTH_2: 19800, // $198.00 (60% off $495)
    MONTH_3: 24750, // $247.50 (50% off $495)
    REGULAR: 49500, // $495.00
  }
};

// Create customer with metadata
export async function createStripeCustomer(
  email: string,
  name: string,
  contractorId: string,
  metadata?: Record<string, string>
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
  }
  
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      contractorId,
      platform: 'NRP',
      ...metadata } });
  
  return customer;
}

// Create payment intent for onboarding fees
export async function createOnboardingPaymentIntent(
  customerId: string,
  contractorId: string
) {
  const totalAmount = PAYMENT_AMOUNTS.APPLICATION_FEE + PAYMENT_AMOUNTS.JOINING_FEE;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: 'aud',
    customer: customerId,
    metadata: {
      contractorId,
      type: 'onboarding',
      applicationFee: PAYMENT_AMOUNTS.APPLICATION_FEE.toString(),
      joiningFee: PAYMENT_AMOUNTS.JOINING_FEE.toString() },
    description: 'NRP Contractor Onboarding - Application Fee ($275) + Joining Fee ($2,200)',
    statement_descriptor: 'NRP ONBOARDING' });
  
  return paymentIntent;
}

// Create subscription with promotional pricing
export async function createContractorSubscription(
  customerId: string,
  contractorId: string
) {
  // Create subscription with trial period for first free month
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      { price: STRIPE_PRICES.SUBSCRIPTION.REGULAR },
    ],
    trial_period_days: 30, // First month free
    metadata: {
      contractorId,
      promoSchedule: 'month1_free_month2_60off_month3_50off' },
    description: 'NRP Contractor Subscription' });
  
  // Schedule price changes for months 2 and 3
  await createSubscriptionSchedule(subscription.id, customerId);
  
  return subscription;
}

// Create subscription schedule for promotional pricing
async function createSubscriptionSchedule(
  subscriptionId: string,
  customerId: string
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const schedule = await stripe.subscriptionSchedules.create({
    from_subscription: subscriptionId,
    phases: [
      {
        // Month 1: Free trial (30 days)
        start_date: subscription.trial_end || 'now',
        end_date: subscription.trial_end ? subscription.trial_end + 2592000 : 'now', // +30 days
        items: [{ price: STRIPE_PRICES.SUBSCRIPTION.REGULAR }],
        coupon: 'free_month', // 100% off coupon
      },
      {
        // Month 2: 60% off (30 days)
        items: [{ price: STRIPE_PRICES.SUBSCRIPTION.REGULAR }],
        coupon: 'sixty_percent_off', // 60% off coupon
        iterations: 1 },
      {
        // Month 3: 50% off (30 days)
        items: [{ price: STRIPE_PRICES.SUBSCRIPTION.REGULAR }],
        coupon: 'fifty_percent_off', // 50% off coupon
        iterations: 1 },
      {
        // Month 4+: Regular price
        items: [{ price: STRIPE_PRICES.SUBSCRIPTION.REGULAR }] },
    ] });
  
  return schedule;
}

// Handle webhook events
export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ success: boolean; message?: string }> {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      if (paymentIntent.metadata.type === 'onboarding') {
        // Update database to mark fees as paid
        return { success: true, message: 'Onboarding payment processed' };
      }
      break;
      
    case 'subscription.created':
    case 'subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      // Update database with subscription details
      return { success: true, message: 'Subscription updated' };
      
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      // Update database with payment record
      return { success: true, message: 'Invoice paid' };
      
    case 'customer.subscription.deleted':
      const deletedSub = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      return { success: true, message: 'Subscription cancelled' };
      
    default:
      return { success: true, message: `Unhandled event type: ${event.type}` };
  }
}

// Create Stripe Checkout Session for onboarding
export async function createOnboardingCheckoutSession(
  contractorId: string,
  email: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
  }
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'Application Fee',
            description: 'NRP Contractor Application Processing Fee' },
          unit_amount: PAYMENT_AMOUNTS.APPLICATION_FEE },
        quantity: 1 },
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'Joining Fee',
            description: 'NRP Network Access & Training Materials' },
          unit_amount: PAYMENT_AMOUNTS.JOINING_FEE },
        quantity: 1 },
    ],
    metadata: {
      contractorId,
      type: 'onboarding' },
    success_url: successUrl,
    cancel_url: cancelUrl });
  
  return session;
}

// Verify payment status
export async function verifyPaymentStatus(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  return {
    status: paymentIntent.status,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    metadata: paymentIntent.metadata,
    succeeded: paymentIntent.status === 'succeeded' };
}

// Create refund
export async function createRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: string
) {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount, // If not specified, refunds entire amount
    reason: reason as Stripe.RefundCreateParams.Reason || 'requested_by_customer' });
  
  return refund;
}