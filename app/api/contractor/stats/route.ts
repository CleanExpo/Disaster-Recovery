import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
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

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!contractorProfile) {
      return NextResponse.json({ error: 'Contractor profile not found' }, { status: 404 });
    }

    // Get contractor matches (active projects)
    const activeMatches = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        status: 'ACCEPTED'
      },
      include: {
        serviceRequest: true
      }
    });

    // Get completed jobs (matches with completed service requests)
    const completedMatches = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        serviceRequest: {
          status: 'COMPLETED'
        }
      }
    });

    // Calculate stats
    const activeProjects = activeMatches.length;
    const completedJobs = completedMatches.length;
    const totalEarnings = completedJobs * (contractorProfile.hourlyRate || 0) * 8; // Assuming 8 hours per job
    const rating = contractorProfile.rating || 0;

    // Get today's opportunities (service requests in contractor's service areas)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysOpportunities = await prisma.serviceRequest.count({
      where: {
        status: 'PENDING',
        serviceCategory: {
          in: contractorProfile.services
        },
        createdAt: {
          gte: today
        }
      }
    });

    const stats = {
      activeProjects,
      totalEarnings,
      completedJobs,
      rating,
      todaysOpportunities
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching contractor stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contractor stats' },
      { status: 500 }
    );
  }
}
