'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';

/**
 * SearchBar Component
 *
 * Advanced search input with suggestions, history, and filtering
 */
export function SearchBar() {
  const { query, suggestions, isLoadingSuggestions, handleQueryChange, clearResults } = useSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when dropdown opens or suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [showSuggestions, suggestions]);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key regardless of suggestions visibility
    if (e.key === 'Enter') {
      if (showSuggestions && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        e.preventDefault();
        handleQueryChange(suggestions[highlightedIndex].text);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
      // If no highlight, allow default behavior (form submission)
      return;
    }

    // Handle Escape key to close dropdown and reset highlight
    if (e.key === 'Escape') {
      if (showSuggestions) {
        e.preventDefault();
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
      return;
    }

    // Handle Tab key to close dropdown (allow natural tab behavior)
    if (e.key === 'Tab') {
      if (showSuggestions) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
      // Don't prevent default - allow natural tab navigation
      return;
    }

    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
    }
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            handleQueryChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search messages, users, rooms..."
          className="flex-1 outline-none text-sm"
          autoComplete="off"
          role="combobox"
          aria-label="Search messages, users, and rooms"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="search-suggestions-listbox"
          aria-activedescendant={highlightedIndex >= 0 ? `search-suggestion-${highlightedIndex}` : undefined}
        />

        {query && (
          <button
            onClick={() => {
              clearResults();
              setShowSuggestions(false);
            }}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Visually hidden live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {showSuggestions && isLoadingSuggestions
          ? 'Loading suggestions'
          : showSuggestions && suggestions.length > 0
            ? `${suggestions.length} suggestion${suggestions.length === 1 ? '' : 's'} available`
            : ''
        }
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (isLoadingSuggestions || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {isLoadingSuggestions && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              Loading suggestions...
            </div>
          )}

          {suggestions.length > 0 && (
            <ul
              className="py-2"
              role="listbox"
              id="search-suggestions-listbox"
              aria-busy={isLoadingSuggestions}
            >
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  id={`search-suggestion-${idx}`}
                  role="option"
                  aria-selected={idx === highlightedIndex}
                  onClick={() => {
                    handleQueryChange(suggestion.text);
                    setShowSuggestions(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm ${
                    idx === highlightedIndex ? 'bg-gray-100' : ''
                  }`}
                >
                  {suggestion.type === 'recent' && (
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                    </svg>
                  )}
                  {suggestion.type === 'user' && (
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  )}
                  {suggestion.type === 'room' && (
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM2 6v8h16V6H2z" />
                    </svg>
                  )}
                  <span>{suggestion.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
