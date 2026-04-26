import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20' as const,
});

interface KPICheckpoint {
  id: string;
  name: string;
  description: string;
  required: boolean;
  status: 'pending' | 'completed' | 'failed' | 'waived';
  completedAt?: string;
  evidence?: {
    type: 'photo' | 'document' | 'signature' | 'system';
    url?: string;
    uploadedAt?: string;
    verifiedBy?: string;
  };
}

interface PaymentReleaseRequest {
  bookingId: string;
  contractorId: string;
  jobId: string;
  releaseType: 'partial' | 'full' | 'emergency';
  amount?: number; // For partial releases
  kpiCheckpoints: KPICheckpoint[];
  adminNotes?: string;
  authorizedBy: string;
}

interface JobPaymentDetails {
  bookingId: string;
  contractorId: string;
  totalAmount: number;
  amountReleased: number;
  amountPending: number;
  serviceFee: number;
  status: 'held' | 'partial_released' | 'fully_released' | 'refunded';
  stripePaymentIntentId?: string;
  contractorStripeAccountId?: string;
  releases: PaymentRelease[];
}

interface PaymentRelease {
  id: string;
  amount: number;
  type: 'partial' | 'full' | 'emergency';
  releasedAt: string;
  stripeTransferId?: string;
  kpisCompleted: string[];
  authorizedBy: string;
  notes?: string;
}

// Initial KPI requirements for payment release
const defaultKPIs: KPICheckpoint[] = [
  {
    id: 'kpi-001',
    name: 'Initial Contact',
    description: 'Contractor has contacted the customer within the agreed timeframe',
    required: true,
    status: 'pending',
  },
  {
    id: 'kpi-002',
    name: 'Site Attendance',
    description: 'Contractor has attended the property for initial assessment',
    required: true,
    status: 'pending',
  },
  {
    id: 'kpi-003',
    name: 'Damage Assessment',
    description: 'Complete damage assessment report submitted',
    required: true,
    status: 'pending',
  },
  {
    id: 'kpi-004',
    name: 'Work Commencement',
    description: 'Emergency mitigation work has commenced',
    required: true,
    status: 'pending',
  },
  {
    id: 'kpi-005',
    name: 'Customer Confirmation',
    description: 'Customer has confirmed contractor attendance and work commencement',
    required: true,
    status: 'pending',
  },
];

