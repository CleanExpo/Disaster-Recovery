import { prisma } from '@/lib/prisma';
import { findNextContractor, OFFER_TIMEOUT_MINUTES } from '@/lib/contractor-matching';
import { sendEmail, emailTemplates } from '@/lib/email';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import type { ClaimIntake, DrService, UrgencyLevel } from './types';

type VoiceDispatchInput = {
  sessionId: string;
  name: string;
  phone: string;
  email?: string | null;
  postcode: string;
  damageType: string;
  description: string;
  suburb?: string | null;
  state?: string | null;
  propertyAddress?: string | null;
  propertyType?: 'residential' | 'commercial' | 'unknown';
  urgency?: UrgencyLevel | null;
  insurer?: string | null;
  policyNumber?: string | null;
};

export type VoiceDispatchResult = {
  jobId: string;
  leadId: string | null;
  offerId: string | null;
  dispatchStatus: 'offered' | 'no_contractors' | 'existing_offer';
};

const STATE_BY_POSTCODE_PREFIX: Record<string, string> = {
  '0': 'NT',
  '2': 'NSW',
  '3': 'VIC',
  '4': 'QLD',
  '5': 'SA',
  '6': 'WA',
  '7': 'TAS',
};

const CENTROID_BY_STATE: Record<string, { lat: number; lng: number }> = {
  ACT: { lat: -35.2809, lng: 149.13 },
  NSW: { lat: -33.8688, lng: 151.2093 },
  NT: { lat: -12.4634, lng: 130.8456 },
  QLD: { lat: -27.4698, lng: 153.0251 },
  SA: { lat: -34.9285, lng: 138.6007 },
  TAS: { lat: -42.8821, lng: 147.3272 },
  VIC: { lat: -37.8136, lng: 144.9631 },
  WA: { lat: -31.9523, lng: 115.8613 },
};

function stateFromPostcode(postcode: string): string {
  if (/^26|^29/.test(postcode)) return 'ACT';
  return STATE_BY_POSTCODE_PREFIX[postcode.charAt(0)] ?? 'QLD';
}

function locationForPostcode(postcode: string, state: string) {
  return CENTROID_BY_STATE[state] ?? CENTROID_BY_STATE.QLD;
}

function normaliseServiceType(damageType: string): string {
  const value = damageType.toLowerCase();
  if (value.includes('fire') || value.includes('smoke')) return 'Fire';
  if (value.includes('mould') || value.includes('mold')) return 'Mould';
  if (value.includes('storm') || value.includes('cyclone') || value.includes('hail'))
    return 'Storm';
  if (value.includes('sewage') || value.includes('sewer')) return 'Sewage';
  if (value.includes('biohazard') || value.includes('trauma')) return 'Biohazard';
  return 'Water damage';
}

function normaliseUrgency(urgency?: UrgencyLevel | null): string {
  switch (urgency) {
    case 'immediate':
      return 'emergency';
    case 'same-day':
      return 'urgent';
    default:
      return 'standard';
  }
}

function leadDamageType(serviceType: string): string[] {
  return [serviceType];
}

export function claimIntakeToDispatchInput(intake: ClaimIntake): VoiceDispatchInput | null {
  if (!intake.callerName || !intake.callerPhone || !intake.propertyPostcode || !intake.service) {
    return null;
  }

  return {
    sessionId: intake.conversationId,
    name: intake.callerName,
    phone: intake.callerPhone,
    email: intake.callerEmail,
    postcode: intake.propertyPostcode,
    damageType: intake.service,
    description: intake.summary,
    suburb: intake.propertySuburb,
    state: intake.propertyState,
    propertyAddress: intake.propertyAddress,
    propertyType: intake.propertyType,
    urgency: intake.urgency,
    insurer: intake.insurer,
    policyNumber: intake.policyNumber,
  };
}

