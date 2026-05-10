import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { randomUUID } from 'node:crypto';
import { getMockStripe } from '@/lib/services/mock/mockStripe';
import { mockEmailService } from '@/lib/services/mock/mockEmail';
import { calculateCoolingOffPeriod } from '@/lib/utils/australian-compliance';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

// Initialize Stripe or use mock. The mock is a partial implementation
// of the Stripe SDK surface used by this route — `as unknown as Stripe`
// is the boundary cast (see TS Phase 2 cluster guidance §"Cast-replacement").
// TODO(ts-phase-3): Type E — getMockStripe() returns a Partial<Stripe>-shaped object.
// Fix: type getMockStripe() as returning a dedicated interface (e.g. MockStripe extends Pick<Stripe, ...>)
// and use a union `stripe: Stripe | MockStripe` to remove the cast.
const stripe: Stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20' as const,
    })
  : (getMockStripe() as unknown as Stripe);

const emailService = process.env.EMAIL_SERVER_HOST
  ? null // Use real email service when configured
  : mockEmailService;

export interface RefundRequest {
  bookingId: string;
  paymentIntentId: string;
  reason: 'cooling_off' | 'service_not_provided' | 'quality_issue' | 'duplicate_payment' | 'other';
  amount?: number; // Optional for partial refunds
  customerEmail: string;
  customerName: string;
  description?: string;
  bookingDate: string;
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/payments/refund' });
  try {
    const refundData: RefundRequest = await request.json();

    // Validate cooling-off period for consumer protection
    const coolingOff = calculateCoolingOffPeriod(new Date(refundData.bookingDate));

    // Automatic approval for cooling-off period cancellations
    const autoApprove = refundData.reason === 'cooling_off' && coolingOff.canCancel;

    // Calculate refund amount
    let refundAmount = refundData.amount;
    if (!refundAmount) {
      // Full refund for cooling-off, otherwise calculate based on service status
      if (refundData.reason === 'cooling_off') {
        refundAmount = 275000; // Full $2,750 refund
      } else {
        // Standard refund minus processing fee
        refundAmount = 270000; // $2,700 (keeping $50 processing fee)
      }
    }

    // Process refund through Stripe
    const refund = await stripe.refunds.create(
      {
        payment_intent: refundData.paymentIntentId,
        amount: refundAmount,
        reason: mapRefundReason(refundData.reason),
        metadata: {
          bookingId: refundData.bookingId,
          customerReason: refundData.reason,
          description: refundData.description || '',
          autoApproved: autoApprove.toString(),
        },
      },
      { idempotencyKey: `dr-refund-${refundData.paymentIntentId}-${refundAmount}` },
    );

    // Update payment record with refund info.
    // CRITICAL: Stripe refund has already fired by this point (line above).
    // If this DB write fails, money has left Stripe but we have no record.
    // We MUST emit a loud signal so an Operator can reconcile manually —
    // never silently swallow.
    try {
      // The `as any` cast that lived here previously (PR #230 TODO) is
      // resolved by this PR — schema migration adds the missing fields
      // and the canonical name is `stripePaymentIntentId`.
      await prisma.payment.updateMany({
        where: { stripePaymentIntentId: refundData.paymentIntentId },
        data: {
          status: 'REFUNDED',
          refundAmountAUD: refundAmount / 100,
          refundReason: refundData.reason,
          refundedAt: new Date(),
        },
      });
    } catch (dbError) {
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      log.error('refund DB write failed AFTER Stripe refund succeeded', {
        stripeRefundId: refund.id,
        bookingId: refundData.bookingId,
        paymentIntentId: refundData.paymentIntentId,
        amountCents: refundAmount,
        error: errorMessage,
      });
      captureException(dbError, {
        tags: {
          route: '/api/payments/refund',
          severity: 'critical',
          reconciliation_required: 'true',
        },
        extra: {
          stripeRefundId: refund.id,
          bookingId: refundData.bookingId,
          paymentIntentId: refundData.paymentIntentId,
          amountCents: refundAmount,
        },
      });
      // Emit a compliance event so the Operator dashboard surfaces this
      // as a manual-reconciliation task. Best-effort — if compliance
      // events are flag-off the captureException above is the audit trail.
      await logComplianceEvent({
        eventType: 'payment_refund_db_failure',
        correlationId: randomUUID(),
        correlationType: 'system',
        amountCents: refundAmount,
        amountCurrency: 'AUD',
        metadata: {
          stripeRefundId: refund.id,
          bookingId: refundData.bookingId,
          paymentIntentId: refundData.paymentIntentId,
          dbError: errorMessage,
          customerEmailHash: 'use-hashIdentifier-on-read',
        },
      });
      // Still return success to the caller — the customer HAS been
      // refunded. The reconciliation task is internal.
    }

    // Send confirmation email
    if (emailService) {
      await emailService.sendEmail({
        to: refundData.customerEmail,
        subject: `Refund Processed - ${refundData.bookingId}`,
        html: generateRefundEmail(refundData, refundAmount, refund.id),
        text: `Your refund of $${(refundAmount / 100).toFixed(2)} has been processed.`,
      });
    }

    return NextResponse.json({
      success: true,
      refundId: refund.id,
      amount: refundAmount,
      status: refund.status,
      estimatedArrival: '5-10 business days',
      coolingOffApplied: refundData.reason === 'cooling_off',
      message: autoApprove
        ? 'Refund automatically approved under cooling-off period rights'
        : 'Refund processed successfully',
    });
  } catch (error: any) {
    log.error('refund error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/payments/refund' },
      extra: { requestId: log.requestId },
    });

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to process refund',
        code: error.code,
      },
      { status: 400 },
    );
  }
}

