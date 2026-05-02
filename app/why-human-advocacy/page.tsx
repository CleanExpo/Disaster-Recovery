import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { NAP } from '@/lib/constants';
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice';

/**
 * DR-406 — "Human Advocate vs AI Insurer" page (closes GAP-024).
 *
 * Counter-positioning page: insurer-side AI claim handling vs people-first
 * advocacy. ASIC 2026 enforcement priorities (25-273MR) and Hollard / RACQ
 * matters provide regulatory validation for the position.
 *
 * ACL safety: substantiation in inline citations. No "Australia's only" /
 * "leading" / category-claim language. No guarantee of outcome.
 *
 * COPY-REVIEW REQUIRED before merge to main:
 *   - Marketing: "Who First" brand-voice alignment
 *   - Legal: ACL s18 substantiation of insurer-AI claims
 */

export const metadata: Metadata = {
  title: 'Why Human Advocacy — People First, Not Algorithms | Disaster Recovery',
  description:
    'Insurers are deploying AI to triage and decide claims. We are people working for people. IICRC-certified human contractors, real conversations, advocacy on disputed and supplementary claims.',
  keywords:
    'human advocacy insurance, AI claim handling, insurer AI bias, claim advocate Australia, ASIC enforcement priorities 2026, disputed insurance claim',
  openGraph: {
    title: 'Why Human Advocacy — People First, Not Algorithms',
    description:
      'Insurers deploy AI to triage claims. We are people working for people. IICRC-certified human contractors and advocacy on disputed and supplementary claims.',
    type: 'website',
    url: `${NAP.url}/why-human-advocacy`,
  },
  alternates: {
    canonical: `${NAP.url}/why-human-advocacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is insurer-side AI claim handling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Several Australian insurers now deploy automated decision tools to triage and partially decide claims. ASIC has flagged automated decision-making in insurance as a 2026 enforcement priority. We work with policyholders to ensure human review of disputed and supplementary claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is using AI for claims illegal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Not in itself. The legal question is whether the AI complies with the General Insurance Code of Practice and the Privacy Act 1988 (APP 3 / APP 5). ASIC and AFCA have publicly addressed disputes where automated triage produced outcomes inconsistent with the policy schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is your network different?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Every contractor in our network is IICRC-certified and human-led. We provide site documentation that supports policyholders when claims are disputed or under-scoped. We do not work for insurers.',
      },
    },
  ],
};

export default function WhyHumanAdvocacyPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="container mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            People First, Not Algorithms
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-10">
            Insurers across Australia are deploying AI to triage and partially decide claims.
            ASIC&apos;s 2026 enforcement priorities (
            <a
              href="https://asic.gov.au/about-asic/news-centre/find-a-media-release/2025-releases/25-273mr-asic-announces-2026-enforcement-priorities/"
              className="underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              25-273MR
            </a>
            ) name automated decision-making in insurance as an area of regulatory focus.
            We are a human network of IICRC-certified contractors and advocates who work for
            the policyholder.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                What insurer-side AI does
              </h2>
              <ul className="space-y-2 text-slate-700">
                <li>• Auto-triages claims as &quot;low&quot; or &quot;high&quot; severity</li>
                <li>• Generates first-instance scope and dollar estimates</li>
                <li>• Flags claims for human review only above thresholds</li>
                <li>• Optimises insurer settlement cost across the portfolio</li>
              </ul>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                What human advocacy does
              </h2>
              <ul className="space-y-2 text-blue-900">
                <li>• Reviews the policy schedule against the actual loss</li>
                <li>• Documents site conditions for supplementary claims</li>
                <li>• Provides IICRC-certified scope of work</li>
                <li>• Works for the policyholder, not the insurer</li>
              </ul>
            </div>
          </div>

          <div className="prose max-w-none text-slate-700">
            <h2>Why this matters now</h2>
            <p>
              ASIC has confirmed insurance pricing and claims handling sit inside its 2026
              enforcement priorities. The Australian Financial Complaints Authority (AFCA) has
              published several determinations in 2025-26 where automated insurer triage
              produced outcomes inconsistent with the policy wording. Policyholders facing a
              disputed or under-scoped claim can request human review under the General
              Insurance Code of Practice.
            </p>
            <h2>How we help</h2>
            <p>
              Every contractor in the network is human, IICRC-certified, and produces site
              documentation that supports a policyholder during a dispute. We do not work for
              insurers and do not take referral fees from them.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/claim"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
              aria-label="Lodge a claim — free assessment"
            >
              Lodge a free assessment
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-slate-900 font-semibold hover:bg-slate-50 transition"
              aria-label="Contact our network"
            >
              Talk to a person
            </Link>
          </div>

          <div className="mt-12">
            <App3CollectionNotice />
          </div>
        </section>
      </main>
    </>
  );
}
