
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  isWishlisted?: boolean;
}

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onWishlistToggle?: (id: string) => void;
}

const ProductCarousel = ({ 
  title, 
  subtitle, 
  products,
  onWishlistToggle 
}: ProductCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };
  
  const handleWishlistToggle = (id: string) => {
    setWishlistedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id) 
        : [...prev, id]
    );
    
    if (onWishlistToggle) {
      onWishlistToggle(id);
    }
  };
  
  return (
    <div className="py-12 relative">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-theme-accent mb-2 relative inline-block">
          {title}
          <motion.span 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-theme-primary rounded"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </h2>
        {subtitle && (
          <p className="text-theme-accent/70 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      
      <div className="relative">
        <motion.button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-theme-accent hover:text-theme-primary transition-colors border border-secondary/20"
          onClick={() => scroll('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <motion.button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-theme-accent hover:text-theme-primary transition-colors border border-secondary/20"
          onClick={() => scroll('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronRight size={24} />
        </motion.button>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 pb-4 px-6 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              className="min-w-[250px] sm:min-w-[280px] snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <ProductCard 
                {...product} 
                isWishlisted={wishlistedProducts.includes(product.id)}
                onWishlistToggle={handleWishlistToggle}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
