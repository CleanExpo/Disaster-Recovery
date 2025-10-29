import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/auth';

type ActiveProjectType = {
  contractorMessage: any;
  id: string;
  contractor: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
  serviceRequest: {
    user: any;
    id: string;
    serviceTitle: string;
    description: string;
    location: string;
    serviceCategory: string;
    urgency: string;
    budget: string;
    createdAt: string;
  };
  budget: string;
  timeline: string;
  startDate: string;
  estimatedHours: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: payload.userId },
    });

    if (!contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Get all accepted contractor matches for this contractor
    const activeProjects = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        status: 'ACCEPTED', // Only accepted offers become active projects
      },
      include: {
        serviceRequest: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include project details
    const transformedProjects = activeProjects.map((project:ActiveProjectType) => ({
      id: project.id,
      client: {
        user: project.serviceRequest.user,
      },
      serviceRequest: {
        id: project.serviceRequest.id,
        serviceTitle: project.serviceRequest.serviceTitle,
        description: project.serviceRequest.description,
        location: project.serviceRequest.location,
        serviceCategory: project.serviceRequest.serviceCategory,
        urgency: project.serviceRequest.urgency,
        budget: project.serviceRequest.budget,
        createdAt: project.serviceRequest.createdAt,
      },
      budget: project.budget,
      timeline: project.timeline,
      startDate: project.startDate,
      estimatedHours: project.estimatedHours,
      message: project.contractorMessage,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      projects: transformedProjects,
    });
  } catch (error) {
    console.error('Get contractor active projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active projects' },
      { status: 500 }
    );
  }
}
