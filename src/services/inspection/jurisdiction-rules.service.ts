/**
 * Jurisdiction Rules Engine
 *
 * Australian state-specific building code compliance validation
 * Implements rules for QLD, NSW, VIC, and other states
 *
 * Part of NRPG Report Generation - Phase 2
 *
 * @module JurisdictionRulesService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { AustralianState, IICRCStandard } from '@prisma/client';

interface JurisdictionRule {
  code: string;
  name: string;
  jurisdiction: AustralianState;
  category: 'BUILDING_CODE' | 'INSURANCE_REQUIREMENT' | 'SAFETY_STANDARD' | 'DOCUMENTATION';
  description: string;
  referenceDocument: string;
  effectiveDate: Date;
  validationLogic: (report: any) => Promise<ValidationResult>;
}

interface ValidationResult {
  passed: boolean;
  requiredActions: string[];
  evidence?: string;
  referenceSection?: string;
}

export interface ComplianceValidationResult {
  compliant: boolean;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  requiredActions: string[];
  checkDetails: Array<{
    code: string;
    name: string;
    passed: boolean;
    category: string;
    referenceDocument: string;
    referenceSection?: string;
    requiredActions: string[];
  }>;
}

export class JurisdictionRulesEngine {
  private rules: Map<string, JurisdictionRule[]> = new Map();

  constructor() {
    this.loadRules();
  }

  /**
   * Load all jurisdiction-specific rules
   */
  private loadRules() {
    // ========================================================================
    // QUEENSLAND RULES
    // ========================================================================
    this.registerRule({
      code: 'QLD-BC-2022-WD-001',
      name: 'Water Damage Structural Assessment Required',
      jurisdiction: 'QLD',
      category: 'BUILDING_CODE',
      description:
        'Structural assessment required for Category 2+ water damage affecting load-bearing walls',
      referenceDocument: 'Queensland Building Code 2022 - Section 4.2.3',
      effectiveDate: new Date('2022-01-01'),
      validationLogic: async (report) => {
        const hasCategory2Plus = report.damageAreas?.some((area: any) =>
          ['CATEGORY_2', 'CATEGORY_3'].includes(area.damageCategory)
        );

        const affectsStructural =
          report.findings?.toLowerCase().includes('load-bearing') ||
          report.findings?.toLowerCase().includes('structural');

        if (hasCategory2Plus && affectsStructural) {
          const hasStructuralAssessment =
            report.findings?.toLowerCase().includes('structural engineer') ||
            report.findings?.toLowerCase().includes('structural assessment');

          return {
            passed: hasStructuralAssessment,
            requiredActions: hasStructuralAssessment
              ? []
              : [
                  'Engage licensed structural engineer for assessment',
                  'Document structural integrity findings',
                  'Obtain clearance certificate before reconstruction',
                ],
            referenceSection: 'QLD Building Code 2022 - Section 4.2.3',
          };
        }

        return { passed: true, requiredActions: [] };
      },
    });

    this.registerRule({
      code: 'QLD-IICRC-S500-001',
      name: 'Category 3 Water Requires S500 Compliance',
      jurisdiction: 'QLD',
      category: 'SAFETY_STANDARD',
      description:
        'Category 3 (sewage) water damage must follow IICRC S500 protocols',
      referenceDocument: 'IICRC S500 Standard - Chapter 3',
      effectiveDate: new Date('2021-01-01'),
      validationLogic: async (report) => {
        const hasCategory3 = report.damageAreas?.some(
          (area: any) => area.damageCategory === 'CATEGORY_3'
        );

        if (hasCategory3) {
          const hasS500 = report.iicrcStandards?.includes('S500_WATER_DAMAGE');
          const hasPPE =
            report.scopeOfWork?.toLowerCase().includes('ppe') ||
            report.scopeOfWork?.toLowerCase().includes('personal protective equipment');
          const hasAntimicrobial = report.scopeOfWork
            ?.toLowerCase()
            .includes('antimicrobial');

          return {
            passed: hasS500 && hasPPE && hasAntimicrobial,
            requiredActions: [
              !hasS500 ? 'Apply IICRC S500 standard to report' : '',
              !hasPPE
                ? 'Document PPE requirements (gloves, respirators, protective suits)'
                : '',
              !hasAntimicrobial ? 'Include antimicrobial treatment in scope of work' : '',
            ].filter(Boolean),
            referenceSection: 'IICRC S500 - Chapter 3: Category 3 Water',
          };
        }

        return { passed: true, requiredActions: [] };
      },
    });

    // ========================================================================
    // NEW SOUTH WALES RULES
    // ========================================================================
    this.registerRule({
      code: 'NSW-ENV-2023-MOLD-001',
      name: 'Mold Assessment Documentation Required',
      jurisdiction: 'NSW',
      category: 'SAFETY_STANDARD',
      description:
        'Properties with visible mold >1m² require environmental assessment',
      referenceDocument: 'NSW Environmental Health Guidelines 2023',
      effectiveDate: new Date('2023-01-01'),
      validationLogic: async (report) => {
        const hasMoldMention =
          report.findings?.toLowerCase().includes('mold') ||
          report.findings?.toLowerCase().includes('mould') ||
          report.findings?.toLowerCase().includes('fungal');

        if (hasMoldMention) {
          const hasS520 = report.iicrcStandards?.includes('S520_MOLD_REMEDIATION');
          const hasAreaMeasurement = /\d+\s*(m²|square\s*meter)/i.test(report.findings);

          return {
            passed: hasS520 && hasAreaMeasurement,
            requiredActions: [
              !hasS520 ? 'Apply IICRC S520 Mold Remediation standard' : '',
              !hasAreaMeasurement ? 'Document affected area in square meters' : '',
              'Consider air quality testing if area >1m²',
            ].filter(Boolean),
            referenceSection: 'NSW Environmental Health Guidelines 2023 - Section 5.4',
          };
        }

        return { passed: true, requiredActions: [] };
      },
    });

    // ========================================================================
    // VICTORIA RULES
    // ========================================================================
    this.registerRule({
      code: 'VIC-INS-2024-PHOTO-001',
      name: 'Minimum Photo Documentation Required',
      jurisdiction: 'VIC',
      category: 'INSURANCE_REQUIREMENT',
      description: 'Minimum 10 photos required for insurance claims >$5000',
      referenceDocument: 'VIC Insurance Council Guidelines 2024',
      effectiveDate: new Date('2024-01-01'),
      validationLogic: async (report) => {
        const estimatedCost = report.costEstimate?.totalCost || 0;

        if (estimatedCost > 5000) {
          const photoCount = report.photos?.length || 0;
          const hasBeforePhotos =
            report.photos?.some((p: any) => p.photoType === 'BEFORE') || false;
          const hasDamageDetails =
            report.photos?.some((p: any) => p.photoType === 'DAMAGE_DETAIL') || false;

          return {
            passed: photoCount >= 10 && hasBeforePhotos && hasDamageDetails,
            requiredActions: [
              photoCount < 10
                ? `Add ${10 - photoCount} more photos (currently ${photoCount})`
                : '',
              !hasBeforePhotos ? 'Include "BEFORE" state photos' : '',
              !hasDamageDetails ? 'Include close-up "DAMAGE_DETAIL" photos' : '',
            ].filter(Boolean),
            referenceSection: 'VIC Insurance Council Guidelines 2024 - Schedule 2',
          };
        }

        return { passed: true, requiredActions: [] };
      },
    });

    // ========================================================================
    // UNIVERSAL RULES (ALL STATES)
    // ========================================================================
    const states: AustralianState[] = ['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

    states.forEach((state) => {
      this.registerRule({
        code: `${state}-IICRC-GENERAL-001`,
        name: 'IICRC Standard Assignment Required',
        jurisdiction: state,
        category: 'SAFETY_STANDARD',
        description: 'All water damage reports must reference applicable IICRC standard',
        referenceDocument: 'IICRC Professional Standards',
        effectiveDate: new Date('2020-01-01'),
        validationLogic: async (report) => {
          const hasIICRCStandard =
            report.iicrcStandards && report.iicrcStandards.length > 0;

          return {
            passed: hasIICRCStandard,
            requiredActions: hasIICRCStandard
              ? []
              : [
                  'Assign appropriate IICRC standard (S500 for water damage)',
                  'Ensure inspector is IICRC certified for assigned standard',
                ],
            referenceSection: 'IICRC Professional Standards',
          };
        },
      });
    });
  }

  /**
   * Register a jurisdiction rule
   */
  private registerRule(rule: JurisdictionRule) {
    const jurisdiction = rule.jurisdiction;
    if (!this.rules.has(jurisdiction)) {
      this.rules.set(jurisdiction, []);
    }
    this.rules.get(jurisdiction)!.push(rule);
  }

  /**
   * Validate report against all applicable jurisdiction rules
   * @param report - Inspection report with all relations loaded
   * @returns Compliance validation result
   */
  async validateReport(report: any): Promise<ComplianceValidationResult> {
    const jurisdiction = report.jurisdiction;
    const applicableRules = this.rules.get(jurisdiction) || [];

    const validationResults: Array<{
      rule: JurisdictionRule;
      result: ValidationResult;
    }> = [];

    for (const rule of applicableRules) {
      const result = await rule.validationLogic(report);
      validationResults.push({ rule, result });
    }

    const failedChecks = validationResults.filter((v) => !v.result.passed);
    const allRequiredActions = failedChecks.flatMap((v) => v.result.requiredActions);

    return {
      compliant: failedChecks.length === 0,
      totalChecks: validationResults.length,
      passedChecks: validationResults.length - failedChecks.length,
      failedChecks: failedChecks.length,
      requiredActions: allRequiredActions,
      checkDetails: validationResults.map((v) => ({
        code: v.rule.code,
        name: v.rule.name,
        passed: v.result.passed,
        category: v.rule.category,
        referenceDocument: v.rule.referenceDocument,
        referenceSection: v.result.referenceSection,
        requiredActions: v.result.requiredActions,
      })),
    };
  }

  /**
   * Get all applicable rules for a jurisdiction
   */
  getApplicableRules(jurisdiction: AustralianState): JurisdictionRule[] {
    return this.rules.get(jurisdiction) || [];
  }

  /**
   * Get a specific rule by code
   */
  getRuleByCode(code: string): JurisdictionRule | undefined {
    for (const rules of this.rules.values()) {
      const found = rules.find((r) => r.code === code);
      if (found) return found;
    }
    return undefined;
  }
}

export const jurisdictionRulesEngine = new JurisdictionRulesEngine();
