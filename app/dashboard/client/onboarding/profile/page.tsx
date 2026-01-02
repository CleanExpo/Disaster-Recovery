'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { profileSetupSchema, type ProfileSetup } from '@/lib/validations/client-onboarding';

export default function ClientProfileSetupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileSetup>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      fullName: '',
      displayName: '',
      phoneNumber: '',
      preferredContactMethod: 'email',
      timezone: 'Australia/Sydney',
      propertyOwnershipStatus: 'owner',
    },
  });

  useEffect(() => {
    // Pre-fill name from session if available
    if (session?.user?.name) {
      setValue('fullName', session.user.name);
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileSetup) => {
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/client/onboarding/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Navigate to next phase
        router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
      } else {
        setError(result.message || result.error || 'Failed to save profile');
      }
    } catch (err) {
      console.error('Profile submission error:', err);
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
    <div className="container mx-auto py-8 max-w-2xl space-y-4">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Phase 1: Profile Setup</CardTitle>
              <CardDescription>Tell us a bit about yourself and how to reach you</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">Step 1 of 7</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Smith"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-sm text-destructive" role="alert">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Display Name (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="displayName">
                Display Name (Optional)
              </Label>
              <Input
                id="displayName"
                {...register('displayName')}
                placeholder="How you'd like to be addressed"
              />
              <p className="text-xs text-muted-foreground">
                E.g., "John" instead of "John Smith"
              </p>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                {...register('phoneNumber')}
                placeholder="0412 345 678"
                type="tel"
                aria-required="true"
                aria-invalid={!!errors.phoneNumber}
                aria-describedby="phoneNumber-help phoneNumber-error"
              />
              <p id="phoneNumber-help" className="text-xs text-muted-foreground">
                Australian mobile or landline (e.g., 04XX XXX XXX or 02 XXXX XXXX)
              </p>
              {errors.phoneNumber && (
                <p id="phoneNumber-error" className="text-sm text-destructive" role="alert">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2">
              <Label htmlFor="preferredContactMethod">
                Preferred Contact Method <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('preferredContactMethod')}
                onValueChange={(value) => setValue('preferredContactMethod', value as any)}
              >
                <SelectTrigger id="preferredContactMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <Label htmlFor="timezone">
                Timezone <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('timezone')}
                onValueChange={(value) => setValue('timezone', value as any)}
              >
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Australia/Sydney">Sydney (NSW, ACT)</SelectItem>
                  <SelectItem value="Australia/Melbourne">Melbourne (VIC, TAS)</SelectItem>
                  <SelectItem value="Australia/Brisbane">Brisbane (QLD)</SelectItem>
                  <SelectItem value="Australia/Adelaide">Adelaide (SA)</SelectItem>
                  <SelectItem value="Australia/Perth">Perth (WA)</SelectItem>
                  <SelectItem value="Australia/Hobart">Hobart (TAS)</SelectItem>
                  <SelectItem value="Australia/Darwin">Darwin (NT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Ownership Status */}
            <div className="space-y-2">
              <Label htmlFor="propertyOwnershipStatus">
                Property Ownership Status <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('propertyOwnershipStatus')}
                onValueChange={(value) => setValue('propertyOwnershipStatus', value as any)}
              >
                <SelectTrigger id="propertyOwnershipStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Property Owner</SelectItem>
                  <SelectItem value="tenant">Tenant / Renter</SelectItem>
                  <SelectItem value="property_manager">Property Manager</SelectItem>
                  <SelectItem value="strata_manager">Strata Manager</SelectItem>
                </SelectContent>
              </Select>
              {watch('propertyOwnershipStatus') === 'property_manager' && (
                <p className="text-xs text-blue-600">
                  ℹ️ Property managers get access to bulk property import and dedicated account management
                </p>
              )}
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
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue to Services
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Estimated time: 2 minutes • Your progress is automatically saved
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
