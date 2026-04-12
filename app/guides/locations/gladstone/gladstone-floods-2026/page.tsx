/**
 * Gladstone QLD Floods 2026 — Location Guide
 *
 * URGENT: Government assistance deadline 27 April 2026.
 * Gladstone Regional Council is in the 10 declared LGAs for Extended ESHA (Exceptional Circumstances).
 * All three tiers: Extended ESHA (up to $5,000) + Personal Hardship + Structural Grants (up to $80,000).
 *
 * Gladstone Harbour, Calliope River, and Boyne River corridor.
 * Major industrial port city — Boyne Island smelter, LNG precinct, aluminium.
 * Residential areas: Gladstone city, Clinton, Kin Kora, New Auckland, Toolooa.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Gladstone Floods 2026 — Government Assistance & Flood Claim Guide',
  description:
    'Gladstone Regional Council is in the Extended ESHA 10 LGAs for QLD Floods 2026 — up to $5,000 emergency assistance plus Structural Grants up to $80,000. Deadline 27 April 2026. IICRC-certified flood restoration.',
  keywords:
    'gladstone floods 2026, gladstone flood claim, gladstone government assistance flood, gladstone extended esha, gladstone structural assistance grant, calliope river flooding 2026',
  alternates: {
    canonical: `${NAP.url}/guides/locations/gladstone/gladstone-floods-2026`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Gladstone`,
  '@id': `${NAP.url}/#organization-gladstone`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'City', name: 'Gladstone' },
    { '@type': 'Place', name: 'Calliope River corridor' },
    { '@type': 'Place', name: 'Central Queensland coast' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gladstone QLD Floods 2026 Restoration Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Gladstone QLD Floods 2026 — Flood Damage Restoration and Claim Documentation',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Gladstone`,
    '@id': `${NAP.url}/#organization-gladstone`,
  },
  areaServed: { '@type': 'City', name: 'Gladstone' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Post-flood restoration documentation and government assistance support for Gladstone property owners affected by the Queensland Floods 2026. Extended ESHA applications, IICRC S500:2025 remediation, and AFCA claim support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Gladstone in the Extended ESHA Exceptional Circumstances program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Gladstone Regional Council is one of 10 Local Government Areas declared under the Extended ESHA (Exceptional Circumstances) for QLD Floods 2026. Eligible Gladstone residents can access up to $5,000 in Extended Emergency Hardship and Structural Assistance, covering temporary accommodation, essential household items, meals, transport, medical prescriptions, and childcare. The deadline to apply is 27 April 2026. Apply via disaster.qld.gov.au or call the Queensland Reconstruction Authority on 1800 173 349.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Gladstone property is near the industrial precinct — does that affect my flood claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood inundation in areas adjacent to the Gladstone Harbour industrial precinct, Boyne Island, and the LNG facilities can introduce industrial contamination into floodwater — raising the Category 3 classification risk under IICRC S500:2025. If your insurer has assessed your claim as a standard water intrusion rather than a Category 3 contamination event, this can understate the required remediation scope. An IICRC-certified independent inspection documents the contamination category and the appropriate remediation standard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I apply for government assistance before my insurance assessor visits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Government assistance applications (Extended ESHA, Personal Hardship, Structural Grants) are completely independent of your insurance claim. You do not need to wait for your insurer to assess your property before applying for government relief. Lodge both in parallel — government assistance closes 27 April 2026, while your insurance claim has no statutory deadline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the Structural Assistance Grant cover mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The Structural Assistance Grant covers structural damage, electrical and plumbing repairs, drying and mould remediation, and professional assessment reports, for eligible works exceeding $5,000 on primary residences. NRPG's IICRC-certified assessment report documents mould extent and the required remediation scope to IICRC S520:2025 standard — meeting the professional report requirement for the grant application.",
      },
    },
  ],
};

export default function GladstoneFloods2026Page() {
  return (
    <>
      <Script
        id="gladfl26-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="gladfl26-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="gladfl26-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Gladstone Location Guide"
        title="Gladstone Floods 2026 — Government Assistance &amp; Flood Claim Guide"
        subtitle="Gladstone Regional Council is in the Extended ESHA Exceptional Circumstances program — up to $5,000 emergency assistance plus Structural Grants up to $80,000. All programs close 27 April 2026. IICRC-certified flood restoration available now."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Gladstone' },
          { label: 'QLD Floods 2026' },
        ]}
        cta={{ text: 'Lodge Your Flood Claim', href: '/claim' }}
        sections={[
          {
            heading: 'All Three Government Assistance Tiers Available — Deadline 27 April 2026',
            body: (
              <div className="space-y-4">
                <div style={{ backgroundColor: '#fff3cd', border: '1px solid #e0a800', borderRadius: '6px', padding: '0.75rem 1rem', fontWeight: 600 }}>
                  Gladstone is in the Extended ESHA 10 LGAs. All three assistance programs available to eligible residents. <strong>All close 27 April 2026.</strong>{' '}
                  Apply at{' '}
                  <a href="https://www.disaster.qld.gov.au" target="_blank" rel="noopener noreferrer" className="underline">
                    disaster.qld.gov.au
                  </a>{' '}
                  or call 1800&nbsp;173&nbsp;349.
                </div>
                <p>
                  <strong>Extended ESHA — Exceptional Circumstances (up to $5,000):</strong> Gladstone Regional
                  Council is one of 10 declared LGAs eligible for Extended Emergency Hardship and Structural
                  Assistance under Exceptional Circumstances. Covers temporary accommodation, essential household
                  items, meals, transport, medical prescriptions, and childcare. Deadline: 27 April 2026.
                </p>
                <p>
                  <strong>Personal Hardship Assistance:</strong> Financial assistance for individuals and families
                  experiencing hardship as a direct result of the Queensland Floods 2026. No asset testing.
                  Deadline: 27 April 2026.
                </p>
                <p>
                  <strong>Structural Assistance Grants (up to $80,000):</strong> Covers structural damage,
                  electrical and plumbing repairs, drying and mould remediation, and professional assessment
                  reports for eligible works exceeding $5,000. Primary residence only. Requires a professional
                  assessment report. Deadline: 27 April 2026.
                </p>
                <p>
                  Lodge government assistance and your insurance claim simultaneously. They are independent
                  processes — do not wait for your insurer before applying for government relief.
                </p>
              </div>
            ),
          },
          {
            heading: 'Gladstone Flood Risk — Calliope River and Harbour Inundation',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Gladstone&apos;s flood risk comes from two primary sources: the Calliope River, which drains
                  a broad inland catchment and enters the harbour near the city&apos;s industrial precinct, and
                  localised urban stormwater flooding in low-lying residential suburbs including New Auckland,
                  Clinton, Barney Point, and Kin Kora during high-intensity rainfall events.
                </p>
                <p>
                  <strong>Industrial proximity and water contamination:</strong> Flooding in areas adjacent to
                  the Gladstone Harbour industrial precinct, Boyne Island, and the Curtis Island LNG facilities
                  can introduce industrial contamination into floodwater. Under IICRC S500:2025, floodwater
                  containing industrial runoff is classified as Category 3 (grossly contaminated), requiring
                  full sanitisation and antimicrobial treatment of all affected materials. If your insurer
                  has scoped your claim as standard water intrusion rather than Category 3 contamination,
                  the remediation scope is likely understated.
                </p>
                <p>
                  <strong>Rental and investment property considerations:</strong> Gladstone has a significant
                  proportion of investor-owned rental properties linked to the resources sector workforce.
                  Landlord insurance or investment property insurance covers the building — tenants are
                  responsible for their contents under separate renters&apos; contents insurance. If the
                  property was vacant at the time of the flood event, check your policy&apos;s vacancy
                  clause conditions — some policies restrict cover for properties unoccupied for extended
                  periods.
                </p>
              </div>
            ),
          },
          {
            heading: 'Gladstone Suburbs and Surrounding Areas',
            body: (
              <div className="space-y-3">
                <p>
                  <strong>Gladstone city (4680):</strong> Gladstone CBD, Barney Point, Toolooa, Kin Kora,
                  Clinton, New Auckland, South Gladstone, West Gladstone, Sun Valley
                </p>
                <p>
                  <strong>Boyne Island / Tannum Sands (4680):</strong> Boyne Island, Tannum Sands — Boyne
                  River corridor flood risk
                </p>
                <p>
                  <strong>Calliope (4680):</strong> Calliope, Yarwun, Callemondah
                </p>
                <p>
                  <strong>Rural hinterland:</strong> Mount Larcom (4695), Calliope valley properties —
                  90-minute response, road conditions permitting
                </p>
              </div>
            ),
          },
          {
            heading: 'NRPG Response — Gladstone',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  NRPG provides IICRC-certified flood damage restoration and claim documentation services
                  across Gladstone and the Central Queensland coast.
                </p>
                <p>
                  <strong>For QLD Floods 2026 Gladstone claims:</strong> An independent IICRC-certified
                  inspection and scope of works documenting property condition, contamination category
                  assessment, 2026-specific damage pathways, and full remediation scope to IICRC S500:2025
                  and S520:2025 standards. Documentation supports the Structural Assistance Grant professional
                  report requirement, insurance claim lodgement, and AFCA escalation if needed.
                </p>
                <p>
                  <strong>Lodge or request an inspection:</strong>{' '}
                  <a href="/claim" className="text-blue-400 hover:underline">
                    disasterrecovery.com.au/claim
                  </a>
                  . Note the QLD Floods 2026 event and whether you are requesting a Structural Assistance
                  Grant professional assessment report.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Gladstone in the Extended ESHA Exceptional Circumstances program?',
            answer:
              'Yes — Gladstone Regional Council is one of 10 LGAs under Extended ESHA (Exceptional Circumstances). Eligible residents can access up to $5,000 covering accommodation, essentials, transport, and more. Deadline: 27 April 2026. Apply at disaster.qld.gov.au or call 1800 173 349.',
          },
          {
            question: 'My Gladstone property is near the industrial precinct — does that affect my flood claim?',
            answer:
              'Flooding near the Gladstone industrial precinct can introduce industrial contamination, raising the IICRC S500:2025 Category 3 classification. If your insurer has scoped your claim as standard water intrusion, the remediation scope is likely understated. An IICRC-certified independent inspection documents the contamination category to support a supplementary claim.',
          },
          {
            question: 'Can I apply for government assistance before my insurance assessor visits?',
            answer:
              'Yes. Government assistance applications are completely independent of your insurance claim. Lodge both in parallel — government assistance closes 27 April 2026, insurance claims have no statutory deadline.',
          },
          {
            question: 'Does the Structural Assistance Grant cover mould remediation?',
            answer:
              "Yes. The grant covers drying and mould remediation for eligible works exceeding $5,000 on primary residences. NRPG's IICRC-certified assessment report documents mould extent to IICRC S520:2025 standard and meets the professional report requirement for the grant application.",
          },
        ]}
        relatedGuides={[
          {
            title: 'QLD Floods 2026 — Claims & Relief',
            href: '/events/queensland-floods-2026',
            description:
              'Government assistance closes 27 April 2026. National QLD Floods 2026 claims hub.',
          },
          {
            title: 'Bundaberg QLD Floods 2026',
            href: '/guides/locations/bundaberg/bundaberg-floods-2026',
            description: 'QLD Floods 2026 guide for Bundaberg — also in Extended ESHA 10 LGAs.',
          },
          {
            title: 'Ipswich QLD Floods 2026',
            href: '/guides/locations/ipswich/ipswich-floods-2026',
            description: 'QLD Floods 2026 guide for Ipswich and the Bremer River corridor.',
          },
          {
            title: 'AFCA Insurance Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an AFCA complaint for an underpaid or disputed claim.',
          },
        ]}
      />
    </>
  );
}
