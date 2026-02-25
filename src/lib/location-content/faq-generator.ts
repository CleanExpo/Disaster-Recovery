import type { LocationData } from '../../../data/locations/_schema';
import { getCityArchetype } from './content-blocks';

export interface FAQEntry {
  question: string;
  answer: string;
}

export function generateLocationFAQs(data: LocationData): FAQEntry[] {
  const { city, stateFullName, risks, historicalEvents, suburbs, insuranceProfile, climate } = data;
  const archetype = getCityArchetype(data);
  const faqs: FAQEntry[] = [];

  // 1. Response time (always)
  faqs.push({
    question: `How quickly can you respond to emergencies in ${city}?`,
    answer: `Our IICRC-certified contractor network in ${city}, ${stateFullName} provides 24/7 emergency response across all metropolitan regions including ${data.regions.slice(0, 3).join(', ')}. Submit your claim online and receive contractor quotes within 30-60 minutes. We target on-site arrival within 60 minutes for ${city} emergencies.`,
  });

  // 2. Primary risk (always)
  const primaryRisk = risks.primary[0];
  faqs.push({
    question: `What is the biggest disaster risk for ${city} properties?`,
    answer: `${city}'s primary disaster risk is ${primaryRisk.type} (rated ${primaryRisk.severity} severity). ${primaryRisk.description} Our ${city} contractors carry specialist equipment for ${primaryRisk.type} response and restoration, with experience handling ${insuranceProfile.topClaimType} — the most common insurance claim type in the region.`,
  });

  // 3. Historical events (conditional — if notable events exist)
  if (historicalEvents.length > 0) {
    const topEvent = historicalEvents[0];
    faqs.push({
      question: `How does ${city}'s disaster history affect property risk?`,
      answer: `${city} has experienced significant disaster events including the ${topEvent.year} ${topEvent.event}${topEvent.insuranceCostAud ? ` (${topEvent.insuranceCostAud} in insured losses)` : ''}. ${topEvent.description.split('.')[0]}. These events demonstrate why professional disaster recovery services and adequate insurance coverage are essential for ${city} property owners.`,
    });
  }

  // 4. Insurance (always)
  faqs.push({
    question: `How does insurance work for disaster recovery in ${city}?`,
    answer: `We bill you directly — not your insurer — so work begins immediately without waiting for approval. Our contractors provide full claims documentation including photos, moisture reports, scope of works, and completion certificates to support your insurance reimbursement. After the initial make-safe, your contractor provides a formal contract with clear terms. Payment plans are available through Blue Fire Finance (bluefirefinance.com.au).`,
  });

  // 5. Suburb coverage (always)
  const suburbNames = suburbs.slice(0, 8).map(s => s.name);
  faqs.push({
    question: `Which ${city} suburbs do you service?`,
    answer: `We service all suburbs across the ${city} metropolitan area including ${suburbNames.join(', ')}, and more. Our contractor network covers the entire ${stateFullName} region with strategically positioned teams for rapid emergency response.`,
  });

  // 6. Conditional archetype-specific FAQ
  switch (archetype) {
    case 'cyclone-belt':
      faqs.push({
        question: `How do you handle cyclone damage restoration in ${city}?`,
        answer: `Our ${city} contractors are experienced in cyclone damage restoration, including emergency tarping, structural stabilisation, water extraction from storm surge and rainfall ingress, and complete rebuild services. During cyclone season (${climate.cycloneSeason}), we maintain increased staffing levels and pre-positioned equipment across the region.`,
      });
      break;
    case 'high-rainfall':
      faqs.push({
        question: `How do you prevent mould after flooding in ${city}?`,
        answer: `${city}'s subtropical climate (${climate.avgHumidityPercent}% average humidity) means mould can colonise flood-affected properties within 24-48 hours. Our contractors use industrial dehumidification, anti-microbial treatment, and air scrubbing to prevent mould during structural drying. With ${climate.annualRainfallMm}mm annual rainfall, rapid flood response is critical in ${city}.`,
      });
      break;
    case 'bushfire-risk':
      faqs.push({
        question: `What bushfire damage services do you offer in ${city}?`,
        answer: `Our ${city} contractors provide comprehensive bushfire restoration including emergency make-safe, smoke and soot damage remediation, structural assessment, odour elimination, and complete rebuild services. Properties in areas rated ${data.risks.bushfireAttackLevel} require specialist assessment for hidden damage from radiant heat and ember attack.`,
      });
      break;
    default:
      faqs.push({
        question: `What types of disaster damage do you repair in ${city}?`,
        answer: `Our ${city} network handles water damage restoration, fire and smoke damage, mould remediation, storm damage repair, flood recovery, sewage cleanup, biohazard decontamination, and trauma scene restoration. All contractors are IICRC-certified with current ${stateFullName} licences. No job is too large or too small.`,
      });
  }

  return faqs;
}
