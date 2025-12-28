/**
 * Pricing Database Service
 *
 * Centralized pricing data for NRPG inspection reports
 * - Labor rates by Australian state (QLD/NSW/VIC) and IICRC level
 * - Material prices with state-specific variations
 * - Equipment rental rates
 * - All prices in AUD with GST considerations
 */

import { AustralianState } from '@prisma/client';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';

// ============================================================================
// TYPES
// ============================================================================

export type IICRCLevel = 'WRT' | 'AMRT' | 'FSRT' | 'TECHNICIAN' | 'SUPERVISOR' | 'MASTER';

export interface LaborRate {
  level: IICRCLevel;
  state: AustralianState;
  regularRate: number; // AUD per hour
  overtimeRate: number; // AUD per hour (after 8 hours)
  weekendRate: number; // AUD per hour (Saturday/Sunday)
  emergencyRate: number; // AUD per hour (24/7 emergency)
  description: string;
}

export interface MaterialPrice {
  materialId: string;
  name: string;
  category: 'CHEMICAL' | 'STRUCTURAL' | 'EQUIPMENT_CONSUMABLE' | 'SAFETY';
  unit: 'LITRE' | 'GALLON' | 'SQFT' | 'SQM' | 'UNIT' | 'KG';
  basePrice: number; // AUD
  statePricing?: Partial<Record<AustralianState, number>>;
  description: string;
  suppliers?: string[];
}

export interface EquipmentRentalRate {
  equipmentId: string;
  name: string;
  category: 'EXTRACTION' | 'DRYING' | 'MONITORING' | 'SAFETY' | 'SPECIALTY';
  dailyRate: number; // AUD per day
  weeklyRate: number; // AUD per week (discounted)
  monthlyRate: number; // AUD per month (discounted)
  depositRequired: number; // AUD
  maintenanceFee?: number; // AUD per use
  description: string;
}

export interface PricingContext {
  state: AustralianState;
  urgency?: 'STANDARD' | 'URGENT' | 'EMERGENCY';
  dateOfService?: Date;
  projectSize?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'COMMERCIAL';
}

// ============================================================================
// LABOR RATES DATABASE
// ============================================================================

