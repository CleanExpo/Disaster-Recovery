import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { generateClaimSupportPackEmail } from '@/lib/claim-support-pack';
import { encrypt, decrypt, isConfigured } from '@/lib/encryption';
import { dispatchClaimStatusNotification } from '@/lib/notifications';
import { rateLimit } from '@/lib/rate-limit';
import { getCallerIdentity } from '@/lib/auth/require-session';
import fs from 'node:fs/promises';

const ALLOWED_STATES = ['ACT','NSW','NT','QLD','SA','TAS','VIC','WA','NZ'];

const ClaimSubmitSchema = z.object({
  fullName:            z.string().min(1).max(200),
  email:               z.string().email().max(254),
  phone:               z.string().min(6).max(20).optional(),
  propertyAddress:     z.string().min(1).max(300),
  suburb:              z.string().min(1).max(100).optional(),
  state:               z.enum(ALLOWED_STATES as [string, ...string[]]).optional(),
  postcode:            z.string().regex(/^\d{4}$/).optional(),
  damageTypes:         z.array(z.string().max(100)).min(1).max(20),
  damageDescription:   z.string().min(1).max(5000),
  urgencyLevel:        z.enum(['emergency','urgent','standard']).optional(),
  policyNumber:        z.string().max(100).optional(),
  insuranceCompany:    z.string().max(200).optional(),
  insuranceClaimNumber:z.string().max(100).optional(),
  accessInstructions:  z.string().max(500).optional(),
  paymentConfirmed:    z.boolean().optional(),
  // Internal fields — validated loosely
  bookingId:           z.string().max(100).optional(),
  clientId:            z.string().max(254).optional(),
  tenantId:            z.string().max(100).optional(),
  damagePhotos:        z.array(z.string().url().max(500)).max(20).optional(),
  uploadedDocuments:   z.array(z.string().url().max(500)).max(20).optional(),
});
import path from 'node:path';

// Fixed platform fee (optional at submission stage)
const PLATFORM_FEE = 2750.00;
const FALLBACK_REPORT_PATH = path.join('/tmp', 'claim-fallback-submissions.jsonl');

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
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = await rateLimit(ip, 'claims-submit');
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfter ?? 60) },
      },
    );
  }

  try {
    const raw = await request.json();
    const parsed = ClaimSubmitSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request',
        details: parsed.error.issues,
      }, { status: 400 });
    }
    const body = parsed.data;

    // Platform fee is server-authoritative — never trust client-supplied amount
    const totalClaimAmount = PLATFORM_FEE;

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

    // DR-390 / DR-491: Only block if access instructions are provided and encryption is not configured.
    // ENCRYPTION_SECRET is set in Vercel Production (DR-491). Claims without access instructions
    // do not require encryption and proceed normally regardless.
    if (body.accessInstructions && !isConfigured() && process.env.NODE_ENV !== 'development') {
      console.error('[security] DR-390: ENCRYPTION_SECRET is not configured. Cannot store access instructions without encryption in production.');
      return NextResponse.json({
        success: false,
        error: 'Server configuration error',
        message: 'Please contact support',
      }, { status: 500 });
    }

    // Encrypt property access instructions before persistence (DR-390)
    const encryptedAccessInstructions = body.accessInstructions
      ? await encrypt(body.accessInstructions)
      : null;

    // Create the InsuranceClaimAU record
    try {
      const claim = await prisma.insuranceClaimAU.create({
        data: {
          bookingId:             body.bookingId            || '',
          clientId:              body.clientId              || body.email,
          insuranceProviderId:   normalizedProvider,
          policyNumber:          normalizedPolicyNumber,
          claimNumber:           body.insuranceClaimNumber  || null,
          totalClaimAmountAUD:   totalClaimAmount,
          paymentAmountAUD:      paymentAmount,
          status:                'SUBMITTED',
          damageDescription:     body.damageDescription,
          damagePhotos:          Array.isArray(body.damagePhotos) ? body.damagePhotos : [],
          additionalDocuments:   Array.isArray(body.uploadedDocuments) ? body.uploadedDocuments : [],
          // DR-390: accessInstructions stored as encrypted blob — never log or expose this field
          accessInstructions:    encryptedAccessInstructions,
          submittedAt:           new Date(),
          tenantId:              body.tenantId || null,
        },
      });
      trackClaim = buildTrackClaimFromInput(claim.id, body, createdAtIso, paymentConfirmed);

      // DR-389: Dispatch initial SUBMITTED notification (non-blocking)
      void dispatchClaimStatusNotification({
        claimId: claim.id,
        newStatus: 'SUBMITTED',
      });
    } catch (dbError) {
      const fallbackId = `local-${Date.now().toString(36)}`;
      trackClaim = buildTrackClaimFromInput(fallbackId, body, createdAtIso, paymentConfirmed);
      try {
        await writeFallbackClaim(trackClaim);
      } catch (fsError) {
        // Vercel serverless filesystem is read-only — log but don't propagate
        console.error('Fallback file write failed (read-only serverless filesystem):', fsError);
      }
      console.error('Claim DB write failed, continuing with in-memory fallback ID:', dbError);
    }

    // Send Claim Support Pack email (non-blocking — failures don't block the claim)
    try {
      const supportPackEmail = generateClaimSupportPackEmail({
        claimId: trackClaim.id,
        clientName: body.fullName,
        email: body.email,
        propertyAddress: body.propertyAddress,
        suburb: body.suburb ?? '',
        state: body.state ?? '',
        postcode: body.postcode ?? '',
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
// DR-390: Access instructions are only decrypted and returned when the caller
// is an assigned contractor or an admin.
//
// DR-521: Caller identity is now resolved from the NextAuth server session.
// The JWT is validated server-side — callers cannot forge their role by
// setting request headers.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const claimId = searchParams.get('id');

  // DR-521: Resolve caller identity from the validated server session.
  // Returns role='public' with null userId/email when no session exists.
  const { role: callerRole, userId: callerId } = await getCallerIdentity();
  const canReadAccessInstructions =
    callerRole === 'admin' || callerRole === 'super_admin' || callerRole === 'contractor';

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

    // DR-390: Decrypt access instructions only for authorised callers
    let decryptedAccessInstructions: string | null = null;
    if (canReadAccessInstructions && claim.accessInstructions) {
      try {
        decryptedAccessInstructions = await decrypt(claim.accessInstructions);
      } catch (decryptErr) {
        // Log but do not expose — return null so the caller knows the field exists
        // but the value cannot be delivered (e.g. key rotation in progress).
        console.error(`[security] DR-390: Failed to decrypt accessInstructions for claim ${claimId} (caller: ${callerId}):`, decryptErr);
      }
    }

    const trackClaim = buildTrackClaimFromDb(claim);
    return NextResponse.json({
      success: true,
      claim: trackClaim,
      // accessInstructions is a separate top-level field so it is never mixed
      // into the public claim payload by accident.
      ...(canReadAccessInstructions && {
        accessInstructions: decryptedAccessInstructions,
      }),
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
