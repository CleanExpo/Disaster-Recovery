#!/usr/bin/env tsx

/**
 * Script to seed a test contractor account for development and testing
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedTestContractor() {
  console.log('🌱 Seeding test contractor account...\n');

  try {
    // Check if test contractor already exists
    const existing = await prisma.contractor.findUnique({
      where: { email: 'test@contractor.com' }
    });

    if (existing) {
      console.log('⚠️  Test contractor already exists. Skipping...');
      return existing;
    }

    // Create test contractor
    const hashedPassword = await bcrypt.hash('Test123!', 10);
    
    const contractor = await prisma.contractor.create({
      data: {
        username: 'testcontractor',
        email: 'test@contractor.com',
        passwordHash: hashedPassword,
        mobileNumber: '0412345678',
        emailVerified: true,
        status: 'APPROVED',
        onboardingCompleted: true,
        approvedAt: new Date(),
        
        // Create company profile
        companyProfile: {
          create: {
            companyName: 'Test Restoration Services',
            tradingName: 'Test Restoration',
            abn: '12345678901',
            acn: '123456789',
            companyStructure: 'PTY_LTD',
            registeredAddress: '123 Test Street',
            registeredCity: 'Brisbane',
            registeredState: 'QLD',
            registeredPostcode: '4000',
            officePhone: '0731234567',
            website: 'https://test-restoration.com.au',
            companyEmail: 'info@test-restoration.com.au',
            directors: JSON.stringify([
              { name: 'John Smith', position: 'Director' }
            ]),
            abnVerified: true,
            abnVerifiedAt: new Date()
          }
        },

        // Create insurance records
        insurance: {
          create: [
            {
              insuranceType: 'PUBLIC_LIABILITY',
              insurer: 'Test Insurance Co',
              policyNumber: 'PL123456789',
              coverageAmount: 20000000,
              effectiveDate: new Date('2024-01-01'),
              expiryDate: new Date('2025-12-31'),
              certificateUrl: 'https://example.com/insurance.pdf',
              verified: true,
              verifiedAt: new Date(),
              status: 'ACTIVE'
            },
            {
              insuranceType: 'PROFESSIONAL_INDEMNITY',
              insurer: 'Test Insurance Co',
              policyNumber: 'PI123456789',
              coverageAmount: 10000000,
              effectiveDate: new Date('2024-01-01'),
              expiryDate: new Date('2025-12-31'),
              certificateUrl: 'https://example.com/insurance-pi.pdf',
              verified: true,
              verifiedAt: new Date(),
              status: 'ACTIVE'
            }
          ]
        },

        // Create certifications
        certifications: {
          create: [
            {
              certificationType: 'IICRC_WRT',
              certificationName: 'Water Damage Restoration Technician',
              certificationNumber: 'WRT123456',
              issuingOrganization: 'IICRC',
              issueDate: new Date('2023-01-01'),
              expiryDate: new Date('2026-01-01'),
              documentUrl: 'https://example.com/cert-wrt.pdf',
              verified: true,
              verifiedAt: new Date(),
              status: 'VERIFIED'
            },
            {
              certificationType: 'IICRC_ASD',
              certificationName: 'Applied Structural Drying',
              certificationNumber: 'ASD123456',
              issuingOrganization: 'IICRC',
              issueDate: new Date('2023-01-01'),
              expiryDate: new Date('2026-01-01'),
              documentUrl: 'https://example.com/cert-asd.pdf',
              verified: true,
              verifiedAt: new Date(),
              status: 'VERIFIED'
            }
          ]
        },

        // Create subscription
        subscription: {
          create: {
            tier: 'TIER_50KM',
            status: 'ACTIVE',
            baseRadius: 50,
            billingFrequency: 'MONTHLY',
            amount: 1250,
            nextBillingDate: new Date('2025-09-01'),
            bondAmount: 5000,
            bondStatus: 'SECURED',
            bondSecuredDate: new Date('2024-01-01'),
            startDate: new Date('2024-01-01')
          }
        },

        // Create service territories
        territories: {
          create: [
            {
              type: 'RADIUS',
              name: 'Brisbane Metro',
              centerLat: -27.4698,
              centerLng: 153.0251,
              radiusKm: 50,
              emergencyResponse: true,
              afterHours: true,
              weekendService: true,
              maxJobsPerDay: 10,
              active: true
            }
          ]
        }
      },
      include: {
        companyProfile: true,
        subscription: true
      }
    });

    console.log('✅ Test contractor created successfully!\n');
    console.log('📧 Email:', contractor.email);
    console.log('👤 Username:', contractor.username);
    console.log('🔑 Password: Test123!');
    console.log('🏢 Company:', contractor.companyProfile?.companyName);
    console.log('📍 Status:', contractor.status);
    console.log('\n');

    return contractor;
  } catch (error) {
    console.error('❌ Error seeding test contractor:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedTestContractor();
    
    console.log('🎉 Seeding completed successfully!');
    console.log('\nYou can now log in with:');
    console.log('  Username: testcontractor');
    console.log('  Password: Test123!');
    console.log('\nOr use the demo account:');
    console.log('  Username: demo');
    console.log('  Password: Demo123!');
    
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed script
main();