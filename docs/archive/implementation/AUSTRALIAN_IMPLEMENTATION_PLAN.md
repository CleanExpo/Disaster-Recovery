# Australian Disaster Recovery SaaS - Complete Implementation Plan

## Project Scope: NRPG (National Restoration Professionals Group) Integration

**Target Market:** Australia Only
**Service Types:** Home & Content, Commercial Business Insurance claims
**Specialties:** Water damage, Fire & Smoke Damage, Mould & Odour Remediation, Crime Scene Cleaning, Bio-hazard Remediation
**Certifications:** IICRC (Institute of Inspection Cleaning and Restoration Certificates)
**Insurance Partners:** NRMA, Suncorp, Allianz, QBE, and other Australian providers

---

## Phase 1: Australian Localization (IMMEDIATE)

### 1.1 Update Database Schema
**File:** `prisma/schema.prisma` (MODIFY EXISTING)

**Changes Required:**

#### Australian States/Territories
```typescript
enum State {
  NSW    // New South Wales
  VIC    // Victoria
  QLD    // Queensland
  WA     // Western Australia
  SA     // South Australia
  TAS    // Tasmania
  ACT    // Australian Capital Territory
  NT     // Northern Territory
}
```

#### Australian Postcode Support
```typescript
// Replace US ZIP codes with Australian postcodes
model Contractor {
  // ...
  serviceAreas: String[]  // Australian postcodes (e.g., "2000", "3141", "4000")
  state: State           // Primary state
  // ...
}

model Client {
  // ...
  postcode: String       // Australian postcode (4 digits)
  state: State          // Required
  // ...
}

model Booking {
  // ...
  postcode: String      // Service location postcode
  state: State         // Service location state
  // ...
}
```

#### Australian Currency
```typescript
model Payment {
  // ...
  amountAUD: Decimal    // Amount in Australian Dollars
  feesAUD: Decimal      // Platform fees in AUD
  platformFeePercentage: Decimal  // Default 15% for Australia
  // ...
}

model Invoice {
  // ...
  totalAUD: Decimal
  taxAUD: Decimal       // GST (10%)
  // ...
}
```

#### IICRC Certification Tracking
```typescript
model Contractor {
  // ...
  iicrcCertifications: IICRCCertification[]
  // ...
}

model IICRCCertification {
  id: String @id @default(cuid())
  contractorId: String
  contractor: Contractor @relation(fields: [contractorId], references: [id], onDelete: Cascade)

  certificationLevel: CertificationLevel  // Technician, Supervisor, Inspector
  certificationCode: String              // IICRC certification code
  certificationDate: DateTime            // When certified
  expiryDate: DateTime                  // When expires
  isActive: Boolean                     // Current status
  documentUrl: String                   // PDF of certificate
  verifiedAt: DateTime?                 // When admin verified
  verifiedBy: String?                   // Admin user ID

  createdAt: DateTime @default(now())
  updatedAt: DateTime @updatedAt
}

enum CertificationLevel {
  TECHNICIAN      // Entry level
  SUPERVISOR      // Advanced
  INSPECTOR       // Senior/Inspector
  MASTER          // Master level (if applicable)
}
```

#### Australian Service Types
```typescript
enum ServiceType {
  // Home & Content Claims
  WATER_DAMAGE              // Flood, burst pipes, leaks
  FIRE_DAMAGE              // House fires
  SMOKE_DAMAGE             // Smoke odour and staining
  MOULD_REMEDIATION        // Mould removal
  ODOUR_REMEDIATION        // Odour removal

  // Commercial Services
  COMMERCIAL_WATER_DAMAGE
  COMMERCIAL_FIRE_DAMAGE
  COMMERCIAL_MOULD

  // Specialized Services
  CRIME_SCENE_CLEANING     // Biohazard cleanup
  BIOHAZARD_REMEDIATION    // Blood, bodily fluids
  HOARDING_CLEANUP         // Extreme cleaning
  VANDALISM_CLEANUP        // Property damage
  GENERAL_RESTORATION
}

enum EmergencyLevel {
  URGENT      // Immediate response (< 2 hours)
  HIGH        // Same day response
  STANDARD    // Next business day
  SCHEDULED   // Pre-arranged appointment
}
```

