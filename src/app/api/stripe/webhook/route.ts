import { NextRequest, NextResponse } from 'next/server';
import { stripe, handleStripeWebhook } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { PaymentValidator, PaymentAuditLogger } from '@/lib/payment-security';
import { withSecurityHeaders, withRateLimit } from '@/lib/auth-middleware';

const prisma = new PrismaClient();

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

  let event: Stripe.Event;

  try {
    // SECURITY: Strict signature verification with Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
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
          
          // Update payment record
          await prisma.onboardingPayment.update({
            where: { contractorId },
            data: {
              applicationFeePaid: true,
              applicationFeePaidAt: new Date(),
              joiningFeePaid: true,
              joiningFeePaidAt: new Date(),
              totalPaid: (session.amount_total || 0) / 100, // Convert from cents
              paymentMethod: 'stripe_checkout',
              status: 'COMPLETED',
              stripePaymentIntentId: session.payment_intent as string }
          });

          // Update contractor status to allow onboarding to begin
          await prisma.contractor.update({
            where: { id: contractorId },
            data: {
              status: 'UNDER_REVIEW',
              onboardingStep: 1 }
          });

          // Create onboarding progress record
          await prisma.onboardingProgress.create({
            data: {
              contractorId,
              currentDay: 1,
              status: 'IN_PROGRESS',
              expectedCompletionDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
            }
          });

          // Initialize module progress for all 14 days
          const modulePromises = [];
          for (let day = 1; day <= 14; day++) {
            modulePromises.push(
              prisma.moduleProgress.create({
                data: {
                  contractorId,
                  day,
                  moduleTitle: `Day ${day} Module`,
                  status: day === 1 ? 'AVAILABLE' : 'LOCKED' }
              })
            );
          }
          await Promise.all(modulePromises);

          // Initialize subscription pricing records
          const subscriptionPromises = [];
          for (let month = 1; month <= 3; month++) {
            let discountPercentage = 0;
            let discountedPrice = 495;
            
            if (month === 1) {
              discountPercentage = 100;
              discountedPrice = 0;
            } else if (month === 2) {
              discountPercentage = 60;
              discountedPrice = 198;
            } else if (month === 3) {
              discountPercentage = 50;
              discountedPrice = 247.50;
            }
            
            subscriptionPromises.push(
              prisma.subscriptionPricing.create({
                data: {
                  contractorId,
                  month,
                  discountPercentage,
                  discountedPrice,
                  status: 'PENDING' }
              })
            );
          }
          await Promise.all(subscriptionPromises);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        if (paymentIntent.metadata?.type === 'onboarding') {
          const contractorId = paymentIntent.metadata.contractorId;
          
          await prisma.onboardingPayment.update({
            where: { contractorId },
            data: {
              stripePaymentIntentId: paymentIntent.id,
              status: 'COMPLETED' }
          });
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        if (paymentIntent.metadata?.type === 'onboarding') {
          const contractorId = paymentIntent.metadata.contractorId;
          
          await prisma.onboardingPayment.update({
            where: { contractorId },
            data: {
              status: 'FAILED' }
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata?.contractorId;
        
        if (contractorId) {
          // Find current month based on subscription start
          const startDate = new Date(subscription.created * 1000);
          const now = new Date();
          const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 + 
                           (now.getMonth() - startDate.getMonth()) + 1;
          
          await prisma.subscriptionPricing.update({
            where: {
              contractorId_month: {
                contractorId,
                month: Math.min(monthsDiff, 3), // Cap at month 3
              }
            },
            data: {
              stripeSubscriptionId: subscription.id,
              status: subscription.status === 'active' ? 'ACTIVE' : 'PENDING',
              startDate: new Date(subscription.current_period_start * 1000),
              endDate: new Date(subscription.current_period_end * 1000) }
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const contractorId = invoice.subscription_details?.metadata?.contractorId;
        
        if (contractorId && invoice.subscription) {
          // Update subscription payment record
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const startDate = new Date(subscription.created * 1000);
          const now = new Date();
          const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 + 
                           (now.getMonth() - startDate.getMonth()) + 1;
          
          await prisma.subscriptionPricing.update({
            where: {
              contractorId_month: {
                contractorId,
                month: Math.min(monthsDiff, 3) }
            },
            data: {
              paidAt: new Date(),
              status: 'PAID',
              invoiceUrl: invoice.hosted_invoice_url || undefined }
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const contractorId = subscription.metadata?.contractorId;
        
        if (contractorId) {
          // Mark subscription as cancelled
          await prisma.subscriptionPricing.updateMany({
            where: {
              contractorId,
              stripeSubscriptionId: subscription.id },
            data: {
              status: 'CANCELLED',
              cancelledAt: new Date(),
              cancellationReason: subscription.cancellation_details?.reason || 'Customer requested' }
          });
        }
        break;
      }
    }

    // SECURITY: Log successful webhook processing
    PaymentAuditLogger.logPaymentAttempt({
      contractorId: event.data.object?.metadata?.contractorId || 'unknown',
      amount: event.data.object?.amount_total || 0,
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