import { Metadata } from 'next';
import Script from 'next/script';
import HomePage from './HomePageClient';
import { generateHowToSchema } from '@/lib/seo-schema';
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice';

export const metadata: Metadata = {
  title: 'Disaster Recovery | 24/7 Emergency Restoration Services',
  description:
    'Emergency water damage, fire, mould & storm restoration across Australia. IICRC-certified contractors, priority emergency response, 24/7. Lodge a claim online.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
  },
  openGraph: {
    title: 'Disaster Recovery | 24/7 Emergency Restoration Services',
    description:
      'Emergency restoration for water damage, fire, mould & storm. IICRC-certified, priority emergency response, 24/7 nationwide.',
    type: 'website',
    url: 'https://disasterrecovery.com.au',
  },
};

// HowTo schema data — all trusted static content, safe to stringify
// Organization and FAQPage schemas are provided by layout.tsx and GlobalFAQSchema — no duplicates here
const howToSchemaData = JSON.stringify(generateHowToSchema());

export default function HomePageWrapper() {
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        // Trusted static schema data from generateHowToSchema() — no user input
        dangerouslySetInnerHTML={{ __html: howToSchemaData }}
      />
      <HomePage />

      {/*
        DR-775 — Affordability-anxiety advocacy hook (closes GAP-117).
        Source: YouGov April 2026 — 54% of insured Australians worry about
        affordability and availability of cover. Cited inline + in footnote.
        ACL s18 substantiation pattern.
        REVIEW REQUIRED before merge to main:
          - Marketing: "Who First" brand-voice alignment
          - Legal: YouGov citation accuracy
      */}
      <section className="container mx-auto px-6 max-w-4xl py-10">
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-6 py-5">
          <p className="text-base text-blue-900 leading-relaxed">
            <strong>54% of insured Australians</strong> worry about the affordability and
            availability of their cover.
            <sup>
              <a
                href="#yougov-footnote"
                className="ml-1 text-blue-700 underline"
                aria-label="See YouGov source"
              >
                [a]
              </a>
            </sup>{' '}
            We are a human network of IICRC-certified contractors and advocates working
            for the policyholder, not the insurer.
          </p>
        </div>
        <p
          id="yougov-footnote"
          className="mt-3 text-xs text-slate-500 leading-relaxed"
        >
          [a] Source: YouGov April 2026 survey of insured Australian adults; methodology:
          nationally representative online panel.{' '}
          <a
            href="https://au.yougov.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-700"
          >
            au.yougov.com
          </a>
          .
        </p>
      </section>

      {/*
        APP 3 / APP 5 collection notice — DR-770 statutory requirement.
        GAP-093: explicit aria-label="Privacy collection notice" on the
        wrapper element so accessibility tooling and OAIC-style audits
        can locate the notice on the homepage (it was already on /claim).
      */}
      <div
        aria-label="Privacy collection notice"
        role="region"
        className="container mx-auto px-6 max-w-4xl py-6"
      >
        <App3CollectionNotice />
      </div>
    </>
  );
}
