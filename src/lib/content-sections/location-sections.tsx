import type { ContentSection } from '@/components/antigravity';

interface LocationSectionParams {
  city: string;
  state: string;
  suburbs?: string[];
}

const STATE_FULL_NAMES: Record<string, string> = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  WA: 'Western Australia',
  SA: 'South Australia',
  TAS: 'Tasmania',
  NT: 'Northern Territory',
  ACT: 'Australian Capital Territory',
};

const CLIMATE_RISKS: Record<string, string[]> = {
  NSW: ['coastal storms', 'flash flooding', 'bushfire ember attack', 'severe hailstorms'],
  VIC: ['flash flooding', 'wind damage', 'bushfire proximity', 'burst pipes from cold snaps'],
  QLD: ['cyclone damage', 'tropical flooding', 'severe storm cells', 'humidity-driven mould'],
  WA: ['cyclone impact', 'bushfire threat', 'flash flooding', 'extreme heat damage'],
  SA: ['bushfire risk', 'storm surges', 'flash flooding', 'heat-related pipe failures'],
  TAS: ['severe storms', 'flooding', 'wind damage', 'cold-weather pipe bursts'],
  NT: ['cyclone destruction', 'monsoonal flooding', 'extreme heat damage', 'termite damage post-storm'],
  ACT: ['severe hailstorms', 'bushfire proximity', 'flash flooding', 'frost-related pipe bursts'],
};

export function getLocationSections({ city, state, suburbs }: LocationSectionParams): ContentSection[] {
  const fullState = STATE_FULL_NAMES[state] ?? state;
  const risks = CLIMATE_RISKS[state] ?? ['storms', 'flooding', 'fire damage', 'mould growth'];

  return [
    {
      heading: `Disaster Recovery Services in ${city}`,
      body: (
        <>
          <p>
            When disaster strikes in {city}, every minute counts. Our network of certified restoration
            professionals provides 24/7 emergency response across {city} and the wider {fullState} region,
            delivering rapid water extraction, fire damage restoration, mould remediation, and storm
            damage repair.
          </p>
          <p>
            As an approved provider for all major Australian insurers, we handle all claims
            documentation on your behalf — providing everything your insurer needs to process your reimbursement. Our local {city} teams
            understand the unique challenges properties face in this area, from {risks[0]} to {risks[1]},
            and carry the specialist equipment needed for any scale of restoration.
          </p>
          <p>
            Whether you need emergency board-up at 2am or a comprehensive restoration plan for a
            commercial property, our {city} contractors are IICRC-certified and ready to respond within
            60 minutes across the local area.
          </p>
        </>
      ),
    },
    {
      heading: `Common Disaster Risks in ${city}, ${state}`,
      background: 'light',
      body: (
        <>
          <p>
            Properties in {city} face specific environmental risks that require specialist restoration
            knowledge. The most common emergencies our local teams respond to include:
          </p>
          <ul>
            {risks.map((risk, i) => (
              <li key={i}><strong>{risk.charAt(0).toUpperCase() + risk.slice(1)}</strong> — a leading cause of property damage claims in the {city} area, requiring immediate professional response to prevent secondary damage.</li>
            ))}
          </ul>
          <p>
            Understanding these regional risks means our {city} teams arrive prepared with the right
            equipment and expertise, reducing restoration time and minimising total damage to your property.
          </p>
        </>
      ),
    },
    {
      heading: 'Our Emergency Response Process',
      body: (
        <>
          <p>
            When you contact us for an emergency in {city}, our response follows a proven four-stage
            process designed to protect your property and get your life back to normal as quickly as
            possible:
          </p>
          <ol>
            <li><strong>Immediate response (within 60 minutes)</strong> — Our nearest {city}-based team is dispatched. We secure the property, stop ongoing damage, and perform an initial assessment.</li>
            <li><strong>Damage assessment and documentation</strong> — We document all damage with photos, moisture readings, and a detailed scope of works — everything you need to lodge your insurance claim.</li>
            <li><strong>Professional restoration</strong> — Using industrial-grade equipment including dehumidifiers, air scrubbers, and thermal imaging cameras, we restore your property to pre-loss condition.</li>
            <li><strong>Final inspection and sign-off</strong> — We conduct moisture mapping and air quality testing to confirm the restoration meets Australian Standards before handing back your property.</li>
          </ol>
        </>
      ),
    },
    {
      heading: `Service Coverage Across ${city}`,
      background: 'light',
      body: (
        <>
          <p>
            Our {city} disaster recovery network covers the entire metropolitan area and surrounding
            suburbs, with contractors strategically positioned for rapid response times.
          </p>
          {suburbs && suburbs.length > 0 ? (
            <>
              <p>We service the following areas in and around {city}:</p>
              <p>{suburbs.join(' • ')}</p>
            </>
          ) : (
            <p>
              We service all suburbs and surrounding areas within {city} and the broader {fullState}
              region. Our network extends to regional centres, ensuring no property is too remote for
              our emergency response teams.
            </p>
          )}
          <p>
            All our {city} contractors hold current IICRC certification, WorkSafe licences, and are
            approved by major insurers including AAMI, Suncorp, Allianz, NRMA, QBE, and more. We
            bill you directly so work begins immediately, then provide full documentation to support your insurance claim.
          </p>
        </>
      ),
    },
    {
      heading: `Frequently Asked Questions — ${city} Services`,
      body: (
        <>
          <h3>How quickly can you respond in {city}?</h3>
          <p>
            Our {city} teams target a 60-minute response time for emergencies. We operate 24 hours
            a day, 7 days a week, including public holidays. After-hours and weekend callouts incur
            no additional charges.
          </p>
          <h3>Do you work with my insurer?</h3>
          <p>
            We work with clients insured by all major Australian providers. We bill you directly — allowing
            immediate work commencement — and provide comprehensive documentation to support your insurance
            claim for reimbursement. Payment plans available through{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
          <h3>What types of damage do you repair in {city}?</h3>
          <p>
            Our {city} network handles water damage, fire and smoke damage, mould remediation,
            storm and cyclone damage, flood recovery, sewage cleanup, biohazard decontamination,
            and trauma scene restoration. No job is too large or too small.
          </p>
          <h3>Are your {city} technicians certified?</h3>
          <p>
            Every technician in our {city} network holds current IICRC certification (the international
            gold standard for restoration), plus relevant state-specific licences including WorkSafe
            and asbestos awareness where required.
          </p>
        </>
      ),
    },
  ];
}
