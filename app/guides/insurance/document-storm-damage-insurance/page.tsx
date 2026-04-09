import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Document Storm Damage for an Insurance Claim',
  description: 'Expert guide to documenting storm damage for insurance — what to photograph, BOM records, insurer evidence hierarchy, and how to counter pre-existing damage disputes.',
  keywords: 'document storm damage insurance, storm damage insurance claim, BOM storm records, storm damage photos, insurance claim evidence, storm damage pre-existing dispute',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/document-storm-damage-insurance`,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long do I have to lodge a storm damage insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most home and contents policies require you to notify your insurer as soon as reasonably practicable after the event — ideally within 72 hours. Check your Product Disclosure Statement (PDS) for your policy\u2019s specific notification window. Delayed lodgement does not automatically void a claim, but it can complicate evidence collection and give insurers grounds to question whether damage occurred during the storm event. Lodge early, even if your full documentation is not yet complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I clean up before photographing storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Do not move, remove, or clean any damaged materials before photographing everything thoroughly. Insurers can challenge claims on the basis of \u201cpre-existing damage\u201d if you cannot prove the storm event caused it. Photographs taken after cleanup lose critical evidence of the damage pattern, debris trajectory, and point of impact. Make temporary safety arrangements (such as tarping) without disturbing the damage evidence. Only after comprehensive documentation should cleanup begin.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if the insurer says the damage is pre-existing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is one of the most common insurer disputes for storm claims. To counter it, you need three things: BOM weather event data confirming a severe storm occurred at your location and date, a contractor assessment report identifying acute impact patterns (displaced tiles, fractured fascia, penetration damage) consistent with storm force rather than wear and tear, and corroborating evidence such as neighbour photos or testimonies. If the dispute is not resolved internally, you can escalate to AFCA at no cost within 2 years of the insurer\u2019s decision.',
      },
    },
    {
      '@type': 'Question',
      name: 'What BOM records should I get for a storm insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact the Bureau of Meteorology (BOM) to obtain Historical Observation Data for the nearest weather station to your property. You can also ask your insurer to provide a \u201cweather event confirmation\u201d letter directly from their weather data provider. Key data points are maximum wind gusts, rainfall intensity, and whether the event was classified as a severe thunderstorm or tropical cyclone. This data objectively establishes that a qualifying storm event occurred at your location on the date of damage.',
      },
    },
  ],
};

const lastReviewed = '2026-04-09';

export default function DocumentStormDamageInsurancePage() {
  return (
    <>
      <Script
        id="docstorm-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="docstorm-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Document Storm Damage for an Insurance Claim',
            dateModified: lastReviewed,
            author: { '@type': 'Organization', name: 'Disaster Recovery' },
          }),
        }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="How to Document Storm Damage for an Insurance Claim"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'How to Document Storm Damage for an Insurance Claim' },
        ]}
        sections={[
          {
            heading: 'How to Document Storm Damage for Your Insurance Claim',
            body: (
              <>
                <p>
                  Documenting storm damage for insurance is different from documenting water
                  damage after a burst pipe. The core challenge with storm claims is proving
                  the storm event caused the damage — not wear and tear, not pre-existing
                  deterioration. This requires a specific, methodical approach before any
                  cleanup or make-safe work begins.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>
                    Do not touch or clean up damage before photographing everything.
                  </strong>{' '}
                  This is the single most important rule. Insurers can and do deny storm
                  claims on the basis of &quot;pre-existing damage&quot; when the claimant
                  cannot demonstrate that the damage pattern is consistent with a storm event.
                  Once you move debris, clean up tiles, or dispose of damaged materials, you
                  lose that evidence permanently.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  What to document, in priority order:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof surface, tiles, and sarking:</strong> Photograph from the
                    ground and, where safe, with a drone or elevated position. Capture
                    displaced, cracked, or missing tiles; damage to the sarking membrane
                    underneath; and any exposed timber. Do not access the roof without a
                    structural safety assessment if there has been tree-fall or significant
                    impact.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Gutters, fascia, and soffits:</strong> Storm-force wind and
                    debris cause distinctive patterns on gutters and fascia — denting,
                    detachment, and bowing. Photograph the full run of guttering and any
                    sections that have separated from the fascia board.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Windows, doors, and frames:</strong> Record all broken glazing,
                    cracked frames, and damaged seals. Include close-ups showing the direction
                    of impact if identifiable — for example, glass broken inward versus
                    outward indicates wind direction.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>External walls and weatherboard cladding:</strong> Photograph any
                    penetration damage to cladding — hail impact marks, debris punctures, and
                    dislodged boards. On weatherboard and fibre cement homes, impact patterns
                    from hail or airborne debris are key evidence distinguishing storm damage
                    from weathering.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Tree-fall impact:</strong> If a tree or branch has fallen on the
                    property, photograph the full tree, the root ball (or break point), the
                    path of impact, and all resulting structural damage before any limb removal.
                    Document the species and approximate height if known.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Fences, sheds, carports, and outbuildings:</strong> These
                    structures are often lower on the priority list but represent significant
                    claim value. Photograph them as comprehensively as the main dwelling.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Swimming pool surrounds:</strong> Cracked coping, damaged pool
                    equipment, and waterline tile damage from debris are all claimable.
                    Document before any debris removal.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Vehicle damage:</strong> If vehicles were damaged on the property,
                    photograph them in situ before moving. Vehicle claims typically go through
                    comprehensive motor insurance, but evidence of the same event affecting
                    vehicles strengthens the overall storm narrative.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents moved or damaged by water ingress:</strong> If rain has
                    entered through storm damage, document wet floors, waterlogged contents,
                    and water lines on walls before any drying or removal begins.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Evidence hierarchy: timestamped photos and video carry the most weight,
                  followed by a professional contractor assessment, then BOM weather records,
                  then neighbour testimonies and corroborating photos from nearby properties.
                  Build your evidence package from the top down.
                </p>
              </>
            ),
          },
          {
            heading: 'What Insurers Look For — Storm vs Pre-Existing Damage',
            body: (
              <>
                <p>
                  &quot;Pre-existing damage&quot; is the most common grounds for partial denial
                  or reduction of storm claims. Understanding how insurers assess this helps
                  you build a claim that is difficult to challenge.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Insurers look for consistency between the claimed cause (the storm event)
                  and the damage pattern. Storm damage has characteristic features that
                  distinguish it from ordinary wear and weathering:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Acute impact patterns:</strong> Hail leaves circular impact
                    marks of consistent size across all exposed surfaces simultaneously.
                    Wind damage causes directional displacement — tiles are pushed in a
                    consistent direction, debris impact marks follow a trajectory. These
                    patterns are inconsistent with gradual deterioration.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Simultaneous damage across multiple surfaces:</strong> Storm
                    damage typically affects multiple unrelated elements at the same time —
                    roof, gutters, windows, and fencing all showing new damage is consistent
                    with a single storm event. Isolated damage to a single ageing element
                    is more likely to be challenged.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>BOM weather event confirmation:</strong> A severe thunderstorm,
                    hailstorm, or tropical cyclone recorded at or near your location on the
                    date of damage objectively establishes the insured event occurred. Without
                    this, insurers have more latitude to dispute the claim. Obtain BOM
                    Historical Observation Data or ask your insurer for their weather event
                    confirmation directly.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Neighbour corroboration:</strong> If neighbouring properties
                    suffered similar damage in the same event, this significantly strengthens
                    your claim. Collect photos or written statements from neighbours where
                    possible.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contractor assessment:</strong> An IICRC-certified contractor
                    can provide a professional assessment report identifying damage patterns
                    consistent with storm impact versus pre-existing deterioration. This
                    independent professional opinion is valuable evidence if the claim is
                    disputed.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your insurer challenges damage as pre-existing, respond in writing with
                  your BOM data, contractor assessment, and any corroborating neighbour
                  evidence. Keep copies of all correspondence. If the dispute is not resolved
                  through the insurer&apos;s internal process, you have the right to escalate
                  to AFCA free of charge.
                </p>
              </>
            ),
          },
          {
            heading: 'Lodging Your Claim and Escalation',
            body: (
              <>
                <p>
                  Once your documentation is complete, lodge your claim promptly. Most
                  policies require notification as soon as reasonably practicable — aim for
                  within 72 hours of the event. Delayed lodgement does not automatically
                  void a claim, but it creates unnecessary risk.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>What to say to your insurer:</strong> Provide the date and time
                    of the storm, a factual description of the damage you have observed,
                    and the steps you have taken to mitigate further damage (e.g., temporary
                    tarping arranged). Do not speculate on causes or estimate costs — describe
                    what you can see and let the assessor determine the rest.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Upload your evidence immediately:</strong> Attach timestamped
                    photos and video to your claim lodgement. Do not wait for a physical
                    assessor visit to submit your documentation — the more evidence on file
                    at lodgement, the faster the claim moves.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Request weather event confirmation:</strong> Ask your insurer
                    to record that the claim is linked to a specific weather event. If they
                    cannot confirm this from their own data, provide your BOM Historical
                    Observation Data showing the storm occurred at your location.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer response timeline:</strong> Under the General Insurance
                    Code of Practice, your insurer must make a decision within 10 business
                    days of receiving all required information. If they need more time, they
                    must notify you in writing with a revised timeframe.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Internal dispute resolution:</strong> If your claim is denied
                    or reduced, you can request an internal review. The insurer must have a
                    formal internal dispute resolution process and must respond within
                    30 calendar days.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Escalating to AFCA:</strong> If the internal review does not
                    resolve the dispute, you can lodge a complaint with the Australian
                    Financial Complaints Authority (AFCA) at no cost. AFCA is the external
                    disputes body for general insurance in Australia and can award binding
                    determinations against insurers. You have 2 years from the insurer&apos;s
                    final decision to lodge an AFCA complaint.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Through the Disaster Recovery platform, we bill you directly so emergency
                  make-safe work — including roof tarping and board-up — begins immediately
                  without waiting for insurer approval. Your IICRC-certified contractor
                  provides a full documentation package including pre-work photographs,
                  scope of works, and a contractor assessment report, giving your insurer
                  everything they need to process your reimbursement efficiently.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How long do I have to lodge a storm damage insurance claim?',
            answer:
              'Most home and contents policies require you to notify your insurer as soon as reasonably practicable after the event — ideally within 72 hours. Check your Product Disclosure Statement (PDS) for your policy\'s specific notification window. Delayed lodgement does not automatically void a claim, but it can complicate evidence collection and give insurers grounds to question whether damage occurred during the storm event. Lodge early, even if your full documentation is not yet complete.',
          },
          {
            question: 'Can I clean up before photographing storm damage?',
            answer:
              'No. Do not move, remove, or clean any damaged materials before photographing everything thoroughly. Insurers can challenge claims on the basis of "pre-existing damage" if you cannot prove the storm event caused it. Photographs taken after cleanup lose critical evidence of the damage pattern, debris trajectory, and point of impact. Make temporary safety arrangements (such as tarping) without disturbing the damage evidence. Only after comprehensive documentation should cleanup begin.',
          },
          {
            question: 'What if the insurer says the damage is pre-existing?',
            answer:
              'This is one of the most common insurer disputes for storm claims. To counter it, you need three things: BOM weather event data confirming a severe storm occurred at your location and date, a contractor assessment report identifying acute impact patterns (displaced tiles, fractured fascia, penetration damage) consistent with storm force rather than wear and tear, and corroborating evidence such as neighbour photos or testimonies. If the dispute is not resolved internally, you can escalate to AFCA at no cost within 2 years of the insurer\'s decision.',
          },
          {
            question: 'What BOM records should I get for a storm insurance claim?',
            answer:
              'Contact the Bureau of Meteorology (BOM) to obtain Historical Observation Data for the nearest weather station to your property. You can also ask your insurer to provide a "weather event confirmation" letter directly from their weather data provider. Key data points are maximum wind gusts, rainfall intensity, and whether the event was classified as a severe thunderstorm or tropical cyclone. This data objectively establishes that a qualifying storm event occurred at your location on the date of damage.',
          },
        ]}
        relatedGuides={[
          {
            title: 'How to Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'Comprehensive guide to documenting property water damage for your insurer.',
          },
          {
            title: 'Insurance Claim Denial Rights',
            href: '/guides/insurance/insurance-claim-denial-rights',
            description: 'Your rights when an insurer denies or reduces a claim — and how to respond.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'How to escalate an unresolved insurance dispute to AFCA.',
          },
          {
            title: 'Storm Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-storm-damage-restoration-cost',
            description: 'What storm damage restoration costs in Australia — by damage type.',
          },
        ]}
        cta={{ text: 'Lodge Your Claim Now', href: '/claim' }}
      />
    </>
  );
}
