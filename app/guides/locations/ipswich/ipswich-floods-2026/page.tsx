/**
 * Ipswich QLD Floods 2026 — Location Guide
 *
 * URGENT: Government assistance deadline 27 April 2026.
 * Ipswich City Council is within the 58 declared LGAs under DRFA.
 * Personal Hardship Assistance + Structural Assistance Grants available until 27 April.
 *
 * Bremer River corridor — Australia's most repeatedly flooded urban area.
 * 2011, 2013, 2022, and 2026 major flood events.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Ipswich QLD Floods 2026 — Government Assistance & Flood Claim Guide',
  description:
    'Ipswich flood claim guide for QLD Floods 2026. Government assistance closes 27 April 2026 — Personal Hardship and Structural Grants up to $80,000 still available. IICRC-certified restoration and AFCA claim support.',
  keywords:
    'ipswich floods 2026, ipswich flood claim, ipswich government assistance flood, bremer river flooding 2026, ipswich structural assistance grant, ipswich flood recovery',
  alternates: {
    canonical: `${NAP.url}/guides/locations/ipswich/ipswich-floods-2026`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Ipswich`,
  '@id': `${NAP.url}/#organization-ipswich`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'City', name: 'Ipswich' },
    { '@type': 'Place', name: 'Bremer River corridor' },
    { '@type': 'Place', name: 'South East Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Ipswich QLD Floods 2026 Restoration Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ipswich QLD Floods 2026 — Flood Damage Restoration and Claim Documentation',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Ipswich`,
    '@id': `${NAP.url}/#organization-ipswich`,
  },
  areaServed: { '@type': 'City', name: 'Ipswich' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Post-flood restoration documentation and government assistance support for Ipswich property owners affected by the Queensland Floods 2026. Category 3 contaminated water remediation, structural drying, and AFCA escalation support for disputed claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Ipswich City Council declared under the Queensland Floods 2026 assistance programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ipswich City Council is within the declared area under the Disaster Recovery Funding Arrangements (DRFA) for the Queensland Floods 2026 event. Personal Hardship Assistance and Structural Assistance Grants (up to $80,000) are available to eligible Ipswich residents. The deadline to apply is 27 April 2026 — apply via disaster.qld.gov.au or call the Queensland Reconstruction Authority on 1800 173 349.',
      },
    },
    {
      '@type': 'Question',
      name: 'My Ipswich property was also flooded in 2022 — can my insurer reduce my 2026 claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Insurers may attempt to attribute 2026 flood damage to pre-existing 2022 damage. Under the ICA General Insurance Code of Practice, the insurer must demonstrate that the damage was pre-existing and not caused by the 2026 event. An IICRC-certified inspection documenting the 2026-specific damage pathways — water entry points, moisture distribution, contamination levels — provides evidence to counter pre-existing damage arguments. If your insurer reduces your claim on this basis without adequate evidence, escalate to AFCA.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is Category 3 floodwater and why does it matter for Ipswich claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bremer River floodwater is classified as Category 3 (grossly contaminated) water — it contains sewage, agricultural and industrial runoff from upstream catchments. IICRC S500:2025 standards require full sanitisation, antimicrobial treatment, and structural drying for Category 3 events. If your insurer\'s assessor scoped your claim as a Category 1 or 2 event, this understates the required remediation. An independent IICRC inspection can document the Category 3 classification to support a supplementary claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the Resilient Homes Fund apply to my Ipswich property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Queensland Resilient Homes Fund (RHF) provides funded buyback, raising, or retrofitting options for eligible properties in high-risk flood zones. Ipswich City Council participates in the RHF program. Eligibility depends on your property\'s flood risk category and the Ipswich City Council flood maps. Apply directly via the Queensland Government RHF program — this is separate from your insurance claim and government assistance grants.',
      },
    },
  ],
};

export default function IpswichFloods2026Page() {
  return (
    <>
      <Script
        id="ipfl26-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="ipfl26-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="ipfl26-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Ipswich Location Guide"
        title="Ipswich QLD Floods 2026 — Government Assistance &amp; Flood Claim Guide"
        subtitle="Government assistance closes 27 April 2026. Ipswich City Council is within the declared area — Personal Hardship Assistance and Structural Grants up to $80,000 still available. IICRC-certified flood restoration and AFCA dispute support."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Ipswich' },
          { label: 'QLD Floods 2026' },
        ]}
        cta={{ text: 'Lodge Your Flood Claim', href: '/claim' }}
        sections={[
          {
            heading: 'Government Assistance Deadline — 27 April 2026',
            body: (
              <div className="space-y-4">
                <div style={{ backgroundColor: '#fff3cd', border: '1px solid #e0a800', borderRadius: '6px', padding: '0.75rem 1rem', fontWeight: 600 }}>
                  Government assistance closes <strong>27 April 2026</strong>. Lodge your government applications now — do not wait for your insurance assessment to complete. Both processes can be lodged simultaneously.
                </div>
                <p>
                  Ipswich City Council is within the declared area under the Disaster Recovery Funding Arrangements
                  (DRFA) for the Queensland Floods 2026 event. Three assistance programs remain open for eligible
                  Ipswich residents:
                </p>
                <p>
                  <strong>Personal Hardship Assistance</strong> — financial assistance for individuals and
                  families experiencing hardship as a direct result of the Queensland Floods. No asset testing
                  applies. Apply via{' '}
                  <a href="https://www.disaster.qld.gov.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    disaster.qld.gov.au
                  </a>{' '}
                  or call the Queensland Reconstruction Authority on 1800&nbsp;173&nbsp;349.
                </p>
                <p>
                  <strong>Structural Assistance Grants (up to $80,000)</strong> — covers structural damage,
                  electrical and plumbing repairs, drying and mould remediation, and professional assessment
                  reports. Eligible works must exceed $5,000. Primary residence only. Deadline: 27 April 2026.
                </p>
                <p>
                  <strong>Extended ESHA (Exceptional Circumstances)</strong> — covers temporary accommodation,
                  essential household items, meals, transport, medical prescriptions, and childcare. Available
                  to residents in the 10 specifically declared LGAs under Exceptional Circumstances — check your
                  eligibility at{' '}
                  <a href="https://www.disaster.qld.gov.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    disaster.qld.gov.au
                  </a>
                  .
                </p>
                <p>
                  Lodge government assistance applications and your insurance claim in parallel. They are
                  independent processes — you do not need to wait for your insurer before applying for
                  government relief.
                </p>
              </div>
            ),
          },
          {
            heading: 'Ipswich Flood History — Why Claims Are Complex',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Ipswich is Australia&apos;s most repeatedly flooded major urban area. The Bremer River and its
                  tributaries — draining the Darling Downs ranges and converging with the Brisbane River at Ipswich —
                  have caused major flood events in 2011, 2013, 2022, and again in 2026. Suburbs including Goodna,
                  Rosewood, Leichhardt, Bundamba, and Dinmore have experienced inundation depths of one to four
                  metres or more across multiple events.
                </p>
                <p>
                  This history creates specific challenges for 2026 insurance claims:
                </p>
                <p>
                  <strong>Pre-existing damage disputes:</strong> Insurers frequently attempt to attribute 2026 flood
                  damage to unrepaired or inadequately repaired damage from 2022 flood events. This is a common
                  dispute tactic in Ipswich given the frequency of events. Under the ICA General Insurance Code of
                  Practice, the insurer must demonstrate the damage was pre-existing — the burden is on the insurer,
                  not the policyholder. An IICRC-certified independent inspection documents 2026-specific damage
                  pathways to counter these arguments.
                </p>
                <p>
                  <strong>Category 3 contaminated water:</strong> Bremer River floodwater carries sewage,
                  agricultural runoff, and industrial contaminants from the upstream catchment. IICRC S500:2025
                  classifies this as Category 3 (grossly contaminated). Full sanitisation, antimicrobial treatment,
                  and replacement of porous materials are required — not just drying. Insurers have historically
                  tried to scope Ipswich flood claims as lower-category events to reduce remediation costs.
                </p>
                <p>
                  <strong>Pre-1980 timber stumped homes:</strong> A significant proportion of Ipswich&apos;s
                  residential housing stock is pre-1980 construction with timber stumped subfloors. These
                  structures absorb and retain Category 3 contamination in ways that require specific remediation
                  protocols. Subfloor contamination that is not fully remediated creates ongoing mould and
                  structural risk — and can be a basis for a supplementary claim if the original scope was
                  inadequate.
                </p>
                <p>
                  <strong>Asbestos in older properties:</strong> Properties built before 1990 may contain
                  asbestos-containing materials (ACM) — particularly in flat-sheet wall linings, eaves, and
                  flooring of the era. Flood damage that requires demolition and restoration in these properties
                  requires licensed asbestos removalists. If your insurer&apos;s scope does not account for ACM
                  management costs, this is grounds for a supplementary claim.
                </p>
              </div>
            ),
          },
          {
            heading: 'Ipswich Suburbs We Cover',
            body: (
              <div className="space-y-3">
                <p>
                  <strong>Bremer River corridor (highest risk):</strong> Goodna (4300), Riverview (4303),
                  Dinmore (4303), Bundamba (4304), Leichhardt (4305), North Ipswich (4305), Ipswich CBD (4305),
                  Rosewood (4340), Walloon (4306)
                </p>
                <p>
                  <strong>Inner Ipswich:</strong> Booval (4304), Silkstone (4304), Raceview (4305),
                  Flinders View (4305), Brassall (4305), Newtown (4305), Basin Pocket (4305)
                </p>
                <p>
                  <strong>Springfield corridor:</strong> Springfield (4300), Springfield Lakes (4300),
                  Ripley (4306), Yamanto (4305), Augustine Heights (4300)
                </p>
                <p>
                  <strong>Lockyer Valley access:</strong> Laidley (4341), Gatton (4343) — 90-minute response,
                  road conditions permitting
                </p>
              </div>
            ),
          },
          {
            heading: 'NRPG Response — Ipswich',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  NRPG provides IICRC-certified flood damage restoration and claim documentation services across
                  Ipswich and the Bremer River corridor.
                </p>
                <p>
                  <strong>For QLD Floods 2026 Ipswich claims, NRPG provides:</strong> An independent
                  IICRC-certified inspection and scope of works documenting current property condition, Category 3
                  contamination levels, 2026-specific damage pathways, and the full remediation scope to IICRC
                  S500:2025 standard. This documentation package supports both government assistance applications
                  (Structural Grants require professional assessment reports) and insurance claim lodgement or
                  dispute proceedings.
                </p>
                <p>
                  <strong>For disputed or underpaid Ipswich claims:</strong> If your insurer has applied
                  pre-existing damage deductions, understated the Category 3 remediation scope, or failed to
                  account for asbestos management costs — NRPG&apos;s IICRC documentation provides the evidence
                  base for a supplementary claim or AFCA escalation.
                </p>
                <p>
                  <strong>Lodge or request an inspection:</strong>{' '}
                  <a href="/claim" className="text-blue-400 hover:underline">
                    disasterrecovery.com.au/claim
                  </a>
                  . Note the QLD Floods 2026 event and your government assistance application status in the
                  lodgement form.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Ipswich City Council declared under the Queensland Floods 2026 assistance programs?',
            answer:
              'Ipswich City Council is within the declared area under the DRFA for the Queensland Floods 2026 event. Personal Hardship Assistance and Structural Assistance Grants (up to $80,000) are available to eligible residents. The deadline is 27 April 2026. Apply via disaster.qld.gov.au or call the QRA on 1800 173 349.',
          },
          {
            question: 'My Ipswich property was also flooded in 2022 — can my insurer reduce my 2026 claim?',
            answer:
              "Insurers may attempt to attribute 2026 damage to pre-existing 2022 damage. Under the ICA Code, the insurer must prove the damage was pre-existing — the burden is on the insurer. An IICRC-certified independent inspection documents the 2026-specific damage pathways to counter these arguments. If your insurer reduces your claim without adequate evidence, escalate to AFCA.",
          },
          {
            question: 'What is Category 3 floodwater and why does it matter for Ipswich claims?',
            answer:
              "Bremer River floodwater is classified as Category 3 (grossly contaminated) water under IICRC S500:2025. Full sanitisation, antimicrobial treatment, and replacement of porous materials are required. If your insurer's assessor scoped your claim as a lower-category event, this understates the required remediation. An independent IICRC inspection can document the Category 3 classification to support a supplementary claim.",
          },
          {
            question: 'Does the Resilient Homes Fund apply to my Ipswich property?',
            answer:
              "The Queensland Resilient Homes Fund (RHF) provides funded buyback, raising, or retrofitting options for eligible properties in high-risk flood zones. Ipswich City Council participates in the RHF program. Eligibility depends on your property's flood risk category under the Ipswich City Council flood maps. This is separate from your insurance claim and government assistance grants.",
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
            title: 'Flood Damage Restoration Ipswich',
            href: '/services/location-specific/ipswich-flood-recovery',
            description: 'Ipswich flood recovery service overview — IICRC-certified restoration.',
          },
          {
            title: 'Brisbane Ex-TC Alfred Recovery',
            href: '/guides/locations/brisbane/brisbane-alfred-recovery',
            description: 'Alfred disputed claims guide for Brisbane and SEQ property owners.',
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
