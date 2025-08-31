'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Building2, 
  FileText, 
  Shield,
  AlertCircle,
  DollarSign,
  Info,
  Lock
} from 'lucide-react';

interface BankingPaymentData {
  // Business Banking
  bankName: string;
  accountName: string;
  bsb: string;
  accountNumber: string;
  
  // Tax Information
  abn: string;
  gstRegistered: boolean;
  taxFileNumber?: string;
  
  // Payment Preferences
  preferredPaymentMethod: 'eft' | 'cheque' | 'credit_card';
  paymentTerms: '7days' | '14days' | '30days' | '45days';
  invoiceEmail: string;
  
  // Insurance Claim Experience
  insuranceDirectBilling: boolean;
  preferredInsurers: string[];
  xactimateAccess: boolean;
  xactimateEmail?: string;
  
  // Financial Information
  creditLimit: string;
  tradesmanInsurance: boolean;
  publicLiabilityLimit: string;
  
  // Payment Processing
  acceptCreditCards: boolean;
  merchantProvider?: string;
  
  // Terms Agreement
  agreeToTerms: boolean;
  agreeToFees: boolean;
  understandPaymentTerms: boolean;
  
  // Additional Information
  financialReference?: string;
  accountantContact?: string;
}

interface Step6Props {
  data: Partial<BankingPaymentData>;
  onNext: (data: BankingPaymentData) => void;
  onBack: () => void;
}

const preferredInsurersOptions = [
  'QBE Insurance',
  'Suncorp',
  'Allianz',
  'NRMA Insurance',
  'RACQ Insurance',
  'CGU Insurance',
  'IAG',
  'Zurich',
  'Vero Insurance',
  'Youi',
  'Budget Direct',
  'AAMI'
];

