import { Metadata } from 'next';
import Script from 'next/script';
import HomePage from './HomePageClient';
import { generateHowToSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: '24/7 Emergency Restoration Services',
  description: 'Australia\'s #1 digital disaster recovery platform. Connect with IICRC-certified restoration contractors 24/7. Water damage, fire damage, mould remediation, storm recovery. 60-minute response nationwide.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
  },
  openGraph: {
    title: '24/7 Emergency Restoration Services',
    description: 'Australia\'s #1 digital disaster recovery platform. IICRC-certified contractors, 60-minute response, 100% online.',
    type: 'website',
    url: 'https://disasterrecovery.com.au',
  },
};

// HowTo schema data — all trusted static content, safe to stringify
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
    </>
  );
}
