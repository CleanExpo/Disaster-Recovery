'use client';


import Link from 'next/link';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertCircle,
  CreditCard,
  CheckCircle2,
  Info,
  Phone,
  FileText,
  Shield,
  Clock,
  DollarSign,
  User,
  Home,
  AlertTriangle
} from 'lucide-react';

const PLATFORM_FEE = 2750.00;

// Clear selected/unselected checkbox style
const CHECKBOX_CLASS =
  'h-5 w-5 rounded border-2 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white shrink-0';

// Map cost estimator damage types to claim form damage types
const ESTIMATOR_TO_CLAIM_DAMAGE: Record<string, string> = {
  'water-damage': 'Water/Flood Damage',
  'fire-damage': 'Fire/Smoke Damage',
  'mould-removal': 'Mould Growth',
  'flood-restoration': 'Water/Flood Damage',
  'storm-damage': 'Storm/Wind Damage',
  'sewage': 'Sewage Overflow',
  'biohazard': 'Biohazard Contamination',
};

const ESTIMATOR_TO_URGENCY: Record<string, string> = {
  'emergency': 'emergency',
  'urgent': 'urgent',
  'scheduled': 'standard',
};

const QUICK_FILL_SCENARIOS: Record<string, Record<string, unknown>> = {
  burstPipe: {
    fullName: 'Alex Taylor',
    phone: '0400123456',
    email: 'alex.taylor@example.com',
    propertyAddress: '25 King Street',
    suburb: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    propertyType: 'house',
    damageTypes: ['Water/Flood Damage'],
    damageDate: new Date().toISOString().slice(0, 10),
    damageDescription: 'Burst pipe in kitchen caused water damage to flooring and cabinetry.',
    urgencyLevel: 'emergency',
    hazards: ['Standing water'],
    hasInsurance: true,
    insuranceCompany: 'Suncorp',
    policyNumber: 'POL-123456',
    hasPhotos: true
  },
  stormDamage: {
    fullName: 'Jordan Lee',
    phone: '0411222333',
    email: 'jordan.lee@example.com',
    propertyAddress: '82 Main Road',
    suburb: 'Newcastle',
    state: 'NSW',
    postcode: '2300',
    propertyType: 'house',
    damageTypes: ['Storm/Wind Damage', 'Structural Damage'],
    damageDate: new Date().toISOString().slice(0, 10),
    damageDescription: 'Storm damage to roof and ceiling leaks in living room.',
    urgencyLevel: 'urgent',
    hazards: ['Structural instability'],
    hasInsurance: true,
    insuranceCompany: 'NRMA',
    policyNumber: 'POL-789012',
    hasPhotos: true
  },
  mouldClaim: {
    fullName: 'Casey Morgan',
    phone: '0422333444',
    email: 'casey.morgan@example.com',
    propertyAddress: '14 River Drive',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    propertyType: 'apartment',
    damageTypes: ['Mould Growth'],
    damageDate: new Date().toISOString().slice(0, 10),
    damageDescription: 'Visible mould growth in bathroom and bedroom walls after long-term leak.',
    urgencyLevel: 'standard',
    hazards: ['Mould growth'],
    hasInsurance: false,
    policyNumber: '',
    hasPhotos: true
  }
};

