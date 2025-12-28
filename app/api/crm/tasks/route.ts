/**
 * Tasks API
 *
 * POST /api/crm/tasks - Create task
 * GET /api/crm/tasks - List tasks
 *
 * @route /api/crm/tasks
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, TaskStatus, TaskPriority } from '@prisma/client';
import { TaskService } from '@/lib/crm/task.service';

const prisma = new PrismaClient();
const taskService = new TaskService(prisma);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.assignedToId || !body.createdById) {
      return NextResponse.json(
        {
          success: false,
          error: 'title, assignedToId, and createdById are required',
        },
        { status: 400 }
      );
    }

    const task = await taskService.createTask(body);

    return NextResponse.json({
      success: true,
      data: task,
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
    const assignedToId = searchParams.get('assignedToId');
    const status = searchParams.get('status') as TaskStatus | null;
    const priority = searchParams.get('priority') as TaskPriority | null;

    if (!assignedToId) {
      return NextResponse.json(
        {
          success: false,
          error: 'assignedToId is required',
        },
        { status: 400 }
      );
    }

    const tasks = await taskService.getUserTasks(assignedToId, {
      status: status || undefined,
      priority: priority || undefined,
    });

    return NextResponse.json({
      success: true,
      data: tasks,
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
