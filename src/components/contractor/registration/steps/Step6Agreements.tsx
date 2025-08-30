'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText,
  Shield,
  Users,
  Heart,
  HardHat,
  Eye,
  Info,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  Scale,
  Briefcase,
  ClipboardCheck,
  Lock,
  FileSignature
} from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';

interface Step6AgreementsProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

interface Agreement {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  content: string[];
  downloadUrl?: string;
  accepted: boolean;
}

export function Step6Agreements({ data, updateData, errors }: Step6AgreementsProps) {
  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      id: 'partnership',
      title: 'NRP Partnership Agreement',
      icon: <Briefcase className="h-5 w-5" />,
      description: 'Full network contract terms and obligations',
      content: [
        'Exclusive territory rights and lead distribution terms',
        'Service level agreements and response time requirements',
        'Quality standards and performance metrics',
        'Payment terms for subscriptions and lead fees',
        'Dispute resolution and termination clauses',
        'Intellectual property and confidentiality provisions',
        'Insurance and indemnification requirements',
        'Non-compete and non-solicitation clauses'
      ],
      downloadUrl: '/agreements/nrp-partnership-agreement.pdf',
      accepted: false
    },
    {
      id: 'code_of_conduct',
      title: 'Code of Conduct',
      icon: <Users className="h-5 w-5" />,
      description: 'Professional behaviour, ethics, and quality standards',
      content: [
        'Professional communication with clients and partners',
        'Ethical business practices and integrity',
        'Quality workmanship and attention to detail',
        'Timely response and completion of projects',
        'Transparent pricing and billing practices',
        'Respect for client property and privacy',
        'Environmental responsibility and waste management',
        'Continuous improvement and training commitment'
      ],
      downloadUrl: '/agreements/code-of-conduct.pdf',
      accepted: false
    },
    {
      id: 'duty_of_care',
      title: 'Duty of Care & Consumer Law Declaration',
      icon: <Scale className="h-5 w-5" />,
      description: 'Legal obligations to clients under Australian law',
      content: [
        'Australian Consumer Law (ACL) compliance',
        'Consumer guarantees for services',
        'Fair trading and honest business practices',
        'Product safety and quality standards',
        'Clear and accurate service descriptions',
        'Proper handling of consumer complaints',
        'Warranty and guarantee obligations',
        'Protection of vulnerable consumers'
      ],
      downloadUrl: '/agreements/duty-of-care-declaration.pdf',
      accepted: false
    },
    {
      id: 'whs_compliance',
      title: 'Work Health & Safety (WHS) Compliance',
      icon: <HardHat className="h-5 w-5" />,
      description: 'Commitment to maintaining safe working environments',
      content: [
        'Safe Work Australia standards compliance',
        'Risk assessment and hazard management',
        'Personal protective equipment (PPE) requirements',
        'Incident reporting and investigation procedures',
        'Worker training and competency requirements',
        'Emergency response and evacuation procedures',
        'Chemical and hazardous material handling',
        'Mental health and wellbeing support'
      ],
      downloadUrl: '/agreements/whs-compliance.pdf',
      accepted: false
    },
    {
      id: 'compliance_monitoring',
      title: 'Ongoing Compliance Monitoring Consent',
      icon: <Eye className="h-5 w-5" />,
      description: 'Authorisation for regular compliance verification',
      content: [
        'Regular insurance policy verification',
        'Certification expiry tracking and renewal',
        'Performance KPI monitoring and reporting',
        'Quality assurance audits and inspections',
        'Customer satisfaction surveys and feedback',
        'Financial stability assessments',
        'Training and development tracking',
        'Regulatory compliance updates'
      ],
      downloadUrl: '/agreements/compliance-monitoring.pdf',
      accepted: false
    }
  ]);

  const [digitalSignature, setDigitalSignature] = useState({
    fullName: '',
    position: '',
    date: new Date().toISOString().split('T')[0],
    ipAddress: '',
    timestamp: ''
  });

  const [expandedAgreements, setExpandedAgreements] = useState<string[]>([]);

  // Toggle agreement acceptance
  const toggleAgreement = (id: string) => {
    setAgreements(prev => prev.map(agreement => 
      agreement.id === id 
        ? { ...agreement, accepted: !agreement.accepted }
        : agreement
    ));
  };

  // Toggle agreement expansion
  const toggleExpanded = (id: string) => {
    setExpandedAgreements(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Check if all agreements are accepted
  const allAgreementsAccepted = (): boolean => {
    return agreements.every(agreement => agreement.accepted);
  };

  // Check if digital signature is complete
  const signatureComplete = (): boolean => {
    return !!(digitalSignature.fullName && digitalSignature.position);
  };

  // Calculate completion percentage
  const getCompletionPercentage = (): number => {
    const acceptedCount = agreements.filter(a => a.accepted).length;
    const totalRequired = agreements.length + 1; // +1 for digital signature
    const currentProgress = acceptedCount + (signatureComplete() ? 1 : 0);
    return Math.round((currentProgress / totalRequired) * 100);
  };

  // Accept all agreements at once
  const acceptAllAgreements = () => {
    setAgreements(prev => prev.map(agreement => ({ ...agreement, accepted: true })));
  };

  // Download all agreements as a bundle
  const downloadAllAgreements = () => {
    // In production, this would trigger a download of a PDF bundle
    console.log('Downloading all agreements...');
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <FileSignature className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Legal Agreements:</strong> Please review and accept all agreements to complete your 
          contractor registration. These agreements form the legal basis of your partnership with NRP.
        </AlertDescription>
      </Alert>

      {/* Progress Overview */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Agreement Progress</h3>
              <p className="text-sm text-gray-600 mt-1">
                Accept all agreements to proceed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {getCompletionPercentage()}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {agreements.filter(a => a.accepted).length} of {agreements.length} agreements
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAllAgreements}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={acceptAllAgreements}
              disabled={allAgreementsAccepted()}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Agreements */}
      {agreements.map((agreement) => (
        <Card key={agreement.id} className={agreement.accepted ? 'border-green-200' : ''}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">{agreement.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{agreement.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {agreement.description}
                  </CardDescription>
                </div>
              </div>
              {agreement.accepted && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Agreement Content Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-sm">Key Terms & Conditions</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(agreement.id)}
                >
                  {expandedAgreements.includes(agreement.id) ? 'Show Less' : 'Show More'}
                </Button>
              </div>
              
              <ul className="space-y-1">
                {(expandedAgreements.includes(agreement.id) 
                  ? agreement.content 
                  : agreement.content.slice(0, 3)
                ).map((item, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
                {!expandedAgreements.includes(agreement.id) && agreement.content.length > 3 && (
                  <li className="text-sm text-gray-500 ml-3.5">
                    ... and {agreement.content.length - 3} more terms
                  </li>
                )}
              </ul>
            </div>

            {/* Download Link */}
            {agreement.downloadUrl && (
              <div className="flex items-center gap-2">
                <a
                  href={agreement.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Full Agreement (PDF)
                </a>
              </div>
            )}

            {/* Acceptance Checkbox */}
            <div className="border-t pt-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={`accept-${agreement.id}`}
                  checked={agreement.accepted}
                  onCheckedChange={() => toggleAgreement(agreement.id)}
                />
                <div className="space-y-1 flex-1">
                  <Label 
                    htmlFor={`accept-${agreement.id}`} 
                    className="font-normal cursor-pointer"
                  >
                    I have read, understood, and agree to the {agreement.title}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <p className="text-xs text-gray-600">
                    By accepting, you agree to be legally bound by all terms and conditions 
                    outlined in this agreement.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Digital Signature */}
      <Card className={signatureComplete() ? 'border-green-200' : ''}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSignature className="h-5 w-5" />
            Digital Signature
          </CardTitle>
          <CardDescription>
            Legally binding electronic signature for all agreements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-yellow-50 border-yellow-200">
            <Lock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              <strong>Legal Notice:</strong> Your electronic signature below has the same legal 
              validity and enforceability as a handwritten signature under the Electronic 
              Transactions Act 1999 (Cth).
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Full Legal Name <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full legal name"
                value={digitalSignature.fullName}
                onChange={(e) => setDigitalSignature({
                  ...digitalSignature,
                  fullName: e.target.value
                })}
              />
              <p className="text-xs text-gray-500">
                Must match the name on your identification documents
              </p>
            </div>

            <div className="space-y-2">
              <Label>
                Position/Title <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Director, Owner"
                value={digitalSignature.position}
                onChange={(e) => setDigitalSignature({
                  ...digitalSignature,
                  position: e.target.value
                })}
              />
              <p className="text-xs text-gray-500">
                Your role in the company
              </p>
            </div>
          </div>

          {signatureComplete() && (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Digital Signature</p>
                <p className="text-2xl font-signature font-bold text-gray-800">
                  {digitalSignature.fullName}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {digitalSignature.position} • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            <p>Date: {digitalSignature.date}</p>
            <p>This signature will be recorded with your IP address and timestamp for verification</p>
          </div>
        </CardContent>
      </Card>

      {/* Important Notices */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Important Legal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-2">By accepting these agreements, you acknowledge that:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                <span>These agreements constitute legally binding contracts between your business and NRP</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                <span>You have the authority to enter into these agreements on behalf of your business</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                <span>Breach of these agreements may result in termination and legal action</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                <span>These agreements are governed by the laws of Australia</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Completion Summary */}
      <Alert 
        className={
          allAgreementsAccepted() && signatureComplete()
            ? "bg-green-50 border-green-300" 
            : "bg-yellow-50 border-yellow-300"
        }
      >
        <Info 
          className={
            allAgreementsAccepted() && signatureComplete()
              ? "h-4 w-4 text-green-600" 
              : "h-4 w-4 text-yellow-600"
          } 
        />
        <AlertDescription 
          className={
            allAgreementsAccepted() && signatureComplete()
              ? "text-green-800" 
              : "text-yellow-800"
          }
        >
          <strong>Agreement Requirements:</strong>
          <ul className="mt-2 ml-4 list-disc text-sm">
            <li className={agreements.find(a => a.id === 'partnership')?.accepted ? "text-green-700" : ""}>
              NRP Partnership Agreement: {agreements.find(a => a.id === 'partnership')?.accepted ? "✓ Accepted" : "Required"}
            </li>
            <li className={agreements.find(a => a.id === 'code_of_conduct')?.accepted ? "text-green-700" : ""}>
              Code of Conduct: {agreements.find(a => a.id === 'code_of_conduct')?.accepted ? "✓ Accepted" : "Required"}
            </li>
            <li className={agreements.find(a => a.id === 'duty_of_care')?.accepted ? "text-green-700" : ""}>
              Duty of Care Declaration: {agreements.find(a => a.id === 'duty_of_care')?.accepted ? "✓ Accepted" : "Required"}
            </li>
            <li className={agreements.find(a => a.id === 'whs_compliance')?.accepted ? "text-green-700" : ""}>
              WHS Compliance: {agreements.find(a => a.id === 'whs_compliance')?.accepted ? "✓ Accepted" : "Required"}
            </li>
            <li className={agreements.find(a => a.id === 'compliance_monitoring')?.accepted ? "text-green-700" : ""}>
              Compliance Monitoring Consent: {agreements.find(a => a.id === 'compliance_monitoring')?.accepted ? "✓ Accepted" : "Required"}
            </li>
            <li className={signatureComplete() ? "text-green-700" : ""}>
              Digital Signature: {signatureComplete() ? "✓ Signed" : "Required"}
            </li>
          </ul>
          {allAgreementsAccepted() && signatureComplete() && (
            <p className="mt-3 font-medium text-green-700">
              ✓ All agreements accepted and signed - ready to submit application
            </p>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}