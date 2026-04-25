/**
 * NOT LEGAL ADVICE.
 *
 * DR-692 — Admin dashboard view for Equipped finance referrals.
 *
 * Server component. Auth is enforced by the parent /admin layout
 * (getServerSession + isAdminRole). No plaintext PII is rendered —
 * only hashed identifiers from the compliance_events ledger.
 *
 * Empty state until NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED flips and
 * Equipped sends the first status webhook.
 */

import Link from 'next/link';
import { listReferrals, type ReferralStage } from '@/lib/finance/referral-store';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ stage?: string; range?: string }>;
}

const RANGE_DAYS: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };

const STAGE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'All stages' },
  { value: 'received', label: 'Received' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'approved', label: 'Approved' },
  { value: 'funded', label: 'Funded' },
  { value: 'declined', label: 'Declined' },
  { value: 'withdrawn', label: 'Withdrawn' },
  { value: 'unknown', label: 'Unknown' },
];

function truncate(hash: string | undefined): string {
  if (!hash) return '—';
  return hash.length <= 12 ? hash : `${hash.slice(0, 8)}…${hash.slice(-4)}`;
}

export default async function FinanceReferralsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const flagOn = process.env.NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED === 'true';

  const rangeKey = params.range && RANGE_DAYS[params.range] ? params.range : '30d';
  const since = new Date(Date.now() - RANGE_DAYS[rangeKey] * 86_400_000).toISOString();
  const stage = (params.stage || '') as ReferralStage | '';

  const rows = await listReferrals({
    stage: stage || undefined,
    since,
  });

  return (
    <div className="p-6 md:p-10 text-gray-100">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Finance referrals</h1>
        <p className="text-sm text-gray-400 mt-1">
          Equipped Commercial Finance status ledger. Read-only view — hashed identifiers only.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Flag{' '}
          <code className="px-1 py-0.5 bg-slate-800 rounded">
            NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED
          </code>{' '}
          is currently{' '}
          <span className={flagOn ? 'text-emerald-400' : 'text-amber-400'}>
            {flagOn ? 'ENABLED' : 'disabled'}
          </span>
          .
        </p>
      </header>

      <form className="mb-6 flex flex-wrap gap-3 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-gray-400">Stage</span>
          <select
            name="stage"
            defaultValue={stage}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
          >
            {STAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-gray-400">Range</span>
          <select
            name="range"
            defaultValue={rangeKey}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </label>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
        >
          Apply
        </button>
        <Link href="/admin/finance-referrals" className="px-3 py-1 text-gray-400 hover:text-white">
          Reset
        </Link>
      </form>

      {rows.length === 0 ? (
        <div className="rounded border border-slate-800 bg-slate-900/60 p-8 text-center text-gray-400">
          <p className="text-lg font-medium text-gray-200">No finance referrals yet.</p>
          <p className="mt-2 text-sm">
            This view activates once{' '}
            <code className="px-1 py-0.5 bg-slate-800 rounded">
              NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED
            </code>{' '}
            is true and Equipped sends the first handoff.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-gray-400 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">Referral ID (hashed)</th>
                <th className="px-3 py-2 font-medium">Created</th>
                <th className="px-3 py-2 font-medium">Stage</th>
                <th className="px-3 py-2 font-medium">Last status</th>
                <th className="px-3 py-2 font-medium">Consent ver.</th>
                <th className="px-3 py-2 font-medium">SMS sent?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((r) => (
                <tr key={r.referralId} className="hover:bg-slate-900/60">
                  <td className="px-3 py-2 font-mono text-xs text-gray-300">
                    {truncate(r.entityIdentifierHash ?? r.referralId)}
                  </td>
                  <td className="px-3 py-2 text-gray-400">
                    {new Date(r.createdAt).toLocaleString('en-AU')}
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-gray-200">
                      {r.stage}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-300">{r.lastStatus}</td>
                  <td className="px-3 py-2 text-gray-400">{r.consentVersion ?? '—'}</td>
                  <td className="px-3 py-2">
                    {r.smsSent ? (
                      <span className="text-emerald-400">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
