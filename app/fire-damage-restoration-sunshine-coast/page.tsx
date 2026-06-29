import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Sunshine Coast | 24/7 Emergency Response',
  description:
    'Emergency fire damage restoration across the Sunshine Coast. IICRC-certified contractors for hinterland bushfire damage, kitchen fires in beach strip units, and post-Alfred electrical fire scenarios. 24/7 response.',
  keywords:
    'fire damage restoration sunshine coast, fire damage sunshine coast, smoke damage sunshine coast, bushfire damage sunshine coast, hinterland fire restoration, noosa fire damage, mooloolaba fire damage',
  openGraph: {
    title: 'Fire Damage Restoration Sunshine Coast | 24/7 Emergency Response',
    description:
      'Emergency fire damage restoration across the Sunshine Coast. IICRC-certified contractors for hinterland bushfire damage, kitchen fires in beach strip units, and post-Alfred electrical fire scenarios. 24/7 response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Fire+Damage+Restoration&city=Sunshine+Coast&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-sunshine-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-sunshine-coast/#localbusiness`,
  name: `${NAP.name} Sunshine Coast`,
  url: `${NAP.url}/fire-damage-restoration-sunshine-coast`,
  description:
    '24/7 emergency fire damage restoration across the Sunshine Coast. IICRC-certified contractor network for hinterland bushfire damage, unit and kitchen fires in coastal high-density areas, and post-Alfred electrical fire restoration.',
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
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Sunshine Coast',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Sunshine Coast' },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration on the Sunshine Coast. Services include emergency board-up, soot and smoke removal, odour elimination, contents restoration, hinterland bushfire structural rebuild, and post-Alfred electrical fire remediation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is bushfire damage in the Sunshine Coast hinterland covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Standard Australian home and contents policies cover bushfire damage as a named peril. Hinterland properties in Maleny, Montville, Mapleton, and Kenilworth are typically covered for fire and smoke damage, contents loss, and temporary accommodation. Note: ARPC (Australian Reinsurance Pool Corporation) applies only to cyclone and terrorism events — it does not apply to fire damage. Your insurer's standard policy is the relevant coverage for bushfire scenarios on the Sunshine Coast.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does fire damage restoration work in a multi-unit strata building on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In high-density coastal areas like Noosa Heads, Mooloolaba, and Maroochydore, fire damage in strata units involves both the individual owner's lot policy and the building's strata insurance. A kitchen or electrical fire in one unit can spread smoke through shared HVAC systems, ceiling cavities, and adjoining walls. We liaise with both the building manager and individual owners. Emergency board-up, smoke odour treatment, and structural assessment proceed from the lot boundary inward. We provide separate itemised documentation for each claimant.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can a fire during post-Alfred recovery works be claimed on my home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fires caused by electrical faults during Alfred recovery works — generator fires, compromised wiring, or faulty temporary connections — are generally claimable under standard home insurance as an electrical fire event. The key is documenting the fire's origin separately from any existing Alfred flood damage claim. We photograph and report the fire damage scope independently so your insurer and contractor can assess each event correctly. Note that ARPC does not apply to fires — your standard home policy is the relevant coverage.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fire damage restoration on the Sunshine Coast ranges from $4,000–$18,000 for a contained kitchen or unit fire (soot removal, smoke odour treatment, minor repairs) to $15,000–$70,000 for structural fire damage. Hinterland properties with total loss from bushfire can reach $40,000–$200,000 or more depending on the rebuild scope. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
      },
    },
  ],
};

export default function FireDamageRestorationSunshineCoastPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdrsc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrsc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrsc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Sunshine Coast"
        subtitle="Emergency fire and smoke damage restoration across the Sunshine Coast and hinterland. IICRC-certified contractors respond as quickly as possible, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Sunshine Coast' },
        ]}
        sections={[
          {
            heading: 'Sunshine Coast Fire Risk — Hinterland Bushfire and Beach Strip Units',
            body: (
              <>
                <p>
                  The Sunshine Coast carries a dual fire risk profile that demands specialist knowledge.
                  Inland, the hinterland communities of Maleny, Montville, Mapleton, Eumundi, Kenilworth,
                  and Cooroy sit within the interface between coastal wet forest and drier inland scrub.
                  During La Ni&ntilde;a break periods — extended dry spells that punctuate otherwise wet
                  seasons — fire danger in these elevated areas can escalate rapidly. The 2019–20 Black
                  Summer season elevated fire risk across the Sunshine Coast hinterland, with the
                  Beerburrum and Glass House Mountains areas recording significant fire activity.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  On the coast, the beach strip from Caloundra through Mooloolaba and Maroochydore to
                  Noosa Heads has seen substantial growth in high-rise and multi-unit residential stock.
                  Kitchen fires and electrical faults in these buildings are the dominant fire risk. A
                  single kitchen fire in a high-rise unit can push smoke throughout shared corridor
                  systems, affecting multiple floors. Strata insurance structures mean that restoration
                  requires coordination between individual lot policies and the building&apos;s body
                  corporate insurer.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Our contractor network covers both risk profiles. Hinterland teams carry equipment
                  for structural fire scenes in rural and semi-rural settings; coastal teams are
                  experienced with multi-unit building access, strata documentation, and shared
                  building system decontamination.
                </p>
              </>
            ),
          },
          {
            heading: 'Post-Alfred Electrical Fire Risk',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred (March 2026) left significant water and structural damage
                  across the Sunshine Coast. During recovery works, properties face a secondary fire
                  hazard: electrical faults arising from flood-compromised wiring, generator
                  misuse, and temporary connections installed without full inspection.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Common post-Alfred fire triggers include:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Generator fires:</strong> Portable generators used during extended power
                    outages can ignite if placed near combustible materials, refuelled while hot, or
                    run in poorly ventilated areas.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Flood-damaged wiring:</strong> Wiring that was submerged during Alfred
                    flooding may have degraded insulation. When power is restored to inadequately
                    inspected circuits, arcing and smouldering within wall cavities can occur before
                    visible flames appear.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Temporary connection faults:</strong> DIY or expedited temporary electrical
                    connections made during recovery — particularly at switchboards — can become
                    ignition points when loads increase.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Post-Alfred fire damage is claimable under standard home insurance as a separate
                  electrical fire event. We document fire and smoke damage independently from any
                  existing flood claim so that both can proceed concurrently.
                </p>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p>
                  Our contractor network services suburbs and areas across the Sunshine Coast LGA
                  and Noosa Shire.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Coastal strip:</strong> Caloundra, Currimundi, Minyama, Bokarina, Wurtulla,
                  Kawana Waters, Birtinya, Mooloolaba, Alexandra Headland, Maroochydore, Cotton Tree,
                  Buderim, Sippy Downs, Noosa Heads, Noosaville, Tewantin, Peregian Beach,
                  Coolum Beach, Marcoola
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Maleny, Montville, Mapleton, Kenilworth, Eumundi,
                  Cooroy, Pomona, Yandina, Nambour, Bli Bli, Forest Glen, Woombye, Palmwoods,
                  Landsborough, Glass House Mountains, Beerburrum
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For hinterland bushfire scenes, our contractors carry structural fire assessment
                  capability and can coordinate with licensed asbestos assessors for older rural
                  properties that may contain asbestos-cement sheeting or roofing materials.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is bushfire damage in the Sunshine Coast hinterland covered by home insurance?',
            answer:
              "Yes. Standard Australian home and contents policies cover bushfire damage as a named peril. Hinterland properties in Maleny, Montville, Mapleton, and Kenilworth are typically covered for fire and smoke damage, contents loss, and temporary accommodation. Note: ARPC (Australian Reinsurance Pool Corporation) applies only to cyclone and terrorism events — it does not apply to fire damage. Your insurer's standard policy is the relevant coverage for bushfire scenarios on the Sunshine Coast.",
          },
          {
            question: 'How does fire damage restoration work in a multi-unit strata building on the Sunshine Coast?',
            answer:
              "In high-density coastal areas like Noosa Heads, Mooloolaba, and Maroochydore, fire damage in strata units involves both the individual owner's lot policy and the building's strata insurance. A kitchen or electrical fire in one unit can spread smoke through shared HVAC systems, ceiling cavities, and adjoining walls. We liaise with both the building manager and individual owners. Emergency board-up, smoke odour treatment, and structural assessment proceed from the lot boundary inward. We provide separate itemised documentation for each claimant.",
          },
          {
            question: 'Can a fire during post-Alfred recovery works be claimed on my home insurance?',
            answer:
              "Fires caused by electrical faults during Alfred recovery works — generator fires, compromised wiring, or faulty temporary connections — are generally claimable under standard home insurance as an electrical fire event. The key is documenting the fire's origin separately from any existing Alfred flood damage claim. We photograph and report the fire damage scope independently so your insurer and contractor can assess each event correctly. Note that ARPC does not apply to fires — your standard home policy is the relevant coverage.",
          },
          {
            question: 'How much does fire damage restoration cost on the Sunshine Coast?',
            answer:
              'Fire damage restoration on the Sunshine Coast ranges from $4,000–$18,000 for a contained kitchen or unit fire (soot removal, smoke odour treatment, minor repairs) to $15,000–$70,000 for structural fire damage. Hinterland properties with total loss from bushfire can reach $40,000–$200,000 or more depending on the rebuild scope. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Water Damage Sunshine Coast',
            href: '/storm-water-damage-restoration-sunshine-coast',
            description: 'Stormwater and cyclone wind damage restoration across the Sunshine Coast.',
          },
          {
            title: 'Mould Remediation Sunshine Coast',
            href: '/mould-remediation-sunshine-coast',
            description: 'Professional mould remediation for Sunshine Coast properties after fire suppression water damage.',
          },
          {
            title: 'Water Damage Sunshine Coast',
            href: '/water-damage-restoration-sunshine-coast',
            description: 'Water damage restoration across the Sunshine Coast including post-fire suppression water ingress.',
          },
          {
            title: 'Fire Damage Brisbane',
            href: '/fire-damage-restoration-brisbane',
            description: 'Fire and smoke damage restoration across Greater Brisbane.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
