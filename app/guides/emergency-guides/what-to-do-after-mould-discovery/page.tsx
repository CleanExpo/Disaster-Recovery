import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What to Do After Discovering Mould — Step-by-Step Australia Guide',
  description:
    'Discovered mould in your home? Step-by-step guide for Australian homeowners: immediate safety steps, whether to DIY or call a professional, and how to make a mould insurance claim.',
  keywords:
    'what to do after discovering mould, mould in home australia, mould insurance claim, IICRC S520 mould remediation, professional mould assessment',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-mould-discovery',
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  legalName: NAP.legalName,
  url: NAP.url,
  logo: NAP.logo,
  email: NAP.email,
  sameAs: NAP.sameAs,
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  knowsAbout: [
    'Mould Remediation',
    'IICRC S520 Mould Standard',
    'Indoor Air Quality Assessment',
    'Mould Insurance Claims',
    'Moisture Source Investigation',
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mould Remediation and Assessment',
  provider: {
    '@type': 'ProfessionalService',
    name: NAP.name,
    url: NAP.url,
  },
  serviceType: 'Mould Remediation',
  description:
    'IICRC S520-certified mould remediation for Australian homes including moisture source identification, mould testing, air quality assessment, containment, and physical remediation with insurance documentation.',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  url: 'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-mould-discovery',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Should I clean mould myself or call a professional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Small isolated areas of mould less than 0.1 square metres on non-porous surfaces (such as tiles or glass) can be cleaned using a HEPA vacuum and an appropriate antimicrobial product. Anything larger than this, mould inside HVAC systems, mould within wall cavities, or mould following a flood event requires IICRC S520-certified professional remediation. DIY cleaning of mould on porous surfaces such as plasterboard or insulation aerosolises spores and spreads contamination to adjacent areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is mould in my home dangerous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Health risk from mould depends on the species, the area affected, and the health status of the occupants. All visible mould should be treated as a potential health risk and investigated. Immunocompromised individuals, those with asthma, and people with mould allergies are most at risk. A practical indicator of mould exposure is whether you experience respiratory symptoms, headaches, or fatigue that resolve when you leave the property. If this pattern is present, have the property assessed by an IICRC S520-certified professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover mould in my home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould arising from a covered event — storm, burst pipe, cyclone, appliance failure — is generally covered as a secondary damage item under your home insurance policy. Pre-existing mould or mould resulting from gradual moisture buildup over time is typically excluded. NRPG contractors help establish and document the causal chain between the covered event and the mould growth, which is required by insurers for the mould remediation scope to be approved.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I temporarily live with mould while waiting for remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ventilate affected rooms by opening windows where possible. Seal the affected area off from the rest of the house using plastic sheeting. Run a dehumidifier in the affected space if you have one available — this slows mould growth by reducing humidity. Avoid touching or disturbing mould. Wear an N95 mask if you need to enter the affected area. Do NOT use bleach on porous surfaces — bleach kills surface growth but does not penetrate the substrate and actually provides moisture that can worsen mould in porous materials.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I paint over mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Painting over mould is not remediation. It temporarily conceals the visual signs of mould but does not kill the underlying colony, eliminate spores, or prevent ongoing health effects. Insurers will reject claims where paint has been applied over mould without certified remediation — it is treated as an attempt to conceal the damage. IICRC S520 requires physical removal of mould from porous materials. Any contractor who recommends painting over mould as a solution should not be engaged.',
      },
    },
  ],
};

