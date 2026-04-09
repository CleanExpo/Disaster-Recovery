import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Canberra | Hail, Wind & Bushfire Interface 24/7',
  description:
    'Emergency storm damage restoration across Canberra and the ACT. IICRC-certified contractors for hail damage, roof repairs, wind damage, and bushfire interface storm loss. Heritage ACT building specialists. Lodge your claim 24/7.',
  keywords:
    'storm damage restoration canberra, storm damage canberra, hail damage canberra, roof damage canberra ACT, wind damage canberra, storm restoration ACT, 2020 canberra hailstorm, heritage building storm repair canberra',
  openGraph: {
    title: 'Storm Damage Restoration Canberra | Hail, Wind & Bushfire Interface 24/7',
    description:
      'Emergency storm damage restoration across Canberra and the ACT. IICRC-certified contractors for hail damage, roof repairs, wind damage, and bushfire interface storm loss. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Canberra')}&service=storm-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-canberra`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-canberra/#localbusiness`,
  name: `${NAP.name} Canberra`,
  url: `${NAP.url}/storm-damage-restoration-canberra`,
  description:
    '24/7 emergency storm damage restoration across Canberra and the ACT. IICRC-certified contractor network for hail damage, wind damage, roof repairs, bushfire interface storm loss, and Heritage-listed building restoration.',
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
  name: 'Emergency Storm Damage Restoration Canberra',
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
  serviceType: 'Storm Damage Restoration',
  description:
    'Professional storm damage restoration across Canberra and the ACT including emergency make-safe, roof tarping, hail damage repair, structural restoration, Heritage-listed building repair, and full insurance documentation to IICRC S500 and S700 standard.',
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
      name: 'Can I still lodge a claim for the 2020 ACT hailstorm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The general limitation period for lodging a new first-party insurance claim is typically within 3 years of the event, but your policy terms govern — check your Product Disclosure Statement. If your claim was lodged but disputed or underpaid, you can escalate to AFCA within 2 years of your insurer's final decision. NRPG can provide an independent IICRC-certified scope assessment to support a dispute regardless of when the original claim was lodged.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Heritage overlay affect how my storm damage is repaired in Canberra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. ACT Heritage-listed buildings and properties in Heritage precincts may require ACT Heritage Council approval before certain repair methods are used. NRPG's contractors are experienced with heritage-compatible storm repair approaches — matching original materials and finishes — and can document the scope in a format suitable for Heritage Council review. Confirm heritage overlay requirements with your insurer before work commences.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Canberra storm damage claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool applies only to eligible properties in designated cyclone zones — northern Western Australia, Northern Territory, Queensland, and parts of regional South Australia. Canberra and the ACT are not in the cyclone pool zone. Standard home insurance storm provisions apply to ACT properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does storm damage restoration cost in Canberra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical cost ranges for Canberra storm damage: hail and minor structural damage $2,500–$15,000; major structural damage with water ingress $8,000–$40,000; bushfire interface storm loss (southern and western suburbs bordering Namadgi) $30,000–$100,000+. Heritage-listed building repairs typically attract a premium of 15–30% above standard cost due to specialist material and method requirements. NRPG provides an itemised scope before work commences.',
      },
    },
  ],
};

export default function StormDamageRestorationCanberraPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="sdrcbr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="sdrcbr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="sdrcbr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Canberra"
        subtitle="Emergency storm damage restoration across Canberra and the ACT. IICRC-certified contractors for hail damage, wind damage, roof failures, bushfire interface storm loss, and Heritage-listed building repair. 24-hour response."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Canberra' },
        ]}
        sections={[
          {
            heading: "Canberra Storm Risk — 2020 Hailstorm and the Bush-Urban Interface",
            body: (
              <>
                <p>
                  Canberra&apos;s position at 35&deg;S gives the ACT a distinct two-season storm risk profile.
                  Summer (October&ndash;March) brings severe thunderstorms and hail events driven by hot inland
                  air meeting moisture from the east. Winter cold fronts bring ice, frost, and wind events that
                  damage roofs and structural elements, particularly in elevated southern suburbs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The January 2020 ACT hailstorm remains one of Australia&apos;s most destructive hailstorm events,
                  generating over AU$950 million in insured losses and damaging more than 80,000 homes. Suburbs
                  including Mitchell, Bruce, and Gungahlin were among the hardest hit, with golf ball-sized hail
                  causing widespread roof penetration and water ingress. Thousands of homes remain affected by
                  incomplete repairs and ongoing water ingress more than five years after the event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Canberra&apos;s bush-urban interface presents a further risk layer. Western and southern suburbs
                  including Weston Creek, Tuggeranong, and the southern Tuggeranong Valley border Namadgi National
                  Park. The 2003 Canberra bushfires &mdash; the worst urban bushfire disaster in Australian history
                  &mdash; destroyed over 500 homes in these fringe suburbs. Storm events in this interface zone
                  can combine wind and ember transport with structural damage, creating complex multi-peril claims.
                </p>
              </>
            ),
          },
          {
            heading: 'ACT Heritage Building Storm Damage',
            background: 'light' as const,
            body: (
              <>
                <p>
                  Canberra has a high concentration of Heritage-listed and heritage-nominated buildings,
                  including ACT government and Commonwealth facilities, inner-city residential precincts in
                  Barton, Griffith, and Kingston, and the Parliamentary Triangle. Storm damage to Heritage-listed
                  buildings in the ACT involves regulatory requirements that standard residential contractors
                  are not equipped to navigate.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Key considerations for ACT Heritage storm damage:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ACT Heritage Council approval</strong> may be required for repair methods that
                    alter the heritage fabric — including roof tile replacement, structural member repair,
                    and external surface treatments
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Original material matching</strong> is often required — slate, terracotta, and
                    hand-made brick equivalents must be sourced to maintain Heritage compliance
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurance documentation</strong> must support Heritage Council review — NRPG
                    produces IICRC S500/S700-standard scopes suitable for both insurer and Heritage
                    Council sign-off
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors are experienced with the ACT Heritage framework and can advise on
                  repair pathways that meet both IICRC standards and Heritage Council requirements.
                </p>
              </>
            ),
          },
          {
            heading: 'Canberra Suburbs We Cover',
            body: (
              <>
                <p>24-hour emergency storm response across Canberra and the ACT:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Canberra:</strong> Canberra CBD/Civic, Barton, Griffith, Kingston,
                  Manuka, Forrest, Deakin, Yarralumla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Bruce, Mitchell, Gungahlin, Belconnen, Holt,
                  Macquarie, Flynn, Florey (hardest hit in 2020 hailstorm)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Tuggeranong, Wanniassa, Macquarie, Weston Creek,
                  Banks, Conder, Gordon (bush-urban interface zone)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North / Inner South:</strong> Ainslie, Braddon, Turner, Reid, Narrabundah,
                  Fyshwick, Hume
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Queanbeyan (NSW border):</strong> Queanbeyan, Jerrabomberra, Karabar
                  (adjacent ACT coverage)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Can I still lodge a claim for the 2020 ACT hailstorm?',
            answer:
              "The general limitation period for lodging a new first-party insurance claim is typically within 3 years of the event, but your policy terms govern — check your Product Disclosure Statement. If your claim was lodged but disputed or underpaid, you can escalate to AFCA within 2 years of your insurer's final decision. NRPG can provide an independent IICRC-certified scope assessment to support a dispute regardless of when the original claim was lodged.",
          },
          {
            question: 'Does Heritage overlay affect how my storm damage is repaired in Canberra?',
            answer:
              "Yes. ACT Heritage-listed buildings and properties in Heritage precincts may require ACT Heritage Council approval before certain repair methods are used. NRPG's contractors are experienced with heritage-compatible storm repair approaches — matching original materials and finishes — and can document the scope in a format suitable for Heritage Council review. Confirm heritage overlay requirements with your insurer before work commences.",
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to Canberra storm damage claims?',
            answer:
              'No. The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool applies only to eligible properties in designated cyclone zones — northern Western Australia, Northern Territory, Queensland, and parts of regional South Australia. Canberra and the ACT are not in the cyclone pool zone. Standard home insurance storm provisions apply to ACT properties.',
          },
          {
            question: 'How much does storm damage restoration cost in Canberra?',
            answer:
              'Typical cost ranges for Canberra storm damage: hail and minor structural damage $2,500–$15,000; major structural damage with water ingress $8,000–$40,000; bushfire interface storm loss (southern and western suburbs bordering Namadgi) $30,000–$100,000+. Heritage-listed building repairs typically attract a premium of 15–30% above standard cost due to specialist material and method requirements. NRPG provides an itemised scope before work commences.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Canberra',
            href: '/water-damage-restoration-canberra',
            description: 'IICRC-certified water damage restoration across Canberra and the ACT.',
          },
          {
            title: 'Mould Remediation Canberra',
            href: '/mould-remediation-canberra',
            description: 'Post-storm and post-hailstorm mould remediation across Canberra.',
          },
          {
            title: 'Storm Damage Restoration Melbourne',
            href: '/storm-damage-restoration-melbourne',
            description: 'Storm and hail damage restoration across Melbourne and Victoria.',
          },
          {
            title: 'Flood Damage Restoration Sydney',
            href: '/flood-damage-restoration-sydney',
            description: 'Emergency flood damage restoration across Sydney.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
