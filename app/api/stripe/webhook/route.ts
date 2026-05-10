import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import Stripe from 'stripe';
import { PaymentValidator, PaymentAuditLogger } from '@/lib/payment-security';
import { withSecurityHeaders, withRateLimit } from '@/lib/auth-middleware';
import { sendEmail, emailTemplates } from '@/lib/email';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { requestLogger, captureException } from '@/lib/observability';

async function handleWebhook(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/stripe/webhook' });
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  // SECURITY: Enhanced signature validation
  if (!signature) {
    PaymentAuditLogger.logSuspiciousActivity({
      ipAddress: clientIP,
      suspiciousFields: ['signature'],
      riskScore: 80,
      details: 'Webhook received without Stripe signature'
    });

    return NextResponse.json(
      {
        success: false,
        error: 'No signature provided',
        code: 'WEBHOOK_NO_SIGNATURE'
      },
      { status: 400 }
    );
  }

  // SECURITY: Verify webhook secret is configured
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    log.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook configuration error',
        code: 'WEBHOOK_CONFIG_ERROR'
      },
      { status: 500 }
    );
  }

  if (!stripe) {
    return NextResponse.json(
      {
        success: false,
        error: 'Stripe is not configured',
        code: 'STRIPE_NOT_CONFIGURED'
      },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // SECURITY: Strict signature verification with Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    log.error('webhook signature verification failed', { error: error instanceof Error ? error.message : String(error) });

    PaymentAuditLogger.logSuspiciousActivity({
      ipAddress: clientIP,
      suspiciousFields: ['signature'],
      riskScore: 90,
      details: `Webhook signature verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid signature',
        code: 'WEBHOOK_INVALID_SIGNATURE'
      },
      { status: 400 }
    );
  }

  // A8 — Idempotency: insert one WebhookDelivery row per Stripe event.id
  // BEFORE any business-logic dispatch. Stripe MAY redeliver any event;
  // a P2002 unique-constraint violation means we have already processed
  // this event and we short-circuit with 200 (so Stripe stops retrying).
  // On business-logic failure AFTER the insert, we delete the row so the
  // next Stripe retry can succeed — see the catch block below.
  const payloadHash = createHash('sha256').update(body).digest('hex');
  try {
    await prisma.webhookDelivery.create({
      data: {
        eventId: event.id,
        eventType: event.type,
        provider: 'stripe',
        livemode: event.livemode,
        payloadHash,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      log.info('duplicate stripe webhook ignored', {
        eventId: event.id,
        eventType: event.type,
      });
      return NextResponse.json({ received: true, idempotent: true });
    }
    // Insert failed for an unexpected reason (DB down, etc.). Surface a
    // 500 so Stripe retries — preferable to silently double-processing.
    log.error('webhookDelivery insert failed', {
      error: err instanceof Error ? err.message : String(err),
      eventId: event.id,
    });
    captureException(err, {
      tags: { route: '/api/stripe/webhook', stage: 'idempotency_insert' },
      extra: { eventId: event.id, eventType: event.type },
    });
    return NextResponse.json(
      { success: false, error: 'Idempotency tracking unavailable', code: 'WEBHOOK_IDEMPOTENCY_ERROR' },
      { status: 500 },
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // DR-712 — consumer platform-fee payment. Discriminated by dr_fee_type metadata
        // set by /api/payments/create-session. Logs the fee-received compliance event
        // with hashed customer email; does NOT touch contractor tables.
        if (session.metadata?.dr_fee_type === 'platform_fee') {
          const claimId = session.metadata.dr_claim_id ?? 'unknown';
          const customerEmail = session.customer_details?.email ?? session.customer_email ?? '';
          await logComplianceEvent({
            eventType: 'referral_fee_received',
            correlationId: claimId,
            correlationType: 'finance_referral',
            entityType: 'customer',
            entityIdentifier: customerEmail || undefined,
            amountCents: session.amount_total ?? undefined,
            amountCurrency: session.currency ?? undefined,
            metadata: {
              stripe_session_id: session.id,
              payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
              customer_email_hash: customerEmail ? hashIdentifier(customerEmail) : null,
              source_channel: session.metadata.dr_source_channel ?? null,
            },
          });
          break;
        }

        if (session.metadata?.type === 'onboarding' && session.metadata?.contractorId) {
          const contractorId = session.metadata.contractorId;

          // SECURITY: Validate payment metadata
          const metadataValidation = PaymentValidator.verifyPaymentMetadata(session.metadata);
          if (!metadataValidation.isValid) {
            PaymentAuditLogger.logSuspiciousActivity({
              contractorId,
              ipAddress: clientIP,
              suspiciousFields: ['metadata'],
              riskScore: 70,
              details: `Invalid payment metadata: ${metadataValidation.reason}`
            });

            // Continue processing but flag for review
            log.warn('webhook metadata validation failed', { contractorId, reason: metadataValidation.reason });
          }

          // SECURITY: Validate payment amount matches expected
          const expectedPayment = PaymentValidator.calculateOnboardingAmount();
          const actualAmount = session.amount_total || 0;

          if (actualAmount !== expectedPayment.amount) {
            PaymentAuditLogger.logSuspiciousActivity({
              contractorId,
              ipAddress: clientIP,
              suspiciousFields: ['amount'],
              riskScore: 95,
              details: `Payment amount mismatch: expected ${expectedPayment.amount}, received ${actualAmount}`
            });

            // Don't process suspicious payments
            return NextResponse.json(
              {
                success: false,
                error: 'Payment amount validation failed',
                code: 'WEBHOOK_AMOUNT_MISMATCH'
              },
              { status: 400 }
            );
          }

          // 1. Update OnboardingPayment status to completed
          await prisma.onboardingPayment.updateMany({
            where: { contractorId },
            data: {
              status: 'completed',
              stripePaymentId: session.payment_intent as string | null,
              stripeSessionId: session.id
            }
          });

          // 2. Update Contractor status to UNDER_REVIEW
          await prisma.contractor.update({
            where: { id: contractorId },
            data: {
              status: 'UNDER_REVIEW',
              onboardingStep: 1
            }
          });

          // 3. Create OnboardingProgress record
          await prisma.onboardingProgress.upsert({
            where: { contractorId },
            create: {
              contractorId,
              currentStep: 1,
              totalSteps: 14,
              completed: false
            },
            update: {
              currentStep: 1,
              completed: false
            }
          });

          // 4. Initialize ModuleProgress records for 14 days
          const modulePromises = [];
          for (let day = 1; day <= 14; day++) {
            modulePromises.push(
              prisma.moduleProgress.upsert({
                where: {
                  contractorId_moduleName: {
                    contractorId,
                    moduleName: `Day ${day} Module`
                  }
                },
                create: {
                  contractorId,
                  moduleName: `Day ${day} Module`,
                  completed: false,
                  attempts: 0
                },
                update: {}
              })
            );
          }
          await Promise.all(modulePromises);

          log.info('stripe checkout completed', { contractorId, sessionId: session.id, amount: actualAmount });

          await logComplianceEvent({
            eventType: 'referral_fee_received',
            correlationId: contractorId,
            correlationType: 'contractor_membership',
            entityType: 'contractor',
            entityIdentifier: contractorId,
            amountCents: actualAmount,
            amountCurrency: (session.currency ?? 'aud').toUpperCase(),
            metadata: {
              stripe_session_id: session.id,
              stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
              request_id: log.requestId,
            },
          });

          // 5. Fire-and-forget payment confirmation email
          const contractor = await prisma.contractor.findUnique({
            where: { id: contractorId },
            select: { email: true, username: true }
          });
          if (contractor?.email) {
            const displayName = contractor.username ?? 'Contractor';
            sendEmail(
              contractor.email,
              emailTemplates.contractorPaymentConfirmed(displayName, contractorId)
            ).catch(() => {
              // Non-fatal — email is informational
            });
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        if (paymentIntent.metadata?.type === 'onboarding') {
          const contractorId = paymentIntent.metadata.contractorId;
          if (contractorId) {
            await prisma.onboardingPayment.updateMany({
              where: { contractorId },
              data: {
                stripePaymentId: paymentIntent.id,
                status: 'completed'
              }
            });
          }
        }
        break;
      }

      case 'checkout.session.expired': {
        // DR-712 — consumer session expired before payment. Audit only.
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.dr_fee_type === 'platform_fee') {
          await logComplianceEvent({
            eventType: 'finance_referral_handoff',
            correlationId: session.metadata.dr_claim_id ?? 'unknown',
            correlationType: 'finance_referral',
            entityType: 'customer',
            metadata: {
              stripe_session_id: session.id,
              outcome: 'session_expired',
              expires_at: session.expires_at,
            },
          });
        }
        break;
      }

      case 'charge.dispute.created': {
        // DR-712 — chargeback raised. TODO page compliance-lead.
        const dispute = event.data.object as Stripe.Dispute;
        const pi = typeof dispute.payment_intent === 'string' ? dispute.payment_intent : null;
        // eslint-disable-next-line no-console
        console.error('[stripe.dispute] chargeback raised', {
          dispute_id: dispute.id,
          payment_intent: pi,
          amount: dispute.amount,
          currency: dispute.currency,
          reason: dispute.reason,
        });
        await logComplianceEvent({
          eventType: 'referral_fee_received',
          correlationId: pi ?? dispute.id,
          correlationType: 'finance_referral',
          entityType: 'customer',
          amountCents: dispute.amount,
          amountCurrency: dispute.currency ?? undefined,
          metadata: {
            stripe_dispute_id: dispute.id,
            payment_intent: pi,
            outcome: 'dispute_created',
            dispute_reason: dispute.reason,
          },
        });
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // DR-712 — consumer payment failure. Log then break without touching contractor tables.
        if (paymentIntent.metadata?.dr_fee_type === 'platform_fee') {
          await logComplianceEvent({
            eventType: 'finance_referral_handoff',
            correlationId: paymentIntent.metadata.dr_claim_id ?? 'unknown',
            correlationType: 'finance_referral',
            entityType: 'customer',
            amountCents: paymentIntent.amount,
            amountCurrency: paymentIntent.currency,
            metadata: {
              payment_intent: paymentIntent.id,
              outcome: 'payment_failed',
              failure_message: paymentIntent.last_payment_error?.message ?? null,
              failure_code: paymentIntent.last_payment_error?.code ?? null,
            },
          });
          break;
        }

        if (paymentIntent.metadata?.type === 'onboarding') {
          const contractorId = paymentIntent.metadata.contractorId;
          if (contractorId) {
            await prisma.onboardingPayment.updateMany({
              where: { contractorId },
              data: {
                status: 'failed'
              }
            });

            // Notify contractor of failed payment via email
            const contractor = await prisma.contractor.findUnique({
              where: { id: contractorId },
              select: { email: true, username: true }
            });
            if (contractor?.email) {
              const failureReason = paymentIntent.last_payment_error?.message || 'Payment declined';
              const displayName = contractor.username ?? 'Contractor';
              sendEmail(
                contractor.email,
                emailTemplates.paymentFailed(displayName, failureReason, contractorId)
              ).catch(() => {
                // Non-fatal — email is informational
              });
            }
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata?.contractorId;

        if (contractorId) {
          // Activate contractor subscription in the database
          await prisma.contractorSubscription.updateMany({
            where: { contractorId },
            data: {
              status: 'ACTIVE',
              startDate: new Date(subscription.current_period_start * 1000),
              nextBillingDate: new Date(subscription.current_period_end * 1000)
            }
          });

          // Update contractor status to approved if not already
          await prisma.contractor.update({
            where: { id: contractorId },
            data: {
              status: 'APPROVED',
              approvedAt: new Date()
            }
          }).catch(() => {
            // Non-fatal — contractor may already be approved
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata?.contractorId;

        if (contractorId) {
          // Deactivate contractor subscription
          await prisma.contractorSubscription.updateMany({
            where: { contractorId },
            data: {
              status: 'CANCELLED',
              cancelledAt: new Date(),
              endDate: new Date(subscription.current_period_end * 1000)
            }
          });

          // Suspend contractor account as subscription has been cancelled
          await prisma.contractor.update({
            where: { id: contractorId },
            data: {
              status: 'SUSPENDED',
              suspendedAt: new Date()
            }
          }).catch(() => {
            // Non-fatal
          });
        }
        break;
      }
    }

    // SECURITY: Log successful webhook processing
    // TODO(ts-phase-3): Type C — Stripe.Event.Data['object'] is a union of ~50 Stripe objects;
    // narrowing it cleanly requires a discriminated switch on event.type (done above). Extract
    // the metadata access into a typed helper once the event-type switch is unified.
    const eventObj = event.data.object as unknown as Record<string, unknown>;
    const metadata = eventObj.metadata as Record<string, string> | undefined;
    PaymentAuditLogger.logPaymentAttempt({
      contractorId: metadata?.contractorId || 'unknown',
      amount: 0,
      paymentType: 'WEBHOOK_PROCESSING',
      ipAddress: clientIP,
      result: 'SUCCESS',
      reason: `Successfully processed ${event.type} webhook`
    });

    return NextResponse.json({
      success: true,
      received: true,
      eventType: event.type
    });

  } catch (error) {
    log.error('stripe webhook processing failed', { error: error instanceof Error ? error.message : String(error), eventType: event?.type });
    captureException(error, { tags: { route: '/api/stripe/webhook', eventType: event?.type ?? 'unknown' }, extra: { requestId: log.requestId } });

    // A8 — business logic failed AFTER the WebhookDelivery insert. Roll the
    // row back so Stripe's next redelivery can re-process this event_id.
    // If the delete itself fails (e.g. DB unavailable), Stripe will see a
    // 500 here and retry; the duplicate insert path will short-circuit
    // gracefully if the row turns out to still be there.
    try {
      await prisma.webhookDelivery.delete({ where: { eventId: event.id } });
    } catch (rollbackErr) {
      log.error('webhookDelivery rollback failed', {
        eventId: event.id,
        error: rollbackErr instanceof Error ? rollbackErr.message : String(rollbackErr),
      });
    }

    PaymentAuditLogger.logSuspiciousActivity({
      ipAddress: clientIP,
      suspiciousFields: ['webhook_processing'],
      riskScore: 60,
      details: `Webhook processing error: ${error instanceof Error ? error.message : 'Unknown error'}`
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Webhook processing failed',
        code: 'WEBHOOK_PROCESSING_ERROR'
      },
      { status: 500 }
    );
  }
}

// SECURITY: Apply security middleware to webhook endpoint
export const POST = withRateLimit(
  withSecurityHeaders(handleWebhook),
  {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50, // Max 50 webhook calls per 5 minutes per IP (generous for Stripe)
    keyGenerator: (req: NextRequest) => {
      // Use IP for rate limiting webhooks
      const forwarded = req.headers.get('x-forwarded-for');
      return forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
    }
  }
);
