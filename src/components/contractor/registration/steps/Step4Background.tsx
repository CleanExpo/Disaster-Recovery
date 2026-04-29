'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { useStep4Background } from './step4/useStep4Background';
import type { Step4BackgroundProps } from './step4/types';
import ProgressIndicator from './step4/ProgressIndicator';
import ConsentSection from './step4/ConsentSection';
import DirectorIdSection from './step4/DirectorIdSection';
import ReferencesSection from './step4/ReferencesSection';
import PortfolioSection from './step4/PortfolioSection';
import CompletionSummary from './step4/CompletionSummary';

export function Step4Background({ data: _data, updateData: _updateData, errors }: Step4BackgroundProps) {
  const control = useStep4Background(errors);

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Background Verification:</strong> This information is used for third-party screening
          to ensure the safety and reliability of our contractor network. All checks are conducted by
          accredited providers in compliance with Australian privacy laws.
        </AlertDescription>
      </Alert>

      <ProgressIndicator control={control} />
      <ConsentSection control={control} />
      <DirectorIdSection control={control} />
      <ReferencesSection control={control} />
      <PortfolioSection control={control} />
      <CompletionSummary control={control} />
    </div>
  );
}
