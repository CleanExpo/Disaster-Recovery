/**
 * NRPG Training Courses API
 * GET: List all available courses with contractor progress
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getAllCourses, calculateCourseProgress, type CourseInfo } from '@/lib/nrpg/course-loader';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const contractor = await prisma.contractor.findFirst({
      where: { userId },
      select: { id: true },
    });

    // Load course definitions
    const courses = getAllCourses();

    // If no contractor, return courses without progress
    if (!contractor) {
      return NextResponse.json({
        success: true,
        data: {
          courses: courses.map(course => ({
            ...course,
            progress: {
              courseId: course.courseId,
              completedModules: 0,
              totalModules: course.totalModules,
              percentComplete: 0,
              averageScore: 0,
              totalTimeMinutes: 0,
              currentModuleId: course.modules[0]?.moduleId || null,
              status: 'not_started' as const,
            },
          })),
        },
      });
    }

    // Get contractor's training progress
    const trainingProgress = await prisma.nRPGTrainingProgress.findMany({
      where: { contractorId: contractor.id },
      select: {
        moduleId: true,
        status: true,
        bestQuizScore: true,
        actualMinutes: true,
      },
    });

    // Calculate progress for each course
    const coursesWithProgress = courses.map(course => {
      const progress = calculateCourseProgress(
        course.courseId as 'CSE' | 'WRT',
        trainingProgress.map(p => ({
          moduleId: p.moduleId,
          status: p.status,
          bestQuizScore: p.bestQuizScore,
          actualMinutes: p.actualMinutes,
        }))
      );

      return {
        ...course,
        progress,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        courses: coursesWithProgress,
        totalProgress: {
          completedModules: coursesWithProgress.reduce((sum, c) => sum + c.progress.completedModules, 0),
          totalModules: coursesWithProgress.reduce((sum, c) => sum + c.progress.totalModules, 0),
          percentComplete: Math.round(
            coursesWithProgress.reduce((sum, c) => sum + c.progress.percentComplete, 0) / coursesWithProgress.length
          ),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
