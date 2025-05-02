import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  XCircle,
  X,
  Sparkles,
  Star, // Keep Star if used somewhere else, otherwise remove
  History,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar'; // Assuming SearchBar exposes its input ref
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import {
    SearchHistoryEntry,
    loadSearchHistory,
    addSearchHistoryEntry,
    removeSearchHistoryEntry,
    clearAllSearchHistory,
} from '../lib/searchHistoryUtils'; // Adjust path if needed

// Product interface remains the same
interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
}

// Ref type for SearchBar's input (if SearchBar uses forwardRef)
// If SearchBar doesn't expose its ref, we might need to pass a ref prop differently
// or manage blur differently. For now, assuming SearchBar can be accessed.
// We'll primarily use the searchBarRef for the container though.
const searchBarInputRef = React.createRef<HTMLInputElement>();

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef<HTMLDivElement>(null); // Renamed from searchBarRef for clarity
  const resultsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimer = useRef<NodeJS.Timeout>();
  const isMounted = useRef(false);

  // === State ===
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [instantMatchProducts, setInstantMatchProducts] = useState<Product[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSort, setActiveSort] = useState<'price' | 'rating' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // === Effects ===

  // Load history on mount
  useEffect(() => {
    setSearchHistory(loadSearchHistory());
  }, []);

  // Sync URL query -> state on initial load or external navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (!isMounted.current) { // Only run fully on initial mount or if URL truly changes externally
      if (q !== searchQuery || q !== debouncedSearchQuery) {
          setSearchQuery(q);
          setDebouncedSearchQuery(q); // Trigger search based on initial URL
      }
      isMounted.current = true;
    } else {
       // On subsequent navigations (e.g., browser back/forward)
       if (q !== debouncedSearchQuery) {
           setSearchQuery(q);
           setDebouncedSearchQuery(q);
       }
    }
  }, [location.search]); // Re-run if URL search params change

  // Update URL when debounced search query changes (initiated by user)
  useEffect(() => {
      // Only run after mount and if debounced query has actually changed
      if (isMounted.current) {
          const currentUrlQuery = new URLSearchParams(location.search).get('q') || '';
          if (debouncedSearchQuery && debouncedSearchQuery !== currentUrlQuery) {
              navigate(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`, { replace: true });
          } else if (!debouncedSearchQuery && currentUrlQuery) {
              // If search is cleared, remove query from URL
              navigate('/search', { replace: true });
          }
      }
  }, [debouncedSearchQuery, navigate]); // Run only when debounced query changes


  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistedProducts));
  }, [wishlistedProducts]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the main search container AND outside the dropdown
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    // Use mousedown to catch before potential blur events interfere
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array

  // Debounce search input
  const handleSearchInput = useCallback((query: string) => {
    setSearchQuery(query);
    if (!showSuggestions) { // Only show suggestions if not already shown
      setShowSuggestions(true);
    }

    if (searchTimer.current) clearTimeout(searchTimer.current);
    setIsLoading(true);

    searchTimer.current = setTimeout(() => {
      setDebouncedSearchQuery(query);
    }, 350);
  }, [showSuggestions]); // Dependency added

  // Update instant matches based on immediate input (only when suggestions are shown)
  useEffect(() => {
      const clean = searchQuery.trim().toLowerCase();
      if (clean && showSuggestions) {
          const terms = clean.split(/\s+/);
          const matches = products.filter((p) =>
              terms.some(
                  (t) =>
                      p.name.toLowerCase().includes(t) ||
                      p.category.toLowerCase().includes(t)
              )
          ).slice(0, 3);
          setInstantMatchProducts(matches);
      } else {
          // Clear matches if query is empty OR suggestions are hidden
          setInstantMatchProducts([]);
      }
  }, [searchQuery, showSuggestions]); // React to input and visibility

  // --- Core Search Logic (Memoized) ---
  const performSearch = useCallback((query: string) => {
    setIsLoading(true);
    const cleanQuery = query.trim().toLowerCase();
    let results = products;

    if (cleanQuery) {
        const terms = cleanQuery.split(/\s+/);
        results = products.filter((p) =>
            terms.some(
                (t) =>
                    p.name.toLowerCase().includes(t) ||
                    p.category.toLowerCase().includes(t)
            )
        );
        if (results.length > 0) {
            setSearchHistory(prevHistory => addSearchHistoryEntry(prevHistory, cleanQuery));
        }
    } else {
        results = products; // Show all if query is empty
    }

    // Apply sorting
    if (activeSort) {
        const mod = sortDirection === 'asc' ? 1 : -1;
        results = [...results].sort((a, b) => {
            const comparison = (a[activeSort] - b[activeSort]) * mod;
            return comparison === 0 ? a.id.localeCompare(b.id) : comparison;
        });
    }

    setFilteredProducts(results);
    setIsLoading(false);
  }, [activeSort, sortDirection]); // Dependencies: only sorting state

  // Trigger search when debounced query or sort changes
  useEffect(() => {
    // Check isMounted to avoid running on initial render with potentially empty debouncedQuery
    if(isMounted.current || debouncedSearchQuery) {
        performSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, activeSort, sortDirection, performSearch]);

  // --- Event Handlers (Memoized) ---

  const handleSort = useCallback((type: 'price' | 'rating') => {
    setActiveSort(currentSort => {
        if (currentSort === type) {
            setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'));
            return currentSort;
        } else {
            setSortDirection('asc');
            return type;
        }
    });
  }, []);

  // Handle clicking any suggestion (product, history, trending, tip)
  const handleSuggestionClick = useCallback((term: string) => {
    setSearchQuery(term);
    setDebouncedSearchQuery(term); // Trigger search immediately
    setShowSuggestions(false);    // <<< Explicitly hide suggestions

    // Try to blur the input associated with the SearchBar
    // This assumes SearchBar internally manages its input focus state or we have a ref
    const inputElement = searchContainerRef.current?.querySelector('input');
    inputElement?.blur(); // Directly blur the input if found

    // Scroll to results after state updates might have caused re-render
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []); // No external dependencies needed here

  const handleRemoveHistoryItem = useCallback((timestamp: number) => {
      setSearchHistory(prevHistory => removeSearchHistoryEntry(prevHistory, timestamp));
  }, []);

  const handleClearHistory = useCallback(() => {
      setSearchHistory(clearAllSearchHistory());
  }, []);

  const handleResetSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setActiveSort(null);
    setSortDirection('asc');
    handleClearHistory();
    setShowSuggestions(false);

    const inputElement = searchContainerRef.current?.querySelector('input');
    inputElement?.blur(); // Blur input on reset

    navigate('/search', { replace: true });
    // Scroll to top only if not already there
    if (window.scrollY !== 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [navigate, handleClearHistory]);

  // --- Suggestion Generators ---
  const getTrendingSuggestions = () => ["Wide Angle Lens", "Mirrorless Camera", "Camera Backpack", "Used DSLR", "Lens Filter Kit"].slice(0, 5);
  const getSearchTips = () => ['DSLR lenses', 'Wide angle', 'Macro', '4K', 'Used Gear'].slice(0, 5);

  // --- Render ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col bg-background"
    >
      <Navbar /> {/* Assumes Navbar is sticky or handled independently */}

      {/* Search Header Area - NOT STICKY */}
      <div
        // Removed sticky, top-*, z-40, gradient/blur classes
        className="bg-background py-4 sm:py-6 border-b border-muted/20" // Simple background, padding, bottom border
        ref={searchContainerRef} // Ref points to the container of SearchBar
      >
        <div className="container mx-auto px-3 sm:px-4 relative">
          <SearchBar
            // Pass ref if SearchBar uses forwardRef and needs it
            // ref={searchBarInputRef}
            value={searchQuery}
            onChange={handleSearchInput}
            onSearch={handleSuggestionClick} // Submit triggers same logic as suggestion click
            onFocus={() => setShowSuggestions(true)}
            // onBlur is handled internally in SearchBar and via click-outside
          />

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                // Added max-w-3xl and mx-auto to match SearchBar width if needed
                className="absolute top-full left-0 right-0 w-full max-w-3xl mx-auto bg-background dark:bg-zinc-800 shadow-xl z-50 rounded-xl mt-2 border border-muted/50 overflow-hidden"
              >
                {/* Dropdown Content Sections */}
                {/* Instant Matches */}
                {searchQuery.trim() && instantMatchProducts.length > 0 && (
                  <div className="p-3 border-b border-muted/30">
                     <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                        Instant Matches
                      </h3>
                      <div className="flex flex-col gap-1">
                        {instantMatchProducts.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSuggestionClick(product.name)} // Uses the handler
                            className="flex items-center gap-3 p-2 hover:bg-accent/10 dark:hover:bg-accent/20 rounded-lg transition-colors text-left w-full"
                          >
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md flex-shrink-0 border border-muted/20" />
                            <div className="flex-1 overflow-hidden">
                              <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                              <span className="text-xs text-primary">${product.price}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                  </div>
                )}

                {/* Combined History & Trending */}
                <div className={`grid ${searchHistory.length > 0 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-x-4 p-3`}> {/* Adjust grid if no history */}
                    {/* Search History */}
                    {searchHistory.length > 0 && (
                     <div className="mb-3 md:mb-0">
                         <div className="flex items-center justify-between mb-1.5 px-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                                <History className="w-3.5 h-3.5 mr-1.5" /> Recent
                            </h3>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleClearHistory(); }} // Stop propagation optional here
                                className="text-xs text-muted-foreground hover:text-destructive transition-colors px-1 py-0.5 rounded hover:bg-destructive/10"
                            > Clear </button>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            {searchHistory.map((entry) => (
                                <div key={entry.timestamp} className="group flex items-center justify-between hover:bg-accent/10 dark:hover:bg-accent/20 rounded-md text-sm">
                                    <button
                                        onClick={() => handleSuggestionClick(entry.query)} // Uses the handler
                                        className="flex-1 text-left text-foreground truncate px-2 py-1.5"
                                        title={entry.query}
                                    > {entry.query} </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleRemoveHistoryItem(entry.timestamp); }}
                                        aria-label={`Remove ${entry.query} from history`}
                                        className="ml-2 mr-1 p-1 text-muted-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-destructive rounded-full hover:bg-destructive/10 transition-all"
                                    > <X className="w-3.5 h-3.5" /> </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}

                  {/* Trending Searches */}
                  {/* Ensure this div takes full width if history is absent */}
                  <div className={searchHistory.length === 0 ? 'col-span-1' : ''}>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center mb-1.5 px-2">
                        <TrendingUp className="w-3.5 h-3.5 mr-1.5" /> Trending
                    </h3>
                    <div className="flex flex-col gap-0.5">
                        {getTrendingSuggestions().map((term, idx) => (
                            <button
                                key={`trend-${idx}`}
                                onClick={() => handleSuggestionClick(term)} // Uses the handler
                                className="w-full p-1.5 px-2 text-sm text-left text-foreground hover:bg-accent/10 dark:hover:bg-accent/20 rounded-md transition-colors truncate"
                            > {term} </button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Search Tips Footer */}
                <div className="p-3 bg-muted/20 dark:bg-zinc-900/30 border-t border-muted/30">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <span className="flex items-center text-xs text-muted-foreground mr-1 shrink-0">
                          <Sparkles className="w-3.5 h-3.5 mr-1 text-accent" /> Try:
                      </span>
                      {getSearchTips().map((tip) => (
                          <button
                              key={tip}
                              onClick={() => handleSuggestionClick(tip)} // Uses the handler
                              className="px-2.5 py-0.5 text-xs bg-background dark:bg-zinc-700 border border-muted/40 rounded-full hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap"
                          > {tip} </button>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        ref={resultsRef}
        className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 flex-grow relative"
      >
        {/* Loading state and results rendering (same as before) */}
        <FilterBar
          activeSort={activeSort}
          sortDirection={sortDirection}
          onSort={handleSort}
          resultCount={filteredProducts.length}
          searchQuery={debouncedSearchQuery}
          onReset={handleResetSearch}
        />

        {!isLoading && filteredProducts.length > 0 && (
          <ProductGrid
            products={filteredProducts}
            wishlistedProducts={wishlistedProducts}
            onWishlistToggle={(id: string) =>
              setWishlistedProducts((prev) =>
                prev.includes(id)
                  ? prev.filter((pid) => pid !== id)
                  : [...prev, id]
              )
            }
          />
        )}
        {!isLoading && filteredProducts.length === 0 && debouncedSearchQuery && (
           <motion.div /* No Results Message */ >
            {/* ... */}
           </motion.div>
        )}
        {!isLoading && !debouncedSearchQuery && ( // Show initial placeholder if no query
            <div className="text-center py-16 sm:py-24 text-muted-foreground">
                Use the search bar above to find cameras, lenses, and more.
            </div>
         )}
      </div>

      <Footer />
    </motion.div>
  );
};

export default Search;

// Make sure ProductGrid receives its props correctly in the actual render:
// <ProductGrid
//   products={filteredProducts}
//   wishlistedProducts={wishlistedProducts}
//   onWishlistToggle={(id) =>
//     setWishlistedProducts((prev) =>
//       prev.includes(id)
//         ? prev.filter((pid) => pid !== id)
//         : [...prev, id]
//     )
//   }
// />