'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn,
  AlertCircle,
  ArrowLeft,
  Shield,
  Sparkles,
  CheckCircle,
  Fingerprint,
  Key,
  Mail
} from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

export default function ContractorLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'sso'>('credentials');
  const magneticButtonRef = useMagneticEffect({ strength: 0.3 });
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Particle effect for premium feel
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 3 + 2 + 's';
      particle.style.opacity = String(Math.random() * 0.5);
      document.getElementById('particle-container')?.appendChild(particle);
      
      setTimeout(() => particle.remove(), 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Enhanced demo credentials with role-based access
      const validCredentials = [
        { username: 'demo', password: 'Demo123!', role: 'contractor', tier: 'premium' },
        { username: 'admin', password: 'Admin123!', role: 'admin', tier: 'enterprise' },
        { username: 'tech', password: 'Tech123!', role: 'technician', tier: 'standard' }
      ];

      const user = validCredentials.find(
        cred => cred.username === formData.username && cred.password === formData.password
      );

      if (user) {
        // Store enhanced session with more details
        const sessionData = {
          id: `${user.role}-${Date.now()}`,
          username: user.username,
          companyName: `${user.username.charAt(0).toUpperCase() + user.username.slice(1)} Restoration Services`,
          email: `${user.username}@nrp-crm.com`,
          role: user.role,
          tier: user.tier,
          isDemo: true,
          loginTime: new Date().toISOString(),
          permissions: getPermissionsByRole(user.role),
          theme: 'dark'
        };
        
        localStorage.setItem('contractorAuth', JSON.stringify(sessionData));
        if (rememberMe) {
          localStorage.setItem('rememberedUser', formData.username);
        }
        
        // Smooth transition to dashboard
        document.body.style.opacity = '0';
        setTimeout(() => {
          router.push('/contractor/dashboard');
        }, 300);
        return;
      }

      // Fallback to API authentication
      const response = await fetch('/api/contractor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('contractorAuth', JSON.stringify(data));
        router.push('/contractor/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid username or password. Try demo/Demo123!');
      // Shake animation on error
      const form = document.getElementById('login-form');
      form?.classList.add('shake');
      setTimeout(() => form?.classList.remove('shake'), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionsByRole = (role: string) => {
    const permissions: Record<string, string[]> = {
      admin: ['all'],
      contractor: ['jobs.view', 'jobs.edit', 'invoices.view', 'invoices.create', 'reports.view'],
      technician: ['jobs.view', 'jobs.update', 'equipment.view']
    };
    return permissions[role] || [];
  };

  const handleSSOLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate SSO redirect
    setTimeout(() => {
      alert(`SSO login with ${provider} would redirect to authentication provider`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Animated background mesh */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-centre [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      
      {/* Floating particles */}
      <div id="particle-container" className="absolute inset-0 overflow-hidden">
        <style jsx>{`
          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            animation: float-up linear infinite;
          }
          
          @keyframes float-up {
            from {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            to {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          .shake {
            animation: shake 0.5s;
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
        `}</style>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative z-10 flex min-h-screen items-centre justify-centre px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo and header */}
          <div className="text-centre mb-8">
            <div className="inline-flex items-centre justify-centre w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-4 transform hover:scale-110 transition-transform">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              NRP Contractor Portal
            </h1>
            <p className="text-gray-300">
              National Restoration Platform CRM
            </p>
          </div>

          {/* Login method tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('credentials')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMethod === 'credentials'
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Key className="inline h-4 w-4 mr-2" />
              Credentials
            </button>
            <button
              onClick={() => setLoginMethod('sso')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMethod === 'sso'
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Fingerprint className="inline h-4 w-4 mr-2" />
              SSO Login
            </button>
          </div>

          {/* Main login card */}
          <div className="glass-card backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            {loginMethod === 'credentials' ? (
              <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Username field */}
                <div className="relative group">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-centre pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colours" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="relative group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-centre pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colours" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="block w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-centre text-gray-400 hover:text-white transition-colours"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me & forgot password */}
                <div className="flex items-centre justify-between">
                  <label className="flex items-centre cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colours">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/contractor/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colours"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start backdrop-blur-sm">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200">{error}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  ref={magneticButtonRef as any}
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                >
                  <span className="relative z-10 flex items-centre justify-centre">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>

                {/* Demo credentials hint */}
                <div className="text-centre">
                  <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
                  <div className="inline-flex items-centre gap-2 px-3 py-1 bg-white/5 rounded-lg backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 text-yellow-400" />
                    <code className="text-xs text-gray-300">demo / Demo123!</code>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm text-centre mb-6">
                  Sign in with your organisation's identity provider
                </p>
                
                {/* SSO provider buttons */}
                <button
                  onClick={() => handleSSOLogin('Microsoft')}
                  disabled={isLoading}
                  className="w-full flex items-centre justify-centre gap-3 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all disabled:opacity-50"
                >
                  <Shield className="h-5 w-5" />
                  Continue with Microsoft
                </button>
                
                <button
                  onClick={() => handleSSOLogin('Google')}
                  disabled={isLoading}
                  className="w-full flex items-centre justify-centre gap-3 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all disabled:opacity-50"
                >
                  <Mail className="h-5 w-5" />
                  Continue with Google Workspace
                </button>
                
                <button
                  onClick={() => handleSSOLogin('SAML')}
                  disabled={isLoading}
                  className="w-full flex items-centre justify-centre gap-3 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all disabled:opacity-50"
                >
                  <Key className="h-5 w-5" />
                  SAML 2.0 SSO
                </button>
              </div>
            )}
          </div>

          {/* Footer links */}
          <div className="mt-6 text-centre space-y-2">
            <Link
              href="/contractor/register"
              className="text-sm text-gray-300 hover:text-white transition-colours block"
            >
              Don't have an account? <span className="text-blue-400">Register as a contractor</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-centre text-sm text-gray-400 hover:text-white transition-colours"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to main site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}