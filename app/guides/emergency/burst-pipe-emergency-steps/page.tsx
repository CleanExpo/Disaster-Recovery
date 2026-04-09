import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Burst Pipe Emergency — What to Do in the First 30 Minutes',
  description:
    'Step-by-step guide for burst pipe emergencies. Immediate actions to minimise water damage, who to call, and what to tell your insurer.',
  keywords:
    'burst pipe emergency, burst pipe water damage, burst pipe insurance claim, what to do burst pipe, mains water shutoff, IICRC contractor burst pipe',
  alternates: {
    canonical: `${NAP.url}/guides/emergency/burst-pipe-emergency-steps`,
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
  name: 'Emergency Water Damage Restoration — Burst Pipe',
  provider: {
    '@type': 'LocalBusiness',
    name: NAP.name,
    url: NAP.url,
  },
  serviceType: 'Emergency Water Damage Restoration',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  description:
    'IICRC-certified emergency response for burst pipe water damage — extraction, structural drying, and insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I do first when a pipe bursts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Turn off the mains water stopcock immediately — it is usually under the kitchen sink, in your meter box near the street, or in the utility room. Turn off electricity at the meter if water is near any electrical points. Open taps to drain the system and release pressure. Then call the NRPG emergency line through Disaster Recovery to begin contractor matching.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the water mains shutoff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The mains water stopcock is usually found under the kitchen sink, in the meter box near the street, or in a utility or laundry room. For apartments and units, notify your building manager immediately — the main property valve controlling common property water supply is their responsibility. Know the location of your stopcock before an emergency occurs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my insurance cover a burst pipe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — a sudden accidental burst pipe is covered by most home and contents policies as water damage. Gradual leaks or maintenance failure are typically excluded. When lodging your claim, describe the event as "sudden water damage — burst pipe" and include the date and time. Your IICRC-certified contractor will provide professional documentation supporting the sudden, accidental nature of the event.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I try to dry it myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use towels for immediate surface absorption to limit spread. Do NOT use household fans — they increase ambient humidity and can accelerate mould growth. Call an IICRC-certified restoration contractor within 24 hours of the event. Insurers require professional drying logs with daily moisture readings to validate the claim; self-drying attempts without documentation can prejudice the claim.',
      },
    },
  ],
};

