import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionFromCookies } from '@/lib/auth/session';
import { dashboardPathForRole, isClientRole } from '@/lib/auth/roles';
import { AuthShellClient } from './AuthShellClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type AccountRow = {
  key: string;
  label: string;
  meta: string;
  trackId: string;
  status: string;
  submittedAt: string;
  sortAt: number;
  kind: 'claim' | 'enquiry' | 'lead';
};

function formatWhen(date: Date): string {
  return date.toLocaleString('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: Promise<{ sort?: string; filter?: string }>;
}) {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect('/login?callbackUrl=/account&reason=session_expired');
  }
  if (!isClientRole(session.role)) {
    redirect(dashboardPathForRole(session.role));
  }

  const params = (await searchParams) ?? {};
  const sort = params.sort === 'oldest' ? 'oldest' : 'newest';
  const filter = params.filter ?? 'all';

  const [claims, leads, enquiries] = await Promise.all([
    prisma.insuranceClaimAU
      .findMany({
        where: {
          OR: [{ clientId: session.userId }, { clientId: session.email }],
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          claimNumber: true,
          status: true,
          createdAt: true,
          damageDescription: true,
        },
      })
      .catch(() => []),
    prisma.lead
      .findMany({
        where: { email: session.email },
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          claimNumber: true,
          status: true,
          suburb: true,
          state: true,
          createdAt: true,
          urgencyLevel: true,
        },
      })
      .catch(() => []),
    prisma.enquiry
      .findMany({
        where: {
          email: session.email,
          source: 'public_claim_submit',
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          source: true,
          responded: true,
          message: true,
          createdAt: true,
        },
      })
      .catch(() => []),
  ]);

  let rows: AccountRow[] = [
    ...claims.map((c) => ({
      key: `claim-${c.id}`,
      label: c.claimNumber || `Claim ${c.id.slice(-8)}`,
      meta: c.damageDescription?.slice(0, 80) || 'Insurance claim',
      trackId: c.id,
      status: String(c.status),
      submittedAt: formatWhen(c.createdAt),
      sortAt: c.createdAt.getTime(),
      kind: 'claim' as const,
    })),
    ...leads.map((l) => ({
      key: `lead-${l.id}`,
      label: l.claimNumber || `Lead ${l.id.slice(-8)}`,
      meta: [l.suburb, l.state, l.urgencyLevel].filter(Boolean).join(' · '),
      trackId: l.id,
      status: String(l.status),
      submittedAt: formatWhen(l.createdAt),
      sortAt: l.createdAt.getTime(),
      kind: 'lead' as const,
    })),
    ...enquiries.map((e) => ({
      key: `enquiry-${e.id}`,
      label: `Claim ${e.id.slice(-8)}`,
      meta: e.message.replace(/^\[public-claim-submit\]\s*/i, '').slice(0, 80),
      trackId: e.id,
      status: e.responded ? 'IN_PROGRESS' : 'SUBMITTED',
      submittedAt: formatWhen(e.createdAt),
      sortAt: e.createdAt.getTime(),
      kind: 'enquiry' as const,
    })),
  ];

  if (filter === 'open') {
    rows = rows.filter(
      (r) =>
        !['COMPLETED', 'FINALIZED', 'REJECTED', 'CANCELLED'].includes(r.status.toUpperCase()),
    );
  } else if (filter === 'completed') {
    rows = rows.filter((r) =>
      ['COMPLETED', 'FINALIZED'].includes(r.status.toUpperCase()),
    );
  }

  rows.sort((a, b) => (sort === 'oldest' ? a.sortAt - b.sortAt : b.sortAt - a.sortAt));

  return (
    <AuthShellClient role={session.role} email={session.email} name={session.name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">Your account</h1>
          <p className="mt-1 text-sm text-[var(--ag-text-grey)]">
            Track lodged claims and manage your profile.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="claims-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="claims-heading" className="text-lg font-semibold text-[var(--ag-text-dark)]">
              Your claims
            </h2>
            <Link
              href="/claim"
              className="inline-flex min-h-[44px] items-center rounded-md px-4 text-sm font-semibold text-white"
              style={{ background: 'var(--ag-primary-blue)' }}
            >
              Lodge a claim
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Filter and sort claims">
            <Link
              href="/account?filter=all&sort=newest"
              className={`min-h-[40px] rounded-md border px-3 py-2 ${filter === 'all' ? 'bg-[var(--ag-primary-blue)] text-white' : 'bg-white'}`}
            >
              All
            </Link>
            <Link
              href="/account?filter=open&sort=newest"
              className={`min-h-[40px] rounded-md border px-3 py-2 ${filter === 'open' ? 'bg-[var(--ag-primary-blue)] text-white' : 'bg-white'}`}
            >
              Open
            </Link>
            <Link
              href="/account?filter=completed&sort=newest"
              className={`min-h-[40px] rounded-md border px-3 py-2 ${filter === 'completed' ? 'bg-[var(--ag-primary-blue)] text-white' : 'bg-white'}`}
            >
              Completed
            </Link>
            <Link
              href={`/account?filter=${filter}&sort=${sort === 'newest' ? 'oldest' : 'newest'}`}
              className="min-h-[40px] rounded-md border bg-white px-3 py-2"
            >
              Sort: {sort === 'newest' ? 'Newest first' : 'Oldest first'}
            </Link>
          </div>

          {rows.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm text-[var(--ag-text-grey)]">
                {filter === 'all'
                  ? 'No claims yet. Lodge a claim to connect with an IICRC-certified contractor near you.'
                  : 'No claims match this filter.'}
              </p>
              <Link
                href="/claim"
                className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--ag-primary-blue)] underline"
              >
                Start a claim
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border bg-white">
              {rows.map((c) => (
                <li
                  key={c.key}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--ag-text-dark)]">{c.label}</p>
                    <p className="text-xs text-[var(--ag-text-grey)] truncate">{c.meta}</p>
                    <p className="mt-1 text-xs text-[var(--ag-text-grey)]">
                      {c.status} · {c.submittedAt}
                      {c.kind === 'enquiry' ? ' · Claim enquiry' : ''}
                      {c.kind === 'lead' ? ' · Lead' : ''}
                    </p>
                  </div>
                  <Link
                    href={`/track/${encodeURIComponent(c.trackId)}`}
                    className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--ag-primary-blue)] underline"
                  >
                    Track
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border bg-white p-6" aria-labelledby="profile-heading">
          <h2 id="profile-heading" className="text-lg font-semibold text-[var(--ag-text-dark)]">
            Profile
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-24 text-[var(--ag-text-grey)]">Name</dt>
              <dd>{session.name || '—'}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 text-[var(--ag-text-grey)]">Email</dt>
              <dd>{session.email}</dd>
            </div>
          </dl>
          <Link
            href="/account/security"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--ag-primary-blue)] underline"
          >
            Security settings
          </Link>
        </section>
      </div>
    </AuthShellClient>
  );
}
