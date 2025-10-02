import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { MatchingService } from '@/lib/matching-service';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';
import { LeadScoringService } from '@/lib/lead-scoring-service';
import { MessagingService } from '@/lib/messaging-service';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { requestId } = body;

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Get the service request
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: requestId },
      include: { user: true }
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    // Calculate lead score
    const leadScore = LeadScoringService.calculateLeadScore({
      serviceCategory: serviceRequest.serviceCategory,
      urgency: serviceRequest.urgency,
      budget: serviceRequest.budget || undefined,
      description: serviceRequest.description,
      location: serviceRequest.location,
      phone: serviceRequest.phone || undefined,
      insurance: serviceRequest.insurance,
      urgentResponse: serviceRequest.urgentResponse,
      preferredTime: serviceRequest.preferredTime || undefined
    });

    // Update lead score
    await LeadScoringService.updateLeadScore(requestId, leadScore);

    // Find matching contractors using enhanced matching
    const matches = await EnhancedMatchingServiceV2.findMatchingContractorsForClient(requestId, {
      serviceCategory: serviceRequest.serviceCategory,
      location: serviceRequest.location,
      urgency: serviceRequest.urgency,
      budget: serviceRequest.budget ? parseFloat(serviceRequest.budget) : undefined,
      leadScore: leadScore,
      tenantId: serviceRequest.tenantId
    });

    if (matches.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No matching contractors found',
        leadScore,
        matches: []
      });
    }

    // Matches are already stored in database by the enhanced matching service

    // Send notifications to matched contractors
    for (const match of matches) {
      try {
        await MessagingService.sendMatchNotification(
          match.contractorId,
          serviceRequest.userId,
          requestId,
          match.matchScore
        );
      } catch (error) {
        console.error('Error sending match notification:', error);
      }
    }

    // Send notification to client
    await MessagingService.sendSystemNotification(
      serviceRequest.userId,
      'Contractors Found',
      `We found ${matches.length} qualified contractors for your request. They will be in touch soon!`,
      requestId
    );

    return NextResponse.json({
      success: true,
      message: `Found ${matches.length} matching contractors`,
      leadScore,
      matches: matches.map(match => ({
        contractorId: match.contractorId,
        matchScore: match.matchScore,
        reasons: match.reasons
      }))
    });

  } catch (error) {
    console.error('Error in matching process:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Get matches for the request using enhanced matching service
    const matches = await EnhancedMatchingServiceV2.getRequestMatches(requestId);

    return NextResponse.json({
      success: true,
      matches
    });

  } catch (error) {
    console.error('Error getting matches:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
