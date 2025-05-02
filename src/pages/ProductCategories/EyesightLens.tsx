
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const EyesightLens = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const products = [
    {
      id: "1",
      name: "Ultra Clear Vision Lenses",
      description: "Premium clarity lenses for nearsightedness with UV protection",
      price: 149.99,
      rating: 4.8,
      features: ["UV Protection", "Anti-Blue Light", "Scratch Resistant"],
      imageUrl: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
    },
    {
      id: "2",
      name: "Focus Pro Multifocal Lenses",
      description: "Advanced multifocal lenses for comprehensive vision correction",
      price: 189.99,
      rating: 4.7,
      features: ["Progressive Focus", "Anti-Glare", "Impact Resistant"],
      imageUrl: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
    },
    {
      id: "3",
      name: "Lite Comfort Astigmatism Lenses",
      description: "Specialized lenses designed for astigmatism with all-day comfort",
      price: 159.99,
      rating: 4.6,
      features: ["Anti-Blur Technology", "Moisture Lock", "High Oxygen Flow"],
      imageUrl: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
    },
    {
      id: "4",
      name: "Overnight Vision Correction",
      description: "Revolutionary overnight lenses that reshape your cornea while you sleep",
      price: 249.99,
      rating: 4.9,
      features: ["Wear While Sleeping", "Reshapes Cornea", "No Daytime Lenses"],
      imageUrl: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
    },
    {
      id: "5",
      name: "HydroMax Daily Lenses",
      description: "Ultra-hydrating daily lenses for dry-eye sufferers",
      price: 129.99,
      rating: 4.5,
      features: ["Maximum Hydration", "All-Day Comfort", "Suitable for Dry Eyes"],
      imageUrl: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
    },
    {
      id: "6",
      name: "Digital Worker Lenses",
      description: "Specially designed for digital screen users to reduce eye strain",
      price: 169.99,
      rating: 4.7,
      features: ["Blue Light Filter", "Reduces Eye Strain", "Anti-Fatigue"],
      imageUrl: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
    }
  ];

  const handleWishlistToggle = (id: string) => {
    setWishlistedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id) 
        : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-muted/30">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-cover bg-center h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/public/lovable-uploads/6c27d112-8b53-4476-8975-d60811e25c46.png)`,
          backgroundPosition: 'center 30%'
        }}
      >
        
      </motion.div>
      
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary mb-2 md:mb-4">Eyesight Lenses</h1>
          <p className="text-[#706D54] text-xs sm:text-sm fw-semibold md:text-lg lg:text-xl max-w-xs sm:max-w-xl md:max-w-4xl mx-auto px-3 sm:px-0">
            Advanced vision correction technology designed for crystal clear vision and ultimate comfort
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={cardVariants}
              className="h-full"
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                isWishlisted={wishlistedProducts.includes(product.id)}
                onWishlistToggle={handleWishlistToggle}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-secondary/30 p-4 sm:p-5 md:p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-accent mb-2 sm:mb-3 md:mb-4">Personalized Fitting</h2>
            <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
              Our optometrists provide personalized fitting services to ensure your lenses are perfectly suited to your eyes and lifestyle needs.
            </p>
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-xs sm:text-sm md:text-base">Book a Fitting</Button>
          </div>
          
          <div className="bg-secondary/30 p-4 sm:p-5 md:p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-accent mb-2 sm:mb-3 md:mb-4">Prescription Renewal</h2>
            <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
              Need to update your prescription? Our specialists can help you with a comprehensive eye examination.
            </p>
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-xs sm:text-sm md:text-base">Schedule Exam</Button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EyesightLens;
