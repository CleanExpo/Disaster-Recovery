import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Mould Remediation Sunshine Coast
 *
 * Created: 9 April 2026
 * Context: Post-Alfred mould surge — Sunshine Coast LGA was one of the highest
 * claim density areas in the 132,000+ ICA claims across SEQ following
 * Ex-TC Alfred (March 2026). Noosa River, Maroochy River, and Mooloolah River
 * flooding caused widespread water damage. Subtropical climate (avg humidity
 * 65–70%, summer temps 28–32°C) creates ideal mould propagation conditions.
 * Hinterland properties receive 1,500–2,000mm annual rainfall — highest in SEQ.
 * Secondary mould damage now appearing 4–6 weeks post-event.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Sunshine Coast | IICRC-Certified 24/7 Emergency',
  description:
    'Professional mould remediation across the Sunshine Coast. IICRC-certified contractors for post-Alfred, post-flood, and post-water damage mould. HEPA remediation, 48-hour response. Lodge your claim 24/7.',
  keywords:
    'mould remediation sunshine coast, mould removal sunshine coast, black mould sunshine coast, mould after flooding sunshine coast, alfred mould sunshine coast, mould inspection noosa, mould remediation maroochydore, mould remediation caloundra',
  openGraph: {
    title: 'Mould Remediation Sunshine Coast | IICRC-Certified 24/7 Emergency',
    description:
      'Professional mould remediation across the Sunshine Coast. IICRC-certified contractors for post-Alfred, post-flood, and post-water damage mould. HEPA remediation, 48-hour response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Sunshine+Coast&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-sunshine-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-sunshine-coast/#localbusiness`,
  name: `${NAP.name} Sunshine Coast`,
  url: `${NAP.url}/mould-remediation-sunshine-coast`,
  description:
    'IICRC-certified mould remediation contractors serving the Sunshine Coast. Post-Alfred mould specialists covering Noosa, Maroochydore, Caloundra, and hinterland. HEPA air scrubbing, structural drying verification, and full insurance documentation.',
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
  name: 'Mould Remediation Sunshine Coast',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Sunshine Coast' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across the Sunshine Coast. Post-Alfred mould specialists covering Noosa, Maroochydore, Caloundra, and hinterland. HEPA air scrubbing, thermal imaging, antimicrobial treatment, containment barriers, and post-remediation clearance testing to IICRC S520.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after flooding on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In the Sunshine Coast's subtropical climate — average humidity 65–70% and summer temperatures of 28–32°C — mould can establish within 24–48 hours on damp materials. The IICRC S520 standard identifies a 48-hour window before mould colonisation becomes likely. Properties affected by Ex-TC Alfred that did not receive complete structural drying are at high risk now, 4–6 weeks post-event.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is mould from Ex-TC Alfred still covered by my insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould directly caused by a covered storm or flood event is generally covered under home insurance. The key is demonstrating causation — late reporting and incomplete drying documentation can lead to insurer disputes. Lodge using IICRC S520-compliant scope that clearly links the mould growth to the Alfred event. NRPG documents to this standard for insurer submission.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does IICRC S520 mould remediation mean for my property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520 is the professional standard for mould remediation. It requires containment of affected areas, HEPA air filtration to capture airborne spores, antimicrobial treatment of affected materials, moisture source elimination, and post-remediation clearance testing to confirm successful remediation. Insurers require S520-compliant documentation for mould claim sign-off — work by non-certified contractors may not be accepted.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost on the Sunshine Coast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the extent and category of mould damage. Category 1 (clean water source, limited area): $2,500–$10,000. Category 2 (grey water, wider spread): $5,000–$25,000. Post-flood full remediation: $15,000–$70,000+. Hinterland properties with persistent moisture issues may require additional structural drying before remediation can begin. NRPG provides a full scope and cost estimate prior to commencement.',
      },
    },
  ],
};

