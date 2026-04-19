import { Metadata } from 'next';
import { ReferralForm } from './ReferralForm';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Request a Finance Referral | Equipped Commercial Finance',
  description:
    'Submit a short, secure referral to Equipped Commercial Finance. Disaster Recovery is not the lender — this form only captures the minimum needed for a call back from Equipped.',
  keywords: [
    'finance referral',
    'Equipped Commercial Finance referral',
    'business recovery finance',
    'equipment finance application',
    'disaster recovery finance request',
  ],
  canonical: '/finance/referral',
});

export default function FinanceReferralPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Request a finance referral</h1>
          <p className="mt-2 text-slate-700">
            This form sends your contact details to <strong>Equipped Commercial Finance</strong> so they can call you
            about funding options for your recovery work. Disaster Recovery is not the lender.
          </p>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded text-sm text-amber-900">
            <strong>What we do not ask for on this form:</strong> income, expenses, liabilities, bank statements, credit
            history, or any loan acceptance. All of that happens inside Equipped&apos;s application flow after you choose
            to continue.
          </div>
        </div>
        <ReferralForm />
      </div>
    </main>
  );
}
