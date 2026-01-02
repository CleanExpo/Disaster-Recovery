/**
 * Tracked Link Component
 *
 * Link component with built-in GA4 click tracking for downloads and external links
 */

'use client';

import Link from 'next/link';
import { type ComponentProps } from 'react';
import { trackOutboundLink, trackContentDownload } from '@/lib/analytics';

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  trackAsDownload?: boolean;
  downloadName?: string;
  downloadType?: string;
  children: React.ReactNode;
}

export function TrackedLink({
  trackAsDownload = false,
  downloadName,
  downloadType,
  onClick,
  children,
  href,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = typeof href === 'string' ? href : href.toString();

    if (trackAsDownload) {
      // Track as download
      trackContentDownload({
        content_name: downloadName || url,
        content_type: downloadType || 'file',
        file_type: url.split('.').pop() || 'unknown',
      });
    } else {
      // Check if it's an external link
      try {
        const linkUrl = new URL(url, window.location.origin);
        const currentHost = window.location.hostname;

        if (linkUrl.hostname !== currentHost) {
          trackOutboundLink(url, typeof children === 'string' ? children : undefined);
        }
      } catch (error) {
        // Invalid URL, ignore tracking
      }
    }

    // Call original onClick if provided
    onClick?.(e);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
