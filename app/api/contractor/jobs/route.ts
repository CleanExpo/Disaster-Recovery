import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { z } from 'zod';

const jobFilterSchema = z.object({
  status: z.enum(['pending', 'active', 'completed', 'cancelled']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  service: z.string().optional(),
  location: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20) });

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required' }, { status: 401 });
    }
    
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      status: searchParams.get('status') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      service: searchParams.get('service') || undefined,
      location: searchParams.get('location') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20') };
    
    // Validate filters
    const validatedFilters = jobFilterSchema.parse(filters);
    
    // Mock job data (in production, fetch from database)
    const allJobs = [
      {
        id: 'JOB-2024-101',
        customer: {
          name: 'Sarah Johnson',
          
          email: 'sarah.j@email.com',
          address: '123 Queen St, Brisbane CBD, QLD 4000' },
        service: {
          type: 'water-damage',
          name: 'Water Damage Restoration',
          category: 'emergency' },
        status: 'active',
        priority: 'high',
        scheduledDate: '2024-01-29T14:00:00Z',
        estimatedDuration: 3,
        value: 3500.00,
        insurance: {
          hasInsurance: true,
          company: 'NRMA',
          claimNumber: 'CLM-2024-456',
          excess: 500 },
        notes: 'Burst pipe in kitchen, water damage to flooring and cabinets',
        equipment: ['Dehumidifier x2', 'Air Mover x4', 'Moisture Meter'],
        team: ['John Smith', 'Mike Brown'],
        createdAt: '2024-01-28T10:00:00Z',
        updatedAt: '2024-01-28T14:30:00Z' },
      {
        id: 'JOB-2024-102',
        customer: {
          name: 'David Chen',
          
          email: 'dchen@email.com',
          address: '456 Park Rd, Milton, QLD 4064' },
        service: {
          type: 'mould-remediation',
          name: 'Mould Remediation',
          category: 'standard' },
        status: 'pending',
        priority: 'medium',
        scheduledDate: '2024-01-30T09:00:00Z',
        estimatedDuration: 5,
        value: 4200.00,
        insurance: {
          hasInsurance: false },
        notes: 'Mould in bathroom ceiling and walls, poor ventilation',
        equipment: ['HEPA Air Scrubber', 'PPE Kit', 'Antimicrobial Spray'],
        team: [],
        createdAt: '2024-01-27T15:00:00Z',
        updatedAt: '2024-01-27T15:00:00Z' },
      {
        id: 'JOB-2024-099',
        customer: {
          name: 'Emma Williams',
          
          email: 'emma.w@email.com',
          address: '789 River Tce, Kangaroo Point, QLD 4169' },
        service: {
          type: 'fire-damage',
          name: 'Fire & Smoke Damage',
          category: 'emergency' },
        status: 'completed',
        priority: 'high',
        scheduledDate: '2024-01-25T08:00:00Z',
        estimatedDuration: 8,
        value: 8500.00,
        insurance: {
          hasInsurance: true,
          company: 'Allianz',
          claimNumber: 'CLM-2024-123',
          excess: 1000 },
        notes: 'Kitchen fire, extensive smoke damage throughout property',
        equipment: ['Ozone Generator', 'HEPA Vacuum', 'Thermal Fogger'],
        team: ['John Smith', 'Mike Brown', 'Sarah Lee'],
        completedAt: '2024-01-25T18:00:00Z',
        rating: 5,
        feedback: 'Excellent service, very professional team',
        createdAt: '2024-01-24T20:00:00Z',
        updatedAt: '2024-01-25T18:00:00Z' },
    ];
    
    // Apply filters
    let filteredJobs = allJobs;
    
    if (validatedFilters.status) {
      filteredJobs = filteredJobs.filter(job => job.status === validatedFilters.status);
    }
    
    // Calculate pagination
    const totalJobs = filteredJobs.length;
    const totalPages = Math.ceil(totalJobs / validatedFilters.limit);
    const startIndex = (validatedFilters.page - 1) * validatedFilters.limit;
    const endIndex = startIndex + validatedFilters.limit;
    
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    
    return NextResponse.json({
      success: true,
      data: {
        jobs: paginatedJobs,
        pagination: {
          page: validatedFilters.page,
          limit: validatedFilters.limit,
          total: totalJobs,
          totalPages,
          hasNext: validatedFilters.page < totalPages,
          hasPrev: validatedFilters.page > 1 } } }, { status: 200 });
    
  } catch (error) {
    console.error('Jobs API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid filters',
        errors: error.errors }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// Accept or update a job
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required' }, { status: 401 });
    }
    
    const body = await request.json();
    const { jobId, action, data } = body;
    
    // Validate action
    if (!['accept', 'decline', 'complete', 'update'].includes(action)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid action' }, { status: 400 });
    }
    
    // Process action (in production, update database)
    let message = '';
    let updatedJob = {};
    
    switch (action) {
      case 'accept':
        message = `Job ${jobId} accepted successfully`;
        updatedJob = { status: 'active', acceptedAt: new Date().toISOString() };
        break;
        
      case 'decline':
        message = `Job ${jobId} declined`;
        updatedJob = { status: 'declined', declinedAt: new Date().toISOString() };
        break;
        
      case 'complete':
        message = `Job ${jobId} marked as completed`;
        updatedJob = { status: 'completed', completedAt: new Date().toISOString() };
        break;
        
      case 'update':
        message = `Job ${jobId} updated successfully`;
        updatedJob = { ...data, updatedAt: new Date().toISOString() };
        break;
    }
    
    return NextResponse.json({
      success: true,
      message,
      job: {
        id: jobId,
        ...updatedJob } }, { status: 200 });
    
  } catch (error) {
    console.error('Job action error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to process job action' }, { status: 500 });
  }
}