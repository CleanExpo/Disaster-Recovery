'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  FileText,
  Shield,
  CheckCircle2,
  AlertCircle,
  Lock,
  ChevronRight,
  ChevronLeft,
  User,
} from 'lucide-react';
import {
  SubContractorOnboardingFormValues,
  SubContractorTradeType,
  AustralianState,
  TRADE_TYPE_LABELS,
  TRADE_TYPE_LICENCE_LABEL,
  MIN_PUBLIC_LIABILITY_AUD,
} from '@/types/sub-contractor';

interface SubContractorOnboardingProps {
  /** Pre-filled email from the engagement invite */
  inviteEmail?: string;
  /** The trade type required for this engagement */
  requiredTradeType?: SubContractorTradeType;
  onComplete: (data: SubContractorOnboardingFormValues) => void;
  onCancel: () => void;
}

const AUSTRALIAN_STATES: AustralianState[] = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

const STEPS = [
  { id: 1, label: 'Business', icon: Building2 },
  { id: 2, label: 'Licence', icon: FileText },
  { id: 3, label: 'Insurance', icon: Shield },
  { id: 4, label: 'Agreement', icon: CheckCircle2 },
];

const NRPG_SUB_CONTRACTOR_AGREEMENT = `
NRPG SUB-CONTRACTOR AGREEMENT

This Sub-Contractor Agreement ("Agreement") is entered into between:
- National Recovery Platform Group (NRPG) and its network members ("NRPG Network")
- The sub-contractor identified below ("Sub-Contractor")

1. ENGAGEMENT
The Sub-Contractor is engaged by the primary NRPG contractor to perform licensed trade services on specific jobs referred through the NRPG network. Engagement is job-by-job and does not constitute ongoing employment.

2. LICENSING & COMPLIANCE
The Sub-Contractor warrants they hold a current, valid licence for the trade type engaged. The licence must be maintained throughout any active engagement. NRPG reserves the right to verify licence status at any time.

3. INSURANCE
The Sub-Contractor must hold and maintain a minimum of $5,000,000 (five million dollars) public liability insurance. Certificate of currency must be provided upon request.

4. QUALITY STANDARDS
All work must comply with Australian Standards, relevant building codes, and NRPG quality standards. The Sub-Contractor is responsible for rectification of defective work at no additional charge.

5. PAYMENT
Payment is made by the primary NRPG contractor via Electronic Funds Transfer (EFT / Bank Transfer) only. Payment terms are as agreed with the primary contractor. NRPG is not a party to the payment arrangement between the primary contractor and sub-contractor.

6. INVOICE & DOCUMENTATION
The Sub-Contractor must provide a properly formatted tax invoice upon completion of work, including ABN, description of services, amount, and GST component where applicable.

7. CONDUCT
The Sub-Contractor must conduct themselves professionally, maintain the client's property, and comply with all site safety requirements. Any conduct that brings NRPG into disrepute may result in immediate removal from the network.

8. WHS OBLIGATIONS
The Sub-Contractor is responsible for their own WHS compliance, including appropriate PPE, safe work method statements, and incident reporting as required by law.

9. CONFIDENTIALITY
The Sub-Contractor must not disclose client information, job details, or NRPG commercial terms to third parties.

10. TERMINATION
NRPG or the primary contractor may terminate any engagement immediately for breach of this Agreement, licence cancellation, insurance lapse, or conduct issues.

11. GOVERNING LAW
This Agreement is governed by the laws of Australia. Disputes are resolved in the jurisdiction of the primary contractor's operating state.
`.trim();

