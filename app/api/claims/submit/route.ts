import { writeEnquiryFromClaimBody } from '@/lib/claims/enquiry-fallback';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { claimSubmitSchema } from '@/lib/validation/schemas';
import { getCallerIdentity } from '@/lib/auth/require-session';
import { encrypt, decrypt, isConfigured } from '@/lib/encryption';
import { dispatchClaimStatusNotification } from '@/lib/notifications';
import { rateLimit } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';
import { generateClaimSupportPackEmail } from '@/lib/claim-support-pack';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Fixed platform fee (optional at submission stage)
const PLATFORM_FEE = 2750.0;

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
    contractorAssigned: ['ASSIGNED', 'CONTRACTOR_ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].includes(
      normalized,
    ),
    contractorAccepted: ['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    initialContactMade: ['CONTACTED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    jobScheduled: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED'].includes(normalized),
    makeSafeCompleted: ['MAKE_SAFE_COMPLETED', 'COMPLETED'].includes(normalized),
    documentationProvided: ['DOCUMENTED', 'COMPLETED'].includes(normalized),
    claimFinalized: ['COMPLETED', 'FINALIZED'].includes(normalized),
  };
}

function buildTrackClaimFromInput(
  id: string,
  body: any,
  createdAt: string,
  paymentProcessed: boolean,
): TrackClaimPayload {
  return {
    id,
    status: 'SUBMITTED',
    createdAt,
    client: {
      fullName: body.fullName || 'Unknown Client',
      phone: body.phone || '',
      email: body.email || '',
    },
    property: {
      address: body.propertyAddress || '',
      suburb: body.suburb || '',
      state: body.state || '',
      postcode: body.postcode || '',
    },
    damage: {
      types: Array.isArray(body.damageTypes) ? body.damageTypes : ['General Property Damage'],
      urgencyLevel: body.urgencyLevel || 'standard',
      description: body.damageDescription || '',
    },
    contractor: {
      companyName: null,
      contactPerson: null,
      directPhone: null,
      assignedAt: null,
      acceptedAt: null,
    },
    workflow: deriveWorkflow('SUBMITTED', paymentProcessed),
  };
}

function buildTrackClaimFromDb(claim: {
  id: string;
  status?: string | null;
  submittedAt?: Date | null;
  createdAt?: Date;
  clientId?: string | null;
  damageDescription?: string | null;
  paymentAmountAUD?: number | null;
}): TrackClaimPayload {
  return {
    id: claim.id,
    status: claim.status || 'SUBMITTED',
    createdAt: (claim.submittedAt || claim.createdAt || new Date()).toISOString(),
    client: {
      fullName: 'Claimant',
      phone: '',
      email: claim.clientId || '',
    },
    property: {
      address: '',
      suburb: '',
      state: '',
      postcode: '',
    },
    damage: {
      types: ['General Property Damage'],
      urgencyLevel: 'standard',
      description: claim.damageDescription || '',
    },
    contractor: {
      companyName: null,
      contactPerson: null,
      directPhone: null,
      assignedAt: null,
      acceptedAt: null,
    },
    workflow: deriveWorkflow(claim.status || 'SUBMITTED', Number(claim.paymentAmountAUD || 0) > 0),
  };
}

