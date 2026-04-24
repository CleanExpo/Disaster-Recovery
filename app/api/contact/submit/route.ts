import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { calculateLeadScore, getLeadPriority, assignLeadToTeam } from '@/lib/lead-scoring';
import { sendEmail, emailTemplates } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+?61|0)[2-478][\d\s-]{8 }$/, 'Invalid Australian phone number'),
  service: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'biohazard', 'other']),
  urgency: z.enum(['emergency', 'urgent', 'planning', 'routine']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  propertyType: z.enum(['residential', 'commercial', 'industrial']).optional(),
  hasInsurance: z.boolean().optional(),
  preferredContact: z.enum(['phone', 'email', 'both']).optional() });

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contact/submit' });
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = await rateLimit(ip, 'contact-submit');
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
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSubmitSchema.parse(body);
    
    // Calculate lead score
    const leadScore = calculateLeadScore({
      urgency: validatedData.urgency,
      serviceType: validatedData.service,
      propertyType: validatedData.propertyType,
      hasInsurance: validatedData.hasInsurance,
      contactMethod: 'form' });
    
    const priority = getLeadPriority(leadScore);
    const assignment = assignLeadToTeam(leadScore, validatedData.service);

    // Save enquiry to database
    const enquiry = await prisma.enquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        source: 'contact_form',
        metadata: JSON.stringify({
          service: validatedData.service,
          urgency: validatedData.urgency,
          propertyType: validatedData.propertyType,
          hasInsurance: validatedData.hasInsurance,
          preferredContact: validatedData.preferredContact,
          leadScore,
          priority,
          assignment,
        }),
      },
    });

    const submissionId = enquiry.id;

    log.info('contact enquiry received', { enquiryId: submissionId, service: validatedData.service, urgency: validatedData.urgency });

    await logComplianceEvent({
      eventType: 'claim_intake_created',
      correlationId: submissionId,
      correlationType: 'claim',
      entityType: 'customer',
      entityIdentifier: validatedData.email,
      metadata: {
        source: 'contact_form',
        is_enquiry: true,
        service: validatedData.service,
        urgency: validatedData.urgency,
        priority,
        request_id: log.requestId,
      },
    });

    // Send notification email to team
    const notificationEmail = emailTemplates.leadNotification({
      id: submissionId,
      fullName: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceType: validatedData.service,
      urgencyLevel: validatedData.urgency,
      propertyType: validatedData.propertyType || 'residential',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      hasInsurance: validatedData.hasInsurance || false,
      leadScore,
      leadValue: Math.round(leadScore * 10),
      description: validatedData.message,
      createdAt: new Date().toISOString() });
    
    // Send confirmation email to customer
    const confirmationEmail = emailTemplates.leadConfirmation({
      id: submissionId,
      fullName: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceType: validatedData.service,
      urgencyLevel: validatedData.urgency,
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000' });
    
    // Send emails asynchronously
    Promise.all([
      sendEmail('team@disasterrecovery.com.au', notificationEmail),
      sendEmail(validatedData.email, confirmationEmail),
    ]).catch(error => {
      log.error('email sending error', { error: error instanceof Error ? error.message : String(error) });
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received successfully',
      submissionId,
      priority,
      estimatedResponse: priority === 'critical' ? '15 minutes' : 
                        priority === 'high' ? '30 minutes' :
                        priority === 'medium' ? '1 hour' : '4 hours' }, { status: 200 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      log.warn('contact validation failed', { issues: error.errors.length });
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message })) }, { status: 400 });
    }

    log.error('contact enquiry failed', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/contact/submit' }, extra: { requestId: log.requestId } });

    return NextResponse.json({
      success: false,
      message: 'An error occurred processing your request. Please try again.' }, { status: 500 });
  }
}

