/**
 * Claim Wizard - Step 3: Details & Insurance
 *
 * Final step in the AI-automated claim reporting wizard
 * Collects detailed damage information:
 * - Damage description
 * - Photo uploads (optional)
 * - Insurance information
 * - CAPTCHA verification
 * - Final submission
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';

import { FormInput } from '@/src/design-system/components/Form/FormInput';
import { FormTextarea } from '@/src/design-system/components/Form/FormTextarea';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';

import {
  type DetailsInsuranceData,
  type ClaimFormState,
  type CompleteClaimData,
  detailsInsuranceSchema,
  calculatePriority,
} from '@/lib/claim-wizard/types';
import {
  saveClaimProgress,
  loadClaimProgress,
  clearClaimProgress,
} from '@/lib/claim-wizard/storage';

export default function ClaimStep3Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadedPhotos, setUploadedPhotos] = React.useState<string[]>([]);
  const [captchaToken, setCaptchaToken] = React.useState<string>('');
  const [showCaptcha, setShowCaptcha] = React.useState(false);

  // Load existing progress
  const existingState = React.useMemo(() => loadClaimProgress(), []);

  // Redirect if previous steps not completed
  React.useEffect(() => {
    if (!existingState?.step1 || !existingState?.step2) {
      router.push('/claim/step-1');
    }
  }, [existingState, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DetailsInsuranceData>({
    resolver: zodResolver(detailsInsuranceSchema),
    defaultValues: existingState?.step3 || {
      damageDescription: '',
      hasInsurance: undefined,
      insuranceProvider: '',
      policyNumber: '',
      photoUrls: [],
    },
  });

  const hasInsurance = watch('hasInsurance');
  const damageDescription = watch('damageDescription');

  // Handle photo upload (mock implementation - would use actual upload service)
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // In production, upload to cloud storage (S3, Cloudinary, etc.)
    // For now, create mock URLs
    const newPhotoUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    const updatedPhotos = [...uploadedPhotos, ...newPhotoUrls].slice(0, 5); // Max 5 photos

    setUploadedPhotos(updatedPhotos);
    setValue('photoUrls', updatedPhotos);
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = uploadedPhotos.filter((_, i) => i !== index);
    setUploadedPhotos(updatedPhotos);
    setValue('photoUrls', updatedPhotos);
  };

  // Mock CAPTCHA verification
  const verifyCaptcha = () => {
    // In production, use hCaptcha or reCAPTCHA
    const mockToken = `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCaptchaToken(mockToken);
    setShowCaptcha(false);
  };

  const onSubmit = async (data: DetailsInsuranceData) => {
    // Show CAPTCHA if not already verified
    if (!captchaToken) {
      setShowCaptcha(true);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare complete claim data
      const completeData: CompleteClaimData = {
        step1: existingState!.step1!,
        step2: existingState!.step2!,
        step3: data,
        captchaToken,
      };

      // Calculate priority
      const priority = calculatePriority(existingState!);

      // Submit to API
      const response = await fetch('/api/public/claims/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...completeData,
          priority,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit claim');
      }

      const result = await response.json();

      // Clear saved progress
      clearClaimProgress();

      // Navigate to success page
      router.push(`/claim/success?claimId=${result.claimId}`);
    } catch (error) {
      console.error('Failed to submit claim:', error);
      alert('Failed to submit claim. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Save current data before going back
    const data = {
      damageDescription: damageDescription || '',
      hasInsurance: hasInsurance as 'yes' | 'no',
      insuranceProvider: (document.getElementById('insurance-provider') as HTMLInputElement)?.value || '',
      policyNumber: (document.getElementById('policy-number') as HTMLInputElement)?.value || '',
      photoUrls: uploadedPhotos,
    };

    const formState: ClaimFormState = {
      ...existingState,
      step3: data as DetailsInsuranceData,
      currentStep: 2,
      startedAt: existingState?.startedAt || new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };

    saveClaimProgress(formState);
    router.push('/claim/step-2');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Report a Claim</h1>
            <div className="text-sm text-gray-600">Step 3 of 3</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-dr-emergency h-2 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Damage Details & Insurance
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Damage Description */}
            <FormTextarea
              label="Describe the damage"
              placeholder="Please describe what happened and the extent of the damage. Include details like affected rooms, visible damage, and any immediate concerns..."
              error={errors.damageDescription?.message}
              helpText={`${damageDescription?.length || 0}/1000 characters (minimum 20)`}
              context="emergency"
              required
              showCharCount
              maxLength={1000}
              rows={6}
              {...register('damageDescription')}
            />

            {/* Photo Upload */}
            <div className="space-y-3">
              <label className="block text-base font-medium text-foreground">
                Upload Photos (Optional)
              </label>
              <p className="text-sm text-gray-600">
                Photos help contractors assess the damage faster. You can upload up to 5 photos.
              </p>

              {/* Photo Grid */}
              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {uploadedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Damage photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {uploadedPhotos.length < 5 && (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-8 w-8 text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload photos ({uploadedPhotos.length}/5)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                  />
                </label>
              )}
            </div>

            {/* Insurance Information */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Insurance Information
              </h3>

              {/* Has Insurance */}
              <div className="space-y-2 mb-6">
                <label className="block text-base font-medium text-foreground">
                  Do you have insurance? <span className="text-destructive ml-1">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      value="yes"
                      className="h-5 w-5 text-dr-emergency focus:ring-dr-emergency"
                      {...register('hasInsurance')}
                    />
                    <span className="text-base">Yes, I have insurance</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      value="no"
                      className="h-5 w-5 text-dr-emergency focus:ring-dr-emergency"
                      {...register('hasInsurance')}
                    />
                    <span className="text-base">No, I'll be paying directly</span>
                  </label>
                </div>
                {errors.hasInsurance && (
                  <p className="text-sm text-destructive font-medium" role="alert">
                    {errors.hasInsurance.message}
                  </p>
                )}
              </div>

              {/* Insurance Provider (conditional) */}
              {hasInsurance === 'yes' && (
                <div className="space-y-6">
                  <FormInput
                    type="text"
                    label="Insurance Provider"
                    placeholder="e.g., NRMA, Allianz, QBE"
                    error={errors.insuranceProvider?.message}
                    context="emergency"
                    required={hasInsurance === 'yes'}
                    id="insurance-provider"
                    {...register('insuranceProvider')}
                  />

                  <FormInput
                    type="text"
                    label="Policy Number (Optional)"
                    placeholder="Your policy number"
                    error={errors.policyNumber?.message}
                    helpText="This helps contractors process your claim faster"
                    context="emergency"
                    id="policy-number"
                    {...register('policyNumber')}
                  />
                </div>
              )}
            </div>

            {/* CAPTCHA (Mock) */}
            {showCaptcha && !captchaToken && (
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-700 mb-4">
                  Please verify you're human before submitting
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={verifyCaptcha}
                  icon={<CheckCircle className="h-5 w-5" />}
                >
                  I'm not a robot
                </Button>
              </div>
            )}

            {/* CAPTCHA Verified */}
            {captchaToken && (
              <Alert className="border-green-600 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-900">
                  CAPTCHA verified. You can now submit your claim.
                </AlertDescription>
              </Alert>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBack}
                icon={<ChevronLeft className="h-5 w-5" />}
                iconPosition="left"
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="emergency-primary"
                size="crisis"
                loading={isLoading}
                disabled={!captchaToken && !showCaptcha}
              >
                {isLoading ? 'Submitting...' : 'Submit Claim'}
              </Button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your claim is encrypted and will be matched with certified contractors in your area.
          </p>
        </div>
      </div>
    </div>
  );
}
