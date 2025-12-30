/**
 * IICRC Standards Database Service
 *
 * Comprehensive database of IICRC standards for disaster recovery
 * Includes procedures, safety protocols, and documentation requirements
 *
 * Part of NRPG Report Generation - Phase 2
 *
 * @module IICRCStandardsService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { IICRCStandard, DamageCategory } from '@prisma/client';

interface IICRCStandardDefinition {
  standard: IICRCStandard;
  name: string;
  version: string;
  effectiveDate: Date;
  description: string;
  applicableScenarios: string[];
  requiredCertifications: string[];
  keyRequirements: string[];
  procedureSteps: string[];
  safetyProtocols: string[];
  documentationRequirements: string[];
}

export class IICRCStandardsService {
  private standards: Map<IICRCStandard, IICRCStandardDefinition> = new Map();

  constructor() {
    this.loadStandards();
  }

  /**
   * Load all IICRC standards
   */
  private loadStandards() {
    // ========================================================================
    // S500 - WATER DAMAGE RESTORATION
    // ========================================================================
    this.standards.set('S500_WATER_DAMAGE', {
      standard: 'S500_WATER_DAMAGE',
      name: 'IICRC S500 Standard for Water Damage Restoration',
      version: '4th Edition',
      effectiveDate: new Date('2021-01-01'),
      description:
        'Standard and reference guide for professional water damage restoration',
      applicableScenarios: [
        'Water intrusion from clean sources (Category 1)',
        'Grey water contamination (Category 2)',
        'Black water/sewage contamination (Category 3)',
        'Structural drying',
        'Content restoration',
      ],
      requiredCertifications: [
        'WRT - Water Restoration Technician (minimum)',
        // Note: AMRT is required for Category 3 water but is defined in the separate AMRT_APPLIED_MICROBIAL standard
      ],
      keyRequirements: [
        'Moisture mapping and documentation',
        'Psychrometric calculations',
        'Proper equipment selection and placement',
        'Daily monitoring and documentation',
        'Drying goals established per material type',
        'Antimicrobial application for Category 2/3',
      ],
      procedureSteps: [
        '1. Emergency contact and inspection',
        '2. Inspection and damage assessment',
        '3. Water removal/extraction',
        '4. Moisture evaluation using detection devices',
        '5. Move and block affected contents',
        '6. Remove unsalvageable materials',
        '7. Apply antimicrobial treatments (if required)',
        '8. Dehumidification and drying',
        '9. Monitoring drying process',
        '10. Dry-down evaluation',
        '11. Complete restoration',
      ],
      safetyProtocols: [
        'Electrical safety assessment before water extraction',
        'PPE requirements based on water category',
        'Slip/fall hazard management',
        'Respiratory protection for Category 3',
        'Biohazard handling procedures',
      ],
      documentationRequirements: [
        'Initial moisture readings',
        'Daily moisture readings until dry standard achieved',
        'Psychrometric readings (temp, RH)',
        'Equipment placement diagram',
        'Photo documentation (before, during, after)',
        'Material removal documentation',
        'Antimicrobial application records',
      ],
    });

    // ========================================================================
    // S520 - MOLD REMEDIATION
    // ========================================================================
    this.standards.set('S520_MOLD_REMEDIATION', {
      standard: 'S520_MOLD_REMEDIATION',
      name: 'IICRC S520 Standard for Mold Remediation',
      version: '3rd Edition',
      effectiveDate: new Date('2023-01-01'),
      description: 'Standard and reference guide for professional mold remediation',
      applicableScenarios: [
        'Visible mold growth',
        'Microbial contamination post-water damage',
        'Indoor air quality concerns',
        'Post-remediation verification',
      ],
      requiredCertifications: ['AMRT - Applied Microbial Remediation Technician'],
      keyRequirements: [
        'Source moisture identification and correction',
        'Containment protocols',
        'Air filtration (HEPA)',
        'Removal of contaminated materials',
        'HEPA vacuuming',
        'Post-remediation verification',
        'Clearance testing (if required)',
      ],
      procedureSteps: [
        '1. Preliminary assessment',
        '2. Develop remediation plan',
        '3. Establish containment',
        '4. Source moisture elimination',
        '5. HEPA air filtration',
        '6. Remove contaminated materials',
        '7. Clean affected surfaces',
        '8. HEPA vacuum all surfaces',
        '9. Post-remediation assessment',
        '10. Clearance testing (if applicable)',
      ],
      safetyProtocols: [
        'Respiratory protection (N95 minimum, P100 for heavy contamination)',
        'Protective clothing and gloves',
        'Eye protection',
        'Containment to prevent cross-contamination',
        'Negative air pressure in work area',
        'Proper disposal of contaminated materials',
      ],
      documentationRequirements: [
        'Pre-remediation photos',
        'Affected area measurements',
        'Containment documentation',
        'Air sample results (if performed)',
        'Material removal log',
        'Post-remediation photos',
        'Clearance certificate',
      ],
    });

    // ========================================================================
    // WRT - WATER RESTORATION TECHNICIAN
    // ========================================================================
    this.standards.set('WRT_WATER_RESTORATION', {
      standard: 'WRT_WATER_RESTORATION',
      name: 'WRT - Water Restoration Technician',
      version: 'Current',
      effectiveDate: new Date('2020-01-01'),
      description: 'Entry-level certification for water damage restoration',
      applicableScenarios: [
        'Category 1 water damage',
        'Basic structural drying',
        'Equipment operation',
        'Moisture detection',
      ],
      requiredCertifications: ['WRT certification (IICRC)'],
      keyRequirements: [
        'Understanding of water damage categories',
        'Psychrometric principles',
        'Equipment knowledge (air movers, dehumidifiers)',
        'Moisture detection tools',
        'Basic documentation',
      ],
      procedureSteps: [
        '1. Safety assessment',
        '2. Moisture detection',
        '3. Water extraction',
        '4. Equipment setup',
        '5. Daily monitoring',
        '6. Documentation',
      ],
      safetyProtocols: [
        'Electrical safety',
        'Slip/fall prevention',
        'Basic PPE (gloves, boots)',
        'Lifting techniques',
      ],
      documentationRequirements: [
        'Moisture readings',
        'Equipment log',
        'Daily progress notes',
        'Photo documentation',
      ],
    });

    // ========================================================================
    // AMRT - APPLIED MICROBIAL REMEDIATION
    // ========================================================================
    this.standards.set('AMRT_APPLIED_MICROBIAL', {
      standard: 'AMRT_APPLIED_MICROBIAL',
      name: 'AMRT - Applied Microbial Remediation Technician',
      version: 'Current',
      effectiveDate: new Date('2020-01-01'),
      description: 'Certification for microbial contamination remediation',
      applicableScenarios: [
        'Category 3 water damage',
        'Sewage backups',
        'Mold remediation',
        'Microbial contamination',
      ],
      requiredCertifications: ['AMRT certification (IICRC)'],
      keyRequirements: [
        'Microbial contamination assessment',
        'Containment procedures',
        'Antimicrobial application',
        'Cross-contamination prevention',
        'Personal protection protocols',
      ],
      procedureSteps: [
        '1. Contamination assessment',
        '2. Establish containment',
        '3. PPE donning',
        '4. Source removal',
        '5. Antimicrobial treatment',
        '6. Verification',
        '7. Clearance documentation',
      ],
      safetyProtocols: [
        'Full PPE (suit, respirator, gloves, boots)',
        'Decontamination procedures',
        'Waste disposal protocols',
        'Negative air pressure',
      ],
      documentationRequirements: [
        'Contamination assessment',
        'PPE log',
        'Treatment application records',
        'Air quality tests (if applicable)',
        'Clearance documentation',
      ],
    });

    // ========================================================================
    // S800 - BIOHAZARD
    // ========================================================================
    this.standards.set('S800_BIOHAZARD', {
      standard: 'S800_BIOHAZARD',
      name: 'IICRC S800 Trauma & Crime Scene Cleanup',
      version: '1st Edition',
      effectiveDate: new Date('2020-01-01'),
      description: 'Standard for trauma and crime scene cleanup',
      applicableScenarios: [
        'Blood and bodily fluids',
        'Crime scenes',
        'Unattended deaths',
        'Suicide cleanup',
      ],
      requiredCertifications: [
        'AMRT certification',
        'Biohazard training',
        'Regulatory compliance training',
      ],
      keyRequirements: [
        'Regulatory compliance (OSHA, EPA)',
        'Bloodborne pathogen procedures',
        'Proper disposal methods',
        'Decontamination protocols',
        'Verification testing',
      ],
      procedureSteps: [
        '1. Scene assessment',
        '2. Regulatory notification',
        '3. PPE and containment',
        '4. Remove contaminated materials',
        '5. Decontaminate surfaces',
        '6. Test and verify',
        '7. Proper disposal',
        '8. Documentation',
      ],
      safetyProtocols: [
        'Level C PPE minimum',
        'Bloodborne pathogen protection',
        'Sharp object handling',
        'Chemical decontamination',
        'Medical waste disposal',
      ],
      documentationRequirements: [
        'Regulatory notifications',
        'PPE compliance log',
        'Waste manifests',
        'ATP verification results',
        'Clearance certification',
      ],
    });

    // ========================================================================
    // FSRT - FIRE & SMOKE RESTORATION
    // ========================================================================
    this.standards.set('FSRT_FIRE_SMOKE', {
      standard: 'FSRT_FIRE_SMOKE',
      name: 'FSRT - Fire & Smoke Restoration Technician',
      version: 'Current',
      effectiveDate: new Date('2020-01-01'),
      description: 'Certification for fire and smoke damage restoration',
      applicableScenarios: [
        'Fire damage',
        'Smoke damage',
        'Soot cleanup',
        'Odor removal',
      ],
      requiredCertifications: ['FSRT certification (IICRC)'],
      keyRequirements: [
        'Smoke residue identification',
        'Appropriate cleaning agents',
        'Thermal fogging for odor',
        'Structural assessment',
        'Content restoration',
      ],
      procedureSteps: [
        '1. Safety and structural assessment',
        '2. Secure property',
        '3. Remove debris',
        '4. Clean smoke residue',
        '5. Deodorization',
        '6. Content cleaning',
        '7. Air quality verification',
      ],
      safetyProtocols: [
        'Structural stability check',
        'Respiratory protection',
        'Protective clothing',
        'Asbestos awareness',
        'Electrical hazard assessment',
      ],
      documentationRequirements: [
        'Fire department clearance',
        'Structural assessment',
        'Before/after photos',
        'Cleaning agent log',
        'Odor elimination verification',
      ],
    });
  }

  /**
   * Get standard definition
   */
  getStandard(standard: IICRCStandard): IICRCStandardDefinition | undefined {
    return this.standards.get(standard);
  }

  /**
   * Determine applicable standards based on damage characteristics
   */
  determineApplicableStandards(
    damageCategory: DamageCategory,
    hasMold: boolean,
    affectedAreaSqm: number
  ): IICRCStandard[] {
    const applicable: IICRCStandard[] = [];

    // Always apply S500 for water damage
    applicable.push('S500_WATER_DAMAGE');

    // Add S520 if mold present
    if (hasMold) {
      applicable.push('S520_MOLD_REMEDIATION');
    }

    // WRT applies to all water damage scenarios
    applicable.push('WRT_WATER_RESTORATION');

    // AMRT required for Category 3 or significant mold
    if (damageCategory === 'CATEGORY_3' || (hasMold && affectedAreaSqm > 1)) {
      applicable.push('AMRT_APPLIED_MICROBIAL');
    }

    return applicable;
  }

  /**
   * Validate inspector has required certifications for standards
   */
  validateInspectorCertification(
    inspectorCertifications: string[],
    requiredStandards: IICRCStandard[]
  ): { qualified: boolean; missingCertifications: string[] } {
    const allRequired: string[] = [];

    for (const standard of requiredStandards) {
      const definition = this.standards.get(standard);
      if (definition) {
        allRequired.push(...definition.requiredCertifications);
      }
    }

    const uniqueRequired = [...new Set(allRequired)];

    // Helper function to extract key terms from certification (remove qualifiers in parentheses)
    const extractKeyTerms = (cert: string): string => {
      return cert.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase();
    };

    const missing = uniqueRequired.filter((req) => {
      const reqKeyTerms = extractKeyTerms(req);

      return !inspectorCertifications.some((cert) => {
        const certKeyTerms = extractKeyTerms(cert);

        // Check if either string contains the other, or if key acronyms match
        // This allows for flexible matching:
        // - "WRT - Water Restoration Technician" matches "WRT - Water Restoration Technician (minimum)"
        // - "WRT certification obtained 2024" matches "WRT certification (IICRC)"
        // - "AMRT - Applied Microbial Remediation Technician" matches "AMRT - Applied Microbial Remediation Technician (for Category 3)"
        return (
          certKeyTerms.includes(reqKeyTerms) ||
          reqKeyTerms.includes(certKeyTerms) ||
          // Check for acronym matches (WRT, AMRT, etc.)
          (reqKeyTerms.includes('wrt') && certKeyTerms.includes('wrt')) ||
          (reqKeyTerms.includes('amrt') && certKeyTerms.includes('amrt')) ||
          (reqKeyTerms.includes('fsrt') && certKeyTerms.includes('fsrt'))
        );
      });
    });

    return {
      qualified: missing.length === 0,
      missingCertifications: missing,
    };
  }

  /**
   * Get required documentation for standards
   */
  getRequiredDocumentation(standards: IICRCStandard[]): string[] {
    const allDocs: string[] = [];

    for (const standard of standards) {
      const definition = this.standards.get(standard);
      if (definition) {
        allDocs.push(...definition.documentationRequirements);
      }
    }

    return [...new Set(allDocs)];
  }

  /**
   * Get safety protocols for standards
   */
  getSafetyProtocols(standards: IICRCStandard[]): string[] {
    const allProtocols: string[] = [];

    for (const standard of standards) {
      const definition = this.standards.get(standard);
      if (definition) {
        allProtocols.push(...definition.safetyProtocols);
      }
    }

    return [...new Set(allProtocols)];
  }

  /**
   * Get all procedure steps for standards
   */
  getProcedureSteps(standards: IICRCStandard[]): string[] {
    const allSteps: string[] = [];

    for (const standard of standards) {
      const definition = this.standards.get(standard);
      if (definition) {
        allSteps.push(...definition.procedureSteps);
      }
    }

    return [...new Set(allSteps)];
  }
}

export const iicrcStandardsService = new IICRCStandardsService();
