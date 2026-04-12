/**
 * Bundaberg QLD Floods 2026 — Location Guide
 *
 * URGENT: Government assistance deadline 27 April 2026.
 * Bundaberg Regional Council is in the 10 declared LGAs for Extended ESHA (Exceptional Circumstances).
 * All three tiers available: Extended ESHA (up to $5,000) + Personal Hardship + Structural Grants (up to $80,000).
 *
 * Burnett River corridor — Bundaberg has experienced major flood events 2010, 2013, 2022, 2026.
 * Wide Bay–Burnett region — significant cane/agricultural property exposure.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bundaberg Floods 2026 — Government Assistance & Flood Claim Guide',
  description:
    'Bundaberg is in the 10 Extended ESHA LGAs for QLD Floods 2026 — up to $5,000 emergency assistance plus Structural Grants up to $80,000. Deadline 27 April 2026. IICRC-certified flood restoration and AFCA claim support.',
  keywords:
    'bundaberg floods 2026, bundaberg flood claim, bundaberg government assistance flood, burnett river flooding 2026, bundaberg extended esha, bundaberg structural assistance grant',
  alternates: {
    canonical: `${NAP.url}/guides/locations/bundaberg/bundaberg-floods-2026`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Bundaberg`,
  '@id': `${NAP.url}/#organization-bundaberg`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'City', name: 'Bundaberg' },
    { '@type': 'Place', name: 'Burnett River corridor' },
    { '@type': 'Place', name: 'Wide Bay-Burnett' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Bundaberg QLD Floods 2026 Restoration Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bundaberg QLD Floods 2026 — Flood Damage Restoration and Claim Documentation',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Bundaberg`,
    '@id': `${NAP.url}/#organization-bundaberg`,
  },
  areaServed: { '@type': 'City', name: 'Bundaberg' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Post-flood restoration documentation and government assistance support for Bundaberg property owners affected by the Queensland Floods 2026. Extended ESHA applications, Category 3 remediation, and AFCA claim support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Bundaberg in the Extended ESHA Exceptional Circumstances program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Bundaberg Regional Council is one of 10 Local Government Areas declared under the Extended ESHA (Exceptional Circumstances) for QLD Floods 2026. This means eligible Bundaberg residents can access up to $5,000 in Extended Emergency Hardship and Structural Assistance, covering temporary accommodation, essential household items, meals, transport, and childcare. The deadline to apply is 27 April 2026. Apply via disaster.qld.gov.au or call the Queensland Reconstruction Authority on 1800 173 349.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Extended ESHA and the Structural Assistance Grant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Extended ESHA (up to $5,000) covers immediate hardship needs — temporary accommodation, essentials, transport. The Structural Assistance Grant (up to $80,000) covers structural repair, electrical and plumbing, drying, mould remediation, and professional assessment reports for eligible structural damage where works exceed $5,000. Both apply to eligible Bundaberg residents, they serve different purposes, and you can apply for both simultaneously. Neither affects your insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Bundaberg property was flooded in 2013 and 2022 — how does that affect my 2026 claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Repeat flood history is used by some insurers to dispute 2026 claims on the basis of pre-existing damage from prior events. Under the ICA General Insurance Code of Practice, the insurer must demonstrate that specific damage was pre-existing and not caused by the 2026 flood. An IICRC-certified independent inspection documents 2026-specific damage pathways — moisture distribution patterns, water entry points, structural failure modes — to establish what is attributable to the 2026 event. If your insurer applies pre-existing deductions without adequate evidence, escalate to AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the Structural Assistance Grant require a professional assessment report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Structural Assistance Grant program requires a professional assessment report documenting the eligible structural damage. NRPG provides IICRC-certified assessment reports that meet the grant documentation requirements. The cost of the assessment report itself may be recoverable as part of the grant. Lodge your grant application via disaster.qld.gov.au and note that a professional assessment is in progress.',
      },
    },
  ],
};

export default function BundabergFloods2026Page() {
  return (
    <>
      <Script
        id="bndfl26-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="bndfl26-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="bndfl26-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Bundaberg Location Guide"
        title="Bundaberg Floods 2026 — Government Assistance &amp; Flood Claim Guide"
        subtitle="Bundaberg is in the Extended ESHA Exceptional Circumstances program — up to $5,000 emergency assistance plus Structural Grants up to $80,000. All programs close 27 April 2026. Lodge your applications now."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Bundaberg' },
          { label: 'QLD Floods 2026' },
        ]}
        cta={{ text: 'Lodge Your Flood Claim', href: '/claim' }}
        sections={[
          {
            heading: 'All Three Government Assistance Tiers Available — Deadline 27 April 2026',
            body: (
              <div className="space-y-4">
                <div style={{ backgroundColor: '#fff3cd', border: '1px solid #e0a800', borderRadius: '6px', padding: '0.75rem 1rem', fontWeight: 600 }}>
                  Bundaberg is in the Extended ESHA 10 LGAs. All three assistance programs are available to eligible residents. <strong>All close 27 April 2026.</strong> Apply at{' '}
                  <a href="https://www.disaster.qld.gov.au" target="_blank" rel="noopener noreferrer" className="underline">
                    disaster.qld.gov.au
                  </a>{' '}
                  or call 1800&nbsp;173&nbsp;349.
                </div>
                <p>
                  <strong>Extended ESHA — Exceptional Circumstances (up to $5,000):</strong> Bundaberg Regional
                  Council is one of 10 declared LGAs eligible for Extended Emergency Hardship and Structural
                  Assistance under Exceptional Circumstances. This covers temporary accommodation, essential
                  household items, meals, transport, medical prescriptions, and childcare for eligible residents.
                  Deadline: 27 April 2026.
                </p>
                <p>
                  <strong>Personal Hardship Assistance:</strong> Financial assistance for individuals and families
                  experiencing hardship as a direct result of the Queensland Floods 2026. No asset testing.
                  Available to all 58 declared LGAs including Bundaberg. Deadline: 27 April 2026.
                </p>
                <p>
                  <strong>Structural Assistance Grants (up to $80,000):</strong> Covers structural damage,
                  electrical and plumbing repairs, drying and mould remediation, and professional assessment
                  reports. Eligible works must exceed $5,000. Primary residence only. Requires a professional
                  assessment report — NRPG provides IICRC-certified reports that meet the program&apos;s
                  documentation requirements. Deadline: 27 April 2026.
                </p>
                <p>
                  Lodge government assistance applications and your insurance claim simultaneously — they are
                  independent processes. You do not need to wait for your insurer before applying for
                  government relief.
                </p>
              </div>
            ),
          },
          {
            heading: 'Bundaberg Flood History — 2010, 2013, 2022, 2026',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Bundaberg&apos;s flood risk is dominated by the Burnett River, which drains a large inland
                  catchment from the Darling Downs and South East Queensland ranges before meeting the coast
                  at Bundaberg. The city has experienced major flood events in January 2010, January 2013
                  (declared a natural disaster, significant inundation of Bundaberg North and low-lying suburbs),
                  February 2022, and again in 2026.
                </p>
                <p>
                  The pattern of repeat events creates specific challenges for insurance claims:
                </p>
                <p>
                  <strong>Pre-existing damage disputes:</strong> Insurers familiar with Bundaberg&apos;s flood
                  history will attempt to attribute 2026 damage to unrepaired or inadequately repaired damage from
                  2022 or prior events. This is particularly relevant for properties that had incomplete
                  insurance settlements following the 2022 floods. An IICRC-certified independent inspection
                  documents 2026-specific damage pathways, separating what is attributable to the current event
                  from any residual prior damage.
                </p>
                <p>
                  <strong>Agricultural and cane property complexity:</strong> Bundaberg&apos;s economy includes
                  significant sugar cane, macadamia, and agricultural property. Flood damage to agricultural
                  sheds, irrigation infrastructure, and packing facilities falls under commercial or farm
                  insurance rather than standard home insurance. Claims assessment for these properties differs
                  from residential assessments — ensure your insurer is applying the correct policy section.
                </p>
                <p>
                  <strong>Category 3 Burnett River floodwater:</strong> Burnett River floodwater at peak flood
                  carries agricultural runoff, sediment, and organic material from the upstream catchment,
                  classifying it as Category 3 (grossly contaminated) under IICRC S500:2025. Full sanitisation
                  and antimicrobial treatment is required — not just water extraction and drying. If your
                  insurer&apos;s scope understates the Category 3 remediation requirement, this is grounds for
                  a supplementary claim.
                </p>
              </div>
            ),
          },
          {
            heading: 'Bundaberg Suburbs and Areas Covered',
            body: (
              <div className="space-y-3">
                <p>
                  <strong>Bundaberg city (high flood risk):</strong> Bundaberg North (4670), Bundaberg East,
                  Kepnock, Millbank, Svensson Heights, Walkervale, Avenell Heights, Ashfield
                </p>
                <p>
                  <strong>Burnett River corridor:</strong> Avoca (4670), Rubyanna, Branyan, Sharon, Moore Park
                  Beach (4670)
                </p>
                <p>
                  <strong>Mon Repos and coastal:</strong> Mon Repos (4670), Burnett Heads (4670), Elliott Heads
                </p>
                <p>
                  <strong>Wide Bay hinterland:</strong> Childers (4660), Biggenden (4621), Gin Gin (4671) —
                  90-minute response, road conditions permitting
                </p>
              </div>
            ),
          },
          {
            heading: 'NRPG Response — Bundaberg',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  NRPG provides IICRC-certified flood damage restoration and claim documentation services across
                  Bundaberg and the Wide Bay–Burnett region.
                </p>
                <p>
                  <strong>For QLD Floods 2026 Bundaberg claims, NRPG provides:</strong> An independent
                  IICRC-certified inspection and scope of works documenting current property condition, Category 3
                  contamination assessment, 2026-specific damage pathways, and the full remediation scope to IICRC
                  S500:2025 standard. This documentation supports the Structural Assistance Grant (professional
                  report requirement), insurance claim lodgement, and AFCA escalation if needed.
                </p>
                <p>
                  <strong>Structural Assistance Grant documentation:</strong> The QLD Government&apos;s Structural
                  Assistance Grant requires a professional assessment report documenting eligible structural damage.
                  NRPG&apos;s IICRC-certified inspection report meets this requirement. Lodge your grant application
                  now and note that a professional assessment is in progress — the report can be submitted as
                  supporting documentation after your grant application is lodged.
                </p>
                <p>
                  <strong>Lodge or request an inspection:</strong>{' '}
                  <a href="/claim" className="text-blue-400 hover:underline">
                    disasterrecovery.com.au/claim
                  </a>
                  . Note the QLD Floods 2026 event, your Extended ESHA application status, and whether you
                  are requesting a report for the Structural Assistance Grant.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Bundaberg in the Extended ESHA Exceptional Circumstances program?',
            answer:
              'Yes — Bundaberg Regional Council is one of 10 LGAs declared under Extended ESHA (Exceptional Circumstances). Eligible residents can access up to $5,000 covering temporary accommodation, essentials, transport, and more. Deadline: 27 April 2026. Apply at disaster.qld.gov.au or call 1800 173 349.',
          },
          {
            question: 'What is the difference between Extended ESHA and the Structural Assistance Grant?',
            answer:
              'Extended ESHA (up to $5,000) covers immediate hardship needs. The Structural Assistance Grant (up to $80,000) covers structural repair, electrical, plumbing, drying, and mould remediation where eligible works exceed $5,000. Both are available to eligible Bundaberg residents and can be applied for simultaneously. Neither affects your insurance claim.',
          },
          {
            question: 'My Bundaberg property was flooded in 2013 and 2022 — how does that affect my 2026 claim?',
            answer:
              "Insurers may attempt to attribute 2026 damage to pre-existing damage from prior events. Under the ICA Code, the insurer must prove the damage was pre-existing. An IICRC-certified independent inspection documents 2026-specific damage pathways to counter these arguments. If your insurer applies pre-existing deductions without adequate evidence, escalate to AFCA.",
          },
          {
            question: 'Does the Structural Assistance Grant require a professional assessment report?',
            answer:
              'Yes. The Structural Assistance Grant program requires a professional assessment report documenting eligible structural damage. NRPG provides IICRC-certified assessment reports that meet the grant documentation requirements. Lodge your grant application first — the assessment report can follow as supporting documentation.',
          },
        ]}
        relatedGuides={[
          {
            title: 'QLD Floods 2026 — Claims & Relief',
            href: '/events/queensland-floods-2026',
            description:
              'Government assistance closes 27 April 2026. National QLD Floods 2026 claims and relief hub.',
          },
          {
            title: 'Ipswich QLD Floods 2026',
            href: '/guides/locations/ipswich/ipswich-floods-2026',
            description: 'QLD Floods 2026 guide for Ipswich and the Bremer River corridor.',
          },
          {
            title: 'Flood Damage Restoration Services',
            href: '/services/flood-damage-restoration',
            description: 'Full flood damage restoration service overview — IICRC-certified.',
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
