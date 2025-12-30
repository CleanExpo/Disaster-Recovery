/**
 * Unit Tests: Jurisdiction Rules Engine
 *
 * Tests Australian state-specific building code compliance validation
 * Part of NRPG Report Generation - Phase 2
 *
 * @module JurisdictionRulesTests
 */

import { JurisdictionRulesEngine } from '@/services/inspection/jurisdiction-rules.service';
import { AustralianState } from '@prisma/client';

describe('JurisdictionRulesEngine', () => {
  let engine: JurisdictionRulesEngine;

  beforeEach(() => {
    engine = new JurisdictionRulesEngine();
  });

  describe('Queensland (QLD) Rules', () => {
    describe('QLD-BC-2022-WD-001: Structural Assessment Required', () => {
      it('should require structural assessment for Category 2+ water affecting load-bearing walls', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_2', location: 'Living room' },
          ],
          findings: 'Significant water damage affecting load-bearing wall structure',
        };

        const result = await engine.validateReport(report);

        expect(result.compliant).toBe(false);
        expect(result.failedChecks).toBeGreaterThan(0);

        const structuralCheck = result.checkDetails.find(
          (c) => c.code === 'QLD-BC-2022-WD-001'
        );
        expect(structuralCheck).toBeDefined();
        expect(structuralCheck?.passed).toBe(false);
        expect(structuralCheck?.requiredActions).toContain(
          'Engage licensed structural engineer for assessment'
        );
      });

      it('should pass when structural assessment is documented', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_2', location: 'Living room' },
          ],
          findings:
            'Water damage affecting load-bearing walls. Structural engineer assessment completed on 2025-01-15. Structural integrity verified.',
        };

        const result = await engine.validateReport(report);

        const structuralCheck = result.checkDetails.find(
          (c) => c.code === 'QLD-BC-2022-WD-001'
        );
        expect(structuralCheck?.passed).toBe(true);
        expect(structuralCheck?.requiredActions).toHaveLength(0);
      });

      it('should not require assessment for Category 1 water', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_1', location: 'Bathroom' },
          ],
          findings: 'Minor clean water leak from sink',
        };

        const result = await engine.validateReport(report);

        const structuralCheck = result.checkDetails.find(
          (c) => c.code === 'QLD-BC-2022-WD-001'
        );
        expect(structuralCheck?.passed).toBe(true);
      });

      it('should not require assessment for non-structural damage', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_3', location: 'Basement' },
          ],
          findings: 'Sewage backup affecting carpet and drywall only',
        };

        const result = await engine.validateReport(report);

        const structuralCheck = result.checkDetails.find(
          (c) => c.code === 'QLD-BC-2022-WD-001'
        );
        expect(structuralCheck?.passed).toBe(true);
      });
    });

    describe('QLD-IICRC-S500-001: Category 3 Water S500 Compliance', () => {
      it('should require S500 standard for Category 3 water', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_3', location: 'Basement' },
          ],
          iicrcStandards: [],
          scopeOfWork: 'Clean up sewage backup',
        };

        const result = await engine.validateReport(report);

        const s500Check = result.checkDetails.find(
          (c) => c.code === 'QLD-IICRC-S500-001'
        );
        expect(s500Check).toBeDefined();
        expect(s500Check?.passed).toBe(false);
        expect(s500Check?.requiredActions).toContain('Apply IICRC S500 standard to report');
      });

      it('should require PPE documentation for Category 3 water', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_3', location: 'Basement' },
          ],
          iicrcStandards: ['S500_WATER_DAMAGE'],
          scopeOfWork: 'Clean and remediate sewage damage',
        };

        const result = await engine.validateReport(report);

        const s500Check = result.checkDetails.find(
          (c) => c.code === 'QLD-IICRC-S500-001'
        );
        expect(s500Check?.passed).toBe(false);
        expect(s500Check?.requiredActions).toContain(
          'Document PPE requirements (gloves, respirators, protective suits)'
        );
      });

      it('should require antimicrobial treatment for Category 3 water', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_3', location: 'Basement' },
          ],
          iicrcStandards: ['S500_WATER_DAMAGE'],
          scopeOfWork:
            'Clean sewage damage using PPE (gloves, respirators, protective suits)',
        };

        const result = await engine.validateReport(report);

        const s500Check = result.checkDetails.find(
          (c) => c.code === 'QLD-IICRC-S500-001'
        );
        expect(s500Check?.passed).toBe(false);
        expect(s500Check?.requiredActions).toContain(
          'Include antimicrobial treatment in scope of work'
        );
      });

      it('should pass when all S500 requirements met', async () => {
        const report = {
          jurisdiction: 'QLD' as AustralianState,
          damageAreas: [
            { damageCategory: 'CATEGORY_3', location: 'Basement' },
          ],
          iicrcStandards: ['S500_WATER_DAMAGE'],
          scopeOfWork:
            'Remediate sewage backup using full PPE (respirators, protective suits, gloves). Apply antimicrobial treatment to all affected areas.',
        };

        const result = await engine.validateReport(report);

        const s500Check = result.checkDetails.find(
          (c) => c.code === 'QLD-IICRC-S500-001'
        );
        expect(s500Check?.passed).toBe(true);
        expect(s500Check?.requiredActions).toHaveLength(0);
      });
    });
  });

  describe('New South Wales (NSW) Rules', () => {
    describe('NSW-ENV-2023-MOLD-001: Mold Assessment Documentation', () => {
      it('should require S520 standard for mold presence', async () => {
        const report = {
          jurisdiction: 'NSW' as AustralianState,
          findings: 'Visible mold growth observed on walls',
          iicrcStandards: [],
        };

        const result = await engine.validateReport(report);

        const moldCheck = result.checkDetails.find(
          (c) => c.code === 'NSW-ENV-2023-MOLD-001'
        );
        expect(moldCheck).toBeDefined();
        expect(moldCheck?.passed).toBe(false);
        expect(moldCheck?.requiredActions).toContain('Apply IICRC S520 Mold Remediation standard');
      });

      it('should require area measurement for mold', async () => {
        const report = {
          jurisdiction: 'NSW' as AustralianState,
          findings: 'Mold growth on bedroom wall',
          iicrcStandards: ['S520_MOLD_REMEDIATION'],
        };

        const result = await engine.validateReport(report);

        const moldCheck = result.checkDetails.find(
          (c) => c.code === 'NSW-ENV-2023-MOLD-001'
        );
        expect(moldCheck?.passed).toBe(false);
        expect(moldCheck?.requiredActions).toContain('Document affected area in square meters');
      });

      it('should pass when S520 and area measurement provided', async () => {
        const report = {
          jurisdiction: 'NSW' as AustralianState,
          findings: 'Mold growth covering approximately 1.5 m² on bedroom wall',
          iicrcStandards: ['S520_MOLD_REMEDIATION'],
        };

        const result = await engine.validateReport(report);

        const moldCheck = result.checkDetails.find(
          (c) => c.code === 'NSW-ENV-2023-MOLD-001'
        );
        expect(moldCheck?.passed).toBe(true);
      });

      it('should handle "mould" spelling variant', async () => {
        const report = {
          jurisdiction: 'NSW' as AustralianState,
          findings: 'Visible mould growth covering 2.3 square meters',
          iicrcStandards: ['S520_MOLD_REMEDIATION'],
        };

        const result = await engine.validateReport(report);

        const moldCheck = result.checkDetails.find(
          (c) => c.code === 'NSW-ENV-2023-MOLD-001'
        );
        expect(moldCheck?.passed).toBe(true);
      });

      it('should handle fungal growth terminology', async () => {
        const report = {
          jurisdiction: 'NSW' as AustralianState,
          findings: 'Fungal contamination observed, approximately 1.8 m²',
          iicrcStandards: ['S520_MOLD_REMEDIATION'],
        };

        const result = await engine.validateReport(report);

        const moldCheck = result.checkDetails.find(
          (c) => c.code === 'NSW-ENV-2023-MOLD-001'
        );
        expect(moldCheck?.passed).toBe(true);
      });
    });
  });

  describe('Victoria (VIC) Rules', () => {
    describe('VIC-INS-2024-PHOTO-001: Minimum Photo Documentation', () => {
      it('should require 10 photos for claims over $5000', async () => {
        const report = {
          jurisdiction: 'VIC' as AustralianState,
          costEstimate: { totalCost: 7500 },
          photos: [
            { photoType: 'BEFORE' },
            { photoType: 'DAMAGE_DETAIL' },
            { photoType: 'OVERVIEW' },
          ],
        };

        const result = await engine.validateReport(report);

        const photoCheck = result.checkDetails.find(
          (c) => c.code === 'VIC-INS-2024-PHOTO-001'
        );
        expect(photoCheck).toBeDefined();
        expect(photoCheck?.passed).toBe(false);
        expect(photoCheck?.requiredActions).toEqual(
          expect.arrayContaining([expect.stringContaining('Add 7 more photos')])
        );
      });

      it('should require BEFORE photos for claims over $5000', async () => {
        const report = {
          jurisdiction: 'VIC' as AustralianState,
          costEstimate: { totalCost: 6000 },
          photos: Array(10).fill({ photoType: 'DAMAGE_DETAIL' }),
        };

        const result = await engine.validateReport(report);

        const photoCheck = result.checkDetails.find(
          (c) => c.code === 'VIC-INS-2024-PHOTO-001'
        );
        expect(photoCheck?.passed).toBe(false);
        expect(photoCheck?.requiredActions).toContain('Include "BEFORE" state photos');
      });

      it('should require DAMAGE_DETAIL photos for claims over $5000', async () => {
        const report = {
          jurisdiction: 'VIC' as AustralianState,
          costEstimate: { totalCost: 8000 },
          photos: [
            ...Array(5).fill({ photoType: 'BEFORE' }),
            ...Array(5).fill({ photoType: 'OVERVIEW' }),
          ],
        };

        const result = await engine.validateReport(report);

        const photoCheck = result.checkDetails.find(
          (c) => c.code === 'VIC-INS-2024-PHOTO-001'
        );
        expect(photoCheck?.passed).toBe(false);
        expect(photoCheck?.requiredActions).toContain('Include close-up "DAMAGE_DETAIL" photos');
      });

      it('should pass when all photo requirements met', async () => {
        const report = {
          jurisdiction: 'VIC' as AustralianState,
          costEstimate: { totalCost: 10000 },
          photos: [
            ...Array(4).fill({ photoType: 'BEFORE' }),
            ...Array(4).fill({ photoType: 'DAMAGE_DETAIL' }),
            ...Array(2).fill({ photoType: 'OVERVIEW' }),
          ],
        };

        const result = await engine.validateReport(report);

        const photoCheck = result.checkDetails.find(
          (c) => c.code === 'VIC-INS-2024-PHOTO-001'
        );
        expect(photoCheck?.passed).toBe(true);
        expect(photoCheck?.requiredActions).toHaveLength(0);
      });

      it('should not require photos for claims under $5000', async () => {
        const report = {
          jurisdiction: 'VIC' as AustralianState,
          costEstimate: { totalCost: 3000 },
          photos: [
            { photoType: 'BEFORE' },
            { photoType: 'OVERVIEW' },
          ],
        };

        const result = await engine.validateReport(report);

        const photoCheck = result.checkDetails.find(
          (c) => c.code === 'VIC-INS-2024-PHOTO-001'
        );
        expect(photoCheck?.passed).toBe(true);
      });
    });
  });

  describe('Universal Rules (All States)', () => {
    describe('IICRC Standard Assignment Required', () => {
      const states: AustralianState[] = ['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

      states.forEach((state) => {
        it(`should require IICRC standard for ${state}`, async () => {
          const report = {
            jurisdiction: state,
            iicrcStandards: [],
          };

          const result = await engine.validateReport(report);

          const iicrcCheck = result.checkDetails.find(
            (c) => c.code === `${state}-IICRC-GENERAL-001`
          );
          expect(iicrcCheck).toBeDefined();
          expect(iicrcCheck?.passed).toBe(false);
          expect(iicrcCheck?.requiredActions).toContain(
            'Assign appropriate IICRC standard (S500 for water damage)'
          );
        });

        it(`should pass when IICRC standard assigned for ${state}`, async () => {
          const report = {
            jurisdiction: state,
            iicrcStandards: ['S500_WATER_DAMAGE'],
          };

          const result = await engine.validateReport(report);

          const iicrcCheck = result.checkDetails.find(
            (c) => c.code === `${state}-IICRC-GENERAL-001`
          );
          expect(iicrcCheck?.passed).toBe(true);
          expect(iicrcCheck?.requiredActions).toHaveLength(0);
        });
      });
    });
  });

  describe('validateReport', () => {
    it('should return comprehensive validation results', async () => {
      const report = {
        jurisdiction: 'QLD' as AustralianState,
        damageAreas: [
          { damageCategory: 'CATEGORY_1', location: 'Kitchen' },
        ],
        iicrcStandards: ['S500_WATER_DAMAGE'],
        findings: 'Minor water damage from dishwasher leak',
      };

      const result = await engine.validateReport(report);

      expect(result).toHaveProperty('compliant');
      expect(result).toHaveProperty('totalChecks');
      expect(result).toHaveProperty('passedChecks');
      expect(result).toHaveProperty('failedChecks');
      expect(result).toHaveProperty('requiredActions');
      expect(result).toHaveProperty('checkDetails');
      expect(result.totalChecks).toBeGreaterThan(0);
      expect(result.passedChecks + result.failedChecks).toBe(result.totalChecks);
    });

    it('should mark compliant when all checks pass', async () => {
      const report = {
        jurisdiction: 'VIC' as AustralianState,
        costEstimate: { totalCost: 3000 },
        iicrcStandards: ['S500_WATER_DAMAGE'],
        photos: [{ photoType: 'BEFORE' }],
      };

      const result = await engine.validateReport(report);

      expect(result.compliant).toBe(true);
      expect(result.failedChecks).toBe(0);
      expect(result.requiredActions).toHaveLength(0);
    });

    it('should mark non-compliant when checks fail', async () => {
      const report = {
        jurisdiction: 'NSW' as AustralianState,
        findings: 'Significant mold contamination',
        iicrcStandards: [],
      };

      const result = await engine.validateReport(report);

      expect(result.compliant).toBe(false);
      expect(result.failedChecks).toBeGreaterThan(0);
      expect(result.requiredActions.length).toBeGreaterThan(0);
    });

    it('should provide detailed check results', async () => {
      const report = {
        jurisdiction: 'QLD' as AustralianState,
        iicrcStandards: [],
      };

      const result = await engine.validateReport(report);

      expect(result.checkDetails.length).toBeGreaterThan(0);
      result.checkDetails.forEach((check) => {
        expect(check).toHaveProperty('code');
        expect(check).toHaveProperty('name');
        expect(check).toHaveProperty('passed');
        expect(check).toHaveProperty('category');
        expect(check).toHaveProperty('referenceDocument');
        expect(check).toHaveProperty('requiredActions');
      });
    });
  });

  describe('getApplicableRules', () => {
    it('should return rules for Queensland', () => {
      const rules = engine.getApplicableRules('QLD');

      expect(rules.length).toBeGreaterThan(0);
      expect(rules.every((r) => r.jurisdiction === 'QLD')).toBe(true);
    });

    it('should return rules for New South Wales', () => {
      const rules = engine.getApplicableRules('NSW');

      expect(rules.length).toBeGreaterThan(0);
      expect(rules.every((r) => r.jurisdiction === 'NSW')).toBe(true);
    });

    it('should return rules for Victoria', () => {
      const rules = engine.getApplicableRules('VIC');

      expect(rules.length).toBeGreaterThan(0);
      expect(rules.every((r) => r.jurisdiction === 'VIC')).toBe(true);
    });
  });

  describe('getRuleByCode', () => {
    it('should find rule by code', () => {
      const rule = engine.getRuleByCode('QLD-BC-2022-WD-001');

      expect(rule).toBeDefined();
      expect(rule?.code).toBe('QLD-BC-2022-WD-001');
      expect(rule?.name).toBe('Water Damage Structural Assessment Required');
    });

    it('should return undefined for non-existent code', () => {
      const rule = engine.getRuleByCode('INVALID-CODE');

      expect(rule).toBeUndefined();
    });
  });
});
