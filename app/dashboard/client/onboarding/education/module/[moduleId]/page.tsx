'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, CheckCircle2, BookOpen, Award } from 'lucide-react';

export default function ClientModuleViewerPage({ params }: { params: { moduleId: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [moduleData, setModuleData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const moduleId = params.moduleId;

  useEffect(() => {
    if (status === 'authenticated') {
      loadModule();
    }
  }, [status, moduleId]);

  const loadModule = async () => {
    try {
      setLoading(true);

      // Mark module as started
      await fetch('/api/client/onboarding/education/module/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId }),
      });

      // Load actual module content from public/client-education/
      const response = await fetch(`/client-education/${moduleId}.html`);

      if (response.ok) {
        const htmlContent = await response.text();
        setModuleData({
          id: moduleId,
          title: getModuleTitle(moduleId),
          content: htmlContent,
        });
      } else {
        // Fallback to placeholder if file not found
        setModuleData({
          id: moduleId,
          title: getModuleTitle(moduleId),
          content: getPlaceholderContent(moduleId),
        });
      }
    } catch (err) {
      console.error('Failed to load module:', err);
      setError('Failed to load education module');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);

    try {
      const userId = (session?.user as any)?.id;

      const response = await fetch('/api/client/onboarding/education/module/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: userId,
          moduleId,
          quizScore: undefined, // Optional: Implement quiz
          timeSpentSeconds: Math.floor((Date.now() - performance.now()) / 1000),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.allModulesComplete && result.completionUrl) {
          // All modules complete - go to completion celebration
          router.push(result.completionUrl);
        } else if (result.nextModule) {
          // Go to next module
          router.push(result.nextModule.url);
        } else {
          // Back to module list
          router.push('/dashboard/client/onboarding/education');
        }
      } else {
        setError(result.error || 'Failed to complete module');
      }
    } catch (err) {
      console.error('Module completion error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setCompleting(false);
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

  if (error) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Module</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Modules
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/dashboard/client/onboarding/education')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Modules
        </Button>
        <Badge variant="secondary">
          <BookOpen className="h-3 w-3 mr-1" />
          {moduleId}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{moduleData?.title}</CardTitle>
          <CardDescription>NRPG Disaster Recovery Education</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Module Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: moduleData?.content || '' }} />
          </div>

          {/* Placeholder notice */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-1">Education Module Content</p>
              <p className="text-sm">
                Full educational content will be added in production. This includes detailed guides,
                best practices, safety information, and step-by-step instructions for disaster recovery.
              </p>
            </AlertDescription>
          </Alert>

          {/* Complete Module Button */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              onClick={handleComplete}
              disabled={completing}
              className="flex-1"
              size="lg"
            >
              {completing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getModuleTitle(moduleId: string): string {
  const titles: Record<string, string> = {
    'MODULE-001': 'What to Do After Water Damage',
    'MODULE-002': 'Understanding Your Insurance Claim',
    'MODULE-003': 'Choosing the Right Contractor',
    'MODULE-004': 'Fire Damage Recovery Process',
    'MODULE-005': 'Mold Remediation Explained',
    'MODULE-006': 'Your Rights as a Property Owner',
    'MODULE-007': 'Emergency Preparedness & Prevention',
  };
  return titles[moduleId] || moduleId;
}

function getPlaceholderContent(moduleId: string): string {
  return `
    <h2>Introduction</h2>
    <p>This module covers essential information about disaster recovery that every property owner should know.</p>

    <h3>Key Topics</h3>
    <ul>
      <li>Understanding the recovery process</li>
      <li>Working with NRPG-certified contractors</li>
      <li>Safety considerations and best practices</li>
      <li>Insurance claim requirements</li>
    </ul>

    <h3>Learning Objectives</h3>
    <p>By completing this module, you will understand how to effectively respond to disaster situations and work with restoration professionals.</p>

    <p><em>Full educational content to be added in production.</em></p>
  `;
}
