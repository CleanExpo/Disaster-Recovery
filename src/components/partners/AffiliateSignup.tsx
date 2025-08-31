'use client';

import React, { useState } from 'react';
import {
  Building,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Briefcase,
  Award,
  Users,
  Package,
  GraduationCap,
  Gavel,
  Heart,
  Cpu,
  Truck,
  PiggyBank,
  Megaphone
} from 'lucide-react';
import type { Partner, PartnerCategory, PartnerTier } from '@/types/partner-affiliate';

interface SignupStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: SignupStep[] = [
  {
    id: 1,
    title: 'Company Information','
    description: 'Tell us about your business','
    icon: <Building className="w-5 h-5" />"
  },
  {
    id: 2,
    title: 'Contact Details','
    description: 'Primary contact information','
    icon: <User className="w-5 h-5" />"
  },
  {
    id: 3,
    title: 'Service Category','
    description: 'Select your business type','
    icon: <Briefcase className="w-5 h-5" />"
  },
  {
    id: 4,
    title: 'Banking & Commission','
    description: 'Payment and commission details','
    icon: <DollarSign className="w-5 h-5" />"
  },
  {
    id: 5,
    title: 'Agreement & Terms','
    description: 'Review and accept terms','
    icon: <FileText className="w-5 h-5" />"
  }
];

const categoryIcons: Record<PartnerCategory, React.ReactNode> = {
  equipment_supplier: <Package className="w-6 h-6" />,"
  insurance_provider: <Shield className="w-6 h-6" />,"
  legal_services: <Gavel className="w-6 h-6" />,"
  training_provider: <GraduationCap className="w-6 h-6" />,"
  software_vendor: <Cpu className="w-6 h-6" />,"
  financial_services: <PiggyBank className="w-6 h-6" />,"
  marketing_agency: <Megaphone className="w-6 h-6" />,"
  consulting: <Users className="w-6 h-6" />,"
  logistics: <Truck className="w-6 h-6" />,"
  other: <Briefcase className="w-6 h-6" />"
};

const categoryDescriptions: Record<PartnerCategory, string> = {
  equipment_supplier: 'Restoration equipment, tools, and supplies','
  insurance_provider: 'Insurance services and claims processing','
  legal_services: 'Legal consultation and dispute resolution','
  training_provider: 'Professional training and certification','
  software_vendor: 'Software solutions and technology','
  financial_services: 'Financing, loans, and payment processing','
  marketing_agency: 'Marketing, advertising, and lead generation','
  consulting: 'Business consulting and advisory services','
  logistics: 'Transportation and logistics services','
  other: 'Other professional services'
};

