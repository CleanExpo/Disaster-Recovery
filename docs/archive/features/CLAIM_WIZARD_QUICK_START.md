# Claim Wizard - Quick Start Guide

**For Developers:** Get the claim wizard running in 5 minutes

---

## 🚀 Quick Start

### 1. Install Dependencies (if not already done)

```bash
npm install zod react-hook-form @hookform/resolvers lucide-react
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Navigate to Claim Wizard

```
http://localhost:3000/claim/step-1
```

---

## 📁 File Structure

```
app/claim/
├── step-1/page.tsx       # Triage (disaster type, timing, emergency)
├── step-2/page.tsx       # Location & contact (address, phone, email)
├── step-3/page.tsx       # Details & insurance (description, photos)
└── success/page.tsx      # Success confirmation

lib/claim-wizard/
├── types.ts              # Zod schemas + TypeScript types
├── storage.ts            # localStorage persistence + GPS
└── README.md             # Complete documentation

app/api/public/claims/
└── submit/route.ts       # API endpoint (rate limiting + validation)

middleware.ts             # CSP headers + security (enhanced)
```

---

## 🧪 Test the Wizard

### Manual Test Flow

**Step 1 - Triage:**
1. Select disaster type: "Water Damage"
2. Choose date/time: Today, 10:00 AM
3. Is it ongoing? → "No"
4. Anyone in danger? → "No"
5. Click "Next: Location & Contact"

**Step 2 - Location & Contact:**
1. Property address: "123 Main Street"
2. Suburb: "Sydney"
3. Postcode: "2000"
4. Name: "John Smith"
5. Phone: "0412 345 678"
6. Email: "john@example.com"
7. Click "Next: Damage Details"

**Step 3 - Details & Insurance:**
1. Description: "Water damage from burst pipe in kitchen. Water has spread to living room. Floor is soaked."
2. (Optional) Upload photos
3. Has insurance? → "Yes"
4. Provider: "NRMA"
5. Policy: "POL123456" (optional)
6. Click "I'm not a robot" (mock CAPTCHA)
7. Click "Submit Claim"

**Success Page:**
- View claim ID
- See next steps
- Click "Track My Claim" or "Return to Homepage"

---

## 🔍 Quick Debug Commands

### Check localStorage

```javascript
// In browser console
localStorage.getItem('nrpg-claim-wizard-state')
```

### Clear localStorage

```javascript
// In browser console
localStorage.removeItem('nrpg-claim-wizard-state')
```

### Test GPS (requires HTTPS in production)

```javascript
// In browser console
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.error(err)
)
```

### Test Rate Limiting

```bash
# Submit 6 claims in a row (should block 6th)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/public/claims/submit \
    -H "Content-Type: application/json" \
    -d '{"step1":{...},"step2":{...},"step3":{...},"captchaToken":"test"}'
done
```

---

## 🛠️ Common Development Tasks

### Add a New Field to Step 2

1. **Update Zod schema** (`lib/claim-wizard/types.ts`):
```typescript
export const locationContactSchema = z.object({
  // ... existing fields
  newField: z.string().min(1, 'Required'),
});
```

2. **Add form field** (`app/claim/step-2/page.tsx`):
```typescript
<FormInput
  label="New Field"
  error={errors.newField?.message}
  {...register('newField')}
/>
```

3. **Update default values**:
```typescript
defaultValues: {
  // ... existing
  newField: '',
}
```

### Change Validation Rules

**File:** `lib/claim-wizard/types.ts`

```typescript
// Example: Make policy number required
policyNumber: z.string().min(1, 'Policy number is required')

// Example: Allow longer descriptions
damageDescription: z.string().min(20).max(2000)

// Example: Different phone format
phone: z.string().regex(/^your-pattern$/, 'Your message')
```

### Customize Success Message

**File:** `app/claim/success/page.tsx`

```typescript
<SuccessState
  title="Your Custom Title"
  message="Your custom message..."
  nextSteps={[
    { number: 1, text: 'Your first step' },
    // ...
  ]}
/>
```

---

## 🔒 Security Testing

### Test CSP Headers

```bash
curl -I http://localhost:3000/claim/step-1
# Look for: Content-Security-Policy header
```

### Test Rate Limiting

```bash
# Should succeed (first request)
curl -X POST http://localhost:3000/api/public/claims/submit \
  -H "Content-Type: application/json" \
  -d @test-claim.json

# After 5 requests, should return 429 (Too Many Requests)
```

### Test Input Validation

```bash
# Should fail with 400 (invalid phone)
curl -X POST http://localhost:3000/api/public/claims/submit \
  -H "Content-Type: application/json" \
  -d '{"step2":{"phone":"invalid"},...}'
