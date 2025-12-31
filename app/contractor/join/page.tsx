'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ContractorJoinPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Join NRPG as a Contractor</CardTitle>
          <CardDescription className="text-gray-400">
            Create your contractor account, complete onboarding, and start receiving matched work.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-black" onClick={() => router.push('/signup?type=contractor')}>
            Create Contractor Account
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button asChild variant="outline" className="w-full border-gray-700 text-gray-100 hover:bg-gray-800">
            <Link href="/login">I already have an account</Link>
          </Button>
          <p className="text-xs text-gray-500">
            After sign-up, complete onboarding steps: profile, NRPG registration, training, and payouts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

