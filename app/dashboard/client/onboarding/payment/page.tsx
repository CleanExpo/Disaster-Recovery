'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, ArrowRight, CreditCard, Info, Shield } from 'lucide-react';

export default function ClientPaymentPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState({
    stripePaymentMethodId: '', // In production, use Stripe Elements to get this
    billingAddressSameAs: true,
    billingStreet: '',
    billingSuburb: '',
    billingPostcode: '',
    billingState: 'NSW',
    autoPayEnabled: false,
    invoiceDeliveryMethod: 'email',
    taxInvoiceRecipient: '',
    abnNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // In production, create Stripe payment method here using Stripe Elements
      // For now, use placeholder
      const mockPaymentMethodId = 'pm_' + Math.random().toString(36).substr(2, 9);

      const payload = {
        ...paymentMethod,
        stripePaymentMethodId: mockPaymentMethodId,
      };

      const response = await fetch('/api/client/onboarding/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push(result.nextPhaseUrl || '/dashboard/client/onboarding/checklist');
      } else {
        setError(result.message || result.error || 'Failed to save payment method');
      }
    } catch (err) {
      console.error('Payment submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard/client/onboarding/checklist');
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
              <CardTitle>Phase 5: Payment Method (Optional)</CardTitle>
              <CardDescription>Add a payment method for pre-authorization and faster checkout</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">Step 5 of 7</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stripe Elements Placeholder */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <CreditCard className="h-8 w-8" />
                  <div className="text-center">
                    <p className="font-medium">Stripe Elements Integration</p>
                    <p className="text-xs">Card input component will be integrated here</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Your payment information is securely processed by Stripe. We never store your full card details.
              </p>
            </div>

            {/* Pre-Authorization Notice */}
            <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Pre-Authorization Hold
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  When you accept a contractor's quote, we'll place a pre-authorization hold for the estimated amount.
                  The actual charge only occurs after work is completed to your satisfaction.
                </p>
              </AlertDescription>
            </Alert>

            {/* Billing Address */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="billingAddressSameAs"
                  checked={paymentMethod.billingAddressSameAs}
                  onCheckedChange={(checked) =>
                    setPaymentMethod({ ...paymentMethod, billingAddressSameAs: checked as boolean })
                  }
                />
                <Label htmlFor="billingAddressSameAs" className="text-sm font-normal cursor-pointer">
                  Use same address as property
                </Label>
              </div>

              {!paymentMethod.billingAddressSameAs && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="billingStreet">Billing Street Address</Label>
                    <Input
                      id="billingStreet"
                      value={paymentMethod.billingStreet}
                      onChange={(e) => setPaymentMethod({ ...paymentMethod, billingStreet: e.target.value })}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingSuburb">Suburb</Label>
                      <Input
                        id="billingSuburb"
                        value={paymentMethod.billingSuburb}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, billingSuburb: e.target.value })}
                        placeholder="Sydney"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingPostcode">Postcode</Label>
                      <Input
                        id="billingPostcode"
                        value={paymentMethod.billingPostcode}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, billingPostcode: e.target.value })}
                        placeholder="2000"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingState">State</Label>
                    <Select
                      value={paymentMethod.billingState}
                      onValueChange={(value) => setPaymentMethod({ ...paymentMethod, billingState: value })}
                    >
                      <SelectTrigger id="billingState">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NSW">NSW</SelectItem>
                        <SelectItem value="VIC">VIC</SelectItem>
                        <SelectItem value="QLD">QLD</SelectItem>
                        <SelectItem value="WA">WA</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="TAS">TAS</SelectItem>
                        <SelectItem value="ACT">ACT</SelectItem>
                        <SelectItem value="NT">NT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoPayEnabled"
                  checked={paymentMethod.autoPayEnabled}
                  onCheckedChange={(checked) =>
                    setPaymentMethod({ ...paymentMethod, autoPayEnabled: checked as boolean })
                  }
                />
                <Label htmlFor="autoPayEnabled" className="text-sm font-normal cursor-pointer">
                  Enable automatic payments (after job completion approval)
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceDeliveryMethod">Invoice Delivery Method</Label>
                <Select
                  value={paymentMethod.invoiceDeliveryMethod}
                  onValueChange={(value) => setPaymentMethod({ ...paymentMethod, invoiceDeliveryMethod: value })}
                >
                  <SelectTrigger id="invoiceDeliveryMethod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="postal">Postal Mail</SelectItem>
                    <SelectItem value="both">Email & Postal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Business Details (Optional) */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold">Business Details (Optional)</Label>
              <p className="text-xs text-muted-foreground">
                If you're a business, provide details for tax invoices
              </p>

              <div className="space-y-2">
                <Label htmlFor="taxInvoiceRecipient">Business Name</Label>
                <Input
                  id="taxInvoiceRecipient"
                  value={paymentMethod.taxInvoiceRecipient}
                  onChange={(e) => setPaymentMethod({ ...paymentMethod, taxInvoiceRecipient: e.target.value })}
                  placeholder="ABC Property Management Pty Ltd"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="abnNumber">ABN (11 digits)</Label>
                <Input
                  id="abnNumber"
                  value={paymentMethod.abnNumber}
                  onChange={(e) => setPaymentMethod({ ...paymentMethod, abnNumber: e.target.value })}
                  placeholder="12345678901"
                  maxLength={11}
                />
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
                onClick={handleSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-sm">
                <strong>Optional Phase:</strong> You can skip this and add a payment method later.
                Payment will be required before contractors can start work on your requests.
              </AlertDescription>
            </Alert>

            <p className="text-xs text-center text-muted-foreground">
              Estimated time: 4 minutes • Secured by Stripe
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
