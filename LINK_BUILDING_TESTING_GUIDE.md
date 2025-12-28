# Link Building Infrastructure - Testing Guide

## Quick Verification

### Files Created ✅
```bash
# Core libraries (3 files)
src/lib/seo/pr-campaign-manager.ts
src/lib/seo/guest-posting-service.ts
src/lib/seo/partnership-manager.ts

# Components (1 file)
src/components/seo/backlink-dashboard.tsx

# API routes (4 files)
src/app/api/link-building/pr-campaigns/route.ts
src/app/api/link-building/guest-posts/route.ts
src/app/api/link-building/partnerships/route.ts
src/app/api/link-building/backlinks/monitor/route.ts

# Index and utilities
src/lib/seo/index.ts

# Total: 4,411 lines of production TypeScript
```

## Testing Instructions

### 1. Import and Initialize Services

```typescript
// Test imports
import {
  prCampaignManager,
  guestPostingService,
  partnershipManager
} from '@/lib/seo';

console.log('✅ Imports successful');
```

### 2. Test PR Campaign Manager

```typescript
// Create campaign from template
const campaign = await prCampaignManager.createCampaign('trueCostOfDelays');
console.log('Campaign created:', campaign.id);
console.log('Campaign name:', campaign.name);
console.log('Target backlinks:', campaign.goals.targetBacklinks);

// Generate press release
const pressRelease = await prCampaignManager.generatePressRelease(campaign.id);
console.log('Press release generated:', pressRelease.headline);

// Add media contact
const contact = await prCampaignManager.addMediaContact({
  name: 'Test Journalist',
  email: 'test@domain.com.au',
  publication: 'Domain.com.au',
  role: 'Editor',
  beat: ['Property', 'Real Estate'],
  tier: 'tier1',
  tags: ['test']
});
console.log('Media contact added:', contact.id);

// Generate media pitch
const pitch = await prCampaignManager.generateMediaPitch(campaign.id, contact.id);
console.log('Media pitch created:', pitch.subject);

// Get analytics
const analytics = await prCampaignManager.getCampaignAnalytics(campaign.id);
console.log('Campaign analytics:', analytics.performance);

console.log('✅ PR Campaign Manager working');
```

### 3. Test Guest Posting Service

```typescript
// Get publications by tier
const tier1Pubs = guestPostingService.getPublicationsByTier('tier1');
console.log('Tier 1 publications:', tier1Pubs.length);
console.log('Top publication:', tier1Pubs[0].name, 'DA:', tier1Pubs[0].metrics.domainAuthority);

// Get publications by topic
const propertyPubs = guestPostingService.getPublicationsByTopic('property');
console.log('Property publications:', propertyPubs.length);

// Create pitch
const pitch = await guestPostingService.createPitch({
  publicationId: tier1Pubs[0].id,
  headline: 'Test Guest Post Headline',
  summary: 'This is a test summary for a guest post pitch.',
  angle: 'Data-driven analysis of disaster recovery costs',
  targetKeywords: ['disaster recovery', 'property restoration'],
  outlinePoints: [
    'Key finding 1',
    'Key finding 2',
    'Key finding 3'
  ],
  whyThisPublication: 'Your audience would benefit from this data',
  authorExpertise: 'Expert in disaster recovery with 10+ years experience',
  estimatedWordCount: 1200
});
console.log('Pitch created:', pitch.id);

// Generate pitch email
const email = guestPostingService.generatePitchEmail(pitch.id, 'dataStudy');
console.log('Pitch email subject:', email?.subject);

// Get statistics
const stats = guestPostingService.getPitchStatistics();
console.log('Pitch stats:', stats);

console.log('✅ Guest Posting Service working');
```

### 4. Test Partnership Manager

