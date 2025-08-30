'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  GraduationCap,
  Award,
  Users2,
  BookOpen,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  Info,
  Shield,
  Star,
  ExternalLink
} from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';

interface Step3ComplianceProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

interface IICRCCertification {
  name: string;
  file: File | null;
  expiryDate: string;
  certNumber?: string;
}

interface OtherQualification {
  name: string;
  file: File | null;
  issuer?: string;
}

const IICRC_CERT_TYPES = [
  { value: 'WRT', label: 'Water Damage Restoration Technician (WRT)' },
  { value: 'ASD', label: 'Applied Structural Drying (ASD)' },
  { value: 'AMRT', label: 'Applied Microbial Remediation Technician (AMRT)' },
  { value: 'FSRT', label: 'Fire and Smoke Damage Restoration (FSRT)' },
  { value: 'HST', label: 'Health & Safety Technician (HST)' },
  { value: 'OCT', label: 'Odour Control Technician (OCT)' },
  { value: 'RRT', label: 'Carpet Repair & Reinstallation (RRT)' },
  { value: 'UFT', label: 'Upholstery & Fabric Cleaning (UFT)' },
  { value: 'CCT', label: 'Carpet Cleaning Technician (CCT)' },
  { value: 'CUSTOM', label: 'Other IICRC Certification' }
];

const ASSOCIATION_TYPES = [
  { value: 'RIA', label: 'Restoration Industry Association (RIA)' },
  { value: 'IAQAA', label: 'Indoor Air Quality Association Australia (IAQAA)' },
  { value: 'CCAVIC', label: 'Carpet Cleaners Association VIC' },
  { value: 'CCAWA', label: 'Carpet Cleaners Association WA' },
  { value: 'BSCAA', label: 'Building Service Contractors Association of Australia' },
  { value: 'OTHER', label: 'Other Industry Association' }
];

