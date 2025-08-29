'use client';

import { useState, useEffect } from 'react';
import { Building2, Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ContractorOnboardingData } from '@/types/contractor-onboarding';
import { validateABN } from '@/lib/utils/australian-compliance';

interface Step1Props {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: any) => void;
  errors: Record<string, string[]>;
}

export default function Step1BusinessInfo({ data, updateData, errors }: Step1Props) {
  const [businessInfo, setBusinessInfo] = useState(data.businessInfo || {
    companyName: '',
    tradingName: '',
    abn: '',
    acn: '',
    businessType: 'COMPANY',
    yearEstablished: new Date().getFullYear(),
    numberOfEmployees: 1,
    annualRevenue: '',
    website: ''
  });

  const [abnValidation, setAbnValidation] = useState<{
    isValidating: boolean;
    isValid: boolean | null;
    message: string;
  }>({
    isValidating: false,
    isValid: null,
    message: ''
  });

  // Validate ABN when it changes
  useEffect(() => {
    if (businessInfo.abn && businessInfo.abn.length === 11) {
      validateABNNumber(businessInfo.abn);
    }
  }, [businessInfo.abn]);

  const validateABNNumber = async (abn: string) => {
    setAbnValidation({ isValidating: true, isValid: null, message: 'Validating ABN...' });
    
    // Use local validation
    const isValid = validateABN(abn);
    
    // TODO: Also validate against ABR API
    // const response = await fetch(`/api/validate-abn?abn=${abn}`);
    
    setAbnValidation({
      isValidating: false,
      isValid,
      message: isValid ? 'ABN is valid' : 'Invalid ABN number'
    });
  };

  const handleInputChange = (field: string, value: any) => {
    const updated = {
      ...businessInfo,
      [field]: value
    };
    setBusinessInfo(updated);
    updateData({ businessInfo: updated });
  };

  const formatABN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 11 digits
    const limited = digits.slice(0, 11);
    // Format as XX XXX XXX XXX
    if (limited.length > 2) {
      const parts = [
        limited.slice(0, 2),
        limited.slice(2, 5),
        limited.slice(5, 8),
        limited.slice(8, 11)
      ].filter(Boolean);
      return parts.join(' ');
    }
    return limited;
  };

  const businessTypes = [
    { value: 'SOLE_TRADER', label: 'Sole Trader' },
    { value: 'PARTNERSHIP', label: 'Partnership' },
    { value: 'COMPANY', label: 'Company (Pty Ltd)' },
    { value: 'TRUST', label: 'Trust' }
  ];

  const revenueRanges = [
    { value: 'UNDER_500K', label: 'Under $500,000' },
    { value: '500K_1M', label: '$500,000 - $1 million' },
    { value: '1M_5M', label: '$1 million - $5 million' },
    { value: '5M_10M', label: '$5 million - $10 million' },
    { value: '10M_PLUS', label: 'Over $10 million' }
  ];

  const employeeRanges = [
    { value: 1, label: '1-5 employees' },
    { value: 6, label: '6-10 employees' },
    { value: 11, label: '11-20 employees' },
    { value: 21, label: '21-50 employees' },
    { value: 51, label: '51-100 employees' },
    { value: 101, label: '100+ employees' }
  ];

  return (
    <div className="space-y-6">
      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={businessInfo.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          placeholder="Enter your registered company name"
          required
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-400">{errors.companyName[0]}</p>
        )}
      </div>

      {/* Trading Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Trading Name (if different)
        </label>
        <input
          type="text"
          value={businessInfo.tradingName}
          onChange={(e) => handleInputChange('tradingName', e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          placeholder="Enter trading name if different from company name"
        />
      </div>

      {/* ABN */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Australian Business Number (ABN) *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formatABN(businessInfo.abn)}
            onChange={(e) => handleInputChange('abn', e.target.value.replace(/\s/g, ''))}
            className={`
              w-full px-4 py-3 pr-12 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 
              focus:ring-1 transition
              ${abnValidation.isValid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-500' :
                abnValidation.isValid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-500' :
                'border-slate-600 focus:border-blue-500 focus:ring-blue-500'}
            `}
            placeholder="XX XXX XXX XXX"
            maxLength={14}
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {abnValidation.isValidating && (
              <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
            )}
            {abnValidation.isValid === true && (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
            {abnValidation.isValid === false && (
              <AlertCircle className="h-5 w-5 text-red-400" />
            )}
          </div>
        </div>
        {abnValidation.message && (
          <p className={`mt-1 text-sm ${abnValidation.isValid ? 'text-green-400' : 'text-red-400'}`}>
            {abnValidation.message}
          </p>
        )}
        <a
          href="https://abr.business.gov.au/Search/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
        >
          <Search className="h-3 w-3" />
          Look up ABN
        </a>
      </div>

      {/* ACN (if company) */}
      {businessInfo.businessType === 'COMPANY' && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Australian Company Number (ACN)
          </label>
          <input
            type="text"
            value={businessInfo.acn}
            onChange={(e) => handleInputChange('acn', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            placeholder="Enter your ACN"
          />
        </div>
      )}

      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Business Type *
        </label>
        <select
          value={businessInfo.businessType}
          onChange={(e) => handleInputChange('businessType', e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          required
        >
          {businessTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Year Established */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Year Established *
          </label>
          <input
            type="number"
            value={businessInfo.yearEstablished}
            onChange={(e) => handleInputChange('yearEstablished', parseInt(e.target.value))}
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Number of Employees */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Number of Employees *
          </label>
          <select
            value={businessInfo.numberOfEmployees}
            onChange={(e) => handleInputChange('numberOfEmployees', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            required
          >
            {employeeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Annual Revenue */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Annual Revenue (Optional)
        </label>
        <select
          value={businessInfo.annualRevenue}
          onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        >
          <option value="">Select revenue range</option>
          {revenueRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Company Website (Optional)
        </label>
        <input
          type="url"
          value={businessInfo.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          placeholder="https://www.example.com.au"
        />
      </div>

      {/* Information Box */}
      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-300 mb-1">Business Information Required</h4>
            <p className="text-blue-200 text-sm">
              We verify all business details with the Australian Business Register (ABR) and ASIC. 
              Please ensure all information matches your official registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}