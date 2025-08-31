'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, Building, Mail, Calendar, Award, Info, MessageSquare} from 'lucide-react';

interface WorkExperience {
  projectName: string;
  clientName: string;
  projectType: string;
  projectValue: string;
  completionDate: string;
  description: string;
  challenges: string;
  outcome: string;
}

interface Reference {
  name: string;
  company: string;
  position: string;
  relationship: string;
  
  email: string;
  projectReference?: string;
}

interface ExperienceReferencesData {
  yearsInBusiness: string;
  yearsInDisasterRecovery: string;
  totalProjectsCompleted: string;
  largestProjectValue: string;
  
  specializations: string[];
  
  workExperience: WorkExperience[];
  references: Reference[];
  
  insuranceClaimsExperience: string;
  adjustorRelationships: string;
  
  achievements: string;
  professionalMemberships: string;
}

interface Step3Props {
  data: Partial<ExperienceReferencesData>;
  onNext: (data: ExperienceReferencesData) => void;
  onBack: () => void;
}

export default function Step3ExperienceReferences({ data, onNext, onBack }: Step3Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ExperienceReferencesData>({
    defaultValues: {
      ...data,
      workExperience: data.workExperience || [
        {
          projectName: '',
          clientName: '',
          projectType: '',
          projectValue: '',
          completionDate: '',
          description: '',
          challenges: '',
          outcome: ''
        }
      ],
      references: data.references || [
        {
          name: '',
          company: '',
          position: '',
          relationship: '',
          
          email: '',
          projectReference: ''
        }
      ]
    }
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience
  } = useFieldArray({
    control,
    name: 'workExperience'
  });

  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference
  } = useFieldArray({
    control,
    name: 'references'
  });

  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
    data.specializations || []
  );

  const specializationOptions = [
    'Water Damage Restoration',
    'Fire & Smoke Damage',
    'Mould Remediation',
    'Storm Damage',
    'Flood Recovery',
    'Biohazard Cleanup',
    'Trauma Scene Cleanup',
    'Sewage Cleanup',
    'Vandalism Repair',
    'Commercial Restoration',
    'Contents Restoration',
    'Electronics Restoration',
    'Document Recovery',
    'Structural Drying',
    'Odour Control'
  ];

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec)
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  const onSubmit = (formData: ExperienceReferencesData) => {
    const completeData = {
      ...formData,
      specializations: selectedSpecializations
    };
    onNext(completeData);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Work Experience & References</h2>
        <p className="mt-2 text-gray-600">
          Share your professional experience and provide references to validate your expertise
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Business Overview */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Building className="mr-2 h-5 w-5 text-blue-600" />
            Business Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yearsInBusiness">Years in Business</Label>
              <Input
                id="yearsInBusiness"
                type="number"
                {...register('yearsInBusiness', { 
                  required: 'Years in business is required',
                  min: { value: 0, message: 'Must be a positive number' }
                })}
                placeholder="e.g., 10"
              />
              {errors.yearsInBusiness && (
                <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="yearsInDisasterRecovery">Years in Disaster Recovery</Label>
              <Input
                id="yearsInDisasterRecovery"
                type="number"
                {...register('yearsInDisasterRecovery', { 
                  required: 'Years in disaster recovery is required',
                  min: { value: 0, message: 'Must be a positive number' }
                })}
                placeholder="e.g., 7"
              />
              {errors.yearsInDisasterRecovery && (
                <p className="text-red-500 text-sm mt-1">{errors.yearsInDisasterRecovery.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="totalProjectsCompleted">Total Projects Completed</Label>
              <Input
                id="totalProjectsCompleted"
                type="number"
                {...register('totalProjectsCompleted', { 
                  required: 'Total projects is required',
                  min: { value: 0, message: 'Must be a positive number' }
                })}
                placeholder="e.g., 500"
              />
              {errors.totalProjectsCompleted && (
                <p className="text-red-500 text-sm mt-1">{errors.totalProjectsCompleted.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="largestProjectValue">Largest Project Value</Label>
              <Input
                id="largestProjectValue"
                {...register('largestProjectValue', { required: 'Largest project value is required' })}
                placeholder="e.g., $2,500,000"
              />
              {errors.largestProjectValue && (
                <p className="text-red-500 text-sm mt-1">{errors.largestProjectValue.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-600" />
            Service Specializations
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specializationOptions.map((spec) => (
              <label
                key={spec}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colours ${
                  selectedSpecializations.includes(spec)
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSpecializations.includes(spec)}
                  onChange={() => toggleSpecialization(spec)}
                  className="mr-2"
                />
                <span className="text-sm">{spec}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notable Projects */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-green-600" />
              Notable Projects (Minimum 3)
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendExperience({
                projectName: '',
                clientName: '',
                projectType: '',
                projectValue: '',
                completionDate: '',
                description: '',
                challenges: '',
                outcome: ''
              })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </div>
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Provide details of significant projects that demonstrate your expertise and capability
            </AlertDescription>
          </Alert>

          {experienceFields.map((field, index) => (
            <div key={field.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Project {index + 1}</h4>
                {experienceFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`workExperience.${index}.projectName`}>Project Name</Label>
                  <Input
                    {...register(`workExperience.${index}.projectName` as const, {
                      required: 'Project name is required'
                    })}
                    placeholder="e.g., Brisbane CBD Office Flood Recovery"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`workExperience.${index}.clientName`}>Client Name</Label>
                  <Input
                    {...register(`workExperience.${index}.clientName` as const, {
                      required: 'Client name is required'
                    })}
                    placeholder="e.g., ABC Corporation"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`workExperience.${index}.projectType`}>Project Type</Label>
                  <select
                    {...register(`workExperience.${index}.projectType` as const, {
                      required: 'Project type is required'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Type</option>
                    <option value="Water Damage">Water Damage</option>
                    <option value="Fire Damage">Fire Damage</option>
                    <option value="Mould Remediation">Mould Remediation</option>
                    <option value="Storm Damage">Storm Damage</option>
                    <option value="Flood Recovery">Flood Recovery</option>
                    <option value="Biohazard">Biohazard</option>
                    <option value="Multiple">Multiple Services</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor={`workExperience.${index}.projectValue`}>Project Value</Label>
                  <Input
                    {...register(`workExperience.${index}.projectValue` as const, {
                      required: 'Project value is required'
                    })}
                    placeholder="e.g., $500,000"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`workExperience.${index}.completionDate`}>Completion Date</Label>
                  <Input
                    type="date"
                    {...register(`workExperience.${index}.completionDate` as const, {
                      required: 'Completion date is required'
                    })}
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor={`workExperience.${index}.description`}>Project Description</Label>
                  <Textarea
                    {...register(`workExperience.${index}.description` as const, {
                      required: 'Description is required'
                    })}
                    placeholder="Describe the scope of work and services provided..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`workExperience.${index}.challenges`}>Challenges Faced</Label>
                  <Textarea
                    {...register(`workExperience.${index}.challenges` as const)}
                    placeholder="What unique challenges did you overcome?"
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`workExperience.${index}.outcome`}>Outcome & Results</Label>
                  <Textarea
                    {...register(`workExperience.${index}.outcome` as const)}
                    placeholder="What was the final outcome? Client satisfaction?"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional References */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-indigo-600" />
              Professional References (Minimum 3)
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendReference({
                name: '',
                company: '',
                position: '',
                relationship: '',
                
                email: '',
                projectReference: ''
              })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Reference
            </Button>
          </div>

          {referenceFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Reference {index + 1}</h4>
                {referenceFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`references.${index}.name`}>Full Name</Label>
                  <Input
                    {...register(`references.${index}.name` as const, {
                      required: 'Reference name is required'
                    })}
                    placeholder="e.g., John Smith"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`references.${index}.company`}>Company</Label>
                  <Input
                    {...register(`references.${index}.company` as const, {
                      required: 'Company is required'
                    })}
                    placeholder="e.g., QBE Insurance"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`references.${index}.position`}>Position</Label>
                  <Input
                    {...register(`references.${index}.position` as const, {
                      required: 'Position is required'
                    })}
                    placeholder="e.g., Claims Manager"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`references.${index}.relationship`}>Relationship</Label>
                  <select
                    {...register(`references.${index}.relationship` as const, {
                      required: 'Relationship is required'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Client">Client</option>
                    <option value="Insurance Adjuster">Insurance Adjuster</option>
                    <option value="Property Manager">Property Manager</option>
                    <option value="Business Partner">Business Partner</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Industry Colleague">Industry Colleague</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor={`references.${index}.phone`}>Phone Number</Label>
                  <Input
                    {...register(`references.${index}.phone` as const, {
                      required: 'Phone number is required'
                    })}
                    placeholder="e.g., "
                  />
                </div>
                
                <div>
                  <Label htmlFor={`references.${index}.email`}>Email Address</Label>
                  <Input
                    type="email"
                    {...register(`references.${index}.email` as const, {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder="e.g., john.smith@example.com"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor={`references.${index}.projectReference`}>Project Reference (Optional)</Label>
                <Input
                  {...register(`references.${index}.projectReference` as const)}
                  placeholder="Which project did you work with this reference on?"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Insurance Claims Experience */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Insurance Claims Experience</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="insuranceClaimsExperience">
                Describe your experience working with insurance companies and claims processes
              </Label>
              <Textarea
                id="insuranceClaimsExperience"
                {...register('insuranceClaimsExperience', {
                  required: 'Insurance claims experience is required'
                })}
                placeholder="How many insurance claims have you handled? Which insurance companies have you worked with? What's your approach to claims documentation?"
                rows={4}
              />
              {errors.insuranceClaimsExperience && (
                <p className="text-red-500 text-sm mt-1">{errors.insuranceClaimsExperience.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="adjustorRelationships">
                Describe your relationships with insurance adjusters
              </Label>
              <Textarea
                id="adjustorRelationships"
                {...register('adjustorRelationships')}
                placeholder="Do you have established relationships with adjusters? How do you ensure smooth claims processing?"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Professional Achievements */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Professional Achievements & Memberships</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="achievements">Awards & Achievements</Label>
              <Textarea
                id="achievements"
                {...register('achievements')}
                placeholder="List any industry awards, recognitions, or notable achievements..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="professionalMemberships">Professional Memberships</Label>
              <Textarea
                id="professionalMemberships"
                {...register('professionalMemberships')}
                placeholder="List memberships in professional organizations (e.g., IICRC, RIA, local trade associations)..."
                rows={3}
              />
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