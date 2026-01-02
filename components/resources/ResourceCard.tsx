/**
 * ResourceCard Component
 *
 * Displays individual resource cards with:
 * - Thumbnail image
 * - Category badge
 * - Content type indicator
 * - Reading time
 * - Download indicator
 * - Author information
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Clock,
  Download,
  FileText,
  Video,
  Headphones,
  CheckSquare,
  Wrench,
  Eye,
  TrendingUp
} from 'lucide-react';
import { Resource, ContentType } from '@/lib/resources/types';
import { RESOURCE_CATEGORIES } from '@/lib/resources/data';

interface ResourceCardProps {
  resource: Resource;
  className?: string;
  showAuthor?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const CONTENT_TYPE_ICONS: Record<ContentType, React.ElementType> = {
  article: FileText,
  guide: FileText,
  video: Video,
  podcast: Headphones,
  checklist: CheckSquare,
  tool: Wrench,
};

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  article: 'Article',
  guide: 'Guide',
  video: 'Video',
  podcast: 'Podcast',
  checklist: 'Checklist',
  tool: 'Tool',
};

export function ResourceCard({
  resource,
  className,
  showAuthor = true,
  variant = 'default',
}: ResourceCardProps) {
  const category = RESOURCE_CATEGORIES[resource.category];
  const ContentTypeIcon = CONTENT_TYPE_ICONS[resource.contentType];

  const href = `/resources/${resource.category}/${resource.slug}`;

  if (variant === 'compact') {
    return (
      <Link href={href} className={cn('group', className)}>
        <div className="flex gap-4 p-4 rounded-lg border hover:border-dr-education transition-all hover:shadow-md">
          {/* Thumbnail */}
          {resource.thumbnailUrl && (
            <div className="flex-shrink-0">
              <img
                src={resource.thumbnailUrl}
                alt={resource.title}
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold line-clamp-2 group-hover:text-dr-education transition-colors">
                {resource.title}
              </h4>
              {resource.downloadable && (
                <Download className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {resource.excerpt}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ContentTypeIcon className="h-3 w-3" />
              <span>{CONTENT_TYPE_LABELS[resource.contentType]}</span>
              {resource.readingTime && (
                <>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{resource.readingTime} min</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={href} className={cn('group', className)}>
        <Card className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-dr-education">
          {/* Featured Image */}
          {resource.featuredImageUrl && (
            <div className="relative h-64 overflow-hidden">
              <img
                src={resource.featuredImageUrl}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className={cn('bg-gradient-to-r', category.gradient, 'text-white border-0')}>
                  {category.name}
                </Badge>
                {resource.featured && (
                  <Badge variant="secondary" className="bg-amber-500 text-white border-0">
                    Featured
                  </Badge>
                )}
                {resource.trending && (
                  <Badge variant="secondary" className="bg-green-500 text-white border-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              {/* Download indicator */}
              {resource.downloadable && (
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Download className="h-5 w-5 text-dr-education" />
                  </div>
                </div>
              )}
            </div>
          )}

          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ContentTypeIcon className="h-4 w-4" />
                <span>{CONTENT_TYPE_LABELS[resource.contentType]}</span>
              </div>
              {resource.readingTime && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{resource.readingTime} min</span>
                </div>
              )}
            </div>

            <CardTitle className="group-hover:text-dr-education transition-colors">
              {resource.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {resource.description}
            </CardDescription>
          </CardHeader>

          {showAuthor && (
            <CardContent>
              <div className="flex items-center gap-3 pt-4 border-t">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={resource.author.avatarUrl} alt={resource.author.name} />
                  <AvatarFallback>{resource.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{resource.author.name}</p>
                  {resource.author.title && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {resource.author.title}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={href} className={cn('group', className)}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all hover:border-dr-education">
        {/* Thumbnail */}
        {resource.thumbnailUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={resource.thumbnailUrl}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <Badge className={cn('bg-gradient-to-r', category.gradient, 'text-white border-0')}>
                {category.name}
              </Badge>
            </div>

            {/* Download indicator */}
            {resource.downloadable && (
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Download className="h-4 w-4 text-dr-education" />
                </div>
              </div>
            )}

            {/* Trending/Featured indicators */}
            {(resource.trending || resource.featured) && (
              <div className="absolute bottom-3 right-3 flex gap-2">
                {resource.trending && (
                  <Badge variant="secondary" className="bg-green-500 text-white border-0">
                    <TrendingUp className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}

        <CardHeader>
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <ContentTypeIcon className="h-4 w-4" />
            <span>{CONTENT_TYPE_LABELS[resource.contentType]}</span>
            {resource.readingTime && (
              <>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{resource.readingTime} min</span>
              </>
            )}
          </div>

          <CardTitle className="line-clamp-2 group-hover:text-dr-education transition-colors">
            {resource.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {resource.excerpt}
          </CardDescription>
        </CardHeader>

        {showAuthor && (
          <CardContent>
            <div className="flex items-center gap-3 pt-4 border-t">
              <Avatar className="h-8 w-8">
                <AvatarImage src={resource.author.avatarUrl} alt={resource.author.name} />
                <AvatarFallback>{resource.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{resource.author.name}</p>
                {resource.author.credentials && resource.author.credentials.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {resource.author.credentials.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* View count */}
            {resource.viewCount && (
              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{resource.viewCount.toLocaleString()} views</span>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
