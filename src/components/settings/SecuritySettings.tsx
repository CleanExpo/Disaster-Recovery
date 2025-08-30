'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Monitor,
  LogOut,
  Info,
  Copy,
  Download,
  QrCode,
  HelpCircle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type {
  SecuritySettings,
  SecurityQuestion,
  TrustedDevice,
  LoginHistory,
  PasswordStrength,
  PasswordPolicy
} from '@/types/user-settings';
import { DEFAULT_PASSWORD_POLICY, SECURITY_QUESTIONS } from '@/types/user-settings';

// Mock security data
const mockSecuritySettings: SecuritySettings = {
  userId: 'user-1',
  passwordLastChanged: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  passwordExpiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
  twoFactorEnabled: false,
  securityQuestions: [],
  trustedDevices: [
    {
      id: 'device-1',
      deviceName: 'Chrome on Windows',
      deviceType: 'desktop',
      browser: 'Chrome',
      lastUsed: new Date(),
      addedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ipAddress: '203.45.67.89',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
    }
  ],
  loginHistory: [
    {
      id: 'login-1',
      timestamp: new Date(),
      ipAddress: '203.45.67.89',
      userAgent: 'Chrome/120.0.0.0',
      location: 'Sydney, Australia',
      deviceType: 'Desktop',
      success: true
    },
    {
      id: 'login-2',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      ipAddress: '203.45.67.89',
      userAgent: 'Mobile Safari',
      location: 'Sydney, Australia',
      deviceType: 'Mobile',
      success: true
    }
  ],
  sessionTimeout: 30,
  requirePasswordChange: false,
  accountLocked: false,
  failedLoginAttempts: 0
};

