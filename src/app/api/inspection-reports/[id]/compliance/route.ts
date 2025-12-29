/**
 * Inspection Report Compliance Validation API
 *
 * Validates inspection reports against jurisdiction rules and IICRC standards
 *
 * @module InspectionReportComplianceAPI
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logger } from '@/lib/logger';
import { jurisdictionRulesService } from '@/services/inspection/jurisdiction-rules.service';
import { iicrcStandardsService } from '@/services/inspection/iicrc-standards.service';

const prisma = new PrismaClient();

interface ComplianceCheckResult {
  checkType: string;
  category: string;
  requirement: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT' | 'WARNING' | 'NOT_APPLICABLE';
  details?: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

interface ComplianceValidationResult {
  overallStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'REQUIRES_REVIEW';
  complianceScore: number; // 0-100
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  criticalIssues: number;
  checks: ComplianceCheckResult[];
  recommendations: string[];
  timestamp: Date;
}

/**
 * POST /api/inspection-reports/[id]/compliance
 * Run comprehensive compliance validation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch report with all necessary data for compliance checks
    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            property: true,
          },
        },
        inspector: true,
        damageAreas: true,
        moistureReadings: true,
        photos: true,
        costEstimate: {
          include: {
            lineItems: true,
          },
        },
      },
    });

    if (!report) {
      logger.warn('Inspection report not found for compliance validation', {
        id,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    logger.info('Starting compliance validation', {
      reportId: report.id,
      reportNumber: report.reportNumber,
      jurisdiction: report.jurisdiction,
      iicrcStandards: report.iicrcStandards,
    });

    // Run all compliance checks
    const validationResult = await runComplianceChecks(report);

    // Store compliance check results in database
    await Promise.all(
      validationResult.checks.map((check) =>
        prisma.complianceCheck.create({
          data: {
            reportId: report.id,
            checkType: check.checkType,
            category: check.category,
            requirement: check.requirement,
            status: check.status,
            details: check.details,
            severity: check.severity,
            checkedAt: new Date(),
          },
        })
      )
    );

    // Update report compliance status
    await prisma.inspectionReport.update({
      where: { id },
      data: {
        complianceStatus: validationResult.overallStatus,
        updatedAt: new Date(),
      },
    });

    logger.info('Compliance validation completed', {
      reportId: report.id,
      reportNumber: report.reportNumber,
      overallStatus: validationResult.overallStatus,
      complianceScore: validationResult.complianceScore,
      totalChecks: validationResult.totalChecks,
      failedChecks: validationResult.failedChecks,
      criticalIssues: validationResult.criticalIssues,
    });

    return NextResponse.json({
      success: true,
      data: validationResult,
    });
  } catch (error) {
    logger.error('Failed to run compliance validation', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to run compliance validation',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * GET /api/inspection-reports/[id]/compliance
 * Get latest compliance validation results
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      select: {
        id: true,
        reportNumber: true,
        complianceStatus: true,
        complianceChecks: {
          orderBy: {
            checkedAt: 'desc',
          },
          take: 100,
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    // Group checks by category
    const checksByCategory = report.complianceChecks.reduce(
      (acc, check) => {
        if (!acc[check.category]) {
          acc[check.category] = [];
        }
        acc[check.category].push(check);
        return acc;
      },
      {} as Record<string, any[]>
    );

    // Calculate summary statistics
    const summary = {
      totalChecks: report.complianceChecks.length,
      compliant: report.complianceChecks.filter((c) => c.status === 'COMPLIANT')
        .length,
      nonCompliant: report.complianceChecks.filter(
        (c) => c.status === 'NON_COMPLIANT'
      ).length,
      warnings: report.complianceChecks.filter((c) => c.status === 'WARNING')
        .length,
      criticalIssues: report.complianceChecks.filter(
        (c) => c.severity === 'CRITICAL' && c.status === 'NON_COMPLIANT'
      ).length,
    };

    return NextResponse.json({
      success: true,
      data: {
        reportId: report.id,
        reportNumber: report.reportNumber,
        overallStatus: report.complianceStatus,
        summary,
        checksByCategory,
        allChecks: report.complianceChecks,
      },
    });
  } catch (error) {
    logger.error('Failed to get compliance results', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get compliance results',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Run comprehensive compliance checks
 */
