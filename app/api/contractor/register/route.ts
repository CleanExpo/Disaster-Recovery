import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import {
  withSecurityHeaders,
  withRateLimit,
  withValidation,
  combineMiddleware,
} from '@/lib/auth-middleware';
import { PaymentAuditLogger, PRICING_CONSTANTS } from '@/lib/payment-security';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

// SECURITY: Enhanced validation schema for registration with sanitization
const registrationSchema = z.object({
  email: z.string().email('Invalid email format').max(255, 'Email too long'),
  username: z
    .string()
    .min(3, 'Username too short')
    .max(50, 'Username too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username contains invalid characters'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character',
    ),
  mobileNumber: z
    .string()
    .min(10, 'Mobile number too short')
    .max(15, 'Mobile number too long')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Invalid mobile number format'),
  companyName: z
    .string()
    .min(2, 'Company name too short')
    .max(100, 'Company name too long')
    .regex(/^[a-zA-Z0-9\s&.-]+$/, 'Company name contains invalid characters'),
  acceptedTerms: z.boolean().refine((val) => val === true),
  acceptedPrivacy: z.boolean().refine((val) => val === true),
  company: z.object({
    tradingName: z.string().optional(),
    abn: z.string(),
    acn: z.string().optional(),
    companyStructure: z.enum(['SOLE_TRADER', 'PARTNERSHIP', 'PTY_LTD', 'TRUST']),
    registeredAddress: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postcode: z.string(),
    }),
    mailingAddress: z
      .object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        postcode: z.string(),
      })
      .optional(),
    directors: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        position: z.string(),
        email: z.string().email(),
      }),
    ),
    officeEmail: z.string().optional(),
    website: z.string().url().optional(),
  }),
  insurance: z.array(
    z.object({
      type: z.enum(['PUBLIC_LIABILITY', 'PROFESSIONAL_INDEMNITY', 'WORKERS_COMP']),
      insurer: z.string(),
      policyNumber: z.string(),
      coverageAmount: z.number(),
      excess: z.number().optional(),
      effectiveDate: z.string(),
      expiryDate: z.string(),
    }),
  ),
  certifications: z.array(
    z.object({
      type: z.string(),
      name: z.string(),
      number: z.string(),
      issuingOrganization: z.string(),
      issueDate: z.string(),
      expiryDate: z.string().optional(),
    }),
  ),
  backgroundCheck: z.object({
    consentGiven: z.boolean(),
    references: z.array(
      z.object({
        name: z.string(),
        companyName: z.string(),
        position: z.string(),
        email: z.string().email(),

        relationship: z.enum(['CLIENT', 'SUPPLIER', 'PARTNER', 'OTHER']),
        projectDescription: z.string().optional(),
      }),
    ),
  }),
  subscription: z.object({
    tier: z.enum(['TIER_25KM', 'TIER_50KM', 'TIER_75KM', 'TIER_100KM', 'RURAL']),
    territories: z.array(
      z.object({
        type: z.enum(['RADIUS', 'POSTCODE', 'SUBURB', 'LGA', 'STATE']),
        name: z.string(),
        centerPoint: z
          .object({
            lat: z.number(),
            lng: z.number(),
          })
          .optional(),
        radiusKm: z.number().optional(),
        postcodes: z.array(z.string()).optional(),
        suburbs: z.array(z.string()).optional(),
        emergencyResponse: z.boolean(),
        afterHours: z.boolean(),
        weekendService: z.boolean(),
        maxJobsPerDay: z.number(),
      }),
    ),
    billingDetails: z.object({
      method: z.enum(['DIRECT_DEBIT', 'CREDIT_CARD']),
      frequency: z.enum(['MONTHLY', 'QUARTERLY', 'ANNUAL']),
    }),
    bondAccepted: z.boolean(),
  }),
  agreements: z.object({
    partnershipAgreement: z.boolean(),
    codeOfConduct: z.boolean(),
    whsCompliance: z.boolean(),
    dutyOfCare: z.boolean(),
    ongoingMonitoring: z.boolean(),
  }),
});

