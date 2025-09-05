import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock database for tickets
const tickets = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate unique ticket ID
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create ticket object with all customer data
    const ticket = {
      id: ticketId,
      customerId: uuidv4(),
      status: 'NEW',
      priority: calculatePriority(body),
      createdAt: new Date().toISOString(),
      
      // Customer Information
      customer: {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
      },
      
      // Property Information
      property: {
        type: body.propertyType,
        address: body.propertyAddress,
        suburb: body.suburb,
        state: body.state,
        postcode: body.postcode,
        value: body.propertyValue,
        isBusinessProperty: body.isBusinessProperty,
      },
      
      // Damage Information
      damage: {
        types: body.damageType,
        date: body.damageDate,
        description: body.damageDescription,
        areaAffected: body.estimatedAreaAffected,
        urgencyLevel: body.urgencyLevel,
        requiresAccommodation: body.requiresAccommodation,
        hasPhotos: body.hasPhotos,
      },
      
      // Insurance Information
      insurance: {
        hasInsurance: body.hasInsurance,
        company: body.insuranceCompany,
        claimNumber: body.claimNumber,
        excessAmount: body.excessAmount,
      },
      
      // Business Metrics
      metrics: {
        leadScore: body.leadScore || calculateLeadScore(body),
        leadValue: calculateLeadValue(body),
        readyToStart: body.readyToStart,
        budget: body.budget,
        decisionMaker: body.decisionMaker,
      },
      
      // Tracking Information
      tracking: {
        source: body.source || 'website',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: body.userAgent || request.headers.get('user-agent') || '',
      },
      
      // Workflow Status
      workflow: {
        crmConnected: false,
        contractorAssigned: false,
        jobAccepted: false,
        claimsSubmitted: false,
        kpisTracked: false,
        fundsReleased: false,
      },
    };
    
    // Store ticket in memory (in production, this would be a database)
    tickets.set(ticketId, ticket);
    
    // Trigger CRM integration (async)
    setTimeout(() => connectToCRM(ticketId), 2000);
    
    return NextResponse.json({
      success: true,
      ticketId: ticketId,
      message: 'Ticket created successfully. A specialist will contact you within 30 minutes.',
      estimatedResponse: '30 minutes',
      trackingUrl: `/track/${ticketId}`,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create ticket',
      message: 'Please try again or contact support',
    }, { status: 500 });
  }
}

// Get ticket by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('id');
  
  if (!ticketId) {
    return NextResponse.json({
      success: false,
      error: 'Ticket ID required',
    }, { status: 400 });
  }
  
  const ticket = tickets.get(ticketId);
  
  if (!ticket) {
    return NextResponse.json({
      success: false,
      error: 'Ticket not found',
    }, { status: 404 });
  }
  
  return NextResponse.json({
    success: true,
    ticket: ticket,
  });
}

// Helper functions
function calculatePriority(data: any): string {
  if (data.urgencyLevel === 'emergency') return 'CRITICAL';
  if (data.urgencyLevel === 'urgent') return 'HIGH';
  if (data.isBusinessProperty) return 'HIGH';
  if (data.requiresAccommodation) return 'HIGH';
  if (data.urgencyLevel === 'soon') return 'MEDIUM';
  return 'LOW';
}

function calculateLeadScore(data: any): number {
  let score = 0;
  
  // Insurance (30 points)
  if (data.hasInsurance) score += 30;
  
  // Urgency (20 points)
  if (data.urgencyLevel === 'emergency') score += 20;
  else if (data.urgencyLevel === 'urgent') score += 15;
  else if (data.urgencyLevel === 'soon') score += 10;
  
  // Property Value (20 points)
  const value = parseInt(data.propertyValue || '0');
  if (value > 1000000) score += 20;
  else if (value > 500000) score += 15;
  else if (value > 250000) score += 10;
  
  // Business Property (15 points)
  if (data.isBusinessProperty) score += 15;
  
  // Ready to Start (10 points)
  if (data.readyToStart === 'immediately') score += 10;
  else if (data.readyToStart === 'within_week') score += 7;
  
  // Decision Maker (5 points)
  if (data.decisionMaker) score += 5;
  
  return score;
}

function calculateLeadValue(data: any): number {
  const baseValue = 550; // Base value per lead
  let multiplier = 1;
  
  if (data.isBusinessProperty) multiplier += 0.5;
  if (data.hasInsurance) multiplier += 0.3;
  if (parseInt(data.propertyValue || '0') > 1000000) multiplier += 0.4;
  if (data.urgencyLevel === 'emergency') multiplier += 0.3;
  
  return Math.round(baseValue * multiplier);
}

// CRM Integration (Mock)
async function connectToCRM(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  // Update workflow status
  ticket.workflow.crmConnected = true;
  tickets.set(ticketId, ticket);
  
  // Trigger contractor matching after 3 seconds
  setTimeout(() => findContractor(ticketId), 3000);
}

// Contractor Matching (Mock)
async function findContractor(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  // Mock contractor assignment
  ticket.contractorId = `CTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  ticket.contractorName = 'Premium Restoration Services';
  ticket.contractorPhone = '1300 RESTORE';
  ticket.workflow.contractorAssigned = true;
  
  tickets.set(ticketId, ticket);
  
  // Simulate contractor accepting job after 5 seconds
  setTimeout(() => acceptJob(ticketId), 5000);
}

// Job Acceptance (Mock)
async function acceptJob(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.jobAccepted = true;
  ticket.jobAcceptedAt = new Date().toISOString();
  tickets.set(ticketId, ticket);
  
  // Start clean claims process
  setTimeout(() => submitCleanClaim(ticketId), 2000);
}

// Clean Claims Submission (Mock)
async function submitCleanClaim(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  if (ticket.insurance.hasInsurance) {
    ticket.claimId = `CLAIM-${Date.now()}`;
    ticket.workflow.claimsSubmitted = true;
    ticket.claimStatus = 'SUBMITTED';
    tickets.set(ticketId, ticket);
    
    // Track KPIs
    setTimeout(() => trackKPIs(ticketId), 1000);
  }
}

// KPI Tracking (Mock)
async function trackKPIs(ticketId: string) {
  const ticket = tickets.get(ticketId);
  if (!ticket) return;
  
  ticket.workflow.kpisTracked = true;
  ticket.kpis = {
    responseTime: '28 minutes',
    assignmentTime: '5 minutes',
    acceptanceTime: '3 minutes',
    claimSubmissionTime: '10 minutes',
    customerSatisfaction: null, // To be collected
  };
  
  tickets.set(ticketId, ticket);
}