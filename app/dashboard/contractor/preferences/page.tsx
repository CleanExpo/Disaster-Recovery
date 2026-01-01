'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Settings } from 'lucide-react';
import PreferenceSelector from '@/components/onboarding/preference-selector';

interface ContractorPreferences {
  serviceCategories: string[];
  locations: string[];
  experience?: string;
  expertise?: string[];
  background?: string;
  hourlyRate?: string;
  availability?: string;
  maxDistance?: string;
  isOnboardingComplete: boolean;
}

export default function ContractorPreferencesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<ContractorPreferences | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPreferences();
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contractor/preferences', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      setError('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async (newPreferences: ContractorPreferences) => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/contractor/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPreferences,
          isOnboardingComplete: true,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPreferences(result.preferences);

        // Navigate back to dashboard or checklist
        router.push('/dashboard/contractor/onboarding/checklist');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      setError('An unexpected error occurred while saving preferences');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Settings className="h-6 w-6 text-[#00BFA6]" />
            <h1 className="text-3xl font-bold">Contractor Preferences</h1>
          </div>
          <p className="text-muted-foreground">
            {preferences?.isOnboardingComplete
              ? 'Update your service preferences and availability'
              : 'Complete your profile to start receiving service requests'}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Preferences Form */}
      <Card>
        <CardHeader>
          <CardTitle>Service Preferences</CardTitle>
          <CardDescription>
            Tell us about your services, expertise, and availability so we can match you with the right opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PreferenceSelector
            initialPreferences={preferences || undefined}
            onComplete={handleSavePreferences}
            isLoading={saving}
          />
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Your preferences help us match you with relevant service requests in your area. You can update these anytime.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Service Categories: Types of disaster recovery services you provide</li>
            <li>Locations: Areas where you're willing to work</li>
            <li>Experience Level: Your years of experience in the industry</li>
            <li>Expertise: Specialized skills and certifications</li>
            <li>Availability: Your typical working hours and schedule</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
