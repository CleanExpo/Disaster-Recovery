/**
 * NRPG Inspection Report Service - Main Orchestrator
 *
 * Coordinates all subsystems for inspection report generation:
 * - Cost Estimation (via pricing database)
 * - Jurisdiction Rules Engine
 * - IICRC Standards Validation
 * - PDF Generation
 * - Approval Workflow
 *
 * Dependencies: All subsystems created by parallel agent
 */

import { PrismaClient, InspectionStatus, AustralianState, DamageCategory, IICRCStandard } from '@prisma/client';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';
import { CostEstimationService } from './cost-estimation.service';
import { JurisdictionRulesEngine } from './jurisdiction-rules.service';
import { IICRCStandardsService } from './iicrc-standards.service';
import { PDFGenerationService } from './pdf-generation.service';
import { ApprovalWorkflowService } from './approval-workflow.service';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface CreateInspectionReportParams {
  bookingId: string;
  propertyId?: string;
  inspectorId: string;
  inspectionDate: Date;
  jurisdiction: AustralianState;
  insuranceClaimId?: string;
  scopeOfWork: string;
  executiveSummary?: string;
}

interface DamageAreaData {
  areaName: string;
  floor: string;
  roomType: string;
  damageCategory: DamageCategory;
  affectedArea: number; // square meters
  affectedMaterials: string[];
  initialMoistureLevel?: number;
  targetMoistureLevel?: number;
  description: string;
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Critical';
  requiredActions: string[];
  equipmentNeeded: string[];
  estimatedDryingTime?: number; // hours
}

interface MoistureReadingData {
  readingDate: Date;
  location: string;
  material: string;
  moistureContent: number;
  ambientTemperature?: number;
  ambientHumidity?: number;
  meterType: string;
  readingDepth?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
}

interface InspectionPhotoData {
  photoUrl: string;
  thumbnailUrl?: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  photoType: 'BEFORE' | 'DURING' | 'AFTER' | 'EQUIPMENT' | 'DAMAGE_DETAIL';
  caption: string;
  description?: string;
  capturedAt: Date;
  gpsLatitude?: number;
  gpsLongitude?: number;
  deviceModel?: string;
  sortOrder?: number;
  damageAreaId?: string;
}

interface StatusTransitionParams {
  reportId: string;
  newStatus: InspectionStatus;
  userId: string;
  userRole: 'INSPECTOR' | 'TECHNICAL_REVIEWER' | 'MANAGER' | 'FINAL_APPROVER';
  notes?: string;
}

// ============================================================================
// INSPECTION REPORT SERVICE
// ============================================================================

export class InspectionReportService {
  private prisma: PrismaClient;
  private logger: AdvancedLogger;
  private costEstimationService: CostEstimationService;
  private jurisdictionRulesEngine: JurisdictionRulesEngine;
  private iicrcStandardsService: IICRCStandardsService;
  private pdfGenerationService: PDFGenerationService;
  private approvalWorkflowService: ApprovalWorkflowService;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = new AdvancedLogger({
      service: 'InspectionReportService',
      environment: process.env.NODE_ENV || 'development',
    });

