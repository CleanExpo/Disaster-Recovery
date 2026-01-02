/**
 * Tracked Button Component
 *
 * Button component with built-in GA4 click tracking
 */

'use client';

import { type ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { useGA4CTATracking } from '@/hooks/useGA4';

interface TrackedButtonProps extends ComponentProps<typeof Button> {
  eventName: string;
  eventCategory?: string;
  eventLocation?: string;
  children: React.ReactNode;
}

export function TrackedButton({
  eventName,
  eventCategory,
  eventLocation,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const { trackCTA } = useGA4CTATracking();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the CTA click
    trackCTA(eventName, eventLocation);

    // Call original onClick if provided
    onClick?.(e);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
