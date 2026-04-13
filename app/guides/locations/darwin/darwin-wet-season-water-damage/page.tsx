import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Darwin Wet Season Water Damage — Emergency Response Guide',
  description:
    "Water damage in Darwin's wet season is different to anywhere else in Australia. IICRC-certified response guides for the Top End — flooding, cyclone ingress, and 12-hour mould windows.",
  keywords:
    'darwin wet season water damage, darwin flood restoration, top end water damage, mould darwin tropical, IICRC darwin water damage',
  alternates: {
    canonical: `${NAP.url}/guides/locations/darwin/darwin-wet-season-water-damage`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Darwin`,
  '@id': `${NAP.url}/#organization-darwin`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Darwin' },
    { '@type': 'State', name: 'Northern Territory' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Darwin Wet Season Water Damage Restoration',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Darwin Wet Season Water Damage Restoration',
  provider: { '@type': 'Organization', name: `${NAP.name} Darwin`, '@id': `${NAP.url}/#organization-darwin` },
  areaServed: { '@type': 'Place', name: 'Darwin' },
  serviceType: 'Water Damage Restoration',
  description:
    'IICRC S500:2025 and S520 wet season water damage restoration for Darwin and the Northern Territory. 24/7 emergency response, tropical mould prevention, ARPC cyclone claim documentation, and Category 3 contamination management.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is Darwin water damage different from southern Australian cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Darwin's wet season brings 1,500–1,700mm of rain between October and April, falling in intense monsoon bursts rather than persistent drizzle. Temperatures remain 28–33°C year-round, meaning mould establishes within 12–24 hours of a water event rather than the 48-hour window in temperate cities. Category 3 contamination risk from ground-level flooding is also higher in Darwin due to tropical bacteria, bats, insects, and the concentration of biological contaminants that thrive in warm, humid conditions.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does ARPC cover Darwin cyclone water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the entire Northern Territory is covered under the ARPC Cyclone Reinsurance Pool regardless of location within the NT. Lodge cyclone-driven water damage with your insurer as both a cyclone claim and a water ingress claim — they are separate line items and both need to be captured in the scope of works for full recovery. NRPG provides documentation covering both components.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find emergency water damage contractors in Darwin after hours?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG operates 24/7 in Darwin. Lodge your emergency through disasterrecovery.com.au/claim for priority emergency dispatch. NRPG pre-stages contractors in Darwin from October each year ahead of the wet season, ensuring equipment and personnel are ready at the start of the monsoon period. After-hours lodgement through the online form triggers immediate contractor notification.',
      },
    },
    {
      '@type': 'Question',
      name: 'What property types are most vulnerable to wet season water damage in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Properties most at risk include fibro dwellings pre-1983 (TC Tracy legacy construction), low-set slab homes in Palmerston and Casuarina where drainage is compromised by development, open-plan homes with louvres and screens that are breached during cyclone events, and properties near Rapid Creek, the Nightcliff foreshore, and the Ludmilla Creek corridor which experience concentrated stormwater flow during intense wet season rainfall.",
      },
    },
  ],
};

