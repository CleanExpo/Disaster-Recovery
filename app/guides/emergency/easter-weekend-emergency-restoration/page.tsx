import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Easter Long Weekend Emergency Restoration | Disaster Recovery',
  description: 'Storm or water damage over Easter? IICRC certified contractors respond all 4 days — no surcharges. Lodge your claim online for immediate matching.',
  keywords: 'easter long weekend emergency restoration, easter storm damage, public holiday emergency restoration, easter water damage, Australia, IICRC certified' };

export default function EasterWeekendEmergencyRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Easter Long Weekend Emergency Restoration"
      subtitle="The Easter long weekend is one of Australia's highest-risk periods for storm and water damage. Four consecutive days without normal services, combined with late-season severe weather across QLD and NSW, make Easter a prime time for property emergencies."
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Easter Long Weekend Emergency Restoration' },
      ]}
      sections={[
        {
          heading: 'Why Easter Is a High-Risk Period for Property Damage',
          body: (
            <>
              <p>
                Easter falls in late March or April — right at the tail end of Australia&apos;s
                severe weather season. The Bureau of Meteorology data consistently shows that
                Queensland and northern New South Wales experience significant storm activity
                through March and April, including supercell thunderstorms, heavy rainfall
                events, and occasionally the remnants of late-season tropical cyclones. The
                2024 Easter weekend saw severe thunderstorm warnings across south-east
                Queensland and the northern rivers region of NSW.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The four-day weekend compounds the risk. From Good Friday through Easter
                Monday, most businesses — including many restoration companies — shut down
                entirely. A roof leak that starts on Good Friday evening can cause four full
                days of water ingress before anyone responds on Tuesday. In that time, carpet
                underlay saturates, plasterboard wicks moisture upward, and mould colonies
                begin establishing on damp organic materials within 24 to 48 hours.
                Properties left unattended while families travel for the holiday face the
                worst outcomes.
              </p>
            </>
          ),
        },
        {
          heading: 'Easter Storm Damage: What to Expect in QLD and NSW',
          body: (
            <>
              <p>
                Late-season storms in Queensland and northern NSW tend to bring large hail,
                destructive wind gusts, and flash flooding — a triple threat for property
                damage. Common Easter weekend damage scenarios include:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Roof penetration from hail or wind:</strong> Damaged roof tiles,
                  lifted sheeting, and broken skylights allow continuous water ingress during
                  prolonged rainfall. Without emergency board-up and tarping, a single missing
                  tile can cause thousands of dollars in interior water damage over four days.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Flash flooding and overland flow:</strong> Intense short-duration
                  rainfall overwhelms stormwater systems, sending floodwater through ground-floor
                  properties. Category 3 (grossly contaminated) floodwater requires professional
                  extraction and antimicrobial treatment — never attempt to clean this yourself.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Wind-driven rain ingress:</strong> Even without direct roof damage,
                  severe wind can force rain through window seals, wall junctions, and roof
                  ventilation openings. This type of hidden moisture intrusion often goes
                  undetected until mould appears weeks later.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Fallen trees and structural impact:</strong> Large limbs or entire
                  trees brought down by wind gusts can penetrate roofs, damage walls, and
                  create openings that allow ongoing weather exposure. Emergency make-safe
                  and tarping are critical.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How to Get Emergency Restoration Over the Easter Long Weekend',
          body: (
            <>
              <p>
                Disaster Recovery operates every day of the year — Good Friday, Easter Saturday,
                Easter Sunday, and Easter Monday included. Our online claim platform does not
                close for public holidays. Here is how to get help when most other services are
                unavailable:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge your claim online:</strong> Visit disasterrecovery.com.au/claim
                  and submit your damage details with photos. The system matches you with an
                  IICRC certified contractor in your area — including during public holidays.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Contractor matching continues 24/7:</strong> Our national network of
                  contractors includes professionals rostered specifically for holiday period
                  response. You are not waiting for someone to check their emails on Tuesday.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Work begins immediately:</strong> We bill you directly, so there is
                  no delay waiting for insurer approval — especially important over Easter when
                  insurance call centres run skeleton staff or close entirely.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                After make-safe, your NRPG contractor provides a formal contract with terms and
                conditions for the full restoration scope. Full claims documentation is provided
                to support your insurance reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'Costs and Payment Options Over Easter',
          body: (
            <>
              <p>
                Through Disaster Recovery, there are no public holiday surcharges on the
                platform fee. The initial commitment is $2,750 ($550 platform fee plus $2,200
                contractor credit for make-safe works), the same price regardless of the day
                of the week or public holiday status.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly — the client, not the insurer. This is a significant
                advantage over Easter because it means your restoration is not held up by
                insurer availability. You control the process, your contractor starts work
                immediately, and full claims documentation is assembled for your insurer once
                they reopen after the break.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If managing the upfront cost over a long weekend is a concern, payment plans
                are available through{' '}
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
          question: 'Can I get emergency restoration on Good Friday or Easter Monday?',
          answer:
            'Yes. Disaster Recovery operates every day of the year, including all Easter public holidays. Lodge your claim online at disasterrecovery.com.au/claim and you will be matched with an IICRC certified contractor in your area. There are no public holiday surcharges on the platform fee.',
        },
        {
          question: 'Why is the Easter long weekend a high-risk period for property damage?',
          answer:
            'Easter falls during late-season severe weather in QLD and NSW, with storms, heavy rainfall, and hail common in March and April. The four-day weekend means damage that occurs on Good Friday may go unaddressed until Tuesday if you cannot find a 24/7 service — allowing water damage, mould growth, and secondary deterioration to escalate significantly.',
        },
        {
          question: 'Do I need to wait for my insurer to approve restoration over Easter?',
          answer:
            'No. Most insurance call centres run skeleton staff or close entirely over the Easter long weekend. Through Disaster Recovery, we bill you directly so work begins immediately without waiting for insurer approval. Full claims documentation is provided to support your reimbursement once your insurer is available.',
        },
        {
          question: 'What types of storm damage are common over Easter in Australia?',
          answer:
            'Common Easter storm damage includes roof penetration from hail or wind, flash flooding and overland flow, wind-driven rain ingress through seals and junctions, and structural damage from fallen trees. Late-season supercell thunderstorms in Queensland and northern NSW are the primary driver of Easter weekend property damage.',
        },
        {
          question: 'How much does Easter weekend emergency restoration cost?',
          answer:
            'The initial commitment through Disaster Recovery is $2,750 ($550 platform fee plus $2,200 contractor credit for make-safe works) with no public holiday surcharges. After make-safe, your contractor provides a formal contract with terms and conditions for the full scope. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Emergency Board Up and Storm Damage Services',
          href: '/guides/emergency/emergency-board-up-storm-damage',
          description: 'How emergency board-up and tarping protects your property after storm damage.',
        },
        {
          title: 'Weekend & Public Holiday Emergency Restoration',
          href: '/guides/emergency/weekend-public-holiday-emergency',
          description: 'Accessing emergency restoration services on weekends and public holidays across Australia.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description: 'How waiting for insurer approval causes secondary damage and escalating costs.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