export function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>(mockSecuritySettings);
  const [activeTab, setActiveTab] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [totpCode, setTotpCode] = useState('');
  
  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    level: 'very-weak',
    feedback: [],
    suggestions: [],
    crackTime: '',
    isValid: false
  });

  // Security questions state
  const [securityQuestions, setSecurityQuestions] = useState<{
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
    question3: string;
    answer3: string;
  }>({
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: ''
  });

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    const policy = DEFAULT_PASSWORD_POLICY;
    let score = 0;
    const feedback: string[] = [];
    const suggestions: string[] = [];

    // Length check
    if (password.length >= policy.minLength) {
      score += 1;
    } else {
      feedback.push(`Password must be at least ${policy.minLength} characters`);
    }

    // Uppercase check
    if (policy.requireUppercase && /[A-Z]/.test(password)) {
      score += 1;
    } else if (policy.requireUppercase) {
      feedback.push('Include at least one uppercase letter');
    }

    // Lowercase check
    if (policy.requireLowercase && /[a-z]/.test(password)) {
      score += 1;
    } else if (policy.requireLowercase) {
      feedback.push('Include at least one lowercase letter');
    }

    // Number check
    if (policy.requireNumbers && /\d/.test(password)) {
      score += 1;
    } else if (policy.requireNumbers) {
      feedback.push('Include at least one number');
    }

    // Special character check
    if (policy.requireSpecialChars && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else if (policy.requireSpecialChars) {
      feedback.push('Include at least one special character');
    }

    const levels: PasswordStrength['level'][] = ['very-weak', 'weak', 'fair', 'strong', 'very-strong'];
    const level = levels[Math.min(score - 1, 4)] || 'very-weak';

    return {
      score,
      level,
      feedback,
      suggestions,
      crackTime: score < 3 ? 'Instantly' : score < 4 ? 'Minutes' : 'Years',
      isValid: feedback.length === 0
    };
  };

  const handlePasswordChange = async () => {
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please ensure both password fields match.',
        variant: 'destructive'
      });
      return;
    }

    if (!passwordStrength.isValid) {
      toast({
        title: 'Weak Password',
        description: 'Please choose a stronger password that meets all requirements.',
        variant: 'destructive'
      });
      return;
    }

    try {
      // In production, verify current password and update
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSettings({
        ...settings,
        passwordLastChanged: new Date(),
        passwordExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      });
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully changed.'
      });
    } catch (error) {
      toast({
        title: 'Password Change Failed',
        description: 'Unable to change password. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleEnable2FA = async () => {
    // Generate QR code and backup codes
    setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/NRP:john.doe@example.com?secret=JBSWY3DPEHPK3PXP&issuer=NRP');
    setBackupCodes([
      'ABCD-1234-EFGH',
      'IJKL-5678-MNOP',
      'QRST-9012-UVWX',
      'YZAB-3456-CDEF',
      'GHIJ-7890-KLMN',
      'OPQR-1234-STUV',
      'WXYZ-5678-ABCD',
      'EFGH-9012-IJKL'
    ]);
    setIs2FADialogOpen(true);
  };

  const handleConfirm2FA = async () => {
    if (totpCode.length !== 6) {
      toast({
        title: 'Invalid Code',
        description: 'Please enter a 6-digit verification code.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings({
        ...settings,
        twoFactorEnabled: true,
        twoFactorMethod: 'totp'
      });
      
      setIs2FADialogOpen(false);
      setTotpCode('');
      
      toast({
        title: '2FA Enabled',
        description: 'Two-factor authentication has been successfully enabled.'
      });
    } catch (error) {
      toast({
        title: '2FA Setup Failed',
        description: 'Unable to enable two-factor authentication.',
        variant: 'destructive'
      });
    }
  };

  const handleDisable2FA = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings({
        ...settings,
        twoFactorEnabled: false,
        twoFactorMethod: undefined
      });
      
      toast({
        title: '2FA Disabled',
        description: 'Two-factor authentication has been disabled.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to disable two-factor authentication.',
        variant: 'destructive'
      });
    }
  };

  const handleRemoveDevice = async (deviceId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings({
        ...settings,
        trustedDevices: settings.trustedDevices?.filter(d => d.id !== deviceId)
      });
      
      toast({
        title: 'Device Removed',
        description: 'The device has been removed from trusted devices.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to remove device.',
        variant: 'destructive'
      });
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.level) {
      case 'very-strong': return 'bg-green-600';
      case 'strong': return 'bg-green-500';
      case 'fair': return 'bg-yellow-500';
      case 'weak': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Smartphone className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const daysUntilPasswordExpiry = settings.passwordExpiresAt
    ? Math.ceil((settings.passwordExpiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    : null;

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre gap-2">
            <Shield className="h-5 w-5" />
            Security Overview
          </CardTitle>
          <CardDescription>
            Manage your account security and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Password Status */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-centre justify-between mb-2">
                <Lock className="h-5 w-5 text-gray-500" />
                {daysUntilPasswordExpiry && daysUntilPasswordExpiry < 30 ? (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Expires soon
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-800">
                    Secure
                  </Badge>
                )}
              </div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">
                {daysUntilPasswordExpiry 
                  ? `Expires in ${daysUntilPasswordExpiry} days`
                  : 'No expiry set'}
              </p>
            </div>

            {/* 2FA Status */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-centre justify-between mb-2">
                <Key className="h-5 w-5 text-gray-500" />
                {settings.twoFactorEnabled ? (
                  <Badge className="bg-green-100 text-green-800">
                    Enabled
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800">
                    Disabled
                  </Badge>
                )}
              </div>
              <p className="font-medium">Two-Factor Auth</p>
              <p className="text-sm text-gray-500">
                {settings.twoFactorEnabled 
                  ? `Using ${settings.twoFactorMethod?.toUpperCase()}`
                  : 'Not configured'}
              </p>
            </div>

            {/* Trusted Devices */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-centre justify-between mb-2">
                <Monitor className="h-5 w-5 text-gray-500" />
                <Badge variant="outline">
                  {settings.trustedDevices?.length || 0}
                </Badge>
              </div>
              <p className="font-medium">Trusted Devices</p>
              <p className="text-sm text-gray-500">
                Currently active sessions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="2fa">2FA</TabsTrigger>
          <TabsTrigger value="questions">Security Questions</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password regularly to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => {
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                      setPasswordStrength(calculatePasswordStrength(e.target.value));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {passwordForm.newPassword && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-centre gap-2">
                      <span className="text-sm">Strength:</span>
                      <div className="flex-1">
                        <Progress 
                          value={(passwordStrength.score / 5) * 100} 
                          className={`h-2 ${getPasswordStrengthColor()}`}
                        />
                      </div>
                      <span className="text-sm capitalize">{passwordStrength.level.replace('-', ' ')}</span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="text-sm text-red-600 space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Password must be at least 12 characters and include uppercase, lowercase, numbers, and special characters.
                </AlertDescription>
              </Alert>

              <Button onClick={handlePasswordChange} className="w-full">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2FA Tab */}
        <TabsContent value="2fa">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!settings.twoFactorEnabled ? (
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Two-factor authentication significantly improves your account security by requiring a verification code in addition to your password.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <Button onClick={handleEnable2FA} className="w-full">
                      <Key className="h-4 w-4 mr-2" />
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Two-factor authentication is enabled using {settings.twoFactorMethod?.toUpperCase()}.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate New Backup Codes
                    </Button>
                    <Button variant="destructive" onClick={handleDisable2FA} className="w-full">
                      Disable Two-Factor Authentication
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Questions Tab */}
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Security Questions</CardTitle>
              <CardDescription>
                Set up security questions for account recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  Security questions help verify your identity if you forget your password or need to recover your account.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label>Question 1</Label>
                  <Select
                    value={securityQuestions.question1}
                    onValueChange={(value) => setSecurityQuestions({ ...securityQuestions, question1: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECURITY_QUESTIONS.map((q) => (
                        <SelectItem key={q} value={q}>{q}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    className="mt-2"
                    placeholder="Your answer"
                    value={securityQuestions.answer1}
                    onChange={(e) => setSecurityQuestions({ ...securityQuestions, answer1: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Question 2</Label>
                  <Select
                    value={securityQuestions.question2}
                    onValueChange={(value) => setSecurityQuestions({ ...securityQuestions, question2: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECURITY_QUESTIONS.filter(q => q !== securityQuestions.question1).map((q) => (
                        <SelectItem key={q} value={q}>{q}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    className="mt-2"
                    placeholder="Your answer"
                    value={securityQuestions.answer2}
                    onChange={(e) => setSecurityQuestions({ ...securityQuestions, answer2: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Question 3</Label>
                  <Select
                    value={securityQuestions.question3}
                    onValueChange={(value) => setSecurityQuestions({ ...securityQuestions, question3: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECURITY_QUESTIONS.filter(q => q !== securityQuestions.question1 && q !== securityQuestions.question2).map((q) => (
                        <SelectItem key={q} value={q}>{q}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    className="mt-2"
                    placeholder="Your answer"
                    value={securityQuestions.answer3}
                    onChange={(e) => setSecurityQuestions({ ...securityQuestions, answer3: e.target.value })}
                  />
                </div>
              </div>

              <Button className="w-full">
                Save Security Questions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Trusted Devices</CardTitle>
              <CardDescription>
                Manage devices that have access to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {settings.trustedDevices?.map((device) => (
                  <div key={device.id} className="flex items-centre justify-between p-3 border rounded-lg">
                    <div className="flex items-centre gap-3">
                      {getDeviceIcon(device.deviceType)}
                      <div>
                        <p className="font-medium">{device.deviceName}</p>
                        <p className="text-sm text-gray-500">
                          Last used: {new Date(device.lastUsed).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400">{device.ipAddress}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDevice(device.id)}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="destructive" className="w-full mt-4">
                Sign Out All Other Sessions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>
                Recent login attempts and security events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {settings.loginHistory?.map((login) => (
                  <div key={login.id} className="flex items-centre justify-between p-3 border rounded-lg">
                    <div className="flex items-centre gap-3">
                      {login.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {login.success ? 'Successful login' : 'Failed login attempt'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(login.timestamp).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {login.location} • {login.ipAddress}
                        </p>
                      </div>
                    </div>
                    <Badge variant={login.success ? 'outline' : 'destructive'}>
                      {login.deviceType}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 2FA Setup Dialog */}
      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app or enter the setup key manually.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-centre">
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="2FA QR Code" className="border p-2" />
              )}
            </div>
            
            <div>
              <Label>Manual Setup Key</Label>
              <div className="flex gap-2">
                <Input value="JBSWY3DPEHPK3PXP" readOnly />
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="totpCode">Verification Code</Label>
              <Input
                id="totpCode"
                placeholder="Enter 6-digit code"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                maxLength={6}
              />
            </div>
            
            {backupCodes.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Save these backup codes:</strong>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                    {backupCodes.map((code) => (
                      <div key={code} className="p-1 bg-gray-100 rounded">
                        {code}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Download className="h-3 w-3 mr-1" />
                    Download Codes
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm2FA}>
              Enable 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}