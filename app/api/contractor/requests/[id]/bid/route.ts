import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const bidSchema = z.object({
  budget: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(1).max(5000),
  startDate: z.string().optional(),
  estimatedHours: z.string().optional(),
});

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
    if (!payload || payload.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { budget, timeline, message, startDate, estimatedHours } = bidSchema.parse(body);

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

    // Check if contractor has a match for this request, create if not exists
    let existingMatch = await prisma.contractorMatch.findFirst({
      where: {
        contractorId: contractorProfile.id,
        serviceRequestId: params.id,
      },
    });

    // If no match exists, create one (this allows contractors to bid on any visible request)
    if (!existingMatch) {
      existingMatch = await prisma.contractorMatch.create({
        data: {
          contractorId: contractorProfile.id,
          serviceRequestId: params.id,
          matchScore: 50, // Default score for manual bidding
          status: 'PENDING',
        },
      });
    }

    // Get service request
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
    });

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    if (serviceRequest.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'This request is no longer accepting bids' },
        { status: 400 }
      );
    }

    // Update the contractor match with bid details
    const updatedMatch = await prisma.contractorMatch.update({
      where: {
        id: existingMatch.id,
      },
      data: {
        contractorMessage: message,
        budget: budget,
        timeline: timeline,
        startDate: startDate,
        estimatedHours: estimatedHours,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      bid: updatedMatch,
      message: 'Bid submitted successfully',
    });
  } catch (error) {
    console.error('Submit bid error:', error);
    return NextResponse.json(
      { error: 'Failed to submit bid' },
      { status: 500 }
    );
  }
}
