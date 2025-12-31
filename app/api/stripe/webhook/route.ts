import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { constructWebhookEvent } from '@/lib/stripe';
import { getNrpgCalloutSplit } from '@/lib/pricing/nrpg-callout';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue;
  const normalised = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalised)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalised)) return false;
  return defaultValue;
}

function getCalloutGstOptionsFromEnv() {
  return {
    totalGstInclusive: parseBooleanEnv(process.env.NRPG_CALLOUT_TOTAL_GST_INCLUSIVE, true),
    platformFeeGstInclusive: parseBooleanEnv(process.env.NRPG_CALLOUT_PLATFORM_FEE_GST_INCLUSIVE, true),
    contractorEntitlementGstInclusive: parseBooleanEnv(process.env.NRPG_CALLOUT_CONTRACTOR_ENTITLEMENT_GST_INCLUSIVE, true),
  };
}

async function markCalloutPaidBySession(session: Stripe.Checkout.Session): Promise<void> {
  const metadata = session.metadata ?? {};
  if (metadata.type !== 'NRPG_CALLOUT') return;

  const serviceRequestId = metadata.serviceRequestId;
  const clientId = metadata.clientId;

  if (!serviceRequestId || !clientId) return;

  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: { id: serviceRequestId },
    select: { userId: true },
  });

  if (!serviceRequest || serviceRequest.userId !== clientId) return;

  const split = getNrpgCalloutSplit(getCalloutGstOptionsFromEnv());

  await prisma.serviceRequestCalloutPayment.upsert({
    where: { serviceRequestId },
    create: {
      serviceRequestId,
      clientId,
      totalAUD: split.total.totalAUD,
      totalExGstAUD: split.total.exGstAUD,
      gstAUD: split.total.gstAUD,
      platformFeeAUD: split.platformFee.totalAUD,
      platformFeeExGstAUD: split.platformFee.exGstAUD,
      platformFeeGstAUD: split.platformFee.gstAUD,
      contractorEntitlementAUD: split.contractorEntitlement.totalAUD,
      contractorEntitlementExGstAUD: split.contractorEntitlement.exGstAUD,
      contractorEntitlementGstAUD: split.contractorEntitlement.gstAUD,
      gstInclusive: split.total.gstInclusive,
      status: 'PAID',
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
    },
    update: {
      status: 'PAID',
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
    },
  });
}

async function markCalloutPaidByPaymentIntent(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  await prisma.serviceRequestCalloutPayment.updateMany({
    where: {
      stripePaymentIntentId: paymentIntent.id,
      status: { in: ['CREATED', 'CHECKOUT_CREATED'] },
    },
    data: {
      status: 'PAID',
    },
  });
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(payload, signature, webhookSecret) as Stripe.Event;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid signature', message: error instanceof Error ? error.message : 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await markCalloutPaidBySession(session);
        break;
      }
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await markCalloutPaidByPaymentIntent(paymentIntent);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook handler error', message: error instanceof Error ? error.message : 'Webhook handler error' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
