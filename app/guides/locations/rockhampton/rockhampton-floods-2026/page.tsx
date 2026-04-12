/**
 * Rockhampton QLD Floods 2026 — Location Guide
 *
 * URGENT: Government assistance deadline 27 April 2026.
 * Rockhampton Regional Council is within the 58 declared LGAs under DRFA.
 * Personal Hardship Assistance + Structural Assistance Grants (up to $80,000) available until 27 April.
 *
 * Fitzroy River — Rockhampton is the most flood-impacted regional city in Australia.
 * Major flood events: 1918, 1954, 1991, 2010/11, 2013, 2022, 2026.
 * CBD-level inundation in major events.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Rockhampton Floods 2026 — Government Assistance & Flood Claim Guide',
  description:
    'Rockhampton QLD Floods 2026 claim and government assistance guide. Personal Hardship and Structural Grants up to $80,000 close 27 April 2026. Fitzroy River flood claim experts — IICRC-certified restoration and AFCA dispute support.',
  keywords:
    'rockhampton floods 2026, rockhampton flood claim, fitzroy river flooding 2026, rockhampton government assistance, rockhampton structural assistance grant, rockhampton flood damage restoration',
  alternates: {
    canonical: `${NAP.url}/guides/locations/rockhampton/rockhampton-floods-2026`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Rockhampton`,
  '@id': `${NAP.url}/#organization-rockhampton`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'City', name: 'Rockhampton' },
    { '@type': 'Place', name: 'Fitzroy River corridor' },
    { '@type': 'Place', name: 'Central Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Rockhampton QLD Floods 2026 Restoration Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rockhampton QLD Floods 2026 — Flood Damage Restoration and Claim Documentation',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Rockhampton`,
    '@id': `${NAP.url}/#organization-rockhampton`,
  },
  areaServed: { '@type': 'City', name: 'Rockhampton' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Post-flood restoration documentation and government assistance support for Rockhampton property owners affected by the Queensland Floods 2026. Fitzroy River Category 3 contamination remediation, structural drying, and AFCA claim support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Rockhampton Regional Council declared under the Queensland Floods 2026 assistance programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rockhampton Regional Council is within the declared area under the Disaster Recovery Funding Arrangements (DRFA) for the Queensland Floods 2026 event. Personal Hardship Assistance and Structural Assistance Grants (up to $80,000) are available to eligible residents. The deadline to apply is 27 April 2026. Apply via disaster.qld.gov.au or call the Queensland Reconstruction Authority on 1800 173 349.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is Rockhampton flooded so often and what does it mean for insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Rockhampton's flood risk is driven by the Fitzroy River — Australia's second-largest river basin by volume — which drains a 143,000 km² catchment from Central Queensland's highlands. When this catchment saturates, the Fitzroy delivers sustained high-level flooding to Rockhampton over days to weeks rather than hours. This prolonged inundation increases the depth and duration of floodwater exposure, worsening structural damage and contamination. For insurance purposes, Rockhampton claims frequently face pre-existing damage arguments given the city's flood history — insurers may attribute current damage to prior events. An IICRC-certified independent inspection documents the 2026-specific damage pathways.",
      },
    },
    {
      '@type': 'Question',
      name: 'My Rockhampton property has flood cover — why did my insurer deny the claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Common denial grounds in Rockhampton flood claims include: (1) policy excludes 'flood' while covering 'storm' — if water entered via the roof or walls before ground inundation, argue storm water ingress; (2) pre-existing damage from prior Fitzroy River events attributed to current event; (3) gradual seepage exclusion applied to rising river floodwater — most policies do not correctly apply this exclusion to riverine flood events. All three are disputable through AFCA. NRPG provides IICRC-certified documentation of the damage mechanism to support the appropriate policy coverage argument.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does Fitzroy River floodwater typically stay in Rockhampton properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Major Fitzroy River flood events can maintain elevated water levels in Rockhampton for days to weeks — the January 2011 event kept the CBD and low-lying suburbs inundated for approximately two weeks. Prolonged inundation significantly worsens structural damage to subfloors, wall frames, and insulation, and accelerates Category 3 contamination penetration. IICRC S500:2025 structural drying following prolonged Fitzroy inundation requires extended drying times and comprehensive antimicrobial treatment. If your insurer has used a standard scope designed for short-duration flood events, the scope is likely inadequate for a Fitzroy River event.",
      },
    },
  ],
};

export default function RockhamptonFloods2026Page() {
  return (
    <>
      <Script
        id="rockfl26-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="rockfl26-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="rockfl26-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Rockhampton Location Guide"
        title="Rockhampton Floods 2026 — Government Assistance &amp; Flood Claim Guide"
        subtitle="Rockhampton Regional Council is within the QLD Floods 2026 declared area — Personal Hardship Assistance and Structural Grants up to $80,000 close 27 April 2026. Fitzroy River flood damage experts — IICRC-certified restoration and AFCA dispute support."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Rockhampton' },
          { label: 'QLD Floods 2026' },
        ]}
        cta={{ text: 'Lodge Your Flood Claim', href: '/claim' }}
        sections={[
          {
            heading: 'Government Assistance Available — Deadline 27 April 2026',
            body: (
              <div className="space-y-4">
                <div style={{ backgroundColor: '#fff3cd', border: '1px solid #e0a800', borderRadius: '6px', padding: '0.75rem 1rem', fontWeight: 600 }}>
                  Government assistance closes <strong>27 April 2026</strong>. Lodge your applications now —
                  do not wait for your insurance assessment. Both can be lodged simultaneously.
                </div>
                <p>
                  Rockhampton Regional Council is within the declared area under the Disaster Recovery Funding
                  Arrangements (DRFA) for the Queensland Floods 2026 event. Two government programs are
                  available to eligible Rockhampton residents:
                </p>
                <p>
                  <strong>Personal Hardship Assistance:</strong> Financial assistance for individuals and
                  families experiencing personal hardship as a direct result of the Queensland Floods 2026.
                  No asset testing. Apply via{' '}
                  <a href="https://www.disaster.qld.gov.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    disaster.qld.gov.au
                  </a>{' '}
                  or call the Queensland Reconstruction Authority on 1800&nbsp;173&nbsp;349. Deadline:
                  27 April 2026.
                </p>
                <p>
                  <strong>Structural Assistance Grants (up to $80,000):</strong> Covers structural damage,
                  electrical and plumbing repairs, drying and mould remediation, and professional assessment
                  reports for eligible works exceeding $5,000. Primary residence only. Requires a professional
                  assessment report — NRPG provides IICRC-certified reports meeting this requirement.
                  Deadline: 27 April 2026.
                </p>
                <p>
                  Lodge government assistance applications and your insurance claim in parallel. They are
                  independent processes — you do not need to wait for your insurer before applying.
                </p>
              </div>
            ),
          },
          {
            heading: 'The Fitzroy River — Why Rockhampton Flood Claims Are Different',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Rockhampton sits on the Fitzroy River, which drains Australia&apos;s second-largest river
                  basin by volume — a 143,000 km² catchment from the Central Queensland Highlands. Unlike
                  flash flood events that recede within hours, major Fitzroy River events deliver sustained
                  high-level flooding that can keep Rockhampton properties inundated for days to weeks. The
                  January 2011 event kept the CBD and low-lying suburbs inundated for approximately two weeks.
                  The 1954 event remains Rockhampton&apos;s most severe recorded flood, with earlier major
                  events in 1918, 1991, 2010/11, 2013, 2022, and 2026.
                </p>
                <p>
                  <strong>Prolonged inundation and IICRC drying requirements:</strong> Fitzroy River
                  floodwater is Category 3 (grossly contaminated) under IICRC S500:2025 — carrying agricultural
                  and pastoral runoff from the vast inland catchment. Prolonged inundation drives contamination
                  deeper into wall frames, subfloors, and insulation than short-duration flood events. Standard
                  3–5 day drying scopes are insufficient for properties with week-long inundation. If your
                  insurer has applied a standard drying scope to a prolonged Fitzroy event, the scope is likely
                  inadequate.
                </p>
                <p>
                  <strong>Pre-existing damage disputes:</strong> Rockhampton&apos;s flood frequency means
                  many properties have prior flood claims. Insurers routinely attempt to attribute current damage
                  to inadequately repaired prior-event damage. Under the ICA General Insurance Code of Practice,
                  the burden is on the insurer to demonstrate that specific damage was pre-existing. An IICRC
                  S500:2025 inspection documents 2026-specific moisture distribution patterns and damage
                  pathways to counter this argument.
                </p>
                <p>
                  <strong>Flood vs storm cover — the Rockhampton distinction:</strong> Many Rockhampton
                  insurance policies exclude flood while including storm cover. For Fitzroy River inundation
                  events, the primary damage mechanism is riverine flood — not storm. Policies that exclude
                  flood but cover storm may not apply to the primary cause. However, many properties also
                  sustain legitimate storm water ingress damage (through damaged roofs, eaves, or windows)
                  that is separately covered as storm damage regardless of the flood exclusion. Documenting
                  both damage types at lodgement ensures the covered storm component is not denied along
                  with the excluded flood component.
                </p>
              </div>
            ),
          },
          {
            heading: 'Rockhampton Suburbs and Areas Covered',
            body: (
              <div className="space-y-3">
                <p>
                  <strong>Fitzroy River corridor (highest flood risk):</strong> North Rockhampton (4701),
                  Depot Hill, The Range, Wandal, Rockhampton CBD, Park Avenue, Rockyview
                </p>
                <p>
                  <strong>Central Rockhampton:</strong> Allenstown (4700), Berserker, Frenchville, Kawana,
                  Norman Gardens, Lakes Creek
                </p>
                <p>
                  <strong>Mount Morgan and Fitzroy hinterland:</strong> Mount Morgan (4714), Gracemere (4702)
                </p>
                <p>
                  <strong>Capricorn Coast:</strong> Yeppoon (4703), Emu Park (4710), Zilzie — 45-minute
                  response from Rockhampton base
                </p>
              </div>
            ),
          },
          {
            heading: 'NRPG Response — Rockhampton',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  NRPG provides IICRC-certified flood damage restoration and claim documentation services
                  across Rockhampton, Gracemere, and the Capricorn Coast.
                </p>
                <p>
                  <strong>For QLD Floods 2026 Rockhampton claims:</strong> An independent IICRC-certified
                  inspection documenting the Category 3 contamination classification, prolonged inundation
                  drying requirements under IICRC S500:2025, and 2026-specific damage pathways. This
                  documentation supports the Structural Assistance Grant professional report requirement and
                  provides the evidence base for supplementary claims where the insurer&apos;s original scope
                  is inadequate for a prolonged Fitzroy River event.
                </p>
                <p>
                  <strong>For disputed or denied Rockhampton flood claims:</strong> NRPG&apos;s IICRC
                  documentation package — including damage mechanism analysis, contamination assessment, and
                  scope of works — provides the evidence for AFCA escalation where insurers have denied on
                  flood exclusion grounds, applied pre-existing damage deductions, or understated the
                  remediation scope.
                </p>
                <p>
                  <strong>Lodge or request an inspection:</strong>{' '}
                  <a href="/claim" className="text-blue-400 hover:underline">
                    disasterrecovery.com.au/claim
                  </a>
                  . Note the QLD Floods 2026 event, inundation duration, and whether you are requesting
                  a Structural Assistance Grant professional report.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Rockhampton Regional Council declared under the Queensland Floods 2026 assistance programs?',
            answer:
              'Rockhampton Regional Council is within the DRFA declared area for QLD Floods 2026. Personal Hardship Assistance and Structural Grants (up to $80,000) are available. Deadline: 27 April 2026. Apply at disaster.qld.gov.au or call 1800 173 349.',
          },
          {
            question: 'Why is Rockhampton flooded so often and what does it mean for insurance claims?',
            answer:
              "The Fitzroy River drains a 143,000 km² catchment and delivers sustained multi-week inundation to Rockhampton. Insurance claims face pre-existing damage arguments given the city's flood history. An IICRC-certified independent inspection documents 2026-specific damage pathways to counter these arguments.",
          },
          {
            question: 'My Rockhampton property has flood cover — why did my insurer deny the claim?',
            answer:
              "Common denial grounds include: (1) policy distinguishes 'storm' vs 'flood' and the Fitzroy River event is classified as flood; (2) pre-existing damage from prior events; (3) gradual seepage exclusion incorrectly applied to riverine flood. All three are disputable through AFCA. NRPG provides IICRC documentation of the damage mechanism to support the appropriate policy coverage argument.",
          },
          {
            question: 'How long does Fitzroy River floodwater stay in Rockhampton properties?',
            answer:
              'Major events can keep properties inundated for days to weeks — the 2011 event lasted approximately two weeks. Standard short-duration drying scopes are insufficient. NRPG documents the prolonged inundation requirements under IICRC S500:2025 to support supplementary claims where the original scope is inadequate.',
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
            title: 'Gladstone QLD Floods 2026',
            href: '/guides/locations/gladstone/gladstone-floods-2026',
            description: 'QLD Floods 2026 guide for Gladstone — Extended ESHA eligible.',
          },
          {
            title: 'Flood Damage Restoration Rockhampton',
            href: '/flood-damage-restoration-rockhampton',
            description: 'Rockhampton flood damage restoration service overview.',
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
