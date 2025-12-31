import { calculateGstBreakdown, GstBreakdown } from '@/lib/pricing/gst';

export const NRPG_CALLOUT_TOTAL_AUD = 2750;
export const NRPG_CALLOUT_PLATFORM_FEE_AUD = 550;
export const NRPG_CALLOUT_CONTRACTOR_ENTITLEMENT_AUD = 2200;

export interface NrpgCalloutSplit {
  total: GstBreakdown;
  platformFee: GstBreakdown;
  contractorEntitlement: GstBreakdown;
}

export interface NrpgCalloutPricingOptions {
  totalGstInclusive?: boolean;
  platformFeeGstInclusive?: boolean;
  contractorEntitlementGstInclusive?: boolean;
}

export function getNrpgCalloutSplit(options: NrpgCalloutPricingOptions = {}): NrpgCalloutSplit {
  const totalGstInclusive = options.totalGstInclusive ?? true;
  const platformFeeGstInclusive = options.platformFeeGstInclusive ?? true;
  const contractorEntitlementGstInclusive = options.contractorEntitlementGstInclusive ?? true;

  return {
    total: calculateGstBreakdown(NRPG_CALLOUT_TOTAL_AUD, totalGstInclusive),
    platformFee: calculateGstBreakdown(NRPG_CALLOUT_PLATFORM_FEE_AUD, platformFeeGstInclusive),
    contractorEntitlement: calculateGstBreakdown(
      NRPG_CALLOUT_CONTRACTOR_ENTITLEMENT_AUD,
      contractorEntitlementGstInclusive
    ),
  };
}
