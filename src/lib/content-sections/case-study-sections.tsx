import type { ContentSection } from '@/components/antigravity';

interface CaseStudySectionParams {
  incidentName: string;
  details: string;
}

const CASE_STUDY_DATA: Record<string, { challenge: string; response: string; outcome: string; learnings: string }> = {
  'black-summer-bushfires': {
    challenge: 'The 2019–2020 Black Summer bushfires were among the worst in Australian history, burning over 18.6 million hectares across NSW, Victoria, South Australia, and Queensland. Thousands of homes were destroyed or damaged, and entire communities needed comprehensive restoration support across multiple states simultaneously.',
    response: 'Our network mobilised over 100 contractors across four states, establishing forward operating bases near affected communities. Teams provided emergency board-up, smoke and soot damage restoration, structural assessment, contents salvage, and full rebuilding services. Coordination with NRMA, Suncorp, IAG, and other major insurers enabled rapid claims processing for affected policyholders.',
    outcome: 'Over 18 months, our teams restored hundreds of properties from minor smoke damage to complete rebuilds. Response times in affected areas were maintained at under 24 hours despite the unprecedented scale. Comprehensive documentation protocols helped streamline insurance claims processing for affected policyholders.',
    learnings: 'The Black Summer response demonstrated the critical importance of a nationwide contractor network that can surge capacity during large-scale events. It also highlighted the need for pre-positioned equipment and established insurer relationships to expedite claims during disasters affecting thousands of properties simultaneously.',
  },
  'brisbane-floods-2022': {
    challenge: 'In February 2022, South East Queensland experienced catastrophic flooding when an east coast low delivered record rainfall across Brisbane, the Gold Coast, and surrounding areas. Thousands of homes and businesses were inundated, many for the second time following the 2011 floods, creating massive demand for water extraction, drying, and restoration services.',
    response: 'Our Queensland network activated emergency protocols within hours of the flood peak, deploying teams to the worst-affected suburbs including Rocklea, Graceville, Oxley, and Auchenflower. Emergency water extraction began immediately, followed by industrial drying, mould prevention treatment, and structural assessment. We coordinated closely with Suncorp, RACQ, and other Queensland-based insurers.',
    outcome: 'Our teams restored over 200 flood-affected properties across greater Brisbane and the Gold Coast within a 6-month period. Early intervention within 48 hours significantly reduced the risk of mould growth across restored properties. Insurance claims were processed with streamlined approval through established insurer relationships.',
    learnings: 'The 2022 Brisbane floods reinforced the importance of rapid deployment — properties where restoration began within 48 hours had significantly lower total damage and costs. It also demonstrated that pre-existing insurer relationships are critical during large-scale events when claims volumes overwhelm standard processing capacity.',
  },
  'cyclone-debbie-recovery': {
    challenge: 'Cyclone Debbie made landfall near Airlie Beach, Queensland in March 2017 as a severe Category 4 system, before tracking south and causing widespread flooding across South East Queensland and northern NSW. Wind damage, flooding, and storm surge affected thousands of properties from the Whitsundays to the Northern Rivers region.',
    response: 'Our contractor network deployed across three regions simultaneously: Airlie Beach and the Whitsundays (wind damage), Mackay and Rockhampton (flooding), and the Gold Coast to Lismore corridor (flooding). Emergency teams provided roof tarping, water extraction, structural stabilisation, and contents salvage. Remote area deployments required self-sufficient teams with portable equipment.',
    outcome: 'Restoration was completed across all affected regions within 8 months. Emergency tarping prevented secondary water damage to hundreds of wind-damaged properties in the Whitsundays. Flood-affected properties in the Gold Coast hinterland received priority response due to access difficulties that delayed other contractors.',
    learnings: 'Cyclone Debbie highlighted the challenge of multi-region events requiring simultaneous deployment across thousands of kilometres. Self-sufficient mobile teams with portable equipment proved essential for remote locations. The event also demonstrated the value of storm-season preparedness, including pre-positioned tarping materials and dewatering equipment.',
  },
  'sydney-storms-2021': {
    challenge: 'In March 2021, a series of intense low-pressure systems brought record-breaking rainfall to the Greater Sydney region, causing widespread flooding across Western Sydney, the Hawkesbury-Nepean Valley, and parts of the Central Coast. Thousands of properties experienced water damage ranging from minor roof leaks to complete inundation.',
    response: 'Our NSW teams activated emergency protocols as the rain system approached, pre-positioning equipment in Western Sydney and the Hawkesbury region. Emergency response focused on water extraction, emergency pumping, and roof tarping to prevent ongoing ingress. Full restoration teams followed within 24 hours of floodwaters receding in each area.',
    outcome: 'Over 150 properties were restored across greater Sydney and the Central Coast. Early pre-positioning of equipment in high-risk areas enabled response times under 4 hours for priority emergencies. Collaboration with NRMA, GIO, and Allianz streamlined claims for the majority of affected policyholders.',
    learnings: 'The 2021 Sydney storms demonstrated the effectiveness of proactive deployment based on weather forecasting. Pre-positioning equipment before the event hit enabled faster response than reactive deployment. It also showed that urban flooding in established suburbs creates complex restoration challenges involving heritage properties, strata buildings, and mixed-use developments.',
  },
  'townsville-floods-2019': {
    challenge: 'In late January and early February 2019, Townsville experienced unprecedented monsoonal flooding when over 1,100mm of rain fell in less than a week. The controlled release of Ross River Dam exacerbated flooding, with over 3,000 homes inundated across Townsville suburbs including Aitkenvale, Idalia, Rosslea, and Railway Estate.',
    response: 'Our North Queensland contractors activated within hours, joined by surge teams deployed from Brisbane and Cairns. Initial response focused on emergency water extraction from severely inundated properties, followed by demolition of water-damaged materials, industrial drying, and mould prevention. Teams worked around the clock in extreme heat and humidity conditions.',
    outcome: 'Our network restored over 100 properties in the Townsville region over a 4-month period. The combination of extreme heat and contaminated floodwater created aggressive mould growth conditions, making rapid intervention critical. Properties where restoration began promptly experienced significantly lower overall costs compared to delayed-response properties.',
    learnings: 'The Townsville floods demonstrated the unique challenges of tropical flood restoration — extreme heat accelerates mould growth, contaminated floodwater requires Category 3 protocols, and remote location logistics complicate equipment and material supply chains. It reinforced the need for regional contractor networks and climate-appropriate restoration protocols.',
  },
};

