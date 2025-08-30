/**
 * DEMO TRAINING MODULES
 * =====================
 * Sample training content for demonstration purposes
 */

export const TRAINING_MODULES = {
  waterDamage: {
    title: 'Water Damage Restoration Certification',
    duration: '8 hours',
    modules: [
      {
        id: 'WD-001',
        title: 'Module 1: Water Categories & Classes',
        duration: '45 minutes',
        content: `
          Understanding Water Contamination Levels:
          
          Category 1 - Clean Water
          • Source: Broken water supply lines, tub overflows
          • Risk Level: Minimal
          • PPE Required: Basic
          • Response Time: 24-48 hours safe
          
          Category 2 - Grey Water
          • Source: Dishwasher/washing machine overflow
          • Risk Level: Moderate contamination
          • PPE Required: N95, gloves, eye protection
          • Response Time: Must treat within 48 hours
          
          Category 3 - Black Water
          • Source: Sewage, flooding, standing water
          • Risk Level: High contamination
          • PPE Required: Full PPE, respirator
          • Response Time: Immediate action required
        `,
        quiz: [
          {
            question: 'What PPE is required for Category 3 water damage?',
            answer: 'Full PPE including respirator, waterproof suit, gloves, and eye protection'
          }
        ],
        videoUrl: '/training/water-damage/module-1.mp4',
        completionRate: 87
      },
      {
        id: 'WD-002',
        title: 'Module 2: Moisture Detection & Mapping',
        duration: '60 minutes',
        content: `
          Professional Moisture Detection Techniques:
          
          Equipment Required:
          • Penetrating moisture meter (Delmhorst BD-2100)
          • Non-penetrating meter (Tramex MRH3)
          • Thermal imaging camera (FLIR E8-XT)
          • Thermo-hygrometer
          
          Mapping Procedure:
          1. Create site diagram
          2. Mark all affected areas
          3. Document moisture readings
          4. Photograph all damage
          5. Create drying plan
          
          Industry Standards:
          • Drywall: <1% moisture content
          • Wood: <15% moisture content
          • Concrete: <4% moisture content
        `,
        practicalExercise: 'Use thermal camera to identify hidden moisture in provided wall samples',
        completionRate: 92
      },
      {
        id: 'WD-003',
        title: 'Module 3: Drying Equipment & Psychrometry',
        duration: '90 minutes',
        content: `
          Psychrometric Calculations:
          
          Key Concepts:
          • Grains Per Pound (GPP)
          • Temperature/Humidity relationships
          • Vapor pressure differentials
          • Specific humidity calculations
          
          Equipment Placement Formula:
          • 1 air mover per 10-16 linear feet of wall
          • 1 dehumidifier per 1000-1500 sq ft
          • LGR dehumidifiers for Class 3 & 4
          
          Daily Monitoring Requirements:
          • Temperature readings every 4 hours
          • Humidity readings every 4 hours
          • Material moisture content daily
          • Equipment performance checks
          • Photo documentation
        `,
        calculation: 'Calculate required CFM for 2000 sq ft commercial space',
        completionRate: 78
      }
    ],
    certification: {
      exam: '50 questions, 80% pass rate required',
      practical: 'On-site demonstration required',
      validity: '2 years',
      continuing_education: '8 hours annually'
    }
  },
  
  moldRemediation: {
    title: 'Mould Remediation Specialist Training',
    duration: '12 hours',
    modules: [
      {
        id: 'MR-001',
        title: 'Module 1: Mould Biology & Health Effects',
        duration: '90 minutes',
        content: `
          Common Mould Species in Australia:
          
          Aspergillus (Most Common):
          • Appearance: Green/yellow powdery
          • Health Risk: Respiratory issues
          • Growth: 24-48 hours
          • Removal: HEPA vacuum + antimicrobial
          
          Stachybotrys (Black Mould):
          • Appearance: Black/dark green slimy
          • Health Risk: Severe - toxic
          • Growth: 8-12 days
          • Removal: Full containment required
          
          Penicillium:
          • Appearance: Blue/green fuzzy
          • Health Risk: Allergic reactions
          • Growth: 2-3 days
          • Removal: Standard protocol
          
          Health & Safety Requirements:
          • P2/N95 minimum respirator
          • Tyvek suits for large areas
          • Negative air pressure mandatory
          • Air scrubbers with HEPA filters
        `,
        safetyAlert: 'Never attempt mould removal without proper PPE',
        completionRate: 95
      },
      {
        id: 'MR-002',
        title: 'Module 2: Containment & Negative Pressure',
        duration: '120 minutes',
        content: `
          Containment Setup Procedures:
          
          Small Isolated Areas (<10 sq ft):
          • Mini-containment with plastic sheeting
          • Single HEPA air scrubber
          • Basic PPE acceptable
          
          Medium Areas (10-100 sq ft):
          • Full plastic containment barriers
          • Negative air machine required
          • Airlock entry system
          • Full PPE mandatory
          
          Large Areas (>100 sq ft):
          • Double-layer containment
          • Multiple negative air machines
          • Decontamination chamber
          • Full respiratory protection
          
          Negative Pressure Calculations:
          • Minimum 4 air changes per hour
          • CFM = (Room Volume × ACH) / 60
          • Add 10% for leakage
        `,
        practical: 'Build containment barrier with negative pressure',
        completionRate: 88
      }
    ],
    certification: {
      requirement: 'IICRC S520 Standard compliance',
      exam: '60 questions, 75% pass required',
      renewal: 'Annual refresher training'
    }
  },
  
  safetyCompliance: {
    title: 'WHS Compliance & Safety Systems',
    duration: '6 hours',
    modules: [
      {
        id: 'SC-001',
        title: 'Module 1: Risk Assessment & SWMS',
        duration: '90 minutes',
        content: `
          Safe Work Method Statement Development:
          
          Step 1: Hazard Identification
          • Physical hazards (slips, trips, falls)
          • Chemical hazards (cleaning agents)
          • Biological hazards (mould, bacteria)
          • Ergonomic hazards (lifting, repetitive)
          • Psychosocial hazards (stress, fatigue)
          
          Step 2: Risk Matrix Assessment
          Likelihood × Consequence = Risk Level
          • Rare (1) × Insignificant (1) = Low (1)
          • Possible (3) × Moderate (3) = Medium (9)
          • Likely (4) × Major (4) = High (16)
          • Almost Certain (5) × Catastrophic (5) = Extreme (25)
          
          Step 3: Control Measures (Hierarchy)
          1. Elimination - Remove the hazard
          2. Substitution - Replace with safer option
          3. Engineering - Isolate the hazard
          4. Administrative - Procedures & training
          5. PPE - Last line of defence
          
          Documentation Requirements:
          • Date and version control
          • All workers must sign SWMS
          • Review after incidents
          • Update when tasks change
        `,
        template: 'Download SWMS template',
        completionRate: 91
      },
      {
        id: 'SC-002',
        title: 'Module 2: Incident Investigation',
        duration: '60 minutes',
        content: `
          ICAM Investigation Method:
          
          Immediate Actions:
          1. Secure the scene
          2. Provide first aid
          3. Call emergency services
          4. Notify management
          5. Preserve evidence
          
          Investigation Process:
          • What happened? (Facts only)
          • When did it occur? (Timeline)
          • Where did it happen? (Location)
          • Who was involved? (Witnesses)
          • Why did it happen? (Root cause)
          • How to prevent? (Corrective actions)
          
          Root Cause Categories:
          • Absent/Failed Defenses
          • Individual/Team Actions
          • Task/Environmental Conditions
          • Organizational Factors
          
          Reporting Timeline:
          • Notify within 2 hours
          • Initial report within 24 hours
          • Full investigation within 48 hours
          • Corrective actions within 7 days
        `,
        caseStudy: 'Analyse ladder fall incident',
        completionRate: 83
      }
    ]
  },
  
  businessOperations: {
    title: 'NRP Business Operations Training',
    duration: '4 hours',
    modules: [
      {
        id: 'BO-001',
        title: 'Module 1: Lead Management System',
        duration: '60 minutes',
        content: `
          NRP Lead Distribution System:
          
          Lead Priority Levels:
          • Priority 1 - Emergency (Respond within 1 hour)
          • Priority 2 - Urgent (Respond within 4 hours)
          • Priority 3 - Standard (Respond within 24 hours)
          • Priority 4 - Scheduled (As arranged)
          
          Lead Acceptance Protocol:
          1. Notification received via app/SMS
          2. Review job details & location
          3. Accept/Decline within 15 minutes
          4. Automatic reassignment if no response
          5. Three declines = back of queue
          
          Performance Metrics:
          • Response Time: Target <15 minutes
          • Acceptance Rate: Target >80%
          • Customer Rating: Target >4.5/5
          • Job Completion: Target >95%
          
          Commission Structure:
          • Emergency jobs: 15% commission
          • Insurance work: 12% commission
          • Private work: 10% commission
          • Repeat customer: +2% bonus
        `,
        simulation: 'Practice lead acceptance workflow',
        completionRate: 96
      },
      {
        id: 'BO-002',
        title: 'Module 2: Insurance Coordination',
        duration: '90 minutes',
        content: `
          Insurance Claim Process:
          
          Initial Documentation:
          • 50+ photos minimum
          • Video walkthrough
          • Moisture mapping diagram
          • Detailed scope of work
          • Cost estimate breakdown
          
          Major Insurers Protocols:
          
          NRMA Insurance:
          • Lodge via NRMA Claims Portal
          • Reference: Policy number required
          • Approval: Usually within 24 hours
          • Payment: 30 days from invoice
          
          Allianz:
          • Submit via Allianz Partner Portal
          • Pre-approval for works >$5000
          • Progress payments available
          • Final payment: 14 days
          
          Suncorp/AAMI:
          • ClaimConnect system
          • Photo evidence mandatory
          • Builder's warranty required
          • Payment: 21 days standard
          
          Documentation Standards:
          • Before/During/After photos
          • Time-stamped records
          • Signed work authorizations
          • Completion certificates
        `,
        exercise: 'Complete sample insurance claim',
        completionRate: 89
      }
    ]
  }
};

/**
 * Get training progress for demo
 */
export const getTrainingProgress = () => {
  return {
    completed: 12,
    inProgress: 3,
    total: 24,
    certificates: [
      'Water Damage Restoration - Level 2',
      'Mould Remediation Specialist',
      'WHS Construction Induction'
    ],
    upcomingModules: [
      'Advanced Psychrometry',
      'Category 3 Water Specialist',
      'Insurance Claim Management'
    ],
    points: 1250,
    rank: 'Silver Tier Contractor'
  };
};

/**
 * Simulate training module interaction
 */
export const simulateTrainingModule = async (moduleId: string) => {
  // Find the module
  for (const category of Object.values(TRAINING_MODULES)) {
    for (const module of category.modules) {
      if (module.id === moduleId) {
        return {
          ...module,
          userProgress: {
            started: new Date().toISOString(),
            completed: false,
            score: 0,
            timeSpent: 0,
            attempts: 0
          }
        };
      }
    }
  }
  return null;
};