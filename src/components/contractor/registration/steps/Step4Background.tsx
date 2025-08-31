'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Shield,
  UserCheck,
  FileSearch,
  Users,
  Briefcase,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  Lock,
  Phone,
  Mail,
  Building,
  FileText,
  Camera,
  Calendar
} from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';

interface Step4BackgroundProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

interface BusinessReference {
  name: string;
  relationship: string;
  companyName: string;
  
  email: string;
  projectDescription: string;
  canContact: boolean;
}

interface ProjectSummary {
  projectName: string;
  clientName: string;
  projectType: string;
  completionDate: string;
  projectValue: string;
  description: string;
}

const RELATIONSHIP_TYPES = [
  'Client - Commercial',
  'Client - Insurance',
  'Client - Residential',
  'Supplier/Vendor',
  'Industry Partner',
  'Insurance Assessor',
  'Property Manager',
  'Facility Manager',
  'Other Professional'
];

const PROJECT_TYPES = [
  'Water Damage Restoration',
  'Fire & Smoke Restoration',
  'Mould Remediation',
  'Storm/Flood Recovery',
  'Biohazard Cleanup',
  'Contents Restoration',
  'Structural Drying',
  'Carpet & Upholstery',
  'Commercial Cleaning',
  'Emergency Response'
];

