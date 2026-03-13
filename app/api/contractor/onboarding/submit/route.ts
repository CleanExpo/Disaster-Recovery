import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const application = body?.application || {};

    const businessInfo = application.businessInfo || {};

    const record = await prisma.contractorApplication.create({
      data: {
        businessName: businessInfo.companyName ?? businessInfo.businessName ?? null,
        contactName: businessInfo.contactName ?? null,
        email: businessInfo.email ?? null,
        phone: businessInfo.phone ?? null,
        data: application
      }
    });

    return NextResponse.json(
      {
        success: true,
        applicationId: record.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contractor application', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save contractor application' },
      { status: 500 }
    );
  }
}

