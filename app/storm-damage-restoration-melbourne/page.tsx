import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Melbourne | Hail, Wind & Roof Damage 24/7',
  description: 'Emergency storm damage restoration across Melbourne. IICRC-certified contractors for hail damage, roof repairs, wind damage, and structural make-safe. Melbourne storm season response. Lodge your claim 24/7.',
  keywords: 'storm damage restoration melbourne, storm damage melbourne, hail damage melbourne, roof damage melbourne, wind damage melbourne, storm restoration victoria, storm damage repair melbourne',
  openGraph: {
    title: 'Storm Damage Restoration Melbourne | Hail, Wind & Roof Damage 24/7',
    description: 'Emergency storm damage restoration across Melbourne. IICRC-certified contractors for hail damage, roof repairs, wind damage, and structural make-safe. Melbourne storm season response. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Melbourne')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-melbourne`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-melbourne/#localbusiness`,
  name: `${NAP.name} Melbourne`,
  url: `${NAP.url}/storm-damage-restoration-melbourne`,
  description: '24/7 emergency storm damage restoration across Melbourne. IICRC-certified contractor network for hail damage, wind damage, roof repairs, and structural make-safe.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Melbourne', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Melbourne',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Melbourne', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Melbourne including emergency make-safe, roof tarping, hail damage repair, structural restoration, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Melbourne home insurance cover hail damage to terracotta tiles?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 hail impact damage to terracotta roof tiles is covered under the storm damage provision of most standard Australian home insurance policies. The challenge is proving the damage occurred during the specific storm event. NRPG\u2019s IICRC-certified scope assessment documents the damage with thermal imaging and calibrated moisture readings, providing the evidence base the insurer needs for sign-off.' },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Melbourne property has hail damage after a storm?',
      acceptedAnswer: { '@type': 'Answer', text: 'Check (safely from ground level) for: visible fractured or displaced tiles; soft spots in gutters and downpipes; cracked skylights or damaged flashings; dents in metal fascia or HVAC condensers. Inside, check ceilings for moisture stains in the days after the storm. NRPG provides a full IICRC-certified roof inspection to identify all hail impacts before scope is lodged.' },
    },
    {
      '@type': 'Question',
      name: 'What is the storm damage excess on Melbourne home insurance?',
      acceptedAnswer: { '@type': 'Answer', text: "Most standard Victorian policies have a storm damage excess of $250\u2013$1,000 for the building component, with a separate higher excess for flood. Some policies have a separate \u2018storm\u2019 excess applied specifically to roof damage. Check your PDS. NRPG does not provide policy advice but can help ensure the full damage scope is documented so the claim exceeds the excess threshold." },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG help with a disputed Melbourne storm claim?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. If your Melbourne storm damage claim was declined or underpaid, NRPG provides an independent IICRC-certified scope reassessment with thermal imaging evidence. This documentation supports AFCA dispute lodgement. Contact NRPG at disasterrecovery.com.au/claim.' },
    },
  ],
};

export default function StormDamageRestorationMelbournePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrmelb-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrmelb-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrmelb-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Melbourne"
        subtitle="Emergency storm damage restoration across Melbourne and Victoria. IICRC-certified contractors for hail, wind damage, roof failures, and structural make-safe. priority response, 24 hours a day."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Melbourne' },
        ]}
        sections={[
          {
            heading: "Melbourne's Storm Season — Hail, Wind, and Flash Flooding",
            body: (
              <>
                <p>
                  Melbourne experiences more days with thunderstorm activity than any other Australian capital. The
                  city&apos;s geographic position &mdash; between the Great Dividing Range to the northeast and Bass
                  Strait to the south &mdash; creates temperature contrasts that fuel severe convective storms,
                  particularly during spring and summer (October&ndash;March).
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 6 January 2016 Melbourne hailstorm produced golf ball-sized hail across the eastern and
                  southeastern suburbs, generating over AU$1.1 billion in insured losses. Melbourne&apos;s inner-city
                  heritage suburbs (with terracotta tile roofs) and outer eastern growth corridors (with Colorbond
                  and concrete tile construction) face distinct storm damage patterns that NRPG contractors are
                  equipped to assess and restore.
                </p>
              </>
            ),
          },
          {
            heading: 'Hail Damage Assessment — What Melbourne Property Owners Miss',
            body: (
              <>
                <p>
                  Melbourne&apos;s most underinsured storm loss category is hail damage to terracotta roof tiles.
                  Unlike concrete or metal roofing, terracotta tiles absorb kinetic energy from hail impact without
                  immediately fracturing &mdash; cracks develop over subsequent months as tiles are subjected to
                  thermal cycling.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  A property assessed immediately after a hailstorm may show minimal visible damage, only for leaks
                  to appear in autumn or winter. NRPG&apos;s IICRC-certified scope assessment includes thermal
                  imaging to identify moisture ingress through cracked tiles that are not visible from the ground.
                  Request a full scope assessment before accepting the insurer&apos;s initial settlement.
                </p>
              </>
            ),
          },
          {
            heading: 'Melbourne Suburbs We Cover',
            body: (
              <>
                <p>priority emergency storm response across Melbourne metro:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City:</strong> Melbourne CBD, South Melbourne, Port Melbourne, Docklands, Fitzroy,
                  Collingwood
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner East:</strong> Hawthorn, Kew, Balwyn, Camberwell, Doncaster, Box Hill, Glen Waverley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer East:</strong> Ringwood, Croydon, Bayswater, Ferntree Gully, Boronia (storm damage
                  hail alley)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Brunswick, Coburg, Preston, Heidelberg, Northcote
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bayside:</strong> Brighton, Hampton, Sandringham, Mentone, Cheltenham, Moorabbin
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>West/North West:</strong> Footscray, Sunshine, Deer Park, Werribee, Melton, Sunbury
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer South East:</strong> Dandenong, Narre Warren, Berwick, Pakenham, Cranbourne
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does Melbourne home insurance cover hail damage to terracotta tiles?',
            answer: "Yes — hail impact damage to terracotta roof tiles is covered under the storm damage provision of most standard Australian home insurance policies. The challenge is proving the damage occurred during the specific storm event. NRPG's IICRC-certified scope assessment documents the damage with thermal imaging and calibrated moisture readings, providing the evidence base the insurer needs for sign-off.",
          },
          {
            question: 'How do I know if my Melbourne property has hail damage after a storm?',
            answer: 'Check (safely from ground level) for: visible fractured or displaced tiles; soft spots in gutters and downpipes; cracked skylights or damaged flashings; dents in metal fascia or HVAC condensers. Inside, check ceilings for moisture stains in the days after the storm. NRPG provides a full IICRC-certified roof inspection to identify all hail impacts before scope is lodged.',
          },
          {
            question: 'What is the storm damage excess on Melbourne home insurance?',
            answer: "Most standard Victorian policies have a storm damage excess of $250–$1,000 for the building component, with a separate higher excess for flood. Some policies have a separate 'storm' excess applied specifically to roof damage. Check your PDS. NRPG does not provide policy advice but can help ensure the full damage scope is documented so the claim exceeds the excess threshold.",
          },
          {
            question: 'Can NRPG help with a disputed Melbourne storm claim?',
            answer: 'Yes. If your Melbourne storm damage claim was declined or underpaid, NRPG provides an independent IICRC-certified scope reassessment with thermal imaging evidence. This documentation supports AFCA dispute lodgement. Contact NRPG at disasterrecovery.com.au/claim.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'IICRC-certified water damage restoration across Melbourne.' },
          { title: 'Fire Damage Restoration Melbourne', href: '/fire-damage-restoration-melbourne', description: 'Melbourne fire and smoke damage restoration.' },
          { title: 'Storm Damage Restoration Sydney', href: '/storm-damage-restoration-sydney', description: 'Sydney storm and hail damage restoration.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
