import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { LeadScoringService } from '@/lib/lead-scoring-service';
import { MatchingService } from '@/lib/matching-service';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';
import { MessagingService } from '@/lib/messaging-service';

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse the request body
    const body = await request.json();
    const {
      serviceCategory,
      urgency,
      serviceTitle,
      description,
      location,
      budget,
      phone,
      preferredTime,
      insurance,
      urgentResponse
    } = body;

    // Validate required fields
    if (!serviceCategory || !urgency || !serviceTitle || !description || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate lead score
    const leadScore = LeadScoringService.calculateLeadScore({
      serviceCategory,
      urgency,
      budget: budget || undefined,
      description,
      location,
      phone: phone || undefined,
      insurance: insurance || false,
      urgentResponse: urgentResponse || false,
      preferredTime: preferredTime || undefined
    });

    // Create the service request
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId: user.id,
        serviceCategory,
        urgency,
        serviceTitle,
        description,
        location,
        budget: budget || null,
        phone: phone || null,
        preferredTime: preferredTime || null,
        insurance: insurance || false,
        urgentResponse: urgentResponse || false,
        status: 'PENDING',
        leadScore
      }
    });

    // Find matching contractors using enhanced matching
    try {
      const matches = await EnhancedMatchingServiceV2.findMatchingContractorsForClient(serviceRequest.id, {
        serviceCategory,
        location,
        urgency,
        budget: budget ? parseFloat(budget) : undefined,
        leadScore: leadScore,
        tenantId: user.tenantId
      });

      if (matches.length > 0) {
        // Matches are already stored in database by the enhanced matching service

        // Send notifications to matched contractors
        for (const match of matches) {
          try {
            await MessagingService.sendMatchNotification(
              match.contractorId,
              user.id,
              serviceRequest.id,
              match.matchScore
            );
          } catch (error) {
            console.error('Error sending match notification:', error);
          }
        }

        // Send notification to client
        await MessagingService.sendSystemNotification(
          user.id,
          'Contractors Found',
          `We found ${matches.length} qualified contractors for your request. They will be in touch soon!`,
          serviceRequest.id
        );
      }
    } catch (error) {
      console.error('Error in matching process:', error);
      // Don't fail the request creation if matching fails
    }

    return NextResponse.json({
      success: true,
      data: serviceRequest,
      leadScore,
      message: 'Service request created successfully. We are finding the best contractors for you.'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get service requests for the user
    const serviceRequests = await prisma.serviceRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: serviceRequests
    });

  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
