/**
 * Cost Estimation Service
 *
 * Calculates comprehensive cost estimates for NRPG inspection reports
 * - Labor costs (hours × hourly rate by IICRC level + jurisdiction)
 * - Material costs (quantity × unit price)
 * - Equipment costs (days × daily rate)
 * - GST calculation (10% Australia)
 * - Overtime/weekend multipliers
 */

import { AustralianState } from '@prisma/client';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';
import {
  PricingDatabaseService,
  IICRCLevel,
} from './pricing-database.service';

// ============================================================================
// TYPES
// ============================================================================

export interface LaborLineItem {
  description: string;
  iicrcLevel: IICRCLevel;
  state: AustralianState;
  workType: 'REGULAR' | 'OVERTIME' | 'WEEKEND' | 'EMERGENCY';
  hours: number;
  hourlyRate: number;
  subtotal: number;
  technician?: string;
  datePerformed?: Date;
}

export interface MaterialLineItem {
  materialId: string;
  description: string;
  category: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  supplier?: string;
}

export interface EquipmentLineItem {
  equipmentId: string;
  description: string;
  category: string;
  rentalPeriod: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  daysRented: number;
  dailyRate: number;
  subtotal: number;
  depositRequired: number;
  depositReturned: boolean;
}

export interface CostEstimate {
  laborLineItems: LaborLineItem[];
  materialLineItems: MaterialLineItem[];
  equipmentLineItems: EquipmentLineItem[];
  totals: {
    laborSubtotal: number;
    materialSubtotal: number;
    equipmentSubtotal: number;
    subtotal: number;
    gst: number;
    totalIncludingGST: number;
    depositsRequired: number;
    depositsReturned: number;
    netDeposits: number;
  };
  metadata: {
    state: AustralianState;
    projectSize?: string;
    damageType?: string;
    urgency?: string;
    estimatedBy?: string;
    estimatedAt: Date;
    validUntil?: Date;
  };
}

export interface LaborInput {
  iicrcLevel: IICRCLevel;
  hours: number;
  workType?: 'REGULAR' | 'OVERTIME' | 'WEEKEND' | 'EMERGENCY';
  description: string;
  technician?: string;
  datePerformed?: Date;
}

export interface MaterialInput {
  materialId: string;
  quantity: number;
  customDescription?: string;
}

export interface EquipmentInput {
  equipmentId: string;
  daysRented: number;
  rentalPeriod?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  depositReturned?: boolean;
}

export interface EstimationContext {
  state: AustralianState;
  projectSize?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'COMMERCIAL';
  damageType?: 'WATER' | 'FIRE' | 'MOLD' | 'SMOKE' | 'BIOHAZARD';
  urgency?: 'STANDARD' | 'URGENT' | 'EMERGENCY';
  estimatedBy?: string;
  validityDays?: number; // How many days is estimate valid?
}

// ============================================================================
// COST ESTIMATION SERVICE
// ============================================================================

export class CostEstimationService {
  /**
   * Calculate labor costs for inspection report
   */
  static calculateLaborCosts(
    laborInputs: LaborInput[],
    context: EstimationContext
  ): LaborLineItem[] {
    const correlationId = AdvancedLogger.setCorrelationId();

    AdvancedLogger.info('Calculating labor costs', {
      itemCount: laborInputs.length,
      state: context.state,
    });

    const lineItems: LaborLineItem[] = laborInputs.map((input) => {
      const hourlyRate = PricingDatabaseService.getLaborRate(
        input.iicrcLevel,
        context.state,
        input.workType || 'REGULAR'
      );

      const subtotal = Number((input.hours * hourlyRate).toFixed(2));

      const lineItem: LaborLineItem = {
        description: input.description,
        iicrcLevel: input.iicrcLevel,
        state: context.state,
        workType: input.workType || 'REGULAR',
        hours: input.hours,
        hourlyRate,
        subtotal,
        technician: input.technician,
        datePerformed: input.datePerformed,
      };

      AdvancedLogger.debug('Labor line item calculated', {
        description: lineItem.description,
        hours: lineItem.hours,
        hourlyRate: lineItem.hourlyRate,
        subtotal: lineItem.subtotal,
      });

      return lineItem;
    });

    const totalLabor = lineItems.reduce((sum, item) => sum + item.subtotal, 0);

    AdvancedLogger.info('Labor costs calculated', {
      lineItemCount: lineItems.length,
      totalLabor,
    });

    return lineItems;
  }