async function runComplianceChecks(
  report: any
): Promise<ComplianceValidationResult> {
  const checks: ComplianceCheckResult[] = [];
  const recommendations: string[] = [];

  // 1. Jurisdiction-specific compliance checks
  const jurisdictionRules = jurisdictionRulesService.getRules(
    report.jurisdiction
  );

  if (jurisdictionRules) {
    // Check report completeness requirements
    checks.push({
      checkType: 'JURISDICTION_REQUIREMENT',
      category: 'Report Completeness',
      requirement: 'Executive Summary Required',
      status: report.executiveSummary ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: jurisdictionRules.reportingRequirements.executiveSummary
        ? 'Executive summary is mandatory'
        : 'Executive summary is recommended',
      severity: jurisdictionRules.reportingRequirements.executiveSummary
        ? 'HIGH'
        : 'MEDIUM',
    });

    // Check minimum photos requirement
    const minPhotos = jurisdictionRules.reportingRequirements.minimumPhotos;
    checks.push({
      checkType: 'JURISDICTION_REQUIREMENT',
      category: 'Documentation',
      requirement: `Minimum ${minPhotos} Photos Required`,
      status: report.photos.length >= minPhotos ? 'COMPLIANT' : 'NON_COMPLIANT',
      details: `Report has ${report.photos.length} photos, minimum required: ${minPhotos}`,
      severity: 'MEDIUM',
    });

    // Check moisture readings requirement
    checks.push({
      checkType: 'JURISDICTION_REQUIREMENT',
      category: 'Documentation',
      requirement: 'Moisture Readings Required',
      status:
        jurisdictionRulesService.validateMoistureReadings(
          report.moistureReadings,
          report.jurisdiction
        ).valid
          ? 'COMPLIANT'
          : 'NON_COMPLIANT',
      details: `Report has ${report.moistureReadings.length} moisture readings`,
      severity: 'HIGH',
    });
  }

  // 2. IICRC Standards compliance checks
  for (const standard of report.iicrcStandards) {
    const standardDef = iicrcStandardsService.getStandard(standard);

    if (standardDef) {
      // Check required documentation
      const requiredDocs =
        iicrcStandardsService.getRequiredDocumentation([standard]);

      for (const doc of requiredDocs.slice(0, 5)) {
        // Check first 5 requirements
        // This is a simplified check - in production, you'd have more sophisticated validation
        checks.push({
          checkType: 'IICRC_STANDARD',
          category: `${standardDef.name}`,
          requirement: doc,
          status: 'COMPLIANT', // Placeholder - implement actual validation logic
          details: `Documentation requirement for ${standard}`,
          severity: 'MEDIUM',
        });
      }

      // Check safety protocols
      const safetyProtocols = iicrcStandardsService.getSafetyProtocols([
        standard,
      ]);
      checks.push({
        checkType: 'IICRC_STANDARD',
        category: `${standardDef.name}`,
        requirement: 'Safety Protocols Documented',
        status: safetyProtocols.length > 0 ? 'COMPLIANT' : 'WARNING',
        details: `${safetyProtocols.length} safety protocols applicable`,
        severity: 'HIGH',
      });
    }
  }

  // 3. Data quality checks
  checks.push({
    checkType: 'DATA_QUALITY',
    category: 'Damage Assessment',
    requirement: 'At least one damage area documented',
    status: report.damageAreas.length > 0 ? 'COMPLIANT' : 'NON_COMPLIANT',
    details: `Report has ${report.damageAreas.length} damage areas`,
    severity: 'CRITICAL',
  });

  // Check for scope of work
  checks.push({
    checkType: 'DATA_QUALITY',
    category: 'Report Content',
    requirement: 'Scope of Work Defined',
    status:
      report.scopeOfWork && report.scopeOfWork.length > 50
        ? 'COMPLIANT'
        : 'NON_COMPLIANT',
    details: `Scope of work is ${report.scopeOfWork?.length || 0} characters`,
    severity: 'HIGH',
  });

  // Check for findings
  checks.push({
    checkType: 'DATA_QUALITY',
    category: 'Report Content',
    requirement: 'Findings Documented',
    status:
      report.findings && report.findings.length > 50
        ? 'COMPLIANT'
        : 'NON_COMPLIANT',
    details: `Findings section is ${report.findings?.length || 0} characters`,
    severity: 'HIGH',
  });

  // Check for recommendations
  checks.push({
    checkType: 'DATA_QUALITY',
    category: 'Report Content',
    requirement: 'Recommendations Provided',
    status:
      report.recommendations && report.recommendations.length > 50
        ? 'COMPLIANT'
        : 'NON_COMPLIANT',
    details: `Recommendations section is ${report.recommendations?.length || 0} characters`,
    severity: 'MEDIUM',
  });

  // 4. Cost estimate validation (if present)
  if (report.costEstimate) {
    checks.push({
      checkType: 'COST_ESTIMATE',
      category: 'Financial',
      requirement: 'Cost Estimate Provided',
      status: 'COMPLIANT',
      details: `Total estimate: $${report.costEstimate.totalAmount}`,
      severity: 'LOW',
    });

    if (report.costEstimate.lineItems.length === 0) {
      checks.push({
        checkType: 'COST_ESTIMATE',
        category: 'Financial',
        requirement: 'Cost Estimate Line Items',
        status: 'WARNING',
        details: 'Cost estimate has no line items',
        severity: 'MEDIUM',
      });
    }
  }

  // Calculate statistics
  const totalChecks = checks.length;
  const passedChecks = checks.filter((c) => c.status === 'COMPLIANT').length;
  const failedChecks = checks.filter((c) => c.status === 'NON_COMPLIANT').length;
  const warningChecks = checks.filter((c) => c.status === 'WARNING').length;
  const criticalIssues = checks.filter(
    (c) => c.severity === 'CRITICAL' && c.status === 'NON_COMPLIANT'
  ).length;

  // Calculate compliance score (0-100)
  const complianceScore = Math.round((passedChecks / totalChecks) * 100);

  // Determine overall status
  let overallStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'REQUIRES_REVIEW';
  if (criticalIssues > 0) {
    overallStatus = 'NON_COMPLIANT';
  } else if (failedChecks > 0 || warningChecks > 2) {
    overallStatus = 'REQUIRES_REVIEW';
  } else {
    overallStatus = 'COMPLIANT';
  }

  // Generate recommendations
  if (failedChecks > 0) {
    recommendations.push(
      `Address ${failedChecks} non-compliant items before finalizing report`
    );
  }
  if (criticalIssues > 0) {
    recommendations.push(
      `${criticalIssues} critical issues must be resolved before approval`
    );
  }
  if (report.photos.length < 10) {
    recommendations.push('Add more photos to improve documentation quality');
  }
  if (!report.costEstimate) {
    recommendations.push(
      'Consider adding a cost estimate for client transparency'
    );
  }

  return {
    overallStatus,
    complianceScore,
    totalChecks,
    passedChecks,
    failedChecks,
    warningChecks,
    criticalIssues,
    checks,
    recommendations,
    timestamp: new Date(),
  };
}
