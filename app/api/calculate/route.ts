import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const MINIMUM_EX_GST = 2750;
const GST_RATE = 0.1;

const requestSchema = z.object({
  job_type: z.enum(['water_damage', 'mould_remediation', 'fire_smoke', 'storm_damage', 'biohazard']),
  inputs: z.record(z.any())
});

type JobType = z.infer<typeof requestSchema>['job_type'];

type LineItem = {
  name: string;
  quantity: number;
  unit_rate: number;
  subtotal: number;
  rate_source: 'NRPG';
};

type CalculationResult = {
  job_type: JobType;
  inputs_received: Record<string, unknown>;
  items: LineItem[];
  subtotal_ex_gst: number;
  gst_amount: number;
  total_inc_gst: number;
  minimum_applied: boolean;
  validation_band: { p25: number; median: number; p75: number };
};

function toBool(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true' || value === 'on' || value === '1';
  return false;
}

function toNum(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(parsed, 0);
}

function clampArea(area: number): number {
  // Cap large accidental inputs while still allowing very large jobs.
  return Math.min(Math.max(area, 0), 100000);
}

function totals(
  items: LineItem[],
  validationBand: CalculationResult['validation_band']
): Omit<CalculationResult, 'job_type' | 'inputs_received'> {
  const rawSubtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const subtotalExGst = Math.max(rawSubtotal, MINIMUM_EX_GST);
  const gstAmount = Number((subtotalExGst * GST_RATE).toFixed(2));
  const totalIncGst = Number((subtotalExGst + gstAmount).toFixed(2));

  return {
    items,
    subtotal_ex_gst: Number(subtotalExGst.toFixed(2)),
    gst_amount: gstAmount,
    total_inc_gst: totalIncGst,
    minimum_applied: subtotalExGst === MINIMUM_EX_GST,
    validation_band: validationBand
  };
}

function calculateWaterDamage(inputs: Record<string, unknown>): CalculationResult {
  const area = clampArea(toNum(inputs.area_m2));
  const rooms = toNum(inputs.affected_rooms);
  const dryingDays = toNum(inputs.days_drying);

  const extractionRate = 18;
  const roomRate = 120;
  const dryingRate = 80;

  const result = totals([
    { name: 'Water extraction', quantity: area, unit_rate: extractionRate, subtotal: area * extractionRate, rate_source: 'NRPG' },
    { name: 'Affected room complexity', quantity: rooms, unit_rate: roomRate, subtotal: rooms * roomRate, rate_source: 'NRPG' },
    { name: 'Drying day allowance', quantity: dryingDays, unit_rate: dryingRate, subtotal: dryingDays * dryingRate, rate_source: 'NRPG' }
  ], { p25: 3024, median: 8671, p75: 9557 });

  return { job_type: 'water_damage', inputs_received: inputs, ...result };
}

function calculateMouldRemediation(inputs: Record<string, unknown>): CalculationResult {
  const area = clampArea(toNum(inputs.area_m2));
  const containmentRequired = toBool(inputs.containment_required);

  const baseRate = 22;
  const containmentFee = containmentRequired ? 850 : 0;

  const result = totals([
    { name: 'Mould remediation', quantity: area, unit_rate: baseRate, subtotal: area * baseRate, rate_source: 'NRPG' },
    { name: 'Containment setup', quantity: containmentRequired ? 1 : 0, unit_rate: 850, subtotal: containmentFee, rate_source: 'NRPG' }
  ], { p25: 3290, median: 7450, p75: 11820 });

  return { job_type: 'mould_remediation', inputs_received: inputs, ...result };
}

function calculateFireSmoke(inputs: Record<string, unknown>): CalculationResult {
  const area = clampArea(toNum(inputs.area_m2));
  const rooms = toNum(inputs.affected_rooms);
  const hasOdourTreatment = toBool(inputs.has_odour_treatment);

  const baseRate = 26;
  const roomRate = 150;
  const odourFee = hasOdourTreatment ? 1500 : 0;

  const result = totals([
    { name: 'Fire/smoke restoration', quantity: area, unit_rate: baseRate, subtotal: area * baseRate, rate_source: 'NRPG' },
    { name: 'Room-level remediation', quantity: rooms, unit_rate: roomRate, subtotal: rooms * roomRate, rate_source: 'NRPG' },
    { name: 'Odour treatment', quantity: hasOdourTreatment ? 1 : 0, unit_rate: 1500, subtotal: odourFee, rate_source: 'NRPG' }
  ], { p25: 4120, median: 10240, p75: 18500 });

  return { job_type: 'fire_smoke', inputs_received: inputs, ...result };
}

function calculateStormDamage(inputs: Record<string, unknown>): CalculationResult {
  const area = clampArea(toNum(inputs.area_m2));
  const roofDamage = toBool(inputs.roof_damage);
  const structuralAssessment = toBool(inputs.structural_assessment);

  const baseRate = 20;
  const roofFee = roofDamage ? 1800 : 0;
  const structuralFee = structuralAssessment ? 950 : 0;

  const result = totals([
    { name: 'Storm damage restoration', quantity: area, unit_rate: baseRate, subtotal: area * baseRate, rate_source: 'NRPG' },
    { name: 'Roof damage response', quantity: roofDamage ? 1 : 0, unit_rate: 1800, subtotal: roofFee, rate_source: 'NRPG' },
    { name: 'Structural assessment', quantity: structuralAssessment ? 1 : 0, unit_rate: 950, subtotal: structuralFee, rate_source: 'NRPG' }
  ], { p25: 3650, median: 9120, p75: 16780 });

  return { job_type: 'storm_damage', inputs_received: inputs, ...result };
}

function calculateBiohazard(inputs: Record<string, unknown>): CalculationResult {
  const area = clampArea(toNum(inputs.area_m2));
  const hazardLevelRaw = String(inputs.hazard_level || 'Medium').toLowerCase();
  const hazardMultiplier = hazardLevelRaw === 'high' ? 1.6 : hazardLevelRaw === 'low' ? 1 : 1.25;

  const baseRate = 30;
  const adjustedRate = Number((baseRate * hazardMultiplier).toFixed(2));

  const result = totals([
    { name: 'Biohazard/sewage remediation', quantity: area, unit_rate: adjustedRate, subtotal: area * adjustedRate, rate_source: 'NRPG' }
  ], { p25: 4500, median: 11900, p75: 22100 });

  return { job_type: 'biohazard', inputs_received: inputs, ...result };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide valid job_type and inputs.' },
        { status: 400 }
      );
    }

    const { job_type, inputs } = parsed.data;
    const calculators: Record<JobType, (input: Record<string, unknown>) => CalculationResult> = {
      water_damage: calculateWaterDamage,
      mould_remediation: calculateMouldRemediation,
      fire_smoke: calculateFireSmoke,
      storm_damage: calculateStormDamage,
      biohazard: calculateBiohazard
    };

    const calculationResult = calculators[job_type](inputs);
    return NextResponse.json(calculationResult);
  } catch {
    return NextResponse.json(
      { error: 'Calculation service is temporarily unavailable.' },
      { status: 500 }
    );
  }
}