export default function MouldRemediationSunshineCoastPage() {
  return (
    <>
      <Script
        id="mrsc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrsc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrsc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Sunshine Coast"
        subtitle="IICRC-certified mould remediation across the Sunshine Coast. Post-Alfred mould specialists covering Noosa, Maroochydore, Caloundra, and hinterland. HEPA air scrubbing, structural drying verification, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Sunshine Coast' },
        ]}
        sections={[
          {
            heading: 'Mould After Ex-TC Alfred — Sunshine Coast Recovery',
            body: (
              <>
                <p>
                  Ex-TC Alfred made landfall in March 2026 and caused widespread flooding and water damage
                  across the Sunshine Coast. Noosa River, Maroochy River, and Mooloolah River all
                  experienced significant flooding. The Sunshine Coast LGA recorded one of the highest claim
                  density areas among the 132,000+ ICA claims lodged across SEQ following the event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The secondary mould surge is now underway. Properties that received incomplete structural
                  drying — whether from rushed restoration, inadequate equipment deployment, or non-certified
                  contractors — now carry residual moisture in wall cavities, subfloor spaces, and insulation
                  that was never properly addressed. In the Sunshine Coast&apos;s subtropical climate,
                  average humidity of 65–70% and summer temperatures of 28–32°C create ideal mould
                  propagation conditions. Mould can establish within 24–48 hours in damp materials. If
                  Alfred affected your property and it has not received certified moisture verification, mould
                  growth should be treated as likely, not possible.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Properties that appeared dry in the weeks after Alfred may now be showing musty odour,
                  discolouration at wall-floor junctions, soft or bubbling plasterboard, or visible mould
                  behind furniture and in corners. These are indicators of active mould colonisation — not
                  surface staining that cleaning will resolve.
                </p>
              </>
            ),
          },
          {
            heading: 'Hinterland and Canal Estate Mould Risk',
            body: (
              <>
                <p>
                  Two distinct Sunshine Coast property types carry elevated persistent mould risk beyond the
                  immediate Alfred impact.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Hinterland properties</strong> — Maleny, Montville, Mapleton, Eumundi, Cooroy,
                  Pomona, and Kin Kin — receive 1,500–2,000mm of annual rainfall, the highest in SEQ.
                  Persistent high moisture, shade, and older timber construction creates ongoing mould risk
                  independent of storm events. The Noosa River catchment extends deep into the hinterland;
                  Cooroy, Pomona, and Kin Kin all sit within the catchment and experienced significant
                  runoff during Alfred. Properties in these areas may have pre-existing mould conditions
                  that Alfred has significantly accelerated.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Canal estate properties</strong> — Kawana Waters, Bokarina, Wurtulla, and Birtinya
                  — face canal-rise flooding during storm events. When canal levels exceed normal range
                  during heavy rainfall, water can inundate subfloor spaces and lower-level areas of
                  properties that sit close to canal edges. Unlike overland flooding, canal-rise inundation
                  is often slow and less visible, and the resulting moisture may not be discovered until
                  mould has already established. NRPG uses thermal imaging to detect moisture in subfloor
                  spaces and wall cavities that standard visual inspection would miss.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates — Sunshine Coast 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 — clean water source, limited area:</strong> $2,500–$10,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 2 — grey water, wider spread or wall cavity involvement:</strong>{' '}
                    $5,000–$25,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-flood full property remediation:</strong> $15,000–$70,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Hinterland properties with persistent moisture:</strong> Structural drying
                    verification required prior to remediation — costs vary
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-Alfred supplementary mould claim:</strong> Varies — NRPG documents to IICRC
                    S520 standard for insurer submission
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  These estimates reflect current contractor rates on the Sunshine Coast. Final scope and
                  cost depend on extent of mould colonisation, number of affected rooms, whether wall cavities
                  or subfloor require opening, and the category of contamination. NRPG provides a full scope
                  and estimate prior to commencement. Where Alfred is the cause, NRPG prepares insurer-ready
                  documentation to IICRC S520 standard.
                </p>
              </>
            ),
          },
          {
            heading: 'Sunshine Coast Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across the Sunshine Coast LGA and surrounds:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Noosa:</strong> Noosa Heads, Noosaville, Tewantin, Cooroy, Pomona, Kin Kin,
                  Noosa Hinterland
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maroochydore &amp; Central:</strong> Maroochydore, Buderim, Alexandra Headland,
                  Mooloolaba, Sunshine Coast CBD
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Caloundra &amp; Southern:</strong> Caloundra, Kawana Waters, Bokarina, Wurtulla,
                  Birtinya, Pelican Waters
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern &amp; Coastal:</strong> Nambour, Coolum Beach, Peregian Beach,
                  Sunshine Beach, Marcus Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Maleny, Montville, Mapleton, Eumundi, Yandina, Palmwoods,
                  Woombye
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould grow after flooding on the Sunshine Coast?',
            answer:
              "In the Sunshine Coast's subtropical climate — average humidity 65–70% and summer temperatures of 28–32°C — mould can establish within 24–48 hours on damp materials. The IICRC S520 standard identifies a 48-hour window before mould colonisation becomes likely. Properties affected by Ex-TC Alfred that did not receive complete structural drying are at high risk now, 4–6 weeks post-event.",
          },
          {
            question: 'Is mould from Ex-TC Alfred still covered by my insurance?',
            answer:
              'Mould directly caused by a covered storm or flood event is generally covered under home insurance. The key is demonstrating causation — late reporting and incomplete drying documentation can lead to insurer disputes. Lodge using IICRC S520-compliant scope that clearly links the mould growth to the Alfred event. NRPG documents to this standard for insurer submission.',
          },
          {
            question: 'What does IICRC S520 mould remediation mean for my property?',
            answer:
              'IICRC S520 is the professional standard for mould remediation. It requires containment of affected areas, HEPA air filtration to capture airborne spores, antimicrobial treatment of affected materials, moisture source elimination, and post-remediation clearance testing to confirm successful remediation. Insurers require S520-compliant documentation for mould claim sign-off — work by non-certified contractors may not be accepted.',
          },
          {
            question: 'How much does mould remediation cost on the Sunshine Coast?',
            answer:
              'Costs depend on the extent and category of mould damage. Category 1 (clean water source, limited area): $2,500–$10,000. Category 2 (grey water, wider spread): $5,000–$25,000. Post-flood full remediation: $15,000–$70,000+. Hinterland properties with persistent moisture issues may require additional structural drying before remediation can begin. NRPG provides a full scope and cost estimate prior to commencement.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Water Damage Restoration Sunshine Coast',
            href: '/storm-water-damage-restoration-sunshine-coast',
            description: 'Emergency storm water damage restoration across the Sunshine Coast.',
          },
          {
            title: 'Water Damage Restoration Brisbane',
            href: '/water-damage-restoration-brisbane',
            description: 'Emergency water damage restoration across all Brisbane suburbs.',
          },
          {
            title: 'Mould Remediation Brisbane',
            href: '/mould-remediation-brisbane',
            description: 'Post-Alfred mould remediation specialists across all Brisbane suburbs.',
          },
          {
            title: 'Ex-TC Alfred Recovery Hub',
            href: '/events/cyclone-alfred-queensland-2025',
            description: 'If your Alfred claim is stuck or underpaid, NRPG can escalate.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
