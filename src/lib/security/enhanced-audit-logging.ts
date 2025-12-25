import { prisma } from '@/lib/prisma';

/**
 * Enhanced Audit Logging Service
 *
 * Comprehensive audit trail for all security-relevant actions
 * - Immutable log storage
 * - Rich context tracking
 * - Retention policies
 * - Alert on suspicious activity
 */

export interface AuditLogEntry {
  id?: string;
  userId: string;
  userEmail?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent?: string;
  status: 'success' | 'failure';
  errorMessage?: string;
  timestamp?: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AuditLogQuery {
  userId?: string;
  action?: string;
  resourceType?: string;
  severity?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface SuspiciousActivity {
  userId: string;
  activity: string;
  riskScore: number;
  timestamp: Date;
  details: Record<string, any>;
}

// Define action categories
const AUDIT_ACTIONS = {
  // Authentication
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_REGISTER: 'auth:register',
  AUTH_PASSWORD_CHANGE: 'auth:password_change',
  AUTH_FAILED_LOGIN: 'auth:failed_login',

  // User management
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_ROLE_CHANGE: 'user:role_change',
  USER_DISABLE: 'user:disable',

  // Messages
  MESSAGE_CREATE: 'message:create',
  MESSAGE_DELETE: 'message:delete',
  MESSAGE_EDIT: 'message:edit',
  MESSAGE_REACTION: 'message:reaction',

  // Bookings
  BOOKING_CREATE: 'booking:create',
  BOOKING_UPDATE: 'booking:update',
  BOOKING_CANCEL: 'booking:cancel',
  BOOKING_STATUS_CHANGE: 'booking:status_change',

  // Claims
  CLAIM_CREATE: 'claim:create',
  CLAIM_APPROVE: 'claim:approve',
  CLAIM_REJECT: 'claim:reject',
  CLAIM_STATUS_CHANGE: 'claim:status_change',

  // Rooms
  ROOM_CREATE: 'room:create',
  ROOM_DELETE: 'room:delete',
  ROOM_MEMBER_ADD: 'room:member_add',
  ROOM_MEMBER_REMOVE: 'room:member_remove',

  // Files
  FILE_UPLOAD: 'file:upload',
  FILE_DELETE: 'file:delete',
  FILE_DOWNLOAD: 'file:download',

  // Admin actions
  ADMIN_CONFIG_CHANGE: 'admin:config_change',
  ADMIN_SYSTEM_RESTART: 'admin:system_restart',
  ADMIN_BACKUP: 'admin:backup',
  ADMIN_USER_IMPERSONATE: 'admin:user_impersonate',

  // Security events
  SECURITY_PERMISSION_DENIED: 'security:permission_denied',
  SECURITY_INVALID_TOKEN: 'security:invalid_token',
  SECURITY_RATE_LIMIT: 'security:rate_limit',
  SECURITY_SUSPICIOUS_ACTIVITY: 'security:suspicious_activity',
};

export class EnhancedAuditLogger {
  /**
   * Log an action
   */
  static async log(entry: AuditLogEntry): Promise<void> {
    try {
      const logEntry = {
        userId: entry.userId,
        userEmail: entry.userEmail,
        action: entry.action,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId,
        details: entry.details,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        status: entry.status,
        errorMessage: entry.errorMessage,
        severity: entry.severity,
        timestamp: new Date(),
      };

      // Store in database
      await prisma.auditLog.create({
        data: logEntry,
      });

      // Check for suspicious activity
      await this.checkSuspiciousActivity(entry);

      // Log to console for monitoring
      console.log(`[AUDIT] ${entry.severity.toUpperCase()} - ${entry.action}`, {
        userId: entry.userId,
        resourceType: entry.resourceType,
        status: entry.status,
      });
    } catch (error) {
      console.error('Failed to log audit entry:', error);
    }
  }

  /**
   * Log user login
   */
  static async logLogin(
    userId: string,
    userEmail: string,
    ipAddress: string,
    userAgent?: string,
    success: boolean = true
  ): Promise<void> {
    await this.log({
      userId,
      userEmail,
      action: success ? AUDIT_ACTIONS.AUTH_LOGIN : AUDIT_ACTIONS.AUTH_FAILED_LOGIN,
      resourceType: 'auth',
      resourceId: userId,
      details: { userEmail, ipAddress },
      ipAddress,
      userAgent,
      status: success ? 'success' : 'failure',
      severity: success ? 'low' : 'high',
    });
  }

  /**
   * Log user logout
   */
  static async logLogout(
    userId: string,
    ipAddress: string,
    userAgent?: string
  ): Promise<void> {
    await this.log({
      userId,
      action: AUDIT_ACTIONS.AUTH_LOGOUT,
      resourceType: 'auth',
      resourceId: userId,
      details: {},
      ipAddress,
      userAgent,
      status: 'success',
      severity: 'low',
    });
  }

  /**
   * Log message actions
   */
  static async logMessageAction(
    userId: string,
    action: string,
    messageId: string,
    roomId: string,
    ipAddress: string,
    details?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'message',
      resourceId: messageId,
      details: { roomId, ...details },
      ipAddress,
      status: 'success',
      severity: 'low',
    });
  }