  /**
   * Calculate material costs for inspection report
   */
  static calculateMaterialCosts(
    materialInputs: MaterialInput[],
    context: EstimationContext
  ): MaterialLineItem[] {
    const correlationId = AdvancedLogger.setCorrelationId();

    AdvancedLogger.info('Calculating material costs', {
      itemCount: materialInputs.length,
      state: context.state,
    });

    const lineItems: MaterialLineItem[] = materialInputs
      .map((input) => {
        const material = PricingDatabaseService.getMaterial(input.materialId);

        if (!material) {
          AdvancedLogger.warn('Material not found, skipping', {
            materialId: input.materialId,
          });
          return null;
        }

        const unitPrice =
          PricingDatabaseService.getMaterialPrice(
            input.materialId,
            context.state
          ) || material.basePrice;

        const subtotal = Number((input.quantity * unitPrice).toFixed(2));

        const lineItem: MaterialLineItem = {
          materialId: input.materialId,
          description: input.customDescription || material.name,
          category: material.category,
          unit: material.unit,
          quantity: input.quantity,
          unitPrice,
          subtotal,
          supplier: material.suppliers?.[0],
        };

        AdvancedLogger.debug('Material line item calculated', {
          materialId: lineItem.materialId,
          description: lineItem.description,
          quantity: lineItem.quantity,
          unitPrice: lineItem.unitPrice,
          subtotal: lineItem.subtotal,
        });

        return lineItem;
      })
      .filter((item): item is MaterialLineItem => item !== null);

    const totalMaterials = lineItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    AdvancedLogger.info('Material costs calculated', {
      lineItemCount: lineItems.length,
      totalMaterials,
    });

    return lineItems;
  }

  /**
   * Calculate equipment rental costs for inspection report
   */
  static calculateEquipmentCosts(
    equipmentInputs: EquipmentInput[],
    context: EstimationContext
  ): EquipmentLineItem[] {
    const correlationId = AdvancedLogger.setCorrelationId();

    AdvancedLogger.info('Calculating equipment costs', {
      itemCount: equipmentInputs.length,
    });

    const lineItems: EquipmentLineItem[] = equipmentInputs
      .map((input) => {
        const equipment = PricingDatabaseService.getEquipment(
          input.equipmentId
        );

        if (!equipment) {
          AdvancedLogger.warn('Equipment not found, skipping', {
            equipmentId: input.equipmentId,
          });
          return null;
        }

        const rentalPeriod = input.rentalPeriod || 'DAILY';

        // Calculate daily rate based on rental period
        let dailyRate: number;
        if (rentalPeriod === 'WEEKLY') {
          dailyRate = equipment.weeklyRate / 7;
        } else if (rentalPeriod === 'MONTHLY') {
          dailyRate = equipment.monthlyRate / 30;
        } else {
          dailyRate = equipment.dailyRate;
        }

        const subtotal = Number((input.daysRented * dailyRate).toFixed(2));

        const lineItem: EquipmentLineItem = {
          equipmentId: input.equipmentId,
          description: equipment.name,
          category: equipment.category,
          rentalPeriod,
          daysRented: input.daysRented,
          dailyRate,
          subtotal,
          depositRequired: equipment.depositRequired,
          depositReturned: input.depositReturned ?? false,
        };

        AdvancedLogger.debug('Equipment line item calculated', {
          equipmentId: lineItem.equipmentId,
          description: lineItem.description,
          daysRented: lineItem.daysRented,
          dailyRate: lineItem.dailyRate,
          subtotal: lineItem.subtotal,
        });

        return lineItem;
      })
      .filter((item): item is EquipmentLineItem => item !== null);

    const totalEquipment = lineItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    AdvancedLogger.info('Equipment costs calculated', {
      lineItemCount: lineItems.length,
      totalEquipment,
    });

    return lineItems;
  }

