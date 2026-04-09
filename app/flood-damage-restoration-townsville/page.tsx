import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Townsville | TC Maila & Ross River Recovery',
  description:
    'Flood damage restoration across Townsville. TC Maila cyclone flooding and Ross River catchment recovery. IICRC S500:2025 certified. Category 3 decontamination. Lodge 24/7.',
  keywords:
    'flood damage restoration townsville, TC Maila flooding townsville, Ross River flood, townsville flood recovery, cyclone flood townsville, category 3 water damage townsville',
  openGraph: {
    title: 'Flood Damage Restoration Townsville | TC Maila & Ross River Recovery',
    description:
      'Flood damage restoration across Townsville. TC Maila cyclone flooding and Ross River catchment recovery. IICRC S500:2025 certified. Category 3 decontamination. Lodge 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Townsville')}&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-townsville`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-townsville/#localbusiness`,
  name: `${NAP.name} Townsville`,
  url: `${NAP.url}/flood-damage-restoration-townsville`,
  description:
    'IICRC S500:2025 certified flood damage restoration across Townsville. TC Maila post-cyclone flooding and Ross River catchment inundation specialists. Category 3 decontamination, structural drying, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Townsville',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Townsville',
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
  name: 'Flood Damage Restoration Townsville',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Townsville',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Townsville. TC Maila Category 3 post-cyclone floodwater decontamination, Ross River catchment recovery, emergency extraction, structural drying, and insurance claim documentation under IICRC S500:2025.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Townsville flood damage from TC Maila covered by the ARPC Cyclone Pool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Townsville (19.3°S) is north of the Tropic of Capricorn, so the ARPC Cyclone Pool applies to all residential and commercial properties. Lodge TC Maila-driven flooding as "cyclone damage" and "water ingress/flooding" — TC Maila is the trigger event for ARPC processing. Do not lodge as "flood" only, as that may invoke a different policy extension with separate sub-limits. The ARPC pool reduces your out-of-pocket cost to your policy excess if the property is fully covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Ross River flood risk in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Ross River and its tributaries drain a 4,600 km² catchment through Townsville\'s western suburbs before discharging into Cleveland Bay. Major flood events include the 2019 Townsville floods — a 100-year rainfall event with 1.7m of rain in 10 days that inundated 20,000+ homes — and the 2023 event. Low-lying suburbs near the Ross River corridor including Idalia, Rosslea, Hyde Park, and Belgian Gardens carry elevated inundation risk from catchment overflow events and are among the most affected areas in TC Maila-related flooding.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Category 3 flood contamination and does it apply to Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 3 under IICRC S500:2025 is grossly contaminated water — floodwater mixed with sewage overflow, industrial runoff, and biological hazards. Cyclone floodwater in Townsville is Category 3. Townsville\'s industrial and port areas near Cleveland Bay add petroleum and chemical runoff risk. IICRC S500:2025 Category 3 protocol requires full PPE for all contractors, complete decontamination of all structural surfaces, and mandatory removal of all porous materials (plasterboard, carpet, insulation) in the flood zone.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does flood restoration take in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical Townsville flood restoration timeline under IICRC S500:2025: emergency extraction — 1–2 days; structural drying — 7–14 days; Category 3 material removal and disposal — an additional 3–5 days concurrent with drying; structural repairs and reconstruction — 4–12 weeks. NRPG provides end-to-end project management from emergency extraction through to post-remediation clearance testing and handover.',
      },
    },
    {
      '@type': 'Question',
      name: 'The 2019 Townsville floods versus TC Maila 2026 — how are they different?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 2019 Townsville floods were a slow-onset event driven by dam release and prolonged rainfall — primarily a flood event under standard flood policy provisions. TC Maila 2026 is a rapid cyclone rainfall plus storm surge plus wind damage event — a multi-peril event requiring concurrent cyclone, water, and potentially mould restoration. The ARPC Cyclone Pool applies to TC Maila; standard flood policy provisions applied to the 2019 event. Both require Category 3 decontamination protocols, but TC Maila-affected properties may have concurrent wind and water damage requiring a unified scope.',
      },
    },
  ],
};

