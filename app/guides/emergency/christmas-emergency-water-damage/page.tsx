import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Christmas Day Water Damage Emergency Services',
  description: 'Water damage over Christmas? Our IICRC certified contractors respond on Dec 25 — no surcharges. Lodge your claim online for 60-minute emergency matching.',
  keywords: 'christmas day water damage emergency, christmas plumbing emergency, water damage december, holiday water damage restoration, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/emergency/christmas-emergency-water-damage' },
};

export default function ChristmasEmergencyWaterDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Christmas Day Water Damage Emergency Services"
      subtitle="Christmas gatherings put extraordinary strain on household plumbing. When a pipe bursts or a dishwasher overflows on December 25, our IICRC certified contractors are standing by — no holiday surcharges, no voicemail."
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Christmas Day Water Damage Emergency Services' },
      ]}
      sections={[
        {
          heading: 'Why Christmas Is a Peak Period for Water Damage',
          body: (
            <>
              <p>
                Australian homes face a perfect storm of water damage risk during the Christmas
                period. Family gatherings mean more showers, more dishwasher cycles, more laundry
                loads, and more toilet flushes than your plumbing handles on an average day. In
                many homes — particularly older properties with galvanised or copper piping — this
                surge in demand can push ageing infrastructure past its limits. Burst pipes,
                overflowing dishwashers, and failed washing machine hoses are all significantly
                more common over the holiday period.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Summer heat compounds the problem. In Queensland, New South Wales, and Victoria,
                December temperatures regularly exceed 35°C, causing thermal expansion in copper
                pipes and increased pressure on hot water systems. Air conditioning units running
                at full capacity can produce condensation overflows that go unnoticed while the
                household is focused on celebrations. Meanwhile, many properties sit empty as
                owners travel for the holidays — a slow leak that starts on December 23 can
                become a catastrophic flood by the time the owner returns on December 28.
              </p>
            </>
          ),
        },
        {
          heading: 'Getting Emergency Help on December 25',
          body: (
            <>
              <p>
                The biggest challenge with Christmas Day water damage is not the damage itself —
                it is finding a qualified professional who will actually respond. Most restoration
                companies shut down entirely from December 24 through to January 2. Plumbers may
                answer emergency calls, but a plumber stops the water — they do not extract it,
                set up structural drying equipment, or prevent the mould growth that begins
                within 24 to 48 hours.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Disaster Recovery operates 365 days a year, including Christmas Day. Our
                online claim platform accepts submissions around the clock — no phone queues,
                no answering services, no &quot;we will call you back after the break.&quot; Submit your
                claim with photos of the damage, and the system matches you with an IICRC
                certified contractor in your area immediately. Work begins without waiting for
                insurer approval because we bill you directly. Your contractor provides full
                claims documentation — photos, moisture reports, scope of works — so your
                insurer has everything they need to process your reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'Immediate Steps While Waiting for Your Contractor',
          body: (
            <>
              <p>
                While your matched contractor is en route, there are critical steps you can
                take to limit the damage:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Turn off the water mains:</strong> If the leak is from a burst pipe or
                  failed fitting, shutting off the mains stops additional water entering your
                  property. Know where your mains tap is before an emergency — it is usually
                  near the front boundary of your property.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Switch off electricity in affected areas:</strong> Water and
                  electricity are a lethal combination. If water is near electrical outlets,
                  switch off the relevant circuit at your switchboard. Do not walk through
                  standing water to reach the switchboard — call your electricity provider if
                  you cannot safely access it.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Move valuables to dry areas:</strong> Furniture, electronics, documents,
                  and sentimental items should be moved away from standing water immediately.
                  Place aluminium foil under furniture legs to prevent staining on wet carpet.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photograph everything:</strong> Before moving anything or mopping up,
                  take extensive photos and video of all affected areas. This documentation is
                  essential for your insurance claim and helps your contractor assess the full
                  scope of damage on arrival.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Costs, Billing, and Insurance Over the Christmas Period',
          body: (
            <>
              <p>
                One of the most common fears during a Christmas emergency is that costs will
                be inflated due to the public holiday. Through Disaster Recovery, there are no
                holiday surcharges on the platform fee. The initial commitment remains $2,750
                ($550 platform fee plus $2,200 contractor credit for make-safe works),
                regardless of whether it is December 25 or a regular Tuesday.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly — the client, not the insurer. This means work begins
                immediately without waiting for insurer approval, which is especially important
                over Christmas when insurer call centres are often closed or running skeleton
                staff. After make-safe, your NRPG contractor provides a formal contract with
                terms and conditions for the full restoration scope. Full claims documentation
                is provided to support your insurance reimbursement once your insurer is back
                to normal operations in January.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If managing the upfront cost over the holiday period is a concern, payment
                plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help you spread costs while awaiting your insurance outcome.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can I get emergency water damage restoration on Christmas Day in Australia?',
          answer:
            'Yes. Disaster Recovery operates 365 days a year, including Christmas Day. Submit your claim online at disasterrecovery.com.au/claim and you will be matched with an IICRC certified contractor in your area. There are no holiday surcharges on the platform fee.',
        },
        {
          question: 'Why is water damage more common over the Christmas period?',
          answer:
            'Christmas gatherings put extra strain on household plumbing — more showers, dishwasher cycles, and laundry loads. Summer heat causes thermal expansion in pipes. Many homes also sit empty while owners travel, allowing small leaks to become major floods before anyone notices.',
        },
        {
          question: 'Do I need to wait for my insurer before starting emergency restoration over Christmas?',
          answer:
            'No. Most insurance policies require you to take reasonable steps to mitigate further damage (your duty to mitigate). Through Disaster Recovery, we bill you directly so work begins immediately without waiting for insurer approval. Full claims documentation is provided to support your reimbursement.',
        },
        {
          question: 'How much does Christmas Day emergency water damage restoration cost?',
          answer:
            'The initial commitment through Disaster Recovery is $2,750 ($550 platform fee plus $2,200 contractor credit for make-safe works) — the same price year-round with no holiday surcharges. After make-safe, your contractor provides a formal contract with terms and conditions. Payment plans are available through Blue Fire Finance.',
        },
        {
          question: 'What should I do immediately if I discover water damage on Christmas Day?',
          answer:
            'Turn off the water mains to stop the source, switch off electricity in affected areas if safe to do so, move valuables to dry areas, and photograph all damage for insurance purposes. Then lodge your claim at disasterrecovery.com.au/claim for immediate contractor matching — available 24/7 including Christmas Day.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Weekend & Public Holiday Emergency Restoration',
          href: '/guides/emergency/weekend-public-holiday-emergency',
          description: 'How to access emergency restoration services outside of business hours, including public holidays.',
        },
        {
          title: '24 Hour Emergency Restoration Services Near You',
          href: '/guides/emergency/find-24-hour-emergency-restoration',
          description: 'Finding genuine 24/7 emergency restorers — what to look for and what to avoid.',
        },
        {
          title: 'How to Document Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'Ensure your insurance claim is supported with proper evidence from day one.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
