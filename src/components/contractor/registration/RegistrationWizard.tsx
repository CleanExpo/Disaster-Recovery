'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

// Import step components
import { Step1Account } from './steps/Step1Account';
import { Step2Company } from './steps/Step2Company';
import { Step3Insurance } from './steps/Step3Insurance';
import { Step4Certifications } from './steps/Step4Certifications';
import { Step5Background } from './steps/Step5Background';
import { Step6Subscription } from './steps/Step6Subscription';
import { Step7Agreements } from './steps/Step7Agreements';
import { StepReview } from './steps/StepReview';

import type { ContractorOnboardingData } from '@/types/contractor';

const REGISTRATION_STEPS = [
  { id: 1, title: 'Create Account', description: 'Set up your login credentials' },
  { id: 2, title: 'Company Profile', description: 'Business details and verification' },
  { id: 3, title: 'Insurance', description: 'Upload insurance documentation' },
  { id: 4, title: 'Certifications', description: 'Industry qualifications' },
  { id: 5, title: 'Background Check', description: 'References and verification' },
  { id: 6, title: 'Subscription', description: 'Select coverage and payment' },
  { id: 7, title: 'Agreements', description: 'Review and accept terms' },
  { id: 8, title: 'Review', description: 'Review and submit application' }
];

export function RegistrationWizard() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Initialize form data from localStorage or defaults
  const [formData, setFormData] = useState<Partial<ContractorOnboardingData>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('contractor_registration');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('contractor_registration', JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = (stepData: Partial<ContractorOnboardingData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const validateStep = async (step: number): Promise<boolean> => {
    try {
      const response = await fetch('/api/contractor/validate-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data: formData })
      });

      const result = await response.json();
      
      if (!result.success) {
        setValidationErrors(result.errors || {});
        return false;
      }
      
      setValidationErrors({});
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      toast({
        title: 'Validation Error',
        description: 'Unable to validate form data. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    
    if (isValid) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => Math.min(prev + 1, REGISTRATION_STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (step: number) => {
    // Only allow navigation to completed steps or the next step
    if (completedSteps.includes(step) || step === completedSteps.length + 1) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contractor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        // Clear localStorage
        localStorage.removeItem('contractor_registration');
        
        toast({
          title: 'Application Submitted',
          description: 'Your application has been submitted successfully. We will review it and contact you soon.' });
        
        // Redirect to success page or login
        router.push('/contractor/application-success');
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'Unable to submit application. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const stepProps = {
      data: formData,
      updateData: updateFormData,
      errors: validationErrors
    };

    switch (currentStep) {
      case 1:
        return <Step1Account {...stepProps} />;
      case 2:
        return <Step2Company {...stepProps} />;
      case 3:
        return <Step3Insurance {...stepProps} />;
      case 4:
        return <Step4Certifications {...stepProps} />;
      case 5:
        return <Step5Background {...stepProps} />;
      case 6:
        return <Step6Subscription {...stepProps} />;
      case 7:
        return <Step7Agreements {...stepProps} />;
      case 8:
        return <StepReview data={formData} onEdit={handleStepClick} />;
      default:
        return null;
    }
  };

  const progressPercentage = ((completedSteps.length) / (REGISTRATION_STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            NRP Contractor Onboarding Portal
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your registration to become an NRP certified contractor partner
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-medium">
                Step {currentStep} of {REGISTRATION_STEPS.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            {/* Step Indicators */}
            <div className="mt-6 grid grid-cols-4 lg:grid-cols-8 gap-2">
              {REGISTRATION_STEPS.map(step => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  disabled={!completedSteps.includes(step.id) && step.id !== completedSteps.length + 1}
                  className={`
                    p-2 rounded-lg text-xs font-medium transition-all
                    ${currentStep === step.id 
                      ? 'bg-blue-600 text-white' 
                      : completedSteps.includes(step.id)
                        ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-center justify-center">
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <span className="mr-1">{step.id}.</span>
                    )}
                    <span className="hidden lg:inline">{step.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{REGISTRATION_STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {REGISTRATION_STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            {/* Validation Errors */}
            {Object.keys(validationErrors).length > 0 && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please correct the errors above before proceeding.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === REGISTRATION_STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || completedSteps.length < REGISTRATION_STEPS.length - 1}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help? Contact our support team at{' '}
            <a href="mailto:contractors@nrp.com.au" className="text-blue-600 hover:underline">
              contractors@nrp.com.au
            </a>
            {' '}or call{' '}
            <a href="#contact-form" className="text-blue-600 hover:underline">
              online support</a>
          </p>
        </div>
      </div>
    </div>
  );
}