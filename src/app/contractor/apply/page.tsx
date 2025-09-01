'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, Building2, FileText, Award, MapPin, UserCheck, CheckCircle,
  ArrowRight, ArrowLeft, Save, AlertCircle, Upload, Loader2, X
} from 'lucide-react';
import { ContractorOnboardingData, OnboardingProgress } from '@/types/contractor-onboarding';
import { DEMO_DATA, simulateClick, autoFillForm } from '@/lib/demo-mode';
import Step1BusinessInfo from '@/components/contractor/onboarding/Step1BusinessInfo';
import Step2InsuranceLicensing from '@/components/contractor/onboarding/Step2InsuranceLicensing';
import Step3ExperienceReferences from '@/components/contractor/onboarding/Step3ExperienceReferences';
import Step4EquipmentResources from '@/components/contractor/onboarding/Step4EquipmentResources';
import Step5HealthSafety from '@/components/contractor/onboarding/Step5HealthSafety';
import Step6BankingPayment from '@/components/contractor/onboarding/Step6BankingPayment';
import Step7ReviewSubmit from '@/components/contractor/onboarding/Step7ReviewSubmit';

const ONBOARDING_STEPS = [
  { id: 1, name: 'Business Information', icon: Building2, description: 'Company details & ABN' },
  { id: 2, name: 'Insurance & Licensing', icon: Shield, description: 'Certificates & licenses' },
  { id: 3, name: 'Experience & References', icon: Award, description: 'Work history & references' },
  { id: 4, name: 'Equipment & Resources', icon: FileText, description: 'Tools & team capacity' },
  { id: 5, name: 'Health & Safety', icon: Shield, description: 'WHS compliance & procedures' },
  { id: 6, name: 'Banking & Payment', icon: MapPin, description: 'Financial details & terms' },
  { id: 7, name: 'Review & Submit', icon: CheckCircle, description: 'Final review & payment' }
];

function ContractorApplicationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [onboardingData, setOnboardingData] = useState<Partial<ContractorOnboardingData>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('contractor_onboarding_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setOnboardingData(progress.savedData || {});
      setCompletedSteps(progress.completedSteps || []);
      setCurrentStep(progress.currentStep || 1);
    }
    
    // Check if auto-demo should run
    if (searchParams.get('demo') === 'auto') {
      runAutoDemo();
    }
  }, []);
  
  // Auto-demo functionality with enhanced timing
  const runAutoDemo = async () => {
    setIsDemoRunning(true);
    
    // Show initial message
    const showMessage = (msg: string) => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'fixed bottom-4 right-4 z-[2000] bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in';
      messageDiv.textContent = msg;
      document.body.appendChild(messageDiv);
      setTimeout(() => messageDiv.remove(), 3000);
    };
    
    showMessage('Starting Contractor Application Demo...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set demo data
    setOnboardingData(DEMO_DATA.contractor);
    
    // Progress through each step with descriptions
    const stepDescriptions = [
      'Filling business information and ABN details...',
      'Adding insurance policies and licenses...',
      'Documenting experience and references...',
      'Listing equipment and team resources...',
      'Confirming health & safety compliance...',
      'Setting up banking and payment details...',
      'Reviewing and submitting application...'
    ];
    
    // Form data for each step
    const stepFormData = [
      DEMO_DATA.contractor.businessInfo,
      DEMO_DATA.contractor.insurance,
      DEMO_DATA.contractor.experience,
      DEMO_DATA.contractor.equipment,
      DEMO_DATA.contractor.healthSafety,
      DEMO_DATA.contractor.banking,
      {} // Review step doesn't have form fields
    ];
    
    for (let step = 1; step <= 7; step++) {
      setCurrentStep(step);
      showMessage(stepDescriptions[step - 1]);
      
      // Wait for component to render
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Auto-fill form fields for current step
      if (step < 7) {
        await autoFillForm(stepFormData[step - 1], 115);
      }
      
      // Additional delay to show filled form
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      setCompletedSteps(prev => [...prev, step]);
      
      // Save progress
      await saveProgress();
      
      // Longer pause on final step
      if (step === 7) {
        await new Promise(resolve => setTimeout(resolve, 3450)); // 15% slower
      } else {
        await new Promise(resolve => setTimeout(resolve, 2300)); // 15% slower
      }
    }
    
    // Show completion with training module preview
    showMessage('Application Complete! Contractor now has access to training modules.');
    setTimeout(() => {
      const completionModal = document.createElement('div');
      completionModal.className = 'fixed inset-0 z-[3000] bg-black/50 flex items-center justify-center p-4';
      completionModal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-2xl animate-scale-in">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">✅ Demo Application Complete!</h2>
          <p class="text-gray-600 mb-6">The contractor application has been submitted successfully.</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="font-semibold text-blue-900 mb-2">Next Steps for Contractor:</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Complete mandatory training modules (8 hours)</li>
              <li>• Upload insurance certificates</li>
              <li>• Schedule vehicle inspection</li>
              <li>• Attend virtual onboarding session</li>
              <li>• Receive first leads within 48 hours</li>
            </ul>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Close Demo</button>
        </div>
      `;
      document.body.appendChild(completionModal);
      setIsDemoRunning(false);
    }, 4000);
  };

  // Auto-save progress
  const saveProgress = async () => {
    setIsSaving(true);
    const progress: Partial<OnboardingProgress> = {
      currentStep,
      completedSteps,
      savedData: onboardingData,
      lastUpdated: new Date().toISOString(),
      completionPercentage: Math.round((completedSteps.length / 7) * 100)
    };
    
    // Save to localStorage
    localStorage.setItem('contractor_onboarding_progress', JSON.stringify(progress));
    
    // TODO: Also save to backend API
    // await fetch('/api/contractor/onboarding/save-progress', { ... });
    
    setIsSaving(false);
  };

  const updateStepData = (stepData: any) => {
    setOnboardingData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const validateStep = (step: number): boolean => {
    // TODO: Implement validation for each step
    return true;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      await saveProgress();
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Allow navigation to completed steps or the next step
    if (completedSteps.includes(step) || step === completedSteps.length + 1) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // TODO: Submit to backend API
      // const response = await fetch('/api/contractor/onboarding/submit', { ... });
      
      // Clear local storage on successful submission
      localStorage.removeItem('contractor_onboarding_progress');
      
      // Redirect to success page
      router.push('/contractor/application-success');
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BusinessInfo data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      case 2:
        return <Step2InsuranceLicensing data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      case 3:
        return <Step3ExperienceReferences data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      case 4:
        return <Step4EquipmentResources data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      case 5:
        return <Step5HealthSafety data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      case 6:
        return <Step6BankingPayment data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      case 7:
        return <Step7ReviewSubmit data={onboardingData || {}} updateData={updateStepData} errors={validationErrors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-black/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-white font-semibold">NRP</div>
                <div className="text-slate-400 text-xs">Contractor Application</div>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              {isDemoRunning && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-yellow-300 rounded-lg animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Demo Running...
                </div>
              )}
              {isSaving && (
                <div className="flex items-center gap-2 text-blue-300 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving progress...
                </div>
              )}
              <button
                onClick={saveProgress}
                disabled={isDemoRunning}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                Save Progress
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition"
              >
                <X className="h-4 w-4" />
                Exit
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {ONBOARDING_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isClickable = isCompleted || step.id === completedSteps.length + 1;
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`relative flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${isCompleted ? 'bg-green-600 text-white' : 
                        isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-600/30' : 
                        'bg-slate-700 text-slate-400'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="absolute top-14 w-32 text-center">
                      <div className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                        Step {step.id}
                      </div>
                      <div className={`text-xs ${isCurrent ? 'text-blue-300' : 'text-slate-500'} hidden sm:block`}>
                        {step.name}
                      </div>
                    </div>
                  </button>
                  
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div className={`
                      w-full h-0.5 mx-2 transition-all
                      ${completedSteps.includes(step.id) ? 'bg-green-600' : 'bg-slate-700'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {ONBOARDING_STEPS[currentStep - 1].name}
              </h2>
              <p className="text-slate-400">
                {ONBOARDING_STEPS[currentStep - 1].description}
              </p>
            </div>

            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-700">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition
                  ${currentStep === 1 
                    ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'}
                `}
              >
                <ArrowLeft className="h-5 w-5" />
                Previous
              </button>

              <div className="text-slate-400">
                Step {currentStep} of 7
              </div>

              {currentStep === 7 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || completedSteps.length < 7}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition
                    ${completedSteps.length === 7
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed'}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle className="h-5 w-5" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition"
                >
                  Next
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">Need Help?</h3>
                <p className="text-blue-200 text-sm">
                  Your progress is automatically saved. You can exit and return at any time to complete your application.
                  For assistance, email contractors@nrp.com.au
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContractorApplicationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <ContractorApplicationContent />
    </Suspense>
  );
}