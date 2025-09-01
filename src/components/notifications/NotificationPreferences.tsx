'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  Calendar,
  Shield,
  DollarSign,
  Briefcase,
  Settings,
  Info,
  Save,
  AlertCircle,
  Moon,
  Globe
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type {
  NotificationPreferences,
  NotificationChannel,
  NotificationType,
  NotificationPriority,
  NotificationChannelPreference
} from '@/types/notifications';

const defaultPreferences: NotificationPreferences = {
  userId: 'current-user',
  channels: {
    in_app: true,
    email: true,
    sms: false,
    push: true
  },
  categories: {
    compliance: {
      enabled: true,
      channels: ['in_app', 'email', 'sms'],
      priorities: ['high', 'urgent'],
      immediateFor: ['urgent']
    },
    billing: {
      enabled: true,
      channels: ['in_app', 'email'],
      priorities: ['high', 'urgent'],
      immediateFor: ['urgent']
    },
    job: {
      enabled: true,
      channels: ['in_app', 'push', 'sms'],
      priorities: ['medium', 'high', 'urgent'],
      immediateFor: ['urgent']
    },
    system: {
      enabled: true,
      channels: ['in_app', 'email'],
      priorities: ['high', 'urgent'],
      immediateFor: []
    },
    custom: {
      enabled: true,
      channels: ['in_app'],
      priorities: ['medium', 'high', 'urgent'],
      immediateFor: []
    }
  },
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
    timezone: 'Australia/Sydney',
    excludeUrgent: true
  },
  emailDigest: {
    enabled: true,
    frequency: 'daily',
    time: '09:00',
    includeTypes: ['compliance', 'billing', 'system']
  }
};

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChannelToggle = (channel: NotificationChannel) => {
    setPreferences(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel]
      }
    }));
    setHasChanges(true);
  };

  const handleCategoryToggle = (category: NotificationType) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          enabled: !prev.categories[category].enabled
        }
      }
    }));
    setHasChanges(true);
  };

  const handleCategoryChannelToggle = (category: NotificationType, channel: NotificationChannel) => {
    setPreferences(prev => {
      const currentChannels = prev.categories[category].channels;
      const newChannels = currentChannels.includes(channel)
        ? currentChannels.filter(c => c !== channel)
        : [...currentChannels, channel];
      
      return {
        ...prev,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories[category],
            channels: newChannels
          }
        }
      };
    });
    setHasChanges(true);
  };

  const handlePriorityToggle = (category: NotificationType, priority: NotificationPriority) => {
    setPreferences(prev => {
      const currentPriorities = prev.categories[category].priorities;
      const newPriorities = currentPriorities.includes(priority)
        ? currentPriorities.filter(p => p !== priority)
        : [...currentPriorities, priority];
      
      return {
        ...prev,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories[category],
            priorities: newPriorities
          }
        }
      };
    });
    setHasChanges(true);
  };

  const handleQuietHoursToggle = () => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours!,
        enabled: !prev.quietHours?.enabled
      }
    }));
    setHasChanges(true);
  };

  const handleEmailDigestToggle = () => {
    setPreferences(prev => ({
      ...prev,
      emailDigest: {
        ...prev.emailDigest!,
        enabled: !prev.emailDigest?.enabled
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In production, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Preferences saved",
        description: "Your notification preferences have been updated successfully."
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getCategoryIcon = (category: NotificationType) => {
    switch (category) {
      case 'compliance':
        return <Shield className="h-4 w-4" />;
      case 'billing':
        return <DollarSign className="h-4 w-4" />;
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'custom':
        return <Bell className="h-4 w-4" />;
    }
  };

  const getChannelIcon = (channel: NotificationChannel) => {
    switch (channel) {
      case 'in_app':
        return <Bell className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'push':
        return <Smartphone className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notification Preferences</h2>
          <p className="text-gray-600 mt-1">
            Manage how and when you receive notifications
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="channels" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="digest">Email Digest</TabsTrigger>
        </TabsList>

        {/* Channels Tab */}
        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* In-App Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label htmlFor="in-app">In-App Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Notifications within the platform
                    </p>
                  </div>
                </div>
                <Switch
                  id="in-app"
                  checked={preferences.channels.in_app}
                  onCheckedChange={() => handleChannelToggle('in_app')}
                />
              </div>

              <Separator />

              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label htmlFor="email">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email"
                  checked={preferences.channels.email}
                  onCheckedChange={() => handleChannelToggle('email')}
                />
              </div>

              <Separator />

              {/* SMS Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label htmlFor="sms">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Text messages for urgent alerts
                    </p>
                  </div>
                </div>
                <Switch
                  id="sms"
                  checked={preferences.channels.sms}
                  onCheckedChange={() => handleChannelToggle('sms')}
                />
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Mobile app notifications
                    </p>
                  </div>
                </div>
                <Switch
                  id="push"
                  checked={preferences.channels.push}
                  onCheckedChange={() => handleChannelToggle('push')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="space-y-4">
            {Object.entries(preferences.categories).map(([category, settings]) => (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category as NotificationType)}
                      <CardTitle className="text-lg capitalize">
                        {category} Notifications
                      </CardTitle>
                    </div>
                    <Switch
                      checked={settings.enabled}
                      onCheckedChange={() => handleCategoryToggle(category as NotificationType)}
                    />
                  </div>
                </CardHeader>
                {settings.enabled && (
                  <CardContent className="space-y-4">
                    {/* Channels for this category */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Delivery Channels
                      </Label>
                      <div className="flex gap-2">
                        {(['in_app', 'email', 'sms', 'push'] as NotificationChannel[]).map(channel => (
                          <Button
                            key={channel}
                            size="sm"
                            variant={settings.channels.includes(channel) ? 'default' : 'outline'}
                            onClick={() => handleCategoryChannelToggle(category as NotificationType, channel)}
                            disabled={!preferences.channels[channel]}
                          >
                            {getChannelIcon(channel)}
                            <span className="ml-2 capitalize">{channel.replace('_', ' ')}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Priority levels */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Notify me for priorities
                      </Label>
                      <div className="flex gap-2">
                        {(['low', 'medium', 'high', 'urgent'] as NotificationPriority[]).map(priority => (
                          <Badge
                            key={priority}
                            variant={settings.priorities.includes(priority) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => handlePriorityToggle(category as NotificationType, priority)}
                          >
                            {priority}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Immediate notifications */}
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <Label className="text-sm">
                        Send immediately for urgent priority (bypass quiet hours)
                      </Label>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quiet Hours</CardTitle>
                  <CardDescription>
                    Pause non-urgent notifications during specific hours
                  </CardDescription>
                </div>
                <Switch
                  checked={preferences.quietHours?.enabled}
                  onCheckedChange={handleQuietHoursToggle}
                />
              </div>
            </CardHeader>
            {preferences.quietHours?.enabled && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={preferences.quietHours.startTime}
                      onChange={(e) => {
                        setPreferences(prev => ({
                          ...prev,
                          quietHours: {
                            ...prev.quietHours!,
                            startTime: e.target.value
                          }
                        }));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={preferences.quietHours.endTime}
                      onChange={(e) => {
                        setPreferences(prev => ({
                          ...prev,
                          quietHours: {
                            ...prev.quietHours!,
                            endTime: e.target.value
                          }
                        }));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={preferences.quietHours.timezone}
                    onValueChange={(value) => {
                      setPreferences(prev => ({
                        ...prev,
                        quietHours: {
                          ...prev.quietHours!,
                          timezone: value
                        }
                      }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                      <SelectItem value="Australia/Melbourne">Melbourne (AEDT)</SelectItem>
                      <SelectItem value="Australia/Brisbane">Brisbane (AEST)</SelectItem>
                      <SelectItem value="Australia/Perth">Perth (AWST)</SelectItem>
                      <SelectItem value="Australia/Adelaide">Adelaide (ACDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="exclude-urgent"
                    checked={preferences.quietHours.excludeUrgent}
                    onCheckedChange={(checked) => {
                      setPreferences(prev => ({
                        ...prev,
                        quietHours: {
                          ...prev.quietHours!,
                          excludeUrgent: checked
                        }
                      }));
                      setHasChanges(true);
                    }}
                  />
                  <Label htmlFor="exclude-urgent">
                    Still send urgent notifications during quiet hours
                  </Label>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        {/* Email Digest Tab */}
        <TabsContent value="digest">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Digest</CardTitle>
                  <CardDescription>
                    Receive a summary of notifications via email
                  </CardDescription>
                </div>
                <Switch
                  checked={preferences.emailDigest?.enabled}
                  onCheckedChange={handleEmailDigestToggle}
                />
              </div>
            </CardHeader>
            {preferences.emailDigest?.enabled && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={preferences.emailDigest.frequency}
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') => {
                      setPreferences(prev => ({
                        ...prev,
                        emailDigest: {
                          ...prev.emailDigest!,
                          frequency: value
                        }
                      }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="digest-time">Delivery Time</Label>
                  <Input
                    id="digest-time"
                    type="time"
                    value={preferences.emailDigest.time}
                    onChange={(e) => {
                      setPreferences(prev => ({
                        ...prev,
                        emailDigest: {
                          ...prev.emailDigest!,
                          time: e.target.value
                        }
                      }));
                      setHasChanges(true);
                    }}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Include notification types
                  </Label>
                  <div className="space-y-2">
                    {(['compliance', 'billing', 'job', 'system', 'custom'] as NotificationType[]).map(type => (
                      <div key={type} className="flex items-center gap-2">
                        <Switch
                          checked={preferences.emailDigest.includeTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            setPreferences(prev => {
                              const types = checked
                                ? [...prev.emailDigest!.includeTypes, type]
                                : prev.emailDigest!.includeTypes.filter(t => t !== type);
                              return {
                                ...prev,
                                emailDigest: {
                                  ...prev.emailDigest!,
                                  includeTypes: types
                                }
                              };
                            });
                            setHasChanges(true);
                          }}
                        />
                        <Label className="capitalize">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">About Notification Preferences</p>
              <p className="text-blue-700 mt-1">
                These settings control how you receive notifications across all devices. 
                Urgent compliance and billing notifications may override some preferences 
                to ensure critical information reaches you on time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}