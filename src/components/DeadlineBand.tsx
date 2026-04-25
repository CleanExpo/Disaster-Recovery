/**
 * DeadlineBand — renders one of four deadline states for a government assistance program.
 * DR-744 / BUILD-PLAN-48-A.
 *
 * States:
 *   active       — green-amber band, "Applications close [date] AEST" + days countdown
 *   closing-soon — red band, urgency treatment, <7d remaining
 *   closed       — grey band, empathetic closed copy + contact CTA
 *   extended     — blue-green band, revised date + source citation
 *
 * This is a Server Component — date computed at render time from the server clock.
 */

import Link from 'next/link';
import { getDeadlineState, type ProgramKey } from '@/lib/deadlines';

interface DeadlineBandProps {
  programKey: ProgramKey;
  /** Override the contact link (default: /contact) */
  contactHref?: string;
}

export function DeadlineBand({ programKey, contactHref = '/contact' }: DeadlineBandProps) {
  const { state, program, daysRemaining, closeDateLabel } = getDeadlineState(programKey);

  if (state === 'closed') {
    return (
      <div className="rounded-lg bg-gray-100 border border-gray-300 px-4 py-3 text-sm text-gray-700 my-4">
        <p className="font-semibold text-gray-800 mb-1">
          ℹ️ {program.name}: This program has closed.
        </p>
        <p>
          {program.closedCopy ?? 'This program has closed. Contact us for alternative pathways.'}
        </p>
        <p className="mt-2">
          <Link href={contactHref} className="underline text-blue-700 hover:text-blue-900">
            Contact us for support options →
          </Link>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Source verified {program.lastVerifiedAt} —{' '}
          <a
            href={program.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {program.sourceUrl}
          </a>
        </p>
      </div>
    );
  }

  if (state === 'closing-soon') {
    return (
      <div className="rounded-lg bg-red-50 border border-red-400 px-4 py-3 text-sm text-red-900 my-4">
        <p className="font-bold text-red-700 mb-1">
          🚨 {program.name}: Apply now — closes in {daysRemaining} day
          {daysRemaining === 1 ? '' : 's'}
        </p>
        <p>
          Applications close <strong>{closeDateLabel} AEST</strong>. Do not wait — processing takes
          time.
        </p>
        {program.sourceUrl && (
          <p className="mt-2">
            <a
              href={program.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Apply via {program.sourceUrl} →
            </a>
          </p>
        )}
      </div>
    );
  }

  if (state === 'extended') {
    return (
      <div className="rounded-lg bg-teal-50 border border-teal-400 px-4 py-3 text-sm text-teal-900 my-4">
        <p className="font-semibold text-teal-800 mb-1">📋 {program.name}: Deadline extended</p>
        <p>
          The application deadline has been extended to <strong>{closeDateLabel} AEST</strong>.
        </p>
        <p className="mt-1 text-xs text-teal-700">
          Source:{' '}
          <a
            href={program.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {program.sourceUrl}
          </a>{' '}
          — Verified {program.lastVerifiedAt}
        </p>
      </div>
    );
  }

  // active
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-400 px-4 py-3 text-sm text-amber-900 my-4">
      <p className="font-semibold text-amber-800 mb-1">✅ {program.name}: Open for applications</p>
      <p>
        Applications close <strong>{closeDateLabel} AEST</strong>
        {daysRemaining > 0 && ` (${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining)`}.
      </p>
      <p className="mt-1 text-xs text-amber-700">
        Source:{' '}
        <a href={program.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
          {program.sourceUrl}
        </a>{' '}
        — Verified {program.lastVerifiedAt}
      </p>
    </div>
  );
}
