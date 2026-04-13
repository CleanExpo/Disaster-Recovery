import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { calculateLeadScore, getLeadPriority, assignLeadToTeam, getResponseTime } from '@/lib/lead-scoring';
import { sendEmail, emailTemplates } from '@/lib/email';
import { encrypt, isConfigured } from '@/lib/encryption';
import { rateLimit } from '@/lib/rate-limit';

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
  phone: z.string().regex(/^(\+?61|0)[2-478][\d\s-]{8 }$/, 'Invalid Australian phone number'),
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

// Map urgency level to Booking.emergencyResponseLevel
function mapUrgencyToResponseLevel(urgency: string): string {
  switch (urgency) {
    case 'emergency': return 'EMERGENCY';
    case 'urgent': return 'URGENT';
    case 'routine':
    default: return 'STANDARD';
  }
}

// Map urgency to booking status
function mapUrgencyToStatus(urgency: string): string {
  switch (urgency) {
    case 'emergency': return 'CONFIRMED';
    default: return 'PENDING';
  }
}

// Parse a dollar/numeric string to a float (e.g. "$5,000" -> 5000)
function parseEstimatedCost(value: string): number {
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

// Build a scheduled DateTime from date + time strings
function buildScheduledDate(date: string, time: string): Date | null {
  try {
    const dt = new Date(`${date}T${time}:00`);
    if (isNaN(dt.getTime())) return null;
    return dt;
  } catch {
    return null;
  }
}

// Build a description from form fields that have no direct Booking column
function buildDescription(data: z.infer<typeof bookingSchema>): string {
  const parts = [
    `Service: ${data.serviceType}`,
    `Property: ${data.propertyType}`,
    `Contact: ${data.firstName} ${data.lastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Preferred contact: ${data.preferredContact}`,
  ];
  if (data.hasInsurance) {
    parts.push(`Insurance: Yes`);
    if (data.insuranceProvider) parts.push(`Provider: ${data.insuranceProvider}`);
    if (data.claimNumber) parts.push(`Claim #: ${data.claimNumber}`);
  }
  if (data.additionalNotes) {
    parts.push(`Notes: ${data.additionalNotes}`);
  }
  return parts.join('\n');
}

function calculateEstimatedArrival(date: string, time: string, urgency: string): string {
  if (urgency === 'emergency') {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now.toISOString();
  }
  return `${date}T${time}:00.000Z`;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = await rateLimit(ip, 'bookings-create');
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

    // Build scheduled date
    const scheduledDate = buildScheduledDate(validatedData.date, validatedData.time);

    // DR-390 / DR-491: Block booking creation in production if ENCRYPTION_SECRET is not set.
    // ENCRYPTION_SECRET is configured in Vercel Production (see DR-491). Dev environments
    // are permitted to run without encryption for local iteration — isConfigured() returns
    // false in that case and the NODE_ENV guard below lets dev proceed with the console.warn
    // emitted by src/lib/encryption.ts.
    if (!isConfigured() && process.env.NODE_ENV !== 'development') {
      console.error('[security] DR-390: ENCRYPTION_SECRET is not configured. Booking creation blocked in non-dev environment.');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error. Please try again or contact support.',
      }, { status: 500 });
    }

    // DR-390: Encrypt access instructions before storing in internalNotes.
    // The encrypted blob is stored as "Access instructions (encrypted): <blob>" so
    // it is clearly marked and can be decrypted by authorised staff/contractors.
    let encryptedAccessNote = '';
    if (validatedData.accessInstructions) {
      const encryptedBlob = await encrypt(validatedData.accessInstructions);
      encryptedAccessNote = `Access instructions (encrypted): ${encryptedBlob}`;
    }

    // Build internal notes (access instructions + lead scoring metadata)
    const internalNoteParts: string[] = [];
    if (encryptedAccessNote) {
      internalNoteParts.push(encryptedAccessNote);
    }
    internalNoteParts.push(`Lead score: ${leadScore}`);
    internalNoteParts.push(`Priority: ${priority}`);
    internalNoteParts.push(`Assigned team: ${assignment.team}`);
    internalNoteParts.push(`Response time: ${responseTime} minutes`);
    internalNoteParts.push(`Booking reference: ${bookingRef}`);

    // Create real Booking record in database
    const booking = await prisma.booking.create({
      data: {
        clientId: `${validatedData.email}`,
        australianServiceType: validatedData.serviceType,
        description: buildDescription(validatedData),
        estimatedDamagePhotosCount: validatedData.photos?.length ?? 0,
        servicePostcode: validatedData.postcode,
        serviceState: validatedData.state,
        serviceSuburb: validatedData.suburb,
        streetAddress: validatedData.streetAddress,
        status: mapUrgencyToStatus(validatedData.urgency),
        emergencyResponseLevel: mapUrgencyToResponseLevel(validatedData.urgency),
        scheduledDate: scheduledDate,
        estimatedCostAUD: parseEstimatedCost(validatedData.estimatedDamage),
        notes: validatedData.additionalNotes ?? null,
        internalNotes: internalNoteParts.join('\n'),
        clientNotes: validatedData.additionalNotes ?? null,
        damagePhotos: validatedData.photos ?? [],
      },
    });

    const estimatedArrival = calculateEstimatedArrival(
      validatedData.date,
      validatedData.time,
      validatedData.urgency
    );

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
      createdAt: booking.createdAt.toISOString(),
    };

    // Send emails (fire-and-forget)
    Promise.all([
      sendEmail('bookings@disasterrecovery.com.au', emailTemplates.leadNotification(leadData)),
      sendEmail(validatedData.email, emailTemplates.leadConfirmation(leadData)),
    ]).catch(error => {
      console.error('Email sending error:', error);
    });

    // Return success response (same structure the frontend expects)
    return NextResponse.json({
      success: true,
      message: validatedData.urgency === 'emergency'
        ? 'Emergency booking confirmed. A contractor will be in contact as soon as possible.'
        : 'Booking received. A contractor will be in touch to confirm your appointment.',
      booking: {
        reference: bookingRef,
        status: booking.status === 'CONFIRMED' ? 'confirmed' : 'pending_confirmation',
        estimatedArrival,
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
      message: 'Failed to create booking. Please try again or lodge a claim at disasterrecovery.com.au/claim.',
    }, { status: 500 });
  }
}

