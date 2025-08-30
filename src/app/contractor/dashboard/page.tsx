'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PremiumDashboard from '@/components/contractor/dashboard/PremiumDashboard';

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return <PremiumDashboard />;
}