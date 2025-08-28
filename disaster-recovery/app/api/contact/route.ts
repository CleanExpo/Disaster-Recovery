import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { name, email, phone, service, message } = data;
    
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Trigger SMS alert
    // 4. Create ticket in CRM
    
    // For now, we'll simulate a successful submission
    console.log('Emergency contact request received:', {
      name,
      email,
      phone,
      service,
      message,
      timestamp: new Date().toISOString(),
      priority: service === 'water' || service === 'fire' ? 'HIGH' : 'MEDIUM'
    });

    // Simulate sending notification
    const notification = {
      to: 'emergency-team@disasterrecovery.com.au',
      subject: `URGENT: ${service} damage - ${name}`,
      body: `New emergency request from ${name} (${phone}).\nService: ${service}\nMessage: ${message}`,
    };

    return NextResponse.json({
      success: true,
      message: 'Emergency request received. Our team will contact you within 60 minutes.',
      ticketId: `DR-${Date.now()}`,
      estimatedResponse: '60 minutes'
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}