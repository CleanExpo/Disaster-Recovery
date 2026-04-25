import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/tickets/create' });
  try {
    const body = await request.json();

    // Calculate lead score from submitted data
    const leadScore = calculateLeadScore(body);

    // Determine urgentResponse flag
    const isUrgent =
      body.urgencyLevel === 'emergency' || body.urgencyLevel === 'urgent';

    // Build a location string from property address fields
    const location = [
      body.propertyAddress,
      body.suburb,
      body.state,
      body.postcode,
    ]
      .filter(Boolean)
      .join(', ');

    // Build the service title from damage types
    const serviceTitle = Array.isArray(body.damageType)
      ? body.damageType.join(', ')
      : body.damageType || 'General Service Request';

    // Create a real ServiceRequest record
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId: body.email || 'anonymous',
        serviceCategory: body.propertyType || 'residential',
        urgency: body.urgencyLevel || 'standard',
        serviceTitle,
        description: body.damageDescription || '',
        location,
        budget: body.budget || null,
        phone: body.phone || null,
        preferredTime: body.readyToStart || null,
        insurance: body.hasInsurance === true,
        urgentResponse: isUrgent,
        status: 'PENDING',
        leadScore,
        tenantId: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        ticketId: serviceRequest.id,
        message:
          'Ticket created successfully. A specialist will be in contact with you shortly.',
        estimatedResponse: 'as soon as possible',
        trackingUrl: `/track/${serviceRequest.id}`,
      },
      { status: 201 }
    );
  } catch (error) {
    log.error('error creating ticket', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/tickets/create' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create ticket',
        message: 'Please try again or contact support',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/tickets/create' });
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('id');

  if (!ticketId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Ticket ID required',
      },
      { status: 400 }
    );
  }

  try {
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: ticketId },
    });

    if (!serviceRequest) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ticket not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ticket: serviceRequest,
    });
  } catch (error) {
    log.error('error fetching ticket', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/tickets/create' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch ticket',
        message: 'Please try again or contact support',
      },
      { status: 500 }
    );
  }
}

// Helper: calculate lead score from request data
function calculateLeadScore(data: any): number {
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
