'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { servicePreferencesSchema, type ServicePreferences } from '@/lib/validations/client-onboarding';

const SERVICE_TYPES = [
  { value: 'WATER_DAMAGE', label: 'Water Damage', icon: '💧' },
  { value: 'FIRE_DAMAGE', label: 'Fire Damage', icon: '🔥' },
  { value: 'SMOKE_DAMAGE', label: 'Smoke Damage', icon: '🌫️' },
  { value: 'MOULD_REMEDIATION', label: 'Mould Remediation', icon: '🍄' },
  { value: 'STORM_DAMAGE', label: 'Storm Damage', icon: '🌪️' },
  { value: 'ODOUR_REMEDIATION', label: 'Odour Remediation', icon: '👃' },
  { value: 'CRIME_SCENE_CLEANING', label: 'Crime Scene Cleaning', icon: '🧹' },
  { value: 'BIOHAZARD_REMEDIATION', label: 'Biohazard Remediation', icon: '☣️' },
  { value: 'HOARDING_CLEANUP', label: 'Hoarding Cleanup', icon: '📦' },
  { value: 'VANDALISM_CLEANUP', label: 'Vandalism Cleanup', icon: '🎨' },
  { value: 'GENERAL_RESTORATION', label: 'General Restoration', icon: '🏠' },
];

export default function ClientServicesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServicePreferences>({
    resolver: zodResolver(servicePreferencesSchema),
    defaultValues: {
      primaryServiceTypes: [],
      urgencyPreference: 'STANDARD',
      typicalBudgetRange: '1000-5000',
      serviceFrequency: 'one-time',
      pastServiceExperience: false,
      emergencyContactAvailable: true,
    },
  });

  const toggleService = (serviceType: string) => {
    const updated = selectedServices.includes(serviceType)
      ? selectedServices.filter((s) => s !== serviceType)
      : [...selectedServices, serviceType];

    setSelectedServices(updated);
    setValue('primaryServiceTypes', updated as any);
  };

  const onSubmit = async (data: ServicePreferences) => {
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/client/onboarding/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
      } else {
        setError(result.message || result.error || 'Failed to save preferences');
      }
    } catch (err) {
      console.error('Services submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl space-y-4">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Phase 2: Service Preferences</CardTitle>
              <CardDescription>Tell us what services you might need</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">Step 2 of 7</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Types (Multi-select) */}
            <div className="space-y-3">
              <Label>
                Service Types <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Select all disaster recovery services you may need (select at least one)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICE_TYPES.map((service) => (
                  <Button
                    key={service.value}
                    type="button"
                    variant={selectedServices.includes(service.value) ? 'default' : 'outline'}
                    className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2"
                    onClick={() => toggleService(service.value)}
                  >
                    <span className="text-2xl">{service.icon}</span>
                    <span className="text-xs text-center">{service.label}</span>
                  </Button>
                ))}
              </div>
              {errors.primaryServiceTypes && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.primaryServiceTypes.message}
                </p>
              )}
            </div>

            {/* Urgency Preference */}
            <div className="space-y-2">
              <Label htmlFor="urgencyPreference">
                Typical Urgency Level <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('urgencyPreference')}
                onValueChange={(value) => setValue('urgencyPreference', value as any)}
              >
                <SelectTrigger id="urgencyPreference">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URGENT">Urgent - Immediate Response Required</SelectItem>
                  <SelectItem value="HIGH">High - Within 24 Hours</SelectItem>
                  <SelectItem value="STANDARD">Standard - Within 2-3 Days</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled - Flexible Timing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="typicalBudgetRange">
                Typical Budget Range <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('typicalBudgetRange')}
                onValueChange={(value) => setValue('typicalBudgetRange', value as any)}
              >
                <SelectTrigger id="typicalBudgetRange">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1000">Under $1,000</SelectItem>
                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25000-plus">Over $25,000</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps us match you with contractors experienced in similar-sized projects
              </p>
            </div>

            {/* Service Frequency */}
            <div className="space-y-2">
              <Label htmlFor="serviceFrequency">
                Expected Service Frequency <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('serviceFrequency')}
                onValueChange={(value) => setValue('serviceFrequency', value as any)}
              >
                <SelectTrigger id="serviceFrequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time (Emergency)</SelectItem>
                  <SelectItem value="occasional">Occasional (1-2 times per year)</SelectItem>
                  <SelectItem value="regular">Regular (Quarterly maintenance)</SelectItem>
                  <SelectItem value="ongoing">Ongoing (Managed properties)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Past Experience */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pastServiceExperience"
                checked={watch('pastServiceExperience')}
                onCheckedChange={(checked) => setValue('pastServiceExperience', checked as boolean)}
              />
              <Label
                htmlFor="pastServiceExperience"
                className="text-sm font-normal cursor-pointer"
              >
                I've used disaster recovery services before
              </Label>
            </div>

            {/* Emergency Contact Available */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emergencyContactAvailable"
                checked={watch('emergencyContactAvailable')}
                onCheckedChange={(checked) => setValue('emergencyContactAvailable', checked as boolean)}
              />
              <Label
                htmlFor="emergencyContactAvailable"
                className="text-sm font-normal cursor-pointer"
              >
                I have an emergency contact available
              </Label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/client/onboarding/checklist')}
                className="flex-1"
              >
                Save & Exit
              </Button>
              <Button type="submit" disabled={submitting || selectedServices.length === 0} className="flex-1">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue to Property
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Estimated time: 3 minutes • {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
