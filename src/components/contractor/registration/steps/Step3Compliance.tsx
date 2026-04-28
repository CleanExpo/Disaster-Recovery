'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

import type { Step3ComplianceProps } from './step3/types';
import { useStep3Compliance } from './step3/useStep3Compliance';
import { ComplianceScoreCard } from './step3/ComplianceScoreCard';
import { Cpp40421Section } from './step3/Cpp40421Section';
import { IicrcCertificationsSection } from './step3/IicrcCertificationsSection';
import { AssociationMembershipSection } from './step3/AssociationMembershipSection';
import { CarsiTrainingSection } from './step3/CarsiTrainingSection';
import { OtherQualificationsSection } from './step3/OtherQualificationsSection';
import { ComplianceSummary } from './step3/ComplianceSummary';

/**
 * Step3Compliance — thin orchestrator (ADR-009 god-component decomposition).
 *
 * The previous 858-line implementation was decomposed into:
 * - `step3/types.ts` (props, control surface, constants)
 * - `step3/useStep3Compliance.ts` (form-state hook)
 * - one sub-component per compliance section
 *
 * Behaviour is byte-for-byte identical to the pre-refactor component;
 * the named export, prop signature, and rendered DOM structure are
 * preserved. `data` and `updateData` are accepted for caller-contract
 * compatibility (RegistrationWizard) even though state currently lives
 * locally — wiring them through is a separate concern.
 */
export function Step3Compliance({ data: _data, updateData: _updateData, errors }: Step3ComplianceProps) {
  const control = useStep3Compliance(errors);

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Industry Compliance:</strong> Upload your professional certifications and
          memberships. These documents verify your qualification to perform restoration work to
          Australian standards.
        </AlertDescription>
      </Alert>

      <ComplianceScoreCard control={control} />
      <Cpp40421Section control={control} />
      <IicrcCertificationsSection control={control} />
      <AssociationMembershipSection control={control} />
      <CarsiTrainingSection control={control} />
      <OtherQualificationsSection control={control} />
      <ComplianceSummary control={control} />
    </div>
  );
}