```

---

## 📊 View API Response

### Success Response

```json
{
  "success": true,
  "claimId": "CLM-1234567890-ABCDEF",
  "message": "Claim submitted successfully",
  "estimatedContractorCalls": 3,
  "estimatedResponseTime": "30 minutes",
  "priority": "urgent"
}
```

### Rate Limited Response

```json
{
  "success": false,
  "error": "Too many claim submissions. Please try again later.",
  "retryAfter": 3600
}
```

### Validation Error Response

```json
{
  "success": false,
  "error": "Invalid claim data",
  "details": [
    {
      "path": ["step2", "phone"],
      "message": "Please enter a valid Australian phone number"
    }
  ]
}
```

---

## 🎨 Customization Points

### Change Colors

**Emergency Red:**
- Defined in DesignOS tokens
- Used for: Emergency buttons, alerts, progress bar
- File: Check DesignOS theme configuration

### Change Progress Bar

**File:** All step pages

```typescript
// Currently: 33%, 66%, 100%
<div style={{ width: '33%' }} />  // Step 1
<div style={{ width: '66%' }} />  // Step 2
<div style={{ width: '100%' }} /> // Step 3
```

### Change Rate Limiting

**File:** `app/api/public/claims/submit/route.ts`

```typescript
const RATE_LIMIT_MAX_REQUESTS = 5;     // Change to 10
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // Change to 30 min
```

### Change localStorage Expiry

**File:** `lib/claim-wizard/storage.ts`

```typescript
const EXPIRY_DAYS = 7; // Change to 14 days
```

---

## 🐛 Troubleshooting

### Issue: Form doesn't submit

**Check:**
1. Browser console for errors
2. Network tab for API call
3. Validation errors in form
4. CAPTCHA verified (mock should auto-pass)

**Fix:**
```javascript
// Check form state in console
console.log('Form errors:', errors)
console.log('Form values:', watch())
```

### Issue: localStorage not persisting

**Check:**
1. Browser privacy settings
2. Incognito mode (localStorage disabled)
3. Storage quota not exceeded

**Fix:**
```javascript
// Check storage in console
console.log('Saved state:', localStorage.getItem('nrpg-claim-wizard-state'))
```

### Issue: GPS not working

**Check:**
1. HTTPS required (localhost is OK for dev)
2. Browser permissions granted
3. Device has GPS capability

**Fix:**
```javascript
// Test geolocation API
navigator.geolocation.getCurrentPosition(
  (pos) => alert('GPS works!'),
  (err) => alert('GPS failed: ' + err.message)
)
```

### Issue: Rate limiting too strict in development

**Fix:**
```typescript
// In route.ts, increase limit temporarily
const RATE_LIMIT_MAX_REQUESTS = 100; // Dev only
```

---

## 📝 Quick Code Snippets

### Add Custom Validation

```typescript
// In types.ts
export const customSchema = z.object({
  field: z.string().refine(
    (val) => val.includes('custom'),
    { message: 'Must include "custom"' }
  ),
});
```

### Add Loading State

```typescript
// In any page
const [isLoading, setIsLoading] = useState(false);

<Button loading={isLoading}>
  Submit
</Button>
```

### Add Error Alert

```typescript
import { Alert, AlertDescription } from '@/components/ui/alert';

<Alert className="border-red-600 bg-red-50">
  <AlertDescription>
    Your error message here
  </AlertDescription>
</Alert>
```

---

## 🚢 Production Integration Checklist

### Before Going Live

- [ ] Replace mock CAPTCHA with hCaptcha
- [ ] Replace mock photo upload with Cloudinary
- [ ] Save claims to PostgreSQL (Prisma)
- [ ] Integrate NRPG contractor dispatch
- [ ] Set up SendGrid email notifications
- [ ] Replace in-memory rate limiting with Redis
- [ ] Add Google Places reverse geocoding
- [ ] Configure GA4 event tracking
- [ ] Add Sentry error tracking
- [ ] Update environment variables
- [ ] Test on staging environment
- [ ] Load test rate limiting
- [ ] Verify CSP headers in production
- [ ] Test mobile responsiveness
- [ ] Run accessibility audit
- [ ] Security scan (OWASP)

---

## 📚 Additional Resources

- **Full Documentation:** `lib/claim-wizard/README.md`
- **Implementation Summary:** `CLAIM_WIZARD_IMPLEMENTATION.md`
- **Specification:** `NATIONAL_SITE_SPEC.md` (lines 570-666)
- **DesignOS Components:** `src/design-system/components/`

---

## 🆘 Need Help?

**Common Questions:**

**Q: How do I add a new step?**
A: Create `/app/claim/step-4/page.tsx`, update types.ts with step4Schema, modify step-3 to navigate to step-4 instead of submit.

**Q: How do I change the success message?**
A: Edit `/app/claim/success/page.tsx`, modify the SuccessState props.

**Q: How do I test the API endpoint?**
A: Use curl or Postman to POST to `/api/public/claims/submit` with valid data.

**Q: Where are the DesignOS components?**
A: `/src/design-system/components/` (FormInput, FormSelect, FormTextarea, Button, SuccessState)

**Q: How do I customize validation messages?**
A: Edit Zod schemas in `lib/claim-wizard/types.ts`, change the error messages.

---

**Happy Coding! 🎉**

Built with DesignOS and Next.js 14
