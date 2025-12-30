# Payment Integration (Stripe)

**Skill ID**: payment-integration
**Version**: 1.0.0

## Create Payment Intent

```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createPaymentIntent(amount: number, currency: string = 'aud') {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency,
    metadata: { bookingId: 'booking_123' }
  })

  return paymentIntent.client_secret
}
```

## Webhook Handler

```typescript
export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === 'payment_intent.succeeded') {
    await handlePaymentSuccess(event.data.object)
  }

  return NextResponse.json({ received: true })
}
```

Load when implementing payment features.