async function handleRegistration(
  request: NextRequest,
  validatedData: z.infer<typeof registrationSchema>,
) {
  const log = requestLogger(request, { route: '/api/contractor/register' });
  const clientIP =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  try {
    // SECURITY: Data is already validated by middleware
    // Additional security checks

    // Check if username or email already exists
    const existingContractor = await prisma.contractor.findFirst({
      where: {
        OR: [{ username: validatedData.username }, { email: validatedData.email }],
      },
    });

    if (existingContractor) {
      return NextResponse.json(
        {
          success: false,
          error:
            existingContractor.username === validatedData.username
              ? 'Username already taken'
              : 'Email already registered',
        },
        { status: 400 },
      );
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Start a transaction to create all related records
    const result = await prisma.$transaction(async (tx) => {
      // Create the contractor account
      const contractor = await tx.contractor.create({
        data: {
          username: validatedData.username,
          email: validatedData.email,
          passwordHash,
          mobileNumber: validatedData.mobileNumber,
          status: 'PENDING',
          onboardingStep: 8,
          onboardingCompleted: true,
          emailVerified: false,
          mobileVerified: false,
        },
      });

      // Create company profile
      const companyProfile = await tx.contractorCompany.create({
        data: {
          contractorId: contractor.id,
          companyName: validatedData.companyName,
          tradingName: validatedData.company.tradingName,
          abn: validatedData.company.abn,
          acn: validatedData.company.acn,
          companyStructure: validatedData.company.companyStructure,
          registeredAddress: validatedData.company.registeredAddress.street,
          registeredCity: validatedData.company.registeredAddress.city,
          registeredState: validatedData.company.registeredAddress.state,
          registeredPostcode: validatedData.company.registeredAddress.postcode,
          mailingAddress: validatedData.company.mailingAddress?.street,
          mailingCity: validatedData.company.mailingAddress?.city,
          mailingState: validatedData.company.mailingAddress?.state,
          mailingPostcode: validatedData.company.mailingAddress?.postcode,
          directors: JSON.stringify(validatedData.company.directors),
          companyEmail: validatedData.company.officeEmail,
          website: validatedData.company.website,
        },
      });

      // Create insurance records
      const insuranceRecords = await Promise.all(
        validatedData.insurance.map((insurance) =>
          tx.contractorInsurance.create({
            data: {
              contractorId: contractor.id,
              insuranceType: insurance.type,
              insurer: insurance.insurer,
              policyNumber: insurance.policyNumber,
              coverageAmount: insurance.coverageAmount,
              excess: insurance.excess,
              effectiveDate: new Date(insurance.effectiveDate),
              expiryDate: new Date(insurance.expiryDate),
              certificateUrl: '', // Will be updated when documents are uploaded
              status: 'PENDING',
            },
          }),
        ),
      );

      // Certification, reference, and background-check records were
      // previously created here; the corresponding Prisma models were
      // deleted in PR #246. Onboarding wizard data is captured via
      // ContractorApplication; IICRC codes live on Contractor.iicrcCertifications.

      // Create subscription record
      const subscription = await tx.contractorSubscription.create({
        data: {
          contractorId: contractor.id,
          tier: validatedData.subscription.tier,
          status: 'PENDING',
          baseRadius: getRadiusFromTier(validatedData.subscription.tier),
          billingFrequency: validatedData.subscription.billingDetails.frequency,
          amount: getSubscriptionAmount(
            validatedData.subscription.tier,
            validatedData.subscription.billingDetails.frequency,
          ),
          paymentMethod: validatedData.subscription.billingDetails.method,
          bondAmount: 5000,
          bondStatus: 'PENDING',
        },
      });

      // Create territory records
      const territoryRecords = await Promise.all(
        validatedData.subscription.territories.map((territory) =>
          tx.contractorTerritory.create({
            data: {
              contractorId: contractor.id,
              type: territory.type,
              name: territory.name,
              centerLat: territory.centerPoint?.lat,
              centerLng: territory.centerPoint?.lng,
              radiusKm: territory.radiusKm,
              postcodes: territory.postcodes ? JSON.stringify(territory.postcodes) : null,
              suburbs: territory.suburbs ? JSON.stringify(territory.suburbs) : null,
              emergencyResponse: territory.emergencyResponse,
              afterHours: territory.afterHours,
              weekendService: territory.weekendService,
              maxJobsPerDay: territory.maxJobsPerDay,
            },
          }),
        ),
      );

      // ContractorAgreement model was deleted in PR #246.
      // Agreement acceptance is captured in the ContractorApplication snapshot.

      // Create initial notification
      await tx.contractorNotification.create({
        data: {
          contractorId: contractor.id,
          type: 'SYSTEM',
          priority: 'NORMAL',
          subject: 'Application Received',
          message:
            'Thank you for submitting your application. Our team will review it and contact you within 2-3 business days.',
          actionRequired: false,
        },
      });

      // Create audit log entry
      await tx.contractorAuditLog.create({
        data: {
          contractorId: contractor.id,
          action: 'REGISTRATION_COMPLETED',
          category: 'PROFILE',
          details: JSON.stringify({ step: 'all', completed: true }),
          performedBy: contractor.id,
          performedByType: 'CONTRACTOR',
        },
      });

      return contractor;
    });

    // Send confirmation email (implement email service)
    // await sendConfirmationEmail(validatedData.email, validatedData.companyName);

    // Trigger background check process (implement background check service)
    // await initiateBackgroundCheck(result.id);

    void logComplianceEvent({
      eventType: 'kyc_triggered',
      correlationId: result.id,
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: result.id,
      metadata: {
        action: 'contractor_registration_submitted',
        background_check_consent: validatedData.backgroundCheck.consentGiven,
        request_id: log.requestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      contractorId: result.id,
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: 'error',
        source: 'api/contractor/register',
        msg: 'registration error',
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    captureException(error, {
      tags: { route: '/api/contractor/register' },
      extra: { requestId: log.requestId },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process registration',
      },
      { status: 500 },
    );
  }
}

function getRadiusFromTier(tier: string): number {
  const radiusMap: Record<string, number> = {
    TIER_25KM: 25,
    TIER_50KM: 50,
    TIER_75KM: 75,
    TIER_100KM: 100,
    RURAL: 200,
  };
  return radiusMap[tier] || 50;
}

/**
 * DR-780 — wires subscription amount to canonical PRICING_CONSTANTS
 * (src/lib/payment-security.ts). Previously hard-coded values undercharged
 * by $196-$396/month per tier. Returns dollars (schema field is Float in
 * dollars; canonical constants are in cents — divide by 100).
 *
 * Tier mapping:
 *   TIER_25KM → $495/mo  (was $299; +$196)
 *   TIER_50KM → $795/mo  (was $499; +$296)
 *   TIER_75KM → $995/mo  (was $699; +$296)
 *   TIER_100KM → $1,295/mo (was $899; +$396)
 *   RURAL → TIER_100KM ($1,295/mo) — RURAL is a frontend label that maps
 *     to TIER_100KM canonically; canonical SUBSCRIPTION_TIERS has no RURAL.
 */
function getSubscriptionAmount(tier: string, frequency: string): number {
  const tierKey =
    tier === 'RURAL' ? 'TIER_100KM' : (tier as keyof typeof PRICING_CONSTANTS.SUBSCRIPTION_TIERS);

  const baseCents =
    PRICING_CONSTANTS.SUBSCRIPTION_TIERS[tierKey] ?? PRICING_CONSTANTS.SUBSCRIPTION_TIERS.TIER_50KM;

  const multipliers: Record<string, number> = {
    MONTHLY: 1,
    QUARTERLY: 2.85,
    ANNUAL: 10.5,
  };

  return (baseCents / 100) * (multipliers[frequency] || 1);
}
