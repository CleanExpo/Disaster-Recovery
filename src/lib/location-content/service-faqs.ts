// Default FAQ data for the top 5 service types
// Used by LocationServiceGenerator when city-specific data is not available
// All answers are CLAUDE.md compliant (client-direct billing model)

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export type ServiceFAQGenerator = (city: string, suburb?: string) => ServiceFAQ[];

const locationText = (city: string, suburb?: string) => suburb || city;
const areaText = (city: string, suburb?: string) =>
  suburb ? `${suburb} and surrounding ${city} suburbs` : `${city} and all suburbs`;

export const serviceFAQs: Record<string, ServiceFAQGenerator> = {
  'water-damage-restoration': (city, suburb) => [
    {
      question: `How quickly can you respond to water damage in ${locationText(city, suburb)}?`,
      answer: `Our IICRC-certified contractor network provides 60-minute emergency response across ${areaText(city, suburb)}. Submit your claim online at disasterrecovery.com.au and receive confirmed contractor quotes within minutes. On-site water extraction and drying begins immediately on arrival.`,
    },
    {
      question: `How long does structural drying take after water damage in ${locationText(city, suburb)}?`,
      answer: `Professional structural drying typically takes 3 to 5 days using commercial-grade dehumidifiers and air movers. Severe flooding may take 7 to 10 days. Technicians take daily moisture readings to confirm the structure reaches its dry standard before any rebuild work begins.`,
    },
    {
      question: `Does insurance cover water damage restoration in ${locationText(city, suburb)}?`,
      answer: `Most Australian home insurance policies cover sudden water damage from burst pipes, appliance leaks, and storm events. We bill you directly so work begins immediately — no waiting for insurer approval. Our contractors provide full claims documentation including photos, moisture logs, and scope of works to support your insurance reimbursement.`,
    },
    {
      question: `What should I do immediately after water damage in ${locationText(city, suburb)}?`,
      answer: `Turn off the water source if safe to do so. Move valuables to dry areas and photograph all damage for insurance. Do not use electrical appliances in wet areas. Lodge your claim at disasterrecovery.com.au for emergency contractor response — mould can begin growing within 24 to 48 hours in Australian conditions.`,
    },
    {
      question: `Can you save water-damaged carpet and flooring in ${locationText(city, suburb)}?`,
      answer: `Category 1 water damage (clean water from burst pipes) can often be dried in-situ within 48 hours. Category 2 or 3 contaminated water usually requires carpet and underlay removal. Our technicians assess the water category and contamination level on-site to determine the most cost-effective restoration approach.`,
    },
    {
      question: `Are your ${locationText(city, suburb)} water damage technicians certified?`,
      answer: `Every contractor in our network holds current IICRC Water Restoration Technician (WRT) certification, carries minimum $20 million public liability insurance, and maintains relevant state trade licences. All work follows IICRC S500 standard for professional water damage restoration.`,
    },
  ],

  'fire-damage-restoration': (city, suburb) => [
    {
      question: `How quickly can you respond to fire damage in ${locationText(city, suburb)}?`,
      answer: `Our emergency response network provides 60-minute arrival for fire damage make-safe across ${areaText(city, suburb)}. Initial services include board-up, tarping, and securing the property against further damage. Full fire restoration begins once the fire service clears the property for entry.`,
    },
    {
      question: `Can a fire-damaged house in ${locationText(city, suburb)} be fully restored?`,
      answer: `Yes, most fire-damaged properties can be restored to pre-loss condition. Professional fire restoration involves make-safe and board-up, soot and smoke removal from all surfaces, contents pack-out and specialist cleaning, odour elimination using thermal fogging and ozone treatment, and complete structural rebuild. The process typically takes 2 to 6 weeks depending on severity.`,
    },
    {
      question: `How do you remove smoke odour after a fire in ${locationText(city, suburb)}?`,
      answer: `Smoke odour removal requires a multi-stage approach: surface soot removal, chemical cleaning of all affected surfaces, thermal fogging to penetrate porous materials, ozone treatment for persistent odours, and air scrubbing with HEPA filtration. Simply masking the smell does not work — the soot particles must be physically removed.`,
    },
    {
      question: `Does insurance cover fire restoration in ${locationText(city, suburb)}?`,
      answer: `Most Australian home and contents policies cover fire damage restoration including structural repair, smoke damage, contents cleaning, and temporary accommodation. We bill you directly so emergency make-safe begins immediately. Our contractors provide comprehensive claims documentation including damage assessment, photo evidence, and detailed scope of works.`,
    },
    {
      question: `What happens to my belongings after a fire in ${locationText(city, suburb)}?`,
      answer: `Salvageable contents are professionally packed out, inventoried, and transported to specialist cleaning facilities. Soft furnishings are ultrasonically cleaned, hard goods are hand-cleaned and deodorised, and electronics are assessed by specialists. Unsalvageable items are documented for your insurance claim.`,
    },
    {
      question: `Are your ${locationText(city, suburb)} fire restoration contractors certified?`,
      answer: `All contractors hold IICRC Fire and Smoke Restoration Technician (FSRT) certification, carry minimum $20 million public liability insurance, and maintain current state licences. They follow IICRC S540 standard for professional fire restoration and use equipment that meets Australian safety standards.`,
    },
  ],

  'mould-remediation': (city, suburb) => [
    {
      question: `How do I know if I need professional mould remediation in ${locationText(city, suburb)}?`,
      answer: `Professional remediation is recommended when mould covers more than 1 square metre, is inside wall cavities or HVAC systems, or when occupants experience respiratory symptoms. Visible mould often indicates a larger hidden problem. A qualified mould assessor conducts air quality testing to identify species and contamination levels before remediation begins.`,
    },
    {
      question: `How long does mould remediation take in ${locationText(city, suburb)}?`,
      answer: `Standard residential mould remediation takes 3 to 5 days: day 1 for assessment and containment setup, days 2-3 for removal and treatment, day 4 for HEPA air scrubbing, and day 5 for clearance testing. Larger or multi-room jobs may take longer. The moisture source must be fixed before remediation to prevent recurrence.`,
    },
    {
      question: `Is black mould dangerous in ${locationText(city, suburb)} homes?`,
      answer: `Black mould (Stachybotrys chartarum) produces mycotoxins that can cause respiratory issues, allergic reactions, and other health effects. However, not all dark-coloured mould is Stachybotrys. Professional air quality testing identifies the species present and contamination level. Any mould affecting more than 1 square metre warrants professional assessment regardless of colour.`,
    },
    {
      question: `Does insurance cover mould removal in ${locationText(city, suburb)}?`,
      answer: `Insurance typically covers mould remediation when it results from a covered event (burst pipe, storm damage, flood). Pre-existing or maintenance-related mould is generally excluded. We bill you directly so remediation begins immediately. Our contractors provide full documentation including air quality reports and moisture source identification to support your claim.`,
    },
    {
      question: `How do you prevent mould from coming back after remediation in ${locationText(city, suburb)}?`,
      answer: `Lasting mould prevention requires fixing the moisture source (leak repair, ventilation improvement, waterproofing), maintaining indoor humidity below 60%, ensuring adequate ventilation in wet areas, and applying antimicrobial coatings to treated surfaces. Our contractors identify and document the moisture source as part of every remediation job.`,
    },
    {
      question: `Are your ${locationText(city, suburb)} mould remediation technicians certified?`,
      answer: `All contractors hold IICRC Applied Microbial Remediation (AMRT) certification and follow IICRC S520 standard for professional mould remediation. They carry minimum $20 million public liability insurance and use containment, HEPA filtration, and antimicrobial treatments that meet Australian standards.`,
    },
  ],

  'flood-recovery': (city, suburb) => [
    {
      question: `How quickly can you respond to flooding in ${locationText(city, suburb)}?`,
      answer: `Our emergency flood response network provides 60-minute arrival across ${areaText(city, suburb)}. Initial services include water extraction using truck-mounted pumps, content salvage, and industrial drying equipment deployment. We operate 24/7 including during active flood events when safe to do so.`,
    },
    {
      question: `What is the flood recovery process in ${locationText(city, suburb)}?`,
      answer: `Professional flood recovery follows 5 stages: emergency water extraction, contamination assessment and antimicrobial treatment, structural drying with commercial dehumidifiers and air movers, damage assessment and scope of works, and rebuild or restoration. Category 3 floodwater (sewage-contaminated) requires additional decontamination protocols.`,
    },
    {
      question: `Does insurance cover flood damage in ${locationText(city, suburb)}?`,
      answer: `Flood cover is often a separate add-on to home insurance policies in Australia. Check your Product Disclosure Statement for coverage details. We bill you directly so emergency extraction begins immediately — no waiting for insurer approval. Our contractors provide complete claims documentation including contamination reports, moisture logs, and photographic evidence.`,
    },
    {
      question: `How long does it take to dry a flood-damaged property in ${locationText(city, suburb)}?`,
      answer: `Flood-affected properties typically take 5 to 10 days for structural drying depending on water volume, contamination level, and building materials. Commercial-grade dehumidifiers and air movers run continuously. Technicians take daily moisture readings and adjust equipment placement until the structure reaches its dry standard.`,
    },
    {
      question: `Is flood water contaminated and dangerous in ${locationText(city, suburb)}?`,
      answer: `Floodwater is almost always classified as Category 3 (grossly contaminated) containing sewage, chemicals, and biological hazards. Never wade through floodwater without protective equipment. Professional flood recovery includes antimicrobial treatment, decontamination, and air quality testing to ensure the property is safe for re-occupation.`,
    },
    {
      question: `Are your ${locationText(city, suburb)} flood recovery contractors certified?`,
      answer: `All contractors hold IICRC Water Restoration Technician (WRT) certification with additional flood-specific training. They carry minimum $20 million public liability insurance and follow IICRC S500 and S540 standards. Equipment includes truck-mounted extractors, commercial dehumidifiers, and contamination testing gear.`,
    },
  ],

  'storm-damage-repairs': (city, suburb) => [
    {
      question: `How quickly can you respond to storm damage in ${locationText(city, suburb)}?`,
      answer: `Our emergency storm response provides 60-minute arrival for make-safe across ${areaText(city, suburb)}. Initial services include emergency tarping, board-up, tree removal from structures, and water extraction from storm-related flooding. During major storm events we pre-position crews for rapid deployment.`,
    },
    {
      question: `What storm damage repairs do you handle in ${locationText(city, suburb)}?`,
      answer: `Our contractors handle all storm damage including emergency tarping and board-up, roof repair and replacement, fallen tree removal, hail damage repair, window and door replacement, gutter and downpipe repair, water damage from storm ingress, and structural assessment. No job is too large or too small.`,
    },
    {
      question: `Does insurance cover storm damage in ${locationText(city, suburb)}?`,
      answer: `Most Australian home insurance policies cover storm damage including wind, hail, and rain ingress. We bill you directly so emergency make-safe begins immediately — no waiting for insurer approval. Our contractors provide full claims documentation including damage photos, detailed scope of works, and completion certificates to support your insurance reimbursement.`,
    },
    {
      question: `What should I do immediately after storm damage to my ${locationText(city, suburb)} property?`,
      answer: `Ensure personal safety first — stay away from fallen power lines and structurally damaged areas. Photograph all damage before any cleanup. Cover exposed areas with tarps if safe to do so. Move valuables away from water ingress points. Lodge your claim at disasterrecovery.com.au for 60-minute emergency make-safe response.`,
    },
    {
      question: `Can you do emergency roof tarping in ${locationText(city, suburb)}?`,
      answer: `Yes, emergency roof tarping is one of our most common storm damage services. Our contractors carry heavy-duty UV-stabilised tarps rated for Australian conditions and can secure damaged roofs within hours of arrival. Tarping prevents further water damage while permanent repairs are planned and insurance claims are processed.`,
    },
    {
      question: `Are your ${locationText(city, suburb)} storm damage contractors certified?`,
      answer: `All contractors hold IICRC certification, carry minimum $20 million public liability insurance, and maintain current state building and trade licences. They follow Australian building codes and standards for all structural repairs and provide documentation that meets insurance company requirements.`,
    },
  ],
};

