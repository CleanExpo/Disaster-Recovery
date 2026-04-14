import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-612: Western Australia State Hub
 *
 * Active events:
 * - Cyclone Narelle — DRFA declared 6 shires, AGDRP active, WA Premier's Relief $4K/$2K
 *
 * AGDRP: Australian Government Disaster Recovery Payment — $1,000/eligible adult
 * WA Premier's Relief: $4,000 primary, $2,000 secondary
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'Western Australia Disaster Recovery & Insurance Claim Support | WA Hub',
  description:
    'Western Australia disaster recovery hub. Cyclone Narelle: DRFA declared 6 shires, AGDRP $1,000/eligible adult, WA Premier\'s Relief $4,000 primary. IICRC-certified restoration contractors across Carnarvon, Shark Bay, Karratha, Perth Metro, Broome, and Port Hedland.',
  keywords:
    'Western Australia disaster recovery, Cyclone Narelle WA, Carnarvon cyclone claims, WA insurance claim support, AGDRP Western Australia, WA Premier Relief Fund, Karratha cyclone damage, Broome storm claims, IICRC certified WA',
  openGraph: {
    title: 'Western Australia Disaster Recovery & Insurance Claim Support | WA Hub',
    description:
      'Cyclone Narelle: DRFA declared 6 WA shires, AGDRP $1,000/eligible adult, WA Premier\'s Relief $4,000 primary. IICRC-certified restoration contractors across Carnarvon, Shark Bay, Karratha, Perth Metro.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Western Australia Disaster Recovery Hub')}&city=${encodeURIComponent('Western Australia')}&service=disaster-recovery`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/wa`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/wa/#professionalservice`,
  name: `${NAP.name} — Western Australia`,
  url: `${NAP.url}/wa`,
  description:
    'IICRC-certified disaster restoration and insurance claim support across Western Australia. Servicing Carnarvon, Shark Bay, Karratha, Perth Metro, Broome, Port Hedland, and all WA regions.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'State', name: 'Western Australia' },
    { '@type': 'City', name: 'Perth' },
    { '@type': 'City', name: 'Carnarvon' },
    { '@type': 'City', name: 'Karratha' },
    { '@type': 'City', name: 'Broome' },
    { '@type': 'City', name: 'Port Hedland' },
    { '@type': 'Place', name: 'Shark Bay' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'WA',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'Western Australia', item: `${NAP.url}/wa` },
  ],
};

