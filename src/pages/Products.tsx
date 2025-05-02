
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Filter, FilterX } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import ProductCarousel from '../components/ProductCarousel';
import EnhancedFilter from '../components/EnhancedFilter';
import { products, filterOptions, featuredProducts } from '../data/products';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  const searchQuery = searchParams.get('q') || '';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Setup filters
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
    priceRange: [0, 200] as number[]
  });

  // Show filters by default on desktop
  useEffect(() => {
    setIsFilterOpen(!isMobile);
  }, [isMobile]);
  
  // Filter products based on search query and active filters
  useEffect(() => {
    let result = products;
    
    // Apply search filter if query exists
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      result = result.filter(product => 
        activeFilters.brands.includes(product.brand.toLowerCase().replace(' ', '-'))
      );
    }
    
    // Apply color filter
    if (activeFilters.colors.length > 0) {
      result = result.filter(product => 
        product.color && activeFilters.colors.includes(product.color)
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= activeFilters.priceRange[0] && 
      product.price <= activeFilters.priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [searchQuery, activeFilters]);
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };
  
  const handleWishlistToggle = (id: string) => {
    setWishlistedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };
  
  // Reset all filters and show all products
  const handleViewAllProducts = () => {
    setActiveFilters({
      categories: [],
      brands: [],
      colors: [],
      priceRange: [0, 200]
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-secondary/10 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      
      <div className="pt-16 sm:pt-20 pb-6 sm:pb-16">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4 sm:mb-8 md:mb-12"
          >
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-theme-accent mb-1 sm:mb-2">Our Products</h1>
            <p className="text-theme-accent/70 max-w-2xl mx-auto px-3 sm:px-4 text-xs sm:text-base">
              Browse our collection of premium contact lenses and accessories designed for comfort and style
            </p>
          </motion.div>
          
          {/* Mobile Filter Toggle Button */}
          {isMobile && (
            <Button
              onClick={toggleFilter}
              variant={isFilterOpen ? "default" : "outline"}
              className="w-full mb-3 flex items-center justify-center gap-2 py-1.5"
              size="sm"
            >
              {isFilterOpen ? <FilterX size={16} /> : <Filter size={16} />}
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          )}
          
          <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Filter Section */}
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-secondary/20 mb-3 sm:mb-6"
              >
                <EnhancedFilter 
                  categories={filterOptions.categories}
                  brands={filterOptions.brands}
                  colors={filterOptions.colors}
                  onFilterChange={handleFilterChange}
                />
              </motion.div>
            )}
            
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ProductGrid 
                  products={filteredProducts}
                  searchQuery={searchQuery}
                  wishlistedProducts={wishlistedProducts}
                  onWishlistToggle={handleWishlistToggle}
                  onViewAllProducts={handleViewAllProducts}
                />
              </motion.div>
            </div>
          </motion.div>
          
          {filteredProducts.length > 0 && (
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
              <ProductCarousel
                title="You May Also Like"
                subtitle="Discover more products that match your style"
                products={featuredProducts.filter(p => !wishlistedProducts.includes(p.id))}
                onWishlistToggle={handleWishlistToggle}
              />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default Products;
