import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';
import { calculateLeadValue, assignLeadToPartner } from '@/lib/lead-management';
import { rateLimit } from '@/lib/rate-limit';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';

// Duplicate submissions from the same person within this window are treated as
// idempotent replays: the existing lead is returned and no second lead is
// created and no downstream billing/notification is re-triggered.
const DEDUPE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Known value sets — kept in lock-step with the LeadCaptureForm <SelectItem>
// options so the schema rejects anything the real UI cannot produce.
const PROPERTY_TYPES = ['residential', 'commercial', 'industrial', 'strata', 'government'] as const;
const STATES = ['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'] as const;
const URGENCY_LEVELS = ['emergency', 'urgent', 'soon', 'planning'] as const;
const AREAS_AFFECTED = [
  'single_room',
  'multiple_rooms',
  'entire_floor',
  'entire_property',
  'commercial_large',
] as const;
const READINESS = ['immediately', 'within_week', 'within_month', 'planning'] as const;
const DAMAGE_TYPES = [
  'Water/Flood Damage',
  'Fire/Smoke Damage',
  'Storm/Wind Damage',
  'Mould Growth',
  'Sewage Backup',
  'Biohazard/Trauma',
  'Hail Damage',
  'Structural Damage',
] as const;
// Numeric selects expose FIXED range buckets in the UI — pin to them so a probe
// cannot inject an arbitrary value that skews scoring / bill value.
const PROPERTY_VALUES = ['250000', '500000', '750000', '1000000', '2000000', '5000000'] as const;
const EXCESS_AMOUNTS = ['500', '1000', '2000', '5000', '10000'] as const;
const BUDGETS = ['5000', '10000', '25000', '50000', '100000', '200000'] as const;

