import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterBarProps {
  activeSort: 'price' | 'rating' | null;
  sortDirection: 'asc' | 'desc';
  resultCount: number;
  searchQuery: string;
  onSort: (type: 'price' | 'rating') => void;
  onReset: () => void;
}

const FilterBar = ({ 
  activeSort, 
  sortDirection,
  resultCount, 
  searchQuery,
  onSort,
  onReset
}: FilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">
        {searchQuery && (
          <p className="text-accent/80 font-medium">
            Found {resultCount} results for "{searchQuery}"
          </p>
        )}
        {(activeSort || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-accent/60 hover:text-accent/90 gap-1"
          >
            <X size={16} />
            Reset filters
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
        <span className="text-sm whitespace-nowrap text-accent/80 font-medium">Sort by:</span>
        <Badge 
          variant={activeSort === 'price' ? "default" : "outline"}
          className={`cursor-pointer whitespace-nowrap gap-1 ${
            activeSort === 'price' ? 'bg-theme-primary' : 'hover:bg-theme-primary/10'
          }`}
          onClick={() => onSort('price')}
        >
          Price {activeSort === 'price' && `(${sortDirection === 'asc' ? 'Low to High' : 'High to Low'})`}
          {activeSort === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Badge>
        <Badge 
          variant={activeSort === 'rating' ? "default" : "outline"}
          className={`cursor-pointer whitespace-nowrap gap-1 ${
            activeSort === 'rating' ? 'bg-theme-primary' : 'hover:bg-theme-primary/10'
          }`}
          onClick={() => onSort('rating')}
        >
          Rating {activeSort === 'rating' && `(${sortDirection === 'asc' ? 'Low to High' : 'High to Low'})`}
          {activeSort === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
        </Badge>
      </div>
    </div>
  );
};

export default FilterBar;