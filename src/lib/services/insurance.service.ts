/**
 * Insurance Provider Integration Service
 *
 * Handles integration with major Australian insurance companies:
 * - NRMA, Suncorp, Allianz, QBE, IAG, CGU, Medibank
 * - Policy verification
 * - Claim submission
 * - Claim tracking and status updates
 */

import { PrismaClient, InsuranceClaimStatus } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================================
// TYPES
// ============================================================================

export interface InsurancePolicyVerificationRequest {
  insuranceProvider: string;
  policyNumber: string;
  clientEmail: string;
}

export interface InsurancePolicyVerificationResult {
  valid: boolean;
  policyNumber?: string;
  policyHolder?: string;
  coverageType?: string;
  coverageAmount?: number;
  expiryDate?: Date;
  error?: string;
}

export interface InsuranceClaimSubmissionRequest {
  bookingId: string;
  insuranceProvider: string;
  policyNumber: string;
  totalClaimAmountAUD: number;
  damageDescription: string;
  damagePhotos: string[];
  invoiceUrl?: string;
  estimateUrl?: string;
  additionalDocuments?: string[];
}

export interface InsuranceClaimSubmissionResult {
  success: boolean;
  claimId?: string;
  claimNumber?: string;
  message: string;
  error?: string;
}

// ============================================================================
// PROVIDER CONFIGURATION
// ============================================================================

const INSURANCE_PROVIDERS = {
  NRMA: {
    name: 'NRMA',
    contactEmail: 'claims@nrma.com.au',
    contactPhone: '1300 136 111',
    supportedStates: ['NSW', 'ACT'],
    apiEndpoint: process.env.NRMA_API_URL,
  },
  SUNCORP: {
    name: 'Suncorp',
    contactEmail: 'claims@suncorp.com.au',
    contactPhone: '13 11 10',
    supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    apiEndpoint: process.env.SUNCORP_API_URL,
  },
  ALLIANZ: {
    name: 'Allianz',
    contactEmail: 'claims@allianz.com.au',
    contactPhone: '1300 134 142',
    supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    apiEndpoint: process.env.ALLIANZ_API_URL,
  },
  QBE: {
    name: 'QBE',
    contactEmail: 'claims@qbe.com.au',
    contactPhone: '1300 720 336',
    supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    apiEndpoint: process.env.QBE_API_URL,
  },
  IAG: {
    name: 'IAG',
    contactEmail: 'claims@iag.com.au',
    contactPhone: '1300 650 411',
    supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    apiEndpoint: process.env.IAG_API_URL,
  },
  CGU: {
    name: 'CGU',
    contactEmail: 'claims@cgu.com.au',
    contactPhone: '1300 130 649',
    supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    apiEndpoint: process.env.CGU_API_URL,
  },
  MEDIBANK: {
    name: 'Medibank',
    contactEmail: 'claims@medibank.com.au',
    contactPhone: '132 331',
    supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
    apiEndpoint: process.env.MEDIBANK_API_URL,
  },
};

// ============================================================================
// POLICY VERIFICATION
// ============================================================================

/**
 * Verify insurance policy with provider
 * In production, connects to actual insurance provider APIs
 */
export async function verifyInsurancePolicy(
  request: InsurancePolicyVerificationRequest
): Promise<InsurancePolicyVerificationResult> {
  try {
    const provider = INSURANCE_PROVIDERS[request.insuranceProvider as keyof typeof INSURANCE_PROVIDERS];

    if (!provider) {
      return {
        valid: false,
        error: 'Insurance provider not supported',
      };
    }

    // In production, call provider's API
    // For now, simulate verification by checking database
    const insuranceProvider = await prisma.insuranceProvider.findUnique({
      where: { code: request.insuranceProvider },
    });

    if (!insuranceProvider) {
      return {
        valid: false,
        error: 'Insurance provider not found in system',
      };
    }

    // TODO: Implement actual API calls to insurance providers
    // This would validate the policy number format and connect to their systems

    return {
      valid: true,
      policyNumber: request.policyNumber,
      policyHolder: 'Policy Holder Name', // Would come from API
      coverageType: 'Home & Contents',
      coverageAmount: 500000,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    };
  } catch (error) {
    console.error('Error verifying insurance policy:', error);
    return {
      valid: false,
      error: 'Error verifying policy',
    };
  }
}

// ============================================================================
// CLAIM SUBMISSION
// ============================================================================

/**
 * Submit insurance claim to provider
 */
