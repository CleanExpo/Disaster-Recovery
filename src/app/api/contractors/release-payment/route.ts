import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia' });

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
    status: 'pending' },
  {
    id: 'kpi-002',
    name: 'Site Attendance',
    description: 'Contractor has attended the property for initial assessment',
    required: true,
    status: 'pending' },
  {
    id: 'kpi-003',
    name: 'Damage Assessment',
    description: 'Complete damage assessment report submitted',
    required: true,
    status: 'pending' },
  {
    id: 'kpi-004',
    name: 'Work Commencement',
    description: 'Emergency mitigation work has commenced',
    required: true,
    status: 'pending' },
  {
    id: 'kpi-005',
    name: 'Customer Confirmation',
    description: 'Customer has confirmed contractor attendance and work commencement',
    required: true,
    status: 'pending' },
];

// Validate KPIs are met for payment release
function validateKPIs(kpiCheckpoints: KPICheckpoint[], releaseType: string): {
  valid: boolean;
  message: string;
  completedCount: number;
  requiredCount: number;
} {
  const requiredKPIs = kpiCheckpoints.filter(kpi => kpi.required);
  const completedRequired = requiredKPIs.filter(kpi => 
    kpi.status === 'completed' || kpi.status === 'waived'
  );

  if (releaseType === 'emergency') {
    // Emergency release has lower requirements
    const minRequiredForEmergency = 2;
    if (completedRequired.length >= minRequiredForEmergency) {
      return {
        valid: true,
        message: 'Emergency release criteria met',
        completedCount: completedRequired.length,
        requiredCount: minRequiredForEmergency };
    }
    return {
      valid: false,
      message: `Emergency release requires at least ${minRequiredForEmergency} KPIs completed`,
      completedCount: completedRequired.length,
      requiredCount: minRequiredForEmergency };
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
        requiredCount: minRequired };
    }
    return {
      valid: false,
      message: `Partial release requires at least ${minRequired} KPIs completed`,
      completedCount: completedRequired.length,
      requiredCount: minRequired };
  }

  // Full release requires all required KPIs
  if (completedRequired.length === requiredKPIs.length) {
    return {
      valid: true,
      message: 'All required KPIs completed',
      completedCount: completedRequired.length,
      requiredCount: requiredKPIs.length };
  }

  return {
    valid: false,
    message: `Full release requires all ${requiredKPIs.length} KPIs to be completed`,
    completedCount: completedRequired.length,
    requiredCount: requiredKPIs.length };
}

