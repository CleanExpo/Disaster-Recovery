import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Darwin | Cyclone & Wet Season Storm Damage 24/7',
  description: 'Emergency storm damage restoration across Darwin and the NT. IICRC-certified contractors for cyclone structural damage, Wet Season storm damage, highset home repairs, and lightning strike events. TC Maila watch zone — lodge your claim 24/7.',
  keywords: 'storm damage restoration darwin, cyclone damage darwin, TC Maila darwin, storm damage NT, wet season storm damage darwin, cyclone repair darwin, storm restoration northern territory, highset home storm damage darwin',
  openGraph: {
    title: 'Storm Damage Restoration Darwin | Cyclone & Wet Season Storm Damage 24/7',
    description: 'Emergency storm damage restoration across Darwin and the NT. IICRC-certified contractors for cyclone structural damage, Wet Season storm damage, highset home repairs, and lightning strike events. TC Maila watch zone — lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Darwin')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-darwin`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-darwin/#localbusiness`,
  name: `${NAP.name} Darwin`,
  url: `${NAP.url}/storm-damage-restoration-darwin`,
  description: '24/7 emergency storm damage restoration across Darwin and the Northern Territory. IICRC-certified contractor network for cyclone damage, Wet Season storm structural damage, highset home repairs, and lightning strike events.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Darwin', containedInPlace: { '@type': 'State', name: 'Northern Territory' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Darwin', addressRegion: 'NT', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Darwin',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Darwin', containedInPlace: { '@type': 'State', name: 'Northern Territory' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Darwin including emergency make-safe, roof tarping, cyclone structural repairs, highset subfloor and deck restoration, lightning damage assessment, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Reinsurance Pool apply to Darwin properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All NT postcodes fall within the ARPC Cyclone Reinsurance Pool coverage zone, which was established to improve affordability and availability of cyclone cover across northern Australia. Cyclone and storm peril are combined under the Pool for NT properties. Your insurer is required to offer cyclone cover for eligible residential properties. NRPG does not provide policy advice — contact your insurer or an insurance broker for coverage questions specific to your policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What storm damage is most common in Darwin highset homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Darwin's predominant highset construction — homes built on piers or stumps — creates specific vulnerability patterns during cyclone and severe storm events. Subfloor structural damage to piers and bearers, damage to elevated decks and balustrades, failure of louvred wall systems and jalousie windows, and uplift of lightweight roofing on older pre-code outer-suburb homes are the most common damage types NRPG contractors address in Darwin. Wet Season downbursts and localised tornadoes also cause damage concentrated on elevated decks and louvred systems even without cyclone-level winds.",
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG contractors respond to storm damage in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG maintains certified contractors across the Darwin metropolitan area including Nightcliff, Casuarina, Palmerston, and surrounding suburbs. For post-cyclone events, emergency response is mobilised as soon as it is safe to operate — typically within hours of a system clearing the area. For Wet Season storm events (downbursts, localised tornadoes, lightning strikes), NRPG targets a 60-minute emergency response for structural make-safe and roof tarping. Outer rural areas including Humpty Doo, Howard Springs, and Coolalinga are served with extended response times.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does storm damage restoration cost in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical Darwin storm damage restoration costs: Wet Season storm structural damage (roof, deck, subfloor): $3,000–$20,000. Cyclone wind structural damage (moderate): $10,000–$60,000. Direct cyclone hit with major structural loss: $40,000–$150,000+. Darwin properties built to post-TC Tracy cyclone codes (constructed after 1975) generally sustain less damage than older pre-code structures in outer suburbs. Lightning strike damage — common given Darwin has the highest lightning frequency in Australia — typically adds $2,000–$15,000 for electrical and roof penetration repairs.',
      },
    },
  ],
};

export default function StormDamageRestorationDarwinPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrdarwin-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrdarwin-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrdarwin-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Darwin"
        subtitle="Emergency storm damage restoration across Darwin and the NT. IICRC-certified contractors for cyclone structural damage, Wet Season storm damage, highset home repairs, and lightning strike events. TC Maila watch zone — lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Darwin' },
        ]}
        sections={[
          {
            heading: "Darwin's Storm and Cyclone Risk",
            body: (
              <>
                <p>
                  Darwin is Australia&apos;s most cyclone-exposed capital city. Tropical cyclone season runs
                  November to April, and Darwin has sustained direct and near-direct cyclone impacts throughout
                  its history. TC Tracy (1974, Category 4) remains the defining event &mdash; destroying 70% of
                  the city and killing 71 people. The rebuilt Darwin was constructed to the highest cyclone-code
                  standards, but many outer suburbs still contain pre-code structures that carry significantly
                  higher vulnerability.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Even beyond direct cyclone strikes, Darwin&apos;s Wet Season storm environment is among
                  Australia&apos;s most severe. &ldquo;The build-up&rdquo; (October&ndash;November) and the
                  full Wet Season produce localised tornadoes, downbursts, and severe thunderstorms that cause
                  structural damage to roofs, elevated decks, and louvred wall systems. Darwin also holds the
                  record for the highest lightning frequency in Australia, with lightning strikes routinely
                  causing roof penetration, electrical damage, and equipment loss across residential and
                  commercial properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  All NT postcodes fall within the ARPC Cyclone Reinsurance Pool, meaning cyclone and storm
                  peril are combined for NT properties. Typical restoration costs range from
                  $3,000&ndash;$20,000 for Wet Season structural damage, $10,000&ndash;$60,000 for cyclone
                  wind structural damage, and $40,000&ndash;$150,000+ for a direct cyclone hit with major
                  structural loss.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila and Pre-Positioning for NT',
            body: (
              <>
                <p>
                  TC Maila (April 2026) has placed the NT within its watch zone. Outer rain bands and wind
                  gusts from TC Maila affect Darwin even where landfall occurs further east along the NT or
                  Queensland coast. In Darwin, TC Maila conditions create risk for elevated structures, older
                  pre-code highset homes in outer suburbs, and any properties with existing storm damage or
                  deferred maintenance that reduces cyclone resilience.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors are pre-positioned for immediate post-cyclone response across Darwin as
                  soon as conditions are safe for mobilisation. Priority dispatch is given to structural
                  make-safe &mdash; emergency roof tarping, pier and bearer assessment, deck shoring, and
                  board-up &mdash; followed by moisture mapping and a full IICRC-compliant scope of works
                  for insurer submission. Darwin properties in the ARPC pool are covered for storm and
                  cyclone as a combined peril; early lodgement is critical in high-volume post-cyclone
                  claim environments.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Darwin&apos;s highset construction means subfloor and pier damage is a common post-cyclone
                  finding that is not always visible at initial inspection. NRPG&apos;s scope assessment
                  includes thermal imaging and moisture mapping of subfloor systems to identify damage that
                  standard visual inspection misses, ensuring that the full extent of cyclone structural
                  damage is documented before insurer assessment.
                </p>
              </>
            ),
          },
          {
            heading: 'Darwin Suburbs We Cover',
            body: (
              <>
                <p>Emergency storm and cyclone damage response across Darwin and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Darwin Inner:</strong> Darwin CBD, Larrakeyah, Fannie Bay, Parap, Stuart Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Nightcliff, Rapid Creek, Casuarina, Coconut Grove, Moil
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Palmerston &amp; Rural:</strong> Palmerston, Humpty Doo, Howard Springs, Coolalinga
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial &amp; Commercial:</strong> Berrimah, Winnellie, Knuckey Lagoon
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does the ARPC Cyclone Reinsurance Pool apply to Darwin properties?',
            answer: 'Yes. All NT postcodes fall within the ARPC Cyclone Reinsurance Pool coverage zone. Cyclone and storm peril are combined under the Pool for NT properties. Your insurer is required to offer cyclone cover for eligible residential properties. NRPG does not provide policy advice — contact your insurer or an insurance broker for specific coverage questions.',
          },
          {
            question: 'What storm damage is most common in Darwin highset homes?',
            answer: "Darwin's highset construction — homes on piers or stumps — creates specific damage patterns. Subfloor structural damage to piers and bearers, elevated deck and balustrade failure, louvred wall system and jalousie window damage, and lightweight roof uplift on older pre-code outer-suburb homes are the most common damage types. Wet Season downbursts and localised tornadoes also cause damage concentrated on elevated decks and louvred systems even without cyclone-level winds.",
          },
          {
            question: 'How quickly can NRPG contractors respond to storm damage in Darwin?',
            answer: 'NRPG maintains certified contractors across Darwin metro including Nightcliff, Casuarina, and Palmerston. For post-cyclone events, response is mobilised as soon as it is safe — typically within hours of a system clearing. For Wet Season storm events, NRPG targets a 60-minute emergency response. Outer rural areas including Humpty Doo, Howard Springs, and Coolalinga are served with extended response times.',
          },
          {
            question: 'How much does storm damage restoration cost in Darwin?',
            answer: 'Wet Season structural damage: $3,000–$20,000. Cyclone wind structural damage (moderate): $10,000–$60,000. Direct cyclone hit with major structural loss: $40,000–$150,000+. Lightning strike damage adds $2,000–$15,000 for electrical and roof penetration repairs. Post-TC Tracy construction (post-1975 cyclone code) generally sustains less damage than older pre-code structures.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Water Damage Restoration Darwin', href: '/cyclone-water-damage-restoration-darwin', description: 'Specialist cyclone water ingress and flood restoration across Darwin.' },
          { title: 'Water Damage Restoration Darwin', href: '/water-damage-restoration-darwin', description: 'IICRC-certified water damage restoration across Darwin and the NT.' },
          { title: 'Mould Remediation Darwin', href: '/mould-remediation-darwin', description: 'Tropical mould remediation following Wet Season and cyclone water ingress.' },
          { title: 'TC Maila FNQ Emergency', href: '/events/tc-maila-fnq-2026', description: 'Live TC Maila response information for the NT and Far North Queensland.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
