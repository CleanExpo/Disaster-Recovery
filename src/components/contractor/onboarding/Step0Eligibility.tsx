'use client';

// Step 0 — Eligibility Pre-Requisites
// Ref: DR-593 — Contractor application pre-requisite verification
//
// Required before a contractor can begin the 7-step application:
//  1. Active CARSI membership
//  2. Industry association membership (RIA or state-based)
//  3. IICRC certification card (photo upload)
//  4. 2+ years in business
//  5. Declaration: applicant is a current business member

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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// ─── Types ───────────────────────────────────────────────────────────────────

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
  states?: string[];
}[] = [
  {
    id: 'ria',
    label: 'RIA',
    fullName: 'Restoration Industry Association (Australasian Chapter)',
    membershipUrl: 'https://www.restorationindustry.org/join-ria-your-way',
    loginUrl: 'https://members.restorationindustry.org/login.aspx',
  },
  {
    id: 'ccavic',
    label: 'CCAVIC',
    fullName: 'Carpet Cleaning Association of Victoria',
    membershipUrl: 'https://www.ccavic.com.au/application-form/',
    loginUrl: 'https://www.ccavic.com.au/membership/',
    states: ['VIC'],
  },
  {
    id: 'ccawa',
    label: 'CCAWA',
    fullName: 'Carpet Cleaning Association of WA',
    membershipUrl: 'https://carpetcleaningassociationwa.com.au/want-to-be-a-member/',
    loginUrl: 'https://ccawa.tidyhq.com/public/membership_levels',
    states: ['WA'],
  },
  {
    id: 'srcp',
    label: 'SRCP',
    fullName: 'Specialised Restoration & Cleaning Professionals',
    membershipUrl: 'https://srcp.org.au/',
    loginUrl: 'https://srcp.org.au/',
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
  carsiMemberConfirmed: boolean;
  carsiMemberNumber: string;

  // Industry association
  associationChoice: AssociationChoice | '';
  associationMemberNumber: string;
  associationOtherName?: string;

  // IICRC
  iicrcCertNumber: string;
  iicrcCertCardFileName: string;
  iicrcCertCardDataUrl: string;

  // Experience & declaration
  yearsInBusinessConfirmed: boolean;
  currentMemberDeclaration: boolean;
}

interface Step0EligibilityProps {
  onConfirmed: (data: EligibilityData) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ExternalLinkButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
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
        className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Step0Eligibility({ onConfirmed }: Step0EligibilityProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [data, setData] = useState<EligibilityData>({
    carsiMemberConfirmed: false,
    carsiMemberNumber: '',
    associationChoice: '',
    associationMemberNumber: '',
    associationOtherName: '',
    iicrcCertNumber: '',
    iicrcCertCardFileName: '',
    iicrcCertCardDataUrl: '',
    yearsInBusinessConfirmed: false,
    currentMemberDeclaration: false,
  });

  const set = <K extends keyof EligibilityData>(
    key: K,
    value: EligibilityData[K]
  ) => setData((prev) => ({ ...prev, [key]: value }));

  // ── IICRC card upload ─────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setValidationError('IICRC card: upload a JPG, PNG, WEBP, HEIC or PDF file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setValidationError('IICRC card: file must be under 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      set('iicrcCertCardFileName', file.name);
      set('iicrcCertCardDataUrl', ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ── Validation and confirm ─────────────────────────────────────────────────
  const allSatisfied =
    data.carsiMemberConfirmed &&
    data.carsiMemberNumber.trim().length > 0 &&
    data.associationChoice !== '' &&
    data.associationMemberNumber.trim().length > 0 &&
    (data.associationChoice !== 'other' || (data.associationOtherName?.trim() ?? '').length > 0) &&
    data.iicrcCertNumber.trim().length > 0 &&
    data.iicrcCertCardFileName.length > 0 &&
    data.yearsInBusinessConfirmed &&
    data.currentMemberDeclaration;

  const handleConfirm = () => {
    setValidationError(null);

    if (!data.carsiMemberConfirmed || !data.carsiMemberNumber.trim()) {
      setValidationError('Confirm active CARSI membership and provide your member number.');
      return;
    }
    if (!data.associationChoice) {
      setValidationError('Select an industry association.');
      return;
    }
    if (!data.associationMemberNumber.trim()) {
      setValidationError('Provide your association membership number.');
      return;
    }
    if (data.associationChoice === 'other' && !data.associationOtherName?.trim()) {
      setValidationError('Enter the name of your industry association.');
      return;
    }
    if (!data.iicrcCertNumber.trim()) {
      setValidationError('Enter your IICRC certification number.');
      return;
    }
    if (!data.iicrcCertCardFileName) {
      setValidationError('Upload a photo of your IICRC certification card.');
      return;
    }
    if (!data.yearsInBusinessConfirmed) {
      setValidationError('Confirm the business has been operating for at least 2 years.');
      return;
    }
    if (!data.currentMemberDeclaration) {
      setValidationError('Confirm you are a current member of the business applying.');
      return;
    }

    onConfirmed(data);
  };

  const selectedAssociation = ASSOCIATION_OPTIONS.find(
    (a) => a.id === data.associationChoice
  );

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Award className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Eligibility Requirements</h2>
            <p className="text-slate-400 text-sm">
              All five requirements must be met before the application can proceed.
            </p>
          </div>
        </div>

        <Alert className="mt-4 border-amber-500/30 bg-amber-950/30">
          <Info className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 text-sm">
            NRPG membership requires active certification and verified industry standing. If any requirement is not yet met, follow the links below to apply before continuing.
          </AlertDescription>
        </Alert>
      </div>

      {validationError && (
        <Alert className="border-red-500/40 bg-red-900/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200 text-sm">{validationError}</AlertDescription>
        </Alert>
      )}

      {/* ── Requirement 1: CARSI ────────────────────────────────────────────── */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <RequirementRow
          satisfied={data.carsiMemberConfirmed && data.carsiMemberNumber.trim().length > 0}
        >
          <div className="space-y-1">
            <p className="text-white font-semibold text-sm">
              1. Active CARSI Membership
            </p>
            <p className="text-slate-400 text-xs">
              Cleaning and Restoration Science Institute — NRPG's primary training and certification partner.
            </p>
            <div className="flex flex-wrap gap-3 mt-1">
              <ExternalLinkButton
                href="https://carsi.com.au/membership/"
                label="Join CARSI"
              />
              <ExternalLinkButton
                href="https://carsi.com.au/"
                label="CARSI login / account"
              />
            </div>
          </div>
        </RequirementRow>

        <div className="space-y-3 pl-8">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={data.carsiMemberConfirmed}
              onChange={(e) => set('carsiMemberConfirmed', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-blue-500"
            />
            <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
              Confirm: the applicant business holds an active CARSI membership.
            </span>
          </label>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">CARSI Member Number</Label>
            <Input
              placeholder="e.g. CARSI-12345"
              value={data.carsiMemberNumber}
              onChange={(e) => set('carsiMemberNumber', e.target.value)}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Requirement 2: Industry Association ─────────────────────────────── */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <RequirementRow
          satisfied={
            data.associationChoice !== '' &&
            data.associationMemberNumber.trim().length > 0 &&
            (data.associationChoice !== 'other' ||
              (data.associationOtherName?.trim() ?? '').length > 0)
          }
        >
          <div className="space-y-1">
            <p className="text-white font-semibold text-sm">
              2. Industry Association Membership
            </p>
            <p className="text-slate-400 text-xs">
              Active membership with a recognised restoration or cleaning industry association.
            </p>
          </div>
        </RequirementRow>

        <div className="pl-8 space-y-4">
          {/* Association cards */}
          <div className="grid sm:grid-cols-2 gap-2">
            {ASSOCIATION_OPTIONS.map((assoc) => {
              const isSelected = data.associationChoice === assoc.id;
              return (
                <button
                  key={assoc.id}
                  type="button"
                  onClick={() => set('associationChoice', assoc.id as AssociationChoice)}
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
                  {isSelected && assoc.membershipUrl && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <ExternalLinkButton href={assoc.membershipUrl} label="Join / apply" />
                      <ExternalLinkButton href={assoc.loginUrl} label="Member login" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Other association name */}
          {data.associationChoice === 'other' && (
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Association Name</Label>
              <Input
                placeholder="Enter the full name of the association"
                value={data.associationOtherName ?? ''}
                onChange={(e) => set('associationOtherName', e.target.value)}
                className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
              />
            </div>
          )}

          {/* Selected association links (for non-other) */}
          {selectedAssociation &&
            data.associationChoice !== 'other' &&
            !selectedAssociation.membershipUrl && (
              <p className="text-xs text-slate-400">
                Contact {selectedAssociation.fullName} directly to confirm membership requirements.
              </p>
            )}

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Membership Number</Label>
            <Input
              placeholder="Your current membership number"
              value={data.associationMemberNumber}
              onChange={(e) => set('associationMemberNumber', e.target.value)}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Requirement 3: IICRC Certification ──────────────────────────────── */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <RequirementRow
          satisfied={
            data.iicrcCertNumber.trim().length > 0 &&
            data.iicrcCertCardFileName.length > 0
          }
        >
          <div className="space-y-1">
            <p className="text-white font-semibold text-sm">
              3. IICRC Certification Card (Verified)
            </p>
            <p className="text-slate-400 text-xs">
              The applicant must hold a current IICRC certification registered to a current business member with 2+ years of industry experience. Upload a photo of the physical card.
            </p>
            <div className="flex flex-wrap gap-3 mt-1">
              <ExternalLinkButton
                href="https://iicrc.org/iicrcgloballocator/"
                label="IICRC Global Locator — verify certification"
              />
              <ExternalLinkButton
                href="https://iicrc.org/ausfaqs/"
                label="IICRC Australia FAQs"
              />
              <ExternalLinkButton
                href="https://iicrccert.org/"
                label="IICRC certification portal"
              />
            </div>
          </div>
        </RequirementRow>

        <div className="pl-8 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">IICRC Certification Number</Label>
            <Input
              placeholder="e.g. 123456789"
              value={data.iicrcCertNumber}
              onChange={(e) => set('iicrcCertNumber', e.target.value)}
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
            />
          </div>

          {/* File upload */}
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">
              IICRC Certification Card Photo
              <span className="text-slate-500 ml-1">(JPG, PNG, HEIC, PDF — max 10 MB)</span>
            </Label>

            {data.iicrcCertCardFileName ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-900/30 border border-emerald-600/40 rounded-lg text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span className="truncate flex-1">{data.iicrcCertCardFileName}</span>
                <button
                  type="button"
                  onClick={() => {
                    set('iicrcCertCardFileName', '');
                    set('iicrcCertCardDataUrl', '');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-emerald-400 hover:text-red-400 transition-colors"
                  aria-label="Remove uploaded file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-6 text-center transition-colors group"
              >
                <Upload className="h-6 w-6 text-slate-500 group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
                <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                  Click to upload certification card
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  Front of card — must show name, certification type, and expiry
                </p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* ── Requirements 4 & 5: Experience + Declaration ─────────────────────── */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <RequirementRow satisfied={data.yearsInBusinessConfirmed}>
          <p className="text-white font-semibold text-sm">
            4. Minimum 2 Years Business Experience
          </p>
          <p className="text-slate-400 text-xs mt-0.5">
            The applying business must have been actively operating in the cleaning or restoration industry for at least 2 years.
          </p>
        </RequirementRow>

        <div className="pl-8">
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
        </div>

        <div className="border-t border-slate-700/50 pt-4">
          <RequirementRow satisfied={data.currentMemberDeclaration}>
            <p className="text-white font-semibold text-sm">
              5. Current Business Member Declaration
            </p>
            <p className="text-slate-400 text-xs mt-0.5">
              The IICRC certification provided above must be registered to a current active member of the applying business.
            </p>
          </RequirementRow>

          <div className="pl-8 mt-3">
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
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="flex items-center justify-between px-1">
        <div className="text-slate-400 text-sm">
          {[
            data.carsiMemberConfirmed && data.carsiMemberNumber.trim().length > 0,
            data.associationChoice !== '' &&
              data.associationMemberNumber.trim().length > 0 &&
              (data.associationChoice !== 'other' || (data.associationOtherName?.trim() ?? '').length > 0),
            data.iicrcCertNumber.trim().length > 0 && data.iicrcCertCardFileName.length > 0,
            data.yearsInBusinessConfirmed,
            data.currentMemberDeclaration,
          ].filter(Boolean).length}{' '}
          of 5 requirements confirmed
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