export async function POST(request: NextRequest) {
  try {
    const releaseRequest: PaymentReleaseRequest = await request.json();

    // Validate KPIs
    const kpiValidation = validateKPIs(releaseRequest.kpiCheckpoints, releaseRequest.releaseType);
    
    if (!kpiValidation.valid) {
      return NextResponse.json({
        success: false,
        message: kpiValidation.message,
        data: {
          completedKPIs: kpiValidation.completedCount,
          requiredKPIs: kpiValidation.requiredCount,
          kpiDetails: releaseRequest.kpiCheckpoints } }, { status: 400 });
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

    // In production, fetch contractor's Stripe Connect account
    // const contractor = await getContractor(releaseRequest.contractorId);
    // const stripeAccountId = contractor.stripeConnectAccountId;

    // For demo purposes, we'll simulate the contractor's Stripe account
    const mockStripeAccountId = 'acct_1234567890'; // This would be the contractor's Connect account

    try {
      // Create a transfer to the contractor's Stripe Connect account
      // In production, this would transfer from your platform account to the contractor's account
      const transfer = await stripe.transfers.create({
        amount: releaseAmount,
        currency: 'aud',
        destination: mockStripeAccountId,
        transfer_group: releaseRequest.bookingId,
        description: `Payment release for job ${releaseRequest.bookingId}`,
        metadata: {
          bookingId: releaseRequest.bookingId,
          contractorId: releaseRequest.contractorId,
          jobId: releaseRequest.jobId,
          releaseType: releaseRequest.releaseType,
          kpisCompleted: releaseRequest.kpiCheckpoints
            .filter(kpi => kpi.status === 'completed')
            .map(kpi => kpi.id)
            .join(','),
          authorizedBy: releaseRequest.authorizedBy } });

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
          .filter(kpi => kpi.status === 'completed')
          .map(kpi => kpi.id),
        authorizedBy: releaseRequest.authorizedBy,
        notes: releaseRequest.adminNotes };

      // In production, update database records
      // await updateJobPaymentStatus(releaseRequest.bookingId, paymentRelease);
      // await notifyContractor(releaseRequest.contractorId, paymentRelease);

      // Send notification to contractor
      const contractorNotification = {
        to: 'contractor@example.com', // Would be fetched from contractor record
        subject: `Payment Released - Job ${releaseRequest.bookingId}`,
        message: `Good news! A payment of $${(releaseAmount / 100).toFixed(2)} has been released for job ${releaseRequest.bookingId}.`,
        paymentDetails: {
          amount: releaseAmount,
          type: releaseRequest.releaseType,
          transferId: transfer.id,
          expectedArrival: '1-2 business days' } };

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
          nextSteps: remainingBalance > 0 ? 
            'Complete remaining KPIs for full payment release' : 
            'All payments have been released' } });

    } catch (stripeError) {
      console.error('Stripe transfer error:', stripeError);
      throw new Error('Failed to process payment transfer');
    }

  } catch (error) {
    console.error('Payment release error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to release payment',
      error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

// Get payment release history for a job
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');
  const contractorId = searchParams.get('contractorId');

  if (!bookingId && !contractorId) {
    return NextResponse.json({
      success: false,
      message: 'Either bookingId or contractorId is required' }, { status: 400 });
  }

  // Mock payment history
  const mockPaymentHistory: JobPaymentDetails = {
    bookingId: bookingId || 'NRP-2024-ABC123',
    contractorId: contractorId || 'CONT-001',
    totalAmount: 220000,
    amountReleased: 110000,
    amountPending: 110000,
    serviceFee: 55000,
    status: 'partial_released',
    stripePaymentIntentId: 'pi_1234567890',
    contractorStripeAccountId: 'acct_1234567890',
    releases: [
      {
        id: 'REL-001',
        amount: 66000,
        type: 'emergency',
        releasedAt: new Date(Date.now() - 86400000).toISOString(),
        stripeTransferId: 'tr_1234567890',
        kpisCompleted: ['kpi-001', 'kpi-002'],
        authorizedBy: 'admin@nrp.com.au',
        notes: 'Emergency release for immediate work commencement' },
      {
        id: 'REL-002',
        amount: 44000,
        type: 'partial',
        releasedAt: new Date(Date.now() - 43200000).toISOString(),
        stripeTransferId: 'tr_',
        kpisCompleted: ['kpi-003', 'kpi-004'],
        authorizedBy: 'admin@nrp.com.au',
        notes: 'Partial release after damage assessment completed' },
    ] };

  // Also return current KPI status
  const currentKPIs = defaultKPIs.map(kpi => ({
    ...kpi,
    status: ['kpi-001', 'kpi-002', 'kpi-003', 'kpi-004'].includes(kpi.id) ? 'completed' : 'pending',
    completedAt: ['kpi-001', 'kpi-002', 'kpi-003', 'kpi-004'].includes(kpi.id) 
      ? new Date(Date.now() - Math.random() * 86400000).toISOString() 
      : undefined }));

  return NextResponse.json({
    success: true,
    data: {
      paymentDetails: mockPaymentHistory,
      kpiStatus: currentKPIs,
      summary: {
        totalAmount: `$${(mockPaymentHistory.totalAmount / 100).toFixed(2)}`,
        released: `$${(mockPaymentHistory.amountReleased / 100).toFixed(2)}`,
        pending: `$${(mockPaymentHistory.amountPending / 100).toFixed(2)}`,
        releaseCount: mockPaymentHistory.releases.length,
        completedKPIs: currentKPIs.filter(k => k.status === 'completed').length,
        totalKPIs: currentKPIs.length } } });
}