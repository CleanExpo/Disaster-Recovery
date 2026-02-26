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
  '/guides/water-damage',
  '/guides/fire-damage',
  '/guides/storm-damage',
  '/guides/mould',
  '/guides/insurance/should-i-take-a-payout',
  '/guides/insurance/insurance-approved-contractors',
  '/guides/insurance/loss-assessor-vs-contractor',
  '/guides/insurance/section-54-contractor-rights',
  '/guides/emergency/find-24-hour-emergency-restoration',
  '/guides/emergency/middle-night-flooding-emergency',
  '/guides/emergency/emergency-board-up-storm-damage',
  '/guides/mould/why-mould-returns-6-months',
];

// All data below is trusted static content — safe to stringify
// Top 10 PAA-optimised questions for Australian disaster recovery searches
const globalFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does water damage restoration cost in Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Water damage restoration in Australia typically costs between $2,200 and $15,000 for residential properties, depending on the severity and affected area. The minimum service fee of $2,200 covers emergency extraction, industrial drying equipment, antimicrobial treatment, and insurance documentation. Most home insurance policies cover water damage restoration costs."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to dry out a water-damaged house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional structural drying typically takes 3 to 5 days using commercial-grade dehumidifiers and air movers. Severe flooding can take 7 to 10 days. Drying time depends on the water category, materials affected, and ambient humidity. IICRC-certified technicians monitor daily moisture readings to confirm the structure reaches its dry standard before restoration begins."
      }
    },
    {
      "@type": "Question",
      "name": "Does home insurance cover water damage restoration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Australian home and contents insurance policies cover sudden water damage such as burst pipes, storm damage, and appliance leaks. Flood cover is often a separate add-on. NRPG contractors bill you directly so work begins immediately without waiting for insurer approval, and provide full claims documentation including photos, moisture logs, and scope of works to support your reimbursement."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can a restoration company respond to an emergency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NRPG's network of IICRC-certified contractors provides a 60-minute emergency response across major Australian cities including Sydney, Melbourne, Brisbane, Perth, and Adelaide. You lodge your claim online, get instantly matched with the nearest available contractor within your selected radius (20–100 km), and receive confirmation within minutes. The service operates 24 hours a day, 7 days a week."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if I need professional mould remediation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional mould remediation is needed when mould covers more than 1 square metre, is inside wall cavities or HVAC systems, or when occupants experience respiratory symptoms. Visible mould often indicates a larger hidden problem. A qualified mould assessor conducts air quality testing to identify species and contamination levels, then follows IICRC S520 protocols for safe removal."
      }
    },
    {
      "@type": "Question",
      "name": "What should I do immediately after water damage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stop the water source if safe to do so (turn off mains or isolate the burst pipe). Move valuable items to dry areas and photograph all damage for insurance. Do not use electrical appliances in wet areas. Contact a professional restoration company immediately — mould can begin growing within 24 to 48 hours in Australian conditions. Lodge your claim at disasterrecovery.com.au for a 60-minute emergency response."
      }
    },
    {
      "@type": "Question",
      "name": "What is IICRC certification and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IICRC (Institute of Inspection Cleaning and Restoration Certification) is the international standard for restoration professionals. IICRC-certified technicians are trained in water damage restoration (WRT), fire and smoke restoration (FSRT), and mould remediation. Certification ensures technicians follow evidence-based protocols, use proper equipment, and produce documentation that insurance companies accept."
      }
    },
    {
      "@type": "Question",
      "name": "Can you restore a house after fire damage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most fire-damaged properties can be fully restored to pre-loss condition. Professional fire restoration involves make-safe and board-up, soot and smoke removal from all surfaces, contents pack-out and specialist cleaning, odour elimination using thermal fogging and ozone treatment, and complete structural rebuild. The process typically takes 2 to 6 weeks depending on severity."
      }
    },
    {
      "@type": "Question",
      "name": "How does your online system work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fill out the online form at disasterrecovery.com.au/claim with your damage details, location, and photos. NRPG instantly matches you with IICRC-certified contractors within your selected radius (20–100 km). You receive a confirmed response within 60 minutes. We bill you directly so work starts immediately, and provide full documentation to support your insurance claim."
      }
    },
    {
      "@type": "Question",
      "name": "Are all contractors IICRC certified with insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every contractor in the NRPG network must maintain current IICRC certification, carry a minimum of $20 million public liability insurance, hold relevant trade licences, and pass ongoing quality audits. This ensures every job meets Australian industry standards and produces documentation your insurer will accept."
      }
    }
  ]
};

export default function GlobalFAQSchema() {
  const pathname = usePathname();

  // Skip pages with their own FAQ schema
  if (PAGES_WITH_OWN_FAQ.includes(pathname)) {
    return null;
  }

  // Skip dynamic location-service and suburb-service pages (they inject their own FAQPage)
  const locationServicePattern = /^\/locations\/[^/]+\/[^/]+/;
  if (locationServicePattern.test(pathname)) {
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
