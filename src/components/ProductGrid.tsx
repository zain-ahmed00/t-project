import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Star } from 'lucide-react';



interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
  wishlistedProducts: string[];
  searchQuery?: string; // Made optional
  onViewAllProducts?: () => void; // Made optional
  onWishlistToggle: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  searchQuery, 
  wishlistedProducts, 
  onWishlistToggle,
  onViewAllProducts
}) => {
  const isMobile = useIsMobile();

  if (products.length === 0) {
    return (
      <motion.div 
        className="text-center py-6 sm:py-16 bg-secondary/10 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg sm:text-2xl font-bold text-accent mb-2">No Results Found</h2>
        <p className="text-accent/70 mb-4 sm:mb-6 max-w-md mx-auto px-3 sm:px-4 text-sm sm:text-base">
          {searchQuery ? `We couldn't find any products matching "${searchQuery}".` : 'No products found.'}
          Try using different keywords or browse our catalog.
        </p>
        {onViewAllProducts && (
          <Button onClick={onViewAllProducts} size={isMobile ? "sm" : "default"}>
            View All Products
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-secondary/20 mb-3 sm:mb-6">
        <div className="flex flex-wrap justify-between items-center p-2 sm:p-3 md:p-4">
          <p className="text-accent/70 text-xs sm:text-sm md:text-base mb-2 md:mb-0 w-full md:w-auto">
            <span className="font-semibold text-theme-accent">{products.length}</span> products found
            {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
          </p>
          {onViewAllProducts && (
            <Button 
              variant="outline" 
              onClick={onViewAllProducts} 
              size={isMobile ? "sm" : "default"} 
              className="w-full md:w-auto text-xs sm:text-sm"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5 lg:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ProductCard
              {...product}
              isWishlisted={wishlistedProducts.includes(product.id)}
              onWishlistToggle={onWishlistToggle}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;