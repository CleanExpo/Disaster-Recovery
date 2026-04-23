/**
 * NOT LEGAL ADVICE — v1 prompt; review before each production deploy.
 *
 * Sarah RAG knowledge base — PUBLIC CONTENT ONLY.
 *
 * =============================================================================
 * THE PUBLIC-ONLY RULE
 * =============================================================================
 * Every entry in SARAH_KB must be classifiable as `PUBLIC` under the 5-class
 * data taxonomy (PUBLIC / CUSTOMER_TO_CUSTOMER / INTERNAL / CONFIDENTIAL /
 * SECRET). That means:
 *
 *   - It appears (or could appear) on disasterrecovery.com.au without review.
 *   - It contains no contractor names, ABNs, licence numbers, or per-suburb
 *     counts.
 *   - It discloses no commission, fee model, or partner finance terms
 *     (Equipped Commercial Finance or otherwise).
 *   - It references no internal systems, SOPs, databases, or infrastructure.
 *   - It contains no data about any specific customer, claim, or call.
 *   - It makes no insurance, legal, tax, or financial promises.
 *
 * Before adding a new entry:
 *   1. Read `docs/voice-kb-review/index.md` and walk the checklist.
 *   2. Confirm the source_url (if any) is a live public page or a marketing
 *      asset that has been cleared for external use.
 *   3. Cross-check every factual claim against the DR-705 substantiation
 *      register.
 *   4. Open a PR — CODEOWNERS on `/src/lib/voice/` must approve.
 *
 * If you are even mildly uncertain whether something is PUBLIC — don't add it.
 * The tool boundary is our last line of defence; the KB is the first. Keep
 * it clean.
 * =============================================================================
 */

export type SarahKnowledgeEntry = {
  id: string;
  title: string;
  content: string;
  source_url?: string;
  data_class: 'PUBLIC';
};

