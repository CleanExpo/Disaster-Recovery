// Sub-Contractor System Types
// Ref: DR-592 — Licensed trade engagement within NRPG contractor portal

export type SubContractorTradeType =
  | 'pest_termite'
  | 'plumbing'
  | 'electrical'
  | 'gas_fitting'
  | 'asbestos_removal'
  | 'structural_engineering'
  | 'other';

export const TRADE_TYPE_LABELS: Record<SubContractorTradeType, string> = {
  pest_termite: 'Pest & Termite Management',
  plumbing: 'Plumbing & Drainage',
  electrical: 'Electrical Work',
  gas_fitting: 'Gas Fitting',
  asbestos_removal: 'Asbestos Removal',
  structural_engineering: 'Structural Engineering Assessment',
  other: 'Other Licensed Trade',
};

export const TRADE_TYPE_LICENCE_LABEL: Record<SubContractorTradeType, string> = {
  pest_termite: 'Pest Management Licence',
  plumbing: 'Plumbing Contractor Licence',
  electrical: 'Electrical Contractor Licence',
  gas_fitting: 'Gas Fitting Licence',
  asbestos_removal: 'Asbestos Removal Licence',
  structural_engineering: 'Engineers Australia Registration',
  other: 'Relevant Trade Licence',
};

export type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';

export type SubContractorStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';

export type OnboardingStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'AWAITING_SIGNATURE' | 'COMPLETE' | 'REJECTED';

export type EngagementStatus =
  | 'QUOTED'       // Primary contractor has entered the quote
  | 'PENDING_AGREEMENT' // Sub-contractor invited, agreement not yet signed
  | 'ACTIVE'       // Agreement signed, work authorised
  | 'COMPLETE'     // Sub-contractor marked work done
  | 'INVOICED'     // Invoice captured and added to customer invoice
  | 'CANCELLED';

/** A licensed external sub-contractor registered in the NRPG system */
export interface SubContractor {
  id: string;
  /** ABN of the sub-contractor's business */
  abn: string;
  businessName: string;
  tradingName?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  tradeType: SubContractorTradeType;
  licenceNumber: string;
  licenceState: AustralianState;
  licenceExpiry: string; // ISO date string
  /** Public liability coverage amount in AUD */
  publicLiabilityCoverage: number;
  publicLiabilityInsurer: string;
  publicLiabilityExpiry: string;
  onboardingStatus: OnboardingStatus;
  status: SubContractorStatus;
  agreementSignedAt?: string;
  agreementSignedBy?: string;
  /** ID of the primary NRPG contractor who registered this sub-contractor */
  registeredByContractorId: string;
  createdAt: string;
  updatedAt: string;
}

/** Links a job to a sub-contractor engagement with invoice and markup */
export interface SubContractorEngagement {
  id: string;
  jobId: string;
  subContractorId: string;
  subContractor?: SubContractor;
  primaryContractorId: string;
  tradeType: SubContractorTradeType;
  /** Description of the work scope */
  workScope: string;
  /** Sub-contractor's quoted invoice amount in AUD (excl. GST) */
  subInvoiceAmount: number;
  /** Markup percentage applied — minimum 15 */
  markupPercent: number;
  /** Amount charged to customer = subInvoiceAmount * (1 + markupPercent / 100) */
  customerChargeAmount: number;
  /** GST amount on customer charge */
  gstAmount: number;
  /** customerChargeAmount + gstAmount */
  customerChargeTotalIncGst: number;
  status: EngagementStatus;
  authorisedAt?: string;
  completedAt?: string;
  invoicedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Form values for engaging a sub-contractor on a job */
export interface SubContractorEngagementFormValues {
  subContractorId?: string;
  /** If new sub-contractor — their contact email for the onboarding invite */
  newSubContractorEmail?: string;
  tradeType: SubContractorTradeType;
  workScope: string;
  subInvoiceAmount: number;
  markupPercent: number;
}

/** Form values for sub-contractor onboarding */
export interface SubContractorOnboardingFormValues {
  // Step 1 — Business details
  businessName: string;
  tradingName?: string;
  abn: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;

  // Step 2 — Licence
  tradeType: SubContractorTradeType;
  licenceNumber: string;
  licenceState: AustralianState;
  licenceExpiry: string;

  // Step 3 — Insurance
  publicLiabilityCoverage: number;
  publicLiabilityInsurer: string;
  publicLiabilityExpiry: string;

  // Step 4 — Agreement
  agreementAccepted: boolean;
  electronicSignature: string;
  signatureDate: string;
}

/** Markup calculation result */
export interface MarkupCalculation {
  subInvoiceAmount: number;
  markupPercent: number;
  markupAmount: number;
  customerChargeExGst: number;
  gstAmount: number;
  customerChargeTotalIncGst: number;
}

/** Calculate markup for a sub-contractor engagement */
export function calculateSubContractorMarkup(
  subInvoiceAmount: number,
  markupPercent: number
): MarkupCalculation {
  const clampedMarkup = Math.max(15, markupPercent);
  const markupAmount = subInvoiceAmount * (clampedMarkup / 100);
  const customerChargeExGst = subInvoiceAmount + markupAmount;
  const gstAmount = customerChargeExGst * 0.1;
  const customerChargeTotalIncGst = customerChargeExGst + gstAmount;

  return {
    subInvoiceAmount,
    markupPercent: clampedMarkup,
    markupAmount,
    customerChargeExGst,
    gstAmount,
    customerChargeTotalIncGst,
  };
}

export const MIN_PUBLIC_LIABILITY_AUD = 5_000_000;
