/**
 * Claim Wizard - Step 1: Triage (Emergency Assessment)
 *
 * First step in the AI-automated claim reporting wizard
 * Collects critical triage information:
 * - Disaster type
 * - Incident timing
 * - Ongoing status
 * - Emergency/danger status
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

import { FormInput } from '@/src/design-system/components/Form/FormInput';
import { FormSelect } from '@/src/design-system/components/Form/FormSelect';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';

import {
  type TriageData,
  type ClaimFormState,
  triageSchema,
  disasterTypes,
} from '@/lib/claim-wizard/types';
import {
  saveClaimProgress,
  loadClaimProgress,
} from '@/lib/claim-wizard/storage';

export default function ClaimStep1Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Load existing progress
  const existingState = React.useMemo(() => loadClaimProgress(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TriageData>({
    resolver: zodResolver(triageSchema),
    defaultValues: existingState?.step1 || {
      disasterType: undefined,
      incidentDate: '',
      isOngoing: undefined,
      isEmergency: undefined,
    },
  });

  // Watch emergency status for conditional UI
  const isEmergency = watch('isEmergency');

  const onSubmit = async (data: TriageData) => {
    setIsLoading(true);

    try {
      // Save progress to localStorage
      const formState: ClaimFormState = {
        ...existingState,
        step1: data,
        currentStep: 2,
        completedSteps: [...(existingState?.completedSteps || []), 1],
        startedAt: existingState?.startedAt || new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
      };

      saveClaimProgress(formState);

      // Navigate to step 2
      router.push('/claim/step-2');
    } catch (error) {
      console.error('Failed to save progress:', error);
      // Continue anyway - don't block user
      router.push('/claim/step-2');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Report a Claim</h1>
            <div className="text-sm text-gray-600">Step 1 of 3</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-dr-emergency h-2 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>

        {/* Emergency Alert */}
        {isEmergency === 'yes' && (
          <Alert className="mb-6 border-red-600 bg-red-50">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-900">
              <strong>Emergency Detected:</strong> Your claim will be marked as critical priority.
              Contractors will be notified immediately.
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Emergency Assessment
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Disaster Type */}
            <FormSelect
              label="What happened?"
              options={disasterTypes}
              placeholder="Select disaster type"
              error={errors.disasterType?.message}
              context="emergency"
              required
              {...register('disasterType')}
            />

            {/* Incident Date */}
            <FormInput
              type="datetime-local"
              label="When did this happen?"
              error={errors.incidentDate?.message}
              helpText="Select the date and time when the damage occurred"
              context="emergency"
              required
              {...register('incidentDate')}
            />

            {/* Is Ongoing */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">
                Is it still happening? <span className="text-destructive ml-1">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    value="yes"
                    className="h-5 w-5 text-dr-emergency focus:ring-dr-emergency"
                    {...register('isOngoing')}
                  />
                  <span className="text-base">Yes, the damage is ongoing</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    value="no"
                    className="h-5 w-5 text-dr-emergency focus:ring-dr-emergency"
                    {...register('isOngoing')}
                  />
                  <span className="text-base">No, it has stopped</span>
                </label>
              </div>
              {errors.isOngoing && (
                <p className="text-sm text-destructive font-medium" role="alert">
                  {errors.isOngoing.message}
                </p>
              )}
            </div>

            {/* Is Emergency */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">
                Is anyone in danger? <span className="text-destructive ml-1">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-red-400 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                  <input
                    type="radio"
                    value="yes"
                    className="h-5 w-5 text-red-600 focus:ring-red-600"
                    {...register('isEmergency')}
                  />
                  <span className="text-base font-semibold text-red-900">
                    YES - Someone is in danger
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    value="no"
                    className="h-5 w-5 text-dr-emergency focus:ring-dr-emergency"
                    {...register('isEmergency')}
                  />
                  <span className="text-base">No, everyone is safe</span>
                </label>
              </div>
              {errors.isEmergency && (
                <p className="text-sm text-destructive font-medium" role="alert">
                  {errors.isEmergency.message}
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push('/')}
                icon={<ChevronLeft className="h-5 w-5" />}
                iconPosition="left"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="emergency-primary"
                size="crisis"
                loading={isLoading}
                icon={<ChevronRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Next: Location & Contact
              </Button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your information is encrypted and secure. We never share your data.
          </p>
        </div>
      </div>
    </div>
  );
}
