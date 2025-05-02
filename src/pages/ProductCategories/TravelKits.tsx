
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from "@/components/ui/button";

const TravelKits = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  const navigate = useNavigate();

  const products = [
    {
      id: "1",
      name: "Premium Travel Lens Kit",
      description: "Complete kit with everything you need for lens care on the go",
      price: 89.99,
      rating: 4.9,
      includes: ["Compact Case", "Solution Bottle", "Mirror", "Tweezers", "Applicator"],
      imageUrl: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
    },
    {
      id: "2",
      name: "Weekender Lens Case",
      description: "Stylish and protective case for weekend getaways",
      price: 49.99,
      rating: 4.6,
      includes: ["Protective Case", "Solution Compartment", "Mirror"],
      imageUrl: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
    },
    {
      id: "3",
      name: "Flight-Ready Lens Kit",
      description: "TSA-compliant kit perfect for air travel",
      price: 69.99,
      rating: 4.8,
      includes: ["TSA Bottles", "Waterproof Case", "Quick-Dry Towel", "Lens Case"],
      imageUrl: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
    },
    {
      id: "4",
      name: "Adventure Lens Protection Kit",
      description: "Rugged, waterproof kit for outdoor adventures",
      price: 79.99,
      rating: 4.7,
      includes: ["Waterproof Case", "Cleaning Solution", "Microfiber Cloth", "Spare Case"],
      imageUrl: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
    },
    {
      id: "5",
      name: "Mini Emergency Kit",
      description: "Ultra-compact kit for your purse or pocket",
      price: 34.99,
      rating: 4.5,
      includes: ["Tiny Case", "Solution Vial", "Emergency Spare Lenses"],
      imageUrl: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
    },
    {
      id: "6",
      name: "Luxury Travel Lens Set",
      description: "Premium leather case with comprehensive lens care tools",
      price: 129.99,
      rating: 4.9,
      includes: ["Leather Case", "Glass Solution Bottle", "Professional Tools", "Microfiber Cloth"],
      imageUrl: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
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
        className="bg-cover bg-center h-[300px] flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/public/lovable-uploads/f8dad3d4-214c-471a-bdea-3959d13b1743.png)`,
          backgroundPosition: 'center 30%'
        }}
      >
        
      </motion.div>
      
      <div className="container mx-auto px-4 py-12">
      <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">Travel Kits</h1>
          <p className="text-[#706D54] text-lg md:text-xl max-w-2xl fw-semibold mx-auto">
            Keep your lenses safe and clean wherever you go with our specialized travel solutions
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={cardVariants}
              className="product-card-hover"
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
          className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/20 p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <motion.div 
                className="w-16 h-16 bg-theme-primary text-white rounded-full mx-auto flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34"></path><path d="M3 15h8"></path><path d="M16 8l2-2 4 4-2 2"></path><path d="M17 13l-2 2-4-4 2-2"></path></svg>
              </motion.div>
              <h3 className="font-semibold text-[#706D54] mb-2">TSA Compliant</h3>
              <p className="text-gray-600">All our travel kits meet TSA requirements for carry-on luggage</p>
            </div>
            
            <div className="text-center ">
              <motion.div 
                className="w-16 h-16 bg-theme-primary text-white rounded-full mx-auto flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </motion.div>
              <h3 className="font-semibold text-[#706D54] mb-2">Premium Quality</h3>
              <p className="text-gray-600">Durable materials designed to protect your lenses in any environment</p>
            </div>
            
            <div className="text-center p-4">
              <motion.div 
                className="w-16 h-16 bg-theme-primary text-white rounded-full mx-auto flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
              </motion.div>
              <h3 className="font-semibold text-[#706D54]  mb-2">Stylish Design</h3>
              <p className="text-gray-600">Sleek, modern aesthetics that complement your travel accessories</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TravelKits;