#### Australian Insurance Providers
```typescript
model InsuranceProvider {
  id: String @id @default(cuid())
  name: String           // e.g., "NRMA", "Suncorp", "Allianz", "QBE"
  code: String          // Unique identifier
  apiEndpoint: String?  // API URL if they have one
  contactEmail: String
  phone: String
  supportedStatesTerritories: State[]
  isActive: Boolean
  createdAt: DateTime @default(now())
  updatedAt: DateTime @updatedAt
}

model Claim {
  // ...
  insuranceProvider: InsuranceProvider @relation(fields: [insuranceProviderId], references: [id])
  insuranceProviderId: String
  policyNumber: String
  claimNumber: String?        // Assigned by insurer
  // ...
  totalClaimAmountAUD: Decimal
  approvedAmountAUD: Decimal?
  // ...
}
```

---

### 1.2 Create Australian Localization Types
**File:** `src/types/australia.ts`

```typescript
/**
 * Australian-specific types and enums
 */

export type AustralianState =
  | 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

export interface AustralianPostcode {
  code: string;           // e.g., "2000"
  locality: string;       // e.g., "Sydney"
  state: AustralianState;
  postcode: string;
}

export interface AustralianAddress {
  streetAddress: string;
  suburb: string;
  postcode: string;
  state: AustralianState;
  country: 'AU';          // Always Australia
}

export interface IICRCCertification {
  level: 'TECHNICIAN' | 'SUPERVISOR' | 'INSPECTOR' | 'MASTER';
  code: string;           // IICRC certification code
  certifiedDate: Date;
  expiryDate: Date;
  isActive: boolean;
  documentUrl: string;
}

export type AustralianInsuranceProvider =
  | 'NRMA'
  | 'Suncorp'
  | 'Allianz'
  | 'QBE'
  | 'IAG'
  | 'CGU'
  | 'Other';

export interface NRPGContractor {
  // Extends Contractor from main system
  nrpgMemberId: string;      // National Restoration Professionals Group member ID
  nrpgVerifiedAt: Date?;     // When verified as NRPG member
  iicrcCertifications: IICRCCertification[];
  nrpgSpecialties: AustralianServiceType[];
  operatingStates: AustralianState[];
}

export type AustralianServiceType =
  | 'WATER_DAMAGE'
  | 'FIRE_DAMAGE'
  | 'SMOKE_DAMAGE'
  | 'MOULD_REMEDIATION'
  | 'ODOUR_REMEDIATION'
  | 'CRIME_SCENE_CLEANING'
  | 'BIOHAZARD_REMEDIATION'
  | 'HOARDING_CLEANUP'
  | 'VANDALISM_CLEANUP'
  | 'GENERAL_RESTORATION'
  | 'COMMERCIAL_WATER_DAMAGE'
  | 'COMMERCIAL_FIRE_DAMAGE'
  | 'COMMERCIAL_MOULD';

export type EmergencyLevel =
  | 'URGENT'      // < 2 hours
  | 'HIGH'        // Same day
  | 'STANDARD'    // Next business day
  | 'SCHEDULED';  // Pre-arranged

export interface ClaimDetails {
  insuranceProvider: AustralianInsuranceProvider;
  policyNumber: string;
  claimNumber?: string;
  totalClaimAmount: number; // AUD
  approvedAmount?: number;  // AUD
  status: ClaimStatus;
}

export type ClaimStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'DENIED'
  | 'PAYMENT_PROCESSED';
```

---

### 1.3 Australian Validation Schemas
**File:** `src/lib/validation/australia.ts`

