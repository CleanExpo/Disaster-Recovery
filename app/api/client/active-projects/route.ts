import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all accepted contractor matches for this client's service requests
    const activeProjects = await prisma.contractorMatch.findMany({
      where: {
        serviceRequest: {
          userId: payload.userId,
        },
        status: 'ACCEPTED', // Only accepted offers become active projects
      },
      include: {
        contractor: {
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
        serviceRequest: {
          select: {
            id: true,
            serviceTitle: true,
            description: true,
            location: true,
            serviceCategory: true,
            urgency: true,
            budget: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include project details
    const transformedProjects = activeProjects.map(project => ({
      id: project.id,
      contractor: project.contractor,
      serviceRequest: project.serviceRequest,
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
    console.error('Get active projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active projects' },
      { status: 500 }
    );
  }
}
