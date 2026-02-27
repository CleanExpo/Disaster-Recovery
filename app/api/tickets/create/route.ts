import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ticketCreateSchema, ticketGetSchema } from '@/lib/api/validations';
import {
  apiSuccess,
  apiValidationError,
  apiBadRequest,
  apiNotFound,
  apiInternalError,
} from '@/lib/api/responses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // --- Zod validation (was: zero validation, raw body.* into prisma) ---
    const parsed = ticketCreateSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error);
    }
    const data = parsed.data;

    // Calculate lead score from validated data
    const leadScore = calculateLeadScore(data);

    // Determine urgentResponse flag
    const isUrgent =
      data.urgencyLevel === 'emergency' || data.urgencyLevel === 'urgent';

    // Build a location string from property address fields
    const location = [
      data.propertyAddress,
      data.suburb,
      data.state,
      data.postcode,
    ]
      .filter(Boolean)
      .join(', ');

    // Build the service title from damage types
    const serviceTitle = Array.isArray(data.damageType)
      ? data.damageType.join(', ')
      : data.damageType || 'General Service Request';

    // Create a real ServiceRequest record
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId: data.email,
        serviceCategory: data.propertyType,
        urgency: data.urgencyLevel,
        serviceTitle,
        description: data.damageDescription,
        location,
        budget: data.budget ?? null,
        phone: data.phone ?? null,
        preferredTime: data.readyToStart ?? null,
        insurance: data.hasInsurance,
        urgentResponse: isUrgent,
        status: 'PENDING',
        leadScore,
        tenantId: null,
      },
    });

    return apiSuccess({
      ticketId: serviceRequest.id,
      message: 'Ticket created successfully. A specialist will contact you within 30 minutes.',
      estimatedResponse: '30 minutes',
      trackingUrl: `/track/${serviceRequest.id}`,
    }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return apiBadRequest('Invalid JSON in request body');
    }
    return apiInternalError(error, 'tickets/create');
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = { id: searchParams.get('id') ?? '' };

  const parsed = ticketGetSchema.safeParse(raw);
  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  try {
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: parsed.data.id },
    });

    if (!serviceRequest) {
      return apiNotFound('Ticket not found');
    }

    return apiSuccess({ ticket: serviceRequest });
  } catch (error) {
    return apiInternalError(error, 'tickets/create GET');
  }
}

// Helper: calculate lead score from request data
function calculateLeadScore(data: Record<string, any>): number {
  let score = 0;

  // Insurance (30 points)
  if (data.hasInsurance) score += 30;

  // Urgency (20 points)
  if (data.urgencyLevel === 'emergency') score += 20;
  else if (data.urgencyLevel === 'urgent') score += 15;
  else if (data.urgencyLevel === 'soon') score += 10;

  // Property Value (20 points)
  const value = parseInt(data.propertyValue || '0');
  if (value > 1000000) score += 20;
  else if (value > 500000) score += 15;
  else if (value > 250000) score += 10;

  // Business Property (15 points)
  if (data.isBusinessProperty) score += 15;

  // Ready to Start (10 points)
  if (data.readyToStart === 'immediately') score += 10;
  else if (data.readyToStart === 'within_week') score += 7;

  // Decision Maker (5 points)
  if (data.decisionMaker) score += 5;

  return score;
}