const LABOR_RATES: LaborRate[] = [
  // Queensland (QLD) Rates
  {
    level: 'WRT',
    state: AustralianState.QLD,
    regularRate: 65.00,
    overtimeRate: 97.50,
    weekendRate: 81.25,
    emergencyRate: 130.00,
    description: 'Water Restoration Technician - QLD certified',
  },
  {
    level: 'AMRT',
    state: AustralianState.QLD,
    regularRate: 85.00,
    overtimeRate: 127.50,
    weekendRate: 106.25,
    emergencyRate: 170.00,
    description: 'Applied Microbial Remediation Technician - QLD certified',
  },
  {
    level: 'FSRT',
    state: AustralianState.QLD,
    regularRate: 75.00,
    overtimeRate: 112.50,
    weekendRate: 93.75,
    emergencyRate: 150.00,
    description: 'Fire & Smoke Restoration Technician - QLD certified',
  },
  {
    level: 'TECHNICIAN',
    state: AustralianState.QLD,
    regularRate: 55.00,
    overtimeRate: 82.50,
    weekendRate: 68.75,
    emergencyRate: 110.00,
    description: 'General Restoration Technician - QLD',
  },
  {
    level: 'SUPERVISOR',
    state: AustralianState.QLD,
    regularRate: 95.00,
    overtimeRate: 142.50,
    weekendRate: 118.75,
    emergencyRate: 190.00,
    description: 'Site Supervisor - QLD certified',
  },
  {
    level: 'MASTER',
    state: AustralianState.QLD,
    regularRate: 120.00,
    overtimeRate: 180.00,
    weekendRate: 150.00,
    emergencyRate: 240.00,
    description: 'Master Restoration Technician - QLD',
  },

  // New South Wales (NSW) Rates (typically 5-10% higher than QLD)
  {
    level: 'WRT',
    state: AustralianState.NSW,
    regularRate: 70.00,
    overtimeRate: 105.00,
    weekendRate: 87.50,
    emergencyRate: 140.00,
    description: 'Water Restoration Technician - NSW certified',
  },
  {
    level: 'AMRT',
    state: AustralianState.NSW,
    regularRate: 90.00,
    overtimeRate: 135.00,
    weekendRate: 112.50,
    emergencyRate: 180.00,
    description: 'Applied Microbial Remediation Technician - NSW certified',
  },
  {
    level: 'FSRT',
    state: AustralianState.NSW,
    regularRate: 80.00,
    overtimeRate: 120.00,
    weekendRate: 100.00,
    emergencyRate: 160.00,
    description: 'Fire & Smoke Restoration Technician - NSW certified',
  },
  {
    level: 'TECHNICIAN',
    state: AustralianState.NSW,
    regularRate: 60.00,
    overtimeRate: 90.00,
    weekendRate: 75.00,
    emergencyRate: 120.00,
    description: 'General Restoration Technician - NSW',
  },
  {
    level: 'SUPERVISOR',
    state: AustralianState.NSW,
    regularRate: 105.00,
    overtimeRate: 157.50,
    weekendRate: 131.25,
    emergencyRate: 210.00,
    description: 'Site Supervisor - NSW certified',
  },
  {
    level: 'MASTER',
    state: AustralianState.NSW,
    regularRate: 130.00,
    overtimeRate: 195.00,
    weekendRate: 162.50,
    emergencyRate: 260.00,
    description: 'Master Restoration Technician - NSW',
  },

  // Victoria (VIC) Rates (similar to NSW)
  {
    level: 'WRT',
    state: AustralianState.VIC,
    regularRate: 68.00,
    overtimeRate: 102.00,
    weekendRate: 85.00,
    emergencyRate: 136.00,
    description: 'Water Restoration Technician - VIC certified',
  },
  {
    level: 'AMRT',
    state: AustralianState.VIC,
    regularRate: 88.00,
    overtimeRate: 132.00,
    weekendRate: 110.00,
    emergencyRate: 176.00,
    description: 'Applied Microbial Remediation Technician - VIC certified',
  },
  {
    level: 'FSRT',
    state: AustralianState.VIC,
    regularRate: 78.00,
    overtimeRate: 117.00,
    weekendRate: 97.50,
    emergencyRate: 156.00,
    description: 'Fire & Smoke Restoration Technician - VIC certified',
  },
  {
    level: 'TECHNICIAN',
    state: AustralianState.VIC,
    regularRate: 58.00,
    overtimeRate: 87.00,
    weekendRate: 72.50,
    emergencyRate: 116.00,
    description: 'General Restoration Technician - VIC',
  },
  {
    level: 'SUPERVISOR',
    state: AustralianState.VIC,
    regularRate: 100.00,
    overtimeRate: 150.00,
    weekendRate: 125.00,
    emergencyRate: 200.00,
    description: 'Site Supervisor - VIC certified',
  },
  {
    level: 'MASTER',
    state: AustralianState.VIC,
    regularRate: 125.00,
    overtimeRate: 187.50,
    weekendRate: 156.25,
    emergencyRate: 250.00,
    description: 'Master Restoration Technician - VIC',
  },
];

// ============================================================================
// MATERIAL PRICES DATABASE
// ============================================================================

