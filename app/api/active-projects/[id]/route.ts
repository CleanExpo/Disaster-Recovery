import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || (payload.userType !== 'CLIENT' && payload.userType !== 'CONTRACTOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the active project (ContractorMatch with ACCEPTED status)
    const project = await prisma.contractorMatch.findUnique({
      where: { id: params.id },
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
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this project
    if (payload.userType === 'CLIENT') {
      // Client can only view projects for their own service requests
      if (project.serviceRequest.userId !== payload.userId) {
        return NextResponse.json(
          { error: 'Unauthorized to view this project' },
          { status: 403 }
        );
      }
    } else if (payload.userType === 'CONTRACTOR') {
      // Contractor can only view their own projects
      if (project.contractor.userId !== payload.userId) {
        return NextResponse.json(
          { error: 'Unauthorized to view this project' },
          { status: 403 }
        );
      }
    }

    // Transform the data based on user type
    const transformedProject = {
      id: project.id,
      budget: project.budget,
      timeline: project.timeline,
      startDate: project.startDate,
      estimatedHours: project.estimatedHours,
      message: project.contractorMessage,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      contractor: project.contractor,
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
    };

    return NextResponse.json({
      success: true,
      project: transformedProject,
    });
  } catch (error) {
    console.error('Get active project details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
}
