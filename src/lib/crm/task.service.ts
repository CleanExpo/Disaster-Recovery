/**
 * Task Service
 *
 * Manages follow-up tasks, reminders, and to-do management
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @module TaskService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { PrismaClient, TaskStatus, TaskPriority } from '@prisma/client';
import { AdvancedLogger } from '../logger/advanced-logging';

interface CreateTaskInput {
  title: string;
  description?: string;
  assignedToId: string;
  createdById: string;
  customerLifecycleId?: string;
  opportunityId?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  reminderDate?: Date;
  relatedEntityType?: string;
  relatedEntityId?: string;
}

export class TaskService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Create a new task
   * @param input - Task creation data
   * @returns Created Task
   */
  async createTask(input: CreateTaskInput) {
    // Validate assignee exists
    const assignee = await this.prisma.user.findUnique({
      where: { id: input.assignedToId },
    });

    if (!assignee) {
      throw new Error(`Assignee not found: ${input.assignedToId}`);
    }

    // Check if task is overdue on creation
    const isOverdue = input.dueDate ? input.dueDate < new Date() : false;

    const task = await this.prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        assignedToId: input.assignedToId,
        createdById: input.createdById,
        customerLifecycleId: input.customerLifecycleId,
        opportunityId: input.opportunityId,
        priority: input.priority || 'MEDIUM',
        status: 'TODO',
        dueDate: input.dueDate,
        reminderDate: input.reminderDate,
        isOverdue,
        relatedEntityType: input.relatedEntityType,
        relatedEntityId: input.relatedEntityId,
      },
    });

    AdvancedLogger.info('Task created', {
      taskId: task.id,
      assignedToId: input.assignedToId,
      priority: task.priority,
    });

    return task;
  }

  /**
   * Complete a task
   * @param taskId - Task ID
   * @param completedById - User who completed the task
   * @returns Updated task
   */
  async completeTask(taskId: string, completedById: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    // Verify the user completing is the assignee or admin
    if (task.assignedToId !== completedById) {
      const user = await this.prisma.user.findUnique({
        where: { id: completedById },
      });

      if (user?.userType !== 'ADMIN' && user?.userType !== 'SUPER_ADMIN') {
        throw new Error('Only task assignee or admin can complete tasks');
      }
    }

    const updated = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    AdvancedLogger.info('Task completed', {
      taskId,
      completedById,
      wasOverdue: task.isOverdue,
    });

    return updated;
  }

  /**
   * Get tasks for a user
   * @param userId - User ID
   * @param filters - Optional filters (status, priority)
   * @returns Tasks assigned to user
   */
  async getUserTasks(
    userId: string,
    filters?: {
      status?: TaskStatus;
      priority?: TaskPriority;
      includeCompleted?: boolean;
    }
  ) {
    const where: any = { assignedToId: userId };

    if (filters?.status) {
      where.status = filters.status;
    } else if (!filters?.includeCompleted) {
      where.status = { notIn: ['COMPLETED', 'CANCELLED'] };
    }

    if (filters?.priority) {
      where.priority = filters.priority;
    }

    return this.prisma.task.findMany({
      where,
      include: {
        customerLifecycle: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        opportunity: {
          select: {
            name: true,
            stage: true,
          },
        },
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ isOverdue: 'desc' }, { dueDate: 'asc' }, { priority: 'desc' }],
    });
  }

  /**
   * Run daily batch job to:
   * - Mark overdue tasks
   * - Send reminders for upcoming tasks
   */
  async runDailyTaskMaintenance() {
    const correlationId = AdvancedLogger.setCorrelationId();
    AdvancedLogger.info('Starting daily task maintenance');

    const now = new Date();

    // Mark overdue tasks
    const overdueResult = await this.prisma.task.updateMany({
      where: {
        dueDate: { lt: now },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
        isOverdue: false,
      },
      data: {
        isOverdue: true,
      },
    });

    AdvancedLogger.info('Tasks marked as overdue', {
      count: overdueResult.count,
    });

    // Find tasks with reminders due today
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasksNeedingReminders = await this.prisma.task.findMany({
      where: {
        reminderDate: {
          gte: now,
          lt: tomorrow,
        },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
      },
      include: {
        assignedTo: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    AdvancedLogger.info('Tasks needing reminders', {
      count: tasksNeedingReminders.length,
    });

    // TODO: Send reminder emails/notifications
    // This would integrate with email service

    return {
      overdueTasksMarked: overdueResult.count,
      remindersToSend: tasksNeedingReminders.length,
    };
  }

  /**
   * Get task statistics
   */
  async getTaskStats(assignedToId?: string) {
    const where: any = {};
    if (assignedToId) {
      where.assignedToId = assignedToId;
    }

    const [byStatus, byPriority, overdueCount, dueThisWeek] = await Promise.all([
      this.prisma.task.groupBy({
        by: ['status'],
        _count: true,
        where,
      }),

      this.prisma.task.groupBy({
        by: ['priority'],
        _count: true,
        where: {
          ...where,
          status: { notIn: ['COMPLETED', 'CANCELLED'] },
        },
      }),

      this.prisma.task.count({
        where: {
          ...where,
          isOverdue: true,
          status: { notIn: ['COMPLETED', 'CANCELLED'] },
        },
      }),

      this.prisma.task.count({
        where: {
          ...where,
          dueDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
          status: { notIn: ['COMPLETED', 'CANCELLED'] },
        },
      }),
    ]);

    return {
      byStatus: Object.fromEntries(byStatus.map((s) => [s.status, s._count])),
      byPriority: Object.fromEntries(byPriority.map((p) => [p.priority, p._count])),
      overdueCount,
      dueThisWeek,
    };
  }
}

export const taskService = new TaskService(new PrismaClient());