export async function dispatchVoiceLead(input: VoiceDispatchInput): Promise<VoiceDispatchResult> {
  const state = input.state ?? stateFromPostcode(input.postcode);
  const suburb = input.suburb ?? `Postcode ${input.postcode}`;
  const serviceType = normaliseServiceType(input.damageType);
  const urgency = normaliseUrgency(input.urgency);
  const coordinates = locationForPostcode(input.postcode, state);
  const sessionMarker = `voice_session:${input.sessionId}`;

  const existingJob = await prisma.job.findFirst({
    where: { internalNotes: { contains: sessionMarker } },
    include: { jobOffers: { orderBy: { createdAt: 'desc' }, take: 1 } },
  });

  if (existingJob) {
    return {
      jobId: existingJob.id,
      leadId: existingJob.leadId ?? null,
      offerId: existingJob.jobOffers[0]?.id ?? null,
      dispatchStatus: existingJob.jobOffers[0] ? 'existing_offer' : 'no_contractors',
    };
  }

  const lead = input.email
    ? await prisma.lead.create({
        data: {
          fullName: input.name,
          phone: input.phone,
          email: input.email,
          propertyType: input.propertyType === 'commercial' ? 'commercial' : 'residential',
          propertyAddress: input.propertyAddress ?? suburb,
          suburb,
          state,
          postcode: input.postcode,
          damageType: JSON.stringify(leadDamageType(serviceType)),
          damageDate: new Date(),
          damageDescription: input.description,
          estimatedAreaAffected: 'unknown',
          hasInsurance: Boolean(input.insurer || input.policyNumber),
          insuranceCompany: input.insurer ?? null,
          claimNumber: null,
          excessAmount: null,
          urgencyLevel: urgency,
          propertyValue: 'unknown',
          isBusinessProperty: input.propertyType === 'commercial',
          requiresAccommodation: false,
          leadScore: urgency === 'emergency' ? 85 : 70,
          leadValue: urgency === 'emergency' ? 250 : 150,
          hasPhotos: false,
          readyToStart: urgency === 'emergency' ? 'immediately' : 'within_week',
          budget: null,
          decisionMaker: true,
          source: 'voice_sarah',
          status: 'NEW',
          qualityStatus: urgency === 'emergency' ? 'HIGH_VALUE' : 'QUALIFIED',
        },
      })
    : null;

  const job = await prisma.job.create({
    data: {
      leadId: lead?.id ?? null,
      serviceType,
      urgency,
      status: 'pending',
      address: input.propertyAddress ?? suburb,
      suburb,
      state,
      postcode: input.postcode,
      coordinates,
      customerName: input.name,
      customerPhone: input.phone,
      customerEmail: input.email ?? null,
      insuranceClaim: Boolean(input.insurer || input.policyNumber),
      insurerName: input.insurer ?? null,
      policyNumber: input.policyNumber ?? null,
      description: input.description,
      internalNotes: `${sessionMarker}\nsource:voice_sarah`,
    },
  });

  const match = await findNextContractor(job.id, coordinates, serviceType, prisma);

  if (!match) {
    await logComplianceEvent({
      eventType: 'claim_intake_created',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'claim',
      entityType: 'customer',
      entityIdentifier: input.email ?? input.phone,
      metadata: {
        source: 'voice_sarah',
        job_id: job.id,
        lead_id: lead?.id ?? null,
        dispatch_status: 'no_contractors',
        postcode: input.postcode,
        damage_type: serviceType,
        contact_hash: input.email ? hashIdentifier(input.email) : hashIdentifier(input.phone),
      },
    });

    return {
      jobId: job.id,
      leadId: lead?.id ?? null,
      offerId: null,
      dispatchStatus: 'no_contractors',
    };
  }

  const expiresAt = new Date(Date.now() + OFFER_TIMEOUT_MINUTES * 60 * 1000);
  const offer = await prisma.jobOffer.create({
    data: {
      jobId: job.id,
      contractorId: match.contractorId,
      status: 'pending',
      expiresAt,
      requiresLiabilityAck: match.requiresLiabilityAck,
      pool: match.pool,
    },
  });

  const contractor = await prisma.contractor.findUnique({
    where: { id: match.contractorId },
    select: { email: true, username: true },
  });
  if (contractor?.email) {
    sendEmail(
      contractor.email,
      emailTemplates.jobOfferNew(contractor.username ?? 'Contractor', offer.id, {
        serviceType,
        suburb,
        expiresAt,
        requiresLiabilityAck: match.requiresLiabilityAck,
      }),
    ).catch(() => {
      // Non-fatal — the JobOffer row is the source of truth.
    });
  }

  await logComplianceEvent({
    eventType: 'contractor_dispatched',
    correlationId: '00000000-0000-0000-0000-000000000000',
    correlationType: 'contractor_dispatch',
    entityType: 'contractor',
    metadata: {
      source: 'voice_sarah',
      job_id: job.id,
      lead_id: lead?.id ?? null,
      offer_id: offer.id,
      contractor_id: match.contractorId,
      pool: match.pool,
      postcode: input.postcode,
      damage_type: serviceType,
    },
  });

  return { jobId: job.id, leadId: lead?.id ?? null, offerId: offer.id, dispatchStatus: 'offered' };
}