  /**
   * Generate complete cost estimate with all calculations
   */
  static generateEstimate(
    laborInputs: LaborInput[],
    materialInputs: MaterialInput[],
    equipmentInputs: EquipmentInput[],
    context: EstimationContext
  ): CostEstimate {
    const correlationId = AdvancedLogger.setCorrelationId();

    AdvancedLogger.info('Generating complete cost estimate', {
      laborItems: laborInputs.length,
      materialItems: materialInputs.length,
      equipmentItems: equipmentInputs.length,
      state: context.state,
    });

    const startTime = Date.now();

    // Calculate each category
    const laborLineItems = this.calculateLaborCosts(laborInputs, context);
    const materialLineItems = this.calculateMaterialCosts(
      materialInputs,
      context
    );
    const equipmentLineItems = this.calculateEquipmentCosts(
      equipmentInputs,
      context
    );

    // Calculate subtotals
    const laborSubtotal = laborLineItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    const materialSubtotal = materialLineItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    const equipmentSubtotal = equipmentLineItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const subtotal = laborSubtotal + materialSubtotal + equipmentSubtotal;

    // Calculate GST (10% in Australia)
    const gst = PricingDatabaseService.calculateGST(subtotal);
    const totalIncludingGST = subtotal + gst;

    // Calculate deposits
    const depositsRequired = equipmentLineItems.reduce(
      (sum, item) => sum + item.depositRequired,
      0
    );
    const depositsReturned = equipmentLineItems
      .filter((item) => item.depositReturned)
      .reduce((sum, item) => sum + item.depositRequired, 0);
    const netDeposits = depositsRequired - depositsReturned;

    // Build complete estimate
    const estimate: CostEstimate = {
      laborLineItems,
      materialLineItems,
      equipmentLineItems,
      totals: {
        laborSubtotal: Number(laborSubtotal.toFixed(2)),
        materialSubtotal: Number(materialSubtotal.toFixed(2)),
        equipmentSubtotal: Number(equipmentSubtotal.toFixed(2)),
        subtotal: Number(subtotal.toFixed(2)),
        gst: Number(gst.toFixed(2)),
        totalIncludingGST: Number(totalIncludingGST.toFixed(2)),
        depositsRequired: Number(depositsRequired.toFixed(2)),
        depositsReturned: Number(depositsReturned.toFixed(2)),
        netDeposits: Number(netDeposits.toFixed(2)),
      },
      metadata: {
        state: context.state,
        projectSize: context.projectSize,
        damageType: context.damageType,
        urgency: context.urgency,
        estimatedBy: context.estimatedBy,
        estimatedAt: new Date(),
        validUntil: context.validityDays
          ? new Date(Date.now() + context.validityDays * 24 * 60 * 60 * 1000)
          : undefined,
      },
    };

    const duration = Date.now() - startTime;

    AdvancedLogger.info('Cost estimate generated', {
      totalLineItems:
        laborLineItems.length +
        materialLineItems.length +
        equipmentLineItems.length,
      subtotal: estimate.totals.subtotal,
      totalIncludingGST: estimate.totals.totalIncludingGST,
      duration,
    });

    return estimate;
  }

  /**
   * Generate recommended estimate based on damage assessment
   */
  static generateRecommendedEstimate(
    damageType: 'WATER' | 'FIRE' | 'MOLD',
    projectSize: 'SMALL' | 'MEDIUM' | 'LARGE' | 'COMMERCIAL',
    affectedArea: number, // in square meters
    context: EstimationContext
  ): CostEstimate {
    const correlationId = AdvancedLogger.setCorrelationId();

    AdvancedLogger.info('Generating recommended estimate', {
      damageType,
      projectSize,
      affectedArea,
      state: context.state,
    });

    // Recommended labor based on project size and damage type
    const laborInputs: LaborInput[] = [];

    if (damageType === 'WATER') {
      laborInputs.push(
        {
          iicrcLevel: 'WRT',
          hours: projectSize === 'SMALL' ? 8 : projectSize === 'MEDIUM' ? 16 : 32,
          workType: context.urgency === 'EMERGENCY' ? 'EMERGENCY' : 'REGULAR',
          description: 'Water extraction and initial drying',
        },
        {
          iicrcLevel: 'TECHNICIAN',
          hours: projectSize === 'SMALL' ? 16 : projectSize === 'MEDIUM' ? 32 : 64,
          workType: 'REGULAR',
          description: 'Structural drying and monitoring',
        }
      );
    } else if (damageType === 'FIRE') {
      laborInputs.push(
        {
          iicrcLevel: 'FSRT',
          hours: projectSize === 'SMALL' ? 12 : projectSize === 'MEDIUM' ? 24 : 48,
          workType: 'REGULAR',
          description: 'Smoke and soot removal',
        },
        {
          iicrcLevel: 'TECHNICIAN',
          hours: projectSize === 'SMALL' ? 16 : projectSize === 'MEDIUM' ? 32 : 64,
          workType: 'REGULAR',
          description: 'Deodorization and cleaning',
        }
      );
    } else if (damageType === 'MOLD') {
      laborInputs.push(
        {
          iicrcLevel: 'AMRT',
          hours: projectSize === 'SMALL' ? 16 : projectSize === 'MEDIUM' ? 32 : 64,
          workType: 'REGULAR',
          description: 'Mold remediation and containment',
        },
        {
          iicrcLevel: 'SUPERVISOR',
          hours: projectSize === 'SMALL' ? 4 : projectSize === 'MEDIUM' ? 8 : 16,
          workType: 'REGULAR',
          description: 'Supervision and quality control',
        }
      );
    }

    // Recommended materials based on damage type and area
    const materialInputs: MaterialInput[] = [];

    if (damageType === 'WATER' || damageType === 'MOLD') {
      materialInputs.push(
        {
          materialId: 'MAT-ANTIMICROBIAL-001',
          quantity: Math.ceil(affectedArea / 10), // 1L per 10 sqm
        },
        {
          materialId: 'MAT-DESICCANT-001',
          quantity: Math.ceil(affectedArea / 50), // 1 bag per 50 sqm
        }
      );
    }

    if (damageType === 'FIRE') {
      materialInputs.push(
        {
          materialId: 'MAT-ODOR-NEUTRALIZER-001',
          quantity: Math.ceil(affectedArea / 15),
        },
        {
          materialId: 'MAT-PAINT-001',
          quantity: Math.ceil(affectedArea / 10),
        }
      );
    }

    // Safety equipment for all projects
    materialInputs.push({
      materialId: 'MAT-PPE-SET-001',
      quantity: projectSize === 'SMALL' ? 2 : projectSize === 'MEDIUM' ? 4 : 8,
    });

    // Recommended equipment
    const recommendedEquipmentIds =
      PricingDatabaseService.getRecommendedEquipmentPackage(
        damageType,
        projectSize
      );

    const equipmentInputs: EquipmentInput[] = recommendedEquipmentIds.map(
      (equipmentId) => ({
        equipmentId,
        daysRented:
          projectSize === 'SMALL' ? 3 : projectSize === 'MEDIUM' ? 5 : 7,
        rentalPeriod: projectSize === 'COMMERCIAL' ? 'WEEKLY' : 'DAILY',
        depositReturned: false,
      })
    );

    return this.generateEstimate(
      laborInputs,
      materialInputs,
      equipmentInputs,
      context
    );
  }

