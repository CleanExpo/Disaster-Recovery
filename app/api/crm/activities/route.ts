/**
 * Activities API
 *
 * POST /api/crm/activities - Create activity
 * GET /api/crm/activities - List activities
 *
 * @route /api/crm/activities
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, ActivityType } from '@prisma/client';
import { ActivityService } from '@/lib/crm/activity.service';

const prisma = new PrismaClient();
const activityService = new ActivityService(prisma);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.type || !body.subject || !body.performedById) {
      return NextResponse.json(
        {
          success: false,
          error: 'type, subject, and performedById are required',
        },
        { status: 400 }
      );
    }

    const activity = await activityService.createActivity(body);

    return NextResponse.json({
      success: true,
      data: activity,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') as ActivityType | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'userId is required',
        },
        { status: 400 }
      );
    }

    const timeline = await activityService.getTimeline(userId, limit);

    return NextResponse.json({
      success: true,
      data: timeline,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
