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
import { validateABN } from '@/lib/utils/australian-compliance';
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

/** Build residential restoration sample preset (used for quick-fill). Step components use mixed shapes so we use a loose type. */
function getResidentialPresetData(): Record<string, unknown> {
  const raw = DEMO_DATA.contractor as Record<string, unknown>;
  const c = raw as any;
  const ins = c.insurance as Record<string, unknown>;
  const pl = ins?.publicLiability as Record<string, unknown> | undefined;
  const pi = ins?.professionalIndemnity as Record<string, unknown> | undefined;
  const wc = ins?.workersCompensation as Record<string, unknown> | undefined;
  const lic = (ins?.licenses as Array<Record<string, unknown>>)?.[0];
  const bank = c.banking as Record<string, unknown> | undefined;
  const biz = c.businessInfo as Record<string, unknown>;
  const exp = c.experience as Record<string, unknown>;
  const equipment = c.equipment as Record<string, unknown> | undefined;
  const safety = c.healthSafety as Record<string, unknown> | undefined;
  const businessPhone =
    (biz.phone as string) && (biz.phone as string).trim().length > 0
      ? (biz.phone as string)
      : (biz.mobile as string) && (biz.mobile as string).trim().length > 0
      ? (biz.mobile as string)
      : '1300 000 000';

  // Build experience projects with at least 3 entries for Step 3
  const rawProjects = (exp?.majorProjects as Array<Record<string, unknown>>) || [];
  const baseProjects =
    rawProjects.length > 0
      ? rawProjects
      : [
          { name: 'CBD Office Flood Recovery', value: 750000, description: 'Multi-floor commercial flood restoration' },
          { name: 'Hospital Fire & Smoke Cleanup', value: 1250000, description: 'Smoke and soot remediation for critical care areas' },
          { name: 'Shopping Centre Mould Remediation', value: 500000, description: 'Large-scale mould remediation in retail tenancies' }
        ];
  const paddedProjects =
    baseProjects.length >= 3
      ? baseProjects
      : [
          ...baseProjects,
          ...[
            { name: 'Regional Storm Damage Response', value: 350000, description: 'Roof, water ingress and contents drying' }
          ].slice(0, 3 - baseProjects.length)
        ];

  // Build references with phone/email so Step 3 can be valid out of the box
  const rawRefs = (exp?.references as Array<Record<string, unknown>>) || [];
  const baseRefs =
    rawRefs.length > 0
      ? rawRefs
      : [
          {
            name: 'John Smith',
            company: 'QBE Insurance',
            position: 'Senior Claims Manager',
            relationship: 'Client',
            email: 'john.smith@example.com'
          },
          {
            name: 'Sarah Johnson',
            company: 'ABC Property Management',
            position: 'Portfolio Manager',
            relationship: 'Property Manager',
            email: 'sarah.johnson@example.com'
          },
          {
            name: 'Michael Lee',
            company: 'XYZ Strata',
            position: 'Strata Manager',
            relationship: 'Client',
            email: 'michael.lee@example.com'
          }
        ];

  return {
    ...c,
    businessInfo: {
      ...c.businessInfo,
      // Ensure Step 1 has a Business Phone when using quick fill
      phone: businessPhone
    },
    insurance: c.insurance,
    experience: c.experience,
    equipment: c.equipment,
    healthSafety: c.healthSafety,
    banking: c.banking,
    generalLiabilityInsurer: (pl?.provider as string) ?? '',
    generalLiabilityPolicyNumber: (pl?.policyNumber as string) ?? '',
    generalLiabilityCoverage: pl?.coverAmount != null ? `$${Number(pl.coverAmount)}` : '',
    generalLiabilityExpiry: (pl?.expiryDate as string) ?? '',
    professionalIndemnityInsurer: (pi?.provider as string) ?? '',
    professionalIndemnityPolicyNumber: (pi?.policyNumber as string) ?? '',
    professionalIndemnityCoverage: pi?.coverAmount != null ? `$${Number(pi.coverAmount)}` : '',
    professionalIndemnityExpiry: (pi?.expiryDate as string) ?? '',
    workersCompInsurer: (wc?.provider as string) ?? '',
    workersCompPolicyNumber: (wc?.policyNumber as string) ?? '',
    workersCompExpiry: (wc?.expiryDate as string) ?? '',
    contractorLicenseNumber: (lic?.number as string) ?? '',
    contractorLicenseState: 'QLD',
    contractorLicenseExpiry: (lic?.expiryDate as string) ?? '',
    bankName: 'Commonwealth Bank',
    accountName: (bank?.accountName as string) ?? '',
    bsb: (bank?.bsb as string) ?? '',
    accountNumber: (bank?.accountNumber as string) ?? '',
    // Use a known-valid sample ABN so validation passes after quick fill
    abn: '51824753556',
    gstRegistered: (bank?.gstRegistered as boolean) ?? true,
    paymentTerms: (bank?.paymentTerms as string) === '30 days' ? '30days' : '30days',
    preferredPaymentMethod: ((bank?.preferredPaymentMethod as string) ?? 'eft').toLowerCase().replace(/ /g, '_') as 'eft' | 'cheque' | 'credit_card',
    invoiceEmail: (biz?.email as string) ?? '',
    insuranceDirectBilling: false,
    preferredInsurers: [] as string[],
    restoreAssistAccess: false,
    creditLimit: '',
    tradesmanInsurance: false,
    publicLiabilityLimit: '',
    acceptCreditCards: false,
    agreeToTerms: false,
    agreeToFees: false,
    understandPaymentTerms: false,
    // Step 3 – experience overview
    yearsInBusiness: String(exp?.yearsInBusiness ?? 9),
    yearsInDisasterRecovery: String(exp?.yearsInBusiness ?? 9),
    totalProjectsCompleted: String(
      (exp?.majorProjects as Array<Record<string, unknown>>)?.length
        ? (exp?.majorProjects as Array<Record<string, unknown>>).length * 20
        : 200
    ),
    largestProjectValue: (() => {
      const projects = exp?.majorProjects as Array<Record<string, unknown>> | undefined;
      if (!projects || !projects.length) return '$2,500,000';
      const max = Math.max(
        ...projects
          .map((p) => Number(p.value ?? 0))
          .filter((v) => !Number.isNaN(v))
      );
      return max > 0 ? `$${max.toLocaleString('en-AU')}` : '$2,500,000';
    })(),
    workExperience: paddedProjects.map((project) => {
      const p = project as Record<string, unknown>;
      const client =
        (p.client as string) ??
        (p.clientName as string) ??
        'Key commercial client';
      const completion =
        (p.completionDate as string) ?? new Date().toISOString().slice(0, 10);

      return {
      projectName: (p.name as string) ?? '',
        clientName: client,
        // Must match one of the allowed projectType options in Step 3
        projectType: 'Multiple',
        projectValue: String(p.value ?? ''),
        // Provide a default completion date so the date input is filled
        completionDate: completion,
        description: (p.description as string) ?? '',
        challenges: '',
        outcome: ''
      };
    }),
    references: baseRefs.map((ref, idx) => {
      const r = ref as Record<string, unknown>;
      const basePosition =
        (r.position as string) && (r.position as string).trim().length > 0
          ? (r.position as string)
          : idx === 0
          ? 'Senior Claims Manager'
          : idx === 1
          ? 'Portfolio Manager'
          : 'Strata Manager';

      return {
        name: (r.name as string) ?? '',
        company: (r.company as string) ?? '',
        position: basePosition,
        relationship: (r.relationship as string) ?? 'Client',
        phone: ((r as any).phone as string) ?? '1300 000 000',
        email: (r.email as string) ?? 'contact@example.com',
        projectReference: (r.projectReference as string) ?? ''
      };
    }),
    // Step 4 – vehicles pre-filled for quick fill
    vehicles: [
      {
        type: 'Truck',
        make: 'Isuzu',
        model: 'NQR',
        year: '2021',
        registration: 'NRPG01',
        capacity: '3 tonne'
      },
      {
        type: 'Van',
        make: 'Toyota',
        model: 'HiAce',
        year: '2020',
        registration: 'NRPG02',
        capacity: '1.5 tonne'
      }
    ],
    specializations: (exp?.specializations as string[]) ?? [],
    insuranceClaimsExperience:
      'Handled 200+ insurance claims across water, fire, storm and mould events for major Australian insurers.',
    adjustorRelationships:
      'Established working relationships with multiple loss adjusters; provide same-day documentation and photos.',
    achievements:
      'Recognised for rapid response during the 2022 Brisbane floods and multiple cyclone recovery projects.',
    professionalMemberships:
      'IICRC certified firm; active member of relevant Australian restoration and cleaning associations.',
    // Step 4 – equipment & resources
    waterExtractionEquipment: [
      'Truck-mounted extraction unit',
      'Portable extraction units',
      'Submersible pumps'
    ],
    dryingEquipment: [
      'Axial air movers',
      'Refrigerant dehumidifiers',
      'LGR dehumidifiers'
    ],
    airQualityEquipment: ['Air scrubbers', 'HEPA filtration units', 'Negative air machines'],
    cleaningEquipment: ['Pressure washers', 'Carpet cleaning machines', 'HEPA vacuums'],
    safetyEquipment: ['PPE sets (complete)', 'Respirators (P2/N95)', 'Tyvek suits'],
    measurementTools: ['Moisture meters (pin type)', 'Thermo-hygrometers', 'Infrared cameras'],
    totalEmployees:
      equipment?.team && typeof equipment.team === 'object'
        ? String((equipment.team as any).technicians ?? 20)
        : '25',
    certifiedTechnicians:
      equipment?.team && typeof equipment.team === 'object'
        ? String((equipment.team as any).technicians ?? 20)
        : '20',
    employees: [
      {
        name: 'Lead Technician',
        role: 'Senior Restoration Technician',
        certifications: 'IICRC WRT, ASD',
        yearsExperience: '8'
      }
    ],
    officeLocation: biz
      ? `${biz.address ?? '123 Demo Street'}, ${biz.suburb ?? 'Brisbane'} ${
          biz.state ?? 'QLD'
        } ${biz.postcode ?? '4000'}`
      : '123 Demo Street, Brisbane QLD 4000',
    warehouseLocation: '456 Industrial Road, Brisbane QLD 4000',
    warehouseSize: '500',
    simultaneousProjects: '5',
    emergencyResponseTime: '2',
    coverage24x7: true,
    backupEquipment: true,
    subcontractorNetwork: true,
    primarySuppliers: 'Demo Restoration Supply Co; National Equipment Rentals',
    emergencyContacts: 'Operations Manager (24/7): 1300 000 000'
    ,
    // Step 5 – Health & Safety (map from demo healthSafety into full form shape)
    whsPolicyDocument: 'WHS Policy v2.1',
    whsPolicyVersion: 'v2.1',
    whsPolicyReviewDate: new Date().toISOString().slice(0, 10),
    safeWorkMethodStatements: (safety?.safeWorkProcedures as boolean) ?? true,
    swmsCategories: [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation'
    ],
    safetyManagementSystem: 'internal',
    safetyOfficerName: 'Jane Safety',
    safetyOfficerContact: 'safety.officer@example.com',
    safetyMeetingFrequency: 'monthly',
    inductionProcess: true,
    trainingRecordSystem: 'digital',
    mandatoryTraining:
      (safety?.training as string[] | undefined)?.map((t) => ({
        trainingType: t,
        provider: 'Registered RTO',
        frequency: 'annual',
        lastCompleted: new Date().toISOString().slice(0, 10)
      })) ?? [
        {
          trainingType: 'Working at Heights',
          provider: 'Registered RTO',
          frequency: 'annual',
          lastCompleted: new Date().toISOString().slice(0, 10)
        }
      ],
    certifications: [
      {
        certificationType: 'First Aid/CPR',
        certNumber: 'FA-12345',
        expiryDate: new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate()
        )
          .toISOString()
          .slice(0, 10),
        holder: 'Lead Technician'
      }
    ],
    ppeProvided: (safety?.ppe as boolean) ?? true,
    ppeTypes: [
      'Safety Helmets/Hard Hats',
      'Safety Glasses/Goggles',
      'Respirators/Masks',
      'Safety Boots',
      'Gloves (Various Types)'
    ],
    equipmentMaintenance: true,
    maintenanceSchedule: 'quarterly',
    incidentReportingSystem: (safety?.incidentReporting as boolean) ?? true,
    incidentReportingMethod: 'digital',
    nearMissReporting: true,
    incidentInvestigationProcess: true,
    workersCompClaims: 0,
    lostTimeInjuries: 0,
    riskAssessmentProcess: (safety?.riskAssessments as boolean) ?? true,
    hazardIdentification: true,
    jsaProcess: true,
    takesFiveImplemented: true,
    emergencyResponsePlan: true,
    evacuationProcedures: true,
    firstAidCapability: true,
    firstAiders: [
      {
        name: 'Jane Safety',
        certification: 'Provide First Aid (HLTAID011)',
        expiryDate: new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate()
        )
          .toISOString()
          .slice(0, 10)
      }
    ],
    safetyAuditsFrequency: 'annual',
    externalAudits: true,
    lastAuditDate: new Date().toISOString().slice(0, 10),
    complianceScore: 95,
    mentalHealthPolicy: true,
    eapProgram: true,
    fatigueManagement: true,
    commitToNRPStandards: true,
    shareIncidentData: true,
    participateInSafetyPrograms: true
  };
}

