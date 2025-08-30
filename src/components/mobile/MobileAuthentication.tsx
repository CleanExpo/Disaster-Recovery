'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Fingerprint,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Scan,
  Key,
  LogIn,
  UserPlus,
  RefreshCw,
  Clock,
  Wifi,
  WifiOff,
  Camera
} from 'lucide-react';
import type { 
  MobileUser, 
  MobileAuthSettings, 
  DeviceInfo 
} from '@/types/mobile-app';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  biometricAvailable: boolean;
  networkStatus: 'online' | 'offline';
}

export default function MobileAuthentication() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    biometricAvailable: true,
    networkStatus: 'online'
  });

  const [authMethod, setAuthMethod] = useState<'biometric' | 'credentials' | 'pin'>('credentials');
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    pin: ''
  });

  const mockAuthSettings: MobileAuthSettings = {
    biometric: {
      enabled: true,
      type: 'faceId',
      lastUsed: new Date('2024-03-15T10:30:00')
    },
    twoFactor: {
      enabled: true,
      method: 'totp'
    },
    pin: {
      enabled: true,
      length: 6
    },
    sessionTimeout: 30,
    requireAuthOnLaunch: true
  };

  const authMethodIcons = {
    biometric: <Fingerprint className="w-8 h-8" />,
    credentials: <Mail className="w-8 h-8" />,
    pin: <Key className="w-8 h-8" />
  };

  const handleBiometricAuth = () => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    setTimeout(() => {
      setAuthState({
        ...authState,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    }, 1500);
  };

  const handleCredentialAuth = () => {
    if (!credentials.email || !credentials.password) {
      setAuthState({
        ...authState,
        error: 'Please enter email and password'
      });
      return;
    }

    setAuthState({ ...authState, isLoading: true, error: null });
    
    setTimeout(() => {
      if (mockAuthSettings.twoFactor.enabled && !twoFactorCode) {
        setAuthState({
          ...authState,
          isLoading: false,
          error: 'Please enter 2FA code'
        });
      } else {
        setAuthState({
          ...authState,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      }
    }, 1500);
  };

  const handlePinAuth = () => {
    if (credentials.pin.length !== mockAuthSettings.pin.length) {
      setAuthState({
        ...authState,
        error: `PIN must be ${mockAuthSettings.pin.length} digits`
      });
      return;
    }

    setAuthState({ ...authState, isLoading: true, error: null });
    
    setTimeout(() => {
      setAuthState({
        ...authState,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    }, 1000);
  };

  const SecurityFeatures = () => (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Security Features</h3>
      
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">End-to-End Encryption</p>
            <p className="text-xs text-gray-500">AES-256 encryption for all data</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Fingerprint className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Biometric Authentication</p>
            <p className="text-xs text-gray-500">Face ID / Touch ID support</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Key className="w-5 h-5 text-purple-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
            <p className="text-xs text-gray-500">TOTP, SMS, or Email verification</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Session Management</p>
            <p className="text-xs text-gray-500">Auto-logout after {mockAuthSettings.sessionTimeout} minutes</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          {authState.networkStatus === 'online' ? (
            <Wifi className="w-5 h-5 text-green-500 mt-0.5" />
          ) : (
            <WifiOff className="w-5 h-5 text-gray-400 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Offline Mode</p>
            <p className="text-xs text-gray-500">
              {authState.networkStatus === 'online' ? 'Connected' : 'Working offline'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const AuthMethodSelector = () => (
    <div className="flex justify-center space-x-4 mb-6">
      {Object.entries(authMethodIcons).map(([method, icon]) => (
        <button
          key={method}
          onClick={() => setAuthMethod(method as typeof authMethod)}
          className={`p-4 rounded-xl transition-all ${
            authMethod === method
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          disabled={method === 'biometric' && !authState.biometricAvailable}
        >
          {icon}
        </button>
      ))}
    </div>
  );

  const BiometricAuthView = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
        <Scan className="w-20 h-20 text-white" />
      </div>
      
      <div>
        <h3 erbaum="text-lg font-semibold text-gray-900">
          Authenticate with {mockAuthSettings.biometric.type === 'faceId' ? 'Face ID' : 'Touch ID'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Look at your device to continue
        </p>
      </div>

      <button
        onClick={handleBiometricAuth}
        disabled={authState.isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colours"
      >
        {authState.isLoading ? 'Authenticating...' : 'Authenticate'}
      </button>

      <button
        onClick={() => setAuthMethod('credentials')}
        className="text-sm text-blue-600 hover:text-blue-700"
      >
        Use email and password instead
      </button>
    </div>
  );

  const CredentialsAuthView = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contractor@example.com"
          />
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mockAuthSettings.twoFactor.enabled && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Two-Factor Code
          </label>
          <div className="relative">
            <input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="000000"
              maxLength={6}
            />
            <Smartphone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberDevice"
          checked={rememberDevice}
          onChange={(e) => setRememberDevice(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="rememberDevice" className="ml-2 text-sm text-gray-600">
          Remember this device for 30 days
        </label>
      </div>

      <button
        onClick={handleCredentialAuth}
        disabled={authState.isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colours"
      >
        {authState.isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="flex justify-between text-sm">
        <button className="text-blue-600 hover:text-blue-700">
          Forgot password?
        </button>
        <button className="text-blue-600 hover:text-blue-700">
          Create account
        </button>
      </div>
    </div>
  );

  const PinAuthView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">Enter your PIN</h3>
        <p className="text-sm text-gray-500 mt-1">
          Enter your {mockAuthSettings.pin.length}-digit PIN to continue
        </p>
      </div>

      <div className="relative">
        <input
          type={showPin ? 'text' : 'password'}
          value={credentials.pin}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= mockAuthSettings.pin.length) {
              setCredentials({ ...credentials, pin: value });
            }
          }}
          className="w-full px-4 py-4 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="••••••"
          maxLength={mockAuthSettings.pin.length}
        />
        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
        >
          {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: mockAuthSettings.pin.length }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colours ${
              i < credentials.pin.length ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <button
        onClick={handlePinAuth}
        disabled={authState.isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colours"
      >
        {authState.isLoading ? 'Verifying...' : 'Continue'}
      </button>

      <button
        onClick={() => setAuthMethod('credentials')}
        className="w-full text-sm text-blue-600 hover:text-blue-700"
      >
        Use email and password instead
      </button>
    </div>
  );

  if (authState.isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Successful
          </h2>
          <p className="text-gray-600 mb-6">
            You have been securely authenticated
          </p>
          <button
            onClick={() => setAuthState({ ...authState, isAuthenticated: false })}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mobile Authentication</h1>
        <p className="text-gray-600 mt-2">
          Secure multi-factor authentication for field technicians
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <AuthMethodSelector />
            
            {authState.error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{authState.error}</p>
              </div>
            )}

            {authMethod === 'biometric' && <BiometricAuthView />}
            {authMethod === 'credentials' && <CredentialsAuthView />}
            {authMethod === 'pin' && <PinAuthView />}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Security Tip</h3>
            <p className="text-sm text-blue-700">
              Enable biometric authentication for quick and secure access to your account. 
              Your biometric data is stored securely on your device and never transmitted.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <SecurityFeatures />

          <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Device Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Platform:</span>
                <span className="text-gray-900">iOS 17.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Device:</span>
                <span className="text-gray-900">iPhone 15 Pro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">App Version:</span>
                <span className="text-gray-900">2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Biometric:</span>
                <span className="text-gray-900">Face ID</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Network:</span>
                <span className={authState.networkStatus === 'online' ? 'text-green-600' : 'text-gray-500'}>
                  {authState.networkStatus === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Successful login</p>
                  <p className="text-xs text-gray-500">Today at 9:30 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">2FA code requested</p>
                  <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RefreshCw className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Password changed</p>
                  <p className="text-xs text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}