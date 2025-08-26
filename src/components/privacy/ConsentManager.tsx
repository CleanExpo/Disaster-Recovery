'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  RefreshCcw,
  Cookie,
  Mail,
  Share2,
  Database,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PrivacyConsent } from '@/types/privacy';

interface ConsentManagerProps {
  userId: string;
  userType: 'contractor' | 'admin';
  onConsentUpdate?: (consents: PrivacyConsent[]) => void;
}

export function ConsentManager({ userId, userType, onConsentUpdate }: ConsentManagerProps) {
  const [consents, setConsents] = useState<PrivacyConsent[]>([]);
  const [pendingConsents, setPendingConsents] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  const [updateModal, setUpdateModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const consentTypes = [
    {
      id: 'privacy_policy',
      name: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      icon: <Shield className="h-5 w-5" />,
      required: true,
      details: [
        'Personal data collection and processing',
        'Data retention periods',
        'Your rights under Australian Privacy Principles',
        'International data transfers',
        'Security measures and encryption'
      ]
    },
    {
      id: 'terms_of_service',
      name: 'Terms of Service',
      description: 'Legal agreement for using NRP Contractor Portal',
      icon: <FileText className="h-5 w-5" />,
      required: true,
      details: [
        'Service usage terms and conditions',
        'Account responsibilities',
        'Intellectual property rights',
        'Limitation of liability',
        'Dispute resolution procedures'
      ]
    },
    {
      id: 'data_collection',
      name: 'Data Collection & Processing',
      description: 'Permission to collect and process your business and personal data',
      icon: <Database className="h-5 w-5" />,
      required: true,
      details: [
        'Business information (ABN, insurance, certifications)',
        'Contact details and identification',
        'Financial and billing information',
        'Performance metrics and KPIs',
        'Background check results'
      ]
    },
    {
      id: 'third_party_sharing',
      name: 'Third-Party Data Sharing',
      description: 'Sharing data with insurers, Clean Claims, and verification services',
      icon: <Share2 className="h-5 w-5" />,
      required: true,
      details: [
        'Insurance companies for claims processing',
        'Clean Claims integration for job management',
        'Background check providers',
        'Government agencies for compliance',
        'CARSI AI for compliance scoring'
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Communications',
      description: 'Receive updates, newsletters, and promotional content',
      icon: <Mail className="h-5 w-5" />,
      required: false,
      details: [
        'Product updates and new features',
        'Industry news and best practices',
        'Training opportunities',
        'Partner offers and promotions'
      ]
    },
    {
      id: 'cookies',
      name: 'Cookies & Analytics',
      description: 'Use cookies to improve your experience and analyze usage',
      icon: <Cookie className="h-5 w-5" />,
      required: false,
      details: [
        'Essential cookies for authentication',
        'Performance cookies for optimization',
        'Analytics to improve services',
        'Preference storage'
      ]
    }
  ];

  useEffect(() => {
    fetchConsents();
  }, [userId]);

  const fetchConsents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/privacy/consents/${userId}`);
      const data = await response.json();
      setConsents(data.consents);
      setPendingConsents(data.pending);
    } catch (error) {
      console.error('Failed to fetch consents:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConsent = async (type: string, granted: boolean) => {
    try {
      const response = await fetch('/api/privacy/consents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type,
          granted,
          version: '1.0', // Should be dynamic based on current policy version
          ipAddress: 'captured-by-server',
          userAgent: navigator.userAgent
        })
      });

      if (response.ok) {
        fetchConsents();
        if (onConsentUpdate) {
          const updatedConsents = await response.json();
          onConsentUpdate(updatedConsents);
        }
      }
    } catch (error) {
      console.error('Failed to update consent:', error);
    }
  };

  const withdrawConsent = async (consentId: string) => {
    try {
      const response = await fetch(`/api/privacy/consents/${consentId}/withdraw`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchConsents();
      }
    } catch (error) {
      console.error('Failed to withdraw consent:', error);
    }
  };

  const downloadData = async () => {
    try {
      const response = await fetch(`/api/privacy/export/${userId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `privacy-data-${userId}-${new Date().toISOString()}.json`;
      a.click();
    } catch (error) {
      console.error('Failed to download data:', error);
    }
  };

  const getConsentStatus = (type: string) => {
    const consent = consents.find(c => c.type === type && c.granted && !c.revokedAt);
    return consent;
  };

  const hasRequiredConsents = () => {
    return consentTypes
      .filter(ct => ct.required)
      .every(ct => getConsentStatus(ct.id));
  };

  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <Card className={hasRequiredConsents() ? 'border-green-200' : 'border-yellow-200'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Consent Management
            </span>
            {hasRequiredConsents() ? (
              <Badge className="bg-green-600">Compliant</Badge>
            ) : (
              <Badge className="bg-yellow-600">Action Required</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Manage your privacy preferences and data protection settings in compliance with 
            Australian Privacy Principles and GDPR
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingConsents.length > 0 && (
            <Alert className="mb-4 bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                <strong>Action Required:</strong> You have {pendingConsents.length} pending 
                consent requests that require your attention for continued service access.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Actions */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" onClick={() => setPolicyModal(true)}>
              <Eye className="h-4 w-4 mr-2" />
              View Privacy Policy
            </Button>
            <Button variant="outline" onClick={downloadData}>
              <Download className="h-4 w-4 mr-2" />
              Download My Data
            </Button>
            <Button variant="outline" onClick={() => setUpdateModal(true)}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Update Preferences
            </Button>
          </div>

          {/* Consent List */}
          <div className="space-y-3">
            {consentTypes.map(consentType => {
              const consent = getConsentStatus(consentType.id);
              const isExpanded = showDetails[consentType.id];
              
              return (
                <div
                  key={consentType.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {consentType.icon}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{consentType.name}</p>
                            {consentType.required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {consentType.description}
                          </p>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-3 ml-8 space-y-2">
                          <p className="text-sm font-medium text-gray-700">This consent covers:</p>
                          <ul className="space-y-1">
                            {consentType.details.map((detail, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                          {consent && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-xs text-gray-500">
                                Consented on: {new Date(consent.grantedAt!).toLocaleDateString()}
                                {consent.expiresAt && (
                                  <> • Expires: {new Date(consent.expiresAt).toLocaleDateString()}</>
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={!!consent}
                        onCheckedChange={(checked) => updateConsent(consentType.id, checked)}
                        disabled={consentType.required && !!consent}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDetails({
                          ...showDetails,
                          [consentType.id]: !isExpanded
                        })}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GDPR Rights */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Your Privacy Rights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Right to Access</p>
                  <p className="text-gray-600">Request a copy of your personal data</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Right to Rectification</p>
                  <p className="text-gray-600">Correct inaccurate personal data</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Right to Erasure</p>
                  <p className="text-gray-600">Request deletion of your data</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Right to Data Portability</p>
                  <p className="text-gray-600">Transfer your data to another service</p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => window.location.href = '/privacy/rights'}
            >
              Exercise Your Rights
            </Button>
          </div>

          {/* Compliance Badges */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>OAIC Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <span>AES-256 Encrypted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Preferences Modal */}
      <Dialog open={updateModal} onOpenChange={setUpdateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Privacy Preferences</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                Required consents cannot be withdrawn while maintaining an active account. 
                You can request account deletion to remove all data.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {consentTypes.map(consentType => {
                const consent = getConsentStatus(consentType.id);
                return (
                  <div key={consentType.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {consentType.icon}
                      <div>
                        <p className="font-medium">{consentType.name}</p>
                        <p className="text-sm text-gray-600">{consentType.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={!!consent}
                      onCheckedChange={(checked) => updateConsent(consentType.id, checked)}
                      disabled={consentType.required && !!consent}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setUpdateModal(false)}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}