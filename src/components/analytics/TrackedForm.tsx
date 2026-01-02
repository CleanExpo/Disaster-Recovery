/**
 * Tracked Form Component
 *
 * Form wrapper with built-in GA4 form event tracking
 */

'use client';

import { type FormEvent, type ComponentProps, useEffect } from 'react';
import { useGA4FormTracking } from '@/hooks/useGA4';

interface TrackedFormProps extends ComponentProps<'form'> {
  formName: string;
  trackStart?: boolean;
  children: React.ReactNode;
}

export function TrackedForm({
  formName,
  trackStart = true,
  onSubmit,
  children,
  ...props
}: TrackedFormProps) {
  const { trackFormStart, trackFormSubmit, trackFormError } = useGA4FormTracking(formName);

  useEffect(() => {
    if (trackStart) {
      trackFormStart();
    }
  }, [trackStart, trackFormStart]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    trackFormSubmit();

    // Call original onSubmit if provided
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
