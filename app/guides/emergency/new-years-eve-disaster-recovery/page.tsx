import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "New Year's Eve Disaster Recovery Services | Disaster Recovery",
  description: "Fire or water damage on New Year's Eve? IICRC certified contractors respond overnight — no surcharges. Lodge your claim online for immediate matching.",
  keywords: "new years eve disaster recovery, new years eve fire damage, firework damage property, new years water damage, overnight emergency restoration, Australia" };

export default function NewYearsEveDisasterRecoveryPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="New Year's Eve Disaster Recovery Services"
      subtitle="New Year's Eve celebrations bring unique risks — firework-related fires, party-related water damage, and overnight incidents when most services are closed. Our IICRC certified contractors respond through the night, no surcharges."
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: "New Year's Eve Disaster Recovery" },
      ]}
      sections={[
        {
          heading: "Why New Year's Eve Is a High-Risk Night for Property Damage",
          body: (
            <>
              <p>
                New Year&apos;s Eve combines several risk factors that make property damage
                incidents disproportionately common. Fireworks — both professional displays
                and illegal private use — are the most obvious threat. Embers and debris
                from fireworks can land on dry roofs, in gutters packed with leaf litter, or
                on timber decks and outdoor furniture. In drought-affected areas, a single
                stray ember can start a structure fire within minutes.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Party-related water damage is equally common but less discussed. Overflowing
                bathtubs, blocked drains from food waste, overwhelmed plumbing from dozens of
                guests, and accidental damage to taps and fixtures all contribute to water
                damage incidents that are discovered in the early hours of January 1 — often
                after significant saturation has already occurred. Alcohol-related accidents,
                including knocked-over candles, unattended cooking, and cigarette burns, add
                fire risk to the equation.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The timing compounds the problem. Damage that occurs at midnight or later
                means the property sits in a compromised state through the night. By the time
                the occupant sobers up, wakes up, or returns home on January 1, hours of
                unmitigated water ingress or smoke exposure have already escalated what might
                have been a minor incident into a major restoration job.
              </p>
            </>
          ),
        },
        {
          heading: 'Common New Year\'s Eve Damage Scenarios',
          body: (
            <>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Firework-related fires:</strong> Embers landing on roofs, balconies,
                  and outdoor areas. Even &quot;safe&quot; sparklers can ignite dry mulch, timber
                  decking, and outdoor furnishings. Fire damage restoration requires
                  professional soot removal, smoke deodorisation, and structural assessment.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Kitchen fires from unattended cooking:</strong> Late-night cooking
                  accidents spike on New Year&apos;s Eve. Grease fires, oven fires, and
                  stovetop incidents are the most common. Never use water on a grease fire —
                  smother it with a lid or use a fire blanket, then evacuate and call 000.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Overflowing fixtures and blocked drains:</strong> High usage during
                  parties leads to blocked toilets, overflowing bathtubs, and backed-up kitchen
                  sinks. Category 2 or Category 3 water (contaminated) requires professional
                  extraction and antimicrobial treatment — not a mop and bucket.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Burst pipes from extreme heat:</strong> January 1 often falls on one
                  of the hottest days of the Australian summer. Thermal expansion combined with
                  high water demand can burst ageing pipes — particularly in older homes with
                  copper or galvanised plumbing.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Accidental structural damage:</strong> Rowdy celebrations occasionally
                  result in broken windows, damaged walls, and compromised glass doors — creating
                  security and weather exposure issues that require emergency board-up.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Overnight Emergency Response: How It Works',
          body: (
            <>
              <p>
                Disaster Recovery&apos;s online platform operates 24 hours a day, 365 days a
                year — including New Year&apos;s Eve and New Year&apos;s Day. If you discover
                damage at 1 am on January 1, here is what happens:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge your claim immediately:</strong> Visit disasterrecovery.com.au/claim
                  and submit your damage details with photos. The system begins contractor
                  matching straight away — no waiting for business hours.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Contractor dispatched overnight:</strong> Our national network includes
                  contractors rostered for overnight and public holiday response. Metropolitan
                  areas typically have faster response times than regional locations.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Emergency make-safe performed:</strong> Your contractor performs
                  water extraction, fire board-up, smoke ventilation, or whatever emergency
                  stabilisation is required. Equipment is deployed and documentation begins
                  immediately.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Full assessment follows:</strong> Once the property is stabilised,
                  your contractor provides a formal contract with terms and conditions for
                  the complete restoration scope.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly, so work begins immediately without waiting for insurer
                approval. Full claims documentation is provided — photos, moisture or smoke
                damage reports, and scope of works — giving your insurer everything they need
                to process your reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'Costs and Payment Over the New Year Period',
          body: (
            <>
              <p>
                There are no holiday surcharges through the Disaster Recovery platform. The
                initial commitment is $2,750 ($550 platform fee plus $2,200 contractor credit
                for emergency make-safe works), whether you lodge your claim at midnight on
                December 31 or midday on a regular Wednesday.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly — the client, not the insurer. This is particularly
                valuable over the New Year period when insurance companies are running reduced
                staff and claims processing slows significantly. You control the process, your
                contractor begins work immediately, and full claims documentation is assembled
                for your insurer at their convenience.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help manage costs while awaiting your insurance outcome.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: "Can I get emergency restoration on New Year's Eve or New Year's Day?",
          answer:
            "Yes. Disaster Recovery operates 24/7, 365 days a year, including New Year's Eve and New Year's Day. Lodge your claim online at disasterrecovery.com.au/claim and contractor matching begins immediately — even at midnight. There are no holiday surcharges on the platform fee.",
        },
        {
          question: "What are the most common types of property damage on New Year's Eve?",
          answer:
            "The most common incidents are firework-related fires (embers on roofs, decks, and dry vegetation), kitchen fires from unattended cooking, water damage from overflowing fixtures and blocked drains during parties, burst pipes from summer heat, and accidental structural damage during celebrations.",
        },
        {
          question: 'What should I do if fireworks cause a fire on my property?',
          answer:
            'Evacuate everyone immediately and call 000. Do not re-enter the property until the fire service clears it. Once safe, photograph all damage and lodge your claim at disasterrecovery.com.au/claim for IICRC certified fire damage restoration — available overnight on New Year\'s Eve.',
        },
        {
          question: "Do I need insurer approval before starting restoration on New Year's Day?",
          answer:
            "No. Most insurers run skeleton staff over the New Year period. Through Disaster Recovery, we bill you directly so work begins immediately without waiting for insurer approval. Full claims documentation is provided to support your insurance reimbursement once your insurer is back to normal operations.",
        },
        {
          question: "How much does New Year's Eve emergency restoration cost?",
          answer:
            'The initial commitment is $2,750 ($550 platform fee plus $2,200 contractor credit for make-safe works) with no holiday surcharges. After make-safe, your contractor provides a formal contract with terms and conditions for the full restoration scope. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Christmas Day Water Damage Emergency Services',
          href: '/guides/emergency/christmas-emergency-water-damage',
          description: 'Emergency water damage restoration available on Christmas Day across Australia.',
        },
        {
          title: '24 Hour Emergency Restoration Services Near You',
          href: '/guides/emergency/find-24-hour-emergency-restoration',
          description: 'Finding genuine 24/7 emergency restorers — what to look for and what to avoid.',
        },
        {
          title: 'Smoke Damage Cleaning Guide',
          href: '/guides/fire-damage/smoke-damage-cleaning-guide',
          description: 'Professional smoke and soot removal after fire damage — what to expect.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