const MATERIAL_PRICES: MaterialPrice[] = [
  // Chemicals
  {
    materialId: 'MAT-ANTIMICROBIAL-001',
    name: 'Antimicrobial Treatment (Professional Grade)',
    category: 'CHEMICAL',
    unit: 'LITRE',
    basePrice: 45.00,
    statePricing: {
      [AustralianState.NSW]: 48.00,
      [AustralianState.VIC]: 47.00,
      [AustralianState.QLD]: 45.00,
    },
    description: 'Hospital-grade antimicrobial for Category 2 & 3 water damage',
    suppliers: ['IICRC Supplies Australia', 'Pro Restoration Products'],
  },
  {
    materialId: 'MAT-DESICCANT-001',
    name: 'Industrial Desiccant (50kg bag)',
    category: 'CHEMICAL',
    unit: 'KG',
    basePrice: 120.00,
    description: 'High-capacity moisture absorber for structural drying',
    suppliers: ['Drying Solutions AU', 'Restoration Warehouse'],
  },
  {
    materialId: 'MAT-DISINFECTANT-001',
    name: 'EPA-Registered Disinfectant',
    category: 'CHEMICAL',
    unit: 'LITRE',
    basePrice: 35.00,
    description: 'Broad-spectrum disinfectant for Category 3 water',
    suppliers: ['ChemDry AU', 'Restoration Supplies'],
  },
  {
    materialId: 'MAT-ODOR-NEUTRALIZER-001',
    name: 'Enzyme-Based Odor Neutralizer',
    category: 'CHEMICAL',
    unit: 'LITRE',
    basePrice: 55.00,
    statePricing: {
      [AustralianState.NSW]: 58.00,
      [AustralianState.VIC]: 57.00,
    },
    description: 'Bio-enzymatic odor elimination for smoke and mold',
    suppliers: ['OdorTech Australia', 'Pro Restoration Products'],
  },

  // Structural Materials
  {
    materialId: 'MAT-CARPET-PAD-001',
    name: 'Carpet Padding Replacement',
    category: 'STRUCTURAL',
    unit: 'SQM',
    basePrice: 18.00,
    statePricing: {
      [AustralianState.NSW]: 20.00,
      [AustralianState.VIC]: 19.00,
      [AustralianState.QLD]: 18.00,
    },
    description: 'High-density polyurethane carpet underlay',
    suppliers: ['Carpet Court', 'Bunnings Trade'],
  },
  {
    materialId: 'MAT-DRYWALL-001',
    name: 'Plasterboard/Drywall (Standard)',
    category: 'STRUCTURAL',
    unit: 'SQM',
    basePrice: 12.50,
    statePricing: {
      [AustralianState.NSW]: 13.50,
      [AustralianState.VIC]: 13.00,
      [AustralianState.QLD]: 12.50,
    },
    description: 'Standard 10mm plasterboard for wall replacement',
    suppliers: ['Bunnings', 'Mitre 10', 'CSR Gyprock'],
  },
  {
    materialId: 'MAT-INSULATION-001',
    name: 'Thermal Insulation (R2.5)',
    category: 'STRUCTURAL',
    unit: 'SQM',
    basePrice: 8.50,
    description: 'Ceiling and wall insulation batts',
    suppliers: ['Bunnings', 'Insulation Warehouse'],
  },
  {
    materialId: 'MAT-PAINT-001',
    name: 'Interior Paint (Mold-Resistant)',
    category: 'STRUCTURAL',
    unit: 'LITRE',
    basePrice: 65.00,
    statePricing: {
      [AustralianState.NSW]: 68.00,
      [AustralianState.VIC]: 67.00,
    },
    description: 'Low-VOC mold-resistant interior paint',
    suppliers: ['Dulux', 'Taubmans', 'Bunnings'],
  },

  // Equipment Consumables
  {
    materialId: 'MAT-AIR-FILTER-001',
    name: 'HEPA Air Filtration Cartridge',
    category: 'EQUIPMENT_CONSUMABLE',
    unit: 'UNIT',
    basePrice: 85.00,
    description: 'Replacement HEPA filter for air scrubbers',
    suppliers: ['HEPA Solutions', 'Restoration Equipment AU'],
  },
  {
    materialId: 'MAT-MOISTURE-MAP-001',
    name: 'Moisture Mapping Survey Kit',
    category: 'EQUIPMENT_CONSUMABLE',
    unit: 'UNIT',
    basePrice: 120.00,
    description: 'Includes thermal imaging and moisture meter readings',
  },

  // Safety Equipment
  {
    materialId: 'MAT-PPE-SET-001',
    name: 'Personal Protective Equipment Set',
    category: 'SAFETY',
    unit: 'UNIT',
    basePrice: 45.00,
    description: 'Full PPE kit: gloves, mask, suit, goggles',
    suppliers: ['SafetyQuip', 'ProChoice Safety Gear'],
  },
  {
    materialId: 'MAT-CONTAINMENT-001',
    name: 'Containment Barrier (Poly Sheeting)',
    category: 'SAFETY',
    unit: 'SQM',
    basePrice: 3.50,
    description: '6mil polyethylene containment barrier',
    suppliers: ['Bunnings', 'Restoration Supplies'],
  },
];

// ============================================================================
// EQUIPMENT RENTAL RATES DATABASE
// ============================================================================

