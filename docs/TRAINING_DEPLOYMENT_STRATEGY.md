# Training Module Deployment Strategy

## Overview
This document outlines the strategy for gradually releasing training modules to ensure quality and gather feedback before full deployment.

## Deployment Phases

### Phase 1: Internal Testing (Week 1)
- **Modules**: Days 1-7 (Foundation modules)
- **Access**: Internal team only
- **Environment Variable**: `NEXT_PUBLIC_TRAINING_RELEASE_MODE=week1`
- **Focus**: 
  - Test navigation and UI
  - Verify content accuracy
  - Check progress tracking
  - Test on different devices

### Phase 2: Beta Release (Week 2)
- **Modules**: Days 1-7 + Day 8 (marked as beta)
- **Access**: Selected beta testers
- **Environment Variable**: `NEXT_PUBLIC_TRAINING_RELEASE_MODE=beta`
- **Focus**:
  - Gather user feedback
  - Monitor completion rates
  - Track technical issues
  - Assess content effectiveness

### Phase 3: Gradual Rollout (Weeks 3-4)
- **Modules**: Release 1-2 modules per week
- **Access**: All contractors
- **Environment Variable**: `NEXT_PUBLIC_TRAINING_RELEASE_MODE=gradual`
- **Schedule**:
  - Week 3: Release Days 8-9
  - Week 3.5: Release Days 10-11
  - Week 4: Release Days 12-13
  - Week 4.5: Release Day 14 (Certification)

### Phase 4: Full Release (Week 5+)
- **Modules**: All 14 days available
- **Access**: Public/All contractors
- **Environment Variable**: `NEXT_PUBLIC_TRAINING_RELEASE_MODE=all`
- **Focus**:
  - Monitor at scale
  - Continuous improvement
  - Add new content as needed

## Implementation Steps

### 1. Quick Toggle in Vercel Dashboard
```bash
# In Vercel Project Settings > Environment Variables
NEXT_PUBLIC_TRAINING_RELEASE_MODE=week1  # Start with Week 1 only
```

### 2. Update Module Configuration
Edit `src/app/portal/training/config/moduleConfig.ts`:
```typescript
// Set isAvailable: true for modules you want to release
{
  id: 'day-8',
  day: 8,
  title: 'Mould Remediation',
  isAvailable: true,  // Change from false to true
  isBeta: true        // Mark as beta initially
}
```

### 3. Progressive Release Script
Create a GitHub Action to automatically release modules:

```yaml
name: Progressive Module Release
on:
  schedule:
    - cron: '0 0 * * MON'  # Every Monday at midnight
  workflow_dispatch:

jobs:
  release-module:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Update Module Availability
        run: |
          # Script to update next module's availability
          node scripts/release-next-module.js
      - name: Deploy to Vercel
        run: |
          vercel --prod
```

### 4. Feature Flag Implementation
```typescript
// In your module pages
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

export default function Day8Module() {
  const isEnabled = useFeatureFlag('module-day-8');
  
  if (!isEnabled) {
    return <ComingSoonPage />;
  }
  
  // Regular module content
}
```

## Monitoring & Metrics

### Key Metrics to Track
1. **Completion Rates**
   - Per module completion
   - Drop-off points
   - Time to complete

2. **User Engagement**
   - Daily active users
   - Module revisits
   - Resource downloads

3. **Technical Performance**
   - Page load times
   - Error rates
   - Browser compatibility

4. **Feedback Scores**
   - Module ratings
   - Quiz scores
   - User comments

### Feedback Collection
```typescript
// Add to each module completion
const collectFeedback = async (moduleId: string, rating: number, comments: string) => {
  await fetch('/api/training/feedback', {
    method: 'POST',
    body: JSON.stringify({
      moduleId,
      rating,
      comments,
      timestamp: new Date()
    })
  });
};
```

## Rollback Strategy

If issues are discovered:

1. **Immediate Rollback**
   ```bash
   # In Vercel Dashboard
   NEXT_PUBLIC_TRAINING_RELEASE_MODE=week1
   ```

2. **Targeted Module Disable**
   ```typescript
   // In moduleConfig.ts
   {
     id: 'day-9',
     isAvailable: false,  // Disable problematic module
   }
   ```

3. **Emergency Maintenance Mode**
   ```typescript
   // Add to training page
   if (process.env.NEXT_PUBLIC_TRAINING_MAINTENANCE === 'true') {
     return <MaintenancePage />;
   }
   ```

## Communication Plan

### For Each Release Phase:

1. **Pre-Release (1 week before)**
   - Email announcement to affected users
   - Dashboard notification
   - Social media teaser

2. **Release Day**
   - Email with access instructions
   - In-app notification
   - Support team briefing

3. **Post-Release (1 week after)**
   - Feedback survey
   - Performance review
   - Bug fix deployment

## Benefits of Gradual Release

1. **Quality Assurance**
   - Catch bugs before full rollout
   - Refine content based on feedback
   - Optimize performance gradually

2. **User Experience**
   - Avoid overwhelming new users
   - Build anticipation for new content
   - Allow time for prerequisite completion

3. **Technical Stability**
   - Monitor server load incrementally
   - Scale resources as needed
   - Identify bottlenecks early

4. **Business Value**
   - Create ongoing engagement
   - Generate buzz and interest
   - Demonstrate continuous improvement

## Quick Start Commands

```bash
# Check current release mode
echo $NEXT_PUBLIC_TRAINING_RELEASE_MODE

# Deploy with specific mode
NEXT_PUBLIC_TRAINING_RELEASE_MODE=beta vercel --prod

# Test locally with different modes
NEXT_PUBLIC_TRAINING_RELEASE_MODE=all npm run dev

# Build for production
NEXT_PUBLIC_TRAINING_RELEASE_MODE=gradual npm run build
```

## Support Documentation

- User Guide: `/docs/training-user-guide.md`
- Admin Guide: `/docs/training-admin-guide.md`
- API Reference: `/docs/training-api.md`
- Troubleshooting: `/docs/training-troubleshooting.md`