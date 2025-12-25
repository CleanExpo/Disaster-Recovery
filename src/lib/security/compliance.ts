/**
 * Compliance & Data Privacy Service
 *
 * GDPR, CCPA, and compliance framework management
 */

import { EventEmitter } from 'events';

interface ConsentRecord {
  id: string;
  userId: string;
  consentType: string; // 'marketing', 'analytics', 'profiling'
  granted: boolean;
  timestamp: number;
  expiresAt?: number;
  metadata?: Record<string, any>;
}

interface DataRequest {
  id: string;
  userId: string;
  requestType: 'access' | 'deletion' | 'export' | 'rectification';
  status: 'pending' | 'in_progress' | 'completed' | 'denied';
  createdAt: number;
  completedAt?: number;
  reason?: string;
  data?: any;
}

interface DataDeletion {
  id: string;
  userId: string;
  deletionType: 'soft' | 'hard';
  scheduledFor?: number;
  completedAt?: number;
  reason: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

interface RetentionPolicy {
  id: string;
  dataType: string;
  retentionPeriodDays: number;
  deleteOnExpiry: boolean;
  archiveBeforeDeletion: boolean;
  exceptions?: string[]; // User IDs or roles
}

interface AuditTrail {
  id: string;
  timestamp: number;
  action: string;
  userId: string;
  resource: string;
  changes: {
    before?: any;
    after: any;
  };
  reason?: string;
}

export class ComplianceService extends EventEmitter {
  private consentRecords: Map<string, ConsentRecord[]> = new Map();
  private dataRequests: Map<string, DataRequest> = new Map();
  private deletions: Map<string, DataDeletion> = new Map();
  private retentionPolicies: Map<string, RetentionPolicy> = new Map();
  private auditTrail: AuditTrail[] = [];
  private maxAuditLogs = 1000000;

  constructor() {
    super();
    this.initializeDefaultPolicies();
  }

  /**
   * Initialize default retention policies
   */
  private initializeDefaultPolicies() {
    this.createRetentionPolicy('messages', 365, true, false);
    this.createRetentionPolicy('user_activity', 90, true, true);
    this.createRetentionPolicy('access_logs', 365, true, false);
    this.createRetentionPolicy('analytics', 24 * 30, true, true);
    this.createRetentionPolicy('deleted_accounts', 30, true, false);
  }

  /**
   * Record user consent
   */
  recordConsent(
    userId: string,
    consentType: string,
    granted: boolean,
    expiresAt?: number
  ): ConsentRecord {
    const record: ConsentRecord = {
      id: `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      consentType,
      granted,
      timestamp: Date.now(),
      expiresAt,
    };

    const userConsents = this.consentRecords.get(userId) || [];
    userConsents.push(record);
    this.consentRecords.set(userId, userConsents);

    this.emit('consent:recorded', record);
    return record;
  }

  /**
   * Get user consent status
   */
  getUserConsent(userId: string, consentType: string): ConsentRecord | null {
    const consents = this.consentRecords.get(userId) || [];
    const consent = consents
      .filter(c => c.consentType === consentType)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    if (!consent) return null;

    // Check expiry
    if (consent.expiresAt && Date.now() > consent.expiresAt) {
      return null;
    }

    return consent;
  }

  /**
   * Get all user consents
   */
  getUserConsents(userId: string): ConsentRecord[] {
    const consents = this.consentRecords.get(userId) || [];
    return consents.filter(c => !c.expiresAt || Date.now() <= c.expiresAt);
  }

  /**
   * Withdraw consent
   */
  withdrawConsent(userId: string, consentType: string): ConsentRecord {
    const record: ConsentRecord = {
      id: `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      consentType,
      granted: false,
      timestamp: Date.now(),
    };

    const userConsents = this.consentRecords.get(userId) || [];
    userConsents.push(record);
    this.consentRecords.set(userId, userConsents);

    this.emit('consent:withdrawn', record);
    return record;
  }

