/**
 * Approval Workflow Service
 *
 * State machine for NRPG inspection report approval workflow
 * - State transitions: SCHEDULED → IN_PROGRESS → DATA_COLLECTION_COMPLETE → DRAFT_GENERATED → TECHNICAL_REVIEW → MANAGER_REVIEW → APPROVED → SENT_TO_CLIENT → SENT_TO_INSURER
 * - Validation gates at every transition
 * - Role-based permissions (INSPECTOR → TECHNICAL_REVIEWER → MANAGER → ADMIN)
 * - Revision path with version control
 */

import { AdvancedLogger } from '@/lib/logger/advanced-logging';

// ============================================================================
// TYPES
// ============================================================================

export enum ReportStatus {
  // Initial States
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  DATA_COLLECTION_COMPLETE = 'DATA_COLLECTION_COMPLETE',

  // Generation States
  DRAFT_GENERATED = 'DRAFT_GENERATED',

  // Review States
  TECHNICAL_REVIEW = 'TECHNICAL_REVIEW',
  MANAGER_REVIEW = 'MANAGER_REVIEW',

  // Approval States
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',

  // Distribution States
  SENT_TO_CLIENT = 'SENT_TO_CLIENT',
  SENT_TO_INSURER = 'SENT_TO_INSURER',

  // Terminal States
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',

  // Revision States
  REVISION_REQUESTED = 'REVISION_REQUESTED',
}

export enum UserRole {
  INSPECTOR = 'INSPECTOR',
  TECHNICAL_REVIEWER = 'TECHNICAL_REVIEWER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface WorkflowTransition {
  fromStatus: ReportStatus;
  toStatus: ReportStatus;
  allowedRoles: UserRole[];
  requiredValidations: ValidationCheck[];
  description: string;
}

export interface ValidationCheck {
  checkId: string;
  description: string;
  validator: (reportData: any) => Promise<ValidationResult>;
}

export interface ValidationResult {
  passed: boolean;
  errors?: string[];
  warnings?: string[];
  metadata?: Record<string, any>;
}

export interface WorkflowState {
  reportId: string;
  currentStatus: ReportStatus;
  previousStatus?: ReportStatus;
  version: number;
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
  history: WorkflowHistoryEntry[];
  validationResults?: Record<string, ValidationResult>;
}

export interface WorkflowHistoryEntry {
  timestamp: Date;
  fromStatus: ReportStatus;
  toStatus: ReportStatus;
  performedBy: string;
  role: UserRole;
  reason?: string;
  validationResults?: Record<string, ValidationResult>;
}

export interface TransitionRequest {
  reportId: string;
  toStatus: ReportStatus;
  performedBy: string;
  role: UserRole;
  reason?: string;
  reportData?: any;
  overrideValidation?: boolean; // Only ADMIN/SUPER_ADMIN
}

export interface TransitionResult {
  success: boolean;
  newStatus?: ReportStatus;
  validationResults?: Record<string, ValidationResult>;
  errors?: string[];
  warnings?: string[];
  metadata?: Record<string, any>;
}

// ============================================================================
// VALIDATION CHECKS
// ============================================================================