// Validate KPIs are met for payment release
function validateKPIs(
  kpiCheckpoints: KPICheckpoint[],
  releaseType: string,
): {
  valid: boolean;
  message: string;
  completedCount: number;
  requiredCount: number;
} {
  const requiredKPIs = kpiCheckpoints.filter((kpi) => kpi.required);
  const completedRequired = requiredKPIs.filter(
    (kpi) => kpi.status === 'completed' || kpi.status === 'waived',
  );

  if (releaseType === 'emergency') {
    // Emergency release has lower requirements
    const minRequiredForEmergency = 2;
    if (completedRequired.length >= minRequiredForEmergency) {
      return {
        valid: true,
        message: 'Emergency release criteria met',
        completedCount: completedRequired.length,
        requiredCount: minRequiredForEmergency,
      };
    }
    return {
      valid: false,
      message: `Emergency release requires at least ${minRequiredForEmergency} KPIs completed`,
      completedCount: completedRequired.length,
      requiredCount: minRequiredForEmergency,
    };
  }

  if (releaseType === 'partial') {
    // Partial release requires 60% of KPIs
    const requiredPercentage = 0.6;
    const minRequired = Math.ceil(requiredKPIs.length * requiredPercentage);
    if (completedRequired.length >= minRequired) {
      return {
        valid: true,
        message: 'Partial release criteria met',
        completedCount: completedRequired.length,
        requiredCount: minRequired,
      };
    }
    return {
      valid: false,
      message: `Partial release requires at least ${minRequired} KPIs completed`,
      completedCount: completedRequired.length,
      requiredCount: minRequired,
    };
  }

  // Full release requires all required KPIs
  if (completedRequired.length === requiredKPIs.length) {
    return {
      valid: true,
      message: 'All required KPIs completed',
      completedCount: completedRequired.length,
      requiredCount: requiredKPIs.length,
    };
  }

  return {
    valid: false,
    message: `Full release requires all ${requiredKPIs.length} KPIs to be completed`,
    completedCount: completedRequired.length,
    requiredCount: requiredKPIs.length,
  };
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractors/release-payment' });
  try {
    const releaseRequest: PaymentReleaseRequest = await request.json();

    // Validate KPIs
    const kpiValidation = validateKPIs(releaseRequest.kpiCheckpoints, releaseRequest.releaseType);

    if (!kpiValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: kpiValidation.message,
          data: {
            completedKPIs: kpiValidation.completedCount,
            requiredKPIs: kpiValidation.requiredCount,
            kpiDetails: releaseRequest.kpiCheckpoints,
          },
        },
        { status: 400 },
      );
    }

    // Calculate release amount
    const contractorTotalAmount = 220000; // $2,200 in cents
    let releaseAmount: number;

    switch (releaseRequest.releaseType) {
      case 'emergency':
        releaseAmount = Math.floor(contractorTotalAmount * 0.3); // 30% for emergency
        break;
      case 'partial':
        releaseAmount = releaseRequest.amount || Math.floor(contractorTotalAmount * 0.5); // 50% default for partial
        break;
      case 'full':
        releaseAmount = contractorTotalAmount;
        break;
      default:
        throw new Error('Invalid release type');
    }

    // Ensure we don't release more than the total
    releaseAmount = Math.min(releaseAmount, contractorTotalAmount);

    // Look up contractor's Stripe Connect account from DB
    const contractor = await prisma.contractor.findUnique({
      where: { id: releaseRequest.contractorId },
      include: { companyProfile: true },
    });

    // Also check ContractorProfile (Supabase platform model) for stripeConnectAccountId
    let stripeAccountId: string | null | undefined = null;
    if (contractor?.companyProfile) {
      // ContractorCompany doesn't have stripeAccountId, check ContractorProfile
      const contractorProfile = await prisma.contractorProfile.findFirst({
        where: { userId: releaseRequest.contractorId },
        select: { stripeConnectAccountId: true },
      });
      stripeAccountId = contractorProfile?.stripeConnectAccountId;
    } else {
      // Try ContractorProfile directly
      const contractorProfile = await prisma.contractorProfile.findFirst({
        where: { userId: releaseRequest.contractorId },
        select: { stripeConnectAccountId: true },
      });
      stripeAccountId = contractorProfile?.stripeConnectAccountId;
    }

    if (!stripeAccountId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contractor has no connected payment account',
        },
        { status: 400 },
      );
    }

    try {
      // Create a transfer to the contractor's Stripe Connect account
      const transfer = await stripe.transfers.create(
        {
          amount: releaseAmount,
          currency: 'aud',
          destination: stripeAccountId,
          transfer_group: releaseRequest.bookingId,
          description: `Payment release for job ${releaseRequest.bookingId}`,
          metadata: {
            bookingId: releaseRequest.bookingId,
            contractorId: releaseRequest.contractorId,
            jobId: releaseRequest.jobId,
            releaseType: releaseRequest.releaseType,
            kpisCompleted: releaseRequest.kpiCheckpoints
              .filter((kpi) => kpi.status === 'completed')
              .map((kpi) => kpi.id)
              .join(','),
            authorizedBy: releaseRequest.authorizedBy,
          },
        },
        { idempotencyKey: `dr-release-${releaseRequest.jobId}-${stripeAccountId}` },
      );

      // Create payout to contractor's bank account (optional - Connect handles this)
      // Contractors can configure their payout schedule in their Connect dashboard

      // Record the payment release
      const paymentRelease: PaymentRelease = {
        id: `REL-${Date.now()}`,
        amount: releaseAmount,
        type: releaseRequest.releaseType,
        releasedAt: new Date().toISOString(),
        stripeTransferId: transfer.id,
        kpisCompleted: releaseRequest.kpiCheckpoints
          .filter((kpi) => kpi.status === 'completed')
          .map((kpi) => kpi.id),
        authorizedBy: releaseRequest.authorizedBy,
        notes: releaseRequest.adminNotes,
      };

      // Record the payment in the database
      await prisma.payment.create({
        data: {
          bookingId: releaseRequest.bookingId,
          clientId: releaseRequest.bookingId, // Will be resolved from booking context
          contractorId: releaseRequest.contractorId,
          amountAUD: releaseAmount / 100,
          platformFeeAUD: 0,
          platformFeePercentage: 0,
          gstAUD: 0,
          netAmountAUD: releaseAmount / 100,
          paymentMethod: 'stripe_transfer',
          stripePaymentIntentId: transfer.id,
          transactionId: transfer.id,
          status: 'COMPLETED',
          processedAt: new Date(),
          invoiceNumber: `REL-${Date.now()}`,
        },
      });

      // Send notification to contractor
      const contractorEmail = contractor?.email || 'contractor@example.com';
      const contractorNotification = {
        to: contractorEmail,
        subject: `Payment Released - Job ${releaseRequest.bookingId}`,
        message: `Good news! A payment of $${(releaseAmount / 100).toFixed(2)} has been released for job ${releaseRequest.bookingId}.`,
        paymentDetails: {
          amount: releaseAmount,
          type: releaseRequest.releaseType,
          transferId: transfer.id,
          expectedArrival: '1-2 business days',
        },
      };

      // Calculate remaining balance
      const remainingBalance = contractorTotalAmount - releaseAmount;

      return NextResponse.json({
        success: true,
        message: `Payment of $${(releaseAmount / 100).toFixed(2)} released successfully`,
        data: {
          releaseId: paymentRelease.id,
          bookingId: releaseRequest.bookingId,
          contractorId: releaseRequest.contractorId,
          amountReleased: releaseAmount,
          remainingBalance,
          releaseType: releaseRequest.releaseType,
          stripeTransferId: transfer.id,
          kpisCompleted: kpiValidation.completedCount,
          totalKPIs: kpiValidation.requiredCount,
          notification: contractorNotification,
          nextSteps:
            remainingBalance > 0
              ? 'Complete remaining KPIs for full payment release'
              : 'All payments have been released',
        },
      });
    } catch (stripeError) {
      log.error('stripe transfer error', {
        error: stripeError instanceof Error ? stripeError.message : String(stripeError),
      });
      throw new Error('Failed to process payment transfer');
    }
  } catch (error) {
    log.error('payment release error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractors/release-payment' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to release payment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Get payment release history for a job
export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractors/release-payment' });
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');
  const contractorId = searchParams.get('contractorId');

  if (!bookingId && !contractorId) {
    return NextResponse.json(
      {
        success: false,
        message: 'Either bookingId or contractorId is required',
      },
      { status: 400 },
    );
  }

  try {
    // Query real payment records from the database
    const payments = await prisma.payment.findMany({
      where: bookingId ? { bookingId } : { contractorId: contractorId! },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate totals from real data
    const totalReleased = payments
      .filter((p) => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + p.amountAUD, 0);

    // Look up the booking to get estimated cost as total amount
    const booking = bookingId
      ? await prisma.booking.findUnique({
          where: { id: bookingId },
          select: { estimatedCostAUD: true },
        })
      : null;

    const totalAmount = booking?.estimatedCostAUD || totalReleased;
    const amountPending = Math.max(0, totalAmount - totalReleased);

    // Build releases from payment records
    const releases: PaymentRelease[] = payments.map((p) => ({
      id: p.id,
      amount: Math.round(p.amountAUD * 100), // Convert to cents for consistency
      type: 'partial' as const,
      releasedAt: p.processedAt?.toISOString() || p.createdAt.toISOString(),
      stripeTransferId: p.transactionId || p.stripePaymentIntentId || undefined,
      kpisCompleted: [],
      authorizedBy: 'system',
      notes: p.invoiceNumber || undefined,
    }));

    const paymentDetails: JobPaymentDetails = {
      bookingId: bookingId || payments[0]?.bookingId || '',
      contractorId: contractorId || payments[0]?.contractorId || '',
      totalAmount: Math.round(totalAmount * 100),
      amountReleased: Math.round(totalReleased * 100),
      amountPending: Math.round(amountPending * 100),
      serviceFee: 0,
      status:
        totalReleased === 0 ? 'held' : amountPending > 0 ? 'partial_released' : 'fully_released',
      releases,
    };

    // Return current KPI status (default, since KPI tracking is per-release)
    const currentKPIs = defaultKPIs.map((kpi) => ({
      ...kpi,
      status: kpi.status as string,
      completedAt: undefined as string | undefined,
    }));

    return NextResponse.json({
      success: true,
      data: {
        paymentDetails,
        kpiStatus: currentKPIs,
        summary: {
          totalAmount: `$${totalAmount.toFixed(2)}`,
          released: `$${totalReleased.toFixed(2)}`,
          pending: `$${amountPending.toFixed(2)}`,
          releaseCount: releases.length,
          completedKPIs: currentKPIs.filter((k) => k.status === 'completed').length,
          totalKPIs: currentKPIs.length,
        },
      },
    });
  } catch (error) {
    log.error('payment history fetch error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractors/release-payment' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch payment history',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