  /**
   * Create data request
   */
  createDataRequest(
    userId: string,
    requestType: 'access' | 'deletion' | 'export' | 'rectification'
  ): DataRequest {
    const id = `dreq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const request: DataRequest = {
      id,
      userId,
      requestType,
      status: 'pending',
      createdAt: Date.now(),
    };

    this.dataRequests.set(id, request);
    this.emit('data_request:created', request);

    // Auto-approve access requests after 30 days (GDPR requirement)
    setTimeout(() => {
      this.completeDataRequest(id, { access: 'all_user_data' });
    }, 30 * 24 * 60 * 60 * 1000);

    return request;
  }

  /**
   * Get data request
   */
  getDataRequest(requestId: string): DataRequest | null {
    return this.dataRequests.get(requestId) || null;
  }

  /**
   * Get user data requests
   */
  getUserDataRequests(userId: string): DataRequest[] {
    return Array.from(this.dataRequests.values()).filter(r => r.userId === userId);
  }

  /**
   * Complete data request
   */
  completeDataRequest(requestId: string, data?: any): DataRequest | null {
    const request = this.dataRequests.get(requestId);
    if (!request) return null;

    const completed = {
      ...request,
      status: 'completed' as const,
      completedAt: Date.now(),
      data,
    };

    this.dataRequests.set(requestId, completed);
    this.emit('data_request:completed', completed);
    return completed;
  }

  /**
   * Deny data request
   */
  denyDataRequest(requestId: string, reason: string): DataRequest | null {
    const request = this.dataRequests.get(requestId);
    if (!request) return null;

    const denied = {
      ...request,
      status: 'denied' as const,
      completedAt: Date.now(),
      reason,
    };

    this.dataRequests.set(requestId, denied);
    this.emit('data_request:denied', denied);
    return denied;
  }

  /**
   * Schedule user data deletion (right to be forgotten)
   */
  scheduleDataDeletion(userId: string, reason: string, delayDays: number = 30): DataDeletion {
    const id = `ddel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const deletion: DataDeletion = {
      id,
      userId,
      deletionType: 'soft',
      scheduledFor: Date.now() + delayDays * 24 * 60 * 60 * 1000,
      reason,
      status: 'scheduled',
    };

    this.deletions.set(id, deletion);
    this.emit('deletion:scheduled', deletion);

    // Auto-complete deletion after delay
    setTimeout(() => {
      const del = this.deletions.get(id);
      if (del) {
        del.status = 'completed';
        del.completedAt = Date.now();
        this.deletions.set(id, del);
        this.emit('deletion:completed', del);
      }
    }, delayDays * 24 * 60 * 60 * 1000);

    return deletion;
  }

  /**
   * Cancel scheduled deletion
   */
  cancelDataDeletion(deletionId: string): DataDeletion | null {
    const deletion = this.deletions.get(deletionId);
    if (!deletion || deletion.status !== 'scheduled') return null;

    deletion.status = 'in_progress'; // Mark as cancelled by changing status
    this.deletions.set(deletionId, deletion);
    this.emit('deletion:cancelled', deletion);
    return deletion;
  }

  /**
   * Get user deletions
   */
  getUserDeletions(userId: string): DataDeletion[] {
    return Array.from(this.deletions.values()).filter(d => d.userId === userId);
  }

  /**
   * Create retention policy
   */
  createRetentionPolicy(
    dataType: string,
    retentionPeriodDays: number,
    deleteOnExpiry: boolean,
    archiveBeforeDeletion: boolean,
    exceptions?: string[]
  ): RetentionPolicy {
    const id = `policy_${dataType}_${Date.now()}`;

    const policy: RetentionPolicy = {
      id,
      dataType,
      retentionPeriodDays,
      deleteOnExpiry,
      archiveBeforeDeletion,
      exceptions,
    };

    this.retentionPolicies.set(id, policy);
    this.emit('policy:created', policy);
    return policy;
  }

  /**
   * Get retention policy
   */
  getRetentionPolicy(dataType: string): RetentionPolicy | null {
    for (const policy of this.retentionPolicies.values()) {
      if (policy.dataType === dataType) {
        return policy;
      }
    }
    return null;
  }

  /**
   * Check if data should be deleted based on policy
   */
  shouldDeleteData(dataType: string, createdAt: number, userId?: string): boolean {
    const policy = this.getRetentionPolicy(dataType);
    if (!policy || !policy.deleteOnExpiry) return false;

    // Check exceptions
    if (userId && policy.exceptions?.includes(userId)) {
      return false;
    }

    const expiryTime = createdAt + policy.retentionPeriodDays * 24 * 60 * 60 * 1000;
    return Date.now() > expiryTime;
  }

  /**
   * Record audit trail entry
   */
  recordAudit(
    action: string,
    userId: string,
    resource: string,
    changes: { before?: any; after: any },
    reason?: string
  ): AuditTrail {
    const entry: AuditTrail = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      action,
      userId,
      resource,
      changes,
      reason,
    };