```typescript
import { z } from 'zod';

// Australian postcode validation (4 digits, specific ranges)
export const australianPostcodeSchema = z
  .string()
  .regex(/^\d{4}$/, 'Australian postcode must be 4 digits')
  .refine((code) => {
    const num = parseInt(code);
    // Valid Australian postcode ranges:
    // NSW: 1000-2999, VIC: 3000-3999, QLD: 4000-4999, WA: 6000-6999
    // SA: 5000-5999, TAS: 7000-7999, ACT: 0200-0999, NT: 0800-0899
    return (num >= 1000 && num <= 9999);
  }, 'Invalid Australian postcode');

// Australian phone number (02-07, 08, 04 prefixes)
export const australianPhoneSchema = z
  .string()
  .regex(/^(\+61|0)[2-478](\s?\d){8}$/,
    'Invalid Australian phone number. Must be 10 digits starting with 02-07, 08, or 04');

// Australian business name validation
export const australianBusinessNameSchema = z
  .string()
  .min(3, 'Business name must be at least 3 characters')
  .max(200, 'Business name must be less than 200 characters');

// Australian business registration number (ABN - 11 digits)
export const australianABNSchema = z
  .string()
  .regex(/^\d{11}$/, 'Australian Business Number must be 11 digits');

// IICRC Certification code validation
export const iicrcCertificationCodeSchema = z
  .string()
  .regex(/^[A-Z0-9]{6,}$/, 'Invalid IICRC certification code');

// Address validation for Australia
export const australianAddressSchema = z.object({
  streetAddress: z.string().min(5).max(100),
  suburb: z.string().min(2).max(50),
  postcode: australianPostcodeSchema,
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']),
  country: z.literal('AU'),
});

export type AustralianAddress = z.infer<typeof australianAddressSchema>;

// Contractor registration for Australian NRPG
export const australianContractorRegistrationSchema = z.object({
  businessName: australianBusinessNameSchema,
  abnNumber: australianABNSchema,
  phone: australianPhoneSchema,
  email: z.string().email(),

  // IICRC Certification
  iicrcLevel: z.enum(['TECHNICIAN', 'SUPERVISOR', 'INSPECTOR', 'MASTER']),
  iicrcCertificationCode: iicrcCertificationCodeSchema,
  iicrcCertificationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  iicrcExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  iicrcCertificateFile: z.string().url(),

  // Service details
  operatingStates: z.array(z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']))
    .min(1, 'Must operate in at least one state'),
  servicePostcodes: z.array(australianPostcodeSchema).min(1),
  specialties: z.array(z.enum([
    'WATER_DAMAGE',
    'FIRE_DAMAGE',
    'SMOKE_DAMAGE',
    'MOULD_REMEDIATION',
    'ODOUR_REMEDIATION',
    'CRIME_SCENE_CLEANING',
    'BIOHAZARD_REMEDIATION',
    'COMMERCIAL_WATER_DAMAGE',
  ])).min(1),

  // Insurance details
  insuranceProvider: z.string(),
  insurancePolicyNumber: z.string(),
  insuranceExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type AustralianContractorRegistration = z.infer<typeof australianContractorRegistrationSchema>;

// Booking form for Australian disaster services
export const australianBookingSchema = z.object({
  serviceType: z.enum([
    'WATER_DAMAGE',
    'FIRE_DAMAGE',
    'SMOKE_DAMAGE',
    'MOULD_REMEDIATION',
    'ODOUR_REMEDIATION',
    'CRIME_SCENE_CLEANING',
    'BIOHAZARD_REMEDIATION',
    'HOARDING_CLEANUP',
    'VANDALISM_CLEANUP',
    'GENERAL_RESTORATION',
    'COMMERCIAL_WATER_DAMAGE',
    'COMMERCIAL_FIRE_DAMAGE',
    'COMMERCIAL_MOULD',
  ]),
  emergencyLevel: z.enum(['URGENT', 'HIGH', 'STANDARD', 'SCHEDULED']),
  description: z.string().min(20).max(2000),
  address: australianAddressSchema,
  damagePhotos: z.array(z.string().url()).max(10).optional(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  preferredDateTime: z.string().datetime().optional(),
  estimatedDamageAUD: z.number().positive().optional(),
});

export type AustralianBooking = z.infer<typeof australianBookingSchema>;

// Insurance claim submission for Australia
export const australianInsuranceClaimSchema = z.object({
  bookingId: z.string(),
  insuranceProvider: z.enum(['NRMA', 'Suncorp', 'Allianz', 'QBE', 'IAG', 'CGU', 'Other']),
  policyNumber: z.string().min(5).max(50),
  totalClaimAmountAUD: z.number().positive(),
  damagePhotos: z.array(z.string().url()).min(1).max(20),
  invoiceDocument: z.string().url(),
  contractorEstimate: z.string().url(),
  additionalDocuments: z.array(z.string().url()).optional(),
});

export type AustralianInsuranceClaim = z.infer<typeof australianInsuranceClaimSchema>;
```

