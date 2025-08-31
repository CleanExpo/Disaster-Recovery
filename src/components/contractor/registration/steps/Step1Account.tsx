'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Info, Send, CheckCircle, RefreshCw, Lock, AlertCircle, Shield } from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';

interface Step1AccountProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

export function Step1Account({ data, updateData, errors }: Step1AccountProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [mobileVerificationSent, setMobileVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [mobileVerificationCode, setMobileVerificationCode] = useState('');
  const [isCheckingCompanyName, setIsCheckingCompanyName] = useState(false);
  const [companyNameAvailable, setCompanyNameAvailable] = useState<boolean | null>(null);
  const [passwordGenerated, setPasswordGenerated] = useState(false);

  // Initialize with auto-generated password on component mount
  useEffect(() => {
    if (!data.password) {
      generateSecurePassword();
    }
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    const updates: any = {};
    updates[field] = value;
    updateData(updates);
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength (minimum 8 chars, 1 upper, 1 lower, 1 number)
  const validatePassword = (password: string): boolean => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinLength = password.length >= 8;
    return hasUpper && hasLower && hasNumber && hasMinLength;
  };

  // Format international phone number
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Australian mobile if starts with 04 or international format
    if (digits.startsWith('04')) {
      // Australian mobile format: 
      return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (digits.startsWith('614')) {
      // International Australian format: Contact Form
      return '+' + digits.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    }
    return value;
  };

  // Check company name availability
  const checkCompanyNameAvailability = async (companyName: string) => {
    if (companyName.length < 2) return;
    
    setIsCheckingCompanyName(true);
    try {
      const response = await fetch(`/api/contractor/check-company?name=${encodeURIComponent(companyName)}`);
      const result = await response.json();
      setCompanyNameAvailable(result.available);
    } catch (error) {
      console.error('Company name check failed:', error);
    } finally {
      setIsCheckingCompanyName(false);
    }
  };

  // Send verification code
  const sendVerificationCode = async (type: 'email' | 'mobile') => {
    const value = type === 'email' ? data.email : data.mobileNumber;
    
    if (!value) {
      alert(`Please enter your ${type === 'email' ? 'email address' : 'mobile number'} first.`);
      return;
    }

    try {
      const response = await fetch('/api/contractor/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value })
      });
      
      if (response.ok) {
        if (type === 'email') {
          setEmailVerificationSent(true);
          setTimeout(() => setEmailVerificationSent(false), 60000); // Reset after 1 minute
        } else {
          setMobileVerificationSent(true);
          setTimeout(() => setMobileVerificationSent(false), 60000);
        }
      }
    } catch (error) {
      console.error('Failed to send verification:', error);
    }
  };

  // Verify the code
  const verifyCode = async (type: 'email' | 'mobile') => {
    const value = type === 'email' ? data.email : data.mobileNumber;
    const code = type === 'email' ? emailVerificationCode : mobileVerificationCode;
    
    try {
      const response = await fetch('/api/contractor/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value, code })
      });
      
      const result = await response.json();
      if (result.success) {
        if (type === 'email') {
          setEmailVerified(true);
          setEmailVerificationSent(false);
        } else {
          setMobileVerified(true);
          setMobileVerificationSent(false);
        }
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  // Generate secure password
  const generateSecurePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    
    let password = '';
    
    // Ensure at least one of each required type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly (to make it 12 characters total)
    const allChars = uppercase + lowercase + numbers + symbols;
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    handleInputChange('password', password);
    setPasswordGenerated(true);
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Account Security:</strong> Set up your core login credentials. Your email and mobile will be 
          validated for security. Two-factor authentication will be required after initial setup.
        </AlertDescription>
      </Alert>

      {/* Official Email Address */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Official Email Address <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="contact@company.com.au"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {data.email && validateEmail(data.email) && !emailVerified && (
              <Button
                type="button"
                variant="outline"
                onClick={() => sendVerificationCode('email')}
                disabled={emailVerificationSent}
              >
                <Send className="w-4 h-4 mr-2" />
                {emailVerificationSent ? 'Code Sent' : 'Send Code'}
              </Button>
            )}
            {emailVerified && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          
          {/* Email verification code input */}
          {emailVerificationSent && !emailVerified && (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter 6-digit verification code"
                value={emailVerificationCode}
                onChange={(e) => setEmailVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
              <Button
                type="button"
                onClick={() => verifyCode('email')}
                disabled={emailVerificationCode.length !== 6}
              >
                Verify Email
              </Button>
            </div>
          )}
          
          <p className="text-xs text-gray-500">Primary login, notifications, and verification</p>
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Password (Auto-generated) */}
      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={data.password || ''}
                readOnly
                className={`${errors.password ? 'border-red-500' : ''} bg-gray-50`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={generateSecurePassword}
              title="Generate new password"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          
          {passwordGenerated && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <Lock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Important:</strong> This auto-generated password must be changed on first login. 
                Please save it securely now - it will be sent to your email as well.
              </AlertDescription>
            </Alert>
          )}
          
          <p className="text-xs text-gray-500">
            Minimum 8 characters with at least 1 uppercase, 1 lowercase, and 1 number
          </p>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
      </div>

      {/* Mobile Number */}
      <div className="space-y-2">
        <Label htmlFor="mobile">
          Mobile Number <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              id="mobile"
              type="tel"
              placeholder="Contact Form"
              value={data.mobileNumber || ''}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                handleInputChange('mobileNumber', formatted);
              }}
              className={errors.mobileNumber ? 'border-red-500' : ''}
            />
            {data.mobileNumber && data.mobileNumber.replace(/\D/g, '').length >= 10 && !mobileVerified && (
              <Button
                type="button"
                variant="outline"
                onClick={() => sendVerificationCode('mobile')}
                disabled={mobileVerificationSent}
              >
                <Send className="w-4 h-4 mr-2" />
                {mobileVerificationSent ? 'Code Sent' : 'Send Code'}
              </Button>
            )}
            {mobileVerified && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>
          
          {/* Mobile verification code input */}
          {mobileVerificationSent && !mobileVerified && (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter 6-digit SMS code"
                value={mobileVerificationCode}
                onChange={(e) => setMobileVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
              <Button
                type="button"
                onClick={() => verifyCode('mobile')}
                disabled={mobileVerificationCode.length !== 6}
              >
                Verify Mobile
              </Button>
            </div>
          )}
          
          <p className="text-xs text-gray-500">Two-factor authentication and SMS alerts</p>
          {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
        </div>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">
          Company Name <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          <Input
            id="companyName"
            type="text"
            placeholder="Your Business Pty Ltd"
            value={data.companyName || ''}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            onBlur={(e) => checkCompanyNameAvailability(e.target.value)}
            className={errors.companyName ? 'border-red-500' : ''}
          />
          {isCheckingCompanyName && (
            <p className="text-sm text-gray-500">Checking availability...</p>
          )}
          {companyNameAvailable === false && (
            <p className="text-sm text-red-500">
              This company name is already registered on the platform
            </p>
          )}
          {companyNameAvailable === true && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Company name is available
            </p>
          )}
          <p className="text-xs text-gray-500">Identification and display across the platform</p>
          {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
        </div>
      </div>

      {/* Terms and Privacy Policy */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="font-medium">Legal Agreements</h3>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="privacy"
            checked={data.acceptedPrivacy || false}
            onCheckedChange={(checked) => handleInputChange('acceptedPrivacy', checked as boolean)}
          />
          <div className="space-y-1">
            <Label htmlFor="privacy" className="font-normal cursor-pointer">
              I have read and accept the{' '}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                className="text-blue-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              {' '}<span className="text-red-500">*</span>
            </Label>
            {errors.acceptedPrivacy && (
              <p className="text-sm text-red-500">{errors.acceptedPrivacy}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={data.acceptedTerms || false}
            onCheckedChange={(checked) => handleInputChange('acceptedTerms', checked as boolean)}
          />
          <div className="space-y-1">
            <Label htmlFor="terms" className="font-normal cursor-pointer">
              I have read and accept the{' '}
              <a 
                href="/terms-conditions" 
                target="_blank" 
                className="text-blue-600 hover:underline font-medium"
              >
                Terms and Conditions
              </a>
              {' '}<span className="text-red-500">*</span>
            </Label>
            {errors.acceptedTerms && (
              <p className="text-sm text-red-500">{errors.acceptedTerms}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Information */}
      <Alert className="bg-green-50 border-green-200">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Security Features:</strong>
          <ul className="mt-2 ml-4 list-disc text-sm">
            <li>AES-256 encryption for data at rest</li>
            <li>SSL/TLS encryption for data in transit</li>
            <li>Two-factor authentication (2FA) via SMS</li>
            <li>Mandatory password change on first login</li>
            <li>Session timeout after 30 minutes of inactivity</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Validation Summary */}
      {(emailVerified && mobileVerified && data.acceptedTerms && data.acceptedPrivacy && companyNameAvailable) && (
        <Alert className="bg-green-50 border-green-300">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            All requirements met! You can proceed to the next step.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}