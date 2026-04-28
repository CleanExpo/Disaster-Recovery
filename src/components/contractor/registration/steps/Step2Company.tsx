'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2 } from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';
import { useStep2Company } from './step2/useStep2Company';
import type { Step2Control } from './step2/types';
import BusinessRegistrationSection from './step2/BusinessRegistrationSection';
import AddressSection from './step2/AddressSection';
import DirectorsSection from './step2/DirectorsSection';
import InsuranceSection from './step2/InsuranceSection';
import TerritorySection from './step2/TerritorySection';
import LogoSection from './step2/LogoSection';
import VerificationStatusAlert from './step2/VerificationStatusAlert';

interface Step2CompanyProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

export function Step2Company({ data, updateData, errors }: Step2CompanyProps) {
  const formState = useStep2Company({ data, updateData });

  const control: Step2Control = {
    data,
    updateData,
    errors,
    ...formState,
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Building2 className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Company Verification:</strong> Provide your business details for verification. All
          information will be validated against official Australian business registers.
        </AlertDescription>
      </Alert>

      <BusinessRegistrationSection {...control} />
      <AddressSection {...control} />
      <DirectorsSection {...control} />
      <InsuranceSection {...control} />
      <TerritorySection {...control} />
      <LogoSection {...control} />
      <VerificationStatusAlert {...control} />
    </div>
  );
}