---

## Phase 2: NRPG Integration (National Restoration Professionals Group)

### 2.1 NRPG Service
**File:** `src/services/nrpg/index.ts`

```typescript
/**
 * National Restoration Professionals Group (NRPG) Integration
 *
 * Manages NRPG member directory, verification, and contractor network
 * Database of certified restoration professionals in Australia
 */

import { prisma } from '@/lib/db';

export class NRPGService {
  /**
   * Verify contractor is NRPG member
   */
  async verifyNRPGMember(nrpgMemberId: string): Promise<NRPGMember | null> {
    // Call NRPG API or database to verify membership
    // Returns member details if verified
    try {
      const response = await fetch(`${process.env.NRPG_API_URL}/members/${nrpgMemberId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NRPG_API_KEY}`,
        },
      });

      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('NRPG verification failed:', error);
      return null;
    }
  }

  /**
   * Get IICRC certified contractors in specific postcode/state
   */
  async findContractorsByLocation(
    postcode: string,
    state: string,
    specialty?: string
  ): Promise<ContractorProfile[]> {
    return prisma.contractor.findMany({
      where: {
        serviceAreas: { has: postcode },
        state: state,
        isVerified: true,
        iicrcCertifications: {
          some: {
            isActive: true,
            expiryDate: { gt: new Date() },
          },
        },
        ...(specialty && {
          specialties: { has: specialty },
        }),
      },
      include: {
        iicrcCertifications: {
          where: { isActive: true },
        },
        ratings: {
          select: { rating: true },
        },
      },
      orderBy: {
        completedJobs: 'desc',
      },
    });
  }

  /**
   * Verify IICRC certification
   */
  async verifyIICRCCertification(
    certificationCode: string,
    level: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.IICRC_API_URL}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.IICRC_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificationCode,
          level,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('IICRC verification failed:', error);
      return false;
    }
  }

  /**
   * Register contractor with NRPG
   */
  async registerContractorWithNRPG(contractorId: string, nrpgData: any) {
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
    });

    if (!contractor) throw new Error('Contractor not found');

    // Submit to NRPG system
    const nrpgMemberId = await this.submitNRPGRegistration(nrpgData);

    // Update contractor with NRPG member ID
    return prisma.contractor.update({
      where: { id: contractorId },
      data: {
        nrpgMemberId,
        nrpgVerifiedAt: new Date(),
      },
    });
  }

  /**
   * Submit registration to NRPG system
   */
  private async submitNRPGRegistration(data: any): Promise<string> {
    const response = await fetch(`${process.env.NRPG_API_URL}/contractors/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NRPG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('NRPG registration failed');
    const result = await response.json();
    return result.memberId;
  }

  /**
   * Get NRPG member details
   */
  async getNRPGMemberDetails(nrpgMemberId: string) {
    return fetch(`${process.env.NRPG_API_URL}/members/${nrpgMemberId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NRPG_API_KEY}`,
      },
    }).then(res => res.json());
  }
}

