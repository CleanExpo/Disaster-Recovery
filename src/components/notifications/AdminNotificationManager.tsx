'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bell,
  Send,
  Settings,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Users,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RefreshCw,
  Save,
  Copy,
  Target,
  Zap
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type {
  NotificationRule,
  NotificationTrigger,
  NotificationCondition,
  NotificationRecipient,
  NotificationSchedule,
  NotificationType,
  NotificationPriority,
  NotificationChannel
} from '@/types/notifications';

// Mock notification rules
const mockRules: NotificationRule[] = [
  {
    id: '1',
    name: 'Certification Expiry Reminder',
    description: 'Send reminders when certifications are about to expire',
    type: 'compliance',
    trigger: {
      event: 'certification.expiring',
      source: 'system',
      parameters: { daysBeforeExpiry: [30, 7, 1] }
    },
    conditions: [
      { field: 'certification.type', operator: 'in', value: ['IICRC', 'CPP40421'], logicalOperator: 'AND' },
      { field: 'contractor.status', operator: 'equals', value: 'active' }
    ],
    recipients: [
      { type: 'role', value: 'contractor' },
      { type: 'email', value: 'compliance@nrp.com' }
    ],
    template: 'compliance-expiry',
    channels: ['email', 'sms', 'in_app'],
    priority: 'high',
    schedule: {
      type: 'recurring',
      frequency: 'daily',
      time: '09:00'
    },
    isActive: true,
    createdBy: 'admin',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'New Job Alert',
    description: 'Notify contractors of new jobs in their territory',
    type: 'job',
    trigger: {
      event: 'job.created',
      source: 'system',
      parameters: { urgency: ['emergency', 'urgent'] }
    },
    conditions: [
      { field: 'job.territory', operator: 'equals', value: 'contractor.territories' },
      { field: 'contractor.availability', operator: 'equals', value: true }
    ],
    recipients: [
      { type: 'group', value: 'available_contractors' }
    ],
    template: 'job-assignment',
    channels: ['in_app', 'sms', 'push'],
    priority: 'urgent',
    isActive: true,
    createdBy: 'admin',
    createdAt: new Date()
  }
];

