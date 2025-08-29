'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Shield, AlertCircle, Check } from 'lucide-react';

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
  
  // Specialized Licenses
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Insurance & Licensing</h2>
        <p className="mt-2 text-gray-600">
          Provide your insurance coverage details and professional licensing information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* General Liability Insurance */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-600" />
            General Liability Insurance (Required)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="generalLiabilityInsurer">Insurance Company</Label>
              <Input
                id="generalLiabilityInsurer"
                {...register('generalLiabilityInsurer', { required: 'Insurance company is required' })}
                placeholder="e.g., QBE Insurance"
              />
              {errors.generalLiabilityInsurer && (
                <p className="text-red-500 text-sm mt-1">{errors.generalLiabilityInsurer.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="generalLiabilityPolicyNumber">Policy Number</Label>
              <Input
                id="generalLiabilityPolicyNumber"
                {...register('generalLiabilityPolicyNumber', { required: 'Policy number is required' })}
                placeholder="e.g., GL123456789"
              />
              {errors.generalLiabilityPolicyNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.generalLiabilityPolicyNumber.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="generalLiabilityCoverage">Coverage Amount</Label>
              <Input
                id="generalLiabilityCoverage"
                {...register('generalLiabilityCoverage', { required: 'Coverage amount is required' })}
                placeholder="e.g., $20,000,000"
              />
              {errors.generalLiabilityCoverage && (
                <p className="text-red-500 text-sm mt-1">{errors.generalLiabilityCoverage.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="generalLiabilityExpiry">Expiry Date</Label>
              <Input
                id="generalLiabilityExpiry"
                type="date"
                {...register('generalLiabilityExpiry', { required: 'Expiry date is required' })}
              />
              {errors.generalLiabilityExpiry && (
                <p className="text-red-500 text-sm mt-1">{errors.generalLiabilityExpiry.message}</p>
              )}
            </div>
          </div>
        </div>

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

          {/* Specialized Licenses */}
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-700">Specialized Licenses (Optional)</Label>
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
              <Label htmlFor="iicrcOCT">Odor Control Technician (OCT)</Label>
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
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}