export default function SubContractorOnboarding({
  inviteEmail,
  requiredTradeType,
  onComplete,
  onCancel,
}: SubContractorOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SubContractorOnboardingFormValues>>({
    contactEmail: inviteEmail ?? '',
    tradeType: requiredTradeType,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubContractorOnboardingFormValues>({
    defaultValues: {
      contactEmail: inviteEmail ?? '',
      tradeType: requiredTradeType,
      signatureDate: new Date().toISOString().split('T')[0],
    },
  });

  const selectedTradeType = watch('tradeType') as SubContractorTradeType | undefined;
  const agreementAccepted = watch('agreementAccepted');

  const saveAndNext = handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      onComplete(data);
    }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Sub-Contractor Onboarding</h2>
        <p className="text-white/80 mt-1">
          Complete onboarding to work on NRPG-referred jobs as a licensed sub-contractor.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <React.Fragment key={s.id}>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isDone
                    ? 'bg-green-600 text-white'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className="h-4 w-4 text-white/30 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <form onSubmit={saveAndNext} className="space-y-6">
        {/* ── STEP 1: Business Details ── */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Business Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="businessName">Registered Business Name *</Label>
                <Input
                  id="businessName"
                  {...register('businessName', { required: 'Business name is required' })}
                  placeholder="e.g., Smith Plumbing Pty Ltd"
                />
                {errors.businessName && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="tradingName">Trading Name (if different)</Label>
                <Input
                  id="tradingName"
                  {...register('tradingName')}
                  placeholder="e.g., Smith Plumbing"
                />
              </div>

              <div>
                <Label htmlFor="abn">ABN *</Label>
                <Input
                  id="abn"
                  {...register('abn', {
                    required: 'ABN is required',
                    pattern: {
                      value: /^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/,
                      message: 'Invalid ABN format',
                    },
                  })}
                  placeholder="XX XXX XXX XXX"
                />
                {errors.abn && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.abn.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  {...register('contactName', { required: 'Contact name is required' })}
                  placeholder="Full name"
                />
                {errors.contactName && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register('contactEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email',
                    },
                  })}
                  placeholder="work@example.com.au"
                />
                {errors.contactEmail && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  {...register('contactPhone', { required: 'Phone is required' })}
                  placeholder="04XX XXX XXX"
                />
                {errors.contactPhone && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Licence ── */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Trade Licence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="tradeType">Trade Type *</Label>
                <select
                  id="tradeType"
                  {...register('tradeType', { required: 'Trade type is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={!!requiredTradeType}
                >
                  <option value="">Select trade type</option>
                  {(Object.entries(TRADE_TYPE_LABELS) as [SubContractorTradeType, string][]).map(
                    ([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    )
                  )}
                </select>
                {errors.tradeType && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.tradeType.message}</p>
                )}
              </div>

              {selectedTradeType && (
                <Alert className="sm:col-span-2 border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Required: <strong>{TRADE_TYPE_LICENCE_LABEL[selectedTradeType]}</strong>
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="licenceNumber">Licence Number *</Label>
                <Input
                  id="licenceNumber"
                  {...register('licenceNumber', { required: 'Licence number is required' })}
                  placeholder="e.g., PL123456"
                />
                {errors.licenceNumber && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.licenceNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="licenceState">Issuing State/Territory *</Label>
                <select
                  id="licenceState"
                  {...register('licenceState', { required: 'State is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select state</option>
                  {AUSTRALIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.licenceState && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.licenceState.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="licenceExpiry">Licence Expiry Date *</Label>
                <input
                  id="licenceExpiry"
                  type="date"
                  {...register('licenceExpiry', {
                    required: 'Expiry date is required',
                    validate: (v) =>
                      new Date(v) > new Date() || 'Licence has expired — cannot be registered',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.licenceExpiry && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.licenceExpiry.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Insurance ── */}
        {step === 3 && (
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Public Liability Insurance
            </h3>

            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Minimum coverage required: <strong>$5,000,000</strong>. Certificate of currency
                must be available on request.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="publicLiabilityInsurer">Insurer Name *</Label>
                <Input
                  id="publicLiabilityInsurer"
                  {...register('publicLiabilityInsurer', { required: 'Insurer name is required' })}
                  placeholder="e.g., QBE Insurance"
                />
                {errors.publicLiabilityInsurer && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.publicLiabilityInsurer.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="publicLiabilityCoverage">Coverage Amount (AUD) *</Label>
                <Input
                  id="publicLiabilityCoverage"
                  type="number"
                  {...register('publicLiabilityCoverage', {
                    required: 'Coverage amount is required',
                    min: {
                      value: MIN_PUBLIC_LIABILITY_AUD,
                      message: `Minimum coverage is $${MIN_PUBLIC_LIABILITY_AUD.toLocaleString()}`,
                    },
                  })}
                  placeholder="e.g., 5000000"
                />
                {errors.publicLiabilityCoverage && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.publicLiabilityCoverage.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="publicLiabilityExpiry">Policy Expiry Date *</Label>
                <input
                  id="publicLiabilityExpiry"
                  type="date"
                  {...register('publicLiabilityExpiry', {
                    required: 'Expiry date is required',
                    validate: (v) =>
                      new Date(v) > new Date() || 'Insurance policy has expired',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.publicLiabilityExpiry && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.publicLiabilityExpiry.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Agreement ── */}
        {step === 4 && (
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-600" />
              Sub-Contractor Agreement
            </h3>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800 text-sm">
                Read the agreement in full before signing. By electronically signing, you confirm
                you have read, understood, and agree to all terms.
              </AlertDescription>
            </Alert>

            {/* Agreement text */}
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono leading-relaxed">
                {NRPG_SUB_CONTRACTOR_AGREEMENT}
              </pre>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('agreementAccepted', {
                    required: 'You must accept the agreement to proceed',
                  })}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the NRPG Sub-Contractor Agreement. I confirm all
                  information provided is accurate. I understand that false information will result
                  in removal from the NRPG network.
                </span>
              </label>
              {errors.agreementAccepted && (
                <p role="alert" className="text-red-500 text-sm">{errors.agreementAccepted.message}</p>
              )}

              <div>
                <Label htmlFor="electronicSignature">
                  Electronic Signature (Full Legal Name) *
                </Label>
                <Input
                  id="electronicSignature"
                  {...register('electronicSignature', {
                    required: 'Electronic signature is required',
                    minLength: { value: 3, message: 'Enter your full legal name' },
                  })}
                  placeholder="Type your full legal name to sign"
                />
                <p className="text-xs text-gray-500 mt-1">
                  By typing your name, you are electronically signing this agreement.
                </p>
                {errors.electronicSignature && (
                  <p role="alert" className="text-red-500 text-sm mt-1">{errors.electronicSignature.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="signatureDate">Date</Label>
                <input
                  id="signatureDate"
                  type="date"
                  {...register('signatureDate', { required: 'Date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={step === 1 ? onCancel : () => setStep((s) => s - 1)}
            className="border-white/30 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-white border-white/30">
              Step {step} of {STEPS.length}
            </Badge>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={step === 4 && !agreementAccepted}
            >
              {step === 4 ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Help note */}
      <p className="text-white/60 text-sm text-center">
        All information is verified against ABR and licence registries.{' '}
        <a href="/contact" className="text-white/80 underline">
          Contact NRPG
        </a>{' '}
        if you need assistance.
      </p>
    </div>
  );
}
