import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getMockStripe } from '@/lib/services/mock/mockStripe';
import { isProductionMode } from '@/lib/services/mock';
import { prisma } from '@/lib/prisma';

// Initialize Stripe with your secret key or use mock in demo mode
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20' as const })
  : getMockStripe() as any;

interface BookingData {
  // Service details
  serviceType: string;
  urgencyLevel: string;
  damageDescription: string;
  
  // Property details
  propertyType: string;
  propertySize: string;
  affectedAreas: string[];
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  
  // Contact details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  
  // Insurance details
  hasInsurance: boolean;
  insuranceCompany?: string;
  claimNumber?: string;
  
  // Payment details
  paymentMethod: 'card';
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();
    
    // Validate required fields
    if (!bookingData.email || !bookingData.firstName || !bookingData.lastName) {
      return NextResponse.json(
        { success: false, message: 'Missing required customer information' },
        { status: 400 }
      );
    }

    // Calculate amounts (in cents for Stripe)
    const totalAmount = 275000; // $2,750.00 in cents
    const serviceFee = 55000;   // $550.00 in cents
    const contractorAmount = 220000; // $2,200.00 in cents

    // Generate a unique booking ID
    const bookingId = `NRP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create or retrieve Stripe customer
    let customer;
    try {
      const customers = await stripe.customers.list({
        email: bookingData.email,
        limit: 1 });

      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: bookingData.email,
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          phone: bookingData.phone,
          address: bookingData.billingAddress,
          metadata: {
            bookingId,
            propertyAddress: `${bookingData.address}, ${bookingData.suburb}, ${bookingData.state} ${bookingData.postcode}` } });
      }
    } catch (error) {
      console.error('Error creating/retrieving customer:', error);
      throw error;
    }

    {
      // Create a Payment Intent for card payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'aud',
        customer: customer.id,
        description: `Disaster Recovery Service - ${bookingData.serviceType}`,
        metadata: {
          bookingId,
          serviceType: bookingData.serviceType,
          urgencyLevel: bookingData.urgencyLevel,
          propertyType: bookingData.propertyType,
          suburb: bookingData.suburb,
          state: bookingData.state,
          postcode: bookingData.postcode,
          serviceFee: serviceFee.toString(),
          contractorAmount: contractorAmount.toString(),
          hasInsurance: bookingData.hasInsurance.toString(),
          insuranceCompany: bookingData.insuranceCompany || '',
          claimNumber: bookingData.claimNumber || '' },
        automatic_payment_methods: {
          enabled: true },
        // Set up for future contractor payout
        transfer_group: bookingId });

      // Persist payment record to database
      await prisma.payment.create({
        data: {
          bookingId,
          amount: totalAmount / 100,
          currency: 'AUD',
          status: 'PENDING',
          stripePaymentId: paymentIntent.id,
          stripeCustomerId: customer.id,
          method: 'card',
          description: `Disaster Recovery Service - ${bookingData.serviceType}`,
          metadata: JSON.stringify({
            serviceType: bookingData.serviceType,
            urgencyLevel: bookingData.urgencyLevel,
            propertyType: bookingData.propertyType,
            suburb: bookingData.suburb,
            state: bookingData.state,
            serviceFee: serviceFee / 100,
            contractorAmount: contractorAmount / 100,
          }),
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          bookingId,
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: totalAmount,
          serviceFee,
          contractorAmount } });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Payment error: ${error.message}`,
          code: error.code },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred processing your payment. Please try again.' },
      { status: 500 }
    );
  }
}

// Webhook endpoint to handle Stripe events
export async function PUT(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json(
      { success: false, message: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { success: false, message: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Extract booking details from metadata
      const bookingId = paymentIntent.metadata.bookingId;
      const contractorAmount = parseInt(paymentIntent.metadata.contractorAmount);
      
      // In production:
      // 1. Update booking status in database
      // 2. Trigger job distribution to contractors
      // 3. Send confirmation emails
      // 4. Create contractor payout record (to be released after KPIs met)
      
      console.log(`Payment successful for booking ${bookingId}`);
      
      // You would typically update your database here
      // await updateBookingStatus(bookingId, 'paid');
      // await createContractorJob(bookingId, contractorAmount);
      // await notifyContractors(bookingId);
      
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error(`Payment failed for booking ${failedPayment.metadata.bookingId}`);
      
      // Handle failed payment
      // await updateBookingStatus(failedPayment.metadata.bookingId, 'payment_failed');
      
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Bank transfer received for booking ${invoice.metadata.bookingId}`);
      
      // Handle successful bank transfer
      // Similar actions to payment_intent.succeeded
      
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ success: true, received: true });
}