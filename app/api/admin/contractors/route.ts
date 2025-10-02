import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin (you might want to add an admin role to your schema)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { userType: true }
    });

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all contractor profiles with pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'pending', 'verified', 'rejected'
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const whereClause: any = {};
    
    if (status === 'pending') {
      whereClause.isVerified = false;
    } else if (status === 'verified') {
      whereClause.isVerified = true;
    }

    if (search) {
      whereClause.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    const [contractors, total] = await Promise.all([
      prisma.contractorProfile.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              createdAt: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.contractorProfile.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      contractors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching contractors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { userType: true }
    });

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { contractorId, action, reason } = body; // action: 'verify', 'reject'

    if (!contractorId || !action) {
      return NextResponse.json(
        { error: 'Contractor ID and action are required' },
        { status: 400 }
      );
    }

    const contractor = await prisma.contractorProfile.findUnique({
      where: { id: contractorId },
      include: { user: true }
    });

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 });
    }

    let updateData: any = {};

    if (action === 'verify') {
      updateData.isVerified = true;
    } else if (action === 'reject') {
      updateData.isVerified = false;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updatedContractor = await prisma.contractorProfile.update({
      where: { id: contractorId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    // Send notification to contractor
    try {
      await prisma.message.create({
        data: {
          senderId: user.userId, // Use admin user ID
          receiverId: contractor.userId,
          subject: action === 'verify' ? 'Profile Verified' : 'Profile Verification Rejected',
          content: action === 'verify' 
            ? 'Congratulations! Your contractor profile has been verified. You can now start receiving project opportunities.'
            : `Your contractor profile verification was rejected. ${reason ? `Reason: ${reason}` : 'Please review your profile and try again.'}`,
          messageType: 'SYSTEM_NOTIFICATION'
        }
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      // Don't fail the verification if notification fails
    }

    return NextResponse.json({
      success: true,
      contractor: updatedContractor,
      message: `Contractor ${action === 'verify' ? 'verified' : 'rejected'} successfully`
    });

  } catch (error) {
    console.error('Error updating contractor verification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