const VALIDATION_CHECKS: Record<string, ValidationCheck> = {
  // Data Collection Validations
  HAS_PROPERTY_ADDRESS: {
    checkId: 'HAS_PROPERTY_ADDRESS',
    description: 'Property address must be specified',
    validator: async (data) => {
      const passed = !!(
        data.property?.address &&
        data.property?.city &&
        data.property?.state &&
        data.property?.postcode
      );
      return {
        passed,
        errors: passed ? [] : ['Property address information is incomplete'],
      };
    },
  },

  HAS_CLIENT_INFO: {
    checkId: 'HAS_CLIENT_INFO',
    description: 'Client information must be complete',
    validator: async (data) => {
      const passed = !!(data.client?.name && data.client?.phone);
      return {
        passed,
        errors: passed ? [] : ['Client name and phone are required'],
      };
    },
  },

  HAS_DAMAGE_ASSESSMENT: {
    checkId: 'HAS_DAMAGE_ASSESSMENT',
    description: 'Damage assessment must be documented',
    validator: async (data) => {
      const passed = !!(
        data.damage?.type &&
        data.damage?.severity &&
        data.damage?.description
      );
      return {
        passed,
        errors: passed ? [] : ['Damage assessment is incomplete'],
      };
    },
  },

  HAS_MINIMUM_PHOTOS: {
    checkId: 'HAS_MINIMUM_PHOTOS',
    description: 'Minimum 3 photos required',
    validator: async (data) => {
      const photoCount = data.photos?.length || 0;
      const passed = photoCount >= 3;
      return {
        passed,
        errors: passed
          ? []
          : [`Only ${photoCount} photos provided, minimum 3 required`],
        warnings: photoCount >= 3 && photoCount < 5 ? ['Consider adding more photos for better documentation'] : [],
      };
    },
  },

  HAS_MOISTURE_READINGS: {
    checkId: 'HAS_MOISTURE_READINGS',
    description: 'Moisture readings required for water damage',
    validator: async (data) => {
      if (
        data.damage?.type !== 'WATER_DAMAGE' &&
        data.damage?.type !== 'MOULD_REMEDIATION'
      ) {
        return { passed: true }; // Not applicable
      }

      const hasMoistureReadings = data.damageAreas?.some(
        (area: any) => area.moistureReadings && area.moistureReadings.length > 0
      );

      return {
        passed: hasMoistureReadings || false,
        errors: hasMoistureReadings ? [] : ['Moisture readings required for water damage reports'],
      };
    },
  },

  // Draft Generation Validations
  HAS_COST_ESTIMATE: {
    checkId: 'HAS_COST_ESTIMATE',
    description: 'Cost estimate must be generated',
    validator: async (data) => {
      const passed = !!(
        data.costEstimate &&
        data.costEstimate.totals &&
        data.costEstimate.totals.totalIncludingGST > 0
      );
      return {
        passed,
        errors: passed ? [] : ['Cost estimate has not been generated'],
      };
    },
  },

  COST_WITHIN_RANGE: {
    checkId: 'COST_WITHIN_RANGE',
    description: 'Cost estimate within acceptable range (±15% historical average)',
    validator: async (data) => {
      // This would typically fetch historical averages from database
      // For now, we'll do basic sanity checks
      const total = data.costEstimate?.totals?.totalIncludingGST || 0;
      const passed = total > 100 && total < 500000; // Basic range check

      const warnings: string[] = [];
      if (total > 50000) {
        warnings.push('High-value estimate - ensure detailed justification');
      }

      return {
        passed,
        warnings,
        metadata: { estimatedTotal: total },
      };
    },
  },

  HAS_COMPLIANCE_CHECKS: {
    checkId: 'HAS_COMPLIANCE_CHECKS',
    description: 'Compliance checks must be performed',
    validator: async (data) => {
      const passed = !!(
        data.compliance?.jurisdictionRules &&
        data.compliance.jurisdictionRules.length > 0
      );
      return {
        passed,
        errors: passed ? [] : ['Compliance checks have not been performed'],
      };
    },
  },

  ALL_COMPLIANCE_PASSED: {
    checkId: 'ALL_COMPLIANCE_PASSED',
    description: 'All compliance checks must pass',
    validator: async (data) => {
      if (!data.compliance?.jurisdictionRules) {
        return { passed: false, errors: ['No compliance checks found'] };
      }

      const failedRules = data.compliance.jurisdictionRules.filter(
        (rule: any) => rule.status === 'NON_COMPLIANT'
      );

      const passed = failedRules.length === 0;

      return {
        passed,
        errors: passed
          ? []
          : [
              `${failedRules.length} compliance rule(s) failed`,
              ...failedRules.map((r: any) => `  - ${r.description}`),
            ],
      };
    },
  },

  // Technical Review Validations
  HAS_IICRC_STANDARDS: {
    checkId: 'HAS_IICRC_STANDARDS',
    description: 'Applicable IICRC standards must be identified',
    validator: async (data) => {
      const passed = !!(
        data.compliance?.iicrcStandards &&
        data.compliance.iicrcStandards.some((s: any) => s.applicable)
      );
      return {
        passed,
        errors: passed ? [] : ['No applicable IICRC standards identified'],
      };
    },
  },

  INSPECTOR_CERTIFIED: {
    checkId: 'INSPECTOR_CERTIFIED',
    description: 'Inspector must have appropriate certifications',
    validator: async (data) => {
      const certifications = data.inspectorCertifications || [];
      const damageType = data.damage?.type;

      // Check for required certifications based on damage type
      let requiredCert: string | null = null;
      if (
        damageType === 'WATER_DAMAGE' ||
        damageType === 'COMMERCIAL_WATER_DAMAGE'
      ) {
        requiredCert = 'WRT';
      } else if (
        damageType === 'MOULD_REMEDIATION' ||
        damageType === 'COMMERCIAL_MOULD'
      ) {
        requiredCert = 'AMRT';
      } else if (damageType === 'FIRE_DAMAGE' || damageType === 'SMOKE_DAMAGE') {
        requiredCert = 'FSRT';
      }

      if (!requiredCert) {
        return { passed: true }; // No specific certification required
      }

      const passed = certifications.some((c: string) => c.includes(requiredCert!));

      return {
        passed,
        errors: passed
          ? []
          : [`Inspector must have ${requiredCert} certification for ${damageType}`],
      };
    },
  },

  // Distribution Validations
  HAS_CLIENT_EMAIL: {
    checkId: 'HAS_CLIENT_EMAIL',
    description: 'Client email required for distribution',
    validator: async (data) => {
      const passed = !!(data.client?.email);
      return {
        passed,
        errors: passed ? [] : ['Client email address required for report distribution'],
      };
    },
  },

  HAS_INSURANCE_INFO: {
    checkId: 'HAS_INSURANCE_INFO',
    description: 'Insurance information required for insurance distribution',
    validator: async (data) => {
      const passed = !!(
        data.client?.insuranceProvider && data.client?.claimNumber
      );
      return {
        passed,
        errors: passed
          ? []
          : ['Insurance provider and claim number required for insurance distribution'],
        warnings: [],
      };
    },
  },
};

