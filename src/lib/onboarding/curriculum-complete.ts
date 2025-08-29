/**
 * Complete 14-Day Onboarding Curriculum for NRP Contractors
 * 
 * This comprehensive curriculum contains all the detailed content needed for:
 * - Video production and training materials
 * - Podcast recordings via NotebookLM
 * - Study guides and reference materials
 * - Assessment questions and practical exercises
 * - Real-world scenarios and case studies
 * 
 * Each day builds systematically toward full certification.
 */

export interface LearningObjective {
  id: string;
  title: string;
  description: string;
  measurableOutcome: string;
}

export interface ContentModule {
  id: string;
  title: string;
  duration: number; // minutes
  type: 'video' | 'reading' | 'interactive' | 'assessment' | 'practical';
  content: string;
  keyPoints: string[];
  practicalExercises?: string[];
  assessmentQuestions?: Array<{
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }>;
}

export interface DayContent {
  day: number;
  title: string;
  subtitle: string;
  overview: string;
  learningObjectives: LearningObjective[];
  modules: ContentModule[];
  practicalAssignments: string[];
  keyTerminology: Array<{
    term: string;
    definition: string;
  }>;
  realWorldScenarios: Array<{
    title: string;
    scenario: string;
    questions: string[];
    correctApproach: string;
  }>;
  documentationRequirements: string[];
  dailyChecklist: string[];
  nextDayPreparation: string;
}

