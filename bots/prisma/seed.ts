/**
 * Database Seed Script - Simplified for SQLite
 * All data must be factual and compliant with regulations
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Emergency Guides
  await prisma.emergencyGuide.createMany({
    data: [
      {
        emergencyType: 'flood',
        title: 'Flood Emergency Response',
        immediateSteps: JSON.stringify([
          'Ensure personal safety - evacuate if water is rising',
          'Turn off electricity at the main breaker if safe to do so',
          'Move to higher ground immediately',
          'Contact emergency services if in immediate danger',
          'Document damage with photos for insurance'
        ]),
        safetyWarnings: JSON.stringify([
          'Do not walk through flowing water',
          'Avoid contact with floodwater - it may be contaminated',
          'Never drive through flooded areas',
          'Be aware of electrical hazards'
        ]),
        doNotActions: JSON.stringify([
          'Do not return to flooded areas until cleared by authorities',
          'Do not use electrical appliances that have been wet',
          'Do not consume food that has been in contact with floodwater'
        ]),
        contactNumbers: JSON.stringify({
          emergency: '000',
          ses: '132 500'
        }),
        active: true,
        priority: 1
      },
      {
        emergencyType: 'fire',
        title: 'Fire Damage Emergency Response',
        immediateSteps: JSON.stringify([
          'Evacuate immediately if fire is active',
          'Call 000 for emergency services',
          'Do not re-enter property until cleared by fire services',
          'Contact insurance company',
          'Secure the property from further damage'
        ]),
        safetyWarnings: JSON.stringify([
          'Structure may be unstable',
          'Smoke inhalation risk - wear appropriate protection',
          'Asbestos may be present in older buildings',
          'Watch for hot spots that may reignite'
        ]),
        doNotActions: JSON.stringify([
          'Do not enter fire-damaged buildings without clearance',
          'Do not disturb soot or ash without protective equipment',
          'Do not use water-damaged electrical systems'
        ]),
        contactNumbers: JSON.stringify({
          emergency: '000',
          fireServices: '000'
        }),
        active: true,
        priority: 1
      }
    ]
  });

  // Create Service Procedures
  await prisma.serviceProcedure.createMany({
    data: [
      {
        serviceType: 'water_extraction',
        title: 'Water Extraction and Drying',
        description: 'Professional water extraction process to remove standing water and moisture from affected areas',
        safetyNotes: JSON.stringify([
          'Test for electrical hazards before entering',
          'Wear appropriate PPE including waterproof boots',
          'Check for contamination levels'
        ]),
        requiredPPE: JSON.stringify(['Waterproof boots', 'Gloves', 'Safety glasses', 'N95 mask']),
        estimatedTime: '2-4 hours initial extraction',
        difficultyLevel: 'intermediate',
        certificationReq: JSON.stringify(['Water Damage Restoration', 'IICRC WRT']),
        active: true
      },
      {
        serviceType: 'mould_remediation',
        title: 'Mould Remediation Process',
        description: 'Safe and effective removal of mould growth from affected surfaces',
        safetyNotes: JSON.stringify([
          'Containment barriers required',
          'Negative air pressure must be established',
          'Full PPE required including respirator'
        ]),
        requiredPPE: JSON.stringify(['P2/P3 Respirator', 'Tyvek suit', 'Gloves', 'Eye protection']),
        estimatedTime: '1-3 days depending on extent',
        difficultyLevel: 'advanced',
        certificationReq: JSON.stringify(['Mould Remediation', 'IICRC AMRT']),
        active: true
      }
    ]
  });

  // Create Step-by-Step Guide for Customers
  const customerWaterGuide = await prisma.stepByStepGuide.create({
    data: {
      type: 'water_damage',
      userType: 'customer',
      title: 'Water Damage - What to Do',
      description: 'Step-by-step guide for dealing with water damage in your property',
      estimatedReadTime: '5 minutes',
      priority: 1,
      active: true,
      steps: {
        create: [
          {
            stepNumber: 1,
            title: 'Ensure Safety First',
            description: 'Before entering the affected area, ensure it is safe. Turn off electricity at the main breaker if water is near electrical outlets or appliances.',
            warningNotes: JSON.stringify([
              'Never enter standing water if electricity is still on',
              'Watch for ceiling damage that could collapse'
            ]),
            estimatedTime: 'Immediate',
            requiredTools: JSON.stringify([])
          },
          {
            stepNumber: 2,
            title: 'Stop the Water Source',
            description: 'If possible, identify and stop the source of water. This might mean turning off the main water supply or placing buckets under leaks.',
            warningNotes: JSON.stringify([
              'Know where your main water shut-off valve is located'
            ]),
            estimatedTime: '5-10 minutes',
            requiredTools: JSON.stringify(['Wrench', 'Buckets'])
          },
          {
            stepNumber: 3,
            title: 'Document the Damage',
            description: 'Take photos and videos of all affected areas before any cleanup begins. This documentation is crucial for insurance claims.',
            warningNotes: JSON.stringify([
              'Document everything, even if damage seems minor'
            ]),
            estimatedTime: '15-30 minutes',
            requiredTools: JSON.stringify(['Camera or smartphone'])
          }
        ]
      }
    }
  });

  // Create Insurance Processes
  await prisma.insuranceProcess.createMany({
    data: [
      {
        insurerName: 'General Insurance Company',
        processType: 'claim_submission',
        requirements: JSON.stringify([
          'Policy number',
          'Date and time of loss',
          'Description of damage',
          'Photos of damage',
          'List of damaged items'
        ]),
        timeline: 'Initial response within 24-48 hours',
        contactInfo: JSON.stringify({
          phone: '1300 XXX XXX',
          email: 'claims@insurance.com.au',
          online: 'www.insurance.com.au/claims'
        }),
        specialNotes: 'Make safe repairs can proceed without approval up to $500',
        active: true
      }
    ]
  });

  // Create Verified Content
  await prisma.verifiedContent.createMany({
    data: [
      {
        type: 'pricing_guide',
        title: 'Service Pricing Ranges',
        content: JSON.stringify({
          water_extraction: {
            min: '$500',
            max: '$3000',
            factors: ['Area size', 'Water category', 'Accessibility']
          },
          structural_drying: {
            min: '$1000',
            max: '$5000',
            factors: ['Drying time', 'Equipment required', 'Materials affected']
          },
          mould_remediation: {
            min: '$500',
            max: '$10000',
            factors: ['Extent of growth', 'Containment needs', 'Material removal']
          }
        }),
        active: true,
        approved: true,
        approvedBy: 'system',
        approvedAt: new Date()
      },
      {
        type: 'general_info',
        title: 'About Our Services',
        content: 'We connect property owners with verified, professional contractors for disaster recovery services across Australia. All contractors are vetted, insured, and follow industry best practices.',
        active: true,
        approved: true,
        approvedBy: 'system',
        approvedAt: new Date()
      }
    ]
  });

  // Create Sample Contractors
  await prisma.contractor.createMany({
    data: [
      {
        businessName: 'Rapid Response Restoration',
        abn: '12345678901',
        email: 'contact@rapidresponse.com.au',
        phone: '1300 111 222',
        address: '123 Main St, Brisbane QLD 4000',
        serviceAreas: JSON.stringify(['Brisbane', 'Gold Coast', 'Sunshine Coast']),
        services: JSON.stringify(['water_extraction', 'structural_drying', 'mould_remediation']),
        certifications: JSON.stringify([
          { name: 'IICRC WRT', expiry: '2025-12-31' },
          { name: 'IICRC ASD', expiry: '2025-12-31' }
        ]),
        insuranceDetails: JSON.stringify({
          provider: 'Business Insurance Co',
          policyNumber: 'BUS123456',
          publicLiability: 20000000,
          expiry: '2025-06-30'
        }),
        responseTime: 0.5,
        completionRate: 98.5,
        customerRating: 4.8,
        totalJobs: 250,
        active: true,
        verified: true,
        verifiedAt: new Date(),
        backgroundCheck: true,
        backgroundCheckAt: new Date(),
        emergencyAvailable: true
      },
      {
        businessName: 'Professional Restoration Services',
        abn: '98765432109',
        email: 'info@prorestorations.com.au',
        phone: '1300 333 444',
        address: '456 Queen St, Sydney NSW 2000',
        serviceAreas: JSON.stringify(['Sydney', 'Parramatta', 'Newcastle']),
        services: JSON.stringify(['water_extraction', 'fire_damage', 'structural_drying']),
        certifications: JSON.stringify([
          { name: 'IICRC WRT', expiry: '2025-10-31' },
          { name: 'IICRC FSRT', expiry: '2025-10-31' }
        ]),
        insuranceDetails: JSON.stringify({
          provider: 'Trade Insurance Group',
          policyNumber: 'TRD789012',
          publicLiability: 20000000,
          expiry: '2025-08-31'
        }),
        responseTime: 0.75,
        completionRate: 97.0,
        customerRating: 4.7,
        totalJobs: 180,
        active: true,
        verified: true,
        verifiedAt: new Date(),
        backgroundCheck: true,
        backgroundCheckAt: new Date(),
        emergencyAvailable: false
      }
    ]
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });