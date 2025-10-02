import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { contractorId } = body;

    if (!contractorId) {
      return NextResponse.json(
        { error: 'Contractor ID is required' },
        { status: 400 }
      );
    }

    // Check if contractor exists and is verified
    const contractor = await prisma.contractorProfile.findFirst({
      where: {
        userId: contractorId,
        isVerified: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor not found or not verified' },
        { status: 404 }
      );
    }

    // Check if there's already a connection (via service request match)
    const existingConnection = await prisma.contractorMatch.findFirst({
      where: {
        contractorId: contractor.id,
        serviceRequest: {
          userId: payload.userId,
        },
      },
    });

    if (existingConnection) {
      return NextResponse.json({
        success: true,
        message: 'Connection already exists',
        connectionId: existingConnection.id,
      });
    }

    // Create a direct contact request
    const contactRequest = await prisma.message.create({
      data: {
        senderId: payload.userId,
        receiverId: contractorId,
        content: 'I would like to discuss a potential project with you.',
        messageType: 'GENERAL',
        subject: 'New Contact Request',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Contact request sent successfully',
      contactRequest,
    });
  } catch (error) {
    console.error('Initiate contact error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate contact' },
      { status: 500 }
    );
  }
}
