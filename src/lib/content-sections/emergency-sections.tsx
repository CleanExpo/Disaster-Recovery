import type { ContentSection } from '@/components/antigravity';

interface EmergencySectionParams {
  emergencyType: string;
  context: string;
}

export function getEmergencySections({ emergencyType, context }: EmergencySectionParams): ContentSection[] {
  return [
    {
      heading: `${emergencyType} Emergency Services`,
      body: (
        <>
          <p>
            Disasters do not wait for business hours. Our emergency disaster recovery services are
            available {context}, with no additional surcharges or call-out fees. When you contact us
            during {emergencyType.toLowerCase()} situations, a qualified restoration professional
            will be dispatched to your property immediately.
          </p>
          <p>
            Our nationwide network of contractors means there is always a certified technician near
            you, ready to respond within 60 minutes — regardless of the time. Every emergency call
            is handled by trained disaster recovery specialists, not a call centre.
          </p>
          <p>
            Whether it is a burst pipe flooding your home, storm damage tearing through your roof,
            or a fire that has left your property unsafe, our {emergencyType.toLowerCase()} response
            teams carry the equipment and expertise to stabilise the situation immediately and
            prevent further damage.
          </p>
        </>
      ),
    },
    {
      heading: 'What to Do Before We Arrive',
      background: 'light',
      body: (
        <>
          <p>
            While waiting for our emergency team, these steps can help protect you and minimise
            further damage to your property:
          </p>
          <ol>
            <li><strong>Ensure personal safety first</strong> — Evacuate if there is any risk from fire, structural damage, electrical hazards, or contaminated water. Do not re-enter until cleared.</li>
            <li><strong>Turn off utilities if safe to do so</strong> — For water damage, shut off the mains water supply. For electrical hazards, switch off at the main breaker if accessible without risk.</li>
            <li><strong>Document the damage</strong> — Take photos and video of all visible damage before touching anything. This is critical for your insurance claim.</li>
            <li><strong>Remove valuables from harm</strong> — If safe, move important documents, electronics, and irreplaceable items away from the affected area.</li>
            <li><strong>Do not attempt DIY cleanup of contaminated areas</strong> — Sewage, biohazard, asbestos, and smoke damage require professional protocols. Improper handling creates health risks.</li>
          </ol>
        </>
      ),
    },
    {
      heading: 'What Happens When You Call Us',
      body: (
        <>
          <p>
            Our {emergencyType.toLowerCase()} emergency response follows a rapid, proven process:
          </p>
          <ul>
            <li><strong>Immediate triage (0–5 minutes)</strong> — We assess the situation over the phone, determine the type and urgency, and dispatch the nearest available team.</li>
            <li><strong>On-site arrival (within 60 minutes)</strong> — Our technician arrives with emergency equipment, secures the property, and stops any ongoing damage.</li>
            <li><strong>Emergency stabilisation</strong> — This may include water extraction, emergency board-up, tarping, power restoration, or containment of hazardous materials.</li>
            <li><strong>Assessment and documentation</strong> — We document the damage, provide you with an initial assessment, and prepare all documentation you need to lodge your insurance claim.</li>
            <li><strong>Restoration plan</strong> — Within 24 hours, you receive a detailed restoration plan with timeline and costs. For insured events, we provide all documentation you need to submit your claim.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'No Extra Charges — Guaranteed',
      background: 'light',
      body: (
        <>
          <p>
            We believe emergencies should not cost you more simply because of when they happen.
            Our {emergencyType.toLowerCase()} services carry the same rates as standard business
            hours, with no surcharges, no penalty rates, and no hidden fees.
          </p>
          <ul>
            <li><strong>Transparent pricing</strong> — Normal contractor rate of $85/hr ($120/hr for emergency callouts) plus materials.</li>
            <li><strong>No after-hours surcharge</strong> — Same rates 24/7, 365 days a year.</li>
            <li><strong>No weekend or public holiday penalties</strong> — Disasters do not take holidays, and neither do our pricing commitments.</li>
            <li><strong>Insurance claims support</strong> — We provide all documentation your insurer requires. Payment plans available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.</li>
          </ul>
          <p>
            This no-surcharge policy applies to all emergency callouts Australia-wide, across all
            service types including water damage, fire damage, storm damage, mould emergencies,
            and biohazard situations.
          </p>
        </>
      ),
    },
    {
      heading: `${emergencyType} Emergency FAQ`,
      body: (
        <>
          <h3>Is there really no extra charge for {emergencyType.toLowerCase()} callouts?</h3>
          <p>
            Correct. We do not charge call-out fees, after-hours rates, or public holiday surcharges.
            The same competitive rates apply 24 hours a day, 7 days a week, 365 days a year.
          </p>
          <h3>How fast can you respond?</h3>
          <p>
            Our target response time is 60 minutes or less to any metropolitan area in Australia.
            Regional and remote areas may take longer depending on distance, but we always dispatch
            the nearest available contractor immediately.
          </p>
          <h3>Should I call my insurer first or call you?</h3>
          <p>
            Call us first. Stopping the damage is the priority. We will contact your insurer on your
            behalf during the initial assessment. Delays in emergency response can significantly
            increase total damage and claim costs.
          </p>
          <h3>What emergencies do you respond to?</h3>
          <p>
            We respond to all property emergencies including water damage, fire and smoke damage,
            storm damage, flood events, sewage overflows, mould emergencies, biohazard situations,
            and structural damage requiring emergency stabilisation.
          </p>
        </>
      ),
    },
  ];
}
