'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  CreditCard,
  Building2,
  MapPin,
  DollarSign,
  Shield,
  Info,
  CheckCircle,
  AlertCircle,
  Calculator,
  Zap,
  Lock,
  FileText,
  TrendingUp,
  Users,
  Briefcase
} from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';

interface Step5SubscriptionProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

interface SubscriptionTier {
  id: string;
  name: string;
  radius: number;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'TIER_25KM',
    name: '25km Urban',
    radius: 25,
    price: 495,
    description: 'Perfect for contractors focused on inner-city and urban areas',
    features: [
      'Up to 25km service radius',
      'Priority urban leads',
      'Standard support',
      'Monthly performance reports'
    ]
  },
  {
    id: 'TIER_50KM',
    name: '50km Metro',
    radius: 50,
    price: 795,
    description: 'Ideal for metropolitan coverage with suburban reach',
    features: [
      'Up to 50km service radius',
      'Metro & suburban leads',
      'Priority support',
      'Weekly performance reports',
      'Marketing co-op access'
    ],
    recommended: true
  },
  {
    id: 'TIER_75KM',
    name: '75km Regional',
    radius: 75,
    price: 995,
    description: 'Extended coverage for regional service areas',
    features: [
      'Up to 75km service radius',
      'Regional priority status',
      'Dedicated account manager',
      'Daily performance reports',
      'Enhanced marketing support'
    ]
  },
  {
    id: 'TIER_100KM',
    name: '100km+ Rural',
    radius: 100,
    price: 1295,
    description: 'Maximum coverage for rural and remote areas',
    features: [
      '100km+ service radius',
      'Rural territory exclusivity',
      'Premium support 24/7',
      'Real-time lead notifications',
      'Full marketing partnership'
    ]
  }
];

