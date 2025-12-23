/**
 * Report Scheduler
 *
 * Schedule and manage automated report delivery
 */

export type ReportFrequency = 'daily' | 'weekly' | 'monthly' | 'custom';
export type ReportFormat = 'pdf' | 'email' | 'slack' | 'webhook' | 'drive';

export interface ScheduledReport {
  id: string;
  dashboardId: string;
  name: string;
  description?: string;
  frequency: ReportFrequency;
  recipients: string[];
  ccRecipients?: string[];
  format: ReportFormat;
  isActive: boolean;
  isPaused: boolean;
  config: {
    time?: string; // HH:MM
    timezone?: string;
    dayOfWeek?: number; // 0-6
    dayOfMonth?: number; // 1-31
    includes?: string[]; // Widget IDs to include
    slackChannel?: string;
    webhookUrl?: string;
    driveFolder?: string;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    lastRunAt?: Date;
    nextRunAt?: Date;
    runsCount: number;
    failureCount: number;
  };
}

export interface ReportExecution {
  id: string;
  scheduleId: string;
  dashboardId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  format: ReportFormat;
  recipients: string[];
  resultUrl?: string;
  error?: string;
  metadata: {
    size?: number;
    deliveredAt?: Date;
    deliveryStatus: Record<string, 'sent' | 'failed' | 'pending'>;
  };
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  frequency: ReportFrequency;
  format: ReportFormat;
  defaultTime?: string;
  widgets: string[]; // Widget IDs
  isPublic: boolean;
}

/**
 * Report Scheduler - Schedule and manage automated reports
 */
export class ReportScheduler {
  private schedules: Map<string, ScheduledReport> = new Map();
  private executions: Map<string, ReportExecution> = new Map();
  private templates: Map<string, ReportTemplate> = new Map();
  private executionQueue: ReportExecution[] = [];

  /**
   * Create scheduled report
   */
  createSchedule(
    dashboardId: string,
    name: string,
    frequency: ReportFrequency,
    recipients: string[],
    format: ReportFormat,
    createdBy: string
  ): ScheduledReport {
    const schedule: ScheduledReport = {
      id: `schedule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dashboardId,
      name,
      frequency,
      recipients,
      format,
      isActive: true,
      isPaused: false,
      config: {},
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy,
        runsCount: 0,
        failureCount: 0,
      },
    };

    this.schedules.set(schedule.id, schedule);
    this.calculateNextRun(schedule);

    return schedule;
  }

  /**
   * Update schedule
   */
  updateSchedule(scheduleId: string, updates: Partial<ScheduledReport>): ScheduledReport | null {
    const schedule = this.schedules.get(scheduleId);
    if (!schedule) return null;

    Object.assign(schedule, updates);
    schedule.metadata.updatedAt = new Date();

    if (schedule.isActive && !schedule.isPaused) {
      this.calculateNextRun(schedule);
    }

    return schedule;
  }

  /**
   * Pause schedule
   */
  pauseSchedule(scheduleId: string): boolean {
    const schedule = this.schedules.get(scheduleId);
    if (!schedule) return false;

    schedule.isPaused = true;
    schedule.metadata.updatedAt = new Date();

    return true;
  }

  /**
   * Resume schedule
   */
  resumeSchedule(scheduleId: string): boolean {
    const schedule = this.schedules.get(scheduleId);
    if (!schedule) return false;

    schedule.isPaused = false;
    schedule.metadata.updatedAt = new Date();
    this.calculateNextRun(schedule);

    return true;
  }

  /**
   * Delete schedule
   */
  deleteSchedule(scheduleId: string): boolean {
    return this.schedules.delete(scheduleId);
  }

  /**
   * Queue report execution
   */
  queueExecution(scheduleId: string, dashboardId: string): ReportExecution {
    const schedule = this.schedules.get(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    const execution: ReportExecution = {
      id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      scheduleId,
      dashboardId,
      status: 'pending',
      startTime: new Date(),
      format: schedule.format,
      recipients: schedule.recipients,
      metadata: {
        deliveryStatus: {},
      },
    };

    schedule.recipients.forEach((recipient) => {
      execution.metadata.deliveryStatus[recipient] = 'pending';
    });

    this.executionQueue.push(execution);
    this.executions.set(execution.id, execution);

    return execution;
  }

  /**
   * Execute report
   */
  executeReport(executionId: string): ReportExecution | null {
    const execution = this.executions.get(executionId);
    if (!execution) return null;

    execution.status = 'running';

    // Simulate report generation
    setTimeout(() => {
      execution.status = 'completed';
      execution.endTime = new Date();
      execution.metadata.deliveredAt = new Date();
      execution.resultUrl = `https://reports.example.com/${executionId}.pdf`;

      // Update delivery status
      Object.keys(execution.metadata.deliveryStatus).forEach((recipient) => {
        execution.metadata.deliveryStatus[recipient] = Math.random() > 0.1 ? 'sent' : 'failed';
      });

      const schedule = this.schedules.get(execution.scheduleId);
      if (schedule) {
        schedule.metadata.runsCount++;
        const failedCount = Object.values(execution.metadata.deliveryStatus).filter((s) => s === 'failed').length;
        if (failedCount > 0) {
          schedule.metadata.failureCount++;
        }
        schedule.metadata.lastRunAt = new Date();
        this.calculateNextRun(schedule);
      }
    }, 2000);