function buildTrackClaimFromEnquiry(enquiry: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  metadata: string | null;
  responded: boolean;
  createdAt: Date;
}): TrackClaimPayload {
  let payload: Record<string, unknown> = {};
  try {
    const meta = enquiry.metadata ? (JSON.parse(enquiry.metadata) as { payload?: Record<string, unknown> }) : null;
    if (meta?.payload && typeof meta.payload === 'object') {
      payload = meta.payload;
    }
  } catch {
    // metadata may be missing or malformed — fall back to enquiry columns
  }

  const body = {
    fullName: (payload.fullName as string) || enquiry.name,
    phone: (payload.phone as string) || enquiry.phone || '',
    email: (payload.email as string) || enquiry.email,
    propertyAddress: (payload.propertyAddress as string) || '',
    suburb: (payload.suburb as string) || '',
    state: (payload.state as string) || '',
    postcode: (payload.postcode as string) || '',
    damageTypes: Array.isArray(payload.damageTypes) ? payload.damageTypes : undefined,
    urgencyLevel: (payload.urgencyLevel as string) || 'standard',
    damageDescription:
      (payload.damageDescription as string) || enquiry.message.replace(/^\[public-claim-submit\]\s*/i, ''),
  };

  const track = buildTrackClaimFromInput(
    enquiry.id,
    body,
    enquiry.createdAt.toISOString(),
    false,
  );
  if (enquiry.responded) {
    track.status = 'IN_PROGRESS';
    track.workflow = deriveWorkflow('IN_PROGRESS', false);
  }
  return track;
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/claims/submit' });
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
    const parsed = claimSubmitSchema.safeParse(raw);
    if (!parsed.success) {
      log.warn('claim intake validation failed', { issues: parsed.error.issues.length });
      await logComplianceEvent({
        eventType: 'claim_intake_created',
        correlationId: '00000000-0000-0000-0000-000000000000',
        correlationType: 'system',
        entityType: 'system',
        metadata: {
          outcome: 'validation_failed',
          request_id: log.requestId,
          issues: parsed.error.issues.length,
        },
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request',
          details: parsed.error.issues,
        },
        { status: 400 },
      );
    }
    const body = parsed.data;
    // APP 11: never log raw PII. Hash identifiers; postcode + urgency are
    // non-PII (postcode alone is not personally identifying per the privacy.md
    // taxonomy; urgency is internal classification).
    log.info('claim intake received', {
      email_hash: hashIdentifier(body.email),
      postcode: body.postcode,
      urgency: body.urgencyLevel,
    });

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
      log.error('ENCRYPTION_SECRET is not configured; cannot store access instructions', {
        ref: 'DR-390',
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
          message: 'Please contact support',
        },
        { status: 500 },
      );
    }

    // Encrypt property access instructions before persistence (DR-390)
    const encryptedAccessInstructions = body.accessInstructions
      ? await encrypt(body.accessInstructions)
      : null;

    // Create the InsuranceClaimAU record
    try {
      const claim = await prisma.insuranceClaimAU.create({
        data: {
          bookingId: body.bookingId || '',
          clientId: body.clientId || body.email,
          insuranceProviderId: normalizedProvider,
          policyNumber: normalizedPolicyNumber,
          claimNumber: body.insuranceClaimNumber || null,
          totalClaimAmountAUD: totalClaimAmount,
          paymentAmountAUD: paymentAmount,
          // HOTFIX 2026-04-29 — prod uses `InsuranceClaimStatus` enum
          // (insurer-adjudication stages, uppercase). The `ClaimStatus`
          // restoration-lifecycle enum from B9 represents a separate phase;
          // domain-modelling split tracked in DR-XXX.
          status: 'SUBMITTED',
          damageDescription: body.damageDescription,
          damagePhotos: Array.isArray(body.damagePhotos) ? body.damagePhotos : [],
          additionalDocuments: Array.isArray(body.uploadedDocuments) ? body.uploadedDocuments : [],
          // DR-390: accessInstructions stored as encrypted blob — never log or expose this field
          accessInstructions: encryptedAccessInstructions,
          submittedAt: new Date(),
          tenantId: body.tenantId || null,
        },
      });
      trackClaim = buildTrackClaimFromInput(claim.id, body, createdAtIso, paymentConfirmed);

      await logComplianceEvent({
        eventType: 'claim_intake_created',
        correlationId: claim.id,
        correlationType: 'claim',
        entityType: 'customer',
        entityIdentifier: body.email,
        metadata: {
          damage_types: body.damageTypes,
          urgency: body.urgencyLevel,
          payment_confirmed: paymentConfirmed,
          request_id: log.requestId,
        },
      });

      // DR-389: Dispatch initial SUBMITTED notification (non-blocking)
      void dispatchClaimStatusNotification({
        claimId: claim.id,
        newStatus: 'SUBMITTED',
      });
    } catch (dbError) {
      // D4 Path 1 — anonymous public submissions can't satisfy the
      // FK constraints on InsuranceClaimAU (Booking + users +
      // InsuranceProvider). Per
      // docs/audits/dr-claim-submission-fk-debt-2026-04-29.md, write
      // to the canonical pre-claim funnel table (Enquiry) instead.
      // Ops promotes Enquiry -> InsuranceClaimAU later, once the
      // submitter is verified + a Booking is created.
      log.warn('claim DB write failed; routing to Enquiry funnel', {
        error: dbError instanceof Error ? dbError.message : String(dbError),
      });
      try {
        const fallback = await writeEnquiryFromClaimBody(prisma, body, {
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') ?? undefined,
        });
        trackClaim = buildTrackClaimFromInput(
          fallback.enquiryId,
          body,
          fallback.writtenAt,
          paymentConfirmed,
        );
        await logComplianceEvent({
          eventType: 'claim_intake_created',
          correlationId: fallback.enquiryId,
          correlationType: 'claim',
          entityType: 'customer',
          entityIdentifier: body.email,
          metadata: {
            outcome: 'enquiry_funnel',
            request_id: log.requestId,
            enquiry_id: fallback.enquiryId,
            damage_types: body.damageTypes,
            urgency: body.urgencyLevel,
            payment_confirmed: paymentConfirmed,
          },
        });
        captureException(dbError, {
          tags: { route: '/api/claims/submit', stage: 'db_write', recovery: 'enquiry_funnel' },
          extra: { requestId: log.requestId, enquiryId: fallback.enquiryId },
        });
      } catch (enquiryError) {
        log.error('both claim DB and enquiry funnel writes failed', {
          claimError: dbError instanceof Error ? dbError.message : String(dbError),
          enquiryError: enquiryError instanceof Error ? enquiryError.message : String(enquiryError),
        });
        captureException(enquiryError, {
          tags: {
            route: '/api/claims/submit',
            stage: 'enquiry_fallback',
            severity: 'critical',
          },
          extra: { requestId: log.requestId },
        });
        await logComplianceEvent({
          eventType: 'claim_intake_created',
          correlationId: '00000000-0000-0000-0000-000000000000',
          correlationType: 'system',
          entityType: 'system',
          metadata: {
            outcome: 'both_writes_failed',
            request_id: log.requestId,
          },
        });
        return NextResponse.json(
          {
            success: false,
            error:
              'We could not save your claim right now. Please try again shortly, or call us if the problem continues.',
            code: 'CLAIM_PERSISTENCE_FAILED',
          },
          { status: 503 },
        );
      }
    }

    if (!trackClaim) {
      return NextResponse.json(
        {
          success: false,
          error:
            'We could not save your claim right now. Please try again shortly, or call us if the problem continues.',
          code: 'CLAIM_PERSISTENCE_FAILED',
        },
        { status: 503 },
      );
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
      log.error('claim support pack email failed (non-critical)', {
        error: emailError instanceof Error ? emailError.message : String(emailError),
      });
    }

    return NextResponse.json(
      {
        success: true,
        claimId: trackClaim.id,
        message: paymentConfirmed
          ? 'Claim submitted successfully.'
          : 'Claim submitted successfully.',
        nextSteps: [
          'Your claim is being matched with a certified NRPG contractor',
          'A verified contractor will review your claim and contact you directly',
          'They will schedule an inspection at your convenience',
          'The contractor handles restoration work and bills you directly',
        ],
        importantNotes: [
          'Disaster Recovery is a network orchestrator — we connect you with certified contractors',
          'Your assigned contractor handles service delivery and invoices you directly',
          'Contractors follow NRPG standards and guidelines',
          'Disaster Recovery does not hold client funds or invoice for restoration work',
        ],
        trackingUrl: `/track/${trackClaim.id}`,
        supportPackUrl: `/claim/${trackClaim.id}/support`,
      },
      { status: 201 },
    );
  } catch (error) {
    log.error('claim intake failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/claims/submit' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process claim',
        message: 'Please contact support',
      },
      { status: 500 },
    );
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
  const log = requestLogger(request, { route: '/api/claims/submit' });
  const { searchParams } = new URL(request.url);
  const claimId = searchParams.get('id');

  // DR-521: Resolve caller identity from the validated server session.
  // Returns role='public' with null userId/email when no session exists.
  const { role: callerRole, userId: callerId } = await getCallerIdentity();
  const canReadAccessInstructions =
    callerRole === 'admin' || callerRole === 'super_admin' || callerRole === 'contractor';

  if (!claimId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Claim ID required',
      },
      { status: 400 },
    );
  }

  try {
    const claim = await prisma.insuranceClaimAU.findUnique({
      where: { id: claimId },
    });

    if (claim) {
      // DR-390: Decrypt access instructions only for authorised callers
      let decryptedAccessInstructions: string | null = null;
      if (canReadAccessInstructions && claim.accessInstructions) {
        try {
          decryptedAccessInstructions = await decrypt(claim.accessInstructions);
        } catch (decryptErr) {
          log.error('failed to decrypt accessInstructions', {
            ref: 'DR-390',
            claimId,
            callerId,
            error: decryptErr instanceof Error ? decryptErr.message : String(decryptErr),
          });
        }
      }

      const trackClaim = buildTrackClaimFromDb(claim);
      return NextResponse.json({
        success: true,
        claim: trackClaim,
        ...(canReadAccessInstructions && {
          accessInstructions: decryptedAccessInstructions,
        }),
      });
    }

    // Most public submissions land in Enquiry (FK-safe funnel) — resolve those next.
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: claimId },
    });
    if (enquiry && enquiry.source === 'public_claim_submit') {
      return NextResponse.json({
        success: true,
        claim: buildTrackClaimFromEnquiry(enquiry),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Claim not found',
      },
      { status: 404 },
    );
  } catch (error) {
    log.error('error fetching claim', {
      error: error instanceof Error ? error.message : String(error),
      claimId,
    });
    captureException(error, {
      tags: { route: '/api/claims/submit' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch claim',
        message: 'Please contact support',
      },
      { status: 500 },
    );
  }
}
