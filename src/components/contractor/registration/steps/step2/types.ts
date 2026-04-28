import type { ContractorOnboardingData } from '@/types/contractor';

export interface Director {
  name: string;
  phone: string;
  email: string;
}

export interface InsuranceDetails {
  professionalIndemnityInsurer: string;
  publicLiabilityInsurer: string;
  piPolicyNumber: string;
  plPolicyNumber: string;
  piExpiryDate: string;
  plExpiryDate: string;
}

export interface TerritorySettings {
  centerAddress: string;
  centerLat?: number;
  centerLng?: number;
  radiusKm: number;
}

/**
 * Shared control surface passed from the orchestrator to each Step 2 sub-section.
 * Mirrors the legacy single-component contract: the `data` / `updateData` /
 * `errors` props from RegistrationWizard plus the local state + handlers
 * surfaced by `useStep2Company`.
 */
export interface Step2Control {
  // Wizard-level data
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;

  // Local state
  directors: Director[];
  insurance: InsuranceDetails;
  setInsurance: React.Dispatch<React.SetStateAction<InsuranceDetails>>;
  territory: TerritorySettings;
  setTerritory: React.Dispatch<React.SetStateAction<TerritorySettings>>;
  certificateFiles: File[];
  logoFile: File | null;
  abnVerified: boolean;
  verifyingAbn: boolean;
  addressVerified: boolean;

  // Handlers
  handleInputChange: (field: string, value: unknown) => void;
  verifyABN: () => Promise<void>;
  verifyAddress: () => Promise<void>;
  updateDirector: (index: number, field: keyof Director, value: string) => void;
  addDirector: () => void;
  removeDirector: (index: number) => void;
  handleCertificateUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeCertificate: (index: number) => void;
}

// Format ABN (XX XXX XXX XXX)
export const formatABN = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 11) {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4').trim();
  }
  return digits.slice(0, 11).replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
};

// Validate ABN using Australian algorithm
export const validateABN = (abn: string): boolean => {
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const abnDigits = abn.replace(/\D/g, '');

  if (abnDigits.length !== 11) return false;

  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const digit = parseInt(abnDigits[i]);
    sum += digit * weights[i];
  }

  return sum % 89 === 0;
};

export const COMPANY_STRUCTURES = [
  { value: 'SOLE_TRADER', label: 'Sole Trader' },
  { value: 'PARTNERSHIP', label: 'Partnership' },
  { value: 'PTY_LTD', label: 'Pty Ltd' },
  { value: 'TRUST', label: 'Trust' },
] as const;

export const AU_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
] as const;

export const TERRITORY_RADIUS_PRESETS = [25, 50, 75, 100, 200] as const;
