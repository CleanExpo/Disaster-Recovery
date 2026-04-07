import { AntigravityNavbar, AntigravityFooter } from '@/components/antigravity';
import Link from 'next/link';
import { CheckCircle2, FileText, ArrowRight, Clock } from 'lucide-react';

interface Props {
  searchParams: Promise<{ payment?: string }>;
}

export default async function ContractorApplicationSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const paymentPending = params.payment === 'pending';

  return (
    <>
      <AntigravityNavbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full bg-slate-900/70 border border-slate-700/60 rounded-2xl shadow-2xl backdrop-blur-sm px-6 py-8 sm:px-10 sm:py-10 text-slate-50">
          <div className="flex items-center gap-3 mb-6">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${paymentPending ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
              {paymentPending ? (
                <Clock className="h-7 w-7 text-amber-400" />
              ) : (
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {paymentPending ? 'Application received' : 'Payment received — welcome to NRPG'}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                {paymentPending
                  ? 'Your application has been saved successfully.'
                  : 'Thank you for applying to join the NRPG contractor network.'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200">
            {paymentPending ? (
              <>
                <div className="rounded-xl border border-amber-500/30 bg-amber-900/20 px-4 py-4">
                  <p className="font-semibold text-amber-300 mb-1">Payment step not yet complete</p>
                  <p className="text-amber-100/80">
                    Our team will contact you within <span className="font-semibold">24 hours</span> to
                    complete your application and arrange payment. No action is needed from you right now.
                  </p>
                </div>
                <p>
                  We&apos;ve received all your application details. Once payment is confirmed, your
                  onboarding materials and training access will be activated.
                </p>
              </>
            ) : (
              <>
                <p>
                  Our onboarding team will review your insurance, licensing, experience and safety
                  details. You&apos;ll receive an email with the outcome and next steps, including
                  access to training modules and your contractor portal.
                </p>
                <p>
                  Typical review time is <span className="font-semibold">1–3 business days</span>.
                  We may contact you if we need clarification on any part of your application.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-slate-100">
                  What happens next
                </h2>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1">
                {paymentPending ? (
                  <>
                    <li>• Our team contacts you to arrange payment</li>
                    <li>• Payment confirmed and account activated</li>
                    <li>• Compliance team reviews your documentation</li>
                    <li>• Leads switch on once onboarding is finished</li>
                  </>
                ) : (
                  <>
                    <li>• Compliance team reviews your documentation</li>
                    <li>• Background and reference checks are completed</li>
                    <li>• You receive onboarding + training access</li>
                    <li>• Leads switch on once onboarding is finished</li>
                  </>
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-4">
              <h2 className="text-sm font-semibold text-slate-100 mb-2">
                While you&apos;re waiting
              </h2>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1">
                <li>• Prepare recent project photos and case studies</li>
                <li>• Ensure insurance certificates are up to date</li>
                <li>• Confirm your 24/7 contact details are correct</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-800/80 transition-colors"
            >
              Back to homepage
            </Link>
            <Link
              href="/contractor/login"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Go to contractor login
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>
      <AntigravityFooter />
    </>
  );
}
