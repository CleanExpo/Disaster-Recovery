import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { withSecurityHeaders, withRateLimit, withValidation, combineMiddleware } from '@/lib/auth-middleware';
import { PaymentAuditLogger } from '@/lib/payment-security';

const prisma = new PrismaClient();

// SECURITY: Enhanced validation schema for registration with sanitization
const registrationSchema = z.object({
  email: z.string().email('Invalid email format').max(255, 'Email too long'),
  username: z.string()
    .min(3, 'Username too short')
    .max(50, 'Username too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username contains invalid characters'),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .max(128, 'Password too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Password must contain uppercase, lowercase, number, and special character'),
  mobileNumber: z.string()
    .min(10, 'Mobile number too short')
    .max(15, 'Mobile number too long')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Invalid mobile number format'),
  companyName: z.string()
    .min(2, 'Company name too short')
    .max(100, 'Company name too long')
    .regex(/^[a-zA-Z0-9\s&.-]+$/, 'Company name contains invalid characters'),
  acceptedTerms: z.boolean().refine(val => val === true),
  acceptedPrivacy: z.boolean().refine(val => val === true),
  company: z.object({
    tradingName: z.string().optional(),
    abn: z.string(),
    acn: z.string().optional(),
    companyStructure: z.enum(['SOLE_TRADER', 'PARTNERSHIP', 'PTY_LTD', 'TRUST']),
    registeredAddress: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postcode: z.string()
    }),
    mailingAddress: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postcode: z.string()
    }).optional(),
    directors: z.array(z.object({
      firstName: z.string(),
      lastName: z.string(),
      position: z.string(),
      email: z.string().email(),
      phone: z.string()
    })),
    officePhone: z.string().optional(),
    website: z.string().url().optional()
  }),
  insurance: z.array(z.object({
    type: z.enum(['PUBLIC_LIABILITY', 'PROFESSIONAL_INDEMNITY', 'WORKERS_COMP']),
    insurer: z.string(),
    policyNumber: z.string(),
    coverageAmount: z.number(),
    excess: z.number().optional(),
    effectiveDate: z.string(),
    expiryDate: z.string()
  })),
  certifications: z.array(z.object({
    type: z.string(),
    name: z.string(),
    number: z.string(),
    issuingOrganization: z.string(),
    issueDate: z.string(),
    expiryDate: z.string().optional()
  })),
  backgroundCheck: z.object({
    consentGiven: z.boolean(),
    references: z.array(z.object({
      name: z.string(),
      companyName: z.string(),
      position: z.string(),
      email: z.string().email(),
      phone: z.string(),
      relationship: z.enum(['CLIENT', 'SUPPLIER', 'PARTNER', 'OTHER']),
      projectDescription: z.string().optional()
    }))
  }),
  subscription: z.object({
    tier: z.enum(['TIER_25KM', 'TIER_50KM', 'TIER_75KM', 'TIER_100KM', 'RURAL']),
    territories: z.array(z.object({
      type: z.enum(['RADIUS', 'POSTCODE', 'SUBURB', 'LGA', 'STATE']),
      name: z.string(),
      centerPoint: z.object({
        lat: z.number(),
        lng: z.number()
      }).optional(),
      radiusKm: z.number().optional(),
      postcodes: z.array(z.string()).optional(),
      suburbs: z.array(z.string()).optional(),
      emergencyResponse: z.boolean(),
      afterHours: z.boolean(),
      weekendService: z.boolean(),
      maxJobsPerDay: z.number()
    })),
    billingDetails: z.object({
      method: z.enum(['DIRECT_DEBIT', 'CREDIT_CARD']),
      frequency: z.enum(['MONTHLY', 'QUARTERLY', 'ANNUAL'])
    }),
    bondAccepted: z.boolean()
  }),
  agreements: z.object({
    partnershipAgreement: z.boolean(),
    codeOfConduct: z.boolean(),
    whsCompliance: z.boolean(),
    dutyOfCare: z.boolean(),
    ongoingMonitoring: z.boolean()
  })
});

