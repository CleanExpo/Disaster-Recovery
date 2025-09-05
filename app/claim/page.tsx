'use client';

import { useState } from 'react';
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

export default function OnlineClaimPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [claimId, setClaimId] = useState<string | null>(null);
  
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

  const handleSubmit = async () => {
    if (!formData.understandPlatformRole || !formData.acceptContractorCommunication || !formData.agreeToTerms) {
      alert('Please accept all terms and conditions');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      formData.paymentConfirmed = true;
      
      const response = await fetch('/api/claims/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setClaimId(result.claimId);
        setStep(5); // Success step
      } else {
        alert(result.message || 'Failed to submit claim');
      }
    } catch (error) {
      alert('Error submitting claim. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                  Payment of <strong>${PLATFORM_FEE.toFixed(2)}</strong> has been processed successfully.
                </AlertDescription>
              </Alert>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What Happens Next
                </h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Your claim is being matched with a certified NRP contractor</li>
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
                  according to strict NRP standards.
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit Online Claim</h1>
          <p className="text-gray-600">Platform Fee: ${PLATFORM_FEE.toFixed(2)}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
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
            <strong>Important:</strong> Disaster Recovery is a lead generation platform only. 
            We connect you with certified contractors who handle all work and communication. 
            The $2,750 fee covers lead generation and contractor matching services only.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Property & Damage Information'}
              {step === 2 && 'Insurance & Documentation'}
              {step === 3 && 'Authorizations & Terms'}
              {step === 4 && 'Payment Information'}
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
                        required
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
                        <div key={type} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.damageTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({...formData, damageTypes: [...formData.damageTypes, type]});
                              } else {
                                setFormData({...formData, damageTypes: formData.damageTypes.filter(t => t !== type)});
                              }
                            }}
                          />
                          <Label className="font-normal">{type}</Label>
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
                        <div key={hazard} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.hazards.includes(hazard)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({...formData, hazards: [...formData.hazards, hazard]});
                              } else {
                                setFormData({...formData, hazards: formData.hazards.filter(h => h !== hazard)});
                              }
                            }}
                          />
                          <Label className="font-normal">{hazard}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700">
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
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.hasInsurance}
                      onCheckedChange={(checked) => setFormData({...formData, hasInsurance: checked as boolean})}
                    />
                    <Label>I have insurance coverage for this damage</Label>
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
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.hasPhotos}
                      onCheckedChange={(checked) => setFormData({...formData, hasPhotos: checked as boolean})}
                    />
                    <Label>I have photos/videos of the damage to provide</Label>
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
                  <h3 className="font-semibold">Work Authorizations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={formData.authorizePropertyAccess}
                        onCheckedChange={(checked) => setFormData({...formData, authorizePropertyAccess: checked as boolean})}
                      />
                      <Label className="font-normal">
                        I authorize the assigned contractor to access my property for inspection and make-safe works
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={formData.authorizeInsuranceLiaison}
                        onCheckedChange={(checked) => setFormData({...formData, authorizeInsuranceLiaison: checked as boolean})}
                      />
                      <Label className="font-normal">
                        I authorize the contractor to liaise with my insurance company on my behalf
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={formData.authorizeWorkCommencement}
                        onCheckedChange={(checked) => setFormData({...formData, authorizeWorkCommencement: checked as boolean})}
                      />
                      <Label className="font-normal">
                        I authorize the contractor to commence emergency make-safe works as required
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Understanding & Agreement</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={formData.understandPlatformRole}
                        onCheckedChange={(checked) => setFormData({...formData, understandPlatformRole: checked as boolean})}
                        required
                      />
                      <Label className="font-normal">
                        I understand that Disaster Recovery is a lead generation platform only and does not 
                        perform restoration work. The $2,750 fee covers lead generation and contractor matching services.
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={formData.acceptContractorCommunication}
                        onCheckedChange={(checked) => setFormData({...formData, acceptContractorCommunication: checked as boolean})}
                        required
                      />
                      <Label className="font-normal">
                        I understand that all communication regarding work, scheduling, and claims will be 
                        directly with the assigned contractor, not Disaster Recovery.
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                        required
                      />
                      <Label className="font-normal">
                        I agree to the terms of service and understand that contractors follow NRP standards 
                        and guidelines but are independent service providers.
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contractor Responsibilities:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li className="font-bold text-red-600">• Initial phone contact within 60 MINUTES (GUARANTEED)</li>
                    <li>• Schedule and conduct property inspection</li>
                    <li>• Perform emergency make-safe works</li>
                    <li>• Document all damage thoroughly</li>
                    <li>• Liaise directly with insurance company</li>
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
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Platform Fee:</strong> ${PLATFORM_FEE.toFixed(2)} - Covers lead generation and contractor matching
                  </AlertDescription>
                </Alert>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Platform Service Fee</span>
                      <span className="font-semibold">${PLATFORM_FEE.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Due</span>
                        <span>${PLATFORM_FEE.toFixed(2)}</span>
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
                      <p className="text-sm text-gray-600 mt-1">Secure payment via Stripe</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What You're Paying For:</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ Immediate contractor matching based on location and service needs</li>
                    <li>✓ Access to certified NRP network contractors</li>
                    <li>✓ Quality assurance through NRP standards compliance</li>
                    <li>✓ Lead generation and qualification services</li>
                    <li>✓ Platform technology and support</li>
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Note:</strong> This fee does not include restoration work costs. 
                    Your contractor will provide separate quotes for all work to be performed.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Previous
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={submitting}
                  >
                    {submitting ? 'Processing Payment...' : `Pay $${PLATFORM_FEE.toFixed(2)} & Submit Claim`}
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