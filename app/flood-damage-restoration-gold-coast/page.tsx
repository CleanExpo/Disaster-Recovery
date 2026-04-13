import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-479: Flood Damage Restoration Gold Coast
 *
 * Created: 9 April 2026
 * Context: Separate from water-damage-restoration-gold-coast. Gold Coast has a unique
 * 260km canal network that passes through or adjacent to thousands of residential
 * properties — canal-rise flooding is a distinct and highly localised risk. Ex-TC Alfred
 * (March 2026) brought 200–300mm in 24h, inundating canal estates and Nerang/Coomera
 * corridors. PERILS confirmed AU$1.877B final insured losses across SEQ. Many Gold Coast
 * properties face Category 3 contamination risk from canal overflow mixing with stormwater
 * and sewage. Targeting active Alfred remediation and incomplete claims.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Gold Coast | IICRC Category 3 Canal & River Specialists',
  description:
    'Professional flood damage restoration across the Gold Coast. IICRC-certified Category 3 specialists for canal flooding, Nerang River inundation, and Ex-TC Alfred recovery. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration gold coast, gold coast canal flooding, nerang river flood damage, category 3 water damage gold coast, alfred flood gold coast, canal estate flooding gold coast, flood cleanup gold coast',
  openGraph: {
    title: 'Flood Damage Restoration Gold Coast | IICRC Category 3 Canal & River Specialists',
    description:
      'Professional flood damage restoration across the Gold Coast. IICRC-certified Category 3 specialists for canal flooding, Nerang River inundation, and Ex-TC Alfred recovery. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Gold+Coast&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-gold-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-gold-coast/#localbusiness`,
  name: `${NAP.name} Gold Coast`,
  url: `${NAP.url}/flood-damage-restoration-gold-coast`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving all Gold Coast suburbs. Canal estate flooding, Nerang River, and Coomera River inundation specialists. Full decontamination, structural drying, and insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Gold Coast',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gold Coast',
    addressRegion: 'QLD',
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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flood Damage Restoration Gold Coast',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Gold Coast' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across the Gold Coast. Category 3 canal and river inundation specialists: emergency extraction, full decontamination, HEPA containment, structural drying, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between canal flooding and river flooding on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Canal flooding occurs when the Gold Coast's 260km engineered canal network rises and overtops into adjoining properties — typically during intense rainfall events. Canal water mixes with stormwater, lawn chemicals, and in many areas sewage, making it Category 3 contaminated water. River flooding from the Nerang River, Coomera River, or creek corridors involves larger volumes and longer inundation duration, but the contamination classification is the same. Canal flooding affects a much larger number of residential properties because of how closely canal estates are built to the water's edge.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Ex-TC Alfred flood damage still claimable in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Ex-TC Alfred struck in March 2026 and many Gold Coast properties have open or disputed claims as of April 2026. Insurers are managing high claim volumes across SEQ. If your Alfred claim has stalled, been partially paid, or if remediation work started but was not completed to a proper standard, you can lodge a supplementary claim or request a reassessment. NRPG provides independent scope assessments and documentation to support claim progression.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Gold Coast property has Category 3 contamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If your property was inundated by canal overflow, river flooding, or significant overland flow during a storm event, Category 3 contamination must be assumed until clearance testing confirms otherwise. You cannot visually identify contamination — canal and stormwater carry pathogens, sewage bacteria, and chemical residues that are invisible. Any contractor who dried your property without first performing decontamination and removing contaminated porous materials has not performed a Category 3 remediation. NRPG can assess properties for incomplete or inadequate prior remediation.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost on the Gold Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold Coast flood damage restoration costs vary significantly by category and extent: minor Category 2 flooding (clean water, limited area) — $6,000 to $20,000; Category 3 ground floor inundation — $15,000 to $60,000; multi-level inundation with significant contents loss — $40,000 to $150,000 or more. Canal estate properties often fall in the $15,000–$60,000 range due to the Category 3 decontamination requirement. These costs should be covered under your flood insurance extension — NRPG provides itemised scopes for insurer lodgement.',
      },
    },
  ],
};

