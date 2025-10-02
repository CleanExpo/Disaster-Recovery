import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build where clause
    const whereClause: any = {
      isVerified: true,
      availability: 'AVAILABLE'
    };

    if (category && category !== 'all') {
      whereClause.services = {
        has: category
      };
    }

    // Get available contractors
    const contractors = await prisma.contractorProfile.findMany({
      where: whereClause,
      include: {
        user: true
      },
      orderBy: [
        { rating: 'desc' },
        { totalJobs: 'desc' },
        { experience: 'desc' }
      ],
      take: limit
    });

    // Format the response
    const availableContractors = contractors.map(contractor => ({
      id: contractor.id,
      businessName: contractor.businessName,
      phone: contractor.phone,
      city: contractor.city,
      state: contractor.state,
      services: contractor.services,
      experience: contractor.experience,
      rating: contractor.rating,
      totalJobs: contractor.totalJobs,
      hourlyRate: contractor.hourlyRate,
      bio: contractor.bio,
      availability: contractor.availability,
      isVerified: contractor.isVerified,
      user: {
        id: contractor.user.id,
        name: contractor.user.name,
        email: contractor.user.email,
        avatar: contractor.user.avatar
      }
    }));

    return NextResponse.json({
      success: true,
      data: availableContractors
    });

  } catch (error) {
    console.error('Error getting available contractors:', error);
    return NextResponse.json(
      { error: 'Failed to get available contractors' },
      { status: 500 }
    );
  }
}
