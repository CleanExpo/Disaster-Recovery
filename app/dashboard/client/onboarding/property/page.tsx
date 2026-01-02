'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, ArrowRight, Lock, Shield, AlertTriangle } from 'lucide-react';
import { propertyDetailsSchema, type PropertyDetails } from '@/lib/validations/client-onboarding';

export default function ClientPropertyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [riskWarning, setRiskWarning] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyDetails>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      streetAddress: '',
      suburb: '',
      postcode: '',
      state: 'NSW',
      country: 'AU',
      propertyType: 'residential_house',
      parkingAvailable: true,
      securityAccess: false,
      petOnPremises: false,
    },
  });

  const onSubmit = async (data: PropertyDetails) => {
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/client/onboarding/property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Show risk zone warnings if any
        if (result.riskZones && result.riskZones.length > 0) {
          setRiskWarning(result.riskZones);
          setTimeout(() => {
            router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
          }, 3000);
        } else {
          router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
        }
      } else {
        setError(result.message || result.error || 'Failed to save property');
      }
    } catch (err) {
      console.error('Property submission error:', err);
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
              <CardTitle>Phase 3: Property Details</CardTitle>
              <CardDescription>Add your property address and details</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">Step 3 of 7</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Risk Warning */}
            {riskWarning && (
              <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription>
                  <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Property Risk Zones Detected
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Your property is in a {riskWarning.join(', ')} area. We recommend preventive services.
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {/* Street Address */}
            <div className="space-y-2">
              <Label htmlFor="streetAddress">
                Street Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="streetAddress"
                {...register('streetAddress')}
                placeholder="123 Main Street"
                aria-required="true"
              />
              {errors.streetAddress && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            {/* Suburb and Postcode */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="suburb">
                  Suburb <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="suburb"
                  {...register('suburb')}
                  placeholder="Sydney"
                  aria-required="true"
                />
                {errors.suburb && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.suburb.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postcode">
                  Postcode <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="postcode"
                  {...register('postcode')}
                  placeholder="2000"
                  maxLength={4}
                  aria-required="true"
                />
                {errors.postcode && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">
                State / Territory <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('state')}
                onValueChange={(value) => setValue('state', value as any)}
              >
                <SelectTrigger id="state">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">New South Wales (NSW)</SelectItem>
                  <SelectItem value="VIC">Victoria (VIC)</SelectItem>
                  <SelectItem value="QLD">Queensland (QLD)</SelectItem>
                  <SelectItem value="WA">Western Australia (WA)</SelectItem>
                  <SelectItem value="SA">South Australia (SA)</SelectItem>
                  <SelectItem value="TAS">Tasmania (TAS)</SelectItem>
                  <SelectItem value="ACT">Australian Capital Territory (ACT)</SelectItem>
                  <SelectItem value="NT">Northern Territory (NT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label htmlFor="propertyType">
                Property Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('propertyType')}
                onValueChange={(value) => setValue('propertyType', value as any)}
              >
                <SelectTrigger id="propertyType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential_house">Residential House</SelectItem>
                  <SelectItem value="residential_unit">Residential Unit/Apartment</SelectItem>
                  <SelectItem value="residential_townhouse">Townhouse</SelectItem>
                  <SelectItem value="commercial_office">Commercial Office</SelectItem>
                  <SelectItem value="commercial_retail">Commercial Retail</SelectItem>
                  <SelectItem value="commercial_warehouse">Commercial Warehouse</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="strata_building">Strata Building</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Access Instructions */}
            <div className="space-y-2">
              <Label htmlFor="accessInstructions" className="flex items-center gap-2">
                Access Instructions (Optional)
                <Lock className="h-3 w-3 text-muted-foreground" />
              </Label>
              <Textarea
                id="accessInstructions"
                {...register('accessInstructions')}
                placeholder="Gate code, key location, alarm details, etc."
                rows={3}
                maxLength={500}
              />
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <p>
                  Access information is encrypted and only revealed to contractors 24 hours before scheduled work
                </p>
              </div>
              {errors.accessInstructions && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.accessInstructions.message}
                </p>
              )}
            </div>

            {/* Property Features */}
            <div className="space-y-3">
              <Label>Property Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parkingAvailable"
                    checked={watch('parkingAvailable')}
                    onCheckedChange={(checked) => setValue('parkingAvailable', checked as boolean)}
                  />
                  <Label htmlFor="parkingAvailable" className="text-sm font-normal cursor-pointer">
                    Parking available on-site
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="securityAccess"
                    checked={watch('securityAccess')}
                    onCheckedChange={(checked) => setValue('securityAccess', checked as boolean)}
                  />
                  <Label htmlFor="securityAccess" className="text-sm font-normal cursor-pointer">
                    Security access required (swipe card, code, etc.)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petOnPremises"
                    checked={watch('petOnPremises')}
                    onCheckedChange={(checked) => setValue('petOnPremises', checked as boolean)}
                  />
                  <Label htmlFor="petOnPremises" className="text-sm font-normal cursor-pointer">
                    Pets on premises
                  </Label>
                </div>
              </div>
            </div>

            {/* Pet Details (if pets) */}
            {watch('petOnPremises') && (
              <div className="space-y-2">
                <Label htmlFor="petDetails">
                  Pet Details
                </Label>
                <Input
                  id="petDetails"
                  {...register('petDetails')}
                  placeholder="E.g., 2 small dogs - friendly"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  Helps contractors prepare appropriately
                </p>
              </div>
            )}

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
                    Complete Core Setup
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200 text-center">
                ✓ After this step, you'll be able to create service requests and get matched with contractors!
              </p>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Estimated time: 5 minutes • Your data is encrypted and secure
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
