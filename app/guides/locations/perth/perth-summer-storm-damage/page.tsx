import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Perth Summer Storm Damage — Insurance and Restoration Guide',
  description:
    "Perth's summer storm season brings hail, winds, and flash flooding. IICRC-certified emergency response for Perth storm damage — insurance claim guide and 60-minute response.",
  keywords:
    'perth summer storm damage, perth hail damage insurance, perth storm restoration, flash flooding perth, storm damage insurance perth',
  alternates: {
    canonical: `${NAP.url}/guides/locations/perth/perth-summer-storm-damage`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Perth`,
  '@id': `${NAP.url}/#organization-perth`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Perth' },
    { '@type': 'State', name: 'Western Australia' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Perth Summer Storm Damage Restoration',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Perth Summer Storm Damage Restoration',
  provider: { '@type': 'Organization', name: `${NAP.name} Perth`, '@id': `${NAP.url}/#organization-perth` },
  areaServed: { '@type': 'Place', name: 'Perth' },
  serviceType: 'Storm Damage Restoration',
  description:
    'IICRC-certified storm damage restoration for Perth summer events — hail damage, wind damage, flash flooding, emergency tarping, insurance claim documentation, and 60-minute response across greater Perth.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "When is Perth's storm season?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Perth's severe thunderstorm season runs October to April, peaking November through March when warm, unstable air masses collide with cold fronts tracking across the south-west. Western Australia experiences 5–10 significant hail or storm events per year in the Perth metro area. Notable events include the 2010 Kelmscott-Roleystone hailstorm (AU$1.1 billion in insured losses) and the 2022 Perth hailstorm that caused widespread damage across northern suburbs.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Perth home insurance cover hail damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — sudden hail damage to building structures, roofing, guttering, skylights, and windows is covered under standard home building policies in Perth. Gradual wear from multiple minor hail events over time is generally excluded. Policy excess (deductible) varies between $500 and $2,000 depending on your insurer and policy tier. Photographing hail impact damage immediately after the event — before any cleanup — is critical for establishing the scope and timing of the damage for your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does Perth flash flooding cause water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Perth's sandy Swan Coastal Plain soils drain quickly under normal conditions, but built-up areas with compacted or paved surfaces can flood rapidly during intense summer storms. Stormwater systems in established Perth suburbs are often undersized for major events, and overland flow develops quickly. The Swan Coastal Plain's naturally high water table means post-storm groundwater can also infiltrate slab-on-ground foundations and subfloor spaces within hours of an event, even after surface flooding has receded.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Cyclone Narelle WA affect Perth storm insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cyclone Narelle was a north WA event — it did not directly affect Perth. However, ex-tropical cyclone remnant systems and intense low-pressure troughs that originated from tropical systems can reach Perth as heavy rain depressions. Perth properties that suffered storm damage from any weather system in the 2025–2026 season should check with NRPG about claim status and whether the event qualifies for ARPC Cyclone Reinsurance Pool processing, which applies to the ARPC-defined cyclone zone. South-west WA including Perth generally falls outside the ARPC cyclone zone — standard home insurance processes apply for Perth storm events.',
      },
    },
  ],
};

