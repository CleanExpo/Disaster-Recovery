'use client';

// Step 0 — Eligibility Pre-Requisites
// Ref: DR-593 — Contractor application pre-requisite verification
//
// Required before a contractor can begin the 7-step application:
//  1. Active CARSI account (Cleaning and Restoration Science Institute)
//  2. Industry association membership (RIA, CCA Vic, CCAWA, SRCP, or other)
//  3. IICRC certification card (cert number + photo upload)
//  4. 2+ years in business
//  5. Current business member declaration
//  6. Driver's licence — front AND back photo upload
//  7. ASIC / ABN business registration confirmation

import React, { useState, useRef } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Upload,
  AlertCircle,
  Info,
  ChevronRight,
  X,
  Award,
  CreditCard,
  Building2,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AssociationChoice =
  | 'ria'
  | 'ccavic'
  | 'ccawa'
  | 'srcp'
  | 'other';

const ASSOCIATION_OPTIONS: {
  id: AssociationChoice;
  label: string;
  fullName: string;
  membershipUrl: string;
  loginUrl: string;
  verifyUrl?: string;
  states?: string[];
}[] = [
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

// ─── File upload sizes and types ─────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf',
];
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

const AUSTRALIAN_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExternalLinkBtn({ href, label }: { href: string; label: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function RequirementRow({
  satisfied,
  children,
}: {
  satisfied: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
          satisfied
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-700/80 border border-slate-600'
        }`}
      >
        {satisfied && <CheckCircle2 className="h-3.5 w-3.5" />}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

interface FileUploadSlotProps {
  label: string;
  hint: string;
  fileName: string;
  onFileSelected: (name: string, dataUrl: string) => void;
  onFileRemoved: () => void;
  onError: (msg: string) => void;
}

function FileUploadSlot({
  label,
  hint,
  fileName,
  onFileSelected,
  onFileRemoved,
  onError,
}: FileUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      onError(`${label}: upload a JPG, PNG, WEBP, HEIC or PDF file.`);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      onError(`${label}: file must be under 10 MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      onFileSelected(file.name, ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs">
        {label}
        <span className="text-slate-500 ml-1">({hint})</span>
      </Label>

      {fileName ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-900/30 border border-emerald-600/40 rounded-lg text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span className="truncate flex-1 text-xs">{fileName}</span>
          <button
            type="button"
            onClick={() => {
              onFileRemoved();
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="text-emerald-400 hover:text-red-400 transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-4 text-center transition-colors group"
        >
          <Upload className="h-5 w-5 text-slate-500 group-hover:text-blue-400 mx-auto mb-1.5 transition-colors" />
          <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">
            Click to upload
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Step0EligibilityProps {
  onConfirmed: (data: EligibilityData) => void;
}

export default function Step0Eligibility({ onConfirmed }: Step0EligibilityProps) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const [data, setData] = useState<EligibilityData>({
    carsiAccountConfirmed: false,
    carsiMemberNumber: '',
    associationChoice: '',
    associationMemberNumber: '',
    associationOtherName: '',
    iicrcCertNumber: '',
    iicrcCertCardFrontFileName: '',
    iicrcCertCardFrontDataUrl: '',
    yearsInBusinessConfirmed: false,
    currentMemberDeclaration: false,
    driversLicenceFrontFileName: '',
    driversLicenceFrontDataUrl: '',
    driversLicenceBackFileName: '',
    driversLicenceBackDataUrl: '',
    driversLicenceNumber: '',
    driversLicenceState: '',
    abn: '',
    abnVerified: false,
    acn: '',
    registeredBusinessName: '',
    asicVerified: false,
  });

  const set = <K extends keyof EligibilityData>(
    key: K,
    value: EligibilityData[K]
  ) => {
    setValidationError(null);
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // ── Requirement satisfaction checks ─────────────────────────────────────────

  const req1_carsi =
    data.carsiAccountConfirmed && data.carsiMemberNumber.trim().length > 0;

  const req2_association =
    data.associationChoice !== '' &&
    data.associationMemberNumber.trim().length > 0 &&
    (data.associationChoice !== 'other' ||
      (data.associationOtherName?.trim() ?? '').length > 0);

  const req3_iicrc =
    data.iicrcCertNumber.trim().length > 0 &&
    data.iicrcCertCardFrontFileName.length > 0;

  const req4_experience = data.yearsInBusinessConfirmed;

  const req5_declaration = data.currentMemberDeclaration;

  const req6_licence =
    data.driversLicenceFrontFileName.length > 0 &&
    data.driversLicenceBackFileName.length > 0 &&
    data.driversLicenceNumber.trim().length > 0 &&
    data.driversLicenceState.length > 0;

  const req7_business =
    data.abn.replace(/\s/g, '').length === 11 &&
    data.abnVerified &&
    data.registeredBusinessName.trim().length > 0 &&
    data.asicVerified;

  const satisfiedCount = [
    req1_carsi,
    req2_association,
    req3_iicrc,
    req4_experience,
    req5_declaration,
    req6_licence,
    req7_business,
  ].filter(Boolean).length;

  const allSatisfied = satisfiedCount === 7;

  // ── Confirm ──────────────────────────────────────────────────────────────────

  const handleConfirm = () => {
    setValidationError(null);

    if (!req1_carsi) {
      setValidationError('Confirm your CARSI account and provide the account/member number.');
      return;
    }
    if (!req2_association) {
      setValidationError(
        data.associationChoice === ''
          ? 'Select an industry association.'
          : data.associationChoice === 'other' && !data.associationOtherName?.trim()
          ? 'Enter the name of your industry association.'
          : 'Provide your association membership number.'
      );
      return;
    }
    if (!req3_iicrc) {
      setValidationError(
        !data.iicrcCertNumber.trim()
          ? 'Enter your IICRC certification number.'
          : 'Upload a photo of your IICRC certification card.'
      );
      return;
    }
    if (!req4_experience) {
      setValidationError('Confirm the business has been operating for at least 2 years.');
      return;
    }
    if (!req5_declaration) {
      setValidationError('Confirm you are a current member of the applying business.');
      return;
    }
    if (!req6_licence) {
      setValidationError(
        !data.driversLicenceFrontFileName
          ? 'Upload the front of the driver\'s licence.'
          : !data.driversLicenceBackFileName
          ? 'Upload the back of the driver\'s licence.'
          : !data.driversLicenceNumber.trim()
          ? 'Enter the driver\'s licence number.'
          : 'Select the state that issued the driver\'s licence.'
      );
      return;
    }
    if (!req7_business) {
      setValidationError(
        data.abn.replace(/\s/g, '').length !== 11
          ? 'Enter a valid 11-digit ABN.'
          : !data.abnVerified
          ? 'Confirm the ABN has been verified against the ABR.'
          : !data.registeredBusinessName.trim()
          ? 'Enter the ASIC-registered business name.'
          : 'Confirm the business name has been verified against ASIC.'
      );
      return;
    }

    onConfirmed(data);
  };

  const selectedAssociation = ASSOCIATION_OPTIONS.find(
    (a) => a.id === data.associationChoice
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Award className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Eligibility Requirements</h2>
            <p className="text-slate-400 text-sm">
              All 7 requirements below must be confirmed before the application opens.
            </p>
          </div>
        </div>

        <Alert className="mt-4 border-amber-500/30 bg-amber-950/30">
          <Info className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 text-sm">
            NRPG membership is restricted to verified, legitimately registered businesses with active certifications and industry standing. Documents provided here are retained for compliance purposes and are not shared with third parties.
          </AlertDescription>
        </Alert>
      </div>

      {validationError && (
        <Alert className="border-red-500/40 bg-red-900/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200 text-sm">{validationError}</AlertDescription>
        </Alert>
      )}

      {/* ── 1. CARSI ───────────────────────────────────────────────────────────── */}
      <Section
        number={1}
        title="CARSI Account"
        subtitle="Cleaning and Restoration Science Institute — NRPG's primary training partner."
        satisfied={req1_carsi}
        links={[
          { href: 'https://carsi.com.au/membership/', label: 'Subscribe to CARSI' },
          { href: 'https://carsi.com.au/', label: 'CARSI login' },
        ]}
      >
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.carsiAccountConfirmed}
            onChange={(e) => set('carsiAccountConfirmed', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-500"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            Confirm: the business has an active CARSI account.
          </span>
        </label>

        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">CARSI Account / Member Number</Label>
          <Input
            placeholder="e.g. CARSI-12345"
            value={data.carsiMemberNumber}
            onChange={(e) => set('carsiMemberNumber', e.target.value)}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
        </div>
      </Section>

      {/* ── 2. Industry Association ────────────────────────────────────────────── */}
      <Section
        number={2}
        title="Industry Association Membership"
        subtitle="Active membership with a recognised restoration or cleaning industry body."
        satisfied={req2_association}
      >
        <div className="grid sm:grid-cols-2 gap-2">
          {ASSOCIATION_OPTIONS.map((assoc) => {
            const isSelected = data.associationChoice === assoc.id;
            return (
              <button
                key={assoc.id}
                type="button"
                onClick={() =>
                  set('associationChoice', assoc.id as AssociationChoice)
                }
                className={`text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-slate-600 bg-slate-700/40 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge
                    className={`text-xs ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-600 text-slate-300'
                    }`}
                  >
                    {assoc.label}
                  </Badge>
                  {assoc.states && (
                    <span className="text-xs text-slate-500">
                      {assoc.states.join(', ')} only
                    </span>
                  )}
                </div>
                <p className="text-xs leading-snug">{assoc.fullName}</p>
                {isSelected && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {assoc.membershipUrl && (
                      <ExternalLinkBtn href={assoc.membershipUrl} label="Join / apply" />
                    )}
                    {assoc.loginUrl && (
                      <ExternalLinkBtn href={assoc.loginUrl} label="Member login" />
                    )}
                    {assoc.verifyUrl && (
                      <ExternalLinkBtn href={assoc.verifyUrl} label="Verify member" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {data.associationChoice === 'other' && (
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Association Name</Label>
            <Input
              placeholder="Full name of the association"
              value={data.associationOtherName ?? ''}
              onChange={(e) => set('associationOtherName', e.target.value)}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">Membership Number</Label>
          <Input
            placeholder="Current membership number"
            value={data.associationMemberNumber}
            onChange={(e) => set('associationMemberNumber', e.target.value)}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
          {selectedAssociation?.verifyUrl && (
            <p className="text-xs text-slate-500">
              Verify at:{' '}
              <ExternalLinkBtn
                href={selectedAssociation.verifyUrl}
                label={selectedAssociation.verifyUrl}
              />
            </p>
          )}
        </div>
      </Section>

      {/* ── 3. IICRC Certification ─────────────────────────────────────────────── */}
      <Section
        number={3}
        title="IICRC Certification Card"
        subtitle="Current IICRC certification registered to an active business member with 2+ years experience. Upload a photo of the physical card."
        satisfied={req3_iicrc}
        links={[
          { href: 'https://iicrccert.org/', label: 'Verify certification at iicrccert.org' },
          { href: 'https://iicrc.org/iicrcgloballocator/', label: 'IICRC Global Locator' },
          { href: 'https://iicrc.org/ausfaqs/', label: 'IICRC Australia FAQs' },
        ]}
      >
        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">IICRC Certification Number</Label>
          <Input
            placeholder="e.g. 123456789"
            value={data.iicrcCertNumber}
            onChange={(e) => set('iicrcCertNumber', e.target.value)}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
        </div>

        <FileUploadSlot
          label="IICRC Card — Front"
          hint="Must show name, certification type, and expiry"
          fileName={data.iicrcCertCardFrontFileName}
          onFileSelected={(name, url) => {
            set('iicrcCertCardFrontFileName', name);
            set('iicrcCertCardFrontDataUrl', url);
          }}
          onFileRemoved={() => {
            set('iicrcCertCardFrontFileName', '');
            set('iicrcCertCardFrontDataUrl', '');
          }}
          onError={setValidationError}
        />
      </Section>

      {/* ── 4. Years of experience ────────────────────────────────────────────── */}
      <Section
        number={4}
        title="Minimum 2 Years Business Experience"
        subtitle="The applying business must have been actively operating in the cleaning or restoration industry for at least 2 years."
        satisfied={req4_experience}
      >
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.yearsInBusinessConfirmed}
            onChange={(e) => set('yearsInBusinessConfirmed', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-500"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            Confirm: the business has been actively operating in the industry for 2 or more years.
          </span>
        </label>
      </Section>

      {/* ── 5. Current business member declaration ────────────────────────────── */}
      <Section
        number={5}
        title="Current Business Member Declaration"
        subtitle="The IICRC certification card uploaded above must be registered to a current active member of the applying business."
        satisfied={req5_declaration}
      >
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.currentMemberDeclaration}
            onChange={(e) => set('currentMemberDeclaration', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-500"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            Declare: the IICRC certification card uploaded above belongs to a current member of this business who has 2+ years of industry experience.
          </span>
        </label>
      </Section>

      {/* ── 6. Driver's Licence — Identity Verification ───────────────────────── */}
      <Section
        number={6}
        title="Driver's Licence — Identity Verification"
        subtitle="Front and back of a current Australian driver's licence held by the person completing this application. Used to verify identity against business registration details."
        satisfied={req6_licence}
        icon={<CreditCard className="h-5 w-5 text-blue-400" />}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <FileUploadSlot
            label="Licence — Front"
            hint="Shows name, date of birth, licence number"
            fileName={data.driversLicenceFrontFileName}
            onFileSelected={(name, url) => {
              set('driversLicenceFrontFileName', name);
              set('driversLicenceFrontDataUrl', url);
            }}
            onFileRemoved={() => {
              set('driversLicenceFrontFileName', '');
              set('driversLicenceFrontDataUrl', '');
            }}
            onError={setValidationError}
          />

          <FileUploadSlot
            label="Licence — Back"
            hint="Shows address and endorsements"
            fileName={data.driversLicenceBackFileName}
            onFileSelected={(name, url) => {
              set('driversLicenceBackFileName', name);
              set('driversLicenceBackDataUrl', url);
            }}
            onFileRemoved={() => {
              set('driversLicenceBackFileName', '');
              set('driversLicenceBackDataUrl', '');
            }}
            onError={setValidationError}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Licence Number</Label>
            <Input
              placeholder="As it appears on the licence"
              value={data.driversLicenceNumber}
              onChange={(e) => set('driversLicenceNumber', e.target.value)}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Issuing State / Territory</Label>
            <select
              value={data.driversLicenceState}
              onChange={(e) => set('driversLicenceState', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/60 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select state...</option>
              {AUSTRALIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      {/* ── 7. ABN + ASIC Business Registration ──────────────────────────────── */}
      <Section
        number={7}
        title="Business Registration — ABN & ASIC Verification"
        subtitle="Verify the ABN against the Australian Business Register and confirm the business is registered with ASIC. Enter details exactly as they appear in the official registers."
        satisfied={req7_business}
        icon={<Building2 className="h-5 w-5 text-blue-400" />}
        links={[
          { href: 'https://abr.business.gov.au/', label: 'ABN Lookup — Australian Business Register' },
          { href: 'https://connectonline.asic.gov.au/', label: 'ASIC Connect — company search' },
        ]}
      >
        {/* ABN */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300 text-xs">Australian Business Number (ABN)</Label>
            <ExternalLinkBtn href="https://abr.business.gov.au/" label="Look up ABN" />
          </div>
          <Input
            placeholder="e.g. 51 824 753 556"
            value={data.abn}
            onChange={(e) => {
              set('abn', e.target.value);
              set('abnVerified', false);
            }}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={data.abnVerified}
              onChange={(e) => set('abnVerified', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-blue-500"
            />
            <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
              Confirm: the ABN above has been verified on the{' '}
              <a
                href="https://abr.business.gov.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                Australian Business Register
              </a>{' '}
              and is current and active.
            </span>
          </label>
        </div>

        {/* ASIC / ACN */}
        <div className="space-y-2 pt-2 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300 text-xs">
              ASIC-Registered Business Name
              <span className="text-slate-500 ml-1">(Pty Ltd or trading name — as registered)</span>
            </Label>
            <ExternalLinkBtn
              href="https://connectonline.asic.gov.au/"
              label="Search ASIC Connect"
            />
          </div>
          <Input
            placeholder="Exact registered name from ASIC"
            value={data.registeredBusinessName}
            onChange={(e) => {
              set('registeredBusinessName', e.target.value);
              set('asicVerified', false);
            }}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">
              ACN (Australian Company Number)
              <span className="text-slate-500 ml-1">— optional, if registered as a company</span>
            </Label>
            <Input
              placeholder="e.g. 691 477 844"
              value={data.acn}
              onChange={(e) => set('acn', e.target.value)}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={data.asicVerified}
              onChange={(e) => set('asicVerified', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-blue-500"
            />
            <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
              Confirm: the business name above has been verified via{' '}
              <a
                href="https://connectonline.asic.gov.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                ASIC Connect
              </a>{' '}
              and the business is currently registered and in good standing.
            </span>
          </label>
        </div>
      </Section>

      {/* Privacy notice */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-xs text-slate-400 space-y-1">
        <p className="font-medium text-slate-300">Document storage and privacy</p>
        <p>
          All documents uploaded here (IICRC card, driver&apos;s licence) are stored securely and used exclusively to verify eligibility for NRPG membership. They are not shared with third parties. By proceeding you consent to this use in accordance with the{' '}
          <a href="/privacy" className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors">
            NRPG Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Progress + CTA */}
      <div className="flex items-center justify-between px-1 pt-2">
        <div className="text-slate-400 text-sm">
          <span className={satisfiedCount === 7 ? 'text-emerald-400 font-medium' : ''}>
            {satisfiedCount}
          </span>{' '}
          of 7 requirements confirmed
        </div>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={!allSatisfied}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to Application
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  number,
  title,
  subtitle,
  satisfied,
  links,
  icon,
  children,
}: {
  number: number;
  title: string;
  subtitle: string;
  satisfied: boolean;
  links?: { href: string; label: string }[];
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-4">
      <RequirementRow satisfied={satisfied}>
        <div className="space-y-0.5">
          <p className="text-white font-semibold text-sm">
            {number}. {title}
          </p>
          <p className="text-slate-400 text-xs">{subtitle}</p>
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {links.map((l) => (
                <ExternalLinkBtn key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          )}
        </div>
      </RequirementRow>

      <div className="pl-8 space-y-3">{children}</div>
    </div>
  );
}
