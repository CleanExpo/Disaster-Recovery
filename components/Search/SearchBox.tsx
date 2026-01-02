'use client';

/**
 * SearchBox Component
 *
 * Algolia-powered search box with autocomplete
 * Can be used in header, search page, or anywhere else
 */

import React from 'react';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBoxProps extends UseSearchBoxProps {
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  autoFocus?: boolean;
  onSubmit?: (query: string) => void;
}

export function SearchBox({
  placeholder = 'Search for services, locations, or guides...',
  className = '',
  showClearButton = true,
  autoFocus = false,
  onSubmit,
  ...props
}: SearchBoxProps) {
  const { query, refine, clear } = useSearchBox(props);
  const [localQuery, setLocalQuery] = React.useState(query);

  // Sync local state with Algolia state
  React.useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);
    refine(newQuery);
  };

  const handleClear = () => {
    setLocalQuery('');
    clear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(localQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          value={localQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {showClearButton && localQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}