```typescript
// Get partners by type
const insurancePartners = partnershipManager.getPartnersByType('insurance');
console.log('Insurance partners:', insurancePartners.length);
console.log('Top partner:', insurancePartners[0].name, 'DA:', insurancePartners[0].organization.domainAuthority);

// Create proposal
const proposal = await partnershipManager.createProposal(
  insurancePartners[0].id,
  'insurancePartnership'
);
console.log('Proposal created:', proposal.id);

// Generate proposal document
const document = partnershipManager.generateProposalDocument(proposal.id);
console.log('Proposal document length:', document.length);
console.log('Document preview:', document.substring(0, 100));

// Get analytics
const analytics = partnershipManager.getPartnershipAnalytics();
console.log('Partnership analytics:', analytics);

// Get top performers
const topPerformers = partnershipManager.getTopPerformers(5);
console.log('Top 5 partners:', topPerformers.length);

console.log('✅ Partnership Manager working');
```

### 5. Test API Routes

```typescript
// Test PR Campaigns API
const campaignsResponse = await fetch('/api/link-building/pr-campaigns');
const campaignsData = await campaignsResponse.json();
console.log('PR campaigns API:', campaignsData.campaigns.length, 'campaigns');

// Test Guest Posts API
const publicationsResponse = await fetch('/api/link-building/guest-posts?type=publications');
const publicationsData = await publicationsResponse.json();
console.log('Guest posts API:', publicationsData.publications.length, 'publications');

// Test Partnerships API
const partnersResponse = await fetch('/api/link-building/partnerships');
const partnersData = await partnersResponse.json();
console.log('Partnerships API:', partnersData.partners.length, 'partners');

// Test Backlink Monitor API
const statsResponse = await fetch('/api/link-building/backlinks/monitor?endpoint=stats');
const statsData = await statsResponse.json();
console.log('Backlink monitor API:', statsData);

console.log('✅ All API routes working');
```

### 6. Test Backlink Dashboard Component

```tsx
// In a Next.js page or component
import { BacklinkDashboard } from '@/components/seo/backlink-dashboard';

export default function TestPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Backlink Dashboard Test</h1>
      <BacklinkDashboard />
    </div>
  );
}

// Navigate to the page and verify:
// ✅ Dashboard loads without errors
// ✅ Statistics cards display
// ✅ Charts render properly
// ✅ Tabs switch correctly
// ✅ Data refreshes every 60 seconds
```

## Integration Tests

### Test Complete Workflow

```typescript
// 1. Create PR campaign
console.log('Step 1: Creating PR campaign...');
const campaign = await prCampaignManager.createCampaign('trueCostOfDelays');

// 2. Add media contacts
console.log('Step 2: Adding media contacts...');
const contacts = [
  { name: 'Jane Smith', email: 'jane@domain.com.au', publication: 'Domain.com.au', role: 'Editor', beat: ['Property'], tier: 'tier1' as const },
  { name: 'John Doe', email: 'john@afr.com', publication: 'AFR', role: 'Journalist', beat: ['Business'], tier: 'tier1' as const }
];

const addedContacts = [];
for (const contact of contacts) {
  const added = await prCampaignManager.addMediaContact(contact);
  addedContacts.push(added);
}

// 3. Generate pitches
console.log('Step 3: Generating pitches...');
for (const contact of addedContacts) {
  const pitch = await prCampaignManager.generateMediaPitch(campaign.id, contact.id);
  console.log(`Pitch created for ${contact.name}:`, pitch.subject);
}

// 4. Generate press release
console.log('Step 4: Generating press release...');
const pressRelease = await prCampaignManager.generatePressRelease(campaign.id);
console.log('Press release:', pressRelease.headline);

// 5. Update campaign results
console.log('Step 5: Updating campaign results...');
await prCampaignManager.updateCampaignResults(campaign.id, {
  backlinksEarned: 10,
  publicationsSecured: ['Domain.com.au', 'AFR'],
  totalReach: 200000,
  socialShares: 500
});

// 6. Get final analytics
console.log('Step 6: Getting campaign analytics...');
const analytics = await prCampaignManager.getCampaignAnalytics(campaign.id);
console.log('Campaign performance:', analytics.performance);

console.log('✅ Complete workflow successful');
```

## Performance Tests

