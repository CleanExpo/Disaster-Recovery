'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Shield, Building, Users, Award, CheckCircle2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CONTRACTOR_REQUIREMENTS, SERVICE_RADIUS_OPTIONS } from '@/lib/constants';

const metadata: Metadata = {
  title: 'Apply to Join Network | Contractor Application | Disaster Recovery',
  description: 'Apply to join Australia\'s premier disaster recovery network. IICRC certification required. Get qualified leads in your territory.',
};

export default function ContractorApplicationPage() {
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    abn: '',
    tradingName: '',
    yearsInBusiness: '',
    numberOfTechnicians: '',
    
    // Contact Information
    primaryContact: '',
    position: '',
    email: '',
    mobile: '',
    officeOnline Form: '',
    website: '',
    
    // Address
    streetAddress: '',
    suburb: '',
    state: '',
    postcode: '',
    
    // Service Information
    primaryRadius: '50',
    membershipTier: 'regional',
    services: [],
    
    // Certifications
    iicrcNumber: '',
    certificationTypes: [],
    insuranceAmount: '',
    insuranceExpiry: '',
    
    // Capabilities
    emergencyResponse: false,
    vehicleCount: '',
    equipmentList: '',
    
    // Agreement
    agreeToStandards: false,
    agreeToTerms: false,
    agreeToFees: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Application Received!</h1>
            <p className="text-xl mb-6">
              Thank you for applying to join the Disaster Recovery Network.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 text-left">
              <h2 className="font-bold mb-3">Next Steps:</h2>
              <ol className="space-y-2">
                <li>1. We'll verify your IICRC certification within 24 hours</li>
                <li>2. Review your insurance and compliance documents</li>
                <li>3. Check territory availability in your selected radius</li>
                <li>4. Send you the network agreement and onboarding pack</li>
                <li>5. Schedule your orientation call</li>
              </ol>
            </div>
            <p className="mt-6 text-gray-600">
              We'll contact you within 1-2 business days at {formData.email}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Network Application
            </h1>
            <p className="text-xl mb-8">
              Become part of Premier disaster recovery network. 
              IICRC certified contractors only.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Company Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Legal Name *</Label>
                      <Input
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="abn">ABN *</Label>
                      <Input
                        id="abn"
                        required
                        placeholder="XX XXX XXX XXX"
                        value={formData.abn}
                        onChange={(e) => setFormData({...formData, abn: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tradingName">Trading Name (if different)</Label>
                      <Input
                        id="tradingName"
                        value={formData.tradingName}
                        onChange={(e) => setFormData({...formData, tradingName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                      <Select 
                        value={formData.yearsInBusiness}
                        onValueChange={(value) => setFormData({...formData, yearsInBusiness: value})}
                      >
                        <SelectTrigger id="yearsInBusiness">
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="numberOfTechnicians">Number of Technicians *</Label>
                      <Select 
                        value={formData.numberOfTechnicians}
                        onValueChange={(value) => setFormData({...formData, numberOfTechnicians: value})}
                      >
                        <SelectTrigger id="numberOfTechnicians">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 technicians</SelectItem>
                          <SelectItem value="3-5">3-5 technicians</SelectItem>
                          <SelectItem value="6-10">6-10 technicians</SelectItem>
                          <SelectItem value="11-20">11-20 technicians</SelectItem>
                          <SelectItem value="20+">20+ technicians</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Primary Contact</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryContact">Full Name *</Label>
                      <Input
                        id="primaryContact"
                        required
                        value={formData.primaryContact}
                        onChange={(e) => setFormData({...formData, primaryContact: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position *</Label>
                      <Input
                        id="position"
                        required
                        placeholder="e.g. Owner, General Manager"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        required
                        placeholder="04XX XXX XXX"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Service Location */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Service Location</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="streetAddress">Street Address *</Label>
                      <Input
                        id="streetAddress"
                        required
                        value={formData.streetAddress}
                        onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="suburb">Suburb *</Label>
                      <Input
                        id="suburb"
                        required
                        value={formData.suburb}
                        onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select 
                        value={formData.state}
                        onValueChange={(value) => setFormData({...formData, state: value})}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
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
                    <div>
                      <Label htmlFor="postcode">Postcode *</Label>
                      <Input
                        id="postcode"
                        required
                        maxLength={4}
                        pattern="[0-9]{4}"
                        value={formData.postcode}
                        onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Service Coverage */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Service Coverage & Membership</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryRadius">Preferred Service Radius *</Label>
                      <Select 
                        value={formData.primaryRadius}
                        onValueChange={(value) => setFormData({...formData, primaryRadius: value})}
                      >
                        <SelectTrigger id="primaryRadius">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20km - Local</SelectItem>
                          <SelectItem value="50">50km - Regional</SelectItem>
                          <SelectItem value="100">100km - Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="membershipTier">Membership Tier *</Label>
                      <Select 
                        value={formData.membershipTier}
                        onValueChange={(value) => setFormData({...formData, membershipTier: value})}
                      >
                        <SelectTrigger id="membershipTier">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Partner - $500/month</SelectItem>
                          <SelectItem value="regional">Regional Partner - $1,500/month</SelectItem>
                          <SelectItem value="premium">Premium Partner - $3,000/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Certifications & Insurance</h2>
                  <Card className="bg-orange-50 p-4 border-orange-200">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-orange-600 mr-2 mt-0.5" />
                      <p className="text-sm">IICRC certification is mandatory for all network members</p>
                    </div>
                  </Card>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="iicrcNumber">IICRC Certification Number *</Label>
                      <Input
                        id="iicrcNumber"
                        required
                        placeholder="e.g. 123456"
                        value={formData.iicrcNumber}
                        onChange={(e) => setFormData({...formData, iicrcNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Certification Types * (select all that apply)</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center">
                          <Checkbox id="wrt" />
                          <label htmlFor="wrt" className="ml-2 text-sm">WRT - Water Damage Restoration</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="fsrt" />
                          <label htmlFor="fsrt" className="ml-2 text-sm">FSRT - Fire & Smoke Restoration</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="amrt" />
                          <label htmlFor="amrt" className="ml-2 text-sm">AMRT - Applied Microbial Remediation</label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="asd" />
                          <label htmlFor="asd" className="ml-2 text-sm">ASD - Applied Structural Drying</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="insuranceAmount">Public Liability Insurance Amount *</Label>
                      <Select 
                        value={formData.insuranceAmount}
                        onValueChange={(value) => setFormData({...formData, insuranceAmount: value})}
                      >
                        <SelectTrigger id="insuranceAmount">
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20m">$20 Million (Minimum)</SelectItem>
                          <SelectItem value="30m">$30 Million</SelectItem>
                          <SelectItem value="50m">$50 Million</SelectItem>
                          <SelectItem value="50m+">$50+ Million</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="insuranceExpiry">Insurance Expiry Date *</Label>
                      <Input
                        id="insuranceExpiry"
                        type="date"
                        required
                        value={formData.insuranceExpiry}
                        onChange={(e) => setFormData({...formData, insuranceExpiry: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Equipment & Capabilities */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Equipment & Capabilities</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vehicleCount">Number of Service Vehicles *</Label>
                      <Select 
                        value={formData.vehicleCount}
                        onValueChange={(value) => setFormData({...formData, vehicleCount: value})}
                      >
                        <SelectTrigger id="vehicleCount">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 vehicle</SelectItem>
                          <SelectItem value="2-3">2-3 vehicles</SelectItem>
                          <SelectItem value="4-5">4-5 vehicles</SelectItem>
                          <SelectItem value="6-10">6-10 vehicles</SelectItem>
                          <SelectItem value="10+">10+ vehicles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="emergencyResponse"
                        checked={formData.emergencyResponse}
                        onCheckedChange={(checked) => setFormData({...formData, emergencyResponse: checked as boolean})}
                      />
                      <Label htmlFor="emergencyResponse" className="font-normal">
                        24/7 Online Emergency Response Capability *
                      </Label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="equipmentList">Key Equipment (list major items) *</Label>
                    <Textarea
                      id="equipmentList"
                      required
                      rows={4}
                      placeholder="e.g. Truck-mounted extractors, dehumidifiers, air movers, thermal imaging cameras, moisture meters..."
                      value={formData.equipmentList}
                      onChange={(e) => setFormData({...formData, equipmentList: e.target.value})}
                    />
                  </div>
                </div>

                {/* Terms & Agreements */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">Terms & Agreements</h2>
                  <Card className="p-6 bg-blue-50">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Checkbox 
                          id="agreeToStandards"
                          required
                          checked={formData.agreeToStandards}
                          onCheckedChange={(checked) => setFormData({...formData, agreeToStandards: checked as boolean})}
                        />
                        <Label htmlFor="agreeToStandards" className="ml-2 font-normal">
                          I confirm that my company meets all Disaster Recovery Network standards including 
                          IICRC certification, insurance requirements, and service capabilities *
                        </Label>
                      </div>
                      <div className="flex items-start">
                        <Checkbox 
                          id="agreeToTerms"
                          required
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                        />
                        <Label htmlFor="agreeToTerms" className="ml-2 font-normal">
                          I agree to maintain quality standards, respond to leads promptly, and provide 
                          excellent customer service to all referred clients *
                        </Label>
                      </div>
                      <div className="flex items-start">
                        <Checkbox 
                          id="agreeToFees"
                          required
                          checked={formData.agreeToFees}
                          onCheckedChange={(checked) => setFormData({...formData, agreeToFees: checked as boolean})}
                        />
                        <Label htmlFor="agreeToFees" className="ml-2 font-normal">
                          I understand the membership fee structure and agree to the selected tier pricing *
                        </Label>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!formData.agreeToStandards || !formData.agreeToTerms || !formData.agreeToFees}
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Submit Application to Join Network
                  </Button>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Applications are reviewed within 1-2 business days
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}