export function Step3Compliance({ data, updateData, errors }: Step3ComplianceProps) {
  // Main CPP40421 Certificate
  const [cpp40421File, setCpp40421File] = useState<File | null>(null);
  const [cpp40421Number, setCpp40421Number] = useState('');
  const [cpp40421Issuer, setCpp40421Issuer] = useState('');
  const [cpp40421Date, setCpp40421Date] = useState('');

  // IICRC Certifications
  const [iicrcCerts, setIicrcCerts] = useState<IICRCCertification[]>([
    { name: '', file: null, expiryDate: '', certNumber: '' }
  ]);

  // Industry Association
  const [association, setAssociation] = useState({
    name: '',
    file: null as File | null,
    memberNumber: '',
    expiryDate: ''
  });

  // CARSI Training
  const [carsiFile, setCarsiFile] = useState<File | null>(null);
  const [carsiCompletionDate, setCarsiCompletionDate] = useState('');
  const [carsiScore, setCarsiScore] = useState('');

  // Other Qualifications
  const [otherQualifications, setOtherQualifications] = useState<OtherQualification[]>([]);

  // Validation states
  const [validationStatus, setValidationStatus] = useState({
    cpp40421: false,
    iicrc: false,
    association: false,
    carsi: false
  });

  // Handle CPP40421 upload
  const handleCpp40421Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setCpp40421File(file);
      setValidationStatus(prev => ({ ...prev, cpp40421: true }));
    }
  };

  // Handle IICRC certification updates
  const updateIicrcCert = (index: number, field: keyof IICRCCertification, value: any) => {
    const newCerts = [...iicrcCerts];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setIicrcCerts(newCerts);
    
    // Check if any cert is complete
    const hasCompleteCert = newCerts.some(cert => cert.name && cert.file);
    setValidationStatus(prev => ({ ...prev, iicrc: hasCompleteCert }));
  };

  const addIicrcCert = () => {
    setIicrcCerts([...iicrcCerts, { name: '', file: null, expiryDate: '', certNumber: '' }]);
  };

  const removeIicrcCert = (index: number) => {
    if (iicrcCerts.length > 1) {
      const newCerts = iicrcCerts.filter((_, i) => i !== index);
      setIicrcCerts(newCerts);
    }
  };

  // Handle association file upload
  const handleAssociationUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setAssociation({ ...association, file });
      if (association.name && association.memberNumber) {
        setValidationStatus(prev => ({ ...prev, association: true }));
      }
    }
  };

  // Handle CARSI upload
  const handleCarsiUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setCarsiFile(file);
      setValidationStatus(prev => ({ ...prev, carsi: true }));
    }
  };

  // Handle other qualifications
  const addOtherQualification = () => {
    setOtherQualifications([...otherQualifications, { name: '', file: null, issuer: '' }]);
  };

  const updateOtherQualification = (index: number, field: keyof OtherQualification, value: any) => {
    const newQuals = [...otherQualifications];
    newQuals[index] = { ...newQuals[index], [field]: value };
    setOtherQualifications(newQuals);
  };

  const removeOtherQualification = (index: number) => {
    const newQuals = otherQualifications.filter((_, i) => i !== index);
    setOtherQualifications(newQuals);
  };

  // Calculate compliance score
  const complianceScore = () => {
    let score = 0;
    if (validationStatus.cpp40421) score += 40;
    if (validationStatus.iicrc) score += 30;
    if (validationStatus.association) score += 20;
    if (validationStatus.carsi) score += 10;
    return score;
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Industry Compliance:</strong> Upload your professional certifications and memberships. 
          These documents verify your qualification to perform restoration work to Australian standards.
        </AlertDescription>
      </Alert>

      {/* Compliance Score */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Compliance Score</h3>
              <p className="text-sm text-gray-600 mt-1">
                Based on uploaded certifications
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{complianceScore()}%</div>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(complianceScore() / 20) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CPP40421 Certificate IV */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            CPP40421 Certificate IV
          </CardTitle>
          <CardDescription>
            Certificate IV in Cleaning and Restoration (Specialty Cleaning and Restoration)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Training Provider Links */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Need this certification?</strong> Find registered training organizations (RTOs):
              <div className="mt-2 space-y-1">
                <a 
                  href="https://training.gov.au/Training/Details/CPP40421" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  View CPP40421 on training.gov.au (Official RTO List)
                </a>
                <a 
                  href="https://www.myskills.gov.au/courses/details?Code=CPP40421" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  Find RTOs on MySkills.gov.au
                </a>
              </div>
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Certificate Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="CERT-123456"
                value={cpp40421Number}
                onChange={(e) => setCpp40421Number(e.target.value)}
                className={errors['cpp40421.number'] ? 'border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Issuing RTO/Institution <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Training Provider Name"
                value={cpp40421Issuer}
                onChange={(e) => setCpp40421Issuer(e.target.value)}
                className={errors['cpp40421.issuer'] ? 'border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Completion Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={cpp40421Date}
                onChange={(e) => setCpp40421Date(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className={errors['cpp40421.date'] ? 'border-red-500' : ''}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Upload Certificate <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                id="cpp40421"
                accept=".pdf,image/*"
                onChange={handleCpp40421Upload}
                className="hidden"
              />
              <label
                htmlFor="cpp40421"
                className="flex flex-col items-center cursor-pointer"
              >
                {cpp40421File ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium">{cpp40421File.name}</span>
                    <span className="text-xs text-gray-500 mt-1">Click to replace</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload certificate</span>
                    <span className="text-xs text-gray-400 mt-1">PDF or image file</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Verifies the contractor meets national industry standards
            </p>
          </div>
        </CardContent>
      </Card>

      {/* IICRC Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            IICRC Certifications
          </CardTitle>
          <CardDescription>
            Institute of Inspection, Cleaning and Restoration Certification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* IICRC Training Schools */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Need IICRC Certification?</strong>
              <div className="mt-2">
                <a 
                  href="https://www.iicrc.org/page/IICRCApprovedSchools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  Find IICRC Approved Training Schools
                </a>
                <p className="text-xs text-gray-600 mt-2">
                  Access the official directory of IICRC approved training providers worldwide, 
                  including schools offering courses in Australia and New Zealand.
                </p>
              </div>
            </AlertDescription>
          </Alert>
          {iicrcCerts.map((cert, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">IICRC Certification {index + 1}</h4>
                {iicrcCerts.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIicrcCert(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Certification Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={cert.name}
                    onValueChange={(value) => updateIicrcCert(index, 'name', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      {IICRC_CERT_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Certificate Number</Label>
                  <Input
                    type="text"
                    placeholder="IICRC-123456"
                    value={cert.certNumber}
                    onChange={(e) => updateIicrcCert(index, 'certNumber', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    type="date"
                    value={cert.expiryDate}
                    onChange={(e) => updateIicrcCert(index, 'expiryDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>
                    Upload Certificate <span className="text-red-500">*</span>
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-2">
                    <input
                      type="file"
                      id={`iicrc-${index}`}
                      accept=".pdf,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) updateIicrcCert(index, 'file', file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor={`iicrc-${index}`}
                      className="flex items-center justify-center cursor-pointer"
                    >
                      {cert.file ? (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span className="text-xs truncate">{cert.file.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-gray-400" />
                          <span className="text-xs">Upload</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addIicrcCert}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another IICRC Certification
          </Button>
          
          <p className="text-xs text-gray-500">
            Ensures advanced technical qualifications are held
          </p>
        </CardContent>
      </Card>

      {/* Industry Association Membership */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users2 className="h-5 w-5" />
            Industry Association Membership
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Association Links */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Join an Industry Association:</strong>
              <div className="mt-2 space-y-1">
                <a 
                  href="https://restorationindustry.org.au/membership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  RIA - Restoration Industry Association
                </a>
                <a 
                  href="https://www.iaqa.org.au/membership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  IAQAA - Indoor Air Quality Association Australia
                </a>
                <a 
                  href="https://www.ccavic.asn.au/membership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  CCAVIC - Carpet Cleaners Association Victoria
                </a>
                <a 
                  href="https://www.bscaa.com.au/membership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  BSCAA - Building Service Contractors Association
                </a>
              </div>
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Association Name <span className="text-red-500">*</span>
              </Label>
              <Select
                value={association.name}
                onValueChange={(value) => {
                  setAssociation({ ...association, name: value });
                  if (value && association.file && association.memberNumber) {
                    setValidationStatus(prev => ({ ...prev, association: true }));
                  }
                }}
              >
                <SelectTrigger className={errors['association.name'] ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select association" />
                </SelectTrigger>
                <SelectContent>
                  {ASSOCIATION_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>
                Membership Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="MEM-123456"
                value={association.memberNumber}
                onChange={(e) => {
                  setAssociation({ ...association, memberNumber: e.target.value });
                  if (association.name && association.file && e.target.value) {
                    setValidationStatus(prev => ({ ...prev, association: true }));
                  }
                }}
                className={errors['association.memberNumber'] ? 'border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Membership Expiry</Label>
              <Input
                type="date"
                value={association.expiryDate}
                onChange={(e) => setAssociation({ ...association, expiryDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Membership Certificate <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                id="association"
                accept=".pdf,image/*"
                onChange={handleAssociationUpload}
                className="hidden"
              />
              <label
                htmlFor="association"
                className="flex flex-col items-center cursor-pointer"
              >
                {association.file ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium">{association.file.name}</span>
                    <span className="text-xs text-gray-500 mt-1">Click to replace</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload membership certificate</span>
                    <span className="text-xs text-gray-400 mt-1">PDF or image file</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Verifies connection to established industry bodies
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CARSI Training Record */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            CARSI Training Record (Optional)
          </CardTitle>
          <CardDescription>
            Cleaning and Restoration Science Institute - Continuing education and professional development
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* CARSI Membership Link */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Get CARSI Certified:</strong>
              <div className="mt-2 space-y-1">
                <a 
                  href="https://www.carsi.org.au/membership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  CARSI Membership & Training Portal
                </a>
                <a 
                  href="https://www.carsi.org.au/courses" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Available CARSI Courses
                </a>
                <p className="text-xs text-gray-600 mt-2">
                  CARSI provides AI-powered compliance training and continuing education units (CEUs) 
                  for restoration professionals.
                </p>
              </div>
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Completion Date</Label>
              <Input
                type="date"
                value={carsiCompletionDate}
                onChange={(e) => setCarsiCompletionDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Score/Grade</Label>
              <Input
                type="text"
                placeholder="e.g., 95% or Pass"
                value={carsiScore}
                onChange={(e) => setCarsiScore(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload CARSI Certificate</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                id="carsi"
                accept=".pdf,image/*"
                onChange={handleCarsiUpload}
                className="hidden"
              />
              <label
                htmlFor="carsi"
                className="flex flex-col items-center cursor-pointer"
              >
                {carsiFile ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium">{carsiFile.name}</span>
                    <span className="text-xs text-gray-500 mt-1">Click to replace</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload CARSI record</span>
                    <span className="text-xs text-gray-400 mt-1">PDF or image file</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Tracks ongoing continuing education
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Other Industry Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5" />
            Other Industry Qualifications (Optional)
          </CardTitle>
          <CardDescription>
            Additional certifications or specialty recognitions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {otherQualifications.map((qual, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Additional Qualification {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOtherQualification(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qualification Name</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Asbestos Awareness"
                    value={qual.name}
                    onChange={(e) => updateOtherQualification(index, 'name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Issuing Organisation</Label>
                  <Input
                    type="text"
                    placeholder="Organisation name"
                    value={qual.issuer}
                    onChange={(e) => updateOtherQualification(index, 'issuer', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Upload Certificate</Label>
                  <div className="border-2 border-dashed rounded-lg p-4">
                    <input
                      type="file"
                      id={`other-${index}`}
                      accept=".pdf,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) updateOtherQualification(index, 'file', file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor={`other-${index}`}
                      className="flex flex-col items-center cursor-pointer"
                    >
                      {qual.file ? (
                        <>
                          <CheckCircle className="h-6 w-6 text-green-600 mb-1" />
                          <span className="text-xs">{qual.file.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-gray-400 mb-1" />
                          <span className="text-xs">Upload certificate</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addOtherQualification}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Qualification
          </Button>
        </CardContent>
      </Card>

      {/* Compliance Summary */}
      <Alert className={complianceScore() >= 60 ? "bg-green-50 border-green-300" : "bg-yellow-50 border-yellow-300"}>
        <Info className={complianceScore() >= 60 ? "h-4 w-4 text-green-600" : "h-4 w-4 text-yellow-600"} />
        <AlertDescription className={complianceScore() >= 60 ? "text-green-800" : "text-yellow-800"}>
          <strong>Compliance Requirements:</strong>
          <ul className="mt-2 ml-4 list-disc text-sm">
            <li className={validationStatus.cpp40421 ? "text-green-700" : ""}>
              CPP40421 Certificate IV: {validationStatus.cpp40421 ? "✓ Uploaded" : "Required (40% weight)"}
            </li>
            <li className={validationStatus.iicrc ? "text-green-700" : ""}>
              IICRC Certifications: {validationStatus.iicrc ? `✓ ${iicrcCerts.filter(c => c.file).length} uploaded` : "At least 1 required (30% weight)"}
            </li>
            <li className={validationStatus.association ? "text-green-700" : ""}>
              Industry Association: {validationStatus.association ? "✓ Verified" : "Required (20% weight)"}
            </li>
            <li className={validationStatus.carsi ? "text-green-700" : ""}>
              CARSI Training: {validationStatus.carsi ? "✓ Uploaded" : "Optional (10% weight)"}
            </li>
            <li className={otherQualifications.filter(q => q.file).length > 0 ? "text-green-700" : ""}>
              Additional Qualifications: {otherQualifications.filter(q => q.file).length} uploaded
            </li>
          </ul>
          {complianceScore() < 60 && (
            <p className="mt-3 font-medium">
              ⚠️ Minimum 60% compliance score required to proceed
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}