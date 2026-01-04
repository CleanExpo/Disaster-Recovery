import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCourseInfo, calculateCourseProgress } from '@/lib/nrpg/course-loader';

// GET /api/onboarding/courses/[courseId]
// Returns detailed course info with modules and user progress
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = params;

    // Validate courseId
    if (courseId !== 'CSE' && courseId !== 'WRT') {
      return NextResponse.json(
        { success: false, error: 'Invalid course ID. Must be CSE or WRT.' },
        { status: 400 }
      );
    }

    // Get course info from framework files
    const courseInfo = getCourseInfo(courseId);

    if (!courseInfo) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Get contractor profile
    const contractor = await prisma.contractor.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    });

    let moduleProgress: Array<{
      moduleId: string;
      status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
      bestQuizScore: number | null;
      actualMinutes: number;
      completedAt: Date | null;
    }> = [];

    if (contractor) {
      // Get training progress for this course's modules
      const progress = await prisma.nRPGTrainingProgress.findMany({
        where: {
          contractorId: contractor.id,
          moduleId: { startsWith: courseId },
        },
        select: {
          moduleId: true,
          status: true,
          bestQuizScore: true,
          actualMinutes: true,
          completedAt: true,
        },
      });

      moduleProgress = progress.map(p => ({
        moduleId: p.moduleId,
        status: p.status as 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED',
        bestQuizScore: p.bestQuizScore,
        actualMinutes: p.actualMinutes,
        completedAt: p.completedAt,
      }));
    }

    // Calculate overall course progress
    const progress = calculateCourseProgress(courseId, moduleProgress);

    // Build module list with status
    const modules = courseInfo.modules.map((module, idx) => {
      const modProgress = moduleProgress.find(p => p.moduleId === module.moduleId);

      // Determine if module is locked (previous module must be completed)
      let isLocked = false;
      if (idx > 0) {
        const prevModuleId = courseInfo.modules[idx - 1].moduleId;
        const prevProgress = moduleProgress.find(p => p.moduleId === prevModuleId);
        isLocked = !prevProgress || prevProgress.status !== 'COMPLETED';
      }

      let status: 'locked' | 'available' | 'in_progress' | 'completed' = 'available';
      if (isLocked) {
        status = 'locked';
      } else if (modProgress?.status === 'COMPLETED') {
        status = 'completed';
      } else if (modProgress?.status === 'IN_PROGRESS') {
        status = 'in_progress';
      }

      return {
        moduleId: module.moduleId,
        title: module.title,
        description: module.description,
        order: module.moduleOrder,
        estimatedMinutes: module.estimatedMinutes,
        status,
        score: modProgress?.bestQuizScore || null,
        completedAt: modProgress?.completedAt?.toISOString() || null,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        courseId: courseInfo.courseId,
        courseName: courseInfo.courseName,
        description: courseInfo.description,
        totalModules: courseInfo.totalModules,
        totalHours: courseInfo.totalHours,
        modules,
        progress: {
          completedModules: progress.completedModules,
          percentComplete: progress.percentComplete,
          averageScore: progress.averageScore,
          totalTimeMinutes: progress.totalTimeMinutes,
          status: progress.status,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course details' },
      { status: 500 }
    );
  }
}
