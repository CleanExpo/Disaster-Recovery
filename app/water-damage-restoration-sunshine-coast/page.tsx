import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-476: Water Damage Restoration Sunshine Coast
 *
 * Created: 9 April 2026
 * Context: Sunshine Coast LGA was one of the highest-density Ex-TC Alfred claim
 * areas in SEQ. Hinterland rainfall, canal estates, and post-Alfred secondary
 * damage (mould, incomplete drying) drive strong ongoing demand.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Sunshine Coast | 24/7 IICRC Certified',
  description:
    'Professional water damage restoration across the Sunshine Coast. IICRC S500:2025 certified contractors. Ex-TC Alfred recovery support, hinterland seepage, canal estate flooding. Lodge your claim 24/7.',
  keywords:
    'water damage restoration sunshine coast, water damage sunshine coast, flood damage sunshine coast, noosa water damage, maroochydore water damage, caloundra water damage, alfred water damage sunshine coast, IICRC sunshine coast, structural drying sunshine coast',
  openGraph: {
    title: 'Water Damage Restoration Sunshine Coast | 24/7 Emergency Response',
    description:
      'Emergency water damage restoration across the Sunshine Coast. IICRC S500:2025 certified. Alfred and storm flood claim support. Noosa, Maroochydore, Caloundra, Kawana.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Sunshine Coast')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-sunshine-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-sunshine-coast/#localbusiness`,
  name: `${NAP.name} Sunshine Coast`,
  url: `${NAP.url}/water-damage-restoration-sunshine-coast`,
  description:
    'IICRC-certified water damage restoration contractors serving the Sunshine Coast 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Sunshine Coast',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sunshine Coast',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Sunshine Coast',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Sunshine Coast' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration on the Sunshine Coast: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, canal estate and hinterland seepage treatment, and full insurance claim documentation.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '8341',
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
      name: 'Is Ex-TC Alfred water damage still claimable on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most insurers do not impose strict time bars where damage can be attributed to the Alfred event. The Sunshine Coast LGA was among the highest-density claim areas in SEQ, and supplementary or late lodgements remain open where secondary damage — mould, incomplete drying, or structural movement — is documented. NRPG provides IICRC-compliant reporting to support claim lodgement or AFCA escalation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after water damage on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 48 hours. The Sunshine Coast's subtropical climate — average humidity of 65–70% and summer temperatures of 28–32°C — creates ideal mould germination conditions. Hinterland properties face even faster onset due to higher ambient moisture. Any unresolved water damage should be assessed by an IICRC-certified technician within 24 hours.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the IICRC S500:2025 standard and why does it matter for my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ANSI/IICRC S500:2025 is the current Australian standard governing water damage restoration methodology. It defines extraction protocols, drying targets, psychrometric documentation, and sign-off requirements. Insurers require drying logs produced to this standard. Restoration performed by non-certified contractors may not satisfy insurer requirements, leaving claim sign-off incomplete.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Sunshine Coast property still has hidden moisture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Warning signs include musty odour, soft or discoloured plasterboard, mould appearing weeks after drying, condensation on internal surfaces, and warping timber floors. Many Sunshine Coast properties damaged by Alfred are now — four to six weeks later — presenting these secondary symptoms as inadequate drying reaches equilibrium. NRPG technicians use thermal imaging cameras and calibrated moisture meters to identify hidden saturation in wall cavities and subfloor.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sunshine Coast water damage restoration ranges from $2,500–$10,000 for Category 1 clean water events (burst pipes, appliance overflow) to $5,000–$25,000 for Category 2 storm ingress, and $15,000–$70,000+ for Category 3 floodwater inundation. Canal estate and hinterland properties typically carry higher scope due to subfloor saturation and extended drying cycles.',
      },
    },
  ],
};

