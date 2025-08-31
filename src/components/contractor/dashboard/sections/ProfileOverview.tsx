'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  Edit,
  Save,
  X,
  Upload,
  Shield,
  MapPin,
  Mail,
  Globe,
  Key,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Camera
} from 'lucide-react';

interface ProfileOverviewProps {
  profile: any;
  onUpdate?: (data: any) => void;
}

export function ProfileOverview({ profile, onUpdate }: ProfileOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profile);
  const [activeTab, setActiveTab] = useState('company');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(profile.twoFactorEnabled || false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleSave = async () => {
    try {
      // API call to save profile
      await fetch('/api/contractor/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData)
      });
      
      if (onUpdate) onUpdate(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append('logo', file);

    try {
      const response = await fetch('/api/contractor/upload-logo', {
        method: 'POST',
        body: formData
      });
      const { logoUrl } = await response.json();
      setEditedData({ ...editedData, companyLogo: logoUrl });
    } catch (error) {
      console.error('Failed to upload logo:', error);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    if (!twoFactorEnabled) {
      // Show 2FA setup modal
      console.log('Setting up 2FA...');
    } else {
      // Disable 2FA with confirmation
      if (confirm('Are you sure you want to disable two-factor authentication?')) {
        setTwoFactorEnabled(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
              {editedData.companyLogo ? (
                <img src={editedData.companyLogo} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <Building2 className="h-10 w-10 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer">
                <Camera className="h-3 w-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{editedData.companyName}</h2>
            <p className="text-gray-600">ABN: {editedData.abn}</p>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Company Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Company Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.companyName}
                onChange={(e) => setEditedData({ ...editedData, companyName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p className="font-medium">{profile.companyName}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">ABN</label>
            <p className="font-medium">{profile.abn}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editedData.email}
                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p className="font-medium">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.phone}
                onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p className="font-medium">{profile.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">
                  {twoFactorEnabled ? 'Enabled - Your account is secured' : 'Add an extra layer of security'}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle2FA}
              className={`px-4 py-2 rounded ${
                twoFactorEnabled
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-600">Last changed 30 days ago</p>
              </div>
            </div>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Setup Two-Factor Authentication</h3>
            
            <div className="text-center mb-6">
              <div className="bg-gray-100 p-4 rounded inline-block">
                <div className="w-48 h-48 bg-white border-2 border-gray-300">
                  {/* QR Code would go here */}
                  <p className="text-sm text-gray-500 mt-20">QR Code</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Scan this QR code with your authenticator app
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full px-3 py-2 border rounded mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTwoFactorEnabled(true);
                  setShow2FASetup(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Verify & Enable
              </button>
              <button
                onClick={() => setShow2FASetup(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;