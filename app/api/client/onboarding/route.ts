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
      include: {
        serviceRequests: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check onboarding status
    const hasSubmittedRequest = user.serviceRequests.length > 0;
    const isOnboarded = hasSubmittedRequest;

    const onboardingSteps = [
      {
        id: 'welcome',
        title: 'Welcome to Restoration Marketplace',
        description: 'Get started by exploring our platform features',
        completed: true,
        icon: '👋'
      },
      {
        id: 'profile',
        title: 'Complete Your Profile',
        description: 'Add your contact information and preferences',
        completed: !!user.name,
        icon: '👤'
      },
      {
        id: 'first_request',
        title: 'Submit Your First Request',
        description: 'Create a service request to get matched with contractors',
        completed: hasSubmittedRequest,
        icon: '📝'
      },
      {
        id: 'explore',
        title: 'Explore Services',
        description: 'Browse available services and contractor profiles',
        completed: false,
        icon: '🔍'
      }
    ];

    const progress = onboardingSteps.filter(step => step.completed).length;
    const totalSteps = onboardingSteps.length;
    const progressPercentage = (progress / totalSteps) * 100;

    return NextResponse.json({
      success: true,
      onboarding: {
        isOnboarded,
        progress,
        totalSteps,
        progressPercentage,
        steps: onboardingSteps,
        nextStep: onboardingSteps.find(step => !step.completed)
      }
    });

  } catch (error) {
    console.error('Error getting onboarding status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const { step, data } = body;

    // Handle different onboarding steps
    switch (step) {
      case 'profile':
        await prisma.user.update({
          where: { id: decoded.userId },
          data: {
            name: data.name,
            avatar: data.avatar
          }
        });
        break;
      
      case 'preferences':
        // In a real app, you would save preferences to a separate table
        break;
      
      case 'complete':
        // Mark onboarding as complete
        break;
    }

    return NextResponse.json({
      success: true,
      message: 'Onboarding step completed'
    });

  } catch (error) {
    console.error('Error updating onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
