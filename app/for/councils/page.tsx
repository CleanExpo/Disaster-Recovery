import { Metadata } from 'next';
import { Landmark } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Local Councils | Government Facility Restoration',
  description:
    'Emergency disaster restoration for local councils and government facilities across Australia. Community facility restoration, make-safe order support, procurement panel arrangements.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for/councils',
  },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function CouncilsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Landmark className="h-12 w-12" />,
        title: 'Emergency Restoration for Local Councils',
        subtitle:
          'When a community centre floods at midnight or storm damage closes a public library, your ratepayers expect it reopened — fast. We deploy IICRC-certified contractors to council-owned assets Australia-wide, 24/7.',
      }}
      cta={{ text: 'Request Council Partnership Details', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'For Business', href: '/for' },
        { label: 'Local Councils' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Available', value: '24/7/365' },
        { label: 'Coverage', value: 'Australia-Wide' },
        { label: 'Certification', value: 'IICRC' },
      ]}
      sections={[
        /* ------------------------------------------------------------------ */
        /* Section 1: Council-Owned Property Restoration (default bg)          */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Council-Owned Property Restoration',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Local councils manage a broad portfolio of community assets — community centres,
                libraries, council depots, parks buildings, public amenities blocks, childcare
                facilities, sports pavilions, and civic administration offices. When any of these
                properties suffers water damage, fire, storm impact, or mould contamination,
                the priority is clear: restore public access as quickly and safely as possible.
              </p>

              <h3>Assets We Restore for Councils</h3>
              <ul>
                <li><strong>Community centres and town halls</strong> — event spaces, meeting rooms, kitchens, and foyer areas. Water extraction, structural drying, and smoke remediation to return the venue to bookable condition.</li>
                <li><strong>Public libraries</strong> — specialised drying protocols for collections areas, server rooms, and open-plan reading spaces. We understand the importance of humidity control around paper and electronic assets.</li>
                <li><strong>Council depots and works yards</strong> — warehouse spaces, fleet maintenance bays, and chemical storage areas. Category 3 decontamination where required.</li>
                <li><strong>Parks and recreation buildings</strong> — sports pavilions, grandstands, amenities blocks, playgroup rooms, and kiosk facilities.</li>
                <li><strong>Public amenities</strong> — toilet blocks, change rooms, and shower facilities. Sewage overflow response and biohazard decontamination to IICRC S540 standards.</li>
                <li><strong>Childcare and early learning centres</strong> — restoration with heightened hygiene protocols for facilities licensed under the <em>National Quality Framework</em>.</li>
              </ul>

              <p>
                Every restoration follows IICRC S500 (water damage), S520 (mould), or S540
                (biohazard) standards as applicable. Your assets are restored to a condition
                that meets both workplace health and safety obligations and public access
                requirements.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* Section 2: Community Facility Emergency Response (light bg)         */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Community Facility Emergency Response',
          background: 'light',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Council facilities are public assets. Every day a community centre, library, or
                sports pavilion remains closed costs your community access to essential services.
                Our emergency response is built around minimising closure time — getting your
                facility back to operational condition as quickly as the damage allows.
              </p>

              <h3>Prioritising Public Access</h3>
              <p>
                Where damage is localised — for example, a burst pipe in one wing of a community
                centre — we work with your facilities team to isolate the affected area and keep
                the remainder of the building operational. Temporary barriers, dehumidification,
                and containment allow unaffected areas to remain open to the public while
                restoration proceeds in the damaged zone.
              </p>

              <h3>Minimising Closure Duration</h3>
              <p>
                Our contractors deploy commercial-grade drying equipment on the first attendance.
                Moisture mapping begins immediately, giving you an evidence-based timeline for
                reopening rather than a guess. Daily progress reports with updated moisture
                readings let you communicate accurate reopening dates to your community, hirers,
                and event organisers.
              </p>

              <h3>Temporary Safety Measures</h3>
              <p>
                If the facility cannot remain partially open, we install temporary safety measures —
                boarding, fencing, signage, and temporary weatherproofing — to secure the site
                and prevent secondary damage or public injury. All temporary works comply with
                council signage standards and relevant workplace health and safety legislation.
              </p>

              <h3>Coordination With Council Operations Teams</h3>
              <p>
                We liaise directly with your facilities management, infrastructure, or property
                services team — whoever manages the asset day to day. Our project coordinator
                provides a single point of contact, attends site meetings as required, and
                aligns restoration schedules with your operational calendar. If a room is booked
                for a community event next week, we factor that into the work plan.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* Section 3: Procurement & Panel Arrangements (default bg)            */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Procurement and Panel Arrangements',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                We understand that councils operate within procurement frameworks. Whether you
                engage contractors through standing offer arrangements, select quotes, or
                pre-approved vendor panels, we provide the documentation and compliance
                credentials you need to onboard Disaster Recovery through your established
                processes.
              </p>

              <h3>Standing Offer and Panel Eligibility</h3>
              <p>
                Disaster Recovery can be registered on your council&apos;s pre-approved supplier
                panel or standing offer arrangement for emergency restoration services. We
                participate in formal tender and quotation processes and can provide all
                standard procurement documentation on request.
              </p>

              <h3>Compliance and Certification Documentation</h3>
              <p>
                Our contractors hold current IICRC certification across water damage restoration
                (WRT), fire and smoke restoration (FSRT), and mould remediation (AMRT). We
                provide the following documentation for your vendor registration process:
              </p>
              <ul>
                <li><strong>ABN and company registration details</strong></li>
                <li><strong>Public liability insurance</strong> — current certificate of currency</li>
                <li><strong>Professional indemnity insurance</strong> — current certificate of currency</li>
                <li><strong>Workers compensation coverage</strong></li>
                <li><strong>IICRC certification copies</strong> — for all attending contractors</li>
                <li><strong>WHS management plan</strong> — compliant with the <em>Work Health and Safety Act 2011</em></li>
                <li><strong>Environmental management procedures</strong> — waste disposal, asbestos protocols, and hazardous materials handling</li>
              </ul>

              <h3>How to Engage Disaster Recovery</h3>
              <p>
                For emergency works under your council&apos;s urgent procurement threshold,
                you can engage us immediately by{' '}
                <Link href="/claim" className="text-blue-600 hover:underline font-medium">
                  lodging a claim online
                </Link>
                . For standing offer or panel registration, contact us to request a formal
                capability statement and compliance pack tailored to your council&apos;s
                procurement requirements.
              </p>

              <h3>Billing — How It Works</h3>
              <p>
                <strong>We bill you directly — the council as our client.</strong> There is no
                requirement to wait for insurer approval or scope negotiation before work begins.
                You control the process from engagement to completion. We provide a detailed
                scope of works, compliant tax invoices, and full documentation for your
                records, audit trail, and any insurance claim your council chooses to lodge for
                reimbursement.
              </p>
              <p>
                The emergency make-safe fee is <strong>$2,750</strong>, comprising:
              </p>
              <ul>
                <li><strong>$550 platform fee</strong> — emergency dispatch, contractor matching, and coordination through the Disaster Recovery platform</li>
                <li><strong>$2,200 held for the attending contractor</strong> — emergency attendance, damage assessment, water extraction or temporary weatherproofing, and insurance-compliant documentation</li>
              </ul>
              <p>
                Full restoration is scoped and quoted separately once the emergency is
                stabilised. Payment plans are available through{' '}
                <a
                  href="https://www.bluefirefinance.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Blue Fire Finance
                </a>{' '}
                for larger restoration projects.{' '}
                <Link href="/insurance/emergency-make-safe-guide" className="text-blue-600 hover:underline font-medium">
                  Read the full Emergency Make-Safe Guide →
                </Link>
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* Section 4: After-Hours Council Emergency Protocol (light bg)        */
        /* ------------------------------------------------------------------ */
        {
          heading: 'After-Hours Council Emergency Protocol',
          background: 'light',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Property damage to council assets does not wait for business hours. A burst
                pipe on a Saturday night, storm damage during a long weekend, or a fire alarm
                activation at 3am all require immediate response — both to secure the asset
                and to prevent secondary damage that multiplies the restoration cost.
              </p>

              <h3>24/7 Emergency Contact for Council Assets</h3>
              <p>
                Disaster Recovery operates around the clock, every day of the year. When you{' '}
                <Link href="/claim" className="text-blue-600 hover:underline font-medium">
                  lodge a claim online
                </Link>
                , our system immediately matches your location with an IICRC-certified
                contractor from the NRPG network. The process is identical at 2pm on a
                Tuesday or 2am on Christmas Day — no answering machines, no callback queues,
                no delays.
              </p>

              <h3>On-Site Within 60 Minutes</h3>
              <p>
                Once the claim is lodged, a certified contractor will contact you within 60
                minutes and can be on-site within the hour. For council assets, where damage
                may affect public safety or building security, rapid attendance is critical.
                Our contractors arrive equipped for immediate water extraction, temporary
                weatherproofing, boarding, and containment — whatever the situation demands.
              </p>

              <h3>Building Access and Security Coordination</h3>
              <p>
                Council buildings often have restricted access — alarm systems, access cards,
                roller doors, and secure storage areas. We work with your after-hours
                arrangements to ensure our contractor can access the building promptly. If your
                council uses a security patrol service, we can coordinate directly with them.
              </p>

              <h3>Key Holder Arrangements</h3>
              <p>
                For councils that want to pre-establish emergency protocols, we recommend
                setting up a key holder arrangement. This means your after-hours duty officer,
                security provider, or facilities manager has a clear procedure for granting
                access to our contractor when an emergency is reported. We provide a simple
                protocol card for your duty officers — a single-page reference covering who to
                contact, what information to provide, and what to expect when the contractor
                arrives.
              </p>

              <h3>Integrating With Your After-Hours Service</h3>
              <p>
                If your council uses an after-hours call centre or duty officer rotation, we
                can provide your team with a decision tree for property emergencies. This
                ensures genuine emergencies trigger an immediate restoration response, while
                non-urgent maintenance requests are queued for the next business day. The
                result: zero delay between damage discovery and contractor dispatch.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* Section 5: Supporting Make-Safe Order Compliance (default bg)        */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Supporting Make-Safe Order Compliance',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Councils do not only manage their own buildings — they also issue make-safe
                orders to private property owners under local government legislation and
                building acts. When you issue a notice requiring a property owner to make their
                building safe, that owner often needs help responding quickly and to the
                required standard. This is where Disaster Recovery can assist — both you and
                the property owner.
              </p>

              <h3>When Council Issues a Make-Safe Order</h3>
              <p>
                Under the relevant building act or local government act in your state or
                territory, councils can issue emergency orders requiring property owners to
                make a building safe within a specified timeframe. Common triggers include
                fire damage, storm damage, structural instability, water ingress causing mould
                risk, or biohazard contamination. The property owner is legally obligated to
                comply, but many do not know where to start — particularly for complex
                restoration work that requires certified contractors and documented methodology.
              </p>

              <h3>How Disaster Recovery Helps Property Owners Respond</h3>
              <p>
                When a property owner receives a make-safe order from your council, they can
                engage Disaster Recovery immediately. We deploy an IICRC-certified contractor
                to the property to carry out the make-safe works — water extraction, structural
                securing, weatherproofing, decontamination, or hazard removal as required by
                the order. Work begins the same day the owner engages us, without waiting for
                insurance assessors or scope negotiations.
              </p>

              <h3>Documentation for Council Compliance Reporting</h3>
              <p>
                We provide the property owner with comprehensive documentation that demonstrates
                compliance with your make-safe order. This documentation includes:
              </p>
              <ul>
                <li><strong>Before and after photographic evidence</strong> — timestamped photos showing the condition prior to works and the completed make-safe result</li>
                <li><strong>Scope of works completed</strong> — a detailed description of all work performed, referenced to IICRC standards where applicable</li>
                <li><strong>Contractor certification details</strong> — copies of IICRC credentials for the attending technicians</li>
                <li><strong>Completion certificate</strong> — a formal statement that the make-safe works have been completed to industry standards</li>
              </ul>
              <p>
                This package gives the property owner everything they need to demonstrate
                compliance to your council, and gives your compliance officers confidence that
                the work was performed to an acceptable standard by certified professionals.
              </p>

              <h3>A Resource You Can Recommend</h3>
              <p>
                Some councils choose to include Disaster Recovery as a recommended provider
                when issuing make-safe orders — not as an endorsement, but as a practical
                resource for property owners who need to act quickly and may not know where to
                find a certified restoration company at short notice. If your council would
                find this useful, contact us to discuss how we can support your compliance
                processes.
              </p>
            </div>
          ),
        },
      ]}
      relatedPages={[
        {
          title: 'For Business Hub',
          href: '/for',
          description:
            'Restoration solutions for property managers, strata managers, business owners, and councils.',
        },
        {
          title: 'Commercial Services',
          href: '/services/commercial-services',
          description:
            'Full commercial restoration services for offices, retail, hospitality, healthcare, and industrial properties.',
        },
        {
          title: 'Emergency Services',
          href: '/services/emergency-services',
          description:
            '24/7 emergency response including water extraction, temporary weatherproofing, and make-safe works.',
        },
      ]}
    />
  );
}
