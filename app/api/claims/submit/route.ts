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
  const clientId = claim.clientId || '';
  const emailLooksValid = clientId.includes('@');
  return {
    id: claim.id,
    status: claim.status || 'SUBMITTED',
    createdAt: (claim.submittedAt || claim.createdAt || new Date()).toISOString(),
    client: {
      fullName: 'Claimant',
      phone: '',
      email: emailLooksValid ? clientId : '',
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
    // Path A: public intake does not take a platform fee payment at submit.
    workflow: deriveWorkflow(claim.status || 'SUBMITTED', false),
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
    const meta = enquiry.metadata
      ? (JSON.parse(enquiry.metadata) as { payload?: Record<string, unknown> })
      : null;
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
      (payload.damageDescription as string) ||
      enquiry.message.replace(/^\[public-claim-submit\]\s*/i, ''),
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

function parseDamageTypes(raw: string | null | undefined): string[] {
  if (!raw) return ['General Property Damage'];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(String);
  } catch {
    // plain string
  }
  return raw.trim() ? [raw.trim()] : ['General Property Damage'];
}

function buildTrackClaimFromLead(lead: {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  damageType: string;
  damageDescription: string;
  urgencyLevel: string;
  status: string;
  createdAt: Date;
  assignedAt: Date | null;
  acceptedAt: Date | null;
  partner?: { businessName: string } | null;
}): TrackClaimPayload {
  return {
    id: lead.id,
    status: lead.status || 'SUBMITTED',
    createdAt: lead.createdAt.toISOString(),
    client: {
      fullName: lead.fullName,
      phone: lead.phone,
      email: lead.email,
    },
    property: {
      address: lead.propertyAddress,
      suburb: lead.suburb,
      state: lead.state,
      postcode: lead.postcode,
    },
    damage: {
      types: parseDamageTypes(lead.damageType),
      urgencyLevel: (lead.urgencyLevel || 'standard').toLowerCase(),
      description: lead.damageDescription,
    },
    contractor: {
      companyName: lead.partner?.businessName ?? null,
      contactPerson: null,
      directPhone: null,
      assignedAt: lead.assignedAt?.toISOString() ?? null,
      acceptedAt: lead.acceptedAt?.toISOString() ?? null,
    },
    workflow: deriveWorkflow(
      lead.status === 'COMPLETED'
        ? 'COMPLETED'
        : lead.status === 'ACCEPTED'
          ? 'IN_PROGRESS'
          : lead.status === 'ASSIGNED'
            ? 'ASSIGNED'
            : 'SUBMITTED',
      false,
    ),
  };
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

    // Attach authenticated CLIENT user id when present (never trust client-supplied alone).
    const session = await getCallerIdentity();
    const resolvedClientId =
      session.role === 'client' && session.userId
        ? session.userId
        : body.clientId || body.email;

    // Canonical track store is Enquiry (full payload in metadata). InsuranceClaimAU
    // is best-effort for ops promotion — anonymous public forms usually fail FK checks.
    let enquiryId: string | null = null;
    let enquiryError: unknown = null;
    let insuranceClaimId: string | null = null;

    try {
      const fallback = await writeEnquiryFromClaimBody(prisma, body, {
        ipAddress: ip,
        userAgent: request.headers.get('user-agent') ?? undefined,
      });
      enquiryId = fallback.enquiryId;
      trackClaim = buildTrackClaimFromInput(
        fallback.enquiryId,
        body,
        fallback.writtenAt,
        false,
      );
    } catch (err) {
      enquiryError = err;
      log.warn('enquiry funnel write failed; attempting InsuranceClaimAU', {
        error: err instanceof Error ? err.message : String(err),
      });
    }

    try {
      const claim = await prisma.insuranceClaimAU.create({
        data: {
          bookingId: body.bookingId || '',
          clientId: resolvedClientId,
          insuranceProviderId: normalizedProvider,
          policyNumber: normalizedPolicyNumber,
          claimNumber: body.insuranceClaimNumber || null,
          totalClaimAmountAUD: totalClaimAmount,
          paymentAmountAUD: paymentAmount,
          status: 'SUBMITTED',
          damageDescription: body.damageDescription,
          damagePhotos: Array.isArray(body.damagePhotos) ? body.damagePhotos : [],
          additionalDocuments: Array.isArray(body.uploadedDocuments)
            ? body.uploadedDocuments
            : [],
          accessInstructions: encryptedAccessInstructions,
          submittedAt: new Date(),
          tenantId: body.tenantId || null,
        },
      });
      insuranceClaimId = claim.id;

      // Prefer Enquiry id for public tracking so GET can rebuild a rich payload.
      if (!trackClaim) {
        trackClaim = buildTrackClaimFromInput(claim.id, body, createdAtIso, false);
      }

      if (enquiryId) {
        try {
          const enquiry = await prisma.enquiry.findUnique({ where: { id: enquiryId } });
          if (enquiry?.metadata) {
            const meta = JSON.parse(enquiry.metadata) as Record<string, unknown>;
            meta.insuranceClaimAuId = claim.id;
            await prisma.enquiry.update({
              where: { id: enquiryId },
              data: { metadata: JSON.stringify(meta) },
            });
          }
        } catch {
          // Non-fatal linkage
        }
      }

      void dispatchClaimStatusNotification({
        claimId: claim.id,
        newStatus: 'SUBMITTED',
      });
    } catch (dbError) {
      if (!trackClaim) {
        log.warn('InsuranceClaimAU write failed and no Enquiry track id yet', {
          error: dbError instanceof Error ? dbError.message : String(dbError),
        });
      } else {
        log.info('InsuranceClaimAU write skipped/failed; Enquiry track id retained', {
          enquiry_id: enquiryId,
          error: dbError instanceof Error ? dbError.message : String(dbError),
        });
      }
      if (!enquiryId) {
        captureException(dbError, {
          tags: { route: '/api/claims/submit', stage: 'db_write' },
          extra: { requestId: log.requestId },
        });
      }
    }

    if (!trackClaim) {
      log.error('both Enquiry and InsuranceClaimAU writes failed', {
        enquiryError:
          enquiryError instanceof Error ? enquiryError.message : String(enquiryError ?? ''),
      });
      captureException(
        enquiryError instanceof Error
          ? enquiryError
          : new Error('CLAIM_PERSISTENCE_FAILED'),
        {
          tags: {
            route: '/api/claims/submit',
            stage: 'dual_write',
            severity: 'critical',
          },
          extra: { requestId: log.requestId },
        },
      );
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

    await logComplianceEvent({
      eventType: 'claim_intake_created',
      correlationId: trackClaim.id,
      correlationType: 'claim',
      entityType: 'customer',
      entityIdentifier: body.email,
      metadata: {
        outcome: enquiryId ? (insuranceClaimId ? 'dual_write' : 'enquiry_funnel') : 'insurance_claim_only',
        request_id: log.requestId,
        enquiry_id: enquiryId,
        insurance_claim_id: insuranceClaimId,
        damage_types: body.damageTypes,
        urgency: body.urgencyLevel,
        payment_confirmed: false,
        client_id_bound: Boolean(session.role === 'client' && session.userId),
      },
    });

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

// Get claim by ID — resolves Enquiry (canonical public track), InsuranceClaimAU,
// or Lead. Access instructions are only decrypted for assigned contractors / admins.
export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/claims/submit' });
  const { searchParams } = new URL(request.url);
  const claimId = searchParams.get('id');

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
    // 1) Canonical public intake — Enquiry with full metadata payload
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: claimId },
    });
    if (enquiry && enquiry.source === 'public_claim_submit') {
      return NextResponse.json({
        success: true,
        claim: buildTrackClaimFromEnquiry(enquiry),
        source: 'enquiry',
      });
    }

    // 2) InsuranceClaimAU — enrich from linked Enquiry metadata when possible
    const claim = await prisma.insuranceClaimAU.findUnique({
      where: { id: claimId },
    });

    if (claim) {
      let trackClaim = buildTrackClaimFromDb(claim);

      // Prefer rich Enquiry payload when ops dual-wrote / linked this claim
      const linked = await prisma.enquiry.findFirst({
        where: {
          source: 'public_claim_submit',
          metadata: { contains: claim.id },
        },
        orderBy: { createdAt: 'desc' },
      });
      if (linked) {
        trackClaim = { ...buildTrackClaimFromEnquiry(linked), id: claim.id, status: claim.status };
      } else if (claim.clientId?.includes('@')) {
        const byEmail = await prisma.enquiry.findFirst({
          where: { email: claim.clientId, source: 'public_claim_submit' },
          orderBy: { createdAt: 'desc' },
        });
        if (byEmail) {
          trackClaim = { ...buildTrackClaimFromEnquiry(byEmail), id: claim.id, status: claim.status };
        }
      }

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

      return NextResponse.json({
        success: true,
        claim: trackClaim,
        source: 'insurance_claim',
        ...(canReadAccessInstructions && {
          accessInstructions: decryptedAccessInstructions,
        }),
      });
    }

    // 3) Partner Lead funnel (account history may link Lead ids)
    const lead = await prisma.lead.findUnique({
      where: { id: claimId },
      include: { partner: { select: { businessName: true } } },
    });
    if (lead) {
      return NextResponse.json({
        success: true,
        claim: buildTrackClaimFromLead(lead),
        source: 'lead',
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
        code: 'CLAIM_FETCH_FAILED',
      },
      { status: 500 },
    );
  }
}
