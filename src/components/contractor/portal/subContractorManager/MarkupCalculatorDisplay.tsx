'use client';

import { memo } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MarkupCalculation } from '@/types/sub-contractor';
import { formatAud } from './types';

export interface MarkupCalculatorDisplayProps {
  calc: MarkupCalculation | null;
}

export const MarkupCalculatorDisplay = memo(function MarkupCalculatorDisplay({
  calc,
}: MarkupCalculatorDisplayProps) {
  if (!calc) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-blue-900 flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Customer Invoice Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Sub-contractor invoice (ex GST)</span>
          <span>{formatAud(calc.subInvoiceAmount)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>NRPG administration ({calc.markupPercent}%)</span>
          <span>{formatAud(calc.markupAmount)}</span>
        </div>
        <div className="flex justify-between font-medium border-t border-blue-200 pt-2">
          <span>Customer charge (ex GST)</span>
          <span>{formatAud(calc.customerChargeExGst)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>GST (10%)</span>
          <span>{formatAud(calc.gstAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-blue-900 border-t border-blue-200 pt-2">
          <span>Customer total (inc GST)</span>
          <span>{formatAud(calc.customerChargeTotalIncGst)}</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          The administration margin is not itemised on the customer invoice. The customer sees the
          total line item only.
        </p>
      </CardContent>
    </Card>
  );
});
