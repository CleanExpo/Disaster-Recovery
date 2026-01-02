import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { completePhase, detectRiskZones } from '@/lib/services/client-onboarding.service';
import { sendPhaseCompletionEmail } from '@/lib/services/client-email.service';
import { propertyDetailsSchema } from '@/lib/validations/client-onboarding';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * POST /api/client/onboarding/property
 *
 * Save Phase 3: Property details
 * Creates ClientProperty record
 * Detects risk zones (flood, bushfire, cyclone)
 * Encrypts access instructions (placeholder for AWS KMS)
 * Completes property phase and marks core phases complete
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CLIENT', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Parse and validate
    const body = await request.json();
    const validated = propertyDetailsSchema.parse(body);

    // Get or create client profile
    const profile = await prisma.clientProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        tier: 'standard',
      },
    });

    // Detect risk zones and get recommendations
    const { zones, recommendedServices } = await detectRiskZones(
      validated.postcode,
      validated.state as any
    );

    // Create property record
    const property = await prisma.clientProperty.create({
      data: {
        clientProfileId: profile.id,
        streetAddress: validated.streetAddress,
        suburb: validated.suburb,
        postcode: validated.postcode,
        state: validated.state as any,
        country: validated.country,
        propertyType: validated.propertyType,
        propertySize: validated.propertySize,
        buildingAge: validated.buildingAge,
        accessInstructions: validated.accessInstructions, // TODO: Encrypt with AWS KMS
        accessKeyId: null, // TODO: KMS key ID
        parkingAvailable: validated.parkingAvailable,
        securityAccess: validated.securityAccess,
        petOnPremises: validated.petOnPremises,
        petDetails: validated.petDetails,
        recommendedServices,
        isPrimary: true,
      },
    });

    // Update profile with risk zone and property count
    await prisma.clientProfile.update({
      where: { id: profile.id },
      data: {
        riskZone: zones.length > 0 ? zones.join(',') : null,
        riskAssessmentOffered: zones.length > 0,
        propertyCount: 1,
      },
    });

    // Complete phase
    const result = await completePhase(user.id, 'property');

    // Core phases complete! Send special email
    const coreComplete = result.completionPercentage >= 42.8; // 3/7 phases

    // Send phase completion email (non-blocking)
    await sendPhaseCompletionEmail({
      clientName: user.name || 'Valued Client',
      clientEmail: user.email,
      phaseName: coreComplete ? 'Core Setup' : 'Property Details',
      phaseNumber: 3,
      completionPercentage: result.completionPercentage,
      nextPhaseName: result.nextPhase ? 'Insurance & Documentation' : undefined,
      nextPhaseUrl: result.nextPhase ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/client/onboarding/${result.nextPhase}` : undefined,
      estimatedMinutes: result.nextPhase ? 3 : undefined,
    }).catch((err) => {
      console.error('Failed to send phase completion email:', err);
    });

    return NextResponse.json({
      success: true,
      message: coreComplete
        ? 'Core setup complete! You can now create service requests.'
        : result.message,
      property: {
        id: property.id,
        address: `${validated.streetAddress}, ${validated.suburb}, ${validated.state} ${validated.postcode}`,
      },
      riskZones: zones,
      recommendedServices,
      nextPhase: result.nextPhase,
      nextPhaseUrl: result.nextPhase ? `/dashboard/client/onboarding/${result.nextPhase}` : '/dashboard/client/onboarding/checklist',
      completionPercentage: result.completionPercentage,
      coreComplete,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