// ============================================================================
// WORKFLOW TRANSITIONS
// ============================================================================

const WORKFLOW_TRANSITIONS: WorkflowTransition[] = [
  // SCHEDULED → IN_PROGRESS
  {
    fromStatus: ReportStatus.SCHEDULED,
    toStatus: ReportStatus.IN_PROGRESS,
    allowedRoles: [UserRole.INSPECTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [
      VALIDATION_CHECKS.HAS_PROPERTY_ADDRESS,
      VALIDATION_CHECKS.HAS_CLIENT_INFO,
    ],
    description: 'Inspector begins on-site inspection',
  },

  // IN_PROGRESS → DATA_COLLECTION_COMPLETE
  {
    fromStatus: ReportStatus.IN_PROGRESS,
    toStatus: ReportStatus.DATA_COLLECTION_COMPLETE,
    allowedRoles: [UserRole.INSPECTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [
      VALIDATION_CHECKS.HAS_DAMAGE_ASSESSMENT,
      VALIDATION_CHECKS.HAS_MINIMUM_PHOTOS,
      VALIDATION_CHECKS.HAS_MOISTURE_READINGS,
    ],
    description: 'Inspector completes on-site data collection',
  },

  // DATA_COLLECTION_COMPLETE → DRAFT_GENERATED
  {
    fromStatus: ReportStatus.DATA_COLLECTION_COMPLETE,
    toStatus: ReportStatus.DRAFT_GENERATED,
    allowedRoles: [UserRole.INSPECTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [
      VALIDATION_CHECKS.HAS_COST_ESTIMATE,
      VALIDATION_CHECKS.COST_WITHIN_RANGE,
      VALIDATION_CHECKS.HAS_COMPLIANCE_CHECKS,
    ],
    description: 'Report draft generated with cost estimate',
  },

  // DRAFT_GENERATED → TECHNICAL_REVIEW
  {
    fromStatus: ReportStatus.DRAFT_GENERATED,
    toStatus: ReportStatus.TECHNICAL_REVIEW,
    allowedRoles: [UserRole.INSPECTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [
      VALIDATION_CHECKS.ALL_COMPLIANCE_PASSED,
      VALIDATION_CHECKS.HAS_IICRC_STANDARDS,
      VALIDATION_CHECKS.INSPECTOR_CERTIFIED,
    ],
    description: 'Submit for technical review',
  },

  // TECHNICAL_REVIEW → MANAGER_REVIEW
  {
    fromStatus: ReportStatus.TECHNICAL_REVIEW,
    toStatus: ReportStatus.MANAGER_REVIEW,
    allowedRoles: [
      UserRole.TECHNICAL_REVIEWER,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ],
    requiredValidations: [],
    description: 'Technical reviewer approves, forward to manager',
  },

  // TECHNICAL_REVIEW → REVISION_REQUESTED
  {
    fromStatus: ReportStatus.TECHNICAL_REVIEW,
    toStatus: ReportStatus.REVISION_REQUESTED,
    allowedRoles: [
      UserRole.TECHNICAL_REVIEWER,
      UserRole.MANAGER,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ],
    requiredValidations: [],
    description: 'Technical reviewer requests revisions',
  },

  // MANAGER_REVIEW → APPROVED
  {
    fromStatus: ReportStatus.MANAGER_REVIEW,
    toStatus: ReportStatus.APPROVED,
    allowedRoles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [],
    description: 'Manager approves report',
  },

  // MANAGER_REVIEW → REVISION_REQUESTED
  {
    fromStatus: ReportStatus.MANAGER_REVIEW,
    toStatus: ReportStatus.REVISION_REQUESTED,
    allowedRoles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [],
    description: 'Manager requests revisions',
  },

  // REVISION_REQUESTED → IN_PROGRESS
  {
    fromStatus: ReportStatus.REVISION_REQUESTED,
    toStatus: ReportStatus.IN_PROGRESS,
    allowedRoles: [UserRole.INSPECTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [],
    description: 'Inspector begins revisions',
  },

  // APPROVED → SENT_TO_CLIENT
  {
    fromStatus: ReportStatus.APPROVED,
    toStatus: ReportStatus.SENT_TO_CLIENT,
    allowedRoles: [
      UserRole.INSPECTOR,
      UserRole.MANAGER,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ],
    requiredValidations: [VALIDATION_CHECKS.HAS_CLIENT_EMAIL],
    description: 'Send report to client',
  },

  // SENT_TO_CLIENT → SENT_TO_INSURER
  {
    fromStatus: ReportStatus.SENT_TO_CLIENT,
    toStatus: ReportStatus.SENT_TO_INSURER,
    allowedRoles: [
      UserRole.INSPECTOR,
      UserRole.MANAGER,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ],
    requiredValidations: [VALIDATION_CHECKS.HAS_INSURANCE_INFO],
    description: 'Send report to insurance company',
  },

  // SENT_TO_INSURER → COMPLETED
  {
    fromStatus: ReportStatus.SENT_TO_INSURER,
    toStatus: ReportStatus.COMPLETED,
    allowedRoles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [],
    description: 'Mark report as completed',
  },

  // ANY → CANCELLED (Admin override)
  {
    fromStatus: ReportStatus.SCHEDULED, // Placeholder - handled specially
    toStatus: ReportStatus.CANCELLED,
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    requiredValidations: [],
    description: 'Cancel report (admin override)',
  },
];

// ============================================================================
// APPROVAL WORKFLOW SERVICE
// ============================================================================

export class ApprovalWorkflowService {
  /**
   * Get valid transitions from current status
   */
  static getValidTransitions(
    currentStatus: ReportStatus,
    userRole: UserRole
  ): WorkflowTransition[] {
    const correlationId = AdvancedLogger.setCorrelationId();

    const transitions = WORKFLOW_TRANSITIONS.filter(
      (t) =>
        (t.fromStatus === currentStatus || t.toStatus === ReportStatus.CANCELLED) &&
        t.allowedRoles.includes(userRole)
    );

    AdvancedLogger.debug('Valid transitions retrieved', {
      currentStatus,
      userRole,
      transitionCount: transitions.length,
    });

    return transitions;
  }

  /**
   * Check if transition is allowed
   */
  static isTransitionAllowed(
    fromStatus: ReportStatus,
    toStatus: ReportStatus,
    userRole: UserRole
  ): boolean {
    const transition = WORKFLOW_TRANSITIONS.find(
      (t) =>
        t.fromStatus === fromStatus &&
        t.toStatus === toStatus &&
        t.allowedRoles.includes(userRole)
    );

    // Special case: CANCELLED allowed from any status for ADMIN/SUPER_ADMIN
    if (
      toStatus === ReportStatus.CANCELLED &&
      (userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN)
    ) {
      return true;
    }

    return !!transition;
  }

  /**
   * Run validations for transition
   */
  static async runValidations(
    fromStatus: ReportStatus,
    toStatus: ReportStatus,
    reportData: any
  ): Promise<Record<string, ValidationResult>> {
    const correlationId = AdvancedLogger.setCorrelationId();

    const transition = WORKFLOW_TRANSITIONS.find(
      (t) => t.fromStatus === fromStatus && t.toStatus === toStatus
    );

    if (!transition) {
      AdvancedLogger.warn('No transition found for validation', {
        fromStatus,
        toStatus,
      });
      return {};
    }

    AdvancedLogger.info('Running validations', {
      fromStatus,
      toStatus,
      validationCount: transition.requiredValidations.length,
    });

    const results: Record<string, ValidationResult> = {};

    for (const validation of transition.requiredValidations) {
      try {
        const result = await validation.validator(reportData);
        results[validation.checkId] = result;

        AdvancedLogger.debug('Validation completed', {
          checkId: validation.checkId,
          passed: result.passed,
        });

        if (!result.passed) {
          AdvancedLogger.warn('Validation failed', {
            checkId: validation.checkId,
            errors: result.errors,
          });
        }
      } catch (error: any) {
        AdvancedLogger.error('Validation error', error, {
          checkId: validation.checkId,
        });

        results[validation.checkId] = {
          passed: false,
          errors: [`Validation error: ${error.message}`],
        };
      }
    }

    return results;
  }

  /**
   * Attempt workflow transition
   */
  static async transition(
    request: TransitionRequest
  ): Promise<TransitionResult> {
    const correlationId = AdvancedLogger.setCorrelationId();
    const startTime = Date.now();

    AdvancedLogger.info('Attempting workflow transition', {
      reportId: request.reportId,
      toStatus: request.toStatus,
      performedBy: request.performedBy,
      role: request.role,
    });

    // Get current workflow state (this would typically come from database)
    const currentStatus = request.reportData?.currentStatus || ReportStatus.SCHEDULED;

    // Check if transition is allowed
    if (!this.isTransitionAllowed(currentStatus, request.toStatus, request.role)) {
      AdvancedLogger.warn('Transition not allowed', {
        fromStatus: currentStatus,
        toStatus: request.toStatus,
        role: request.role,
      });

      return {
        success: false,
        errors: [
          `Transition from ${currentStatus} to ${request.toStatus} not allowed for role ${request.role}`,
        ],
      };
    }

    // Run validations (unless override)
    let validationResults: Record<string, ValidationResult> = {};

    if (
      !request.overrideValidation ||
      (request.role !== UserRole.ADMIN && request.role !== UserRole.SUPER_ADMIN)
    ) {
      validationResults = await this.runValidations(
        currentStatus,
        request.toStatus,
        request.reportData
      );

      // Check if all validations passed
      const failedValidations = Object.entries(validationResults).filter(
        ([_, result]) => !result.passed
      );

      if (failedValidations.length > 0) {
        const errors = failedValidations.flatMap(
          ([checkId, result]) => result.errors || []
        );

        AdvancedLogger.warn('Validation(s) failed, transition blocked', {
          fromStatus: currentStatus,
          toStatus: request.toStatus,
          failedCount: failedValidations.length,
          errors,
        });

        return {
          success: false,
          validationResults,
          errors,
        };
      }
    } else {
      AdvancedLogger.warn('Validation override used', {
        performedBy: request.performedBy,
        role: request.role,
      });
    }

    // All validations passed - perform transition
    const duration = Date.now() - startTime;

    AdvancedLogger.info('Workflow transition successful', {
      reportId: request.reportId,
      fromStatus: currentStatus,
      toStatus: request.toStatus,
      duration,
    });

    return {
      success: true,
      newStatus: request.toStatus,
      validationResults,
      warnings: Object.values(validationResults).flatMap(
        (r) => r.warnings || []
      ),
    };
  }

  /**
   * Get workflow history for report
   */
  static getWorkflowHistory(workflowState: WorkflowState): WorkflowHistoryEntry[] {
    return workflowState.history || [];
  }

  /**
   * Get current workflow status
   */
  static getCurrentStatus(workflowState: WorkflowState): ReportStatus {
    return workflowState.currentStatus;
  }

  /**
   * Check if report is in terminal state
   */
  static isTerminalState(status: ReportStatus): boolean {
    return [
      ReportStatus.COMPLETED,
      ReportStatus.CANCELLED,
      ReportStatus.REJECTED,
    ].includes(status);
  }

  /**
   * Get required role for status
   */
  static getRequiredRoleForStatus(status: ReportStatus): UserRole[] {
    const roles = new Set<UserRole>();

    WORKFLOW_TRANSITIONS.filter((t) => t.toStatus === status).forEach((t) => {
      t.allowedRoles.forEach((role) => roles.add(role));
    });

    return Array.from(roles);
  }

  /**
   * Format workflow state for display
   */
  static formatWorkflowState(workflowState: WorkflowState): string {
    const lines = [
      `Report ID: ${workflowState.reportId}`,
      `Current Status: ${workflowState.currentStatus}`,
      `Version: ${workflowState.version}`,
      `Last Updated: ${workflowState.lastUpdatedAt.toISOString()}`,
      `Last Updated By: ${workflowState.lastUpdatedBy}`,
      '',
      'History:',
    ];

    workflowState.history.forEach((entry, index) => {
      lines.push(
        `  ${index + 1}. ${entry.fromStatus} → ${entry.toStatus} (${entry.performedBy} - ${entry.role}) at ${entry.timestamp.toISOString()}`
      );
      if (entry.reason) {
        lines.push(`     Reason: ${entry.reason}`);
      }
    });

    return lines.join('\n');
  }
}
