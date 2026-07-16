'use client';


import {
  AntigravityNavbar,
  AntigravityFooter,
  AgStepProgress,
} from '@/components/antigravity';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AlertTriangle,
  Home,
  Droplets,
  Flame,
  Wind,
  Building2,
  MapPin,
  Mail,
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  Info,
  ArrowRight,
  ArrowLeft,
  FileText,
  Camera,
  AlertCircle
} from 'lucide-react';

const BOOK_STEPS = [
  { id: 1, label: 'Service details' },
  { id: 2, label: 'Property' },
  { id: 3, label: 'Contact' },
  { id: 4, label: 'Insurance' },
  { id: 5, label: 'Confirm' },
];

type ServiceType = 'water' | 'fire' | 'mould' | 'storm' | 'other';
type PropertyType = 'residential' | 'commercial' | 'industrial';
type UrgencyLevel = 'emergency' | 'urgent' | 'standard';

interface FormData {
  // Step 1: Service Details
  serviceType: ServiceType;
  propertyType: PropertyType;
  urgencyLevel: UrgencyLevel;
  damageDescription: string;

  // Step 2: Property Information
  propertyAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  propertySize: string;
  affectedArea: string;
  propertySuburb?: string;
  propertyState?: string;
  affectedRooms?: string;

  // Step 3: Contact Information
  firstName: string;
  lastName: string;
  email: string;
  contactPhone?: string;

  preferredContact: 'email';

  // Step 4: Insurance & Additional
  hasInsurance: boolean;
  insuranceStatus?: string;
  insuranceCompany: string;
  claimNumber: string;
  additionalNotes: string;
  photos: File[];
  
  // Agreement
  termsAccepted: boolean;
  paymentAuthorized: boolean;
}

const INITIAL_FORM_DATA: FormData = {
  serviceType: 'water',
  propertyType: 'residential',
  urgencyLevel: 'standard',
  damageDescription: '',
  propertyAddress: '',
  suburb: '',
  state: '',
  postcode: '',
  propertySize: '',
  affectedArea: '',
  firstName: '',
  lastName: '',
  email: '',
  
  preferredContact: 'email',
  hasInsurance: false,
  insuranceCompany: '',
  claimNumber: '',
  additionalNotes: '',
  photos: [],
  termsAccepted: false,
  paymentAuthorized: false
};

const SERVICE_TYPES = [
  { value: 'water', label: 'Water Damage', icon: Droplets, colour: 'text-blue-500' },
  { value: 'fire', label: 'Fire & Smoke', icon: Flame, colour: 'text-red-500' },
  { value: 'mould', label: 'Mould Remediation', icon: Wind, colour: 'text-green-500' },
  { value: 'storm', label: 'Storm Damage', icon: Building2, colour: 'text-purple-500' },
  { value: 'other', label: 'Other Damage', icon: Home, colour: 'text-gray-700' }
];

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

