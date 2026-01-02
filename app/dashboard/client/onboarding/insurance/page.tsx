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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUpload } from '@/components/ui/file-upload';
import { Loader2, ArrowLeft, ArrowRight, Shield, Info } from 'lucide-react';
import { z } from 'zod';

// Simplified schema for UI (full validation in API)
const insuranceFormSchema = z.object({
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  policyExpiryDate: z.string().optional(),
  policyDocumentUrls: z.array(z.string()).optional(),
  hasPreviousClaims: z.boolean().optional(),
  claimCount: z.number().optional(),
});

type InsuranceForm = z.infer<typeof insuranceFormSchema>;

export default function ClientInsurancePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [policyDocuments, setPolicyDocuments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsuranceForm>({
    resolver: zodResolver(insuranceFormSchema),
    defaultValues: {
      hasInsurance: false,
      hasPreviousClaims: false,
      policyDocumentUrls: [],
    },
  });

  const hasInsurance = watch('hasInsurance');
  const hasPreviousClaims = watch('hasPreviousClaims');

  const onSubmit = async (data: InsuranceForm) => {
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        ...data,
        policyDocumentUrls: policyDocuments,
        policyExpiryDate: data.policyExpiryDate || undefined,
      };

      const response = await fetch('/api/client/onboarding/insurance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
      } else {
        setError(result.message || result.error || 'Failed to save insurance details');
      }
    } catch (err) {
      console.error('Insurance submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard/client/onboarding/checklist');
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
              <CardTitle>Phase 4: Insurance Information (Optional)</CardTitle>
              <CardDescription>Add your insurance details for faster claim processing</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">Step 4 of 7</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Has Insurance */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasInsurance"
                checked={hasInsurance}
                onCheckedChange={(checked) => setValue('hasInsurance', checked as boolean)}
              />
              <Label htmlFor="hasInsurance" className="text-sm font-medium cursor-pointer">
                I have property insurance
              </Label>
            </div>

            {hasInsurance && (
              <>
                {/* Insurance Provider */}
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">
                    Insurance Provider <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={watch('insuranceProvider') || ''}
                    onValueChange={(value) => setValue('insuranceProvider', value)}
                  >
                    <SelectTrigger id="insuranceProvider">
                      <SelectValue placeholder="Select your insurer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NRMA">NRMA Insurance</SelectItem>
                      <SelectItem value="SUNCORP">Suncorp</SelectItem>
                      <SelectItem value="ALLIANZ">Allianz</SelectItem>
                      <SelectItem value="QBE">QBE Insurance</SelectItem>
                      <SelectItem value="IAG">IAG</SelectItem>
                      <SelectItem value="CGU">CGU Insurance</SelectItem>
                      <SelectItem value="MEDIBANK">Medibank</SelectItem>
                      <SelectItem value="AAMI">AAMI</SelectItem>
                      <SelectItem value="YOUI">Youi</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Policy Number and Expiry */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">
                      Policy Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="policyNumber"
                      {...register('policyNumber')}
                      placeholder="POL-123456789"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policyExpiryDate">
                      Policy Expiry Date
                    </Label>
                    <Input
                      id="policyExpiryDate"
                      type="date"
                      {...register('policyExpiryDate')}
                    />
                  </div>
                </div>

                {/* Policy Document Upload */}
                <FileUpload
                  label="Insurance Policy Document (Optional)"
                  description="Upload your Certificate of Currency or policy document"
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5 * 1024 * 1024}
                  value={policyDocuments[0] || null}
                  onChange={(url) => setPolicyDocuments(url ? [url] : [])}
                />

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-semibold mb-1">Verified Insurance Badge</p>
                      <p>Upload your policy now to get verified and unlock priority matching with insurance-preferred contractors.</p>
                    </div>
                  </div>
                </div>

                {/* Previous Claims */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPreviousClaims"
                      checked={hasPreviousClaims}
                      onCheckedChange={(checked) => setValue('hasPreviousClaims', checked as boolean)}
                    />
                    <Label htmlFor="hasPreviousClaims" className="text-sm font-normal cursor-pointer">
                      I've made insurance claims before
                    </Label>
                  </div>

                  {hasPreviousClaims && (
                    <div className="space-y-2">
                      <Label htmlFor="claimCount">
                        Number of Previous Claims
                      </Label>
                      <Input
                        id="claimCount"
                        type="number"
                        min="1"
                        max="50"
                        {...register('claimCount', { valueAsNumber: true })}
                        placeholder="e.g., 2"
                      />
                    </div>
                  )}
                </div>
              </>
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
                onClick={handleSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Optional Phase:</strong> You can skip this and add insurance details later when submitting a claim. We'll remind you when needed.
                </p>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Estimated time: 3 minutes
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
