/**
 * NewsletterSignup Component
 *
 * Newsletter subscription form for resources hub with:
 * - Email validation
 * - Interest selection (disaster categories)
 * - Success/error states
 * - Integration ready for email service providers
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { RESOURCE_CATEGORIES } from '@/lib/resources/data';
import { DisasterCategory } from '@/lib/resources/types';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline';
  source?: 'resources' | 'homepage' | 'footer';
  className?: string;
  onSuccess?: () => void;
}

export function NewsletterSignup({
  variant = 'default',
  source = 'resources',
  className,
  onSuccess,
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [interests, setInterests] = React.useState<DisasterCategory[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleInterestToggle = (category: DisasterCategory) => {
    setInterests((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      // TODO: Replace with actual API call to email service provider
      // Example: SendGrid, Mailchimp, ConvertKit, etc.
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          interests,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus('success');
      setEmail('');
      setFirstName('');
      setLastName('');
      setInterests([]);

      onSuccess?.();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  // Compact variant (sidebar/footer)
  if (variant === 'compact') {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-dr-education" />
            <CardTitle className="text-lg">Stay Informed</CardTitle>
          </div>
          <CardDescription>
            Get the latest disaster recovery resources delivered to your inbox
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
            />

            {status === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Successfully subscribed! Check your email.
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Inline variant (within content)
  if (variant === 'inline') {
    return (
      <div className={cn('bg-gradient-to-r from-dr-education to-dr-education-hover text-white p-8 rounded-lg', className)}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Never Miss an Update</h3>
          </div>
          <p className="mb-6 text-white/90">
            Join thousands of professionals receiving weekly disaster recovery insights and resources
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="bg-white text-gray-900"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>

          {status === 'success' && (
            <p className="mt-3 text-sm text-white/90 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Successfully subscribed! Check your email.
            </p>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-200 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default variant (full form)
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-dr-education/10 rounded-lg">
            <Mail className="h-6 w-6 text-dr-education" />
          </div>
          <div>
            <CardTitle className="text-2xl">Subscribe to Our Newsletter</CardTitle>
            <CardDescription>
              Get expert disaster recovery resources and updates delivered weekly
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
            />
          </div>

          {/* Interest selection */}
          <div className="space-y-3">
            <Label>Areas of Interest</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(RESOURCE_CATEGORIES).map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${category.id}`}
                    checked={interests.includes(category.id)}
                    onCheckedChange={() => handleInterestToggle(category.id)}
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <Label
                    htmlFor={`interest-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Successfully subscribed! Check your email for confirmation.
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === 'success' ? 'Successfully Subscribed!' : 'Subscribe to Newsletter'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
