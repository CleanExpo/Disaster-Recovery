import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Canberra | Burst Pipes, Storm Ingress & Heritage 24/7',
  description:
    'Emergency water damage restoration across Canberra and the ACT. IICRC S500-certified contractors for burst pipes, frozen pipe damage, storm water ingress, and government/heritage building water damage. Lodge your claim 24/7.',
  keywords:
    'water damage restoration canberra, water damage canberra, burst pipe canberra, frozen pipes canberra, storm water ingress canberra ACT, heritage water damage canberra, water damage repair ACT',
  openGraph: {
    title: 'Water Damage Restoration Canberra | Burst Pipes, Storm Ingress & Heritage 24/7',
    description:
      'Emergency water damage restoration across Canberra and the ACT. IICRC S500-certified contractors for burst pipes, frozen pipe damage, storm water ingress, and government/heritage building water damage. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Canberra')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-canberra`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-canberra/#localbusiness`,
  name: `${NAP.name} Canberra`,
  url: `${NAP.url}/water-damage-restoration-canberra`,
  description:
    '24/7 emergency water damage restoration in Canberra and the ACT. IICRC S500-certified contractor network for burst pipes, frozen pipe damage, storm water ingress, and specialist government and heritage building water damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Canberra',
    containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Canberra',
    addressRegion: 'ACT',
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
  name: 'Emergency Water Damage Restoration Canberra',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Canberra',
    containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' },
  },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration across Canberra and the ACT to IICRC S500:2025 standard. Emergency extraction, structural drying, frozen pipe response, storm water ingress repair, heritage and government building specialists, and full insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Canberra home insurance cover burst pipes in winter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — burst pipe damage from freezing is covered under the escape of liquid provision of most standard Australian home insurance policies, provided the burst was sudden and not the result of gradual deterioration. Canberra winters regularly reach -5°C to +5°C overnight, making frozen pipes a genuine risk in poorly insulated Tuggeranong, Belconnen, and outer suburb homes. Document the damage immediately and contact NRPG for an IICRC S500-certified scope assessment before accepting the insurer's initial settlement.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is the 2020 hailstorm water ingress still claimable in Canberra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If water ingress following the January 2020 ACT hailstorm is ongoing due to incomplete roof repairs, the ongoing damage may constitute a separate or continuing loss depending on your policy terms. If your original claim was declined or underpaid, you can escalate to AFCA within 2 years of your insurer's final decision. NRPG provides independent IICRC-certified scope documentation to support dispute lodgement.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG restore water damage in Canberra government or heritage buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG contractors are experienced with the requirements of ACT Heritage-listed and government building stock. Water damage in heritage buildings requires specialist drying approaches to avoid damage to lime plaster, heritage timbers, and original finishes. NRPG produces IICRC S500-standard documentation suitable for ACT Heritage Council review where required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Canberra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical Canberra water damage restoration costs: Category 1 burst pipe (clean water, single room) $2,000–$10,000; storm water ingress (multiple rooms, structural drying) $5,000–$25,000; government or heritage building water damage $15,000–$60,000+. NRPG provides an itemised scope of works before any work commences.',
      },
    },
  ],
};

export default function WaterDamageRestorationCanberraPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="wdrcbr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrcbr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrcbr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Canberra"
        subtitle="Emergency water damage restoration across Canberra and the ACT. IICRC S500-certified contractors for burst pipes, frozen pipe damage, storm water ingress, and specialist government and heritage building restoration. 24-hour response."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Canberra' },
        ]}
        sections={[
          {
            heading: "Canberra Water Damage Risk — Hailstorm Ingress and Frozen Pipes",
            body: (
              <>
                <p>
                  Canberra&apos;s inland climate creates a paradoxical water damage risk profile. Summer
                  relative humidity runs low (30–50%), but intense convective storms produce sudden, high-volume
                  water events — particularly hailstorms where damaged roofs allow direct water ingress into
                  ceiling and wall cavities within minutes.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The January 2020 ACT hailstorm was the defining water damage event in Canberra&apos;s recent
                  history. Hail penetrated roofs across more than 80,000 properties, causing widespread water
                  ingress. Many repairs were incomplete or temporary, and ongoing water entry has caused
                  progressive damage to insulation, ceiling linings, and wall framing across the northern and
                  inner-city suburbs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In winter, Canberra is one of the coldest Australian capital cities, with overnight temperatures
                  regularly reaching &minus;5&deg;C to +5&deg;C from June to August. Older homes in Tuggeranong,
                  Belconnen, and outer fringe suburbs with inadequate pipe insulation face genuine frozen pipe
                  risk. A burst pipe in a Canberra winter can discharge hundreds of litres before it is detected
                  in a poorly monitored roof space or subfloor.
                </p>
              </>
            ),
          },
          {
            heading: 'Government and Heritage Water Damage in the ACT',
            background: 'light' as const,
            body: (
              <>
                <p>
                  Canberra has Australia&apos;s highest concentration of government and heritage buildings per
                  capita. Commonwealth government offices, ACT government facilities, embassy precincts, and
                  Heritage-listed residential stock in Barton, Griffith, Kingston, and Red Hill require
                  specialist water damage restoration approaches.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Water damage in these building types presents specific challenges:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage lime plaster and masonry</strong> must be dried using controlled,
                    low-temperature methods to avoid further surface damage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Original timber flooring and joinery</strong> requires careful psychrometric
                    management to prevent cupping, splitting, or delamination during structural drying
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Government building chain of custody</strong> requirements mean documentation
                    must meet both IICRC S500:2025 standard and agency procurement and reporting requirements
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG provides IICRC S500:2025-standard water damage documentation suitable for Heritage
                  Council and government agency review.
                </p>
              </>
            ),
          },
          {
            heading: 'Canberra Suburbs We Cover',
            body: (
              <>
                <p>24-hour emergency water damage response across Canberra and the ACT:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Canberra:</strong> Canberra CBD/Civic, Barton, Griffith, Kingston,
                  Manuka, Forrest, Deakin, Yarralumla, Red Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Bruce, Mitchell, Gungahlin, Belconnen, Holt,
                  Macquarie, Flynn, Florey
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Tuggeranong, Wanniassa, Weston Creek, Banks,
                  Conder, Gordon, Kambah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North / Inner South:</strong> Ainslie, Braddon, Turner, Reid,
                  Narrabundah, Fyshwick, Woden, Phillip, Hume
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Queanbeyan (NSW border):</strong> Queanbeyan, Jerrabomberra, Karabar
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does Canberra home insurance cover burst pipes in winter?',
            answer:
              "Yes — burst pipe damage from freezing is covered under the escape of liquid provision of most standard Australian home insurance policies, provided the burst was sudden and not the result of gradual deterioration. Canberra winters regularly reach -5°C to +5°C overnight, making frozen pipes a genuine risk in poorly insulated Tuggeranong, Belconnen, and outer suburb homes. Document the damage immediately and contact NRPG for an IICRC S500-certified scope assessment before accepting the insurer's initial settlement.",
          },
          {
            question: 'Is the 2020 hailstorm water ingress still claimable in Canberra?',
            answer:
              "If water ingress following the January 2020 ACT hailstorm is ongoing due to incomplete roof repairs, the ongoing damage may constitute a separate or continuing loss depending on your policy terms. If your original claim was declined or underpaid, you can escalate to AFCA within 2 years of your insurer's final decision. NRPG provides independent IICRC-certified scope documentation to support dispute lodgement.",
          },
          {
            question: 'Can NRPG restore water damage in Canberra government or heritage buildings?',
            answer:
              'Yes. NRPG contractors are experienced with the requirements of ACT Heritage-listed and government building stock. Water damage in heritage buildings requires specialist drying approaches to avoid damage to lime plaster, heritage timbers, and original finishes. NRPG produces IICRC S500-standard documentation suitable for ACT Heritage Council review where required.',
          },
          {
            question: 'How much does water damage restoration cost in Canberra?',
            answer:
              'Typical Canberra water damage restoration costs: Category 1 burst pipe (clean water, single room) $2,000–$10,000; storm water ingress (multiple rooms, structural drying) $5,000–$25,000; government or heritage building water damage $15,000–$60,000+. NRPG provides an itemised scope of works before any work commences.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Canberra',
            href: '/storm-damage-restoration-canberra',
            description: 'IICRC-certified storm damage restoration across Canberra and the ACT.',
          },
          {
            title: 'Mould Remediation Canberra',
            href: '/mould-remediation-canberra',
            description: 'Post-storm and post-hailstorm mould remediation across Canberra.',
          },
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'Emergency water damage restoration across Melbourne and Victoria.',
          },
          {
            title: 'Water Damage Restoration Sydney',
            href: '/water-damage-restoration-sydney',
            description: 'Emergency water damage restoration across Sydney.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
