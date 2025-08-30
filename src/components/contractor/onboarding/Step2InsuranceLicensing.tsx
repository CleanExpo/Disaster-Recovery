'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Shield, AlertCircle, Check, ChevronDown, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InsuranceLicensingData {
  // Insurance Information
  generalLiabilityInsurer: string;
  generalLiabilityPolicyNumber: string;
  generalLiabilityCoverage: string;
  generalLiabilityExpiry: string;
  
  professionalIndemnityInsurer?: string;
  professionalIndemnityPolicyNumber?: string;
  professionalIndemnityCoverage?: string;
  professionalIndemnityExpiry?: string;
  
  workersCompInsurer: string;
  workersCompPolicyNumber: string;
  workersCompExpiry: string;
  
  // Licensing
  contractorLicenseNumber: string;
  contractorLicenseState: string;
  contractorLicenseExpiry: string;
  
  // Specialised Licenses
  asbestosLicense?: string;
  plumbingLicense?: string;
  electricalLicense?: string;
  
  // Certifications
  certifications: {
    iicrcWRT: boolean;
    iicrcASD: boolean;
    iicrcAMRT: boolean;
    iicrcFSRT: boolean;
    iicrcOCT: boolean;
    other: string[];
  };
  
  // Documents
  insuranceDocuments: File[];
  licenseDocuments: File[];
  certificationDocuments: File[];
}

interface Step2Props {
  data: Partial<InsuranceLicensingData>;
  onNext: (data: InsuranceLicensingData) => void;
  onBack: () => void;
}

