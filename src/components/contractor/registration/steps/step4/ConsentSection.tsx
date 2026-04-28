import React, { memo } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserCheck, Lock, CheckCircle } from 'lucide-react';
import type { Step4Control } from './types';

function ConsentSection({ control }: { control: Step4Control }) {
  const {
    backgroundCheckConsent,
    setBackgroundCheckConsent,
    creditCriminalConsent,
    setCreditCriminalConsent,
    dataPrivacyConsent,
    setDataPrivacyConsent,
    updateConsents,
    validationStatus,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Background Check Authorisation
        </CardTitle>
        <CardDescription>
          Legal consent required for comprehensive screening
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-yellow-50 border-yellow-200">
          <Lock className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            Background checks will be conducted by PISA (Professional Investigation Services Australia)
            or equivalent accredited provider. Results are confidential and used solely for
            contractor approval purposes.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="background-check"
              checked={backgroundCheckConsent}
              onCheckedChange={(checked) => {
                setBackgroundCheckConsent(checked as boolean);
                updateConsents();
              }}
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="background-check" className="font-normal cursor-pointer">
                I authorise third-party background screening <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-600">
                I consent to comprehensive background checks including identity verification,
                professional history, and regulatory compliance checks.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="credit-criminal"
              checked={creditCriminalConsent}
              onCheckedChange={(checked) => {
                setCreditCriminalConsent(checked as boolean);
                updateConsents();
              }}
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="credit-criminal" className="font-normal cursor-pointer">
                I consent to credit and criminal history checks <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-600">
                I authorise review of credit history and criminal records as permitted under
                Australian law for the purpose of contractor assessment.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="data-privacy"
              checked={dataPrivacyConsent}
              onCheckedChange={(checked) => {
                setDataPrivacyConsent(checked as boolean);
                updateConsents();
              }}
            />
            <div className="space-y-1 flex-1">
              <Label htmlFor="data-privacy" className="font-normal cursor-pointer">
                I acknowledge data privacy and protection terms <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-600">
                I understand my information will be handled in accordance with the Privacy Act 1988
                and Australian Privacy Principles.
              </p>
            </div>
          </div>
        </div>

        {validationStatus.consents && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              All required consents provided. Background checks will commence upon application submission.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(ConsentSection);
