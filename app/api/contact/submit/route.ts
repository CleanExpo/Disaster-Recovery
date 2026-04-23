import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { calculateLeadScore, getLeadPriority, assignLeadToTeam } from '@/lib/lead-scoring';
import { sendEmail, emailTemplates } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { contactSubmitSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
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
      console.error('Email sending error:', error);
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
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message })) }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'An error occurred processing your request. Please try again.' }, { status: 500 });
  }
}

