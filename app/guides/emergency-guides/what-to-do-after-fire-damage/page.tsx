import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What to Do After Fire Damage — Emergency Steps for Australian Homeowners',
  description:
    'Immediate steps to take after fire damage to your home. Safety, documentation, insurance notification, and how to choose an IICRC S700:2025 certified restoration contractor.',
  keywords:
    'what to do after fire damage, fire damage emergency steps, after house fire australia, fire insurance claim steps, IICRC S700 fire restoration',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-fire-damage',
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
    'Fire Damage Restoration',
    'Smoke Odour Removal',
    'IICRC S700:2025 Fire Restoration',
    'Insurance Claim Documentation',
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fire Damage Restoration',
  provider: {
    '@type': 'ProfessionalService',
    name: NAP.name,
    url: NAP.url,
  },
  serviceType: 'Fire and Smoke Damage Restoration',
  description:
    'IICRC S700:2025 certified fire damage restoration including structural assessment, thermal fogging, ozone treatment, HEPA air scrubbing, and insurance documentation for Australian homeowners.',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  url: 'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-fire-damage',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to re-enter my home after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for fire brigade clearance before re-entering. Structural integrity must be confirmed by a qualified assessor. Smoke and carbon monoxide may linger at dangerous levels even after visible flames are out. Electrical systems must be isolated by a licensed electrician before power is restored. If cleared to enter, wear an N95 mask, gloves, and eye protection. Do not turn lights on or off — there is a risk of electrical shorting in fire-damaged wiring.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I photograph first after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Before any cleanup begins, photograph all rooms showing fire and smoke damage, roof and exterior damage, contents damaged or destroyed by fire and smoke, utility meters and the switchboard, any structural damage including cracking or collapse, and any impacts on adjacent property. Use timestamped smartphone photos to establish the timeline of damage. This evidence is essential for your insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly must I notify my insurer after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notify your insurer within 24 to 48 hours of the fire. Most policies require notification "as soon as reasonably possible" — failure to notify promptly can be used by insurers to reduce your claim. When you call, request a claim reference number, the insurer emergency hotline number for ongoing contact, and make-safe authorisation so your contractor can begin emergency works without waiting for a formal assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I start cleaning up smoke damage immediately?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Light surface cleaning is acceptable but do NOT repaint, rebuild, or undertake any permanent repairs before your insurer has approved the scope of works. Emergency make-safe (boarding up windows, tarping the roof) is always approved and should proceed immediately. Keep all damaged materials on-site for insurer inspection. Never dispose of major damaged items before photographing them — disposal before assessment can invalidate claim items.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does IICRC S700:2025 certification mean for fire restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S700:2025 is the current standard governing fire and smoke damage restoration. Certified contractors are trained in thermal fogging, ozone treatment, HEPA air scrubbing for smoke particulates, and produce the documentation formats that insurers require for claim sign-off. Work performed by non-certified contractors may be rejected by insurers at the final claim review, leaving you liable for the cost of rework.',
      },
    },
  ],
};