export default function WAHubPage() {
  return (
    <>
      <Script
        id="wa-professionalservice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="wa-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="State Hub"
        title="Western Australia Disaster Recovery Hub"
        subtitle="Cyclone Narelle: DRFA declared across 6 WA shires, AGDRP active ($1,000/eligible adult), WA Premier's Relief Fund ($4,000 primary / $2,000 secondary). IICRC-certified restoration contractors across Carnarvon, Shark Bay, Karratha, Perth Metro, Broome, and Port Hedland."
        gradient="linear-gradient(135deg, #0A2240 0%, #1E4A8C 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Western Australia' },
        ]}
        sections={[
          {
            heading: 'Cyclone Narelle — DRFA Declared, Government Assistance Active',
            body: (
              <>
                <p>
                  Cyclone Narelle impacted Western Australia's northwest coast, with the Australian and
                  Western Australian governments declaring DRFA activation across{' '}
                  <strong>6 WA shires</strong>. Multiple government assistance programs are currently active
                  for eligible residents and communities in declared areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The following government assistance programs are active for Cyclone Narelle affected areas:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>AGDRP — Australian Government Disaster Recovery Payment: $1,000 per eligible adult</strong>{' '}
                    and $400 per eligible child. One-off payment for eligible residents in declared areas.{' '}
                    <a
                      href="https://www.servicesaustralia.gov.au/australian-government-disaster-recovery-payment"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      servicesaustralia.gov.au
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>WA Premier's Relief Fund: $4,000 primary / $2,000 secondary</strong>{' '}
                    — $4,000 for primary residence damage; $2,000 for secondary/investment property damage.{' '}
                    <a
                      href="https://www.dfes.wa.gov.au/recovery"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      dfes.wa.gov.au/recovery
                    </a>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>DRFA Infrastructure and Individual Assistance</strong> — for eligible residents
                    and businesses in the 6 declared shires.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#555' }}>
                  Check eligibility and program activation status at official sources before applying. Program
                  availability and application deadlines are subject to change by the WA Government and
                  Services Australia. NRPG is a restoration and claim support service and does not administer
                  government grants.
                </p>
              </>
            ),
          },
          {
            heading: 'Carnarvon & Shark Bay — Cyclone Narelle Claim Hub',
            body: (
              <>
                <p>
                  Carnarvon and Shark Bay recorded the heaviest Cyclone Narelle impacts. Certified
                  restoration contractors are deployed in both areas for cyclone damage assessment, structural
                  drying, roof damage documentation, and insurance claim support.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Common Narelle claim issues in Carnarvon and Shark Bay include:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Roof damage and water ingress</strong> — cyclone wind uplift causes roof
                    damage that allows sustained water ingress. Full moisture mapping to IICRC S500:2025
                    documents the extent of water penetration into the building envelope.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>ARPC Cyclone Pool claims</strong> — Carnarvon and WA northwest properties
                    in cyclone-prone zones may be insured under ARPC Cyclone Pool arrangements. Your
                    rights as a policyholder are unchanged — AFCA escalation remains available.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Remote property access delays</strong> — some Shark Bay properties had delayed
                    contractor access post-cyclone. Delayed assessment does not invalidate the claim.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Carnarvon Cyclone Narelle claim hub:{' '}
                  <a href="/wa/carnarvon-cyclone-narelle-claims">
                    Carnarvon Cyclone Narelle Claims
                  </a>
                </p>
                <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Full Cyclone Narelle Event Information',
            body: (
              <>
                <p>
                  The Cyclone Narelle Western Australia 2026 event page contains the full event detail,
                  all active government programs, ARPC Cyclone Pool information, and claim lodgement
                  pathways:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <a href="/events/cyclone-narelle-western-australia-2026">
                    Cyclone Narelle Western Australia 2026 — Event Page
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'Western Australia Coverage Areas',
            body: (
              <>
                <p>
                  Certified restoration contractors operate across all WA regions, with concentrated
                  capacity in:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Carnarvon</strong> — cyclone damage restoration, Narelle claim support
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Shark Bay</strong> — cyclone restoration, remote property specialist response
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Karratha</strong> — cyclone and storm damage; Pilbara contractor network
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Perth Metro</strong> — all disaster types; 24/7 contractor network
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Broome</strong> — cyclone and storm damage; Kimberley region coverage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Port Hedland</strong> — cyclone and storm damage; Pilbara industrial and residential
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How do I apply for the AGDRP $1,000 payment for Cyclone Narelle?',
            answer:
              'Apply through Services Australia at servicesaustralia.gov.au. You must be in a declared AGDRP area, which is confirmed by the Australian Government. NRPG does not administer government payments and cannot assess your AGDRP eligibility.',
          },
          {
            question: 'What is the WA Premier\u2019s Relief Fund and how much can I receive?',
            answer:
              '$4,000 for primary residence damage and $2,000 for secondary or investment property damage. Apply through DFES WA at dfes.wa.gov.au/recovery once your area is declared eligible. NRPG does not administer this program.',
          },
          {
            question: 'My Carnarvon property is insured under the ARPC Cyclone Pool. How does that affect my claim?',
            answer:
              'The ARPC Cyclone Pool is a government reinsurance backstop for cyclone-prone regions. Your insurer manages your claim under pool rules. Your rights as a policyholder are unchanged \u2014 AFCA escalation remains available at no cost if your claim is disputed or underpaid.',
          },
          {
            question: 'My insurer\u2019s assessor could not access my Shark Bay property until weeks after the cyclone. Is my claim affected?',
            answer:
              'Delayed contractor access due to safety or access conditions post-cyclone does not invalidate your claim. Document the access delay and the conditions that caused it. NRPG can provide a certified assessment once safe access is available.',
          },
          {
            question: 'Mould is appearing in my Narelle-damaged property. Is that a supplementary claim?',
            answer:
              'Yes, if the mould arose from water ingress caused by Cyclone Narelle. NRPG documents the moisture pathway from cyclone-caused water ingress to current mould growth, establishing the causal link required for supplementary claim acceptance.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Narelle Western Australia 2026',
            href: '/events/cyclone-narelle-western-australia-2026',
            description: 'Full Cyclone Narelle event page — DRFA, AGDRP, WA Premier\'s Relief, claim pathways.',
          },
          {
            title: 'Carnarvon Cyclone Narelle Claims',
            href: '/wa/carnarvon-cyclone-narelle-claims',
            description: 'Carnarvon Cyclone Narelle claims hub — IICRC-certified contractors.',
          },
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/standards/iicrc-s500-water-damage',
            description: 'What IICRC S500:2025 means for your cyclone water damage claim.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool Guide',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC pool works and what it means for WA cyclone claims.',
          },
          {
            title: 'Queensland Hub',
            href: '/qld',
            description: 'Queensland disaster recovery hub — active QLD cyclone and flood events.',
          },
        ]}
        cta={{ text: 'Lodge a WA Cyclone Narelle Claim Assessment', href: '/claim' }}
      />
    </>
  );
}
