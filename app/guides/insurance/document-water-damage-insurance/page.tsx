import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Documenting Water Damage for Insurance Claims',
  description: 'Expert answers and solutions for "how to document water damage for insurance claim". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'how to document water damage for insurance claim, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/document-water-damage-insurance' },
};

export default function DocumentWaterDamageInsurancePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Documenting Water Damage for Insurance Claims"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Documenting Water Damage for Insurance Claims' },
      ]}
      sections={[
        {
          heading: 'What to Document Immediately After Water Damage',
          body: (
            <>
              <p>
                The first 24 hours after water damage are critical — not just for minimising
                property loss, but for building the evidence your insurer needs to process your
                claim. Thorough documentation from the outset significantly improves your chances
                of a smooth reimbursement.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Timestamped photos and video:</strong> Use your phone to capture photos
                  and video of all affected areas. Ensure your device&apos;s date and time stamp
                  is enabled — insurers use timestamps to establish the timeline of events. Record
                  a slow walk-through video narrating what you see.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Water source identification:</strong> Document the source of the water
                  if you can safely identify it — burst pipe, roof leak, overflowing appliance,
                  stormwater ingress, or rising floodwater. The source determines the category of
                  water damage (clean, grey or black) which affects both the restoration approach
                  and the claim.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Affected areas and extent:</strong> Record every room, hallway and
                  storage area that shows signs of water. Note water lines on walls, saturated
                  carpet, swollen skirting boards, and discolouration on ceilings. Water often
                  migrates behind walls and under flooring, so document adjacent areas too.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Damaged items with estimated values:</strong> Create a written inventory
                  of damaged contents — furniture, electronics, clothing, documents, appliances.
                  Include the item description, approximate age, original purchase price if known,
                  and current condition. Photograph each item individually.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If you have receipts, warranties or proof of purchase for damaged items, set them
                aside. Your insurer may request these to verify replacement values.
              </p>
            </>
          ),
        },
        {
          heading: 'How to Photograph Water Damage Correctly',
          body: (
            <>
              <p>
                Insurance assessors and claims handlers rely heavily on photographic evidence.
                Poor-quality or incomplete photos are one of the most common reasons claims are
                delayed or disputed. Follow these guidelines to capture the evidence your insurer
                needs.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Wide shots plus close-ups:</strong> For each affected area, take at
                  least one wide-angle photo showing the full room, then close-up shots of
                  specific damage — peeling paint, swollen timber, saturated carpet, water
                  staining. The wide shot provides context; the close-up provides detail.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Include reference objects for scale:</strong> Place a ruler, tape
                  measure, or common object (such as a coin) next to damage to show scale. This
                  is particularly important for cracks, water lines and mould growth — insurers
                  need to assess the extent of damage from photos alone.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Capture water lines on walls:</strong> Water lines are critical evidence
                  of flood height. Photograph them straight-on with a measuring tape held
                  vertically against the wall. Mark the water line with painter&apos;s tape if it
                  is fading.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Document serial numbers and labels:</strong> For damaged electronics and
                  appliances, photograph the serial number plate, model number and any brand
                  labels. This helps your insurer verify the item and determine replacement value.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photograph the source:</strong> If the water source is visible and safe
                  to access (burst pipe joint, failed fitting, roof penetration), photograph it
                  clearly. This evidence supports the cause-of-loss determination in your claim.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Store all photos in a separate folder on your phone and back them up to cloud
                storage immediately. Do not edit, crop or filter any images — insurers require
                unaltered originals.
              </p>
            </>
          ),
        },
        {
          heading: 'Insurance Claim Timeline in Australia',
          body: (
            <>
              <p>
                Understanding the typical insurance claim timeline helps you manage expectations
                and take the right actions at each stage. The General Insurance Code of Practice
                sets minimum standards for Australian insurers.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge within 24–48 hours:</strong> Contact your insurer as soon as
                  reasonably possible. Most policies require prompt notification. Provide your
                  policy number, a description of the event, and your initial photos. Many
                  insurers now accept online or app-based claims lodgement.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Insurer responds within 10 business days:</strong> Under the General
                  Insurance Code of Practice, your insurer must make a decision on your claim
                  within 10 business days of receiving all requested information. If they need
                  more time (for example, awaiting an assessor report), they must tell you in
                  writing and provide a revised timeframe.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Assessor visit:</strong> For significant claims, your insurer will
                  arrange for a loss assessor to inspect the property. This typically occurs
                  within 5–10 business days of lodgement. Having your documentation ready —
                  photos, inventory, receipts — speeds up this step significantly.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Claim approval and restoration:</strong> Once approved, you arrange
                  restoration work. If you have already engaged a restoration contractor through
                  the Disaster Recovery platform, work may already be underway (make-safe and
                  drying can begin before full claim approval to prevent secondary damage).
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                You do not have to wait for insurer approval before beginning make-safe works.
                We bill you directly so that emergency work begins immediately, and your
                contractor provides full documentation to support your reimbursement claim.
              </p>
            </>
          ),
        },
        {
          heading: 'How We Help with Documentation',
          body: (
            <>
              <p>
                Professional documentation is one of the biggest advantages of using the
                Disaster Recovery platform. Our IICRC-certified contractors produce
                industry-standard reports that give your insurer exactly what they need to process
                your claim efficiently.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Full scope of works:</strong> A detailed, itemised document listing
                  every task to be performed, the materials required, and the expected cost. This
                  becomes the basis for your insurer&apos;s assessment of the claim value.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Moisture readings and mapping:</strong> Professional-grade moisture
                  metres and thermal hygrometers are used to map the extent of water penetration,
                  including behind walls and under floors where damage is invisible to the eye.
                  Readings are recorded daily to track drying progress.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Thermal imaging:</strong> Infrared cameras detect moisture patterns
                  invisible to the naked eye, identifying wet areas behind plasterboard, under
                  tiles and within ceiling cavities. Thermal images are included in your
                  documentation package.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Progress reports with photographs:</strong> Your contractor provides
                  regular photographic updates documenting the drying process, demolition of
                  unsalvageable materials, and restoration progress. This continuous documentation
                  trail satisfies insurer requirements for evidence of work performed.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Completion report:</strong> At the end of the job, you receive a
                  comprehensive completion report with final moisture readings confirming the
                  property has been dried to IICRC S500 standard, before-and-after photographs,
                  and a summary of all works performed.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Everything your insurer needs is included — you control the process from start to
                finish. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What photos do I need for a water damage insurance claim?',
          answer:
            'Take wide-angle shots of each affected room plus close-ups of specific damage. Include a ruler or common object for scale. Photograph water lines on walls with a tape measure, serial numbers on damaged appliances, and the water source if visible. Ensure timestamps are enabled on your phone. Store unedited originals and back up to cloud storage immediately.',
        },
        {
          question: 'How soon do I need to lodge a water damage claim with my insurer?',
          answer:
            'Lodge your claim within 24–48 hours of discovering the damage. Most home and contents policies require prompt notification. Contact your insurer by phone or their online portal, provide your policy number, a brief description, and your initial photos. Under the General Insurance Code of Practice, your insurer must respond within 10 business days of receiving all requested information.',
        },
        {
          question: 'Can I start water damage restoration before my insurance claim is approved?',
          answer:
            'Yes, and in many cases you should. Make-safe works such as water extraction, removing saturated materials and starting dehumidification prevent secondary damage like mould growth. Most insurance policies expect you to take reasonable steps to mitigate further damage. Through the Disaster Recovery platform, we bill you directly so work begins immediately — your contractor provides full documentation for your reimbursement claim.',
        },
        {
          question: 'What documentation does my insurer need for a water damage claim?',
          answer:
            'Insurers typically require timestamped photographs of all damage, an itemised inventory of damaged contents with estimated values, proof of the water source, a professional scope of works from the restoration contractor, moisture readings, and a completion report. Our IICRC-certified contractors provide all of this as standard — scope of works, moisture mapping, thermal imaging, progress photos and a final completion report.',
        },
        {
          question: 'How long does a water damage insurance claim take in Australia?',
          answer:
            'Under the General Insurance Code of Practice, your insurer must decide on your claim within 10 business days of receiving all required information. However, complex claims involving structural damage, large-scale flooding or disputes over the cause of loss can take longer. Having thorough documentation from the outset — photos, moisture readings, a professional scope of works — significantly reduces delays.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Water Damage Restoration Guides',
          href: '/guides/water-damage',
          description: 'Complete guide hub for all water damage restoration topics.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description: 'Why waiting for insurer approval can make water damage worse and cost more.',
        },
        {
          title: 'Submit a Claim',
          href: '/claim',
          description: 'Get matched with an IICRC-certified contractor in your area now.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
