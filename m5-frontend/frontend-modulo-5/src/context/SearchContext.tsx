import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilterValues } from '../types';
import type { ReactNode } from 'react';

interface SearchContextType {
  searchText: string;
  filters: FilterValues;
  setSearchText: (text: string) => void;
  setFilters: (filters: FilterValues) => void;
  performSearch: () => void;
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

  const performSearch = () => {
    const params = new URLSearchParams();
    
    if (searchText.trim()) {
      params.set('q', searchText.trim());
    }
    
    if (filters.countryId) {
      params.set('countryId', filters.countryId.toString());
    }
    if (filters.industryId) {
      params.set('industryId', filters.industryId.toString());
    }
    if (filters.injusticeId) {
      params.set('injusticeId', filters.injusticeId.toString());
    }
    if (filters.orderById) {
      params.set('orderById', filters.orderById.toString());
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