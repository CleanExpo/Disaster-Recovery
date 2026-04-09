import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Document Fire and Smoke Damage for an Insurance Claim',
  description: 'Expert guide to documenting fire and smoke damage for insurance — what to photograph before cleanup, how to handle arson investigations, ACV vs RCV disputes, and how to escalate through AFCA.',
  keywords: 'document fire damage insurance, fire damage insurance claim, smoke damage insurance, fire damage photos, ACV RCV insurance, AFCA fire damage dispute',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/document-fire-damage-insurance`,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I photograph first after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Before any cleanup, complete a full external circuit of the property photographing all four sides, then document every room internally from the doorway first (wide shot), then close-ups of specific damage. Prioritise the origin zone — the area where the fire started — as this is critical for both the insurance claim and any fire investigation. Also photograph soot migration into rooms that appear undamaged, HVAC vents and return air grilles with visible soot, and all contents in affected areas with serial numbers and labels where visible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I clean up before the insurer inspects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — and with fire damage this is more critical than any other damage type. Fire investigators may attend within 24–48 hours of the event, and premature cleanup can destroy forensic evidence relevant to both the insurance claim and any potential investigation. Do not disturb the origin zone under any circumstances until the cause of fire has been formally determined. You may perform limited make-safe works (boarding broken windows, tarping a compromised roof) but document everything before and after any make-safe action. Do not remove any debris, damaged contents, or structural materials.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I dispute smoke damage underpayment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke damage to secondary rooms — rooms not directly involved in the fire — is the most commonly underpaid element of a fire claim. Insurers frequently argue that smoke contamination in adjacent rooms is superficial or cosmetic. To dispute this, you need a professional scope of works from an IICRC-certified contractor documenting soot settlement, smoke odour permeation, and HVAC contamination throughout the property. If the insurer still undervalues, lodge a formal internal dispute. If unresolved, escalate to AFCA — secondary smoke permeation disputes are well within AFCA\'s jurisdiction and insurers are regularly required to pay the full scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do I have to lodge a fire damage claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lodge your fire damage claim as soon as practicable after the event — ideally within 24–48 hours. Most home and contents policies require prompt notification. Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days of receiving all requested information. For AFCA escalation, you have 2 years from the date of the insurer\'s final decision to lodge a complaint. Do not delay — the longer you wait, the harder it becomes to establish that secondary smoke damage occurred during the fire event rather than subsequently.',
      },
    },
  ],
};

const lastReviewed = '2026-04-09';

export default function DocumentFireDamageInsurancePage() {
  return (
    <>
      <Script
        id="docfire-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="docfire-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Document Fire and Smoke Damage for an Insurance Claim',
            dateModified: lastReviewed,
            author: { '@type': 'Organization', name: 'Disaster Recovery' },
          }),
        }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="How to Document Fire and Smoke Damage for an Insurance Claim"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'How to Document Fire and Smoke Damage for an Insurance Claim' },
        ]}
        sections={[
          {
            heading: 'How to Document Fire and Smoke Damage for Insurance',
            body: (
              <>
                <p>
                  Fire damage documentation is uniquely time-sensitive. Unlike water damage,
                  where the primary urgency is preventing further spread, fire scenes involve
                  a second layer of complexity: investigators — both insurer-appointed and
                  potentially government fire services — may attend within 24–48 hours. Any
                  premature cleanup or disturbance of the scene can destroy evidence that your
                  claim, and potentially a fire investigation, depends on.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Fire damage also evolves rapidly after the event. Soot settles into surfaces
                  and contents within hours. Water from fire suppression causes secondary
                  damage — soaking into floors, walls, and ceilings. Structural movement from
                  heat and moisture changes the shape and condition of the building. What you
                  document in the first 24 hours will be materially different from what exists
                  72 hours later. This is why comprehensive, immediate documentation is
                  non-negotiable.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  What to document before any cleanup, in priority order:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full external circuit of the property:</strong> Walk all four
                    sides and photograph the building continuously. Capture roof damage,
                    wall penetrations from fire exit, char patterns on external surfaces,
                    and the condition of windows and doors. This establishes the external
                    scope before any emergency works begin.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Room-by-room internal documentation:</strong> Begin at the
                    least-affected rooms and work toward the fire origin zone. Photograph
                    from each doorway first (wide shot showing the full room), then
                    close-ups of soot deposition on walls, ceilings, floors, and contents.
                    Even rooms that appear undamaged may have smoke permeation not visible
                    to the naked eye.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof access (only if structurally safe):</strong> If the roof
                    has been compromised by fire and structural safety is uncertain, do not
                    access it. Photograph from below and from the ground outside. If safe,
                    document the full extent of roof damage before any tarping.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents in affected rooms:</strong> Photograph all contents
                    individually — furniture, electronics, appliances, clothing, documents.
                    For high-value items, capture the serial number plate or model label.
                    This is the basis for your contents claim, and the difference between
                    actual cash value (ACV) and replacement cost value (RCV) can be
                    thousands of dollars per item.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Smoke migration to unaffected rooms:</strong> Walk every room
                    in the building — including bedrooms, bathrooms, and storage areas
                    that appear undamaged. Photograph soot on light fittings, air vents,
                    window sills, and any surface that has visible deposition. This
                    documents the secondary smoke scope before soot settlement makes
                    attribution harder.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>HVAC and ducting soot contamination:</strong> Remove the cover
                    plate from return air grilles and supply registers and photograph the
                    interior of the duct. Soot contamination in the HVAC system is one of
                    the most frequently disputed and underpaid elements of a fire claim.
                    Documenting it immediately establishes causation.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If the fire origin is uncertain — particularly if investigators have not
                  yet attended — do not disturb the origin zone under any circumstances.
                  Insurers can appoint forensic fire investigators, and premature cleanup of
                  the origin zone voids evidence that may be critical to both the claim and
                  any arson investigation.
                </p>
              </>
            ),
          },
          {
            heading: 'What Insurers Dispute — Smoke Damage in Secondary Rooms',
            body: (
              <>
                <p>
                  The most common source of fire claim disputes is not the rooms directly
                  affected by flame — it is the secondary smoke damage throughout the rest
                  of the property. Insurers frequently argue that smoke contamination in
                  rooms not directly involved in the fire is superficial, cosmetic, or
                  temporary, and authorise only partial remediation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  This position is incorrect. Smoke is a complex mixture of particles,
                  gases, and volatile organic compounds that permeate porous surfaces —
                  timber, plasterboard, insulation, carpets, soft furnishings, clothing,
                  and HVAC ducting — and cannot be removed by surface cleaning alone.
                  Inadequate remediation of smoke-contaminated materials results in
                  persistent odour, ongoing off-gassing of toxic compounds, and potential
                  long-term health impacts.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Key disputed areas and how to document them:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Secondary room smoke permeation:</strong> Photograph soot on
                    all surfaces in every room. A professional contractor assessment
                    documenting soot depth and odour permeation is more compelling to
                    insurers than photographs alone. Request a written scope of works
                    identifying every affected room and the required treatment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>HVAC system contamination:</strong> Soot travels through
                    ducting and contaminates the entire HVAC system, including the air
                    handler, coils, and all supply and return runs. This is frequently
                    disputed because contamination is not visible from the outside.
                    A contractor inspection of the interior of accessible ductwork,
                    with photographs, establishes the scope.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Actual cash value vs replacement cost value (ACV vs RCV):</strong>{' '}
                    Most home and contents policies pay replacement cost value — what it
                    costs to replace an item new. Some policies pay actual cash value,
                    which applies depreciation. Check your Product Disclosure Statement.
                    For contents, document every item with serial numbers, approximate
                    age, and original purchase price if known — this maximises the
                    assessed value. If the insurer applies excessive depreciation, dispute
                    it in writing.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer scope versus contractor scope:</strong> Insurers may
                    accept a scope that cleans affected surfaces without replacing
                    contaminated materials. If an IICRC-certified contractor recommends
                    replacement (for example, of porous insulation or smoke-saturated
                    carpet) and the insurer disagrees, get the contractor recommendation
                    in writing and dispute the insurer&apos;s position formally.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your insurer undervalues smoke damage to secondary rooms, AFCA accepts
                  fire damage disputes and has consistently found in favour of property owners
                  where a professional scope supports the broader remediation. Document the
                  full scope including all secondary smoke zones before agreeing to any
                  insurer-authorised scope.
                </p>
              </>
            ),
          },
          {
            heading: 'Lodging and Escalating Your Fire Claim',
            body: (
              <>
                <p>
                  Lodge your fire damage claim as soon as practicable after the event.
                  For most policies, this means within 24–48 hours. Provide your policy
                  number, the date and time of the fire, a description of what occurred,
                  and your initial photographic documentation. You do not need to have
                  a complete scope of works to lodge — the insurer will arrange an
                  assessor visit after lodgement.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency make-safe works:</strong> You may arrange emergency
                    temporary repairs — boarding broken windows, tarping a compromised roof,
                    securing the property against unauthorised entry — without waiting for
                    insurer approval. Document all works before and after. Keep every
                    receipt. Submit make-safe costs as part of your claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not authorise permanent repairs:</strong> Do not engage
                    contractors to begin permanent restoration or rebuild without written
                    insurer approval. The exception is emergency make-safe. Permanent
                    repairs without approval give the insurer grounds to dispute or reduce
                    the claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer response timeline:</strong> Under the General Insurance
                    Code of Practice, your insurer must make a decision on your claim within
                    10 business days of receiving all required information. For complex fire
                    claims, they may appoint a loss assessor — typically within 5–10 business
                    days of lodgement.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Internal dispute resolution:</strong> If your claim is denied
                    or you believe the scope has been undervalued, request a formal internal
                    review. The insurer must respond within 30 calendar days. Provide your
                    contractor&apos;s scope of works and any forensic assessment reports
                    in support of your position.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA escalation:</strong> If the internal review does not
                    resolve the dispute, lodge a complaint with the Australian Financial
                    Complaints Authority (AFCA) at no cost. AFCA accepts fire damage
                    disputes including secondary smoke underpayment, ACV vs RCV disputes,
                    and scope of works disagreements. You have 2 years from the insurer&apos;s
                    final decision to lodge.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Through the Disaster Recovery platform, our IICRC-certified contractors
                  provide complete documentation from the first attendance — full scope of
                  works, room-by-room photo documentation, HVAC assessment, and a completion
                  report — giving your insurer everything they need and ensuring the full
                  extent of fire and smoke damage is on record before any scope is agreed.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should I photograph first after a fire?',
            answer:
              'Before any cleanup, complete a full external circuit of the property photographing all four sides, then document every room internally from the doorway first (wide shot), then close-ups of specific damage. Prioritise the origin zone — the area where the fire started — as this is critical for both the insurance claim and any fire investigation. Also photograph soot migration into rooms that appear undamaged, HVAC vents and return air grilles with visible soot, and all contents in affected areas with serial numbers and labels where visible.',
          },
          {
            question: 'Can I clean up before the insurer inspects?',
            answer:
              'No — and with fire damage this is more critical than any other damage type. Fire investigators may attend within 24–48 hours of the event, and premature cleanup can destroy forensic evidence relevant to both the insurance claim and any potential investigation. Do not disturb the origin zone under any circumstances until the cause of fire has been formally determined. You may perform limited make-safe works (boarding broken windows, tarping a compromised roof) but document everything before and after any make-safe action. Do not remove any debris, damaged contents, or structural materials.',
          },
          {
            question: 'How do I dispute smoke damage underpayment?',
            answer:
              'Smoke damage to secondary rooms — rooms not directly involved in the fire — is the most commonly underpaid element of a fire claim. Insurers frequently argue that smoke contamination in adjacent rooms is superficial or cosmetic. To dispute this, you need a professional scope of works from an IICRC-certified contractor documenting soot settlement, smoke odour permeation, and HVAC contamination throughout the property. If the insurer still undervalues, lodge a formal internal dispute. If unresolved, escalate to AFCA — secondary smoke permeation disputes are well within AFCA\'s jurisdiction and insurers are regularly required to pay the full scope.',
          },
          {
            question: 'How long do I have to lodge a fire damage claim?',
            answer:
              'Lodge your fire damage claim as soon as practicable after the event — ideally within 24–48 hours. Most home and contents policies require prompt notification. Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days of receiving all requested information. For AFCA escalation, you have 2 years from the date of the insurer\'s final decision to lodge a complaint. Do not delay — the longer you wait, the harder it becomes to establish that secondary smoke damage occurred during the fire event rather than subsequently.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Document Water Damage Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'Comprehensive guide to documenting property water damage for your insurer.',
          },
          {
            title: 'Document Storm Damage Insurance',
            href: '/guides/insurance/document-storm-damage-insurance',
            description: 'How to document storm damage and counter pre-existing damage disputes.',
          },
          {
            title: 'Insurance Claim Denial Rights',
            href: '/guides/insurance/insurance-claim-denial-rights',
            description: 'Your rights when an insurer denies or reduces a claim — and how to respond.',
          },
          {
            title: 'Fire Damage Cost Guide',
            href: '/guides/cost-guides/how-much-fire-damage-restoration-cost',
            description: 'What fire damage restoration costs in Australia — by damage type and scope.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