const EQUIPMENT_RENTAL_RATES: EquipmentRentalRate[] = [
  // Extraction Equipment
  {
    equipmentId: 'EQ-EXTRACTOR-TRUCK-001',
    name: 'Truck-Mounted Extraction System',
    category: 'EXTRACTION',
    dailyRate: 450.00,
    weeklyRate: 2700.00,
    monthlyRate: 9000.00,
    depositRequired: 2000.00,
    maintenanceFee: 150.00,
    description: 'High-powered truck-mounted water extraction',
  },
  {
    equipmentId: 'EQ-EXTRACTOR-PORTABLE-001',
    name: 'Portable Water Extractor (Commercial)',
    category: 'EXTRACTION',
    dailyRate: 120.00,
    weeklyRate: 700.00,
    monthlyRate: 2400.00,
    depositRequired: 500.00,
    description: 'Portable 12-gallon water extraction unit',
  },

  // Drying Equipment
  {
    equipmentId: 'EQ-AIR-MOVER-001',
    name: 'High-Velocity Air Mover',
    category: 'DRYING',
    dailyRate: 35.00,
    weeklyRate: 200.00,
    monthlyRate: 700.00,
    depositRequired: 150.00,
    description: '3-speed axial air mover for structural drying',
  },
  {
    equipmentId: 'EQ-DEHUMIDIFIER-LGR-001',
    name: 'LGR Dehumidifier (Large)',
    category: 'DRYING',
    dailyRate: 85.00,
    weeklyRate: 500.00,
    monthlyRate: 1700.00,
    depositRequired: 400.00,
    maintenanceFee: 50.00,
    description: 'Low-grain refrigerant dehumidifier (150 pints/day)',
  },
  {
    equipmentId: 'EQ-DEHUMIDIFIER-STD-001',
    name: 'Standard Dehumidifier (Medium)',
    category: 'DRYING',
    dailyRate: 45.00,
    weeklyRate: 250.00,
    monthlyRate: 850.00,
    depositRequired: 200.00,
    description: 'Commercial dehumidifier (70 pints/day)',
  },
  {
    equipmentId: 'EQ-AIR-SCRUBBER-001',
    name: 'HEPA Air Scrubber/Negative Air Machine',
    category: 'DRYING',
    dailyRate: 95.00,
    weeklyRate: 550.00,
    monthlyRate: 1900.00,
    depositRequired: 450.00,
    description: 'HEPA-filtered negative air machine for containment',
  },

  // Monitoring Equipment
  {
    equipmentId: 'EQ-MOISTURE-METER-001',
    name: 'Professional Moisture Meter',
    category: 'MONITORING',
    dailyRate: 25.00,
    weeklyRate: 140.00,
    monthlyRate: 480.00,
    depositRequired: 300.00,
    description: 'Pin and pinless moisture detection system',
  },
  {
    equipmentId: 'EQ-THERMAL-CAMERA-001',
    name: 'Thermal Imaging Camera',
    category: 'MONITORING',
    dailyRate: 150.00,
    weeklyRate: 900.00,
    monthlyRate: 3200.00,
    depositRequired: 1500.00,
    description: 'High-resolution thermal imaging for moisture detection',
  },
  {
    equipmentId: 'EQ-HYGROMETER-001',
    name: 'Digital Thermo-Hygrometer',
    category: 'MONITORING',
    dailyRate: 15.00,
    weeklyRate: 80.00,
    monthlyRate: 270.00,
    depositRequired: 100.00,
    description: 'Temperature and humidity monitoring device',
  },

  // Specialty Equipment
  {
    equipmentId: 'EQ-OZONE-GENERATOR-001',
    name: 'Ozone Generator (Odor Removal)',
    category: 'SPECIALTY',
    dailyRate: 75.00,
    weeklyRate: 420.00,
    monthlyRate: 1400.00,
    depositRequired: 350.00,
    description: 'Industrial ozone generator for odor neutralization',
  },
  {
    equipmentId: 'EQ-HYDROXYL-GENERATOR-001',
    name: 'Hydroxyl Radical Generator',
    category: 'SPECIALTY',
    dailyRate: 95.00,
    weeklyRate: 550.00,
    monthlyRate: 1900.00,
    depositRequired: 450.00,
    description: 'Safe continuous odor and chemical neutralization',
  },
  {
    equipmentId: 'EQ-INJECT-DRY-001',
    name: 'Injection Drying System',
    category: 'SPECIALTY',
    dailyRate: 200.00,
    weeklyRate: 1200.00,
    monthlyRate: 4200.00,
    depositRequired: 800.00,
    description: 'Wall cavity drying system for structural moisture',
  },
];

// ============================================================================
// PRICING DATABASE SERVICE
// ============================================================================

export class PricingDatabaseService {
  private static readonly GST_RATE = 0.10; // 10% Australian GST

