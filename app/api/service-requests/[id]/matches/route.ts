import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestId = params.id;

    // Get the service request to verify ownership
    const serviceRequest = await prisma.serviceRequest.findFirst({
      where: {
        id: requestId,
        userId: user.userId
      }
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    // Get matched contractors for this request
    const matches = await prisma.contractorMatch.findMany({
      where: {
        serviceRequestId: requestId
      },
      include: {
        contractor: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        matchScore: 'desc'
      }
    });

    // Format the response
    const contractorMatches = matches.map(match => ({
      id: match.id,
      contractorId: match.contractorId,
      matchScore: match.matchScore,
      status: match.status,
      contractor: {
        id: match.contractor.id,
        businessName: match.contractor.businessName,
        phone: match.contractor.phone,
        city: match.contractor.city,
        state: match.contractor.state,
        services: match.contractor.services,
        experience: match.contractor.experience,
        rating: match.contractor.rating,
        totalJobs: match.contractor.totalJobs,
        hourlyRate: match.contractor.hourlyRate,
        bio: match.contractor.bio,
        availability: match.contractor.availability,
        isVerified: match.contractor.isVerified,
        user: {
          id: match.contractor.user.id,
          name: match.contractor.user.name,
          email: match.contractor.user.email,
          avatar: match.contractor.user.avatar
        }
      }
    }));

    return NextResponse.json({
      success: true,
      data: contractorMatches
    });

  } catch (error) {
    console.error('Error getting contractor matches:', error);
    return NextResponse.json(
      { error: 'Failed to get contractor matches' },
      { status: 500 }
    );
  }
}