// Fallback for services not in the map (emergency-restoration, etc.)
export const defaultServiceFAQs: ServiceFAQGenerator = (city, suburb) => [
  {
    question: `How quickly can you respond to emergencies in ${locationText(city, suburb)}?`,
    answer: `Our IICRC-certified contractor network provides 60-minute emergency response across ${areaText(city, suburb)}. Submit your claim online at disasterrecovery.com.au and receive confirmed contractor quotes within minutes. We operate 24 hours a day, 7 days a week, including public holidays.`,
  },
  {
    question: `What types of disaster damage do you handle in ${locationText(city, suburb)}?`,
    answer: `Our ${city} contractor network handles water damage restoration, fire and smoke damage, mould remediation, storm damage repair, flood recovery, sewage cleanup, biohazard decontamination, and emergency make-safe. All contractors are IICRC-certified with current state licences. No job is too large or too small.`,
  },
  {
    question: `How does billing and insurance work for disaster recovery in ${locationText(city, suburb)}?`,
    answer: `We bill you directly — not your insurer — so work begins immediately without waiting for approval. Our contractors provide full claims documentation including photos, moisture reports, scope of works, and completion certificates to support your insurance reimbursement. Payment plans are available through Blue Fire Finance.`,
  },
  {
    question: `Are your ${locationText(city, suburb)} contractors certified and insured?`,
    answer: `Every contractor in our network holds current IICRC certification, carries minimum $20 million public liability insurance, and maintains relevant state trade licences. All work follows IICRC standards and produces documentation your insurer will accept.`,
  },
  {
    question: `What areas do you service around ${locationText(city, suburb)}?`,
    answer: `We service all suburbs across the ${city} metropolitan area and surrounding regions. Our contractor network is strategically positioned for rapid emergency response across the entire region. Lodge your claim online to be matched with the nearest available contractor.`,
  },
  {
    question: `Is emergency restoration available 24/7 in ${locationText(city, suburb)}?`,
    answer: `Yes, our emergency response operates 24 hours a day, 7 days a week, including public holidays and during active disaster events. Disasters do not wait for business hours, and neither do our contractors. Submit your claim at any time for immediate contractor matching.`,
  },
];
