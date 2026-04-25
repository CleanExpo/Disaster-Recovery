'use client';

// Step 0 — Eligibility Pre-Requisites
// Ref: DR-593 — Contractor application pre-requisite verification
// Decomposed per ADR-009 (L8 — 2026-04-28). See ./step0/ for sub-components.
//
// Required before a contractor can begin the 7-step application:
//  1. Active CARSI account (Cleaning and Restoration Science Institute)
//  2. Industry association membership (RIA, CCA Vic, CCAWA, SRCP, or other)
//  3. IICRC certification card (cert number + photo upload)
//  4. 2+ years in business
//  5. Current business member declaration
//  6. Driver's licence — front AND back photo upload
//  7. ASIC / ABN business registration confirmation

import { useCallback, useMemo, useState } from 'react';
import { AlertCircle, Award, ChevronRight, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { AssociationSection } from './step0/AssociationSection';
import { BusinessRegistrationSection } from './step0/BusinessRegistrationSection';
import { CarsiSection } from './step0/CarsiSection';
import { DeclarationSection } from './step0/DeclarationSection';
import { ExperienceSection } from './step0/ExperienceSection';
import { IicrcSection } from './step0/IicrcSection';
import { LicenceSection } from './step0/LicenceSection';
import { PrivacyNotice } from './step0/PrivacyNotice';
import type { EligibilityData, Step0Control } from './step0/types';

export type { AssociationChoice, EligibilityData } from './step0/types';

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

  const set = useCallback(<K extends keyof EligibilityData>(key: K, value: EligibilityData[K]) => {
    setValidationError(null);
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const control = useMemo<Step0Control>(
    () => ({ data, set, onError: setValidationError }),
    [data, set],
  );

  // ── Requirement satisfaction checks ─────────────────────────────────────────

  const req1 = data.carsiAccountConfirmed && data.carsiMemberNumber.trim().length > 0;
  const req2 =
    data.associationChoice !== '' &&
    data.associationMemberNumber.trim().length > 0 &&
    (data.associationChoice !== 'other' || (data.associationOtherName?.trim() ?? '').length > 0);
  const req3 = data.iicrcCertNumber.trim().length > 0 && data.iicrcCertCardFrontFileName.length > 0;
  const req4 = data.yearsInBusinessConfirmed;
  const req5 = data.currentMemberDeclaration;
  const req6 =
    data.driversLicenceFrontFileName.length > 0 &&
    data.driversLicenceBackFileName.length > 0 &&
    data.driversLicenceNumber.trim().length > 0 &&
    data.driversLicenceState.length > 0;
  const req7 =
    data.abn.replace(/\s/g, '').length === 11 &&
    data.abnVerified &&
    data.registeredBusinessName.trim().length > 0 &&
    data.asicVerified;

  const satisfiedCount = [req1, req2, req3, req4, req5, req6, req7].filter(Boolean).length;
  const allSatisfied = satisfiedCount === 7;

  const handleConfirm = () => {
    setValidationError(null);

    if (!req1) {
      setValidationError('Confirm your CARSI account and provide the account/member number.');
      return;
    }
    if (!req2) {
      setValidationError(
        data.associationChoice === ''
          ? 'Select an industry association.'
          : data.associationChoice === 'other' && !data.associationOtherName?.trim()
            ? 'Enter the name of your industry association.'
            : 'Provide your association membership number.',
      );
      return;
    }
    if (!req3) {
      setValidationError(
        !data.iicrcCertNumber.trim()
          ? 'Enter your IICRC certification number.'
          : 'Upload a photo of your IICRC certification card.',
      );
      return;
    }
    if (!req4) {
      setValidationError('Confirm the business has been operating for at least 2 years.');
      return;
    }
    if (!req5) {
      setValidationError('Confirm you are a current member of the applying business.');
      return;
    }
    if (!req6) {
      setValidationError(
        !data.driversLicenceFrontFileName
          ? "Upload the front of the driver's licence."
          : !data.driversLicenceBackFileName
            ? "Upload the back of the driver's licence."
            : !data.driversLicenceNumber.trim()
              ? "Enter the driver's licence number."
              : "Select the state that issued the driver's licence.",
      );
      return;
    }
    if (!req7) {
      setValidationError(
        data.abn.replace(/\s/g, '').length !== 11
          ? 'Enter a valid 11-digit ABN.'
          : !data.abnVerified
            ? 'Confirm the ABN has been verified against the ABR.'
            : !data.registeredBusinessName.trim()
              ? 'Enter the ASIC-registered business name.'
              : 'Confirm the business name has been verified against ASIC.',
      );
      return;
    }

    onConfirmed(data);
  };

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
            NRPG membership is restricted to verified, legitimately registered businesses with
            active certifications and industry standing. Documents provided here are retained for
            compliance purposes and are not shared with third parties.
          </AlertDescription>
        </Alert>
      </div>

      {validationError && (
        <Alert className="border-red-500/40 bg-red-900/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200 text-sm">{validationError}</AlertDescription>
        </Alert>
      )}

      <CarsiSection control={control} />
      <AssociationSection control={control} />
      <IicrcSection control={control} />
      <ExperienceSection control={control} />
      <DeclarationSection control={control} />
      <LicenceSection control={control} />
      <BusinessRegistrationSection control={control} />

      <PrivacyNotice />

      {/* Progress + CTA */}
      <div className="flex items-center justify-between px-1 pt-2">
        <div className="text-slate-400 text-sm">
          <span className={allSatisfied ? 'text-emerald-400 font-medium' : ''}>
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
