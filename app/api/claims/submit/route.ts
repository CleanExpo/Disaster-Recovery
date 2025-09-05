import { NextRequest, NextResponse } from 'next/server';

// Mock database for claims
const claims = new Map();

// Fixed platform fee
const PLATFORM_FEE = 2750.00;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate payment
    if (!body.paymentConfirmed || body.paymentAmount !== PLATFORM_FEE) {
      return NextResponse.json({
        success: false,
        error: 'Payment required',
        message: `Platform fee of $${PLATFORM_FEE} must be paid before claim submission`,
        requiredAmount: PLATFORM_FEE
      }, { status: 402 }); // Payment Required
    }
    
    // Generate unique claim ID
    const claimId = `CLM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create claim object
    const claim = {
      id: claimId,
      status: 'PAID_PENDING_CONTRACTOR',
      platformFee: PLATFORM_FEE,
      paymentReceived: true,
      paymentTimestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      
      // Client Information (for contractor use)
      client: {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        preferredContact: body.preferredContact || 'phone'
      },
      
      // Property Information
      property: {
        address: body.propertyAddress,
        suburb: body.suburb,
        state: body.state,
        postcode: body.postcode,
        type: body.propertyType,
        accessInstructions: body.accessInstructions
      },
      
      // Damage Information
      damage: {
        types: body.damageTypes,
        occurredDate: body.damageDate,
        description: body.damageDescription,
        affectedAreas: body.affectedAreas,
        urgencyLevel: body.urgencyLevel,
        hazards: body.hazards || []
      },
      
      // Insurance Information
      insurance: {
        hasInsurance: body.hasInsurance,
        company: body.insuranceCompany,
        policyNumber: body.policyNumber,
        claimNumber: body.insuranceClaimNumber,
        excessAmount: body.excessAmount,
        assessorDetails: body.assessorDetails
      },
      
      // Documentation
      documentation: {
        photosProvided: body.hasPhotos || false,
        documentsUploaded: body.uploadedDocuments || [],
        authorizations: {
          propertyAccess: body.authorizePropertyAccess,
          insuranceLiaison: body.authorizeInsuranceLiaison,
          workCommencement: body.authorizeWorkCommencement
        }
      },
      
      // Platform Workflow
      workflow: {
        paymentProcessed: true,
        contractorAssigned: false,
        contractorAccepted: false,
        initialContactMade: false,
        jobScheduled: false,
        makeSafeCompleted: false,
        documentationProvided: false,
        claimFinalized: false
      },
      
      // Contractor Assignment (will be populated after payment)
      contractor: {
        id: null,
        companyName: null,
        assignedAt: null,
        acceptedAt: null,
        // Contractor handles ALL communication
        responsibilities: [
          'Initial phone contact with client WITHIN 60 MINUTES',
          'Schedule site inspection',
          'Perform make-safe works',
          'Document all damage',
          'Liaise with insurance company',
          'Coordinate re-attendances',
          'Manage additional work requests',
          'Provide claim documentation to client'
        ]
      },
      
      // Compliance
      compliance: {
        nrpStandardsAcknowledged: true,
        contractorGuidelinesVersion: '2.0',
        qualityAssuranceRequired: true,
        auditTrailEnabled: true
      }
    };
    
    // Store claim
    claims.set(claimId, claim);
    
    // Trigger contractor matching (async)
    setTimeout(() => assignContractor(claimId), 3000);
    
    return NextResponse.json({
      success: true,
      claimId: claimId,
      message: 'Claim submitted successfully. Payment of $2,750 processed.',
      nextSteps: [
        'Your claim is being matched with a certified NRP contractor',
        'The contractor will contact you directly within 60 MINUTES',
        'The contractor will schedule an inspection at your convenience',
        'All further communication will be directly with your assigned contractor'
      ],
      importantNotes: [
        'Disaster Recovery is a lead generation platform',
        'Your assigned contractor handles all service delivery',
        'Contractors follow strict NRP standards and guidelines',
        'Platform fee covers lead generation and contractor matching only'
      ],
      trackingUrl: `/track/${claimId}`
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing claim:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process claim',
      message: 'Please contact support'
    }, { status: 500 });
  }
}

// Get claim by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const claimId = searchParams.get('id');
  
  if (!claimId) {
    return NextResponse.json({
      success: false,
      error: 'Claim ID required'
    }, { status: 400 });
  }
  
  const claim = claims.get(claimId);
  
  if (!claim) {
    return NextResponse.json({
      success: false,
      error: 'Claim not found'
    }, { status: 404 });
  }
  
  return NextResponse.json({
    success: true,
    claim: claim
  });
}

// Contractor Assignment (Mock)
async function assignContractor(claimId: string) {
  const claim = claims.get(claimId);
  if (!claim) return;
  
  // Mock contractor assignment based on location and service type
  const contractor = {
    id: `NRP-CTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    companyName: 'Premium Restoration Services Pty Ltd',
    contactPerson: 'John Anderson',
    directPhone: '0412 345 678',
    email: 'service@premiumrestoration.com.au',
    licenseNumber: 'QBCC-123456',
    insurances: ['Public Liability $20M', 'Professional Indemnity $10M'],
    certifications: ['IICRC Certified', 'Asbestos Removal Licensed', 'Working at Heights'],
    rating: 4.8,
    completedJobs: 1247
  };
  
  // Update claim with contractor details
  claim.contractor = {
    ...contractor,
    assignedAt: new Date().toISOString(),
    acceptedAt: null,
    responsibilities: claim.contractor.responsibilities
  };
  
  claim.workflow.contractorAssigned = true;
  claim.status = 'CONTRACTOR_ASSIGNED';
  
  claims.set(claimId, claim);
  
  // Simulate contractor accepting job after 30 seconds
  setTimeout(() => contractorAccepts(claimId), 30000);
}

// Contractor Acceptance (Mock)
async function contractorAccepts(claimId: string) {
  const claim = claims.get(claimId);
  if (!claim) return;
  
  claim.contractor.acceptedAt = new Date().toISOString();
  claim.workflow.contractorAccepted = true;
  claim.status = 'CONTRACTOR_ACCEPTED';
  
  // Contractor will now:
  // 1. Call the client directly
  // 2. Schedule inspection
  // 3. Handle all further communication
  // Platform's role is complete at this point
  
  claims.set(claimId, claim);
}