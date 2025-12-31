export const NRPG_CALLOUT_TOTAL_AUD = 2750;
export const NRPG_CALLOUT_PLATFORM_FEE_AUD = 550;
export const NRPG_CALLOUT_CONTRACTOR_ENTITLEMENT_AUD = 2200;

export interface NrpgCalloutSplit {
  totalAUD: number;
  platformFeeAUD: number;
  contractorEntitlementAUD: number;
}

export function getNrpgCalloutSplit(): NrpgCalloutSplit {
  return {
    totalAUD: NRPG_CALLOUT_TOTAL_AUD,
    platformFeeAUD: NRPG_CALLOUT_PLATFORM_FEE_AUD,
    contractorEntitlementAUD: NRPG_CALLOUT_CONTRACTOR_ENTITLEMENT_AUD,
  };
}

