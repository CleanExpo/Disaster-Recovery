'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Step3Control } from './types';

export const ComplianceScoreCard = memo(function ComplianceScoreCard({
  control,
}: {
  control: Step3Control;
}) {
  const { complianceScore } = control;
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Compliance Score</h3>
            <p className="text-sm text-gray-700 mt-1">Based on uploaded certifications</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{complianceScore}%</div>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(complianceScore / 20)
                      ? 'fill-blue-500 text-blue-500'
                      : 'text-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