export const nrpgService = new NRPGService();
```

---

### 2.2 NRPG API Routes
**File:** `src/app/api/nrpg/contractor-lookup/route.ts`

```typescript
/**
 * GET /api/nrpg/contractor-lookup?postcode=2000&state=NSW&specialty=WATER_DAMAGE
 *
 * Find NRPG-certified contractors in specific location
 */

import { NextRequest, NextResponse } from 'next/server';
import { nrpgService } from '@/services/nrpg';
import { apiLimiter, getClientIp } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    await apiLimiter.check(30, ip); // Rate limit: 30 requests/min
  } catch {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode');
  const state = searchParams.get('state');
  const specialty = searchParams.get('specialty');

  if (!postcode || !state) {
    return NextResponse.json(
      { error: 'Postcode and state are required' },
      { status: 400 }
    );
  }

  try {
    const contractors = await nrpgService.findContractorsByLocation(
      postcode,
      state,
      specialty || undefined
    );

    return NextResponse.json({
      success: true,
      count: contractors.length,
      contractors: contractors.map(c => ({
        id: c.id,
        businessName: c.businessName,
        nrpgMemberId: c.nrpgMemberId,
        iicrcLevel: c.iicrcCertifications[0]?.certificationLevel,
        rating: c.ratings.length > 0
          ? (c.ratings.reduce((sum, r) => sum + r.rating, 0) / c.ratings.length)
          : null,
        completedJobs: c.completedJobs,
        responseTime: c.averageResponseTimeMinutes,
        specialties: c.specialties,
      })),
    });
  } catch (error) {
    console.error('Contractor lookup failed:', error);
    return NextResponse.json(
      { error: 'Contractor lookup failed' },
      { status: 500 }
    );
  }
}
```

---

**File:** `src/app/api/nrpg/verify-membership/route.ts`

```typescript
/**
 * POST /api/nrpg/verify-membership
 *
 * Verify NRPG membership and IICRC certification
 */

import { NextRequest, NextResponse } from 'next/server';
import { nrpgService } from '@/services/nrpg';
import { australianContractorRegistrationSchema } from '@/lib/validation/australia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validData = australianContractorRegistrationSchema.parse(body);

    // Verify IICRC certification
    const iicrcValid = await nrpgService.verifyIICRCCertification(
      validData.iicrcCertificationCode,
      validData.iicrcLevel
    );

    if (!iicrcValid) {
      return NextResponse.json(
        { error: 'IICRC certification could not be verified', verified: false },
        { status: 400 }
      );
    }

    // Get NRPG member ID if provided
    let nrpgStatus = null;
    if (body.nrpgMemberId) {
      nrpgStatus = await nrpgService.verifyNRPGMember(body.nrpgMemberId);
    }

    return NextResponse.json({
      verified: true,
      iicrcVerified: true,
      nrpgVerified: !!nrpgStatus,
      nrpgMemberDetails: nrpgStatus,
      message: 'Credentials verified successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Verification failed:', error);
    return NextResponse.json(
      { error: 'Verification failed', verified: false },
      { status: 500 }
    );
  }
}
```

---

## Phase 3: Core Booking System (Australian Services)

### 3.1 Booking API
**File:** `src/app/api/bookings/route.ts`

```typescript
/**
 * POST /api/bookings
 *
 * Create disaster recovery service booking
 * Supports immediate assignment for URGENT emergencies
 */

