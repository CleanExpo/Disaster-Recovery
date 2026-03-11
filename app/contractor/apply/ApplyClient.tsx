'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, Building2, FileText, Award, CreditCard, UserCheck, CheckCircle,
  ArrowRight, ArrowLeft, Save, AlertCircle, Upload, Loader2, X, ShieldCheck
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
  { id: 1, name: 'Business Information', shortName: 'Business', icon: Building2, description: 'Company details & ABN' },
  { id: 2, name: 'Insurance & Licensing', shortName: 'Insurance', icon: Shield, description: 'Certificates & licences' },
  { id: 3, name: 'Experience & References', shortName: 'Experience', icon: Award, description: 'Work history & references' },
  { id: 4, name: 'Equipment & Resources', shortName: 'Equipment', icon: FileText, description: 'Tools & team capacity' },
  { id: 5, name: 'Health & Safety', shortName: 'Safety', icon: ShieldCheck, description: 'WHS compliance & procedures' },
  { id: 6, name: 'Banking & Payment', shortName: 'Banking', icon: CreditCard, description: 'Financial details & terms' },
  { id: 7, name: 'Review & Submit', shortName: 'Review', icon: CheckCircle, description: 'Final review & payment' }
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
  
  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);
  
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
    setOnboardingData(DEMO_DATA.contractor as Partial<ContractorOnboardingData>);
    
    // Progress through each step with descriptions
    const stepDescriptions = [
      'Filling business information and ABN details...',
      'Adding insurance policies and licences...',
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
        // TODO: Fix prop mismatch - Step2 expects onNext/onBack not updateData/errors
        return <Step2InsuranceLicensing data={(onboardingData || {}) as any} onNext={() => handleNext()} onBack={handlePrevious} />;
      case 3:
        // TODO: Fix prop mismatch - Step3 expects onNext/onBack not updateData/errors
        return <Step3ExperienceReferences data={(onboardingData || {}) as any} onNext={() => handleNext()} onBack={handlePrevious} />;
      case 4:
        // TODO: Fix prop mismatch - Step4 expects onNext/onBack not updateData/errors
        return <Step4EquipmentResources data={(onboardingData || {}) as any} onNext={() => handleNext()} onBack={handlePrevious} />;
      case 5:
        // TODO: Fix prop mismatch - Step5 expects onNext/onPrevious not updateData/errors
        return <Step5HealthSafety onNext={() => handleNext()} onPrevious={handlePrevious} defaultValues={(onboardingData || {}) as any} />;
      case 6:
        // TODO: Fix prop mismatch - Step6 expects onNext/onBack not updateData/errors
        return <Step6BankingPayment data={(onboardingData || {}) as any} onNext={() => handleNext()} onBack={handlePrevious} />;
      case 7:
        // TODO: Fix prop mismatch - Step7 expects onNext/onPrevious not updateData/errors
        return <Step7ReviewSubmit onNext={() => handleSubmit()} onPrevious={handlePrevious} defaultValues={(onboardingData || {}) as any} applicationData={onboardingData} />;
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
                <div className="text-white font-semibold">NRPG</div>
                <div className="text-slate-400 text-xs">Contractor Application</div>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              {isDemoRunning && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-yellow-400 rounded-lg animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Demo Running...
                </div>
              )}
              {isSaving && (
                <div className="flex items-center gap-2 text-blue-400 text-sm">
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
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
              >
                <X className="h-4 w-4" />
                Exit
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Step indicator */}
        <div className="mb-10 sm:mb-14">
          <p className="text-slate-400 text-sm text-center mb-4 sm:mb-6">
            Step {currentStep} of {ONBOARDING_STEPS.length}
          </p>
          <div className="flex items-center mx-auto">
            {ONBOARDING_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isClickable = isCompleted || step.id === completedSteps.length + 1;
              const shortName = (step as { shortName?: string; name: string }).shortName ?? step.name;

              // Apply improved hover effect only for clickable, not-completed and not-current steps
              return (
                <Fragment key={step.id}>
                  <div className="flex flex-1 min-w-0 flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isClickable}
                      className={`
                        flex flex-col items-center p-4   focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-blue-400 focus-visible:ring-offset-2 
                        focus-visible:ring-offset-slate-900 rounded-lg w-full
                        ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                        group
                      `}
                    >
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200
                          ${isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                              ? 'bg-blue-500 text-white ring-4 ring-blue-500/40 shadow-lg shadow-blue-500/20'
                              : `bg-slate-700/80 text-slate-400
                                 ${isClickable && !isCompleted && !isCurrent ? 'group-hover:bg-blue-600 group-hover:text-white' : ''}`
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                        ) : (
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                        )}
                      </div>
                      <span
                        className={`
                          mt-2 text-[10px] sm:text-xs font-medium text-center leading-tight 
                          max-w-[4.5rem] sm:max-w-[5rem]
                          ${isCurrent ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}
                          ${isClickable && !isCompleted && !isCurrent ? 'group-hover:text-white' : ''}
                          transition-colors duration-150
                        `}
                      >
                        {shortName}
                      </span>
                    </button>
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div
                      className={`
                        hidden sm:block w-8 h-8 flex-shrink-0 transition-colors duration-200
                        ${completedSteps.includes(step.id) ? 'bg-emerald-600' : 'bg-slate-700'}
                      `}
                      aria-hidden
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Step content card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = ONBOARDING_STEPS[currentStep - 1].icon;
                    return <Icon className="h-6 w-6 text-blue-400" aria-hidden />;
                  })()}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {ONBOARDING_STEPS[currentStep - 1].name}
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base mt-1">
                    {ONBOARDING_STEPS[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <div className="min-h-[360px]">
                {renderStepContent()}
              </div>

              {/* Navigation */}
              <nav
                className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-slate-700/70"
                aria-label="Step navigation"
              >
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`
                    order-2 sm:order-1 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition
                    ${currentStep === 1
                      ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'}
                  `}
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden />
                  Previous
                </button>

                <span className="order-1 sm:order-2 text-slate-500 text-sm font-medium">
                  Step {currentStep} of 7
                </span>

                {currentStep === 7 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || completedSteps.length < 7}
                    className={`
                      order-3 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition
                      ${completedSteps.length === 7
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white'
                        : 'bg-slate-700/30 text-slate-500 cursor-not-allowed'}
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle className="h-5 w-5" aria-hidden />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="order-3 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition"
                  >
                    Next step
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Help */}
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" aria-hidden />
              <div>
                <h3 className="font-semibold text-white mb-1">Need help?</h3>
                <p className="text-slate-400 text-sm">
                  Your progress is saved automatically. You can leave and come back anytime.
                  For support, email contractors@nrp.com.au
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractorApplicationPageOriginal() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <ContractorApplicationContent />
    </Suspense>
  );
}
export default function ContractorApplicationPage() {
  return (
    <>
      <AntigravityNavbar />
      <ContractorApplicationPageOriginal />
      <AntigravityFooter />
    </>
  );
}
