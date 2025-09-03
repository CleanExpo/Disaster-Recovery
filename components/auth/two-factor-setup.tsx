'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Smartphone, Mail, Key, QrCode, Copy, 
  Check, AlertTriangle, Loader2, RefreshCw, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface TwoFactorSetupProps {
  userId: string;
  userEmail: string;
  userPhone?: string;
  onComplete?: () => void;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  userId,
  userEmail,
  userPhone,
  onComplete
}) => {
  const [method, setMethod] = useState<'app' | 'sms' | 'email'>('app');
  const [step, setStep] = useState<'choose' | 'setup' | 'verify' | 'backup'>('choose');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // App-based 2FA state
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  // Verification state
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userPhone || '');
  const [emailAddress, setEmailAddress] = useState(userEmail);

  // Setup authenticator app
  const setupAuthenticatorApp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, method: 'app' })
      });

      if (!response.ok) {
        throw new Error('Failed to setup 2FA');
      }

      const data = await response.json();
      setQrCode(data.qrCodeUrl);
      setSecret(data.secret);
      setBackupCodes(data.backupCodes);
      setStep('setup');

    } catch (err) {
      console.error('2FA setup failed:', err);
      setError('Failed to setup 2FA. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Send SMS verification code
  const sendSMSCode = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phoneNumber })
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }

      setStep('verify');
      toast.success('Verification code sent to your phone');

    } catch (err) {
      console.error('SMS send failed:', err);
      setError('Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  // Send email verification code
  const sendEmailCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email: emailAddress })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStep('verify');
      toast.success('Verification code sent to your email');

    } catch (err) {
      console.error('Email send failed:', err);
      setError('Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify code and enable 2FA
  const verifyAndEnable = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          method,
          code: verificationCode,
          contactInfo: method === 'sms' ? phoneNumber : method === 'email' ? emailAddress : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      
      if (data.backupCodes) {
        setBackupCodes(data.backupCodes);
        setStep('backup');
      } else {
        toast.success('2FA successfully enabled!');
        onComplete?.();
      }

    } catch (err) {
      console.error('Verification failed:', err);
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  // Download backup codes
  const downloadBackupCodes = () => {
    const content = `NRP Disaster Recovery - 2FA Backup Codes\n` +
      `Generated: ${new Date().toLocaleString()}\n\n` +
      `Keep these codes safe. Each code can only be used once.\n\n` +
      backupCodes.join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nrp-2fa-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle method selection
  const handleMethodSelect = (selectedMethod: 'app' | 'sms' | 'email') => {
    setMethod(selectedMethod);
    setError(null);
    
    if (selectedMethod === 'app') {
      setupAuthenticatorApp();
    } else if (selectedMethod === 'sms') {
      setStep('setup');
    } else if (selectedMethod === 'email') {
      setStep('setup');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <CardTitle>Two-Factor Authentication Setup</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Method */}
          {step === 'choose' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-600">
                Choose your preferred 2FA method:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleMethodSelect('app')}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <Smartphone className="w-12 h-12 mx-auto text-blue-600" />
                    <h3 className="font-semibold">Authenticator App</h3>
                    <p className="text-sm text-gray-600">
                      Use an app like Google Authenticator or Authy
                    </p>
                    <Badge variant="default">Most Secure</Badge>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleMethodSelect('sms')}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <Mail className="w-12 h-12 mx-auto text-green-600" />
                    <h3 className="font-semibold">SMS</h3>
                    <p className="text-sm text-gray-600">
                      Receive codes via text message
                    </p>
                    <Badge variant="secondary">Convenient</Badge>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleMethodSelect('email')}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <Mail className="w-12 h-12 mx-auto text-purple-600" />
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-gray-600">
                      Receive codes via email
                    </p>
                    <Badge variant="secondary">Easy Setup</Badge>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 2: Setup */}
          {step === 'setup' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {method === 'app' && (
                <>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Scan QR Code</h3>
                    <p className="text-sm text-gray-600">
                      Scan this QR code with your authenticator app:
                    </p>
                    
                    <div className="flex justify-center p-4 bg-white rounded-lg">
                      {qrCode && (
                        <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Or enter this code manually:
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                          {secret}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(secret)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label htmlFor="verification-code">
                      Enter code from your authenticator app
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="verification-code"
                        type="text"
                        inputMode="numeric"
                        placeholder="000000"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                      />
                      <Button 
                        onClick={verifyAndEnable}
                        disabled={isLoading || verificationCode.length !== 6}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Verify & Enable'
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {method === 'sms' && (
                <div className="space-y-4">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+61 400 000 000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button onClick={sendSMSCode} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {method === 'email' && (
                <div className="space-y-4">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      disabled
                    />
                    <Button onClick={sendEmailCode} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Verify */}
          {step === 'verify' && (method === 'sms' || method === 'email') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  A verification code has been sent to your {method === 'sms' ? 'phone' : 'email'}.
                  Enter it below to enable 2FA.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <Label htmlFor="verify-code">Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="verify-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                  <Button 
                    onClick={verifyAndEnable}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => method === 'sms' ? sendSMSCode() : sendEmailCode()}
                  disabled={isLoading}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Code
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Backup Codes */}
          {step === 'backup' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                <Check className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  2FA has been successfully enabled!
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Backup Codes</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Save these backup codes in a safe place. You can use them to access your account if you lose your 2FA device.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>{code}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(backupCodes.join('\n'))}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Codes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadBackupCodes}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <Alert>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    Each backup code can only be used once. When you use all codes, you'll need to generate new ones.
                  </AlertDescription>
                </Alert>

                <Button onClick={onComplete} className="w-full">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};