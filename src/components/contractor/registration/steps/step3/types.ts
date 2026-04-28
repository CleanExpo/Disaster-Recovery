import type { ContractorOnboardingData } from '@/types/contractor';

export interface Step3ComplianceProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

export interface IICRCCertification {
  name: string;
  file: File | null;
  expiryDate: string;
  certNumber?: string;
}

export interface OtherQualification {
  name: string;
  file: File | null;
  issuer?: string;
}

export interface AssociationState {
  name: string;
  file: File | null;
  memberNumber: string;
  expiryDate: string;
}

export interface ValidationStatus {
  cpp40421: boolean;
  iicrc: boolean;
  association: boolean;
  carsi: boolean;
}

export const IICRC_CERT_TYPES = [
  { value: 'WRT', label: 'Water Damage Restoration Technician (WRT)' },
  { value: 'ASD', label: 'Applied Structural Drying (ASD)' },
  { value: 'AMRT', label: 'Applied Microbial Remediation Technician (AMRT)' },
  { value: 'FSRT', label: 'Fire and Smoke Damage Restoration (FSRT)' },
  { value: 'HST', label: 'Health & Safety Technician (HST)' },
  { value: 'OCT', label: 'Odour Control Technician (OCT)' },
  { value: 'RRT', label: 'Carpet Repair & Reinstallation (RRT)' },
  { value: 'UFT', label: 'Upholstery & Fabric Cleaning (UFT)' },
  { value: 'CCT', label: 'Carpet Cleaning Technician (CCT)' },
  { value: 'CUSTOM', label: 'Other IICRC Certification' },
];

export const ASSOCIATION_TYPES = [
  { value: 'RIA', label: 'Restoration Industry Association (RIA)' },
  { value: 'IAQAA', label: 'Indoor Air Quality Association Australia (IAQAA)' },
  { value: 'CCAVIC', label: 'Carpet Cleaners Association VIC' },
  { value: 'CCAWA', label: 'Carpet Cleaners Association WA' },
  { value: 'BSCAA', label: 'Building Service Contractors Association of Australia' },
  { value: 'OTHER', label: 'Other Industry Association' },
];

/**
 * Stable control surface passed to every Step3 sub-component.
 * Bundles state, setters, derived values, and event handlers.
 * No sub-component may import another sub-component; everything flows
 * through this object via the orchestrator (per ADR-009).
 */
export interface Step3Control {
  // Errors
  errors: Record<string, string>;

  // CPP40421
  cpp40421File: File | null;
  cpp40421Number: string;
  cpp40421Issuer: string;
  cpp40421Date: string;
  setCpp40421Number: (v: string) => void;
  setCpp40421Issuer: (v: string) => void;
  setCpp40421Date: (v: string) => void;
  handleCpp40421Upload: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // IICRC
  iicrcCerts: IICRCCertification[];
  updateIicrcCert: (index: number, field: keyof IICRCCertification, value: any) => void;
  addIicrcCert: () => void;
  removeIicrcCert: (index: number) => void;

  // Association
  association: AssociationState;
  setAssociationName: (value: string) => void;
  setAssociationMemberNumber: (value: string) => void;
  setAssociationExpiryDate: (value: string) => void;
  handleAssociationUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // CARSI
  carsiFile: File | null;
  carsiCompletionDate: string;
  carsiScore: string;
  setCarsiCompletionDate: (v: string) => void;
  setCarsiScore: (v: string) => void;
  handleCarsiUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Other qualifications
  otherQualifications: OtherQualification[];
  addOtherQualification: () => void;
  updateOtherQualification: (index: number, field: keyof OtherQualification, value: any) => void;
  removeOtherQualification: (index: number) => void;

  // Validation + score
  validationStatus: ValidationStatus;
  complianceScore: number;
}
