'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { AlertTriangle, MapPin, Building, Clock, Shield, CheckCircle2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SERVICE_RADIUS_OPTIONS, CONTRACTOR_REQUIREMENTS } from '@/lib/constants';

const metadata: Metadata = {
  title: 'Get Emergency Help | Instant Quote | IICRC Certified Contractors',
  description: 'Get instant help from IICRC certified disaster recovery contractors in your area. 24/7 emergency response, insurance approved.',
};

export default function GetHelpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    postcode: '',
    address: '',
    propertyType: '',
    disasterType: '',
    urgency: '',
    insuranceCompany: '',
    description: '',
    radius: '25'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-centre">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
            <p className="text-xl mb-6">
              We're matching you with qualified contractors in your area.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 className="font-bold mb-3">What happens next:</h2>
              <ol className="text-left space-y-2">
                <li>1. We're finding IICRC certified contractors within {formData.radius}km</li>
                <li>2. Qualified contractors will review your request</li>
                <li>3. You'll receive quotes within 30-60 minutes</li>
                <li>4. Choose the best contractor for your needs</li>
              </ol>
            </div>
            <p className="text-gray-600">
              All contractors are IICRC certified and meet Disaster Recovery standards
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-900 to-orange-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get Emergency Help Now
            </h1>
            <p className="text-xl mb-8">
              Connect instantly with IICRC certified contractors in your area. 
              No call centres - direct connection to qualified professionals.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur p-4">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">100% IICRC Certified</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">30-60 Min Response</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">Multiple Quotes</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Emergency Service Request</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Property Information</h3>
                  <div>
                    <Label htmlFor="address">Property Address *</Label>
                    <Input
                      id="address"
                      required
                      placeholder="123 Main St, Suburb"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select 
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({...formData, propertyType: value})}
                      >
                        <SelectTrigger id="propertyType">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Home</SelectItem>
                          <SelectItem value="apartment">Apartment/Unit</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="strata">Strata Property</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Disaster Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Disaster Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="disasterType">Type of Damage *</Label>
                      <Select 
                        value={formData.disasterType}
                        onValueChange={(value) => setFormData({...formData, disasterType: value})}
                      >
                        <SelectTrigger id="disasterType">
                          <SelectValue placeholder="Select damage type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="water">Water Damage</SelectItem>
                          <SelectItem value="fire">Fire & Smoke</SelectItem>
                          <SelectItem value="flood">Flood</SelectItem>
                          <SelectItem value="storm">Storm Damage</SelectItem>
                          <SelectItem value="mould">Mould</SelectItem>
                          <SelectItem value="biohazard">Biohazard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select 
                        value={formData.urgency}
                        onValueChange={(value) => setFormData({...formData, urgency: value})}
                      >
                        <SelectTrigger id="urgency">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency - Immediate</SelectItem>
                          <SelectItem value="urgent">Urgent - Within 2 hours</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="scheduled">Scheduled - Next few days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Describe the Damage *</Label>
                    <Textarea
                      id="description"
                      required
                      rows={4}
                      placeholder="Please describe the extent of damage, affected areas, and any immediate concerns..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>

                {/* Service Radius */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Service Area Preference</h3>
                  <div>
                    <Label htmlFor="radius">Maximum Distance for Contractors</Label>
                    <Select 
                      value={formData.radius}
                      onValueChange={(value) => setFormData({...formData, radius: value})}
                    >
                      <SelectTrigger id="radius">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_RADIUS_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-2">
                      Wider radius = more contractor options and potentially faster response
                    </p>
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Insurance (Optional)</h3>
                  <div>
                    <Label htmlFor="insuranceCompany">Insurance Company</Label>
                    <Input
                      id="insuranceCompany"
                      placeholder="e.g. NRMA, Suncorp, AAMI"
                      value={formData.insuranceCompany}
                      onChange={(e) => setFormData({...formData, insuranceCompany: e.target.value})}
                    />
                  </div>
                </div>

                {/* Contractor Standards Notice */}
                <Card className="bg-blue-50 p-6">
                  <h3 className="font-bold mb-3 flex items-centre">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Our Contractor Standards
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>IICRC Certified technicians</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Disaster Recovery Standards compliant</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Current network membership verified</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Minimum $20M public liability insurance</span>
                    </li>
                  </ul>
                </Card>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                  Submit Emergency Request - Get Multiple Quotes
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            How Our System Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 text-centre">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-bold mb-2">Submit Request</h3>
                <p className="text-sm text-gray-600">
                  Fill out the form with your damage details
                </p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-bold mb-2">Smart Matching</h3>
                <p className="text-sm text-gray-600">
                  System finds qualified contractors in your radius
                </p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-bold mb-2">Receive Quotes</h3>
                <p className="text-sm text-gray-600">
                  Get multiple quotes from certified contractors
                </p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-centre justify-centre mx-auto mb-4">
                  <span className="font-bold text-green-600">4</span>
                </div>
                <h3 className="font-bold mb-2">Choose & Start</h3>
                <p className="text-sm text-gray-600">
                  Select your contractor and begin restoration
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}