function mapRefundReason(reason: string): Stripe.RefundCreateParams.Reason {
  const reasonMap: Record<string, Stripe.RefundCreateParams.Reason> = {
    cooling_off: 'requested_by_customer',
    service_not_provided: 'requested_by_customer',
    quality_issue: 'requested_by_customer',
    duplicate_payment: 'duplicate',
    other: 'requested_by_customer',
  };

  return reasonMap[reason] || 'requested_by_customer';
}

function generateRefundEmail(refundData: RefundRequest, amount: number, refundId: string): string {
  const amountFormatted = (amount / 100).toFixed(2);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; colour: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-colour: #0052CC; colour: white; padding: 20px; text-align: centre; }
        .content { padding: 20px; background-colour: #f9f9f9; }
        .footer { padding: 20px; text-align: centre; font-size: 12px; colour: #666; }
        .amount { font-size: 24px; font-weight: bold; colour: #0052CC; }
        .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #0052CC; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Refund Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${refundData.customerName},</p>
          
          <p>Your refund has been successfully processed.</p>
          
          <div class="info-box">
            <p><strong>Refund Details:</strong></p>
            <p>Booking ID: ${refundData.bookingId}</p>
            <p>Refund ID: ${refundId}</p>
            <p>Amount: <span class="amount">$${amountFormatted} AUD</span></p>
            <p>Reason: ${refundData.reason.replace(/_/g, ' ')}</p>
            ${refundData.reason === 'cooling_off' ? '<p><em>Processed under Australian Consumer Law cooling-off period rights</em></p>' : ''}
          </div>
          
          <div class="info-box">
            <p><strong>What Happens Next?</strong></p>
            <ul>
              <li>The refund will be credited to your original payment method</li>
              <li>Processing time: 5-10 business days</li>
              <li>You will receive a confirmation from your bank</li>
            </ul>
          </div>
          
          <p>If you have any questions about your refund, please contact us at:</p>
          <ul>
            <li>Email: support@disasterrecovery.com.au</li>
            <li>email: Online Form Available 24/7</li>
          </ul>
          
          <p>Thank you for your understanding.</p>
        </div>
        <div class="footer">
          <p>© 2024 Disaster Recovery Pty Ltd | ABN: 11 234 567 890</p>
          <p>This email confirms your refund request has been processed.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
