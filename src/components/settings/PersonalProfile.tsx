'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Globe,
  Clock,
  Shield
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type { UserProfile } from '@/types/user-settings';
import { TIMEZONES, DATE_FORMATS } from '@/types/user-settings';

// Mock user data
const mockUserProfile: UserProfile = {
  id: 'user-1',
  email: 'john.doe@example.com',
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John Doe',
  phoneNumber: '+61 412 345 678',
  alternativePhone: '+61 2 9876 5432',
  avatar: '/avatars/john-doe.jpg',
  bio: 'Experienced restoration contractor specialising in water damage and mould remediation.',
  role: {
    id: 'role-contractor',
    name: 'contractor',
    displayName: 'Contractor',
    permissions: ['jobs.view', 'jobs.accept', 'compliance.manage'],
    level: 'contractor'
  },
  companyId: 'company-1',
  companyName: 'Restoration Pros Pty Ltd',
  department: 'Operations',
  position: 'Senior Restoration Specialist',
  employeeId: 'EMP-12345',
  timezone: 'Australia/Sydney',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '12h',
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2024-01-20'),
  lastLoginAt: new Date(),
  emailVerified: true,
  phoneVerified: true
};

export function PersonalProfile() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Validate required fields
      if (!editedProfile.firstName || !editedProfile.lastName || !editedProfile.email || !editedProfile.phoneNumber) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields.',
          variant: 'destructive'
        });
        setIsSaving(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedProfile.email)) {
        toast({
          title: 'Invalid Email',
          description: 'Please enter a valid email address.',
          variant: 'destructive'
        });
        setIsSaving(false);
        return;
      }

      // In production, save to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfile(editedProfile);
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.'
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Avatar image must be less than 5MB.',
        variant: 'destructive'
      });
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP).',
        variant: 'destructive'
      });
      return;
    }

    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-centre md:items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage 
                  src={avatarPreview || profile.avatar || ''} 
                  alt={profile.displayName} 
                />
                <AvatarFallback className="text-2xl">
                  {getInitials(profile.firstName, profile.lastName)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colours"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-centre md:text-left">
              <div className="flex flex-col md:flex-row md:items-centre gap-3 mb-2">
                <h2 className="text-2xl font-bold">{profile.displayName}</h2>
                <div className="flex gap-2 justify-centre md:justify-start">
                  <Badge>{profile.role.displayName}</Badge>
                  {profile.emailVerified && (
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-1">@{profile.username}</p>
              <p className="text-gray-600">{profile.companyName}</p>
              {profile.position && (
                <p className="text-sm text-gray-500 mt-1">
                  {profile.position} • {profile.department}
                </p>
              )}
              {profile.bio && !isEditing && (
                <p className="text-sm text-gray-600 mt-3 max-w-2xl">{profile.bio}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div>
              {!isEditing ? (
                <Button onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Manage your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={isEditing ? editedProfile.firstName : profile.firstName}
                onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={isEditing ? editedProfile.lastName : profile.lastName}
                onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={isEditing ? editedProfile.displayName : profile.displayName}
              onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
              disabled={!isEditing}
            />
            <p className="text-xs text-gray-500 mt-1">
              This is how your name will appear throughout the platform
            </p>
          </div>

          {isEditing && (
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editedProfile.bio || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                placeholder="Tell us about yourself and your expertise..."
                rows={3}
              />
            </div>
          )}

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-centre gap-2">
              <Mail className="h-4 w-4" />
              Contact Information
            </h3>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  disabled={!isEditing}
                  className="flex-1"
                />
                {profile.emailVerified ? (
                  <Badge variant="outline" className="self-centre text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Primary Phone *</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    value={isEditing ? editedProfile.phoneNumber : profile.phoneNumber}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phoneNumber: e.target.value })}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  {profile.phoneVerified && (
                    <Badge variant="outline" className="self-centre text-green-600">
                      <CheckCircle className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="altPhone">Alternative Phone</Label>
                <Input
                  id="altPhone"
                  type="tel"
                  value={isEditing ? (editedProfile.alternativePhone || '') : (profile.alternativePhone || '')}
                  onChange={(e) => setEditedProfile({ ...editedProfile, alternativePhone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-centre gap-2">
              <Building className="h-4 w-4" />
              Company Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profile.companyName}
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Contact admin to change company assignment
                </p>
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={isEditing ? (editedProfile.employeeId || '') : (profile.employeeId || '')}
                  onChange={(e) => setEditedProfile({ ...editedProfile, employeeId: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={isEditing ? (editedProfile.position || '') : (profile.position || '')}
                  onChange={(e) => setEditedProfile({ ...editedProfile, position: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={isEditing ? (editedProfile.department || '') : (profile.department || '')}
                  onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Regional Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-centre gap-2">
              <Globe className="h-4 w-4" />
              Regional Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={isEditing ? editedProfile.timezone : profile.timezone}
                  onValueChange={(value) => setEditedProfile({ ...editedProfile, timezone: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select
                  value={isEditing ? editedProfile.dateFormat : profile.dateFormat}
                  onValueChange={(value) => setEditedProfile({ ...editedProfile, dateFormat: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="dateFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeFormat">Time Format</Label>
                <Select
                  value={isEditing ? editedProfile.timeFormat : profile.timeFormat}
                  onValueChange={(value: '12h' | '24h') => setEditedProfile({ ...editedProfile, timeFormat: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="timeFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre gap-2">
            <Shield className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Username</Label>
              <Input value={profile.username} disabled />
              <p className="text-xs text-gray-500 mt-1">
                Username cannot be changed
              </p>
            </div>
            <div>
              <Label>Role</Label>
              <Input value={profile.role.displayName} disabled />
              <p className="text-xs text-gray-500 mt-1">
                Contact admin to change role
              </p>
            </div>
            <div>
              <Label>Account Created</Label>
              <Input value={formatDate(profile.createdAt)} disabled />
            </div>
            <div>
              <Label>Last Login</Label>
              <Input value={formatDate(profile.lastLoginAt || new Date())} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status Alert */}
      {(!profile.emailVerified || !profile.phoneVerified) && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <strong>Action Required:</strong> Please verify your {
              !profile.emailVerified && !profile.phoneVerified 
                ? 'email address and phone number' 
                : !profile.emailVerified 
                ? 'email address' 
                : 'phone number'
            } to access all platform features.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Add missing import
import { RefreshCw } from 'lucide-react';