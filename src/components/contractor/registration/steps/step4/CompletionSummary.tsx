import React, { memo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import type { Step4Control } from './types';

function CompletionSummary({ control }: { control: Step4Control }) {
  const { calculateCompletion, validationStatus, directorIdFiles, references } = control;
  const complete = calculateCompletion() === 100;
  return (
    <Alert
      className={complete ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}
    >
      <Info className={complete ? 'h-4 w-4 text-green-600' : 'h-4 w-4 text-yellow-600'} />
      <AlertDescription className={complete ? 'text-green-800' : 'text-yellow-800'}>
        <strong>Background Check Requirements:</strong>
        <ul className="mt-2 ml-4 list-disc text-sm">
          <li className={validationStatus.consents ? 'text-green-700' : ''}>
            Consent Forms:{' '}
            {validationStatus.consents ? '✓ All consents provided' : 'Required'}
          </li>
          <li className={validationStatus.directorId ? 'text-green-700' : ''}>
            Director ID:{' '}
            {validationStatus.directorId
              ? `✓ ${directorIdFiles.length} document(s) uploaded`
              : 'Required'}
          </li>
          <li className={validationStatus.references ? 'text-green-700' : ''}>
            Business References:{' '}
            {validationStatus.references
              ? `✓ ${references.filter((r) => r.name && r.phone).length} references provided`
              : 'Minimum 2 required'}
          </li>
          <li className={validationStatus.portfolio ? 'text-green-700' : ''}>
            Project Portfolio:{' '}
            {validationStatus.portfolio ? '✓ Summary uploaded' : 'Required'}
          </li>
        </ul>
        {complete && (
          <p className="mt-3 font-medium text-green-700">
            ✓ All background check requirements completed
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
}

export default memo(CompletionSummary);