export default function WhatToDoAfterMouldDiscoveryPage() {
  return (
    <>
      <Script
        id="wtdamd-professional-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="wtdamd-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wtdamd-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Guides"
        title="What to Do After Discovering Mould — Step-by-Step Australia Guide"
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency Guides', href: '/guides/emergency-guides' },
          { label: 'What to Do After Mould Discovery' },
        ]}
        sections={[
          {
            heading: 'First Steps — Assess Before You Touch',
            body: (
              <>
                <p>
                  Discovering mould in your home is alarming, but the instinct to clean it immediately
                  can make the situation significantly worse. The first steps are about assessing —
                  not acting.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not disturb the mould before documenting.</strong> Any disturbance —
                    brushing, wiping, even walking past — releases spores into the air. Photograph the
                    affected area first. Include a scale reference (a coin, ruler, or your hand) so the
                    area can be assessed from the photograph.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph with good lighting.</strong> Use a torch or additional lighting if
                    necessary. Capture the full extent of visible mould, any discolouration on adjacent
                    materials, and any visible water damage or moisture staining near the affected area.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Smell test — musty odour without visible mould.</strong> A persistent musty
                    or earthy odour in a room, even without visible mould, is a strong indicator that
                    mould is present inside wall cavities, under flooring, or behind cabinetry. Mould
                    hidden inside structures is often more extensive than surface mould.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Check the moisture source before anything else.</strong> Mould cannot grow
                    without a moisture source. If you treat the mould without fixing the moisture source,
                    mould will return. Look for water staining, peeling paint, condensation, or damp
                    patches near the affected area to identify the cause.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Can You DIY or Do You Need a Professional?',
            body: (
              <>
                <p>
                  Not all mould requires professional remediation. The decision depends on the area,
                  the surface type, and whether the moisture source has been fixed.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>DIY may be appropriate when all of the following apply:</strong> The surface
                    is hard and non-porous (tiles, glass, painted metal), the affected area is less than
                    0.1 square metres, the growth is isolated with no spread to adjacent materials, and
                    the moisture source has already been identified and fixed. Use a HEPA vacuum followed
                    by an antimicrobial product rated for mould, and wear an N95 mask, gloves, and eye
                    protection.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Call a professional when any of the following apply:</strong> The affected
                    area is larger than 0.1 square metres, the mould is on porous materials such as
                    plasterboard, timber, insulation, or carpet, the mould is inside HVAC ducting or air
                    conditioning systems, the mould followed a flood event or water damage incident,
                    there is structural mould inside wall or ceiling cavities, or if any occupant is
                    experiencing health symptoms consistent with mould exposure.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  When in doubt, a professional mould assessment is a low-cost way to determine the
                  scope and whether DIY is safe. NRPG contractors can assess and advise before any
                  work is committed.
                </p>
              </>
            ),
          },
          {
            heading: 'The Moisture Source — Most Important Step',
            body: (
              <>
                <p>
                  Mould remediation without fixing the moisture source is temporary at best. The
                  underlying cause must be identified and repaired before any remediation begins —
                  or the mould will return within weeks.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Common moisture sources in Australian homes:</strong>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof leaks.</strong> The most common cause of mould in ceiling cavities and
                    upper wall areas. Often seasonal — mould appears after rain events and is mistaken
                    for condensation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Condensation.</strong> Common in poorly ventilated rooms and in Australian
                    homes with air conditioning that creates large temperature differentials. Typically
                    presents on external walls, around windows, and in bathrooms.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Rising damp.</strong> Moisture wicking up from the ground through masonry
                    or concrete slab. Presents as mould and staining on lower wall areas, often with a
                    distinct tide mark. Common in older homes without effective damp courses.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Plumbing leaks.</strong> Slow leaks from supply pipes or drain pipes inside
                    walls are often undetected for months. Look for unexplained increases in water bills,
                    damp patches on walls, or soft spots on flooring as indicators.
                  </li>
                  <li style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                    A professional leak detection service can identify hidden moisture sources using
                    thermal imaging and moisture meters before demolition of wall or ceiling linings.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Making an Insurance Claim for Mould',
            body: (
              <>
                <p>
                  Mould insurance claims succeed or fail based on how well the causal chain is documented.
                  Understanding the coverage boundary and the evidence requirements is essential.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Covered mould vs non-covered mould.</strong> Mould arising from a covered
                    event — such as a storm, burst pipe, cyclone, or appliance failure — is generally
                    covered as a secondary damage item. Mould from gradual moisture buildup over time,
                    condensation, or lack of maintenance is typically excluded. Your Policy Disclosure
                    Statement (PDS) will specify the exact exclusions.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Causal chain documentation.</strong> You must be able to demonstrate that the
                    mould grew as a direct result of the covered event. This means documenting the event,
                    the water ingress pathway, the affected materials, and the timeframe from event to
                    mould discovery. NRPG contractors prepare this documentation as part of the
                    remediation scope.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph evidence before any cleaning.</strong> Once cleaning or remediation
                    begins, the original extent of mould is no longer visible. All mould must be
                    photographed in its original state — including areas that will be opened up (wall
                    linings, flooring) — before any work commences.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC S520 scope requirement for insurer sign-off.</strong> Most insurers
                    require that mould remediation is performed to IICRC S520 standard and that the
                    contractor provides an S520-compliant scope of works and completion certificate. This
                    is the standard required for insurer sign-off. Ensure your contractor can provide
                    this documentation before engaging them.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Should I clean mould myself or call a professional?',
            answer:
              'Small isolated areas of mould less than 0.1 square metres on non-porous surfaces (such as tiles or glass) can be cleaned using a HEPA vacuum and an appropriate antimicrobial product. Anything larger than this, mould inside HVAC systems, mould within wall cavities, or mould following a flood event requires IICRC S520-certified professional remediation. DIY cleaning of mould on porous surfaces such as plasterboard or insulation aerosolises spores and spreads contamination to adjacent areas.',
          },
          {
            question: 'Is mould in my home dangerous?',
            answer:
              'Health risk from mould depends on the species, the area affected, and the health status of the occupants. All visible mould should be treated as a potential health risk and investigated. Immunocompromised individuals, those with asthma, and people with mould allergies are most at risk. A practical indicator of mould exposure is whether you experience respiratory symptoms, headaches, or fatigue that resolve when you leave the property. If this pattern is present, have the property assessed by an IICRC S520-certified professional.',
          },
          {
            question: 'Does insurance cover mould in my home?',
            answer:
              'Mould arising from a covered event — storm, burst pipe, cyclone, appliance failure — is generally covered as a secondary damage item under your home insurance policy. Pre-existing mould or mould resulting from gradual moisture buildup over time is typically excluded. NRPG contractors help establish and document the causal chain between the covered event and the mould growth, which is required by insurers for the mould remediation scope to be approved.',
          },
          {
            question: 'How do I temporarily live with mould while waiting for remediation?',
            answer:
              'Ventilate affected rooms by opening windows where possible. Seal the affected area off from the rest of the house using plastic sheeting. Run a dehumidifier in the affected space if you have one available — this slows mould growth by reducing humidity. Avoid touching or disturbing mould. Wear an N95 mask if you need to enter the affected area. Do NOT use bleach on porous surfaces — bleach kills surface growth but does not penetrate the substrate and actually provides moisture that can worsen mould in porous materials.',
          },
          {
            question: 'Can I paint over mould?',
            answer:
              'Painting over mould is not remediation. It temporarily conceals the visual signs of mould but does not kill the underlying colony, eliminate spores, or prevent ongoing health effects. Insurers will reject claims where paint has been applied over mould without certified remediation — it is treated as an attempt to conceal the damage. IICRC S520 requires physical removal of mould from porous materials. Any contractor who recommends painting over mould as a solution should not be engaged.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Mould Testing and Air Quality',
            href: '/guides/services/mould-testing-air-quality',
            description: 'What mould testing involves, when to test, and how to interpret results.',
          },
          {
            title: 'Mould Insurance Coverage',
            href: '/guides/insurance/mould-insurance-coverage',
            description: 'Understanding which mould situations are covered by Australian home insurance.',
          },
          {
            title: 'IICRC S520 Mould Standard',
            href: '/guides/mould/iicrc-s520-mould-remediation-standard',
            description: 'What to expect from a contractor working to IICRC S520 mould remediation standard.',
          },
        ]}
        cta={{ text: 'Get Professional Mould Assessment', href: '/claim' }}
      />
    </>
  );
}
