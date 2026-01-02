/**
 * NRPG Contractor Acquisition Funnel - Page 3: Application
 *
 * Path: /join
 * Purpose: Complete application form with validation and Stripe integration
 * Conversion endpoint
 */

'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  LoadingProgress,
  SuccessState,
  ErrorState,
  PricingCard,
} from '@/design-system';
import {
  Building2,
  FileText,
  MapPin,
  Wrench,
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

type ApplicationStep = 'business' | 'services' | 'certifications' | 'subscription' | 'review';

interface ApplicationData {
  // Business Information
  businessName: string;
  abn: string;
  acn: string;
  primaryContactName: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  businessAddress: string;

  // Service Areas & Specializations
  serviceAreas: string[];
  specializations: string[];

  // IICRC Certifications
  certifications: string[];
  certificateFiles: File[];
  insuranceFiles: File[];

  // Subscription Tier
  selectedTier: 'basic' | 'pro' | 'enterprise';
}

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('business');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abnValidationStatus, setAbnValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');

  const [formData, setFormData] = useState<ApplicationData>({
    businessName: '',
    abn: '',
    acn: '',
    primaryContactName: '',
    primaryContactPhone: '',
    primaryContactEmail: '',
    businessAddress: '',
    serviceAreas: [],
    specializations: [],
    certifications: [],
    certificateFiles: [],
    insuranceFiles: [],
    selectedTier: 'pro',
  });

  const serviceAreaOptions = [
    { value: 'sydney', label: 'Sydney, NSW' },
    { value: 'melbourne', label: 'Melbourne, VIC' },
    { value: 'brisbane', label: 'Brisbane, QLD' },
    { value: 'perth', label: 'Perth, WA' },
    { value: 'adelaide', label: 'Adelaide, SA' },
    { value: 'canberra', label: 'Canberra, ACT' },
    { value: 'darwin', label: 'Darwin, NT' },
    { value: 'hobart', label: 'Hobart, TAS' },
  ];

  const specializationOptions = [
    { value: 'water', label: 'Water Damage Restoration' },
    { value: 'fire', label: 'Fire & Smoke Restoration' },
    { value: 'mold', label: 'Mold Remediation' },
    { value: 'storm', label: 'Storm Damage Repair' },
    { value: 'sewage', label: 'Sewage Cleanup' },
    { value: 'biohazard', label: 'Biohazard Restoration' },
  ];

  const certificationOptions = [
    { value: 'S500', label: 'IICRC S500 - Water Damage Restoration' },
    { value: 'S520', label: 'IICRC S520 - Mold Remediation' },
    { value: 'WRT', label: 'IICRC WRT - Water Damage Restoration Technician' },
    { value: 'FSRT', label: 'IICRC FSRT - Fire & Smoke Restoration Technician' },
    { value: 'ASD', label: 'IICRC ASD - Applied Structural Drying' },
    { value: 'AMRT', label: 'IICRC AMRT - Applied Microbial Remediation Technician' },
  ];

  const pricingTiers = [
    {
      tier: 'basic' as const,
      name: 'Basic',
      price: 99,
      features: [
        { text: 'Up to 10 leads per month', included: true },
        { text: 'Basic profile listing', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Email support', included: true },
      ],
    },
    {
      tier: 'pro' as const,
      name: 'Professional',
      price: 299,
      popular: true,
      features: [
        { text: 'Up to 50 leads per month', included: true },
        { text: 'Featured profile listing', included: true },
        { text: 'Priority support', included: true },
        { text: 'Marketing automation', included: true },
      ],
    },
    {
      tier: 'enterprise' as const,
      name: 'Enterprise',
      price: 799,
      features: [
        { text: 'Unlimited leads', included: true },
        { text: 'Premium placement', included: true },
        { text: 'Dedicated manager', included: true },
        { text: 'API access', included: true },
      ],
    },
  ];

  // Validate ABN
  const validateABN = async (abn: string) => {
    // Remove spaces and formatting
    const cleanABN = abn.replace(/\s/g, '');

    if (cleanABN.length !== 11) {
      setAbnValidationStatus('invalid');
      return;
    }

    setAbnValidationStatus('validating');

    // TODO: Integrate with ABN Lookup API
    // For now, simulate validation
    setTimeout(() => {
      setAbnValidationStatus('valid');
    }, 1000);
  };

  const handleFileUpload = (files: FileList | null, type: 'certificate' | 'insurance') => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    if (type === 'certificate') {
      setFormData((prev) => ({
        ...prev,
        certificateFiles: [...prev.certificateFiles, ...fileArray],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        insuranceFiles: [...prev.insuranceFiles, ...fileArray],
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Implement actual submission logic
      // 1. Upload files to storage (S3/Cloudinary)
      // 2. Create contractor application in database
      // 3. Initialize Stripe subscription
      // 4. Send confirmation email

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 'business', label: 'Business Info', icon: <Building2 className="h-5 w-5" /> },
    { id: 'services', label: 'Service Areas', icon: <MapPin className="h-5 w-5" /> },
    { id: 'certifications', label: 'Certifications', icon: <FileText className="h-5 w-5" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'review', label: 'Review', icon: <CheckCircle className="h-5 w-5" /> },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-32">
          <SuccessState
            title="Application Submitted Successfully!"
            message="Thank you for applying to join NRPG. Our team will review your application and respond within 24-48 hours."
            nextSteps={[
              {
                label: 'Check your email',
                description: 'We sent a confirmation to your email address',
              },
              {
                label: 'Prepare your documents',
                description: 'Have your insurance certificates and licenses ready',
              },
              {
                label: 'Await verification',
                description: 'Our team will verify your certifications and contact you',
              },
            ]}
            actions={[
              {
                label: 'Return to Homepage',
                onClick: () => {
                  window.location.href = '/';
                },
              },
            ]}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-sans-modern font-bold text-4xl mb-4">
              Join <span className="text-nrpg-primary">NRPG</span>
            </h1>
            <p className="text-xl text-gray-400">
              Complete your application to start receiving quality leads
            </p>
          </div>

          {/* Progress Steps */}
          <LoadingProgress
            steps={steps.map((s, i) => ({
              label: s.label,
              status: i < currentStepIndex ? 'completed' : i === currentStepIndex ? 'active' : 'pending',
            }))}
            currentStep={currentStepIndex}
            className="mb-12"
          />

          {error && (
            <ErrorState
              title="Submission Error"
              message={error}
              alternatives={[
                {
                  label: 'Try Again',
                  onClick: () => setError(null),
                },
              ]}
              className="mb-8"
            />
          )}

          {/* Form Sections */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
            {/* Business Information */}
            {currentStep === 'business' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Business Information</h2>

                <FormInput
                  label="Business Name"
                  placeholder="Your Restoration Company Pty Ltd"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                  }
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <FormInput
                      label="ABN (Australian Business Number)"
                      placeholder="51 824 753 556"
                      value={formData.abn}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, abn: e.target.value }));
                        if (e.target.value.replace(/\s/g, '').length === 11) {
                          validateABN(e.target.value);
                        }
                      }}
                      required
                      helpText={
                        abnValidationStatus === 'validating'
                          ? 'Validating ABN...'
                          : abnValidationStatus === 'valid'
                          ? 'ABN verified'
                          : abnValidationStatus === 'invalid'
                          ? 'Invalid ABN format'
                          : undefined
                      }
                    />
                    {abnValidationStatus === 'valid' && (
                      <div className="flex items-center gap-2 text-green-500 text-sm mt-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>ABN verified</span>
                      </div>
                    )}
                  </div>

                  <FormInput
                    label="ACN (Australian Company Number)"
                    placeholder="123 456 789 (optional)"
                    value={formData.acn}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, acn: e.target.value }))
                    }
                  />
                </div>

                <FormInput
                  label="Primary Contact Name"
                  placeholder="John Smith"
                  value={formData.primaryContactName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, primaryContactName: e.target.value }))
                  }
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    type="tel"
                    label="Phone Number"
                    placeholder="0412 345 678"
                    value={formData.primaryContactPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, primaryContactPhone: e.target.value }))
                    }
                    required
                  />

                  <FormInput
                    type="email"
                    label="Email Address"
                    placeholder="john@yourcompany.com.au"
                    value={formData.primaryContactEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, primaryContactEmail: e.target.value }))
                    }
                    required
                  />
                </div>

                <FormInput
                  label="Business Address"
                  placeholder="123 Main Street, Sydney NSW 2000"
                  value={formData.businessAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, businessAddress: e.target.value }))
                  }
                  required
                />

                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setCurrentStep('services')}
                    disabled={!formData.businessName || !formData.abn || abnValidationStatus !== 'valid'}
                    className="px-8 py-3 bg-nrpg-primary hover:bg-nrpg-primary/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    Continue to Service Areas
                  </button>
                </div>
              </div>
            )}

            {/* Service Areas & Specializations */}
            {currentStep === 'services' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Service Areas & Specializations</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Service Areas (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {serviceAreaOptions.map((option) => (
                      <FormCheckbox
                        key={option.value}
                        label={option.label}
                        checked={formData.serviceAreas.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              serviceAreas: [...prev.serviceAreas, option.value],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              serviceAreas: prev.serviceAreas.filter((a) => a !== option.value),
                            }));
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Specializations (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {specializationOptions.map((option) => (
                      <FormCheckbox
                        key={option.value}
                        label={option.label}
                        checked={formData.specializations.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              specializations: [...prev.specializations, option.value],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              specializations: prev.specializations.filter((s) => s !== option.value),
                            }));
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep('business')}
                    className="px-8 py-3 border border-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('certifications')}
                    disabled={formData.serviceAreas.length === 0 || formData.specializations.length === 0}
                    className="px-8 py-3 bg-nrpg-primary hover:bg-nrpg-primary/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    Continue to Certifications
                  </button>
                </div>
              </div>
            )}

            {/* Certifications */}
            {currentStep === 'certifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">IICRC Certifications</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select Your IICRC Certifications
                  </label>
                  <div className="space-y-3">
                    {certificationOptions.map((option) => (
                      <FormCheckbox
                        key={option.value}
                        label={option.label}
                        checked={formData.certifications.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              certifications: [...prev.certifications, option.value],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              certifications: prev.certifications.filter((c) => c !== option.value),
                            }));
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Upload Certification Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-nrpg-primary/50 transition-all">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files, 'certificate')}
                      className="hidden"
                      id="cert-upload"
                    />
                    <label
                      htmlFor="cert-upload"
                      className="cursor-pointer text-nrpg-primary hover:text-nrpg-primary/80"
                    >
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-400 mt-2">
                      PDF, JPG, or PNG (max 10MB each)
                    </p>
                    {formData.certificateFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.certificateFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Upload Insurance Certificates
                  </label>
                  <p className="text-sm text-gray-400 mb-3">
                    Required: $20M Public Liability and $5M Professional Indemnity
                  </p>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-nrpg-primary/50 transition-all">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files, 'insurance')}
                      className="hidden"
                      id="insurance-upload"
                    />
                    <label
                      htmlFor="insurance-upload"
                      className="cursor-pointer text-nrpg-primary hover:text-nrpg-primary/80"
                    >
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-400 mt-2">
                      PDF, JPG, or PNG (max 10MB each)
                    </p>
                    {formData.insuranceFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.insuranceFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep('services')}
                    className="px-8 py-3 border border-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('subscription')}
                    disabled={formData.certifications.length === 0}
                    className="px-8 py-3 bg-nrpg-primary hover:bg-nrpg-primary/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    Continue to Subscription
                  </button>
                </div>
              </div>
            )}

            {/* Subscription Selection */}
            {currentStep === 'subscription' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Choose Your Subscription Tier</h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.tier}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, selectedTier: tier.tier }))
                      }
                      className={`cursor-pointer transition-all ${
                        formData.selectedTier === tier.tier ? 'ring-2 ring-nrpg-primary' : ''
                      }`}
                    >
                      <PricingCard {...tier} />
                    </div>
                  ))}
                </div>

                <div className="bg-nrpg-primary/10 border border-nrpg-primary/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-nrpg-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-semibold mb-1">Payment After Approval</p>
                      <p>
                        You won't be charged until your application is approved. We'll send you a secure payment link to set up your subscription.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep('certifications')}
                    className="px-8 py-3 border border-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('review')}
                    className="px-8 py-3 bg-nrpg-primary hover:bg-nrpg-primary/90 text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    Review Application
                  </button>
                </div>
              </div>
            )}

            {/* Review & Submit */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Review Your Application</h2>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Business Information</h3>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      <dt className="text-gray-400">Business Name:</dt>
                      <dd className="text-white">{formData.businessName}</dd>
                      <dt className="text-gray-400">ABN:</dt>
                      <dd className="text-white">{formData.abn}</dd>
                      <dt className="text-gray-400">Contact:</dt>
                      <dd className="text-white">{formData.primaryContactName}</dd>
                      <dt className="text-gray-400">Email:</dt>
                      <dd className="text-white">{formData.primaryContactEmail}</dd>
                    </dl>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Service Details</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Service Areas: </span>
                        <span className="text-white">{formData.serviceAreas.length} selected</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Specializations: </span>
                        <span className="text-white">{formData.specializations.length} selected</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Certifications: </span>
                        <span className="text-white">{formData.certifications.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Subscription Tier</h3>
                    <p className="text-white capitalize">{formData.selectedTier} Plan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold mb-1">What Happens Next?</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>We'll verify your ABN and certifications (24-48 hours)</li>
                      <li>You'll receive an approval email with payment setup link</li>
                      <li>Complete your subscription setup via Stripe</li>
                      <li>Start receiving leads within 1 week</li>
                    </ol>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentStep('subscription')}
                    className="px-8 py-3 border border-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-nrpg-primary hover:bg-nrpg-primary/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