  /**
   * Compare estimate against historical averages
   */
  static compareToHistoricalAverage(
    estimate: CostEstimate,
    historicalAverage: number
  ): {
    variance: number;
    variancePercentage: number;
    withinRange: boolean;
    rangeThreshold: number;
  } {
    const variance = estimate.totals.totalIncludingGST - historicalAverage;
    const variancePercentage = (variance / historicalAverage) * 100;
    const rangeThreshold = 15; // ±15% is acceptable
    const withinRange = Math.abs(variancePercentage) <= rangeThreshold;

    AdvancedLogger.info('Comparing estimate to historical average', {
      estimateTotal: estimate.totals.totalIncludingGST,
      historicalAverage,
      variance,
      variancePercentage,
      withinRange,
    });

    if (!withinRange) {
      AdvancedLogger.warn('Estimate outside acceptable range', {
        variance,
        variancePercentage,
        rangeThreshold,
      });
    }

    return {
      variance: Number(variance.toFixed(2)),
      variancePercentage: Number(variancePercentage.toFixed(2)),
      withinRange,
      rangeThreshold,
    };
  }

  /**
   * Format estimate as summary string for reports
   */
  static formatEstimateSummary(estimate: CostEstimate): string {
    const lines = [
      '=== COST ESTIMATE SUMMARY ===',
      '',
      `Labor: $${estimate.totals.laborSubtotal.toFixed(2)} (${
        estimate.laborLineItems.length
      } items)`,
      `Materials: $${estimate.totals.materialSubtotal.toFixed(2)} (${
        estimate.materialLineItems.length
      } items)`,
      `Equipment: $${estimate.totals.equipmentSubtotal.toFixed(2)} (${
        estimate.equipmentLineItems.length
      } items)`,
      '',
      `Subtotal (ex GST): $${estimate.totals.subtotal.toFixed(2)}`,
      `GST (10%): $${estimate.totals.gst.toFixed(2)}`,
      `TOTAL (inc GST): $${estimate.totals.totalIncludingGST.toFixed(2)}`,
      '',
      `Equipment Deposits: $${estimate.totals.depositsRequired.toFixed(2)}`,
      `Deposits Returned: $${estimate.totals.depositsReturned.toFixed(2)}`,
      `Net Deposits: $${estimate.totals.netDeposits.toFixed(2)}`,
      '',
      `State: ${estimate.metadata.state}`,
      `Estimated: ${estimate.metadata.estimatedAt.toISOString()}`,
      estimate.metadata.validUntil
        ? `Valid Until: ${estimate.metadata.validUntil.toISOString()}`
        : '',
    ];

    return lines.filter(Boolean).join('\n');
  }
}
