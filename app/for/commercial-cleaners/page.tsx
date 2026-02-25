import { Metadata } from 'next';
import { Handshake } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commercial Cleaners | Referral Partner Program | Disaster Recovery',
  description:
    'Partner with Disaster Recovery when damage exceeds your cleaning scope. Your client stays your client. Emergency referral program for commercial cleaning companies across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for/commercial-cleaners',
  },
};

export default function CommercialCleanersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Handshake className="h-12 w-12" />,
        title: 'Referral Partner Program for Commercial Cleaners',
        subtitle:
          'When damage goes beyond cleaning, you need a restoration partner — not a competitor. We handle the emergency restoration. Your client stays your client.',
      }}
      cta={{ text: 'Join Our Referral Network', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'For Business', href: '/for' },
        { label: 'Commercial Cleaners' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Available', value: '24/7/365' },
        { label: 'Your Client', value: 'Stays Yours' },
        { label: 'Coverage', value: 'Australia-Wide' },
      ]}
      sections={[
        /* ------------------------------------------------------------------ */
        /* 1. When to Refer Up (default bg)                                    */
        /* ------------------------------------------------------------------ */
        {
          heading: 'When to Refer Up',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                You know the line between cleaning and restoration better than anyone. Most
                of the time, the job is straightforward — post-construction clean, regular
                maintenance, end-of-lease turnaround. But sometimes you walk into a site and
                immediately know this is beyond cleaning scope. That is when you need a
                restoration partner on speed dial.
              </p>

              <h3>Standing water or active water ingress</h3>
              <p>
                If there is standing water on the floor — from a burst pipe, overflowing
                fixture, roof leak or storm damage — this is not a cleaning job. Standing
                water requires emergency extraction with truck-mounted or portable extraction
                units, structural drying with commercial dehumidifiers and air movers,
                moisture mapping to identify water migration behind walls and under flooring,
                and monitoring over multiple days until drying targets are met. Without proper
                extraction and drying, mould growth begins within 24 to 48 hours — and mould
                remediation is an entirely separate scope again.
              </p>

              <h3>Structural damage</h3>
              <p>
                If walls are bowed, ceilings are sagging, flooring is buckled, or there is
                visible damage to structural elements, this requires assessment by an
                IICRC-certified restoration technician. Structural damage often indicates
                hidden moisture or fire compromise that is not visible to the naked eye.
                Cleaning over structural damage does not fix it — it conceals it, and that
                creates liability for everyone involved.
              </p>

              <h3>Mould behind walls or in concealed cavities</h3>
              <p>
                Surface mould on visible tiles or grout can be part of a cleaning scope. But
                mould growing behind plasterboard, inside wall cavities, under flooring or in
                ceiling spaces requires specialist remediation under IICRC S520 standards.
                This involves containment, negative air pressure, HEPA filtration and often
                demolition of affected materials. It is not something that can be addressed
                with surface cleaning products.
              </p>

              <h3>Fire and smoke damage</h3>
              <p>
                Smoke damage is deceptive. What looks like surface soot is actually acidic
                residue that corrodes metals, etches glass and permanently stains porous
                surfaces if not treated correctly within days. Smoke particles penetrate deep
                into soft furnishings, HVAC systems and wall cavities. Professional fire
                restoration requires ozone treatment, thermal fogging, specialist soot
                removal techniques and often full content pack-out and cleaning in a
                controlled off-site facility.
              </p>

              <h3>Sewage backup and biohazard</h3>
              <p>
                Any sewage overflow is classified as Category 3 contamination under IICRC
                S500 standards — the highest contamination level. This requires specialist
                personal protective equipment, antimicrobial treatment, removal of all porous
                materials that contacted the sewage, and clearance testing before the space
                can be reoccupied. Biohazard situations — blood, bodily fluids, chemical
                spills — carry similar requirements. These are not cleaning jobs; they are
                decontamination jobs with strict health and safety protocols.
              </p>

              <h3>The simple test</h3>
              <p>
                If your cleaning team cannot safely complete the job with standard cleaning
                equipment and products, or if the job requires drying equipment, containment
                barriers, HEPA filtration, PPE beyond standard cleaning gear, or specialist
                certifications — it is a restoration job. Call us, and we will take it from
                there.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 2. Our Referral Partner Program (light bg)                          */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Our Referral Partner Program',
          background: 'light',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                This is deliberately simple. No contracts to sign. No referral fees to
                negotiate. No paperwork to fill out. You call us when your client has damage
                that exceeds your cleaning scope, and we handle the restoration. That is the
                entire program.
              </p>

              <h3>How it works</h3>
              <p>
                When you encounter damage that needs restoration rather than cleaning, the
                process is three steps:
              </p>
              <ol>
                <li>
                  <strong>You call us or lodge a referral online.</strong> Tell us the site
                  address, the type of damage and any access details. That is all we need to
                  get moving.
                </li>
                <li>
                  <strong>We respond within 60 minutes.</strong> An IICRC-certified
                  contractor from our national NRPG network contacts the site contact (you
                  or your client, whichever you prefer) within the hour. They can be on-site
                  the same day — often within the hour — 24 hours a day, 7 days a week.
                </li>
                <li>
                  <strong>We handle the restoration. You maintain the cleaning contract.</strong>{' '}
                  We scope the restoration, perform the emergency make-safe, complete the
                  full restoration, and provide all documentation. Your cleaning agreement
                  with the client is completely untouched.
                </li>
              </ol>

              <h3>No fees, no paperwork</h3>
              <p>
                We do not charge referral fees. We do not ask you to sign a partnership
                agreement or an exclusivity clause. We do not require you to use our
                branding or co-market with us. You refer a job when it makes sense, and we
                appreciate the trust. We look after our referral partners because good
                partnerships are built on reliability, not contracts.
              </p>

              <h3>60-minute response, 24/7</h3>
              <p>
                Emergencies do not wait for business hours. If your client calls you at 11pm
                on a Saturday because the office is flooding, you can{' '}
                <Link href="/claim" className="text-blue-600 hover:underline font-medium">
                  lodge a referral online
                </Link>{' '}
                or call us directly. An IICRC-certified contractor will be in contact within
                60 minutes and on-site within the hour — anywhere in Australia. Your client
                sees you as the person who solved the problem, even though you called in the
                specialist. That is the point.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 3. Working Alongside Your Contract (default bg)                     */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Working Alongside Your Contract',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                We are a restoration company, not a cleaning company. Our scope begins where
                yours ends, and it finishes when the property is restored to pre-loss
                condition. At that point, normal operations resume — including your cleaning
                schedule.
              </p>

              <h3>During the restoration</h3>
              <p>
                While our contractors are on-site performing restoration work — water
                extraction, structural drying, mould remediation, fire damage restoration —
                the affected areas are typically not accessible for regular cleaning. Drying
                equipment, containment barriers and restoration works occupy the space. We
                coordinate with your team to ensure there is no duplication of effort and no
                confusion about who is responsible for what. If your team is scheduled for a
                clean in an unaffected area of the same building, that can proceed as normal.
                We will keep you informed about which areas are under restoration and when
                they will be released.
              </p>

              <h3>After the restoration</h3>
              <p>
                Once restoration is complete and the space is handed back to the client, your
                regular cleaning service resumes. In many cases, the client will want an
                additional deep clean of the restored areas before returning to their normal
                schedule — and that is your job, not ours. We restore the structure and
                environment to a safe, dry, pre-loss condition. The post-restoration detail
                clean is a natural extension of your existing contract.
              </p>

              <h3>Coordination, not competition</h3>
              <p>
                If both our team and your team are on-site simultaneously — for example, your
                cleaners maintaining unaffected floors while we restore a water-damaged
                level — we coordinate access, equipment placement and scheduling through the
                building or facility manager. Our project coordinator will introduce
                themselves to your site supervisor and establish clear boundaries. The goal
                is a smooth parallel operation where neither team is in the other&apos;s way.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 4. Your Client Stays Your Client (light bg)                         */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Your Client Stays Your Client',
          background: 'light',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>
                This is the concern every cleaning company has when they refer a client to
                another service provider: will they try to take my client? We understand that
                concern, and we want to address it directly.
              </p>

              <h3>Our guarantee</h3>
              <p>
                <strong>
                  We will never approach your client for cleaning services.
                </strong>{' '}
                Not during the restoration, not after it, not six months later. Our scope is
                emergency disaster restoration — water damage, fire damage, mould
                remediation, storm damage, biohazard decontamination. We do not offer
                regular cleaning, maintenance cleaning, end-of-lease cleaning, or any other
                service that overlaps with your contract. It is not what we do.
              </p>

              <h3>We refer cleaning needs back to you</h3>
              <p>
                If a client we are working with asks us about regular cleaning — or if we
                identify a cleaning need during a restoration job — we refer them back to
                you. If the client came to us through your referral, you are their cleaning
                provider and we respect that relationship. If the client does not currently
                have a cleaning provider and we know you service their area, we are happy to
                recommend you. Good partnerships work both ways.
              </p>

              <h3>Different services, different expertise</h3>
              <p>
                Commercial cleaning and disaster restoration are fundamentally different
                disciplines. Your team is trained in cleaning methodologies, hygiene
                standards and facility maintenance. Our contractors are IICRC-certified in
                water damage restoration (S500), fire and smoke restoration (S540), mould
                remediation (S520) and applied structural drying (ASD). The overlap is
                minimal. You would not hire a restoration company to do your daily office
                clean, and you should not be expected to handle a Category 3 sewage overflow
                with cleaning equipment. Different tools, different training, different scope.
              </p>

              <h3>A partnership, not a competition</h3>
              <p>
                The best referral relationships are built on mutual respect and clear
                boundaries. You bring the client relationship, the ongoing service contract
                and the trust your client has placed in your company. We bring specialist
                restoration capability, 24/7 emergency response and IICRC-certified
                contractors. Together, your client gets a complete solution — regular
                cleaning from you, emergency restoration from us — without either of us
                stepping on the other&apos;s toes.
              </p>
            </div>
          ),
        },

        /* ------------------------------------------------------------------ */
        /* 5. Emergency Referral Contact (dark bg)                             */
        /* ------------------------------------------------------------------ */
        {
          heading: 'Emergency Referral Contact',
          background: 'dark',
          body: (
            <div className="prose prose-lg max-w-none prose-invert">
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                When your client has damage that goes beyond cleaning, here is how to refer
                them to us. It takes less than five minutes and triggers a 60-minute
                emergency response — any time, any day, anywhere in Australia.
              </p>

              <h3 style={{ color: 'var(--ag-surface-white)' }}>How to refer</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                You have two options:
              </p>
              <ul style={{ color: 'rgba(255,255,255,0.85)' }}>
                <li>
                  <strong>Online:</strong>{' '}
                  <Link href="/claim" style={{ color: 'var(--ag-accent-orange, #F59E0B)', fontWeight: 600 }}>
                    Lodge a referral through our online claim form
                  </Link>{' '}
                  — available 24/7, takes under five minutes, and triggers an immediate
                  contractor match.
                </li>
                <li>
                  <strong>Phone:</strong> Call <strong>1300 309 361</strong> to speak with our
                  team directly. Available 24 hours a day, 7 days a week, 365 days a year.
                </li>
              </ul>

              <h3 style={{ color: 'var(--ag-surface-white)' }}>What information to have ready</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                To ensure the fastest possible response, have the following details on hand
                when you call or lodge online:
              </p>
              <ul style={{ color: 'rgba(255,255,255,0.85)' }}>
                <li><strong>Site address</strong> — the full street address of the affected property</li>
                <li><strong>Type of damage</strong> — water, fire, mould, sewage, storm, biohazard, or other</li>
                <li><strong>Access details</strong> — how to get into the building, security codes, after-hours access, key location, or site contact name and number</li>
                <li><strong>Your details</strong> — your name, company and phone number so we can keep you in the loop</li>
                <li><strong>Client contact</strong> — the name and number of the property owner, building manager or facility manager (if different from you)</li>
              </ul>

              <h3 style={{ color: 'var(--ag-surface-white)' }}>What happens next</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                Once you lodge the referral:
              </p>
              <ol style={{ color: 'rgba(255,255,255,0.85)' }}>
                <li>Our system matches an IICRC-certified contractor from the NRPG network in the client&apos;s area — typically within minutes.</li>
                <li>The contractor contacts the site contact within 60 minutes to discuss the situation and confirm attendance.</li>
                <li>The contractor arrives on-site and performs the emergency make-safe: stopping the source, extracting water, setting up containment and deploying drying equipment.</li>
                <li>We keep you informed throughout. You referred the client — you deserve to know what is happening.</li>
              </ol>

              <p style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                Have a question about the referral program?{' '}
                <Link href="/contact" style={{ color: 'var(--ag-accent-orange, #F59E0B)', fontWeight: 600 }}>
                  Get in touch
                </Link>{' '}
                — we are happy to walk you through how it works before you need it.
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
            'Resources for property managers, strata managers, business owners and other referral partners.',
        },
        {
          title: 'Commercial Restoration Services',
          href: '/services/commercial-services',
          description:
            'Full-scope commercial disaster restoration for offices, retail, warehouses and multi-unit buildings.',
        },
        {
          title: 'Emergency Services',
          href: '/services/emergency-services',
          description:
            '24/7 emergency response — water extraction, make-safe, fire damage, mould containment, biohazard.',
        },
      ]}
    />
  );
}
