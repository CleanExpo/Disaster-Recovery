import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    console.log('Cancel request - ID:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'JWT secret not configured' }, { status: 500 });
    }

    // Verify the token
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const userId = payload.userId;
    
    console.log('Cancel request - User ID:', userId);

    // Find the service request
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
    
    console.log('Cancel request - Found service request:', serviceRequest ? 'Yes' : 'No');

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    // Check if the user owns this request
    if (serviceRequest.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized to cancel this request' }, { status: 403 });
    }

    // Check if the request can be cancelled (only PENDING requests can be cancelled)
    console.log('Cancel request - Current status:', serviceRequest.status);
    if (serviceRequest.status !== 'PENDING') {
      return NextResponse.json({ 
        error: 'Only pending requests can be cancelled',
        currentStatus: serviceRequest.status
      }, { status: 400 });
    }

    // Update the request status to CANCELLED
    console.log('Cancel request - Updating status to CANCELLED');
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      },
      include: {
        user: true
      }
    });
    
    console.log('Cancel request - Update successful');

    return NextResponse.json({
      success: true,
      message: 'Request cancelled successfully',
      request: updatedRequest
    });

  } catch (error) {
    console.error('Error cancelling service request:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to cancel service request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
