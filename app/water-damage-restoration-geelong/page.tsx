import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Geelong | Bay Exposure & Heritage Buildings 24/7',
  description:
    'Emergency water damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC S500:2025-certified contractors for westerly storm water ingress, heritage wool store conversions, and Surf Coast holiday homes. Lodge your claim 24/7.',
  keywords:
    'water damage restoration geelong, water damage geelong, water ingress geelong, heritage building water damage geelong, surf coast holiday home water damage, bellarine peninsula water damage, corio water damage, geelong water damage cost',
  openGraph: {
    title: 'Water Damage Restoration Geelong | Bay Exposure & Heritage Buildings 24/7',
    description:
      'Emergency water damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC S500:2025-certified contractors for westerly storm water ingress, heritage wool store conversions, and Surf Coast holiday homes.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Geelong')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-geelong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-geelong/#localbusiness`,
  name: `${NAP.name} Geelong`,
  url: `${NAP.url}/water-damage-restoration-geelong`,
  description:
    '24/7 emergency water damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC S500:2025-certified contractor network for westerly storm water ingress, heritage wool store conversions, Surf Coast holiday homes, and Corio Bay coastal flooding. Full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Geelong',
    addressRegion: 'VIC',
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
  name: 'Emergency Water Damage Restoration Geelong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration across Geelong to IICRC S500:2025 standard. Emergency extraction, structural drying, heritage building water damage treatment, Surf Coast holiday home assessment, and full insurance documentation.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does Geelong get water ingress from different angles than other Victorian cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Geelong's position at the western end of Port Phillip Bay means westerly weather fronts arrive from the Southern Ocean across Bass Strait and the Otway Ranges with minimal shelter. This produces wind-driven rain that enters buildings from angles that standard Victorian construction does not anticipate — particularly western and south-western faces. Buildings in Geelong, the Bellarine Peninsula, and the Surf Coast designed to drain toward the west regularly experience water ingress through window frames, roof junctions, and cladding joints during major westerly events. The 2010 Geelong storms produced widespread water ingress across the LGA from roof failures and unexpected wind-driven rain penetration.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the challenges of water damage in Geelong\'s heritage wool store conversions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Geelong's waterfront precinct contains a significant number of former wool stores and industrial warehouses now converted to apartments, offices, and hospitality venues. These buildings — many constructed in the mid-to-late 1800s — have original brick and bluestone construction with aging damp-proofing that was designed for single-use industrial occupancy, not residential or commercial conversion. Water damage in these buildings requires specialist treatment: standard drying equipment is insufficient for bluestone and thick heritage brick construction, and invasive moisture mapping is often required to locate where water has migrated within the original masonry. Heritage approvals may also apply to remediation methods, particularly in buildings on the Victorian Heritage Register.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover water damage in Surf Coast holiday homes that are unoccupied for months?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most Australian home and landlord insurance policies include conditions around unoccupied properties — typically requiring notification to the insurer if a property will be vacant for more than 60 consecutive days. For Surf Coast holiday homes at Torquay, Anglesea, and Jan Juc that may be empty through winter, this is a significant consideration. Water damage discovered upon return — from a slow roof leak, burst pipe, or window failure during a winter storm — may face insurer scrutiny regarding the duration of the damage and whether the unoccupancy condition was satisfied. Engaging IICRC-certified contractors who can document the likely onset of the damage event is important to supporting the claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does water damage restoration typically cost in Geelong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage restoration costs in Geelong vary by damage category and property type. Indicative ranges: Category 1 clean water (burst pipe, appliance leak) $2,000–$10,000; storm water ingress with structural drying and internal reinstatement $5,000–$25,000; heritage commercial conversion (former wool store or warehouse) requiring specialist masonry drying and possible heritage approvals $15,000–$60,000+. Surf Coast holiday homes may incur additional costs due to extended response logistics from Geelong.',
      },
    },
  ],
};

export default function WaterDamageRestorationGeelongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="wdrgeelong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrgeelong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrgeelong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Geelong"
        subtitle="Emergency water damage restoration across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC S500:2025-certified contractors for westerly storm water ingress, heritage wool store conversions, and seasonal Surf Coast holiday homes."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Geelong' },
        ]}
        sections={[
          {
            heading: 'Geelong Water Damage Risk — Bay Exposure and Heritage Buildings',
            body: (
              <>
                <p>
                  Geelong&apos;s coastal position at the western end of Port Phillip Bay creates water
                  damage risks that are distinct from other Victorian cities. Westerly weather fronts
                  approach from the Southern Ocean across Bass Strait with minimal shelter, generating
                  wind-driven rain that enters buildings from angles not anticipated by standard
                  construction practice. Western and south-western building faces — particularly
                  window frames, roof-wall junctions, and older cladding joints — are the primary
                  failure points during major westerly events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2010 Geelong storms produced widespread water ingress from roof failures and
                  wind-driven rain penetration across the LGA. Low-lying industrial areas in Corio and
                  Norlane are additionally exposed to Corio Bay flooding during high tide and storm
                  surge combinations, where groundwater and stormwater overwhelm drainage in the
                  flat industrial precinct.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Geelong&apos;s waterfront precinct contains a significant number of former wool
                  stores and industrial warehouses converted to apartments, offices, and hospitality
                  venues. These heritage buildings &mdash; many constructed in the mid-to-late 1800s
                  &mdash; have original brick and bluestone construction with aging damp-proofing
                  designed for single-use industrial occupancy. Water damage in these buildings
                  requires specialist treatment: standard drying equipment is insufficient for thick
                  heritage masonry, and invasive moisture mapping is needed to locate where water
                  has migrated within the original stonework. Heritage approvals may also govern
                  remediation methods.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors operate across Greater Geelong, the Bellarine Peninsula, and
                  Surf Coast with 24-hour emergency response. Extended response times apply to
                  remote Surf Coast locations beyond Torquay.
                </p>
              </>
            ),
          },
          {
            heading: 'Surf Coast Holiday Home Water Damage',
            body: (
              <>
                <p>
                  Torquay, Jan Juc, and Anglesea are home to a large volume of holiday properties
                  that may be unoccupied for months at a time &mdash; particularly through winter.
                  Water damage that occurs during an unoccupied period is often not discovered until
                  the owners return, by which point a slow leak or single storm event may have caused
                  significant secondary damage: structural drying requirements increase substantially
                  the longer water sits in wall cavities, subfloors, and ceiling voids.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Most insurance policies include unoccupancy conditions requiring notification to
                  the insurer if a property will be vacant for more than 60 consecutive days. Water
                  damage discovered months after the event may face insurer scrutiny on the duration
                  of damage and unoccupancy compliance. IICRC-certified documentation that
                  establishes the likely onset of the water event &mdash; through moisture mapping,
                  material sampling, and weather correlation &mdash; is essential for supporting
                  insurance claims on unoccupied Surf Coast properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Indicative costs for Surf Coast holiday home water damage: $2,000&ndash;$10,000
                  for Category 1 water damage with timely response; $5,000&ndash;$25,000 for
                  storm water ingress with delayed discovery requiring full structural drying.
                  Additional response logistics apply for properties beyond Torquay.
                </p>
              </>
            ),
          },
          {
            heading: 'Geelong Suburbs We Cover',
            body: (
              <>
                <p>Emergency water damage response across Greater Geelong, Bellarine Peninsula, and Surf Coast:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Geelong Metro:</strong> Geelong CBD, Newtown, South Geelong, Belmont,
                  Highton, East Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial Precinct:</strong> Corio, Norlane, North Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bellarine Peninsula:</strong> Leopold, Ocean Grove, Barwon Heads
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Surf Coast:</strong> Torquay, Jan Juc, Anglesea (extended response time
                  applies beyond Torquay)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why does Geelong get water ingress from different angles than other Victorian cities?',
            answer:
              "Geelong's position at the western end of Port Phillip Bay means westerly weather fronts arrive from the Southern Ocean across Bass Strait and the Otway Ranges with minimal shelter. This produces wind-driven rain that enters buildings from angles that standard Victorian construction does not anticipate — particularly western and south-western faces. Buildings in Geelong, the Bellarine Peninsula, and the Surf Coast designed to drain toward the west regularly experience water ingress through window frames, roof junctions, and cladding joints during major westerly events. The 2010 Geelong storms produced widespread water ingress across the LGA from roof failures and unexpected wind-driven rain penetration.",
          },
          {
            question: "What are the challenges of water damage in Geelong's heritage wool store conversions?",
            answer:
              "Geelong's waterfront precinct contains a significant number of former wool stores and industrial warehouses now converted to apartments, offices, and hospitality venues. These buildings — many constructed in the mid-to-late 1800s — have original brick and bluestone construction with aging damp-proofing that was designed for single-use industrial occupancy, not residential or commercial conversion. Water damage in these buildings requires specialist treatment: standard drying equipment is insufficient for bluestone and thick heritage brick construction, and invasive moisture mapping is often required to locate where water has migrated within the original masonry. Heritage approvals may also apply to remediation methods, particularly in buildings on the Victorian Heritage Register.",
          },
          {
            question: 'Does home insurance cover water damage in Surf Coast holiday homes that are unoccupied for months?',
            answer:
              "Most Australian home and landlord insurance policies include conditions around unoccupied properties — typically requiring notification to the insurer if a property will be vacant for more than 60 consecutive days. For Surf Coast holiday homes at Torquay, Anglesea, and Jan Juc that may be empty through winter, this is a significant consideration. Water damage discovered upon return — from a slow roof leak, burst pipe, or window failure during a winter storm — may face insurer scrutiny regarding the duration of the damage and whether the unoccupancy condition was satisfied. Engaging IICRC-certified contractors who can document the likely onset of the damage event is important to supporting the claim.",
          },
          {
            question: 'What does water damage restoration typically cost in Geelong?',
            answer:
              'Water damage restoration costs in Geelong vary by damage category and property type. Indicative ranges: Category 1 clean water (burst pipe, appliance leak) $2,000–$10,000; storm water ingress with structural drying and internal reinstatement $5,000–$25,000; heritage commercial conversion (former wool store or warehouse) requiring specialist masonry drying and possible heritage approvals $15,000–$60,000+. Surf Coast holiday homes may incur additional costs due to extended response logistics from Geelong.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Geelong',
            href: '/storm-damage-restoration-geelong',
            description: 'Emergency storm damage restoration across Geelong and the Surf Coast.',
          },
          {
            title: 'Mould Remediation Geelong',
            href: '/mould-remediation-geelong',
            description: 'IICRC S520-certified mould remediation across Geelong and the Bellarine Peninsula.',
          },
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'Emergency water damage restoration across Melbourne.',
          },
          {
            title: 'Flood Damage Restoration Melbourne',
            href: '/flood-damage-restoration-melbourne',
            description: 'IICRC Category 2–3 flood damage restoration across Melbourne.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
