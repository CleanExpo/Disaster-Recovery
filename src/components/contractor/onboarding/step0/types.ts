// Step 0 — Eligibility shared types + constants
// Extracted from Step0Eligibility.tsx per ADR-009.

export type AssociationChoice = 'ria' | 'ccavic' | 'ccawa' | 'srcp' | 'other';

export interface AssociationOption {
  id: AssociationChoice;
  label: string;
  fullName: string;
  membershipUrl: string;
  loginUrl: string;
  verifyUrl?: string;
  states?: string[];
}

export const ASSOCIATION_OPTIONS: AssociationOption[] = [
  {
    id: 'ria',
    label: 'RIA',
    fullName: 'Restoration Industry Association (Australasian Chapter)',
    membershipUrl: 'https://www.restorationindustry.org.au/join/join-today/',
    loginUrl: 'https://www.restorationindustry.org.au/member-area/',
    verifyUrl: 'https://www.restorationindustry.org.au/resources/find-a-member/',
  },
  {
    id: 'srcp',
    label: 'SRCP',
    fullName: 'Specialised Restoration & Cleaning Professionals (national)',
    membershipUrl: 'https://srcp.org.au/members/',
    loginUrl: 'https://srcp.org.au/login/',
    verifyUrl: 'https://srcp.org.au/find-a-srcp-member/',
  },
  {
    id: 'ccavic',
    label: 'CCAVIC',
    fullName: 'Carpet Cleaning Association of Victoria',
    membershipUrl: 'https://www.ccavic.com.au/application-form/',
    loginUrl: 'https://www.ccavic.com.au/membership/',
    verifyUrl: 'https://www.ccavic.com.au/members/',
    states: ['VIC'],
  },
  {
    id: 'ccawa',
    label: 'CCAWA',
    fullName: 'Carpet Cleaning Association of WA',
    membershipUrl: 'https://carpetcleaningassociationwa.com.au/want-to-be-a-member/',
    loginUrl: 'https://carpetcleaningassociationwa.com.au/',
    verifyUrl: 'https://carpetcleaningassociationwa.com.au/all-technicians/',
    states: ['WA'],
  },
  {
    id: 'other',
    label: 'Other',
    fullName: 'Other Recognised Industry Association',
    membershipUrl: '',
    loginUrl: '',
  },
];

export interface EligibilityData {
  // CARSI
  carsiAccountConfirmed: boolean;
  carsiMemberNumber: string;

  // Industry association
  associationChoice: AssociationChoice | '';
  associationMemberNumber: string;
  associationOtherName?: string;

  // IICRC
  iicrcCertNumber: string;
  iicrcCertCardFrontFileName: string;
  iicrcCertCardFrontDataUrl: string;

  // Experience & declaration
  yearsInBusinessConfirmed: boolean;
  currentMemberDeclaration: boolean;

  // Driver's licence identity verification
  driversLicenceFrontFileName: string;
  driversLicenceFrontDataUrl: string;
  driversLicenceBackFileName: string;
  driversLicenceBackDataUrl: string;
  driversLicenceNumber: string;
  driversLicenceState: string;

  // Business registration verification
  abn: string;
  abnVerified: boolean;
  acn: string;
  registeredBusinessName: string;
  asicVerified: boolean;
}

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf',
];

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export const AUSTRALIAN_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];

export interface Step0Control {
  data: EligibilityData;
  set: <K extends keyof EligibilityData>(key: K, value: EligibilityData[K]) => void;
  onError: (msg: string) => void;
}

export interface Step0SectionProps {
  control: Step0Control;
}