export default function WhatToDoAfterFireDamagePage() {
  return (
    <>
      <Script
        id="wtdafd-professional-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="wtdafd-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wtdafd-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Guides"
        title="What to Do After Fire Damage — Emergency Steps for Australian Homeowners"
        gradient="linear-gradient(135deg, #7F0000 0%, #C62828 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency Guides', href: '/guides/emergency-guides' },
          { label: 'What to Do After Fire Damage' },
        ]}
        sections={[
          {
            heading: 'First 30 Minutes — Safety and Documentation',
            body: (
              <>
                <p>
                  The first 30 minutes after a house fire are the most dangerous. Do not re-enter until
                  you have received explicit clearance from the fire brigade. Follow these steps in order.
                </p>
                <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Confirm the fire is out.</strong> Do not assume. Wait for confirmation from
                    FRNSW, QFD, MFB, or your state fire service that the structure is clear.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wait for official clearance before entering.</strong> Even after the fire is
                    out, smoke, carbon monoxide, and structural hazards make the property dangerous. FRNSW
                    or QFD will advise when it is safe to approach.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not re-enter if structural damage is visible.</strong> Collapsed rooflines,
                    cracked walls, or burnt floor joists are signs of structural compromise. A structural
                    engineer or fire brigade officer must confirm safe entry.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph everything before touching anything.</strong> Use a smartphone with
                    the timestamp visible. Capture every room, exterior damage, contents, and the point of
                    origin if visible. This documentation is critical for your insurance claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Call your insurer emergency line.</strong> Report the incident, obtain a claim
                    reference number, and request make-safe authorisation. Most policies require notification
                    as soon as reasonably possible.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contact NRPG for emergency make-safe.</strong> Board-up of windows and doors,
                    roof tarping, and electricity isolation can begin as soon as make-safe authorisation is
                    received from your insurer.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'Hours 1–24 — Stabilisation',
            body: (
              <>
                <p>
                  Once the property has been cleared for entry and make-safe authorisation obtained,
                  the next priority is stabilising the structure and preventing further damage.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency board-up and tarping.</strong> Secure all openings created by the
                    fire — broken windows, compromised doors, and any roof breaches. Tarping prevents
                    water ingress from rain, which would compound fire damage with water and mould damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Electricity isolation.</strong> A licensed electrician must isolate the
                    electrical system before any contractor works inside the property. Fire-damaged wiring
                    presents an electrocution and re-ignition risk.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents cataloguing.</strong> Document all contents room by room, noting
                    condition. Fire-damaged, smoke-affected, and undamaged items should be listed
                    separately. Your insurer will use this list for the contents component of your claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents pack-out if contaminated.</strong> Smoke contamination spreads beyond
                    fire-affected areas. Items in adjacent rooms often require professional decontamination.
                    Pack-out to a restoration facility preserves items and allows full cleaning and ozone
                    treatment off-site.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Initial smoke odour ventilation.</strong> If structurally safe, open windows in
                    unaffected rooms to begin ventilating smoke odour. Do not use household fans in
                    fire-affected areas — this can spread particulate contamination.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Days 1–7 — Insurance and Restoration',
            body: (
              <>
                <p>
                  With make-safe complete and your claim lodged, the focus shifts to scoping the full
                  restoration and beginning specialist fire and smoke remediation.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Scope of works approval.</strong> Your insurer will engage a loss assessor or
                    request a scope from your contractor. Review the scope carefully — it must include all
                    fire-affected areas, smoke-affected areas (which extend well beyond the fire origin),
                    and contents. Request a second opinion if the scope appears incomplete.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC S700:2025 contractor engagement.</strong> Ensure the contractor
                    performing fire restoration holds current IICRC certification. Ask for their
                    certification number. S700:2025 is the current standard — contractors working to
                    older standards or without certification should not be accepted.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Thermal fogging and ozone treatment.</strong> These specialist processes
                    neutralise smoke odour by penetrating materials at a molecular level. They cannot be
                    replicated by surface cleaning or repainting and are a standard component of any
                    compliant fire restoration scope.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural assessment — rebuild vs repair.</strong> Your contractor and
                    possibly a structural engineer will assess whether fire-affected structural elements
                    can be repaired or require rebuilding. This decision determines whether your claim is
                    a partial loss or total loss, affecting how your insurer calculates the payout.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Temporary accommodation claim activation.</strong> Most Australian home
                    insurance policies include temporary accommodation cover for major fire damage. Confirm
                    with your insurer what is covered (accommodation type, duration, meals allowance) and
                    keep all receipts.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Common Mistakes After a Fire',
            body: (
              <>
                <p>
                  These errors can cost you significantly — either in unreimbursed costs or in a
                  reduced insurance payout.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Re-entering too soon.</strong> Returning before fire brigade clearance risks
                    carbon monoxide poisoning, structural collapse, and electrical hazards. Always wait.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Failing to photograph before cleanup.</strong> Once cleanup begins, you lose
                    the evidentiary record. Photograph before a single item is moved.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Throwing out damaged items.</strong> Insurers need to assess items to
                    determine replacement value. Do not dispose of anything until your loss assessor or
                    insurer has confirmed it can be removed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Accepting the insurer's first scope without independent review.</strong> The
                    first scope issued may underestimate smoke damage to adjacent areas, contents
                    contamination, and specialist treatment requirements. Request an independent review
                    from your NRPG contractor before signing off.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Using non-certified contractors.</strong> Work performed outside IICRC S700:2025
                    standards may be rejected by your insurer at claim finalisation, leaving you liable
                    for the cost of compliant rework.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is it safe to re-enter my home after a fire?',
            answer:
              'Wait for fire brigade clearance before re-entering. Structural integrity must be confirmed by a qualified assessor. Smoke and carbon monoxide may linger at dangerous levels even after visible flames are out. Electrical systems must be isolated by a licensed electrician before power is restored. If cleared to enter, wear an N95 mask, gloves, and eye protection. Do not turn lights on or off — there is a risk of electrical shorting in fire-damaged wiring.',
          },
          {
            question: 'What should I photograph first after a fire?',
            answer:
              'Before any cleanup begins, photograph all rooms showing fire and smoke damage, roof and exterior damage, contents damaged or destroyed by fire and smoke, utility meters and the switchboard, any structural damage including cracking or collapse, and any impacts on adjacent property. Use timestamped smartphone photos to establish the timeline of damage. This evidence is essential for your insurance claim.',
          },
          {
            question: 'How quickly must I notify my insurer after a fire?',
            answer:
              'Notify your insurer within 24 to 48 hours of the fire. Most policies require notification "as soon as reasonably possible" — failure to notify promptly can be used by insurers to reduce your claim. When you call, request a claim reference number, the insurer emergency hotline number for ongoing contact, and make-safe authorisation so your contractor can begin emergency works without waiting for a formal assessment.',
          },
          {
            question: 'Can I start cleaning up smoke damage immediately?',
            answer:
              'Light surface cleaning is acceptable but do NOT repaint, rebuild, or undertake any permanent repairs before your insurer has approved the scope of works. Emergency make-safe (boarding up windows, tarping the roof) is always approved and should proceed immediately. Keep all damaged materials on-site for insurer inspection. Never dispose of major damaged items before photographing them — disposal before assessment can invalidate claim items.',
          },
          {
            question: 'What does IICRC S700:2025 certification mean for fire restoration?',
            answer:
              'IICRC S700:2025 is the current standard governing fire and smoke damage restoration. Certified contractors are trained in thermal fogging, ozone treatment, HEPA air scrubbing for smoke particulates, and produce the documentation formats that insurers require for claim sign-off. Work performed by non-certified contractors may be rejected by insurers at the final claim review, leaving you liable for the cost of rework.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Fire Damage Insurance Claim',
            href: '/guides/insurance/fire-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging and managing a fire damage insurance claim in Australia.',
          },
          {
            title: 'Document Fire Damage for Insurance',
            href: '/guides/insurance/document-fire-damage-insurance',
            description: 'How to document fire and smoke damage to maximise your insurance claim outcome.',
          },
          {
            title: 'Smoke Odour Removal Methods',
            href: '/guides/fire-smoke/smoke-odour-removal-methods',
            description:
              'Professional methods for removing smoke odour from fire-damaged properties.',
          },
        ]}
        cta={{ text: 'Get IICRC-Certified Fire Damage Help', href: '/claim' }}
      />
    </>
  );
}
