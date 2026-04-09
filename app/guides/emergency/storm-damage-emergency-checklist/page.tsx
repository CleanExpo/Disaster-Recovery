import { Metadata } from 'next';
import { Wind } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Emergency Checklist — What to Do After a Major Storm',
  description:
    'Step-by-step storm damage emergency checklist. What to do in the first 24 hours, how to document for insurance, and when to call a restoration contractor.',
  keywords:
    'storm damage emergency checklist, storm damage first 24 hours, storm damage insurance documentation, storm make-safe, emergency storm response Australia',
  alternates: {
    canonical: `${NAP.url}/guides/emergency/storm-damage-emergency-checklist`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: NAP.name,
  legalName: NAP.legalName,
  url: NAP.url,
  logo: NAP.logo,
  email: NAP.email,
  abn: NAP.abn,
  priceRange: NAP.priceRange,
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration',
  provider: {
    '@type': 'LocalBusiness',
    name: NAP.name,
    url: NAP.url,
  },
  serviceType: 'Emergency Storm Damage Restoration',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  description:
    'IICRC-certified emergency storm damage response — make-safe, water extraction, structural drying, and insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to inspect my property after a storm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for the official all-clear from emergency services or the Bureau of Meteorology before inspecting your property. Beware downed power lines — treat all downed lines as live and stay at least 8 metres clear. Look for structural damage before entering — sagging roof lines, cracked walls, or collapsed sections. Wear closed-toe shoes and gloves when moving through debris. Do not enter if the roof or walls appear compromised until a structural assessment is completed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I photograph for a storm damage insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Photograph all roof damage (from the ground or a safe elevated position), broken windows and doors, all water ingress points, interior water damage, damaged contents, fallen trees or debris, outbuildings, fences, and vehicles if affected. Timestamped photos taken on a smartphone are sufficient — do not wait for a professional photographer. Take wide shots showing extent plus close-ups showing specific damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How soon should I call a restoration contractor after storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within 24 hours. Your insurance policy requires you to take reasonable steps to mitigate further damage — this is your duty to mitigate. Emergency tarping of damaged roofs and boarding of broken windows prevents secondary water damage. Delays can prejudice your claim if the insurer can demonstrate you failed to take reasonable steps. Submit your claim through Disaster Recovery and contractor matching begins immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is emergency make-safe and does insurance cover it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency make-safe includes tarping damaged roofs, boarding broken windows, temporary structural support, and securing the property against further weather damage. It is covered under most home insurance policies as part of the storm damage claim. If make-safe is needed urgently before a full assessment is completed, lodge it as a separate make-safe request with your insurer and proceed — insurers expect you to act quickly to prevent further loss.',
      },
    },
  ],
};