export function AdminNotificationManager() {
  const [rules, setRules] = useState<NotificationRule[]>(mockRules);
  const [selectedRule, setSelectedRule] = useState<NotificationRule | null>(null);
  const [isEditingRule, setIsEditingRule] = useState(false);
  const [sendTestTo, setSendTestTo] = useState('');
  
  // Manual notification state
  const [manualNotification, setManualNotification] = useState({
    type: 'custom' as NotificationType,
    priority: 'medium' as NotificationPriority,
    channels: ['in_app'] as NotificationChannel[],
    recipients: [] as string[],
    title: '',
    message: '',
    scheduleFor: ''
  });

  const handleCreateRule = () => {
    const newRule: NotificationRule = {
      id: `rule-${Date.now()}`,
      name: 'New Rule',
      type: 'custom',
      trigger: {
        event: '',
        source: 'system'
      },
      recipients: [],
      template: '',
      channels: ['in_app'],
      priority: 'medium',
      isActive: false,
      createdBy: 'current-admin',
      createdAt: new Date()
    };
    
    setRules([...rules, newRule]);
    setSelectedRule(newRule);
    setIsEditingRule(true);
  };

  const handleSaveRule = async () => {
    if (!selectedRule) return;
    
    try {
      // In production, save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRules(prev => prev.map(r => r.id === selectedRule.id ? selectedRule : r));
      
      toast({
        title: "Rule saved",
        description: "Notification rule has been updated successfully."
      });
      
      setIsEditingRule(false);
    } catch (error) {
      toast({
        title: "Error saving rule",
        description: "Failed to save notification rule.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
    
    toast({
      title: "Rule deleted",
      description: "Notification rule has been removed."
    });
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const handleSendManualNotification = async () => {
    try {
      // Validate
      if (!manualNotification.title || !manualNotification.message) {
        toast({
          title: "Validation error",
          description: "Title and message are required.",
          variant: "destructive"
        });
        return;
      }
      
      if (manualNotification.recipients.length === 0) {
        toast({
          title: "Validation error",
          description: "At least one recipient is required.",
          variant: "destructive"
        });
        return;
      }
      
      // In production, send to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Notification sent",
        description: `Successfully sent to ${manualNotification.recipients.length} recipients.`
      });
      
      // Reset form
      setManualNotification({
        type: 'custom',
        priority: 'medium',
        channels: ['in_app'],
        recipients: [],
        title: '',
        message: '',
        scheduleFor: ''
      });
    } catch (error) {
      toast({
        title: "Error sending notification",
        description: "Failed to send notification.",
        variant: "destructive"
      });
    }
  };

  const handleTestRule = async (rule: NotificationRule) => {
    if (!sendTestTo) {
      toast({
        title: "Test recipient required",
        description: "Please enter an email or phone number for testing.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Test notification sent",
        description: `Test sent to ${sendTestTo}`
      });
    } catch (error) {
      toast({
        title: "Test failed",
        description: "Failed to send test notification.",
        variant: "destructive"
      });
    }
  };

  const getTriggerDescription = (trigger: NotificationTrigger) => {
    const eventParts = trigger.event.split('.');
    const entity = eventParts[0];
    const action = eventParts[1];
    
    return `When ${entity} ${action}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Notification Manager
          </h2>
          <p className="text-gray-600 mt-1">
            Configure automated notifications and send manual alerts
          </p>
        </div>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="manual">Send Manual</TabsTrigger>
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
        </TabsList>

        {/* Automation Rules Tab */}
        <TabsContent value="rules">
          <div className="grid grid-cols-12 gap-6">
            {/* Rules List */}
            <div className="col-span-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Notification Rules</CardTitle>
                    <Button size="sm" onClick={handleCreateRule}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-2">
                      {rules.map(rule => (
                        <div
                          key={rule.id}
                          onClick={() => setSelectedRule(rule)}
                          className={`p-3 rounded-lg cursor-pointer mb-2 transition-colours ${
                            selectedRule?.id === rule.id
                              ? 'bg-blue-50 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{rule.name}</p>
                                {rule.isActive ? (
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                ) : (
                                  <XCircle className="h-3 w-3 text-gray-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {rule.description || getTriggerDescription(rule.trigger)}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {rule.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {rule.priority}
                                </Badge>
                              </div>
                            </div>
                            <Switch
                              checked={rule.isActive}
                              onCheckedChange={() => handleToggleRule(rule.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Rule Editor */}
            <div className="col-span-8">
              {selectedRule ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{selectedRule.name}</CardTitle>
                      <div className="flex gap-2">
                        {isEditingRule ? (
                          <>
                            <Button variant="outline" onClick={() => setIsEditingRule(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSaveRule}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleTestRule(selectedRule)}>
                              <Zap className="h-4 w-4 mr-2" />
                              Test
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setIsEditingRule(true)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteRule(selectedRule.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Rule Name */}
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        value={selectedRule.name}
                        onChange={(e) => setSelectedRule({ ...selectedRule, name: e.target.value })}
                        disabled={!isEditingRule}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="rule-description">Description</Label>
                      <Textarea
                        id="rule-description"
                        value={selectedRule.description || ''}
                        onChange={(e) => setSelectedRule({ ...selectedRule, description: e.target.value })}
                        disabled={!isEditingRule}
                        rows={2}
                      />
                    </div>

                    {/* Trigger Event */}
                    <div>
                      <Label htmlFor="trigger-event">Trigger Event</Label>
                      <Select
                        value={selectedRule.trigger.event}
                        onValueChange={(value) => setSelectedRule({
                          ...selectedRule,
                          trigger: { ...selectedRule.trigger, event: value }
                        })}
                        disabled={!isEditingRule}
                      >
                        <SelectTrigger id="trigger-event">
                          <SelectValue placeholder="Select trigger event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="certification.expiring">Certification Expiring</SelectItem>
                          <SelectItem value="insurance.expiring">Insurance Expiring</SelectItem>
                          <SelectItem value="job.created">New Job Created</SelectItem>
                          <SelectItem value="job.updated">Job Updated</SelectItem>
                          <SelectItem value="invoice.due">Invoice Due</SelectItem>
                          <SelectItem value="payment.received">Payment Received</SelectItem>
                          <SelectItem value="compliance.warning">Compliance Warning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notification Type & Priority */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Type</Label>
                        <Select
                          value={selectedRule.type}
                          onValueChange={(value: NotificationType) => 
                            setSelectedRule({ ...selectedRule, type: value })
                          }
                          disabled={!isEditingRule}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compliance">Compliance</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="job">Job</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select
                          value={selectedRule.priority}
                          onValueChange={(value: NotificationPriority) => 
                            setSelectedRule({ ...selectedRule, priority: value })
                          }
                          disabled={!isEditingRule}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Channels */}
                    <div>
                      <Label>Delivery Channels</Label>
                      <div className="flex gap-3 mt-2">
                        {(['in_app', 'email', 'sms', 'push'] as NotificationChannel[]).map(channel => (
                          <div key={channel} className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedRule.channels.includes(channel)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedRule({
                                    ...selectedRule,
                                    channels: [...selectedRule.channels, channel]
                                  });
                                } else {
                                  setSelectedRule({
                                    ...selectedRule,
                                    channels: selectedRule.channels.filter(c => c !== channel)
                                  });
                                }
                              }}
                              disabled={!isEditingRule}
                            />
                            <Label className="capitalize">{channel.replace('_', ' ')}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Test Recipient */}
                    {!isEditingRule && (
                      <div>
                        <Label htmlFor="test-recipient">Test Recipient</Label>
                        <div className="flex gap-2">
                          <Input
                            id="test-recipient"
                            placeholder="Email or phone number"
                            value={sendTestTo}
                            onChange={(e) => setSendTestTo(e.target.value)}
                          />
                          <Button onClick={() => handleTestRule(selectedRule)}>
                            Send Test
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Select a rule to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Manual Send Tab */}
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Send Manual Notification</CardTitle>
              <CardDescription>
                Send a one-time notification to selected recipients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Type & Priority */}
                <div>
                  <Label>Type</Label>
                  <Select
                    value={manualNotification.type}
                    onValueChange={(value: NotificationType) => 
                      setManualNotification({ ...manualNotification, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="job">Job</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select
                    value={manualNotification.priority}
                    onValueChange={(value: NotificationPriority) => 
                      setManualNotification({ ...manualNotification, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="notification-title">Title</Label>
                <Input
                  id="notification-title"
                  placeholder="Notification title..."
                  value={manualNotification.title}
                  onChange={(e) => setManualNotification({ ...manualNotification, title: e.target.value })}
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="notification-message">Message</Label>
                <Textarea
                  id="notification-message"
                  placeholder="Enter notification message..."
                  rows={4}
                  value={manualNotification.message}
                  onChange={(e) => setManualNotification({ ...manualNotification, message: e.target.value })}
                />
              </div>

              {/* Channels */}
              <div>
                <Label>Delivery Channels</Label>
                <div className="flex gap-3 mt-2">
                  {(['in_app', 'email', 'sms', 'push'] as NotificationChannel[]).map(channel => (
                    <div key={channel} className="flex items-center gap-2">
                      <Checkbox
                        checked={manualNotification.channels.includes(channel)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setManualNotification({
                              ...manualNotification,
                              channels: [...manualNotification.channels, channel]
                            });
                          } else {
                            setManualNotification({
                              ...manualNotification,
                              channels: manualNotification.channels.filter(c => c !== channel)
                            });
                          }
                        }}
                      />
                      <Label className="capitalize">{channel.replace('_', ' ')}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipients */}
              <div>
                <Label>Recipients</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={manualNotification.recipients.includes('all_contractors')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setManualNotification({
                            ...manualNotification,
                            recipients: [...manualNotification.recipients, 'all_contractors']
                          });
                        } else {
                          setManualNotification({
                            ...manualNotification,
                            recipients: manualNotification.recipients.filter(r => r !== 'all_contractors')
                          });
                        }
                      }}
                    />
                    <Label>All Contractors</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={manualNotification.recipients.includes('active_contractors')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setManualNotification({
                            ...manualNotification,
                            recipients: [...manualNotification.recipients, 'active_contractors']
                          });
                        } else {
                          setManualNotification({
                            ...manualNotification,
                            recipients: manualNotification.recipients.filter(r => r !== 'active_contractors')
                          });
                        }
                      }}
                    />
                    <Label>Active Contractors Only</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={manualNotification.recipients.includes('admins')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setManualNotification({
                            ...manualNotification,
                            recipients: [...manualNotification.recipients, 'admins']
                          });
                        } else {
                          setManualNotification({
                            ...manualNotification,
                            recipients: manualNotification.recipients.filter(r => r !== 'admins')
                          });
                        }
                      }}
                    />
                    <Label>Administrators</Label>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <Label htmlFor="schedule-time">Schedule For (Optional)</Label>
                <Input
                  id="schedule-time"
                  type="datetime-local"
                  value={manualNotification.scheduleFor}
                  onChange={(e) => setManualNotification({ ...manualNotification, scheduleFor: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to send immediately</p>
              </div>

              {/* Send Button */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setManualNotification({
                    type: 'custom',
                    priority: 'medium',
                    channels: ['in_app'],
                    recipients: [],
                    title: '',
                    message: '',
                    scheduleFor: ''
                  })}
                >
                  Clear
                </Button>
                <Button onClick={handleSendManualNotification}>
                  <Send className="h-4 w-4 mr-2" />
                  {manualNotification.scheduleFor ? 'Schedule' : 'Send Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitor Tab */}
        <TabsContent value="monitor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Active Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rules.filter(r => r.isActive).map(rule => (
                    <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{rule.name}</p>
                        <p className="text-xs text-gray-500">{getTriggerDescription(rule.trigger)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {rule.channels.length} channels
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleRule(rule.id)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Compliance Reminder</span>
                    <span className="text-gray-500">15 sent • 2m ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Job Alert</span>
                    <span className="text-gray-500">8 sent • 15m ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Invoice Reminder</span>
                    <span className="text-gray-500">23 sent • 1h ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>System Announcement</span>
                    <span className="text-gray-500">142 sent • 3h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queue Status */}
            <Card>
              <CardHeader>
                <CardTitle>Queue Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Email Queue</span>
                      <span>3 pending</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>SMS Queue</span>
                      <span>0 pending</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Push Queue</span>
                      <span>1 pending</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Log */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">SMS Delivery Failed</p>
                        <p className="text-xs text-gray-600">Invalid phone number format</p>
                        <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email Bounce</p>
                        <p className="text-xs text-gray-600">Mailbox full</p>
                        <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}