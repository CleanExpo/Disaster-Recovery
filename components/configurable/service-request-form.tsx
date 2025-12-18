'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useIndustryConfig } from '@/contexts/TenantContext';

interface ServiceRequestFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
  error?: string;
  success?: boolean;
}

export default function ServiceRequestForm({ 
  onSubmit, 
  loading = false, 
  error, 
  success 
}: ServiceRequestFormProps) {
  const { serviceCategories, urgencyLevels, enableInsurance, defaultCurrency } = useIndustryConfig();
  
  const [formData, setFormData] = useState({
    serviceCategory: '',
    urgency: '',
    serviceTitle: '',
    description: '',
    location: '',
    phone: '',
    preferredTime: '',
    insurance: false,
    urgentResponse: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Service Request</CardTitle>
        <CardDescription>
          Provide details about your service needs and we'll match you with qualified professionals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Service request submitted successfully!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Service Category</Label>
              <Select 
                value={formData.serviceCategory} 
                onValueChange={(value) => handleInputChange('serviceCategory', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select 
                value={formData.urgency} 
                onValueChange={(value) => handleInputChange('urgency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level: string) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceTitle">Service Title</Label>
            <Input
              id="serviceTitle"
              value={formData.serviceTitle}
              onChange={(e) => handleInputChange('serviceTitle', e.target.value)}
              placeholder="Brief title for your service request"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of your service needs"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State or Address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Your contact number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time</Label>
              <Select 
                value={formData.preferredTime} 
                onValueChange={(value) => handleInputChange('preferredTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {enableInsurance && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={formData.insurance}
                  onCheckedChange={(checked) => handleInputChange('insurance', checked)}
                />
                <Label htmlFor="insurance">This is an insurance claim</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgentResponse"
                  checked={formData.urgentResponse}
                  onCheckedChange={(checked) => handleInputChange('urgentResponse', checked)}
                />
                <Label htmlFor="urgentResponse">I need urgent response (within 24 hours)</Label>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Service Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
