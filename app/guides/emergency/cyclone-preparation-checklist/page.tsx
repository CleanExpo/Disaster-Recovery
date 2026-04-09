import { Metadata } from 'next';
import { Wind } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cyclone Preparation Checklist — Before, During, and After a Cyclone',
  description:
    'Comprehensive cyclone preparation checklist for Queensland, NT, and WA property owners. How to prepare your property, what to do during a cyclone, and how to begin recovery.',
  keywords:
    'cyclone preparation checklist, cyclone property preparation, cyclone insurance claim, TC Maila FNQ, ARPC cyclone reinsurance pool, cyclone damage Queensland NT WA',
  alternates: {
    canonical: `${NAP.url}/guides/emergency/cyclone-preparation-checklist`,
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
  name: 'Cyclone Damage Restoration — QLD, NT, WA',
  provider: {
    '@type': 'LocalBusiness',
    name: NAP.name,
    url: NAP.url,
  },
  serviceType: 'Cyclone Damage Restoration',
  areaServed: [
    { '@type': 'State', name: 'Queensland' },
    { '@type': 'State', name: 'Northern Territory' },
    { '@type': 'State', name: 'Western Australia' },
  ],
  description:
    'IICRC-certified cyclone damage restoration for Queensland, NT, and northern WA — emergency make-safe, water extraction, structural drying, and insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I do to prepare my property before a cyclone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Secure all outdoor furniture, pot plants, and loose items — they become projectiles in cyclone-force winds. Close and latch all shutters and cyclone screens. Trim overhanging branches and dead trees that could fall on your structure. Photograph your contents for insurance purposes. Know your evacuation zone and route. Ensure your 72-hour emergency kit is stocked — water, food, medications, important documents, battery or hand-crank radio, and first aid supplies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I do during the cyclone eye — is it safe to go out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — do not go outside during the eye of a cyclone. The eye brings a deceptive and sudden calm — clear skies, still air — that can last from minutes to an hour depending on the size of the cyclone. Violent winds resume with equal or greater intensity when the eye passes and the rear wall arrives. Stay sheltered in your safe room until the official all-clear is issued by the Bureau of Meteorology or emergency services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I document cyclone damage for insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for the official all-clear, then photograph all damage before any cleanup begins — roof damage, structural damage, water ingress points, interior water damage, contents, and vehicles. Note the BOM event reference number for TC Maila or any named cyclone (available on the BOM website) — this objectively establishes the insured event occurred at your location. Lodge your claim as "cyclone damage" not just "water damage" to ensure the correct policy coverage applies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ARPC Cyclone Reinsurance Pool and how does it affect my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Australian Reinsurance Pool Corporation (ARPC) Cyclone Reinsurance Pool is a federal government-backed pool covering cyclone risk in Queensland, NT, and WA north of the Tropic of Capricorn. It was established to keep cyclone insurance available and affordable in high-risk tropical regions, particularly Far North Queensland. The pool operates behind the scenes — your claim process is unchanged and goes through your own insurer as normal. The pool is designed to reduce the risk that insurers withdraw from offering coverage in cyclone-prone areas.',
      },
    },
  ],
};