export function getCaseStudySections({ incidentName, details }: CaseStudySectionParams): ContentSection[] {
  const slug = incidentName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const data = CASE_STUDY_DATA[slug];

  if (!data) {
    return [
      {
        heading: `${incidentName} — Case Study`,
        body: (
          <>
            <p>
              {details ? `${details} ` : ''}This case study examines how our disaster recovery
              network responded to a significant event, detailing the challenges faced, our response
              approach, the outcomes achieved, and the key learnings that continue to improve our
              services.
            </p>
            <p>
              Every major disaster event teaches us something new and helps us refine our processes
              for better outcomes. These case studies are shared to demonstrate our capabilities and
              provide transparency about how we operate during large-scale events.
            </p>
          </>
        ),
      },
      {
        heading: 'Our Response Approach',
        background: 'light',
        body: (
          <p>
            Our response followed established emergency protocols: rapid assessment, emergency
            stabilisation, detailed documentation, insurer coordination, professional restoration,
            and quality verification. Each phase was managed by experienced project managers
            coordinating certified technicians and specialist equipment.
          </p>
        ),
      },
      {
        heading: 'Key Outcomes',
        body: (
          <p>
            Properties restored to pre-loss condition within established timelines. Insurance
            claims processed efficiently through comprehensive documentation provided to major insurers.
            Quality verification confirmed all restoration met Australian Standards.
          </p>
        ),
      },
    ];
  }

  return [
    {
      heading: 'The Challenge',
      body: (
        <>
          <p>{data.challenge}</p>
          <p>
            Events of this scale test every aspect of a disaster recovery operation — contractor
            availability, equipment logistics, insurer coordination, and project management across
            multiple sites simultaneously.
          </p>
        </>
      ),
    },
    {
      heading: 'Our Response',
      background: 'light',
      body: (
        <>
          <p>{data.response}</p>
          <p>
            Throughout the response, our project management team maintained communication with
            affected property owners, insurers, and local authorities to ensure coordinated and
            efficient restoration across all sites.
          </p>
        </>
      ),
    },
    {
      heading: 'The Outcome',
      body: (
        <>
          <p>{data.outcome}</p>
        </>
      ),
    },
    {
      heading: 'Key Learnings',
      background: 'light',
      body: (
        <>
          <p>{data.learnings}</p>
          <p>
            These learnings have been incorporated into our standard operating procedures and
            contractor training programs, improving our preparedness and response capability for
            future events.
          </p>
        </>
      ),
    },
    {
      heading: 'Need Emergency Help?',
      body: (
        <>
          <p>
            If your property has been affected by a disaster event, our team is ready to help 24/7.
            We respond to emergencies within 60 minutes, work with all major Australian insurers,
            and bill you directly — meaning work begins immediately. We provide all documentation for your insurance reimbursement claim.
          </p>
          <p>
            Whether it is a single property or a large-scale event, our nationwide contractor
            network has the capacity, equipment, and expertise to restore your property to pre-loss
            condition.
          </p>
        </>
      ),
    },
  ];
}