    // Initialize subsystems
    this.costEstimationService = new CostEstimationService();
    this.jurisdictionRulesEngine = new JurisdictionRulesEngine();
    this.iicrcStandardsService = new IICRCStandardsService();
    this.pdfGenerationService = new PDFGenerationService();
    this.approvalWorkflowService = new ApprovalWorkflowService();
  }

  // ============================================================================
  // REPORT CREATION & MANAGEMENT
  // ============================================================================

  /**
   * Create a new inspection report with auto-generated report number
   * Format: NRPG-{YEAR}-{0001}
   */
  async createInspectionReport(params: CreateInspectionReportParams) {
    this.logger.info('Creating new inspection report', { params });

    try {
      // Validate booking exists
      const booking = await this.prisma.booking.findUnique({
        where: { id: params.bookingId },
        include: { client: true },
      });

      if (!booking) {
        throw new Error(`Booking not found: ${params.bookingId}`);
      }

      // Validate inspector exists and has proper role
      const inspector = await this.prisma.user.findUnique({
        where: { id: params.inspectorId },
      });

      if (!inspector) {
        throw new Error(`Inspector not found: ${params.inspectorId}`);
      }

      // Generate report number
      const reportNumber = await this.generateReportNumber();

      // Determine applicable IICRC standards based on service type
      const iicrcStandards = await this.iicrcStandardsService.determineApplicableStandards(
        booking.australianServiceType
      );

      // Get jurisdiction codes
      const jurisdictionCodes = await this.jurisdictionRulesEngine.getApplicableCodes(
        params.jurisdiction
      );

      // Create inspection report
      const report = await this.prisma.inspectionReport.create({
        data: {
          reportNumber,
          bookingId: params.bookingId,
          insuranceClaimId: params.insuranceClaimId,
          inspectionDate: params.inspectionDate,
          inspectorId: params.inspectorId,
          jurisdiction: params.jurisdiction,
          applicableCodes: jurisdictionCodes,
          iicrcStandards,
          status: InspectionStatus.SCHEDULED,
          isDraft: true,
          version: 1,
          executiveSummary: params.executiveSummary,
          scopeOfWork: params.scopeOfWork,
          findings: '', // To be filled during inspection
          recommendations: '', // To be filled during inspection
          createdBy: params.inspectorId,
        },
        include: {
          booking: true,
          inspector: true,
          insuranceClaim: true,
        },
      });

      this.logger.info('Inspection report created successfully', {
        reportId: report.id,
        reportNumber: report.reportNumber,
      });

      // Create audit log
      await this.createAuditLog({
        action: 'CREATE',
        entityType: 'InspectionReport',
        entityId: report.id,
        performedBy: params.inspectorId,
        newValues: report,
      });

      return report;
    } catch (error) {
      this.logger.error('Failed to create inspection report', {
        error: error instanceof Error ? error.message : 'Unknown error',
        params,
      });
      throw error;
    }
  }

  /**
   * Generate unique report number: NRPG-{YEAR}-{0001}
   * Auto-increments per year
   */
  private async generateReportNumber(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const yearPrefix = `NRPG-${currentYear}-`;

    // Get the last report number for this year
    const lastReport = await this.prisma.inspectionReport.findFirst({
      where: {
        reportNumber: {
          startsWith: yearPrefix,
        },
      },
      orderBy: {
        reportNumber: 'desc',
      },
    });

    let sequence = 1;
    if (lastReport) {
      // Extract sequence number from last report
      const lastSequence = parseInt(lastReport.reportNumber.split('-')[2], 10);
      sequence = lastSequence + 1;
    }

    // Format sequence with leading zeros (0001, 0002, etc.)
    const sequenceStr = sequence.toString().padStart(4, '0');
    return `${yearPrefix}${sequenceStr}`;
  }

  // ============================================================================
  // DAMAGE ASSESSMENT
  // ============================================================================

  /**
   * Add damage area to inspection report
   * Validates report is IN_PROGRESS
   */
  async addDamageArea(reportId: string, data: DamageAreaData) {
    this.logger.info('Adding damage area to report', { reportId, data });

    try {
      // Validate report exists and is in correct status
      const report = await this.prisma.inspectionReport.findUnique({
        where: { id: reportId },
      });

      if (!report) {
        throw new Error(`Inspection report not found: ${reportId}`);
      }

      if (report.status !== InspectionStatus.IN_PROGRESS && report.status !== InspectionStatus.SCHEDULED) {
        throw new Error(
          `Cannot add damage area to report in status: ${report.status}. Must be IN_PROGRESS or SCHEDULED.`
        );
      }

      // Create damage area
      const damageArea = await this.prisma.damageArea.create({
        data: {
          reportId,
          ...data,
        },
      });

      this.logger.info('Damage area added successfully', {
        damageAreaId: damageArea.id,
        reportId,
      });

      return damageArea;
    } catch (error) {
      this.logger.error('Failed to add damage area', {
        error: error instanceof Error ? error.message : 'Unknown error',
        reportId,
        data,
      });
      throw error;
    }
  }

  /**
   * Add moisture reading to inspection report
   */
  async addMoistureReading(reportId: string, data: MoistureReadingData) {
    this.logger.info('Adding moisture reading to report', { reportId, data });

    try {
      // Validate report exists
      const report = await this.prisma.inspectionReport.findUnique({
        where: { id: reportId },
      });

      if (!report) {
        throw new Error(`Inspection report not found: ${reportId}`);
      }

      if (report.status !== InspectionStatus.IN_PROGRESS && report.status !== InspectionStatus.SCHEDULED) {
        throw new Error(
          `Cannot add moisture reading to report in status: ${report.status}. Must be IN_PROGRESS or SCHEDULED.`
        );
      }

      // Create moisture reading
      const reading = await this.prisma.moistureReading.create({
        data: {
          reportId,
          ...data,
        },
      });

      this.logger.info('Moisture reading added successfully', {
        readingId: reading.id,
        reportId,
      });

      return reading;
    } catch (error) {
      this.logger.error('Failed to add moisture reading', {
        error: error instanceof Error ? error.message : 'Unknown error',
        reportId,
        data,
      });
      throw error;
    }
  }

  /**
   * Add inspection photo to report
   */
  async addPhoto(reportId: string, data: InspectionPhotoData) {
    this.logger.info('Adding photo to report', { reportId, data });

    try {
      // Validate report exists
      const report = await this.prisma.inspectionReport.findUnique({
        where: { id: reportId },
      });

      if (!report) {
        throw new Error(`Inspection report not found: ${reportId}`);
      }

      // Validate damage area if specified
      if (data.damageAreaId) {
        const damageArea = await this.prisma.damageArea.findUnique({
          where: { id: data.damageAreaId },
        });

        if (!damageArea || damageArea.reportId !== reportId) {
          throw new Error(`Invalid damage area ID: ${data.damageAreaId}`);
        }
      }

      // Create photo record
      const photo = await this.prisma.inspectionPhoto.create({
        data: {
          reportId,
          ...data,
          sortOrder: data.sortOrder || 0,
        },
      });

      this.logger.info('Photo added successfully', {
        photoId: photo.id,
        reportId,
      });

      return photo;
    } catch (error) {
      this.logger.error('Failed to add photo', {
        error: error instanceof Error ? error.message : 'Unknown error',
        reportId,
        data,
      });
      throw error;
    }
  }

  // ============================================================================
  // COST ESTIMATION
  // ============================================================================

  /**
   * Generate cost estimate for inspection report
   * - Determines applicable IICRC standards
   * - Calculates labor, material, equipment costs
   * - Creates line items with jurisdiction-specific pricing
   */
  async generateCostEstimate(reportId: string) {
    this.logger.info('Generating cost estimate for report', { reportId });

    try {
      // Get report with all damage areas
      const report = await this.prisma.inspectionReport.findUnique({
        where: { id: reportId },
        include: {
          damageAreas: true,
          booking: true,
        },
      });

      if (!report) {
        throw new Error(`Inspection report not found: ${reportId}`);
      }

      if (report.damageAreas.length === 0) {
        throw new Error('Cannot generate cost estimate: No damage areas defined');
      }

      // Validate IICRC standards are determined
      if (!report.iicrcStandards || report.iicrcStandards.length === 0) {
        this.logger.warn('No IICRC standards defined, determining now', { reportId });
        const standards = await this.iicrcStandardsService.determineApplicableStandards(
          report.booking.australianServiceType
        );

        await this.prisma.inspectionReport.update({
          where: { id: reportId },
          data: { iicrcStandards: standards },
        });
      }

      // Generate cost estimate using CostEstimationService
      const costEstimate = await this.costEstimationService.generateEstimate({
        reportId,
        jurisdiction: report.jurisdiction,
        damageAreas: report.damageAreas,
        iicrcStandards: report.iicrcStandards as IICRCStandard[],
      });

      this.logger.info('Cost estimate generated successfully', {
        reportId,
        totalCost: costEstimate.totalCost,
      });

      return costEstimate;
    } catch (error) {
      this.logger.error('Failed to generate cost estimate', {
        error: error instanceof Error ? error.message : 'Unknown error',
        reportId,
      });
      throw error;
    }
  }

  // ============================================================================
  // COMPLIANCE VALIDATION
  // ============================================================================

  /**
   * Run compliance validation for jurisdiction rules
   * Creates ComplianceCheck records
   */
  async runComplianceValidation(reportId: string) {
    this.logger.info('Running compliance validation', { reportId });

    try {
      // Get report details
      const report = await this.prisma.inspectionReport.findUnique({
        where: { id: reportId },
        include: {
          damageAreas: true,
          costEstimate: true,
        },
      });

      if (!report) {
        throw new Error(`Inspection report not found: ${reportId}`);
      }

      // Run jurisdiction rules validation
      const complianceChecks = await this.jurisdictionRulesEngine.validateCompliance({
        reportId,
        jurisdiction: report.jurisdiction,
        damageAreas: report.damageAreas,
        iicrcStandards: report.iicrcStandards as IICRCStandard[],
      });

      // Create compliance check records
      const createdChecks = await Promise.all(
        complianceChecks.map((check) =>
          this.prisma.complianceCheck.create({
            data: {
              reportId,
              checkName: check.checkName,
              checkCode: check.checkCode,
              jurisdiction: report.jurisdiction,
              status: check.status,
              required: check.required,
              evidence: check.evidence,
              referenceSection: check.referenceSection,
            },
          })
        )
      );

      // Determine overall compliance status
      const hasFailures = createdChecks.some((check) => check.status === 'FAIL');
      const requiresReview = createdChecks.some((check) => check.status === 'REQUIRES_REVIEW');

      let complianceStatus = 'COMPLIANT';
      if (hasFailures) {
        complianceStatus = 'NON_COMPLIANT';
      } else if (requiresReview) {
        complianceStatus = 'REQUIRES_REVIEW';
      }

      // Update report compliance status
      await this.prisma.inspectionReport.update({
        where: { id: reportId },
        data: { complianceStatus },
      });

      this.logger.info('Compliance validation completed', {
        reportId,
        complianceStatus,
        totalChecks: createdChecks.length,
      });

      return {
        complianceStatus,
        checks: createdChecks,
      };
    } catch (error) {
      this.logger.error('Failed to run compliance validation', {
        error: error instanceof Error ? error.message : 'Unknown error',
        reportId,
      });
      throw error;
    }
  }

  // ============================================================================
  // PDF GENERATION
  // ============================================================================

  /**
   * Generate PDF report
   * - Uploads to cloud storage
   * - Updates pdfUrl in database
   */
  async generatePDF(
    reportId: string,
    templateType: 'STANDARD' | 'INSURANCE' | 'TECHNICAL' = 'STANDARD'
  ) {
    this.logger.info('Generating PDF report', { reportId, templateType });

    try {
      // Get complete report data
      const report = await this.prisma.inspectionReport.findUnique({
        where: { id: reportId },
        include: {
          booking: {
            include: {
              client: true,
            },
          },
          inspector: true,
          insuranceClaim: {
            include: {
              insuranceProvider: true,
            },
          },
          damageAreas: {
            include: {
              photos: true,
            },
          },
          moistureReadings: true,
          photos: true,
          costEstimate: {
            include: {
              laborLineItems: true,
              materialLineItems: true,
              equipmentLineItems: true,
            },
          },
          complianceChecks: true,
        },
      });

      if (!report) {
        throw new Error(`Inspection report not found: ${reportId}`);
      }

      // Generate PDF using PDFGenerationService
      const { pdfUrl, pdfBuffer } = await this.pdfGenerationService.generateReport({
        report,
        templateType,
      });

      // Update report with PDF URL
      const updatedReport = await this.prisma.inspectionReport.update({
        where: { id: reportId },
        data: {
          pdfUrl,
          pdfGeneratedAt: new Date(),
          pdfVersion: report.pdfVersion + 1,
        },
      });

      this.logger.info('PDF generated successfully', {
        reportId,
        pdfUrl,
        pdfVersion: updatedReport.pdfVersion,
      });

      return {
        report: updatedReport,
        pdfUrl,
        pdfBuffer,
      };
    } catch (error) {
      this.logger.error('Failed to generate PDF', {
        error: error instanceof Error ? error.message : 'Unknown error',
        reportId,
        templateType,
      });
      throw error;
    }
  }

  // ============================================================================
  // WORKFLOW & STATUS TRANSITIONS
  // ============================================================================

  /**
   * Transition report status through approval workflow
   * Delegates to ApprovalWorkflowService
   */
  async transitionStatus(params: StatusTransitionParams) {
    this.logger.info('Transitioning report status', { params });

    try {
      // Delegate to approval workflow service
      const result = await this.approvalWorkflowService.transitionStatus({
        reportId: params.reportId,
        newStatus: params.newStatus,
        userId: params.userId,
        userRole: params.userRole,
        notes: params.notes,
      });

      this.logger.info('Status transition completed', {
        reportId: params.reportId,
        oldStatus: result.oldStatus,
        newStatus: result.newStatus,
      });

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        entityType: 'InspectionReport',
        entityId: params.reportId,
        performedBy: params.userId,
        oldValues: { status: result.oldStatus },
        newValues: { status: result.newStatus },
      });

      return result;
    } catch (error) {
      this.logger.error('Failed to transition status', {
        error: error instanceof Error ? error.message : 'Unknown error',
        params,
      });
      throw error;
    }
  }

  // ============================================================================
  // QUERY & RETRIEVAL
  // ============================================================================

  /**
   * Get inspection report by ID with full details
   */
  async getReportById(reportId: string) {
    return this.prisma.inspectionReport.findUnique({
      where: { id: reportId },
      include: {
        booking: {
          include: {
            client: true,
          },
        },
        inspector: true,
        insuranceClaim: {
          include: {
            insuranceProvider: true,
          },
        },
        damageAreas: {
          include: {
            photos: true,
          },
        },
        moistureReadings: true,
        photos: true,
        costEstimate: {
          include: {
            laborLineItems: true,
            materialLineItems: true,
            equipmentLineItems: true,
          },
        },
        complianceChecks: true,
        technicalReviewer: true,
        managerReviewer: true,
        finalApprover: true,
        revisions: true,
      },
    });
  }

  /**
   * Get reports by booking ID
   */
  async getReportsByBooking(bookingId: string) {
    return this.prisma.inspectionReport.findMany({
      where: { bookingId },
      include: {
        inspector: true,
        costEstimate: true,
      },
      orderBy: {
        inspectionDate: 'desc',
      },
    });
  }

  /**
   * Get reports by status
   */
  async getReportsByStatus(status: InspectionStatus, limit = 50) {
    return this.prisma.inspectionReport.findMany({
      where: { status },
      include: {
        booking: {
          include: {
            client: true,
          },
        },
        inspector: true,
      },
      orderBy: {
        inspectionDate: 'desc',
      },
      take: limit,
    });
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Create audit log entry
   */
  private async createAuditLog(data: {
    action: string;
    entityType: string;
    entityId: string;
    performedBy?: string;
    oldValues?: any;
    newValues?: any;
  }) {
    return this.prisma.auditLog.create({
      data: {
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        performedBy: data.performedBy,
        oldValues: data.oldValues || null,
        newValues: data.newValues || null,
      },
    });
  }

  /**
   * Disconnect Prisma client
   */
  async disconnect() {
    await this.prisma.$disconnect();
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const inspectionReportService = new InspectionReportService();
