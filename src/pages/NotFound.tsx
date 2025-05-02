
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from "framer-motion";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <motion.div 
        className="flex-grow container mx-auto px-4 py-20 text-center flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto relative">
          {/* Decorative background elements */}
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div 
            className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-secondary/10 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          
          <div className="relative z-10 bg-background/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-secondary">
            <motion.div 
              className="text-primary text-9xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 10, 
                delay: 0.2 
              }}
            >
              404
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-accent"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Page Not Found
              </motion.h2>
              
              <motion.p 
                className="text-lg text-accent/80 max-w-lg mx-auto"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                Oops! It seems you've ventured into uncharted territory. The page you're looking for might have been moved, deleted, or never existed in the first place.
              </motion.p>
              
              <motion.div 
                className="pt-6 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="group gap-2"
                  asChild
                >
                  <Link to="/">
                    <Home className="transition-transform group-hover:rotate-12" />
                    Back to Home
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="group gap-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
                  Go Back
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="group gap-2"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="transition-transform group-hover:rotate-90" />
                  Refresh
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated decorative elements */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 -left-16 w-16 h-16 rounded-full bg-primary/30"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-20 -right-12 w-10 h-10 rounded-full bg-secondary/50"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-10 right-20 w-8 h-8 rounded-full bg-muted"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