  /**
   * Get labor rate for specific IICRC level and state
   */
  static getLaborRate(
    level: IICRCLevel,
    state: AustralianState,
    workType: 'REGULAR' | 'OVERTIME' | 'WEEKEND' | 'EMERGENCY' = 'REGULAR'
  ): number {
    const correlationId = AdvancedLogger.setCorrelationId();

    const rate = LABOR_RATES.find((r) => r.level === level && r.state === state);

    if (!rate) {
      AdvancedLogger.warn('Labor rate not found, using default', {
        level,
        state,
        workType,
      });
      // Default fallback to QLD WRT regular rate
      return 65.0;
    }

    const hourlyRate =
      workType === 'OVERTIME'
        ? rate.overtimeRate
        : workType === 'WEEKEND'
        ? rate.weekendRate
        : workType === 'EMERGENCY'
        ? rate.emergencyRate
        : rate.regularRate;

    AdvancedLogger.debug('Labor rate retrieved', {
      level,
      state,
      workType,
      hourlyRate,
    });

    return hourlyRate;
  }

  /**
   * Get all labor rates for a specific state
   */
  static getLaborRatesByState(state: AustralianState): LaborRate[] {
    return LABOR_RATES.filter((r) => r.state === state);
  }

  /**
   * Get material price with state-specific pricing
   */
  static getMaterialPrice(
    materialId: string,
    state?: AustralianState
  ): number | null {
    const material = MATERIAL_PRICES.find((m) => m.materialId === materialId);

    if (!material) {
      AdvancedLogger.warn('Material not found', { materialId });
      return null;
    }

    // Use state-specific pricing if available, otherwise use base price
    const price =
      state && material.statePricing?.[state]
        ? material.statePricing[state]!
        : material.basePrice;

    AdvancedLogger.debug('Material price retrieved', {
      materialId,
      materialName: material.name,
      state,
      price,
    });

    return price;
  }

  /**
   * Get material details
   */
  static getMaterial(materialId: string): MaterialPrice | null {
    return MATERIAL_PRICES.find((m) => m.materialId === materialId) || null;
  }

  /**
   * Search materials by category
   */
  static getMaterialsByCategory(
    category: MaterialPrice['category']
  ): MaterialPrice[] {
    return MATERIAL_PRICES.filter((m) => m.category === category);
  }

  /**
   * Get equipment rental rate
   */
  static getEquipmentRate(
    equipmentId: string,
    rentalPeriod: 'DAILY' | 'WEEKLY' | 'MONTHLY' = 'DAILY'
  ): number | null {
    const equipment = EQUIPMENT_RENTAL_RATES.find(
      (e) => e.equipmentId === equipmentId
    );

    if (!equipment) {
      AdvancedLogger.warn('Equipment not found', { equipmentId });
      return null;
    }

    const rate =
      rentalPeriod === 'WEEKLY'
        ? equipment.weeklyRate
        : rentalPeriod === 'MONTHLY'
        ? equipment.monthlyRate
        : equipment.dailyRate;

    AdvancedLogger.debug('Equipment rate retrieved', {
      equipmentId,
      equipmentName: equipment.name,
      rentalPeriod,
      rate,
    });

    return rate;
  }

  /**
   * Get equipment details
   */
  static getEquipment(equipmentId: string): EquipmentRentalRate | null {
    return (
      EQUIPMENT_RENTAL_RATES.find((e) => e.equipmentId === equipmentId) || null
    );
  }

  /**
   * Get equipment by category
   */
  static getEquipmentByCategory(
    category: EquipmentRentalRate['category']
  ): EquipmentRentalRate[] {
    return EQUIPMENT_RENTAL_RATES.filter((e) => e.category === category);
  }

  /**
   * Calculate GST on amount
   */
  static calculateGST(amountExcludingGST: number): number {
    return Number((amountExcludingGST * this.GST_RATE).toFixed(2));
  }

  /**
   * Calculate total with GST
   */
  static calculateTotalWithGST(amountExcludingGST: number): number {
    return Number((amountExcludingGST * (1 + this.GST_RATE)).toFixed(2));
  }

  /**
   * Get all available materials
   */
  static getAllMaterials(): MaterialPrice[] {
    return [...MATERIAL_PRICES];
  }

  /**
   * Get all available equipment
   */
  static getAllEquipment(): EquipmentRentalRate[] {
    return [...EQUIPMENT_RENTAL_RATES];
  }

