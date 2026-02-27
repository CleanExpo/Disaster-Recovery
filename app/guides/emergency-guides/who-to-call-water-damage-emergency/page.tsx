import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Water Damage: Who to Call First | Disaster Recovery',
  description: 'Expert answers and solutions for "who to call for emergency water damage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'who to call for emergency water damage, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/emergency-guides/who-to-call-water-damage-emergency' },
};

export default function WhoToCallWaterDamageEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency Guides"
      title="Emergency Water Damage: Who to Call First"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency Guides', href: '/guides/emergency-guides' },
        { label: 'Emergency Water Damage: Who to Call First' },
      ]}
      sections={[
        {
          heading: 'Who to Call and in What Order',
          body: (
            <>
              <p>
                In a water damage emergency, knowing who to call — and in what sequence — can save
                hours of confusion and prevent secondary damage. Here is the recommended order for
                Australian property owners.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>1. Emergency services (if life-threatening):</strong> Call 000 if there is
                  immediate danger — rising floodwater, structural collapse, gas smell, or risk of
                  electrocution. For storm and flood assistance that is urgent but not life-threatening,
                  call the SES on 132 500.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>2. Plumber (for burst pipes or supply leaks):</strong> If the water source is
                  a burst pipe, leaking hot water system, or plumbing failure, call a licensed plumber
                  to isolate and repair the source. Turn off the mains water at the meter while you wait
                  if you can do so safely.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>3. Restoration company (for extraction and drying):</strong> Once the water
                  source is stopped or the storm has passed, a professional restoration company should
                  begin water extraction and structural drying as soon as possible. Disaster Recovery
                  connects you with IICRC-certified contractors — submit a claim through our platform
                  to get matched within hours.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>4. Your insurer (to lodge a claim):</strong> Contact your insurance company to
                  report the damage and obtain a claim reference number. Do not wait for insurer approval
                  before starting emergency make-safe — most policies require you to take reasonable steps
                  to mitigate further damage.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What to Tell the Restoration Company',
          body: (
            <>
              <p>
                When you contact a restoration company or submit a claim through Disaster Recovery,
                having the following information ready helps your contractor respond faster and arrive
                with the right equipment.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Water source:</strong> Is it a burst pipe, appliance failure, roof leak, storm
                  damage, sewage backup, or floodwater? This determines the water category (1, 2, or 3)
                  and the equipment and PPE the crew needs to bring.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Area affected:</strong> How many rooms? Which levels of the building? Is water
                  still actively flowing or has it stopped? Approximate depth of standing water if present.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Property type:</strong> Residential house, apartment, townhouse, commercial
                  premises, strata building? Multi-storey properties and strata situations may require
                  coordination with body corporate or building management.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Access information:</strong> Street address, unit number, building access codes,
                  parking availability for service vehicles, and who will be on-site to provide access.
                  If the property is tenanted, confirm whether the tenant or landlord is the point of contact.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Emergency Make-Safe — What It Includes',
          body: (
            <>
              <p>
                Emergency make-safe is the first phase of professional water damage restoration. Its
                purpose is to stop the damage from getting worse, stabilise the property, and protect
                occupants and contents.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Through the Disaster Recovery platform, the make-safe process is funded by your initial
                $2,750 commitment:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$550 platform fee:</strong> Covers claim lodgement, contractor matching,
                  documentation pack, and ongoing support throughout the project.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$2,200 contractor credit:</strong> Applied directly to your emergency make-safe
                  works including water extraction, initial drying setup, and damage assessment.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                During make-safe, your IICRC-certified contractor will extract standing water, deploy
                drying equipment (air movers and dehumidifiers), take moisture readings to map the
                extent of damage, apply antimicrobial treatment where required, and document everything
                with photos and reports. After the make-safe, they will provide a formal contract with
                full terms and conditions for the remaining restoration scope.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help manage costs while you await your insurance reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'After the Call — Preparing for Your Contractor',
          body: (
            <>
              <p>
                While waiting for your restoration contractor to arrive, there are several things you
                can do to protect your property and support your insurance claim.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Document everything:</strong> Photograph and video all affected areas, damaged
                  items, and the water source. Capture wide-angle room shots and close-up detail shots.
                  Include a reference object (like a ruler or coin) for scale where possible. This
                  evidence is critical for your insurance claim.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Save all receipts:</strong> Keep receipts for any emergency purchases (mops,
                  buckets, towels, temporary accommodation, takeaway meals). These may be claimable
                  under your insurance policy depending on your cover.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Move valuables to dry areas:</strong> If safe to do so, move electronics,
                  documents, photographs, and other irreplaceable items out of the affected area. Place
                  aluminium foil or plastic under furniture legs to prevent staining on wet carpet.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Prepare for your insurer:</strong> Gather your policy number, claim reference
                  number (if already lodged), and a list of damaged items with approximate values. Your
                  Disaster Recovery documentation pack will supplement this with professional-grade
                  evidence.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Who should I call first for emergency water damage in Australia?',
          answer:
            'If there is immediate danger (rising floodwater, structural collapse, gas smell, electrocution risk), call 000 first. For storm and flood assistance that is not life-threatening, call the SES on 132 500. For burst pipes, call a licensed plumber to stop the water source. Then contact a professional restoration company to begin water extraction and drying — Disaster Recovery connects you with IICRC-certified contractors through our online claim platform.',
        },
        {
          question: 'Do I need to wait for my insurer before starting cleanup?',
          answer:
            'No. Most Australian insurance policies require you to take reasonable steps to mitigate further damage. Delaying extraction and drying can significantly increase damage and costs. Lodge your claim with your insurer as soon as practical, but do not delay emergency make-safe works. We bill you directly so work begins immediately, and we provide full documentation to support your insurance reimbursement.',
        },
        {
          question: 'How quickly can a restoration company respond to water damage?',
          answer:
            'Through Disaster Recovery, IICRC-certified contractors are typically matched and dispatched within hours of claim submission. Response times vary by location — metropolitan areas generally have faster response than regional or remote locations. The critical target is to begin water extraction within the first 6 hours and have drying equipment operational within 24 hours to prevent mould growth.',
        },
        {
          question: 'What does emergency make-safe include for water damage?',
          answer:
            'Emergency make-safe includes water extraction using commercial pumps and wet vacuums, deployment of air movers and dehumidifiers for structural drying, moisture mapping to determine the full extent of damage, antimicrobial treatment where required, and comprehensive photo and written documentation. Through the Disaster Recovery platform, this is covered by your $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit).',
        },
        {
          question: 'What information do I need when calling about water damage?',
          answer:
            'Have the following ready: the water source (burst pipe, appliance, storm, sewage), number of rooms affected and which levels of the building, whether water is still flowing, property type (house, apartment, commercial), access details (address, unit number, parking, who will be on-site), and your insurance policy number if available. This helps your contractor arrive with the right equipment and crew.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Water Damage Restoration Guide',
          href: '/guides/water-damage',
          description: 'Complete guide to the professional water damage restoration process.',
        },
        {
          title: 'Submit a Claim',
          href: '/claim',
          description: 'Get connected with IICRC-certified contractors in your area now.',
        },
        {
          title: 'How to Document Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'Step-by-step guide to documenting damage for your insurance claim.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
