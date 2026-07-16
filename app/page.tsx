import { Metadata } from 'next';
import Script from 'next/script';
import HomePage from './HomePageClient';
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice';
import { generateHowToSchema } from '@/lib/seo-schema';

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
      {/* APP 3 / APP 5 collection notice (DR-782) — statutory privacy notice at
          the foot of the homepage. Full variant renders the labelled region. */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <App3CollectionNotice variant="full" />
      </div>
    </>
  );
}
