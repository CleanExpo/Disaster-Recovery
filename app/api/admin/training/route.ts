import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { trainingActionSchema } from '@/lib/validation-schemas';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    // Mock training data - in a real app, this would come from a database
    const trainingModules = [
      {
        id: '1',
        title: 'Platform Overview',
        description: 'Learn the basics of the restoration marketplace platform',
        type: 'onboarding',
        duration: 15,
        difficulty: 'beginner',
        status: 'published',
        completionRate: 95,
        rating: 4.8,
        lessons: [
          {
            id: '1-1',
            title: 'Welcome to the Platform',
            duration: 5,
            type: 'video',
            completed: false
          },
          {
            id: '1-2',
            title: 'Navigation Basics',
            duration: 5,
            type: 'interactive',
            completed: false
          },
          {
            id: '1-3',
            title: 'Your First Request',
            duration: 5,
            type: 'tutorial',
            completed: false
          }
        ]
      },
      {
        id: '2',
        title: 'Lead Management',
        description: 'Master the art of lead scoring and management',
        type: 'advanced',
        duration: 30,
        difficulty: 'intermediate',
        status: 'published',
        completionRate: 87,
        rating: 4.6,
        lessons: [
          {
            id: '2-1',
            title: 'Understanding Lead Scores',
            duration: 10,
            type: 'video',
            completed: false
          },
          {
            id: '2-2',
            title: 'Lead Qualification Process',
            duration: 10,
            type: 'interactive',
            completed: false
          },
          {
            id: '2-3',
            title: 'Converting Leads to Projects',
            duration: 10,
            type: 'case-study',
            completed: false
          }
        ]
      },
      {
        id: '3',
        title: 'Contractor Matching',
        description: 'Learn how to effectively match contractors with clients',
        type: 'advanced',
        duration: 25,
        difficulty: 'intermediate',
        status: 'published',
        completionRate: 92,
        rating: 4.7,
        lessons: [
          {
            id: '3-1',
            title: 'Matching Algorithm Overview',
            duration: 8,
            type: 'video',
            completed: false
          },
          {
            id: '3-2',
            title: 'Contractor Evaluation',
            duration: 8,
            type: 'interactive',
            completed: false
          },
          {
            id: '3-3',
            title: 'Optimizing Matches',
            duration: 9,
            type: 'tutorial',
            completed: false
          }
        ]
      },
      {
        id: '4',
        title: 'Customer Communication',
        description: 'Best practices for client communication and support',
        type: 'soft-skills',
        duration: 20,
        difficulty: 'beginner',
        status: 'published',
        completionRate: 89,
        rating: 4.5,
        lessons: [
          {
            id: '4-1',
            title: 'Communication Best Practices',
            duration: 7,
            type: 'video',
            completed: false
          },
          {
            id: '4-2',
            title: 'Handling Difficult Situations',
            duration: 7,
            type: 'role-play',
            completed: false
          },
          {
            id: '4-3',
            title: 'Building Client Relationships',
            duration: 6,
            type: 'case-study',
            completed: false
          }
        ]
      },
      {
        id: '5',
        title: 'Analytics & Reporting',
        description: 'Understanding platform analytics and reporting tools',
        type: 'technical',
        duration: 35,
        difficulty: 'advanced',
        status: 'published',
        completionRate: 78,
        rating: 4.4,
        lessons: [
          {
            id: '5-1',
            title: 'Dashboard Overview',
            duration: 12,
            type: 'video',
            completed: false
          },
          {
            id: '5-2',
            title: 'Key Metrics Explained',
            duration: 12,
            type: 'interactive',
            completed: false
          },
          {
            id: '5-3',
            title: 'Creating Custom Reports',
            duration: 11,
            type: 'tutorial',
            completed: false
          }
        ]
      }
    ];

    // Filter by type if specified
    const filteredModules = type === 'all' 
      ? trainingModules 
      : trainingModules.filter(module => module.type === type);

    // Get user progress (mock data)
    const userProgress = {
      totalModules: trainingModules.length,
      completedModules: 2,
      inProgressModules: 1,
      totalLessons: trainingModules.reduce((sum, module) => sum + module.lessons.length, 0),
      completedLessons: 8,
      totalTimeSpent: 120, // minutes
      averageScore: 87,
      certificates: [
        {
          id: 'cert-1',
          title: 'Platform Basics',
          issuedDate: '2024-01-15',
          expiryDate: '2025-01-15'
        }
      ]
    };

    return NextResponse.json({
      success: true,
      modules: filteredModules,
      userProgress
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = trainingActionSchema.parse(body);
    const { moduleId, lessonId, action, score } = validatedData;

    // Handle different training actions
    switch (action) {
      case 'start_module':
        // In a real app, track module start
        break;
      case 'complete_lesson':
        // In a real app, mark lesson as completed and track score
        break;
      case 'complete_module':
        // In a real app, mark module as completed and issue certificate
        break;
      case 'update_progress':
        // In a real app, update user progress
        break;
    }

    return NextResponse.json({
      success: true,
      message: 'Training progress updated successfully'
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
