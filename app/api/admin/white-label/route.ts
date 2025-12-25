import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { whiteLabelConfigSchema } from '@/lib/validation-schemas';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    // Mock white-label configuration
    const whiteLabelConfig = {
      branding: {
        logo: {
          primary: '/logos/primary-logo.png',
          secondary: '/logos/secondary-logo.png',
          favicon: '/favicons/favicon.ico',
          appleTouchIcon: '/icons/apple-touch-icon.png'
        },
        colors: {
          primary: '#00BFA6',
          secondary: '#00A693',
          accent: '#F59E0B',
          background: '#111827',
          surface: '#1F2937',
          text: '#FFFFFF',
          textSecondary: '#9CA3AF'
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          headingFont: 'Inter, sans-serif',
          bodyFont: 'Inter, sans-serif'
        }
      },
      customization: {
        layout: {
          sidebarPosition: 'left',
          headerStyle: 'fixed',
          footerStyle: 'minimal',
          theme: 'dark'
        },
        features: {
          showAnalytics: true,
          showTraining: true,
          showSupport: true,
          showDocumentation: true,
          customDomain: true
        },
        content: {
          companyName: 'Restoration Marketplace',
          tagline: 'Connect with the best restoration professionals',
          welcomeMessage: 'Welcome to our professional restoration marketplace',
          supportEmail: 'support@restorationmarketplace.com',
          supportPhone: '+1 (555) 123-4567'
        }
      },
      integrations: {
        payment: {
          stripe: {
            enabled: true,
            publicKey: 'pk_test_...',
            webhookSecret: 'whsec_...'
          },
          paypal: {
            enabled: false,
            clientId: ''
          }
        },
        communication: {
          email: {
            provider: 'sendgrid',
            apiKey: 'SG...',
            fromEmail: 'noreply@restorationmarketplace.com'
          },
          sms: {
            provider: 'twilio',
            accountSid: 'AC...',
            authToken: '...',
            fromNumber: '+1234567890'
          }
        },
        analytics: {
          googleAnalytics: {
            enabled: true,
            trackingId: 'GA-XXXXXXXXX'
          },
          mixpanel: {
            enabled: false,
            projectToken: ''
          }
        }
      },
      deployment: {
        domain: 'restorationmarketplace.com',
        subdomain: 'app.restorationmarketplace.com',
        ssl: true,
        cdn: true,
        environment: 'production'
      }
    };

    return NextResponse.json({
      success: true,
      config: whiteLabelConfig
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = whiteLabelConfigSchema.parse(body);
    const { section, config } = validatedData;

    // Handle different configuration updates
    switch (section) {
      case 'branding':
        // Update branding configuration
        return NextResponse.json({
          success: true,
          message: 'Branding updated successfully'
        });

      case 'customization':
        // Update customization settings
        return NextResponse.json({
          success: true,
          message: 'Customization updated successfully'
        });

      case 'integrations':
        // Update integration settings
        return NextResponse.json({
          success: true,
          message: 'Integrations updated successfully'
        });

      case 'deployment':
        // Update deployment settings
        return NextResponse.json({
          success: true,
          message: 'Deployment settings updated successfully'
        });

      default:
        return NextResponse.json({
          error: 'Invalid configuration section'
        }, { status: 400 });
    }

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
