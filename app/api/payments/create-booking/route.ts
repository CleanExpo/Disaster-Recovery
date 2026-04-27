/**
 * @deprecated Path A (ADR-011 Accepted 2026-04-26) — DR is NOT in the
 * funds path between client and contractor. The contractor charges the
 * client directly on-site; DR collects platform fees from the contractor
 * (see `business-rules.md §2`).
 *
 * This route was scaffolded under the (now-rejected) Path B model where
 * DR would have settled a $2,750 client callout fee into its own Stripe
 * balance and released ~$2,200 to the contractor on KPI completion.
 *
 * It is NOT wired in to the live `/claim` form (which posts to
 * `/api/claims/submit`, not here). Kept in the tree for reference during
 * the Path A migration. A follow-up PR will remove it entirely after a
 * one-week grace window confirms no caller exists in production.
 *
 * If you are about to call this route, STOP — Path A means contractors
 * bill clients directly. Linear: DR-789.
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getMockStripe } from '@/lib/services/mock/mockStripe';
import { isProductionMode } from '@/lib/services/mock';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

// Initialize Stripe with your secret key or use mock in demo mode.
// `as unknown as Stripe` is the boundary cast for the partial mock
// (see TS Phase 2 cluster guidance §"Cast-replacement").
const stripe: Stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20' as const,
    })
  : (getMockStripe() as unknown as Stripe);

interface BookingData {
  // Service details
  serviceType: string;
  urgencyLevel: string;
  damageDescription: string;

  // Property details
  propertyType: string;
  propertySize: string;
  affectedAreas: string[];
  address: string;
  suburb: string;
  state: string;
  postcode: string;

  // Contact details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;

  // Insurance details
  hasInsurance: boolean;
  insuranceCompany?: string;
  claimNumber?: string;

  // Payment details
  paymentMethod: 'card';
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/payments/create-booking' });
  try {
    const bookingData: BookingData = await request.json();

    // Validate required fields
    if (!bookingData.email || !bookingData.firstName || !bookingData.lastName) {
      return NextResponse.json(
        { success: false, message: 'Missing required customer information' },
        { status: 400 },
      );
    }

    // Calculate amounts (in cents for Stripe)
    const totalAmount = 275000; // $2,750.00 in cents
    const serviceFee = 55000; // $550.00 in cents
    const contractorAmount = 220000; // $2,200.00 in cents

    // Generate a unique booking ID
    const bookingId = `NRP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create or retrieve Stripe customer
    let customer;
    try {
      const customers = await stripe.customers.list({
        email: bookingData.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create(
          {
            email: bookingData.email,
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            phone: bookingData.phone,
            address: bookingData.billingAddress,
            metadata: {
              bookingId,
              propertyAddress: `${bookingData.address}, ${bookingData.suburb}, ${bookingData.state} ${bookingData.postcode}`,
            },
          },
          { idempotencyKey: `dr-booking-customer-${bookingId}` },
        );
      }
    } catch (error) {
      log.error('error creating/retrieving customer', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }

    {
      // Create a Payment Intent for card payment
      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: totalAmount,
          currency: 'aud',
          customer: customer.id,
          description: `Disaster Recovery Service - ${bookingData.serviceType}`,
          metadata: {
            bookingId,
            serviceType: bookingData.serviceType,
            urgencyLevel: bookingData.urgencyLevel,
            propertyType: bookingData.propertyType,
            suburb: bookingData.suburb,
            state: bookingData.state,
            postcode: bookingData.postcode,
            serviceFee: serviceFee.toString(),
            contractorAmount: contractorAmount.toString(),
            hasInsurance: bookingData.hasInsurance.toString(),
            insuranceCompany: bookingData.insuranceCompany || '',
            claimNumber: bookingData.claimNumber || '',
          },
          automatic_payment_methods: {
            enabled: true,
          },
          // Set up for future contractor payout
          transfer_group: bookingId,
        },
        { idempotencyKey: `dr-booking-pi-${bookingId}` },
      );

      // TODO(DR-700 Phase 2 follow-up): `as any` hides a Prisma schema
      // mismatch — `amount` is not declared on the current `Payment`
      // model. This route is also @deprecated under Path A (see file
      // header). Resolve in the deletion PR rather than here.
      await (prisma.payment.create as any)({
        data: {
          bookingId,
          amount: totalAmount / 100,
          currency: 'AUD',
          status: 'PENDING',
          stripePaymentId: paymentIntent.id,
          stripeCustomerId: customer.id,
          method: 'card',
          description: `Disaster Recovery Service - ${bookingData.serviceType}`,
          metadata: JSON.stringify({
            serviceType: bookingData.serviceType,
            urgencyLevel: bookingData.urgencyLevel,
            propertyType: bookingData.propertyType,
            suburb: bookingData.suburb,
            state: bookingData.state,
            serviceFee: serviceFee / 100,
            contractorAmount: contractorAmount / 100,
          }),
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          bookingId,
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: totalAmount,
          serviceFee,
          contractorAmount,
        },
      });
    }
  } catch (error) {
    log.error('payment processing error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/payments/create-booking' },
      extra: { requestId: log.requestId },
    });

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          success: false,
          message: `Payment error: ${error.message}`,
          code: error.code,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred processing your payment. Please try again.',
      },
      { status: 500 },
    );
  }
}

// Webhook endpoint to handle Stripe events
export async function PUT(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/payments/create-booking' });
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ success: false, message: 'No signature provided' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    log.error('webhook signature verification failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Extract booking details from metadata
      const bookingId = paymentIntent.metadata.bookingId;
      const contractorAmount = parseInt(paymentIntent.metadata.contractorAmount);

      // In production:
      // 1. Update booking status in database
      // 2. Trigger job distribution to contractors
      // 3. Send confirmation emails
      // 4. Create contractor payout record (to be released after KPIs met)

      // You would typically update your database here
      // await updateBookingStatus(bookingId, 'paid');
      // await createContractorJob(bookingId, contractorAmount);
      // await notifyContractors(bookingId);

      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      log.error('payment failed', { bookingId: failedPayment.metadata.bookingId });

      // Handle failed payment
      // await updateBookingStatus(failedPayment.metadata.bookingId, 'payment_failed');

      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;

      // Handle successful bank transfer
      // Similar actions to payment_intent.succeeded

      break;

    default:
  }

  return NextResponse.json({ success: true, received: true });
}
