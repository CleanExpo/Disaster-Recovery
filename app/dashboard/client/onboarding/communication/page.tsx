'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ArrowLeft, ArrowRight, Bell, Shield, Clock } from 'lucide-react';

export default function ClientCommunicationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: false,
    matchNotifications: true,
    quoteReceived: true,
    workCommenced: true,
    workCompleted: true,
    paymentReminders: true,
    insuranceUpdates: false,
    marketingEmails: false,
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    allowContractorContact: false,
  });

  const [shareDataForAnalytics, setShareDataForAnalytics] = useState(false);
  const [allowSessionRecording, setAllowSessionRecording] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        notifications,
        contactTimes: {
          preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          preferredTimeStart: '09:00',
          preferredTimeEnd: '17:00',
          doNotDisturb: false,
        },
        emergencyContact: emergencyContact.name ? emergencyContact : undefined,
        shareDataForAnalytics,
        allowSessionRecording,
      };

      const response = await fetch('/api/client/onboarding/communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
      } else {
        setError(result.message || result.error || 'Failed to save preferences');
      }
    } catch (err) {
      console.error('Communication submission error:', err);
      setError('An unexpected error occurred. Please try again.');
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
    <div className="container mx-auto py-8 max-w-3xl space-y-4">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Phase 6: Communication Preferences (Optional)</CardTitle>
              <CardDescription>Configure how we contact you and manage notifications</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">Step 6 of 7</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Notification Preferences */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Notification Preferences</Label>
              </div>

              <div className="space-y-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked as boolean })}
                  />
                  <Label htmlFor="email" className="text-sm font-normal cursor-pointer">
                    Email notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked as boolean })}
                  />
                  <Label htmlFor="sms" className="text-sm font-normal cursor-pointer">
                    SMS notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="matchNotifications"
                    checked={notifications.matchNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, matchNotifications: checked as boolean })}
                  />
                  <Label htmlFor="matchNotifications" className="text-sm font-normal cursor-pointer">
                    Contractor match notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="quoteReceived"
                    checked={notifications.quoteReceived}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, quoteReceived: checked as boolean })}
                  />
                  <Label htmlFor="quoteReceived" className="text-sm font-normal cursor-pointer">
                    Quote received notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="workCommenced"
                    checked={notifications.workCommenced}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, workCommenced: checked as boolean })}
                  />
                  <Label htmlFor="workCommenced" className="text-sm font-normal cursor-pointer">
                    Work commencement notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="workCompleted"
                    checked={notifications.workCompleted}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, workCompleted: checked as boolean })}
                  />
                  <Label htmlFor="workCompleted" className="text-sm font-normal cursor-pointer">
                    Work completion notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentReminders"
                    checked={notifications.paymentReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentReminders: checked as boolean })}
                  />
                  <Label htmlFor="paymentReminders" className="text-sm font-normal cursor-pointer">
                    Payment reminders
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked as boolean })}
                  />
                  <Label htmlFor="marketingEmails" className="text-sm font-normal cursor-pointer">
                    Marketing and educational emails
                  </Label>
                </div>
              </div>
            </div>

            {/* Emergency Contact (Optional) */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Emergency Contact (Optional)</Label>
              <p className="text-sm text-muted-foreground">
                Someone we can contact if we can't reach you during an emergency
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Name</Label>
                  <Input
                    id="emergencyName"
                    value={emergencyContact.name}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    value={emergencyContact.relationship}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                    placeholder="Spouse, Parent, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Phone Number</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={emergencyContact.phone}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                  placeholder="0412 345 678"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowContractorContact"
                  checked={emergencyContact.allowContractorContact}
                  onCheckedChange={(checked) =>
                    setEmergencyContact({ ...emergencyContact, allowContractorContact: checked as boolean })
                  }
                />
                <Label htmlFor="allowContractorContact" className="text-sm font-normal cursor-pointer">
                  Allow contractors to contact my emergency contact if needed
                </Label>
              </div>
            </div>

            {/* Privacy & Analytics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Privacy & Data Sharing</Label>
              </div>

              <div className="space-y-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shareDataForAnalytics"
                    checked={shareDataForAnalytics}
                    onCheckedChange={(checked) => setShareDataForAnalytics(checked as boolean)}
                  />
                  <Label htmlFor="shareDataForAnalytics" className="text-sm font-normal cursor-pointer">
                    Share anonymous usage data to help improve NRPG
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowSessionRecording"
                    checked={allowSessionRecording}
                    onCheckedChange={(checked) => setAllowSessionRecording(checked as boolean)}
                  />
                  <Label htmlFor="allowSessionRecording" className="text-sm font-normal cursor-pointer">
                    Allow session recording for UX improvements (Hotjar/FullStory)
                  </Label>
                </div>

                <p className="text-xs text-muted-foreground">
                  Your privacy is important. This data helps us identify and fix UX issues. You can opt out anytime.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/client/onboarding/checklist')}
                className="flex-1"
              >
                Save & Exit
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue to Education
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Estimated time: 2 minutes
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
