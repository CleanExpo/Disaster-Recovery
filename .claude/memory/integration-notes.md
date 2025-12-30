# Third-Party Integration Notes

**Purpose**: Record learnings, gotchas, and best practices for third-party integrations.

---

## Stripe (Payment Processing)

### Setup

```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})
```

### Key Learnings

**1. Webhook Signature Verification**
- MUST read body as text, not JSON
- Verify signature BEFORE parsing
- Use raw body buffer

```typescript
const body = await request.text()  // NOT request.json()
const sig = request.headers.get('stripe-signature')!
const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
```

**2. Amount in Cents**
- Stripe expects amounts in cents (not dollars)
- $100.00 = 10000 cents

```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000,  // $100.00
  currency: 'aud'
})
```

**3. Test Mode Webhooks**
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Webhook secret different for test vs production

### Common Issues

**Issue**: Webhook events delayed
**Solution**: Use idempotency keys to handle duplicate events

```typescript
const paymentIntent = await stripe.paymentIntents.create(
  { amount: 10000, currency: 'aud' },
  { idempotencyKey: `booking_${bookingId}` }
)
```

---

## Twilio (SMS & Calling)

### Setup

```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
```

### Key Learnings

**1. Australian Phone Numbers**
- Format: +61 4XX XXX XXX (remove leading 0)
- Validation: Must start with +61 for international

```typescript
function formatAustralianPhone(phone: string): string {
  // "0412 345 678" → "+61412345678"
  return '+61' + phone.replace(/^0|\s/g, '')
}
```

**2. SMS Character Limits**
- 160 characters for standard SMS
- 70 characters for Unicode (emojis)
- Longer messages split into multiple SMS (billed per segment)

**3. Rate Limits**
- 1 SMS per second per phone number
- Use queue for bulk sending

### Common Issues

**Issue**: SMS delivery failures
**Solution**: Check phone number format, verify Twilio balance

---

## OpenAI (AI/ML)

### Setup

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
```

### Key Learnings

**1. Token Limits**
- GPT-4: 8K tokens (input + output)
- GPT-4 Turbo: 128K tokens
- 1 token ≈ 4 characters

**2. Cost Management**
- GPT-4: $0.03/1K input tokens, $0.06/1K output tokens
- Use GPT-3.5 for simple tasks (10x cheaper)
- Set max_tokens to limit costs

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: prompt }],
  max_tokens: 1000,  // Limit output
  temperature: 0.7
})
```

**3. Rate Limits**
- Tier 1: 3 requests/minute, 200 requests/day
- Handle rate limit errors with exponential backoff

### Common Issues

**Issue**: "Rate limit exceeded"
**Solution**: Implement retry with backoff, upgrade tier

```typescript
async function callOpenAI(prompt: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await openai.chat.completions.create({ /* ... */ })
    } catch (error) {
      if (error.status === 429 && i < retries - 1) {
        await sleep(Math.pow(2, i) * 1000) // Exponential backoff
      } else {
        throw error
      }
    }
  }
}
```

---

## Google Gemini (AI/ML)

### Setup

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)
```

### Key Learnings

**1. Image Generation**
- gemini-pro-vision supports image analysis
- gemini-pro for text only
- Images must be base64 encoded

**2. Faster Than OpenAI**
- Response time: 1-2 seconds (vs 3-5 for GPT-4)
- Cost: ~50% cheaper than GPT-4

**3. Safety Settings**
- Default settings block some prompts
- Can adjust threshold for production use

### Common Issues

**Issue**: "Content blocked by safety filters"
**Solution**: Adjust safety settings or rephrase prompt

---

## NextAuth (Authentication)

### Setup

```typescript
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await verifyCredentials(credentials)
        return user
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  }
}
```

### Key Learnings

**1. NEXTAUTH_SECRET Required**
- Must be set in production
- Generate: `openssl rand -base64 32`

**2. JWT vs Database Sessions**
- JWT: Faster, no database queries
- Database: More secure, easier to revoke

**3. Custom Pages**
- Override default sign-in page
- Custom error handling

### Common Issues

**Issue**: Session not persisting
**Solution**: Ensure NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly

---

## SEMRUSH & DataForSEO (Competitor Analysis)

### Setup

```typescript
const semrushApiKey = process.env.SEMRUSH_API_KEY
const response = await fetch(
  `https://api.semrush.com/?type=domain_organic&key=${semrushApiKey}&domain=competitor.com`
)
```

### Key Learnings

**1. Rate Limits**
- SEMRUSH: 10 requests/second
- DataForSEO: 2000 requests/day

**2. Caching Essential**
- Cache competitor data for 24 hours
- Reduces API costs significantly

**3. Cost Management**
- Each request costs credits
- Monitor usage daily

### Common Issues

**Issue**: API quota exceeded
**Solution**: Implement caching, batch requests

---

## Redis (Caching)

### Setup

```typescript
import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL
})

await redis.connect()
```

### Key Learnings

**1. Connection Pooling**
- Reuse single client instance
- Don't create new client per request

**2. Serialization**
- Redis stores strings only
- Use JSON.stringify/JSON.parse for objects

```typescript
await redis.set('user:123', JSON.stringify(user))
const user = JSON.parse(await redis.get('user:123'))
```

**3. TTL Best Practices**
- Set TTL for all keys to avoid memory bloat
- Common TTLs: 60s (hot data), 300s (warm), 3600s (cold)

### Common Issues

**Issue**: Connection timeout
**Solution**: Increase timeout, check network/firewall

---

## Claude Agent SDK

### Setup

```typescript
import { Agent } from '@anthropic-ai/claude-agent-sdk'

const agent = new Agent({
  name: 'data-intake-agent',
  prompt: 'Validate inspection data',
  tools: ['Read', 'Grep'],
  skills: ['australian-business-validator']
})
```

### Key Learnings

**1. Subagent Pattern**
- Break complex tasks into subagents
- Each subagent focused on one responsibility

**2. Hook System**
- PreToolUse: Validation before execution
- PostToolUse: Audit logging after execution

**3. Session Management**
- Preserve context across turns
- Store session state in database/Redis

### Common Issues

**Issue**: Agent exceeds token limit
**Solution**: Use skills for progressive disclosure, limit context size

---

**Last Updated**: 2025-12-30
**Agents**: Read this file to avoid integration pitfalls and apply best practices.
