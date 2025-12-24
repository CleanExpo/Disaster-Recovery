import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user, decoded: payload } = authResult.context;

    const requestId = params.id;

    // Get the service request with all related data
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        matches: {
          where: {
            contractor: {
              user: {
                id: payload.userId
              }
            }
          },
          include: {
            contractor: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    // Calculate match score for the current contractor
    let matchScore = 0;
    const matchReasons: string[] = [];
    let canBid = true;
    let hasBid = false;

    // Check if contractor has already bid
    if (serviceRequest.matches.length > 0) {
      hasBid = true;
      canBid = false;
    }

    // If user is a contractor, calculate match score
    if (payload.userType === 'CONTRACTOR') {
      const contractor = await prisma.contractorProfile.findUnique({
        where: { userId: payload.userId },
      });

      if (contractor) {
        // Service category match (40 points)
        if (contractor.services.includes(serviceRequest.serviceCategory)) {
          matchScore += 40;
          matchReasons.push('Service category match');
        } else {
          matchScore += 5;
          matchReasons.push('Different service category');
        }

        // Location match (30 points)
        const locationMatch = contractor.serviceAreas.some((area: string) =>
          serviceRequest.location.toLowerCase().includes(area.toLowerCase()) ||
          area.toLowerCase().includes(serviceRequest.location.toLowerCase())
        );

        if (locationMatch) {
          matchScore += 30;
          matchReasons.push('Location match');
        } else {
          matchScore += 5;
          matchReasons.push('Different service area');
        }

        // Urgency and availability (20 points)
        if (serviceRequest.urgency === 'Emergency' && contractor.availability === 'AVAILABLE') {
          matchScore += 20;
          matchReasons.push('Emergency availability');
        } else if (serviceRequest.urgency === 'Urgent' && contractor.availability === 'AVAILABLE') {
          matchScore += 15;
          matchReasons.push('Urgent availability');
        }

        // Lead score bonus (10 points)
        if (serviceRequest.leadScore && serviceRequest.leadScore > 70) {
          matchScore += 10;
          matchReasons.push('High-value lead');
        }

        // Budget compatibility (5 points)
        if (serviceRequest.budget && contractor.hourlyRate) {
          const budgetValue = parseFloat(serviceRequest.budget.replace(/[^0-9.-]+/g, ''));
          if (!isNaN(budgetValue)) {
            const estimatedHours = Math.ceil(budgetValue / contractor.hourlyRate);
            if (estimatedHours >= 1 && estimatedHours <= 10) {
              matchScore += 5;
              matchReasons.push('Budget compatibility');
            }
          }
        }

        // Rating bonus (5 points)
        if (contractor.rating >= 4.5) {
          matchScore += 5;
          matchReasons.push('High rating');
        }

        // Experience bonus (5 points)
        if (contractor.experience >= 5) {
          matchScore += 5;
          matchReasons.push('Experienced contractor');
        }

        // Check if contractor can bid
        if (contractor.availability !== 'AVAILABLE') {
          canBid = false;
        }
      }
    }

    // Format the response
    const response = {
      id: serviceRequest.id,
      serviceTitle: serviceRequest.serviceTitle,
      serviceCategory: serviceRequest.serviceCategory,
      description: serviceRequest.description,
      location: serviceRequest.location,
      budget: serviceRequest.budget,
      phone: serviceRequest.phone,
      preferredTime: serviceRequest.preferredTime,
      insurance: serviceRequest.insurance,
      urgentResponse: serviceRequest.urgentResponse,
      urgency: serviceRequest.urgency,
      leadScore: serviceRequest.leadScore,
      status: serviceRequest.status,
      createdAt: serviceRequest.createdAt,
      updatedAt: serviceRequest.updatedAt,
      user: serviceRequest.user,
      matchScore,
      matchReasons,
      hasBid,
      canBid,
    };

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