export const SARAH_KB: SarahKnowledgeEntry[] = [
  {
    id: 'services-overview',
    title: 'Services we help with',
    content:
      "Disaster Recovery Australia arranges restoration work for eight categories of property damage: water damage, fire and smoke damage, mould remediation, storm damage, flood damage, biohazard cleanup, sewage cleanup, and trauma scene cleaning. Every job is triaged by our intake team and matched to an IICRC-certified contractor in the caller's area. Sarah's role on the phone is simply to capture enough detail to lodge a claim and send a secure link for the caller to review and e-sign on their own device. The contractor handles on-site assessment, scoping, and pricing directly with the property owner.",
    source_url: 'https://disasterrecovery.com.au/services',
    data_class: 'PUBLIC',
  },
  {
    id: 'service-water-damage',
    title: 'Water damage restoration',
    content:
      "Water damage covers burst pipes, failed hot water systems, leaking appliances, roof leaks during rain, and rising damp. An IICRC-certified technician will attend, extract standing water, set up air movers and dehumidifiers, and monitor moisture readings until the structure is dry. Prompt response within the first 24 to 48 hours substantially reduces the risk of secondary mould growth. We do not quote prices over the phone — the attending contractor provides a scope after an on-site assessment.",
    source_url: 'https://disasterrecovery.com.au/services/water-damage-restoration',
    data_class: 'PUBLIC',
  },
  {
    id: 'service-fire-damage',
    title: 'Fire and smoke damage restoration',
    content:
      "Fire damage work includes soot removal, odour neutralisation, content cleaning, and structural restoration after a house, kitchen, or electrical fire. Smoke residues are acidic and can continue to corrode surfaces if left untreated, so early assessment matters. All attending contractors are IICRC-certified in Fire and Smoke Restoration (FSRT). If the fire service is still on-site or the property is not yet safe to enter, the caller should wait for clearance from emergency services before we send a contractor.",
    source_url: 'https://disasterrecovery.com.au/services/fire-damage-restoration',
    data_class: 'PUBLIC',
  },
  {
    id: 'service-mould',
    title: 'Mould remediation',
    content:
      "Mould remediation follows the IICRC S520 standard. The contractor will identify the moisture source, contain the affected area, remove contaminated materials, HEPA-vacuum and damp-wipe surfaces, and verify clearance before rebuild. Visible mould growth larger than about one square metre generally warrants professional remediation rather than DIY cleaning, especially for anyone with asthma, allergies, or a compromised immune system. Sarah does not provide health advice — callers with symptoms should speak to their GP.",
    source_url: 'https://disasterrecovery.com.au/services/mould-remediation',
    data_class: 'PUBLIC',
  },
  {
    id: 'service-storm-flood',
    title: 'Storm and flood damage',
    content:
      "Storm damage covers wind-driven rain intrusion, fallen tree impact, and roof damage from hail. Flood damage covers water ingress from external sources — rising rivers, flash flooding, stormwater backup — and is handled as IICRC Category 3 water (unsanitary) until proven otherwise. The first steps are making the property safe, tarping or boarding up openings, and beginning controlled drying. Document damage with photos before any cleanup where it is safe to do so.",
    source_url: 'https://disasterrecovery.com.au/services/storm-damage-restoration',
    data_class: 'PUBLIC',
  },
  {
    id: 'service-biohazard-sewage-trauma',
    title: 'Biohazard, sewage, and trauma scene cleaning',
    content:
      "Biohazard work covers blood, bodily fluids, needles, and hoarding environments. Sewage cleanup covers sewer backups, toilet overflows, and Category 3 water contamination. Trauma scene cleaning covers unattended death, crime scenes, and accident sites. All three require specialist PPE, containment, and disposal, and are performed by IICRC-certified technicians with biohazard endorsements. For trauma scene callers, Sarah captures the minimum necessary detail, treats the call with care, and offers to escalate to a human operator at any time.",
    source_url: 'https://disasterrecovery.com.au/services/biohazard-cleaning',
    data_class: 'PUBLIC',
  },
  {
    id: 'availability-247',
    title: 'How 24/7 availability works',
    content:
      "Our claim intake line runs 24 hours a day, seven days a week, including public holidays. Sarah can lodge a claim at any hour. On-site attendance time is separate from intake time and depends on location, conditions, and contractor availability. Metropolitan areas are generally prioritised because the network has more contractors nearby; regional and remote areas can take longer, especially during widespread storm or flood events when many properties are affected at once. Sarah will never promise a specific attendance time on the phone — the attending contractor confirms a window directly with the caller.",
    source_url: 'https://disasterrecovery.com.au',
    data_class: 'PUBLIC',
  },
  {
    id: 'iicrc-certification',
    title: 'What IICRC certification means',
    content:
      "IICRC stands for the Institute of Inspection, Cleaning and Restoration Certification. It is the internationally recognised standards body for the restoration industry. Every contractor in our network holds current IICRC certification in the categories relevant to the work they perform — for example WRT (Water Damage Restoration Technician), ASD (Applied Structural Drying), AMRT (Applied Microbial Remediation), or FSRT (Fire and Smoke Restoration Technician). Certification is renewed on the IICRC schedule and is a prerequisite for being accepted into our network. Sarah does not use the phrase 'insurance approved' because no private contractor network is a regulator — 'IICRC-certified' is the accurate description.",
    source_url: 'https://disasterrecovery.com.au/guides/certifications',
    data_class: 'PUBLIC',
  },
  {
    id: 'claim-intake-process',
    title: 'What happens after you lodge a claim',
    content:
      "On the phone, Sarah captures six things: name, mobile, email, postcode, damage type, and a short description of what has happened. She then creates a draft claim and sends an SMS with a secure short-link. On the caller's device, they review the draft, correct anything, and e-sign. The claim is then triaged by our intake team and matched to an IICRC-certified contractor in the area. The contractor calls the property owner to arrange an on-site assessment and provides a scope of works and an estimate directly. Sarah does not provide estimates, quotes, or insurance-outcome predictions on the phone.",
    source_url: 'https://disasterrecovery.com.au/how-it-works',
    data_class: 'PUBLIC',
  },
  {
    id: 'coverage-areas',
    title: 'Where we cover',
    content:
      "The network covers Australian capital cities and surrounding metropolitan areas — Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart, and Darwin — plus major regional centres across New South Wales, Victoria, Queensland, Western Australia, South Australia, and Tasmania. We also arrange work in the main New Zealand metros: Auckland, Wellington, and Christchurch. Coverage in any specific suburb is confirmed by the lookup_coverage tool when the caller provides a postcode. Sarah does not discuss contractor density, counts per suburb, or specific contractor identities — only whether we can arrange a response in that postcode.",
    source_url: 'https://disasterrecovery.com.au/locations',
    data_class: 'PUBLIC',
  },
  {
    id: 'what-sarah-does-not-do',
    title: 'What Sarah does not do',
    content:
      "Sarah does not provide insurance advice, does not predict whether a claim will be approved, does not estimate payout amounts or timelines, does not quote repair costs, does not discuss specific contractors by name, and does not transfer the caller to a specific contractor. Sarah does not take card payments on the phone. If the caller needs any of those things, Sarah offers to hand over to a human operator via the escalate_to_human tool. For anything outside lodging a claim, the canonical refusal line is used.",
    data_class: 'PUBLIC',
  },
  {
    id: 'emergency-000',
    title: 'Life safety — call triple zero first',
    content:
      "If the caller describes an active fire, structural collapse, injury, entrapment, active flooding with people inside the property, an electrical hazard in contact with water, or a gas leak, Sarah says: 'Please hang up and dial triple zero now, then call us back once everyone is safe.' She then escalates to a human operator. Property restoration is important, but it comes after life safety. This instruction applies even if the caller insists on continuing with the claim.",
    data_class: 'PUBLIC',
  },
  {
    id: 'privacy-recording',
    title: 'Privacy and call recording',
    content:
      "Under Australian Privacy Principle 8, callers are informed at the start of every call that the conversation is recorded for quality and compliance purposes and that a brief written transcript may be retained for a limited period. The caller can ask for the call to end at any time. Personal information captured (name, contact details, property postcode, damage description) is used to create the claim and is handled under the Disaster Recovery Australia Privacy Policy published at disasterrecovery.com.au/privacy. Sarah does not recite the full Privacy Policy on the phone — she confirms consent and points the caller to the URL if they want the detail.",
    source_url: 'https://disasterrecovery.com.au/privacy',
    data_class: 'PUBLIC',
  },
  {
    id: 'pricing-on-phone',
    title: 'Why we do not quote prices on the phone',
    content:
      "Restoration scope depends on what the attending contractor finds on-site: category of water, extent of affected materials, drying time, access, contents handling, and rebuild requirements. Quoting over the phone would either be wrong or would lock the caller into a number that does not reflect the actual work. The contractor who attends provides a written scope and an estimate directly. If the caller wants a general sense of what similar jobs cost, Sarah can point them to the published cost guides at disasterrecovery.com.au/guides/cost rather than guessing on the call.",
    source_url: 'https://disasterrecovery.com.au/guides/cost',
    data_class: 'PUBLIC',
  },
  {
    id: 'human-handover',
    title: 'Asking for a human',
    content:
      "A caller can ask for a human operator at any point in the call, for any reason, without explanation. Sarah calls escalate_to_human immediately and stays on the line with the caller until the handover connects. Sarah also escalates proactively if the caller sounds distressed, confused, or is describing something that sits outside the claim intake workflow. There is no penalty for escalating — better a human call than a misled caller.",
    data_class: 'PUBLIC',
  },
];
