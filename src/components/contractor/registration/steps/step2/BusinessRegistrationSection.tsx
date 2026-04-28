'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText } from 'lucide-react';
import { COMPANY_STRUCTURES, formatABN, type Step2Control } from './types';

function BusinessRegistrationSection({
  data,
  errors,
  abnVerified,
  verifyingAbn,
  handleInputChange,
  verifyABN,
}: Step2Control) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Business Registration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="abn">
            ABN/ACN <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="abn"
              type="text"
              placeholder="XX XXX XXX XXX"
              value={formatABN(data.company?.abn || '')}
              onChange={(e) =>
                handleInputChange('company.abn', e.target.value.replace(/\D/g, ''))
              }
              className={errors['company.abn'] ? 'border-red-600' : ''}
            />
            <Button
              type="button"
              variant="outline"
              onClick={verifyABN}
              disabled={verifyingAbn || abnVerified}
            >
              {verifyingAbn ? 'Verifying...' : abnVerified ? 'Verified' : 'Verify'}
            </Button>
            {abnVerified && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-700">
            Australian business/company registration verification
          </p>
          {errors['company.abn'] && (
            <p className="text-sm text-red-500">{errors['company.abn']}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="structure">
            Company Structure <span className="text-red-500">*</span>
          </Label>
          <Select
            value={data.company?.companyStructure || ''}
            onValueChange={(value) => handleInputChange('company.companyStructure', value)}
          >
            <SelectTrigger className={errors['company.companyStructure'] ? 'border-red-600' : ''}>
              <SelectValue placeholder="Select company structure" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_STRUCTURES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-700">Business type categorisation</p>
          {errors['company.companyStructure'] && (
            <p className="text-sm text-red-500">{errors['company.companyStructure']}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(BusinessRegistrationSection);
