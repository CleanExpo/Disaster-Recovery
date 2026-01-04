/**
 * NRPG Certification Points API
 * GET: Retrieve contractor's certification points
 * POST: Recalculate and update certification points
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  calculateNRPGPoints,
  type CertificationInput,
  getPartnershipLevelInfo,
  getPointsToNextLevel,
} from '@/lib/nrpg/calculate-points';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get contractor ID from user
    const contractor = await prisma.contractor.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Get or create certification record
    let certification = await prisma.nRPGCertificationPoints.findUnique({
      where: { contractorId: contractor.id },
    });

    if (!certification) {
      // Create initial record
      certification = await prisma.nRPGCertificationPoints.create({
        data: {
          contractorId: contractor.id,
          totalPoints: 0,
          partnershipLevel: 'CANDIDATE',
        },
      });
    }

    const levelInfo = getPartnershipLevelInfo(certification.partnershipLevel);
    const pointsToNext = getPointsToNextLevel(certification.totalPoints, certification.partnershipLevel);

    return NextResponse.json({
      success: true,
      data: {
        certification,
        levelInfo,
        pointsToNextLevel: pointsToNext,
        categoryBreakdown: {
          govCert4: {
            current: certification.govCert4Points,
            max: 40,
            percentage: Math.round((certification.govCert4Points / 40) * 100),
          },
          iicrc: {
            current: certification.iicrcCorePoints + certification.iicrcAdvancedPoints,
            bonus: certification.iicrcMasterBonus,
            max: 30,
            percentage: Math.round(((certification.iicrcCorePoints + certification.iicrcAdvancedPoints) / 30) * 100),
          },
          carsi: {
            current: certification.carsiMembershipPoints + certification.carsiCoursePoints + certification.carsiCECPoints,
            max: 25,
            percentage: Math.round(((certification.carsiMembershipPoints + certification.carsiCoursePoints + certification.carsiCECPoints) / 25) * 100),
          },
          associations: {
            current: certification.primaryAssocPoints + certification.secondaryAssocPoints,
            max: 20,
            percentage: Math.round(((certification.primaryAssocPoints + certification.secondaryAssocPoints) / 20) * 100),
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching certification:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    // Get contractor ID
    const contractor = await prisma.contractor.findFirst({
      where: { userId },
      select: { id: true },
      include: {
        iicrcCertifications: true,
      },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Build certification input from provided data and existing records
    const input: CertificationInput = {
      govCert4: {
        status: body.govCert4Status || 'not_enrolled',
      },
      iicrc: {
        wrt: body.iicrc?.wrt || false,
        asd: body.iicrc?.asd || false,
        amrt: body.iicrc?.amrt || false,
        cct: body.iicrc?.cct || false,
        fsr: body.iicrc?.fsr || false,
        uft: body.iicrc?.uft || false,
        tcsc: body.iicrc?.tcsc || false,
        mwr: body.iicrc?.mwr || false,
        mfsr: body.iicrc?.mfsr || false,
        mtc: body.iicrc?.mtc || false,
      },
      carsi: {
        isActiveMember: body.carsi?.isActiveMember || false,
        membershipLevel: body.carsi?.membershipLevel,
        coursesCompleted: body.carsi?.coursesCompleted || 0,
        annualCECCredits: body.carsi?.annualCECCredits || 0,
        isCECExcellence: body.carsi?.isCECExcellence || false,
        isCourseDeveloper: body.carsi?.isCourseDeveloper || false,
      },
      associations: {
        primaryAssociation: body.associations?.primaryAssociation,
        secondaryAssociations: body.associations?.secondaryAssociations || [],
        hasCommitteeRole: body.associations?.hasCommitteeRole || false,
        hasBoardRole: body.associations?.hasBoardRole || false,
      },
    };

    // Calculate points
    const breakdown = calculateNRPGPoints(input);

    // Update or create certification record
    const certification = await prisma.nRPGCertificationPoints.upsert({
      where: { contractorId: contractor.id },
      update: {
        govCert4Points: breakdown.govCert4Points,
        govCert4Status: body.govCert4Status,
        iicrcCorePoints: breakdown.iicrcCorePoints,
        iicrcAdvancedPoints: breakdown.iicrcAdvancedPoints,
        iicrcMasterBonus: breakdown.iicrcMasterBonus,
        carsiMembershipPoints: breakdown.carsiMembershipPoints,
        carsiCoursePoints: breakdown.carsiCoursePoints,
        carsiCECPoints: breakdown.carsiCECPoints,
        annualCECCredits: input.carsi.annualCECCredits,
        carsiMemberId: body.carsi?.memberId,
        primaryAssocPoints: breakdown.primaryAssocPoints,
        secondaryAssocPoints: breakdown.secondaryAssocPoints,
        primaryAssociation: input.associations.primaryAssociation,
        secondaryAssociations: input.associations.secondaryAssociations,
        totalPoints: breakdown.totalPoints,
        partnershipLevel: breakdown.partnershipLevel,
        lastCalculatedAt: new Date(),
      },
      create: {
        contractorId: contractor.id,
        govCert4Points: breakdown.govCert4Points,
        govCert4Status: body.govCert4Status,
        iicrcCorePoints: breakdown.iicrcCorePoints,
        iicrcAdvancedPoints: breakdown.iicrcAdvancedPoints,
        iicrcMasterBonus: breakdown.iicrcMasterBonus,
        carsiMembershipPoints: breakdown.carsiMembershipPoints,
        carsiCoursePoints: breakdown.carsiCoursePoints,
        carsiCECPoints: breakdown.carsiCECPoints,
        annualCECCredits: input.carsi.annualCECCredits,
        carsiMemberId: body.carsi?.memberId,
        primaryAssocPoints: breakdown.primaryAssocPoints,
        secondaryAssocPoints: breakdown.secondaryAssocPoints,
        primaryAssociation: input.associations.primaryAssociation,
        secondaryAssociations: input.associations.secondaryAssociations,
        totalPoints: breakdown.totalPoints,
        partnershipLevel: breakdown.partnershipLevel,
      },
    });

    const levelInfo = getPartnershipLevelInfo(certification.partnershipLevel);
    const pointsToNext = getPointsToNextLevel(certification.totalPoints, certification.partnershipLevel);

    return NextResponse.json({
      success: true,
      data: {
        certification,
        breakdown,
        levelInfo,
        pointsToNextLevel: pointsToNext,
      },
    });
  } catch (error) {
    console.error('Error updating certification:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