export default function Step6BankingPayment({ data, onNext, onBack }: Step6Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<BankingPaymentData>({
    defaultValues: {
      ...data,
      preferredInsurers: data.preferredInsurers || []
    }
  });

  const [selectedInsurers, setSelectedInsurers] = useState<string[]>(
    data.preferredInsurers || []
  );

  const gstRegistered = watch('gstRegistered');
  const insuranceDirectBilling = watch('insuranceDirectBilling');
  const xactimateAccess = watch('xactimateAccess');
  const acceptCreditCards = watch('acceptCreditCards');
  const agreeToTerms = watch('agreeToTerms');
  const agreeToFees = watch('agreeToFees');
  const understandPaymentTerms = watch('understandPaymentTerms');

  const toggleInsurer = (insurer: string) => {
    setSelectedInsurers(prev =>
      prev.includes(insurer)
        ? prev.filter(i => i !== insurer)
        : [...prev, insurer]
    );
  };

  const onSubmit = (formData: BankingPaymentData) => {
    const completeData = {
      ...formData,
      preferredInsurers: selectedInsurers
    };
    onNext(completeData);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Banking & Payment Details</h2>
        <p className="mt-2 text-gray-600">
          Provide your banking information and payment preferences for seamless transactions
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Lock className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Your banking information is encrypted and stored securely. We comply with Australian banking and privacy regulations.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Business Banking Details */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-blue-600" />
            Business Banking Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                {...register('bankName', { required: 'Bank name is required' })}
                placeholder="e.g., Commonwealth Bank"
              />
              {errors.bankName && (
                <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                {...register('accountName', { required: 'Account name is required' })}
                placeholder="e.g., ABC Restoration Pty Ltd"
              />
              {errors.accountName && (
                <p className="text-red-500 text-sm mt-1">{errors.accountName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="bsb">BSB</Label>
              <Input
                id="bsb"
                {...register('bsb', { 
                  required: 'BSB is required',
                  pattern: {
                    value: /^\d{3}-?\d{3}$/,
                    message: 'Invalid BSB format (must be 6 digits)'
                  }
                })}
                placeholder="e.g., 062-000"
                maxLength={7}
              />
              {errors.bsb && (
                <p className="text-red-500 text-sm mt-1">{errors.bsb.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                {...register('accountNumber', { 
                  required: 'Account number is required',
                  pattern: {
                    value: /^\d{4,10}$/,
                    message: 'Invalid account number'
                  }
                })}
                placeholder="e.g., 12345678"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-600" />
            Tax Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="abn">ABN (Australian Business Number)</Label>
              <Input
                id="abn"
                {...register('abn', { 
                  required: 'ABN is required',
                  pattern: {
                    value: /^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/,
                    message: 'Invalid ABN format'
                  }
                })}
                placeholder="e.g., 12 345 678 901"
              />
              {errors.abn && (
                <p className="text-red-500 text-sm mt-1">{errors.abn.message}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Checkbox 
                id="gstRegistered"
                checked={gstRegistered}
                onCheckedChange={(checked) => setValue('gstRegistered', checked as boolean)}
              />
              <Label htmlFor="gstRegistered">GST Registered</Label>
            </div>
            
            {gstRegistered && (
              <div>
                <Label htmlFor="taxFileNumber">Tax File Number (Optional)</Label>
                <Input
                  id="taxFileNumber"
                  {...register('taxFileNumber')}
                  placeholder="For tax withholding purposes"
                />
              </div>
            )}
          </div>
        </div>

        {/* Payment Preferences */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-purple-600" />
            Payment Preferences
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label>Preferred Payment Method</Label>
              <RadioGroup 
                defaultValue={data.preferredPaymentMethod || 'eft'}
                onValueChange={(value) => setValue('preferredPaymentMethod', value as any)}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="eft" id="eft" />
                  <Label htmlFor="eft">Electronic Funds Transfer (EFT)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cheque" id="cheque" />
                  <Label htmlFor="cheque">Cheque</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Credit Card</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Payment Terms</Label>
                <select
                  {...register('paymentTerms', { required: 'Payment terms are required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Terms</option>
                  <option value="7days">7 Days</option>
                  <option value="14days">14 Days</option>
                  <option value="30days">30 Days</option>
                  <option value="45days">45 Days</option>
                </select>
                {errors.paymentTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.paymentTerms.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="invoiceEmail">Invoice Email Address</Label>
                <Input
                  id="invoiceEmail"
                  type="email"
                  {...register('invoiceEmail', { 
                    required: 'Invoice email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2 }$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="accounts@example.com"
                />
                {errors.invoiceEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.invoiceEmail.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptCreditCards"
                  checked={acceptCreditCards}
                  onCheckedChange={(checked) => setValue('acceptCreditCards', checked as boolean)}
                />
                <Label htmlFor="acceptCreditCards">We accept credit card payments from clients</Label>
              </div>
              
              {acceptCreditCards && (
                <div className="ml-6">
                  <Label htmlFor="merchantProvider">Merchant Provider</Label>
                  <Input
                    id="merchantProvider"
                    {...register('merchantProvider')}
                    placeholder="e.g., Square, PayPal, Stripe"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insurance Billing */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-indigo-600" />
            Insurance Billing Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="insuranceDirectBilling"
                checked={insuranceDirectBilling}
                onCheckedChange={(checked) => setValue('insuranceDirectBilling', checked as boolean)}
              />
              <Label htmlFor="insuranceDirectBilling">We offer direct billing to insurance companies</Label>
            </div>
            
            {insuranceDirectBilling && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Preferred Insurance Companies (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {preferredInsurersOptions.map((insurer) => (
                    <label
                      key={insurer}
                      className={`flex items-center p-2 border rounded cursor-pointer text-sm ${
                        selectedInsurers.includes(insurer)
                          ? 'bg-blue-50 border-blue-500'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedInsurers.includes(insurer)}
                        onChange={() => toggleInsurer(insurer)}
                        className="mr-2"
                      />
                      {insurer}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="xactimateAccess"
                checked={xactimateAccess}
                onCheckedChange={(checked) => setValue('xactimateAccess', checked as boolean)}
              />
              <Label htmlFor="xactimateAccess">We have Xactimate access for estimating</Label>
            </div>
            
            {xactimateAccess && (
              <div className="ml-6">
                <Label htmlFor="xactimateEmail">Xactimate Account Email</Label>
                <Input
                  id="xactimateEmail"
                  type="email"
                  {...register('xactimateEmail')}
                  placeholder="xactimate@example.com"
                />
              </div>
            )}
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-orange-600" />
            Financial Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="creditLimit">Requested Credit Limit</Label>
              <Input
                id="creditLimit"
                {...register('creditLimit', { required: 'Credit limit is required' })}
                placeholder="e.g., $50,000"
              />
              {errors.creditLimit && (
                <p className="text-red-500 text-sm mt-1">{errors.creditLimit.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="publicLiabilityLimit">Public Liability Insurance Limit</Label>
              <Input
                id="publicLiabilityLimit"
                {...register('publicLiabilityLimit', { required: 'Public liability limit is required' })}
                placeholder="e.g., $20,000,000"
              />
              {errors.publicLiabilityLimit && (
                <p className="text-red-500 text-sm mt-1">{errors.publicLiabilityLimit.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="financialReference">Financial Reference (Optional)</Label>
              <Input
                id="financialReference"
                {...register('financialReference')}
                placeholder="e.g., Bank Manager Contact"
              />
            </div>
            
            <div>
              <Label htmlFor="accountantContact">Accountant Contact (Optional)</Label>
              <Input
                id="accountantContact"
                {...register('accountantContact')}
                placeholder="e.g., John Smith CPA - "
              />
            </div>
          </div>
        </div>

        {/* Terms and Agreements */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Terms and Agreements</h3>
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please review and accept the following terms to proceed with your application
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">NRP Platform Fees</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Application Fee: $275 (one-time, non-refundable)</li>
                <li>• Joining Fee: $2,200 (upon approval)</li>
                <li>• Monthly Subscription: $495 (after 3-month ramp-up period)</li>
                <li>• Lead Distribution Fee: 5-10% of project value</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the NRP Terms of Service and understand the contractor obligations
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="agreeToFees"
                  checked={agreeToFees}
                  onCheckedChange={(checked) => setValue('agreeToFees', checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agreeToFees" className="text-sm">
                  I understand and accept the fee structure outlined above
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="understandPaymentTerms"
                  checked={understandPaymentTerms}
                  onCheckedChange={(checked) => setValue('understandPaymentTerms', checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="understandPaymentTerms" className="text-sm">
                  I understand that payment terms apply to all lead distributions and services
                </Label>
              </div>
            </div>
            
            {(!agreeToTerms || !agreeToFees || !understandPaymentTerms) && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  You must accept all terms and agreements to proceed with your application
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            type="submit"
            disabled={!agreeToTerms || !agreeToFees || !understandPaymentTerms}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}