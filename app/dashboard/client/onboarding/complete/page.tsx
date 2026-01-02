'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Award, FileText, TrendingUp, Share2, CheckCircle } from 'lucide-react';

export default function ClientOnboardingCompletePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [autoCreateRequest, setAutoCreateRequest] = useState(false);
  const [startTour, setStartTour] = useState(true);
  const [shareInvite, setShareInvite] = useState(false);

  const handleComplete = async () => {
    setSubmitting(true);

    try {
      const userId = (session?.user as any)?.id;

      const response = await fetch('/api/client/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: userId,
          autoCreateRequest,
          startTour,
          shareInvite,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Navigate based on selected actions
        if (result.nextSteps.requestUrl) {
          router.push(result.nextSteps.requestUrl);
        } else if (result.nextSteps.tourUrl) {
          router.push(result.nextSteps.tourUrl);
        } else {
          router.push(result.nextSteps.dashboardUrl);
        }
      } else {
        alert(result.error || 'Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Completion error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
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

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      {/* Celebration Header */}
      <div className="text-center mb-12">
        <div className="inline-block w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 animate-bounce">
          <Award className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">🎉 Congratulations!</h1>
        <h2 className="text-2xl text-muted-foreground mb-2">
          You're Now a Prepared NRPG Client
        </h2>
        <p className="text-muted-foreground">
          You've completed all 7 phases of client onboarding and are ready to use the full NRPG platform!
        </p>
      </div>

      {/* Achievements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What You've Accomplished</CardTitle>
          <CardDescription>Your NRPG profile is now complete</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Profile setup complete</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Service preferences configured</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Property details saved</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Insurance information added</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Payment method secured</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Communication preferences set</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Education modules completed</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold">"Prepared Client" badge earned</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What Would You Like to Do Next?</CardTitle>
          <CardDescription>Choose your next actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Request */}
            <Card className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => setAutoCreateRequest(!autoCreateRequest)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={autoCreateRequest}
                    onCheckedChange={(checked) => setAutoCreateRequest(checked as boolean)}
                  />
                  <div>
                    <h3 className="font-semibold mb-1">Create Your First Service Request</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll pre-fill it with your property and service information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Tour */}
            <Card className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => setStartTour(!startTour)}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={startTour}
                    onCheckedChange={(checked) => setStartTour(checked as boolean)}
                  />
                  <div>
                    <h3 className="font-semibold mb-1">Take Dashboard Tour</h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive walkthrough of NRPG features (2 minutes)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invite Co-Owner */}
          <div className="flex items-start gap-3 p-4 rounded-lg border">
            <Checkbox
              id="shareInvite"
              checked={shareInvite}
              onCheckedChange={(checked) => setShareInvite(checked as boolean)}
            />
            <Label htmlFor="shareInvite" className="cursor-pointer">
              <h3 className="font-semibold mb-1">Invite Co-Owner or Family Member</h3>
              <p className="text-sm text-muted-foreground font-normal">
                Manage this property with others by sending them an invitation
              </p>
            </Label>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleComplete}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Completing...
              </>
            ) : (
              'Complete Onboarding & Get Started →'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Benefits Reminder */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200">
        <CardHeader>
          <CardTitle>Your Benefits as a Prepared Client</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Priority contractor matching</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Insurance claim support and liaison</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>24/7 emergency access</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>"Prepared Client" badge on your profile</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Access to educational resources anytime</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Trusted by NRPG-certified contractors</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
