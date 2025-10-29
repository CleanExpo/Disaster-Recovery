import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

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

    // Get service requests as projects
    const serviceRequests = await prisma.serviceRequest.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        matches: {
          include: {
            contractor: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    // Transform service requests into project format
    const projects = serviceRequests.map(request => ({
      id: request.id,
      title: request.serviceTitle,
      description: request.description,
      category: request.serviceCategory,
      urgency: request.urgency,
      location: request.location,
      budget: request.budget,
      status: request.status,
      leadScore: request.leadScore,
      progress: request.status === 'COMPLETED' ? 100 : 
                request.status === 'IN_PROGRESS' ? 75 :
                request.status === 'MATCHED' ? 50 : 25,
      contractor: request.matches[0]?.contractor || null,
      matchScore: request.matches[0]?.matchScore || null,
      nextSteps: request.status === 'PENDING' ? ['Waiting for contractor matches'] :
                 request.status === 'MATCHED' ? ['Review contractor proposals', 'Schedule consultation'] :
                 request.status === 'IN_PROGRESS' ? ['Monitor progress', 'Communicate with contractor'] :
                 request.status === 'COMPLETED' ? ['Leave review', 'Request invoice'] : []
    }));

    return NextResponse.json({
      success: true,
      projects,
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}