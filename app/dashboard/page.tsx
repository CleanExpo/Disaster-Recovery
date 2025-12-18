'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="h-4 w-4 animate-spin text-[#00BFA6]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Redirect to appropriate dashboard based on user type
  useEffect(() => {
    if (user.userType === 'CONTRACTOR') {
      router.push('/dashboard/contractor');
    } else {
      router.push('/dashboard/client');
    }
  }, [user.userType, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
