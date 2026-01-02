/**
 * Contractor Application Submission API
 *
 * POST /api/public/contractor/application
 * Handles contractor application submissions with file uploads
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const applicationSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  abn: z.string().regex(/^\d{11}$/, 'ABN must be 11 digits'),
  acn: z.string().optional(),
  primaryContactName: z.string().min(1, 'Contact name is required'),
  primaryContactPhone: z.string().min(1, 'Phone number is required'),
  primaryContactEmail: z.string().email('Valid email is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
  serviceAreas: z.array(z.string()).min(1, 'At least one service area is required'),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  certifications: z.array(z.string()).min(1, 'At least one certification is required'),
  selectedTier: z.enum(['basic', 'pro', 'enterprise']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = applicationSchema.parse(body);

    // TODO: Implement actual application logic
    // 1. Create contractor application record in database
    // 2. Store application status as 'pending_review'
    // 3. Send email notifications (to contractor and admin)
    // 4. Upload files to cloud storage (if provided separately)
    // 5. Schedule verification workflow

    // Simulate database insertion
    const applicationId = `APP-${Date.now()}`;

    // TODO: Send email notifications
    await sendApplicationEmails(validatedData, applicationId);

    return NextResponse.json(
      {
        success: true,
        applicationId,
        message: 'Application submitted successfully. We will review it within 24-48 hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Application submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * Send application confirmation emails
 */
async function sendApplicationEmails(data: any, applicationId: string) {
  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)

  // Email 1: Contractor confirmation
  const contractorEmail = {
    to: data.primaryContactEmail,
    subject: 'NRPG Application Received',
    template: 'contractor-application-received',
    data: {
      businessName: data.businessName,
      contactName: data.primaryContactName,
      applicationId,
      tier: data.selectedTier,
    },
  };

  // Email 2: Admin notification
  const adminEmail = {
    to: 'applications@nrpg.com.au',
    subject: `New Contractor Application: ${data.businessName}`,
    template: 'admin-new-application',
    data: {
      businessName: data.businessName,
      abn: data.abn,
      contactName: data.primaryContactName,
      contactEmail: data.primaryContactEmail,
      tier: data.selectedTier,
      applicationId,
    },
  };

  // Placeholder for actual email sending
  console.log('Would send emails:', { contractorEmail, adminEmail });

  // TODO: Uncomment when email service is configured
  // await emailService.send(contractorEmail);
  // await emailService.send(adminEmail);
}
