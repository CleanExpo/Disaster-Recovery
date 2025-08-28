import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateLeadScore, getLeadPriority, assignLeadToTeam } from '@/lib/lead-scoring';
import { sendEmail, emailTemplates } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+?61|0)[2-478][\d\s-]{8,}$/, 'Invalid Australian phone number'),
  service: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'biohazard', 'other']),
  urgency: z.enum(['emergency', 'urgent', 'planning', 'routine']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  propertyType: z.enum(['residential', 'commercial', 'industrial']).optional(),
  hasInsurance: z.boolean().optional(),
  preferredContact: z.enum(['phone', 'email', 'both']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Calculate lead score
    const leadScore = calculateLeadScore({
      urgency: validatedData.urgency,
      serviceType: validatedData.service,
      propertyType: validatedData.propertyType,
      hasInsurance: validatedData.hasInsurance,
      contactMethod: 'form',
    });
    
    const priority = getLeadPriority(leadScore);
    const assignment = assignLeadToTeam(leadScore, validatedData.service);
    
    // Generate unique submission ID
    const submissionId = `CONTACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
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
      createdAt: new Date().toISOString(),
    });
    
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
      postcode: '4000',
    });
    
    // Send emails asynchronously
    Promise.all([
      sendEmail('team@disasterrecovery.com.au', notificationEmail),
      sendEmail(validatedData.email, confirmationEmail),
    ]).catch(error => {
      console.error('Email sending error:', error);
    });
    
    // In production, also:
    // 1. Save to database
    // 2. Trigger SMS alerts for emergency cases
    
    // For now, we'll simulate a successful submission
    const submission = {
      id: submissionId,
      ...validatedData,
      leadScore,
      priority,
      assignment,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };
    
    // Log submission for monitoring
    console.log('Contact form submission:', submission);
    
    // Simulate async processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received successfully',
      submissionId,
      priority,
      estimatedResponse: priority === 'critical' ? '15 minutes' : 
                        priority === 'high' ? '30 minutes' :
                        priority === 'medium' ? '1 hour' : '4 hours',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'An error occurred processing your request. Please try again.',
    }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}