export default function CyclonePreparationChecklistPage() {
  return (
    <>
      <Script
        id="cpc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cpc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cpc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Response"
        title="Cyclone Preparation Checklist — Before, During, and After a Cyclone"
        subtitle="Comprehensive cyclone preparation for Queensland, NT, and WA property owners"
        gradient="linear-gradient(135deg, #0C2340 0%, #37474F 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency', href: '/guides/emergency' },
          { label: 'Cyclone Preparation Checklist' },
        ]}
        sections={[
          {
            heading: 'Before the Cyclone — Property Preparation Checklist',
            body: (
              <>
                <p>
                  Cyclone preparation is not something you do the night before. The actions you
                  take in the days and weeks before a cyclone determines how much damage your
                  property sustains. Work through this checklist as early as possible.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>7–14 days out:</strong>
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Trim overhanging branches and dead trees:</strong> Dead or
                    overhanging branches become high-velocity projectiles in cyclone winds.
                    Engage a qualified arborist to assess and remove significant branches near
                    your structure.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Check shutters and cyclone screens:</strong> Test all cyclone
                    shutters and screens to confirm they open, close, and latch correctly. Replace
                    any missing bolts, bent tracks, or damaged hardware now — not when a warning
                    is issued.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Check roof fixings and gutters:</strong> Unsecured or ageing roof
                    sheets and poorly maintained guttering are primary failure points in cyclones.
                    Have a licensed tradesperson assess any concerns.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <strong>24–48 hours out (Cyclone Watch or Warning issued):</strong>
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Secure or store all outdoor items:</strong> Furniture, pot plants,
                    tools, toys, and decorative items must be secured inside or in a locked shed.
                    Anything that cannot be secured should be brought indoors. A plastic chair
                    in 200 km/h winds is a lethal projectile.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph your contents for insurance:</strong> Walk through every
                    room recording video or taking wide-angle photos of all contents. Store the
                    file in cloud storage so it is accessible even if your devices are damaged.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Know your evacuation zone:</strong> Check your local council&apos;s
                    cyclone evacuation zone map. Know whether you are in Zone A (most at risk of
                    storm surge), Zone B, or Zone C — and know your designated evacuation route
                    and shelter location.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <strong>0–24 hours (Cyclone Warning — imminent impact):</strong>
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Fill your car&apos;s fuel tank and withdraw sufficient cash — ATMs and fuel
                    stations may be unavailable for days after the event.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Charge all devices and portable battery banks to full capacity.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Activate your 72-hour emergency kit — confirm water (4 litres per person per
                    day), food, medications, important documents (stored in a waterproof bag),
                    battery or hand-crank radio, torches, and first aid kit.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    If in an evacuation zone or directed to evacuate — leave early. Do not wait
                    until conditions deteriorate.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'During the Cyclone — Safety First',
            body: (
              <>
                <p>
                  Once the cyclone is upon you, your only job is to keep your household safe.
                  Property damage can be repaired — stay focused on people, not belongings.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Shelter in the strongest room:</strong> The internal bathroom or
                    central hallway is typically the strongest part of a domestic structure —
                    no exterior walls, no large windows. Gather all household members and pets
                    there when the cyclone is imminent.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Stay away from windows:</strong> Even with shutters closed, windows
                    can fail under extreme wind pressure. Do not stand near external walls or
                    windows during the cyclone.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Avoid candles:</strong> Use torches or battery-powered lanterns only.
                    Candles and cyclone-force winds are a fire risk.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Never go outside during the eye:</strong> The eye brings a
                    sudden, deceptive calm. Cyclone eyes typically pass in 20–60 minutes.
                    Violent winds resume with the rear wall — stay sheltered until the official
                    all-clear from BOM or emergency services.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency contacts:</strong> 000 for life-threatening emergencies,
                    SES 132 500 for storm assistance, BOM app and radio for weather updates.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'After the Cyclone — First 72 Hours',
            body: (
              <>
                <p>
                  The official all-clear has been issued. Now the recovery process begins — and
                  the actions you take in the first 72 hours determine the outcome of both your
                  insurance claim and your restoration timeline.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wait for the all-clear:</strong> Do not venture outside until
                    emergency services confirm it is safe. Downed powerlines, structural
                    instability, and debris hazards remain after the cyclone passes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Document damage photographically:</strong> Before any cleanup —
                    photograph every damaged element of your property. Roof damage, structural
                    damage, water ingress, interior damage, contents, vehicles, and outbuildings.
                    This evidence is the foundation of your claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lodge your claim as &apos;cyclone damage&apos;:</strong> When calling your
                    insurer, specifically state &quot;cyclone damage&quot; not just &quot;water damage&quot; or
                    &quot;storm damage.&quot; Cyclone is a distinct insured event under most home and
                    contents policies and triggers different assessment and coverage provisions,
                    including the ARPC Cyclone Reinsurance Pool for eligible properties in
                    Queensland, NT, and northern WA.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Request an IICRC-certified contractor:</strong> Submit your claim
                    through Disaster Recovery to be matched with a vetted NRPG contractor for
                    your area. In cyclone events, NRPG contractors are pre-positioned in
                    affected regions and ready to respond as soon as access is restored.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ARPC Cyclone Pool applies in FNQ, NT, and northern WA:</strong> The
                    federal government&apos;s ARPC Cyclone Reinsurance Pool covers cyclone risk for
                    eligible properties north of the Tropic of Capricorn. Your claim process is
                    unchanged — lodge through your insurer as normal. The pool is designed to
                    ensure cyclone insurance remains available and affordable in high-risk regions.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'TC Maila — FNQ Recovery 2026',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila — a Category 5 system — made landfall on the Far North
                  Queensland coast between April 11–14, 2026. If your property was affected by
                  TC Maila, the following applies:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>NRPG pre-positioned in FNQ:</strong> NRPG restoration contractors
                    were pre-positioned in Cairns and surrounding regions ahead of TC Maila&apos;s
                    landfall. Contractor matching and deployment is active as access roads reopen.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lodge at disasterrecovery.com.au/claim for priority queue:</strong>{' '}
                    Claims lodged through Disaster Recovery for TC Maila-affected properties are
                    queued for priority response. Submit your claim now to secure your place in
                    the contractor dispatch queue.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ARPC Cyclone Reinsurance Pool is active:</strong> TC Maila is a
                    qualifying cyclone event under the ARPC pool for eligible properties in FNQ,
                    NT, and northern WA. Lodge your claim as &quot;cyclone damage — TC Maila April
                    2026&quot; and reference the BOM event number.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not wait to document:</strong> The longer you wait to photograph
                    and document cyclone damage, the greater the risk that secondary weather
                    events, cleanup activity, or further deterioration alters the original
                    damage evidence. Document now and lodge immediately.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should I do to prepare my property before a cyclone?',
            answer:
              'Secure all outdoor furniture, pot plants, and loose items — they become projectiles in cyclone-force winds. Close and latch all shutters and cyclone screens. Trim overhanging branches and dead trees that could fall on your structure. Photograph your contents for insurance purposes. Know your evacuation zone and route. Ensure your 72-hour emergency kit is stocked — water, food, medications, important documents, battery or hand-crank radio, and first aid supplies.',
          },
          {
            question: 'What do I do during the cyclone eye — is it safe to go out?',
            answer:
              'No — do not go outside during the eye of a cyclone. The eye brings a deceptive and sudden calm — clear skies, still air — that can last from minutes to an hour depending on the size of the cyclone. Violent winds resume with equal or greater intensity when the eye passes and the rear wall arrives. Stay sheltered in your safe room until the official all-clear is issued by the Bureau of Meteorology or emergency services.',
          },
          {
            question: 'How do I document cyclone damage for insurance?',
            answer:
              'Wait for the official all-clear, then photograph all damage before any cleanup begins — roof damage, structural damage, water ingress points, interior water damage, contents, and vehicles. Note the BOM event reference number for TC Maila or any named cyclone (available on the BOM website) — this objectively establishes the insured event occurred at your location. Lodge your claim as "cyclone damage" not just "water damage" to ensure the correct policy coverage applies.',
          },
          {
            question: 'What is the ARPC Cyclone Reinsurance Pool and how does it affect my claim?',
            answer:
              'The Australian Reinsurance Pool Corporation (ARPC) Cyclone Reinsurance Pool is a federal government-backed pool covering cyclone risk in Queensland, NT, and WA north of the Tropic of Capricorn. It was established to keep cyclone insurance available and affordable in high-risk tropical regions, particularly Far North Queensland. The pool operates behind the scenes — your claim process is unchanged and goes through your own insurer as normal. The pool is designed to reduce the risk that insurers withdraw from offering coverage in cyclone-prone areas.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Insurance Claim Process',
            href: '/guides/insurance/cyclone-insurance-claim-process',
            description: 'Step-by-step guide to lodging and managing a cyclone insurance claim in Australia.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'What the ARPC Cyclone Reinsurance Pool is, how it works, and what it means for your claim.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Emergency cyclone damage restoration services for Cairns and Far North Queensland.',
          },
        ]}
        cta={{ text: 'Lodge Cyclone Claim Now', href: '/claim' }}
      />
    </>
  );
}
