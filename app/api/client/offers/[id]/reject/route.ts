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

    // Get the offer/match
    const offer = await prisma.contractorMatch.findUnique({
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

    if (!offer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Check if the client owns this service request
    if (offer.serviceRequest.userId !== payload.userId) {
      return NextResponse.json(
        { error: 'Unauthorized to reject this offer' },
        { status: 403 }
      );
    }

    // Update the offer status to REJECTED
    await prisma.contractorMatch.update({
      where: { id: params.id },
      data: { status: 'REJECTED' },
    });

    // Send notification message to contractor
    await prisma.message.create({
      data: {
        senderId: payload.userId,
        receiverId: offer.contractor.userId,
        content: `Thank you for your interest in "${offer.serviceRequest.serviceTitle}". Unfortunately, we've decided to go with another contractor for this project. We'll keep your information for future opportunities.`,
        messageType: 'BID_REJECTED',
        requestId: offer.serviceRequestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer rejected successfully',
    });
  } catch (error) {
    console.error('Reject offer error:', error);
    return NextResponse.json(
      { error: 'Failed to reject offer' },
      { status: 500 }
    );
  }
}