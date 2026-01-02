'use client';

/**
 * Search Filters Component
 *
 * Faceted filtering for Algolia search results
 * Supports multiple filter types (checkboxes, ranges, toggles)
 */

import React from 'react';
import {
  useRefinementList,
  UseRefinementListProps,
  useRange,
  UseRangeProps,
  useToggleRefinement,
  UseToggleRefinementProps,
} from 'react-instantsearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Refinement List Filter (Checkboxes)
 */
interface RefinementListFilterProps extends UseRefinementListProps {
  title: string;
  limit?: number;
  showCount?: boolean;
  searchable?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function RefinementListFilter({
  title,
  limit = 10,
  showCount = true,
  collapsible = true,
  defaultCollapsed = false,
  ...props
}: RefinementListFilterProps) {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList({
      ...props,
      limit,
      showMore: true,
      showMoreLimit: 50,
    });
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  if (items.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        className={collapsible ? 'cursor-pointer' : ''}
        onClick={() => collapsible && setCollapsed(!collapsed)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {collapsible && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              {collapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      {!collapsed && (
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${props.attribute}-${item.value}`}
                  checked={item.isRefined}
                  onCheckedChange={() => refine(item.value)}
                />
                <Label
                  htmlFor={`${props.attribute}-${item.value}`}
                  className="flex-1 flex items-center justify-between cursor-pointer"
                >
                  <span className={item.isRefined ? 'font-medium' : ''}>
                    {item.label}
                  </span>
                  {showCount && (
                    <Badge variant="secondary" className="ml-2">
                      {item.count}
                    </Badge>
                  )}
                </Label>
              </div>
            ))}
            {canToggleShowMore && (
              <Button
                variant="link"
                size="sm"
                onClick={toggleShowMore}
                className="w-full"
              >
                {isShowingMore ? 'Show less' : 'Show more'}
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Range Filter (Slider)
 */
interface RangeFilterProps extends UseRangeProps {
  title: string;
  unit?: string;
  step?: number;
}

export function RangeFilter({ title, unit = '', step = 1, ...props }: RangeFilterProps) {
  const { range, refine, start } = useRange(props);

  if (!range.min || !range.max) {
    return null;
  }

  const handleChange = (values: number[]) => {
    refine([values[0], values[1]]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Slider
            min={range.min}
            max={range.max}
            step={step}
            value={[start[0] ?? range.min, start[1] ?? range.max]}
            onValueChange={handleChange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {start[0] ?? range.min}
              {unit}
            </span>
            <span>
              {start[1] ?? range.max}
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Toggle Filter (Switch)
 */
interface ToggleFilterProps extends UseToggleRefinementProps {
  title: string;
  description?: string;
}

export function ToggleFilter({ title, description, ...props }: ToggleFilterProps) {
  const { value, refine } = useToggleRefinement(props);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label htmlFor={props.attribute} className="cursor-pointer">
              {title}
            </Label>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <Switch
            id={props.attribute}
            checked={value.isRefined}
            onCheckedChange={() => refine(value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Combined Filters Component
 */
interface FiltersProps {
  indexType: 'content' | 'locations' | 'contractors';
  className?: string;
}

export function Filters({ indexType, className = '' }: FiltersProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Content Filters */}
      {indexType === 'content' && (
        <>
          <RefinementListFilter
            attribute="category"
            title="Category"
            limit={8}
          />
          <RefinementListFilter
            attribute="disasterType"
            title="Disaster Type"
            limit={8}
          />
          <RefinementListFilter
            attribute="contentType"
            title="Content Type"
            limit={5}
          />
          <RefinementListFilter
            attribute="tags"
            title="Tags"
            limit={10}
          />
        </>
      )}

      {/* Location Filters */}
      {indexType === 'locations' && (
        <>
          <RefinementListFilter
            attribute="state"
            title="State"
            limit={8}
          />
          <RefinementListFilter
            attribute="serviceType"
            title="Service Type"
            limit={8}
          />
          <RefinementListFilter
            attribute="disasterType"
            title="Disaster Type"
            limit={8}
          />
          <ToggleFilter
            attribute="emergencyAvailable"
            title="24/7 Emergency Available"
            description="Only show locations with emergency services"
          />
          <RangeFilter
            attribute="averageRating"
            title="Minimum Rating"
            unit=" stars"
            step={0.1}
          />
        </>
      )}

      {/* Contractor Filters */}
      {indexType === 'contractors' && (
        <>
          <RefinementListFilter
            attribute="state"
            title="State"
            limit={8}
          />
          <RefinementListFilter
            attribute="serviceTypes"
            title="Services Offered"
            limit={10}
          />
          <RefinementListFilter
            attribute="certifications"
            title="Certifications"
            limit={8}
          />
          <ToggleFilter
            attribute="emergencyAvailable"
            title="24/7 Emergency Available"
            description="Only show contractors available 24/7"
          />
          <ToggleFilter
            attribute="verified"
            title="Verified Contractors Only"
            description="Show only verified contractors"
          />
          <RangeFilter
            attribute="rating"
            title="Minimum Rating"
            unit=" stars"
            step={0.1}
          />
          <RangeFilter
            attribute="yearsInBusiness"
            title="Years in Business"
            unit=" years"
            step={1}
          />
        </>
      )}
    </div>
  );
}
