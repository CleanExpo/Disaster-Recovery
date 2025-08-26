'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Mail,
  Save,
  Eye,
  Edit,
  Copy,
  Trash2,
  Plus,
  Send,
  FileText,
  Code,
  Palette,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type { NotificationTemplate, NotificationType } from '@/types/notifications';

// Email template examples
const defaultTemplates: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Compliance Expiry Warning',
    description: 'Sent when certifications or insurance are about to expire',
    type: 'compliance',
    channels: ['email'],
    subject: '⚠️ {{itemName}} Expires in {{daysUntilExpiry}} Days',
    bodyTemplate: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #fff; }
    .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #f97316; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Compliance Alert</h1>
    </div>
    <div class="content">
      <p>Dear {{contractorName}},</p>
      
      <div class="warning">
        <strong>⚠️ Action Required:</strong> Your {{itemName}} will expire in {{daysUntilExpiry}} days.
      </div>
      
      <p>To maintain your compliance status and continue receiving job assignments, please renew your {{itemType}} before {{expiryDate}}.</p>
      
      <h3>Current Status:</h3>
      <ul>
        <li>Item: {{itemName}}</li>
        <li>Expiry Date: {{expiryDate}}</li>
        <li>Days Remaining: {{daysUntilExpiry}}</li>
        <li>Compliance Score Impact: {{complianceScore}}%</li>
      </ul>
      
      <p>{{actionRequired}}</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{renewalLink}}" class="button">Renew Now</a>
      </p>
      
      <p>If you have any questions, please contact our support team.</p>
      
      <p>Best regards,<br>NRP Compliance Team</p>
    </div>
    <div class="footer">
      <p>© 2024 National Restoration Professionals. All rights reserved.</p>
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>`,
    smsTemplate: 'URGENT: Your {{itemName}} expires in {{daysUntilExpiry}} days. Renew at {{renewalLink}} to maintain compliance.',
    variables: ['contractorName', 'itemType', 'itemName', 'expiryDate', 'daysUntilExpiry', 'complianceScore', 'actionRequired', 'renewalLink'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Invoice Due Reminder',
    description: 'Sent when an invoice payment is due',
    type: 'billing',
    channels: ['email'],
    subject: '💳 Invoice {{invoiceNumber}} Due {{dueDate}}',
    bodyTemplate: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #fff; }
    .invoice-box { border: 1px solid #ddd; padding: 15px; margin: 20px 0; }
    .amount { font-size: 24px; color: #3b82f6; font-weight: bold; }
    .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Invoice Reminder</h1>
    </div>
    <div class="content">
      <p>Dear {{contractorName}},</p>
      
      <p>This is a friendly reminder that your invoice is due soon.</p>
      
      <div class="invoice-box">
        <h3>Invoice Details</h3>
        <p><strong>Invoice Number:</strong> {{invoiceNumber}}</p>
        <p><strong>Amount Due:</strong> <span class="amount">${{amount}}</span></p>
        <p><strong>Due Date:</strong> {{dueDate}}</p>
        <p><strong>Payment Status:</strong> {{paymentStatus}}</p>
        <p><strong>Subscription Tier:</strong> {{subscriptionTier}}</p>
      </div>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{paymentLink}}" class="button">Pay Now</a>
      </p>
      
      <p>Thank you for your continued partnership.</p>
      
      <p>Best regards,<br>NRP Billing Department</p>
    </div>
  </div>
</body>
</html>`,
    smsTemplate: 'Invoice {{invoiceNumber}} for ${{amount}} is due {{dueDate}}. Pay at {{paymentLink}}',
    variables: ['contractorName', 'invoiceNumber', 'amount', 'dueDate', 'paymentStatus', 'subscriptionTier', 'paymentLink'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'New Job Assignment',
    description: 'Sent when a new job is assigned',
    type: 'job',
    channels: ['email', 'sms'],
    subject: '🚨 New {{urgency}} Job: {{jobType}} in {{address}}',
    bodyTemplate: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #10b981; color: white; padding: 20px; text-align: center; }
    .urgent { background-color: #ef4444 !important; }
    .content { padding: 20px; background-color: #fff; }
    .job-details { background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 4px; margin: 5px; }
    .button-danger { background-color: #ef4444; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header {{#if isUrgent}}urgent{{/if}}">
      <h1>New Job Assignment</h1>
    </div>
    <div class="content">
      <p>Dear {{contractorName}},</p>
      
      <p>You have been assigned a new {{urgency}} {{jobType}} job.</p>
      
      <div class="job-details">
        <h3>Job Details</h3>
        <p><strong>Job Number:</strong> {{jobNumber}}</p>
        <p><strong>Client:</strong> {{clientName}}</p>
        <p><strong>Address:</strong> {{address}}</p>
        <p><strong>Job Type:</strong> {{jobType}}</p>
        <p><strong>Priority:</strong> {{urgency}}</p>
        {{#if deadline}}<p><strong>Deadline:</strong> {{deadline}}</p>{{/if}}
      </div>
      
      <p>Please respond to this job assignment as soon as possible.</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{acceptLink}}" class="button">Accept Job</a>
        <a href="{{viewLink}}" class="button" style="background-color: #6b7280;">View Details</a>
        <a href="{{declineLink}}" class="button button-danger">Decline</a>
      </p>
      
      <p>Best regards,<br>NRP Job Dispatch</p>
    </div>
  </div>
</body>
</html>`,
    smsTemplate: '{{urgency}} JOB: {{jobType}} at {{address}}. Client: {{clientName}}. Accept at {{acceptLink}}',
    variables: ['contractorName', 'jobNumber', 'clientName', 'address', 'jobType', 'urgency', 'deadline', 'acceptLink', 'viewLink', 'declineLink', 'isUrgent'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function EmailTemplates() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(templates[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [testData, setTestData] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');

  const handleSaveTemplate = async () => {
    if (!selectedTemplate) return;
    
    try {
      // In production, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTemplates(prev => 
        prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t)
      );
      
      toast({
        title: "Template saved",
        description: "Email template has been updated successfully."
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error saving template",
        description: "Failed to save template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateTemplate = () => {
    if (!selectedTemplate) return;
    
    const newTemplate: NotificationTemplate = {
      ...selectedTemplate,
      id: `${Date.now()}`,
      name: `${selectedTemplate.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  const handleDeleteTemplate = () => {
    if (!selectedTemplate) return;
    
    setTemplates(prev => prev.filter(t => t.id !== selectedTemplate.id));
    setSelectedTemplate(templates[0]);
  };

  const handleTestEmail = async () => {
    try {
      // In production, this would send a test email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Test email sent",
        description: "A test email has been sent to your registered email address."
      });
    } catch (error) {
      toast({
        title: "Error sending test email",
        description: "Failed to send test email. Please try again.",
        variant: "destructive"
      });
    }
  };

  const processTemplate = (template: string, data: Record<string, string>) => {
    let processed = template;
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, value || `[${key}]`);
    });
    return processed;
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'compliance': return 'bg-yellow-100 text-yellow-800';
      case 'billing': return 'bg-blue-100 text-blue-800';
      case 'job': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Email Templates
          </h2>
          <p className="text-gray-600 mt-1">
            Manage and customize email notification templates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Template List */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="p-2">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                        selectedTemplate?.id === template.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{template.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {template.description}
                          </p>
                        </div>
                        {template.isActive ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-xs ${getTypeColor(template.type)}`}>
                          {template.type}
                        </Badge>
                        <div className="flex gap-1">
                          {template.channels.map(channel => (
                            <Badge key={channel} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Template Editor/Preview */}
        <div className="col-span-9">
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedTemplate.name}</CardTitle>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveTemplate}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" onClick={handleDuplicateTemplate}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDeleteTemplate}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button onClick={handleTestEmail}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Test
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="editor">
                  <TabsList>
                    <TabsTrigger value="editor">
                      <Code className="h-4 w-4 mr-2" />
                      Editor
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="variables">
                      <FileText className="h-4 w-4 mr-2" />
                      Variables
                    </TabsTrigger>
                  </TabsList>

                  {/* Editor Tab */}
                  <TabsContent value="editor" className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject Line</Label>
                      <Input
                        id="subject"
                        value={selectedTemplate.subject}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          subject: e.target.value
                        })}
                        disabled={!isEditing}
                        placeholder="Email subject..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="body">HTML Template</Label>
                      <Textarea
                        id="body"
                        value={selectedTemplate.bodyTemplate}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          bodyTemplate: e.target.value
                        })}
                        disabled={!isEditing}
                        rows={15}
                        className="font-mono text-xs"
                      />
                    </div>

                    {selectedTemplate.channels.includes('sms') && (
                      <div>
                        <Label htmlFor="sms">SMS Template</Label>
                        <Textarea
                          id="sms"
                          value={selectedTemplate.smsTemplate}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            smsTemplate: e.target.value
                          })}
                          disabled={!isEditing}
                          rows={3}
                          maxLength={160}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedTemplate.smsTemplate?.length || 0}/160 characters
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Switch
                        id="active"
                        checked={selectedTemplate.isActive}
                        onCheckedChange={(checked) => setSelectedTemplate({
                          ...selectedTemplate,
                          isActive: checked
                        })}
                        disabled={!isEditing}
                      />
                      <Label htmlFor="active">Template is active</Label>
                    </div>
                  </TabsContent>

                  {/* Preview Tab */}
                  <TabsContent value="preview">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Preview</CardTitle>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={previewMode === 'html' ? 'default' : 'outline'}
                              onClick={() => setPreviewMode('html')}
                            >
                              HTML
                            </Button>
                            <Button
                              size="sm"
                              variant={previewMode === 'text' ? 'default' : 'outline'}
                              onClick={() => setPreviewMode('text')}
                            >
                              Text
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-lg p-4 bg-white">
                          <div className="mb-4 pb-4 border-b">
                            <p className="text-sm text-gray-600">Subject:</p>
                            <p className="font-medium">
                              {processTemplate(selectedTemplate.subject || '', testData)}
                            </p>
                          </div>
                          {previewMode === 'html' ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: processTemplate(selectedTemplate.bodyTemplate, testData)
                              }}
                            />
                          ) : (
                            <pre className="whitespace-pre-wrap text-sm">
                              {processTemplate(selectedTemplate.bodyTemplate.replace(/<[^>]*>/g, ''), testData)}
                            </pre>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Variables Tab */}
                  <TabsContent value="variables">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Template Variables</CardTitle>
                        <CardDescription>
                          Enter test values for template variables
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedTemplate.variables.map(variable => (
                            <div key={variable}>
                              <Label htmlFor={variable}>
                                {`{{${variable}}}`}
                              </Label>
                              <Input
                                id={variable}
                                value={testData[variable] || ''}
                                onChange={(e) => setTestData({
                                  ...testData,
                                  [variable]: e.target.value
                                })}
                                placeholder={`Enter value for ${variable}...`}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}