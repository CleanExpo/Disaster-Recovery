'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

// Pages that render their own FAQPage schema — skip global FAQ to avoid
// Google Rich Results "Duplicate field FAQPage" errors.
const PAGES_WITH_OWN_FAQ = [
  '/locations/melbourne',
  '/locations/perth',
  '/locations/adelaide',
  '/locations/brisbane',
  '/for/property-managers',
  '/for/strata-managers',
  '/for/business-owners',
  '/about',
  '/facts',
];

// All data below is trusted static content — safe to stringify
const globalFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does your online system work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply fill out our online form with your damage details and location. We instantly match you with IICRC certified contractors within your selected radius (20-100km). You'll receive multiple quotes within 30-60 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Why is there a $2,200 minimum service fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The $2,200 minimum covers emergency response, professional assessment, initial mitigation, industrial equipment, certified technicians, and insurance documentation. This ensures proper restoration and prevents secondary damage that could cost thousands more."
      }
    },
    {
      "@type": "Question",
      "name": "Are all contractors IICRC certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% of our network contractors must maintain current IICRC certification, carry $20M public liability insurance, and meet strict Disaster Recovery Network standards."
      }
    },
    {
      "@type": "Question",
      "name": "Is insurance coverage available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most disasters are insurance covered. We bill you directly so work begins immediately, and provide full claims documentation to support your insurance reimbursement."
      }
    }
  ]
};

export default function GlobalFAQSchema() {
  const pathname = usePathname();

  if (PAGES_WITH_OWN_FAQ.includes(pathname)) {
    return null;
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(globalFAQ) }}
    />
  );
}
