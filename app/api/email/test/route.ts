import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailConfig, sendEmail } from '@/lib/email';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required' }, { status: 401 });
    }
    
    // Verify email configuration
    const configValid = await verifyEmailConfig();
    
    if (!configValid) {
      return NextResponse.json({
        success: false,
        message: 'Email configuration is not valid. Please check SMTP settings.' }, { status: 500 });
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
    
    const result = await sendEmail(recipientEmail, testEmail);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email',
        error: result.error }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Email test error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'An error occurred during email test',
      error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Admin authentication required' }, { status: 401 });
    }
    
    // Check email configuration status
    const configValid = await verifyEmailConfig();
    
    return NextResponse.json({
      success: true,
      configured: configValid,
      settings: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || '587',
        secure: process.env.SMTP_SECURE === 'true',
        from: process.env.EMAIL_FROM || 'noreply@disasterrecovery.com.au',
        userConfigured: !!process.env.SMTP_USER } }, { status: 200 });
    
  } catch (error) {
    console.error('Email config check error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to check email configuration' }, { status: 500 });
  }
}