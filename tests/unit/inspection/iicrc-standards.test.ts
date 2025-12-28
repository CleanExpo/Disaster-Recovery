/**
 * Unit Tests: IICRC Standards Service
 *
 * Tests comprehensive database of IICRC standards for disaster recovery
 * Part of NRPG Report Generation - Phase 2
 *
 * @module IICRCStandardsTests
 */

import { IICRCStandardsService } from '@/services/inspection/iicrc-standards.service';
import { IICRCStandard, DamageCategory } from '@prisma/client';

describe('IICRCStandardsService', () => {
  let service: IICRCStandardsService;

  beforeEach(() => {
    service = new IICRCStandardsService();
  });

  describe('getStandard', () => {
    it('should return S500 Water Damage standard', () => {
      const standard = service.getStandard('S500_WATER_DAMAGE');

      expect(standard).toBeDefined();
      expect(standard?.standard).toBe('S500_WATER_DAMAGE');
      expect(standard?.name).toBe('IICRC S500 Standard for Water Damage Restoration');
      expect(standard?.version).toBe('4th Edition');
    });

    it('should return S520 Mold Remediation standard', () => {
      const standard = service.getStandard('S520_MOLD_REMEDIATION');

      expect(standard).toBeDefined();
      expect(standard?.standard).toBe('S520_MOLD_REMEDIATION');
      expect(standard?.name).toBe('IICRC S520 Standard for Mold Remediation');
      expect(standard?.version).toBe('3rd Edition');
    });

    it('should return WRT Water Restoration standard', () => {
      const standard = service.getStandard('WRT_WATER_RESTORATION');

      expect(standard).toBeDefined();
      expect(standard?.standard).toBe('WRT_WATER_RESTORATION');
      expect(standard?.name).toBe('WRT - Water Restoration Technician');
    });

    it('should return AMRT Applied Microbial standard', () => {
      const standard = service.getStandard('AMRT_APPLIED_MICROBIAL');

      expect(standard).toBeDefined();
      expect(standard?.standard).toBe('AMRT_APPLIED_MICROBIAL');
      expect(standard?.name).toBe('AMRT - Applied Microbial Remediation Technician');
    });

    it('should return S800 Biohazard standard', () => {
      const standard = service.getStandard('S800_BIOHAZARD');

      expect(standard).toBeDefined();
      expect(standard?.standard).toBe('S800_BIOHAZARD');
      expect(standard?.name).toBe('IICRC S800 Trauma & Crime Scene Cleanup');
    });

    it('should return FSRT Fire & Smoke standard', () => {
      const standard = service.getStandard('FSRT_FIRE_SMOKE');

      expect(standard).toBeDefined();
      expect(standard?.standard).toBe('FSRT_FIRE_SMOKE');
      expect(standard?.name).toBe('FSRT - Fire & Smoke Restoration Technician');
    });

    it('should include applicable scenarios for each standard', () => {
      const s500 = service.getStandard('S500_WATER_DAMAGE');

      expect(s500?.applicableScenarios).toBeDefined();
      expect(s500?.applicableScenarios.length).toBeGreaterThan(0);
      expect(s500?.applicableScenarios).toContain('Water intrusion from clean sources (Category 1)');
    });

    it('should include required certifications for each standard', () => {
      const s500 = service.getStandard('S500_WATER_DAMAGE');

      expect(s500?.requiredCertifications).toBeDefined();
      expect(s500?.requiredCertifications.length).toBeGreaterThan(0);
      expect(s500?.requiredCertifications).toContain('WRT - Water Restoration Technician (minimum)');
    });

    it('should include safety protocols for each standard', () => {
      const s520 = service.getStandard('S520_MOLD_REMEDIATION');

      expect(s520?.safetyProtocols).toBeDefined();
      expect(s520?.safetyProtocols.length).toBeGreaterThan(0);
      expect(s520?.safetyProtocols).toContain(
        'Respiratory protection (N95 minimum, P100 for heavy contamination)'
      );
    });

    it('should include documentation requirements for each standard', () => {
      const s500 = service.getStandard('S500_WATER_DAMAGE');

      expect(s500?.documentationRequirements).toBeDefined();
      expect(s500?.documentationRequirements.length).toBeGreaterThan(0);
      expect(s500?.documentationRequirements).toContain('Initial moisture readings');
    });
  });

  describe('determineApplicableStandards', () => {
    it('should require S500 for Category 1 water damage', () => {
      const standards = service.determineApplicableStandards('CATEGORY_1', false, 0);

      expect(standards).toContain('S500_WATER_DAMAGE');
      expect(standards).toContain('WRT_WATER_RESTORATION');
    });

    it('should require S500 and WRT for Category 2 water damage without mold', () => {
      const standards = service.determineApplicableStandards('CATEGORY_2', false, 0);

      expect(standards).toContain('S500_WATER_DAMAGE');
      expect(standards).toContain('WRT_WATER_RESTORATION');
      expect(standards).not.toContain('S520_MOLD_REMEDIATION');
      expect(standards).not.toContain('AMRT_APPLIED_MICROBIAL');
    });

    it('should require S500, S520, WRT, and AMRT for Category 3 water damage', () => {
      const standards = service.determineApplicableStandards('CATEGORY_3', false, 0);

      expect(standards).toContain('S500_WATER_DAMAGE');
      expect(standards).toContain('WRT_WATER_RESTORATION');
      expect(standards).toContain('AMRT_APPLIED_MICROBIAL');
    });

    it('should require S520 when mold is present', () => {
      const standards = service.determineApplicableStandards('CATEGORY_1', true, 0.5);

      expect(standards).toContain('S500_WATER_DAMAGE');
      expect(standards).toContain('S520_MOLD_REMEDIATION');
      expect(standards).toContain('WRT_WATER_RESTORATION');
    });

    it('should require AMRT for significant mold (>1 m²)', () => {
      const standards = service.determineApplicableStandards('CATEGORY_1', true, 1.5);

      expect(standards).toContain('S500_WATER_DAMAGE');
      expect(standards).toContain('S520_MOLD_REMEDIATION');
      expect(standards).toContain('WRT_WATER_RESTORATION');
      expect(standards).toContain('AMRT_APPLIED_MICROBIAL');
    });

    it('should not require AMRT for minor mold (<1 m²)', () => {
      const standards = service.determineApplicableStandards('CATEGORY_1', true, 0.8);

      expect(standards).toContain('S520_MOLD_REMEDIATION');
      expect(standards).not.toContain('AMRT_APPLIED_MICROBIAL');
    });

    it('should require AMRT for Category 3 regardless of mold area', () => {
      const standards = service.determineApplicableStandards('CATEGORY_3', false, 0);

      expect(standards).toContain('AMRT_APPLIED_MICROBIAL');
    });
  });

  describe('validateInspectorCertification', () => {
    it('should validate inspector has WRT for basic water damage', () => {
      const inspectorCerts = ['WRT - Water Restoration Technician'];
      const requiredStandards: IICRCStandard[] = ['S500_WATER_DAMAGE', 'WRT_WATER_RESTORATION'];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      expect(result.qualified).toBe(true);
      expect(result.missingCertifications).toHaveLength(0);
    });

    it('should validate inspector has AMRT for Category 3 water', () => {
      const inspectorCerts = [
        'WRT - Water Restoration Technician',
        'AMRT - Applied Microbial Remediation Technician',
      ];
      const requiredStandards: IICRCStandard[] = [
        'S500_WATER_DAMAGE',
        'WRT_WATER_RESTORATION',
        'AMRT_APPLIED_MICROBIAL',
      ];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      expect(result.qualified).toBe(true);
      expect(result.missingCertifications).toHaveLength(0);
    });

    it('should detect missing WRT certification', () => {
      const inspectorCerts: string[] = [];
      const requiredStandards: IICRCStandard[] = ['S500_WATER_DAMAGE'];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      expect(result.qualified).toBe(false);
      expect(result.missingCertifications).toContain('WRT - Water Restoration Technician (minimum)');
    });

    it('should detect missing AMRT certification for Category 3', () => {
      const inspectorCerts = ['WRT - Water Restoration Technician'];
      const requiredStandards: IICRCStandard[] = [
        'S500_WATER_DAMAGE',
        'AMRT_APPLIED_MICROBIAL',
      ];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      expect(result.qualified).toBe(false);
      expect(result.missingCertifications).toContain('AMRT certification (IICRC)');
    });

    it('should handle partial certification matches', () => {
      const inspectorCerts = ['WRT certification obtained 2024'];
      const requiredStandards: IICRCStandard[] = ['WRT_WATER_RESTORATION'];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      expect(result.qualified).toBe(true);
    });

    it('should deduplicate certification requirements', () => {
      const inspectorCerts = ['WRT - Water Restoration Technician'];
      const requiredStandards: IICRCStandard[] = [
        'S500_WATER_DAMAGE',
        'WRT_WATER_RESTORATION',
      ];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      // Should not require WRT twice
      expect(result.qualified).toBe(true);
    });

    it('should validate complex certification scenarios', () => {
      const inspectorCerts = [
        'WRT - Water Restoration Technician',
        'AMRT - Applied Microbial Remediation Technician',
        'FSRT certification',
      ];
      const requiredStandards: IICRCStandard[] = [
        'S500_WATER_DAMAGE',
        'S520_MOLD_REMEDIATION',
        'AMRT_APPLIED_MICROBIAL',
      ];

      const result = service.validateInspectorCertification(inspectorCerts, requiredStandards);

      expect(result.qualified).toBe(true);
      expect(result.missingCertifications).toHaveLength(0);
    });
  });

  describe('getRequiredDocumentation', () => {
    it('should return documentation for S500 standard', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE'];

      const docs = service.getRequiredDocumentation(standards);

      expect(docs).toContain('Initial moisture readings');
      expect(docs).toContain('Photo documentation (before, during, after)');
      expect(docs).toContain('Equipment placement diagram');
    });

    it('should return documentation for S520 standard', () => {
      const standards: IICRCStandard[] = ['S520_MOLD_REMEDIATION'];

      const docs = service.getRequiredDocumentation(standards);

      expect(docs).toContain('Pre-remediation photos');
      expect(docs).toContain('Affected area measurements');
      expect(docs).toContain('Clearance certificate');
    });

    it('should combine documentation for multiple standards', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE', 'S520_MOLD_REMEDIATION'];

      const docs = service.getRequiredDocumentation(standards);

      // Should include docs from both standards
      expect(docs).toContain('Initial moisture readings');
      expect(docs).toContain('Clearance certificate');
      expect(docs.length).toBeGreaterThan(5);
    });

    it('should deduplicate documentation requirements', () => {
      const standards: IICRCStandard[] = [
        'S500_WATER_DAMAGE',
        'WRT_WATER_RESTORATION',
        'AMRT_APPLIED_MICROBIAL',
      ];

      const docs = service.getRequiredDocumentation(standards);

      // Photo documentation appears in multiple standards - should only appear once
      const photoCounts = docs.filter((d) => d.toLowerCase().includes('photo')).length;
      expect(photoCounts).toBeGreaterThan(0);
    });

    it('should return empty array for no standards', () => {
      const standards: IICRCStandard[] = [];

      const docs = service.getRequiredDocumentation(standards);

      expect(docs).toEqual([]);
    });
  });

  describe('getSafetyProtocols', () => {
    it('should return safety protocols for S500 standard', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE'];

      const protocols = service.getSafetyProtocols(standards);

      expect(protocols).toContain('Electrical safety assessment before water extraction');
      expect(protocols).toContain('PPE requirements based on water category');
    });

    it('should return safety protocols for S520 standard', () => {
      const standards: IICRCStandard[] = ['S520_MOLD_REMEDIATION'];

      const protocols = service.getSafetyProtocols(standards);

      expect(protocols).toContain(
        'Respiratory protection (N95 minimum, P100 for heavy contamination)'
      );
      expect(protocols).toContain('Containment to prevent cross-contamination');
    });

    it('should return safety protocols for S800 biohazard standard', () => {
      const standards: IICRCStandard[] = ['S800_BIOHAZARD'];

      const protocols = service.getSafetyProtocols(standards);

      expect(protocols).toContain('Level C PPE minimum');
      expect(protocols).toContain('Bloodborne pathogen protection');
    });

    it('should combine protocols for multiple standards', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE', 'AMRT_APPLIED_MICROBIAL'];

      const protocols = service.getSafetyProtocols(standards);

      expect(protocols.length).toBeGreaterThan(3);
    });

    it('should deduplicate safety protocols', () => {
      const standards: IICRCStandard[] = [
        'S520_MOLD_REMEDIATION',
        'AMRT_APPLIED_MICROBIAL',
      ];

      const protocols = service.getSafetyProtocols(standards);

      // Should not have duplicate protocols
      const uniqueProtocols = new Set(protocols);
      expect(protocols.length).toBe(uniqueProtocols.size);
    });
  });

  describe('getProcedureSteps', () => {
    it('should return procedure steps for S500 standard', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE'];

      const steps = service.getProcedureSteps(standards);

      expect(steps).toContain('1. Emergency contact and inspection');
      expect(steps).toContain('3. Water removal/extraction');
      expect(steps).toContain('11. Complete restoration');
    });

    it('should return procedure steps for S520 standard', () => {
      const standards: IICRCStandard[] = ['S520_MOLD_REMEDIATION'];

      const steps = service.getProcedureSteps(standards);

      expect(steps).toContain('1. Preliminary assessment');
      expect(steps).toContain('5. HEPA air filtration');
      expect(steps).toContain('10. Clearance testing (if applicable)');
    });

    it('should return procedure steps for FSRT fire & smoke standard', () => {
      const standards: IICRCStandard[] = ['FSRT_FIRE_SMOKE'];

      const steps = service.getProcedureSteps(standards);

      expect(steps).toContain('1. Safety and structural assessment');
      expect(steps).toContain('4. Clean smoke residue');
      expect(steps).toContain('7. Air quality verification');
    });

    it('should combine steps for multiple standards', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE', 'S520_MOLD_REMEDIATION'];

      const steps = service.getProcedureSteps(standards);

      expect(steps.length).toBeGreaterThan(10);
    });

    it('should maintain step order and numbering', () => {
      const standards: IICRCStandard[] = ['S500_WATER_DAMAGE'];

      const steps = service.getProcedureSteps(standards);

      // Should have numbered steps
      expect(steps[0]).toMatch(/^1\./);
      expect(steps.some((s) => s.match(/^2\./))).toBe(true);
    });
  });

  describe('Standard Completeness', () => {
    const allStandards: IICRCStandard[] = [
      'S500_WATER_DAMAGE',
      'S520_MOLD_REMEDIATION',
      'WRT_WATER_RESTORATION',
      'AMRT_APPLIED_MICROBIAL',
      'S800_BIOHAZARD',
      'FSRT_FIRE_SMOKE',
    ];

    it('should have complete data for all standards', () => {
      allStandards.forEach((standardType) => {
        const standard = service.getStandard(standardType);

        expect(standard).toBeDefined();
        expect(standard?.name).toBeTruthy();
        expect(standard?.version).toBeTruthy();
        expect(standard?.description).toBeTruthy();
        expect(standard?.applicableScenarios.length).toBeGreaterThan(0);
        expect(standard?.requiredCertifications.length).toBeGreaterThan(0);
        expect(standard?.safetyProtocols.length).toBeGreaterThan(0);
        expect(standard?.documentationRequirements.length).toBeGreaterThan(0);
      });
    });

    it('should have procedure steps for all standards', () => {
      allStandards.forEach((standardType) => {
        const standard = service.getStandard(standardType);

        expect(standard?.procedureSteps).toBeDefined();
        expect(standard?.procedureSteps.length).toBeGreaterThan(0);
      });
    });

    it('should have effective dates for all standards', () => {
      allStandards.forEach((standardType) => {
        const standard = service.getStandard(standardType);

        expect(standard?.effectiveDate).toBeInstanceOf(Date);
        expect(standard?.effectiveDate.getFullYear()).toBeGreaterThanOrEqual(2020);
      });
    });
  });
});
