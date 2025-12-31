'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, ExternalLink } from 'lucide-react';

interface TrainingModuleResponse {
  success: boolean;
  module?: {
    moduleId: string;
    sourcePath: string;
    sha256: string;
    html: string;
  };
  error?: string;
  message?: string;
}

export default function ContractorTrainingModulePage({ params }: { params: { moduleId: string } }) {
  const router = useRouter();
  const { status, data: session } = useSession();
  const contractorId = useMemo(() => (session?.user as any)?.id as string | undefined, [session]);
  const moduleId = useMemo(() => params.moduleId?.toUpperCase?.() ?? params.moduleId, [params.moduleId]);

  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState<TrainingModuleResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await fetch('/api/onboarding/module/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ moduleId }),
        }).catch(() => null);

        const res = await fetch(`/api/training/nrp/module/${moduleId}`, { cache: 'no-store' });
        const data = (await res.json()) as TrainingModuleResponse;
        setPayload(data);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && contractorId) {
      void load();
    }
  }, [contractorId, moduleId, status]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Training Module</CardTitle>
            <CardDescription>Sign in to view training materials.</CardDescription>
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
      <div className="container mx-auto py-8 max-w-5xl">
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading module…
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const html = payload?.module?.html ?? null;

  return (
    <div className="container mx-auto py-6 max-w-6xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {payload?.module?.sourcePath && (
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>{payload.module.moduleId}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">{payload.module.sourcePath}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">sha256 {payload.module.sha256}</span>
          </div>
        )}
      </div>

      {!payload?.success || !html ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load module</CardTitle>
            <CardDescription>{payload?.message || payload?.error || 'Unknown error'}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{payload.module.moduleId}</CardTitle>
              <CardDescription>Training material (source-verified)</CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                const w = window.open('', '_blank', 'noopener,noreferrer');
                if (!w) return;
                w.document.open();
                w.document.write(html);
                w.document.close();
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Fullscreen
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              title={`NRP Module ${payload.module.moduleId}`}
              sandbox="allow-same-origin"
              srcDoc={html}
              className="w-full h-[75vh] bg-white"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
