'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EnhancedDashboard } from '@/components/contractor/dashboard/EnhancedDashboard';
import { 
  LogOut, 
  Shield, 
  AlertTriangle,
  Building2
} from 'lucide-react';

export default function ContractorDashboardPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('contractorAuth');
    if (!authData) {
      router.push('/contractor/login');
      return;
    }

    try {
      const parsed = JSON.parse(authData);
      setAuth(parsed);
      setIsLoading(false);
    } catch (error) {
      console.error('Invalid auth data:', error);
      localStorage.removeItem('contractorAuth');
      router.push('/contractor/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('contractorAuth');
    router.push('/contractor/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-xl font-bold text-gray-900">Contractor Portal</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {auth.isDemo && (
                <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Demo Mode
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-700">
                <Shield className="h-4 w-4 mr-2 text-gray-400" />
                <span className="mr-2">Logged in as:</span>
                <span className="font-semibold">{auth.companyName || auth.username}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Mode Notice */}
      {auth.isDemo && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Demo Mode:</strong> You're viewing a demonstration of the Contractor Portal. 
                  Data shown is for testing purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="w-full">
        <EnhancedDashboard />
      </div>
    </div>
  );
}