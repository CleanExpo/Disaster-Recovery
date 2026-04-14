import { AntigravityNavbar, AntigravityFooter } from '@/components/antigravity';
import Link from 'next/link';
import { CheckCircle2, FileText, ArrowRight, Clock } from 'lucide-react';

interface Props {
  searchParams: Promise<{ payment?: string; ref?: string }>;
}

export default async function ContractorApplicationSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const paymentPending = params.payment === 'pending';
  const applicationRef = params.ref ?? null;

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
                  ? 'Application details have been saved successfully.'
                  : 'Thank you for applying to join the NRPG contractor network.'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200">
            {paymentPending ? (
              <>
                {applicationRef && (
                  <div className="rounded-xl border border-blue-500/30 bg-blue-900/20 px-4 py-3">
                    <p className="text-xs font-medium text-blue-300 mb-0.5">Application reference</p>
                    <p className="font-mono font-semibold text-blue-100 break-all">{applicationRef}</p>
                    <p className="text-xs text-blue-300/70 mt-1">Keep this for your records.</p>
                  </div>
                )}
                <div className="rounded-xl border border-amber-500/30 bg-amber-900/20 px-4 py-4">
                  <p className="font-semibold text-amber-300 mb-1">Payment step not yet complete</p>
                  <p className="text-amber-100/80">
                    The NRPG team reviews applications within{' '}
                    <span className="font-semibold">5–7 business days</span>. A confirmation email
                    has been sent to the address on file. No action is needed right now.
                  </p>
                </div>
                <p>
                  All application details have been received. Once payment is confirmed, onboarding
                  materials and training access will be activated.
                </p>
              </>
            ) : (
              <>
                {applicationRef && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-900/20 px-4 py-3">
                    <p className="text-xs font-medium text-emerald-300 mb-0.5">Application reference</p>
                    <p className="font-mono font-semibold text-emerald-100 break-all">{applicationRef}</p>
                    <p className="text-xs text-emerald-300/70 mt-1">Keep this for your records.</p>
                  </div>
                )}
                <p>
                  The NRPG team will review insurance, licensing, experience and safety details.
                  An email with the outcome and next steps — including access to training modules
                  and the contractor portal — will be sent within{' '}
                  <span className="font-semibold">5–7 business days</span>.
                </p>
                <p>
                  The team may be in touch if clarification is needed on any part of the application.
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
                    <li>• Team contacts you to arrange payment</li>
                    <li>• Payment confirmed and account activated</li>
                    <li>• Compliance team reviews documentation</li>
                    <li>• Leads switch on once onboarding is finished</li>
                  </>
                ) : (
                  <>
                    <li>• Compliance team reviews documentation</li>
                    <li>• Background and reference checks are completed</li>
                    <li>• Onboarding and training access is activated</li>
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