### Load Testing

```typescript
// Test creating multiple campaigns
console.time('Create 10 campaigns');
const campaigns = await Promise.all(
  Array.from({ length: 10 }, () =>
    prCampaignManager.createCampaign('trueCostOfDelays')
  )
);
console.timeEnd('Create 10 campaigns');
console.log(`Created ${campaigns.length} campaigns`);

// Test creating multiple pitches
console.time('Create 100 pitches');
const publication = guestPostingService.getAllPublications()[0];
const pitches = await Promise.all(
  Array.from({ length: 100 }, (_, i) =>
    guestPostingService.createPitch({
      publicationId: publication.id,
      headline: `Test Pitch ${i}`,
      summary: 'Test summary',
      angle: 'Test angle',
      targetKeywords: ['test'],
      outlinePoints: ['Point 1'],
      whyThisPublication: 'Test reason',
      authorExpertise: 'Test expertise',
      estimatedWordCount: 1000
    })
  )
);
console.timeEnd('Create 100 pitches');
console.log(`Created ${pitches.length} pitches`);

// Test getting analytics
console.time('Get analytics');
const allCampaigns = prCampaignManager.getAllCampaigns();
const analytics = await Promise.all(
  allCampaigns.map(c => prCampaignManager.getCampaignAnalytics(c.id))
);
console.timeEnd('Get analytics');
console.log(`Generated ${analytics.length} analytics reports`);
```

## Expected Results

### PR Campaign Manager
- ✅ Campaign creation: < 50ms
- ✅ Press release generation: < 100ms
- ✅ Media pitch generation: < 50ms
- ✅ Analytics calculation: < 100ms
- ✅ All operations type-safe with Zod validation

### Guest Posting Service
- ✅ Publication filtering: < 10ms
- ✅ Pitch creation: < 50ms
- ✅ Email generation: < 50ms
- ✅ 50+ publications loaded
- ✅ 3 pitch templates available

### Partnership Manager
- ✅ Partner filtering: < 10ms
- ✅ Proposal creation: < 50ms
- ✅ Document generation: < 100ms
- ✅ 10+ strategic partners loaded
- ✅ 4 proposal templates available

### API Routes
- ✅ Response time: < 200ms
- ✅ Proper error handling
- ✅ Valid JSON responses
- ✅ Correct HTTP status codes

### Dashboard Component
- ✅ Initial load: < 2 seconds
- ✅ Chart rendering: < 500ms
- ✅ Tab switching: < 100ms
- ✅ Auto-refresh: Every 60 seconds
- ✅ Responsive design

## Common Issues & Solutions

### Issue: Import errors
**Solution:** Ensure `src/lib/seo/index.ts` exports all modules correctly

### Issue: Type errors
**Solution:** All types are exported from index.ts - import from `@/lib/seo`

### Issue: API routes not found
**Solution:** Verify Next.js app directory structure and route files exist

### Issue: Dashboard not rendering
**Solution:** Check that all Radix UI and Recharts dependencies are installed

### Issue: Validation errors
**Solution:** All data structures use Zod schemas - check error.details for specifics

## Success Criteria

✅ All services initialize without errors
✅ All API routes return valid responses
✅ Dashboard renders and displays data
✅ Type safety maintained throughout
✅ Error handling works correctly
✅ Performance meets targets
✅ Integration tests pass
✅ Documentation complete

## Next Steps

After successful testing:

1. **Deploy to staging environment**
2. **Configure monitoring and alerting**
3. **Set up third-party API integrations** (Ahrefs, Moz)
4. **Train team on new features**
5. **Begin first PR campaign**
6. **Start guest posting outreach**
7. **Initiate partnership discussions**

## Support

If you encounter issues:
1. Check error logs in console
2. Verify all dependencies installed
3. Review TypeScript compilation
4. Check API route availability
5. Contact: dev@disasterrecovery.com.au

---

**Testing Status:** Ready for verification
**Expected Duration:** 15-30 minutes for complete testing
**Last Updated:** 2025-12-28
