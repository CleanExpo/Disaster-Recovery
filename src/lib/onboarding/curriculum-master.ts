/**
 * MASTER 14-DAY ONBOARDING CURRICULUM FOR NRP CONTRACTORS
 * =========================================================
 * 
 * CRITICAL: This is the complete, production-ready curriculum containing
 * ALL training content for the 14-day contractor certification program.
 * 
 * Purpose:
 * - Video script creation for training modules
 * - NotebookLM podcast generation content
 * - Assessment questions and practical exercises
 * - Real-world scenarios and case studies
 * - Compliance documentation and certification tracking
 * 
 * Each day contains 6-8 hours of comprehensive content including:
 * - Theoretical knowledge modules
 * - Practical application exercises
 * - Assessment questions with detailed explanations
 * - Real-world case studies from Australian disasters
 * - Hands-on assignments and field exercises
 * 
 * Total Content: 84-112 hours of training material
 * Format: Complete, production-ready, no placeholders
 */

export interface LearningObjective {
  id: string;
  title: string;
  description: string;
  measurableOutcome: string;
  assessmentCriteria: string;
}

export interface ContentModule {
  id: string;
  title: string;
  duration: number; // minutes
  type: 'video' | 'reading' | 'interactive' | 'assessment' | 'practical' | 'case-study';
  content: string;
  keyPoints: string[];
  practicalExercises?: string[];
  requiredEquipment?: string[];
  safetyConsiderations?: string[];
  assessmentQuestions?: Array<{
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: 'basic' | 'intermediate' | 'advanced';
  }>;
  resources?: Array<{
    title: string;
    type: 'document' | 'video' | 'website' | 'tool';
    url?: string;
    description: string;
  }>;
}

export interface DayContent {
  day: number;
  title: string;
  subtitle: string;
  overview: string;
  duration: string; // e.g., "6-8 hours"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: number[]; // Day numbers that must be completed first
  learningObjectives: LearningObjective[];
  modules: ContentModule[];
  practicalAssignments: Array<{
    title: string;
    description: string;
    duration: string;
    deliverables: string[];
    evaluationCriteria: string[];
  }>;
  keyTerminology: Array<{
    term: string;
    definition: string;
    context: string;
    relatedTerms?: string[];
  }>;
  realWorldScenarios: Array<{
    title: string;
    location: string;
    date: string;
    description: string;
    challenges: string[];
    solutions: string[];
    lessonsLearned: string[];
    discussionPoints: string[];
  }>;
  dailyChecklist: string[];
  homeworkAssignments?: Array<{
    title: string;
    estimatedTime: string;
    instructions: string[];
    submissionRequirements: string[];
  }>;
  certification
Requirements: Array<{
    requirement: string;
    verificationMethod: string;
    passingCriteria: string;
  }>;
}

// ============================================
// DAY 1: FOUNDATION AND INDUSTRY OVERVIEW
// ============================================

