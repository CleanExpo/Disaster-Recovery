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
  sortAt: number;
};

export default async function AccountPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect('/login?callbackUrl=/account&reason=session_expired');
  }
  if (!isClientRole(session.role)) {
    redirect(dashboardPathForRole(session.role));
  }

  const [claims, leads, enquiries] = await Promise.all([
    prisma.insuranceClaimAU
      .findMany({
        where: {
          OR: [{ clientId: session.userId }, { clientId: session.email }],
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          claimNumber: true,
          status: true,
          createdAt: true,
        },
      })
      .catch(() => []),
    prisma.lead
      .findMany({
        where: { email: session.email },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          claimNumber: true,
          status: true,
          suburb: true,
          state: true,
          createdAt: true,
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
        take: 10,
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

  const rows: AccountRow[] = [
    ...claims.map((c) => ({
      key: `claim-${c.id}`,
      label: c.claimNumber || c.id,
      meta: String(c.status),
      trackId: c.id,
      sortAt: c.createdAt.getTime(),
    })),
    ...leads.map((l) => ({
      key: `lead-${l.id}`,
      label: l.claimNumber || l.id,
      meta: [l.suburb, l.state, l.status].filter(Boolean).join(' · '),
      trackId: l.id,
      sortAt: l.createdAt.getTime(),
    })),
    ...enquiries.map((e) => ({
      key: `enquiry-${e.id}`,
      label: e.id,
      meta: [
        e.source === 'public_claim_submit' ? 'Claim enquiry' : 'Enquiry',
        e.responded ? 'In progress' : 'Submitted',
      ].join(' · '),
      trackId: e.id,
      sortAt: e.createdAt.getTime(),
    })),
  ].sort((a, b) => b.sortAt - a.sortAt);

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

          {rows.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm text-[var(--ag-text-grey)]">
                No claims yet. Lodge a claim to connect with an IICRC-certified contractor near you.
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
                  <div>
                    <p className="text-sm font-medium text-[var(--ag-text-dark)]">{c.label}</p>
                    <p className="text-xs text-[var(--ag-text-grey)]">{c.meta}</p>
                  </div>
                  <Link
                    href={`/track/${encodeURIComponent(c.trackId)}`}
                    className="text-sm font-medium text-[var(--ag-primary-blue)] underline"
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