export default function BurstPipeEmergencyStepsPage() {
  return (
    <>
      <Script
        id="bpe-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="bpe-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="bpe-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Response"
        title="Burst Pipe Emergency — What to Do in the First 30 Minutes"
        subtitle="Step-by-step guide for burst pipe emergencies"
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency', href: '/guides/emergency' },
          { label: 'Burst Pipe Emergency Steps' },
        ]}
        sections={[
          {
            heading: 'Minutes 0–5: Immediate Safety Steps',
            body: (
              <>
                <p>
                  The first five minutes after a pipe bursts determine how much water enters your
                  property. Act in this order — do not stop to clean up first.
                </p>
                <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Turn off water at the mains stopcock:</strong> Found under the kitchen
                    sink, in the meter box near the street, or in the utility room. Turn it fully
                    clockwise. For apartments, call your building manager immediately — they control
                    the common property valve.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Turn off electricity if water is near power:</strong> If water has
                    reached any power points, switches, or appliances, switch off the mains power
                    at your meter box before entering the affected area. If the switchboard itself
                    is in a wet area, do not touch it — call 000.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph before you clean up:</strong> Take wide-angle photos and
                    short video of every affected room before touching anything. These images are
                    the foundation of your insurance claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Call the emergency line:</strong> Submit a claim through Disaster
                    Recovery immediately. Contractor matching begins as soon as your claim is
                    received — do not wait until morning.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'Minutes 5–30: Containing Damage',
            body: (
              <>
                <p>
                  Once the water is off and electricity is safe, these steps limit further damage
                  while you wait for professional help. Every litre you contain now reduces
                  restoration costs.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Move contents off the floor:</strong> Lift rugs, mats, and any
                    portable furniture out of the wet area. Place aluminium foil or plastic sheets
                    under furniture legs to prevent staining on wet carpet.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Use towels and mops for absorption:</strong> Blot and absorb as much
                    surface water as possible. Do not wring towels onto the wet floor — carry them
                    outside.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Open windows if weather is dry:</strong> Natural ventilation helps in
                    dry conditions. Keep windows closed if it is raining or humid outside —
                    bringing in moist external air will worsen conditions.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do NOT use household fans or hairdryers:</strong> Household fans
                    increase relative humidity and spread moisture-laden air further into the
                    building. They are not a substitute for commercial dehumidification and can
                    accelerate mould growth. Wait for professional drying equipment.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Calling Your Insurer and Contractor',
            body: (
              <>
                <p>
                  Lodge your insurance claim as soon as the immediate safety steps are complete.
                  Do not wait for the full extent of damage to become apparent.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>What to say when lodging:</strong> Describe the event as &quot;sudden
                    water damage — burst pipe&quot; and give the date and approximate time. Do not
                    speculate on causes or estimated costs — describe what you observed and let the
                    assessor determine the rest.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Have your policy number ready:</strong> Typically found on your
                    Certificate of Currency, the insurer&apos;s app, or your original policy
                    documents. Take a photo of it now and store it in your phone.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Build your damage list:</strong> Walk through the property and
                    photograph damaged contents, waterlogged materials, and affected areas. A
                    timestamped photos from your smartphone are sufficient — you do not need
                    professional photos at this stage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contractor arrival expectations:</strong> Your NRPG-matched contractor
                    will contact you directly to confirm arrival. Metropolitan areas are typically
                    faster; regional properties may involve longer lead times. Work begins on
                    arrival without waiting for insurer approval.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What Professional Restoration Looks Like',
            body: (
              <>
                <p>
                  Understanding what your contractor will do helps set expectations and ensures
                  you know what documentation to expect for your insurer.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction:</strong> Commercial truck-mounted extractors remove
                    standing water from hard floors, carpet, and underlay — at volumes far beyond
                    what towels and mops can achieve.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wall cavity moisture mapping:</strong> Thermal imaging cameras and
                    pin meters identify hidden moisture behind walls, under floors, and inside
                    cabinetry that is invisible to the naked eye. This mapping guides where drying
                    equipment is placed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Commercial drying setup:</strong> Industrial air movers and
                    dehumidifiers are deployed based on the moisture map. Sizing is calculated for
                    the volume and severity of the affected area — not guessed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Daily monitoring and drying log:</strong> Moisture readings are taken
                    and recorded at every monitoring point on each visit. The resulting drying log
                    is a dated record of drying progress — this is what your insurer requires to
                    validate the professional drying claim.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  We bill you directly so emergency restoration begins immediately. Your contractor
                  provides a full documentation pack — photos, moisture maps, drying logs, and
                  scope of works — to support your insurance reimbursement.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should I do first when a pipe bursts?',
            answer:
              'Turn off the mains water stopcock immediately — it is usually under the kitchen sink, in your meter box near the street, or in the utility room. Turn off electricity at the meter if water is near any electrical points. Open taps to drain the system and release pressure. Then call the NRPG emergency line through Disaster Recovery to begin contractor matching.',
          },
          {
            question: 'How do I find the water mains shutoff?',
            answer:
              'The mains water stopcock is usually found under the kitchen sink, in the meter box near the street, or in a utility or laundry room. For apartments and units, notify your building manager immediately — the main property valve controlling common property water supply is their responsibility. Know the location of your stopcock before an emergency occurs.',
          },
          {
            question: 'Will my insurance cover a burst pipe?',
            answer:
              'Yes — a sudden accidental burst pipe is covered by most home and contents policies as water damage. Gradual leaks or maintenance failure are typically excluded. When lodging your claim, describe the event as "sudden water damage — burst pipe" and include the date and time. Your IICRC-certified contractor will provide professional documentation supporting the sudden, accidental nature of the event.',
          },
          {
            question: 'Should I try to dry it myself?',
            answer:
              'Use towels for immediate surface absorption to limit spread. Do NOT use household fans — they increase ambient humidity and can accelerate mould growth. Call an IICRC-certified restoration contractor within 24 hours of the event. Insurers require professional drying logs with daily moisture readings to validate the claim; self-drying attempts without documentation can prejudice the claim.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Extraction Emergency Response',
            href: '/guides/services/water-extraction-emergency-response',
            description: 'What happens during professional emergency water extraction — equipment, process, and documentation.',
          },
          {
            title: 'Water Damage Insurance Claim',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'How to lodge a water damage insurance claim and what to expect from the process.',
          },
          {
            title: 'Water Damage Restoration Cost',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'What water damage restoration costs in Australia — by damage class and area.',
          },
        ]}
        cta={{ text: 'Call Emergency Water Damage Line', href: '/claim' }}
      />
    </>
  );
}
