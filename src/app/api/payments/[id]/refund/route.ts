import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { refundPaymentSchema, validateRequest, formatZodErrors } from '@/lib/validation';
import { createRefund } from '@/lib/stripe';

interface RouteParams {
  params: { id: string };
}

// Create refund for a payment
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const user = session.user as any;
    const body = await request.json();

    // Validate request
    const validation = validateRequest(refundPaymentSchema, { ...body, paymentId: id });
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { amount, reason } = validation.data;

    // Get payment
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Only admins can process refunds
    if (!isAdmin(user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Check if payment is refundable
    if (payment.status !== 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Only completed payments can be refunded' },
        { status: 400 }
      );
    }

    // Calculate refund amount
    const refundAmount = amount || payment.amount - payment.refundedAmount;

    if (refundAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid refund amount' },
        { status: 400 }
      );
    }

    if (refundAmount > payment.amount - payment.refundedAmount) {
      return NextResponse.json(
        { success: false, error: 'Refund amount exceeds available amount' },
        { status: 400 }
      );
    }

    // Process Stripe refund if applicable
    let stripeRefund = null;
    if (payment.stripePaymentIntentId) {
      stripeRefund = await createRefund({
        paymentIntentId: payment.stripePaymentIntentId,
        amount: refundAmount,
        reason: reason || 'requested_by_customer',
      });
    }

    // Create refund record
    const refund = await prisma.refund.create({
      data: {
        paymentId: id,
        amount: refundAmount,
        reason: reason || null,
        stripeRefundId: stripeRefund?.id || null,
        status: 'COMPLETED',
        processedBy: user.id,
      },
    });

    // Update payment
    const newRefundedAmount = payment.refundedAmount + refundAmount;
    const newStatus = newRefundedAmount >= payment.amount ? 'REFUNDED' : 'COMPLETED';

    await prisma.payment.update({
      where: { id },
      data: {
        refundedAmount: newRefundedAmount,
        status: newStatus,
      },
    });

    return NextResponse.json({
      success: true,
      data: refund,
      message: 'Refund processed successfully',
    });
  } catch (error) {
    console.error('Process refund error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
