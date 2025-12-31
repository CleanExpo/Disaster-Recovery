'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContractorProfileSetup() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    licenseNumber: '',
    insuranceProvider: '',
    insuranceExpiry: '',
    services: [] as string[],
    serviceAreas: [] as string[],
    hourlyRate: '',
    experience: '',
    bio: '',
    availability: 'AVAILABLE' as 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE'
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType !== 'CONTRACTOR') {
      router.push('/dashboard/client');
    }
  }, [user, loading, router]);

  const availableServices = [
    'Water Damage Restoration',
    'Fire Damage Restoration',
    'Mold Remediation',
    'Flood Damage Cleanup',
    'Sewage Cleanup',
    'Storm Damage Repair',
    'Construction',
    'Plumbing',
    'Electrical',
    'HVAC',
    'Roofing',
    'Flooring',
    'Painting',
    'Carpentry',
    'Landscaping',
    'Legal Services',
    'Accounting',
    'Consulting',
    'Healthcare Services',
    'Real Estate Services'
  ];

  const serviceAreas = [
    'Downtown',
    'Suburbs',
    'City Center',
    'North Side',
    'South Side',
    'East Side',
    'West Side',
    'Metro Area',
    'Rural Areas'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleServiceAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter(a => a !== area)
        : [...prev.serviceAreas, area]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/contractor/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          hourlyRate: parseFloat(formData.hourlyRate) || 0,
          experience: parseInt(formData.experience) || 0,
          insuranceExpiry: formData.insuranceExpiry ? new Date(formData.insuranceExpiry) : null
        })
      });

      if (response.ok) {
        setSaved(true);
        
        // Show verification pending toast
        toast.success("Profile saved successfully! Your profile is now pending admin verification.", {
          description: "You'll be notified once it's approved and you can start receiving job matches."
        });
        
        setTimeout(() => {
          router.push('/dashboard/contractor');
        }, 2000);
      } else {
        const error = await response.json();
        toast.error('Failed to save profile', {
          description: error.error || 'Please try again.'
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'CONTRACTOR') {
    return null;
  }

  if (saved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Profile Created Successfully!</h2>
          <p className="text-gray-400">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white mr-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <span className="text-2xl font-bold text-[#00BFA6]">Complete Your Profile</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to the Contractor Portal! 👷‍♂️</h1>
          <p className="text-gray-400">
            Complete your profile to start receiving project opportunities and connect with clients.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
              <CardDescription className="text-gray-400">
                Tell us about your business and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="businessName" className="text-gray-300">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="Elite Restoration Services"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-300">Business Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="city" className="text-gray-300">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-300">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-gray-300">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Professional Details</CardTitle>
              <CardDescription className="text-gray-400">
                Your credentials, experience, and expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="licenseNumber" className="text-gray-300">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="LIC123456789"
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="text-gray-300">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="hourlyRate" className="text-gray-300">Hourly Rate ($) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="75.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="availability" className="text-gray-300">Availability *</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="AVAILABLE" className="text-white">Available</SelectItem>
                      <SelectItem value="BUSY" className="text-white">Busy</SelectItem>
                      <SelectItem value="UNAVAILABLE" className="text-white">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="Tell clients about your experience and expertise..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Services Offered */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Services Offered *</CardTitle>
              <CardDescription className="text-gray-400">
                Select all services you can provide to clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableServices.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                      className="text-[#00BFA6]"
                    />
                    <Label htmlFor={service} className="text-sm text-gray-300 cursor-pointer">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Areas */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Service Areas *</CardTitle>
              <CardDescription className="text-gray-400">
                Select all areas where you provide services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {serviceAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.serviceAreas.includes(area)}
                      onCheckedChange={() => handleServiceAreaToggle(area)}
                      className="text-[#00BFA6]"
                    />
                    <Label htmlFor={area} className="text-sm text-gray-300 cursor-pointer">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insurance Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Insurance Information</CardTitle>
              <CardDescription className="text-gray-400">
                Your insurance details (optional but recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="insuranceProvider" className="text-gray-300">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="ABC Insurance Company"
                  />
                </div>
                <div>
                  <Label htmlFor="insuranceExpiry" className="text-gray-300">Insurance Expiry Date</Label>
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    value={formData.insuranceExpiry}
                    onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                    className="mt-1 bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving || formData.services.length === 0 || formData.serviceAreas.length === 0}
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white px-8 py-3"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Complete Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
