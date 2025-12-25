import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createPaymentSchema, validateRequest, formatZodErrors, adminSearchSchema } from '@/lib/validation';
import { createPaymentIntent, calculateFees } from '@/lib/stripe';

// Get payments (with filtering for different user types)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const bookingId = searchParams.get('bookingId');

    const user = session.user as any;
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const where: any = {};

    if (user.role === 'USER') {
      where.clientId = user.id;
    } else if (user.role === 'CONTRACTOR') {
      where.contractorId = user.id;
    }
    // Admins can see all payments

    if (status) {
      where.status = status;
    }

    if (bookingId) {
      where.bookingId = bookingId;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          booking: {
            select: {
              id: true,
              serviceType: true,
              address: true,
            },
          },
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          contractor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + payments.length < total,
      },
    });
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create a new payment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validation = validateRequest(createPaymentSchema, body);
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

    const { bookingId, amount, paymentMethod, description } = validation.data;
    const user = session.user as any;

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        contractor: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify user is the client of this booking
    if (booking.clientId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Calculate fees
    const fees = calculateFees(amount);

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        clientId: booking.clientId,
        contractorId: booking.contractorId!,
        amount,
        currency: 'usd',
        status: 'PENDING',
        paymentMethod,
        description: description || `Payment for booking ${bookingId}`,
        processingFee: fees.processingFee,
        platformFee: fees.platformFee,
        netAmount: fees.netAmount,
        refundedAmount: 0,
      },
    });

    // Create Stripe payment intent if card payment
    if (paymentMethod === 'CARD') {
      const paymentIntent = await createPaymentIntent({
        amount,
        currency: 'usd',
        customerId: booking.client?.stripeCustomerId,
        metadata: {
          paymentId: payment.id,
          bookingId,
          clientId: booking.clientId,
          contractorId: booking.contractorId!,
        },
      });

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          stripePaymentIntentId: paymentIntent.id,
          status: 'PROCESSING',
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          payment,
          clientSecret: paymentIntent.client_secret,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: { payment },
    }, { status: 201 });
  } catch (error) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
