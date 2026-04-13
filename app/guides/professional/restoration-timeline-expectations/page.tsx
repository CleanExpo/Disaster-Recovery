import { Metadata } from 'next';
import Script from 'next/script';
import { Clock } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Restoration Timeline Guide Australia 2026 | What to Expect',
  description: 'How long does disaster restoration take in Australia? IICRC-certified timelines for water, fire, mould and cyclone damage. Understand each stage from make-safe to handover.',
  alternates: { canonical: `${NAP.url}/guides/professional/restoration-timeline-expectations` },
  openGraph: {
    title: 'Restoration Timeline Guide Australia 2026 | What to Expect',
    description: 'How long does disaster restoration take in Australia? IICRC-certified timelines for water, fire, mould and cyclone damage. Understand each stage from make-safe to handover.',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  legalName: NAP.legalName,
  alternateName: NAP.alternateName,
  url: NAP.url,
  email: NAP.email,
  priceRange: NAP.priceRange,
  logo: NAP.logo,
  sameAs: NAP.sameAs,
  areaServed: 'Australia',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Disaster Restoration Services',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    url: NAP.url,
  },
  description: 'IICRC-certified disaster restoration for water, fire, mould, and cyclone damage across Australia.',
  areaServed: 'Australia',
  serviceType: 'Disaster Restoration',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does water damage restoration take in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Class 1 water damage (limited to one room, low porosity materials) typically resolves in 5–7 days total including drying and minor repairs. Class 2 (affects an entire room, moisture into walls) takes 7–14 days. Class 3 and Class 4 events — where moisture has penetrated deeply into structural materials or requires specialty drying — can take 3–6 weeks including trades and reinstatement work.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes restoration delays in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The majority of delays in Australian restoration projects are insurer-driven, not contractor-driven. Panel contractor queues, waiting for an assessor to attend, and scope disputes between the insurer and the appointed contractor are the most common causes. NRPG operates outside panel arrangements and bills direct, which means work can commence immediately after authorisation rather than waiting for insurer queue allocation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does mould remediation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contained mould remediation — where affected materials are limited to a single area and there is no structural spread — typically takes 3–7 days including containment setup, removal, treatment, and clearance testing. Full structural mould in high-humidity environments such as Queensland can take 2–3 weeks, particularly where wall cavities, framing, or roof space are involved and require demolition and reinstatement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I live in my home during restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on the damage class, water category, and the location of the damage within the property. Category 3 (black water) contamination requires vacating the property. Significant structural drying work may also render areas uninhabitable. NRPG advises on a case-by-case basis following initial assessment. Temporary accommodation costs are often covered under the additional living expenses component of your home insurance policy — your NRPG contractor can assist you in lodging this as a separate claim item.',
      },
    },
  ],
};