export default function DarwinWetSeasonWaterDamagePage() {
  return (
    <>
      <Script
        id="dwwsd-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="dwwsd-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="dwwsd-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Darwin Location Guide"
        title="Darwin Wet Season Water Damage — Emergency Response Guide"
        subtitle="Water damage in Darwin's wet season operates on different rules — 12-hour mould windows, Category 3 tropical contamination, and a monsoon that delivers 1,700mm of rain in six months"
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Darwin', href: '/guides/locations/darwin' },
          { label: 'Wet Season Water Damage' },
        ]}
        cta={{ text: 'Get Wet Season Emergency Help — Darwin', href: '/claim' }}
        sections={[
          {
            heading: "Darwin's Wet Season — The Water Damage Context",
            body: (
              <div className="space-y-4">
                <p>
                  Darwin&rsquo;s wet season runs from November to April, delivering 1,500&ndash;1,700mm of annual rainfall in intense monsoon bursts rather than the gradual precipitation patterns seen in southern Australia. A single monsoonal trough can deposit 200mm in 24 hours, overwhelming drainage systems and inundating low-lying properties across the Darwin and Palmerston urban areas.
                </p>
                <p>
                  <strong>Tropical cyclone season.</strong> Darwin&rsquo;s cyclone season runs concurrently with the wet season, from November to April. Cyclones forming in the Timor Sea and Arafura Sea can cross the NT coast with minimal warning time. Post-TC Tracy (1974) construction standards have improved Darwin&rsquo;s structural resilience, but water ingress from wind-driven rain, roof damage, and storm surge remains a significant risk during cyclone events.
                </p>
                <p>
                  <strong>85%+ average relative humidity.</strong> Darwin&rsquo;s wet season relative humidity averages 85&ndash;90%, creating conditions where wet building materials cannot dry naturally. In southern Australia, property owners sometimes manage minor water events without professional drying by opening windows and improving ventilation. In Darwin, this approach fails entirely during the wet season — the outside air is as humid as the inside, and natural drying does not occur.
                </p>
                <p>
                  <strong>Mould timeline: 12&ndash;24 hours vs 48 hours in southern cities.</strong> At Darwin&rsquo;s ambient temperatures and humidity, mould spore germination on wet organic substrates begins within 12&ndash;24 hours of a water event. This compresses the response window significantly. A water event that happens overnight requires same-day professional response when the property is assessed in the morning — not a &ldquo;wait and see&rdquo; approach.
                </p>
              </div>
            ),
          },
          {
            heading: 'Most Vulnerable Darwin Properties',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Darwin&rsquo;s housing stock reflects its turbulent history — TC Tracy destroyed approximately 70% of the city&rsquo;s structures in December 1974, and much of the reconstruction that followed in the late 1970s and early 1980s has now reached an age where cyclone fatigue and material degradation increase vulnerability to wet season events.
                </p>
                <p>
                  <strong>Fibro legacy stock.</strong> Pre-1983 fibro properties in inner Darwin suburbs including Larrakeyah, Fannie Bay, and Stuart Park often pre-date the post-Tracy cyclone construction code upgrade. These properties have ageing roofing fixings, deteriorated fibro sheeting, and compromised flashing systems that allow significant water ingress during intense wet season rainfall. Many also contain asbestos cement materials requiring assessment before any remediation works.
                </p>
                <p>
                  <strong>Open louvre design.</strong> Darwin&rsquo;s traditional architectural response to the tropical climate — louvred openings designed to maximise cross-ventilation — becomes a vulnerability during cyclone events. When louvres are blown out or screens are destroyed, the building envelope is compromised and wind-driven rain enters directly. Temporary boarding of louvre openings is a standard make-safe measure after cyclone damage in Darwin.
                </p>
                <p>
                  <strong>Rapid Creek and Nightcliff foreshore.</strong> Properties adjacent to Rapid Creek, along the Nightcliff foreshore, and in the Ludmilla Creek corridor experience concentrated stormwater flows during major wet season events. These areas are prone to localised flooding that can persist for hours, with Category 3 contamination risk from the organic matter, fauna (including bats that roost extensively in Darwin&rsquo;s urban tree canopy), and bacteria present in tropical stormwater.
                </p>
                <p>
                  <strong>Palmerston drainage issues.</strong> Palmerston&rsquo;s rapid residential development has placed significant demands on stormwater infrastructure that was not designed for current density. Low-set slab homes in newer Palmerston estates — including areas around Rosebery and Mitchell — experience overland flow events during peak wet season rainfall when drainage capacity is exceeded.
                </p>
              </div>
            ),
          },
          {
            heading: 'Emergency Water Damage Response in Darwin',
            body: (
              <div className="space-y-4">
                <p>
                  Effective emergency water damage response in Darwin requires contractors who understand the Top End&rsquo;s unique conditions — the 24/7 nature of wet season events, the compressed mould timeline, and the regulatory requirements that apply to NT properties.
                </p>
                <p>
                  <strong>24/7 NRPG Darwin.</strong> NRPG maintains 24/7 emergency response capacity in Darwin, with contractor staging commencing in October each year ahead of the wet season. Lodge your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> for priority emergency dispatch. Do not wait until business hours to lodge — Darwin&rsquo;s mould timeline means overnight delays have real consequences.
                </p>
                <p>
                  <strong>ARPC pool applies across all NT.</strong> The ARPC Cyclone Reinsurance Pool covers all of the Northern Territory, including Darwin, Palmerston, Alice Springs, and regional centres. All cyclone-related water damage claims — whether from direct cyclone impact or cyclone-driven rainfall — are processed through the ARPC pool. NRPG provides documentation that captures both the cyclone and water ingress components of the claim.
                </p>
                <p>
                  <strong>What to do while waiting for the contractor.</strong> Move contents up off the floor and onto higher surfaces. Photograph all damage immediately, including water depth marks on walls, damaged building elements, and affected contents. Turn off power to any circuits that are wet or near water — if the main switchboard is affected, leave the power off until the contractor assesses it. Do not attempt to dry the property with fans if mould is already visible — this spreads spores.
                </p>
              </div>
            ),
          },
          {
            heading: "Mould Prevention in Darwin — The 12-Hour Window",
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Southern Australia&rsquo;s 48-hour mould window — the widely cited timeframe within which water damage can be addressed before mould becomes a significant issue — does not apply in Darwin. The combination of 28&ndash;33&deg;C temperatures and 85%+ relative humidity compresses this to 12&ndash;24 hours. This has practical implications for every aspect of the response.
                </p>
                <p>
                  <strong>Immediate drying actions.</strong> Professional water extraction and drying equipment must be on site within the first 12 hours to have a meaningful impact on mould prevention. Industrial desiccant dehumidifiers (more effective than refrigerant-type units in tropical conditions), air movers, and structural drying equipment must be deployed in sufficient quantity to overcome Darwin&rsquo;s ambient humidity. Consumer-grade dehumidifiers are inadequate for wet season water damage in Darwin.
                </p>
                <p>
                  <strong>HEPA air scrubbing in humid tropical conditions.</strong> If any visible mould is present when the contractor arrives, HEPA air scrubbers must be deployed before physical disturbance of any affected materials begins. Darwin&rsquo;s ambient air already carries elevated tropical spore counts — disturbing mould-affected materials without containment and HEPA filtration compounds the contamination significantly.
                </p>
                <p>
                  <strong>IICRC S500:2025 and S520 dual-standard response.</strong> Darwin wet season events frequently require both IICRC S500:2025 (water damage restoration) and IICRC S520:2023 (mould remediation) to be applied concurrently. By the time a contractor arrives, mould is often already present alongside ongoing water damage. The contractor scopes and documents both standards simultaneously, ensuring the full claim scope is captured and both restoration and remediation are addressed in a single coordinated response.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How is Darwin water damage different from southern Australian cities?',
            answer: "Darwin's wet season brings 1,500–1,700mm of rain between October and April. Temperatures remain 28–33°C year-round, meaning mould establishes within 12–24 hours instead of the 48-hour window in temperate cities. Category 3 contamination risk from ground-level flooding is also higher due to tropical bacteria, bats, insects, and warm-climate biological contaminants.",
          },
          {
            question: 'Does ARPC cover Darwin cyclone water damage?',
            answer: 'Yes — the entire Northern Territory is covered under the ARPC Cyclone Reinsurance Pool regardless of location within the NT. Lodge cyclone-driven water damage with your insurer as both a cyclone claim and a water ingress claim — both components need to be captured in the scope of works for full recovery.',
          },
          {
            question: 'How do I find emergency water damage contractors in Darwin after hours?',
            answer: 'NRPG operates 24/7 in Darwin. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch. NRPG pre-stages contractors in Darwin from October each year ahead of the wet season, ensuring equipment and personnel are ready at the start of the monsoon period.',
          },
          {
            question: 'What property types are most vulnerable to wet season water damage in Darwin?',
            answer: "Fibro properties pre-1983 (TC Tracy legacy), low-set slabs in Palmerston and Casuarina, open-plan homes with louvres and screens, and properties near Rapid Creek, Nightcliff foreshore, and Ludmilla Creek corridor — where concentrated stormwater flow and Category 3 contamination risk are highest.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Darwin',
            href: '/water-damage-restoration-darwin',
            description: 'Emergency water damage restoration services across Darwin and the Northern Territory — 24/7 wet season response.',
          },
          {
            title: 'Mould Remediation Darwin',
            href: '/mould-remediation-darwin',
            description: 'IICRC S520 mould remediation in Darwin — tropical mould response with 12-hour window awareness.',
          },
          {
            title: 'Cyclone Water Damage Darwin',
            href: '/cyclone-water-damage-restoration-darwin',
            description: 'Cyclone water damage restoration for Darwin properties — ARPC claim documentation and emergency response.',
          },
        ]}
      />
    </>
  );
}
