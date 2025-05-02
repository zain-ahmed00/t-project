import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Animation variants
  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3,
      }
    })
  };
  
  const logoVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-premium  ${
        scrolled 
          ? 'bg-background/50 backdrop-blur-md shadow-xl shadow-primary/10 py-1.5' 
          : 'bg-background shadow-md py--2'
      }`} 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-theme-primary text-2xl font-bold">
            <motion.div 
              variants={logoVariants} 
              initial="initial" 
              whileHover="hover" 
              className="flex items-center"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="mr-2">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
              <span className="bg-gradient-to-r text-theme-primary to-theme-primary/80 bg-clip-text text-transparent">
                Lensyz
              </span>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <motion.div custom={0} initial="hidden" animate="visible" variants={navItemVariants}>
                    <Link to="/" className={`px-4 py-2 font-medium transition-colors relative ${location.pathname === '/' ? 'text-theme-primary' : 'text-foreground hover:text-theme-primary'} before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-theme-primary before:scale-x-0 before:origin-left before:transition-transform hover:before:scale-x-100 ${location.pathname === '/' ? 'before:scale-x-100' : ''}`}>
                      Home
                    </Link>
                  </motion.div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <motion.div custom={1} initial="hidden" animate="visible" variants={navItemVariants}>
                    <NavigationMenuTrigger className={`px-4 py-2 font-medium transition-colors relative ${location.pathname.includes('/product') ? 'text-theme-primary' : 'text-foreground hover:text-theme-primary'} before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-theme-primary before:scale-x-0 before:origin-left before:transition-transform hover:before:scale-x-100 ${location.pathname.includes('/product') ? 'before:scale-x-100' : ''}`}>
                      Products
                    </NavigationMenuTrigger>
                  </motion.div>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-md p-4 rounded-md shadow-lg w-64 border border-secondary">
                    <motion.ul className="space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
                      <li>
                        <Link to="/products" className="block p-2 hover:bg-secondary/20 rounded-md transition-colors">
                          All Products
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/colour-lenses" className="block p-2 hover:bg-secondary/20 rounded-md transition-colors">
                          Colour Lenses
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/eyesight-lens" className="block p-2 hover:bg-secondary/20 rounded-md transition-colors">
                          Eyesight Lens
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/travel-kits" className="block p-2 hover:bg-secondary/20 rounded-md transition-colors">
                          Travel Kits
                        </Link>
                      </li>
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <motion.div custom={2} initial="hidden" animate="visible" variants={navItemVariants}>
                    <Link to="/about" className={`px-4 py-2 font-medium transition-colors relative ${location.pathname === '/about' ? 'text-theme-primary' : 'text-foreground hover:text-theme-primary'} before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-theme-primary before:scale-x-0 before:origin-left before:transition-transform hover:before:scale-x-100 ${location.pathname === '/about' ? 'before:scale-x-100' : ''}`}>
                      About Us
                    </Link>
                  </motion.div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <motion.div custom={3} initial="hidden" animate="visible" variants={navItemVariants}>
                    <Link to="/contact" className={`px-4 py-2 font-medium transition-colors relative ${location.pathname === '/contact' ? 'text-theme-primary' : 'text-foreground hover:text-theme-primary'} before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-theme-primary before:scale-x-0 before:origin-left before:transition-transform hover:before:scale-x-100 ${location.pathname === '/contact' ? 'before:scale-x-100' : ''}`}>
                      Contact
                    </Link>
                  </motion.div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} custom={4} initial="hidden" animate="visible" variants={navItemVariants}>
              <Link to="/search" className="text-foreground hover:text-theme-primary transition-colors">
                <Search size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} custom={5} initial="hidden" animate="visible" variants={navItemVariants} className="relative">
              <Link to="/wishlist" className="text-foreground hover:text-theme-primary transition-colors">
                <Heart size={20} />
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 10, delay: 0.5 }} className="absolute -top-2 -right-2 bg-theme-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center theme-icon-badge">
                  5
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} custom={7} initial="hidden" animate="visible" variants={navItemVariants}>
              <Link to="/cart" className="text-foreground hover:text-theme-primary transition-colors relative">
                <ShoppingCart size={20} />
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 10, delay: 0.6 }} className="absolute -top-2 -right-2 bg-theme-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center theme-icon-badge">
                  2
                </motion.span>
              </Link>
            </motion.div>
          </div>
          
          <motion.button className="md:hidden text-foreground focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu" whileTap={{ scale: 0.9 }}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="md:hidden mt-4" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex flex-col space-y-2 bg-background/90 backdrop-blur-md rounded-lg p-4 shadow-lg border border-secondary">
                <Link to="/" className={`px-4 py-2 rounded-md ${location.pathname === '/' ? 'bg-theme-primary text-white' : 'text-foreground hover:bg-secondary/20'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <div className="px-4 py-2">
                  <div className="flex justify-between items-center">
                    <span className={`${location.pathname.includes('/product') ? 'text-theme-primary font-medium' : 'text-foreground'}`}>Products</span>
                    <button className="text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <motion.div className="mt-2 pl-4 flex flex-col space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    <Link to="/products" className="text-foreground hover:text-theme-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      All Products
                    </Link>
                    <Link to="/products/colour-lenses" className="text-foreground hover:text-theme-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      Colour Lenses
                    </Link>
                    <Link to="/products/eyesight-lens" className="text-foreground hover:text-theme-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      Eyesight Lens
                    </Link>
                    <Link to="/products/travel-kits" className="text-foreground hover:text-theme-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      Travel Kits
                    </Link>
                  </motion.div>
                </div>
                <Link to="/about" className={`px-4 py-2 rounded-md ${location.pathname === '/about' ? 'bg-theme-primary text-white' : 'text-foreground hover:bg-secondary/20'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  About Us
                </Link>
                <Link to="/contact" className={`px-4 py-2 rounded-md ${location.pathname === '/contact' ? 'bg-theme-primary text-white' : 'text-foreground hover:bg-secondary/20'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
                <div className="border-t border-secondary pt-2 mt-2">
                  <Link to="/wishlist" className="px-4 py-2 text-foreground hover:bg-secondary/20 rounded-md flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart size={16} className="mr-2 text-theme-primary" />
                    Wishlist (5)
                  </Link>
                  <Link to="/cart" className="px-4 py-2 text-foreground hover:bg-secondary/20 rounded-md flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart size={16} className="mr-2 text-theme-primary" />
                    Cart (2)
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
export default Navbar;