/** Quick-fill presets: select one and the form fills immediately (no button). */
const QUICK_FILL_PRESETS: { id: string; label: string; data: Record<string, unknown> }[] = [
  { id: '', label: 'Start from scratch', data: {} },
  { id: 'residential', label: 'Residential restoration (sample)', data: getResidentialPresetData() },
  {
    id: 'commercial',
    label: 'Commercial cleaning (sample)',
    data: (() => {
      const base = getResidentialPresetData();
      const merged = { ...base };
      const biz = merged.businessInfo as Record<string, unknown>;
      if (biz) {
        merged.businessInfo = {
          ...biz,
          companyName: 'Metro Commercial Cleaning Pty Ltd',
          tradingName: 'Metro Clean',
          // Use the same valid sample ABN for this preset
          abn: '51824753556',
          numberOfEmployees: 12,
          annualRevenue: '$500K–$1M',
          website: 'https://metroclean.com.au',
          address: '45 Industrial Ave',
          suburb: 'Melbourne',
          state: 'VIC',
          postcode: '3000'
        };
        (merged.businessInfo as Record<string, unknown>).email = 'apply@metroclean.com.au';
      }
      const bank = merged.banking as Record<string, unknown>;
      if (bank) merged.banking = { ...bank, accountName: 'Metro Commercial Cleaning Pty Ltd', bsb: '063-000', accountNumber: '87654321' };
      merged.accountName = 'Metro Commercial Cleaning Pty Ltd';
      merged.bsb = '063-000';
      merged.accountNumber = '87654321';
      // Keep top-level abn in sync with the businessInfo.abn value
      merged.abn = '51824753556';
      merged.invoiceEmail = 'apply@metroclean.com.au';
      return merged;
    })()
  }
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
  const [quickFillSelection, setQuickFillSelection] = useState<string>('');

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
    // Step 1: Business Information must be complete and ABN valid before proceeding
    if (step === 1) {
      const biz = (onboardingData.businessInfo || {}) as any;
      const missing: string[] = [];

      if (!biz.companyName?.trim()) missing.push('Company Name');
      if (!biz.abn || !validateABN(String(biz.abn))) missing.push('Valid ABN');
      if (!biz.businessType) missing.push('Business Type');
      if (!biz.yearEstablished) missing.push('Year Established');
      if (!biz.numberOfEmployees) missing.push('Number of Employees');
      if (!biz.email?.trim()) missing.push('Business Email');
      if (!biz.phone?.trim()) missing.push('Business Phone');
      if (!biz.address?.trim()) missing.push('Business Address');
      if (!biz.suburb?.trim()) missing.push('Suburb');
      if (!biz.state?.trim()) missing.push('State');
      if (!biz.postcode?.trim()) missing.push('Postcode');

      if (missing.length > 0) {
        setValidationErrors({
          _step1: [
            'Please complete all required Business Information fields before continuing:',
            ...missing
          ]
        });
        return false;
      }

      // Clear any previous step 1 validation messages
      setValidationErrors(prev => {
        if (!prev._step1) return prev;
        const { _step1, ...rest } = prev;
        return rest;
      });
      return true;
    }

    // Other steps: keep existing behaviour for now
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

  const handleQuickFillChange = (value: string) => {
    setQuickFillSelection(value);
    const preset = QUICK_FILL_PRESETS.find((p) => p.id === value);
    setOnboardingData(preset ? { ...preset.data } : {});
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

      <div className=" container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Step indicator */}
        <div className="mb-10 sm:mb-14">
          <p className="text-slate-400 text-sm  mb-4 sm:mb-6">
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

              {/* Quick fill: select a preset and the form fills immediately */}
              <div className="mb-6 flex justify-end">
                <div className="inline-flex flex-col items-stretch gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-left">
                  <label htmlFor="quick-fill" className="text-sm font-medium text-slate-300 whitespace-nowrap">
                    Quick fill
                  </label>
                  <select
                    id="quick-fill"
                    value={quickFillSelection}
                    onChange={(e) => handleQuickFillChange(e.target.value)}
                    className="min-w-[200px] max-w-[280px] px-3 py-2 rounded-lg bg-slate-700/80 border border-slate-600 text-white text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Fill form with sample data"
                  >
                    {QUICK_FILL_PRESETS.map((preset) => (
                      <option key={preset.id || 'blank'} value={preset.id}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

        {/* Step content card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10">
              {currentStep === 1 && validationErrors._step1 && (
                <div className="mb-6 rounded-xl border border-red-500/40 bg-red-900/30 px-4 py-3 text-sm text-red-100">
                  <div className="font-semibold mb-1">Please fix the following before continuing:</div>
                  <ul className="list-disc list-inside space-y-0.5">
                    {validationErrors._step1.map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
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


              <div className="min-h-[360px]" key={`step-${currentStep}-${quickFillSelection}`}>
                {renderStepContent()}
              </div>

              {/* Navigation (only for step 1; other steps use their own internal nav) */}
              <nav
                className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-slate-700/70"
                aria-label="Step navigation"
              >
                {currentStep === 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`
                        order-2 sm:order-1 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition
                        bg-slate-700/30 text-slate-500 cursor-not-allowed
                      `}
                    >
                      <ArrowLeft className="h-5 w-5" aria-hidden />
                      Previous
                    </button>

                    <span className="order-1 sm:order-2 text-slate-500 text-sm font-medium">
                      Step {currentStep} of 7
                    </span>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="order-3 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition"
                    >
                      Next step
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </button>
                  </>
                )}

                {currentStep !== 1 && (
                  <span className="w-full text-center text-slate-500 text-sm font-medium">
                    Step {currentStep} of 7
                  </span>
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
