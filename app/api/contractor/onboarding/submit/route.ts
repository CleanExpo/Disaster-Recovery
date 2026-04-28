import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { requestLogger, captureException } from '@/lib/observability';
import crypto from 'crypto';

const PAYMENT_AMOUNT_AUD = 2475;

/** True if `value` is a non-null, non-array plain object (safe for Prisma `Json`). */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const log = requestLogger(request, { route: '/api/contractor/onboarding/submit' });
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = await rateLimit(ip, 'contractor-onboarding-submit');
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter ?? 60) } },
    );
  }

  try {
    const body = await request.json();
    const application = body?.application || {};

    const businessInfo = application.businessInfo || {};
    const services = application.services || {};
    const marketing = application.marketing || {};
    const utm = marketing.utm || {};

    const email: string = businessInfo.email ?? '';
    const contactName: string = businessInfo.contactName ?? '';
    const phone: string = businessInfo.phone ?? businessInfo.mobile ?? '';
    const businessName: string = businessInfo.companyName ?? businessInfo.businessName ?? '';
    const abn: string = businessInfo.abn ?? application.abn ?? '';

    // yearsInBusiness can arrive as a string (form input) or a number; coerce.
    const rawYears =
      businessInfo.yearsInBusiness ??
      application.yearsInBusiness ??
      application.experience?.yearsInBusiness ??
      0;
    const yearsInBusiness: number = Number.parseInt(String(rawYears), 10) || 0;

    const certifications: string[] = Array.isArray(application.certifications)
      ? application.certifications.filter((v: unknown): v is string => typeof v === 'string')
      : [];
    const serviceAreas: string[] = Array.isArray(services.areas)
      ? services.areas.filter((v: unknown): v is string => typeof v === 'string')
      : [];

    // Generate the application id up-front (live `id text NOT NULL` has no default).
    const applicationId = crypto.randomUUID();

    // DR-815 — wizard sections that don't fit the flat shape are persisted
    // as JSONB blobs on the same row. Admin reads them; contractor writes once.
    const insuranceData = isPlainObject(application.insurance) ? application.insurance : null;
    const experienceData = isPlainObject(application.experience) ? application.experience : null;
    const equipmentData = isPlainObject(application.equipment) ? application.equipment : null;
    const healthSafetyData = isPlainObject(application.healthSafety)
      ? application.healthSafety
      : null;
    const bankingData = isPlainObject(application.banking) ? application.banking : null;

    // 1. Save the ContractorApplication (flat columns + 5 JSONB sections).
    const record = await prisma.contractorApplication.create({
      data: {
        id: applicationId,
        businessName,
        contactName,
        email,
        phone,
        abn,
        yearsInBusiness,
        certifications,
        serviceAreas,
        source: typeof marketing.source === 'string' ? marketing.source : null,
        utmSource: typeof utm.source === 'string' ? utm.source : null,
        utmMedium: typeof utm.medium === 'string' ? utm.medium : null,
        utmCampaign: typeof utm.campaign === 'string' ? utm.campaign : null,
        utmContent: typeof utm.content === 'string' ? utm.content : null,
        utmTerm: typeof utm.term === 'string' ? utm.term : null,
        insuranceData,
        experienceData,
        equipmentData,
        healthSafetyData,
        bankingData,
      },
    });

    // 2. Create or find a Contractor record in PENDING status
    let contractorId: string | null = null;

    if (email) {
      // Check if a contractor already exists for this email
      let contractor = await prisma.contractor.findUnique({
        where: { email },
      });

      if (!contractor) {
        // Generate placeholder credentials — the real password is set when the
        // contractor completes onboarding and chooses their own credentials.
        const tempPasswordHash = crypto
          .createHash('sha256')
          .update(`temp-${email}-${Date.now()}`)
          .digest('hex');

        // Derive a unique username from email
        const baseUsername = email
          .split('@')[0]
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase();
        // Ensure uniqueness by appending a short random suffix
        const username = `${baseUsername}_${crypto.randomBytes(3).toString('hex')}`;

        contractor = await prisma.contractor.create({
          data: {
            email,
            username,
            passwordHash: tempPasswordHash,
            mobileNumber: phone ?? '',
            status: 'PENDING',
            onboardingStep: 1,
          },
        });
      }

      // Track the converted contractor on the application via the scalar field
      // (relation was dropped — live table only has `convertedContractor: text`).
      await prisma.contractorApplication.update({
        where: { id: record.id },
        data: { convertedContractor: contractor.id },
      });

      contractorId = contractor.id;

      // DR-587: Fire-and-forget confirmation email — non-fatal if Resend not configured
      if (email && contactName) {
        sendEmail(
          email,
          emailTemplates.contractorApplicationReceived(contactName, record.id, email),
        ).catch(() => {
          // Non-fatal — DB write is the source of truth; email failure does not block the flow
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        applicationId: record.id,
        contractorId,
        paymentRequired: true,
        paymentAmount: PAYMENT_AMOUNT_AUD,
      },
      { status: 201 },
    );
  } catch (error) {
    log.error('error saving contractor application', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractor/onboarding/submit' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      { success: false, message: 'Failed to save contractor application' },
      { status: 500 },
    );
  }
}