export default function PerthSummerStormDamagePage() {
  return (
    <>
      <Script
        id="pssdr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="pssdr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="pssdr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Perth Location Guide"
        title="Perth Summer Storm Damage — Insurance and Restoration Guide"
        subtitle="Perth's October to April storm season delivers hail, destructive winds, and flash flooding — this guide covers emergency response, insurance claims, and the suburb-level risk profile across greater Perth"
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Perth', href: '/guides/locations/perth' },
          { label: 'Summer Storm Damage' },
        ]}
        cta={{ text: 'Get Emergency Storm Help — Perth', href: '/claim' }}
        sections={[
          {
            heading: "Perth's Summer Storm Profile",
            body: (
              <div className="space-y-4">
                <p>
                  Perth sits at the south-west corner of the Australian continent, where competing air masses create some of the country&rsquo;s most dynamic weather. The city&rsquo;s famous Fremantle Doctor — a reliable afternoon sea breeze — moderates summer temperatures but also sets the stage for thunderstorm development when it interacts with hot, unstable inland air masses tracking west.
                </p>
                <p>
                  <strong>East-moving thunderstorm cells.</strong> Perth&rsquo;s most damaging summer storms develop rapidly as east-to-west moving thunderstorm cells cross the Darling Range and descend onto the coastal plain. These cells can produce giant hail (greater than 5cm diameter), damaging wind gusts exceeding 100 km/h, and intense localised rainfall in a matter of minutes. The speed and intensity of these events often leaves property owners with minimal warning time.
                </p>
                <p>
                  <strong>Hailstorm history.</strong> Perth has experienced several catastrophic hailstorm events in recent decades. The March 2010 Kelmscott-Roleystone hailstorm caused AU$1.1 billion in insured losses — at the time, one of Australia&rsquo;s costliest insured events — and affected suburbs across the northern and eastern corridors including Joondalup, Wanneroo, Midland, and Ellenbrook. A significant hailstorm in 2022 caused further widespread damage across Perth&rsquo;s northern suburbs. These are not once-in-a-generation events — Perth averages multiple significant hail events per decade.
                </p>
                <p>
                  <strong>October to April season.</strong> Perth&rsquo;s peak storm risk runs from October through April, corresponding with the warmest months when the temperature contrast between coastal sea breezes and hot inland air is greatest. The transitional months of October&ndash;November and March&ndash;April are particularly active, as cold fronts and warm air masses collide. Perth property owners should assess their storm resilience at the start of the season in October.
                </p>
                <p>
                  <strong>Swan Coastal Plain flash flood zones.</strong> Perth&rsquo;s urban area is built predominantly on the Swan Coastal Plain, a low-lying coastal sedimentary system with variable drainage. While sandy soils generally drain well, built-up areas with extensive paving and compacted surfaces create flash flooding during intense rainfall. The Swan Coastal Plain&rsquo;s naturally high water table also means post-storm groundwater can rise and infiltrate buildings even after surface flooding has ceased.
                </p>
              </div>
            ),
          },
          {
            heading: 'Perth Suburbs Most at Risk from Storm Damage',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Storm risk in Perth is not uniform across the metropolitan area. Geography, topography, construction age, and proximity to drainage corridors all influence which suburbs face elevated risk during summer storm events.
                </p>
                <p>
                  <strong>Hills interface suburbs: hail and tree fall.</strong> Bickley, Kalamunda, and Roleystone sit at the foot of the Darling Range, directly in the path of east-moving thunderstorm cells descending from the hills. These suburbs experience the highest frequency of large hail and damaging wind gusts. Mature trees in established properties present significant tree-fall risk during severe storms, and the concentration of older tiled roofs increases hail vulnerability.
                </p>
                <p>
                  <strong>Gnangara and Ellenbrook: isolated storm cells.</strong> Perth&rsquo;s northern growth corridor — Gnangara, Ellenbrook, and surrounding new estates — experiences isolated severe storm cells that develop over the northern Swan Coastal Plain. Large roof areas of newer colorbond homes in these suburbs are vulnerable to hail perforation and wind uplift. The 2010 hailstorm caused extensive damage across Ellenbrook, and the suburb remains in one of Perth&rsquo;s most active storm corridors.
                </p>
                <p>
                  <strong>Coastal suburbs: wind and salt spray damage.</strong> Scarborough, Cottesloe, and the northern beaches corridor from Trigg to Hillarys experience intense wind events from westerly frontal systems. Salt-laden coastal winds accelerate corrosion of metal roofing fixings, guttering, and flashings — damage that may not be immediately visible after a storm but manifests as leaks during subsequent rain events. Storm surge during major events can also affect properties in the immediate coastal zone.
                </p>
                <p>
                  <strong>Swan River floodplain: post-storm flooding.</strong> Bassendean, Guildford, and adjacent lower Swan River suburbs sit within the defined flood overlay. Major storm rainfall upstream causes the Swan River system to rise, and floodplain properties may experience inundation hours after a storm event has passed. Category 3 contamination from riverine floodwater requires full black water remediation protocols.
                </p>
              </div>
            ),
          },
          {
            heading: 'Insurance Claim Guide for Perth Storm Events',
            body: (
              <div className="space-y-4">
                <p>
                  Perth storm insurance claims are straightforward when the documentation is thorough. The following framework supports a strong claim outcome from the first hour after a storm event.
                </p>
                <p>
                  <strong>Photograph within the first 30 minutes.</strong> Immediately after the storm passes and it is safe to move through the property, photograph all damage — roofing, guttering, windows, skylights, fencing, vehicle damage, and interior water ingress. Do not move or remove any damaged materials before photographing. The timestamp embedded in smartphone photographs is accepted by insurers as evidence of timing and is one of the most important pieces of documentation you can provide.
                </p>
                <p>
                  <strong>BOM storm confirmation from weather.bom.gov.au.</strong> The Bureau of Meteorology maintains storm event records and severe weather warnings at weather.bom.gov.au. Your insurer may request confirmation that a severe weather event affected your area. Keep the BOM severe weather warning reference number and capture a screenshot of the weather event record for your location. This corroborates your claim timeline.
                </p>
                <p>
                  <strong>Lodge within 30 days.</strong> Most home and building insurance policies require you to notify the insurer of a claim within a reasonable time, and many specify 30 days. For storm events affecting multiple properties simultaneously, insurer assessment capacity is stretched — lodging early ensures your claim is in the queue. Lodge through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to get NRPG contractor coordination in parallel with your insurer lodgement.
                </p>
                <p>
                  <strong>Hail damage vs impact damage distinction.</strong> Insurers distinguish between hail damage (covered) and gradual wear or previous damage that existed before the storm (often excluded). NRPG contractors document hail damage with characteristic impact evidence — consistent impact point patterns, fresh bright edges on fractured tiles, and hail size correlation with impact diameter — that clearly distinguishes storm-caused damage from pre-existing deterioration.
                </p>
                <p>
                  <strong>Insurer repair-vs-rebuild decisions for terracotta tile roofs.</strong> Perth has a high concentration of terracotta tile roofs. After significant hail events, insurers sometimes approve individual tile replacement where the correct decision (under policy terms) is full roof replacement, because matching replacement tiles are unavailable or structural damage is more extensive than initial assessment indicates. NRPG provides independent scope assessments that correctly characterise the damage and support a full and accurate claim.
                </p>
              </div>
            ),
          },
          {
            heading: 'Emergency Response in Perth After a Storm',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Disaster Recovery connects Perth property owners with IICRC-certified storm damage contractors who respond across greater Perth — from Mandurah to Two Rocks, and east to Kalamunda and the Hills face.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Lodge your claim online</strong> — Submit your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> with photographs, your suburb, and a description of the damage. NRPG matches you with Perth storm damage contractors immediately.
                  </li>
                  <li>
                    <strong>Roof tarping for tile damage</strong> — Industrial-grade UV-stabilised tarpaulins are secured over damaged roof sections within the 60-minute emergency response window. Tarping prevents further water ingress through every subsequent rainfall until permanent roof repairs are completed.
                  </li>
                  <li>
                    <strong>Window board-up</strong> — Broken windows, skylights, and glazed openings are boarded with plywood or polycarbonate sheeting to prevent ongoing water ingress, secure the property, and protect against entry.
                  </li>
                  <li>
                    <strong>Water extraction from storm water ingress</strong> — Where water has entered through damaged roof or broken windows, industrial water extraction and structural drying equipment is deployed immediately. Perth&rsquo;s warm summer temperatures mean mould can establish within 48 hours in water-damaged interior spaces.
                  </li>
                  <li>
                    <strong>Temporary accommodation rights</strong> — If your Perth property is rendered uninhabitable by storm damage, your home insurance policy may entitle you to emergency temporary accommodation costs. NRPG documents uninhabitability as part of the claim scope. Check your Product Disclosure Statement for the temporary accommodation benefit limit and conditions.
                  </li>
                </ol>
                <p className="mt-4">
                  Payment plans are available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a> for storm damage restorations.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: "When is Perth's storm season?",
            answer: "Perth's severe thunderstorm season runs October to April, peaking November through March. WA experiences 5–10 significant hail or storm events per year in the Perth metro area. Notable events include the 2010 Kelmscott-Roleystone hailstorm (AU$1.1 billion in insured losses) and the 2022 Perth hailstorm.",
          },
          {
            question: 'Does Perth home insurance cover hail damage?',
            answer: 'Yes — sudden hail damage is covered under standard home building policies. Gradual wear from multiple minor events is generally excluded. Policy excess varies $500–$2,000. Photographing hail impact damage immediately after the event is critical for establishing scope and timing.',
          },
          {
            question: 'How quickly does Perth flash flooding cause water damage?',
            answer: "Perth's sandy Swan Coastal Plain soils drain quickly but built-up areas with paved surfaces flood rapidly during intense storms. The Swan Coastal Plain's high water table means post-storm groundwater can infiltrate slabs and subfloors within hours, even after surface flooding recedes.",
          },
          {
            question: 'How does Cyclone Narelle WA affect Perth storm insurance?',
            answer: 'Cyclone Narelle was a north WA event — it does not directly affect Perth. However, ex-tropical remnant systems can reach Perth as intense rain depressions. Perth properties that suffered storm damage in the 2025–2026 season should check with NRPG about claim status. South-west WA including Perth generally falls outside the ARPC cyclone zone — standard home insurance processes apply.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Perth',
            href: '/storm-damage-restoration-perth',
            description: 'Emergency storm damage restoration across greater Perth — hail, wind, and water damage response.',
          },
          {
            title: 'Storm Damage Insurance Claim Process',
            href: '/guides/insurance/storm-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging a storm damage insurance claim in Australia — documentation, timelines, and dispute resolution.',
          },
          {
            title: 'Document Storm Damage for Insurance',
            href: '/guides/insurance/document-storm-damage-insurance',
            description: 'How to photograph and document storm damage for the strongest possible insurance claim outcome.',
          },
        ]}
      />
    </>
  );
}
