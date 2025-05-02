
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';

// Sample product data
const initialWishlistItems = [
  {
    id: '1',
    name: 'Crystal Blue Contact Lenses',
    price: 49.99,
    imageUrl: '/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Emerald Green Lenses',
    price: 59.99,
    imageUrl: '/lovable-uploads/f8dad3d4-214c-471a-bdea-3959d13b1743.png',
    rating: 5,
  },
  {
    id: '3',
    name: 'Hazel Brown Lenses',
    price: 44.99,
    imageUrl: '/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png',
    rating: 4,
  },
  {
    id: '4',
    name: 'Honey Amber Lenses',
    price: 54.99,
    imageUrl: '/lovable-uploads/6c27d112-8b53-4476-8975-d60811e25c46.png',
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Travel Solution Kit',
    price: 29.99,
    imageUrl: '/lovable-uploads/3a97c9b9-0f8c-496b-9c5a-30825a795c3a.png',
    rating: 4.5,
  },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const { toast } = useToast();

  const removeFromWishlist = (id: string) => {
    const itemToRemove = wishlistItems.find(item => item.id === id);
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast({
        title: "Removed from wishlist",
        description: `${itemToRemove.name} has been removed from your wishlist`,
      });
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const addAllToCart = () => {
    toast({
      title: "Added all to cart",
      description: `${wishlistItems.length} items have been added to your cart`,
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="h-32 bg-secondary/20"></div>
      
      <motion.div 
        className="flex-grow -mt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-1">
          <motion.div 
            className="bg-background rounded-xl shadow-xl p-8 mb-10 border border-secondary/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <motion.h1 
                  className="text-3xl md:text-4xl font-bold text-accent mb-2 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Heart className="inline-block mr-3 text-theme-primary" /> 
                  <span className="bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent">
                    My Wishlist
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-accent/80"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                </motion.p>
              </div>
              
              <motion.div 
                className="flex gap-4 mt-4 md:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {wishlistItems.length > 0 && (
                  <>
                    <Button 
                      variant="default" 
                      onClick={addAllToCart}
                      className="gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add All to Cart
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={clearWishlist}
                      className="gap-2"
                    >
                      <Trash2 size={16} />
                      Clear Wishlist
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
          
          {wishlistItems.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-background rounded-xl shadow-md border border-secondary/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block p-6 bg-secondary/10 rounded-full mb-4"
              >
                <Heart className="w-20 h-20 text-theme-primary/30" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-accent mb-4">Your wishlist is empty</h2>
              <p className="text-accent/80 mb-8 max-w-md mx-auto">Explore our collection and add your favorite products to your wishlist</p>
              <Button variant="default" asChild>
                <a href="/products">Shop Now</a>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-background rounded-xl shadow-md overflow-hidden border border-secondary/20 hover:shadow-xl transition-shadow duration-300"
                >
                  <ProductCard 
                    {...item} 
                    isWishlisted={true} 
                    onWishlistToggle={removeFromWishlist} 
                  />
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Premium Feature Callouts */}
          {wishlistItems.length > 0 && (
            <motion.div 
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-secondary/20 to-background rounded-xl p-6 shadow-md border border-secondary/20">
                <div className="bg-theme-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="text-theme-primary" />
                </div>
                <h3 className="text-lg font-semibold text-accent mb-2">Save for Later</h3>
                <p className="text-accent/70">Keep track of products you love and come back to them anytime.</p>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/20 to-background rounded-xl p-6 shadow-md border border-secondary/20">
                <div className="bg-theme-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <ShoppingCart className="text-theme-primary" />
                </div>
                <h3 className="text-lg font-semibold text-accent mb-2">Easy Shopping</h3>
                <p className="text-accent/70">Quickly add items to your cart from your carefully curated wishlist.</p>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/20 to-background rounded-xl p-6 shadow-md border border-secondary/20">
                <div className="bg-theme-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-primary">
                    <path d="M12 8a2 2 0 0 0-2 2v4a2 2 0 0 0 4 0v-4a2 2 0 0 0-2-2Z"></path>
                    <path d="M18.4 10a6.5 6.5 0 0 0-12.8 0"></path>
                    <path d="M8.5 14a6.5 6.5 0 0 0 11 0"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-accent mb-2">Price Alerts</h3>
                <p className="text-accent/70">Get notified when items in your wishlist go on sale or drop in price.</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