    this.auditTrail.push(entry);

    // Maintain log size
    if (this.auditTrail.length > this.maxAuditLogs) {
      this.auditTrail.shift();
    }

    this.emit('audit:recorded', entry);
    return entry;
  }

  /**
   * Get audit trail
   */
  getAuditTrail(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
  }): AuditTrail[] {
    let trail = [...this.auditTrail];

    if (filters?.userId) {
      trail = trail.filter(t => t.userId === filters.userId);
    }
    if (filters?.action) {
      trail = trail.filter(t => t.action === filters.action);
    }
    if (filters?.resource) {
      trail = trail.filter(t => t.resource === filters.resource);
    }
    if (filters?.startTime) {
      trail = trail.filter(t => t.timestamp >= filters.startTime!);
    }
    if (filters?.endTime) {
      trail = trail.filter(t => t.timestamp <= filters.endTime!);
    }

    const limit = filters?.limit || 100;
    return trail.slice(-limit);
  }

  /**
   * Generate compliance report
   */
  generateComplianceReport(userId?: string): {
    period: string;
    consents: ConsentRecord[];
    dataRequests: DataRequest[];
    deletions: DataDeletion[];
    auditEntries: AuditTrail[];
    compliance: {
      gdprCompliant: boolean;
      issues: string[];
    };
  } {
    const consents = userId
      ? this.getUserConsents(userId)
      : Array.from(this.consentRecords.values()).flat();

    const dataRequests = userId
      ? this.getUserDataRequests(userId)
      : Array.from(this.dataRequests.values());

    const deletions = userId
      ? this.getUserDeletions(userId)
      : Array.from(this.deletions.values());

    const auditEntries = this.getAuditTrail({
      userId,
      limit: 1000,
    });

    const issues: string[] = [];
    let gdprCompliant = true;

    // Check for missing consents
    if (consents.length === 0) {
      issues.push('No consent records found');
      gdprCompliant = false;
    }

    // Check for pending data requests beyond 30 days
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const pendingOld = dataRequests.filter(
      r => r.status === 'pending' && r.createdAt < thirtyDaysAgo
    );
    if (pendingOld.length > 0) {
      issues.push(`${pendingOld.length} data requests pending beyond 30 days`);
      gdprCompliant = false;
    }

    // Check for deletion requests not completed
    const pendingDeletions = deletions.filter(d => d.status !== 'completed');
    if (pendingDeletions.length > 0) {
      issues.push(`${pendingDeletions.length} pending deletion requests`);
    }

    return {
      period: new Date().toISOString().split('T')[0],
      consents,
      dataRequests,
      deletions,
      auditEntries,
      compliance: {
        gdprCompliant,
        issues,
      },
    };
  }

  /**
   * Export user data for portability (GDPR requirement)
   */
  exportUserData(userId: string): any {
    return {
      userId,
      exportedAt: new Date().toISOString(),
      consents: this.getUserConsents(userId),
      dataRequests: this.getUserDataRequests(userId),
      deletions: this.getUserDeletions(userId),
      auditTrail: this.getAuditTrail({ userId, limit: 1000 }),
    };
  }

  /**
   * Get compliance metrics
   */
  getComplianceMetrics(): {
    totalUsers: number;
    usersWithConsent: number;
    consentRate: number;
    pendingDataRequests: number;
    pendingDeletions: number;
    auditEntriesCount: number;
  } {
    const uniqueUsers = new Set(
      Array.from(this.consentRecords.keys()).concat(
        Array.from(this.dataRequests.values()).map(r => r.userId)
      )
    );

    const usersWithConsent = new Set(
      Array.from(this.consentRecords.values())
        .flat()
        .filter(c => c.granted)
        .map(c => c.userId)
    );

    const pendingDataRequests = Array.from(this.dataRequests.values()).filter(
      r => r.status === 'pending'
    ).length;

    const pendingDeletions = Array.from(this.deletions.values()).filter(
      d => d.status === 'scheduled' || d.status === 'in_progress'
    ).length;

    return {
      totalUsers: uniqueUsers.size,
      usersWithConsent: usersWithConsent.size,
      consentRate: uniqueUsers.size > 0
        ? (usersWithConsent.size / uniqueUsers.size) * 100
        : 0,
      pendingDataRequests,
      pendingDeletions,
      auditEntriesCount: this.auditTrail.length,
    };
  }
}

// Export singleton instance
export const complianceService = new ComplianceService();
