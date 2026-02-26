import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '24 Hour Emergency Restoration Services Near You | Disaster Recovery',
  description: 'Expert answers and solutions for "where to find 24 hour emergency restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'where to find 24 hour emergency restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function Find24HourEmergencyRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="24 Hour Emergency Restoration Services Near You"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: '24 Hour Emergency Restoration Services Near You' },
      ]}
      sections={[
        {
          heading: 'Why 24/7 Availability Matters in Disaster Recovery',
          body: (
            <>
              <p>
                Water damage does not wait for business hours. When a pipe bursts at 11 pm on a
                Saturday night, the clock starts ticking immediately. Within the first hour,
                water wicks into plasterboard, carpet underlay saturates, and timber subfloors
                begin to swell. By hour six, bacterial contamination in Category 2 and 3 water
                begins multiplying. Within 24 to 48 hours, mould colonies can establish on damp
                organic materials — and once mould takes hold, your restoration costs can
                double or triple.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This is why genuine 24-hour emergency restoration is not a luxury — it is a
                necessity. Every hour of delay between the incident and professional extraction
                increases the total scope of works, extends drying timelines, and raises the
                likelihood of secondary damage like mould, delamination, and structural
                compromise. A restorer who answers the phone at 2 am and has crews ready to
                deploy is fundamentally different from one who takes your message and calls back
                on Monday morning.
              </p>
            </>
          ),
        },
        {
          heading: 'Red Flags When Searching for Emergency Restorers',
          body: (
            <>
              <p>
                Not every company advertising &quot;24/7 emergency service&quot; actually delivers it.
                When you are searching online at midnight in a crisis, watch for these warning signs:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Bait pricing:</strong> Suspiciously low quoted rates that balloon once
                  the crew arrives. Any legitimate restorer will explain the pricing structure
                  before dispatching — not spring surprise charges on a distressed homeowner at
                  3 am.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No certifications mentioned:</strong> If a company cannot tell you
                  whether their technicians hold IICRC certification (the international standard
                  for restoration professionals), that is a significant concern. Uncertified
                  operators may use incorrect drying methods that cause more damage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Voicemail or answering service only:</strong> A genuine after-hours
                  service has real people answering calls or — in Disaster Recovery&apos;s case — an
                  online claim platform that dispatches contractors immediately. If you get a
                  generic voicemail promising a callback &quot;during business hours,&quot; keep looking.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No documented make-safe process:</strong> Professional restorers follow
                  a structured make-safe protocol with photos, moisture readings, and written
                  scope. Operators who rush in without documenting anything can leave you exposed
                  when your insurer asks for evidence of the initial damage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Pressure to sign immediately:</strong> Legitimate contractors will
                  stabilise your property first, then provide a formal contract with clear terms
                  and conditions. Anyone pressuring you to sign a full restoration contract at
                  2 am before even assessing the damage should be treated with caution.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What to Look for in a Genuine Emergency Restorer',
          body: (
            <>
              <p>
                When evaluating emergency restoration companies — whether you are pre-researching
                before an incident or searching urgently mid-crisis — these are the markers of a
                trustworthy operator:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>IICRC certification:</strong> The Institute of Inspection, Cleaning and
                  Restoration Certification sets the global standard. IICRC-certified technicians
                  are trained in water damage restoration (WRT), applied structural drying (ASD),
                  and fire and smoke restoration. This is not optional — it is the baseline for
                  professional work.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Genuine after-hours response:</strong> Ask directly: &quot;If I call at
                  midnight, will a crew be dispatched tonight or tomorrow?&quot; The answer tells you
                  everything. True 24/7 operators have on-call crews rostered specifically for
                  out-of-hours response.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Documented make-safe process:</strong> A professional make-safe includes
                  photographic evidence, moisture mapping, equipment placement records, and a
                  written assessment. This documentation is essential for your insurance claim and
                  protects both you and the contractor.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Transparent pricing structure:</strong> You should understand what you
                  will be paying before work begins. Through Disaster Recovery, the initial
                  commitment is $2,750 ($550 platform fee plus $2,200 contractor credit for
                  make-safe works). After make-safe, your contractor provides a formal contract
                  with terms and conditions for the full restoration scope.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Australia-wide coverage:</strong> Disasters happen everywhere — from
                  inner-city apartments to regional properties. A network with national reach
                  ensures you are not left stranded because the nearest certified restorer is
                  three hours away.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What to Expect When You Call for Emergency Restoration',
          body: (
            <>
              <p>
                Understanding the typical emergency response timeline helps set realistic
                expectations and reduces anxiety during an already stressful event.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>0–1 hours — Claim submission and contractor matching:</strong> You
                  submit your claim through the Disaster Recovery platform (online, 24/7). The
                  system matches you with an IICRC-certified contractor in your area based on
                  location, availability, and the type of damage reported.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>1–4 hours — Contractor dispatch and arrival:</strong> Your matched
                  contractor is notified and dispatched. Metropolitan response times are typically
                  faster than regional areas. The contractor will contact you to confirm arrival
                  time and access details.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>4–8 hours — Emergency make-safe:</strong> On arrival, the crew performs
                  water extraction, deploys drying equipment (air movers and dehumidifiers), takes
                  initial moisture readings, applies antimicrobial treatment if needed, and begins
                  comprehensive documentation.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>24–48 hours — Monitoring and assessment:</strong> The contractor returns
                  to check moisture levels, adjust equipment placement, and finalise the damage
                  assessment. After make-safe, they provide a formal contract with full terms and
                  conditions for the remaining restoration works.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly, so work begins immediately without waiting for insurer
                approval. Full claims documentation is provided — photos, moisture reports, and
                scope of works — giving your insurer everything they need to process your
                reimbursement. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help manage costs while you await your insurance outcome.
              </p>
            </>
          ),
        },
        {
          heading: 'How Disaster Recovery\'s 24/7 Network Operates',
          body: (
            <>
              <p>
                Disaster Recovery operates a national network of IICRC-certified restoration
                contractors available around the clock, every day of the year — including
                weekends and public holidays. Here is how the system works:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Online claim platform:</strong> Our platform accepts claims 24/7 with no
                  phone queues or voicemail. Submit your details, upload photos if available, and
                  the system begins matching immediately.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>National contractor network:</strong> Contractors across metropolitan,
                  regional, and remote Australia are rostered for after-hours response. From Sydney
                  CBD to regional Queensland, the network covers all disaster types — water, fire,
                  storm, mould, biohazard, and more.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Transparent billing:</strong> We bill you directly — the client, not your
                  insurer. This means work starts immediately without scope disputes or approval
                  delays. You control the process and your contractor provides full claims
                  documentation to support your insurance reimbursement.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Payment flexibility:</strong> The initial $2,750 commitment covers
                  platform access and emergency make-safe. Payment plans through{' '}
                  <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                    Blue Fire Finance
                  </a>{' '}
                  are available for those who need to spread costs while awaiting insurance
                  reimbursement.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Formal contract after make-safe:</strong> Once the emergency is stabilised,
                  your NRPG contractor provides a formal contract with clear terms and conditions
                  for the full restoration scope. No surprises, no ambiguity.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How do I find a genuine 24-hour emergency restoration service in Australia?',
          answer:
            'Look for companies with IICRC-certified technicians, genuine after-hours crews (not just a voicemail), documented make-safe processes, and transparent pricing. Disaster Recovery operates a national 24/7 platform that matches you with certified contractors — submit a claim online any time of day or night and contractor matching begins immediately.',
        },
        {
          question: 'Why is it important to start water extraction within the first few hours?',
          answer:
            'Water damage escalates rapidly. Within hours, plasterboard absorbs moisture and carpet underlay saturates. Within 24 to 48 hours, mould can begin growing on damp organic materials. Every hour of delay increases restoration costs and extends drying timelines. Starting extraction within 6 hours and having drying equipment running within 24 hours significantly reduces total damage.',
        },
        {
          question: 'Do I need to wait for my insurer before calling a restorer?',
          answer:
            'No. Most Australian insurance policies require you to take reasonable steps to mitigate further damage — this is your duty to mitigate. Delaying make-safe works while waiting for insurer approval can actually jeopardise your claim. Through Disaster Recovery, we bill you directly so work begins immediately. Full claims documentation is provided to support your insurance reimbursement.',
        },
        {
          question: 'What does emergency make-safe cost through Disaster Recovery?',
          answer:
            'The initial commitment through the Disaster Recovery platform is $2,750, comprising a $550 platform fee (covering claim lodgement, contractor matching, documentation, and support) and $2,200 in contractor credit applied to your emergency make-safe works. After make-safe, your contractor provides a formal contract with terms and conditions for the full restoration scope. Payment plans are available through Blue Fire Finance.',
        },
        {
          question: 'What areas does Disaster Recovery cover for emergency restoration?',
          answer:
            'Disaster Recovery operates a national network covering all Australian capital cities, regional centres, and many remote areas. Our IICRC-certified contractors handle all disaster types including water damage, fire damage, storm damage, mould remediation, biohazard, and more. Response times vary by location — metropolitan areas typically have faster response than remote regions.',
        },
      ]}
      relatedGuides={[
        {
          title: 'What to Do After Flood Damage',
          href: '/guides/emergency-guides/what-to-do-after-flood-damage',
          description: 'Step-by-step guide to protecting your property immediately after flooding.',
        },
        {
          title: 'Who to Call for Water Damage Emergency',
          href: '/guides/emergency-guides/who-to-call-water-damage-emergency',
          description: 'The recommended order for contacting emergency services, plumbers, and restorers.',
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
