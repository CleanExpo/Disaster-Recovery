import { Metadata } from 'next';
import Script from 'next/script';
import HomePage from './HomePageClient';
import { generateHowToSchema } from '@/lib/seo-schema';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
  description: 'Australia\'s national disaster recovery claims platform. Connect with IICRC-certified restoration contractors 24/7. Water damage, fire damage, mould remediation, storm recovery. 60-minute response nationwide.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
  },
  openGraph: {
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
    description: 'Australia\'s national disaster recovery claims platform. IICRC-certified contractors, 60-minute response, 100% online.',
    type: 'website',
    url: 'https://disasterrecovery.com.au',
  },
};

// HowTo schema data — all trusted static content, safe to stringify
const howToSchemaData = JSON.stringify(generateHowToSchema());

// AggregateRating schema — trusted static content, safe to stringify
const aggregateRatingSchemaData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "NRPG Disaster Recovery",
    "@id": `${NAP.url}/#organization`,
  },
  "ratingValue": "4.9",
  "reviewCount": "12847",
  "bestRating": "5",
  "worstRating": "1",
});

// FAQPage schema — trusted static content, safe to stringify
const faqSchemaData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is NRPG Disaster Recovery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NRPG Disaster Recovery is a network of IICRC-certified contractors across Australia providing emergency restoration for water damage, cyclone damage, fire damage, mould remediation, and biohazard cleanup. We coordinate directly with your insurer on your behalf.",
      },
    },
    {
      "@type": "Question",
      "name": "How quickly do your contractors respond?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NRPG dispatches contractors within 60 minutes of your claim lodgement for emergency make-safe and water extraction. 24/7 service across all major Australian cities and regional areas.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you handle insurance claims?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NRPG manages all insurer correspondence and provides full IICRC-certified documentation packs required for claim sign-off. We do not act as a claims advocate — we provide the restoration work and documentation your insurer needs.",
      },
    },
    {
      "@type": "Question",
      "name": "Are your contractors IICRC certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All contractors in the NRPG network hold individual IICRC certification to ANSI/IICRC S500:2025 (water damage) and S700:2025 (fire damage) standards. Each contractor independently holds their own insurance, licences, and certifications.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I lodge a claim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lodge online 24/7 at disasterrecovery.com.au/claim. Photograph all damage first. Our intake team will match you with the closest available certified contractor within minutes of lodgement.",
      },
    },
  ],
});

export default function HomePageWrapper() {
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        // Trusted static schema data from generateHowToSchema() — no user input
        dangerouslySetInnerHTML={{ __html: howToSchemaData }}
      />
      <Script
        id="homepage-aggregate-rating"
        type="application/ld+json"
        // Trusted static schema data — no user input
        dangerouslySetInnerHTML={{ __html: aggregateRatingSchemaData }}
      />
      <Script
        id="homepage-faq-schema"
        type="application/ld+json"
        // Trusted static schema data — no user input
        dangerouslySetInnerHTML={{ __html: faqSchemaData }}
      />
      <HomePage />
    </>
  );
}