function OnlineClaimPageOriginal() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [claimId, setClaimId] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Read cost estimator data from URL params (sync from both useSearchParams and window so client nav is reliable)
  const applyParamsToForm = useCallback((params: URLSearchParams) => {
    const estimateLow = params.get('estimateLow');
    const estimateHigh = params.get('estimateHigh');
    const damageType = params.get('damageType');
    const urgency = params.get('urgency');
    const propertyType = params.get('propertyType');

    if (estimateLow && estimateHigh) {
      setEstimate({ low: Number(estimateLow), high: Number(estimateHigh) });
    }

    const updates: Record<string, unknown> = {};
    if (damageType && ESTIMATOR_TO_CLAIM_DAMAGE[damageType]) {
      updates.damageTypes = [ESTIMATOR_TO_CLAIM_DAMAGE[damageType]];
    }
    if (urgency && ESTIMATOR_TO_URGENCY[urgency]) {
      updates.urgencyLevel = ESTIMATOR_TO_URGENCY[urgency];
    }
    if (propertyType) {
      updates.propertyType = propertyType === 'commercial' ? 'commercial' : 'house';
    }
    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) applyParamsToForm(params);
  }, [applyParamsToForm]);

  useEffect(() => {
    if (!searchParams) return;
    const estimateLow = searchParams.get('estimateLow');
    const estimateHigh = searchParams.get('estimateHigh');
    if (!estimateLow && !estimateHigh && !searchParams.get('damageType')) return;
    applyParamsToForm(searchParams);
  }, [searchParams, applyParamsToForm]);

  const [formData, setFormData] = useState({
    // Client Information
    fullName: '',
    phone: '',
    email: '',
    preferredContact: 'phone',

    // Property Information
    propertyAddress: '',
    suburb: '',
    state: '',
    postcode: '',
    propertyType: '',
    accessInstructions: '',

    // Damage Information
    damageTypes: [] as string[],
    damageDate: '',
    damageDescription: '',
    affectedAreas: '',
    urgencyLevel: '',
    hazards: [] as string[],

    // Insurance Information
    hasInsurance: false,
    insuranceCompany: '',
    policyNumber: '',
    insuranceClaimNumber: '',
    excessAmount: '',
    assessorDetails: '',

    // Documentation
    hasPhotos: false,
    uploadedDocuments: [] as string[],

    // Authorizations
    authorizePropertyAccess: false,
    authorizeInsuranceLiaison: false,
    authorizeWorkCommencement: false,

    // Payment
    paymentMethod: 'card',
    paymentConfirmed: false,
    paymentAmount: PLATFORM_FEE,

    // Terms
    understandPlatformRole: false,
    acceptContractorCommunication: false,
    agreeToTerms: false
  });

  const step1Complete = Boolean(
    formData.fullName?.trim() &&
    formData.phone?.trim() &&
    formData.email?.trim() &&
    formData.propertyAddress?.trim() &&
    formData.suburb?.trim() &&
    formData.state?.trim() &&
    formData.postcode?.trim() &&
    formData.propertyType &&
    formData.damageDescription?.trim() &&
    formData.damageTypes.length > 0
  );

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.propertyAddress || !formData.suburb || !formData.state || !formData.postcode || !formData.damageDescription || formData.damageTypes.length === 0) {
      setSubmissionError('Please complete required fields in steps 1-2 before submitting.');
      setStep(1);
      return;
    }

    if (!formData.understandPlatformRole || !formData.acceptContractorCommunication || !formData.agreeToTerms) {
      setSubmissionError('Please accept all terms and conditions.');
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/claims/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentConfirmed: false,
          paymentAmount: 0
        })
      });

      const result = await response.json();

      if (result.success) {
        setClaimId(result.claimId);
        setStep(5); // Success step
      } else {
        setSubmissionError(result.message || 'Failed to submit claim');
      }
    } catch {
      setSubmissionError('Error submitting claim. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const applyQuickFill = () => {
    if (!selectedScenario || !QUICK_FILL_SCENARIOS[selectedScenario]) return;
    setFormData(prev => ({ ...prev, ...QUICK_FILL_SCENARIOS[selectedScenario] }));
  };

  const damageTypeOptions = [
    'Water/Flood Damage',
    'Fire/Smoke Damage',
    'Storm/Wind Damage',
    'Mould Growth',
    'Sewage Overflow',
    'Structural Damage',
    'Asbestos Exposure',
    'Biohazard Contamination'
  ];

  const hazardOptions = [
    'Electrical hazards',
    'Structural instability',
    'Asbestos present',
    'Sewage contamination',
    'Mould growth',
    'Chemical exposure',
    'Standing water',
    'Gas leak'
  ];

  if (step === 5 && claimId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Claim Submitted Successfully</CardTitle>
              <CardDescription>
                Your claim ID: <strong className="text-xl">{claimId}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your claim has been received and is being assigned to a contractor now.
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What Happens Next
                </h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Your claim is being matched with a certified NRPG contractor</li>
                  <li>2. <strong className="text-red-600">The contractor will call you directly within 60 MINUTES</strong></li>
                  <li>3. They will schedule an inspection at your convenience</li>
                  <li>4. The contractor handles all work and insurance liaison</li>
                  <li>5. All future communication is directly with your contractor</li>
                </ol>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Disaster Recovery is a lead generation platform.
                  Your assigned contractor will handle all service delivery, communication, and work completion
                  according to strict NRPG standards.
                </AlertDescription>
              </Alert>

              <div className="text-center pt-4">
                <Button
                  onClick={() => window.location.href = `/track/${claimId}`}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Track Your Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Submit Online Claim</h1>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:max-w-sm w-full">
            <Label className="text-xs font-semibold text-green-900">Quick Fill Scenario</Label>
            <div className="mt-2 flex gap-2">
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="burstPipe">Burst Pipe (Emergency)</SelectItem>
                  <SelectItem value="stormDamage">Storm Damage (Urgent)</SelectItem>
                  <SelectItem value="mouldClaim">Mould Claim (Standard)</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={applyQuickFill} className="bg-green-700 hover:bg-green-800">
                Fill
              </Button>
            </div>
          </div>
        </div>

        {submissionError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{submissionError}</AlertDescription>
          </Alert>
        )}

        {/* Pricing Breakdown Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Emergency Make-Safe Fee: ${PLATFORM_FEE.toFixed(2)}
          </h2>
          <div className="space-y-1.5 text-sm text-gray-700 ml-7">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">├─</span>
              <span><strong>$550</strong> Platform Fee (contractor matching + claims documentation)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">├─</span>
              <span><strong>$2,200</strong> Held for Your Contractor (credited toward restoration)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">└─</span>
              <span>Payment plans available via{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
                  Blue Fire Finance
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Cost Estimate Banner (shown when arriving from cost estimator) */}
        {estimate && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900">
                  Your estimated restoration cost: ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  The $2,750 emergency make-safe fee gets work started immediately. $2,200 is credited toward your total restoration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-20 h-1 ml-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Platform Role Disclaimer */}
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <strong>Important:</strong> Disaster Recovery connects you with certified NRPG contractors
            who handle all work, communication, and service delivery. We bill you directly —
            work begins immediately without waiting for insurer approval.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Property & Damage Information'}
              {step === 2 && 'Insurance & Documentation'}
              {step === 3 && 'Authorizations & Terms'}
              {step === 4 && 'Final Review & Submit'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Property & Damage */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Phone Number *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="!bg-white !border-gray-300 !text-gray-900 placeholder:!text-gray-500"
                        required
                        style={{ backgroundColor: 'white', borderColor: '#e2e8f0', color: '#1f2937' }}
                      />
                    </div>
                    <div>
                      <Label>Preferred Contact Method</Label>
                      <Select
                        value={formData.preferredContact}
                        onValueChange={(value) => setFormData({...formData, preferredContact: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Property Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Property Address *</Label>
                      <Input
                        value={formData.propertyAddress}
                        onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Suburb *</Label>
                      <Input
                        value={formData.suburb}
                        onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>State *</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({...formData, state: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NSW">NSW</SelectItem>
                          <SelectItem value="VIC">VIC</SelectItem>
                          <SelectItem value="QLD">QLD</SelectItem>
                          <SelectItem value="SA">SA</SelectItem>
                          <SelectItem value="WA">WA</SelectItem>
                          <SelectItem value="TAS">TAS</SelectItem>
                          <SelectItem value="NT">NT</SelectItem>
                          <SelectItem value="ACT">ACT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Postcode *</Label>
                      <Input
                        value={formData.postcode}
                        onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                        maxLength={4}
                        required
                      />
                    </div>
                    <div>
                      <Label>Property Type *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({...formData, propertyType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Access Instructions (gate codes, etc.)</Label>
                    <Textarea
                      value={formData.accessInstructions}
                      onChange={(e) => setFormData({...formData, accessInstructions: e.target.value})}
                      placeholder="Any special instructions for accessing the property..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Damage Information
                  </h3>
                  <div>
                    <Label>Type of Damage (select all that apply) *</Label>
                    <div className="grid md:grid-cols-2 gap-2 mt-2">
                      {damageTypeOptions.map((type) => (
                        <div key={type} className="flex items-center gap-3 py-1">
                          <Checkbox
                            id={`damage-${type}`}
                            className={CHECKBOX_CLASS}
                            checked={formData.damageTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({...formData, damageTypes: [...formData.damageTypes, type]});
                              } else {
                                setFormData({...formData, damageTypes: formData.damageTypes.filter(t => t !== type)});
                              }
                            }}
                          />
                          <Label htmlFor={`damage-${type}`} className="font-normal cursor-pointer">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date Damage Occurred *</Label>
                      <Input
                        type="date"
                        value={formData.damageDate}
                        onChange={(e) => setFormData({...formData, damageDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Urgency Level *</Label>
                      <Select
                        value={formData.urgencyLevel}
                        onValueChange={(value) => setFormData({...formData, urgencyLevel: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency - Immediate</SelectItem>
                          <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
                          <SelectItem value="standard">Standard - Within 48 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Describe the Damage *</Label>
                    <Textarea
                      value={formData.damageDescription}
                      onChange={(e) => setFormData({...formData, damageDescription: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label>Safety Hazards Present</Label>
                    <div className="grid md:grid-cols-2 gap-2 mt-2">
                      {hazardOptions.map((hazard) => (
                        <div key={hazard} className="flex items-center gap-3 py-1">
                          <Checkbox
                            id={`hazard-${hazard}`}
                            className={CHECKBOX_CLASS}
                            checked={formData.hazards.includes(hazard)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({...formData, hazards: [...formData.hazards, hazard]});
                              } else {
                                setFormData({...formData, hazards: formData.hazards.filter(h => h !== hazard)});
                              }
                            }}
                          />
                          <Label htmlFor={`hazard-${hazard}`} className="font-normal cursor-pointer">{hazard}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!step1Complete}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Insurance & Documentation */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Insurance Information
                  </h3>
                  <div className="flex items-center gap-3 py-1">
                    <Checkbox
                      id="hasInsurance"
                      className={CHECKBOX_CLASS}
                      checked={formData.hasInsurance}
                      onCheckedChange={(checked) => setFormData({...formData, hasInsurance: checked as boolean})}
                    />
                    <Label htmlFor="hasInsurance" className="cursor-pointer">I have insurance coverage for this damage</Label>
                  </div>
                  {formData.hasInsurance && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Insurance Company</Label>
                        <Input
                          value={formData.insuranceCompany}
                          onChange={(e) => setFormData({...formData, insuranceCompany: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Policy Number</Label>
                        <Input
                          value={formData.policyNumber}
                          onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Insurance Claim Number</Label>
                        <Input
                          value={formData.insuranceClaimNumber}
                          onChange={(e) => setFormData({...formData, insuranceClaimNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Excess Amount</Label>
                        <Input
                          type="number"
                          value={formData.excessAmount}
                          onChange={(e) => setFormData({...formData, excessAmount: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Assessor Details (if applicable)</Label>
                        <Textarea
                          value={formData.assessorDetails}
                          onChange={(e) => setFormData({...formData, assessorDetails: e.target.value})}
                          placeholder="Name, contact, appointment time..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documentation
                  </h3>
                  <div className="flex items-center gap-3 py-1">
                    <Checkbox
                      id="hasPhotos"
                      className={CHECKBOX_CLASS}
                      checked={formData.hasPhotos}
                      onCheckedChange={(checked) => setFormData({...formData, hasPhotos: checked as boolean})}
                    />
                    <Label htmlFor="hasPhotos" className="cursor-pointer">I have photos/videos of the damage to provide</Label>
                  </div>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Your assigned contractor will request photos and documentation directly when they contact you.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Previous
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Authorizations & Terms */}
            {step === 3 && (
              <div className="space-y-6">
                <Alert className="bg-orange-50 border-orange-200">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Platform Role:</strong> Disaster Recovery connects you with contractors.
                    The contractor handles ALL work, communication, and service delivery.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="font-semibold">Work Authorisations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 py-1">
                      <Checkbox
                        id="authorizePropertyAccess"
                        className={CHECKBOX_CLASS}
                        checked={formData.authorizePropertyAccess}
                        onCheckedChange={(checked) => setFormData({...formData, authorizePropertyAccess: checked as boolean})}
                      />
                      <Label htmlFor="authorizePropertyAccess" className="font-normal cursor-pointer leading-snug">
                        I authorise the assigned contractor to access my property for inspection and make-safe works
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 py-1">
                      <Checkbox
                        id="authorizeInsuranceLiaison"
                        className={CHECKBOX_CLASS}
                        checked={formData.authorizeInsuranceLiaison}
                        onCheckedChange={(checked) => setFormData({...formData, authorizeInsuranceLiaison: checked as boolean})}
                      />
                      <Label htmlFor="authorizeInsuranceLiaison" className="font-normal cursor-pointer leading-snug">
                        I authorise the contractor to liaise with my insurance company on my behalf
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 py-1">
                      <Checkbox
                        id="authorizeWorkCommencement"
                        className={CHECKBOX_CLASS}
                        checked={formData.authorizeWorkCommencement}
                        onCheckedChange={(checked) => setFormData({...formData, authorizeWorkCommencement: checked as boolean})}
                      />
                      <Label htmlFor="authorizeWorkCommencement" className="font-normal cursor-pointer leading-snug">
                        I authorise the contractor to commence emergency make-safe works as required
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Understanding & Agreement</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 py-1">
                      <Checkbox
                        id="understandPlatformRole"
                        className={CHECKBOX_CLASS}
                        checked={formData.understandPlatformRole}
                        onCheckedChange={(checked) => setFormData({...formData, understandPlatformRole: checked as boolean})}
                        required
                      />
                      <Label htmlFor="understandPlatformRole" className="font-normal cursor-pointer leading-snug">
                        I understand that Disaster Recovery connects me with certified NRPG contractors.
                        The $2,750 emergency make-safe fee includes a $550 platform fee and $2,200 held for my contractor.
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 py-1">
                      <Checkbox
                        id="acceptContractorCommunication"
                        className={CHECKBOX_CLASS}
                        checked={formData.acceptContractorCommunication}
                        onCheckedChange={(checked) => setFormData({...formData, acceptContractorCommunication: checked as boolean})}
                        required
                      />
                      <Label htmlFor="acceptContractorCommunication" className="font-normal cursor-pointer leading-snug">
                        I understand that all communication regarding work, scheduling, and claims will be
                        directly with the assigned contractor, not Disaster Recovery.
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 py-1">
                      <Checkbox
                        id="agreeToTerms"
                        className={CHECKBOX_CLASS}
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                        required
                      />
                      <Label htmlFor="agreeToTerms" className="font-normal cursor-pointer leading-snug">
                        I agree to the terms of service and understand that contractors follow NRPG standards
                        and guidelines but are independent service providers.
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contractor Responsibilities:</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li className="font-bold text-red-600">• Initial phone contact within 60 MINUTES (GUARANTEED)</li>
                    <li>• Schedule and conduct property inspection</li>
                    <li>• Perform emergency make-safe works</li>
                    <li>• Document all damage thoroughly</li>
                    <li>• Assist you in liaising with your insurance carrier</li>
                    <li>• Coordinate all re-attendances and additional work</li>
                    <li>• Provide complete claim documentation</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Previous
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!formData.understandPlatformRole || !formData.acceptContractorCommunication || !formData.agreeToTerms}
                  >
                    Proceed to Final Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Final Review */}
            {step === 4 && (
              <div className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Claim Review:</strong> Submit now and your claim is sent immediately for contractor matching.
                  </AlertDescription>
                </Alert>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Submission Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Claim Intake</span>
                      <span className="font-semibold">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contractor Matching</span>
                      <span className="font-semibold">Immediate</span>
                    </div>
                    <div className="text-xs text-gray-500 pl-1">
                      You will receive contact and next-step guidance after submission
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Due</span>
                        <span>$0.00 (submit now)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-blue-600 rounded-lg p-4 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">Secure payment via Stripe</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What You're Paying For:</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Immediate contractor matching based on location and damage type</li>
                    <li>✓ Emergency make-safe works begin within 60 minutes</li>
                    <li>✓ $2,200 credited toward your full restoration</li>
                    <li>✓ Full claims documentation for your insurer</li>
                    <li>✓ Contractor provides formal contract with clear terms</li>
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>How billing works:</strong> We bill you directly — work begins immediately
                    without waiting for insurer approval. We provide full documentation to support your
                    insurance claim for reimbursement.
                  </AlertDescription>
                </Alert>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-sm text-indigo-900">
                    <strong>Need to spread the cost?</strong> Flexible payment plans available through{' '}
                    <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
                      Blue Fire Finance
                    </a>.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Previous
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-800"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting Claim...' : 'Submit Claim'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default function OnlineClaimPage() {
  return (
    <>
      <AntigravityNavbar />
      <nav className="ag-breadcrumb" aria-label="Breadcrumb" style={{ padding: '1rem 1.5rem 0', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/">Home</Link> / <span>Lodge a Claim</span>
      </nav>
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
        <OnlineClaimPageOriginal />
      </Suspense>
      <AntigravityFooter />
    </>
  );
}
