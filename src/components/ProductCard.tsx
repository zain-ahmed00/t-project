
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  isWishlisted = false,
  onWishlistToggle
}: ProductCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onWishlistToggle) {
      onWishlistToggle(id);
      
      toast({
        title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: isWishlisted ? `${name} has been removed from your wishlist` : `${name} has been added to your wishlist`,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  // Use promotional images for certain products
  const getProductImage = () => {
    if (id === "1" || id === "4") {
      return "/public/lovable-uploads/1ccdbf12-8fe8-41cd-a13d-6d78c44bbd31.png";
    } else if (id === "2" || id === "5") {
      return "/public/lovable-uploads/2f4ec6d4-08bd-4c2d-85e2-a6cc6fd680fe.png";
    }
    return imageUrl;
  };

  return (
    <motion.div
      className="premium-card product-card-hover w-full h-full cursor-pointer group"
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 z-10 p-1 sm:p-1.5 md:p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 hover:bg-background hover:scale-110"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 transition-colors ${isWishlisted ? 'fill-primary' : 'text-accent/70 hover:text-accent'}`} 
          />
        </button>
        
        <div className="h-32 sm:h-36 md:h-44 lg:h-56 overflow-hidden">
          <motion.img 
            src={getProductImage()} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-2.5 sm:p-3.5 md:p-4.5 flex flex-col bg-white rounded-b-lg">

        
        <h3 className="font-semibold text-accent text-xs sm:text-sm md:text-base truncate group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-1.5 sm:pt-2.5">
          <p className="text-accent font-bold text-xs sm:text-sm md:text-base">
            ${price.toFixed(2)}
          </p>
          
          <Button 
            variant="default" 
            size="sm"
            className="opacity-100 sm:opacity-90 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 text-[10px] sm:text-xs py-0.5 h-6 sm:h-8"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
