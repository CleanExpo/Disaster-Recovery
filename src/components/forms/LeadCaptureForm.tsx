'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle2, MapPin, Home, DollarSign, Calendar, Camera, FileText, Shield, MessageSquare} from 'lucide-react';
import { toast } from 'sonner';

interface LeadFormData {
  // Contact Information
  fullName: string;
  email: string;
  
  // Property Information
  propertyType: string;
  propertyAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  
  // Damage Information
  damageType: string[];
  damageDate: string;
  damageDescription: string;
  estimatedAreaAffected: string;
  
  // Insurance Information
  hasInsurance: boolean;
  insuranceCompany?: string;
  claimNumber?: string;
  excessAmount?: string;
  
  // Urgency & Value Indicators
  urgencyLevel: string;
  propertyValue: string;
  isBusinessProperty: boolean;
  requiresAccommodation: boolean;
  
  // Lead Quality Indicators
  hasPhotos: boolean;
  readyToStart: string;
  budget: string;
  decisionMaker: boolean;
  
  // Consent
  consentToContact: boolean;
  agreeToTerms: boolean;
}

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    
    email: '',
    propertyType: 'residential',
    propertyAddress: '',
    suburb: '',
    state: 'QLD',
    postcode: '',
    damageType: [],
    damageDate: '',
    damageDescription: '',
    estimatedAreaAffected: '',
    hasInsurance: true,
    urgencyLevel: 'urgent',
    propertyValue: '',
    isBusinessProperty: false,
    requiresAccommodation: false,
    hasPhotos: false,
    readyToStart: 'immediately',
    budget: '',
    decisionMaker: true,
    consentToContact: false,
    agreeToTerms: false
  });

  const [leadScore, setLeadScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Calculate lead quality score
  const calculateLeadScore = () => {
    let score = 0;
    
    // Insurance (30 points)
    if (formData.hasInsurance) score += 30;
    
    // Urgency (20 points)
    if (formData.urgencyLevel === 'emergency') score += 20;
    else if (formData.urgencyLevel === 'urgent') score += 15;
    else if (formData.urgencyLevel === 'soon') score += 10;
    
    // Property Value (20 points)
    const value = parseInt(formData.propertyValue);
    if (value > 1000000) score += 20;
    else if (value > 500000) score += 15;
    else if (value > 250000) score += 10;
    
    // Business Property (15 points)
    if (formData.isBusinessProperty) score += 15;
    
    // Ready to Start (10 points)
    if (formData.readyToStart === 'immediately') score += 10;
    else if (formData.readyToStart === 'within_week') score += 7;
    
    // Decision Maker (5 points)
    if (formData.decisionMaker) score += 5;
    
    setLeadScore(score);
    return score;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const score = calculateLeadScore();
    
    // Only process high-value leads (score > 50)
    if (score < 50) {
      toast.error('Please provide more information to help us better assist you.');
      setSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          leadScore: score,
          leadValue: 550, // $550 per qualified lead
          capturedAt: new Date().toISOString(),
          source: window.location.href,
          ipAddress: '', // Will be captured server-side
          userAgent: navigator.userAgent
        })
      });
      
      if (response.ok) {
        toast.success('Thank you! A restoration specialist will contact you within 30 minutes.');
        // Redirect to thank you page
        window.location.href = '/thank-you';
      }
    } catch (error) {
      toast.error('Something went wrong. Please call us directly at 1300 814 870');
    } finally {
      setSubmitting(false);
    }
  };

  const damageTypes = [
    'Water/Flood Damage',
    'Fire/Smoke Damage',
    'Storm/Wind Damage',
    'Mould Growth',
    'Sewage Backup',
    'Biohazard/Trauma',
    'Hail Damage',
    'Structural Damage'
  ];

  return (
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Get Immediate Restoration Help</h2>
        <p className="text-gray-600">Complete this form for priority emergency response</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Insurance Approved</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <span>30min Response</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>No Obligation Quote</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Emergency Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 animate-pulse" />
            <div>
              <p className="font-bold text-red-900">Life-Threatening Emergency?</p>
              <p className="text-red-700">Call 000 immediately, then call us at 1300 814 870</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Your contact details"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({...formData, propertyType: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential Home</SelectItem>
                  <SelectItem value="commercial">Commercial Property</SelectItem>
                  <SelectItem value="industrial">Industrial Facility</SelectItem>
                  <SelectItem value="strata">Strata/Body Corporate</SelectItem>
                  <SelectItem value="government">Government Building</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="propertyValue">Estimated Property Value *</Label>
              <Select
                value={formData.propertyValue}
                onValueChange={(value) => setFormData({...formData, propertyValue: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="250000">Under $250,000</SelectItem>
                  <SelectItem value="500000">$250,000 - $500,000</SelectItem>
                  <SelectItem value="750000">$500,000 - $750,000</SelectItem>
                  <SelectItem value="1000000">$750,000 - $1,000,000</SelectItem>
                  <SelectItem value="2000000">$1,000,000 - $2,000,000</SelectItem>
                  <SelectItem value="5000000">Over $2,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <Input
                id="propertyAddress"
                required
                value={formData.propertyAddress}
                onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <Label htmlFor="suburb">Suburb *</Label>
              <Input
                id="suburb"
                required
                value={formData.suburb}
                onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                placeholder="Brisbane"
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({...formData, state: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="QLD">Queensland</SelectItem>
                  <SelectItem value="NSW">New South Wales</SelectItem>
                  <SelectItem value="VIC">Victoria</SelectItem>
                  <SelectItem value="SA">South Australia</SelectItem>
                  <SelectItem value="WA">Western Australia</SelectItem>
                  <SelectItem value="TAS">Tasmania</SelectItem>
                  <SelectItem value="NT">Northern Territory</SelectItem>
                  <SelectItem value="ACT">ACT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="postcode">Postcode *</Label>
              <Input
                id="postcode"
                required
                value={formData.postcode}
                onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                placeholder="4000"
                maxLength={4}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              id="isBusinessProperty"
              checked={formData.isBusinessProperty}
              onCheckedChange={(checked) => setFormData({...formData, isBusinessProperty: checked as boolean})}
            />
            <Label htmlFor="isBusinessProperty" className="font-normal">
              This is a commercial/business property
            </Label>
          </div>
        </div>

        {/* Damage Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Damage Information
          </h3>
          <div>
            <Label>Type of Damage (select all that apply) *</Label>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              {damageTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={type}
                    checked={formData.damageType.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({...formData, damageType: [...formData.damageType, type]});
                      } else {
                        setFormData({...formData, damageType: formData.damageType.filter(t => t !== type)});
                      }
                    }}
                  />
                  <Label htmlFor={type} className="font-normal">{type}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="damageDate">When did the damage occur? *</Label>
              <Input
                id="damageDate"
                type="date"
                required
                value={formData.damageDate}
                onChange={(e) => setFormData({...formData, damageDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="urgencyLevel">Urgency Level *</Label>
              <Select
                value={formData.urgencyLevel}
                onValueChange={(value) => setFormData({...formData, urgencyLevel: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency - Immediate Response Needed</SelectItem>
                  <SelectItem value="urgent">Urgent - Within 24 Hours</SelectItem>
                  <SelectItem value="soon">Soon - Within This Week</SelectItem>
                  <SelectItem value="planning">Planning - Getting Quotes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="estimatedAreaAffected">Estimated Area Affected *</Label>
              <Select
                value={formData.estimatedAreaAffected}
                onValueChange={(value) => setFormData({...formData, estimatedAreaAffected: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single_room">Single Room</SelectItem>
                  <SelectItem value="multiple_rooms">Multiple Rooms</SelectItem>
                  <SelectItem value="entire_floor">Entire Floor</SelectItem>
                  <SelectItem value="entire_property">Entire Property</SelectItem>
                  <SelectItem value="commercial_large">Large Commercial Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="readyToStart">When are you ready to start? *</Label>
              <Select
                value={formData.readyToStart}
                onValueChange={(value) => setFormData({...formData, readyToStart: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="within_week">Within a Week</SelectItem>
                  <SelectItem value="within_month">Within a Month</SelectItem>
                  <SelectItem value="planning">Just Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="damageDescription">Describe the damage and what happened *</Label>
            <Textarea
              id="damageDescription"
              required
              value={formData.damageDescription}
              onChange={(e) => setFormData({...formData, damageDescription: e.target.value})}
              placeholder="Please describe what happened, extent of damage, and any immediate concerns..."
              rows={4}
            />
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              id="requiresAccommodation"
              checked={formData.requiresAccommodation}
              onCheckedChange={(checked) => setFormData({...formData, requiresAccommodation: checked as boolean})}
            />
            <Label htmlFor="requiresAccommodation" className="font-normal">
              Property is uninhabitable - require temporary accommodation
            </Label>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Insurance Information
          </h3>
          <div className="flex items-center gap-4">
            <Checkbox
              id="hasInsurance"
              checked={formData.hasInsurance}
              onCheckedChange={(checked) => setFormData({...formData, hasInsurance: checked as boolean})}
            />
            <Label htmlFor="hasInsurance" className="font-normal">
              I have insurance coverage for this damage
            </Label>
          </div>
          {formData.hasInsurance && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuranceCompany">Insurance Company</Label>
                <Input
                  id="insuranceCompany"
                  value={formData.insuranceCompany || ''}
                  onChange={(e) => setFormData({...formData, insuranceCompany: e.target.value})}
                  placeholder="e.g., NRMA, Suncorp, AAMI"
                />
              </div>
              <div>
                <Label htmlFor="claimNumber">Claim Number (if available)</Label>
                <Input
                  id="claimNumber"
                  value={formData.claimNumber || ''}
                  onChange={(e) => setFormData({...formData, claimNumber: e.target.value})}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="excessAmount">Insurance Excess Amount</Label>
                <Select
                  value={formData.excessAmount || ''}
                  onValueChange={(value) => setFormData({...formData, excessAmount: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select excess" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">$500 or less</SelectItem>
                    <SelectItem value="1000">$500 - $1,000</SelectItem>
                    <SelectItem value="2000">$1,000 - $2,000</SelectItem>
                    <SelectItem value="5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="10000">Over $5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Expected Restoration Budget</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({...formData, budget: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">Under $5,000</SelectItem>
                    <SelectItem value="10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="25000">$10,000 - $25,000</SelectItem>
                    <SelectItem value="50000">$25,000 - $50,000</SelectItem>
                    <SelectItem value="100000">$50,000 - $100,000</SelectItem>
                    <SelectItem value="200000">Over $100,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Additional Qualifiers */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Additional Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Checkbox
                id="hasPhotos"
                checked={formData.hasPhotos}
                onCheckedChange={(checked) => setFormData({...formData, hasPhotos: checked as boolean})}
              />
              <Label htmlFor="hasPhotos" className="font-normal">
                I have photos of the damage to share
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="decisionMaker"
                checked={formData.decisionMaker}
                onCheckedChange={(checked) => setFormData({...formData, decisionMaker: checked as boolean})}
              />
              <Label htmlFor="decisionMaker" className="font-normal">
                I am the property owner / decision maker
              </Label>
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consentToContact"
              required
              checked={formData.consentToContact}
              onCheckedChange={(checked) => setFormData({...formData, consentToContact: checked as boolean})}
            />
            <Label htmlFor="consentToContact" className="font-normal text-sm">
              I consent to being contacted by a qualified restoration specialist about my damage restoration needs. 
              I understand I may receive calls, texts, and emails regarding my enquiry.
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="agreeToTerms"
              required
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
            />
            <Label htmlFor="agreeToTerms" className="font-normal text-sm">
              I agree to the terms of service and understand that my information will be shared with a qualified, 
              licensed, and insured restoration contractor in my area.
            </Label>
          </div>
        </div>

        {/* Lead Quality Indicator */}
        {leadScore > 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-900">
                Priority Response Qualified - Your request qualifies for immediate priority response
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 text-lg"
            disabled={submitting || !formData.consentToContact || !formData.agreeToTerms}
          >
            {submitting ? (
              'Processing...'
            ) : (
              <>
                <MessageSquare className="mr-2" />
                Get Immediate Help Now
              </>
            )}
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Or call us directly 24/7: <span className="font-bold">1300 814 870</span>
          </p>
        </div>
      </form>
    </Card>
  );
}