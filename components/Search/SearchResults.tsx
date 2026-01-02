'use client';

/**
 * SearchResults Component
 *
 * Displays search results from Algolia with highlighting
 * Supports multiple result types (content, locations, contractors)
 */

import React from 'react';
import { useHits, UseHitsProps, Highlight } from 'react-instantsearch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import type {
  AlgoliaContentRecord,
  AlgoliaLocationRecord,
  AlgoliaContractorRecord,
} from '@/lib/algolia/types';

type SearchResultType = 'content' | 'location' | 'contractor';

interface SearchResultsProps extends UseHitsProps {
  resultType: SearchResultType;
  className?: string;
}

export function SearchResults({ resultType, className = '', ...props }: SearchResultsProps) {
  const { hits } = useHits(props);

  if (hits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No results found</p>
        <p className="text-muted-foreground text-sm mt-2">
          Try adjusting your search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {hits.map((hit) => {
        switch (resultType) {
          case 'content':
            return <ContentResult key={hit.objectID} hit={hit as any} />;
          case 'location':
            return <LocationResult key={hit.objectID} hit={hit as any} />;
          case 'contractor':
            return <ContractorResult key={hit.objectID} hit={hit as any} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

/**
 * Content Result Card
 */
function ContentResult({ hit }: { hit: AlgoliaContentRecord & { _highlightResult: any } }) {
  return (
    <Link href={hit.url}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">
                <Highlight attribute="title" hit={hit} />
              </CardTitle>
              <CardDescription>
                <Highlight attribute="description" hit={hit} />
              </CardDescription>
            </div>
            {hit.imageUrl && (
              <img
                src={hit.imageUrl}
                alt={hit.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary">{hit.category}</Badge>
            <Badge variant="outline">{hit.contentType}</Badge>
            {hit.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {hit.author && (
              <span className="flex items-center gap-1">
                By {hit.author}
              </span>
            )}
            {hit.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(hit.publishedAt).toLocaleDateString()}
              </span>
            )}
            {hit.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {hit.readingTime} min read
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Location Result Card
 */
function LocationResult({ hit }: { hit: AlgoliaLocationRecord & { _highlightResult: any } }) {
  return (
    <Link href={hit.url}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl">
            <Highlight attribute="title" hit={hit} />
          </CardTitle>
          <CardDescription>
            <Highlight attribute="description" hit={hit} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              {hit.cityName}, {hit.stateName}
            </span>
            {hit.emergencyAvailable && (
              <Badge variant="destructive">24/7 Emergency</Badge>
            )}
            {hit.averageRating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {hit.averageRating.toFixed(1)}
              </span>
            )}
            <span className="text-muted-foreground">
              {hit.contractorCount} contractors available
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Contractor Result Card
 */
function ContractorResult({ hit }: { hit: AlgoliaContractorRecord & { _highlightResult: any } }) {
  return (
    <Link href={hit.url}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start gap-4">
            {hit.logoUrl && (
              <img
                src={hit.logoUrl}
                alt={hit.businessName}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl">
                  <Highlight attribute="businessName" hit={hit} />
                </CardTitle>
                {hit.verified && (
                  <Shield className="h-5 w-5 text-green-600" title="Verified Contractor" />
                )}
              </div>
              <CardDescription>
                <Highlight attribute="description" hit={hit} />
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {hit.serviceTypes.slice(0, 3).map((service) => (
              <Badge key={service} variant="secondary">
                {service.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {hit.location}
            </span>
            {hit.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {hit.rating.toFixed(1)} ({hit.reviewCount} reviews)
              </span>
            )}
            {hit.emergencyAvailable && (
              <Badge variant="destructive" className="ml-auto">
                24/7 Emergency
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <span>{hit.jobsCompleted} jobs completed</span>
            {hit.yearsInBusiness > 0 && (
              <span>{hit.yearsInBusiness} years in business</span>
            )}
            <span>Avg response: {Math.round(hit.responseTime / 60)}h</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