  /**
   * Get complete pricing context for estimate generation
   */
  static getPricingContext(context: PricingContext): {
    laborRates: LaborRate[];
    materials: MaterialPrice[];
    equipment: EquipmentRentalRate[];
    gstRate: number;
  } {
    AdvancedLogger.info('Building pricing context', context);

    return {
      laborRates: this.getLaborRatesByState(context.state),
      materials: MATERIAL_PRICES.map((m) => ({
        ...m,
        effectivePrice:
          m.statePricing?.[context.state] ?? m.basePrice,
      })) as MaterialPrice[],
      equipment: [...EQUIPMENT_RENTAL_RATES],
      gstRate: this.GST_RATE,
    };
  }

  /**
   * Calculate recommended equipment package for project size
   */
  static getRecommendedEquipmentPackage(
    damageType: 'WATER' | 'FIRE' | 'MOLD',
    projectSize: 'SMALL' | 'MEDIUM' | 'LARGE' | 'COMMERCIAL'
  ): string[] {
    const packages: Record<string, Record<string, string[]>> = {
      WATER: {
        SMALL: [
          'EQ-EXTRACTOR-PORTABLE-001',
          'EQ-AIR-MOVER-001',
          'EQ-DEHUMIDIFIER-STD-001',
          'EQ-MOISTURE-METER-001',
        ],
        MEDIUM: [
          'EQ-EXTRACTOR-PORTABLE-001',
          'EQ-AIR-MOVER-001',
          'EQ-DEHUMIDIFIER-LGR-001',
          'EQ-MOISTURE-METER-001',
          'EQ-HYGROMETER-001',
        ],
        LARGE: [
          'EQ-EXTRACTOR-TRUCK-001',
          'EQ-AIR-MOVER-001',
          'EQ-DEHUMIDIFIER-LGR-001',
          'EQ-AIR-SCRUBBER-001',
          'EQ-MOISTURE-METER-001',
          'EQ-THERMAL-CAMERA-001',
        ],
        COMMERCIAL: [
          'EQ-EXTRACTOR-TRUCK-001',
          'EQ-AIR-MOVER-001',
          'EQ-DEHUMIDIFIER-LGR-001',
          'EQ-AIR-SCRUBBER-001',
          'EQ-MOISTURE-METER-001',
          'EQ-THERMAL-CAMERA-001',
          'EQ-INJECT-DRY-001',
        ],
      },
      FIRE: {
        SMALL: ['EQ-AIR-SCRUBBER-001', 'EQ-OZONE-GENERATOR-001'],
        MEDIUM: [
          'EQ-AIR-SCRUBBER-001',
          'EQ-OZONE-GENERATOR-001',
          'EQ-HYDROXYL-GENERATOR-001',
        ],
        LARGE: [
          'EQ-AIR-SCRUBBER-001',
          'EQ-OZONE-GENERATOR-001',
          'EQ-HYDROXYL-GENERATOR-001',
          'EQ-THERMAL-CAMERA-001',
        ],
        COMMERCIAL: [
          'EQ-AIR-SCRUBBER-001',
          'EQ-OZONE-GENERATOR-001',
          'EQ-HYDROXYL-GENERATOR-001',
          'EQ-THERMAL-CAMERA-001',
          'EQ-DEHUMIDIFIER-LGR-001',
        ],
      },
      MOLD: {
        SMALL: ['EQ-AIR-SCRUBBER-001', 'EQ-MOISTURE-METER-001'],
        MEDIUM: [
          'EQ-AIR-SCRUBBER-001',
          'EQ-MOISTURE-METER-001',
          'EQ-HYGROMETER-001',
          'EQ-HYDROXYL-GENERATOR-001',
        ],
        LARGE: [
          'EQ-AIR-SCRUBBER-001',
          'EQ-MOISTURE-METER-001',
          'EQ-THERMAL-CAMERA-001',
          'EQ-HYDROXYL-GENERATOR-001',
          'EQ-DEHUMIDIFIER-LGR-001',
        ],
        COMMERCIAL: [
          'EQ-AIR-SCRUBBER-001',
          'EQ-MOISTURE-METER-001',
          'EQ-THERMAL-CAMERA-001',
          'EQ-HYDROXYL-GENERATOR-001',
          'EQ-DEHUMIDIFIER-LGR-001',
          'EQ-INJECT-DRY-001',
        ],
      },
    };

    return packages[damageType]?.[projectSize] || [];
  }
}
