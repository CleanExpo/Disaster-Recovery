import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateLeadScore, getLeadPriority, assignLeadToTeam, getResponseTime } from '@/lib/lead-scoring';
import { sendEmail, emailTemplates } from '@/lib/email';

const bookingSchema = z.object({
  // Service Details
  serviceType: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'structural', 'biohazard', 'other']),
  urgency: z.enum(['emergency', 'urgent', 'routine']),
  propertyType: z.enum(['residential', 'commercial', 'industrial']),
  estimatedDamage: z.string(),
  
  // Schedule
  date: z.string(),
  time: z.string(),
  
  // Contact Information
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+?61|0)[2-478][\d\s-]{8,}$/, 'Invalid Australian phone number'),
  preferredContact: z.enum(['phone', 'email', 'both']),
  
  // Address
  streetAddress: z.string().min(5, 'Street address is required'),
  suburb: z.string().min(2, 'Suburb is required'),
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']),
  postcode: z.string().regex(/^\d{4}$/, 'Invalid Australian postcode'),
  
  // Additional Information
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  claimNumber: z.string().optional(),
  additionalNotes: z.string().optional(),
  photos: z.array(z.string()).optional(),
  accessInstructions: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = bookingSchema.parse(body);
    
    // Calculate lead score
    const leadScore = calculateLeadScore({
      urgency: validatedData.urgency,
      serviceType: validatedData.serviceType,
      propertyType: validatedData.propertyType,
      hasInsurance: validatedData.hasInsurance,
      contactMethod: 'form',
      estimatedValue: parseInt(validatedData.estimatedDamage.replace(/\D/g, '')) || 0,
    });
    
    const priority = getLeadPriority(leadScore);
    const assignment = assignLeadToTeam(leadScore, validatedData.serviceType);
    const responseTime = getResponseTime(leadScore);
    
    // Generate unique booking reference
    const bookingRef = `DRA-${validatedData.state}-${Date.now().toString(36).toUpperCase()}`;
    
    // Check availability (in production, check against actual schedule)
    const isAvailable = validatedData.urgency === 'emergency' || 
                       Math.random() > 0.2; // Simulate 80% availability
    
    if (!isAvailable) {
      // Suggest alternative times
      const alternativeTimes = [
        { date: validatedData.date, time: '14:00' },
        { date: validatedData.date, time: '16:00' },
        { date: getNextDay(validatedData.date), time: validatedData.time },
      ];
      
      return NextResponse.json({
        success: false,
        message: 'The selected time slot is not available',
        alternatives: alternativeTimes,
      }, { status: 409 });
    }
    
    // Create booking object
    const booking = {
      reference: bookingRef,
      ...validatedData,
      leadScore,
      priority,
      assignment,
      responseTimeMinutes: responseTime,
      status: validatedData.urgency === 'emergency' ? 'confirmed' : 'pending_confirmation',
      createdAt: new Date().toISOString(),
      estimatedArrival: calculateEstimatedArrival(validatedData.date, validatedData.time, validatedData.urgency),
    };
    
    // Send notification email to team
    const leadData = {
      id: bookingRef,
      fullName: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceType: validatedData.serviceType,
      urgencyLevel: validatedData.urgency,
      propertyType: validatedData.propertyType,
      suburb: validatedData.suburb,
      state: validatedData.state,
      postcode: validatedData.postcode,
      hasInsurance: validatedData.hasInsurance,
      leadScore,
      leadValue: Math.round(leadScore * 10),
      description: validatedData.additionalNotes || 'Booking via online form',
      address: `${validatedData.streetAddress}, ${validatedData.suburb}, ${validatedData.state} ${validatedData.postcode}`,
      createdAt: new Date().toISOString(),
    };
    
    // Send emails
    Promise.all([
      sendEmail('bookings@disasterrecovery.com.au', emailTemplates.leadNotification(leadData)),
      sendEmail(validatedData.email, emailTemplates.leadConfirmation(leadData)),
    ]).catch(error => {
      console.error('Email sending error:', error);
    });
    
    // In production, also:
    // 1. Save to database
    // 2. Update calendar/scheduling system
    // 3. Create job in CRM system
    
    console.log('Booking created:', booking);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: validatedData.urgency === 'emergency' 
        ? 'Emergency booking confirmed. Team dispatched immediately.'
        : 'Booking received successfully. We will confirm within 30 minutes.',
      booking: {
        reference: bookingRef,
        status: booking.status,
        estimatedArrival: booking.estimatedArrival,
        priority,
        assignedTeam: assignment.team,
      },
    }, { status: 201 });
    
  } catch (error) {
    console.error('Booking error:', error);
    
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
      message: 'Failed to create booking. Please try again or call 1800 DISASTER.',
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

function getNextDay(dateString: string): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

function calculateEstimatedArrival(date: string, time: string, urgency: string): string {
  if (urgency === 'emergency') {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // 30 minutes from now
    return now.toISOString();
  }
  
  return `${date}T${time}:00.000Z`;
}