export function Step5Subscription({ data, updateData, errors }: Step5SubscriptionProps) {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [ruralExtension, setRuralExtension] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [billingDetails, setBillingDetails] = useState({
    accountHolder: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPostcode: '',
    billingEmail: '',
    // Payment method specific fields
    accountName: '',
    bsb: '',
    accountNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardholderName: ''
  });
  
  const [backgroundCheckPaid, setBackgroundCheckPaid] = useState(false);
  const [performanceBondAgreed, setPerformanceBondAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Calculate total monthly cost
  const calculateMonthlyCost = (): number => {
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === selectedTier);
    const baseCost = tier?.price || 0;
    const extensionCost = ruralExtension * 35;
    return baseCost + extensionCost;
  };

  // Calculate annual savings
  const calculateAnnualSavings = (): number => {
    const monthly = calculateMonthlyCost();
    return monthly * 12 * 0.10; // 10% discount for annual payment
  };

  // Calculate performance bond amount
  const calculateBondAmount = (): number => {
    const monthly = calculateMonthlyCost();
    return Math.max(monthly * 0.10, 500); // 10% of monthly or $500 minimum
  };

  // Format card number
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format card expiry
  const formatCardExpiry = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Process background check payment
  const processBackgroundCheckPayment = async () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setBackgroundCheckPaid(true);
      setProcessingPayment(false);
    }, 2000);
  };

  // Validate payment details
  const validatePaymentDetails = (): boolean => {
    if (!paymentMethod) return false;
    
    if (paymentMethod === 'DIRECT_DEBIT') {
      return !!(billingDetails.accountName && billingDetails.bsb && billingDetails.accountNumber);
    } else if (paymentMethod === 'CREDIT_CARD') {
      return !!(billingDetails.cardNumber && billingDetails.cardExpiry && billingDetails.cardCvv);
    }
    
    return true;
  };

  // Check if all requirements are met
  const allRequirementsMet = (): boolean => {
    return !!(
      selectedTier &&
      billingDetails.accountHolder &&
      billingDetails.billingAddress &&
      billingDetails.billingEmail &&
      paymentMethod &&
      validatePaymentDetails() &&
      backgroundCheckPaid &&
      performanceBondAgreed &&
      termsAgreed
    );
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <DollarSign className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Subscription & Fees:</strong> Select your coverage tier and complete payment setup. 
          All fees are GST inclusive. Your first month's subscription begins upon approval.
        </AlertDescription>
      </Alert>

      {/* Subscription Tier Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Your Subscription Tier
          </CardTitle>
          <CardDescription>
            Choose the coverage area that best suits your business capacity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTier === tier.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.recommended && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedTier === tier.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedTier === tier.id && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{tier.name}</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      ${tier.price}<span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{tier.description}</p>
                    
                    <ul className="mt-3 space-y-1">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rural Extension Option */}
          {selectedTier === 'TIER_100KM' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="font-medium">Rural Extension Coverage</Label>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Add additional coverage beyond 100km at $35/month per 25km radius
              </p>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRuralExtension(Math.max(0, ruralExtension - 25))}
                  disabled={ruralExtension === 0}
                >
                  -25km
                </Button>
                <div className="text-center">
                  <p className="font-semibold">{100 + ruralExtension}km</p>
                  <p className="text-xs text-gray-500">Total radius</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRuralExtension(ruralExtension + 25)}
                >
                  +25km
                </Button>
                {ruralExtension > 0 && (
                  <div className="ml-auto text-right">
                    <p className="font-semibold text-green-600">+${ruralExtension * 35 / 25}/mo</p>
                    <p className="text-xs text-gray-500">Extension cost</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Account Holder Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Business or individual name"
                value={billingDetails.accountHolder}
                onChange={(e) => setBillingDetails({...billingDetails, accountHolder: e.target.value})}
                className={errors['billing.accountHolder'] ? 'border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Billing Contact Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="accounts@company.com.au"
                value={billingDetails.billingEmail}
                onChange={(e) => setBillingDetails({...billingDetails, billingEmail: e.target.value})}
                className={errors['billing.email'] ? 'border-red-500' : ''}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Billing Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="123 Business Street"
              value={billingDetails.billingAddress}
              onChange={(e) => setBillingDetails({...billingDetails, billingAddress: e.target.value})}
              className={errors['billing.address'] ? 'border-red-500' : ''}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                type="text"
                placeholder="Sydney"
                value={billingDetails.billingCity}
                onChange={(e) => setBillingDetails({...billingDetails, billingCity: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>State</Label>
              <Select
                value={billingDetails.billingState}
                onValueChange={(value) => setBillingDetails({...billingDetails, billingState: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">NSW</SelectItem>
                  <SelectItem value="VIC">VIC</SelectItem>
                  <SelectItem value="QLD">QLD</SelectItem>
                  <SelectItem value="WA">WA</SelectItem>
                  <SelectItem value="SA">SA</SelectItem>
                  <SelectItem value="TAS">TAS</SelectItem>
                  <SelectItem value="ACT">ACT</SelectItem>
                  <SelectItem value="NT">NT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Postcode</Label>
              <Input
                type="text"
                placeholder="2000"
                maxLength={4}
                value={billingDetails.billingPostcode}
                onChange={(e) => setBillingDetails({...billingDetails, billingPostcode: e.target.value.replace(/\D/g, '')})}
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label>Payment Method <span className="text-red-500">*</span></Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="DIRECT_DEBIT" id="direct-debit" />
                  <Label htmlFor="direct-debit" className="cursor-pointer flex-1">
                    <div className="font-medium">Direct Debit</div>
                    <div className="text-xs text-gray-500">Bank account</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="CREDIT_CARD" id="credit-card" />
                  <Label htmlFor="credit-card" className="cursor-pointer flex-1">
                    <div className="font-medium">Credit Card</div>
                    <div className="text-xs text-gray-500">Visa/Mastercard</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="BANK_TRANSFER" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="cursor-pointer flex-1">
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-xs text-gray-500">Manual payment</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {/* Direct Debit Fields */}
            {paymentMethod === 'DIRECT_DEBIT' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label>Account Name</Label>
                  <Input
                    type="text"
                    placeholder="Account holder name"
                    value={billingDetails.accountName}
                    onChange={(e) => setBillingDetails({...billingDetails, accountName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>BSB</Label>
                  <Input
                    type="text"
                    placeholder="XXX-XXX"
                    maxLength={7}
                    value={billingDetails.bsb}
                    onChange={(e) => setBillingDetails({...billingDetails, bsb: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    type="text"
                    placeholder="XXXXXXXXX"
                    value={billingDetails.accountNumber}
                    onChange={(e) => setBillingDetails({...billingDetails, accountNumber: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Credit Card Fields */}
            {paymentMethod === 'CREDIT_CARD' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label>Cardholder Name</Label>
                  <Input
                    type="text"
                    placeholder="Name on card"
                    value={billingDetails.cardholderName}
                    onChange={(e) => setBillingDetails({...billingDetails, cardholderName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    value={billingDetails.cardNumber}
                    onChange={(e) => setBillingDetails({...billingDetails, cardNumber: formatCardNumber(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={billingDetails.cardExpiry}
                    onChange={(e) => setBillingDetails({...billingDetails, cardExpiry: formatCardExpiry(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    placeholder="XXX"
                    maxLength={3}
                    value={billingDetails.cardCvv}
                    onChange={(e) => setBillingDetails({...billingDetails, cardCvv: e.target.value.replace(/\D/g, '')})}
                  />
                </div>
              </div>
            )}

            {/* Bank Transfer Info */}
            {paymentMethod === 'BANK_TRANSFER' && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <Info className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  Bank transfer details will be provided after application approval. 
                  Payment must be received within 7 days of approval to activate your account.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Background Check Fee */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Background Check Fee
          </CardTitle>
          <CardDescription>
            One-time payment for comprehensive third-party screening
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              <strong>Fee To Be Determined:</strong> The background check provider is currently being 
              finalized. Estimated cost: $2,500 - $5,000 (one-time fee).
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-semibold">Professional Background Screening</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive checks by accredited third-party provider (TBD)
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-500">$2,500 - $5,000</p>
                <p className="text-xs text-gray-500">Estimated one-time fee</p>
              </div>
            </div>

            <ul className="space-y-1 mb-4">
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                <span>Comprehensive identity verification</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                <span>National criminal history check</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                <span>Credit assessment and financial verification</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                <span>Professional references and work history verification</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                <span>Director and business entity verification</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                <span>Insurance and certification validation</span>
              </li>
            </ul>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The exact fee will be confirmed before payment is required. 
                You will be notified once the third-party provider is selected and the final fee is determined.
              </p>
            </div>

            {/* Temporary acknowledgment instead of payment */}
            <div className="mt-4 flex items-start space-x-3">
              <Checkbox
                id="background-check-acknowledge"
                checked={backgroundCheckPaid}
                onCheckedChange={(checked) => setBackgroundCheckPaid(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="background-check-acknowledge" className="font-normal cursor-pointer">
                  I understand and accept the estimated background check fee
                </Label>
                <p className="text-xs text-gray-600">
                  I acknowledge that a background check fee of approximately $2,500-$5,000 will be 
                  required before final approval. The exact amount will be confirmed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Bond Agreement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Performance Bond Agreement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Performance Bond Details:</strong>
              <ul className="mt-2 ml-4 list-disc text-sm">
                <li>Bond Amount: ${calculateBondAmount().toFixed(2)} (10% of monthly subscription or $500 minimum)</li>
                <li>Held as security for quality assurance and compliance</li>
                <li>Refundable after 12 months of good standing</li>
                <li>May be used to cover client claims or compliance breaches</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-3 border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="performance-bond"
                checked={performanceBondAgreed}
                onCheckedChange={(checked) => setPerformanceBondAgreed(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="performance-bond" className="font-normal cursor-pointer">
                  I agree to the Performance Bond terms <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-600">
                  I consent to withholding ${calculateBondAmount().toFixed(2)} as a performance bond, 
                  refundable after 12 months subject to terms and conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="payment-terms"
                checked={termsAgreed}
                onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="payment-terms" className="font-normal cursor-pointer">
                  I accept the payment terms and conditions <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-600">
                  Including automatic monthly billing, lead fees, and cancellation policy.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Summary */}
      {selectedTier && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Cost Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Subscription</span>
                <span className="font-semibold">
                  ${SUBSCRIPTION_TIERS.find(t => t.id === selectedTier)?.price.toFixed(2)}/mo
                </span>
              </div>
              
              {ruralExtension > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Rural Extension ({ruralExtension}km)</span>
                  <span className="font-semibold">
                    +${(ruralExtension * 35 / 25).toFixed(2)}/mo
                  </span>
                </div>
              )}
              
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total Monthly</span>
                <span className="text-green-600">${calculateMonthlyCost().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Performance Bond (one-time)</span>
                <span>${calculateBondAmount().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Background Check (one-time)</span>
                <span className="text-gray-500">$2,500-$5,000 (TBD)</span>
              </div>

              <Alert className="bg-blue-50 border-blue-200 mt-4">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 text-sm">
                  <strong>Save ${calculateAnnualSavings().toFixed(2)}/year</strong> with annual billing
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Status */}
      <Alert className={allRequirementsMet() ? "bg-green-50 border-green-300" : "bg-yellow-50 border-yellow-300"}>
        <Info className={allRequirementsMet() ? "h-4 w-4 text-green-600" : "h-4 w-4 text-yellow-600"} />
        <AlertDescription className={allRequirementsMet() ? "text-green-800" : "text-yellow-800"}>
          <strong>Subscription Requirements:</strong>
          <ul className="mt-2 ml-4 list-disc text-sm">
            <li className={selectedTier ? "text-green-700" : ""}>
              Subscription Tier: {selectedTier ? `✓ ${SUBSCRIPTION_TIERS.find(t => t.id === selectedTier)?.name}` : "Required"}
            </li>
            <li className={billingDetails.accountHolder && billingDetails.billingAddress ? "text-green-700" : ""}>
              Billing Details: {billingDetails.accountHolder ? "✓ Complete" : "Required"}
            </li>
            <li className={paymentMethod && validatePaymentDetails() ? "text-green-700" : ""}>
              Payment Method: {paymentMethod ? `✓ ${paymentMethod.replace('_', ' ')}` : "Required"}
            </li>
            <li className={backgroundCheckPaid ? "text-green-700" : ""}>
              Background Check Fee: {backgroundCheckPaid ? "✓ Paid" : "Payment required"}
            </li>
            <li className={performanceBondAgreed && termsAgreed ? "text-green-700" : ""}>
              Agreements: {performanceBondAgreed && termsAgreed ? "✓ Accepted" : "Required"}
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}