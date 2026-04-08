import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { PaymentValidator, PaymentAuditLogger } from '@/lib/payment-security';
import { withSecurityHeaders, withRateLimit } from '@/lib/auth-middleware';
import { sendEmail, emailTemplates } from '@/lib/email';

async function handleWebhook(req: NextRequest) {
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
    console.error('STRIPE_WEBHOOK_SECRET not configured');
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
    console.error('Webhook signature verification failed:', error);

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

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

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
            console.warn(`Webhook metadata validation failed for ${contractorId}: ${metadataValidation.reason}`);
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

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

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
              sendEmail(
                contractor.email,
                {
                  subject: 'Payment Failed — NRPG Onboarding',
                  html: `<p>Hi ${contractor.username ?? 'Contractor'},</p>
<p>Your onboarding payment could not be processed. Reason: ${failureReason}</p>
<p>Please visit <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://disasterrecovery.com.au'}/contractor/onboarding">your onboarding page</a> to retry the payment.</p>
<p>If you continue to have issues, please contact us at <a href="https://disasterrecovery.com.au/contact">disasterrecovery.com.au/contact</a>.</p>
<p>— National Recovery Partners Group</p>`
                }
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
    console.error('Error processing webhook:', error);

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
