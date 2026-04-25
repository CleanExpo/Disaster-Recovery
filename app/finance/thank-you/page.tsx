import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Referral received — Equipped Commercial Finance',
  robots: { index: false, follow: false },
};

export default async function FinanceThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; status?: string }>;
}) {
  const { id, status } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 flex items-center">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200">
        <CheckCircle2 className="w-12 h-12 text-green-600 mb-4" aria-hidden />
        <h1 className="text-2xl font-bold text-slate-900">Referral sent to Equipped</h1>
        <p className="mt-3 text-slate-700">
          Your referral reached Equipped Commercial Finance. They&apos;ll be in touch using the contact slot you chose.
          Disaster Recovery has no visibility into their credit decision — that&apos;s between you and Equipped.
        </p>
        {id && (
          <p className="mt-4 text-sm text-slate-600">
            Reference ID: <code className="bg-slate-100 px-2 py-0.5 rounded text-xs">{id}</code>
            {status && (
              <>
                {' · '}Status: <strong>{status}</strong>
              </>
            )}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Back to Disaster Recovery
          </Link>
          <Link
            href="/how-it-works"
            className="inline-block px-4 py-2 rounded border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
          >
            How recovery works
          </Link>
        </div>
      </div>
    </main>
  );
}
