import type { ContentSection } from '@/components/antigravity';
import type { LocationData } from '../../../data/locations/_schema';

// Classifies city into a content archetype based on data
type CityArchetype = 'cyclone-belt' | 'bushfire-risk' | 'high-rainfall' | 'major-metro' | 'regional';

export function getCityArchetype(data: LocationData): CityArchetype {
  // Priority: cyclone > high-rainfall > bushfire > major-metro > regional
  if (data.climate.cycloneSeason && data.climate.annualRainfallMm > 1200) return 'cyclone-belt';
  if (data.climate.annualRainfallMm > 900) return 'high-rainfall';
  if (data.risks.bushfireAttackLevel) return 'bushfire-risk';
  if (data.population > 1000000) return 'major-metro';
  return 'regional';
}

// --- Intro section — 5 variants by archetype ---
export function generateIntroSection(data: LocationData): ContentSection {
  const archetype = getCityArchetype(data);
  const { city, stateFullName, population, climate, risks } = data;
  const popFormatted = population.toLocaleString('en-AU');

  let introContent: React.ReactNode;

  switch (archetype) {
    case 'cyclone-belt':
      introContent = (
        <>
          <p>
            {city} sits within Australia&apos;s tropical cyclone belt, where the annual cyclone season
            from {climate.cycloneSeason} brings destructive winds, storm surge, and extreme rainfall.
            With a population of {popFormatted} residents and annual rainfall averaging {climate.annualRainfallMm}mm,
            properties across {city} face a unique combination of cyclone, flooding, and humidity-driven
            damage risks that demand specialist restoration expertise.
          </p>
          <p>
            Our IICRC-certified contractor network in {city} provides 24/7 emergency response for
            cyclone damage, flood recovery, storm repairs, and mould remediation. We understand that
            {city} properties require rapid intervention — in this climate, secondary damage from
            moisture and mould can begin within hours of the initial event.
          </p>
          <p>
            Whether your property has been affected by wind damage, rising floodwaters, or water
            ingress from a compromised roof, our {city} teams carry the industrial-grade equipment
            needed to extract water, stabilise structures, and begin the restoration process immediately.
            We bill you directly so work begins without delay, and provide full claims documentation
            to support your insurance reimbursement.
          </p>
        </>
      );
      break;

    case 'high-rainfall':
      introContent = (
        <>
          <p>
            {city} receives an average of {climate.annualRainfallMm}mm of rainfall annually —
            significantly above the national average — making water damage and flooding the dominant
            property risks for the city&apos;s {popFormatted} residents. The subtropical climate
            produces intense rainfall events during the wet season, with {climate.wetMonths.join(', ')} being
            the highest-risk months for flooding and storm damage.
          </p>
          <p>
            Our IICRC-certified contractor network across {city} and {stateFullName} specialises in
            flood recovery, water damage restoration, and the rapid mould remediation that {city}&apos;s
            humidity levels demand. With average humidity sitting at {climate.avgHumidityPercent}%,
            any water intrusion event requires immediate professional response to prevent mould
            colonisation — which can begin within 24-48 hours in {city}&apos;s warm, moist conditions.
          </p>
          <p>
            From emergency water extraction and structural drying to complete flood recovery and
            insurance claims support, we provide end-to-end disaster recovery services across {city}.
            We bill you directly so restoration begins immediately, and provide comprehensive
            documentation to support your insurance claim. Payment plans are available through{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
        </>
      );
      break;

    case 'bushfire-risk':
      introContent = (
        <>
          <p>
            {city} faces significant bushfire risk, with areas rated at {data.risks.bushfireAttackLevel}.
            The city&apos;s {popFormatted} residents live alongside some of Australia&apos;s most
            dangerous urban-bushfire interfaces, where ember attack, radiant heat, and direct flame
            contact threaten properties during the fire season. With annual rainfall of just {climate.annualRainfallMm}mm
            and dry months spanning {climate.dryMonths.join(', ')}, fire conditions can deteriorate rapidly.
          </p>
          <p>
            Our IICRC-certified contractor network in {city} specialises in fire and smoke damage
            restoration, emergency make-safe services, and the complete rebuild process. {city}&apos;s
            fire risk profile means our contractors carry specialist equipment for soot removal,
            smoke damage remediation, and structural assessment of fire-affected properties.
          </p>
          <p>
            Beyond bushfire, {city} properties also face {risks.primary[1]?.type} and{' '}
            {risks.primary[2]?.type || 'storm damage'}, requiring a versatile restoration capability.
            We bill you directly so work begins immediately following any disaster event, and provide
            full claims documentation to support your insurance reimbursement.
          </p>
        </>
      );
      break;

    case 'major-metro':
      introContent = (
        <>
          <p>
            As one of Australia&apos;s largest cities with a population of {popFormatted}, {city}
            demands a disaster recovery network with the scale and response speed to service a
            diverse metropolitan area. Properties across {city} face {risks.primary[0]?.type},{' '}
            {risks.primary[1]?.type}, and {risks.primary[2]?.type || 'storm damage'} — with the
            city receiving {climate.annualRainfallMm}mm of rainfall annually and temperatures ranging
            from {climate.avgMinTempC}°C to {climate.avgMaxTempC}°C.
          </p>
          <p>
            Our IICRC-certified contractor network is strategically positioned across {city}&apos;s
            metropolitan area, from the inner suburbs to the outer growth corridors. With contractors
            covering {data.regions.join(', ')}, we deliver rapid emergency response regardless of
            where in {city} your property is located.
          </p>
          <p>
            Whether it&apos;s a burst pipe in a CBD high-rise, storm damage to a heritage home in
            the inner suburbs, or flood recovery in a riverside property, our {city} teams have
            the expertise and equipment to handle every scale of restoration. We bill you directly
            so work begins without delay, and provide comprehensive claims documentation for your
            insurer. Payment plans are available through{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
        </>
      );
      break;

    default: // regional
      introContent = (
        <>
          <p>
            {city} and surrounding areas in {stateFullName} require reliable disaster recovery
            services that understand local conditions. With a population of {popFormatted} and
            annual rainfall of {climate.annualRainfallMm}mm, properties in {city} face{' '}
            {risks.primary[0]?.type} and {risks.primary[1]?.type} as the primary disaster risks.
          </p>
          <p>
            Our IICRC-certified contractor network provides 24/7 emergency response across {city}
            and the wider {stateFullName} region. We bill you directly so work begins immediately,
            and provide full claims documentation to support your insurance reimbursement.
          </p>
        </>
      );
  }

  return {
    heading: `Disaster Recovery Services in ${city}`,
    body: introContent,
  };
}

// --- Risk profile section ---
export function generateRiskProfileSection(data: LocationData): ContentSection {
  const { city, state, risks } = data;
  return {
    heading: `Disaster Risk Profile — ${city}, ${state}`,
    background: 'light',
    body: (
      <>
        <p>
          Properties in {city} face specific environmental hazards that influence the type and
          frequency of disaster recovery services needed. Understanding these risks helps property
          owners prepare and respond effectively.
        </p>
        <h3>Primary Risks</h3>
        <ul>
          {risks.primary.map((risk, i) => (
            <li key={i}>
              <strong>{risk.type.charAt(0).toUpperCase() + risk.type.slice(1)}</strong>{' '}
              (severity: {risk.severity}) — {risk.description}
            </li>
          ))}
        </ul>
        {risks.secondary.length > 0 && (
          <>
            <h3>Secondary Risks</h3>
            <ul>
              {risks.secondary.map((risk, i) => (
                <li key={i}>
                  <strong>{risk.type.charAt(0).toUpperCase() + risk.type.slice(1)}</strong>{' '}
                  (severity: {risk.severity}) — {risk.description}
                </li>
              ))}
            </ul>
          </>
        )}
        {risks.bushfireAttackLevel && (
          <p><strong>Bushfire Attack Level (BAL):</strong> {risks.bushfireAttackLevel}</p>
        )}
        {risks.floodZone && (
          <p><strong>Flood Zone Classification:</strong> {risks.floodZone}</p>
        )}
        {risks.cycloneCategory && (
          <p><strong>Cyclone Region:</strong> {risks.cycloneCategory}</p>
        )}
      </>
    ),
  };
}

// --- Historical events section ---
export function generateHistoricalEventsSection(data: LocationData): ContentSection {
  const { city, historicalEvents } = data;
  return {
    heading: `Major Disaster Events in ${city}`,
    body: (
      <>
        <p>
          {city} has experienced several significant disaster events that have shaped the region&apos;s
          emergency preparedness and restoration industry. These events demonstrate why professional
          disaster recovery services are essential for {city} property owners.
        </p>
        {historicalEvents.map((event, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <h3>{event.year}: {event.event}</h3>
            <p>{event.description}</p>
            {event.insuranceCostAud && (
              <p><strong>Insured losses:</strong> {event.insuranceCostAud}</p>
            )}
          </div>
        ))}
      </>
    ),
  };
}

// --- Seasonal disaster calendar ---
export function generateSeasonalCalendarSection(data: LocationData): ContentSection {
  const { city, seasonalRisks } = data;
  return {
    heading: `${city} Seasonal Disaster Calendar`,
    background: 'light',
    body: (
      <>
        <p>
          Understanding {city}&apos;s seasonal risk patterns helps property owners prepare and respond
          to disaster events. The following calendar outlines the primary risks for each month:
        </p>
        <ul>
          {seasonalRisks.map((month, i) => (
            <li key={i}>
              <strong>{month.month}:</strong> {month.risks.join(', ')}
            </li>
          ))}
        </ul>
        <p>
          Our {city} contractor network maintains year-round readiness for all seasonal hazards,
          with equipment and staffing levels adjusted to match peak demand periods.
        </p>
      </>
    ),
  };
}

// --- Emergency response process ---
export function generateProcessSection(data: LocationData): ContentSection {
  const archetype = getCityArchetype(data);
  const { city } = data;

  let step2Detail: string;
  let step3Detail: string;

  switch (archetype) {
    case 'high-rainfall':
    case 'cyclone-belt':
      step2Detail = `flood-specific moisture mapping, contamination assessment, and detailed scope of works. In ${city}'s flood-prone environment, we document water lines, contamination levels, and structural compromise — providing everything your insurer needs.`;
      step3Detail = `industrial-scale water extraction, anti-microbial treatment, and commercial dehumidification systems. ${city}'s high humidity means structural drying programs are carefully monitored to prevent mould colonisation during the restoration process.`;
      break;
    case 'bushfire-risk':
      step2Detail = `fire damage assessment including structural integrity checks, smoke penetration mapping, and detailed soot analysis. We document all damage with thermal imaging and air quality testing — providing comprehensive evidence for your insurance claim.`;
      step3Detail = `specialist soot and smoke removal, ozone treatment for odour elimination, and structural repairs. ${city}'s fire-affected properties often require careful assessment of hidden damage behind walls and in roof cavities.`;
      break;
    default:
      step2Detail = `comprehensive damage documentation with photos, moisture readings, and a detailed scope of works — everything you need to lodge your insurance claim for reimbursement.`;
      step3Detail = `industrial-grade equipment including commercial dehumidifiers, air scrubbers, and thermal imaging cameras to restore your property to pre-loss condition.`;
  }

  return {
    heading: `Our Emergency Response Process in ${city}`,
    body: (
      <>
        <p>
          When you contact us for an emergency in {city}, our response follows a proven four-stage
          process designed to protect your property and begin restoration as quickly as possible:
        </p>
        <ol>
          <li>
            <strong>Immediate response</strong> — Our nearest {city}-based team is dispatched.
            We secure the property, stop ongoing damage, and perform an initial assessment.
            We target response within 60 minutes across the {city} metropolitan area.
          </li>
          <li>
            <strong>Damage assessment and documentation</strong> — We conduct {step2Detail}
          </li>
          <li>
            <strong>Professional restoration</strong> — Using {step3Detail}
          </li>
          <li>
            <strong>Final inspection and sign-off</strong> — We conduct moisture mapping
            and air quality testing to confirm the restoration meets Australian Standards
            before handing back your property. Full documentation is provided for your records
            and insurance claim.
          </li>
        </ol>
      </>
    ),
  };
}

// --- Service coverage section ---
export function generateCoverageSection(data: LocationData): ContentSection {
  const { city, suburbs, regions, stateFullName } = data;
  const suburbsWithRiskNotes = suburbs.filter(s => s.riskNote);

  return {
    heading: `Service Coverage Across ${city}`,
    background: 'light',
    body: (
      <>
        <p>
          Our {city} disaster recovery network covers the entire metropolitan area and surrounding
          regions, with contractors positioned for rapid response across {regions.join(', ')}.
        </p>
        <p>
          <strong>Suburbs we service in {city}:</strong>{' '}
          {suburbs.map(s => s.name).join(' \u2022 ')}
        </p>
        {suburbsWithRiskNotes.length > 0 && (
          <>
            <h3>Suburb-Specific Risk Notes</h3>
            <ul>
              {suburbsWithRiskNotes.map((s, i) => (
                <li key={i}><strong>{s.name}:</strong> {s.riskNote}</li>
              ))}
            </ul>
          </>
        )}
        <p>
          Our network extends beyond these areas to cover the broader {stateFullName} region.
          All contractors hold current IICRC certification and carry appropriate state-specific
          licences. We bill you directly so work begins immediately, then provide full documentation
          to support your insurance claim.
        </p>
      </>
    ),
  };
}

// --- Local emergency resources ---
export function generateLocalResourcesSection(data: LocationData): ContentSection {
  const { city, council } = data;
  return {
    heading: `Local Emergency Resources — ${city}`,
    body: (
      <>
        <p>
          In a disaster emergency in {city}, contact emergency services on <strong>000</strong> for
          immediate life-threatening situations, or <strong>132 500</strong> for SES flood and storm
          assistance.
        </p>
        <ul>
          <li><strong>Local council:</strong> {council.name}</li>
          {council.sesUnit && <li><strong>SES unit:</strong> {council.sesUnit}</li>}
          {council.emergencyUrl && (
            <li>
              <strong>Council emergency info:</strong>{' '}
              <a href={council.emergencyUrl} target="_blank" rel="noopener noreferrer">
                {council.name} emergency page
              </a>
            </li>
          )}
        </ul>
        <p>
          For property restoration and damage recovery after the emergency has been secured, contact
          our 24/7 team to connect with IICRC-certified contractors in {city}.
        </p>
      </>
    ),
  };
}

// --- Insurance and claims section ---
export function generateInsuranceSection(data: LocationData): ContentSection {
  const { city, insuranceProfile } = data;
  return {
    heading: `Insurance Claims and Restoration in ${city}`,
    background: 'light',
    body: (
      <>
        <p>
          {city}&apos;s most common insurance claim type is <strong>{insuranceProfile.topClaimType}</strong>
          {insuranceProfile.avgClaimValueAud && (
            <>, with an average claim value of {insuranceProfile.avgClaimValueAud}</>
          )}.
          {insuranceProfile.icaRegion && (
            <> The Insurance Council of Australia classifies {city} within the {insuranceProfile.icaRegion} region
            for catastrophe modelling and claims data.</>
          )}
        </p>
        <p>
          <strong>How billing works:</strong> We bill you directly — not your insurer. This means
          work begins immediately without waiting for insurer approval. You control the process
          with no scope disputes or delays. We provide full claims documentation including photos,
          moisture reports, scope of works, and completion certificates — everything your insurer
          needs to process your reimbursement.
        </p>
        <p>
          After the initial make-safe, your contractor provides a formal contract with clear terms
          and conditions. Payment plans are available through{' '}
          <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
        </p>
      </>
    ),
  };
}
