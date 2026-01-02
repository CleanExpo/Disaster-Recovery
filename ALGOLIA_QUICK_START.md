# Algolia Search - Quick Start Guide

Get Algolia search up and running in 5 minutes.

## ⚡ Quick Setup (5 minutes)

### 1. Get Algolia API Keys (2 min)

1. Visit [algolia.com/users/sign_up](https://www.algolia.com/users/sign_up)
2. Create free account
3. Create new application
4. Copy API keys from **Settings → API Keys**

### 2. Configure Environment (1 min)

Add to `.env.local`:

```bash
NEXT_PUBLIC_ALGOLIA_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=YOUR_SEARCH_KEY
ALGOLIA_ADMIN_KEY=YOUR_ADMIN_KEY
```

### 3. Sync Data (2 min)

```bash
# Install dependencies (if not already installed)
npm install

# Sync all data to Algolia
npm run algolia:sync
```

✅ **Done!** Search is now live at: `http://localhost:3000/search`

---

## 🚀 Common Tasks

### Sync Data to Algolia

```bash
# Sync everything
npm run algolia:sync

# Sync only content (blog posts, articles)
npm run algolia:sync:content

# Sync only location pages
npm run algolia:sync:locations

# Sync only contractors
npm run algolia:sync:contractors
```

### Add Search to a Page

```tsx
'use client';

import { InstantSearch } from 'react-instantsearch';
import { getAlgoliaSearchClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';
import { SearchBox } from '@/components/Search/SearchBox';
import { SearchResults } from '@/components/Search/SearchResults';

export default function MySearchPage() {
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

### Add Search to Header

```tsx
import { Autocomplete } from '@/components/Search/Autocomplete';

export function Header() {
  return (
    <header>
      <Autocomplete placeholder="Quick search..." />
    </header>
  );
}
```

### Add Filters to Search

```tsx
import { Filters } from '@/components/Search/Filters';

<div className="grid grid-cols-4 gap-6">
  <aside className="col-span-1">
    <Filters indexType="content" />
  </aside>
  <main className="col-span-3">
    <SearchBox />
    <SearchResults resultType="content" />
  </main>
</div>
```

---

## 📊 Available Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `SearchBox` | Search input | `<SearchBox />` |
| `SearchResults` | Display results | `<SearchResults resultType="content" />` |
| `Filters` | Faceted filters | `<Filters indexType="content" />` |
| `Autocomplete` | Quick search with suggestions | `<Autocomplete />` |

---

## 🔍 Search Indices

| Index | Contains | Records |
|-------|----------|---------|
| `disaster_recovery_content` | Blog posts, guides, articles | ~1,000 |
| `disaster_recovery_locations` | SEO location pages | ~10,000 |
| `disaster_recovery_contractors` | Contractor directory | ~500 |

---

## 🎯 Search Features

✅ **Instant Search** - Results as you type (< 10ms)
✅ **Typo Tolerance** - Finds "water damge" → "water damage"
✅ **Synonyms** - "flood" = "water damage" = "water emergency"
✅ **Geo-Search** - Find contractors near user location
✅ **Faceted Filters** - Filter by category, location, rating, etc.
✅ **Autocomplete** - Smart suggestions as you type
✅ **Analytics** - Track searches, clicks, conversions

---

## 🔧 Troubleshooting

### No results showing?

1. Check environment variables are set
2. Run sync: `npm run algolia:sync`
3. Verify data in [Algolia dashboard](https://www.algolia.com/apps)

### Search not working?

1. Check API keys are correct
2. Check browser console for errors
3. Verify `getAlgoliaSearchClient()` is called

### Need to update data?

```bash
npm run algolia:sync
```

---

## 📚 Full Documentation

For complete documentation, see:

- **[ALGOLIA_SEARCH_GUIDE.md](ALGOLIA_SEARCH_GUIDE.md)** - Complete guide
- **[components/Search/README.md](components/Search/README.md)** - Component docs
- **[Algolia Docs](https://www.algolia.com/doc/)** - Official documentation

---

## 🆘 Need Help?

1. Check [Troubleshooting section](ALGOLIA_SEARCH_GUIDE.md#troubleshooting)
2. Check [Algolia Community](https://discourse.algolia.com/)
3. Check [Stack Overflow](https://stackoverflow.com/questions/tagged/algolia)

---

## 🎉 You're All Set!

Search is now fully integrated and ready to use. Visit `/search` to try it out!

**Next steps:**
- Customize search UI to match your design
- Set up webhooks for auto-sync
- Monitor analytics in Algolia dashboard
- Optimize based on search insights