// Strict input contract for the public, unauthenticated capture endpoint.
// Unknown keys are stripped by zod's default object behaviour. Free-text fields
// are non-empty and length-bounded; every field with a fixed UI value set is an
// enum, and numeric-ish fields carry a format so empty/garbage cannot pass.
export const leadCaptureSchema = z.object({
  // Contact Information
  fullName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?61|0)[\s-]?[2-478][\d\s-]{7,12}$/, 'Invalid Australian phone number'),
  email: z.string().trim().email().max(200),

  // Property Information
  propertyType: z.enum(PROPERTY_TYPES),
  propertyAddress: z.string().trim().min(3).max(300),
  suburb: z.string().trim().min(1).max(120),
  state: z.enum(STATES),
  postcode: z.string().trim().regex(/^\d{4}$/, 'Invalid Australian postcode'),

  // Damage Information
  damageType: z.array(z.enum(DAMAGE_TYPES)).min(1).max(DAMAGE_TYPES.length),
  damageDate: z
    .string()
    .trim()
    .min(1)
    .max(40)
    .refine((d) => !Number.isNaN(Date.parse(d)), 'Invalid damageDate'),
  damageDescription: z.string().trim().min(1).max(5000),
  estimatedAreaAffected: z.enum(AREAS_AFFECTED),

  // Insurance Information
  hasInsurance: z.boolean(),
  insuranceCompany: z.string().trim().max(160).optional(),
  claimNumber: z.string().trim().max(120).optional(),
  excessAmount: z.enum(EXCESS_AMOUNTS).optional(),

  // Value Indicators
  urgencyLevel: z.enum(URGENCY_LEVELS),
  propertyValue: z.enum(PROPERTY_VALUES),
  isBusinessProperty: z.boolean(),
  requiresAccommodation: z.boolean(),

  // Lead Quality
  hasPhotos: z.boolean(),
  readyToStart: z.enum(READINESS),
  budget: z.enum(BUDGETS).optional(),
  decisionMaker: z.boolean(),

  // Tracking (client-supplied, optional)
  source: z.string().max(2000).optional(),
  userAgent: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/leads/capture' });
  const ipAddress =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '';

  // Abuse guard: rate-limit before doing any work or touching the database.
  const limit = await rateLimit(ipAddress || 'unknown', 'leads-capture');
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter ?? 60) } },
    );
  }

  try {
    const body = await request.json();
    const data = leadCaptureSchema.parse(body);

    // Lead quality scoring
    const leadScore = calculateLeadScore(data);
    
    // Only accept high-quality leads (score > 50)
    if (leadScore < 50) {
      return NextResponse.json(
        { error: 'Lead does not meet quality requirements' },
        { status: 400 }
      );
    }
    
    // Determine lead value based on factors
    const leadValue = calculateLeadValue({
      score: leadScore,
      propertyType: data.propertyType,
      propertyValue: data.propertyValue,
      hasInsurance: data.hasInsurance,
      urgencyLevel: data.urgencyLevel,
      isBusinessProperty: data.isBusinessProperty,
      estimatedAreaAffected: data.estimatedAreaAffected,
      state: data.state
    });
    
    // Atomic idempotency. A transaction-scoped Postgres advisory lock keyed on
    // (email|phone) serialises concurrent submissions from the same person, so a
    // double-click / retry burst can only ever create ONE billable lead —
    // regardless of wall-clock timing (there is no time-bucket boundary to
    // straddle). Inside the lock we look for a lead from the same contact within
    // the recent window: if one exists we return it WITHOUT billing/emailing;
    // otherwise we create it. A genuine re-lead after the window is still allowed.
    const dedupeSince = new Date(Date.now() - DEDUPE_WINDOW_MS);
    const lockKey = `${data.email.trim().toLowerCase()}|${data.phone.trim()}`;
    const outcome = await prisma.$transaction(async (tx) => {
      // pg_advisory_xact_lock auto-releases at commit and is safe under
      // transaction-mode pooling (unlike session-level advisory locks).
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${lockKey}))`;

      const prior = await tx.lead.findFirst({
        where: { email: data.email, phone: data.phone, createdAt: { gte: dedupeSince } },
        orderBy: { createdAt: 'desc' },
        select: { id: true },
      });
      if (prior) {
        return { duplicate: true, leadId: prior.id, lead: null };
      }

      const created = await tx.lead.create({
        data: {
          // Contact Information
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,

          // Property Information
          propertyType: data.propertyType,
          propertyAddress: data.propertyAddress,
          suburb: data.suburb,
          state: data.state,
          postcode: data.postcode,

          // Damage Information
          damageType: JSON.stringify(data.damageType),
          damageDate: new Date(data.damageDate),
          damageDescription: data.damageDescription,
          estimatedAreaAffected: data.estimatedAreaAffected,

          // Insurance Information
          hasInsurance: data.hasInsurance,
          insuranceCompany: data.insuranceCompany,
          claimNumber: data.claimNumber,
          excessAmount: data.excessAmount,

          // Value Indicators
          urgencyLevel: data.urgencyLevel,
          propertyValue: data.propertyValue,
          isBusinessProperty: data.isBusinessProperty,
          requiresAccommodation: data.requiresAccommodation,

          // Lead Quality
          leadScore: leadScore,
          leadValue: leadValue,
          hasPhotos: data.hasPhotos,
          readyToStart: data.readyToStart,
          budget: data.budget,
          decisionMaker: data.decisionMaker,

          // Tracking
          source: data.source,
          ipAddress: ipAddress,
          userAgent: data.userAgent,
          status: 'NEW',
          qualityStatus: leadScore >= 80 ? 'HIGH_VALUE' : leadScore >= 60 ? 'QUALIFIED' : 'STANDARD',
        },
      });
      return { duplicate: false, leadId: created.id, lead: created };
    });

    if (outcome.duplicate || !outcome.lead) {
      log.info('duplicate lead submission ignored', { leadId: outcome.leadId });
      return NextResponse.json({
        success: true,
        duplicate: true,
        leadId: outcome.leadId,
        message: 'Lead already received',
      });
    }
    const lead = outcome.lead;

    // Find and assign to partner
    const partner = await assignLeadToPartner({
      state: data.state,
      suburb: data.suburb,
      postcode: data.postcode,
      damageType: data.damageType,
      propertyType: data.propertyType,
      leadValue: leadValue
    });
    
    if (partner) {
      // Update lead with partner assignment
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          partnerId: partner.id,
          assignedAt: new Date(),
          status: 'ASSIGNED'
        }
      });
      
      // Create billing record
      await prisma.partnerBilling.create({
        data: {
          partnerId: partner.id,
          leadId: lead.id,
          amount: leadValue,
          status: 'PENDING',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });
      
      // Send notifications
      await sendEmail(partner.email, emailTemplates.partnerLeadAssignment(partner, lead));
    }
    
    // Send admin notification
    await sendEmail(process.env.ADMIN_EMAIL || 'admin@disasterrecovery.com.au', emailTemplates.leadNotification(lead));
    
    // Track conversion
    await prisma.leadTracking.create({
      data: {
        leadId: lead.id,
        event: 'LEAD_CAPTURED',
        metadata: JSON.stringify({
          score: leadScore,
          value: leadValue,
          assignedTo: partner?.businessName || 'Unassigned'
        })
      }
    });
    
    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/leads/capture',
        request_id: log.requestId,
        lead_id: lead.id,
        lead_score: leadScore,
        email_hash: data.email ? hashIdentifier(data.email) : null,
        assigned_partner: partner?.id ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Lead captured successfully'
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.warn('lead capture validation failed', { issues: error.errors.length });
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          errors: error.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
        },
        { status: 400 },
      );
    }

    log.error('lead capture error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/leads/capture' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}

function calculateLeadScore(data: any): number {
  let score = 0;
  
  // Insurance (30 points max)
  if (data.hasInsurance) {
    score += 25;
    if (data.insuranceCompany) score += 3;
    if (data.claimNumber) score += 2;
  }
  
  // Urgency (20 points max)
  switch(data.urgencyLevel) {
    case 'emergency': score += 20; break;
    case 'urgent': score += 15; break;
    case 'soon': score += 10; break;
    case 'planning': score += 5; break;
  }
  
  // Property Value (20 points max)
  const propertyValue = parseInt(data.propertyValue) || 0;
  if (propertyValue >= 2000000) score += 20;
  else if (propertyValue >= 1000000) score += 17;
  else if (propertyValue >= 750000) score += 14;
  else if (propertyValue >= 500000) score += 11;
  else if (propertyValue >= 250000) score += 8;
  else score += 5;
  
  // Business Property (15 points)
  if (data.isBusinessProperty) score += 15;
  
  // Ready to Start (10 points max)
  switch(data.readyToStart) {
    case 'immediately': score += 10; break;
    case 'within_week': score += 7; break;
    case 'within_month': score += 4; break;
    case 'planning': score += 2; break;
  }
  
  // Decision Maker (5 points)
  if (data.decisionMaker) score += 5;
  
  // Additional Quality Indicators
  if (data.hasPhotos) score += 3;
  if (data.requiresAccommodation) score += 5;
  
  // Damage Type Multiplier
  const highValueDamageTypes = ['Fire/Smoke Damage', 'Sewage Backup', 'Biohazard/Trauma', 'Storm/Wind Damage'];
  const damageTypeCount = data.damageType?.filter((type: string) => highValueDamageTypes.includes(type)).length || 0;
  score += damageTypeCount * 3;
  
  // Area Affected Bonus
  switch(data.estimatedAreaAffected) {
    case 'entire_property': score += 10; break;
    case 'commercial_large': score += 10; break;
    case 'entire_floor': score += 7; break;
    case 'multiple_rooms': score += 5; break;
    case 'single_room': score += 2; break;
  }
  
  return Math.min(score, 100); // Cap at 100
}