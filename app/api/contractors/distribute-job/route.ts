import { NextRequest, NextResponse } from 'next/server';

interface JobDistributionRequest {
  bookingId: string;
  serviceType: string;
  urgencyLevel: 'emergency' | 'urgent' | 'standard';
  location: {
    suburb: string;
    state: string;
    postcode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  customerDetails: {
    name: string;
    
    email: string;
    address: string;
  };
  damageDescription: string;
  propertyType: string;
  estimatedValue: number;
  insuranceDetails?: {
    hasInsurance: boolean;
    company?: string;
    claimNumber?: string;
  };
}

interface Contractor {
  id: string;
  username: string;
  email: string;
  
  services: string[];
  serviceAreas: {
    suburbs: string[];
    postcodes: string[];
    states: string[];
    maxRadius: number; // km from base
  };
  certifications: string[];
  rating: number;
  completedJobs: number;
  responseTime: number; // average in minutes
  availability: {
    emergency: boolean;
    urgent: boolean;
    standard: boolean;
  };
  preferences: {
    minJobValue: number;
    maxActiveJobs: number;
    insuranceWorkOnly: boolean;
  };
  performance: {
    acceptanceRate: number;
    completionRate: number;
    customerSatisfaction: number;
    kpiScore: number;
  };
  currentActiveJobs: number;
  lastNotified?: Date;
}

// Mock contractor database - in production this would be from your database
const mockContractors: Contractor[] = [
  {
    id: 'CONT-001',
    username: 'Elite Water Damage Restoration',
    email: 'contact@elitewater.com.au',
    
    services: ['water-damage', 'flood-restoration', 'mold-remediation'],
    serviceAreas: {
      suburbs: ['Brisbane', 'Gold Coast', 'Ipswich'],
      postcodes: ['4000', '4001', '4002', '4217', '4218'],
      states: ['QLD'],
      maxRadius: 50 },
    certifications: ['IICRC', 'WRT', 'ASD'],
    rating: 4.9,
    completedJobs: 234,
    responseTime: 25,
    availability: {
      emergency: true,
      urgent: true,
      standard: true },
    preferences: {
      minJobValue: 1000,
      maxActiveJobs: 10,
      insuranceWorkOnly: false },
    performance: {
      acceptanceRate: 0.85,
      completionRate: 0.98,
      customerSatisfaction: 4.9,
      kpiScore: 95 },
    currentActiveJobs: 3 },
  {
    id: 'CONT-002',
    username: 'Rapid Response Restorations',
    email: 'jobs@rapidresponse.com.au',
    
    services: ['water-damage', 'fire-damage', 'storm-damage'],
    serviceAreas: {
      suburbs: ['Sydney', 'Parramatta', 'Penrith'],
      postcodes: ['2000', '2001', '2150', '2750'],
      states: ['NSW'],
      maxRadius: 75 },
    certifications: ['IICRC', 'FSRT'],
    rating: 4.7,
    completedJobs: 156,
    responseTime: 35,
    availability: {
      emergency: true,
      urgent: true,
      standard: false },
    preferences: {
      minJobValue: 2000,
      maxActiveJobs: 5,
      insuranceWorkOnly: true },
    performance: {
      acceptanceRate: 0.75,
      completionRate: 0.95,
      customerSatisfaction: 4.7,
      kpiScore: 88 },
    currentActiveJobs: 2 },
];

// Calculate contractor score for job matching
function calculateContractorScore(contractor: Contractor, job: JobDistributionRequest): number {
  let score = 0;

  // Service match (must have)
  const serviceTypeMap: Record<string, string> = {
    'Water Damage': 'water-damage',
    'Fire Damage': 'fire-damage',
    'Storm Damage': 'storm-damage',
    'Mold Services': 'mold-remediation' };
  
  const mappedService = serviceTypeMap[job.serviceType] || job.serviceType.toLowerCase().replace(/\s+/g, '-');
  if (!contractor.services.includes(mappedService)) {
    return 0; // Contractor doesn't offer this service
  }
  score += 100;

  // Location match
  if (contractor.serviceAreas.postcodes.includes(job.location.postcode)) {
    score += 50;
  } else if (contractor.serviceAreas.suburbs.includes(job.location.suburb)) {
    score += 40;
  } else if (contractor.serviceAreas.states.includes(job.location.state)) {
    score += 20;
  } else {
    return 0; // Outside service area
  }

  // Urgency availability
  if (job.urgencyLevel === 'emergency' && contractor.availability.emergency) {
    score += 30;
  } else if (job.urgencyLevel === 'urgent' && contractor.availability.urgent) {
    score += 20;
  } else if (job.urgencyLevel === 'standard' && contractor.availability.standard) {
    score += 10;
  } else {
    return 0; // Not available for this urgency level
  }

  // Performance metrics
  score += contractor.performance.kpiScore * 0.5;
  score += contractor.rating * 10;
  score += (contractor.performance.acceptanceRate * 20);

  // Response time bonus (lower is better)
  if (contractor.responseTime <= 30) {
    score += 25;
  } else if (contractor.responseTime <= 60) {
    score += 15;
  }

  // Capacity check (penalty if near max jobs)
  const capacityRatio = contractor.currentActiveJobs / contractor.preferences.maxActiveJobs;
  if (capacityRatio < 0.5) {
    score += 20;
  } else if (capacityRatio < 0.8) {
    score += 10;
  } else if (capacityRatio >= 1) {
    return 0; // At capacity
  }

  // Insurance preference
  if (job.insuranceDetails?.hasInsurance) {
    if (contractor.preferences.insuranceWorkOnly) {
      score += 15;
    }
  } else if (contractor.preferences.insuranceWorkOnly) {
    score -= 30; // Penalty if contractor only wants insurance work
  }

  // Job value check
  if (job.estimatedValue < contractor.preferences.minJobValue) {
    score -= 20;
  }

  return Math.max(0, score);
}

export async function POST(request: NextRequest) {
  try {
    const jobData: JobDistributionRequest = await request.json();

    // Find eligible contractors
    const eligibleContractors = mockContractors
      .map(contractor => ({
        contractor,
        score: calculateContractorScore(contractor, jobData) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (eligibleContractors.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No contractors available for this job',
        data: {
          bookingId: jobData.bookingId,
          notifiedCount: 0 } }, { status: 404 });
    }

    // Notification strategy based on urgency
    let notificationLimit = 3; // Default for standard
    if (jobData.urgencyLevel === 'emergency') {
      notificationLimit = 5; // Notify more contractors for emergencies
    } else if (jobData.urgencyLevel === 'urgent') {
      notificationLimit = 4;
    }

    // Select top contractors to notify
    const contractorsToNotify = eligibleContractors
      .slice(0, notificationLimit)
      .map(item => item.contractor);

    // Send notifications (in production, this would be actual email/SMS)
    const notifications = await Promise.all(
      contractorsToNotify.map(async (contractor) => {
        // Simulate notification sending
        const notification = {
          contractorId: contractor.id,
          username: contractor.username,
          notificationMethod: 'email',
          sentAt: new Date().toISOString(),
          jobDetails: {
            bookingId: jobData.bookingId,
            serviceType: jobData.serviceType,
            urgency: jobData.urgencyLevel,
            location: `${jobData.location.suburb}, ${jobData.location.state}`,
            estimatedValue: jobData.estimatedValue,
            customeremail: jobData.customerDetails.email,
            description: jobData.damageDescription },
          acceptanceUrl: `https://portal.disasterrecovery.com.au/jobs/${jobData.bookingId}/accept`,
          expiresIn: jobData.urgencyLevel === 'emergency' ? '30 minutes' : '2 hours' };

        // In production, you would:
        // 1. Send actual email via SendGrid/AWS SES
        // 2. Send SMS via Twilio for emergency jobs
        // 3. Push notification to contractor mobile app
        // 4. Update contractor's last notified timestamp
        // 5. Log notification in database

        console.log(`Notifying ${contractor.username} about job ${jobData.bookingId}`);
        
        return notification;
      })
    );

    // Create job record in database
    const jobRecord = {
      bookingId: jobData.bookingId,
      status: 'pending_acceptance',
      serviceType: jobData.serviceType,
      urgencyLevel: jobData.urgencyLevel,
      location: jobData.location,
      customerDetails: jobData.customerDetails,
      estimatedValue: jobData.estimatedValue,
      notifiedContractors: contractorsToNotify.map(c => ({
        id: c.id,
        username: c.username,
        notifiedAt: new Date().toISOString(),
        score: eligibleContractors.find(e => e.contractor.id === c.id)?.score || 0 })),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (jobData.urgencyLevel === 'emergency' ? 30 : 120) * 60000).toISOString() };

    // In production, save jobRecord to database
    // await saveJobRecord(jobRecord);

    return NextResponse.json({
      success: true,
      message: `Job distributed to ${contractorsToNotify.length} contractors`,
      data: {
        bookingId: jobData.bookingId,
        notifiedCount: contractorsToNotify.length,
        contractors: contractorsToNotify.map(c => ({
          id: c.id,
          username: c.username,
          responseTime: c.responseTime,
          rating: c.rating })),
        notifications,
        jobExpiresAt: jobRecord.expiresAt } });

  } catch (error) {
    console.error('Job distribution error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to distribute job to contractors',
      error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

// Get job distribution status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({
      success: false,
      message: 'Booking ID is required' }, { status: 400 });
  }

  // In production, fetch from database
  // const job = await getJobByBookingId(bookingId);

  // Mock response
  const mockJobStatus = {
    bookingId,
    status: 'pending_acceptance',
    notifiedContractors: 3,
    responses: [
      {
        contractorId: 'CONT-001',
        username: 'Elite Water Damage Restoration',
        status: 'viewed',
        viewedAt: new Date(Date.now() - 5 * 60000).toISOString() },
      {
        contractorId: 'CONT-002',
        username: 'Rapid Response Restorations',
        status: 'pending' },
    ],
    acceptedBy: null,
    expiresAt: new Date(Date.now() + 25 * 60000).toISOString() };

  return NextResponse.json({
    success: true,
    data: mockJobStatus });
}