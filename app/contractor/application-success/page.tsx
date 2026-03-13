import { AntigravityNavbar, AntigravityFooter } from '@/components/antigravity';
import Link from 'next/link';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function ContractorApplicationSuccessPage() {
  return (
    <>
      <AntigravityNavbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full bg-slate-900/70 border border-slate-700/60 rounded-2xl shadow-2xl backdrop-blur-sm px-6 py-8 sm:px-10 sm:py-10 text-slate-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Application submitted successfully
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-1">
                Thank you for applying to join the NRPG contractor network.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200">
            <p>
              Our onboarding team will review your insurance, licensing, experience and safety
              details. You&apos;ll receive an email with the outcome and next steps, including
              access to training modules and your contractor portal.
            </p>
            <p>
              Typical review time is <span className="font-semibold">1–3 business days</span>.
              We may contact you if we need clarification on any part of your application.
            </p>
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
                <li>• Compliance team reviews your documentation</li>
                <li>• Background and reference checks are completed</li>
                <li>• You receive onboarding + training access</li>
                <li>• Leads switch on once onboarding is finished</li>
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

