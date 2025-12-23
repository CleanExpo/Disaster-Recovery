'use client';

import { useEffect, useState } from 'react';
import { ContractorOnboardingDashboard } from '@/components/onboarding/contractor-onboarding-dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Rocket } from 'lucide-react';

export default function ContractorOnboardingPage() {
  const [contractorId, setContractorId] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state for new onboarding
  const [formData, setFormData] = useState({
    contractorId: '',
    businessName: '',
    specialization: 'water',
    experience: 0,
    certifications: '',
  });

  useEffect(() => {
    // Try to get contractor ID from session/auth
    // For demo, we'll use localStorage
    const savedContractorId = localStorage.getItem('contractorId');
    if (savedContractorId) {
      setContractorId(savedContractorId);
    } else {
      setShowSetup(true);
    }
  }, []);

  const handleStartOnboarding = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/onboarding/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId: formData.contractorId,
          businessName: formData.businessName,
          specialization: formData.specialization,
          experience: parseInt(formData.experience.toString()),
          certifications: formData.certifications.split(',').map(c => c.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('contractorId', formData.contractorId);
        setContractorId(formData.contractorId);
        setShowSetup(false);
      } else {
        alert('Failed to start onboarding: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to start onboarding:', error);
      alert('Failed to start onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSetup) {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              Start Your Onboarding Journey
            </CardTitle>
            <CardDescription>
              Let's personalize your training path based on your experience and goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contractorId">Contractor ID</Label>
              <Input
                id="contractorId"
                placeholder="Enter your contractor ID"
                value={formData.contractorId}
                onChange={(e) => setFormData({ ...formData, contractorId: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Use a UUID or unique identifier for your account
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="ABC Restoration Services"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => setFormData({ ...formData, specialization: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">Water Damage Restoration</SelectItem>
                  <SelectItem value="fire">Fire & Smoke Restoration</SelectItem>
                  <SelectItem value="mould">Mould Remediation</SelectItem>
                  <SelectItem value="combined">Combined Specialization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="5"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Current Certifications (comma-separated)</Label>
              <Input
                id="certifications"
                placeholder="IICRC WRT, IICRC ASD"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank if you have no certifications yet
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleStartOnboarding}
                disabled={loading || !formData.contractorId || !formData.businessName}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Your Personalized Path...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Start Onboarding
                  </>
                )}
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="text-sm font-medium mb-2">What happens next?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI will assess your current competency level</li>
                <li>• You'll receive a personalized training path</li>
                <li>• Complete modules at your own pace (target: 30 days)</li>
                <li>• Earn certification upon successful completion</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!contractorId) {
    return null;
  }

  return <ContractorOnboardingDashboard contractorId={contractorId} />;
}
