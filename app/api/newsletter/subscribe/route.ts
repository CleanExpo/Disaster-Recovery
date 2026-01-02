/**
 * Newsletter Subscription API Route
 *
 * POST /api/newsletter/subscribe
 * Handles newsletter subscriptions and integrates with email service providers
 */

import { NextRequest, NextResponse } from 'next/server';
import { NewsletterSubscription } from '@/lib/resources/types';

/**
 * Email Service Provider Integration
 * Configure your preferred ESP (SendGrid, Mailchimp, ConvertKit, etc.)
 */
async function subscribeToEmailService(subscription: NewsletterSubscription): Promise<void> {
  // TODO: Replace with actual ESP integration

  // Example: SendGrid
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({
  //   to: subscription.email,
  //   from: 'newsletter@disasterrecovery.com',
  //   templateId: 'd-xxxxxxxxxxxxx',
  //   dynamicTemplateData: {
  //     firstName: subscription.firstName,
  //     confirmationUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/confirm?token=${subscription.confirmationToken}`,
  //   },
  // });

  // Example: Mailchimp
  // const mailchimp = require('@mailchimp/mailchimp_marketing');
  // mailchimp.setConfig({
  //   apiKey: process.env.MAILCHIMP_API_KEY,
  //   server: process.env.MAILCHIMP_SERVER_PREFIX,
  // });
  // await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
  //   email_address: subscription.email,
  //   status: 'pending',
  //   merge_fields: {
  //     FNAME: subscription.firstName,
  //     LNAME: subscription.lastName,
  //   },
  //   tags: subscription.interests,
  // });

  // Example: ConvertKit
  // const response = await fetch('https://api.convertkit.com/v3/forms/{form_id}/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     api_key: process.env.CONVERTKIT_API_KEY,
  //     email: subscription.email,
  //     first_name: subscription.firstName,
  //     tags: subscription.interests,
  //   }),
  // });

  console.log('Newsletter subscription created:', subscription);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate email
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create subscription object
    const subscription: NewsletterSubscription = {
      email: body.email.toLowerCase().trim(),
      firstName: body.firstName?.trim(),
      lastName: body.lastName?.trim(),
      interests: body.interests || [],
      source: body.source || 'resources',
      subscribedAt: new Date(),
      confirmed: false,
      confirmationToken: generateConfirmationToken(),
    };

    // TODO: Store subscription in database
    // await prisma.newsletterSubscription.create({
    //   data: subscription,
    // });

    // Subscribe to email service provider
    await subscribeToEmailService(subscription);

    // TODO: Send confirmation email
    // await sendConfirmationEmail(subscription);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed! Please check your email to confirm.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to subscribe.' },
    { status: 405 }
  );
}

/**
 * Generate secure confirmation token
 */
function generateConfirmationToken(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
}
