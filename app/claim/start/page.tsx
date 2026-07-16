import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Start a Claim | Disaster Recovery',
  robots: { index: false, follow: false },
};

/**
 * ADR-002 — canonical claim intake is `/claim`.
 * Keep this route as a permanent redirect so old links and demos still land correctly.
 * Demo autofill (`?demo=auto`) is handled on ClaimFormClient in development only.
 */
export default async function ClaimStartPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') qs.set(key, value);
    else if (Array.isArray(value) && value[0]) qs.set(key, value[0]);
  }
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  redirect(`/claim${suffix}`);
}