export default function FloodDamageRestorationGoldCoastPage() {
  return (
    <>
      <Script
        id="fdgc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdgc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdgc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Gold Coast"
        subtitle="IICRC-certified Category 3 flood damage restoration across the Gold Coast. Canal estate flooding, Nerang River inundation, and Ex-TC Alfred recovery specialists. priority response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Gold Coast Flood' },
        ]}
        sections={[
          {
            heading: 'Gold Coast Canal Flooding — A Unique Risk Profile',
            body: (
              <>
                <p>
                  The Gold Coast has one of the most extensive urban canal networks in the world — approximately
                  260km of waterways pass through or directly adjacent to thousands of residential properties.
                  Unlike river flooding, canal-rise flooding can affect properties that appear to be well clear of
                  natural watercourses, because the engineered canal system connects across the entire coastal
                  plain.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  When canal levels rise during intense rainfall, water overtops retaining walls and seawalls
                  directly into homes. Canal water is not clean — it mixes with stormwater runoff, lawn and garden
                  chemicals, and in many areas sewage contamination. Under IICRC S500:2025, canal overflow is
                  classified as Category 3 (grossly contaminated) water, requiring full decontamination protocols,
                  not just drying.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Ex-TC Alfred in March 2026 brought 200–300mm of rainfall to the Gold Coast in 24 hours. Canals
                  rose rapidly across Hope Island, Sanctuary Cove, Broadbeach Waters, Clear Island Waters, Mermaid
                  Waters, and Isle of Capri. The Nerang River and Coomera River corridors experienced significant
                  flooding simultaneously. PERILS confirmed a final SEQ insured loss of AU$1.877 billion from
                  Alfred, with 132,000+ ICA claims lodged across the region.
                </p>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred Flood Damage — Gold Coast Recovery Support',
            body: (
              <>
                <p>
                  Many Gold Coast properties affected by Ex-TC Alfred in March 2026 are still mid-remediation or
                  have unresolved insurance matters as of April 2026. Common post-Alfred issues include:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Incomplete drying — equipment removed before moisture readings reached drying targets
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Inadequate Category 3 decontamination — canal or overland flow inundation dried without
                    proper decontamination or porous material removal
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Stalled claims — insurer-appointed scopes that do not reflect the full extent of loss
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Emerging mould — secondary mould growth following inadequate first-response remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Disputed peril classification — canal flooding lodged as storm damage rather than flood
                    inundation
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s IICRC-certified contractors can step in at any stage. We perform independent scope
                  assessments, produce insurer-ready documentation, and carry out remediation to IICRC S500:2025
                  Category 3 standard. If your Alfred claim is stalled or the original work was inadequate, contact
                  us for an assessment.
                </p>
              </>
            ),
          },
          {
            heading: 'Flood Damage Restoration Cost Estimates — Gold Coast 2026',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  Cost estimates for Gold Coast flood damage restoration vary significantly based on water
                  category, inundation depth, affected area, and materials:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Minor Category 2 flooding (clean water, limited area):</strong> $6,000–$20,000 —
                  extraction, drying, and limited material removal
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Category 3 ground floor inundation (canal or river overflow):</strong> $15,000–$60,000
                  — full decontamination, porous material removal, structural drying, post-remediation testing
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Multi-level inundation with significant contents loss:</strong> $40,000–$150,000+ —
                  extended decontamination scope, structural repair, contents removal and disposal
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Canal estate properties in Hope Island, Broadbeach Waters, Mermaid Waters, and similar suburbs
                  typically fall in the $15,000–$60,000 range due to the mandatory Category 3 decontamination
                  requirement. NRPG provides fully itemised scopes for insurer lodgement — correct documentation
                  is critical for avoiding scope disputes and underpayment.
                </p>
              </>
            ),
          },
          {
            heading: 'Gold Coast Flood-Prone Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  priority emergency response for Category 3 emergency extraction and containment:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern canal estates:</strong> Hope Island, Sanctuary Cove, Coomera — Coomera River
                  corridor and northern canal network
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Central canal estates:</strong> Broadbeach Waters, Clear Island Waters, Mermaid Waters,
                  Benowa Waters, Isle of Capri — dense residential canal network
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Nerang River corridor:</strong> Nerang, Highland Park — riverine flooding and overland
                  flow from the Nerang catchment
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern creek corridors:</strong> Palm Beach, Currumbin, Tallebudgera — Tallebudgera
                  Creek and Currumbin Creek flood corridors
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland flash flooding:</strong> Mudgeeraba, Robina, Reedy Creek, Springbrook,
                  Tallebudgera Valley — rapid drainage saturation and Mudgeeraba Creek flash flooding
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General coverage:</strong> All Gold Coast suburbs — full network available for
                  assessment and restoration
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is the difference between canal flooding and river flooding on the Gold Coast?',
            answer:
              "Canal flooding occurs when the Gold Coast's 260km engineered canal network rises and overtops into adjoining properties — typically during intense rainfall events. Canal water mixes with stormwater, lawn chemicals, and in many areas sewage, making it Category 3 contaminated water. River flooding from the Nerang River, Coomera River, or creek corridors involves larger volumes and longer inundation duration, but the contamination classification is the same. Canal flooding affects a much larger number of residential properties because of how closely canal estates are built to the water's edge.",
          },
          {
            question: 'Is Ex-TC Alfred flood damage still claimable in 2026?',
            answer:
              'Yes — Ex-TC Alfred struck in March 2026 and many Gold Coast properties have open or disputed claims as of April 2026. Insurers are managing high claim volumes across SEQ. If your Alfred claim has stalled, been partially paid, or if remediation work started but was not completed to a proper standard, you can lodge a supplementary claim or request a reassessment. NRPG provides independent scope assessments and documentation to support claim progression.',
          },
          {
            question: 'How do I know if my Gold Coast property has Category 3 contamination?',
            answer:
              "If your property was inundated by canal overflow, river flooding, or significant overland flow during a storm event, Category 3 contamination must be assumed until clearance testing confirms otherwise. You cannot visually identify contamination — canal and stormwater carry pathogens, sewage bacteria, and chemical residues that are invisible. Any contractor who dried your property without first performing decontamination and removing contaminated porous materials has not performed a Category 3 remediation. NRPG can assess properties for incomplete or inadequate prior remediation.",
          },
          {
            question: 'How much does flood damage restoration cost on the Gold Coast?',
            answer:
              'Gold Coast flood damage restoration costs vary significantly by category and extent: minor Category 2 flooding (clean water, limited area) — $6,000 to $20,000; Category 3 ground floor inundation — $15,000 to $60,000; multi-level inundation with significant contents loss — $40,000 to $150,000 or more. Canal estate properties often fall in the $15,000–$60,000 range due to the Category 3 decontamination requirement. These costs should be covered under your flood insurance extension — NRPG provides itemised scopes for insurer lodgement.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Gold Coast',
            href: '/water-damage-restoration-gold-coast',
            description: 'Emergency water damage restoration across all Gold Coast suburbs.',
          },
          {
            title: 'Storm Damage Restoration Gold Coast',
            href: '/storm-damage-restoration-gold-coast',
            description: 'Storm damage restoration and insurance claim support for the Gold Coast.',
          },
          {
            title: 'Mould Remediation Gold Coast',
            href: '/mould-remediation-gold-coast',
            description: 'Post-flood mould remediation across all Gold Coast suburbs.',
          },
          {
            title: 'Flood Damage Restoration Brisbane',
            href: '/flood-damage-restoration-brisbane',
            description: 'Flood damage restoration specialists across Brisbane.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
