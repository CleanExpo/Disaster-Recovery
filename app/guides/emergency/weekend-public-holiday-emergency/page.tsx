import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Weekend & Public Holiday Emergency Restoration | Disaster Recovery',
  description: 'Emergency restoration on weekends and public holidays — no surcharges. IICRC certified contractors respond 24/7 across Australia. Lodge your claim online.',
  keywords: 'weekend emergency restoration, public holiday emergency restoration, after hours restoration, 24/7 disaster recovery, no surcharge emergency, Australia' };

export default function WeekendPublicHolidayEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Weekend & Public Holiday Emergency Restoration"
      subtitle="Water damage and storms do not wait for Monday morning. Our national network of IICRC certified contractors responds 24/7, 365 days a year — weekends, public holidays, and overnight — with no surcharges on the platform fee."
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Weekend & Public Holiday Emergency Restoration' },
      ]}
      sections={[
        {
          heading: 'The Problem: Most Restorers Close When You Need Them Most',
          body: (
            <>
              <p>
                The unfortunate reality of the Australian restoration industry is that many
                companies advertising &quot;24/7 emergency service&quot; actually operate on a
                Monday-to-Friday schedule. After hours, you reach a voicemail or answering
                service that promises a callback &quot;first thing Monday morning.&quot; On public
                holidays — particularly multi-day breaks like Easter, Christmas, and Australia
                Day — some companies shut down for a week or more.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This creates a dangerous gap. Water damage escalates rapidly — within 24 to
                48 hours in Australian conditions, mould can begin colonising damp materials.
                A burst pipe on Saturday night that is not addressed until Monday morning has
                already had 36+ hours of unmitigated water exposure. By that point, what might
                have been a straightforward extraction and dry has escalated into a job
                requiring demolition, mould treatment, and structural drying — tripling or
                quadrupling the restoration cost.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Storm damage is even more time-critical. A roof penetration that is not
                tarped or boarded up within hours allows ongoing water ingress with every
                subsequent rain event. Over a long weekend, multiple weather events can
                compound the damage exponentially.
              </p>
            </>
          ),
        },
        {
          heading: 'No Surcharges: Why We Do Not Charge Extra After Hours',
          body: (
            <>
              <p>
                A common concern when searching for weekend or public holiday restoration is
                the fear of inflated pricing. Some operators do charge premium rates for
                after-hours work — sometimes 50% to 100% above standard rates. This practice
                exploits property owners who have no choice about when their emergency occurs.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Through Disaster Recovery, the platform fee does not change based on the day
                or time. The initial commitment is $2,750 ($550 platform fee plus $2,200
                contractor credit for emergency make-safe works) whether you lodge your claim
                at 2 pm on a Tuesday or 3 am on Christmas Day. Our IICRC certified contractors
                are rostered specifically for after-hours and holiday response — it is part of
                the service model, not an exception that justifies a surcharge.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This consistent pricing structure means you can make the decision to call for
                help based on the urgency of the damage — not based on what day it happens to
                be. And in restoration, earlier intervention almost always means lower total
                costs.
              </p>
            </>
          ),
        },
        {
          heading: 'How Our 24/7 Network Operates',
          body: (
            <>
              <p>
                Disaster Recovery&apos;s platform is fully automated and operates around the
                clock. Here is what happens when you lodge a claim outside business hours:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Online claim submission:</strong> Visit disasterrecovery.com.au/claim
                  any time — no phone queues, no voicemail, no &quot;press 1 for emergencies.&quot;
                  Submit your damage details and photos directly through the platform.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Immediate contractor matching:</strong> The system matches you with
                  an IICRC certified contractor in your area based on location, availability,
                  and damage type. Contractors in the network are rostered for after-hours
                  coverage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No insurer approval required:</strong> We bill you directly, so work
                  begins immediately without waiting for insurer approval — critical on weekends
                  and holidays when insurance call centres are closed.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Full documentation from day one:</strong> Your contractor photographs
                  all damage, takes moisture readings, documents equipment placement, and
                  produces a written scope of works. This claims documentation supports your
                  insurance reimbursement.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                After make-safe, your NRPG contractor provides a formal contract with terms
                and conditions for the full restoration scope. No surprises, no ambiguity —
                regardless of whether it is a weekend, public holiday, or the middle of the
                night.
              </p>
            </>
          ),
        },
        {
          heading: 'Payment Options and Insurance Considerations',
          body: (
            <>
              <p>
                We bill you directly — the client, not the insurer. This is particularly
                valuable outside business hours because it eliminates the most common cause
                of delay: waiting for insurer approval. On weekends and public holidays, most
                insurance companies operate with reduced staff or close entirely. If you wait
                for your insurer to approve the work, you could be looking at days of
                additional unmitigated damage.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Most Australian home and contents policies include a &quot;duty to mitigate&quot;
                clause — you are required to take reasonable steps to prevent further damage.
                This means arranging emergency make-safe works is not only sensible, it is
                often a requirement of your policy. Your contractor provides full claims
                documentation to support your reimbursement.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If managing the upfront cost is a concern, payment plans are available
                through{' '}
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
          question: 'Does Disaster Recovery charge extra for weekend or public holiday callouts?',
          answer:
            'No. The platform fee does not change based on the day or time. The initial commitment is $2,750 ($550 platform fee plus $2,200 contractor credit for make-safe works) whether you lodge your claim on a weekday, weekend, or public holiday. There are no after-hours surcharges.',
        },
        {
          question: 'Can I really get a contractor on a Sunday or public holiday?',
          answer:
            'Yes. Disaster Recovery operates a national network of IICRC certified contractors who are rostered specifically for after-hours, weekend, and public holiday response. Lodge your claim online at disasterrecovery.com.au/claim and contractor matching begins immediately — no phone queues or voicemail.',
        },
        {
          question: 'Should I wait until Monday to call about water damage that happened over the weekend?',
          answer:
            'No — waiting until Monday can significantly increase damage and costs. Water damage escalates rapidly. Within 24 to 48 hours, mould can begin growing on damp organic materials. A burst pipe on Saturday night that is not addressed until Monday morning has had 36+ hours of unmitigated water exposure, potentially tripling the restoration scope.',
        },
        {
          question: 'Do I need my insurer\'s approval before starting emergency work on a weekend?',
          answer:
            'No. Most Australian home insurance policies require you to take reasonable steps to mitigate further damage (duty to mitigate). Through Disaster Recovery, we bill you directly so work begins immediately without waiting for insurer approval. Full claims documentation is provided to support your reimbursement.',
        },
        {
          question: 'What payment options are available for emergency weekend restoration?',
          answer:
            'The initial commitment is $2,750, which covers the platform fee and make-safe contractor credit. After make-safe, your contractor provides a formal contract with terms and conditions for the full scope. Payment plans are available through Blue Fire Finance to help manage costs while awaiting your insurance outcome.',
        },
      ]}
      relatedGuides={[
        {
          title: '24 Hour Emergency Restoration Services Near You',
          href: '/guides/emergency/find-24-hour-emergency-restoration',
          description: 'Finding genuine 24/7 emergency restorers — what to look for and red flags to avoid.',
        },
        {
          title: 'Christmas Day Water Damage Emergency Services',
          href: '/guides/emergency/christmas-emergency-water-damage',
          description: 'Emergency water damage restoration available on Christmas Day across Australia.',
        },
        {
          title: 'Middle of the Night Flooding Emergency',
          href: '/guides/emergency/middle-night-flooding-emergency',
          description: 'What to do when flooding strikes overnight and how to get immediate help.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