function BookServicePageOriginal() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Enhanced validation functions
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePostcode = (postcode: string): boolean => {
    // Australian postcode validation (0200-0299, 0800-9999)
    const num = parseInt(postcode);
    return /^[0-9]{4}$/.test(postcode) && 
           ((num >= 200 && num <= 299) || (num >= 800 && num <= 9999));
  };

  const validatePhone = (phone: string): boolean => {
    // Australian phone number validation
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && (cleaned.startsWith('04') || cleaned.startsWith('0'));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    switch (step) {
      case 1:
        if (!formData.damageDescription || formData.damageDescription.length < 20) {
          newErrors.damageDescription = 'Please provide at least 20 characters describing the damage';
        }
        break;
      case 2:
        if (!formData.propertyAddress) newErrors.propertyAddress = 'Property address is required';
        if (!formData.suburb) newErrors.suburb = 'Suburb is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.postcode || !validatePostcode(formData.postcode)) {
          newErrors.postcode = 'Valid Australian postcode required (0200-0299 or 0800-9999)';
        }
        if (!formData.affectedArea) newErrors.affectedArea = 'Affected area description is required';
        break;
      case 3:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email || !validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        // Phone validation removed - using email-only contact
        break;
      case 4:
        if (formData.hasInsurance && !formData.insuranceCompany) {
          newErrors.insuranceCompany = 'Insurance company name is required';
        }
        break;
      case 5:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        if (!formData.paymentAuthorized) newErrors.paymentAuthorized = 'Payment authorisation is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsProcessing(true);

    try {
      // Prepare form data for submission
      const bookingData = {
        ...formData,
        timestamp: new Date().toISOString(),
        amount: 2750
      };
      
      // In production, this would:
      // 1. Create Stripe payment intent for $2,750
      // 2. Process payment
      // 3. Create lead in database
      // 4. Send to job distribution system
      // 5. Email confirmations

      // Simulate API call with potential failures
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different scenarios (in production, remove this)
          const random = Math.random();
          if (random > 0.9) {
            // 10% chance of payment error
            reject({ type: 'payment', code: 'PAYMENT_DECLINED' });
          } else if (random > 0.85) {
            // 5% chance of network error
            reject({ type: 'network', code: 'NETWORK_ERROR' });
          } else {
            // 85% success rate
            resolve(bookingData);
          }
        }, 2000);
      });
      
      // Generate booking ID
      const bookingId = 'NRPG-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Redirect to success page with booking details
      const successParams = new URLSearchParams({
        booking: bookingId,
        service: formData.serviceType,
        urgency: formData.urgencyLevel,
        amount: '2750'
      });
      
      router.push(`/book-service/success?${successParams.toString()}`);
    } catch (error: any) {
      console.error('Booking error:', error);
      
      // Redirect to error page with error details
      const errorParams = new URLSearchParams({
        type: error?.type || 'unknown',
        code: error?.code || 'ERR_UNKNOWN',
        attempt: 'ATT-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
      
      router.push(`/book-service/error?${errorParams.toString()}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Calculate form completion percentage
  const calculateCompletionPercentage = () => {
    const requiredFields: (keyof FormData)[] = [
      'serviceType', 'propertyType', 'urgencyLevel', // Step 1
      'propertyAddress', 'propertySuburb', 'propertyState', 'postcode', 'affectedRooms', // Step 2
      'firstName', 'lastName', 'email', 'contactPhone', // Step 3
      'insuranceStatus', // Step 4
      'termsAccepted', 'paymentAuthorized' // Step 5
    ];
    
    const completedFields = requiredFields.filter(field => {
      const value = formData[field];
      return value !== '' && value !== undefined && value !== null;
    });
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  // Real-time field validation on blur
  const validateField = (fieldName: keyof FormData) => {
    const value = formData[fieldName];
    let error = '';
    
    switch (fieldName) {
      case 'email':
        if (value && !validateEmail(String(value))) {
          error = 'Please enter a valid email address';
        } else if (!value) {
          error = 'Email is required';
        }
        break;
      case 'postcode':
        if (value && !validatePostcode(String(value))) {
          error = 'Invalid Australian postcode';
        } else if (!value) {
          error = 'Postcode is required';
        }
        break;
      case 'firstName':
      case 'lastName':
        if (!value || String(value).trim().length < 2) {
          error = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        }
        break;
      case 'propertyAddress':
        if (!value || String(value).trim().length < 5) {
          error = 'Please enter a valid address';
        }
        break;
      case 'suburb':
        if (!value || String(value).trim().length < 2) {
          error = 'Suburb is required';
        }
        break;
      case 'damageDescription':
        if (!value || String(value).trim().length < 20) {
          error = 'Please provide at least 20 characters describing the damage';
        }
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      return true;
    }
  };

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    const badges = {
      emergency: { colour: 'bg-red-100 text-red-800 border-red-200', label: 'Emergency - Immediate Response' },
      urgent: { colour: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Urgent - Same Day Response' },
      standard: { colour: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Standard - 24-48 Hour Response' }
    };
    return badges[urgency];
  };

  return (
    <div className="ag-page-elevated min-h-screen">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm border-[var(--ag-border-grey)]">
        <div className="ag-container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">
                Book restoration service
              </h1>
              <p className="text-sm text-[var(--ag-text-grey)]">
                Matched with an IICRC-certified contractor — they bill you directly
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-[var(--ag-text-grey)]">Indicative make-safe from</p>
                <p className="text-2xl font-bold text-[var(--ag-primary-blue)]">~$550</p>
              </div>
              <Shield className="h-10 w-10 text-[var(--ag-secondary-blue)]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[var(--ag-border-grey)]">
        <div className="ag-container mx-auto px-4 py-4">
          <AgStepProgress steps={BOOK_STEPS} current={currentStep} />
          <div className="mt-3 text-center text-sm text-[var(--ag-text-grey)]">
            Step {currentStep} of {BOOK_STEPS.length}
            {calculateCompletionPercentage() === 100 && (
              <CheckCircle className="inline h-4 w-4 text-emerald-600 ms-2" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Info Banner */}
          <div className="mb-6 p-4 bg-[var(--ag-background-light)] border border-[var(--ag-border-grey)] rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[var(--ag-secondary-blue)] mt-0.5" />
              <div>
                <h3 className="font-semibold text-[var(--ag-primary-blue)]">How it works</h3>
                <p className="text-sm text-[var(--ag-text-dark)] mt-1">
                  1. Complete this form with your damage details<br />
                  2. We match you with an IICRC-certified NRPG contractor<br />
                  3. That contractor contacts you to confirm the appointment<br />
                  4. They perform the assessment and provide a firm Scope of Works<br />
                  5. The contractor bills you directly — Disaster Recovery does not invoice you
                </p>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <form 
            onSubmit={handleFormSubmit} 
            method="POST" 
            action="/api/bookings"
            className="bg-white rounded-xl shadow-lg p-8"
            noValidate
          >
            {/* Step 1: Service Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 1: Service Details</h2>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of damage do you need help with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SERVICE_TYPES.map((service) => {
                      const Icon = service.icon;
                      return (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => updateFormData('serviceType', service.value as ServiceType)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.serviceType === service.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`h-8 w-8 ${service.colour} mx-auto mb-2`} />
                          <span className="text-sm font-medium">{service.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'residential', label: 'Residential', icon: Home },
                      { value: 'commercial', label: 'Commercial', icon: Building2 },
                      { value: 'industrial', label: 'Industrial', icon: Building2 }
                    ].map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateFormData('propertyType', type.value as PropertyType)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.propertyType === type.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="h-6 w-6 text-gray-700 mx-auto mb-1" />
                          <span className="text-sm">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">How urgent is this?</label>
                  <div className="space-y-3">
                    {[
                      { value: 'emergency', label: 'Emergency', desc: 'Immediate danger, active damage occurring' },
                      { value: 'urgent', label: 'Urgent', desc: 'Significant damage, needs same-day response' },
                      { value: 'standard', label: 'Standard', desc: 'Stable situation, can wait 24-48 hours' }
                    ].map((urgency) => (
                      <label
                        key={urgency.value}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.urgencyLevel === urgency.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={urgency.value}
                          checked={formData.urgencyLevel === urgency.value}
                          onChange={(e) => updateFormData('urgencyLevel', e.target.value as UrgencyLevel)}
                          className="sr-only"
                        />
                        <div className="flex items-start">
                          <div className="flex-1">
                            <span className="font-medium">{urgency.label}</span>
                            <p className="text-sm text-gray-700 mt-1">{urgency.desc}</p>
                          </div>
                          {formData.urgencyLevel === urgency.value && (
                            <CheckCircle className="h-5 w-5 text-blue-600 ml-3" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Damage Description */}
                <div>
                  <label htmlFor="damage" className="block text-sm font-medium text-gray-700 mb-2">
                    Describe the damage <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="damage"
                    rows={4}
                    value={formData.damageDescription}
                    onChange={(e) => updateFormData('damageDescription', e.target.value)}
                    required
                    aria-required="true"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.damageDescription ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Please describe the damage, when it occurred, and any immediate concerns..."
                  />
                  {errors.damageDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.damageDescription}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Property Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 2: Property Information</h2>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="propertyAddress"
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => updateFormData('propertyAddress', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.propertyAddress ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                    aria-required="true"
                    aria-invalid={!!errors.propertyAddress}
                  />
                  {errors.propertyAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.propertyAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-2">
                      Suburb <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="suburb"
                      name="suburb"
                      required
                      value={formData.suburb}
                      onChange={(e) => updateFormData('suburb', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.suburb ? 'border-red-300' : 'border-gray-300'
                      }`}
                      aria-required="true"
                      aria-invalid={!!errors.suburb}
                    />
                    {errors.suburb && <p className="mt-1 text-sm text-red-600">{errors.suburb}</p>}
                  </div>

                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                      Postcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      required
                      maxLength={4}
                      pattern="[0-9]{4}"
                      value={formData.postcode}
                      onChange={(e) => updateFormData('postcode', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.postcode ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="2000"
                      aria-required="true"
                      aria-invalid={!!errors.postcode}
                      aria-describedby="postcode-hint"
                    />
                    {errors.postcode && <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.state ? 'border-red-300' : 'border-gray-300'
                    }`}
                    aria-required="true"
                    aria-invalid={!!errors.state}
                  >
                    <option value="">Select State</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>

                <div>
                  <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Size (approximate sqm)
                  </label>
                  <input
                    type="text"
                    id="propertySize"
                    value={formData.propertySize}
                    onChange={(e) => updateFormData('propertySize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 200"
                  />
                </div>

                <div>
                  <label htmlFor="affectedArea" className="block text-sm font-medium text-gray-700 mb-2">
                    Affected Area Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="affectedArea"
                    rows={3}
                    value={formData.affectedArea}
                    onChange={(e) => updateFormData('affectedArea', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.affectedArea ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Kitchen and living room, approximately 50sqm affected"
                  />
                  {errors.affectedArea && (
                    <p className="mt-1 text-sm text-red-600">{errors.affectedArea}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 3: Contact Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : 'firstName-hint'}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : 'lastName-hint'}
                    />
                    {!errors.lastName && (
                      <p className="mt-1 text-xs text-gray-700">As it appears on your insurance documents</p>
                    )}
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Phone field hidden - no phone support available */}
                <input type="hidden" id="phone" value="" required aria-required="true" pattern="[0-9]{10,14}" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'email', label: 'Email', icon: Mail }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => updateFormData('preferredContact', method.value as 'phone' | 'email' | 'both')}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.preferredContact === method.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="h-5 w-5 text-gray-700 mx-auto mb-1" />
                          <span className="text-sm">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Best time to call field hidden - no phone support available */}
              </div>
            )}

            {/* Step 4: Insurance & Additional */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 4: Insurance & Additional Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Do you have insurance that may cover this damage?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateFormData('hasInsurance', true)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all ${
                        formData.hasInsurance === true
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFormData('hasInsurance', false)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all ${
                        formData.hasInsurance === false
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {formData.hasInsurance && (
                  <>
                    <div>
                      <label htmlFor="insurer" className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="insurer"
                        value={formData.insuranceCompany}
                        onChange={(e) => updateFormData('insuranceCompany', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.insuranceCompany ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.insuranceCompany && (
                        <p className="mt-1 text-sm text-red-600">{errors.insuranceCompany}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="claimNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Number (if available)
                      </label>
                      <input
                        type="text"
                        id="claimNumber"
                        value={formData.claimNumber}
                        onChange={(e) => updateFormData('claimNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Any other information that might be helpful..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colours">
                    <Camera className="h-12 w-12 text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-700">
                      Drag & drop photos here, or click to select
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        updateFormData('photos', files);
                      }}
                    />
                    <button
                      type="button"
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours min-h-[44px] min-w-[44px] p-3"
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    >
                      Select Photos
                    </button>
                  </div>
                  {formData.photos.length > 0 && (
                    <p className="mt-2 text-sm text-gray-700">
                      {formData.photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Review & confirm */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--ag-primary-blue)] mb-6">
                  Step 5: Review & confirm
                </h2>

                {/* Summary */}
                <div className="bg-[var(--ag-background-light)] rounded-lg p-6 space-y-4 border border-[var(--ag-border-grey)]">
                  <h3 className="font-semibold text-[var(--ag-primary-blue)]">Booking summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Service Type:</span>
                      <span className="font-medium">{SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Property:</span>
                      <span className="font-medium">{formData.propertyAddress}, {formData.suburb} {formData.state} {formData.postcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Contact:</span>
                      <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Urgency:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBadge(formData.urgencyLevel).colour}`}>
                        {getUrgencyBadge(formData.urgencyLevel).label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Path A billing note */}
                <div className="rounded-lg p-6 border border-[var(--ag-border-grey)] bg-white">
                  <h3 className="font-semibold text-[var(--ag-primary-blue)] mb-4">Billing</h3>
                  <div className="space-y-3 text-sm text-[var(--ag-text-dark)]">
                    <p>
                      No payment is taken on this form. Your matched contractor will provide a firm
                      Scope of Works on-site and bill you directly for assessment and restoration.
                    </p>
                    <p className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-[var(--ag-secondary-blue)] mt-0.5 shrink-0" />
                      IICRC-certified NRPG contractor standard — Disaster Recovery is a network
                      orchestrator and does not hold client funds.
                    </p>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and
                      understand that my matched contractor will contact me to confirm the booking
                      and bill me directly for work performed.
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-sm text-red-600">{errors.termsAccepted}</p>
                  )}

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.paymentAuthorized}
                      onChange={(e) => updateFormData('paymentAuthorized', e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I authorise continuation of my booking request and understand a qualified
                      contractor will contact me within the specified timeframe. The contractor
                      bills me directly for assessment and restoration — Disaster Recovery does not
                      hold client funds.
                    </span>
                  </label>
                  {errors.paymentAuthorized && (
                    <p className="text-sm text-red-600">{errors.paymentAuthorized}</p>
                  )}
                </div>

                {/* Path A notice */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">No payment on this form</p>
                      <p className="text-sm text-emerald-800">
                        Your contractor quotes and bills you directly. Prefer the primary claim
                        intake? <a href="/claim" className="underline font-semibold">Lodge a claim</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colours flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colours flex items-center gap-2"
                  style={{ background: 'var(--ag-primary-blue)' }}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="ml-auto px-8 py-3 text-white rounded-lg hover:opacity-90 transition-colours flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--ag-emergency-red)' }}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Submit booking request
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span>IICRC Certified Contractors</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-700" />
              <span>24/7 Online Emergency Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function BookServicePage() {
  return (
    <>
      <AntigravityNavbar />
      <BookServicePageOriginal />
      <AntigravityFooter />
    </>
  );
}