export default function WaterDamageRestorationSunshineCoastPage() {
  return (
    <>
      <Script
        id="wdrsc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrsc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrsc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Sunshine Coast"
        subtitle="Emergency water damage restoration across the Sunshine Coast. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Ex-TC Alfred recovery and secondary damage support available."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Sunshine Coast' },
        ]}
        sections={[
          {
            heading:
              'Water Damage on the Sunshine Coast — Ex-TC Alfred Recovery',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred made landfall across South East
                  Queensland in March 2026, generating over 132,000 ICA claims
                  across SEQ. The Sunshine Coast LGA was one of the
                  highest-density claim areas in the region, with Noosa River
                  and Maroochy River corridors experiencing major inundation.
                  PERILS confirmed a final insured loss of AU$1.877 billion —
                  the largest insured cyclone event since Debbie (2017).
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Four to six weeks after the event, many Sunshine Coast
                  properties are now presenting secondary damage. Inadequately
                  dried wall cavities, subfloor saturation, and mould colonies
                  hidden beneath surface finishes are emerging across properties
                  that appeared restored. This is a known failure pattern when
                  restoration is performed without IICRC S500:2025 psychrometric
                  drying documentation — drying is signed off visually rather
                  than to verified moisture targets.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  If your Sunshine Coast property shows signs of ongoing
                  moisture, mould, or structural issues after Alfred, NRPG can
                  provide an independent IICRC-certified moisture assessment and
                  produce the documentation required to lodge a supplementary
                  claim or escalate through AFCA.
                </p>
              </>
            ),
          },
          {
            heading:
              'The Sunshine Coast&apos;s Hidden Water Risk — Hinterland and Canals',
            body: (
              <>
                <p>
                  The Sunshine Coast&apos;s water damage risk profile extends
                  well beyond storm events. Two structural risk factors affect
                  properties year-round:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Hinterland rainfall and seepage.</strong> The
                  Sunshine Coast Hinterland — Maleny, Montville, Eumundi and
                  surrounding ranges — receives 1,500–2,000 mm of annual
                  rainfall, the highest in SEQ. Elevated moisture levels
                  generate persistent drainage issues, foundation seepage, and
                  subfloor saturation in older hinterland properties. Average
                  ambient humidity of 65–70% means any unresolved moisture
                  source enables mould establishment within 48 hours — and in
                  hinterland conditions, often faster.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Canal estate storm rise.</strong> The Sunshine
                  Coast&apos;s canal estates — Kawana Waters, Bokarina,
                  Wurtulla, and Birtinya — sit at or near water level. During
                  storm events and sustained rainfall, canal levels rise and
                  inundation risk extends to ground-floor living areas, garages,
                  and subfloor cavities. Properties in these estates that
                  experienced Alfred flooding are at elevated risk of secondary
                  damage given the extended subfloor drying cycles required.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In both environments, standard visual drying assessment is
                  insufficient. NRPG technicians use thermal imaging and
                  calibrated moisture meters to map residual moisture in
                  structural elements before issuing a drying certificate.
                </p>
              </>
            ),
          },
          {
            heading:
              'Water Damage Restoration Cost Estimates — Sunshine Coast 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>
                      Burst pipe or appliance overflow (Category 1):
                    </strong>{' '}
                    $2,500–$10,000. Water extraction, structural drying,
                    plasterboard and flooring repair. Hinterland properties may
                    attract extended drying costs due to ambient humidity.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Category 2):</strong>{' '}
                    $5,000–$25,000. Moisture mapping, commercial drying,
                    antimicrobial treatment, structural repairs. Canal estate
                    properties typically sit at the upper end of this range.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>
                      Floodwater inundation (Category 3 — Noosa River, Maroochy
                      River):
                    </strong>{' '}
                    $15,000–$70,000+. Full decontamination, subfloor treatment,
                    structural drying to IICRC S500:2025 psychrometric targets,
                    and restoration to pre-loss condition.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>
                      Post-Alfred secondary damage (hidden moisture / mould):
                    </strong>{' '}
                    Scope varies by extent. Re-remediation of inadequately dried
                    structures typically costs $8,000–$30,000 and is
                    claimable as secondary loss where primary damage was insured.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Sunshine Coast Suburbs We Cover',
            body: (
              <>
                <p>Emergency response across the Sunshine Coast LGA:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Noosa Corridor:</strong> Noosa Heads, Noosaville,
                  Tewantin, Cooroy, Pomona, Peregian Beach, Sunshine Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maroochydore / Buderim:</strong> Maroochydore,
                  Buderim, Mooloolaba, Alexandra Headland, Cotton Tree,
                  Kuluin, Kunda Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal Estates and Coastal South:</strong> Kawana
                  Waters, Bokarina, Wurtulla, Birtinya, Warana, Parrearra,
                  Currimundi, Caloundra, Kings Beach, Pelican Waters
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Sunshine Coast:</strong> Coolum Beach,
                  Yaroomba, Point Arkwright, Marcus Beach, Castaways Beach,
                  Doonan, Verrierdale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Nambour, Maleny, Montville,
                  Mapleton, Eumundi, Yandina, Bli Bli, Woombye
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question:
              'Is Ex-TC Alfred water damage still claimable on the Sunshine Coast?',
            answer:
              'Yes. Most insurers do not impose strict time bars where damage can be attributed to the Alfred event. The Sunshine Coast LGA was among the highest-density claim areas in SEQ, and supplementary or late lodgements remain open where secondary damage — mould, incomplete drying, or structural movement — is documented. NRPG provides IICRC-compliant reporting to support claim lodgement or AFCA escalation.',
          },
          {
            question:
              'How quickly does mould grow after water damage on the Sunshine Coast?',
            answer:
              "Within 48 hours. The Sunshine Coast's subtropical climate — average humidity of 65–70% and summer temperatures of 28–32°C — creates ideal mould germination conditions. Hinterland properties face even faster onset due to higher ambient moisture. Any unresolved water damage should be assessed by an IICRC-certified technician within 24 hours.",
          },
          {
            question:
              'What is the IICRC S500:2025 standard and why does it matter for my claim?',
            answer:
              'ANSI/IICRC S500:2025 is the current Australian standard governing water damage restoration methodology. It defines extraction protocols, drying targets, psychrometric documentation, and sign-off requirements. Insurers require drying logs produced to this standard. Restoration performed by non-certified contractors may not satisfy insurer requirements, leaving claim sign-off incomplete.',
          },
          {
            question:
              'How do I know if my Sunshine Coast property still has hidden moisture?',
            answer:
              'Warning signs include musty odour, soft or discoloured plasterboard, mould appearing weeks after drying, condensation on internal surfaces, and warping timber floors. Many Sunshine Coast properties damaged by Alfred are now — four to six weeks later — presenting these secondary symptoms. NRPG technicians use thermal imaging cameras and calibrated moisture meters to identify hidden saturation in wall cavities and subfloor.',
          },
          {
            question:
              'How much does water damage restoration cost on the Sunshine Coast?',
            answer:
              'Sunshine Coast water damage restoration ranges from $2,500–$10,000 for Category 1 clean water events (burst pipes, appliance overflow) to $5,000–$25,000 for Category 2 storm ingress, and $15,000–$70,000+ for Category 3 floodwater inundation. Canal estate and hinterland properties typically carry higher scope due to subfloor saturation and extended drying cycles.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Water Damage Restoration Sunshine Coast',
            href: '/storm-water-damage-restoration-sunshine-coast',
            description:
              'Specialist storm water damage restoration across the Sunshine Coast.',
          },
          {
            title: 'Mould Remediation Sunshine Coast',
            href: '/mould-remediation-sunshine-coast',
            description:
              'IICRC-certified mould remediation for properties affected by water damage.',
          },
          {
            title: 'Water Damage Restoration Brisbane',
            href: '/water-damage-restoration-brisbane',
            description:
              'Our Brisbane water damage restoration service — Alfred and storm claims.',
          },
          {
            title: 'Ex-TC Alfred Recovery',
            href: '/events/cyclone-alfred-queensland-2025',
            description:
              'Full recovery and claim support guide for Ex-TC Alfred across SEQ.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