export default function AffiliateSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '
    tradingName: '
    abn: '
    acn: '
    email: '
    
    website: '
    description: '
    category: '' as PartnerCategory,'
    contactName: '
    contactRole: '
    contactEmail: '
    contactemail: '
    street1: '
    street2: '
    city: '
    state: '
    postcode: '
    accountName: '
    bsb: '
    accountNumber: '
    paymentMethod: 'eft','
    agreementAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedTier, setSelectedTier] = useState<PartnerTier>('bronze');'

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.abn) newErrors.abn = 'ABN is required';
        if (formData.abn && !/^\d{11}$/.test(formData.abn.replace(/\s/g, ''))) {'
          newErrors.abn = 'ABN must be 11 digits';
        }
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        break;
      case 2:
        if (!formData.contactName) newErrors.contactName = 'Contact name is required';
        if (!formData.contactRole) newErrors.contactRole = 'Contact role is required';
        if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
        if (!formData.street1) newErrors.street1 = 'Street address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.postcode) newErrors.postcode = 'Postcode is required';
        break;
      case 3:
        if (!formData.category) newErrors.category = 'Please select a service category';
        break;
      case 4:
        if (!formData.accountName) newErrors.accountName = 'Account name is required';
        if (!formData.bsb) newErrors.bsb = 'BSB is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
        break;
      case 5:
        if (!formData.agreementAccepted) newErrors.agreement = 'You must accept the terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Submitting partner application:', formData);'
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">"
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">"
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Trading Name
                </label>
                <input
                  type="text"
                  value={formData.tradingName}
                  onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  ABN *
                </label>
                <input
                  type="text"
                  value={formData.abn}
                  onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                  placeholder="12 345 678 901"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.abn ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.abn && (
                  <p className="mt-1 text-sm text-red-600">{errors.abn}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  ACN
                </label>
                <input
                  type="text"
                  value={formData.acn}
                  onChange={(e) => setFormData({ ...formData, acn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Business Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Business Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>"
                )}
              </div>

              <div className="md:col-span-2">"
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.example.com.au"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">"
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Business Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your business and services..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">"
            <h3 className="text-lg font-semibold text-gray-900">Primary Contact</h3>"
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">"
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.contactName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Role/Position *
                </label>
                <input
                  type="text"
                  value={formData.contactRole}
                  onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.contactRole ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contactRole && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactRole}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactemail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-8">Business Address</h3>"
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">"
              <div className="md:col-span-2">"
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.street1}
                  onChange={(e) => setFormData({ ...formData, street1: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.street1 ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.street1 && (
                  <p className="mt-1 text-sm text-red-600">{errors.street1}</p>"
                )}
              </div>

              <div className="md:col-span-2">"
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Street Address Line 2
                </label>
                <input
                  type="text"
                  value={formData.street2}
                  onChange={(e) => setFormData({ ...formData, street2: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.city ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.state ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select State</option>"
                  <option value="NSW">New South Wales</option>"
                  <option value="VIC">Victoria</option>"
                  <option value="QLD">Queensland</option>"
                  <option value="WA">Western Australia</option>"
                  <option value="SA">South Australia</option>"
                  <option value="TAS">Tasmania</option>"
                  <option value="ACT">ACT</option>"
                  <option value="NT">Northern Territory</option>"
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Postcode *
                </label>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.postcode ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.postcode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>"
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">"
            <h3 className="text-lg font-semibold text-gray-900">Select Your Service Category</h3>"
            {errors.category && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">"
                <p className="text-sm text-red-600">{errors.category}</p>"
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"
              {Object.entries(categoryDescriptions).map(([key, description]) => (
                <button
                  key={key}
                  onClick={() => setFormData({ ...formData, category: key as PartnerCategory })}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    formData.category === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">"
                    <div className={`p-2 rounded-lg ${
                      formData.category === key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {categoryIcons[key as PartnerCategory]}
                    </div>
                    <div className="flex-1">"
                      <p className="font-medium text-gray-900">"
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}'
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{description}</p>"
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {formData.category && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">"
                <h4 className="font-semibold text-blue-900 mb-2">Commission Structure</h4>"
                <p className="text-sm text-blue-700">"
                  Base commission rate: {
                    formData.category === 'software_vendor' ? '30%' :'
                    formData.category === 'training_provider' ? '25%' :'
                    formData.category === 'legal_services' ? '20%' :'
                    formData.category === 'insurance_provider' ? '15%' :'
                    '10-15%'
                  }
                </p>
                <p className="text-sm text-blue-700 mt-1">"
                  Performance bonuses and tier upgrades available
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">"
            <h3 className="text-lg font-semibold text-gray-900">Banking Details</h3>"
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">"
              <div className="md:col-span-2">"
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Account Name *
                </label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.accountName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.accountName && (
                  <p className="mt-1 text-sm text-red-600">{errors.accountName}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  BSB *
                </label>
                <input
                  type="text"
                  value={formData.bsb}
                  onChange={(e) => setFormData({ ...formData, bsb: e.target.value })}
                  placeholder="123-456"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.bsb ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.bsb && (
                  <p className="mt-1 text-sm text-red-600">{errors.bsb}</p>"
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.accountNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.accountNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>"
                )}
              </div>

              <div className="md:col-span-2">"
                <label className="block text-sm font-medium text-gray-700 mb-1">"
                  Preferred Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="eft">Electronic Funds Transfer (EFT)</option>"
                  <option value="paypal">PayPal</option>"
                  <option value="stripe">Stripe</option>"
                  <option value="check">Check</option>"
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-8">Partner Tier Selection</h3>"
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">"
              {(['bronze', 'silver', 'gold', 'platinum'] as PartnerTier[]).map((tier) => ('
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedTier === tier
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Award className={`w-8 h-8 mx-auto mb-2 ${
                    tier === 'bronze' ? 'text-orange-600' :'
                    tier === 'silver' ? 'text-gray-500' :'
                    tier === 'gold' ? 'text-yellow-500' :'
                    'text-purple-600'
                  }`} />
                  <p className="font-semibold text-gray-900 capitalize">{tier}</p>"
                  <p className="text-xs text-gray-500 mt-1">"
                    {tier === 'bronze' ? 'Starting tier' :'
                     tier === 'silver' ? '$10k+ revenue' :'
                     tier === 'gold' ? '$50k+ revenue' :'
                     '$100k+ revenue'}'
                  </p>
                </button>
              ))}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">"
              <h4 className="font-semibold text-gray-900 mb-2">Commission Schedule</h4>"
              <div className="space-y-2 text-sm">"
                <div className="flex justify-between">"
                  <span className="text-gray-600">Payout Frequency:</span>"
                  <span className="font-medium">Monthly</span>"
                </div>
                <div className="flex justify-between">"
                  <span className="text-gray-600">Minimum Payout:</span>"
                  <span className="font-medium">$100</span>"
                </div>
                <div className="flex justify-between">"
                  <span className="text-gray-600">Next Payout Date:</span>"
                  <span className="font-medium">1st of each month</span>"
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">"
            <h3 className="text-lg font-semibold text-gray-900">Review & Accept Terms</h3>"
            
            <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">"
              <h4 className="font-semibold text-gray-900 mb-3">Partner Agreement Summary</h4>"
              <div className="space-y-4 text-sm text-gray-600">"
                <div>
                  <h5 className="font-medium text-gray-900">1. Commission Structure</h5>"
                  <p>Partners earn commissions based on their category and tier. Commissions are calculated on net revenue after refunds and adjustments.</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">2. Payment Terms</h5>"
                  <p>Commissions are paid monthly, subject to a minimum payout threshold of $100. Payments are processed on the 1st of each month.</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">3. Marketing Guidelines</h5>"
                  <p>Partners must adhere to approved marketing guidelines and brand standards. All promotional materials must be pre-approved.</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">4. Compliance Requirements</h5>"
                  <p>Partners must maintain appropriate licenses, insurance, and certifications relevant to their service category.</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">5. Termination</h5>"
                  <p>Either party may terminate this agreement with 30 days written notice. Outstanding commissions will be paid according to standard terms.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">"
              <label className="flex items-start">"
                <input
                  type="checkbox"
                  checked={formData.agreementAccepted}
                  onChange={(e) => setFormData({ ...formData, agreementAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">"
                  I have read and agree to the Partner Agreement, Terms of Service, and Privacy Policy. 
                  I confirm that all information provided is accurate and complete.
                </span>
              </label>
              {errors.agreement && (
                <p className="text-sm text-red-600">{errors.agreement}</p>"
              )}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">"
              <h4 className="font-semibold text-blue-900 mb-2">Application Summary</h4>"
              <div className="space-y-2 text-sm text-blue-700">"
                <p><strong>Company:</strong> {formData.companyName || 'Not provided'}</p>'
                <p><strong>Category:</strong> {formData.category ? formData.category.replace(/_/g, ' ') : 'Not selected'}</p>'
                <p><strong>Tier:</strong> {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}</p>
                <p><strong>Contact:</strong> {formData.contactName || 'Not provided'}</p>'
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">"
      <div className="mb-8">"
        <h1 className="text-3xl font-bold text-gray-900">Partner & Affiliate Signup</h1>"
        <p className="text-gray-600 mt-2">"
          Join our network and grow your business with NRP
        </p>
      </div>

      <div className="mb-8">"
        <div className="flex items-center justify-between">"
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">"
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colours ${
                    currentStep === step.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : currentStep > step.id
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />"
                  ) : (
                    step.icon
                  )}
                </div>
                <p className="text-xs mt-2 text-center hidden md:block max-w-[100px]">"
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-colours ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">"
        <h2 className="text-xl font-semibold text-gray-900 mb-6">"
          {steps[currentStep - 1].title}
        </h2>

        {renderStepContent()}

        <div className="mt-8 flex justify-between">"
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colours ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />"
            Previous
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colours"
            >
              Submit Application
              <CheckCircle className="w-5 h-5 ml-2" />"
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colours"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />"
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">"
        <div className="bg-blue-50 rounded-lg p-4">"
          <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />"
          <h3 className="font-semibold text-gray-900">Grow Your Business</h3>"
          <p className="text-sm text-gray-600 mt-1">"
            Access our network of restoration contractors and expand your customer base
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">"
          <DollarSign className="w-8 h-8 text-green-600 mb-2" />"
          <h3 className="font-semibold text-gray-900">Earn Commissions</h3>"
          <p className="text-sm text-gray-600 mt-1">"
            Competitive commission rates with performance bonuses and tier upgrades
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">"
          <Shield className="w-8 h-8 text-purple-600 mb-2" />"
          <h3 className="font-semibold text-gray-900">Trusted Network</h3>"
          <p className="text-sm text-gray-600 mt-1">"
            Join Australia's leading restoration professional network'
          </p>
        </div>
      </div>
    </div>
  );
}