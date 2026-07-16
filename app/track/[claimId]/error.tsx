'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TrackError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="ag-page-elevated min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-xl font-bold text-[var(--ag-primary-blue)]">Something went wrong</h1>
        <p className="text-sm text-[var(--ag-text-grey)]">
          We could not load the claim tracker. {error.message || 'Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="min-h-[44px]" onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" asChild className="min-h-[44px]">
            <Link href="/claim">Lodge a claim</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