async function handleRegistration(request: NextRequest, validatedData: z.infer<typeof registrationSchema>) {
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  try {
    // SECURITY: Data is already validated by middleware
    // Additional security checks
    
    // Check if username or email already exists
    const existingContractor = await prisma.contractor.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email }
        ]
      }
    });
    
    if (existingContractor) {
      return NextResponse.json(
        { 
          success: false, 
          error: existingContractor.username === validatedData.username 
            ? 'Username already taken' 
            : 'Email already registered' 
        },
        { status: 400 }
      );
    }
    
    // Hash the password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);
    
    // Start a transaction to create all related records
    const result = await prisma.$transaction(async (tx) => {
      // Create the contractor account
      const contractor = await tx.contractor.create({
        data: {
          username: validatedData.username,
          email: validatedData.email,
          passwordHash,
          mobileNumber: validatedData.mobileNumber,
          status: 'PENDING',
          onboardingStep: 8,
          onboardingCompleted: true,
          emailVerified: false,
          mobileVerified: false
        }
      });
      
      // Create company profile
      const companyProfile = await tx.contractorCompany.create({
        data: {
          contractorId: contractor.id,
          companyName: validatedData.companyName,
          tradingName: validatedData.company.tradingName,
          abn: validatedData.company.abn,
          acn: validatedData.company.acn,
          companyStructure: validatedData.company.companyStructure,
          registeredAddress: validatedData.company.registeredAddress.street,
          registeredCity: validatedData.company.registeredAddress.city,
          registeredState: validatedData.company.registeredAddress.state,
          registeredPostcode: validatedData.company.registeredAddress.postcode,
          mailingAddress: validatedData.company.mailingAddress?.street,
          mailingCity: validatedData.company.mailingAddress?.city,
          mailingState: validatedData.company.mailingAddress?.state,
          mailingPostcode: validatedData.company.mailingAddress?.postcode,
          directors: JSON.stringify(validatedData.company.directors),
          officePhone: validatedData.company.officePhone,
          website: validatedData.company.website
        }
      });
      
      // Create insurance records
      const insuranceRecords = await Promise.all(
        validatedData.insurance.map(insurance =>
          tx.contractorInsurance.create({
            data: {
              contractorId: contractor.id,
              insuranceType: insurance.type,
              insurer: insurance.insurer,
              policyNumber: insurance.policyNumber,
              coverageAmount: insurance.coverageAmount,
              excess: insurance.excess,
              effectiveDate: new Date(insurance.effectiveDate),
              expiryDate: new Date(insurance.expiryDate),
              certificateUrl: '', // Will be updated when documents are uploaded
              status: 'PENDING'
            }
          })
        )
      );
      
      // Create certification records
      const certificationRecords = await Promise.all(
        validatedData.certifications.map(cert =>
          tx.contractorCertification.create({
            data: {
              contractorId: contractor.id,
              certificationType: cert.type,
              certificationName: cert.name,
              certificationNumber: cert.number,
              issuingOrganization: cert.issuingOrganization,
              issueDate: new Date(cert.issueDate),
              expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
              documentUrl: '', // Will be updated when documents are uploaded
              status: 'PENDING'
            }
          })
        )
      );
      
      // Create reference records
      const referenceRecords = await Promise.all(
        validatedData.backgroundCheck.references.map(ref =>
          tx.contractorReference.create({
            data: {
              contractorId: contractor.id,
              referenceName: ref.name,
              companyName: ref.companyName,
              position: ref.position,
              email: ref.email,
              phone: ref.phone,
              relationship: ref.relationship,
              projectDescription: ref.projectDescription
            }
          })
        )
      );
      
      // Create background check consent record
      if (validatedData.backgroundCheck.consentGiven) {
        await tx.backgroundCheck.create({
          data: {
            contractorId: contractor.id,
            checkType: 'IDENTITY',
            provider: 'PISA',
            consentGiven: true,
            consentDate: new Date(),
            status: 'PENDING'
          }
        });
      }
      
      // Create subscription record
      const subscription = await tx.contractorSubscription.create({
        data: {
          contractorId: contractor.id,
          tier: validatedData.subscription.tier,
          status: 'PENDING',
          baseRadius: getRadiusFromTier(validatedData.subscription.tier),
          billingFrequency: validatedData.subscription.billingDetails.frequency,
          amount: getSubscriptionAmount(validatedData.subscription.tier, validatedData.subscription.billingDetails.frequency),
          paymentMethod: validatedData.subscription.billingDetails.method,
          bondAmount: 5000,
          bondStatus: 'PENDING'
        }
      });
      
      // Create territory records
      const territoryRecords = await Promise.all(
        validatedData.subscription.territories.map(territory =>
          tx.contractorTerritory.create({
            data: {
              contractorId: contractor.id,
              type: territory.type,
              name: territory.name,
              centerLat: territory.centerPoint?.lat,
              centerLng: territory.centerPoint?.lng,
              radiusKm: territory.radiusKm,
              postcodes: territory.postcodes ? JSON.stringify(territory.postcodes) : null,
              suburbs: territory.suburbs ? JSON.stringify(territory.suburbs) : null,
              emergencyResponse: territory.emergencyResponse,
              afterHours: territory.afterHours,
              weekendService: territory.weekendService,
              maxJobsPerDay: territory.maxJobsPerDay
            }
          })
        )
      );
      
      // Create agreement acceptance records
      const agreementTypes = [
        { type: 'PARTNERSHIP', accepted: validatedData.agreements.partnershipAgreement },
        { type: 'CODE_OF_CONDUCT', accepted: validatedData.agreements.codeOfConduct },
        { type: 'WHS', accepted: validatedData.agreements.whsCompliance },
        { type: 'DUTY_OF_CARE', accepted: validatedData.agreements.dutyOfCare },
        { type: 'PRIVACY', accepted: validatedData.agreements.ongoingMonitoring }
      ];
      
      const agreementRecords = await Promise.all(
        agreementTypes.map(agreement =>
          tx.contractorAgreement.create({
            data: {
              contractorId: contractor.id,
              agreementType: agreement.type,
              agreementName: `${agreement.type} Agreement`,
              version: '1.0',
              accepted: agreement.accepted,
              acceptedAt: agreement.accepted ? new Date() : null,
              acceptanceMethod: 'CHECKBOX',
              effectiveDate: new Date()
            }
          })
        )
      );
      
      // Create initial notification
      await tx.contractorNotification.create({
        data: {
          contractorId: contractor.id,
          type: 'SYSTEM',
          priority: 'NORMAL',
          subject: 'Application Received',
          message: 'Thank you for submitting your application. Our team will review it and contact you within 2-3 business days.',
          actionRequired: false
        }
      });
      
      // Create audit log entry
      await tx.contractorAuditLog.create({
        data: {
          contractorId: contractor.id,
          action: 'REGISTRATION_COMPLETED',
          category: 'PROFILE',
          details: JSON.stringify({ step: 'all', completed: true }),
          performedBy: contractor.id,
          performedByType: 'CONTRACTOR'
        }
      });
      
      return contractor;
    });
    
    // Send confirmation email (implement email service)
    // await sendConfirmationEmail(validatedData.email, validatedData.companyName);
    
    // Trigger background check process (implement background check service)
    // await initiateBackgroundCheck(result.id);
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      contractorId: result.id
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid form data', 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process registration' 
      },
      { status: 500 }
    );
  }
}

function getRadiusFromTier(tier: string): number {
  const radiusMap: Record<string, number> = {
    'TIER_25KM': 25,
    'TIER_50KM': 50,
    'TIER_75KM': 75,
    'TIER_100KM': 100,
    'RURAL': 200
  };
  return radiusMap[tier] || 50;
}

function getSubscriptionAmount(tier: string, frequency: string): number {
  const baseAmounts: Record<string, number> = {
    'TIER_25KM': 299,
    'TIER_50KM': 499,
    'TIER_75KM': 699,
    'TIER_100KM': 899,
    'RURAL': 1199
  };
  
  const multipliers: Record<string, number> = {
    'MONTHLY': 1,
    'QUARTERLY': 2.85,
    'ANNUAL': 10.5
  };
  
  return (baseAmounts[tier] || 499) * (multipliers[frequency] || 1);
}