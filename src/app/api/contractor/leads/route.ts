import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { calculateLeadScore, getLeadPriority } from '@/lib/lead-scoring';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required' }, { status: 401 });
    }
    
    // Mock lead data (in production, fetch from database)
    const leads = [
      {
        id: 'LEAD-2024-501',
        customer: {
          name: 'Alice Thompson',
          
          email: 'alice.t@email.com',
          location: 'Fortitude Valley, QLD' },
        service: 'Water Damage',
        urgency: 'emergency',
        propertyType: 'commercial',
        description: 'Major water leak in office building, affecting multiple floors',
        hasInsurance: true,
        estimatedValue: 15000,
        leadScore: 92,
        priority: 'critical',
        createdAt: '2024-01-29T08:30:00Z',
        expiresAt: '2024-01-29T09:00:00Z',
        status: 'new',
        distance: '2.5km',
        competingBids: 0 },
      {
        id: 'LEAD-2024-502',
        customer: {
          name: 'Robert Brown',
          
          email: 'rbrown@email.com',
          location: 'Paddington, QLD' },
        service: 'Mould Remediation',
        urgency: 'urgent',
        propertyType: 'residential',
        description: 'Black mould in bathroom and bedroom, family with young children',
        hasInsurance: false,
        estimatedValue: 3500,
        leadScore: 78,
        priority: 'high',
        createdAt: '2024-01-29T07:00:00Z',
        expiresAt: '2024-01-29T11:00:00Z',
        status: 'new',
        distance: '5.2km',
        competingBids: 2 },
      {
        id: 'LEAD-2024-503',
        customer: {
          name: 'Jennifer Lee',
          
          email: 'jlee@email.com',
          location: 'South Brisbane, QLD' },
        service: 'Carpet Drying',
        urgency: 'routine',
        propertyType: 'residential',
        description: 'Carpet cleaning gone wrong, needs professional drying',
        hasInsurance: false,
        estimatedValue: 800,
        leadScore: 45,
        priority: 'medium',
        createdAt: '2024-01-28T16:00:00Z',
        expiresAt: '2024-01-29T16:00:00Z',
        status: 'viewed',
        distance: '3.8km',
        competingBids: 5 },
    ];
    
    // Calculate time remaining for each lead
    const leadsWithTimeRemaining = leads.map(lead => {
      const expiresAt = new Date(lead.expiresAt);
      const now = new Date();
      const timeRemaining = Math.max(0, expiresAt.getTime() - now.getTime());
      const minutesRemaining = Math.floor(timeRemaining / 60000);
      
      return {
        ...lead,
        timeRemaining: {
          minutes: minutesRemaining,
          display: minutesRemaining > 60 
            ? `${Math.floor(minutesRemaining / 60)}h ${minutesRemaining % 60}m`
            : `${minutesRemaining}m`,
          urgent: minutesRemaining < 30 } };
    });
    
    // Summary statistics
    const summary = {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'new').length,
      expiringWithin1Hour: leads.filter(l => {
        const minutesRemaining = Math.floor(
          (new Date(l.expiresAt).getTime() - new Date().getTime()) / 60000
        );
        return minutesRemaining > 0 && minutesRemaining <= 60;
      }).length,
      totalPotentialValue: leads.reduce((sum, l) => sum + l.estimatedValue, 0),
      averageLeadScore: Math.round(
        leads.reduce((sum, l) => sum + l.leadScore, 0) / leads.length
      ) };
    
    return NextResponse.json({
      success: true,
      data: {
        leads: leadsWithTimeRemaining,
        summary } }, { status: 200 });
    
  } catch (error) {
    console.error('Leads API error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch leads' }, { status: 500 });
  }
}

// Accept or decline a lead
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required' }, { status: 401 });
    }
    
    const body = await request.json();
    const { leadId, action, message } = body;
    
    // Validate action
    if (!['accept', 'decline', 'request-info'].includes(action)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid action' }, { status: 400 });
    }
    
    // Process lead action (in production, update database and charge credits)
    let responseMessage = '';
    let leadCost = 0;
    
    switch (action) {
      case 'accept':
        // In production:
        // 1. Check contractor has sufficient credits
        // 2. Charge lead fee
        // 3. Send customer details
        // 4. Create job record
        // 5. Send notifications
        
        leadCost = 50; // Example lead cost
        responseMessage = `Lead ${leadId} accepted. $${leadCost} charged to your account.`;
        
        // Send confirmation email to contractor with full customer details
        // Send notification to customer that contractor will contact them
        
        break;
        
      case 'decline':
        responseMessage = `Lead ${leadId} declined. It will be offered to other contractors.`;
        // Release lead back to pool for other contractors
        break;
        
      case 'request-info':
        responseMessage = `Additional information requested for lead ${leadId}`;
        // Send request to customer for more details
        break;
    }
    
    return NextResponse.json({
      success: true,
      message: responseMessage,
      lead: {
        id: leadId,
        status: action === 'accept' ? 'accepted' : action === 'decline' ? 'declined' : 'pending',
        cost: leadCost,
        actionedAt: new Date().toISOString() } }, { status: 200 });
    
  } catch (error) {
    console.error('Lead action error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to process lead action' }, { status: 500 });
  }
}