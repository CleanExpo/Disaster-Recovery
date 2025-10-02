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
        { error: 'Unauthorized to accept this offer' },
        { status: 403 }
      );
    }

    // Update the offer status to ACCEPTED
    await prisma.contractorMatch.update({
      where: { id: params.id },
      data: { status: 'ACCEPTED' },
    });

    // Update the service request status to MATCHED
    await prisma.serviceRequest.update({
      where: { id: offer.serviceRequestId },
      data: { status: 'MATCHED' },
    });

    // Send notification message to contractor
    await prisma.message.create({
      data: {
        senderId: payload.userId,
        receiverId: offer.contractor.userId,
        content: `Great news! Your bid for "${offer.serviceRequest.serviceTitle}" has been accepted. The client is looking forward to working with you.`,
        messageType: 'BID_ACCEPTED',
        requestId: offer.serviceRequestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer accepted successfully',
    });
  } catch (error) {
    console.error('Accept offer error:', error);
    return NextResponse.json(
      { error: 'Failed to accept offer' },
      { status: 500 }
    );
  }
}