'use client';

import React, { useState } from 'react';
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
  
  // Step 3: Contact Information
  firstName: string;
  lastName: string;
  email: string;
  
  preferredContact: 'phone' | 'email' | 'both';
  bestTimeToCall: string;
  
  // Step 4: Insurance & Additional
  hasInsurance: boolean;
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
  
  preferredContact: 'both',
  bestTimeToCall: '',
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
  { value: 'other', label: 'Other Damage', icon: Home, colour: 'text-gray-500' }
];

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

export default function BookServicePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);

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
        if (!formData.postcode || !/^\d{4}$/.test(formData.postcode)) {
          newErrors.postcode = 'Valid 4-digit postcode required';
        }
        if (!formData.affectedArea) newErrors.affectedArea = 'Affected area description is required';
        break;
      case 3:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Valid email is required';
        }
        if (!formData.phone || !/^(\+?61|0)[2-478][\d\s-]{8 }$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = 'Valid Australian phone number required';
        }
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

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsProcessing(true);

    try {
      // In production, this would:
      // 1. Create Stripe payment intent for $2,750
      // 2. Process payment
      // 3. Create lead in database
      // 4. Send to job distribution system
      // 5. Email confirmations

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirect to payment processing
      router.push('/book-service/payment?amount=2750');
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
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

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    const badges = {
      emergency: { colour: 'bg-red-100 text-red-800 border-red-200', label: 'Emergency - Immediate Response' },
      urgent: { colour: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Urgent - Same Day Response' },
      standard: { colour: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Standard - 24-48 Hour Response' }
    };
    return badges[urgency];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Restoration Service</h1>
              <p className="text-sm text-gray-600">Professional disaster recovery services nationwide</p>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Initial Assessment Fee</p>
                <p className="text-2xl font-bold text-gray-900">$2,750</p>
              </div>
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colours ${
                      step < currentStep
                        ? 'bg-green-500 text-white'
                        : step === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="h-6 w-6" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  {step === 1 && 'Service Details'}
                  {step === 2 && 'Property Info'}
                  {step === 3 && 'Contact'}
                  {step === 4 && 'Insurance'}
                  {step === 5 && 'Payment'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">How It Works</h3>
                <p className="text-sm text-blue-800 mt-1">
                  1. Complete this form with your damage details<br />
                  2. Pay the $2,750 initial assessment fee<br />
                  3. A qualified contractor will contact you within {formData.urgencyLevel === 'emergency' ? '30 minutes' : formData.urgencyLevel === 'urgent' ? '2 hours' : '24 hours'}<br />
                  4. Contractor performs assessment and provides detailed quote<br />
                  5. $2,200 credited toward your restoration work
                </p>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8">
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
                          <Icon className="h-6 w-6 text-gray-600 mx-auto mb-1" />
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
                            <p className="text-sm text-gray-600 mt-1">{urgency.desc}</p>
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
                    value={formData.propertyAddress}
                    onChange={(e) => updateFormData('propertyAddress', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.propertyAddress ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
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
                      value={formData.suburb}
                      onChange={(e) => updateFormData('suburb', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.suburb ? 'border-red-300' : 'border-gray-300'
                      }`}
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
                      maxLength={4}
                      value={formData.postcode}
                      onChange={(e) => updateFormData('postcode', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.postcode ? 'border-red-300' : 'border-gray-300'
                      }`}
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
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.state ? 'border-red-300' : 'border-gray-300'
                    }`}
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
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
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
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
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
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder=""
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'phone', label: 'Phone', icon: Phone },
                      { value: 'email', label: 'Email', icon: Mail },
                      { value: 'both', label: 'Both', icon: Phone }
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
                          <Icon className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                          <span className="text-sm">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="bestTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Best Time to Call
                  </label>
                  <input
                    type="text"
                    id="bestTime"
                    value={formData.bestTimeToCall}
                    onChange={(e) => updateFormData('bestTimeToCall', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Weekdays after 5pm"
                  />
                </div>
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
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">
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
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours"
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    >
                      Select Photos
                    </button>
                  </div>
                  {formData.photos.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Review & Payment */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 5: Review & Payment</h2>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">Booking Summary</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">{SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-medium">{formData.propertyAddress}, {formData.suburb} {formData.state} {formData.postcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgency:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBadge(formData.urgencyLevel).colour}`}>
                        {getUrgencyBadge(formData.urgencyLevel).label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Initial Assessment Fee:</span>
                      <span className="font-semibold">$2,750.00</span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Due Now:</span>
                        <span className="text-xl font-bold text-blue-600">$2,750.00</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded p-3 text-sm">
                      <p className="text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 inline mr-1" />
                        $2,200 will be credited toward your restoration work
                      </p>
                      <p className="text-gray-600 mt-1">
                        <Shield className="h-4 w-4 text-blue-500 inline mr-1" />
                        100% satisfaction guarantee
                      </p>
                    </div>
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
                    <span className="text-sm text-gray-600">
                      I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and understand that the $2,750 initial assessment fee will be charged to secure my booking. $2,200 of this fee will be credited toward the final restoration work.
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
                    <span className="text-sm text-gray-600">
                      I authorise the payment of $2,750 for the initial assessment and understand a qualified contractor will contact me within the specified timeframe.
                    </span>
                  </label>
                  {errors.paymentAuthorized && (
                    <p className="text-sm text-red-600">{errors.paymentAuthorized}</p>
                  )}
                </div>

                {/* Secure Payment Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Secure Payment Processing</p>
                      <p className="text-sm text-green-800">Your payment information is encrypted and secure. Processed by Stripe.</p>
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
                  className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colours flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Proceed to Payment ($2,750)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span>IICRC Certified Contractors</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>24/7 Online Emergency Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}