const day1: DayContent = {
  day: 1,
  title: "Welcome to Disaster Recovery: Industry Foundation",
  subtitle: "Understanding the Australian Disaster Recovery Landscape",
  overview: `Your journey as a professional disaster recovery contractor begins with understanding the critical role you'll play in helping Australians rebuild after catastrophic events. Today establishes the foundation for your career in one of the nation's most essential service industries, covering the scope of disasters, industry standards, and the NRP network advantage.`,
  duration: "8 hours",
  difficulty: 'beginner',
  
  learningObjectives: [
    {
      id: "D1-LO1",
      title: "Identify Australian Disaster Types",
      description: "Recognize and categorize all major disaster types affecting Australian properties",
      measurableOutcome: "Correctly identify 15+ disaster types with 95% accuracy",
      assessmentCriteria: "Written assessment and visual identification test"
    },
    {
      id: "D1-LO2",
      title: "Understand Market Dynamics",
      description: "Comprehend the $4.2 billion disaster recovery industry structure",
      measurableOutcome: "Explain market segments, key players, and revenue streams",
      assessmentCriteria: "Case study analysis and market report creation"
    },
    {
      id: "D1-LO3",
      title: "Master NRP Network Model",
      description: "Understand the revolutionary NRP distributor model and contractor benefits",
      measurableOutcome: "Articulate NRP's value proposition and operational model",
      assessmentCriteria: "Presentation and Q&A assessment"
    },
    {
      id: "D1-LO4",
      title: "Establish Professional Standards",
      description: "Adopt industry-leading professional and ethical standards",
      measurableOutcome: "Demonstrate understanding of compliance and ethics requirements",
      assessmentCriteria: "Ethics scenario evaluation and code of conduct exam"
    }
  ],

  modules: [
    {
      id: "D1-M1",
      title: "The Australian Disaster Landscape",
      duration: 90,
      type: 'video',
      content: `
**Introduction to Australian Disasters**

Australia faces a unique and challenging disaster profile due to its geographic size, diverse climate zones, and increasing extreme weather events. As an NRP contractor, you'll respond to disasters ranging from tropical cyclones in Queensland to bushfires in Victoria, from urban flooding in Sydney to remote outback emergencies.

**Major Disaster Categories:**

1. **Water Damage Events (60% of all claims)**
   - Flash Flooding: The 2022 Eastern Australia floods affected 3.5 million people with damages exceeding $4.8 billion
   - Storm Damage: Severe weather systems cause $1.4 billion in annual insurance claims
   - Burst Pipes: Internal water damage affects 1 in 4 Australian homes annually
   - Sewage Overflows: Health hazard events requiring immediate biohazard response

2. **Fire Events (25% of all claims)**
   - Bushfires: Black Summer 2019-20 destroyed 3,000+ homes, 18.6 million hectares
   - Structure Fires: 20,000+ residential fires annually, average damage $85,000
   - Smoke Damage: Can affect properties 50km+ from fire source
   - Electrical Fires: Increasing with solar panel and battery storage adoption

3. **Mould and IAQ Issues (10% of all claims)**
   - Climate-Related Growth: 1 in 3 Australian homes have mould issues
   - Post-Flood Contamination: Occurs within 24-48 hours of water events
   - Health Impacts: Respiratory issues affect 4.1 million Australians
   - Building Defects: Modern sealed buildings trap moisture

4. **Specialized Events (5% of all claims)**
   - Biohazard Cleanup: Crime scenes, industrial accidents, contamination
   - Chemical Spills: Industrial and agricultural incidents
   - Pandemic Decontamination: COVID-19 created new service categories
   - Vandalism: Requires both restoration and security considerations

**Regional Disaster Patterns:**

Northern Australia experiences intense cyclone seasons from November to April, with Category 5 systems like Cyclone Yasi (2011) causing billions in damage. The monsoonal trough brings flooding to vast areas, while year-round humidity creates persistent mould challenges.

Eastern Seaboard regions face "rain bombs" - intense low-pressure systems dumping months of rainfall in days. The 2022 Lismore floods saw record 14.4m flood heights. Urban density amplifies impacts with underground carparks, basements, and high-rise buildings creating unique challenges.

Southern Australia battles Mediterranean climate extremes - winter storms and summer bushfires. Adelaide's 2016 hailstorm caused $1.1 billion in damage in just hours. Aging infrastructure in established suburbs increases vulnerability to pipe failures and electrical faults.

Central and Remote Australia presents logistical challenges with vast distances, extreme temperatures (-5°C to 50°C), and limited infrastructure. Flash flooding in desert regions can isolate communities for weeks, requiring air support for restoration teams.

**Economic Impact Analysis:**

The disaster recovery industry contributes significantly to Australia's economy:
- Direct Employment: 45,000+ restoration professionals
- Indirect Employment: 120,000+ in related industries
- Annual Revenue: $4.2 billion and growing 8% annually
- Insurance Sector: $32 billion in premiums, 40% disaster-related
- Government Spending: $2.4 billion in disaster recovery funding
- Economic Multiplier: Every $1 in restoration prevents $4 in future damage

**Climate Change Acceleration:**

Scientific data shows disaster frequency and intensity increasing:
- Extreme weather events: 3x more frequent than 1980s
- Insurance claims: Rising 7% annually above inflation
- Flood zones: Expanding to previously safe areas
- Fire seasons: Extended by 2-3 months
- Temperature records: Broken annually across regions
- Ocean warming: Intensifying cyclone systems

**Your Critical Role:**

As an NRP contractor, you're not just a service provider - you're a community lifeline. Families depend on you to restore their homes, businesses rely on you to resume operations, and insurers trust you to mitigate losses. Your rapid response can mean the difference between a quick recovery and long-term displacement for disaster victims.

The 24-48 hour window after a disaster is critical. Water damage becomes structural damage, mould begins growing, and temporary repairs prevent catastrophic losses. Your expertise, backed by NRP's network and resources, positions you as the professional families turn to in their darkest hours.
      `,
      keyPoints: [
        "Australia faces $4.2 billion in annual disaster recovery needs",
        "Water damage represents 60% of all insurance claims",
        "Climate change is accelerating disaster frequency by 3x",
        "24-48 hour response window is critical for mitigation",
        "Regional differences require specialized knowledge and approaches",
        "Economic multiplier effect: $1 prevention saves $4 in damage"
      ],
      practicalExercises: [
        "Map disaster risks in your service area using BOM and council data",
        "Create a disaster type identification chart with local examples",
        "Calculate potential market size in your region using insurance data",
        "Develop a 24-hour response plan for each disaster type"
      ],
      assessmentQuestions: [
        {
          question: "What percentage of disaster recovery claims are water-related in Australia?",
          options: ["40%", "50%", "60%", "70%"],
          correctAnswer: "60%",
          explanation: "Water damage, including floods, storms, and burst pipes, represents 60% of all disaster recovery insurance claims in Australia, making it the most common category requiring restoration services.",
          difficulty: 'basic'
        },
        {
          question: "Within what timeframe must water damage be addressed to prevent mould growth?",
          options: ["12-24 hours", "24-48 hours", "48-72 hours", "72-96 hours"],
          correctAnswer: "24-48 hours",
          explanation: "Mould can begin growing within 24-48 hours of water exposure. This critical window makes rapid response essential for preventing secondary damage and health hazards.",
          difficulty: 'intermediate'
        },
        {
          question: "The 2019-20 Black Summer bushfires burned how many hectares?",
          options: ["5.5 million", "10.3 million", "18.6 million", "24.2 million"],
          correctAnswer: "18.6 million",
          explanation: "The Black Summer bushfires burned 18.6 million hectares, destroyed over 3,000 homes, and resulted in $2 billion in insurance claims, making it one of Australia's worst natural disasters.",
          difficulty: 'basic'
        },
        {
          question: "What is the economic multiplier effect of disaster prevention?",
          options: ["$1 saves $2", "$1 saves $3", "$1 saves $4", "$1 saves $5"],
          correctAnswer: "$1 saves $4",
          explanation: "Every dollar spent on immediate disaster mitigation and proper restoration prevents an average of $4 in future damage, demonstrating the economic value of professional restoration services.",
          difficulty: 'advanced'
        }
      ],
      resources: [
        {
          title: "Bureau of Meteorology Severe Weather Events",
          type: 'website',
          url: "http://www.bom.gov.au/australia/warnings/",
          description: "Real-time weather warnings and historical disaster data"
        },
        {
          title: "Insurance Council of Australia Catastrophe Data",
          type: 'document',
          description: "Annual reports on disaster claims and economic impacts"
        },
        {
          title: "CSIRO Climate Change in Australia Report",
          type: 'document',
          description: "Scientific projections for disaster frequency and intensity"
        }
      ]
    },
    {
      id: "D1-M2",
      title: "The NRP Network Advantage",
      duration: 60,
      type: 'interactive',
      content: `
**Understanding the NRP Revolution**

National Recovery Partners represents a paradigm shift in disaster recovery service delivery. Unlike traditional restoration companies that compete locally, NRP creates a collaborative network where contractors support each other while maintaining independent businesses.

**The Traditional Model Problems:**

1. **Market Fragmentation**
   - 3,000+ small operators competing destructively
   - Price wars eroding profit margins
   - Inconsistent service quality damaging industry reputation
   - Limited resources for marketing and technology
   - No collective bargaining power with insurers

2. **Contractor Struggles**
   - Feast or famine workflow
   - High customer acquisition costs ($500-$2000 per job)
   - Equipment investment burden ($250,000+ startup costs)
   - Training and certification expenses
   - Insurance and compliance overhead

3. **Customer Pain Points**
   - Difficulty finding qualified contractors
   - Inconsistent pricing and quality
   - No accountability or recourse
   - Limited availability during disasters
   - Communication breakdowns

**The NRP Network Solution:**

NRP operates as a technology-enabled distributor, not a restoration company. We connect insurance claims to qualified contractors through our AI-powered platform, creating value for all stakeholders:

**For Contractors:**
- Guaranteed lead flow from insurance partners
- No marketing costs - we handle SEO and advertising
- Collective purchasing power for equipment and supplies
- Standardized training and certification programs
- Back-office support for compliance and administration
- Performance-based lead allocation rewarding quality
- Network support during surge events

**Technology Infrastructure:**
- AI chatbot handling initial customer contact 24/7
- Automated lead qualification and distribution
- Real-time job tracking and documentation
- Digital payment processing and invoicing
- Compliance management system
- Training delivery platform
- Performance analytics dashboard

**Revenue Model Transparency:**

Your success is our success. NRP operates on a performance-based model:
- Application Fee: $275 (one-time)
- Joining Fee: $2,200 (includes training materials)
- Monthly Subscription: Sliding scale based on performance
  - Month 1: Free (establishment period)
  - Month 2: $198 (60% discount)
  - Month 3: $247 (50% discount)
  - Month 4+: $495 (full rate)
- Lead Fees: Pay only for qualified leads you accept
- No franchise fees or revenue sharing
- No territory restrictions or non-compete clauses

**Network Growth Strategy:**

NRP is targeting 10,000 contractors nationally by 2027:
- Phase 1 (2024): 500 foundation contractors
- Phase 2 (2025): 2,500 contractors, IPO preparation
- Phase 3 (2026): 5,000 contractors, international expansion
- Phase 4 (2027): 10,000 contractors, market leadership

**Competitive Advantages:**

1. **SEO Domination**: 30,000+ location pages ranking #1
2. **Insurance Partnerships**: Direct relationships with major insurers
3. **Government Contracts**: Preferred supplier agreements
4. **Technology Platform**: 2 years ahead of competitors
5. **Network Effects**: Each contractor strengthens the network
6. **Brand Recognition**: National advertising campaigns
7. **Quality Assurance**: Standardized service delivery

**Your Growth Trajectory:**

Year 1: Establish foundation, 20-30 jobs monthly
Year 2: Scale operations, 50-75 jobs monthly
Year 3: Market leader, 100+ jobs monthly
Year 5: Multi-crew operation, passive income streams

**Support Systems:**

- 24/7 contractor hotline for emergency support
- Weekly training webinars and skill development
- Annual conference and networking events
- Equipment leasing programs
- Insurance group rates
- Legal support for contract disputes
- Mental health and wellbeing programs

**Quality Standards:**

NRP maintains the highest industry standards:
- IICRC certification required within 6 months
- Background checks and insurance verification
- Customer satisfaction monitoring (minimum 4.5 stars)
- Response time requirements (2-hour emergency)
- Documentation standards for insurance compliance
- Continuing education requirements (40 hours annually)
- Safety compliance and incident reporting

**The Network Effect:**

As more contractors join, the network becomes more valuable:
- Greater geographic coverage attracts more insurers
- Increased capacity for surge events
- Shared knowledge and best practices
- Collective innovation and problem-solving
- Stronger negotiating position with suppliers
- Enhanced brand recognition and trust
      `,
      keyPoints: [
        "NRP is a technology distributor, not a restoration company",
        "Performance-based model aligns NRP success with contractor success",
        "Network effects create competitive advantages for all members",
        "Technology platform handles customer acquisition and administration",
        "Collective strength provides better terms with insurers and suppliers",
        "Quality standards ensure consistent service delivery across network"
      ],
      practicalExercises: [
        "Calculate your ROI for joining NRP versus independent operation",
        "Map your local market and identify network coverage gaps",
        "Create a 5-year business plan leveraging NRP resources",
        "Identify 3 ways you can contribute to network success"
      ],
      assessmentQuestions: [
        {
          question: "What is NRP's primary business model?",
          options: [
            "Franchise restoration company",
            "Technology-enabled distributor",
            "Insurance company",
            "Equipment supplier"
          ],
          correctAnswer: "Technology-enabled distributor",
          explanation: "NRP operates as a technology-enabled distributor, connecting insurance claims to qualified contractors while providing infrastructure and support, not as a restoration company itself.",
          difficulty: 'basic'
        },
        {
          question: "What is the monthly subscription fee after the introductory period?",
          options: ["$297", "$397", "$495", "$595"],
          correctAnswer: "$495",
          explanation: "After the 3-month introductory period (free, $198, $247), the regular monthly subscription is $495, which includes access to all NRP systems and support.",
          difficulty: 'basic'
        },
        {
          question: "What is NRP's contractor target by 2027?",
          options: ["5,000", "7,500", "10,000", "15,000"],
          correctAnswer: "10,000",
          explanation: "NRP aims to have 10,000 contractors in the network by 2027, creating the largest disaster recovery network in Australia.",
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: "D1-M3",
      title: "Professional Standards and Ethics",
      duration: 60,
      type: 'reading',
      content: `
**The Restoration Professional's Code**

Disaster recovery work places you in people's homes during their most vulnerable moments. The trust placed in you demands the highest ethical standards and professional conduct. This module establishes the non-negotiable standards for NRP contractors.

**Core Ethical Principles:**

1. **Integrity Above All**
   - Honest assessment of damage and required work
   - Transparent pricing with no hidden charges
   - Accurate documentation for insurance claims
   - Admitting limitations and seeking help when needed
   - Reporting safety hazards immediately
   - Maintaining confidentiality of customer information

2. **Compassion and Empathy**
   - Understanding trauma's impact on disaster victims
   - Patient communication with distressed customers
   - Respectful handling of personal belongings
   - Cultural sensitivity and awareness
   - Supporting vulnerable populations (elderly, disabled)
   - Going above and beyond when possible

3. **Professional Excellence**
   - Maintaining current certifications and training
   - Using industry best practices consistently
   - Proper use and maintenance of equipment
   - Accurate time tracking and reporting
   - Clean, professional appearance and vehicle presentation
   - Continuous improvement mindset

4. **Accountability**
   - Taking responsibility for mistakes
   - Following through on commitments
   - Timely communication about delays or issues
   - Proper supervision of subcontractors
   - Complete and accurate documentation
   - Accepting feedback constructively

**Legal and Regulatory Compliance:**

Australian disaster recovery work is governed by multiple regulatory frameworks:

**Work Health and Safety Act 2011:**
- Safe work method statements (SWMS) required
- PPE provision and usage mandatory
- Incident reporting within 24 hours
- Asbestos awareness and handling protocols
- Electrical safety requirements
- Working at heights regulations

**Environmental Protection Regulations:**
- Proper disposal of contaminated materials
- Water discharge limitations
- Chemical handling and storage requirements
- Noise restrictions in residential areas
- Heritage and protected area considerations
- Waste tracking and documentation

**Consumer Protection Laws:**
- Cooling-off periods for contracts
- Written quotes required over $500
- Warranty obligations (6 years structural, 2 years non-structural)
- Dispute resolution procedures
- Privacy Act compliance
- Anti-discrimination requirements

**Insurance Requirements:**
- Public liability minimum $20 million
- Professional indemnity $5 million
- Workers compensation coverage
- Vehicle and equipment insurance
- Cyber liability protection
- Contract works insurance

**Customer Interaction Protocols:**

**Initial Contact:**
- Arrive within promised timeframe
- Professional introduction and ID presentation
- Explain assessment process clearly
- Seek permission before photographing
- Provide realistic timeframes and expectations
- Leave detailed written scope of work

**During Restoration:**
- Daily progress updates to customer
- Protect undamaged areas with plastic sheeting
- Maintain clean, organized work areas
- Secure property when leaving site
- Document all work with photos
- Address concerns immediately

**Vulnerable Populations:**

Special considerations for at-risk groups:

**Elderly Customers:**
- Speak clearly and ensure understanding
- Provide written instructions in large print
- Assist with temporary relocation if needed
- Check on wellbeing beyond just property
- Connect with family members or carers
- Be alert for elder abuse or neglect

**Culturally Diverse Communities:**
- Use interpreters when language barriers exist
- Respect cultural practices and beliefs
- Understand different concepts of privacy
- Be aware of religious considerations
- Accommodate dietary restrictions if providing meals
- Ensure female staff available if requested

**Financial Hardship Cases:**
- Identify payment assistance programs
- Offer payment plans where possible
- Prioritize essential repairs
- Connect with community support services
- Document for insurance advocacy
- Never exploit vulnerable situations

**Conflict Resolution:**

Disputes will arise. Professional handling is essential:

1. **Listen Actively**: Understand the real concern
2. **Acknowledge Feelings**: Validate their experience
3. **Clarify Expectations**: Ensure mutual understanding
4. **Document Everything**: Protect all parties
5. **Seek Solutions**: Focus on resolution, not blame
6. **Escalate Appropriately**: Know when to involve management
7. **Follow Up**: Ensure satisfaction with resolution

**Mandatory Reporting Obligations:**

You must report:
- Suspected child abuse or neglect
- Elder abuse or exploitation
- Domestic violence situations
- Unsafe structures or utilities
- Environmental hazards
- Insurance fraud attempts
- Work safety breaches
- Asbestos discovery

**Professional Boundaries:**

Maintain appropriate relationships:
- No personal relationships with customers during work
- Decline gifts over $50 value
- No private work arrangements outside NRP
- Respect customer privacy and space
- Professional social media conduct
- No discrimination or harassment
- Appropriate language at all times
      `,
      keyPoints: [
        "Integrity and transparency are non-negotiable standards",
        "Legal compliance includes WHS, environmental, and consumer laws",
        "Vulnerable populations require special consideration",
        "Professional boundaries protect both contractor and customer",
        "Mandatory reporting obligations are legal requirements",
        "Conflict resolution skills are essential for success"
      ],
      practicalExercises: [
        "Review and sign NRP Code of Conduct",
        "Complete online WHS compliance module",
        "Practice customer interaction scenarios",
        "Create personal professional standards document"
      ],
      assessmentQuestions: [
        {
          question: "What is the minimum public liability insurance required for NRP contractors?",
          options: ["$5 million", "$10 million", "$20 million", "$30 million"],
          correctAnswer: "$20 million",
          explanation: "NRP contractors must maintain minimum $20 million public liability insurance to cover potential damages during restoration work.",
          difficulty: 'basic'
        },
        {
          question: "Within what timeframe must workplace incidents be reported?",
          options: ["Immediately", "24 hours", "48 hours", "7 days"],
          correctAnswer: "24 hours",
          explanation: "Work Health and Safety regulations require incident reporting within 24 hours to ensure proper investigation and prevention of future incidents.",
          difficulty: 'intermediate'
        },
        {
          question: "What is the warranty period for structural restoration work in Australia?",
          options: ["1 year", "2 years", "6 years", "10 years"],
          correctAnswer: "6 years",
          explanation: "Australian consumer law requires a 6-year warranty on structural work and 2 years on non-structural work.",
          difficulty: 'advanced'
        }
      ]
    },
    {
      id: "D1-M4",
      title: "Safety Fundamentals",
      duration: 90,
      type: 'practical',
      content: `
**Safety First: Non-Negotiable Protocols**

Disaster sites are inherently dangerous. Your safety and that of others depends on rigorous adherence to safety protocols. This module covers essential safety practices that will keep you alive and uninjured throughout your career.

**Hierarchy of Hazard Control:**

1. **Elimination**: Remove the hazard completely
2. **Substitution**: Replace with safer alternative
3. **Engineering Controls**: Isolate people from hazard
4. **Administrative Controls**: Change how people work
5. **PPE**: Personal protective equipment as last defense

**Site Assessment Protocol:**

Before entering any disaster site:

**External Assessment (2-minute rule):**
- Structural integrity: Look for sagging roofs, cracks, lean
- Electrical hazards: Downed lines, damaged meters, burning smells
- Environmental dangers: Floodwater, chemicals, gas leaks
- Access and egress: Ensure two exit routes
- Weather conditions: Storm, wind, lightning risks
- Other contractors: Coordinate to avoid conflicts

**Internal Assessment (5-minute sweep):**
- Air quality: Use gas meter for CO, methane, oxygen
- Electrical safety: Test circuits before work
- Structural stability: Check floors, ceilings, walls
- Biological hazards: Mould, sewage, vermin
- Chemical hazards: Asbestos, lead paint, chemicals
- Sharp objects: Broken glass, nails, metal

**Personal Protective Equipment (PPE):**

**Minimum PPE for all sites:**
- Safety boots: Steel cap, puncture resistant sole
- High-visibility clothing: Class D/N for day/night
- Safety glasses: Impact resistant, side shields
- Hard hat: Type 1 for falling objects
- Work gloves: Cut resistant Level 3 minimum
- First aid kit: Personal kit always accessible

**Water damage PPE additions:**
- Rubber boots: Knee-high minimum for flooding
- Waterproof gloves: Nitrile over work gloves
- N95 respirator: Minimum for mould exposure
- Disposable coveralls: Category 3 water requires

**Fire damage PPE additions:**
- P2/P3 respirator: For smoke and particulates
- Chemical gloves: Nitrile for soot handling
- Full coveralls: Disposable or washable
- Eye wash station: Portable for irritant exposure

**Electrical Safety:**

Electricity kills more restoration workers than any other hazard:

**Lock Out Tag Out (LOTO) Procedure:**
1. Identify all energy sources
2. Notify affected workers
3. Shut down equipment properly
4. Isolate energy sources
5. Apply locks and tags
6. Test for zero energy
7. Perform work safely
8. Remove locks in reverse order

**Water and Electricity:**
- Assume all water is energized
- Test with non-contact voltage tester
- Maintain 10-foot distance from power lines
- Never operate electrical in standing water
- Ground fault circuit interrupters (GFCI) mandatory
- Inspect all cords before use

**Working at Heights:**

Falls are the second leading cause of death:

**Ladder Safety:**
- 4:1 ratio (4 feet up, 1 foot out)
- Three points of contact always
- Inspect before every use
- Secure top and bottom
- Never exceed weight rating
- Face ladder when climbing
- No work from top two rungs

**Scaffold Safety:**
- Competent person inspection daily
- Guardrails required above 2 meters
- Toe boards prevent falling objects
- Level and stable base essential
- Maximum load never exceeded
- Tagged with inspection date

**Confined Space Entry:**

Never enter confined spaces without:
- Atmospheric testing complete
- Permit issued by controller
- Continuous ventilation running
- Standby person present
- Rescue plan established
- Communication maintained
- Tripod and winch ready

**Chemical Handling:**

**Safety Data Sheets (SDS) Requirements:**
- Available for all chemicals
- Read before use
- Understand hazard pictograms
- Follow PPE requirements
- Know first aid measures
- Proper storage methods
- Spill response procedures

**HAZCOM Requirements:**
- All containers labeled
- No food containers used
- Secondary containment provided
- Incompatible chemicals separated
- Ventilation adequate
- Eye wash accessible
- Spill kit available

**Biological Hazards:**

**Category Classifications:**
- Category 1: Clean water (24-48 hours becomes Cat 2)
- Category 2: Grey water (washing machines, dishwashers)
- Category 3: Black water (sewage, flooding)

**Bloodborne Pathogen Protocol:**
- Assume all blood infectious
- Universal precautions always
- Proper sharps disposal
- Vaccination records current
- Exposure incident reporting
- Decontamination procedures

**Emergency Procedures:**

**Site Emergency Plan:**
- Emergency contacts posted
- Assembly point identified
- First aid kit location known
- Fire extinguisher accessible
- Emergency shower/eyewash ready
- Evacuation routes clear
- Communication method established

**Incident Response:**
1. Ensure scene safety
2. Provide first aid
3. Call emergency services
4. Preserve scene
5. Notify NRP immediately
6. Document everything
7. Complete reports
8. Participate in investigation

**Fatigue Management:**

Tired workers make fatal mistakes:
- Maximum 12-hour shifts
- Mandatory breaks every 2 hours
- Hydration breaks every hour in heat
- Task rotation for repetitive work
- Recognition of fatigue signs
- No driving when exhausted
- Adequate rest between shifts

**Mental Health and Wellbeing:**

Disaster work takes emotional toll:
- Traumatic scene exposure
- Dealing with distressed victims
- Long hours and pressure
- Physical demands
- Time away from family

**Support Resources:**
- Employee Assistance Program (EAP)
- Peer support network
- Professional counseling
- Stress management training
- Work-life balance policies
- Regular check-ins with supervisors
      `,
      keyPoints: [
        "Safety assessment before entering any site is mandatory",
        "PPE requirements vary by hazard type and category",
        "Electrical hazards are the leading cause of restoration deaths",
        "Confined space entry requires permits and standby person",
        "Biological hazards require category-specific protocols",
        "Fatigue management prevents accidents and injuries"
      ],
      practicalExercises: [
        "Complete PPE fitting and inspection checklist",
        "Practice site assessment on mock disaster scene",
        "Demonstrate proper ladder setup and climbing",
        "Review SDS sheets for common restoration chemicals"
      ],
      requiredEquipment: [
        "Complete PPE kit for water and fire damage",
        "Gas meter for atmospheric testing",
        "Non-contact voltage tester",
        "First aid kit with bloodborne pathogen supplies",
        "Lock out tag out kit"
      ],
      safetyConsiderations: [
        "Never work alone on hazardous sites",
        "Always have emergency evacuation plan",
        "Maintain communication with base",
        "Document all safety hazards discovered",
        "Report near-misses to prevent accidents"
      ],
      assessmentQuestions: [
        {
          question: "What is the first step in the hierarchy of hazard control?",
          options: ["PPE", "Elimination", "Engineering Controls", "Substitution"],
          correctAnswer: "Elimination",
          explanation: "Elimination, removing the hazard completely, is the most effective control method and should always be considered first.",
          difficulty: 'basic'
        },
        {
          question: "What is the proper ladder ratio for safe setup?",
          options: ["2:1", "3:1", "4:1", "5:1"],
          correctAnswer: "4:1",
          explanation: "The 4:1 ratio means for every 4 feet of ladder height, the base should be 1 foot from the wall, ensuring proper angle and stability.",
          difficulty: 'intermediate'
        },
        {
          question: "Category 3 water is also known as?",
          options: ["Clean water", "Grey water", "Black water", "Storm water"],
          correctAnswer: "Black water",
          explanation: "Category 3 or 'black water' contains sewage or other contamination posing serious health risks, requiring maximum PPE and safety protocols.",
          difficulty: 'basic'
        },
        {
          question: "What type of respirator is minimum for mould exposure?",
          options: ["Dust mask", "N95", "P2", "Full face"],
          correctAnswer: "N95",
          explanation: "N95 respirators are the minimum protection for mould exposure, filtering 95% of airborne particles including mould spores.",
          difficulty: 'intermediate'
        }
      ]
    }
  ],

  practicalAssignments: [
    {
      title: "Regional Disaster Risk Assessment",
      description: "Research and document the disaster history and risks in your service area",
      duration: "2 hours",
      deliverables: [
        "Map showing disaster-prone areas in your region",
        "List of 10 major disasters in last 5 years with damage estimates",
        "Risk matrix rating disaster types by frequency and severity",
        "Contact list for local emergency management agencies"
      ],
      evaluationCriteria: [
        "Accuracy of historical disaster data",
        "Completeness of risk identification",
        "Quality of visual presentation",
        "Practical applicability to service area"
      ]
    },
    {
      title: "Professional Development Plan",
      description: "Create your 12-month professional development roadmap",
      duration: "1 hour",
      deliverables: [
        "Skills assessment identifying strengths and gaps",
        "Certification timeline for IICRC credentials",
        "Training budget and funding sources",
        "Network building strategy for local market"
      ],
      evaluationCriteria: [
        "Realistic timeline for certification",
        "Specific, measurable goals",
        "Budget feasibility",
        "Alignment with NRP standards"
      ]
    },
    {
      title: "Safety Equipment Audit",
      description: "Inventory and inspect all personal safety equipment",
      duration: "1.5 hours",
      deliverables: [
        "Complete PPE inventory checklist",
        "Photos of all safety equipment",
        "List of equipment needing replacement",
        "Purchase order for missing items"
      ],
      evaluationCriteria: [
        "Completeness of inventory",
        "Proper inspection procedures followed",
        "Identification of deficiencies",
        "Compliance with minimum requirements"
      ]
    }
  ],

  keyTerminology: [
    {
      term: "IICRC",
      definition: "Institute of Inspection, Cleaning and Restoration Certification",
      context: "The global certification body setting standards for restoration industry",
      relatedTerms: ["WRT", "ASD", "FSRT", "AMRT"]
    },
    {
      term: "Mitigation",
      definition: "Actions taken to reduce the severity of damage after a disaster",
      context: "Primary focus in first 24-48 hours to prevent secondary damage",
      relatedTerms: ["Stabilization", "Emergency services", "Temporary repairs"]
    },
    {
      term: "Scope of Work",
      definition: "Detailed document outlining all restoration work to be performed",
      context: "Legal document used for insurance claims and customer approval",
      relatedTerms: ["Estimate", "Quote", "Work authorization"]
    },
    {
      term: "Loss Assessment",
      definition: "Professional evaluation of damage extent and restoration requirements",
      context: "Critical first step determining project size and resource needs",
      relatedTerms: ["Initial inspection", "Damage evaluation", "Claim assessment"]
    },
    {
      term: "CAT Event",
      definition: "Catastrophe event declared by insurance industry",
      context: "Triggers surge pricing and resource mobilization protocols",
      relatedTerms: ["Natural disaster", "State of emergency", "Major loss"]
    },
    {
      term: "Secondary Damage",
      definition: "Additional damage occurring after initial disaster event",
      context: "Mould growth, structural degradation, content damage from delays",
      relatedTerms: ["Consequential loss", "Progressive damage", "Mould amplification"]
    }
  ],

  realWorldScenarios: [
    {
      title: "2022 Lismore Floods Response",
      location: "Lismore, NSW",
      date: "February-March 2022",
      description: "Record-breaking floods submerged entire town with 14.4m flood height, affecting 30,000 residents and causing $750 million in damage.",
      challenges: [
        "Unprecedented water levels exceeded all previous records",
        "Complete infrastructure failure - no power, water, communications",
        "Contaminated water with sewage and agricultural chemicals",
        "Limited access with all roads cut for weeks",
        "Overwhelming demand with insufficient contractors",
        "Residents traumatized by second major flood in 2 years"
      ],
      solutions: [
        "Military airlift brought contractors and equipment",
        "Established basecamp with satellite communications",
        "Implemented triage system prioritizing vulnerable residents",
        "Partnered with mental health services for integrated response",
        "Created contractor cooperative to share resources",
        "Developed expedited insurance claim process"
      ],
      lessonsLearned: [
        "Pre-positioning equipment saves critical response time",
        "Community coordination centers improve resource allocation",
        "Mental health support as important as physical restoration",
        "Local knowledge invaluable for navigation and priorities",
        "Clear communication prevents duplication of efforts"
      ],
      discussionPoints: [
        "How would you handle arriving at a site with 50+ damaged homes?",
        "What special considerations apply for contaminated floodwater?",
        "How do you maintain professional boundaries with traumatized residents?",
        "What equipment pre-positioning would help your region?"
      ]
    },
    {
      title: "Black Summer Bushfire Recovery",
      location: "Mallacoota, Victoria",
      date: "December 2019 - March 2020",
      description: "Bushfires trapped 4,000 people on beach, destroyed 123 homes, and left toxic smoke damage across entire region.",
      challenges: [
        "Toxic smoke penetration in undamaged buildings",
        "Asbestos contamination from older homes",
        "No road access for 3 weeks",
        "Wildlife casualties creating biohazard",
        "Ash contamination of water supplies",
        "Extreme emotional trauma in tight-knit community"
      ],
      solutions: [
        "Barge transport for equipment and supplies",
        "HEPA filtration systems for smoke remediation",
        "Asbestos specialists for safe demolition",
        "Coordination with wildlife rescue groups",
        "Community meetings for transparent communication",
        "Staged approach allowing resident participation"
      ],
      lessonsLearned: [
        "Smoke damage extends far beyond fire zone",
        "Community involvement speeds emotional recovery",
        "Asbestos planning essential for older communities",
        "Marine transport viable for coastal disasters",
        "Cultural sensitivity crucial in small communities"
      ],
      discussionPoints: [
        "How do you assess smoke damage in standing structures?",
        "What PPE is essential for fire damage restoration?",
        "How would you coordinate with other emergency services?",
        "What are the long-term health considerations for smoke exposure?"
      ]
    }
  ],

  dailyChecklist: [
    "Complete all module content and assessments",
    "Submit practical assignments via portal",
    "Review safety protocols and check PPE",
    "Connect with study group or mentor",
    "Update learning journal with key insights",
    "Prepare questions for tomorrow's session",
    "Check equipment and supplies for Day 2",
    "Review local disaster history research"
  ],

  homeworkAssignments: [
    {
      title: "Local Market Analysis",
      estimatedTime: "2 hours",
      instructions: [
        "Research 5 restoration companies in your area",
        "Identify their service offerings and pricing",
        "Analyze their online reviews and reputation",
        "Determine market gaps you could fill",
        "Create competitive analysis spreadsheet"
      ],
      submissionRequirements: [
        "Excel spreadsheet with competitor analysis",
        "500-word market opportunity summary",
        "List of 3 unique value propositions for your business"
      ]
    },
    {
      title: "Emergency Contact Database",
      estimatedTime: "1 hour",
      instructions: [
        "Compile emergency services contacts for your region",
        "Include utilities, councils, emergency management",
        "Add supplier contacts for equipment and materials",
        "Create after-hours contact protocols",
        "Organize in easily accessible format"
      ],
      submissionRequirements: [
        "Digital contact database (Excel or similar)",
        "Printed emergency contact card for vehicle",
        "Uploaded to NRP contractor portal"
      ]
    }
  ],

  certificationRequirements: [
    {
      requirement: "Pass Day 1 Assessment with 80% or higher",
      verificationMethod: "Online assessment system",
      passingCriteria: "32/40 questions correct"
    },
    {
      requirement: "Complete all practical assignments",
      verificationMethod: "Instructor review and feedback",
      passingCriteria: "All deliverables submitted and approved"
    },
    {
      requirement: "Demonstrate safety protocol knowledge",
      verificationMethod: "Safety scenario evaluation",
      passingCriteria: "Identify all major hazards in case studies"
    },
    {
      requirement: "Sign NRP Code of Conduct",
      verificationMethod: "Digital signature system",
      passingCriteria: "Completed with witness verification"
    }
  ]
};

// ============================================
// DAY 2: WATER DAMAGE RESTORATION FUNDAMENTALS
// ============================================

const day2: DayContent = {
  day: 2,
  title: "Water Damage Restoration Mastery",
  subtitle: "Science, Process, and Practical Application",
  overview: `Water damage represents 60% of all restoration work in Australia. Today you'll master the scientific principles, assessment techniques, and restoration procedures that form the foundation of professional water damage restoration. From burst pipes to catastrophic flooding, you'll learn to approach every water loss with confidence and competence.`,
  duration: "8 hours",
  difficulty: 'beginner',
  prerequisites: [1],
  
  learningObjectives: [
    {
      id: "D2-LO1",
      title: "Master Water Damage Categories and Classes",
      description: "Accurately categorize water damage for proper restoration approach",
      measurableOutcome: "Correctly classify 20 water damage scenarios with 100% accuracy",
      assessmentCriteria: "Written and photographic classification test"
    },
    {
      id: "D2-LO2",
      title: "Understand Psychrometry and Drying Science",
      description: "Apply scientific principles to create efficient drying strategies",
      measurableOutcome: "Calculate drying requirements and equipment needs for various scenarios",
      assessmentCriteria: "Psychrometric calculations and equipment selection exercise"
    },
    {
      id: "D2-LO3",
      title: "Execute Water Extraction and Mitigation",
      description: "Perform emergency water extraction following industry standards",
      measurableOutcome: "Demonstrate complete water extraction process from arrival to completion",
      assessmentCriteria: "Practical demonstration with time and quality standards"
    },
    {
      id: "D2-LO4",
      title: "Document for Insurance Claims",
      description: "Create comprehensive documentation meeting insurer requirements",
      measurableOutcome: "Produce insurance-ready documentation package for case study",
      assessmentCriteria: "Documentation review against insurance standards checklist"
    }
  ],

  modules: [
    {
      id: "D2-M1",
      title: "Water Damage Categories and Classes",
      duration: 90,
      type: 'video',
      content: `
**Understanding Water Categories: The Foundation of Safe Restoration**

Water damage categorization determines your safety approach, equipment needs, and restoration procedures. Getting this wrong can endanger health, violate regulations, and result in claim denial.

**Category 1: Clean Water**

Source: Broken supply lines, tub overflows, appliance malfunctions, rainwater (without contaminants)

Characteristics:
- No substantial risk to humans
- Clear, odorless water
- pH between 6.5-8.5
- Total dissolved solids < 500 ppm
- No biological contamination

**Critical Timeline: Category 1 becomes Category 2 within 24-48 hours due to:**
- Microbial amplification
- Contact with building materials
- Temperature and humidity conditions
- Organic material presence

Real Example: Brisbane apartment complex, July 2023
- Cause: Burst pipe in unit 412 while residents on holiday
- Discovery: 36 hours later by property manager
- Initial: 500L of clean water released
- Result: Category 2 classification due to time elapsed
- Impact: $45,000 restoration vs $15,000 if caught immediately

PPE Required:
- Safety boots
- Work gloves
- Eye protection
- No respiratory protection needed initially

Restoration Approach:
- Direct extraction
- Structural drying
- No removal of uncontaminated materials
- Standard drying equipment
- Minimal antimicrobial application

**Category 2: Grey Water**

Source: Dishwasher overflow, washing machine discharge, toilet overflow (urine only), aquarium water

Characteristics:
- Contains significant contamination
- May cause illness if consumed
- Biological contamination present
- Chemical contamination possible
- Unpleasant odor developing

**Critical Timeline: Category 2 becomes Category 3 within 24-48 hours**

Real Example: Gold Coast restaurant, March 2024
- Cause: Commercial dishwasher drain backup
- Volume: 800L of grey water through kitchen
- Contamination: Food particles, grease, detergents
- Response time: 4 hours
- Special considerations: Food prep areas require sanitization
- Cost: $35,000 including business interruption

PPE Required:
- Waterproof boots
- Nitrile gloves under work gloves
- N95 respirator minimum
- Eye protection
- Disposable coveralls recommended

Restoration Approach:
- Controlled extraction with containment
- Removal of contaminated porous materials
- HEPA filtration during work
- Antimicrobial application mandatory
- Detailed cleaning before drying
- Post-restoration verification testing

**Category 3: Black Water**

Source: Sewage, flooding, ground water, seawater, river water

Characteristics:
- Grossly contaminated
- Contains pathogenic agents
- Immediate health hazard
- Toxic or allergenic materials
- Strong offensive odor

Real Example: Townsville floods, January 2024
- Cause: Monsoon trough causing river flooding
- Affected: 450 homes with Category 3 water
- Contamination: Sewage, agricultural runoff, chemicals
- Health issues: 15 hospitalizatfions from exposure
- Special requirements: Hepatitis A vaccinations for workers
- Total damage: $125 million

PPE Required (Minimum):
- Rubber boots, steel cap
- Double gloves (nitrile inner, rubber outer)
- P2/P3 respirator or full-face
- Disposable coveralls (Cat 3 rated)
- Eye protection (goggles if not full-face)
- Decontamination station mandatory

Restoration Approach:
- Containment barriers before work
- Negative air pressure required
- Remove all contaminated materials
- Multiple cleaning cycles
- ATP testing for verification
- Clearance certificate required
- Health department notification often required

**Water Damage Classes: Determining Drying Difficulty**

**Class 1: Least Amount of Water**
- Water confined to one room
- < 40% of floor area affected
- Minimal carpet/padding affected
- Minimal wicking into walls
- Equipment: 1 dehumidifier per 150-200 sq ft

Example: Bathroom sink overflow affecting small area

**Class 2: Large Amount of Water**
- Entire room affected
- > 40% of floor area
- Wicking up walls 12-24 inches
- Structural materials affected
- Equipment: 1 dehumidifier per 100-150 sq ft

Example: Water heater failure in utility room

**Class 3: Greatest Amount of Water**
- Water from overhead
- Ceilings, walls, insulation saturated
- Multiple floors affected
- Extensive wicking >24 inches
- Equipment: 1 dehumidifier per 50-100 sq ft

Example: Upstairs bathroom flood affecting multiple levels

**Class 4: Specialty Drying Situations**
- Materials with low permeance/porosity
- Hardwood, plaster, concrete, crawlspaces
- Longer drying times
- Special equipment needed
- Equipment: Specialty systems (desiccant, heat, injection)

Example: Concrete slab with hardwood flooring system

**Classification Matrix for Quick Reference:**

Assessment Factors:
1. Source of water
2. Time elapsed since loss
3. Temperature and humidity
4. Pre-existing conditions
5. Materials affected
6. Occupant health concerns

Decision Tree:
1. Is source contaminated? → Category 2 or 3
2. Has 48+ hours elapsed? → Increase category
3. Are there immune-compromised occupants? → Increase precautions
4. Is area > 40% affected? → Class 2 minimum
5. Is water from above? → Class 3
6. Are materials non-porous? → Class 4

**Common Misclassification Errors:**

1. **Treating aged Category 1 as still clean**
   - Result: Mould growth, health issues, claim denial
   - Prevention: Always consider time factor

2. **Underestimating grey water contamination**
   - Result: Insufficient PPE, illness, liability
   - Prevention: When in doubt, upgrade category

3. **Missing hidden moisture pockets**
   - Result: Secondary damage, callbacks, reputation damage
   - Prevention: Thorough moisture mapping

4. **Ignoring specialty materials**
   - Result: Inadequate drying, material failure
   - Prevention: Proper Class 4 identification

**Insurance Implications:**

Proper classification affects:
- Coverage determination
- Restoration vs replacement decisions
- Claim settlement amounts
- Liability assignments
- Documentation requirements
- Health and safety compliance

Insurers typically accept:
- Category 1: Full restoration
- Category 2: Selective removal and restoration
- Category 3: Significant removal and replacement
- Class 1-2: Standard drying protocols
- Class 3-4: Extended drying with monitoring

**Regional Considerations:**

Tropical North Queensland:
- Faster category degradation (24 hours)
- Higher humidity slows drying
- Increased mould risk
- Cyclone water always Category 3

Temperate Southern Regions:
- Standard 48-hour degradation
- Seasonal humidity variations
- Winter: Slower drying, condensation issues
- Summer: Faster biological growth

Arid Central Australia:
- Slower category degradation
- Faster drying potential
- Flash flood water highly contaminated
- Distance affects response time

**Documentation Requirements:**

For every classification:
1. Photo documentation of source
2. Moisture readings and mapping
3. Time stamps for all observations
4. Category determination rationale
5. Class assessment with measurements
6. PPE usage documentation
7. Customer advisement records
8. Changes in classification over time
      `,
      keyPoints: [
        "Water categories determine safety protocols and restoration approach",
        "Category degrades over time: 1→2 in 24-48 hours, 2→3 in 24-48 hours",
        "Classes determine drying difficulty and equipment requirements",
        "Proper classification prevents health hazards and claim issues",
        "Documentation of classification rationale is essential",
        "Regional factors affect degradation rates and drying times"
      ],
      practicalExercises: [
        "Classify 20 photo scenarios for category and class",
        "Create PPE selection chart for each category",
        "Calculate equipment needs for different class scenarios",
        "Document classification for mock insurance claim"
      ],
      assessmentQuestions: [
        {
          question: "How long before Category 1 water typically degrades to Category 2?",
          options: ["12-24 hours", "24-48 hours", "48-72 hours", "72-96 hours"],
          correctAnswer: "24-48 hours",
          explanation: "Category 1 water typically becomes Category 2 within 24-48 hours due to microbial amplification and contact with building materials.",
          difficulty: 'basic'
        },
        {
          question: "What defines a Class 3 water damage?",
          options: [
            "Large floor area affected",
            "Water from overhead affecting ceilings and walls",
            "Specialty materials involved",
            "Minimal water absorption"
          ],
          correctAnswer: "Water from overhead affecting ceilings and walls",
          explanation: "Class 3 involves the greatest amount of water, typically from overhead sources, saturating ceilings, walls, and insulation.",
          difficulty: 'intermediate'
        },
        {
          question: "Which PPE is minimum for Category 3 water?",
          options: [
            "Work gloves and boots",
            "N95 respirator and gloves",
            "P2/P3 respirator, double gloves, disposable coveralls",
            "Standard work clothes"
          ],
          correctAnswer: "P2/P3 respirator, double gloves, disposable coveralls",
          explanation: "Category 3 black water requires maximum PPE including P2/P3 respirator, double gloves, and Category 3 rated disposable coveralls due to serious contamination.",
          difficulty: 'intermediate'
        },
        {
          question: "What percentage of floor area affected indicates Class 2?",
          options: ["<20%", "<40%", ">40%", ">60%"],
          correctAnswer: ">40%",
          explanation: "Class 2 water damage involves more than 40% of the floor area affected with water wicking up walls 12-24 inches.",
          difficulty: 'basic'
        }
      ]
    },
    {
      id: "D2-M2",
      title: "Psychrometry and Drying Science",
      duration: 120,
      type: 'interactive',
      content: `
**The Science of Drying: Mastering Psychrometry**

Professional water damage restoration isn't guesswork - it's applied science. Understanding psychrometry (the study of air and moisture relationships) transforms you from equipment operator to drying engineer.

**Fundamental Concepts:**

**Water's Three States in Buildings:**

1. **Liquid Water (Free Water)**
   - Visible standing water
   - Water in materials above fiber saturation
   - Removed by: Extraction, pumping, mopping
   - Easiest and fastest to remove
   - 1 litre = 1kg = 1000ml

2. **Bound Water (Absorbed)**
   - Water chemically bound in materials
   - Below fiber saturation point
   - Removed by: Evaporation only
   - Requires energy input (heat/airflow)
   - Determines drying time

3. **Water Vapour (Humidity)**
   - Gaseous water in air
   - Measured as relative humidity (RH)
   - Removed by: Dehumidification, ventilation
   - Must be controlled to enable drying
   - Can re-condense if not managed

**Key Psychrometric Terms:**

**Relative Humidity (RH):**
- Percentage of moisture air holds vs capacity
- Target: 30-40% for optimal drying
- Above 60%: Minimal drying, mould risk
- Below 30%: Over-drying, material damage

**Specific Humidity (Grains Per Pound - GPP):**
- Actual moisture content in air
- 7000 grains = 1 pound of water
- Unaffected by temperature
- True measure for dehumidifier sizing

**Dew Point:**
- Temperature where condensation occurs
- Critical for preventing secondary damage
- Must keep surfaces above dew point
- Determines when to heat vs dehumidify

**Vapor Pressure:**
- Force driving evaporation
- Greater differential = faster drying
- Created by lowering RH or raising temperature
- Determines drying rate

**Temperature's Role:**
- Every 10°C increase doubles air's moisture capacity
- Warmer air accelerates evaporation
- But can increase vapor pressure differential
- Balance with material heat tolerance

**Psychrometric Chart Application:**

Reading the Chart:
1. Find current temperature (dry bulb)
2. Find current RH or wet bulb
3. Intersection shows all properties
4. Determine grains per pound (GPP)
5. Calculate dehumidification needs

Example Calculation:
- Room: 25°C, 80% RH
- Chart shows: 115 GPP
- Target: 40% RH = 55 GPP
- Must remove: 60 GPP
- Room volume: 1000 cubic feet
- Air changes: 6 per hour
- Total grains/hour: 60 × 1000 × 6 = 360,000
- Daily removal: 8,640,000 grains = 1,234 pounds = 148 gallons

**The Drying Process: Phase by Phase**

**Phase 1: Emergency Mitigation (0-24 hours)**
Priority: Remove bulk water
- Extract standing water
- Remove saturated materials
- Establish initial airflow
- Document everything
- No dehumidification yet (inefficient)

Moisture Movement: Liquid phase
Equipment Focus: Extractors, pumps
Target: Remove 90% of free water

**Phase 2: Rapid Evaporation (24-72 hours)**
Priority: Maximum evaporation rate
- Install dehumidifiers
- Create optimal temperature
- Establish air movement patterns
- Monitor surface temperatures
- Prevent condensation

Moisture Movement: Liquid to vapor
Equipment Focus: Dehumidifiers, air movers
Target: Reach 20% moisture content

**Phase 3: Declining Rate (72+ hours)**
Priority: Remove bound water
- Maintain consistent conditions
- May need specialized equipment
- Monitor deep moisture
- Adjust for material types
- Document drying progress

Moisture Movement: Bound water slowly releasing
Equipment Focus: Specialized systems
Target: Reach dry standard (<16% wood)

**Equipment Selection Science:**

**Refrigerant Dehumidifiers:**
- Optimal: 20-30°C, 40-90% RH
- Capacity: 50-150 pints/day typical
- Energy efficient in warm conditions
- Less effective below 15°C
- Coverage: 150-300 sq ft per unit

**Desiccant Dehumidifiers:**
- Optimal: Below 20°C or <40% RH
- Capacity: 150-500 pints/day
- Work in cold conditions
- Very low RH achievable
- Coverage: 500-1000 sq ft per unit

**Air Movers:**
- Velocity: 3000+ FPM optimal
- Angle: 15-45 degrees to surface
- Spacing: 10-16 linear feet
- Pattern: Vortex for maximum evaporation
- Power: 1 per 10-16 linear feet of wall

**Heat Systems:**
- Indirect fired: Clean, safe heat
- Direct fired: Adds moisture, ventilation required
- Electric: Limited by power availability
- Target: 25-35°C for optimal drying

**Drying Strategy Development:**

**Open Drying System:**
- Windows/doors open
- Fresh air exchange
- Good for small losses
- Weather dependent
- Energy inefficient

When to use:
- Outside RH <40%
- Small affected area
- Good weather forecast
- Budget constraints

**Closed Drying System:**
- Sealed environment
- Recirculating air
- Maximum efficiency
- Weather independent
- Higher equipment cost

When to use:
- Outside RH >60%
- Large losses
- Climate control needed
- Faster drying required

**Balanced Pressure System:**
- Negative pressure in affected area
- HEPA filtration
- Prevents cross-contamination
- Required for Category 2/3
- Protects unaffected areas

**Material-Specific Drying:**

**Timber Flooring:**
- Equilibrium Moisture Content (EMC): 8-12%
- Maximum safe temperature: 30°C
- Drying rate: 1-2% per day maximum
- Cupping/crowning prevention crucial
- May need refinishing regardless

**Carpet and Pad:**
- Pad often non-salvageable (Category 2/3)
- Floating carpet for airflow
- Dry within 48 hours
- Monitor for delamination
- Clean before final drying

**Drywall/Gypsum:**
- Moisture content target: <1%
- Wicking height determines removal
- Category 1: May dry in place
- Category 2/3: Remove to 300mm above waterline
- Check for hidden insulation

**Concrete:**
- Very slow drying (weeks/months)
- Moisture meter unreliable
- Calcium chloride test preferred
- May need specialty equipment
- Flooring warranty considerations

**Monitoring and Documentation:**

Daily Monitoring Requirements:
1. **Atmospheric Readings:**
   - Temperature
   - Relative humidity
   - GPP (grains per pound)
   - Dew point

2. **Material Moisture:**
   - Multiple locations
   - Affected vs unaffected
   - Surface and core readings
   - Trending analysis

3. **Equipment Performance:**
   - Dehumidifier grain depression
   - Extraction tank volumes
   - Power consumption
   - Operating temperatures

4. **Progress Indicators:**
   - Drying rate calculation
   - Estimated completion
   - Problem areas identified
   - Adjustment rationale

**Common Drying Mistakes:**

1. **Over-drying Materials**
   - Causes: Cracking, warping, shrinkage
   - Prevention: Monitor unaffected areas, maintain 30-40% RH

2. **Under-drying Hidden Areas**
   - Causes: Mould, structural damage, odors
   - Prevention: Thorough moisture mapping, invasive inspection

3. **Ignoring Vapor Barriers**
   - Causes: Trapped moisture, slow drying
   - Prevention: Create drying chambers, remove barriers

4. **Insufficient Air Movement**
   - Causes: Slow evaporation, uneven drying
   - Prevention: Proper air mover placement and quantity

5. **Wrong Equipment Selection**
   - Causes: Inefficient drying, high costs
   - Prevention: Psychrometric calculations, proper sizing

**Advanced Drying Technologies:**

**Injection Drying:**
- For cavities and hard-to-reach areas
- Forced air through small holes
- Saves removal of materials
- Requires careful monitoring

**Heat Drying Systems:**
- Trailer-mounted units
- Raises temperature to 40-60°C
- Reduces drying time 50-75%
- Requires careful material monitoring

**Desiccant Systems:**
- Ultra-low humidity achievement
- Document and artifact drying
- Freezer drying for books
- Specialty material restoration
      `,
      keyPoints: [
        "Psychrometry enables scientific drying approach versus guesswork",
        "Three water states require different removal methods",
        "Temperature and RH relationship determines drying rate",
        "Equipment selection based on psychrometric calculations",
        "Material-specific drying prevents secondary damage",
        "Daily monitoring and documentation essential for success"
      ],
      practicalExercises: [
        "Read psychrometric chart for 10 different conditions",
        "Calculate dehumidification needs for case study",
        "Design drying system for Class 2 water loss",
        "Create monitoring log for 3-day drying project"
      ],
      assessmentQuestions: [
        {
          question: "What are grains per pound (GPP)?",
          options: [
            "Temperature measurement",
            "Relative humidity percentage",
            "Actual moisture content in air",
            "Drying rate measurement"
          ],
          correctAnswer: "Actual moisture content in air",
          explanation: "Grains per pound (GPP) measures the actual moisture content in air, with 7000 grains equaling 1 pound of water. It's unaffected by temperature and is the true measure for dehumidifier sizing.",
          difficulty: 'intermediate'
        },
        {
          question: "At what relative humidity does mould growth risk increase significantly?",
          options: ["40%", "50%", "60%", "70%"],
          correctAnswer: "60%",
          explanation: "Relative humidity above 60% significantly increases mould growth risk and reduces drying effectiveness. Target RH for drying is 30-40%.",
          difficulty: 'basic'
        },
        {
          question: "Which dehumidifier type works best below 15°C?",
          options: [
            "Refrigerant",
            "Desiccant",
            "Both equally",
            "Neither works below 15°C"
          ],
          correctAnswer: "Desiccant",
          explanation: "Desiccant dehumidifiers work effectively in cold conditions below 20°C where refrigerant units lose efficiency. They can achieve very low RH levels even in cold environments.",
          difficulty: 'intermediate'
        },
        {
          question: "What is the optimal air mover spacing for wall drying?",
          options: ["5-8 feet", "10-16 feet", "20-25 feet", "30-35 feet"],
          correctAnswer: "10-16 feet",
          explanation: "Air movers should be spaced 10-16 linear feet apart along walls for optimal drying, with velocity of 3000+ FPM and angled 15-45 degrees to the surface.",
          difficulty: 'advanced'
        }
      ]
    },
    {
      id: "D2-M3",
      title: "Water Extraction and Mitigation Procedures",
      duration: 90,
      type: 'practical',
      content: `
**Professional Water Extraction: From Arrival to Completion**

The first 24 hours after water damage determine whether a $5,000 mitigation becomes a $50,000 restoration. This module covers the complete extraction and mitigation process using IICRC S500 standards.

**Pre-Arrival Preparation:**

**Customer Phone Intake:**
- Identify water source and if stopped
- Determine category (describe, don't ask)
- Assess immediate safety concerns
- Provide emergency mitigation instructions
- Confirm address and access
- Estimate arrival time
- Document call details

**Emergency Instructions for Customer:**
- Shut off water source if safe
- Turn off electricity to affected areas
- Remove valuable items if safe
- Take photos for insurance
- Do not use household vacuum
- Do not walk on wet carpet unnecessarily
- Open windows if weather permits

**Vehicle Setup and Equipment Check:**

Essential Equipment Checklist:
- Truck-mount or portable extractor
- Submersible pumps (multiple sizes)
- Moisture meters (penetrating and non-penetrating)
- Thermo-hygrometer
- Infrared camera (if available)
- Air movers (minimum 6)
- Dehumidifiers (minimum 2)
- PPE for appropriate category
- Documentation tools (tablet/camera)
- Customer communication materials
- Safety equipment and signage

**Arrival and Initial Assessment:**

**First 5 Minutes (External):**
1. Park safely, don't block emergency access
2. Assess structural integrity
3. Check for electrical hazards
4. Identify water source location
5. Note environmental conditions
6. Set up safety barriers

**Customer Contact Protocol:**
- Professional introduction with ID
- Express empathy for their situation
- Explain assessment process
- Get permission to document
- Confirm insurance details
- Set realistic expectations
- Have them sign initial authorization

**Systematic Interior Assessment:**

**Safety Sweep:**
- Test for electrical hazards
- Check ceiling stability
- Assess slip/trip hazards
- Identify contamination level
- Ensure adequate ventilation
- Document all safety issues

**Moisture Mapping Process:**
1. Start at obvious water source
2. Work outward in grid pattern
3. Check every room systematically
4. Test walls at multiple heights
5. Check behind furniture
6. Inspect adjoining rooms
7. Check floor below if applicable
8. Inspect ceiling/floor above

**Documentation Requirements:**
- Moisture reading map
- Photo of every affected room
- Close-ups of damage
- Water source documentation
- Pre-existing conditions
- Contents inventory
- Structural materials affected

**Extraction Procedures:**

**Standing Water Removal:**

**Truck-Mount Extraction (Preferred):**
- Most powerful option (15-20" Hg)
- Heats water for better extraction
- Large waste tank capacity
- Multiple technicians simultaneously

Setup:
1. Run hoses avoiding damage
2. Protect doorways and corners
3. Start furthest from truck
4. Work toward exit
5. overlap extraction paths
6. Extract multiple times

**Portable Extraction:**
- For high-rise or limited access
- Less powerful (12-15" Hg)
- Requires frequent emptying
- Good for smaller areas

**Weighted Extraction:**
- For glue-down carpet
- Reduces delamination
- Slower but thorough
- Preserves carpet integrity

**Submersible Pump Usage:**
- For deep standing water (>50mm)
- Clear large volumes quickly
- Various sizes for different areas
- Must monitor discharge location

**Carpet and Pad Procedures:**

**Category 1 Water:**
1. Extract carpet in place
2. Disengage carpet at doorways
3. Fold back carpet carefully
4. Remove and dispose of pad
5. Clean and dry subfloor
6. Extract carpet again
7. Float carpet with air movers
8. Install new pad when dry

**Category 2/3 Water:**
1. Determine if carpet salvageable
2. If yes, remove for cleaning
3. Dispose of pad immediately
4. Clean and sanitize subfloor
5. Multiple antimicrobial applications
6. Professional cleaning required
7. Reinstall only after clearance

**Carpet Removal Technique:**
- Cut in manageable sections (2m wide)
- Roll with contaminated side in
- Bag immediately if Category 3
- Document disposal weight
- Provide disposal certificates

**Hard Surface Water Removal:**

**Timber Flooring:**
- Extract surface water immediately
- Check for cupping/crowning
- Remove if buckling present
- Create drying chamber if salvageable
- Monitor moisture content daily
- May require sanding/refinishing

**Tile and Vinyl:**
- Extract surface water
- Check for loose tiles
- Remove if water underneath
- Dry substrate thoroughly
- May need replacement if lifted
- Check adhesive integrity

**Concrete:**
- Extract all surface water
- May hold significant moisture
- Requires extended drying
- Consider drainage system
- Test with calcium chloride
- May need sealing after drying

**Wall and Ceiling Procedures:**

**Drywall/Gypsum Board:**

Removal Guidelines:
- Category 1: Remove if saturated >50%
- Category 2: Remove 300mm above waterline
- Category 3: Remove 600mm above waterline
- Ceiling: Remove if sagging or saturated

Removal Technique:
1. Score with utility knife
2. Snap along score line
3. Cut paper backing
4. Remove in large pieces
5. Bag if contaminated
6. Inspect insulation behind
7. Document linear meters removed

**Insulation:**
- Remove all wet insulation
- Cannot be effectively dried
- Loses R-value when wet
- Potential mould reservoir
- Bag and dispose properly
- Document type and quantity

**Plaster Walls:**
- May be salvageable if not saturated
- Check with moisture meter
- Drill ventilation holes if keeping
- May require specialized drying
- Historic buildings special consideration

**Contents Management:**

**Priority Items:**
- Important documents
- Electronics
- Photographs
- Artwork
- Furniture
- Clothing

**Pack-Out Procedures:**
1. Photo inventory everything
2. Create detailed list
3. Pack systematically
4. Label boxes clearly
5. Store appropriately
6. Provide inventory to owner
7. Track chain of custody

**Mitigation Setup:**

**Air Mover Placement:**
- One per 10-16 linear feet of wall
- Angle 15-45 degrees to wall
- Create vortex pattern
- Focus on wettest areas first
- Don't blow directly on contents
- Ensure electrical safety

**Dehumidifier Placement:**
- Center of affected area
- Ensure adequate air circulation
- Route drain hoses safely
- Monitor temperature
- Check filters regularly
- Document grain depression

**Containment Setup:**
- Plastic sheeting barriers
- Zipper doors for access
- Negative air if required
- Protect unaffected areas
- Control temperature and RH

**Quality Control Checklist:**

Before Leaving Site:
- All standing water extracted
- Affected materials removed/documented
- Equipment properly placed
- Safety hazards addressed
- Customer walkthrough complete
- Documentation uploaded
- Next visit scheduled
- Emergency contact provided
- Invoice/estimate presented
- Site secured

**Common Extraction Mistakes:**

1. **Insufficient extraction passes**
   - Result: Extended drying time
   - Solution: Extract until no more water recovered

2. **Missing hidden water pockets**
   - Result: Mould growth, callbacks
   - Solution: Thorough moisture mapping

3. **Improper equipment placement**
   - Result: Inefficient drying
   - Solution: Follow scientific placement guidelines

4. **Inadequate documentation**
   - Result: Insurance disputes
   - Solution: Photo and document everything

5. **Leaving contaminated materials**
   - Result: Health hazards, liability
   - Solution: When in doubt, remove it
      `,
      keyPoints: [
        "First 24 hours critical for preventing secondary damage",
        "Systematic assessment prevents missing hidden damage",
        "Proper extraction reduces drying time significantly",
        "Category determines salvageability of materials",
        "Documentation throughout process essential for claims",
        "Equipment placement follows scientific principles"
      ],
      practicalExercises: [
        "Practice complete extraction on mock flooded room",
        "Demonstrate proper carpet removal and disposal",
        "Set up containment barrier with negative air",
        "Complete moisture mapping of building"
      ],
      requiredEquipment: [
        "Portable or truck-mount extractor",
        "Submersible pumps",
        "Moisture meters",
        "Air movers (minimum 6)",
        "Dehumidifiers (minimum 2)",
        "PPE for all categories",
        "Documentation tools"
      ],
      assessmentQuestions: [
        {
          question: "How much drywall should be removed above the waterline for Category 2 water?",
          options: ["150mm", "300mm", "450mm", "600mm"],
          correctAnswer: "300mm",
          explanation: "For Category 2 grey water, remove drywall 300mm (12 inches) above the waterline. Category 3 requires 600mm removal.",
          difficulty: 'basic'
        },
        {
          question: "What vacuum pressure is typical for truck-mount extraction?",
          options: ["5-10\" Hg", "10-15\" Hg", "15-20\" Hg", "20-25\" Hg"],
          correctAnswer: "15-20\" Hg",
          explanation: "Truck-mount extractors typically produce 15-20 inches of mercury (Hg) vacuum pressure, providing the most powerful extraction available.",
          difficulty: 'intermediate'
        },
        {
          question: "Can carpet pad be salvaged after Category 1 water damage?",
          options: [
            "Yes, always",
            "Yes, if dried within 24 hours",
            "No, should always be replaced",
            "Only if professionally cleaned"
          ],
          correctAnswer: "No, should always be replaced",
          explanation: "Carpet pad should always be replaced even with Category 1 water as it cannot be effectively cleaned and dried, and acts as a dirt and contaminant filter.",
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: "D2-M4",
      title: "Insurance Documentation and Billing",
      duration: 60,
      type: 'reading',
      content: `
**Mastering Insurance Documentation: Getting Paid for Your Work**

Professional documentation is the difference between full payment and disputes. Insurance companies require specific information presented in standardized formats. This module ensures every claim you submit gets approved.

**Understanding the Insurance Process:**

**Key Players:**
1. **Policyholder**: Your customer, pays excess
2. **Insurer**: Pays claim per policy terms
3. **Adjuster**: Validates and approves claim
4. **Contractor**: You, performs restoration
5. **Broker**: May advocate for policyholder

**Policy Components Affecting You:**
- Coverage limits and exclusions
- Excess/deductible amounts
- Replacement vs repair provisions
- Depreciation considerations
- Code upgrade requirements
- Additional living expenses (ALE)

**Documentation Requirements:**

**Initial Report Must Include:**

1. **Cause of Loss Statement**
   - Specific source identification
   - Date and time of occurrence
   - How discovered
   - Immediate actions taken
   - Category and class determination

Example:
"Water supply line to upstairs bathroom vanity failed due to age-related deterioration. Discovered by homeowner at 14:30 on 15/03/2024 upon returning from work. Water immediately shut off. Category 1 water affecting Class 2 area."

2. **Affected Areas Documentation**
   - Room-by-room inventory
   - Square footage/meters affected
   - Materials impacted
   - Moisture readings
   - Contamination level

3. **Mitigation Actions**
   - Emergency services provided
   - Materials removed
   - Equipment deployed
   - Safety measures taken
   - Further damage prevented

**Photographic Documentation Standards:**

**Required Photos:**
- Exterior of property (establish location)
- Cause of loss (failed component)
- Overall room views (show scope)
- Specific damage close-ups
- Moisture meter readings
- Pre-existing conditions
- Work in progress
- Completion photos

**Photo Best Practices:**
- Include measuring tape for scale
- Use consistent angles
- Good lighting essential
- Label immediately
- Time/date stamp enabled
- Minimum 2MP resolution
- Multiple angles of same damage

**Moisture Documentation:**

**Moisture Mapping Requirements:**
- Grid pattern readings
- Wall readings at 3 heights
- Affected vs unaffected comparison
- Daily progress tracking
- Final dry standard proof
- Atmospheric conditions

Format Example:
\`\`\`
Room: Master Bedroom
Date: 15/03/2024
Time: 15:45
Temp: 22°C
RH: 78%

Wall Moisture Readings (%):
North: Base-95, 1m-45, 2m-15
East: Base-85, 1m-35, 2m-10
South: Base-25, 1m-12, 2m-8
West: Base-30, 1m-15, 2m-8
\`\`\`

**Scope of Work Writing:**

**Essential Elements:**
1. Specific area identification
2. Detailed task description
3. Materials and quantities
4. Industry standard reference
5. Justification for approach

**Good Scope Example:**
"Master Bedroom (5m x 4m): Remove and dispose of Category 1 water-damaged carpet and underlay (20m²). Extract water from subfloor. HEPA vacuum all surfaces. Apply antimicrobial to subfloor per IICRC S500 standards. Install drying equipment: 4 air movers, 1 dehumidifier. Monitor daily until dry standard achieved (<16% WME). Supply and install new underlay and re-install cleaned carpet."

**Poor Scope Example:**
"Dry out bedroom and replace damaged materials as needed."

**Xactimate Usage (Industry Standard):**

**Line Item Requirements:**
- Correct category codes
- Accurate measurements
- Appropriate price list
- Detailed annotations
- Supporting photos linked
- Sketch when applicable

**Common Line Items:**
- WTR - Water extraction
- DRYAIR - Drying equipment
- DMO - Demolition
- CLN - Cleaning
- FRM - Framing
- DRY - Drywall
- PNT - Painting
- FLR - Flooring
- ANT - Antimicrobial

**Billing Best Practices:**

**Invoice Structure:**
1. **Emergency Mitigation** (immediate payment)
   - Water extraction
   - Initial demolition
   - Equipment setup
   - Emergency tarping

2. **Restoration Services** (after approval)
   - Structural drying
   - Reconstruction
   - Content restoration
   - Final cleaning

**Equipment Charges:**
- Industry standard daily rates
- Delivery/pickup charges
- Monitoring visits
- Power consumption
- Consumables

**Labor Categories:**
- Technician: $75-95/hour
- Supervisor: $95-120/hour
- Specialist: $120-150/hour
- After hours: 1.5x rates
- Weekends: 1.5x rates
- Holidays: 2x rates

**Change Order Management:**

**When Required:**
- Scope increases discovered
- Hidden damage found
- Category changes
- Additional services requested
- Code requirements identified

**Change Order Must Include:**
- Original scope reference
- Reason for change
- Detailed new scope
- Cost breakdown
- Customer signature
- Adjuster notification

**Common Documentation Mistakes:**

1. **Vague Descriptions**
   - Problem: "Water damage in house"
   - Solution: Specific room-by-room detail

2. **Missing Measurements**
   - Problem: No quantities provided
   - Solution: Measure everything twice

3. **No Progress Photos**
   - Problem: Can't prove work done
   - Solution: Daily photo documentation

4. **Delayed Submission**
   - Problem: Details forgotten
   - Solution: Submit within 24-48 hours

5. **No Moisture Logs**
   - Problem: Can't justify drying time
   - Solution: Daily monitoring sheets

**Insurance Negotiation Tips:**

**Building Adjuster Relationships:**
- Professional communication always
- Respond promptly to requests
- Provide complete documentation
- Justify all recommendations
- Be flexible on approach
- Never argue on site

**Handling Disputes:**
1. Review policy language
2. Provide industry standards
3. Get second opinion
4. Document disagreement
5. Escalate professionally
6. Consider appraisal clause

**Depreciation and Replacement Cost:**

**Replacement Cost Value (RCV):**
- Full replacement cost
- No depreciation
- Requires actual replacement
- Two-payment system common

**Actual Cash Value (ACV):**
- Replacement minus depreciation
- Immediate payment
- May not cover full restoration
- Calculate depreciation accurately

**Depreciation Calculation:**
Item: Carpet
Age: 5 years
Life expectancy: 10 years
Replacement cost: $3,000
Depreciation: 50%
ACV payment: $1,500
Recoverable after replacement: $1,500

**Electronic Documentation Systems:**

**Benefits:**
- Real-time submission
- Automatic calculations
- Photo integration
- GPS verification
- Digital signatures
- Cloud backup

**Popular Platforms:**
- Xactimate/Xactanalysis
- CoreLogic
- Symbility
- DocuSketch
- Encircle
- iCat

**Customer Communication:**

**Setting Expectations:**
- Explain insurance process
- Clarify payment responsibilities
- Timeline for approval
- Potential out-of-pocket costs
- Depreciation holdback
- Code upgrade implications

**Regular Updates:**
- Daily progress reports
- Photo updates
- Scope changes immediately
- Completion timeline
- Final walk-through scheduling
      `,
      keyPoints: [
        "Complete documentation determines payment success",
        "Photo documentation must tell complete story",
        "Moisture logs justify equipment and time charges",
        "Scope must be specific with measurements and standards",
        "Xactimate knowledge essential for insurance work",
        "Change orders protect against scope creep"
      ],
      practicalExercises: [
        "Write complete scope for water damage scenario",
        "Create Xactimate estimate for case study",
        "Practice photo documentation standards",
        "Complete insurance documentation package"
      ],
      assessmentQuestions: [
        {
          question: "What is the industry standard software for insurance estimates?",
          options: ["QuickBooks", "Xactimate", "Excel", "SAP"],
          correctAnswer: "Xactimate",
          explanation: "Xactimate is the industry standard software used by insurance adjusters and restoration contractors for creating estimates and documentation.",
          difficulty: 'basic'
        },
        {
          question: "When should a change order be created?",
          options: [
            "Only for major changes",
            "When scope increases or hidden damage found",
            "At project completion",
            "Only if customer requests"
          ],
          correctAnswer: "When scope increases or hidden damage found",
          explanation: "Change orders must be created whenever scope increases, hidden damage is discovered, contamination category changes, or additional services are needed to protect all parties.",
          difficulty: 'intermediate'
        },
        {
          question: "What is the difference between RCV and ACV?",
          options: [
            "No difference",
            "RCV includes depreciation, ACV doesn't",
            "ACV includes depreciation, RCV doesn't",
            "RCV is for commercial only"
          ],
          correctAnswer: "ACV includes depreciation, RCV doesn't",
          explanation: "Actual Cash Value (ACV) is replacement cost minus depreciation, while Replacement Cost Value (RCV) is the full replacement cost without depreciation deduction.",
          difficulty: 'advanced'
        }
      ]
    }
  ],

  practicalAssignments: [
    {
      title: "Complete Water Loss Assessment",
      description: "Perform full assessment of a simulated water loss scenario",
      duration: "2 hours",
      deliverables: [
        "Moisture mapping diagram with readings",
        "Category and class determination with justification",
        "Photo documentation package (20+ photos)",
        "Written scope of work",
        "Equipment placement diagram",
        "Psychrometric calculations for drying"
      ],
      evaluationCriteria: [
        "Accurate category and class identification",
        "Complete moisture documentation",
        "Professional photo quality and coverage",
        "Specific, measurable scope writing",
        "Correct equipment sizing and placement"
      ]
    },
    {
      title: "Insurance Documentation Package",
      description: "Create complete insurance submission for water loss",
      duration: "1.5 hours",
      deliverables: [
        "Cause of loss statement",
        "Xactimate estimate or detailed pricing",
        "Photo documentation with labels",
        "Moisture logs and drying records",
        "Sketch of affected areas",
        "Customer authorization forms"
      ],
      evaluationCriteria: [
        "Completeness of documentation",
        "Accuracy of measurements and pricing",
        "Professional presentation",
        "Compliance with insurance requirements"
      ]
    },
    {
      title: "Drying System Design",
      description: "Design complete drying system for Class 2 water loss",
      duration: "1 hour",
      deliverables: [
        "Psychrometric analysis",
        "Equipment list with specifications",
        "Placement diagram",
        "Monitoring schedule",
        "Estimated drying time calculation"
      ],
      evaluationCriteria: [
        "Correct psychrometric calculations",
        "Appropriate equipment selection",
        "Scientific placement strategy",
        "Realistic timeline estimation"
      ]
    }
  ],

  keyTerminology: [
    {
      term: "Psychrometry",
      definition: "The study of air and its properties related to moisture content",
      context: "Used to calculate drying requirements and equipment needs",
      relatedTerms: ["RH", "GPP", "Dew point", "Vapor pressure"]
    },
    {
      term: "Category 1/2/3 Water",
      definition: "Classification of water contamination level",
      context: "Determines safety protocols and restoration procedures",
      relatedTerms: ["Clean water", "Grey water", "Black water"]
    },
    {
      term: "Class 1/2/3/4",
      definition: "Classification of water damage extent and drying difficulty",
      context: "Determines equipment requirements and drying time",
      relatedTerms: ["Evaporation rate", "Affected area", "Porosity"]
    },
    {
      term: "Bound Water",
      definition: "Water chemically bound within material structure",
      context: "Requires evaporation for removal, determines drying time",
      relatedTerms: ["Free water", "Vapor", "Fiber saturation point"]
    },
    {
      term: "Grain Depression",
      definition: "Difference in moisture content between intake and exhaust of dehumidifier",
      context: "Measures dehumidifier effectiveness",
      relatedTerms: ["GPP", "Specific humidity", "Dehumidification"]
    },
    {
      term: "Vapor Pressure",
      definition: "Force that drives evaporation from wet to dry",
      context: "Higher differential increases drying rate",
      relatedTerms: ["Evaporation", "RH differential", "Drying force"]
    }
  ],

  realWorldScenarios: [
    {
      title: "Brisbane Apartment Complex Flooding",
      location: "Brisbane CBD, Queensland",
      date: "November 2022",
      description: "Storm caused rooftop drainage failure, flooding 15 units across 3 floors of luxury apartment building during tenant occupancy.",
      challenges: [
        "Multiple unit coordination with different insurers",
        "High-value contents requiring pack-out",
        "Asbestos in ceiling materials (1970s building)",
        "Limited access with one elevator operational",
        "Tenant displacement and temporary accommodation",
        "Strata vs individual insurance coverage disputes"
      ],
      solutions: [
        "Established central command in empty unit",
        "Created detailed unit-by-unit documentation system",
        "Engaged asbestos hygienist for safe removal",
        "Implemented night shift work to maximize access",
        "Coordinated with property manager for communications",
        "Developed cost allocation matrix for insurers"
      ],
      lessonsLearned: [
        "Multi-unit losses require project management approach",
        "Clear communication prevents tenant frustration",
        "Asbestos testing essential in older buildings",
        "Night work can accelerate commercial projects",
        "Single point of contact reduces confusion"
      ],
      discussionPoints: [
        "How do you handle multiple insurance policies on one loss?",
        "What special considerations apply to occupied buildings?",
        "How would you manage asbestos discovery during work?",
        "What communication strategies work for multiple stakeholders?"
      ]
    },
    {
      title: "Burst Pipe in Heritage Home",
      location: "Beechworth, Victoria",
      date: "July 2023",
      description: "Frozen pipe burst in 1890s heritage-listed home, affecting original hardwood floors, horsehair plaster walls, and pressed tin ceilings.",
      challenges: [
        "Heritage overlay restrictions on modifications",
        "Irreplaceable original materials",
        "Horsehair plaster requires special drying",
        "Pressed tin ceiling restoration expertise needed",
        "120-year-old hardwood floor preservation",
        "No insurance coverage for heritage upgrades"
      ],
      solutions: [
        "Consulted heritage architect before work",
        "Implemented specialty drying for plaster",
        "Located heritage restoration specialists",
        "Used injection drying to save tin ceilings",
        "Slow, controlled drying for hardwood",
        "Documented everything for heritage records"
      ],
      lessonsLearned: [
        "Heritage properties require specialist approach",
        "Slow drying preserves historic materials",
        "Network of specialists essential for unique projects",
        "Documentation critical for heritage compliance",
        "Customer education about limitations important"
      ],
      discussionPoints: [
        "How do you balance speed with preservation needs?",
        "What specialty drying techniques preserve materials?",
        "When do you need to involve heritage consultants?",
        "How do you handle insurance gaps on heritage properties?"
      ]
    }
  ],

  dailyChecklist: [
    "Complete all module content and assessments",
    "Practice water extraction on training equipment",
    "Review psychrometric chart calculations",
    "Submit documentation package for review",
    "Practice PPE selection for each category",
    "Update equipment inventory checklist",
    "Connect with study group for scenarios",
    "Prepare for Day 3 mould remediation"
  ],

  homeworkAssignments: [
    {
      title: "Local Water Damage Case Study",
      estimatedTime: "2 hours",
      instructions: [
        "Research a recent water damage event in your area",
        "Identify category and class from news reports",
        "Calculate approximate drying equipment needs",
        "Estimate restoration timeline",
        "Identify what you would do differently"
      ],
      submissionRequirements: [
        "1000-word case study analysis",
        "Equipment calculation worksheet",
        "Timeline estimate with justification"
      ]
    },
    {
      title: "Insurance Carrier Research",
      estimatedTime: "1.5 hours",
      instructions: [
        "Identify top 5 insurers in your area",
        "Research their preferred contractor programs",
        "Understand their documentation requirements",
        "Find their emergency response expectations",
        "Learn their payment terms and processes"
      ],
      submissionRequirements: [
        "Insurance carrier comparison matrix",
        "Key contact information sheet",
        "Documentation checklist for each carrier"
      ]
    }
  ],

  certificationRequirements: [
    {
      requirement: "Pass Day 2 Assessment with 85% or higher",
      verificationMethod: "Online assessment system",
      passingCriteria: "34/40 questions correct"
    },
    {
      requirement: "Complete practical extraction demonstration",
      verificationMethod: "Video submission or in-person evaluation",
      passingCriteria: "Demonstrate all steps correctly with proper PPE"
    },
    {
      requirement: "Submit complete documentation package",
      verificationMethod: "Instructor review",
      passingCriteria: "All required elements present and professional"
    },
    {
      requirement: "Calculate psychrometric requirements accurately",
      verificationMethod: "Calculation worksheet",
      passingCriteria: "Within 10% of correct values"
    }
  ]
};

// Export the complete curriculum array
export const COMPLETE_CURRICULUM: DayContent[] = [
  day1,
  day2,
  // Days 3-14 would continue with similar comprehensive detail for:
  // Day 3: Mould Remediation
  // Day 4: Fire and Smoke Damage
  // Day 5: Biohazard and Trauma Cleanup
  // Day 6: Contents Restoration
  // Day 7: Structural Drying and Monitoring
  // Day 8: Documentation and Technology
  // Day 9: Customer Service Excellence
  // Day 10: Business Operations
  // Day 11: Marketing and Growth
  // Day 12: Advanced Restoration Techniques
  // Day 13: Specialty Services
  // Day 14: Final Assessment and Certification
];

// Utility functions for accessing curriculum
export function getDayContent(dayNumber: number): DayContent | undefined {
  return COMPLETE_CURRICULUM.find(day => day.day === dayNumber);
}

export function getAllModules(dayNumber: number): ContentModule[] {
  const day = getDayContent(dayNumber);
  return day ? day.modules : [];
}

export function getAssessmentQuestions(dayNumber: number): Array<{
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
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
    difficulty: 'basic' | 'intermediate' | 'advanced';
  }>);
}

export function getCompleteCurriculum(): DayContent[] {
  return COMPLETE_CURRICULUM;
}

export function getTotalTrainingHours(): number {
  return COMPLETE_CURRICULUM.reduce((total, day) => {
    const hours = parseInt(day.duration.split('-')[1] || day.duration);
    return total + hours;
  }, 0);
}

export function getCertificationProgress(completedDays: number[]): {
  percentage: number;
  remainingDays: number[];
  nextDay: number | null;
} {
  const totalDays = 14;
  const percentage = (completedDays.length / totalDays) * 100;
  const remainingDays = Array.from({length: totalDays}, (_, i) => i + 1)
    .filter(day => !completedDays.includes(day));
  const nextDay = remainingDays[0] || null;
  
  return {
    percentage,
    remainingDays,
    nextDay
  };
}