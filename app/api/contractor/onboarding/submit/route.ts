import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import crypto from 'crypto';

const PAYMENT_AMOUNT_AUD = 2475;

export async function POST(request: Request) {
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
    const email: string = businessInfo.email ?? null;
    const contactName: string = businessInfo.contactName ?? null;
    const phone: string = businessInfo.phone ?? businessInfo.mobile ?? null;

    // 1. Save the ContractorApplication (existing behaviour)
    const record = await prisma.contractorApplication.create({
      data: {
        businessName: businessInfo.companyName ?? businessInfo.businessName ?? null,
        contactName: contactName ?? null,
        email: email ?? null,
        phone: phone ?? null,
        data: application
      }
    });

    // 2. Create or find a Contractor record in PENDING status
    let contractorId: string | null = null;

    if (email) {
      // Check if a contractor already exists for this email
      let contractor = await prisma.contractor.findUnique({
        where: { email }
      });

      if (!contractor) {
        // Generate placeholder credentials — the real password is set when the
        // contractor completes onboarding and chooses their own credentials.
        const tempPasswordHash = crypto
          .createHash('sha256')
          .update(`temp-${email}-${Date.now()}`)
          .digest('hex');

        // Derive a unique username from email
        const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
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
            // Link to the application we just created
            applications: {
              connect: { id: record.id }
            }
          }
        });
      } else {
        // Link this application to the existing contractor if not yet linked
        await prisma.contractorApplication.update({
          where: { id: record.id },
          data: { contractorId: contractor.id }
        });
      }

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
        paymentAmount: PAYMENT_AMOUNT_AUD
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contractor application', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save contractor application' },
      { status: 500 }
    );
  }
}
