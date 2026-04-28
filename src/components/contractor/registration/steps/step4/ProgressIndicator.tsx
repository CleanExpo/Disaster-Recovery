import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Step4Control } from './types';

function ProgressIndicator({ control }: { control: Step4Control }) {
  const { calculateCompletion, validationStatus } = control;
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Verification Progress</h3>
            <p className="text-sm text-gray-600 mt-1">Complete all sections to proceed</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{calculateCompletion()}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {Object.values(validationStatus).filter((v) => v).length} of 4 complete
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ProgressIndicator);
