'use client';

/**
 * Search Page
 *
 * Full-page search experience with Algolia InstantSearch
 * Shows results by type with faceted filtering
 */

import React, { Suspense } from 'react';
import { InstantSearch, Configure, Stats, Pagination } from 'react-instantsearch';
import { getAlgoliaSearchClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';
import { SearchBox } from '@/components/Search/SearchBox';
import { SearchResults } from '@/components/Search/SearchResults';
import { Filters } from '@/components/Search/Filters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, FileText, MapPin, Users, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = React.useState('all');

  const searchClient = getAlgoliaSearchClient();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Search</h1>
        <p className="text-muted-foreground">
          Find disaster recovery services, contractors, and helpful guides
        </p>
      </div>

      {/* Search Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Locations</span>
            </TabsTrigger>
            <TabsTrigger value="contractors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Contractors</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* All Results Tab */}
        <TabsContent value="all">
          <AllResultsView initialQuery={initialQuery} searchClient={searchClient} />
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <SingleIndexView
            indexName={ALGOLIA_CONFIG.indices.content}
            indexType="content"
            initialQuery={initialQuery}
            searchClient={searchClient}
          />
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations">
          <SingleIndexView
            indexName={ALGOLIA_CONFIG.indices.locations}
            indexType="locations"
            initialQuery={initialQuery}
            searchClient={searchClient}
          />
        </TabsContent>

        {/* Contractors Tab */}
        <TabsContent value="contractors">
          <SingleIndexView
            indexName={ALGOLIA_CONFIG.indices.contractors}
            indexType="contractors"
            initialQuery={initialQuery}
            searchClient={searchClient}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * All Results View (searches all indices)
 */
function AllResultsView({
  initialQuery,
  searchClient,
}: {
  initialQuery: string;
  searchClient: any;
}) {
  return (
    <div className="space-y-8">
      {/* Content Results */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Articles & Guides</h2>
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_CONFIG.indices.content}
          initialUiState={{
            [ALGOLIA_CONFIG.indices.content]: {
              query: initialQuery,
            },
          }}
        >
          <div className="space-y-4">
            <SearchBox placeholder="Search articles and guides..." />
            <div className="flex items-center justify-between">
              <Stats
                translations={{
                  rootElementText({ nbHits, processingTimeMS }) {
                    return `${nbHits.toLocaleString()} results found in ${processingTimeMS}ms`;
                  },
                }}
              />
            </div>
            <SearchResults resultType="content" />
            <Configure hitsPerPage={5} />
          </div>
        </InstantSearch>
      </section>

      {/* Location Results */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Service Locations</h2>
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_CONFIG.indices.locations}
          initialUiState={{
            [ALGOLIA_CONFIG.indices.locations]: {
              query: initialQuery,
            },
          }}
        >
          <div className="space-y-4">
            <SearchBox placeholder="Search locations..." />
            <div className="flex items-center justify-between">
              <Stats
                translations={{
                  rootElementText({ nbHits, processingTimeMS }) {
                    return `${nbHits.toLocaleString()} results found in ${processingTimeMS}ms`;
                  },
                }}
              />
            </div>
            <SearchResults resultType="location" />
            <Configure hitsPerPage={5} />
          </div>
        </InstantSearch>
      </section>

      {/* Contractor Results */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Contractors</h2>
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_CONFIG.indices.contractors}
          initialUiState={{
            [ALGOLIA_CONFIG.indices.contractors]: {
              query: initialQuery,
            },
          }}
        >
          <div className="space-y-4">
            <SearchBox placeholder="Search contractors..." />
            <div className="flex items-center justify-between">
              <Stats
                translations={{
                  rootElementText({ nbHits, processingTimeMS }) {
                    return `${nbHits.toLocaleString()} results found in ${processingTimeMS}ms`;
                  },
                }}
              />
            </div>
            <SearchResults resultType="contractor" />
            <Configure hitsPerPage={5} />
          </div>
        </InstantSearch>
      </section>
    </div>
  );
}

/**
 * Single Index View (with filters)
 */
function SingleIndexView({
  indexName,
  indexType,
  initialQuery,
  searchClient,
}: {
  indexName: string;
  indexType: 'content' | 'locations' | 'contractors';
  initialQuery: string;
  searchClient: any;
}) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      initialUiState={{
        [indexName]: {
          query: initialQuery,
        },
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <Filters indexType={indexType} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="space-y-4">
            {/* Search Box */}
            <SearchBox placeholder={`Search ${indexType}...`} />

            {/* Stats and Mobile Filters */}
            <div className="flex items-center justify-between">
              <Stats
                translations={{
                  rootElementText({ nbHits, processingTimeMS }) {
                    return `${nbHits.toLocaleString()} results found in ${processingTimeMS}ms`;
                  },
                }}
              />

              {/* Mobile Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <Filters indexType={indexType} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results */}
            <SearchResults resultType={indexType} />

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                padding={2}
                showFirst={false}
                showLast={false}
                classNames={{
                  root: 'flex items-center gap-2',
                  list: 'flex items-center gap-2',
                  item: 'min-w-[40px] h-10',
                  link: 'w-full h-full flex items-center justify-center rounded-md border hover:bg-accent',
                  selectedItem: 'bg-primary text-primary-foreground',
                  disabledItem: 'opacity-50 cursor-not-allowed',
                }}
              />
            </div>
          </div>

          <Configure hitsPerPage={20} />
        </main>
      </div>
    </InstantSearch>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
