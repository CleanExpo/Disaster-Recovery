import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { generateClaimSupportPackEmail } from '@/lib/claim-support-pack';
import { ZodError } from 'zod';
import { claimSubmitSchema, claimGetSchema } from '@/lib/api/validations';
import {
  apiSuccess,
  apiValidationError,
  apiPaymentRequired,
  apiBadRequest,
  apiNotFound,
  apiInternalError,
} from '@/lib/api/responses';

// Fixed platform fee
const PLATFORM_FEE = 2750.00;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // --- Zod validation (replaces 5 manual if-blocks) ---
    const parsed = claimSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error);
    }
    const data = parsed.data;

    // --- Business rule: payment amount must match platform fee ---
    if (data.paymentAmount !== PLATFORM_FEE) {
      return apiPaymentRequired(
        `Platform fee of $${PLATFORM_FEE} must be paid before claim submission`,
        { requiredAmount: PLATFORM_FEE },
      );
    }

    // Build the total claim amount from the platform fee (or body override if provided)
    const totalClaimAmount = data.totalClaimAmount ?? PLATFORM_FEE;

    // Create the InsuranceClaimAU record
    const claim = await prisma.insuranceClaimAU.create({
      data: {
        bookingId:            data.bookingId,
        clientId:             data.clientId ?? data.email,
        insuranceProviderId:  data.insuranceCompany ?? 'UNKNOWN',
        policyNumber:         data.policyNumber,
        claimNumber:          data.insuranceClaimNumber ?? null,
        totalClaimAmountAUD:  totalClaimAmount,
        paymentAmountAUD:     PLATFORM_FEE,
        status:               'SUBMITTED',
        damageDescription:    data.damageDescription,
        damagePhotos:         data.damagePhotos,
        additionalDocuments:  data.uploadedDocuments,
        submittedAt:          new Date(),
        tenantId:             data.tenantId ?? null,
      },
    });

    // Send Claim Support Pack email (non-blocking — failures don't block the claim)
    try {
      const supportPackEmail = generateClaimSupportPackEmail({
        claimId: claim.id,
        clientName: data.fullName,
        email: data.email,
        propertyAddress: data.propertyAddress,
        suburb: data.suburb,
        state: data.state,
        postcode: data.postcode,
        damageTypes: data.damageTypes,
        urgencyLevel: data.urgencyLevel,
        insuranceCompany: data.insuranceCompany ?? undefined,
        policyNumber: data.policyNumber,
      });
      await sendEmail(data.email, supportPackEmail);
    } catch (emailError) {
      console.error('Claim Support Pack email failed (non-critical):', emailError);
    }

    return apiSuccess({
      claimId: claim.id,
      message: 'Claim submitted successfully. Payment of $2,750 processed.',
      nextSteps: [
        'Your claim is being matched with a certified NRPG contractor',
        'The contractor will contact you directly within 60 MINUTES',
        'The contractor will schedule an inspection at your convenience',
        'All further communication will be directly with your assigned contractor',
      ],
      importantNotes: [
        'Disaster Recovery is a lead generation platform',
        'Your assigned contractor handles all service delivery',
        'Contractors follow strict NRPG standards and guidelines',
        'Platform fee covers lead generation and contractor matching only',
      ],
      trackingUrl: `/track/${claim.id}`,
      supportPackUrl: `/claim/${claim.id}/support`,
    }, 201);

  } catch (error) {
    if (error instanceof SyntaxError) {
      return apiBadRequest('Invalid JSON in request body');
    }
    return apiInternalError(error, 'claims/submit');
  }
}

// Get claim by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = { id: searchParams.get('id') ?? '' };

  const parsed = claimGetSchema.safeParse(raw);
  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  try {
    const claim = await prisma.insuranceClaimAU.findUnique({
      where: { id: parsed.data.id },
    });

    if (!claim) {
      return apiNotFound('Claim not found');
    }

    return apiSuccess({ claim });
  } catch (error) {
    return apiInternalError(error, 'claims/submit GET');
  }
}