export function Step4Background({ data, updateData, errors }: Step4BackgroundProps) {
  // Consent states
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false);
  const [creditCriminalConsent, setCreditCriminalConsent] = useState(false);
  const [dataPrivacyConsent, setDataPrivacyConsent] = useState(false);
  
  // Director ID files
  const [directorIdFiles, setDirectorIdFiles] = useState<File[]>([]);
  const [idVerificationStatus, setIdVerificationStatus] = useState<'pending' | 'uploaded' | 'verified'>('pending');
  
  // Business references
  const [references, setReferences] = useState<BusinessReference[]>([
    {
      name: '',
      relationship: '',
      companyName: '',
      
      email: '',
      projectDescription: '',
      canContact: true
    },
    {
      name: '',
      relationship: '',
      companyName: '',
      
      email: '',
      projectDescription: '',
      canContact: true
    }
  ]);
  
  // Project portfolio
  const [projectSummaryFile, setProjectSummaryFile] = useState<File | null>(null);
  const [projectPhotos, setProjectPhotos] = useState<File[]>([]);
  const [recentProjects, setRecentProjects] = useState<ProjectSummary[]>([]);
  
  // Validation tracking
  const [validationStatus, setValidationStatus] = useState({
    consents: false,
    directorId: false,
    references: false,
    portfolio: false
  });

  // Format phone number
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('04')) {
      return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3').trim();
    } else if (digits.startsWith('614')) {
      return '+' + digits.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    }
    return value;
  };

  // Handle director ID upload
  const handleDirectorIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => 
        file.type === 'application/pdf' || file.type.startsWith('image/')
      );
      setDirectorIdFiles(prev => [...prev, ...validFiles]);
      setIdVerificationStatus('uploaded');
      setValidationStatus(prev => ({ ...prev, directorId: true }));
    }
  };

  const removeDirectorIdFile = (index: number) => {
    const newFiles = directorIdFiles.filter((_, i) => i !== index);
    setDirectorIdFiles(newFiles);
    if (newFiles.length === 0) {
      setIdVerificationStatus('pending');
      setValidationStatus(prev => ({ ...prev, directorId: false }));
    }
  };

  // Handle reference updates
  const updateReference = (index: number, field: keyof BusinessReference, value: any) => {
    const newRefs = [...references];
    newRefs[index] = { ...newRefs[index], [field]: value };
    setReferences(newRefs);
    
    // Validate references (need at least 2 complete references)
    const completeRefs = newRefs.filter(ref => 
      ref.name && ref.relationship && ref.phone && ref.companyName
    );
    setValidationStatus(prev => ({ ...prev, references: completeRefs.length >= 2 }));
  };

  const addReference = () => {
    setReferences([...references, {
      name: '',
      relationship: '',
      companyName: '',
      
      email: '',
      projectDescription: '',
      canContact: true
    }]);
  };

  const removeReference = (index: number) => {
    if (references.length > 2) {
      const newRefs = references.filter((_, i) => i !== index);
      setReferences(newRefs);
    }
  };

  // Handle project portfolio upload
  const handleProjectSummaryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setProjectSummaryFile(file);
      setValidationStatus(prev => ({ ...prev, portfolio: true }));
    }
  };

  const handleProjectPhotosUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setProjectPhotos(prev => [...prev, ...validFiles]);
    }
  };

  const removeProjectPhoto = (index: number) => {
    setProjectPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Add recent project
  const addRecentProject = () => {
    setRecentProjects([...recentProjects, {
      projectName: '',
      clientName: '',
      projectType: '',
      completionDate: '',
      projectValue: '',
      description: ''
    }]);
  };

  const updateRecentProject = (index: number, field: keyof ProjectSummary, value: string) => {
    const newProjects = [...recentProjects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setRecentProjects(newProjects);
  };

  const removeRecentProject = (index: number) => {
    setRecentProjects(prev => prev.filter((_, i) => i !== index));
  };

  // Update consent validation
  const updateConsents = () => {
    const allConsents = backgroundCheckConsent && creditCriminalConsent && dataPrivacyConsent;
    setValidationStatus(prev => ({ ...prev, consents: allConsents }));
  };

  // Calculate completion percentage
  const calculateCompletion = (): number => {
    let score = 0;
    if (validationStatus.consents) score += 25;
    if (validationStatus.directorId) score += 25;
    if (validationStatus.references) score += 25;
    if (validationStatus.portfolio) score += 25;
    return score;
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Background Verification:</strong> This information is used for third-party screening 
          to ensure the safety and reliability of our contractor network. All checks are conducted by 
          accredited providers in compliance with Australian privacy laws.
        </AlertDescription>
      </Alert>

      {/* Progress Indicator */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Verification Progress</h3>
              <p className="text-sm text-gray-600 mt-1">Complete all sections to proceed</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{calculateCompletion()}%</div>
              <div className="text-xs text-gray-500 mt-1">
                {Object.values(validationStatus).filter(v => v).length} of 4 complete
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Check Consent */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Background Check Authorisation
          </CardTitle>
          <CardDescription>
            Legal consent required for comprehensive screening
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-yellow-50 border-yellow-200">
            <Lock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              Background checks will be conducted by PISA (Professional Investigation Services Australia) 
              or equivalent accredited provider. Results are confidential and used solely for 
              contractor approval purposes.
            </AlertDescription>
          </Alert>

          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="background-check"
                checked={backgroundCheckConsent}
                onCheckedChange={(checked) => {
                  setBackgroundCheckConsent(checked as boolean);
                  updateConsents();
                }}
              />
              <div className="space-y-1 flex-1">
                <Label htmlFor="background-check" className="font-normal cursor-pointer">
                  I authorise third-party background screening <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-600">
                  I consent to comprehensive background checks including identity verification, 
                  professional history, and regulatory compliance checks.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="credit-criminal"
                checked={creditCriminalConsent}
                onCheckedChange={(checked) => {
                  setCreditCriminalConsent(checked as boolean);
                  updateConsents();
                }}
              />
              <div className="space-y-1 flex-1">
                <Label htmlFor="credit-criminal" className="font-normal cursor-pointer">
                  I consent to credit and criminal history checks <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-600">
                  I authorise review of credit history and criminal records as permitted under 
                  Australian law for the purpose of contractor assessment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="data-privacy"
                checked={dataPrivacyConsent}
                onCheckedChange={(checked) => {
                  setDataPrivacyConsent(checked as boolean);
                  updateConsents();
                }}
              />
              <div className="space-y-1 flex-1">
                <Label htmlFor="data-privacy" className="font-normal cursor-pointer">
                  I acknowledge data privacy and protection terms <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-600">
                  I understand my information will be handled in accordance with the Privacy Act 1988 
                  and Australian Privacy Principles.
                </p>
              </div>
            </div>
          </div>

          {validationStatus.consents && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                All required consents provided. Background checks will commence upon application submission.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Director/Owner Identification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSearch className="h-5 w-5" />
            Director/Owner Identification
          </CardTitle>
          <CardDescription>
            Identity verification for all business directors and owners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              Upload clear copies of government-issued photo ID for all directors listed in Step 2. 
              Acceptable forms: Driver's License, Passport, or Proof of Age Card.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>
              Upload Identification Documents <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                id="director-id"
                accept=".pdf,image/*"
                multiple
                onChange={handleDirectorIdUpload}
                className="hidden"
              />
              <label
                htmlFor="director-id"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload ID documents
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  PDF or image files (Driver's License, Passport, etc.)
                </span>
              </label>
            </div>

            {directorIdFiles.length > 0 && (
              <div className="space-y-2 mt-4">
                {directorIdFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDirectorIdFile(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {idVerificationStatus === 'uploaded' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {directorIdFiles.length} identification document(s) uploaded successfully
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business References */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Business References
          </CardTitle>
          <CardDescription>
            Professional endorsements from clients or partners (minimum 2 required)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {references.map((ref, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Reference {index + 1}</h4>
                {references.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReference(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Reference Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="John Smith"
                    value={ref.name}
                    onChange={(e) => updateReference(index, 'name', e.target.value)}
                    className={errors[`reference.${index}.name`] ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Company/Organisation <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="ABC Insurance"
                    value={ref.companyName}
                    onChange={(e) => updateReference(index, 'companyName', e.target.value)}
                    className={errors[`reference.${index}.companyName`] ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <select
                    value={ref.relationship}
                    onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select relationship</option>
                    {RELATIONSHIP_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>
                    Contact Phone <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="Contact Form"
                      value={ref.phone}
                      onChange={(e) => updateReference(index, 'phone', formatPhoneNumber(e.target.value))}
                      className={errors[`reference.${index}.phone`] ? 'border-red-500' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="reference@company.com"
                      value={ref.email}
                      onChange={(e) => updateReference(index, 'email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Project/Relationship Description</Label>
                  <Textarea
                    placeholder="Describe the nature of your work relationship and any notable projects..."
                    value={ref.projectDescription}
                    onChange={(e) => updateReference(index, 'projectDescription', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-3 md:col-span-2">
                  <Checkbox
                    id={`can-contact-${index}`}
                    checked={ref.canContact}
                    onCheckedChange={(checked) => updateReference(index, 'canContact', checked as boolean)}
                  />
                  <Label htmlFor={`can-contact-${index}`} className="font-normal cursor-pointer">
                    This reference can be contacted for verification
                  </Label>
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addReference}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Reference
          </Button>

          {validationStatus.references && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {references.filter(r => r.name && r.phone).length} valid references provided
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Project Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Recent Restoration Projects
          </CardTitle>
          <CardDescription>
            Portfolio of completed works within the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              Include a summary document with project details, before/after photos, and any relevant 
              certifications or testimonials. This helps demonstrate your experience and capabilities.
            </AlertDescription>
          </Alert>

          {/* Project Summary Document */}
          <div className="space-y-2">
            <Label>
              Upload Project Portfolio Summary <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                id="project-summary"
                accept=".pdf,image/*"
                onChange={handleProjectSummaryUpload}
                className="hidden"
              />
              <label
                htmlFor="project-summary"
                className="flex flex-col items-center cursor-pointer"
              >
                {projectSummaryFile ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium">{projectSummaryFile.name}</span>
                    <span className="text-xs text-gray-500 mt-1">Click to replace</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload project summary</span>
                    <span className="text-xs text-gray-400 mt-1">PDF or document with project details</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Project Photos */}
          <div className="space-y-2">
            <Label>Project Photos (Optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                id="project-photos"
                accept="image/*"
                multiple
                onChange={handleProjectPhotosUpload}
                className="hidden"
              />
              <label
                htmlFor="project-photos"
                className="flex flex-col items-center cursor-pointer"
              >
                <Camera className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload project photos</span>
                <span className="text-xs text-gray-400 mt-1">Before/after images (max 10)</span>
              </label>
            </div>

            {projectPhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {projectPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-white"
                        onClick={() => removeProjectPhoto(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-center mt-1 truncate">{photo.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Projects List */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Recent Project Details</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRecentProject}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Project
              </Button>
            </div>

            {recentProjects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-sm">Project {index + 1}</h5>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecentProject(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Project name"
                    value={project.projectName}
                    onChange={(e) => updateRecentProject(index, 'projectName', e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Client name"
                    value={project.clientName}
                    onChange={(e) => updateRecentProject(index, 'clientName', e.target.value)}
                  />
                  <select
                    value={project.projectType}
                    onChange={(e) => updateRecentProject(index, 'projectType', e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="">Project type</option>
                    {PROJECT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <Input
                    type="date"
                    value={project.completionDate}
                    onChange={(e) => updateRecentProject(index, 'completionDate', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            ))}
          </div>

          {projectSummaryFile && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Portfolio summary uploaded successfully
                {projectPhotos.length > 0 && ` with ${projectPhotos.length} supporting photo(s)`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Completion Summary */}
      <Alert className={calculateCompletion() === 100 ? "bg-green-50 border-green-300" : "bg-yellow-50 border-yellow-300"}>
        <Info className={calculateCompletion() === 100 ? "h-4 w-4 text-green-600" : "h-4 w-4 text-yellow-600"} />
        <AlertDescription className={calculateCompletion() === 100 ? "text-green-800" : "text-yellow-800"}>
          <strong>Background Check Requirements:</strong>
          <ul className="mt-2 ml-4 list-disc text-sm">
            <li className={validationStatus.consents ? "text-green-700" : ""}>
              Consent Forms: {validationStatus.consents ? "✓ All consents provided" : "Required"}
            </li>
            <li className={validationStatus.directorId ? "text-green-700" : ""}>
              Director ID: {validationStatus.directorId ? `✓ ${directorIdFiles.length} document(s) uploaded` : "Required"}
            </li>
            <li className={validationStatus.references ? "text-green-700" : ""}>
              Business References: {validationStatus.references ? `✓ ${references.filter(r => r.name && r.phone).length} references provided` : "Minimum 2 required"}
            </li>
            <li className={validationStatus.portfolio ? "text-green-700" : ""}>
              Project Portfolio: {validationStatus.portfolio ? "✓ Summary uploaded" : "Required"}
            </li>
          </ul>
          {calculateCompletion() === 100 && (
            <p className="mt-3 font-medium text-green-700">
              ✓ All background check requirements completed
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}