export default function Step2InsuranceLicensing({ data, onNext, onBack }: Step2Props) {
  const [uploadedFiles, setUploadedFiles] = useState<{
    insurance: File[];
    license: File[];
    certification: File[];
  }>({
    insurance: [],
    license: [],
    certification: []
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<InsuranceLicensingData>({
    defaultValues: data
  });

  const handleFileUpload = (category: 'insurance' | 'license' | 'certification', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [category]: [...prev[category], ...fileArray]
      }));
    }
  };

  const removeFile = (category: 'insurance' | 'license' | 'certification', index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const onSubmit = (formData: InsuranceLicensingData) => {
    const completeData = {
      ...formData,
      insuranceDocuments: uploadedFiles.insurance,
      licenseDocuments: uploadedFiles.license,
      certificationDocuments: uploadedFiles.certification
    };
    onNext(completeData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
              <div className="w-8 h-1 bg-blue-600 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
              <div className="w-8 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold">3</div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Insurance & Licensing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Secure your position by providing comprehensive insurance coverage and professional licensing details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* General Liability Insurance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                <div className="p-2 bg-blue-100 rounded-xl mr-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <span className="hidden sm:inline">General Liability Insurance</span>
                <span className="sm:hidden">General Liability</span>
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Required</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="generalLiabilityInsurer" className="text-sm font-semibold text-gray-700">
                  Insurance Company
                </Label>
                <div className="relative">
                  <Input
                    id="generalLiabilityInsurer"
                    {...register('generalLiabilityInsurer', { required: 'Insurance company is required' })}
                    placeholder="e.g., QBE Insurance"
                    className="h-12 pl-4 pr-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <AnimatePresence>
                  {errors.generalLiabilityInsurer && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm font-medium flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.generalLiabilityInsurer.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="generalLiabilityPolicyNumber" className="text-sm font-semibold text-gray-700">
                  Policy Number
                </Label>
                <Input
                  id="generalLiabilityPolicyNumber"
                  {...register('generalLiabilityPolicyNumber', { required: 'Policy number is required' })}
                  placeholder="e.g., GL123456789"
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <AnimatePresence>
                  {errors.generalLiabilityPolicyNumber && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm font-medium flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.generalLiabilityPolicyNumber.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="generalLiabilityCoverage" className="text-sm font-semibold text-gray-700">
                  Coverage Amount
                </Label>
                <Input
                  id="generalLiabilityCoverage"
                  {...register('generalLiabilityCoverage', { required: 'Coverage amount is required' })}
                  placeholder="e.g., $20,000,000"
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <AnimatePresence>
                  {errors.generalLiabilityCoverage && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm font-medium flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.generalLiabilityCoverage.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="generalLiabilityExpiry" className="text-sm font-semibold text-gray-700">
                  Expiry Date
                </Label>
                <Input
                  id="generalLiabilityExpiry"
                  type="date"
                  {...register('generalLiabilityExpiry', { required: 'Expiry date is required' })}
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                <AnimatePresence>
                  {errors.generalLiabilityExpiry && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm font-medium flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.generalLiabilityExpiry.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        {/* Professional Indemnity Insurance */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-600" />
            Professional Indemnity Insurance (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="professionalIndemnityInsurer">Insurance Company</Label>
              <Input
                id="professionalIndemnityInsurer"
                {...register('professionalIndemnityInsurer')}
                placeholder="e.g., Suncorp"
              />
            </div>
            
            <div>
              <Label htmlFor="professionalIndemnityPolicyNumber">Policy Number</Label>
              <Input
                id="professionalIndemnityPolicyNumber"
                {...register('professionalIndemnityPolicyNumber')}
                placeholder="e.g., PI123456789"
              />
            </div>
            
            <div>
              <Label htmlFor="professionalIndemnityCoverage">Coverage Amount</Label>
              <Input
                id="professionalIndemnityCoverage"
                {...register('professionalIndemnityCoverage')}
                placeholder="e.g., $5,000,000"
              />
            </div>
            
            <div>
              <Label htmlFor="professionalIndemnityExpiry">Expiry Date</Label>
              <Input
                id="professionalIndemnityExpiry"
                type="date"
                {...register('professionalIndemnityExpiry')}
              />
            </div>
          </div>
        </div>

        {/* Workers Compensation */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-600" />
            Workers Compensation Insurance (Required)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workersCompInsurer">Insurance Company</Label>
              <Input
                id="workersCompInsurer"
                {...register('workersCompInsurer', { required: 'Workers comp insurer is required' })}
                placeholder="e.g., WorkCover Queensland"
              />
              {errors.workersCompInsurer && (
                <p className="text-red-500 text-sm mt-1">{errors.workersCompInsurer.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="workersCompPolicyNumber">Policy Number</Label>
              <Input
                id="workersCompPolicyNumber"
                {...register('workersCompPolicyNumber', { required: 'Policy number is required' })}
                placeholder="e.g., WC123456789"
              />
              {errors.workersCompPolicyNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.workersCompPolicyNumber.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="workersCompExpiry">Expiry Date</Label>
              <Input
                id="workersCompExpiry"
                type="date"
                {...register('workersCompExpiry', { required: 'Expiry date is required' })}
              />
              {errors.workersCompExpiry && (
                <p className="text-red-500 text-sm mt-1">{errors.workersCompExpiry.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contractor Licensing */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-600" />
            Contractor License (Required)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contractorLicenseNumber">License Number</Label>
              <Input
                id="contractorLicenseNumber"
                {...register('contractorLicenseNumber', { required: 'License number is required' })}
                placeholder="e.g., QBCC 1234567"
              />
              {errors.contractorLicenseNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contractorLicenseNumber.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="contractorLicenseState">State/Territory</Label>
              <select
                id="contractorLicenseState"
                {...register('contractorLicenseState', { required: 'State is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select State</option>
                <option value="QLD">Queensland</option>
                <option value="NSW">New South Wales</option>
                <option value="VIC">Victoria</option>
                <option value="SA">South Australia</option>
                <option value="WA">Western Australia</option>
                <option value="TAS">Tasmania</option>
                <option value="NT">Northern Territory</option>
                <option value="ACT">Australian Capital Territory</option>
              </select>
              {errors.contractorLicenseState && (
                <p className="text-red-500 text-sm mt-1">{errors.contractorLicenseState.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="contractorLicenseExpiry">Expiry Date</Label>
              <Input
                id="contractorLicenseExpiry"
                type="date"
                {...register('contractorLicenseExpiry', { required: 'Expiry date is required' })}
              />
              {errors.contractorLicenseExpiry && (
                <p className="text-red-500 text-sm mt-1">{errors.contractorLicenseExpiry.message}</p>
              )}
            </div>
          </div>

          {/* Specialised Licenses */}
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-700">Specialised Licenses (Optional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="asbestosLicense" className="text-sm">Asbestos License</Label>
                <Input
                  id="asbestosLicense"
                  {...register('asbestosLicense')}
                  placeholder="License number"
                />
              </div>
              
              <div>
                <Label htmlFor="plumbingLicense" className="text-sm">Plumbing License</Label>
                <Input
                  id="plumbingLicense"
                  {...register('plumbingLicense')}
                  placeholder="License number"
                />
              </div>
              
              <div>
                <Label htmlFor="electricalLicense" className="text-sm">Electrical License</Label>
                <Input
                  id="electricalLicense"
                  {...register('electricalLicense')}
                  placeholder="License number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* IICRC Certifications */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Check className="mr-2 h-5 w-5 text-purple-600" />
            IICRC Certifications
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="iicrcWRT" {...register('certifications.iicrcWRT')} />
              <Label htmlFor="iicrcWRT">Water Damage Restoration Technician (WRT)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="iicrcASD" {...register('certifications.iicrcASD')} />
              <Label htmlFor="iicrcASD">Applied Structural Drying Technician (ASD)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="iicrcAMRT" {...register('certifications.iicrcAMRT')} />
              <Label htmlFor="iicrcAMRT">Applied Microbial Remediation Technician (AMRT)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="iicrcFSRT" {...register('certifications.iicrcFSRT')} />
              <Label htmlFor="iicrcFSRT">Fire and Smoke Restoration Technician (FSRT)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="iicrcOCT" {...register('certifications.iicrcOCT')} />
              <Label htmlFor="iicrcOCT">Odour Control Technician (OCT)</Label>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Upload className="mr-2 h-5 w-5 text-indigo-600" />
            Document Upload
          </h3>
          
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please upload clear, legible copies of all insurance certificates, licenses, and certifications
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div>
              <Label>Insurance Documents</Label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('insurance', e.target.files)}
                className="mt-1"
              />
              {uploadedFiles.insurance.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.insurance.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('insurance', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label>License Documents</Label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('license', e.target.files)}
                className="mt-1"
              />
              {uploadedFiles.license.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.license.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('license', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label>Certification Documents</Label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('certification', e.target.files)}
                className="mt-1"
              />
              {uploadedFiles.certification.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.certification.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('certification', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 pb-4"
          >
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="w-full sm:w-auto h-12 px-8 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-all duration-200 hover:shadow-md"
            >
              ← Back to Step 1
            </Button>
            <Button 
              type="submit"
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Continue to Step 3 →
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}