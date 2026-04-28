'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import type { Step2Control } from './types';

function VerificationStatusAlert({
  abnVerified,
  addressVerified,
  certificateFiles,
}: Step2Control) {
  const allVerified = abnVerified && addressVerified && certificateFiles.length > 0;

  return (
    <Alert className={allVerified ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}>
      <Info className={allVerified ? 'h-4 w-4 text-green-600' : 'h-4 w-4 text-yellow-600'} />
      <AlertDescription className={allVerified ? 'text-green-800' : 'text-yellow-800'}>
        <strong>Verification Status:</strong>
        <ul className="mt-2 ml-4 list-disc text-sm">
          <li className={abnVerified ? 'text-green-700' : ''}>
            ABN Verification: {abnVerified ? '✓ Verified' : 'Pending'}
          </li>
          <li className={addressVerified ? 'text-green-700' : ''}>
            Address Validation: {addressVerified ? '✓ Verified' : 'Pending'}
          </li>
          <li className={certificateFiles.length > 0 ? 'text-green-700' : ''}>
            Insurance Certificates:{' '}
            {certificateFiles.length > 0
              ? `✓ ${certificateFiles.length} file(s) uploaded`
              : 'Required'}
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}

export default React.memo(VerificationStatusAlert);