export default function RestorationTimelineExpectationsPage() {
  return (
    <>
      <Script id="rte-professional-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="rte-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="rte-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Professional Guides"
        title="Restoration Timeline Guide Australia 2026 | What to Expect"
        subtitle="How long does disaster restoration take in Australia? IICRC-certified timelines for water, fire, mould and cyclone damage. Understand each stage from make-safe to handover."
        gradient="linear-gradient(135deg, #1A237E 0%, #3949AB 100%)"
        icon={<Clock className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Professional Guides', href: '/guides/professional' },
          { label: 'Restoration Timeline Expectations' },
        ]}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'How Long Does Restoration Actually Take?',
            body: (
              <div className="space-y-4">
                <p>
                  One of the most common questions homeowners ask after a disaster event is how long the restoration process will take. The honest answer is that it depends on damage class, water category, materials affected, and how quickly the insurer approves the scope of works. Below is a stage-by-stage overview of a typical restoration timeline.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Emergency response (same day)</strong> — NRPG contractors attend as soon as a certified contractor is confirmed for your area of your call, 24 hours a day. Emergency response includes water extraction, make-safe measures, and an initial assessment to determine damage class and category.
                  </li>
                  <li>
                    <strong>Make-safe (1–3 days)</strong> — Securing the property against further damage: boarding windows, tarping roofs, removing standing water, and isolating electrical circuits in affected areas. This phase protects both the occupants and the structure while the scope is being prepared.
                  </li>
                  <li>
                    <strong>Structural drying (2–14 days depending on IICRC class)</strong> — Class 1 events (limited damage, low porosity materials) typically dry within 2–5 days. Class 2 events (full-room moisture penetration) require 5–10 days. Class 3 and Class 4 events involving structural materials can require up to 14 days of active drying monitored with daily psychrometric logs.
                  </li>
                  <li>
                    <strong>Remediation (1–5 days)</strong> — Removal of materials that cannot be dried in place, antimicrobial treatment, and clearance testing. For mould events, containment setup and air scrubbing are included in this phase.
                  </li>
                  <li>
                    <strong>Repair and rebuild (varies)</strong> — Reinstating demolished materials — plasterboard, flooring, cabinetry, paint — is typically the longest phase and is subject to trades availability and material lead times. Small repairs may complete in 1–2 days; full room reinstatements can take 2–6 weeks.
                  </li>
                  <li>
                    <strong>Handover</strong> — Final inspection, moisture verification readings, completion of drying logs, and handover documentation provided to both the homeowner and insurer. This marks formal close-out of the restoration engagement.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Factors That Affect Your Restoration Timeline',
            background: 'light',
            body: (
              <div className="space-y-4">
                <p>
                  No two restoration jobs are identical. The following factors have the most significant influence on how long your specific project will take.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Damage severity</strong> — A contained pipe burst in a single bathroom resolves far faster than a flood event affecting multiple rooms across multiple levels. The IICRC classification (Class 1–4) is the primary driver of drying timeline.
                  </li>
                  <li>
                    <strong>Water category</strong> — Category 1 (clean water) allows for faster drying and material retention. Category 2 (grey water) requires treatment before drying can proceed. Category 3 (black water — sewage, floodwater) requires full personal protective equipment, contaminated material removal, and biohazard remediation, all of which extend the timeline significantly.
                  </li>
                  <li>
                    <strong>Material types</strong> — Hard, non-porous surfaces dry quickly. Dense concrete slabs, engineered timber flooring, and wet insulation are slow to dry and may require specialty drying equipment or demolition to expose the substrate.
                  </li>
                  <li>
                    <strong>Access constraints</strong> — Properties with limited access for equipment (narrow staircases, no vehicle access, multi-storey buildings) add logistics time to both the response and drying phases.
                  </li>
                  <li>
                    <strong>Insurer approval delays</strong> — In panel-managed claims, the insurer may not approve the scope of works for days or weeks after the initial response. This is one of the most common causes of project delay and is outside the contractor&rsquo;s control.
                  </li>
                  <li>
                    <strong>Weather and humidity in QLD and NT</strong> — High ambient humidity in tropical and subtropical climates significantly slows evaporative drying. Jobs in Queensland and the Northern Territory during the wet season may require extended drying times and additional equipment compared to the same damage class in southern states.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Insurer Delays vs Contractor Delays — Know the Difference',
            body: (
              <div className="space-y-4">
                <p>
                  When a restoration project runs longer than expected, homeowners often assume the delay is the contractor&rsquo;s fault. In practice, the majority of timeline overruns in Australian restoration are insurer-driven, not contractor-driven. Understanding the difference helps you ask the right questions and escalate appropriately.
                </p>
                <p className="font-semibold">Insurer-caused delays include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Waiting for an independent assessor to attend and report before works can be authorised</li>
                  <li>Scope disputes between the insurer and the appointed contractor over what is covered</li>
                  <li>Panel contractor queues — your insurer&rsquo;s preferred network may not have availability in your area</li>
                  <li>Internal claim processing delays, particularly during major weather events when claim volumes spike</li>
                </ul>
                <p className="font-semibold mt-4">Contractor-caused delays include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Equipment availability — commercial dehumidifiers and air movers are in high demand after major weather events</li>
                  <li>Material lead times — specialty materials such as engineered flooring, custom cabinetry, or imported tiles may have extended supply timelines</li>
                  <li>Subcontractor scheduling for specialist trades such as electricians, plumbers, or plasterers</li>
                </ul>
                <p className="mt-4">
                  NRPG operates outside insurer panel arrangements and bills direct. This means your work can commence immediately after you authorise — without waiting for an assessor appointment or panel allocation queue. For urgent situations, this difference can mean weeks.
                </p>
              </div>
            ),
          },
          {
            heading: 'What Happens at Each Stage',
            background: 'light',
            body: (
              <div className="space-y-4">
                <p>
                  The following milestones represent the standard progression from event to handover. Not all jobs follow every step, but this framework gives you a clear view of where your project stands at any point.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Claim lodgement</strong> — You contact your insurer (or NRPG directly) and a claim is opened. NRPG can assist with lodgement and will provide the insurer with a preliminary scope and urgency assessment.
                  </li>
                  <li>
                    <strong>Emergency response and make-safe</strong> — NRPG attends as soon as a certified contractor is confirmed for your area, extracts standing water, and secures the property. A damage class and category assessment is completed. You receive a written preliminary scope.
                  </li>
                  <li>
                    <strong>Drying monitoring</strong> — Equipment is deployed and daily psychrometric readings begin. You receive regular updates on drying progress. The drying log is shared with your insurer as readings are recorded.
                  </li>
                  <li>
                    <strong>Scope agreed</strong> — Once drying confirms the full extent of damage, a finalised scope of works is submitted to your insurer for approval. NRPG manages this directly, including any scope queries from the insurer.
                  </li>
                  <li>
                    <strong>Trades commence</strong> — Once the scope is approved, remediation and reinstatement work begins. You will receive a schedule of trades and a revised completion estimate based on the approved scope.
                  </li>
                  <li>
                    <strong>Inspection</strong> — Before handover, a final inspection verifies that all work has been completed to scope and that moisture readings confirm a dry, compliant outcome.
                  </li>
                  <li>
                    <strong>Handover documentation</strong> — You receive a full handover pack including the completed drying log, scope of works, treatment certificates, and any warranty documentation for materials installed during reinstatement.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How long does water damage restoration take in Australia?',
            answer: 'Class 1 water damage (limited to one room, low porosity materials) typically resolves in 5–7 days total including drying and minor repairs. Class 2 (affects an entire room, moisture into walls) takes 7–14 days. Class 3 and Class 4 events — where moisture has penetrated deeply into structural materials or requires specialty drying — can take 3–6 weeks including trades and reinstatement work.',
          },
          {
            question: 'What causes restoration delays in Australia?',
            answer: 'The majority of delays in Australian restoration projects are insurer-driven, not contractor-driven. Panel contractor queues, waiting for an assessor to attend, and scope disputes between the insurer and the appointed contractor are the most common causes. NRPG operates outside panel arrangements and bills direct, which means work can commence immediately after authorisation rather than waiting for insurer queue allocation.',
          },
          {
            question: 'How long does mould remediation take?',
            answer: 'Contained mould remediation — where affected materials are limited to a single area and there is no structural spread — typically takes 3–7 days including containment setup, removal, treatment, and clearance testing. Full structural mould in high-humidity environments such as Queensland can take 2–3 weeks, particularly where wall cavities, framing, or roof space are involved and require demolition and reinstatement.',
          },
          {
            question: 'Can I live in my home during restoration?',
            answer: 'This depends on the damage class, water category, and the location of the damage within the property. Category 3 (black water) contamination requires vacating the property. Significant structural drying work may also render areas uninhabitable. NRPG advises on a case-by-case basis following initial assessment. Temporary accommodation costs are often covered under the additional living expenses component of your home insurance policy — your NRPG contractor can assist you in lodging this as a separate claim item.',
          },
        ]}
        relatedGuides={[
          {
            title: 'How to Choose a Restoration Company',
            href: '/guides/professional/how-to-choose-restoration-company',
            description: 'What to look for in an IICRC-certified contractor.',
          },
          {
            title: 'Water Damage Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Full cost breakdown for water damage restoration in Australia.',
          },
          {
            title: 'Temporary Accommodation Insurance',
            href: '/guides/insurance/temporary-accommodation-insurance',
            description: 'What your policy covers while your home is uninhabitable.',
          },
        ]}
      />
    </>
  );
}
