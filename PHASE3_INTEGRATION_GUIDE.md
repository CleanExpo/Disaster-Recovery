# PHASE 3: COMPONENT INTEGRATION GUIDE

**Date**: December 18, 2025
**Status**: Quick Reference for Integrating Phase 3 Components

---

## QUICK INTEGRATION SUMMARY

The 5 new Phase 3 components can be integrated into existing dashboard pages with minimal changes. This guide shows where and how to use each component.

---

## 1. BOOKING FORM INTEGRATION

### Where to Use
- Create a new route: `/app/bookings/create/page.tsx`
- Or add to existing booking page

### Implementation
```tsx
'use client';

import DisasterRecoveryBookingForm from '@/components/booking/disaster-recovery-booking-form';
import { useRouter } from 'next/navigation';

export default function CreateBookingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <DisasterRecoveryBookingForm
        onSubmit={(data) => {
          // Redirect to booking tracking
          router.push('/dashboard/client/bookings');
        }}
        showEstimate={true}
      />
    </div>
  );
}
```

### Button to Access
Add to Client Dashboard:
```tsx
<Button
  onClick={() => router.push('/bookings/create')}
  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
>
  <Plus className="h-5 w-5 mr-2" />
  New Disaster Recovery Booking
</Button>
```

---

## 2. BOOKING TRACKING INTEGRATION

### Where to Use
- Create: `/app/dashboard/client/bookings/page.tsx`
- Or add to existing client dashboard

### Implementation
```tsx
'use client';

import BookingTrackingDashboard from '@/components/booking/booking-tracking-dashboard';

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <BookingTrackingDashboard />
    </div>
  );
}
```

### Integration with Existing Dashboard
```tsx
// In app/dashboard/client/page.tsx
import BookingTrackingDashboard from '@/components/booking/booking-tracking-dashboard';

// Add tab
const [activeTab, setActiveTab] = useState('overview');

// In content rendering
{activeTab === 'bookings' && (
  <BookingTrackingDashboard />
)}

// Add button to sidebar
<Button
  variant="ghost"
  onClick={() => setActiveTab('bookings')}
  className="w-full justify-start"
>
  <CheckCircle className="h-5 w-5 mr-3" />
  My Bookings
</Button>
```

---

## 3. CLAIM SUBMISSION INTEGRATION

### Where to Use
- Create: `/app/dashboard/client/claims/new/page.tsx`
- Add as modal in booking detail page

### Implementation
```tsx
'use client';

import ClaimSubmissionForm from '@/components/insurance/claim-submission-form';

export default function SubmitClaimPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <ClaimSubmissionForm
        onSubmit={(claimId, claimNumber) => {
          // Show confirmation or redirect
          alert(`Claim ${claimNumber} submitted successfully!`);
        }}
      />
    </div>
  );
}
```

### As Modal in Booking Detail
```tsx
// In booking detail modal
import ClaimSubmissionForm from '@/components/insurance/claim-submission-form';

{showClaimModal && (
  <Dialog open={showClaimModal} onOpenChange={setShowClaimModal}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submit Insurance Claim</DialogTitle>
      </DialogHeader>
      <ClaimSubmissionForm
        bookingId={selectedBooking.id}
        onSubmit={(claimId, claimNumber) => {
          toast.success(`Claim ${claimNumber} submitted`);
          setShowClaimModal(false);
        }}
      />
    </DialogContent>
  </Dialog>
)}
```

---

## 4. CONTRACTOR SEARCH INTEGRATION

### Where to Use
- Create: `/app/contractors/search/page.tsx` (public)
- Add to client booking flow

### Implementation
```tsx
'use client';

import ContractorSearchInterface from '@/components/contractor/contractor-search-interface';
import { useRouter } from 'next/navigation';

export default function FindContractorsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <ContractorSearchInterface
        onSelectContractor={(contractor) => {
          // Could save selection and redirect to booking
          console.log('Selected contractor:', contractor);
          router.push('/bookings/create?contractor=' + contractor.id);
        }}
      />
    </div>
  );
}
```

### As Step in Booking Wizard
```tsx
// Multi-step booking flow
const [step, setStep] = useState('search'); // search → details → confirm → success

{step === 'search' && (
  <ContractorSearchInterface
    initialPostcode={formData.postcode}
    initialServiceType={formData.serviceType}
    onSelectContractor={(contractor) => {
      setSelectedContractor(contractor);
      setStep('details');
    }}
  />
)}
```