export default function StormDamageEmergencyChecklistPage() {
  return (
    <>
      <Script
        id="sdec-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="sdec-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="sdec-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Response"
        title="Storm Damage Emergency Checklist — What to Do After a Major Storm"
        subtitle="Step-by-step storm damage emergency checklist"
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency', href: '/guides/emergency' },
          { label: 'Storm Damage Emergency Checklist' },
        ]}
        sections={[
          {
            heading: 'Immediately After the Storm — Safety First',
            body: (
              <>
                <p>
                  The moments after a major storm are disorienting. Before you assess damage,
                  confirm the storm has fully passed and it is safe to move around your property.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wait for the official all-clear:</strong> For severe thunderstorms,
                    watch the Bureau of Meteorology (BOM) app or radio for confirmation that the
                    storm cell has passed. For cyclones, wait for the official all-clear from
                    emergency services — do not assume the eye of a cyclone means the event is over.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Avoid downed powerlines:</strong> Stay at least 8 metres clear of
                    any downed or damaged powerlines — treat all lines as live. Call your
                    electricity network immediately. Do not attempt to move lines or approach
                    fallen trees or debris that may be in contact with powerlines.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Check structural integrity before entering:</strong> Look at the
                    roofline, walls, and visible structural elements from outside before entering
                    the building. If the roof appears to have shifted, walls have cracked
                    significantly, or ceiling is visibly sagging, do not enter without a
                    structural assessment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>First-hour priority actions:</strong> Once confirmed safe — check for
                    gas leaks (evacuate and call your gas provider if you smell gas), check
                    whether the roof has been breached with active water ingress, and secure loose
                    objects that could cause further damage in aftershocks or ongoing wind.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Documentation Checklist (First 2 Hours)',
            body: (
              <>
                <p>
                  Your smartphone is your most important tool right now. Comprehensive, timestamped
                  photographic evidence is the foundation of your insurance claim. Photograph before
                  any cleanup — even temporary safety measures.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof damage:</strong> Photograph from a safe angle at ground level —
                    do not access the roof. A drone, elevated position, or neighbour&apos;s vantage
                    point can help capture the full extent. Capture displaced, missing, or cracked
                    tiles and any visible membrane damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>All interior rooms:</strong> Walk through every room and photograph the
                    ceiling, walls, and floor of each space. Even rooms without obvious damage —
                    water can migrate through the structure and appear days later.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water entry points:</strong> Photograph where water has entered —
                    damaged windows, roof penetrations, wall breaches. This evidence establishes
                    the link between storm damage and interior water damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents and belongings:</strong> Photograph all damaged contents in
                    the position you found them. Do not move or discard anything until photographed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>External structures:</strong> Photograph fences, sheds, carports, pools,
                    and outbuildings. These are often separately assessed by insurers.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Vehicles if applicable:</strong> If a vehicle was damaged by the storm
                    on your property, photograph it in situ before moving. Vehicle claims typically
                    go through comprehensive motor insurance — corroborating evidence from the
                    property strengthens the overall storm narrative.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Lodging Your Storm Insurance Claim',
            body: (
              <>
                <p>
                  Lodge your claim as soon as your immediate documentation is complete — ideally
                  within 24 hours of the storm event. Most policies require notification as soon as
                  reasonably practicable.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Notify your insurer within 24 hours:</strong> Call or lodge online.
                    Provide the date and time of the storm, a description of observed damage, and
                    the steps you have taken to mitigate further damage. Keep the description
                    factual — do not estimate repair costs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Obtain your claim number:</strong> Record this immediately — it is
                    your reference for all subsequent communication. Every call, email, and
                    contractor contact should reference this number.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Request make-safe if needed urgently:</strong> If the roof is
                    breached and rain is forecast, request make-safe (emergency tarping) as part
                    of your claim. Insurers expect you to prevent secondary damage — lodge the
                    make-safe request and proceed without waiting for assessor approval.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Preferred contractor request process:</strong> Under the General
                    Insurance Code of Practice, you have the right to request an IICRC-certified
                    contractor of your choice for restoration work. Submit your claim through
                    Disaster Recovery to be matched with a vetted NRPG contractor for your area.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'The First 24 Hours — Preventing Secondary Damage',
            body: (
              <>
                <p>
                  The most expensive storm damage is often not the primary impact — it is the
                  secondary water damage and mould that follows when the property is not properly
                  secured and dried within the first 24 hours.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency tarping:</strong> A breached roof must be tarped before
                    the next rain event. Your NRPG contractor carries emergency tarping supplies
                    and can secure the roof as part of the initial make-safe response.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction if water is inside:</strong> If rain or stormwater
                    has entered the building, commercial extraction equipment removes it far faster
                    and more thoroughly than domestic methods. Every hour of standing water
                    increases saturation of building materials.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC drying setup:</strong> After extraction, commercial air movers
                    and dehumidifiers are deployed based on a moisture map. Structural drying
                    begins immediately and is monitored daily until materials return to acceptable
                    moisture levels.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Antimicrobial treatment for Category 2 water:</strong> Stormwater
                    that has entered through roof damage or windows is classified as Category 2
                    (grey water) due to debris and contamination. Antimicrobial treatment is applied
                    to all affected surfaces before drying equipment is deployed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Mould prevention window — 48 hours:</strong> Mould can begin
                    establishing on damp organic materials within 24–48 hours in warm, humid
                    conditions. Professional drying equipment running within 24 hours of the
                    water intrusion event is the best protection against mould growth and the
                    significantly higher remediation costs it brings.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is it safe to inspect my property after a storm?',
            answer:
              'Wait for the official all-clear from emergency services or the Bureau of Meteorology before inspecting your property. Beware downed power lines — treat all downed lines as live and stay at least 8 metres clear. Look for structural damage before entering — sagging roof lines, cracked walls, or collapsed sections. Wear closed-toe shoes and gloves when moving through debris. Do not enter if the roof or walls appear compromised until a structural assessment is completed.',
          },
          {
            question: 'What should I photograph for a storm damage insurance claim?',
            answer:
              'Photograph all roof damage (from the ground or a safe elevated position), broken windows and doors, all water ingress points, interior water damage, damaged contents, fallen trees or debris, outbuildings, fences, and vehicles if affected. Timestamped photos taken on a smartphone are sufficient — do not wait for a professional photographer. Take wide shots showing extent plus close-ups showing specific damage.',
          },
          {
            question: 'How soon should I call a restoration contractor after storm damage?',
            answer:
              'Within 24 hours. Your insurance policy requires you to take reasonable steps to mitigate further damage — this is your duty to mitigate. Emergency tarping of damaged roofs and boarding of broken windows prevents secondary water damage. Delays can prejudice your claim if the insurer can demonstrate you failed to take reasonable steps. Submit your claim through Disaster Recovery and contractor matching begins immediately.',
          },
          {
            question: 'What is emergency make-safe and does insurance cover it?',
            answer:
              'Emergency make-safe includes tarping damaged roofs, boarding broken windows, temporary structural support, and securing the property against further weather damage. It is covered under most home insurance policies as part of the storm damage claim. If make-safe is needed urgently before a full assessment is completed, lodge it as a separate make-safe request with your insurer and proceed — insurers expect you to act quickly to prevent further loss.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Document Storm Damage for Insurance',
            href: '/guides/insurance/document-storm-damage-insurance',
            description: 'How to build a comprehensive evidence package for your storm damage insurance claim.',
          },
          {
            title: 'Storm Damage Insurance Claim',
            href: '/guides/insurance/storm-damage-insurance-claim-process',
            description: 'The step-by-step process for lodging and managing a storm damage insurance claim in Australia.',
          },
          {
            title: 'Emergency Roof Tarping',
            href: '/guides/services/emergency-roof-tarping-make-safe',
            description: 'What emergency roof tarping involves and how it prevents secondary damage.',
          },
        ]}
        cta={{ text: 'Get Emergency Storm Help Now', href: '/claim' }}
      />
    </>
  );
}