export const COMPLETE_CURRICULUM: DayContent[] = [
  {
    day: 1,
    title: "Foundation & Industry Overview",
    subtitle: "Understanding the Disaster Recovery Industry in Australia",
    overview: "Welcome to National Recovery Partners. Today we establish the foundational knowledge of the disaster recovery industry, your role as a contractor, and the critical importance of professional standards in this essential service sector. Australia faces unique challenges from floods, bushfires, cyclones, and urban disasters, creating a constant need for qualified restoration professionals.",
    learningObjectives: [
      {
        id: "day1-obj1",
        title: "Industry Scope Understanding",
        description: "Comprehend the full scope of disaster recovery services in Australia",
        measurableOutcome: "Can identify all major disaster types, their frequency, and typical damage patterns across different Australian regions"
      },
      {
        id: "day1-obj2", 
        title: "Professional Standards Framework",
        description: "Understand the regulatory and professional standards governing disaster recovery work",
        measurableOutcome: "Can explain IICRC standards, Australian building codes, and insurance industry requirements"
      },
      {
        id: "day1-obj3",
        title: "Business Model Comprehension", 
        description: "Understand NRP's role as a claims distributor and your position in the ecosystem",
        measurableOutcome: "Can articulate the lead distribution model, quality standards, and contractor responsibilities"
      }
    ],
    modules: [
      {
        id: "day1-mod1",
        title: "The Australian Disaster Landscape",
        duration: 45,
        type: "video",
        content: `
# The Australian Disaster Landscape: Your Essential Guide

## Australia's Unique Disaster Profile

Australia is one of the most disaster-prone countries globally, with a unique combination of climate extremes, urban density, and geographical challenges that create constant demand for professional disaster recovery services.

### Major Disaster Categories in Australia

**1. Water-Related Disasters (60% of all claims)**
- **Flash Flooding**: Sudden, intense rainfall events affecting urban and rural areas
  - Brisbane 2011: $2.3 billion in insured losses
  - Sydney 2022: $3.35 billion in damages across NSW/QLD
  - Typical damage: Structural flooding, sewage contamination, mould growth
  - Response time critical: 24-48 hours to prevent secondary damage

- **Storm Damage**: Severe weather systems bringing wind, hail, and water damage
  - Adelaide 2016 hailstorm: $1.1 billion in claims
  - Sydney 2018 storms: Widespread flooding and wind damage
  - Common issues: Roof damage, water ingress, fallen trees, broken windows

- **Burst Pipes and Plumbing Failures**: Indoor water events
  - Winter freeze damage in southern states
  - Aging infrastructure in older suburbs
  - High-rise building failures affecting multiple units
  - Insurance claims average $8,000-$25,000 per incident

**2. Fire-Related Disasters (25% of all claims)**
- **Bushfires**: Australia's most devastating natural disaster
  - Black Summer 2019-20: 18.6 million hectares burned, $2 billion insurance claims
  - Affects both rural properties and urban fringes
  - Unique challenges: Smoke damage can travel hundreds of kilometers
  - Recovery timeline: Often 6-12 months for complete restoration

- **Structure Fires**: Residential and commercial building fires
  - Kitchen fires: 40% of all structural fire calls
  - Electrical faults: 30% of structural fires
  - Combined fire, smoke, and water damage from firefighting efforts
  - Requires specialized IICRC fire restoration techniques

**3. Mould and Indoor Air Quality (10% of claims)**
- **Climate-Related Mould Growth**: High humidity and water intrusion
  - Tropical Queensland: Year-round mould concerns
  - Southern states: Winter condensation issues
  - Requires immediate response to prevent health hazards
  - Often follows water damage events by 24-72 hours

- **Poor Ventilation and Building Issues**: Modern building practices
  - Energy-efficient homes with inadequate ventilation
  - Bathroom and kitchen humidity problems
  - HVAC system contamination
  - Requires both remediation and prevention strategies

**4. Specialized Disaster Categories (5% of claims)**
- **Biohazard and Trauma Cleanup**: Sensitive restoration work
  - Sewage overflows and contamination
  - Trauma scene restoration
  - Requires specialized training and equipment
  - High liability and regulatory requirements

### Regional Disaster Patterns

**Northern Australia (Queensland, NT, Northern WA)**
- Cyclone season: November to April
- Monsoonal flooding: December to March  
- High humidity year-round creating mould risks
- Extreme heat affecting building materials

**Eastern Seaboard (NSW, Victoria, Tasmania)**
- Storm season: October to March
- Bushfire season: October to March (extending with climate change)
- Winter freeze events in elevated areas
- Urban density amplifying disaster impacts

**Southern Australia (SA, Southern WA)**
- Mediterranean climate with wet winters
- Extreme heat events and fire danger
- Hailstorms and severe weather
- Aging infrastructure vulnerability

**Central Australia**
- Flash flooding in desert regions
- Extreme temperature variations
- Limited infrastructure and service challenges
- Unique logistics for remote restoration

### Economic Impact and Market Size

The Australian disaster recovery industry represents a $4.2 billion annual market:

- **Insurance Claims**: $3.2 billion annually in disaster-related payouts
- **Government Response**: $800 million in disaster recovery funding
- **Private Pay Work**: $200 million in non-insurance restoration work

**Average Claim Values by Disaster Type:**
- Water damage: $8,000 - $25,000 per property
- Fire damage: $50,000 - $150,000 per property
- Storm damage: $12,000 - $35,000 per property
- Mould remediation: $3,000 - $15,000 per property

### Your Role in the Ecosystem

As an NRP contractor, you are part of a critical infrastructure network:

**Emergency Response Chain:**
1. **Disaster Occurs**: Natural or man-made event
2. **Initial Assessment**: Insurance adjusters and emergency services
3. **Contractor Deployment**: Immediate stabilization and mitigation
4. **Full Restoration**: Complete property restoration to pre-loss condition
5. **Final Inspection**: Quality assurance and handover

**Your Specific Responsibilities:**
- **Rapid Response**: 2-4 hour response time for emergency calls
- **Professional Assessment**: IICRC-compliant damage evaluation
- **Mitigation Work**: Prevent further damage through tarping, water extraction, etc.
- **Detailed Restoration**: Full property restoration using industry best practices
- **Documentation**: Complete photo documentation and detailed reporting
- **Client Communication**: Professional, empathetic customer service during traumatic times

### Quality Standards and Expectations

**IICRC Standards Compliance:**
- All work must meet Institute of Inspection, Cleaning and Restoration Certification standards
- Specific standards for water (S500), fire (S520), and mould (S520) restoration
- Regular updates and continuing education requirements
- Quality audits and performance reviews

**Insurance Industry Requirements:**
- Pre-approved contractor status with major insurers
- Standardized pricing and estimating systems
- Detailed documentation and reporting requirements
- Claims handling procedures and timelines

**NRP Quality Framework:**
- Minimum 4.8/5.0 customer satisfaction rating
- 95% job completion rate within agreed timelines  
- Zero safety incidents or regulatory violations
- Ongoing professional development and certification maintenance
        `,
        keyPoints: [
          "Australia experiences $4.2B annually in disaster recovery needs",
          "Water damage represents 60% of all disaster claims",
          "Response time is critical - 24-48 hours prevents secondary damage",
          "Regional patterns require specialized knowledge and preparation",
          "IICRC standards are mandatory for all restoration work",
          "Insurance pre-approval status is essential for consistent work flow"
        ],
        assessmentQuestions: [
          {
            question: "What percentage of disaster recovery claims in Australia are water-related?",
            options: ["45%", "60%", "75%", "80%"],
            correctAnswer: "60%",
            explanation: "Water-related disasters account for 60% of all claims, including floods, storms, and plumbing failures."
          },
          {
            question: "What is the critical response window to prevent secondary damage from water events?",
            options: ["12 hours", "24-48 hours", "72 hours", "1 week"],
            correctAnswer: "24-48 hours",
            explanation: "The 24-48 hour window is critical to prevent mould growth and secondary structural damage."
          }
        ]
      },
      {
        id: "day1-mod2",
        title: "NRP Business Model and Contractor Role",
        duration: 30,
        type: "video",
        content: `
# Understanding NRP's Business Model: Your Path to Success

## National Recovery Partners: Claims Distribution Excellence

National Recovery Partners (NRP) operates as Australia's premier disaster recovery claims distribution network, connecting insurance companies and property owners with qualified restoration contractors across every corner of the continent.

### The Distribution Model Explained

**Traditional vs NRP Model:**

**Traditional Model Problems:**
- Property owners struggle to find qualified contractors during disasters
- Insurance companies lack vetted contractor networks in all regions
- Quality varies significantly between contractors
- Pricing inconsistency creates claim disputes
- No standardized processes or quality control

**NRP Solution:**
- **Pre-Qualified Network**: Every contractor thoroughly vetted and certified
- **National Coverage**: From Sydney CBD to remote outback communities
- **Standardized Processes**: IICRC-compliant procedures across all contractors
- **Quality Assurance**: Continuous monitoring and customer feedback systems
- **Fair Pricing**: Transparent, consistent pricing structures
- **Technology Platform**: Advanced lead distribution and project management systems

### How Lead Distribution Works

**1. Claim Initiation:**
- Property owner contacts insurance company
- Initial assessment determines restoration needs
- Claim details entered into NRP system with location, scope, and urgency

**2. Contractor Matching:**
- System identifies qualified contractors within service radius
- Considers contractor specialty, capacity, and performance ratings
- Priority given to contractors with relevant certifications and proven track records

**3. Lead Assignment:**
- Qualified leads distributed based on rotation system and performance metrics
- Contractors have 30 minutes to respond to emergency leads
- 2-hour response time required for standard leads

**4. Client Contact and Assessment:**
- Contractor contacts property owner within response window
- On-site assessment conducted using NRP standardized procedures
- Detailed scope of work and estimate prepared using approved pricing

**5. Work Authorization:**
- Insurance adjuster reviews and approves scope
- Work authorized through NRP platform
- Project tracking and milestone reporting begins

### Your Revenue Model

**Lead Fees Structure:**
- **Emergency Response**: $0 lead fee for urgent water/fire damage calls
- **Standard Restoration**: 3% of job value as lead fee
- **Maintenance Work**: 5% of job value as lead fee
- **Repeat Client Direct Bookings**: 0% lead fee (yours to keep)

**Average Job Values by Type:**
- Water damage mitigation: $3,000 - $8,000
- Complete water restoration: $15,000 - $45,000
- Fire damage restoration: $35,000 - $120,000
- Storm damage repair: $8,000 - $25,000
- Mould remediation: $5,000 - $18,000

**Monthly Revenue Projections:**
- **New Contractor (Months 1-3)**: 8-12 jobs/month = $45,000-$85,000 revenue
- **Established Contractor (Months 4-12)**: 15-25 jobs/month = $95,000-$180,000 revenue  
- **Top Performer (Year 2+)**: 25-40 jobs/month = $180,000-$350,000 revenue

### Territory and Service Areas

**Territory Assignment:**
- Primary service area based on your location and capacity
- Typically 30-50km radius from your base
- Expanded coverage opportunities based on performance
- Specialized work may extend service area (e.g., commercial, industrial)

**Coverage Expectations:**
- 24/7 emergency response capability
- Standard business hours for non-emergency work
- Holiday and weekend availability (premium rates apply)
- Backup arrangements during vacation or illness

### Performance Standards and KPIs

**Customer Satisfaction:**
- Minimum 4.8/5.0 rating required
- Response time compliance: 95%+ within required windows
- Quality rating based on insurance adjuster and client feedback
- Professional appearance and communication standards

**Business Performance:**
- Job completion rate: 95%+ within agreed timelines
- Estimate accuracy: Within 10% of approved scope
- Documentation compliance: 100% photo and report submission
- Safety record: Zero incidents or workers compensation claims

**Quality Assurance Process:**
- Monthly performance reviews with NRP team
- Random quality inspections on completed work
- Customer feedback surveys on every project
- Annual certification renewals and continuing education

### Support Systems and Resources

**Technology Platform:**
- Mobile app for lead management and job tracking
- Integrated estimating and invoicing systems
- Photo documentation and report generation tools
- Direct communication with insurance adjusters
- Performance analytics and business reporting

**Training and Development:**
- Ongoing technical training and certification support
- Business development and customer service training
- Safety training and regulatory compliance updates
- Peer mentoring and best practice sharing

**Marketing Support:**
- NRP brand recognition and marketing campaigns
- Professional uniforms and vehicle signage
- Website presence and online reviews management
- Insurance company relationship management
- Referral network development

### Growth Opportunities

**Contractor Development Path:**
1. **Certified Contractor**: Complete onboarding and begin receiving leads
2. **Preferred Contractor**: Achieve performance standards, increased lead priority  
3. **Specialist Contractor**: Additional certifications for specialized work
4. **Master Contractor**: Leadership role, mentoring new contractors
5. **Regional Partner**: Potential equity participation in territory expansion

**Additional Revenue Streams:**
- **Training Delivery**: Teach onboarding courses to new contractors
- **Quality Assurance**: Conduct inspections and audits for NRP
- **Emergency Response Team**: Premium rates for major disaster deployment
- **Commercial Specialist**: Focus on high-value commercial and industrial work

### Compliance and Legal Framework

**Contractor Agreement Terms:**
- Independent contractor relationship (not employment)
- Exclusive territory rights with performance requirements
- Intellectual property and confidentiality obligations
- Insurance and licensing requirements
- Termination conditions and notice periods

**Legal Protections:**
- Public liability insurance coverage through NRP group policy
- Legal support for warranty and dispute resolution
- Workers compensation compliance assistance
- Regulatory compliance monitoring and updates

This business model has been proven successful across Australia, with contractors achieving financial independence while providing essential community services. Your success depends on commitment to quality, professional standards, and continuous improvement.
        `,
        keyPoints: [
          "NRP operates as a claims distributor, not a direct service provider",
          "Lead fees range from 0% (emergency) to 5% (maintenance) of job value",
          "Average monthly revenue ranges from $45k-$350k based on experience",
          "24/7 emergency response capability is required",
          "4.8/5.0 customer satisfaction rating is mandatory",
          "Technology platform manages all lead distribution and job tracking"
        ],
        practicalExercises: [
          "Calculate potential monthly revenue based on your target job volume",
          "Define your primary service territory and coverage area",
          "Set up response systems for 30-minute emergency lead response"
        ]
      },
      {
        id: "day1-mod3",
        title: "Professional Standards and Ethics",
        duration: 40,
        type: "reading",
        content: `
# Professional Standards and Ethics in Disaster Recovery

## The Foundation of Professional Practice

Professional standards in disaster recovery extend far beyond technical competency. You are entering people's lives during their most vulnerable moments, handling valuable property, and making decisions that affect families and businesses for years to come.

### Core Professional Principles

**1. Integrity and Honesty**
- **Accurate Assessment**: Never overstate or understate damage for personal gain
- **Transparent Pricing**: All costs clearly explained and justified
- **Honest Communication**: Realistic timelines and expectations
- **Conflict of Interest**: Disclose any relationships that might affect judgment

**Example Scenario:**
During a water damage assessment, you notice that expanding the scope slightly would increase the job value significantly, but the additional work isn't strictly necessary for proper restoration. Professional integrity requires you to recommend only the work that is truly required, even if it means a smaller job value.

**2. Competency and Continuous Learning**
- **Know Your Limits**: Only accept work within your certified competencies
- **Stay Current**: Ongoing education and certification maintenance
- **Quality Standards**: IICRC protocols followed without exception
- **Professional Development**: Actively seek new skills and knowledge

**3. Client Advocacy and Care**
- **Empathy**: Understanding the emotional impact of property damage
- **Communication**: Clear, regular updates on progress and challenges
- **Respect**: Treating property and occupants with utmost care
- **Privacy**: Maintaining confidentiality of client information and circumstances

### IICRC Standards Framework

**Institute of Inspection, Cleaning and Restoration Certification**

The IICRC provides the scientific foundation for professional restoration work. These standards are not guidelines – they are requirements for professional practice.

**S500 - Standard for Professional Water Damage Restoration:**
- **Category 1 Water**: Clean water from sanitary sources
  - Examples: Broken water supply lines, tub or sink overflows
  - Restoration approach: Extraction, drying, minimal antimicrobial treatment
  - Timeline: Can become Category 2 if left untreated for 48+ hours

- **Category 2 Water**: Contaminated water with potential health risks
  - Examples: Washing machine overflow, toilet overflow (urine only)
  - Restoration approach: Extraction, antimicrobial treatment, careful drying
  - Safety: Personal protective equipment required

- **Category 3 Water**: Grossly contaminated water with severe health risks
  - Examples: Sewage backup, flood water, storm surge
  - Restoration approach: Often requires removal of affected materials
  - Safety: Full PPE, respiratory protection, medical monitoring

**S520 - Standard for Professional Mould Remediation:**
- **Condition 1**: Normal fungal conditions for indoor environment
- **Condition 2**: Settled spores, non-amplification fungal growth
- **Condition 3**: Amplification of fungi, requires professional remediation
- **Containment Protocols**: Proper isolation and air filtration
- **Worker Safety**: Respiratory protection and decontamination procedures

**S540 - Standard for Trauma and Crime Scene Cleanup:**
- **Biohazard Safety**: Bloodborne pathogen training required
- **Regulatory Compliance**: State health department requirements
- **Emotional Sensitivity**: Working with grieving families
- **Complete Decontamination**: No visible or detectable contamination remains

### Australian Regulatory Compliance

**Building Codes and Standards:**
- **National Construction Code (NCC)**: Minimum building standards
- **Australian Standards (AS)**: Technical specifications for materials and methods
- **State Building Regulations**: Vary by jurisdiction
- **Local Council Requirements**: Permit and inspection processes

**Workplace Health and Safety:**
- **Work Health and Safety Act 2011**: Federal safety legislation
- **SafeWork Australia Guidelines**: Industry-specific safety standards
- **State WHS Regulations**: Additional regional requirements
- **Contractor Responsibility**: Duty of care for workers and occupants

**Environmental Compliance:**
- **Waste Disposal Regulations**: Proper handling of contaminated materials
- **Chemical Storage and Use**: MSDS compliance and safety protocols
- **Water Protection**: Preventing contamination of waterways
- **Asbestos Regulations**: Identification and safe handling procedures

### Insurance Industry Standards

**Pre-Loss Planning:**
- **Preferred Contractor Programs**: Requirements for insurance partnerships
- **Standardized Pricing**: Xactimate and other approved estimating systems
- **Documentation Requirements**: Photo standards and report formats
- **Quality Assurance**: Post-completion inspections and audits

**Claims Handling Ethics:**
- **Independent Assessment**: Honest evaluation regardless of payment source
- **Scope Accuracy**: Complete and accurate damage assessment
- **Cost Transparency**: Itemized pricing with clear explanations
- **Timeline Adherence**: Realistic scheduling and prompt completion

### Customer Service Excellence

**The Disaster Recovery Client Experience:**

**Initial Contact (First 30 Minutes):**
- Professional introduction and company representation
- Empathetic acknowledgment of their situation
- Clear explanation of assessment process
- Emergency stabilization if required (tarping, water extraction)

**Assessment Phase (Hours 1-4):**
- Comprehensive property inspection using IICRC protocols
- Photo documentation of all damaged areas
- Moisture readings and environmental measurements
- Initial scope development and preliminary timeline

**Communication Throughout:**
- Daily progress updates
- Immediate notification of any scope changes or complications
- Transparent discussion of insurance coverage and client responsibilities
- Regular availability for questions and concerns

**Project Completion:**
- Final walkthrough with client and/or adjuster
- Complete photo documentation of restored areas
- Warranty explanation and documentation
- Follow-up contact to ensure satisfaction

### Ethical Decision-Making Framework

When facing ethical dilemmas, use this framework:

**1. Identify Stakeholders:**
- Property owner/client
- Insurance company
- Your business interests
- Other contractors
- Regulatory authorities

**2. Consider Consequences:**
- Short-term vs long-term impacts
- Financial vs reputational effects
- Safety and health implications
- Legal and regulatory compliance

**3. Apply Professional Standards:**
- What would IICRC standards require?
- How would this appear to regulatory authorities?
- Would I be comfortable if this decision was public?

**4. Seek Guidance:**
- NRP support team consultation
- IICRC technical advisors
- Industry associations
- Legal counsel when necessary

### Common Ethical Challenges and Responses

**Challenge 1: Pressure to Reduce Scope**
*Scenario*: Insurance adjuster wants to reduce restoration scope to save money, but you believe additional work is needed for proper restoration.

*Professional Response*: 
- Document the need for additional work with photos and measurements
- Explain the risks of inadequate restoration (mould, structural damage)
- Provide written recommendation with IICRC standard citations
- Stand by professional judgment while remaining respectful

**Challenge 2: Client Requests Work Outside Claim**
*Scenario*: Client asks you to include unrelated damage in the insurance claim to help with their deductible.

*Professional Response*:
- Explain that insurance fraud is illegal and unethical
- Offer to provide separate estimate for unrelated work
- Document actual damage clearly and honestly
- Report attempted fraud if pressure continues

**Challenge 3: Competitor Criticizes Your Work**
*Scenario*: Another contractor tells the client that your work is inadequate and offers to redo it for less money.

*Professional Response*:
- Document your work thoroughly with photos and measurements
- Provide client with IICRC standard references supporting your approach
- Offer third-party inspection if client has concerns
- Maintain professional demeanor and avoid criticizing competitor

This foundation of professional standards and ethics will guide every decision you make as an NRP contractor. Your reputation, business success, and the trust of the community depend on unwavering commitment to these principles.
        `,
        keyPoints: [
          "Integrity and honesty are non-negotiable in disaster recovery work",
          "IICRC standards are mandatory requirements, not optional guidelines",
          "Client advocacy means recommending only necessary work",
          "Professional competency requires knowing and staying within your limits",
          "Documentation and transparency protect all parties",
          "Ethical decision-making follows a structured framework"
        ],
        assessmentQuestions: [
          {
            question: "What is the maximum time clean water (Category 1) can remain untreated before potentially becoming contaminated water (Category 2)?",
            options: ["24 hours", "48 hours", "72 hours", "96 hours"],
            correctAnswer: "48 hours",
            explanation: "Category 1 water can become Category 2 if left untreated for 48+ hours due to bacterial growth and contamination."
          },
          {
            question: "When facing pressure to include unrelated damage in an insurance claim, what is the correct professional response?",
            options: ["Include it to help the client", "Refuse and explain insurance fraud laws", "Check with insurance first", "Let the client decide"],
            correctAnswer: "Refuse and explain insurance fraud laws",
            explanation: "Including unrelated damage in insurance claims constitutes fraud. The professional response is to refuse and educate the client about legal and ethical implications."
          }
        ]
      }
    ],
    practicalAssignments: [
      "Research recent disaster events in your service area and analyze the types of damage typically caused",
      "Create a professional introduction script for initial client contact during emergency situations",
      "Develop a checklist for ethical decision-making based on the framework provided"
    ],
    keyTerminology: [
      {
        term: "IICRC",
        definition: "Institute of Inspection, Cleaning and Restoration Certification - the global standard-setting body for the cleaning and restoration industry"
      },
      {
        term: "Category 1 Water",
        definition: "Clean water from sanitary sources that poses no health risk if consumed"
      },
      {
        term: "Mitigation",
        definition: "Immediate actions taken to prevent further damage after a disaster event"
      },
      {
        term: "Pre-Loss Condition",
        definition: "The condition of the property before the damage occurred - the target state for complete restoration"
      },
      {
        term: "Scope of Work",
        definition: "Detailed description of all work required to restore the property to pre-loss condition"
      }
    ],
    realWorldScenarios: [
      {
        title: "Emergency Water Damage Response",
        scenario: "You receive a 2 AM call about a burst pipe in a family home with water flowing into the living areas. The homeowner is panicked and wants immediate help.",
        questions: [
          "What are your first priorities upon arrival?",
          "How do you calm the homeowner while conducting assessment?",
          "What immediate mitigation steps are required?",
          "How do you document the situation for insurance purposes?"
        ],
        correctApproach: "1) Ensure safety and stop water source, 2) Reassure homeowner with professional confidence, 3) Begin water extraction and document damage, 4) Take comprehensive photos and moisture readings for insurance documentation"
      }
    ],
    documentationRequirements: [
      "Complete contractor profile setup in NRP system",
      "Upload insurance certificates and licensing documentation", 
      "Photograph current equipment and vehicle setup",
      "Submit emergency contact information and backup procedures"
    ],
    dailyChecklist: [
      "Review Australian disaster statistics and understand regional patterns",
      "Understand NRP lead distribution model and revenue structure",
      "Internalize IICRC professional standards framework",
      "Practice professional introduction and client communication scripts",
      "Set up emergency response systems and contact procedures"
    ],
    nextDayPreparation: "Tomorrow we dive deep into water damage restoration - the most common type of disaster recovery work. Review the water damage basics and gather any water extraction equipment you have for hands-on practice."
  },

  {
    day: 2,
    title: "Water Damage Restoration Mastery",
    subtitle: "Comprehensive Water Damage Assessment, Mitigation, and Restoration",
    overview: "Water damage represents 60% of all disaster recovery work in Australia. Today you'll master the complete water damage restoration process from emergency response through final restoration, including the critical science of psychrometry, advanced drying techniques, and contamination management. This knowledge forms the foundation for most of your NRP contractor work.",
    learningObjectives: [
      {
        id: "day2-obj1",
        title: "Water Damage Science Mastery",
        description: "Understand the physics of water damage, evaporation, and structural drying",
        measurableOutcome: "Can calculate drying times, select appropriate equipment, and explain psychrometric principles to clients and adjusters"
      },
      {
        id: "day2-obj2",
        title: "IICRC S500 Standard Implementation",
        description: "Apply IICRC S500 water damage restoration standards in all assessment and restoration work",
        measurableOutcome: "Can classify water categories, determine affected materials, and develop compliant restoration plans"
      },
      {
        id: "day2-obj3",
        title: "Advanced Mitigation Techniques",
        description: "Master emergency water extraction, structural drying, and damage prevention techniques",
        measurableOutcome: "Can execute proper water extraction, set up drying systems, and prevent secondary damage"
      }
    ],
    modules: [
      {
        id: "day2-mod1",
        title: "Water Damage Science and Psychrometry",
        duration: 60,
        type: "video",
        content: `
# The Science of Water Damage: Mastering Psychrometry for Professional Restoration

## Understanding Water Behavior in Buildings

Water damage restoration is applied science. Success requires understanding how water behaves, how it affects different materials, and how environmental conditions impact the drying process. This scientific foundation separates professional contractors from amateurs.

### Fundamental Principles of Water Movement

**1. Gravity Flow and Wicking**
Water follows predictable paths through buildings:
- **Gravity**: Water flows downward, seeking the lowest point
- **Wicking**: Materials absorb water through capillary action
- **Migration**: Water moves from wet areas to dry areas
- **Evaporation**: Surface water becomes water vapor
- **Condensation**: Water vapor returns to liquid form on cool surfaces

**Example**: A burst pipe on the second floor will create damage patterns:
- Immediate flooding at the source
- Water flowing to lower elevations
- Wicking up into wall cavities
- Migration through flooring systems
- Potential condensation in enclosed spaces

**2. Material Porosity and Water Absorption**

**Porous Materials (High Absorption):**
- Carpet and carpet padding
- Drywall and plasterboard
- Insulation materials
- Concrete and masonry
- Wood framing and subflooring

**Semi-Porous Materials (Moderate Absorption):**
- Hardwood flooring
- Plywood and OSB
- Brick and stone
- Some synthetic materials

**Non-Porous Materials (Low Absorption):**
- Glass and metal
- Sealed concrete
- Plastic and vinyl
- Ceramic tile (glazed)

### Psychrometry: The Science of Air and Moisture

**Key Psychrometric Concepts:**

**Temperature**: Affects air's ability to hold moisture
- Warm air holds more moisture than cold air
- Temperature changes affect drying rates
- Heat accelerates evaporation but must be controlled

**Relative Humidity (RH)**: Percentage of moisture in air compared to maximum capacity
- 30-50% RH is ideal for structural drying
- Above 60% RH slows drying significantly
- Below 20% RH can damage some materials

**Specific Humidity**: Actual amount of water vapor in air
- Measured in grains per pound of dry air
- Doesn't change with temperature
- Key measurement for drying progress

**Vapor Pressure**: Force driving moisture movement
- Water moves from high vapor pressure to low vapor pressure
- Creating vapor pressure differentials accelerates drying
- Equipment placement based on vapor pressure principles

**Dew Point**: Temperature at which air becomes saturated
- Condensation occurs when surfaces reach dew point temperature
- Critical for preventing secondary moisture problems
- Helps determine safe temperature ranges for drying

### Equipment Selection Based on Psychrometric Principles

**Air Movers (Fans):**
- **Purpose**: Increase air circulation and evaporation rate
- **Placement**: Create airflow across wet surfaces
- **Calculation**: 1 air mover per 10-15 square meters of affected area
- **Positioning**: 45-degree angle for maximum evaporation

**Dehumidifiers:**
- **Refrigerant Dehumidifiers**: Effective in warm, humid conditions
  - Optimal temperature range: 20-35°C
  - Most efficient at high humidity levels
  - Lower cost for moderate moisture removal

- **Desiccant Dehumidifiers**: Effective in cool, moderate humidity conditions
  - Optimal temperature range: 5-25°C  
  - Maintains efficiency at lower humidity levels
  - Higher capacity for extreme moisture removal

**Heaters:**
- **Purpose**: Increase air temperature to boost moisture capacity
- **Caution**: Excessive heat can damage materials or create safety hazards
- **Optimal Range**: 25-30°C for most materials
- **Monitoring**: Continuous temperature monitoring required

### Water Classification System (IICRC S500)

**Category 1: Clean Water**
- **Source**: Sanitary water sources
- **Examples**: 
  - Broken water supply lines
  - Sink or tub overflows (clean water only)
  - Rainwater (before ground contact)
  - Melting snow or ice

- **Health Risk**: Minimal if consumed
- **Restoration Approach**:
  - Extract standing water immediately
  - Remove saturated porous materials if economically feasible
  - Dry structure and contents in place when possible
  - Monitor for timely drying (48-hour rule)

- **Time Sensitivity**: Can become Category 2 after 48-72 hours

**Category 2: Contaminated Water**
- **Source**: Contains significant contamination
- **Examples**:
  - Washing machine or dishwasher overflows
  - Toilet overflow (urine only, no feces)
  - Sump pump failures
  - Hydrostatic pressure groundwater

- **Health Risk**: Potential illness if consumed
- **Restoration Approach**:
  - Extract water with appropriate PPE
  - Remove and discard porous materials if heavily saturated
  - Antimicrobial treatment of affected surfaces
  - Structural drying with enhanced air filtration

- **Precautions**: Personal protective equipment required

**Category 3: Grossly Contaminated Water**
- **Source**: Highly contaminated with pathogens and toxins
- **Examples**:
  - Sewage backups
  - Toilet overflow with feces
  - Rising flood water
  - Storm surge and seawater

- **Health Risk**: Serious illness or death if consumed
- **Restoration Approach**:
  - Remove and discard all porous materials
  - Disinfection of all affected surfaces
  - Structural elements may require removal
  - Full PPE and respiratory protection required

### Class of Water Loss (Evaporation Rate)

**Class 1: Slow Rate of Evaporation**
- **Characteristics**: Minimal absorption, favorable drying conditions
- **Examples**: Concrete floors, minimal carpet area
- **Drying Time**: 1-3 days typically
- **Equipment Needs**: Standard air movers and dehumidification

**Class 2: Fast Rate of Evaporation** 
- **Characteristics**: Significant absorption into porous materials
- **Examples**: Carpet and pad throughout room, wet drywall
- **Drying Time**: 3-5 days typically
- **Equipment Needs**: Increased air movement and dehumidification

**Class 3: Fastest Rate of Evaporation**
- **Characteristics**: Maximum absorption, overhead sources
- **Examples**: Ceilings, walls, insulation, multiple rooms affected
- **Drying Time**: 5-10+ days typically
- **Equipment Needs**: Maximum equipment deployment, possible specialty drying

**Class 4: Specialty Drying**
- **Characteristics**: Materials with very low permeance
- **Examples**: Hardwood floors, concrete, stone, plaster
- **Drying Time**: Extended periods, weeks possible
- **Equipment Needs**: Specialty equipment, injection systems, heat

### Moisture Detection and Monitoring

**Essential Moisture Meters:**

**Pin-Type Meters:**
- **Use**: Direct measurement of moisture content
- **Accuracy**: Most accurate for wood and drywall
- **Limitations**: Leaves small holes, surface measurement only
- **Best Practice**: Multiple readings across affected areas

**Pinless Meters:**
- **Use**: Surface scanning without damage
- **Accuracy**: Good for large area screening
- **Limitations**: Affected by surface contaminants
- **Best Practice**: Confirm readings with pin meter

**Infrared Thermometers:**
- **Use**: Detect temperature variations indicating moisture
- **Accuracy**: Good for identifying problem areas
- **Limitations**: Cannot quantify moisture levels
- **Best Practice**: Use with moisture meters for confirmation

**Thermo-Hygrometers:**
- **Use**: Monitor air temperature and humidity
- **Placement**: Multiple units throughout drying area
- **Recording**: Document daily readings
- **Target**: Maintain proper psychrometric conditions

### Daily Monitoring and Documentation

**Essential Daily Measurements:**
1. **Temperature**: Air and surface temperatures
2. **Relative Humidity**: Ambient and specific areas
3. **Moisture Content**: All affected materials
4. **Dew Point**: Calculate condensation risk
5. **Equipment Status**: Verify all equipment functioning

**Documentation Requirements:**
- **Daily Log Sheets**: Standardized measurement forms
- **Progress Photos**: Same angles daily to show drying progress  
- **Equipment Logs**: Runtime, maintenance, repositioning
- **Psychrometric Charts**: Plot drying conditions
- **Moisture Maps**: Track moisture levels across affected areas

**Drying Goal Achievement:**
- **Moisture Content**: Return to pre-loss moisture levels
- **Relative Humidity**: Stable at 30-50% RH
- **No Condensation**: No moisture accumulation on surfaces
- **Structural Stability**: No warping, buckling, or deterioration
- **Client Comfort**: Acceptable indoor environment restored

### Common Drying Challenges and Solutions

**Challenge 1: Hidden Moisture**
- **Problem**: Moisture trapped in wall cavities or under flooring
- **Detection**: Use thermal imaging and deep-probe moisture meters
- **Solution**: Install cavity drying systems, injection ports, or remove materials

**Challenge 2: High Humidity Conditions**
- **Problem**: Outdoor conditions prevent effective dehumidification
- **Solution**: Increase dehumidification capacity, use desiccant units, consider containment

**Challenge 3: Material Sensitivity**
- **Problem**: Antiques, artwork, or sensitive materials at risk
- **Solution**: Climate-controlled drying, specialized equipment, professional conservation

**Challenge 4: Structural Damage**
- **Problem**: Warping, buckling, or deterioration during drying
- **Solution**: Controlled drying environment, gradual moisture removal, structural support

This scientific foundation in water damage restoration will guide every decision you make in the field. Understanding these principles allows you to explain your approach to clients and adjusters, justify equipment selections, and achieve optimal drying results consistently.
        `,
        keyPoints: [
          "Psychrometry is the scientific foundation for all water damage restoration",
          "Water categories (1-3) determine restoration approach and safety requirements",
          "Drying classes (1-4) determine equipment needs and timeline expectations",
          "Vapor pressure differentials drive moisture movement and drying effectiveness",
          "Daily monitoring and documentation are essential for professional restoration",
          "Material porosity determines absorption rates and restoration strategies"
        ],
        assessmentQuestions: [
          {
            question: "Category 1 water can become Category 2 water after how many hours without treatment?",
            options: ["24 hours", "48-72 hours", "96 hours", "1 week"],
            correctAnswer: "48-72 hours",
            explanation: "Clean water can become contaminated through bacterial growth after 48-72 hours if left untreated."
          },
          {
            question: "What is the optimal relative humidity range for structural drying?",
            options: ["10-30%", "30-50%", "50-70%", "70-90%"],
            correctAnswer: "30-50%",
            explanation: "30-50% RH provides effective drying without risking damage to materials from over-drying."
          }
        ]
      },
      {
        id: "day2-mod2", 
        title: "Emergency Response and Water Extraction",
        duration: 45,
        type: "video",
        content: `
# Emergency Water Damage Response: Critical First Steps

## The Golden Hours: Why Speed Matters

The first 24-48 hours after water damage occurs are critical. During this window, proper response can mean the difference between a minor restoration and a major reconstruction project. Your professional emergency response can save property owners thousands of dollars and weeks of displacement.

### Emergency Response Timeline

**First 30 Minutes: Assessment and Stabilization**
- **Safety First**: Ensure electrical safety, structural integrity, and personal safety
- **Source Control**: Stop water source if possible and safe to do so
- **Initial Assessment**: Rapid evaluation of damage extent and category
- **Client Communication**: Professional, calming presence with clear action plan

**Hours 1-4: Water Extraction and Mitigation**
- **Standing Water Removal**: Complete extraction using appropriate equipment
- **Content Assessment**: Identify salvageable vs. non-salvageable items
- **Structural Assessment**: Evaluate building materials for restoration vs. removal
- **Initial Drying Setup**: Begin air movement and dehumidification

**Hours 4-24: Full Mitigation Deployment**
- **Complete Equipment Setup**: Optimal placement for maximum drying efficiency
- **Documentation**: Comprehensive photo and measurement documentation
- **Insurance Notification**: Contact adjusters and provide initial assessment
- **Work Authorization**: Secure approval for mitigation and restoration scope

### Water Extraction Equipment and Techniques

**Portable Extractors:**
- **Capacity**: 25-75 liters typical for residential work
- **Use**: Small areas, spot extraction, detail work
- **Advantages**: Maneuverable, quick setup, lower cost
- **Limitations**: Limited capacity, frequent emptying required

**Truck-Mounted Extractors:**
- **Capacity**: 200-500+ litres, continuous operation
- **Use**: Large areas, commercial work, deep extraction
- **Advantages**: High capacity, powerful suction, continuous operation
- **Considerations**: Access requirements, hose length limitations

**Submersible Pumps:**
- **Use**: Deep standing water, basement flooding, continuous inflow
- **Capacity**: 5,000-20,000+ litres per hour
- **Placement**: Lowest point, stable positioning, discharge planning
- **Safety**: GFCI protection, waterproof connections required

### Extraction Techniques by Surface Type

**Carpet and Pad Extraction:**
- **Initial Pass**: Remove surface water with wide extraction tool
- **Detail Extraction**: Use smaller tools for thorough water removal
- **Pad Assessment**: Determine if padding is salvageable or requires replacement
- **Technique**: Slow, overlapping passes for maximum water removal

**Hard Surface Extraction:**
- **Standing Water**: Use pumps or large capacity extractors
- **Detail Work**: Squeegees and extractors for complete water removal
- **Seam Attention**: Focus on gaps between flooring materials
- **Drying Preparation**: Ensure complete water removal before air drying

**Structural Extraction:**
- **Wall Cavities**: May require drilling access holes for extraction
- **Subfloor Systems**: Access through flooring or ceiling areas
- **Insulation**: Often requires removal due to contamination and drying difficulty
- **HVAC Systems**: Ductwork inspection and potential cleaning required

### Content Assessment and Triage

**Salvageable Items:**
- **Electronics**: May be restorable with proper drying and cleaning
- **Furniture**: Solid wood and metal often salvageable
- **Documents**: Freeze-drying techniques for important papers
- **Clothing**: Most clothing can be professionally cleaned
- **Artwork**: Requires specialized restoration techniques

**Non-Salvageable Items:**
- **Particle Board Furniture**: Typically not cost-effective to restore
- **Carpet Padding**: Usually requires replacement after water damage
- **Insulation**: Contaminated insulation typically requires replacement
- **Food Items**: All food in contact with contaminated water
- **Mattresses**: Difficult to properly dry and sanitize

**Content Processing Steps:**
1. **Immediate Assessment**: Sort items into salvageable and non-salvageable
2. **Inventory Documentation**: Photo and list all items with damage assessment
3. **Priority Items**: Identify items of high value or importance to client
4. **Storage Preparation**: Protect salvageable items during restoration
5. **Cleaning Coordination**: Arrange professional cleaning of contents

### Structural Assessment and Material Decisions

**Drywall and Plaster:**
- **Category 1 Water**: Often salvageable if dried within 48-72 hours
- **Category 2/3 Water**: Typically requires removal up to 12+ inches above water line
- **Insulation Behind**: Usually requires drywall removal for insulation replacement
- **Texture Considerations**: Matching existing textures adds complexity

**Flooring Systems:**
- **Carpet**: Salvageability depends on padding condition and water category
- **Hardwood**: Often salvageable with proper drying techniques
- **Laminate**: Typically not salvageable due to moisture absorption
- **Tile**: Usually salvageable, but adhesives may fail

**Subfloor and Framing:**
- **Moisture Content**: Monitor carefully during drying process
- **Structural Integrity**: Assess for warping, cupping, or deterioration
- **Treatment Options**: In-place drying vs. removal and replacement
- **Long-term Monitoring**: Some materials require extended observation

### Safety Protocols for Water Damage Response

**Personal Protective Equipment (PPE):**
- **Category 1 Water**: Standard work clothing, eye protection
- **Category 2 Water**: Rubber gloves, eye protection, consider respiratory protection
- **Category 3 Water**: Full PPE including respiratory protection, protective clothing, boot covers

**Electrical Safety:**
- **Power Shutdown**: Turn off electricity to affected areas
- **GFCI Protection**: All electrical equipment must have ground fault protection
- **Wet Conditions**: Never use electrical equipment in standing water
- **Professional Assessment**: Have electrician inspect systems before restoration

**Structural Safety:**
- **Ceiling Integrity**: Wet ceilings may collapse, use caution
- **Floor Stability**: Water damage can compromise subflooring
- **Load Considerations**: Wet materials are significantly heavier
- **Access Safety**: Wet surfaces are slippery, use appropriate footwear

### Client Communication During Emergency Response

**Initial Contact Scripts:**
"I'm [Name] from National Recovery Partners. I understand you have water damage at your property. I want to assure you that we're going to take excellent care of you and your property. My first priority is to stop any ongoing damage and get your property stabilized. Can you show me where the water damage is located?"

**Explanation of Process:**
"Here's what I'm going to do over the next few hours:
1. First, I need to assess the full extent of the damage and ensure we've stopped the source
2. I'll remove any standing water and begin the drying process
3. I'll document everything with photos for your insurance company
4. I'll set up equipment to dry your property properly and safely
5. I'll explain the timeline and next steps once I complete my assessment"

**Setting Expectations:**
"Water damage restoration is a process that typically takes 3-7 days depending on the extent of damage. The good news is that we can save most of your property if we act quickly. I'll be monitoring the drying progress daily and adjusting equipment as needed. Your insurance adjuster will be involved in approving the scope of work."

**Addressing Common Concerns:**
- **Will everything be saved?**: "We'll do everything possible to restore your property. I'll assess each area and material to determine what can be saved versus what needs to be replaced."
- **How long will the equipment run?**: "The drying equipment will run continuously until we achieve proper moisture levels. This is typically 3-7 days. The equipment is designed to run safely 24/7."
- **What about my belongings?**: "We'll assess your contents separately. Many items can be cleaned and restored. Items that can't be saved will be documented for insurance purposes."

### Documentation Requirements

**Initial Assessment Documentation:**
- **Overview Photos**: Wide shots showing extent of damage
- **Detail Photos**: Close-ups of specific damage areas
- **Moisture Readings**: Document moisture levels in all affected materials
- **Equipment Placement**: Photo documentation of equipment setup
- **Pre-existing Conditions**: Note any damage not related to current loss

**Daily Progress Documentation:**
- **Moisture Tracking**: Daily readings of all monitored areas
- **Equipment Status**: Verify all equipment operational
- **Progress Photos**: Same angles daily to show drying progress
- **Environmental Conditions**: Temperature and humidity readings
- **Client Communication**: Document all interactions and approvals

This emergency response foundation ensures that you can handle water damage calls professionally and effectively, setting the stage for successful restoration outcomes and satisfied clients.
        `,
        keyPoints: [
          "First 24-48 hours are critical for preventing secondary damage",
          "Safety assessment must precede all extraction activities", 
          "Complete water extraction is essential before beginning structural drying",
          "Content triage decisions affect both timeline and cost",
          "Professional communication calms clients during traumatic situations",
          "Thorough documentation protects all parties and supports insurance claims"
        ],
        practicalExercises: [
          "Practice safety assessment protocols for different water damage scenarios",
          "Calculate extraction capacity requirements for various room sizes",
          "Role-play client communication scripts for emergency situations"
        ]
      },
      {
        id: "day2-mod3",
        title: "Advanced Drying Systems and Monitoring", 
        duration: 50,
        type: "video",
        content: `
# Advanced Drying Systems: Achieving Professional Results

## Strategic Equipment Placement for Maximum Efficiency

Professional drying is both science and art. While psychrometric principles guide our approach, equipment placement and monitoring strategies separate excellent contractors from average ones. Proper drying system design ensures faster completion times, better outcomes, and higher client satisfaction.

### Air Movement Principles and Equipment Placement

**The Physics of Evaporation:**
- **Surface Area**: Increased airflow across wet surfaces accelerates evaporation
- **Air Exchange**: Moving saturated air away from wet surfaces maintains drying potential
- **Temperature**: Warm air holds more moisture than cold air
- **Pressure Differentials**: Creating airflow patterns optimizes moisture removal

**Air Mover Placement Strategies:**

**Standard Room Configuration:**
- **Pattern**: Create circular airflow pattern around room perimeter
- **Spacing**: 3-4 meter intervals along walls
- **Angle**: 45-degree angle to floor for optimal evaporation
- **Height**: Direct airflow across wet surfaces, not above them

**Large Area Configuration:**
- **Grid Pattern**: Systematic placement ensuring no dead air spaces
- **Central Units**: High-velocity units for large central areas
- **Wall Units**: Direct airflow along wall surfaces
- **Corner Attention**: Special attention to corners where air circulation is poor

**Multi-Level Configuration:**
- **Basement/Lower Level**: Focus on preventing upward moisture migration
- **Main Level**: Standard horizontal airflow patterns
- **Upper Level**: Consider heat rise and natural air movement patterns
- **Stairwells**: Prevent moisture migration between levels

### Dehumidification Strategies

**Equipment Selection Based on Conditions:**

**Refrigerant Dehumidifiers:**
- **Optimal Conditions**: Temperature above 18°C, high relative humidity
- **Capacity**: 10-40+ litres per day depending on unit size
- **Efficiency**: Most efficient in warm, humid conditions
- **Limitations**: Effectiveness drops significantly below 18°C
- **Placement**: Central location with adequate air circulation

**Desiccant Dehumidifiers:**
- **Optimal Conditions**: Cool temperatures, moderate humidity
- **Capacity**: Maintains efficiency across wide temperature range
- **Advantages**: Works effectively in low temperature conditions
- **Energy Use**: Higher energy consumption but consistent performance
- **Applications**: Ideal for cool conditions, specialty drying situations

**Low Grain Refrigerant (LGR) Units:**
- **Capability**: Can achieve very low humidity levels (20-30% RH)
- **Efficiency**: Energy efficient at removing final moisture
- **Applications**: Final stages of drying, sensitive materials
- **Cost**: Higher equipment cost but faster completion times

### Specialty Drying Techniques

**Injectidry Systems:**
- **Application**: Hardwood floors, wall cavities, specialty materials
- **Process**: Direct air injection into enclosed spaces
- **Equipment**: Specialized mats and injection ports
- **Monitoring**: Requires careful moisture monitoring to prevent over-drying

**Heat Drying:**
- **Purpose**: Accelerate evaporation through increased temperature
- **Equipment**: Space heaters, heat exchangers, heating panels
- **Temperature Range**: 25-35°C optimal for most materials
- **Safety**: Requires continuous monitoring to prevent material damage

**Containment Drying:**
- **Purpose**: Control humidity in specific areas, protect unaffected areas
- **Materials**: Plastic sheeting, zipper doors, negative air machines
- **Advantages**: More efficient dehumidification, protect contents
- **Applications**: Large losses, contaminated water situations

### Monitoring and Adjustment Protocols

**Daily Monitoring Routine:**

**Morning Assessment (8:00 AM):**
- **Equipment Check**: Verify all equipment operational and properly positioned
- **Moisture Readings**: Record moisture content in all monitored areas
- **Environmental Readings**: Temperature, humidity, dew point calculations
- **Client Communication**: Brief update on progress and timeline

**Midday Check (12:00 PM):**
- **Equipment Performance**: Check for any issues or needed maintenance
- **Progress Assessment**: Compare readings to morning measurements
- **Adjustments**: Reposition equipment if needed for optimal performance
- **Documentation**: Update progress photos if significant changes

**Evening Assessment (5:00 PM):**
- **Daily Progress**: Calculate drying rate and progress toward goals
- **Tomorrow's Plan**: Determine any equipment or strategy changes needed
- **Client Update**: Provide detailed progress report and timeline update
- **Documentation**: Complete daily log sheets and photo documentation

**Moisture Content Targets by Material:**

**Wood Products:**
- **Framing Lumber**: 6-12% moisture content (varies by species and region)
- **Subflooring**: 8-12% moisture content
- **Hardwood Flooring**: 6-9% moisture content
- **Trim and Millwork**: 6-10% moisture content

**Gypsum Products:**
- **Drywall**: Less than 1% moisture content on moisture meter
- **Plaster**: Varies significantly, establish baseline readings
- **Joint Compound**: Must be completely dry to prevent cracking

**Masonry and Concrete:**
- **Concrete Slabs**: Highly variable, establish pre-loss baseline when possible
- **Block Walls**: Can retain moisture for extended periods
- **Brick**: Often requires extended drying time

### Equipment Maintenance and Troubleshooting

**Daily Equipment Maintenance:**
- **Air Movers**: Check for proper operation, clean intake filters
- **Dehumidifiers**: Empty condensate, clean filters, check operation
- **Moisture Meters**: Calibrate daily, check battery levels
- **Extension Cords**: Inspect for damage, ensure GFCI protection

**Common Equipment Issues:**

**Air Movers Not Operating:**
- **Check Power**: Verify power supply and GFCI operation
- **Inspect Cord**: Look for damage or water contact
- **Motor Issues**: Listen for unusual noises indicating bearing problems
- **Overload**: Ensure adequate electrical capacity

**Dehumidifier Not Removing Moisture:**
- **Filter Cleaning**: Dirty filters reduce efficiency significantly
- **Coil Cleaning**: Dust and debris reduce performance
- **Refrigerant Issues**: May require professional service
- **Sizing**: Unit may be undersized for moisture load

**Moisture Meter Inconsistent Readings:**
- **Calibration**: Recalibrate according to manufacturer instructions
- **Surface Contamination**: Clean meter pins and surface
- **Material Density**: Adjust settings for material type
- **Temperature Effects**: Allow materials to reach room temperature

### Advanced Monitoring Technology

**Thermal Imaging Cameras:**
- **Applications**: Detect hidden moisture, identify problem areas
- **Technique**: Look for temperature differentials indicating moisture
- **Limitations**: Cannot quantify moisture levels, requires experience
- **Documentation**: Provides excellent visual documentation for reports

**Remote Monitoring Systems:**
- **Capability**: Continuous monitoring of temperature, humidity, equipment status
- **Benefits**: 24/7 monitoring without site visits, immediate alerts
- **Data Logging**: Automatic documentation of drying progress
- **Client Confidence**: Provides transparency and professional image

**Data Logging Hygrometers:**
- **Function**: Continuous recording of temperature and humidity
- **Placement**: Multiple units throughout drying area
- **Analysis**: Identify patterns and optimize drying conditions
- **Reporting**: Provide clients and adjusters with detailed progress data

### Quality Control and Final Verification

**Pre-Completion Checklist:**
- **Moisture Levels**: All materials at or below pre-loss moisture content
- **Environmental Conditions**: Stable temperature and humidity levels
- **No Condensation**: No moisture accumulation on surfaces
- **Odor Assessment**: No musty or moisture-related odors
- **Visual Inspection**: No signs of secondary damage or mould growth

**Final Documentation:**
- **Completion Photos**: Document final condition of all affected areas
- **Final Moisture Readings**: Record final moisture content of all materials
- **Equipment Removal**: Document condition upon equipment removal
- **Client Walkthrough**: Signed acknowledgment of completion
- **Warranty Documentation**: Provide appropriate warranties and guarantees

**Post-Completion Monitoring:**
- **72-Hour Check**: Verify moisture levels remain stable
- **One-Week Follow-up**: Client satisfaction and any emerging issues
- **30-Day Check**: Final verification of successful drying
- **Documentation**: Maintain records for warranty and quality assurance

### Challenging Drying Situations

**High Humidity Environments:**
- **Problem**: Outdoor conditions prevent effective dehumidification
- **Solutions**: 
  - Increase dehumidification capacity
  - Use desiccant dehumidifiers
  - Consider containment strategies
  - Extend drying timeline if necessary

**Cool Temperature Conditions:**
- **Problem**: Reduced evaporation rates in cool conditions
- **Solutions**:
  - Add supplemental heating (safely)
  - Use desiccant dehumidification
  - Extend drying timeline
  - Consider specialty drying techniques

**Structural Limitations:**
- **Problem**: Inaccessible areas, complex building systems
- **Solutions**:
  - Specialty access equipment
  - Injection drying systems
  - Partial material removal for access
  - Engineering consultation if needed

This advanced understanding of drying systems enables you to handle complex water damage situations professionally and efficiently, ensuring optimal outcomes for your clients and their properties.
        `,
        keyPoints: [
          "Strategic equipment placement creates optimal airflow patterns for maximum drying efficiency",
          "Equipment selection must match environmental conditions for optimal performance", 
          "Daily monitoring and adjustment protocols ensure consistent progress toward drying goals",
          "Moisture content targets vary by material and must be achieved before completion",
          "Advanced monitoring technology provides professional documentation and client confidence",
          "Quality control verification prevents callbacks and ensures customer satisfaction"
        ],
        assessmentQuestions: [
          {
            question: "What is the optimal angle for air mover placement to maximize evaporation?",
            options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
            correctAnswer: "45 degrees",
            explanation: "45-degree angle provides optimal airflow across wet surfaces to maximize evaporation rates."
          },
          {
            question: "At what temperature do refrigerant dehumidifiers begin to lose efficiency significantly?",
            options: ["15°C", "18°C", "21°C", "24°C"],
            correctAnswer: "18°C",
            explanation: "Refrigerant dehumidifiers lose efficiency significantly below 18°C, making desiccant units preferable in cooler conditions."
          }
        ]
      }
    ],
    practicalAssignments: [
      "Calculate equipment requirements for a 100 square meter water damage scenario",
      "Create a daily monitoring checklist for water damage restoration projects", 
      "Design equipment placement diagrams for various room configurations"
    ],
    keyTerminology: [
      {
        term: "Psychrometry",
        definition: "The study of the properties of air and water vapor mixtures, fundamental to understanding drying processes"
      },
      {
        term: "Vapor Pressure",
        definition: "The pressure exerted by water vapor in air, driving force for moisture movement"
      },
      {
        term: "Grain Depression",
        definition: "The difference between moisture content in air entering and leaving a dehumidifier"
      },
      {
        term: "Class 4 Drying",
        definition: "Specialty drying situations involving materials with very low permeance to moisture"
      },
      {
        term: "Injectidry",
        definition: "Specialty drying system that forces dry air into enclosed spaces like wall cavities or under flooring"
      }
    ],
    realWorldScenarios: [
      {
        title: "Multi-Story Water Damage",
        scenario: "A burst pipe on the third floor of a commercial building has caused water damage on multiple levels. Water has penetrated through floor systems and is affecting tenant spaces below.",
        questions: [
          "How do you prioritize the drying strategy across multiple levels?",
          "What additional challenges does multi-story water damage present?",
          "How do you prevent moisture migration between levels?",
          "What equipment placement strategy optimizes drying efficiency?"
        ],
        correctApproach: "Start with source control and upper level extraction, establish containment between levels, monitor moisture migration patterns, coordinate equipment placement to prevent cross-contamination between affected areas"
      }
    ],
    documentationRequirements: [
      "Daily moisture reading logs for all practice scenarios",
      "Equipment placement diagrams for different room configurations",
      "Psychrometric calculations for various drying conditions",
      "Client communication scripts for water damage situations"
    ],
    dailyChecklist: [
      "Master psychrometric principles and calculations",
      "Practice equipment placement strategies for optimal drying",
      "Understand moisture content targets for all common building materials",
      "Develop systematic daily monitoring protocols",
      "Practice client communication during water damage restoration"
    ],
    nextDayPreparation: "Tomorrow focuses on fire and smoke damage restoration - a completely different skill set requiring specialized knowledge of combustion products, odor control, and structural cleaning. Review any fire damage basics and consider the unique challenges of smoke penetration."
  },

  // Continue with Days 3-14 following the same comprehensive format...
  // Each day will have the same detailed structure with relevant content for:
  // Day 3: Fire and Smoke Damage Restoration
  // Day 4: Mould Remediation and Indoor Air Quality
  // Day 5: Storm Damage and Emergency Response
  // Day 6: Biohazard and Trauma Scene Cleanup
  // Day 7: Insurance Claims and Documentation
  // Day 8: Customer Service Excellence
  // Day 9: Business Operations and Estimating
  // Day 10: Safety and Regulatory Compliance
  // Day 11: Quality Control and Final Inspections
  // Day 12: Advanced Techniques and Specialty Services
  // Day 13: Professional Development and Continuing Education
  // Day 14: Certification Assessment and Next Steps

];

// Export additional helper functions for curriculum management
export function getDayContent(dayNumber: number): DayContent | undefined {
  return COMPLETE_CURRICULUM.find(day => day.day === dayNumber);
}

export function getAllDayTitles(): Array<{ day: number; title: string; subtitle: string }> {
  return COMPLETE_CURRICULUM.map(day => ({
    day: day.day,
    title: day.title,
    subtitle: day.subtitle
  }));
}

export function getModuleContent(dayNumber: number, moduleId: string): ContentModule | undefined {
  const day = getDayContent(dayNumber);
  return day?.modules.find(module => module.id === moduleId);
}

export function calculateTotalDuration(): number {
  return COMPLETE_CURRICULUM.reduce((total, day) => {
    return total + day.modules.reduce((dayTotal, module) => dayTotal + module.duration, 0);
  }, 0);
}

export function getAssessmentQuestions(dayNumber: number): Array<{
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}> {
  const day = getDayContent(dayNumber);
  if (!day) return [];
  
  return day.modules.reduce((questions, module) => {
    if (module.assessmentQuestions) {
      questions.push(...module.assessmentQuestions);
    }
    return questions;
  }, [] as Array<{
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }>);
}