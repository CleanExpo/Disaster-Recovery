import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Sunshine Coast | IICRC Category 3 Specialists',
  description:
    'Professional flood damage restoration across the Sunshine Coast. IICRC-certified Category 3 specialists for Noosa River, Maroochy River, and Mooloolah River flooding from Ex-TC Alfred. Canal estate specialists. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration sunshine coast, flood damage sunshine coast, noosa river flooding, maroochy river flooding, mooloolah river flooding, alfred flood sunshine coast, canal estate flooding sunshine coast, category 3 flood sunshine coast',
  openGraph: {
    title: 'Flood Damage Restoration Sunshine Coast | IICRC Category 3 Specialists',
    description:
      'Professional flood damage restoration across the Sunshine Coast. IICRC-certified Category 3 specialists for Noosa River, Maroochy River, and Mooloolah River flooding from Ex-TC Alfred. Canal estate specialists. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Sunshine+Coast&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-sunshine-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-sunshine-coast/#localbusiness`,
  name: `${NAP.name} Sunshine Coast`,
  url: `${NAP.url}/flood-damage-restoration-sunshine-coast`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving all Sunshine Coast and Noosa Shire suburbs. Noosa River, Maroochy River, and Mooloolah River inundation specialists. Ex-TC Alfred recovery. Full decontamination, structural drying, and insurance documentation.',
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
  name: 'Flood Damage Restoration Sunshine Coast',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Sunshine Coast' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration on the Sunshine Coast. Services include Category 3 decontamination, structural drying, contents pack-out, mould prevention, canal estate drainage assessment, and insurance claims documentation for Ex-TC Alfred inundation.',
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
      name: 'Can I still claim for Alfred flood damage on the Sunshine Coast in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ex-TC Alfred (March 2026) flood damage claims remain open across the Sunshine Coast LGA and Noosa Shire. There is no fixed deadline to complete restoration works, though insurers require claims to be lodged within the policy notification period — typically 30 days from discovery of damage. If your property experienced Noosa River, Maroochy River, or Mooloolah River inundation during Alfred and restoration is incomplete, you can still engage contractors and submit supplementary invoicing to your existing claim. Note: ARPC does not apply to flood damage — this is covered under your standard home and contents policy. Alfred is classified as a storm and flood event, not a cyclone for insurance purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is canal estate flooding in Kawana Waters or Bokarina covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Canal estate flooding — where canal water levels rise and inundate properties adjacent to the canal system — is generally covered by standard home insurance as storm-induced flooding. Kawana Waters, Bokarina, Wurtulla, and Birtinya canal estates experienced significant canal-rise flooding during Alfred. The key coverage question is whether the policy includes 'flood' as a defined peril (most policies post-2012 ICA reforms do). We provide flood-specific damage documentation — not just 'water damage' — to ensure your insurer classifies the claim correctly.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is Category 3 contamination and why does it matter for Sunshine Coast flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S500:2025 classifies floodwater that has mixed with sewage overflow, overland stormwater, or other contaminated sources as Category 3 — the highest contamination category. During Ex-TC Alfred, older sewer infrastructure in parts of Maroochydore, Mooloolaba, and low-lying hinterland areas was overwhelmed, meaning floodwaters carried bacteriological contamination. Category 3 flood restoration requires full PPE for all workers, structural opening of affected cavities, antimicrobial treatment of all wet materials, and rigorous air quality testing before reinstatement. Standard water damage contractors are not equipped for Category 3 work — our network uses IICRC-certified restorers specifically trained for contaminated flood scenarios.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration on the Sunshine Coast ranges from $5,000–$20,000 for minor ground-floor flooding (carpet removal, structural drying, antimicrobial treatment) to $15,000–$60,000 for Category 2–3 inundation of a full ground floor requiring wall cavity opening and full reinstatement. Properties with multi-trade Alfred recovery scopes — structural, electrical, plumbing, flooring, and painting — can reach $40,000–$150,000 or more. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe and drying.',
      },
    },
  ],
};

export default function FloodDamageRestorationSunshineCoastPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdsc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdsc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdsc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Sunshine Coast"
        subtitle="IICRC-certified Category 3 flood damage restoration across the Sunshine Coast and Noosa Shire. Noosa River, Maroochy River, and canal estate specialists. Ex-TC Alfred recovery ongoing."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Flood Damage', href: '/services/water-damage' },
          { label: 'Sunshine Coast' },
        ]}
        sections={[
          {
            heading: 'Sunshine Coast Alfred Flooding — Noosa, Maroochy, and Mooloolah Rivers',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred (March 2026) produced some of the worst flooding in
                  Sunshine Coast LGA history. The Noosa River rose to levels not seen in decades,
                  inundating low-lying properties in Tewantin, Noosaville, and Noosa Heads.
                  The Maroochy River corridor — encompassing Maroochydore, Buderim approaches,
                  and Yandina — flooded across its flat floodplain as 200mm-plus rainfall in 24 hours
                  overwhelmed drainage capacity. The Mooloolah River overflowed its banks in
                  Mooloolaba and Alexandra Headland, affecting both residential and commercial
                  properties in low-lying streets.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Across South East Queensland, Alfred generated more than 132,000 ICA claims.
                  The Sunshine Coast LGA and Noosa Shire accounted for a significant portion of
                  that total. Many properties remain in various stages of incomplete restoration
                  more than a month after the event — structural drying is complete in some, but
                  reinstatement works (plastering, flooring, painting) are still outstanding as
                  contractors work through the backlog.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Our network carries contractors with dedicated Sunshine Coast presence who can
                  pick up mid-restoration scopes, provide supplementary assessments for
                  underquoted repair work, and document additional damage discovered during
                  wall cavity opening.
                </p>
              </>
            ),
          },
          {
            heading: 'Canal Estate Flooding and Category 3 Contamination Risk',
            body: (
              <>
                <p>
                  The Sunshine Coast&apos;s canal estate precincts — Kawana Waters, Bokarina,
                  Wurtulla, and Birtinya — present a specific flood restoration challenge. Canal
                  water levels rise during sustained rainfall events, inundating properties that
                  sit at or near canal height. Unlike river flooding which recedes as catchments
                  drain, canal estate flooding can persist as long as the broader waterway system
                  remains elevated.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Critically, during Alfred, parts of the Sunshine Coast&apos;s older sewer
                  infrastructure were overwhelmed by the volume and speed of rainfall. Stormwater
                  and sewer overflow mixed with the floodwater entering properties in some areas
                  of Maroochydore, Mooloolaba, and lower-lying residential streets. This creates
                  Category 3 contamination under IICRC S500:2025 — the most serious classification,
                  requiring full decontamination protocols rather than standard drying procedures.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Category 3 restoration involves:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full PPE for all restoration workers throughout the decontamination phase
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Opening of all affected wall cavities to inspect and treat concealed wet
                    framing, insulation, and internal linings
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial treatment of all surfaces that contacted Category 3 water
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Air quality testing before any wall reinstatement to confirm mould risk
                    has been addressed
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Detailed documentation of the contamination source and treatment methodology
                    for insurance purposes
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If a previous contractor treated your flood-affected property as Category 1
                  (clean water) when the source was actually Category 3, mould growth behind
                  walls or in subfloor cavities may now be present. We provide reassessment
                  and remediation for these scenarios.
                </p>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers all flood-affected areas across the Sunshine
                  Coast LGA and Noosa Shire.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Noosa River corridor:</strong> Noosa Heads, Noosaville, Tewantin,
                  Cooroibah, Lake Cootharaba, Boreen Point, Peregian Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maroochy River corridor:</strong> Maroochydore, Cotton Tree, Buderim,
                  Yandina, Bli Bli, Nambour, Eudlo, Palmwoods, Woombye
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mooloolah River and coastal:</strong> Mooloolaba, Alexandra Headland,
                  Minyama, Parrearra, Bokarina, Wurtulla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal estates:</strong> Kawana Waters, Birtinya, Bokarina, Wurtulla,
                  Currimundi
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Sunshine Coast:</strong> Coolum Beach, Marcus Beach, Peregian
                  Springs, Noosa Springs, Doonan, Tinbeerwah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern and inland:</strong> Caloundra, Landsborough, Beerwah,
                  Glenview, Forest Glen, Sippy Downs, Little Mountain
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Can I still claim for Alfred flood damage on the Sunshine Coast in 2026?',
            answer:
              'Yes. Ex-TC Alfred (March 2026) flood damage claims remain open across the Sunshine Coast LGA and Noosa Shire. There is no fixed deadline to complete restoration works, though insurers require claims to be lodged within the policy notification period — typically 30 days from discovery of damage. If your property experienced Noosa River, Maroochy River, or Mooloolah River inundation during Alfred and restoration is incomplete, you can still engage contractors and submit supplementary invoicing to your existing claim. Note: ARPC does not apply to flood damage — this is covered under your standard home and contents policy. Alfred is classified as a storm and flood event, not a cyclone for insurance purposes.',
          },
          {
            question: 'Is canal estate flooding in Kawana Waters or Bokarina covered by home insurance?',
            answer:
              "Canal estate flooding — where canal water levels rise and inundate properties adjacent to the canal system — is generally covered by standard home insurance as storm-induced flooding. Kawana Waters, Bokarina, Wurtulla, and Birtinya canal estates experienced significant canal-rise flooding during Alfred. The key coverage question is whether the policy includes 'flood' as a defined peril (most policies post-2012 ICA reforms do). We provide flood-specific damage documentation — not just 'water damage' — to ensure your insurer classifies the claim correctly.",
          },
          {
            question: 'What is Category 3 contamination and why does it matter for Sunshine Coast flood damage?',
            answer:
              'IICRC S500:2025 classifies floodwater that has mixed with sewage overflow, overland stormwater, or other contaminated sources as Category 3 — the highest contamination category. During Ex-TC Alfred, older sewer infrastructure in parts of Maroochydore, Mooloolaba, and low-lying hinterland areas was overwhelmed, meaning floodwaters carried bacteriological contamination. Category 3 flood restoration requires full PPE for all workers, structural opening of affected cavities, antimicrobial treatment of all wet materials, and rigorous air quality testing before reinstatement. Standard water damage contractors are not equipped for Category 3 work — our network uses IICRC-certified restorers specifically trained for contaminated flood scenarios.',
          },
          {
            question: 'How much does flood damage restoration cost on the Sunshine Coast?',
            answer:
              'Flood damage restoration on the Sunshine Coast ranges from $5,000–$20,000 for minor ground-floor flooding (carpet removal, structural drying, antimicrobial treatment) to $15,000–$60,000 for Category 2–3 inundation of a full ground floor requiring wall cavity opening and full reinstatement. Properties with multi-trade Alfred recovery scopes — structural, electrical, plumbing, flooring, and painting — can reach $40,000–$150,000 or more. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe and drying.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Sunshine Coast',
            href: '/water-damage-restoration-sunshine-coast',
            description: 'Water damage restoration across the Sunshine Coast for internal leaks and plumbing failures.',
          },
          {
            title: 'Storm Water Damage Sunshine Coast',
            href: '/storm-water-damage-restoration-sunshine-coast',
            description: 'Storm and cyclone wind damage restoration across the Sunshine Coast and Noosa Shire.',
          },
          {
            title: 'Mould Remediation Sunshine Coast',
            href: '/mould-remediation-sunshine-coast',
            description: 'Professional mould remediation for Sunshine Coast properties after flood inundation.',
          },
          {
            title: 'Flood Damage Brisbane',
            href: '/flood-damage-restoration-brisbane',
            description: 'Flood damage restoration across Brisbane including Alfred recovery works.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