import { NextRequest, NextResponse } from 'next/server';
import { australianBookingSchema } from '@/lib/validation/australia';
import { prisma } from '@/lib/db';
import { nrpgService } from '@/services/nrpg';
import { bookingAssignmentService } from '@/services/booking/assignment';
import { authLimiter, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    await authLimiter.check(5, ip); // Rate limit: 5 bookings per 15 min
  } catch {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate booking data
    const validData = australianBookingSchema.parse(body);

    // Calculate cost estimate based on service type and location
    const costEstimate = calculateEstimate(
      validData.serviceType,
      validData.emergencyLevel,
      validData.address.postcode
    );

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        serviceType: validData.serviceType,
        emergencyLevel: validData.emergencyLevel,
        status: 'PENDING',
        description: validData.description,
        address: validData.address.streetAddress,
        suburb: validData.address.suburb,
        postcode: validData.address.postcode,
        state: validData.address.state,
        estimatedCost: costEstimate,
        images: validData.damagePhotos || [],
      },
    });

    // For URGENT bookings, immediately find and assign contractor
    if (validData.emergencyLevel === 'URGENT') {
      const contractors = await nrpgService.findContractorsByLocation(
        validData.address.postcode,
        validData.address.state,
        validData.serviceType
      );

      if (contractors.length > 0) {
        const selectedContractor = contractors[0]; // Top-rated available

        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            contractorId: selectedContractor.id,
            status: 'CONFIRMED',
          },
        });

        // Send urgent notification to contractor
        await notificationService.sendUrgentJobAlert(
          selectedContractor.id,
          booking
        );
      }
    }

    // If insurance provided, create claim draft
    if (validData.insuranceProvider && validData.policyNumber) {
      await prisma.claim.create({
        data: {
          bookingId: booking.id,
          clientId: session.user.id,
          insuranceProvider: validData.insuranceProvider,
          policyNumber: validData.policyNumber,
          status: 'DRAFT',
          totalClaimAmountAUD: validData.estimatedDamageAUD || 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      status: booking.status,
      estimatedCost: booking.estimatedCost,
      estimatedResponseTime: getEstimatedResponseTime(validData.emergencyLevel),
      message: `${validData.emergencyLevel === 'URGENT'
        ? 'Contractor assigned! They will arrive shortly.'
        : 'Booking created. We\'ll find the best contractor for you.'}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Booking creation failed:', error);
    return NextResponse.json(
      { error: 'Booking creation failed' },
      { status: 500 }
    );
  }
}

function calculateEstimate(
  serviceType: string,
  emergencyLevel: string,
  postcode: string
): number {
  // Base rates by service type (AUD)
  const baseRates: Record<string, number> = {
    WATER_DAMAGE: 800,
    FIRE_DAMAGE: 1200,
    SMOKE_DAMAGE: 600,
    MOULD_REMEDIATION: 500,
    ODOUR_REMEDIATION: 400,
    CRIME_SCENE_CLEANING: 1500,
    BIOHAZARD_REMEDIATION: 2000,
    HOARDING_CLEANUP: 1000,
    VANDALISM_CLEANUP: 700,
    GENERAL_RESTORATION: 600,
    COMMERCIAL_WATER_DAMAGE: 2000,
    COMMERCIAL_FIRE_DAMAGE: 3000,
    COMMERCIAL_MOULD: 1500,
  };

  let baseRate = baseRates[serviceType] || 600;

  // Emergency surcharge
  const emergencySurges: Record<string, number> = {
    URGENT: 0.5,      // 50% surcharge
    HIGH: 0.25,       // 25% surcharge
    STANDARD: 0,      // No surcharge
    SCHEDULED: -0.1,  // 10% discount
  };

  const surgeFactor = emergencySurges[emergencyLevel] || 0;
  const surge = baseRate * surgeFactor;

  // After-hours surcharge (18:00-08:00)
  const hour = new Date().getHours();
  const afterHoursSurge = (hour >= 18 || hour < 8) ? baseRate * 0.2 : 0;

  return Math.round(baseRate + surge + afterHoursSurge);
}

function getEstimatedResponseTime(emergencyLevel: string): string {
  const times: Record<string, string> = {
    URGENT: '1-2 hours',
    HIGH: 'Same day',
    STANDARD: 'Next business day',
    SCHEDULED: 'As scheduled',
  };
  return times[emergencyLevel] || 'TBD';
}
```

---

## Phase 4: Australian Insurance Integration

### 4.1 Insurance Provider Service
**File:** `src/services/insurance/providers.ts`

```typescript
/**
 * Australian Insurance Provider Integration
 * Supports: NRMA, Suncorp, Allianz, QBE, IAG, CGU, etc.
 */

export class InsuranceProviderService {
  private providers: Record<string, InsuranceProviderAPI> = {
    NRMA: new NRMAProvider(),
    Suncorp: new SuncorpProvider(),
    Allianz: new AllianzProvider(),
    QBE: new QBEProvider(),
    IAG: new IAGProvider(),
    CGU: new CGUProvider(),
  };

  async submitClaim(
    provider: string,
    claimData: AustralianInsuranceClaim
  ): Promise<ClaimSubmissionResult> {
    const providerAPI = this.providers[provider];
    if (!providerAPI) throw new Error(`Unsupported provider: ${provider}`);

    return providerAPI.submitClaim(claimData);
  }

  async getClaimStatus(
    provider: string,
    claimNumber: string
  ): Promise<ClaimStatusResult> {
    const providerAPI = this.providers[provider];
    if (!providerAPI) throw new Error(`Unsupported provider: ${provider}`);

    return providerAPI.getClaimStatus(claimNumber);
  }

  async processPayment(
    provider: string,
    claimNumber: string,
    amount: number
  ): Promise<PaymentResult> {
    const providerAPI = this.providers[provider];
    if (!providerAPI) throw new Error(`Unsupported provider: ${provider}`);

    return providerAPI.processPayment(claimNumber, amount);
  }
}

// NRMA Provider Implementation
class NRMAProvider implements InsuranceProviderAPI {
  private apiUrl = process.env.NRMA_API_URL;
  private apiKey = process.env.NRMA_API_KEY;

  async submitClaim(claimData: AustralianInsuranceClaim): Promise<ClaimSubmissionResult> {
    // NRMA-specific claim submission logic
    const response = await fetch(`${this.apiUrl}/claims/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyNumber: claimData.policyNumber,
        claimAmount: claimData.totalClaimAmountAUD,
        description: claimData.claimDescription,
        documents: claimData.documents,
      }),
    });

    if (!response.ok) throw new Error('NRMA claim submission failed');
    return response.json();
  }

  async getClaimStatus(claimNumber: string): Promise<ClaimStatusResult> {
    const response = await fetch(`${this.apiUrl}/claims/${claimNumber}/status`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
    });

    if (!response.ok) throw new Error('NRMA status check failed');
    return response.json();
  }

  async processPayment(claimNumber: string, amount: number): Promise<PaymentResult> {
    // NRMA payment processing logic
    const response = await fetch(`${this.apiUrl}/claims/${claimNumber}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) throw new Error('NRMA payment processing failed');
    return response.json();
  }
}

// Similar implementations for Suncorp, Allianz, QBE, etc.
```

---

## Phase 5: Frontend - Customer Booking Portal

### 5.1 Landing Page
**File:** `src/app/page.tsx`

```typescript
import { HeroSection } from '@/components/home/HeroSection';
import { ServiceTypesGrid } from '@/components/home/ServiceTypesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { EmergencyHotline } from '@/components/home/EmergencyHotline';
import { CoverageMap } from '@/components/home/CoverageMap';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main>
      <HeroSection
        headline="Emergency Disaster Recovery Services in Australia"
        subheadline="24/7 Response for Water Damage, Fire, Mould & More"
        ctaText="Get Help Now"
        ctaLink="/booking"
      />

      <ServiceTypesGrid
        services={[
          { type: 'WATER_DAMAGE', icon: 'droplets', title: 'Water Damage' },
          { type: 'FIRE_DAMAGE', icon: 'flame', title: 'Fire Damage' },
          { type: 'MOULD_REMEDIATION', icon: 'biohazard', title: 'Mould' },
          { type: 'SMOKE_DAMAGE', icon: 'cloud', title: 'Smoke Damage' },
          { type: 'CRIME_SCENE_CLEANING', icon: 'alert', title: 'Crime Scene' },
          { type: 'BIOHAZARD_REMEDIATION', icon: 'shield', title: 'Biohazard' },
        ]}
      />

      <HowItWorks />

      <EmergencyHotline phone="1800-DISASTER" />

      <CoverageMap />

      <Testimonials />
    </main>
  );
}
```

### 5.2 Booking Form
**File:** `src/app/booking/page.tsx`

```typescript
import { BookingForm } from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-2">Request Disaster Recovery Services</h1>
      <p className="text-gray-600 mb-10">
        Tell us about your emergency and we'll match you with certified NRPG contractors
      </p>

      <BookingForm />
    </div>
  );
}
```

---

## Phase 6: Contractor Portal

### 6.1 Contractor Dashboard
**File:** `src/app/dashboard/contractor/page.tsx`

```typescript
import { ContractorDashboard } from '@/components/contractor/Dashboard';
import { requireAuth } from '@/lib/auth';

export default async function ContractorDashboardPage() {
  const session = await requireAuth();

  // Verify is contractor
  const contractor = await prisma.contractor.findUnique({
    where: { userId: session.user.id },
  });

  if (!contractor) {
    redirect('/contractor/register');
  }

  return (
    <div>
      <ContractorDashboard contractor={contractor} />
    </div>
  );
}
```

---

## Implementation Timeline

### Week 1: Database & Core Services
- [ ] Update Prisma schema for Australia
- [ ] Create Australian types and validation
- [ ] Build NRPG service layer
- [ ] Create insurance provider services

### Week 2: Booking System
- [ ] Build booking API routes
- [ ] Implement contractor assignment logic
- [ ] Create cost estimation service
- [ ] Add real-time notifications

### Week 3: Frontend - Customer Portal
- [ ] Create landing page
- [ ] Build booking form component
- [ ] Implement booking tracking
- [ ] Customer dashboard

### Week 4: Contractor Portal
- [ ] Contractor dashboard
- [ ] Job accept/decline workflow
- [ ] Job completion form
- [ ] Earnings summary

### Week 5: Insurance Claims
- [ ] Insurance provider APIs
- [ ] Claim submission workflow
- [ ] Claim tracking UI
- [ ] Payment processing

### Week 6: Admin & Testing
- [ ] Admin dashboard
- [ ] Contractor verification
- [ ] Fraud detection
- [ ] Complete test suite

### Week 7: Deployment
- [ ] Staging deployment
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Launch!

---

## Australian Business Requirements

### Regulatory Compliance
- ✅ Privacy Act 1988 (Personal Information)
- ✅ Consumer Protection from Unfair Trading (ACL)
- ✅ State-based licensing requirements
- ✅ Insurance requirements (public liability)

### IICRC Certification
- ✅ Technician Level
- ✅ Supervisor Level
- ✅ Inspector Level
- ✅ Master Level

### Insurance Partners (Priority)
1. **NRMA** (NSW, ACT) - Home & contents, landlord
2. **Suncorp** (National) - Home, car, business
3. **Allianz** (National) - Home, car, business, travel
4. **QBE** (National) - Property, business
5. **IAG** (National) - NRMA parent company
6. **CGU** (National) - Business, property

### Service Localization
- ✅ Australian postcodes (4-digit format)
- ✅ Australian states/territories
- ✅ Australian currency (AUD)
- ✅ Australian phone formats (02, 03, 07, 08, 04 prefixes)
- ✅ GST calculation (10%)
- ✅ Australian business registration (ABN)

---

## Next Steps

1. **Confirm you're ready to proceed**
2. **Provide NRPG API credentials** (if available)
3. **List priority insurance providers** to integrate first
4. **Confirm emergency hotline number** for landing page
5. **Start Phase 1: Database updates**

---

**Status:** Ready for implementation
**Estimated Timeline:** 7 weeks to full production
**Next Action:** Implement Phase 1 (Database Localization)