---

## 5. ADMIN VERIFICATION INTEGRATION

### Where to Use
- Create: `/app/dashboard/admin/contractors/verification/page.tsx`

### Implementation
```tsx
'use client';

import ContractorVerificationDashboard from '@/components/admin/contractor-verification-dashboard';

export default function ContractorVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <ContractorVerificationDashboard />
    </div>
  );
}
```

### Add to Admin Sidebar
```tsx
// In admin dashboard
<Button
  variant="ghost"
  onClick={() => setActiveTab('contractor-verification')}
  className="w-full justify-start"
>
  <Shield className="h-5 w-5 mr-3" />
  Verify Contractors
  <Badge className="ml-auto">{pendingCount}</Badge>
</Button>

{activeTab === 'contractor-verification' && (
  <ContractorVerificationDashboard />
)}
```

---

## COMPONENT LOCATION GUIDE

### Client Pages
```
/app/dashboard/client/
├── page.tsx                          # Overview
├── bookings/
│   ├── page.tsx                      # BookingTrackingDashboard
│   ├── create/page.tsx              # DisasterRecoveryBookingForm
│   └── [id]/page.tsx                # Booking detail + ClaimSubmissionForm
├── claims/
│   ├── page.tsx                      # Claims list
│   └── [id]/page.tsx                # Claim detail
└── contractors/
    └── search/page.tsx              # ContractorSearchInterface
```

### Public Pages
```
/app/
├── contractors/
│   └── search/page.tsx              # Public contractor search
└── bookings/
    └── create/page.tsx              # Public booking form
```

### Admin Pages
```
/app/dashboard/admin/
├── page.tsx                          # Admin overview
├── contractors/
│   ├── page.tsx                      # Contractor list
│   ├── verification/
│   │   └── page.tsx                 # ContractorVerificationDashboard
│   └── [id]/page.tsx                # Contractor details
└── claims/
    └── page.tsx                      # Claims list
```

---

## ROUTING EXAMPLES

### Client Booking Flow
```
1. /bookings/create                          # DisasterRecoveryBookingForm
   ↓
2. /dashboard/client/bookings               # BookingTrackingDashboard
   ↓
3. /dashboard/client/bookings/[id]          # Booking detail + claim option
   ↓
4. /dashboard/client/claims/[id]/submit     # ClaimSubmissionForm (modal)
   ↓
5. /dashboard/client/claims/[id]            # Claim detail
```

### Contractor Flow
```
1. /contractors/search                      # ContractorSearchInterface
   ↓
2. /bookings/create?contractor=[id]         # DisasterRecoveryBookingForm (pre-filled)
   ↓
3. /dashboard/client/bookings/[id]          # BookingTrackingDashboard
```

### Admin Verification Flow
```
1. /dashboard/admin/contractors             # List pending
   ↓
2. /dashboard/admin/contractors/verification # ContractorVerificationDashboard
   ↓
3. Approve/Reject → Status updates          # Direct in dashboard
```

---

## ENVIRONMENT VARIABLES NEEDED

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url

# Optional: For cloud storage (Phase 4)
AWS_S3_BUCKET=your-bucket
AWS_S3_REGION=ap-southeast-2
AWS_S3_ACCESS_KEY=your-key
AWS_S3_SECRET_KEY=your-secret
```

---

## TESTING FLOW

### End-to-End Test Scenario
```
1. Customer goes to /bookings/create
2. Selects service type: WATER_DAMAGE
3. Selects emergency level: URGENT
4. Enters location: 2000 (Sydney)
5. Enters damage description
6. Gets estimated cost: ~$2,200 AUD
7. Submits booking
8. Gets booking ID
9. Goes to /dashboard/client/bookings
10. Sees booking in PENDING status
11. Clicks "View Details"
12. Reviews booking info
13. Clicks "Submit Claim"
14. Fills claim form
15. Uploads damage photos
16. Selects insurance provider: NRMA
17. Submits claim
18. Gets confirmation with claim number

Admin:
1. Goes to /dashboard/admin/contractors/verification
2. Sees pending contractors
3. Reviews contractor details
4. Approves contractor
5. Contractor status changes to VERIFIED

Contractor:
1. Logs into /dashboard/contractor
2. Sees available requests
3. Searches by postcode
4. Finds water damage booking in area
5. Submits bid
6. Gets message that bid was accepted
7. Starts working on booking
```

---

## COMMON INTEGRATION PATTERNS

### Pattern 1: Redirect After Action
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();

<DisasterRecoveryBookingForm
  onSubmit={() => {
    router.push('/dashboard/client/bookings');
  }}
/>
```

### Pattern 2: Modal Integration
```tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';

const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <ClaimSubmissionForm
      bookingId={bookingId}
      onSubmit={() => setOpen(false)}
    />
  </DialogContent>
</Dialog>
```

### Pattern 3: Tab-Based Navigation
```tsx
const [activeTab, setActiveTab] = useState('overview');

{activeTab === 'bookings' && <BookingTrackingDashboard />}
{activeTab === 'search' && <ContractorSearchInterface />}
{activeTab === 'verify' && <ContractorVerificationDashboard />}
```

### Pattern 4: Query Parameters
```tsx
import { useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const postcode = searchParams.get('postcode');
const serviceType = searchParams.get('serviceType');

<ContractorSearchInterface
  initialPostcode={postcode}
  initialServiceType={serviceType}
/>
```

---

## API ERRORS & HANDLING

### Common API Errors

**Postcode Not Found**
```
Error: "Invalid Australian postcode"
Solution: Validate against Australian postcode ranges
```

**Contractor Not Available**
```
Error: "No contractors found for this area"
Solution: Show message, suggest nearby areas or different service types
```

**Insurance Provider Error**
```
Error: "Insurance provider not supported"
Solution: Show list of supported providers, handle gracefully
```

**Booking Creation Failed**
```
Error: "Failed to create booking"
Solution: Check validation, show error message, allow retry
```

### Error Handling Example
```tsx
try {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = await response.json();
    toast.error(error.error || 'An error occurred');
    return;
  }

  const result = await response.json();
  toast.success('Booking created successfully!');
} catch (error) {
  console.error(error);
  toast.error('Network error. Please try again.');
}
```

---

## STYLING CUSTOMIZATION

### Color Scheme
```tsx
// Default colors used in all components
Primary: #00BFA6 (Teal)
Secondary: #3B82F6 (Blue)
Background: #0F1115 (Dark)
Card: #1F1F23 (Dark Gray)
Border: #2D2D3A (Darker Gray)

// Can be customized via Tailwind config
tailwind.config.js:
theme: {
  colors: {
    primary: '#00BFA6',
    secondary: '#3B82F6',
    ...
  }
}
```

### Dark Mode
All components are designed for dark theme. To customize:

```tsx
// In component:
className="bg-gray-800 border-gray-700"  // Can change to light colors

// Or use CSS variables:
className="bg-[var(--bg-primary)] border-[var(--border-color)]"
```

---

## NEXT STEPS

### Phase 3 Part 2
1. Real-time WebSocket setup
2. Messaging component
3. Notification preferences
4. Payment processing UI
5. Rating/review system

### Phase 4
1. Email notifications
2. SMS alerts
3. Push notifications
4. Stripe payment integration
5. Advanced analytics

---

## SUPPORT & TROUBLESHOOTING

### Common Issues

**Issue**: Components not rendering
**Solution**: Check imports, verify component file paths, check build errors

**Issue**: API calls failing
**Solution**: Verify API endpoints are running, check Bearer token, review API documentation

**Issue**: Validation errors
**Solution**: Check Zod schema, verify input format, review error messages

**Issue**: Styling issues
**Solution**: Clear Next.js cache, restart dev server, verify Tailwind config

---

## QUICK CHECKLIST

- [ ] Created new route files for each component
- [ ] Imported components correctly
- [ ] Set up authentication/authorization
- [ ] Tested API endpoints
- [ ] Verified form validation
- [ ] Tested navigation flows
- [ ] Styled consistently with app theme
- [ ] Verified responsive design
- [ ] Added error handling
- [ ] Tested with real data

---

*For detailed component documentation, see PHASE3_FRONTEND_IMPLEMENTATION.md*
