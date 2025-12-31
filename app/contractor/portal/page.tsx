'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ContractorPortalPage() {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status === 'authenticated') {
    router.push('/dashboard/contractor');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Contractor Portal</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to access your dashboard, onboarding checklist, and training modules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-black" onClick={() => void signIn()}>
            Sign In
          </Button>
          <Button asChild variant="outline" className="w-full border-gray-700 text-gray-100 hover:bg-gray-800">
            <Link href="/contractor/join">Create a contractor account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