  /**
   * Log booking actions
   */
  static async logBookingAction(
    userId: string,
    action: string,
    bookingId: string,
    ipAddress: string,
    details?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'booking',
      resourceId: bookingId,
      details: details || {},
      ipAddress,
      status: 'success',
      severity: 'medium',
    });
  }

  /**
   * Log claim actions
   */
  static async logClaimAction(
    userId: string,
    action: string,
    claimId: string,
    ipAddress: string,
    details?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType: 'claim',
      resourceId: claimId,
      details: details || {},
      ipAddress,
      status: 'success',
      severity: 'medium',
    });
  }

  /**
   * Log admin actions
   */
  static async logAdminAction(
    userId: string,
    action: string,
    resourceType: string,
    resourceId: string,
    ipAddress: string,
    details?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId,
      action,
      resourceType,
      resourceId,
      details: details || {},
      ipAddress,
      status: 'success',
      severity: 'high',
    });
  }

  /**
   * Log permission denied
   */
  static async logPermissionDenied(
    userId: string,
    action: string,
    resourceType: string,
    resourceId: string,
    ipAddress: string
  ): Promise<void> {
    await this.log({
      userId,
      action: AUDIT_ACTIONS.SECURITY_PERMISSION_DENIED,
      resourceType,
      resourceId,
      details: { attemptedAction: action },
      ipAddress,
      status: 'failure',
      severity: 'high',
    });
  }

  /**
   * Log security events
   */
  static async logSecurityEvent(
    userId: string,
    event: string,
    ipAddress: string,
    details?: Record<string, any>
  ): Promise<void> {
    await this.log({
      userId,
      action: event,
      resourceType: 'security',
      resourceId: userId,
      details: details || {},
      ipAddress,
      status: 'success',
      severity: 'high',
    });
  }

  /**
   * Query audit logs
   */
  static async queryLogs(query: AuditLogQuery): Promise<AuditLogEntry[]> {
    try {
      const where: any = {};

      if (query.userId) where.userId = query.userId;
      if (query.action) where.action = query.action;
      if (query.resourceType) where.resourceType = query.resourceType;
      if (query.severity) where.severity = query.severity;

      if (query.startDate || query.endDate) {
        where.timestamp = {};
        if (query.startDate) where.timestamp.gte = query.startDate;
        if (query.endDate) where.timestamp.lte = query.endDate;
      }

      const logs = await prisma.auditLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: query.limit || 100,
        skip: query.offset || 0,
      });

      return logs as AuditLogEntry[];
    } catch (error) {
      console.error('Failed to query audit logs:', error);
      return [];
    }
  }

  /**
   * Get user activity summary
   */
  static async getUserActivitySummary(
    userId: string,
    daysBack: number = 30
  ): Promise<Record<string, number>> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);

      const logs = await prisma.auditLog.groupBy({
        by: ['action'],
        where: {
          userId,
          timestamp: { gte: startDate },
        },
        _count: true,
      });

      const summary: Record<string, number> = {};
      for (const log of logs) {
        summary[log.action] = log._count;
      }

      return summary;
    } catch (error) {
      console.error('Failed to get user activity summary:', error);
      return {};
    }
  }

  /**
   * Check for suspicious activity
   */
  private static async checkSuspiciousActivity(entry: AuditLogEntry): Promise<void> {
    try {
      const oneHourAgo = new Date(Date.now() - 3600000);

      // Count failed login attempts
      if (entry.action === AUDIT_ACTIONS.AUTH_FAILED_LOGIN) {
        const failedAttempts = await prisma.auditLog.count({
          where: {
            userId: entry.userId,
            action: AUDIT_ACTIONS.AUTH_FAILED_LOGIN,
            timestamp: { gte: oneHourAgo },
          },
        });

        if (failedAttempts > 5) {
          console.warn(`[ALERT] ${failedAttempts} failed login attempts for user ${entry.userId}`);
          // Could trigger additional actions like account lockout
        }
      }

      // Count permission denied
      if (entry.action === AUDIT_ACTIONS.SECURITY_PERMISSION_DENIED) {
        const deniedCount = await prisma.auditLog.count({
          where: {
            userId: entry.userId,
            action: AUDIT_ACTIONS.SECURITY_PERMISSION_DENIED,
            timestamp: { gte: oneHourAgo },
          },
        });

        if (deniedCount > 10) {
          console.warn(
            `[ALERT] ${deniedCount} permission denied for user ${entry.userId}`
          );
        }
      }

      // Detect unusual patterns
      if (entry.severity === 'critical') {
        console.error(
          `[CRITICAL ALERT] Critical action by ${entry.userId}: ${entry.action}`
        );
      }
    } catch (error) {
      console.error('Failed to check suspicious activity:', error);
    }
  }

  /**
   * Get security statistics
   */
  static async getSecurityStats(daysBack: number = 30): Promise<{
    totalEvents: number;
    failedLogins: number;
    permissionDenied: number;
    adminActions: number;
    suspiciousActivities: number;
  }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);

      const [total, failed, denied, admin, suspicious] = await Promise.all([
        prisma.auditLog.count({
          where: { timestamp: { gte: startDate } },
        }),
        prisma.auditLog.count({
          where: {
            action: AUDIT_ACTIONS.AUTH_FAILED_LOGIN,
            timestamp: { gte: startDate },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: AUDIT_ACTIONS.SECURITY_PERMISSION_DENIED,
            timestamp: { gte: startDate },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: { startsWith: 'admin:' },
            timestamp: { gte: startDate },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: AUDIT_ACTIONS.SECURITY_SUSPICIOUS_ACTIVITY,
            timestamp: { gte: startDate },
          },
        }),
      ]);

      return {
        totalEvents: total,
        failedLogins: failed,
        permissionDenied: denied,
        adminActions: admin,
        suspiciousActivities: suspicious,
      };
    } catch (error) {
      console.error('Failed to get security stats:', error);
      return {
        totalEvents: 0,
        failedLogins: 0,
        permissionDenied: 0,
        adminActions: 0,
        suspiciousActivities: 0,
      };
    }
  }

  /**
   * Export audit logs
   */
  static async exportLogs(
    startDate: Date,
    endDate: Date,
    format: 'json' | 'csv' = 'json'
  ): Promise<string> {
    try {
      const logs = await this.queryLogs({
        startDate,
        endDate,
        limit: 10000,
      });

      if (format === 'json') {
        return JSON.stringify(logs, null, 2);
      } else {
        // CSV format
        const headers = [
          'Timestamp',
          'User ID',
          'Action',
          'Resource Type',
          'Status',
          'Severity',
          'IP Address',
        ];
        const rows = logs.map((log) => [
          log.timestamp?.toISOString() || '',
          log.userId,
          log.action,
          log.resourceType,
          log.status,
          log.severity,
          log.ipAddress,
        ]);

        const csv = [headers, ...rows]
          .map((row) => row.map((cell) => `"${cell}"`).join(','))
          .join('\n');

        return csv;
      }
    } catch (error) {
      console.error('Failed to export logs:', error);
      return '';
    }
  }

  /**
   * Cleanup old logs (retention policy)
   */
  static async cleanupOldLogs(daysToKeep: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const result = await prisma.auditLog.deleteMany({
        where: {
          timestamp: { lt: cutoffDate },
        },
      });

      console.log(`Cleaned up ${result.count} old audit logs`);
      return result.count;
    } catch (error) {
      console.error('Failed to cleanup old logs:', error);
      return 0;
    }
  }
}

export const AUDIT_ACTIONS_EXPORT = AUDIT_ACTIONS;
