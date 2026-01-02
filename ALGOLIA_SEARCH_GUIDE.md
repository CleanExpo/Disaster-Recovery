# Algolia Search Integration Guide

Complete guide to the Algolia search implementation for the Disaster Recovery NRPG Platform.

## 📚 Table of Contents

1. [Overview](#overview)
2. [Setup & Configuration](#setup--configuration)
3. [Architecture](#architecture)
4. [Components](#components)
5. [Data Sync](#data-sync)
6. [Search Analytics](#search-analytics)
7. [Usage Examples](#usage-examples)
8. [Testing](#testing)
9. [Production Deployment](#production-deployment)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Algolia?

Algolia is a powerful search-as-a-service platform that provides:
- **Instant search** - Results as you type (< 10ms response time)
- **Typo tolerance** - Finds results even with misspellings
- **Faceted filtering** - Filter by categories, locations, ratings, etc.
- **Geo-search** - Find results near user's location
- **Analytics** - Track search behavior and optimize results
- **Synonyms** - Map related terms (e.g., "water damage" = "flood")

### Why Algolia?

✅ **Ease of Integration** - Simple API, excellent documentation
✅ **Instant Search** - Sub-10ms response times globally
✅ **Excellent UX** - Autocomplete, instant results, highlighting
✅ **Rich Features** - Facets, geo-search, synonyms, A/B testing
✅ **Great Documentation** - React InstantSearch components
✅ **Generous Free Tier** - 10,000 searches/month, 10,000 records

### What We're Searching

Our platform indexes three types of content:

1. **Content** (Blog posts, guides, articles)
   - 1,000+ articles about disaster recovery
   - Categories: Emergency guides, how-tos, FAQs
   - Searchable by title, description, content, tags

2. **Locations** (SEO location pages)
   - 10,000+ city/service combinations
   - Example: "Water Damage Restoration Sydney NSW"
   - Searchable by city, state, service type

3. **Contractors** (Contractor directory)
   - 500+ verified contractors
   - Searchable by business name, services, location, certifications
   - Geo-search by user location

---

## Setup & Configuration

### 1. Create Algolia Account

1. Visit [algolia.com](https://www.algolia.com/)
2. Sign up for a free account
3. Create a new application
4. Note your **App ID** and **API Keys**

### 2. Get API Keys

From Algolia dashboard → **Settings → API Keys**:

- **Application ID** - Public identifier
- **Search-Only API Key** - Public, read-only (safe for frontend)
- **Admin API Key** - Private, read/write (backend only, NEVER expose)

### 3. Configure Environment Variables

Add to `.env.local`:

```bash
# Algolia Search Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id_here
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_api_key_here
ALGOLIA_ADMIN_KEY=your_admin_api_key_here

# Sanity Webhook Secret (for content sync)
SANITY_WEBHOOK_SECRET=your_webhook_secret_here
```

⚠️ **Security Note**:
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `ALGOLIA_ADMIN_KEY` must NEVER be exposed (backend only)

### 4. Install Dependencies

Already installed in this project:

```bash
npm install algoliasearch react-instantsearch
```

### 5. Create Indices

Run the sync script to create and configure indices:

```bash
npm run algolia:sync
```

This will:
- Create 3 indices (content, locations, contractors)
- Configure searchable attributes
- Set up custom ranking
- Add synonyms
- Index initial data

---

## Architecture

### Directory Structure

```
lib/algolia/
├── config.ts          # Algolia configuration (indices, settings)
├── client.ts          # Client initialization (search & admin)
├── types.ts           # TypeScript types for records
├── analytics.ts       # Search analytics tracking
└── index.ts           # Main export file

components/Search/
├── SearchBox.tsx      # Search input component
├── SearchResults.tsx  # Results display component
├── Filters.tsx        # Faceted filtering component
└── Autocomplete.tsx   # Autocomplete component

app/
├── search/
│   └── page.tsx       # Full-page search experience
└── api/
    ├── analytics/
    │   └── search/    # Analytics API endpoint
    └── webhooks/
        └── sanity/    # Sanity CMS webhook handler

scripts/
└── sync-to-algolia.ts # Data sync script
```

### Data Flow

```
┌─────────────────┐
│   Sanity CMS    │ (Content Management)
└────────┬────────┘
         │ Webhook on publish
         ▼
┌─────────────────┐
│ /api/webhooks/  │ (Auto-sync content)
│     sanity      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Algolia Index  │ (Search Database)
│  - content      │
│  - locations    │
│  - contractors  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Search Client  │ (Frontend)
│ InstantSearch   │
└─────────────────┘
```

---

## Components

### SearchBox

Algolia-powered search input with autocomplete.

```tsx
import { SearchBox } from '@/components/Search/SearchBox';

<SearchBox
  placeholder="Search for services..."
  showClearButton={true}
  autoFocus={false}
/>
```

**Props:**
- `placeholder` - Placeholder text
- `showClearButton` - Show clear button (default: true)
- `autoFocus` - Auto-focus on mount (default: false)
- `onSubmit` - Callback when user submits search

### SearchResults

Displays search results with highlighting.

```tsx
import { SearchResults } from '@/components/Search/SearchResults';

<SearchResults
  resultType="content" // or "location" or "contractor"
  className="my-4"
/>
```

**Result Types:**
- `content` - Articles, guides, blog posts
- `location` - SEO location pages
- `contractor` - Contractor directory

### Filters

Faceted filtering for search results.

```tsx
import { Filters } from '@/components/Search/Filters';

<Filters
  indexType="content" // or "locations" or "contractors"
/>
```

**Filter Types:**
- **Checkboxes** - Categories, tags, service types
- **Toggles** - Emergency available, verified only
- **Ranges** - Rating, years in business

### Autocomplete

Advanced autocomplete with suggestions.

```tsx
import { Autocomplete } from '@/components/Search/Autocomplete';

<Autocomplete
  placeholder="Quick search..."
  onSelect={(item) => console.log('Selected:', item)}
/>
```

---

## Data Sync

### Manual Sync

Sync all data to Algolia:

```bash
# Sync everything
npm run algolia:sync

# Sync only content
npm run algolia:sync:content

# Sync only locations
npm run algolia:sync:locations

# Sync only contractors
npm run algolia:sync:contractors
```

### Automatic Sync (Webhooks)

#### Sanity CMS Webhook

When content is published in Sanity CMS, it's automatically synced to Algolia.

**Setup:**

1. Go to Sanity project settings
2. Add webhook: `https://yourdomain.com/api/webhooks/sanity`
3. Set secret: Same as `SANITY_WEBHOOK_SECRET` in `.env.local`
4. Trigger on: `create`, `update`, `delete`

#### Contractor Sync

Contractors are synced when:
- New contractor is verified
- Contractor updates profile
- Contractor is deactivated

Add to your contractor update logic:

```typescript
import { getAlgoliaAdminClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';

async function syncContractorToAlgolia(contractorId: string) {
  const contractor = await prisma.contractor.findUnique({
    where: { id: contractorId },
    include: { user: true },
  });

  const client = getAlgoliaAdminClient();
  const index = client.initIndex(ALGOLIA_CONFIG.indices.contractors);

  const record = {
    objectID: contractor.id,
    businessName: contractor.businessName,
    // ... other fields
  };

  await index.saveObject(record);
}
```

---

## Search Analytics

### Track Search Events

```typescript
import { useSearchAnalytics } from '@/lib/algolia/analytics';

function MySearchComponent() {
  const { trackClick, trackConversion } = useSearchAnalytics();

  const handleResultClick = (hit, position) => {
    trackClick({
      query: 'water damage',
      index: 'disaster_recovery_content',
      objectID: hit.objectID,
      position,
      queryID: hit.__queryID,
    });
  };

  const handleBooking = (hit) => {
    trackConversion({
      query: 'water damage',
      index: 'disaster_recovery_contractors',
      objectID: hit.objectID,
      queryID: hit.__queryID,
    });
  };

  return (
    // Your component
  );
}
```

### View Analytics

```typescript
import { getSearchAnalytics } from '@/lib/algolia/analytics';

const analytics = await getSearchAnalytics({
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-31'),
  index: 'disaster_recovery_content', // optional
});

console.log('Total searches:', analytics.totalSearches);
console.log('Click-through rate:', analytics.clickThroughRate);
console.log('Top queries:', analytics.topQueries);
```

---

## Usage Examples

### Simple Search Page

```tsx
'use client';

import { InstantSearch } from 'react-instantsearch';
import { getAlgoliaSearchClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';
import { SearchBox } from '@/components/Search/SearchBox';
import { SearchResults } from '@/components/Search/SearchResults';

export default function SearchPage() {
  const searchClient = getAlgoliaSearchClient();

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={ALGOLIA_CONFIG.indices.content}
    >
      <SearchBox />
      <SearchResults resultType="content" />
    </InstantSearch>
  );
}
```

### Search with Filters

```tsx
'use client';

import { InstantSearch } from 'react-instantsearch';
import { getAlgoliaSearchClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';
import { SearchBox } from '@/components/Search/SearchBox';
import { SearchResults } from '@/components/Search/SearchResults';
import { Filters } from '@/components/Search/Filters';

export default function FilteredSearchPage() {
  const searchClient = getAlgoliaSearchClient();

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={ALGOLIA_CONFIG.indices.contractors}
    >
      <div className="grid grid-cols-4 gap-6">
        <aside className="col-span-1">
          <Filters indexType="contractors" />
        </aside>
        <main className="col-span-3">
          <SearchBox />
          <SearchResults resultType="contractor" />
        </main>
      </div>
    </InstantSearch>
  );
}
```

### Geo-Search (Find Nearby Contractors)

```tsx
'use client';

import { InstantSearch, Configure } from 'react-instantsearch';
import { getAlgoliaSearchClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';
import { SearchResults } from '@/components/Search/SearchResults';

export default function NearbyContractorsPage() {
  const searchClient = getAlgoliaSearchClient();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={ALGOLIA_CONFIG.indices.contractors}
    >
      {userLocation && (
        <Configure
          aroundLatLng={`${userLocation.lat},${userLocation.lng}`}
          aroundRadius={50000} // 50km radius
        />
      )}
      <SearchResults resultType="contractor" />
    </InstantSearch>
  );
}
```

---

## Testing

### Test Search Locally

1. Start development server:
   ```bash
   npm run dev
   ```

2. Visit search page:
   ```
   http://localhost:3000/search
   ```

3. Try searches:
   - "water damage"
   - "fire restoration Sydney"
   - "mould removal"

### Test Data Sync

```bash
# Sync test data
npm run algolia:sync

# Check Algolia dashboard to verify data
# Visit: https://www.algolia.com/apps/[YOUR_APP_ID]/explorer
```

### Test Webhooks Locally

Use ngrok to test webhooks:

```bash
# Install ngrok
npm install -g ngrok

# Start local server
npm run dev

# Expose to internet
ngrok http 3000

# Use ngrok URL in Sanity webhook settings
# Example: https://abc123.ngrok.io/api/webhooks/sanity
```

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Algolia account created
- [ ] Production API keys configured
- [ ] Environment variables set in hosting platform
- [ ] Indices created and configured
- [ ] Initial data synced
- [ ] Webhooks configured
- [ ] Analytics enabled
- [ ] Search tested on staging

### Deployment Steps

1. **Set Environment Variables** (Vercel/Netlify/etc.)
   ```
   NEXT_PUBLIC_ALGOLIA_APP_ID=xxx
   NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=xxx
   ALGOLIA_ADMIN_KEY=xxx (sensitive!)
   SANITY_WEBHOOK_SECRET=xxx
   ```

2. **Deploy Application**
   ```bash
   npm run build
   npm run start
   ```

3. **Sync Initial Data**
   ```bash
   npm run algolia:sync
   ```

4. **Configure Webhooks**
   - Update Sanity webhook to production URL
   - Test webhook delivery

5. **Monitor Analytics**
   - Check Algolia dashboard for search activity
   - Review top queries and click-through rates
   - Optimize based on insights

### Performance Optimization

1. **Enable Caching**
   - Algolia caches results automatically
   - Set appropriate `staleTimes` in React Query

2. **Optimize Index Size**
   - Remove unnecessary attributes
   - Use `attributesToRetrieve` to limit data

3. **Use Query Suggestions**
   - Enable query suggestions in Algolia dashboard
   - Improves autocomplete performance

4. **Monitor Quotas**
   - Free tier: 10,000 searches/month
   - Paid plans: Scale as needed

---

## Troubleshooting

### No Results Showing

**Cause:** Index is empty or API keys are incorrect.

**Solution:**
1. Check environment variables are set correctly
2. Run sync script: `npm run algolia:sync`
3. Verify data in Algolia dashboard

### Search Returning Wrong Results

**Cause:** Ranking configuration or synonyms need adjustment.

**Solution:**
1. Check custom ranking in `lib/algolia/config.ts`
2. Add relevant synonyms
3. Test in Algolia dashboard query tester

### Webhook Not Working

**Cause:** Webhook URL incorrect or signature verification failing.

**Solution:**
1. Verify webhook URL is correct
2. Check `SANITY_WEBHOOK_SECRET` matches in both Sanity and `.env.local`
3. Check webhook logs in Sanity dashboard
4. Test webhook with ngrok locally

### Slow Search Performance

**Cause:** Too many searchable attributes or large index.

**Solution:**
1. Reduce searchable attributes to essential fields
2. Optimize custom ranking
3. Use `attributesToRetrieve` to limit data
4. Consider pagination

### Analytics Not Tracking

**Cause:** Algolia Insights not initialized or API key incorrect.

**Solution:**
1. Call `initializeAlgoliaInsights()` in root layout
2. Verify search API key has analytics permissions
3. Check browser console for errors

---

## Advanced Features

### A/B Testing

Test different ranking strategies:

```typescript
import { Configure } from 'react-instantsearch';

<Configure
  enableABTest={true}
  abTestID="ranking-test-1"
/>
```

### Personalization

Show personalized results based on user behavior:

```typescript
import { Configure } from 'react-instantsearch';

<Configure
  enablePersonalization={true}
  userToken={userId}
/>
```

### Multi-Index Search

Search across all indices simultaneously:

```typescript
import { Index } from 'react-instantsearch';

<InstantSearch searchClient={searchClient}>
  <Index indexName="disaster_recovery_content">
    <SearchResults resultType="content" />
  </Index>
  <Index indexName="disaster_recovery_locations">
    <SearchResults resultType="location" />
  </Index>
  <Index indexName="disaster_recovery_contractors">
    <SearchResults resultType="contractor" />
  </Index>
</InstantSearch>
```

---

## Resources

### Documentation
- [Algolia Docs](https://www.algolia.com/doc/)
- [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [Algolia API Reference](https://www.algolia.com/doc/api-reference/)

### Dashboard
- [Algolia Dashboard](https://www.algolia.com/apps/)
- [Analytics](https://www.algolia.com/apps/[APP_ID]/analytics)
- [API Keys](https://www.algolia.com/apps/[APP_ID]/api-keys)

### Support
- [Algolia Community](https://discourse.algolia.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/algolia)

---

## Summary

✅ **Algolia search is fully integrated**
✅ **3 indices configured** (content, locations, contractors)
✅ **Search UI components ready** (SearchBox, Results, Filters)
✅ **Automatic sync via webhooks**
✅ **Analytics tracking enabled**
✅ **Production-ready**

### Next Steps

1. Get Algolia API keys
2. Add to `.env.local`
3. Run `npm run algolia:sync`
4. Test search at `/search`
5. Configure webhooks for auto-sync
6. Monitor analytics in Algolia dashboard

---

**Questions?** Check the [Troubleshooting](#troubleshooting) section or refer to [Algolia docs](https://www.algolia.com/doc/).