export default function FloodDamageRestorationTownsvillePage() {
  return (
    <>
      <Script
        id="fldtv-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fldtv-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fldtv-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Townsville"
        subtitle="IICRC S500:2025 certified flood damage restoration across Townsville. TC Maila cyclone flooding and Ross River catchment recovery. Category 3 decontamination specialists. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Flood', href: '/services/water-damage/flood' },
          { label: 'Townsville' },
        ]}
        sections={[
          {
            heading: 'Townsville Flood History and TC Maila',
            body: (
              <>
                <p>
                  Townsville&apos;s flood history is defined by the Ross River catchment — a 4,600&nbsp;km²
                  system that drains through the city&apos;s western suburbs before discharging into
                  Cleveland Bay. The 2019 Townsville floods were the most significant recorded event: 1.7m
                  of rainfall in 10 days, 20,000+ homes inundated, and dam release from Ross River Dam
                  extending the flood duration well beyond the rainfall event itself.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila&apos;s April 2026 impact on Townsville represents a distinct flood mechanism:
                  rapid cyclone rainfall accumulation combined with Cleveland Bay storm surge. The Bohle
                  River in Townsville&apos;s north, Castle Hill runoff channels, and multiple urban
                  watercourses all overflow concurrently in a major cyclone event, producing widespread
                  inundation across low-lying suburbs. TC Maila&apos;s multi-peril nature — simultaneous
                  wind, storm surge, and rainfall flooding — requires a concurrent restoration approach
                  that the Ross River 2019 slow-onset event did not.
                </p>
              </>
            ),
          },
          {
            heading: 'Category 3 Floodwater in Townsville — The Decontamination Requirement',
            body: (
              <>
                <p>
                  All cyclone floodwater in Townsville is Category 3 under IICRC S500:2025 — grossly
                  contaminated water that cannot be treated as a drying-only event. Townsville&apos;s
                  industrial areas near Cleveland Bay add petroleum and chemical runoff contamination risk
                  above and beyond standard residential flood contamination. Sewage infrastructure overload
                  during major inundation events introduces biological hazards into floodwater across all
                  affected suburbs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  IICRC S500:2025 Category 3 protocol requires: full personal protective equipment for all
                  contractor access; complete antimicrobial decontamination of all structural surfaces in
                  the flood zone; mandatory removal and disposal of all porous materials (plasterboard,
                  carpet, insulation, soft furnishings); and post-remediation clearance testing before
                  re-occupation. Drying without decontamination leaves contamination embedded in structural
                  materials and is non-compliant under S500:2025.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Material salvageability in Townsville conditions: timber framing — salvageable if
                  decontaminated within 48 hours and dried to moisture content below 19%; plasterboard —
                  not salvageable in Category 3 events; concrete block — salvageable after decontamination;
                  tiles — salvageable if grout is removed and substrate dried.
                </p>
              </>
            ),
          },
          {
            heading: 'Townsville Flood-Prone Suburbs',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  60-minute emergency response post-clearance across all Townsville flood-affected areas:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Ross River corridor:</strong> Idalia, Rosslea, Hyde Park, Belgian Gardens —
                  primary Ross River catchment inundation risk
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial contamination risk:</strong> Garbutt — proximity to Cleveland Bay
                  industrial areas adds petroleum runoff contamination
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bohle River corridor:</strong> Bohle Plain — northern Townsville watercourse
                  overflow risk
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western suburbs:</strong> Cranbrook, Thuringowa, Rasmussen — western storm
                  surge path and overland flow risk
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General coverage:</strong> All Townsville suburbs — full NRPG network available
                  for assessment and restoration
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila Multi-Peril Claims — Townsville',
            body: (
              <>
                <p>
                  TC Maila wind damage, water ingress, and flooding occurring in the same event are all
                  part of the single TC Maila cyclone claim under ARPC pool processing. The ARPC Cyclone
                  Pool applies to all Townsville (19.3&deg;S) properties. Lodge all TC Maila damage — wind
                  structural damage, storm surge water ingress, and rainfall flooding — as a single cyclone
                  event claim.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Some insurers may attempt to split TC Maila damage into separate claims by peril —
                  wind damage, flood, and water ingress as separate events. This can result in separate
                  excesses being applied and delays in overall settlement. Under the Australian Financial
                  Complaints Authority (AFCA) guidelines, damage caused by or flowing from a single cyclone
                  event should be assessed as a single claim event. NRPG provides unified scope documentation
                  covering all TC Maila damage categories to support single-event lodgement and AFCA
                  escalation if required.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Townsville flood damage from TC Maila covered by the ARPC Cyclone Pool?',
            answer:
              'Yes — Townsville (19.3°S) is north of the Tropic of Capricorn. ARPC pool applies. Lodge TC Maila flooding as "cyclone damage" and "water ingress/flooding" — TC Maila is the trigger event for ARPC processing.',
          },
          {
            question: 'What is the Ross River flood risk in Townsville?',
            answer:
              "Ross River and its tributaries drain 4,600 km² through Townsville's western suburbs. Major floods: 2019 (a 100-year event — 1.7m of rain in 10 days, 20,000+ homes affected). Low-lying suburbs near the river: Idalia, Rosslea, Hyde Park, Belgian Gardens are at elevated risk.",
          },
          {
            question:
              'What is Category 3 flood contamination and does it apply to Townsville?',
            answer:
              "Cyclone floodwater mixed with sewage and industrial runoff is Cat 3 contaminated. Townsville's industrial areas near Cleveland Bay add petroleum risk. IICRC S500:2025 Cat 3 protocol requires full decontamination and porous material removal.",
          },
          {
            question: 'How long does flood restoration take in Townsville?',
            answer:
              'Extraction: 1–2 days. Structural drying under IICRC S500:2025: 7–14 days. Category 3 material removal and disposal: adds 3–5 days. Structural repairs: 4–12 weeks. NRPG provides end-to-end project management.',
          },
          {
            question:
              'The 2019 Townsville floods versus TC Maila 2026 — how are they different?',
            answer:
              '2019 = slow-onset dam release + rainfall. TC Maila = rapid cyclone rainfall + storm surge + wind damage — a multi-peril event requiring concurrent cyclone, water, and possibly mould restoration. ARPC pool applies to TC Maila; standard flood policy applied to 2019-type events.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila recovery resources for Townsville and all affected areas.',
          },
          {
            title: 'Cyclone Damage Restoration Townsville',
            href: '/cyclone-damage-restoration-townsville',
            description: 'Cyclone structural damage restoration across Townsville.',
          },
          {
            title: 'Mould Remediation Townsville',
            href: '/mould-remediation-townsville',
            description: 'Post-flood mould remediation across Townsville.',
          },
        ]}
        cta={{ text: 'Lodge TC Maila Flood Claim — Townsville', href: '/claim' }}
      />
    </>
  );
}
