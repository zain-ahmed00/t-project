import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, Heart } from "lucide-react";
import ProductCard from '@/components/ProductCard';

const ColourLenses = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  const navigate = useNavigate();

  const products = [
    {
      id: "101",
      name: "Azure Blue Daily Lenses",
      description: "Natural-looking daily wear colored contacts for bright blue eyes",
      price: 29.99,
      rating: 4.5,
      colors: ["Blue", "Sapphire", "Aqua"],
      imageUrl: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
    },
    {
      id: "102",
      name: "Emerald Green Monthly Lenses",
      description: "Long-lasting monthly wear lenses for stunning green eyes",
      price: 34.99,
      rating: 4.2,
      colors: ["Green", "Emerald", "Forest"],
      imageUrl: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
    },
    {
      id: "103",
      name: "Honey Brown Comfort Lenses",
      description: "Ultra-comfortable brown tinted lenses for a natural look",
      price: 32.99,
      rating: 4.7,
      colors: ["Brown", "Honey", "Amber"],
      imageUrl: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
    },
    {
      id: "104",
      name: "Hazel Sparkle Lenses",
      description: "Vibrant hazel lenses with subtle sparkle effect",
      price: 39.99,
      rating: 4.8,
      colors: ["Hazel", "Gold", "Copper"],
      imageUrl: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
    },
    {
      id: "105",
      name: "Grey Mist Daily Lenses",
      description: "Subtle grey lenses for a mysterious look",
      price: 28.99,
      rating: 4.3,
      colors: ["Grey", "Slate", "Stone"],
      imageUrl: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
    },
    {
      id: "106",
      name: "Violet Dream Lenses",
      description: "Statement violet lenses for a unique look",
      price: 42.99,
      rating: 4.6,
      colors: ["Violet", "Purple", "Lavender"],
      imageUrl: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
    }
  ];

  const handleWishlistToggle = (id: string) => {
    setWishlistedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id) 
        : [...prev, id]
    );
    
    toast.success(`${products.find(p => p.id === id)?.name} ${wishlistedProducts.includes(id) ? 'removed from' : 'added to'} wishlist!`);
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/public/lovable-uploads/fea27007-7451-4d78-9624-77796c6f6ce2.png)`,
          backgroundPosition: 'center 30%'
        }}
      >
      
      </motion.div>
      
      <div className="container mx-auto px-4 py-12">
      <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">Colour Lenses</h1>
          <p className="text-[#706D54] text-lg md:text-xl max-w-4xl mx-auto fw-semibold">
            Enhance your natural beauty with our premium color contact lenses for every style and occasion
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
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
          className="mt-16 bg-secondary/30 p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-accent mb-4">Care Instructions</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Always wash hands thoroughly before handling lenses</li>
            <li>Use only approved contact lens solution for cleaning and storage</li>
            <li>Never sleep with your color lenses in</li>
            <li>Replace lenses according to the recommended schedule</li>
            <li>Store lenses in a clean case and replace case every three months</li>
          </ul>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ColourLenses;
