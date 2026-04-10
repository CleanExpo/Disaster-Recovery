import { Metadata } from 'next';
import Script from 'next/script';
import HomePage from './HomePageClient';
import { generateHowToSchema } from '@/lib/seo-schema';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
  description: 'Emergency water damage, fire, mould & storm restoration across Australia. IICRC-certified contractors, 60-minute response, 24/7. Lodge a claim online.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
  },
  openGraph: {
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
    description: 'Emergency restoration for water damage, fire, mould & storm. IICRC-certified, 60-minute response, 24/7 nationwide.',
    type: 'website',
    url: 'https://disasterrecovery.com.au',
  },
};

// HowTo schema data — all trusted static content, safe to stringify
const howToSchemaData = JSON.stringify(generateHowToSchema());

// Organization schema — trusted static content, safe to stringify
const organizationSchemaData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${NAP.url}/#organization`,
  "name": "Disaster Recovery Australia",
  "url": NAP.url,
  "logo": `${NAP.url}/images/antigravity/dr-logo.webp`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": NAP.phone,
    "contactType": "customer support",
    "areaServed": "AU",
    "availableLanguage": "en-AU",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
  },
  "sameAs": [
    "https://www.facebook.com/disasterrecoveryau",
  ],
  "areaServed": { "@type": "Country", name: "Australia" },
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
        id="homepage-organization"
        type="application/ld+json"
        // Trusted static schema data — no user input
        dangerouslySetInnerHTML={{ __html: organizationSchemaData }}
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