export async function submitInsuranceClaim(
  request: InsuranceClaimSubmissionRequest,
  userId: string
): Promise<InsuranceClaimSubmissionResult> {
  try {
    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: request.bookingId },
      include: { client: true },
    });

    if (!booking) {
      return {
        success: false,
        message: 'Booking not found',
        error: 'Invalid booking ID',
      };
    }

    // Verify insurance provider
    const insuranceProvider = await prisma.insuranceProvider.findUnique({
      where: { code: request.insuranceProvider },
    });

    if (!insuranceProvider) {
      return {
        success: false,
        message: 'Insurance provider not found',
        error: 'Invalid insurance provider',
      };
    }

    // Check if claim already exists for this booking
    const existingClaim = await prisma.insuranceClaimAU.findFirst({
      where: {
        bookingId: request.bookingId,
        policyNumber: request.policyNumber,
      },
    });

    if (existingClaim && existingClaim.status !== InsuranceClaimStatus.DRAFT) {
      return {
        success: false,
        message: 'Claim already submitted for this booking',
        error: 'Duplicate claim submission',
      };
    }

    // Generate claim number
    const claimNumber = generateClaimNumber(request.insuranceProvider);

    // Create or update claim
    const claim = await prisma.insuranceClaimAU.upsert({
      where: {
        id: existingClaim?.id || 'new',
      },
      update: {
        status: InsuranceClaimStatus.SUBMITTED,
        submittedAt: new Date(),
        damagePhotos: request.damagePhotos,
        invoiceUrl: request.invoiceUrl,
        estimateUrl: request.estimateUrl,
        additionalDocuments: request.additionalDocuments || [],
      },
      create: {
        bookingId: request.bookingId,
        clientId: booking.clientId,
        insuranceProviderId: insuranceProvider.id,
        policyNumber: request.policyNumber,
        claimNumber,
        totalClaimAmountAUD: BigInt(Math.round(request.totalClaimAmountAUD * 100)) / BigInt(100),
        status: InsuranceClaimStatus.SUBMITTED,
        damageDescription: request.damageDescription,
        damagePhotos: request.damagePhotos,
        invoiceUrl: request.invoiceUrl,
        estimateUrl: request.estimateUrl,
        additionalDocuments: request.additionalDocuments || [],
        submittedAt: new Date(),
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'InsuranceClaim',
        entityId: claim.id,
        performedBy: userId,
        newValues: {
          claimNumber,
          totalClaimAmount: request.totalClaimAmountAUD,
          insuranceProvider: request.insuranceProvider,
        } as any,
      },
    });

    // TODO: Send claim to insurance provider API
    // awaitsubmitClaimToProvider(claim, insuranceProvider);

    return {
      success: true,
      claimId: claim.id,
      claimNumber,
      message: 'Claim submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting insurance claim:', error);
    return {
      success: false,
      message: 'Error submitting claim',
      error: 'An unexpected error occurred',
    };
  }
}

// ============================================================================
// CLAIM TRACKING
// ============================================================================

/**
 * Get claim status and tracking information
 */
export async function getClaimStatus(claimId: string): Promise<{
  found: boolean;
  status?: InsuranceClaimStatus;
  claimNumber?: string;
  totalClaimAmountAUD?: number;
  approvedAmountAUD?: number;
  submittedAt?: Date;
  approvedAt?: Date;
  paidAt?: Date;
  message: string;
}> {
  try {
    const claim = await prisma.insuranceClaimAU.findUnique({
      where: { id: claimId },
      include: {
        insuranceProvider: {
          select: { name: true },
        },
      },
    });

    if (!claim) {
      return {
        found: false,
        message: 'Claim not found',
      };
    }

    return {
      found: true,
      status: claim.status,
      claimNumber: claim.claimNumber || undefined,
      totalClaimAmountAUD: Number(claim.totalClaimAmountAUD),
      approvedAmountAUD: claim.approvedAmountAUD ? Number(claim.approvedAmountAUD) : undefined,
      submittedAt: claim.submittedAt || undefined,
      approvedAt: claim.approvedAt || undefined,
      paidAt: claim.paidAt || undefined,
      message: `Claim status: ${claim.status}`,
    };
  } catch (error) {
    console.error('Error getting claim status:', error);
    return {
      found: false,
      message: 'Error retrieving claim status',
    };
  }
}

/**
 * Update claim status (admin/provider function)
 */
export async function updateClaimStatus(
  claimId: string,
  newStatus: InsuranceClaimStatus,
  approvedAmount?: number
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const updates: any = { status: newStatus };

    if (newStatus === InsuranceClaimStatus.APPROVED && approvedAmount !== undefined) {
      updates.approvedAmountAUD = approvedAmount;
      updates.approvedAt = new Date();
    }

    if (newStatus === InsuranceClaimStatus.PAYMENT_PROCESSED) {
      updates.paidAt = new Date();
    }

    if (newStatus === InsuranceClaimStatus.DENIED) {
      updates.deniedAt = new Date();
    }

    await prisma.insuranceClaimAU.update({
      where: { id: claimId },
      data: updates,
    });

    return {
      success: true,
      message: `Claim status updated to ${newStatus}`,
    };
  } catch (error) {
    console.error('Error updating claim status:', error);
    return {
      success: false,
      message: 'Error updating claim status',
    };
  }
}

// ============================================================================
// LIST INSURANCE PROVIDERS
// ============================================================================

/**
 * Get all supported insurance providers
 */
export async function getInsuranceProviders(): Promise<
  Array<{
    code: string;
    name: string;
    contactEmail: string;
    contactPhone: string;
    supportedStates: string[];
    isVerified: boolean;
  }>
> {
  try {
    const providers = await prisma.insuranceProvider.findMany({
      where: { isActive: true },
      select: {
        code: true,
        name: true,
        contactEmail: true,
        contactPhone: true,
        supportedStates: true,
        isVerified: true,
      },
    });

    return providers;
  } catch (error) {
    console.error('Error getting insurance providers:', error);
    return [];
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate unique claim number for provider
 */
function generateClaimNumber(provider: string): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${provider}-${timestamp}-${random}`;
}
