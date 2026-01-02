# Search Components

Reusable Algolia-powered search components for the Disaster Recovery NRPG Platform.

## Components

### SearchBox

Search input with autocomplete and clear button.

**Usage:**
```tsx
import { SearchBox } from '@/components/Search/SearchBox';

<SearchBox
  placeholder="Search..."
  showClearButton={true}
  autoFocus={false}
  onSubmit={(query) => console.log('Search:', query)}
/>
```

**Props:**
- `placeholder?: string` - Placeholder text (default: "Search for services, locations, or guides...")
- `className?: string` - Additional CSS classes
- `showClearButton?: boolean` - Show clear button (default: true)
- `autoFocus?: boolean` - Auto-focus on mount (default: false)
- `onSubmit?: (query: string) => void` - Callback when user submits search

---

### SearchResults

Display search results with highlighting and result-type specific rendering.

**Usage:**
```tsx
import { SearchResults } from '@/components/Search/SearchResults';

<SearchResults
  resultType="content" // or "location" or "contractor"
  className="my-4"
/>
```

**Props:**
- `resultType: 'content' | 'location' | 'contractor'` - Type of results to display
- `className?: string` - Additional CSS classes

**Result Types:**
- `content` - Blog posts, articles, guides
  - Shows: title, description, category, tags, author, date, reading time
  - Layout: Card with optional image

- `location` - SEO location pages
  - Shows: title, description, city/state, emergency availability, rating, contractor count
  - Layout: Card with location info

- `contractor` - Contractor directory
  - Shows: business name, services, location, rating, reviews, jobs completed, certifications
  - Layout: Card with logo and verification badge

---

### Filters

Faceted filtering for search results.

**Usage:**
```tsx
import { Filters } from '@/components/Search/Filters';

<Filters
  indexType="content" // or "locations" or "contractors"
  className="sticky top-4"
/>
```

**Props:**
- `indexType: 'content' | 'locations' | 'contractors'` - Type of index to filter
- `className?: string` - Additional CSS classes

**Filter Types by Index:**

**Content Filters:**
- Category (checkboxes)
- Disaster Type (checkboxes)
- Content Type (checkboxes)
- Tags (checkboxes)

**Location Filters:**
- State (checkboxes)
- Service Type (checkboxes)
- Disaster Type (checkboxes)
- 24/7 Emergency Available (toggle)
- Minimum Rating (range slider)

**Contractor Filters:**
- State (checkboxes)
- Services Offered (checkboxes)
- Certifications (checkboxes)
- 24/7 Emergency Available (toggle)
- Verified Contractors Only (toggle)
- Minimum Rating (range slider)
- Years in Business (range slider)

---

### Sub-Components

#### RefinementListFilter

Checkbox list for faceted filtering.

```tsx
<RefinementListFilter
  attribute="category"
  title="Category"
  limit={8}
  showCount={true}
  collapsible={true}
  defaultCollapsed={false}
/>
```

#### RangeFilter

Range slider for numeric filtering.

```tsx
<RangeFilter
  attribute="rating"
  title="Minimum Rating"
  unit=" stars"
  step={0.1}
/>
```

#### ToggleFilter

Toggle switch for boolean filtering.

```tsx
<ToggleFilter
  attribute="emergencyAvailable"
  title="24/7 Emergency Available"
  description="Only show contractors available 24/7"
/>
```

---

### Autocomplete

Advanced autocomplete with trending searches and recent queries.

**Usage:**
```tsx
import { Autocomplete } from '@/components/Search/Autocomplete';

<Autocomplete
  placeholder="Quick search..."
  onSelect={(item) => router.push(item.url)}
/>
```

**Props:**
- `placeholder?: string` - Placeholder text (default: "Search...")
- `className?: string` - Additional CSS classes
- `onSelect?: (item: any) => void` - Callback when user selects an item

**Features:**
- Shows recent searches (from session)
- Shows trending searches (from analytics)
- Shows instant results as you type
- Keyboard navigation (arrow keys, enter, escape)
- Mobile-friendly

---

## Complete Examples

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search</h1>

      <InstantSearch
        searchClient={searchClient}
        indexName={ALGOLIA_CONFIG.indices.content}
      >
        <SearchBox />
        <SearchResults resultType="content" />
      </InstantSearch>
    </div>
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Find Contractors</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <Filters indexType="contractors" />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <SearchBox placeholder="Search contractors..." />
            <SearchResults resultType="contractor" />
          </main>
        </div>
      </div>
    </InstantSearch>
  );
}
```

### Header Search (Autocomplete)

```tsx
import { Autocomplete } from '@/components/Search/Autocomplete';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Logo />

          {/* Quick Search */}
          <div className="flex-1 max-w-xl">
            <Autocomplete
              placeholder="Quick search..."
              onSelect={(item) => router.push(item.url)}
            />
          </div>

          <Nav />
        </div>
      </div>
    </header>
  );
}
```

---

## Styling

All components use Tailwind CSS and are fully customizable via the `className` prop.

**Default Styles:**
- Uses `@/components/ui/*` components (shadcn/ui)
- Responsive design (mobile-first)
- Dark mode compatible
- Accessible (ARIA labels, keyboard navigation)

**Customization:**
```tsx
<SearchBox
  className="mb-8 max-w-2xl mx-auto"
/>

<SearchResults
  resultType="content"
  className="grid grid-cols-1 md:grid-cols-2 gap-4"
/>

<Filters
  indexType="contractors"
  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
/>
```

---

## TypeScript Support

All components are fully typed with TypeScript.

**Import Types:**
```tsx
import type {
  AlgoliaContentRecord,
  AlgoliaLocationRecord,
  AlgoliaContractorRecord,
  SearchResult,
  SearchFilters,
  SearchOptions,
} from '@/lib/algolia/types';
```

---

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Color contrast

---

## Testing

**Unit Tests:**
```bash
npm run test -- SearchBox
npm run test -- SearchResults
npm run test -- Filters
```

**E2E Tests:**
```bash
npm run test:e2e -- search.spec.ts
```

---

## Performance

**Optimizations:**
- Debounced search input (300ms)
- Lazy loading of results
- Virtualized lists for large result sets
- Optimized re-renders with React.memo
- Code splitting with dynamic imports

**Metrics:**
- Search response time: < 10ms (Algolia)
- Time to first result: < 50ms
- Autocomplete latency: < 100ms

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## Related Documentation

- [Algolia Search Guide](../../ALGOLIA_SEARCH_GUIDE.md)
- [React InstantSearch Docs](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [Component API Reference](https://www.algolia.com/doc/api-reference/widgets/react/)

---

## Questions or Issues?

See [ALGOLIA_SEARCH_GUIDE.md](../../ALGOLIA_SEARCH_GUIDE.md) for troubleshooting and advanced usage.
