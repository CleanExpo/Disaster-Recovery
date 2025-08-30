'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText, Plus, Copy, Edit3, Trash2, Search, Filter, Download,
  Upload, Star, Clock, User, Tag, Settings, Eye, Save, X,
  CheckCircle, AlertTriangle, Zap, Building2, Shield, Award
} from 'lucide-react';
import type { 
  DocumentTemplate, 
  TemplateField, 
  TemplateType, 
  TemplateFieldType,
  TemplateSettings,
  ValidationRule 
} from '@/types/document-management';

interface TemplateLibraryProps {
  userRole: 'admin' | 'contractor' | 'auditor';
  userId: string;
  className?: string;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  userRole,
  userId,
  className = ''
}) => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<DocumentTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateType | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<DocumentTemplate | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<DocumentTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    category: 'contract' as TemplateType,
    templateType: 'contract' as TemplateType,
    content: '',
    fields: [] as TemplateField[],
    settings: {
      autoMergeData: true,
      requireSignature: false,
      allowEditing: true,
      trackUsage: true
    } as TemplateSettings
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, [userId]);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchQuery, selectedCategory]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockTemplates: DocumentTemplate[] = [
        {
          id: 'template_001',
          name: 'Network Participation Agreement',
          description: 'Standard agreement template for new contractors joining the NRP network',
          category: 'agreement',
          templateType: 'agreement',
          content: `NETWORK PARTICIPATION AGREEMENT

This Network Participation Agreement ("Agreement") is entered into between National Restoration Professionals LLC ("NRP") and {{contractor_name}} ("Contractor").

1. CONTRACTOR INFORMATION
   Company Name: {{company_name}}
   Address: {{company_address}}
   Phone: {{company_phone}}
   Email: {{company_email}}
   License Number: {{license_number}}

2. SERVICES
The Contractor agrees to provide restoration services including but not limited to:
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair

3. INSURANCE REQUIREMENTS
Contractor must maintain minimum insurance coverage:
- General Liability: ${{min_liability_coverage}}
- Workers Compensation: As required by state law
- Professional Liability: ${{professional_liability}}

4. PAYMENT TERMS
Payment terms: {{payment_terms}}
Invoice submission: {{invoice_requirements}}

By signing below, both parties agree to the terms of this agreement.

Contractor Signature: _________________________ Date: _____________
NRP Representative: _________________________ Date: _____________`,
          fields: [
            {
              id: 'field_001',
              name: 'contractor_name',
              label: 'Contractor Name',
              type: 'text',
              required: true,
              placeholder: 'Enter contractor name'
            },
            {
              id: 'field_002',
              name: 'company_name',
              label: 'Company Name',
              type: 'text',
              required: true,
              placeholder: 'Enter company name'
            },
            {
              id: 'field_003',
              name: 'company_address',
              label: 'Company Address',
              type: 'textarea',
              required: true,
              placeholder: 'Enter full address'
            },
            {
              id: 'field_004',
              name: 'min_liability_coverage',
              label: 'Minimum Liability Coverage',
              type: 'text',
              required: true,
              defaultValue: '$1,000,000'
            }
          ],
          settings: {
            autoMergeData: true,
            requireSignature: true,
            allowEditing: false,
            trackUsage: true,
            expirationPeriod: 365
          },
          createdBy: 'admin_001',
          createdAt: '2024-01-15T10:00:00Z',
          lastModifiedAt: '2024-04-10T14:30:00Z',
          version: 2,
          isActive: true,
          usageCount: 45
        },
        {
          id: 'template_002',
          name: 'Insurance Certificate Request',
          description: 'Template for requesting insurance certificates from contractors',
          category: 'form',
          templateType: 'form',
          content: `INSURANCE CERTIFICATE REQUEST FORM

Please provide the following insurance information:

GENERAL LIABILITY INSURANCE
Insurance Company: {{gl_company}}
Policy Number: {{gl_policy_number}}
Coverage Amount: {{gl_coverage}}
Effective Date: {{gl_effective_date}}
Expiration Date: {{gl_expiration_date}}

WORKERS COMPENSATION
Insurance Company: {{wc_company}}
Policy Number: {{wc_policy_number}}
Coverage Amount: {{wc_coverage}}
Effective Date: {{wc_effective_date}}
Expiration Date: {{wc_expiration_date}}

PROFESSIONAL LIABILITY
Insurance Company: {{pl_company}}
Policy Number: {{pl_policy_number}}
Coverage Amount: {{pl_coverage}}
Effective Date: {{pl_effective_date}}
Expiration Date: {{pl_expiration_date}}

ADDITIONAL INSURED
{{additional_insured_requirements}}

Contractor Signature: _________________________ Date: _____________`,
          fields: [
            {
              id: 'field_005',
              name: 'gl_company',
              label: 'General Liability Insurance Company',
              type: 'text',
              required: true,
              placeholder: 'Insurance company name'
            },
            {
              id: 'field_006',
              name: 'gl_coverage',
              label: 'GL Coverage Amount',
              type: 'text',
              required: true,
              validation: [
                { type: 'required', message: 'Coverage amount is required' }
              ]
            }
          ],
          settings: {
            autoMergeData: true,
            requireSignature: true,
            allowEditing: true,
            trackUsage: true
          },
          createdBy: 'admin_001',
          createdAt: '2024-02-01T09:00:00Z',
          lastModifiedAt: '2024-02-01T09:00:00Z',
          version: 1,
          isActive: true,
          usageCount: 28
        },
        {
          id: 'template_003',
          name: 'Project Completion Certificate',
          description: 'Certificate template for project completion and quality assurance',
          category: 'certificate',
          templateType: 'certificate',
          content: `PROJECT COMPLETION CERTIFICATE

This certifies that {{contractor_name}} has successfully completed the restoration project:

PROJECT DETAILS
Project ID: {{project_id}}
Property Address: {{property_address}}
Project Type: {{project_type}}
Start Date: {{start_date}}
Completion Date: {{completion_date}}

WORK PERFORMED
{{work_description}}

QUALITY ASSURANCE
All work has been completed in accordance with:
- Industry standards and best practices
- Local building codes and regulations
- Insurance company requirements
- Customer specifications

CONTRACTOR CERTIFICATION
I certify that all work has been completed to professional standards and all materials used meet or exceed manufacturer specifications.

Contractor: {{contractor_name}}
License: {{contractor_license}}
Signature: _________________________ Date: _____________

CUSTOMER ACCEPTANCE
Customer Signature: _________________________ Date: _____________`,
          fields: [
            {
              id: 'field_007',
              name: 'project_type',
              label: 'Project Type',
              type: 'select',
              required: true,
              options: ['Water Damage', 'Fire Damage', 'Storm Damage', 'Mould Remediation', 'Other']
            }
          ],
          settings: {
            autoMergeData: true,
            requireSignature: true,
            allowEditing: false,
            trackUsage: true
          },
          createdBy: 'admin_002',
          createdAt: '2024-03-10T11:00:00Z',
          lastModifiedAt: '2024-03-15T16:20:00Z',
          version: 1,
          isActive: true,
          usageCount: 12
        }
      ];

      setTemplates(mockTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  };

  const handleCreateTemplate = async () => {
    try {
      const newTemplate: DocumentTemplate = {
        id: `template_${Date.now()}`,
        name: templateForm.name,
        description: templateForm.description,
        category: templateForm.category,
        templateType: templateForm.templateType,
        content: templateForm.content,
        fields: templateForm.fields,
        settings: templateForm.settings,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        lastModifiedAt: new Date().toISOString(),
        version: 1,
        isActive: true,
        usageCount: 0
      };

      setTemplates(prev => [...prev, newTemplate]);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleDuplicateTemplate = async (template: DocumentTemplate) => {
    try {
      const duplicatedTemplate: DocumentTemplate = {
        ...template,
        id: `template_${Date.now()}`,
        name: `${template.name} (Copy)`,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        lastModifiedAt: new Date().toISOString(),
        version: 1,
        usageCount: 0
      };

      setTemplates(prev => [...prev, duplicatedTemplate]);
    } catch (error) {
      console.error('Error duplicating template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const resetForm = () => {
    setTemplateForm({
      name: '',
      description: '',
      category: 'contract',
      templateType: 'contract',
      content: '',
      fields: [],
      settings: {
        autoMergeData: true,
        requireSignature: false,
        allowEditing: true,
        trackUsage: true
      }
    });
  };

  const addTemplateField = () => {
    const newField: TemplateField = {
      id: `field_${Date.now()}`,
      name: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: ''
    };
    setTemplateForm(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateTemplateField = (index: number, updatedField: Partial<TemplateField>) => {
    setTemplateForm(prev => ({
      ...prev,
      fields: prev.fields.map((field, i) => 
        i === index ? { ...field, ...updatedField } : field
      )
    }));
  };

  const removeTemplateField = (index: number) => {
    setTemplateForm(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const getTemplateIcon = (type: TemplateType) => {
    switch (type) {
      case 'contract':
      case 'agreement': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'form': return <Edit3 className="w-5 h-5 text-green-600" />;
      case 'certificate': return <Award className="w-5 h-5 text-purple-600" />;
      case 'report': return <FileText className="w-5 h-5 text-orange-600" />;
      case 'invoice': return <FileText className="w-5 h-5 text-red-600" />;
      case 'proposal': return <FileText className="w-5 h-5 text-indigo-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const CreateTemplateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create Template</h2>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                value={templateForm.name}
                onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter template name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={templateForm.category}
                onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value as TemplateType }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="contract">Contract</option>
                <option value="agreement">Agreement</option>
                <option value="form">Form</option>
                <option value="certificate">Certificate</option>
                <option value="report">Report</option>
                <option value="invoice">Invoice</option>
                <option value="proposal">Proposal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={templateForm.description}
              onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the template"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Content *
            </label>
            <textarea
              rows={12}
              value={templateForm.content}
              onChange={(e) => setTemplateForm(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Enter template content... Use {{field_name}} for dynamic fields"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use double curly braces for dynamic fields: {"{{field_name}}"}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Template Fields
              </label>
              <button
                onClick={addTemplateField}
                className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Field
              </button>
            </div>
            
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {templateForm.fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Field Name"
                      value={field.name}
                      onChange={(e) => updateTemplateField(index, { name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Field Label"
                      value={field.label}
                      onChange={(e) => updateTemplateField(index, { label: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateTemplateField(index, { type: e.target.value as TemplateFieldType })}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="textarea">Textarea</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="date">Date</option>
                      <option value="number">Number</option>
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateTemplateField(index, { required: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Required</span>
                      </label>
                    </div>
                    
                    <button
                      onClick={() => removeTemplateField(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Template Settings
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={templateForm.settings.autoMergeData}
                  onChange={(e) => setTemplateForm(prev => ({
                    ...prev,
                    settings: { ...prev.settings, autoMergeData: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Auto-merge data</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={templateForm.settings.requireSignature}
                  onChange={(e) => setTemplateForm(prev => ({
                    ...prev,
                    settings: { ...prev.settings, requireSignature: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Require signature</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={templateForm.settings.allowEditing}
                  onChange={(e) => setTemplateForm(prev => ({
                    ...prev,
                    settings: { ...prev.settings, allowEditing: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Allow editing</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={templateForm.settings.trackUsage}
                  onChange={(e) => setTemplateForm(prev => ({
                    ...prev,
                    settings: { ...prev.settings, trackUsage: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Track usage</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateTemplate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!templateForm.name || !templateForm.content}
          >
            Create Template
          </button>
        </div>
      </div>
    </div>
  );

  const TemplatePreviewModal = () => {
    if (!showPreviewModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{showPreviewModal.name}</h2>
              <button 
                onClick={() => setShowPreviewModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900">
                {showPreviewModal.content}
              </pre>
            </div>
            
            {showPreviewModal.fields.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Fields</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showPreviewModal.fields.map((field) => (
                    <div key={field.id} className="border border-gray-200 rounded-lg p-3">
                      <p className="font-medium text-gray-900">{field.label}</p>
                      <p className="text-sm text-gray-600">Field: {field.name}</p>
                      <p className="text-sm text-gray-600">Type: {field.type}</p>
                      {field.required && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                          Required
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setShowPreviewModal(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Use Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
          <p className="text-gray-600 mt-1">Create and manage document templates</p>
        </div>
        {userRole === 'admin' && (
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </button>
        )}
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TemplateType | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="contract">Contracts</option>
            <option value="agreement">Agreements</option>
            <option value="form">Forms</option>
            <option value="certificate">Certificates</option>
            <option value="report">Reports</option>
            <option value="invoice">Invoices</option>
            <option value="proposal">Proposals</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || selectedCategory !== 'all' ? 'No templates found' : 'No templates yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first template to get started'
            }
          </p>
          {userRole === 'admin' && !searchQuery && selectedCategory === 'all' && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create First Template
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTemplateIcon(template.templateType)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{template.category}</p>
                    </div>
                  </div>
                  {template.settings.requireSignature && (
                    <div className="p-1 bg-purple-50 rounded">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {template.usageCount} uses
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    v{template.version}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setShowPreviewModal(template)}
                    className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleDuplicateTemplate(template)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {userRole === 'admin' && (
                      <>
                        <button 
                          onClick={() => setShowEditModal(template)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && <CreateTemplateModal />}
      {showPreviewModal && <TemplatePreviewModal />}
    </div>
  );
};

export default TemplateLibrary;