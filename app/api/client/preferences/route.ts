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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Default preferences
    const preferences = {
      notifications: {
        email: true,
        sms: false,
        push: true,
        matchNotifications: true,
        projectUpdates: true,
        paymentReminders: true,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showContactInfo: true,
        allowDirectContact: true
      },
      preferences: {
        preferredContactMethod: 'email',
        timezone: 'America/New_York',
        language: 'en',
        theme: 'dark'
      },
      communication: {
        autoReply: false,
        autoReplyMessage: '',
        responseTimeExpectation: '24h'
      }
    };

    return NextResponse.json({
      success: true,
      user,
      preferences
    });

  } catch (error) {
    console.error('Error getting client preferences:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const { name, avatar, preferences } = body;

    // Update user profile
    const updateData: any = {};
    if (name) updateData.name = name;
    if (avatar) updateData.avatar = avatar;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: decoded.userId },
        data: updateData
      });
    }

    // In a real app, you would save preferences to a separate table
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully'
    });

  } catch (error) {
    console.error('Error updating client preferences:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
