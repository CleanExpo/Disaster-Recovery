'use client';

import { memo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import type { Step3Control } from './types';

export const ComplianceSummary = memo(function ComplianceSummary({
  control,
}: {
  control: Step3Control;
}) {
  const { validationStatus, complianceScore, iicrcCerts, otherQualifications } = control;
  const meets = complianceScore >= 60;

  return (
    <Alert className={meets ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}>
      <Info className={meets ? 'h-4 w-4 text-green-600' : 'h-4 w-4 text-yellow-600'} />
      <AlertDescription className={meets ? 'text-green-800' : 'text-yellow-800'}>
        <strong>Compliance Requirements:</strong>
        <ul className="mt-2 ml-4 list-disc text-sm">
          <li className={validationStatus.cpp40421 ? 'text-green-700' : ''}>
            CPP40421 Certificate IV:{' '}
            {validationStatus.cpp40421 ? '✓ Uploaded' : 'Required (40% weight)'}
          </li>
          <li className={validationStatus.iicrc ? 'text-green-700' : ''}>
            IICRC Certifications:{' '}
            {validationStatus.iicrc
              ? `✓ ${iicrcCerts.filter((c) => c.file).length} uploaded`
              : 'At least 1 required (30% weight)'}
          </li>
          <li className={validationStatus.association ? 'text-green-700' : ''}>
            Industry Association:{' '}
            {validationStatus.association ? '✓ Verified' : 'Required (20% weight)'}
          </li>
          <li className={validationStatus.carsi ? 'text-green-700' : ''}>
            CARSI Training: {validationStatus.carsi ? '✓ Uploaded' : 'Optional (10% weight)'}
          </li>
          <li
            className={
              otherQualifications.filter((q) => q.file).length > 0 ? 'text-green-700' : ''
            }
          >
            Additional Qualifications: {otherQualifications.filter((q) => q.file).length} uploaded
          </li>
        </ul>
        {!meets && (
          <p className="mt-3 font-medium">⚠️ Minimum 60% compliance score required to proceed</p>
        )}
      </AlertDescription>
    </Alert>
  );
});
