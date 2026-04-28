import type { ContractorOnboardingData } from '@/types/contractor';

export interface Step4BackgroundProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

export interface BusinessReference {
  name: string;
  relationship: string;
  companyName: string;
  phone?: string;
  email: string;
  projectDescription: string;
  canContact: boolean;
}

export interface ProjectSummary {
  projectName: string;
  clientName: string;
  projectType: string;
  completionDate: string;
  projectValue: string;
  description: string;
}

export interface ValidationStatus {
  consents: boolean;
  directorId: boolean;
  references: boolean;
  portfolio: boolean;
}

export type IdVerificationStatus = 'pending' | 'uploaded' | 'verified';

export const RELATIONSHIP_TYPES = [
  'Client - Commercial',
  'Client - Insurance',
  'Client - Residential',
  'Supplier/Vendor',
  'Industry Partner',
  'Insurance Assessor',
  'Property Manager',
  'Facility Manager',
  'Other Professional',
];

export const PROJECT_TYPES = [
  'Water Damage Restoration',
  'Fire & Smoke Restoration',
  'Mould Remediation',
  'Storm/Flood Recovery',
  'Biohazard Cleanup',
  'Contents Restoration',
  'Structural Drying',
  'Carpet & Upholstery',
  'Commercial Cleaning',
  'Emergency Response',
];

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('04')) {
    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3').trim();
  } else if (digits.startsWith('614')) {
    return '+' + digits.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  }
  return value;
};

export interface Step4Control {
  errors: Record<string, string>;

  // Consents
  backgroundCheckConsent: boolean;
  setBackgroundCheckConsent: (v: boolean) => void;
  creditCriminalConsent: boolean;
  setCreditCriminalConsent: (v: boolean) => void;
  dataPrivacyConsent: boolean;
  setDataPrivacyConsent: (v: boolean) => void;
  updateConsents: () => void;

  // Director ID
  directorIdFiles: File[];
  idVerificationStatus: IdVerificationStatus;
  handleDirectorIdUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeDirectorIdFile: (index: number) => void;

  // References
  references: BusinessReference[];
  updateReference: (index: number, field: keyof BusinessReference, value: any) => void;
  addReference: () => void;
  removeReference: (index: number) => void;

  // Portfolio
  projectSummaryFile: File | null;
  projectPhotos: File[];
  recentProjects: ProjectSummary[];
  handleProjectSummaryUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProjectPhotosUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeProjectPhoto: (index: number) => void;
  addRecentProject: () => void;
  updateRecentProject: (index: number, field: keyof ProjectSummary, value: string) => void;
  removeRecentProject: (index: number) => void;

  // Validation
  validationStatus: ValidationStatus;
  calculateCompletion: () => number;
}
