import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { requestLogger, captureException } from '@/lib/observability';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/email/test' });
  try {
    // Verify authentication and admin role
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required' }, { status: 401 });
    }
    
    // Parse request body
    const body = await request.json();
    const { recipientEmail } = body;
    
    if (!recipientEmail) {
      return NextResponse.json({
        success: false,
        message: 'Recipient email is required' }, { status: 400 });
    }
    
    // Send test email
    const testEmail = {
      subject: 'Test Email - Disaster Recovery',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0052CC; padding: 30px; text-align: centre;">
            <h1 style="colour: white; margin: 0;">Email Configuration Test</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 16px;">This is a test email from the Disaster Recovery system.</p>
            
            <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="margin-top: 0; colour: #155724;">✅ Email Configuration Working</h3>
              <p style="colour: #155724;">
                Your email configuration is properly set up and working correctly.
              </p>
            </div>
            
            <h3>Configuration Details</h3>
            <ul>
              <li>SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}</li>
              <li>SMTP Port: ${process.env.SMTP_PORT || '587'}</li>
              <li>From Address: ${process.env.EMAIL_FROM || 'noreply@disasterrecovery.com.au'}</li>
              <li>Timestamp: ${new Date().toLocaleString('en-AU')}</li>
            </ul>
            
            <p style="colour: #666; font-size: 14px; margin-top: 30px;">
              This test was initiated by an administrator to verify the email system functionality.
            </p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; text-align: centre; colour: #666; font-size: 12px;">
            <p>Disaster Recovery - Email System Test</p>
          </div>
        </div>
      ` };
    
    const sent = await sendEmail(recipientEmail, testEmail);

    if (sent) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully' }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email — check RESEND_API_KEY in environment' }, { status: 500 });
    }
    
  } catch (error) {
    log.error('email test error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/email/test' }, extra: { requestId: log.requestId } });

    return NextResponse.json({
      success: false,
      message: 'An error occurred during email test',
      error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/email/test' });
  try {
    // Verify authentication and admin role
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required' }, { status: 401 });
    }
    
    const configured = !!process.env.RESEND_API_KEY;
    return NextResponse.json({
      success: true,
      configured,
      settings: {
        provider: 'Resend',
        from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
        fromName: process.env.RESEND_FROM_NAME ?? 'Disaster Recovery',
        keyConfigured: configured,
      },
    }, { status: 200 });
    
  } catch (error) {
    log.error('email config check error', { error: error instanceof Error ? error.message : String(error) });

    return NextResponse.json({
      success: false,
      message: 'Failed to check email configuration' }, { status: 500 });
  }
}