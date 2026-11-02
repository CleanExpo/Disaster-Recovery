'use client';

import { AgErrorState } from '@/components/antigravity';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DrPhoneLink } from '@/components/contact/DrPhoneLink';
import { DR_PHONE_DISPLAY } from '@/config/contact';

export default function ClaimError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="ag-page-elevated flex flex-col items-center justify-center gap-4 py-24 px-4">
      <AgErrorState
        title="Something went wrong"
        description={
          error.message ||
          'We could not load the claim form. Please try again or call our 24/7 line.'
        }
        action={
          <Button type="button" onClick={reset} className="ag-btn-primary-navy">
            Try again
          </Button>
        }
      />
      <p className="text-sm text-[var(--ag-text-grey)]">
        {DR_PHONE_DISPLAY ? (
          <>
            Prefer to speak with someone?{' '}
            <DrPhoneLink className="font-semibold text-[var(--ag-primary-blue)] underline" />
          </>
        ) : (
          <Link href="/claim" className="font-semibold text-[var(--ag-primary-blue)] underline">
            Back to the claim form
          </Link>
        )}
        {' · '}
        <Link href="/" className="underline">
          Return home
        </Link>
      </p>
    </div>
  );
}
