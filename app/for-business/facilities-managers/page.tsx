import { Metadata } from 'next';
import Script from 'next/script';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Restoration for Facilities Managers',
  description: 'Emergency disaster restoration for facilities managers across Australia. Approved supplier panel, SLA compliance, IICRC certification, multi-floor coordination.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Facilities Management Disaster Recovery',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
};

export const metadata: Metadata = {
  title: 'Facilities Managers | Commercial Building Restoration',
  description:
    'Emergency disaster restoration for facilities managers across Australia. Approved supplier panel, SLA compliance, IICRC certification, multi-floor coordination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for/facilities-managers',
  },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function FacilitiesManagersPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="facilities-managers-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Wrench className="h-12 w-12" />,
        title: 'Emergency Restoration for Facilities Managers',
        subtitle:
          'Approved supplier credentials, SLA-compliant response times, IICRC certification, and multi-floor coordination — built for the way facilities teams actually operate.',
      }}
      cta={{ text: 'Request Supplier Panel Information', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'For Business', href: '/for' },
        { label: 'Facilities Managers' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Available', value: '24/7/365' },
        { label: 'Coverage', value: 'Australia-Wide' },
        { label: 'Certification', value: 'IICRC' },
      ]}
      sections={[
        /* ------------------------------------------------------------------ */
        /* 1. Approved Supplier Panel — default bg                            */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Approved Supplier Panel — How to Add Disaster Recovery',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Most commercial buildings operate under a preferred or approved supplier
                framework. Procurement teams need ABN verification, current certificates
                of currency, IICRC accreditation, and evidence of national coverage before
                a restoration provider can be added to the panel. We understand this process
                because we work within it every day — across office towers, retail centres,
                logistics facilities, hospitals, and government buildings from Perth to
                Cairns.
              </p>
              <p>
                Disaster Recovery provides a complete supplier onboarding pack on request.
                This includes our ABN, current public liability insurance (minimum $20
                million), professional indemnity insurance, workers compensation certificates
                for every state and territory, and IICRC firm certification. We also supply
                a capability statement outlining our national contractor network (NRPG),
                response SLAs, service categories, and documentation standards. Everything
                your procurement team needs to evaluate and approve us is available in a
                single pack — no chasing individual documents across multiple emails.
              </p>
              <p>
                Once approved on your panel, we assign a dedicated account manager to your
                building or portfolio. This person becomes your single point of contact for
                emergency dispatch, scope queries, progress reporting, and invoice
                reconciliation. They learn your building&apos;s access protocols, escalation
                procedures, and reporting requirements so that when an emergency occurs at
                2am on a public holiday, the response is seamless — not a cold start.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 2. Emergency Response SLAs — light bg                              */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Emergency Response SLAs',
          background: 'light',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Facilities managers operate under service level agreements — from building
                owners, tenants, managing agents, and often regulatory bodies. When a pipe
                bursts on the fourteenth floor at 11pm, the SLA clock starts immediately.
                You need a restoration contractor who can match the urgency of your
                obligations, not one who returns calls &quot;during business hours.&quot;
              </p>
              <p>
                Our standard emergency SLA guarantees contractor contact within 60 minutes
                of claim lodgement, with on-site attendance within the hour — 24 hours a
                day, 7 days a week, 365 days a year. This applies Australia-wide, including
                after hours, weekends, and public holidays. There is no additional surcharge
                for after-hours emergency dispatch. The 60-minute SLA is not aspirational;
                it is contractual. Our NRPG contractor network has IICRC-certified
                technicians rostered around the clock in every major metro area and most
                regional centres.
              </p>
              <p>
                For portfolio and enterprise clients, we offer escalation procedures
                tailored to your internal hierarchy. If the attending contractor identifies
                a large-scale event — multiple floors affected, structural risk, or hazardous
                materials — the escalation triggers automatically. Your account manager is
                notified, a senior project coordinator is assigned, and additional resources
                are mobilised before you need to make a second call. We also provide monthly
                SLA compliance reporting so you can demonstrate to building owners and
                tenants that your emergency response protocols are being met consistently.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 3. Compliance Documentation — default bg                           */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Compliance Documentation — IICRC, SWMS, JSA, and Beyond',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Commercial buildings have compliance requirements that residential
                properties do not. Before a restoration contractor sets foot on your site,
                you may need to sight their Safe Work Method Statements (SWMS), Job Safety
                Analysis (JSA), risk assessments, asbestos awareness certification, working
                at heights certification, and confined spaces certification — depending on
                the building and the nature of the work. Failing to verify these documents
                exposes you, the building owner, and the contractor to serious WHS liability.
              </p>
              <p>
                Every contractor in our NRPG network holds current IICRC certification —
                the international standard for water damage restoration, fire and smoke
                restoration, mould remediation, and applied structural drying. Beyond
                IICRC, our contractors maintain all relevant state-based trade licences,
                WHS inductions, and site-specific certifications. We provide SWMS and JSA
                documentation for every job, tailored to the specific scope of works and
                your building&apos;s hazard profile. Risk assessments are completed on
                arrival and updated as the scope evolves.
              </p>
              <p>
                For buildings with environmental compliance obligations — such as hospitals,
                laboratories, food processing facilities, and heritage-listed properties —
                our contractors follow the relevant environmental management protocols.
                This includes waste classification and disposal in accordance with state
                EPA requirements, containment procedures for asbestos-containing materials
                (where identified), and air quality monitoring during mould remediation.
                All compliance documentation is provided digitally and can be uploaded
                directly to your facilities management platform or compliance register.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 4. Multi-Floor Coordination — light bg                             */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Multi-Floor Coordination',
          background: 'light',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                A single water event in a commercial building rarely stays on one floor.
                A burst fire hydrant main on level 8 can cascade through ceiling cavities,
                riser shafts, and service penetrations to affect every floor below. A roof
                membrane failure during a storm can impact the top three floors and the
                plant room simultaneously. Restoring a multi-floor commercial building
                requires a fundamentally different approach to restoring a single tenancy
                — and that is where many general restoration companies fall short.
              </p>
              <p>
                We assign a dedicated project coordinator for every multi-floor event. This
                coordinator develops a floor-by-floor restoration plan in consultation with
                you, the building manager, and affected tenants. The plan addresses access
                scheduling (particularly for tenancies that cannot tolerate downtime during
                business hours), equipment placement (industrial dehumidifiers, air movers,
                and negative air machines need power and floor space), noise management
                (restoration equipment runs 24/7 during the drying phase), and waste
                removal logistics (wet materials need to leave the building without
                disrupting other tenants or common areas).
              </p>
              <p>
                Documentation for multi-floor events is structured by tenancy and common
                area. Each affected tenant receives their own damage assessment, scope of
                works, and completion report — which they need for their own insurance
                claim or fit-out reinstatement. Common area damage (corridors, lift lobbies,
                fire stairs, plant rooms, car parks) is documented separately for the
                building owner. This separation is critical: it ensures that each party has
                exactly what they need for their respective claims, and that no costs are
                incorrectly attributed. As the facilities manager coordinating the entire
                response, you receive a consolidated project report covering all floors,
                tenancies, and common areas in a single document.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 5. After-Hours Emergency Protocol — default bg                     */
        /* ------------------------------------------------------------------ */
        {
          heading: 'After-Hours Emergency Protocol',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                Building emergencies do not wait for business hours. Burst pipes at
                midnight, fire alarm activations at 3am, storm damage during a weekend
                cyclone warning — these are the events that test your emergency protocols
                and your supplier relationships. The facilities managers who handle these
                events well are the ones who have a pre-established protocol with a
                restoration partner who genuinely operates 24/7 — not one who puts you
                through to a voicemail after 5pm.
              </p>
              <p>
                Disaster Recovery operates around the clock, every day of the year. When
                you{' '}
                <Link
                  href="/claim"
                  className="text-blue-600 hover:underline font-medium"
                >
                  lodge a claim online
                </Link>
                , our system immediately matches your building with an IICRC-certified
                contractor from the NRPG network in your area. The contractor contacts you
                within 60 minutes and can be on-site within the hour. The process is
                identical at midday on a Monday or midnight on Christmas Eve. There is no
                after-hours surcharge on the emergency make-safe fee.
              </p>
              <p>
                For buildings with concierge, security, or building management staff on
                site after hours, we coordinate directly with whoever is available to
                provide access. We can pre-register our contractor details with your
                building security system so that after-hours access is not delayed by
                identity verification or approval chains. If your building uses swipe
                cards, PIN codes, or key safes for contractor access, we work with your
                protocols — not around them. The emergency make-safe fee is{' '}
                <strong>$2,750</strong>, comprising a $550 platform fee and $2,200 held
                for the attending contractor. This covers the initial emergency response:
                on-site attendance, damage assessment, source isolation, water extraction
                or temporary weatherproofing, and insurance-compliant documentation. Full
                restoration is scoped and quoted separately after the emergency is
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
                <Link
                  href="/insurance/emergency-make-safe-guide"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Read the full Emergency Make-Safe Guide →
                </Link>
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
            'All commercial stakeholder pages — property managers, strata managers, business owners, and councils.',
        },
        {
          title: 'Commercial Restoration Services',
          href: '/services/commercial-services',
          description:
            'Full-scope commercial disaster restoration for offices, retail, warehouses, and multi-unit buildings.',
        },
        {
          title: 'Lodge a Claim',
          href: '/claim',
          description:
            'Report building damage online — 24/7 availability with 60-minute emergency response.',
        },
      ]}
    />
    </>
  );
}
