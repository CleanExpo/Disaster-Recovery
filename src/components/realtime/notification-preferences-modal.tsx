'use client';

import React, { useState, useEffect } from 'react';
import { Clock, X, Save, Bell } from 'lucide-react';

interface NotificationPreference {
  userId: string;
  bookingNotifications: boolean;
  bookingEmail: boolean;
  bookingSMS: boolean;
  claimNotifications: boolean;
  claimEmail: boolean;
  claimSMS: boolean;
  contractorNotifications: boolean;
  contractorEmail: boolean;
  contractorSMS: boolean;
  chatNotifications: boolean;
  chatEmail: boolean;
  chatSMS: boolean;
  systemNotifications: boolean;
  systemEmail: boolean;
  systemSMS: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  doNotDisturb: boolean;
  unsubscribedChannels: string[];
  updatedAt: Date;
}

interface NotificationPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: NotificationPreference | null;
  onSave?: (preferences: NotificationPreference) => void;
  isLoading?: boolean;
}

export function NotificationPreferencesModal({
  isOpen,
  onClose,
  preferences,
  onSave,
  isLoading = false,
}: NotificationPreferencesModalProps) {
  const [formData, setFormData] = useState<NotificationPreference | null>(preferences);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(preferences);
  }, [preferences]);

  if (!isOpen || !formData) {
    return null;
  }

  const handleToggle = (field: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: !prev[field as keyof typeof prev],
      };
    });
  };

  const handleTimeChange = (field: 'quietHoursStart' | 'quietHoursEnd', value: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave && formData) {
        onSave(formData);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Notification Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-slate-900">Quick Actions</h3>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={formData.doNotDisturb}
                  onChange={() => handleToggle('doNotDisturb')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-slate-700">Do Not Disturb</span>
              </label>
              <span className="text-xs text-slate-500">Silences all notifications</span>
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.quietHoursEnabled}
                  onChange={() => handleToggle('quietHoursEnabled')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="font-semibold text-slate-900">Quiet Hours</span>
                </div>
              </label>
            </div>

            {formData.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-4 ml-7">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.quietHoursStart || '22:00'}
                    onChange={(e) => handleTimeChange('quietHoursStart', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.quietHoursEnd || '08:00'}
                    onChange={(e) => handleTimeChange('quietHoursEnd', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notification Types */}
          <div className="space-y-4">
            {[
              {
                title: 'Booking Notifications',
                key: 'booking',
                channels: ['in-app', 'email', 'sms'],
              },
              {
                title: 'Claim Notifications',
                key: 'claim',
                channels: ['in-app', 'email', 'sms'],
              },
              {
                title: 'Contractor Notifications',
                key: 'contractor',
                channels: ['in-app', 'email', 'sms'],
              },
              {
                title: 'Chat Notifications',
                key: 'chat',
                channels: ['in-app', 'email', 'sms'],
              },
              {
                title: 'System Notifications',
                key: 'system',
                channels: ['in-app', 'email', 'sms'],
              },
            ].map((notificationType) => (
              <div key={notificationType.key} className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-3">{notificationType.title}</h3>
                <div className="space-y-2 ml-4">
                  {notificationType.channels.map((channel) => (
                    <label
                      key={channel}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData[
                            `${notificationType.key}${channel.charAt(0).toUpperCase() + channel.slice(1)}` as keyof NotificationPreference
                          ] as boolean
                        }
                        onChange={() =>
                          handleToggle(
                            `${notificationType.key}${channel.charAt(0).toUpperCase() + channel.slice(1)}`
                          )
                        }
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-slate-700 capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}
