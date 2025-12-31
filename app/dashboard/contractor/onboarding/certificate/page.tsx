'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ExternalLink } from 'lucide-react';

interface CertificateResponse {
  success: boolean;
  certificate?: {
    html: string;
    template: { path: string; sha256: string };
  };
  error?: string;
  message?: string;
}

export default function ContractorCertificatePage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState<CertificateResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/onboarding/certificate', { cache: 'no-store' });
        const data = (await res.json()) as CertificateResponse;
        setPayload(data);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      void load();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Certificate</CardTitle>
            <CardDescription>Sign in to view your certificate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void signIn()} className="w-full" size="lg">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading certificate…
          </CardContent>
        </Card>
      </div>
    );
  }

  const html = payload?.certificate?.html ?? null;

  if (!payload?.success || !html) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Certificate unavailable</CardTitle>
            <CardDescription>{payload?.message || payload?.error || 'Complete training to unlock your certificate.'}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl space-y-3">
      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          onClick={() => {
            const w = window.open('', '_blank', 'noopener,noreferrer');
            if (!w) return;
            w.document.open();
            w.document.write(html);
            w.document.close();
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open fullscreen
        </Button>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <iframe title="NRP Certificate" sandbox="allow-same-origin" srcDoc={html} className="w-full h-[75vh] bg-white" />
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Template: {payload.certificate?.template.path} · sha256 {payload.certificate?.template.sha256}
      </p>
    </div>
  );
}

