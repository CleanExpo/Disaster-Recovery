'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next/auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Award, Download, Share2, ArrowLeft } from 'lucide-react';

export default function ClientCertificatePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      checkCertificate();
    }
  }, [status]);

  const checkCertificate = async () => {
    try {
      setLoading(true);
      const userId = (session?.user as any)?.id;

      const response = await fetch(`/api/client/onboarding/progress/${userId}`, { cache: 'no-store' });
      const data = await response.json();

      if (data.success) {
        // In production, fetch actual certificate
        // For now, generate placeholder URL
        if (data.progress.completionPercentage >= 100) {
          setCertificateUrl(`/certificates/client-${userId}-${Date.now()}.pdf`);
        }
      }
    } catch (error) {
      console.error('Failed to load certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  if (!certificateUrl) {
    return (
      <div className="container mx-auto py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Not Available</CardTitle>
            <CardDescription>
              Complete all 7 onboarding phases to earn your Prepared Client certificate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard/client/onboarding/checklist')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Checklist
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 max-w-4xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Your NRPG Certificate</h1>
        <p className="text-muted-foreground">
          Congratulations on completing the client onboarding program
        </p>
      </div>

      {/* Certificate Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="aspect-[1.4/1] border-4 border-primary rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 flex items-center justify-center p-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Prepared Client Certificate</h2>
              <p className="text-lg mb-4">{session?.user?.name || 'Valued Client'}</p>
              <Badge className="bg-green-600 text-lg py-2 px-4">
                NRPG Certified
              </Badge>
              <p className="text-sm text-muted-foreground mt-4">
                Completed {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button size="lg" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button size="lg" variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share Certificate
        </Button>
        <Button size="lg" onClick={() => router.push('/dashboard/client')}>
          Go to Dashboard →
        </Button>
      </div>

      {/* Certificate Details */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Certificate ID:</span>
            <span className="font-mono">{certificateUrl?.split('/').pop()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Issued To:</span>
            <span className="font-medium">{session?.user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span>{session?.user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Issue Date:</span>
            <span>{new Date().toLocaleDateString('en-AU')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <Badge className="bg-green-600">Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
