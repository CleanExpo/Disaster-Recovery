import { Metadata } from 'next';
import Link from 'next/link';
import { HandoffFrame } from './HandoffFrame';

export const metadata: Metadata = {
  title: 'Secure handoff to Equipped Commercial Finance',
  robots: { index: false, follow: false },
};

export default async function FinanceHandoffPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; id?: string }>;
}) {
  const { token, id } = await searchParams;

  if (!token || !id) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md bg-white p-6 rounded shadow-sm border border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">Handoff link expired or missing</h1>
          <p className="mt-2 text-sm text-slate-700">
            Your referral token could not be read. This usually happens if the page was opened directly without
            submitting the form, or if the 15-minute window has passed.
          </p>
          <Link
            href="/finance/referral"
            className="mt-4 inline-block px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Start a new referral
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Continuing with Equipped Commercial Finance</h1>
          <p className="mt-2 text-sm text-slate-700">
            Referral ID <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">{id}</code> was sent securely to
            Equipped. They&apos;ll prefill your details below — you complete their application and finance decision
            directly with them. Disaster Recovery is not the lender.
          </p>
        </div>
        <HandoffFrame token={token} referralId={id} />
        <div className="mt-6 text-xs text-slate-500">
          <p>
            If the embedded form does not load, Equipped may not have the iframe endpoint enabled yet. You can also{' '}
            <a href="https://equippedcf.com.au/get-a-quote" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
              open Equipped&apos;s quote form in a new tab
            </a>{' '}
            and reference ID <code>{id}</code>.
          </p>
        </div>
      </div>
    </main>
  );
}
