import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'When to Call Professional Disaster Restoration Services | Disaster Recovery',
  description: 'Know when to call a professional restorer vs DIY. Damage thresholds, time-critical scenarios, and decision criteria for Australian property owners.',
  keywords: 'when to call disaster restoration, DIY vs professional restoration, water damage threshold, when to call restorer, restoration decision guide, Australia' };

export default function WhenToCallDisasterRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Guides"
      title="When to Call Professional Disaster Restoration Services"
      subtitle="Not every water leak requires a professional restoration crew — but the consequences of misjudging that threshold can be severe. This guide explains when DIY is appropriate and when you need IICRC certified professionals."
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Guides', href: '/guides/guides' },
        { label: 'When to Call Professional Disaster Restoration ...' },
      ]}
      sections={[
        {
          heading: 'The DIY Threshold: What You Can Handle Yourself',
          body: (
            <>
              <p>
                Small-scale water incidents that are caught immediately can often be handled
                without professional intervention. If you meet all of the following criteria,
                DIY cleanup may be appropriate:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Clean water only (Category 1):</strong> The water is from a clean
                  source — a supply line, tap, or drinking water pipe. Not grey water from
                  dishwashers or washing machines, and definitely not sewage or floodwater.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Affected area under 2 square metres:</strong> A small spill confined
                  to a single room, on hard flooring, with no carpet or underlay involved.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Caught within 1 hour:</strong> You discovered the water immediately
                  and stopped the source. No time for absorption into walls, subfloor, or
                  cabinetry.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No wall or ceiling involvement:</strong> Water has not wicked up
                  plasterboard, reached inside wall cavities, or dripped through the ceiling
                  from an upper level.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If any of these conditions are not met, the risk of hidden moisture, structural
                damage, and mould growth increases significantly — and professional intervention
                is the safer choice.
              </p>
            </>
          ),
        },
        {
          heading: 'When You Definitely Need a Professional Restorer',
          body: (
            <>
              <p>
                Certain scenarios always require professional disaster restoration, regardless
                of the apparent severity. If any of the following apply, call a professional
                immediately:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Any fire or smoke damage:</strong> Even a small kitchen fire produces
                  soot and smoke residue that infiltrates HVAC systems, fabrics, and porous
                  surfaces. Without professional soot removal and deodorisation, smoke odour
                  and discolouration will persist indefinitely. Structural integrity must also
                  be assessed after any fire.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Category 2 or 3 water:</strong> Grey water (dishwashers, washing
                  machines, aquarium water) or black water (sewage, floodwater, ground seepage)
                  requires professional extraction, antimicrobial treatment, and potentially
                  demolition of affected materials. Never attempt to clean contaminated water
                  without proper PPE and training.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Water affecting multiple rooms or levels:</strong> Once water crosses
                  room boundaries or moves between floors, the drying challenge becomes
                  exponentially more complex. Hidden moisture in wall cavities, subfloors, and
                  ceiling spaces requires commercial-grade dehumidifiers, air movers, and daily
                  moisture monitoring.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Visible mould of any size:</strong> Visible mould indicates an
                  established colony, which typically means the problem is larger than what you
                  can see. Mould inside wall cavities, under flooring, or in HVAC ductwork
                  requires IICRC S520 protocol remediation.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Storm or structural damage:</strong> Damaged roofs, broken windows,
                  fallen trees, and compromised walls need emergency make-safe and tarping
                  before any restoration can begin. This is specialist work requiring proper
                  equipment and safety training.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Time-Critical Scenarios: When Every Hour Counts',
          body: (
            <>
              <p>
                In disaster restoration, time is your most valuable resource — and your most
                dangerous enemy. Certain scenarios have narrow windows where early intervention
                dramatically reduces costs and damage severity:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>0–6 hours:</strong> Water extraction should begin within this window
                  for the best outcomes. Carpet underlay begins saturating, plasterboard starts
                  wicking moisture, and timber subfloors absorb water. Professional extraction
                  within the first 6 hours can save flooring, walls, and cabinetry.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>6–24 hours:</strong> Structural drying equipment (dehumidifiers and
                  air movers) should be running within 24 hours. Without it, materials continue
                  absorbing moisture and the drying timeline extends significantly.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>24–48 hours:</strong> Mould can begin establishing on damp organic
                  materials in Australian conditions (high humidity, warm temperatures). Once
                  mould is present, the scope of works expands to include remediation — a
                  significantly more expensive process than drying alone.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>48–72 hours:</strong> Secondary damage accelerates — swelling in
                  timber, delamination of engineered flooring, corrosion in metal fixtures,
                  and electrical hazards from prolonged moisture exposure. Costs can double
                  or triple compared to same-day intervention.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This is why Disaster Recovery exists as a 24/7 platform. We bill you directly
                so work begins immediately without waiting for insurer approval. Every hour
                saved in the response window translates directly to lower restoration costs
                and better outcomes.
              </p>
            </>
          ),
        },
        {
          heading: 'How to Get Professional Help Fast',
          body: (
            <>
              <p>
                When you have determined that professional restoration is needed, here is how
                to get help through Disaster Recovery:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge your claim online:</strong> Visit disasterrecovery.com.au/claim
                  and submit your damage details with photos. The platform operates 24/7 — no
                  phone queues, no voicemail.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Instant contractor matching:</strong> You are matched with an IICRC
                  certified contractor in your area based on location, availability, and
                  damage type.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Emergency make-safe:</strong> Your contractor performs extraction,
                  drying setup, board-up, or whatever stabilisation is required. Full
                  documentation begins immediately.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Formal contract after stabilisation:</strong> After make-safe, your
                  NRPG contractor provides a formal contract with terms and conditions for the
                  full restoration scope.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The initial commitment is $2,750 ($550 platform fee plus $2,200 contractor
                credit for make-safe works). Full claims documentation is provided to support
                your insurance reimbursement. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                if needed.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can I clean up water damage myself instead of calling a professional?',
          answer:
            'Small spills of clean water (Category 1) under 2 square metres, on hard flooring, caught within an hour, with no wall or ceiling involvement can often be handled yourself. Anything beyond that — contaminated water, carpet saturation, multiple rooms, wall involvement, or fire/smoke damage — requires professional restoration with commercial equipment and IICRC protocols.',
        },
        {
          question: 'How quickly do I need to start professional water damage restoration?',
          answer:
            'Ideally within 6 hours. Water extraction should begin as soon as possible, with structural drying equipment running within 24 hours. Mould can begin growing within 24 to 48 hours in Australian conditions. Every hour of delay increases restoration costs and the likelihood of secondary damage.',
        },
        {
          question: 'What happens if I wait too long to call a professional restorer?',
          answer:
            'Delayed response leads to escalating damage: mould growth within 24-48 hours, timber swelling and delamination within 48-72 hours, and potential structural compromise over longer periods. A job that costs $3,000 with same-day intervention can easily become $10,000 or more if left for 72 hours.',
        },
        {
          question: 'Do I need professional help for a small amount of visible mould?',
          answer:
            'Yes. Visible mould — even a small patch — indicates an established colony that is typically larger than what you can see. Mould behind walls, under flooring, or in HVAC systems requires professional assessment and IICRC S520 protocol remediation. DIY surface cleaning does not address the root cause and the mould will return.',
        },
        {
          question: 'How does the Disaster Recovery platform connect me with a restorer?',
          answer:
            'Lodge your claim online at disasterrecovery.com.au/claim with your damage details and photos. The platform matches you with an IICRC certified contractor in your area within 60 minutes. We bill you directly so work begins immediately without waiting for insurer approval. Full claims documentation is provided to support your insurance reimbursement.',
        },
      ]}
      relatedGuides={[
        {
          title: 'What Does Disaster Recovery Include?',
          href: '/guides/services/what-disaster-recovery-includes',
          description: 'A complete breakdown of what professional disaster restoration covers.',
        },
        {
          title: 'How Long Does Fire Damage Restoration Take?',
          href: '/guides/guides/how-long-fire-damage-restoration',
          description: 'Typical timelines for fire and smoke damage restoration projects.',
        },
        {
          title: 'Why Hire an IICRC Certified Restorer?',
          href: '/guides/certifications/why-hire-iicrc-certified',
          description: 'What IICRC certification means and why it matters for your restoration project.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
