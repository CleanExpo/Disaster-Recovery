import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Adelaide | Hail, Wind & Roof Damage 24/7',
  description:
    'Emergency storm damage restoration across Adelaide and South Australia. IICRC-certified contractors for hail damage, roof repairs, wind damage, and structural make-safe. Adelaide Thunderstorm Alley specialists. Lodge your claim 24/7.',
  keywords:
    'storm damage restoration adelaide, storm damage adelaide, hail damage adelaide, roof damage adelaide, wind damage adelaide SA, storm restoration south australia, storm damage repair adelaide',
  openGraph: {
    title: 'Storm Damage Restoration Adelaide | Hail, Wind & Roof Damage 24/7',
    description:
      'Emergency storm damage restoration across Adelaide and South Australia. IICRC-certified contractors for hail damage, roof repairs, wind damage, and structural make-safe. Adelaide Thunderstorm Alley specialists. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Adelaide')}&service=storm-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-adelaide`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-adelaide/#localbusiness`,
  name: `${NAP.name} Adelaide`,
  url: `${NAP.url}/storm-damage-restoration-adelaide`,
  description:
    '24/7 emergency storm damage restoration across Adelaide and South Australia. IICRC-certified contractor network for hail damage, wind damage, roof repairs, and structural make-safe.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'South Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Adelaide', addressRegion: 'SA', addressCountry: 'AU' },
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
  name: 'Emergency Storm Damage Restoration Adelaide',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'South Australia' } },
  serviceType: 'Storm Damage Restoration',
  description:
    'Professional storm damage restoration across Adelaide including emergency make-safe, roof tarping, hail damage repair, structural restoration, and full insurance documentation.',
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
      name: 'What caused Adelaide\'s severe storm season in recent years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adelaide sits in what meteorologists call "Thunderstorm Alley" — the Mt Lofty Ranges funnel cold fronts and convective storms into the metropolitan area, giving Adelaide the highest lightning strike frequency in South Australia. The Mediterranean climate drives two distinct severe weather windows: summer (December–February) thunderstorms that generate hail and flash flooding, and winter (June–August) cold fronts that produce sustained structural wind damage. The September 2016 statewide blackout and the October 2021 East Coast Low (200mm in 24 hours across inner northern and eastern suburbs) are the most significant recent events.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SA home insurance cover storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — storm wind and hail damage to your building and contents is covered under the storm provision of most standard South Australian home insurance policies. Storm water ingress through a damaged roof or broken windows is also covered as storm damage. However, stormwater overflow from external drainage systems (overland flow) typically requires a flood extension. The ARPC Cyclone Reinsurance Pool does not apply to Adelaide — all storm damage claims are processed under standard storm provisions. Check your PDS for your specific excess and coverage limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly should I repair storm damage in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You should arrange emergency make-safe within 24–48 hours of a storm event. Unprotected roof damage in Adelaide's climate allows water ingress into wall cavities and ceiling spaces that will result in secondary mould damage within 48–72 hours in summer and 5–7 days in cooler months. Emergency tarping and board-up prevents further loss and is almost always covered under your policy's make-safe provision. Lodge your claim at disasterrecovery.com.au/claim immediately — NRPG targets priority response for emergency make-safe across the Adelaide metropolitan area.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between storm damage and flood damage for insurance claims in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm damage covers physical damage caused by wind, hail, lightning, and storm water entering through breached building elements (e.g., a damaged roof or broken window). Flood damage refers to inundation from external water sources — rivers, overland flow, or stormwater drain overflow. In Adelaide, the October 2021 East Coast Low event produced both storm water ingress (covered under standard storm provisions) and overland flow flooding (requiring a flood extension). Correctly classifying the peril at lodgement is critical to avoiding claim disputes. NRPG\'s IICRC-certified scope documentation identifies both damage types to support your insurer\'s assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does storm damage restoration cost in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adelaide storm damage restoration costs depend on scope and severity. Indicative 2026 ranges: minor roof and structural make-safe $2,000–$15,000; major structural damage with internal water ingress $8,000–$35,000; full structural storm loss with extensive internal damage $30,000–$100,000+. Adelaide Hills properties (Stirling, Hahndorf, Lobethal) with heritage buildings and tree-fall damage often fall in the higher range due to access complexity and specialist restoration requirements. Costs are generally covered by your insurer less the applicable excess.',
      },
    },
  ],
};

export default function StormDamageRestorationAdelaidePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="sdradl-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="sdradl-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="sdradl-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Adelaide"
        subtitle="Emergency storm damage restoration across Adelaide and South Australia. IICRC-certified contractors for hail, wind damage, roof failures, and structural make-safe. priority response, 24 hours a day."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Adelaide' },
        ]}
        sections={[
          {
            heading: "Adelaide's Storm Risk Profile \u2014 Thunderstorm Alley",
            body: (
              <>
                <p>
                  Adelaide sits in what meteorologists call &ldquo;Thunderstorm Alley&rdquo; &mdash; the Mt Lofty Ranges
                  funnel cold fronts and severe convective storms directly into the metropolitan area, giving Adelaide
                  the highest lightning strike frequency in South Australia. Unlike Sydney or Melbourne, where storms
                  approach from multiple directions, Adelaide&apos;s geography concentrates storm energy from the
                  ranges into the eastern and northeastern suburbs before it disperses across the coastal plain.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Adelaide&apos;s Mediterranean climate drives two distinct severe weather windows. Summer
                  (December&ndash;February) brings intense thunderstorms capable of producing large hail and flash
                  flooding &mdash; the 2019 and 2021 hailstorms caused significant roof membrane puncture and vehicle
                  damage across eastern suburbs. Winter (June&ndash;August) cold fronts deliver sustained structural
                  wind damage, particularly to older tiled roofs in established inner suburbs. The October 2021 East
                  Coast Low event delivered more than 200mm of rain in 24 hours across inner northern and eastern
                  suburbs, causing widespread flooding and structural water ingress.
                </p>
              </>
            ),
          },
          {
            heading: 'The 2016 SA Statewide Blackout \u2014 Lessons for Storm Preparedness',
            body: (
              <>
                <p>
                  The September 2016 statewide blackout remains the most significant storm event in South Australian
                  recent memory. A catastrophic storm system brought down electricity transmission infrastructure
                  across the state, leaving more than 80,000 homes without power and causing widespread roofing and
                  structural damage across metropolitan Adelaide and regional areas. The combination of storm
                  structural damage and extended power loss (which disabled sump pumps and security systems) led to
                  compounding losses that many property owners were unprepared for.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2016 event highlighted two critical post-storm response priorities. First, emergency make-safe
                  must be arranged within 24&ndash;48 hours &mdash; unprotected roof penetrations in Adelaide&apos;s
                  spring weather allow rapid moisture ingress into ceiling and wall assemblies. Second, storm
                  structural damage assessments must be completed before secondary damage (mould, further structural
                  movement) obscures the original loss scope. NRPG&apos;s IICRC-certified contractors conduct full
                  scope assessments that document storm causation, preventing scope disputes with insurers at a
                  later stage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Adelaide Hills properties face a compounding risk: tree fall during storms, combined with
                  CFA access delays in suburban-rural interface areas (Stirling, Hahndorf, Lobethal, Aldgate), means
                  make-safe response times are longer than inner metropolitan areas. Heritage buildings in McLaren
                  Vale, Willunga, and the southern Adelaide Hills wine country require specialist restoration
                  contractors experienced with heritage building materials and council overlay requirements.
                </p>
              </>
            ),
          },
          {
            heading: 'Storm Damage Restoration Cost Estimates \u2014 Adelaide 2026',
            body: (
              <>
                <p>
                  Storm damage restoration costs in Adelaide vary significantly by scope, property type, and
                  location. The following ranges reflect 2026 contractor rates across the Adelaide metropolitan
                  area and Hills:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Minor roof and structural make-safe:</strong> $2,000&ndash;$15,000 &mdash; emergency
                  tarping, broken tile replacement, gutter reattachment, window board-up.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>Major structural damage with internal water ingress:</strong> $8,000&ndash;$35,000 &mdash;
                  roof section replacement, ceiling and wall cavity drying, contents relocation, structural
                  carpentry, and full IICRC moisture documentation for insurer sign-off.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  <strong>Full structural storm loss:</strong> $30,000&ndash;$100,000+ &mdash; applicable where
                  a large tree fall, major roof collapse, or sustained wind event has caused extensive building
                  damage with internal inundation. Adelaide Hills heritage properties with tree-fall damage
                  typically fall within this range due to access complexity, heritage restoration requirements,
                  and extended contractor mobilisation times.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Note: the ARPC Cyclone Reinsurance Pool does <em>not</em> apply to Adelaide. All storm damage
                  claims are processed under standard storm provisions of your South Australian home insurance
                  policy, less the applicable storm excess.
                </p>
              </>
            ),
          },
          {
            heading: 'Adelaide and Adelaide Hills Suburbs We Cover',
            body: (
              <>
                <p>priority emergency storm response across the Adelaide metropolitan area:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner East:</strong> Norwood, Kensington, Kent Town, Unley, Parkside &mdash; established
                  terrace housing and older tiled roofs with high storm water ingress risk.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Beach Strip:</strong> Glenelg, Brighton, Somerton Park &mdash; direct Southern Ocean
                  frontal system exposure; salt-laden wind increases corrosion of fixings and flashings.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Hills Interface:</strong> Modbury, Tea Tree Gully, Holden Hill, Greenwith &mdash;
                  Thunderstorm Alley entry zone; highest storm frequency in the Adelaide metropolitan area.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Morphett Vale, Christies Beach, Onkaparinga &mdash; exposed
                  to southern cold fronts with structural wind and hail damage.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Adelaide Hills:</strong> Stirling, Hahndorf, Lobethal, Aldgate &mdash; tree-fall risk
                  during storms with CFA access considerations; heritage building restoration specialists available.
                  Response time 60&ndash;90 minutes depending on access.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across any Adelaide or Adelaide Hills suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: "What caused Adelaide's severe storm season in recent years?",
            answer:
              'Adelaide sits in "Thunderstorm Alley" — the Mt Lofty Ranges funnel cold fronts into the metropolitan area, giving Adelaide the highest lightning frequency in SA. Two severe weather windows drive most damage: summer (Dec–Feb) thunderstorms producing hail and flash flooding, and winter (Jun–Aug) cold fronts causing structural wind damage. The September 2016 statewide blackout and October 2021 East Coast Low (200mm in 24h) are the most significant recent events.',
          },
          {
            question: 'Does SA home insurance cover storm damage?',
            answer:
              'Yes — storm wind and hail damage to your building and contents is covered under the storm provision of most standard South Australian home insurance policies. Storm water entering through a breached roof or window is also covered. Stormwater overflow from external drainage (overland flow) typically requires a flood extension. The ARPC Cyclone Pool does not apply to Adelaide. Check your PDS for your specific excess and coverage terms.',
          },
          {
            question: 'How quickly should I repair storm damage in Adelaide?',
            answer:
              "Arrange emergency make-safe within 24–48 hours. Unprotected roof damage allows water ingress into cavities that causes mould within 48–72 hours in summer and 5–7 days in cooler months. Emergency tarping and board-up is almost always covered under your policy's make-safe provision. Lodge at disasterrecovery.com.au/claim — NRPG targets priority response for emergency make-safe across Adelaide metro.",
          },
          {
            question: 'What is the difference between storm damage and flood damage for insurance claims in Adelaide?',
            answer:
              "Storm damage covers wind, hail, and storm water entering through breached building elements. Flood damage covers inundation from external water sources — rivers, overland flow, or stormwater drain overflow. The October 2021 event produced both. Correctly classifying the peril at lodgement is critical. NRPG's IICRC-certified scope documentation identifies both damage types to support your insurer's assessment.",
          },
          {
            question: 'How much does storm damage restoration cost in Adelaide?',
            answer:
              'Adelaide 2026 indicative ranges: minor roof and structural make-safe $2,000–$15,000; major structural damage with internal water ingress $8,000–$35,000; full structural storm loss $30,000–$100,000+. Adelaide Hills heritage properties with tree-fall damage typically fall in the higher range due to access complexity and specialist restoration requirements. Costs are generally covered by your insurer less the applicable excess.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Adelaide',
            href: '/water-damage-restoration-adelaide',
            description: 'IICRC-certified water damage restoration across Adelaide and South Australia.',
          },
          {
            title: 'Fire Damage Restoration Services',
            href: '/services/fire-damage',
            description: 'IICRC S700-certified fire and smoke restoration across Australia.',
          },
          {
            title: 'Storm Damage Restoration Melbourne',
            href: '/storm-damage-restoration-melbourne',
            description: 'Emergency storm and hail damage restoration across Melbourne.',
          },
          {
            title: 'Storm Damage Restoration Perth',
            href: '/storm-damage-restoration-perth',
            description: 'Storm damage restoration across the Perth metropolitan area.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
