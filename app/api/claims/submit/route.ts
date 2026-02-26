import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { generateClaimSupportPackEmail } from '@/lib/claim-support-pack';

// Fixed platform fee
const PLATFORM_FEE = 2750.00;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate payment
    if (!body.paymentConfirmed || body.paymentAmount !== PLATFORM_FEE) {
      return NextResponse.json({
        success: false,
        error: 'Payment required',
        message: `Platform fee of $${PLATFORM_FEE} must be paid before claim submission`,
        requiredAmount: PLATFORM_FEE
      }, { status: 402 });
    }

    // Validate required fields
    if (!body.fullName || !body.email) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'fullName and email are required'
      }, { status: 400 });
    }

    if (!body.propertyAddress || !body.suburb || !body.state || !body.postcode) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'propertyAddress, suburb, state, and postcode are required'
      }, { status: 400 });
    }

    if (!body.damageDescription) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'damageDescription is required'
      }, { status: 400 });
    }

    if (!body.policyNumber) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'policyNumber is required'
      }, { status: 400 });
    }

    // Build the total claim amount from the platform fee (or body override if provided)
    const totalClaimAmount = typeof body.totalClaimAmount === 'number'
      ? body.totalClaimAmount
      : PLATFORM_FEE;

    // Create the InsuranceClaimAU record
    const claim = await prisma.insuranceClaimAU.create({
      data: {
        bookingId:            body.bookingId            || '',
        clientId:             body.clientId              || body.email,
        insuranceProviderId:  body.insuranceCompany      || 'UNKNOWN',
        policyNumber:         body.policyNumber,
        claimNumber:          body.insuranceClaimNumber  || null,
        totalClaimAmountAUD:  totalClaimAmount,
        paymentAmountAUD:     PLATFORM_FEE,
        status:               'SUBMITTED',
        damageDescription:    body.damageDescription,
        damagePhotos:         Array.isArray(body.damagePhotos) ? body.damagePhotos : [],
        additionalDocuments:  Array.isArray(body.uploadedDocuments) ? body.uploadedDocuments : [],
        submittedAt:          new Date(),
        tenantId:             body.tenantId || null,
      },
    });

    // Send Claim Support Pack email (non-blocking — failures don't block the claim)
    try {
      const supportPackEmail = generateClaimSupportPackEmail({
        claimId: claim.id,
        clientName: body.fullName,
        email: body.email,
        propertyAddress: body.propertyAddress,
        suburb: body.suburb,
        state: body.state,
        postcode: body.postcode,
        damageTypes: Array.isArray(body.damageTypes) ? body.damageTypes : [],
        urgencyLevel: body.urgencyLevel || 'standard',
        insuranceCompany: body.insuranceCompany || undefined,
        policyNumber: body.policyNumber || undefined,
      });
      await sendEmail(body.email, supportPackEmail);
    } catch (emailError) {
      // Log but don't fail the claim — email is supplementary
      console.error('Claim Support Pack email failed (non-critical):', emailError);
    }

    return NextResponse.json({
      success: true,
      claimId: claim.id,
      message: 'Claim submitted successfully. Payment of $2,750 processed.',
      nextSteps: [
        'Your claim is being matched with a certified NRPG contractor',
        'The contractor will contact you directly within 60 MINUTES',
        'The contractor will schedule an inspection at your convenience',
        'All further communication will be directly with your assigned contractor'
      ],
      importantNotes: [
        'Disaster Recovery is a lead generation platform',
        'Your assigned contractor handles all service delivery',
        'Contractors follow strict NRPG standards and guidelines',
        'Platform fee covers lead generation and contractor matching only'
      ],
      trackingUrl: `/track/${claim.id}`
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing claim:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process claim',
      message: 'Please contact support'
    }, { status: 500 });
  }
}

// Get claim by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const claimId = searchParams.get('id');

  if (!claimId) {
    return NextResponse.json({
      success: false,
      error: 'Claim ID required'
    }, { status: 400 });
  }

  try {
    const claim = await prisma.insuranceClaimAU.findUnique({
      where: { id: claimId },
    });

    if (!claim) {
      return NextResponse.json({
        success: false,
        error: 'Claim not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      claim: claim
    });
  } catch (error) {
    console.error('Error fetching claim:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch claim',
      message: 'Please contact support'
    }, { status: 500 });
  }
}