    return execution;
  }

  /**
   * Get schedule
   */
  getSchedule(scheduleId: string): ScheduledReport | null {
    return this.schedules.get(scheduleId) || null;
  }

  /**
   * Get schedules by dashboard
   */
  getSchedulesByDashboard(dashboardId: string): ScheduledReport[] {
    return Array.from(this.schedules.values()).filter((s) => s.dashboardId === dashboardId);
  }

  /**
   * Get all active schedules
   */
  getActiveSchedules(): ScheduledReport[] {
    return Array.from(this.schedules.values()).filter((s) => s.isActive && !s.isPaused);
  }

  /**
   * Get executions for schedule
   */
  getExecutionsForSchedule(scheduleId: string, limit: number = 10): ReportExecution[] {
    return Array.from(this.executions.values())
      .filter((e) => e.scheduleId === scheduleId)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
      .slice(0, limit);
  }

  /**
   * Get execution
   */
  getExecution(executionId: string): ReportExecution | null {
    return this.executions.get(executionId) || null;
  }

  /**
   * Get execution statistics
   */
  getExecutionStats(scheduleId: string): {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    successRate: number;
    averageDeliveryTime: number;
  } {
    const executions = this.getExecutionsForSchedule(scheduleId, 100);

    const totalExecutions = executions.length;
    const successfulExecutions = executions.filter((e) => e.status === 'completed').length;
    const failedExecutions = executions.filter((e) => e.status === 'failed').length;

    const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;

    const deliveryTimes = executions
      .filter((e) => e.endTime)
      .map((e) => (e.endTime!.getTime() - e.startTime.getTime()) / 1000); // seconds

    const averageDeliveryTime =
      deliveryTimes.length > 0 ? deliveryTimes.reduce((a, b) => a + b, 0) / deliveryTimes.length : 0;

    return {
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      successRate,
      averageDeliveryTime,
    };
  }

  /**
   * Create template
   */
  createTemplate(
    name: string,
    frequency: ReportFrequency,
    format: ReportFormat,
    widgets: string[]
  ): ReportTemplate {
    const template: ReportTemplate = {
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: '',
      frequency,
      format,
      widgets,
      isPublic: false,
    };

    this.templates.set(template.id, template);
    return template;
  }

  /**
   * Get templates
   */
  getPublicTemplates(): ReportTemplate[] {
    return Array.from(this.templates.values()).filter((t) => t.isPublic);
  }

  /**
   * Calculate next run time
   */
  private calculateNextRun(schedule: ScheduledReport): void {
    const now = new Date();
    let nextRun = new Date(now);

    switch (schedule.frequency) {
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        if (schedule.config.time) {
          const [hours, minutes] = schedule.config.time.split(':').map(Number);
          nextRun.setHours(hours, minutes, 0, 0);
        }
        break;

      case 'weekly':
        const dayOfWeek = schedule.config.dayOfWeek || 0;
        const daysUntilNext = (dayOfWeek - now.getDay() + 7) % 7 || 7;
        nextRun.setDate(nextRun.getDate() + daysUntilNext);
        if (schedule.config.time) {
          const [hours, minutes] = schedule.config.time.split(':').map(Number);
          nextRun.setHours(hours, minutes, 0, 0);
        }
        break;

      case 'monthly':
        const dayOfMonth = schedule.config.dayOfMonth || 1;
        nextRun.setMonth(nextRun.getMonth() + 1);
        nextRun.setDate(dayOfMonth);
        if (schedule.config.time) {
          const [hours, minutes] = schedule.config.time.split(':').map(Number);
          nextRun.setHours(hours, minutes, 0, 0);
        }
        break;
    }

    schedule.metadata.nextRunAt = nextRun;
  }

  /**
   * Get reports due for execution
   */
  getReportsDue(): ScheduledReport[] {
    const now = new Date();

    return Array.from(this.schedules.values()).filter((schedule) => {
      if (!schedule.isActive || schedule.isPaused) return false;
      if (!schedule.metadata.nextRunAt) return false;

      return schedule.metadata.nextRunAt <= now;
    });
  }

  /**
   * Clean up old executions
   */
  cleanupOldExecutions(daysOld: number = 30): number {
    const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
    let removed = 0;

    this.executions.forEach((execution, id) => {
      if (execution.startTime < cutoffDate) {
        this.executions.delete(id);
        removed++;
      }
    });

    return removed;
  }
}

// Export singleton instance
export const reportScheduler = new ReportScheduler();
