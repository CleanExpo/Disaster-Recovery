import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(
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
    if (!payload || payload.userType !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the project/match
    const project = await prisma.contractorMatch.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          include: {
            user: true,
          },
        },
        serviceRequest: {
          include: {
            user: true,
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

    // Check if the client owns this service request
    if (project.serviceRequest.userId !== payload.userId) {
      return NextResponse.json(
        { error: 'Unauthorized to complete this project' },
        { status: 403 }
      );
    }

    // Update the project status to COMPLETED
    await prisma.contractorMatch.update({
      where: { id: params.id },
      data: { status: 'COMPLETED' },
    });

    // Update the service request status to COMPLETED
    await prisma.serviceRequest.update({
      where: { id: project.serviceRequestId },
      data: { status: 'COMPLETED' },
    });

    // Send notification message to contractor
    await prisma.message.create({
      data: {
        senderId: payload.userId,
        receiverId: project.contractor.userId,
        content: `Great news! The project "${project.serviceRequest.serviceTitle}" has been marked as completed. Thank you for your excellent work!`,
        messageType: 'PROJECT_UPDATE',
        requestId: project.serviceRequestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Project completed successfully',
    });
  } catch (error) {
    console.error('Complete project error:', error);
    return NextResponse.json(
      { error: 'Failed to complete project' },
      { status: 500 }
    );
  }
}
