import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilterValues } from '../types';
import type { ReactNode } from 'react';

interface SearchContextType {
  searchText: string;
  filters: FilterValues;
  setSearchText: (text: string) => void;
  setFilters: (filters: FilterValues) => void;
  performSearch: (overrideFilters?: FilterValues, overrideText?: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean; // Asegurar que esto esté definido
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterValues>({
    countryId: null,
    industryId: null,
    injusticeId: null,
    orderById: null,
  });
  const navigate = useNavigate();

  const performSearch = (overrideFilters?: FilterValues, overrideText?: string) => {
    const activeFilters = overrideFilters ?? filters;
    const activeText = overrideText ?? searchText;
    
    const params = new URLSearchParams();
    
    if (activeText.trim()) {
      params.set('q', activeText.trim());
    }
    if (activeFilters.countryId) {
      params.set('countryId', activeFilters.countryId.toString());
    }
    if (activeFilters.industryId) {
      params.set('industryId', activeFilters.industryId.toString());
    }
    if (activeFilters.injusticeId) {
      params.set('injusticeId', activeFilters.injusticeId.toString());
    }
    if (activeFilters.orderById) {
      params.set('orderById', activeFilters.orderById.toString());
    }
    
    navigate(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      countryId: null,
      industryId: null,
      injusticeId: null,
      orderById: null,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== null);

  return (
    <SearchContext.Provider value={{
      searchText,
      filters,
      setSearchText,
      setFilters,
      performSearch,
      clearFilters,
      hasActiveFilters, // Asegurar que esto esté incluido
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};