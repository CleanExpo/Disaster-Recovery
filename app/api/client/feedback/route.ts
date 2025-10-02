import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { requestId, rating, review, contractorId } = body;

    if (!requestId || !rating || !contractorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the request belongs to the user
    const serviceRequest = await prisma.serviceRequest.findFirst({
      where: {
        id: requestId,
        userId: decoded.userId,
        status: 'COMPLETED'
      }
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found or not completed' }, { status: 404 });
    }

    // In a real app, you would create a feedback/rating table
    // For now, we'll just return success

    // Update contractor rating (mock calculation)
    const contractor = await prisma.contractorProfile.findUnique({
      where: { id: contractorId }
    });

    if (contractor) {
      // Simple rating update (in real app, use proper averaging)
      const newRating = (contractor.rating + rating) / 2;
      await prisma.contractorProfile.update({
        where: { id: contractorId },
        data: {
          rating: newRating,
          totalJobs: contractor.totalJobs + 1
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Get feedback for a specific request
    // In a real app, you would fetch from a feedback table
    const feedback = {
      requestId,
      rating: 0,
      review: '',
      submittedAt: null
    };

    return NextResponse.json({
      success: true,
      feedback
    });

  } catch (error) {
    console.error('Error getting feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
