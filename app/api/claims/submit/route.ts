import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { generateClaimSupportPackEmail } from '@/lib/claim-support-pack';
import fs from 'node:fs/promises';
import path from 'node:path';

// Fixed platform fee (optional at submission stage)
const PLATFORM_FEE = 2750.00;
const FALLBACK_REPORT_PATH = path.join(process.cwd(), '.reports', 'claim-fallback-submissions.jsonl');

type TrackClaimPayload = {
  id: string;
  status: string;
  createdAt: string;
  client: {
    fullName: string;
    phone: string;
    email: string;
  };
  property: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  damage: {
    types: string[];
    urgencyLevel: string;
    description: string;
  };
  contractor: {
    companyName: string | null;
    contactPerson: string | null;
    directPhone: string | null;
    assignedAt: string | null;
    acceptedAt: string | null;
  };
  workflow: {
    paymentProcessed: boolean;
    contractorAssigned: boolean;
    contractorAccepted: boolean;
    initialContactMade: boolean;
    jobScheduled: boolean;
    makeSafeCompleted: boolean;
    documentationProvided: boolean;
    claimFinalized: boolean;
  };
};

function deriveWorkflow(status: string, paymentProcessed: boolean): TrackClaimPayload['workflow'] {
  const normalized = (status || '').toUpperCase();
  return {
    paymentProcessed,
    contractorAssigned: ['ASSIGNED', 'CONTRACTOR_ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    contractorAccepted: ['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    initialContactMade: ['CONTACTED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    jobScheduled: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    makeSafeCompleted: ['MAKE_SAFE_COMPLETED', 'COMPLETED'].includes(normalized),
    documentationProvided: ['DOCUMENTED', 'COMPLETED'].includes(normalized),
    claimFinalized: ['COMPLETED', 'FINALIZED'].includes(normalized)
  };
}

function buildTrackClaimFromInput(id: string, body: any, createdAt: string, paymentProcessed: boolean): TrackClaimPayload {
  return {
    id,
    status: 'SUBMITTED',
    createdAt,
    client: {
      fullName: body.fullName || 'Unknown Client',
      phone: body.phone || '',
      email: body.email || ''
    },
    property: {
      address: body.propertyAddress || '',
      suburb: body.suburb || '',
      state: body.state || '',
      postcode: body.postcode || ''
    },
    damage: {
      types: Array.isArray(body.damageTypes) ? body.damageTypes : ['General Property Damage'],
      urgencyLevel: body.urgencyLevel || 'standard',
      description: body.damageDescription || ''
    },
    contractor: {
      companyName: null,
      contactPerson: null,
      directPhone: null,
      assignedAt: null,
      acceptedAt: null
    },
    workflow: deriveWorkflow('SUBMITTED', paymentProcessed)
  };
}

function buildTrackClaimFromDb(claim: any): TrackClaimPayload {
  return {
    id: claim.id,
    status: claim.status || 'SUBMITTED',
    createdAt: (claim.submittedAt || claim.createdAt || new Date()).toISOString(),
    client: {
      fullName: 'Claimant',
      phone: '',
      email: claim.clientId || ''
    },
    property: {
      address: '',
      suburb: '',
      state: '',
      postcode: ''
    },
    damage: {
      types: ['General Property Damage'],
      urgencyLevel: 'standard',
      description: claim.damageDescription || ''
    },
    contractor: {
      companyName: null,
      contactPerson: null,
      directPhone: null,
      assignedAt: null,
      acceptedAt: null
    },
    workflow: deriveWorkflow(claim.status || 'SUBMITTED', Number(claim.paymentAmountAUD || 0) > 0)
  };
}

async function writeFallbackClaim(claim: TrackClaimPayload) {
  await fs.mkdir(path.dirname(FALLBACK_REPORT_PATH), { recursive: true });
  await fs.appendFile(FALLBACK_REPORT_PATH, `${JSON.stringify(claim)}\n`, 'utf8');
}

async function readFallbackClaim(claimId: string): Promise<TrackClaimPayload | null> {
  try {
    const content = await fs.readFile(FALLBACK_REPORT_PATH, 'utf8');
    const lines = content.split('\n').filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      try {
        const parsed = JSON.parse(lines[i]) as TrackClaimPayload;
        if (parsed.id === claimId) return parsed;
      } catch {
        // Skip malformed line
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'fullName, email, and phone are required'
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

    if (!Array.isArray(body.damageTypes) || body.damageTypes.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'At least one damage type is required'
      }, { status: 400 });
    }

    // Build the total claim amount from the platform fee (or body override if provided)
    const totalClaimAmount = typeof body.totalClaimAmount === 'number'
      ? body.totalClaimAmount
      : PLATFORM_FEE;

    const normalizedPolicyNumber =
      typeof body.policyNumber === 'string' && body.policyNumber.trim().length > 0
        ? body.policyNumber.trim()
        : `PENDING-${Date.now().toString().slice(-8)}`;

    const normalizedProvider =
      typeof body.insuranceCompany === 'string' && body.insuranceCompany.trim().length > 0
        ? body.insuranceCompany.trim()
        : 'SELF_MANAGED';

    const paymentConfirmed = Boolean(body.paymentConfirmed);
    const paymentAmount = paymentConfirmed ? PLATFORM_FEE : 0;
    const createdAtIso = new Date().toISOString();
    let trackClaim: TrackClaimPayload | null = null;

    // Create the InsuranceClaimAU record
    try {
      const claim = await prisma.insuranceClaimAU.create({
        data: {
          bookingId:            body.bookingId            || '',
          clientId:             body.clientId              || body.email,
          insuranceProviderId:  normalizedProvider,
          policyNumber:         normalizedPolicyNumber,
          claimNumber:          body.insuranceClaimNumber  || null,
          totalClaimAmountAUD:  totalClaimAmount,
          paymentAmountAUD:     paymentAmount,
          status:               'SUBMITTED',
          damageDescription:    body.damageDescription,
          damagePhotos:         Array.isArray(body.damagePhotos) ? body.damagePhotos : [],
          additionalDocuments:  Array.isArray(body.uploadedDocuments) ? body.uploadedDocuments : [],
          submittedAt:          new Date(),
          tenantId:             body.tenantId || null,
        },
      });
      trackClaim = buildTrackClaimFromInput(claim.id, body, createdAtIso, paymentConfirmed);
    } catch (dbError) {
      const fallbackId = `local-${Date.now().toString(36)}`;
      trackClaim = buildTrackClaimFromInput(fallbackId, body, createdAtIso, paymentConfirmed);
      await writeFallbackClaim(trackClaim);
      console.error('Claim stored in fallback file because DB write failed:', dbError);
    }

    // Send Claim Support Pack email (non-blocking — failures don't block the claim)
    try {
      const supportPackEmail = generateClaimSupportPackEmail({
        claimId: trackClaim.id,
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
      claimId: trackClaim.id,
      message: paymentConfirmed
        ? 'Claim submitted successfully. Payment received.'
        : 'Claim submitted successfully.',
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
      trackingUrl: `/track/${trackClaim.id}`,
      supportPackUrl: `/claim/${trackClaim.id}/support`
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
      const fallback = await readFallbackClaim(claimId);
      if (!fallback) {
        return NextResponse.json({
          success: false,
          error: 'Claim not found'
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        claim: fallback
      });
    }

    return NextResponse.json({
      success: true,
      claim: buildTrackClaimFromDb(claim)
    });
  } catch (error) {
    console.error('Error fetching claim:', error);
    const fallback = await readFallbackClaim(claimId);
    if (fallback) {
      return NextResponse.json({
        success: true,
        claim: fallback
      });
    }
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch claim',
      message: 'Please contact support'
    }, { status: 500 });
  }
}
