import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
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

    // Mock notifications for now - in a real app, these would come from a notifications table
    const notifications = [
      {
        id: '1',
        title: 'New Contractor Match',
        message: 'We found 3 qualified contractors for your water damage restoration request',
        type: 'match',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Request Status Update',
        message: 'Your plumbing repair request has been accepted by Elite Plumbing Services',
        type: 'status',
        isRead: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: '3',
        title: 'Payment Reminder',
        message: 'Please complete payment for your completed electrical work project',
        type: 'payment',
        isRead: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];

    return NextResponse.json({
      success: true,
      notifications,
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}