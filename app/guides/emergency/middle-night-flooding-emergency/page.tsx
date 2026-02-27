import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Middle of Night Flooding: Emergency Response',
  description: 'Expert answers and solutions for "middle of night flooding emergency help". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'middle of night flooding emergency help, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/emergency/middle-night-flooding-emergency' },
};

export default function MiddleNightFloodingEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Middle of Night Flooding: Emergency Response"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Middle of Night Flooding: Emergency Response' },
      ]}
      sections={[
        {
          heading: 'Immediate Safety Steps — Before Anything Else',
          body: (
            <>
              <p>
                Waking up to the sound of water — or worse, stepping into it — triggers an
                immediate adrenaline response. Before you do anything else, prioritise safety
                over property.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Turn off electricity at the switchboard:</strong> If water is near any
                  electrical outlets, appliances, or wiring, switch off the mains power at your
                  meter box before entering the affected area. If the switchboard itself is in a
                  flooded area, do not touch it — call 000 instead.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Do not walk through standing water:</strong> Even shallow water can
                  conceal hazards — submerged power cables, sharp debris, or contaminated
                  sewage. If you must move through water, wear rubber-soled shoes and avoid
                  contact with electrical fittings.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Evacuate if necessary:</strong> If water is rising quickly, if there is
                  a gas smell, or if the building structure appears compromised (sagging ceilings,
                  cracking walls), evacuate immediately and call 000. For storm and flood
                  emergencies that are urgent but not immediately life-threatening, call the SES
                  on 132 500.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Account for everyone in the household:</strong> Wake all occupants and
                  ensure children, elderly family members, and pets are moved to a safe, dry area
                  of the property or to a neighbour&apos;s home.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Emergency Make-Safe Before Professionals Arrive',
          body: (
            <>
              <p>
                Once everyone is safe and the power is off, there are steps you can take to limit
                damage while you wait for professional help. These actions can save thousands of
                dollars in additional restoration costs.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Stop the water source if safe to do so:</strong> If the flooding is from
                  a burst pipe or appliance failure (not storm or external flood), turn off the
                  mains water at the meter. For a burst hot water system, close the isolation
                  valve on the unit. Do not attempt any plumbing repairs yourself — just stop the
                  flow.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Protect valuables and irreplaceable items:</strong> Move photo albums,
                  documents, electronics, and sentimental items to a dry area. Lift curtains and
                  drapes off the floor. Place aluminium foil or plastic under furniture legs to
                  prevent staining on wet carpet.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Mop and blot what you can:</strong> Use towels, mops, and buckets to
                  remove as much standing water as possible. Every litre you remove before the
                  professionals arrive is a litre less that soaks into subfloors, plasterboard,
                  and cabinetry.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Open internal doors (but keep external doors closed):</strong> Opening
                  internal doors promotes airflow and helps begin the drying process. Keep external
                  doors and windows closed if it is still raining or if flood conditions persist
                  outside.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'When to Call SES vs a Restoration Company',
          body: (
            <>
              <p>
                In the confusion of a midnight flooding emergency, many Australians are unsure
                who to call. The SES and a professional restoration company serve different but
                complementary roles:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Call the SES (132 500) when:</strong> You need emergency assistance with
                  storm damage, sandbagging, temporary tarping, tree removal from structures, or
                  rescue from floodwater. The SES handles immediate emergency response and
                  life-safety tasks during weather events. They do not perform water extraction,
                  structural drying, or restoration.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Call a restoration company when:</strong> You need professional water
                  extraction, dehumidification, structural drying, moisture mapping, antimicrobial
                  treatment, and damage documentation. This is the work that actually restores
                  your property and prevents secondary damage like mould growth.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Call both when:</strong> In a major storm event, you may need the SES for
                  immediate emergency stabilisation (tarping a damaged roof, removing a fallen
                  tree) and a restoration company for the extraction and drying that follows. Submit
                  your claim through Disaster Recovery at the same time you call the SES — your
                  restoration contractor can be matched and dispatched while the SES handles the
                  immediate hazard.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Remember: the SES is a volunteer emergency service. During major weather events,
                they may be overwhelmed with requests. Having a professional restoration company
                on standby ensures your property gets attention as quickly as possible.
              </p>
            </>
          ),
        },
        {
          heading: 'What Happens When You Submit a Midnight Claim',
          body: (
            <>
              <p>
                Disaster Recovery&apos;s claim platform operates 24 hours a day, 7 days a week — no
                answering machines, no callbacks. Here is what happens when you submit a claim at
                midnight:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Immediate matching:</strong> The system identifies available
                  IICRC-certified contractors in your area who are rostered for after-hours
                  response. Matching is based on location, damage type, and availability.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Contractor dispatch:</strong> Your matched contractor is notified and
                  contacts you directly to confirm arrival time and access details. Metropolitan
                  response is typically within a few hours; regional areas may take longer.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Emergency make-safe begins:</strong> On arrival, the crew begins water
                  extraction, deploys drying equipment, takes moisture readings, and starts
                  documenting the damage — all while you try to get some rest.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Full documentation:</strong> Your contractor produces a comprehensive
                  documentation pack including photos, moisture maps, and scope of works. This is
                  provided to you to support your insurance claim.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly, so work begins immediately without waiting for insurer
                approval. You control the process from start to finish. After the make-safe is
                complete, your contractor provides a formal contract with terms and conditions for
                the full restoration scope. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help manage costs while you await your insurance reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'Documentation Tips — Even at 2 am',
          body: (
            <>
              <p>
                Your smartphone is your most valuable tool in the first minutes of a flooding
                emergency. Even at 2 am in the dark, the evidence you capture now can make or
                break your insurance claim later.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Use your phone camera with flash:</strong> Take wide-angle shots of
                  every affected room showing the extent of water. Then take close-up photos of
                  specific damage — swollen skirting boards, waterlines on walls, damaged
                  appliances. The flash on your phone is sufficient; do not worry about photo
                  quality.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Record video with narration:</strong> Walk through the property recording
                  video while narrating what you see: &quot;Water is approximately 5 centimetres deep
                  in the lounge room, appears to be coming from the laundry.&quot; Video with audio
                  captures context that photos miss.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photograph the water source:</strong> If you can identify where the water
                  is coming from (burst pipe, roof leak, overflowing drain), photograph it. This
                  helps determine the water category and is critical for your insurance claim.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Write quick notes:</strong> Use your phone&apos;s notes app to record the
                  time you discovered the flooding, what you observed, and what actions you took.
                  A timestamped note saying &quot;2:15 am — discovered water in hallway, turned off
                  mains power and water&quot; is powerful evidence of your duty to mitigate.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Do not throw anything away:</strong> Keep all damaged items in place
                  until they have been photographed and documented. Your restoration contractor
                  will conduct a formal assessment — discarding items prematurely can undermine
                  your insurance claim.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Your Disaster Recovery contractor will provide professional-grade documentation
                including moisture readings, thermal imaging, and detailed scope of works. But
                the photos and notes you take in those first minutes establish the baseline that
                everything else builds on.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What should I do first if my house floods in the middle of the night?',
          answer:
            'Your first priority is safety. Turn off electricity at the switchboard (if safe to access), do not walk through standing water near electrical fittings, wake all household members, and evacuate if water is rising quickly or there is structural concern. Call 000 for life-threatening emergencies or the SES on 132 500 for urgent storm and flood assistance. Once safe, stop the water source if possible and submit a claim through Disaster Recovery for professional restoration.',
        },
        {
          question: 'Can I get a restoration crew dispatched at midnight in Australia?',
          answer:
            'Yes. Disaster Recovery operates a 24/7 online claim platform with IICRC-certified contractors rostered for after-hours response across Australia. Submit your claim at any hour and contractor matching begins immediately. Metropolitan areas typically see faster response times than regional locations.',
        },
        {
          question: 'Should I call the SES or a restoration company for overnight flooding?',
          answer:
            'It depends on the situation. Call the SES (132 500) for immediate hazards like storm damage, fallen trees, or rescue from rising floodwater. Call a restoration company (or submit a claim through Disaster Recovery) for water extraction, structural drying, and damage documentation. In major events, you may need both — submit your Disaster Recovery claim while waiting for SES assistance so your restorer can be matched in parallel.',
        },
        {
          question: 'How do I document flood damage at 2 am for insurance?',
          answer:
            'Use your smartphone with flash enabled. Take wide-angle photos of every affected room, close-up shots of specific damage, and video with narration describing what you see. Photograph the water source if identifiable. Use your phone notes app to record the time, observations, and actions taken. Keep all damaged items in place until professionally documented. Your Disaster Recovery contractor will supplement this with formal moisture readings and scope documentation.',
        },
        {
          question: 'Do I need to wait for my insurer before starting overnight flood cleanup?',
          answer:
            'No. Australian insurance policies generally require you to take reasonable steps to mitigate further damage — delaying extraction can worsen damage and potentially jeopardise your claim. Through Disaster Recovery, we bill you directly so work begins immediately without waiting for insurer approval. Full claims documentation is provided to support your insurance reimbursement. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Find 24-Hour Emergency Restoration',
          href: '/guides/emergency/find-24-hour-emergency-restoration',
          description: 'How to identify genuine 24/7 restoration services and avoid common traps.',
        },
        {
          title: 'How to Document Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'Step-by-step guide to building a strong evidence base for your claim.',
        },
        {
          title: 'What to Do After Flood Damage',
          href: '/guides/emergency-guides/what-to-do-after-flood-damage',
          description: 'Complete guide to the first 48 hours after a flooding event.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
