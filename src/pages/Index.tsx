
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const Index = () => {
  return <div>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero bg-cover bg-center h-[85vh] flex items-center text-white mt-16" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/public/lovable-uploads/60dfeddd-5d31-4235-abe9-967dd804a3bd.png")'
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4">See the World Clearly</h1>
            <p className="text-xl mb-6">Discover premium eyewear for every style and prescription. Quality lenses, designer frames, and exceptional service.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="bg-[#A08963] hover:bg-[#C9B194] text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium inline-block">
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#A08963]"
          >
            Browse Categories
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative rounded-lg overflow-hidden shadow-lg h-64 group"
            >
              <img src="/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png" alt="Prescription Glasses" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-2">Colour Lenses</h3>
                <Link to="/products/colour-lenses" className="bg-[#A08963] hover:bg-[#C9B194] text-white px-4 py-2 rounded text-sm inline-block transition-all duration-300 hover:shadow-md">
                  View Collection
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative rounded-lg overflow-hidden shadow-lg h-64 group"
            >
              <img src="/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png" alt="Sunglasses" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-2">Eyesight Lenses</h3>
                <Link to="/products/eyesight-lens" className="bg-[#A08963] hover:bg-[#C9B194] text-white px-4 py-2 rounded text-sm inline-block transition-all duration-300 hover:shadow-md">
                  View Collection
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative rounded-lg overflow-hidden shadow-lg h-64 group"
            >
              <img src="/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png" alt="Contact Lenses" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-2">Travel Kits</h3>
                <Link to="/products/travel-kits" className="bg-[#A08963] hover:bg-[#C9B194] text-white px-4 py-2 rounded text-sm inline-block transition-all duration-300 hover:shadow-md">
                  View Collection
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Carousel */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#A08963]"
          >
            Featured Products
          </motion.h2>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <img src="/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png" alt="Classic Wayfarer" className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Classic Wayfarer</h3>
                    <div className="text-[#A08963] font-bold mb-2">$129.99</div>
                    <div className="text-yellow-400 mb-3">★★★★☆</div>
                    <button className="w-full bg-[#A08963] text-white py-2 rounded-md hover:bg-[#C9B194] transition-all duration-300 hover:shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <img src="/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png" alt="Aviator Sunglasses" className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Aviator Sunglasses</h3>
                    <div className="text-[#A08963] font-bold mb-2">$149.99</div>
                    <div className="text-yellow-400 mb-3">★★★★★</div>
                    <button className="w-full bg-[#A08963] text-white py-2 rounded-md hover:bg-[#C9B194] transition-all duration-300 hover:shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <img src="/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png" alt="Round Eyeglasses" className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Round Eyeglasses</h3>
                    <div className="text-[#A08963] font-bold mb-2">$119.99</div>
                    <div className="text-yellow-400 mb-3">★★★★☆</div>
                    <button className="w-full bg-[#A08963] text-white py-2 rounded-md hover:bg-[#C9B194] transition-all duration-300 hover:shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <img src="/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png" alt="Monthly Contact Lenses" className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Monthly Contact Lenses</h3>
                    <div className="text-[#A08963] font-bold mb-2">$49.99</div>
                    <div className="text-yellow-400 mb-3">★★★★☆</div>
                    <button className="w-full bg-[#A08963] text-white py-2 rounded-md hover:bg-[#C9B194] transition-all duration-300 hover:shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-48 overflow-hidden">
                    <img src="/public/lovable-uploads/6c27d112-8b53-4476-8975-d60811e25c46.png" alt="Designer Frames" className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Designer Frames</h3>
                    <div className="text-[#A08963] font-bold mb-2">$199.99</div>
                    <div className="text-yellow-400 mb-3">★★★★★</div>
                    <button className="w-full bg-[#A08963] text-white py-2 rounded-md hover:bg-[#C9B194] transition-all duration-300 hover:shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-[#A08963] hover:bg-[#C9B194] text-white border-none" />
            <CarouselNext className="right-0 md:-right-12 bg-[#A08963] hover:bg-[#C9B194] text-white border-none" />
          </Carousel>
          
          <div className="text-center mt-8">
            <Link to="/products" className="inline-flex items-center text-[#A08963] font-medium hover:underline">
              View All Products <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#A08963]"
          >
            Why Choose Lensyz
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#A08963]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#A08963]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted frames made from the highest quality materials for durability and comfort.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#A08963]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#A08963]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick processing and shipping to get your new eyewear to you within days.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#A08963]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#A08963]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options with secure checkout for your peace of mind.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-16 h-16 bg-[#A08963]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#A08963]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is always ready to assist with any questions or concerns.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#A08963]"
          >
            Customer Testimonials
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(160, 137, 99, 0.15)', transition: { duration: 0.3 } }}
            >
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"The quality of these glasses exceeded my expectations. The frames are sturdy yet lightweight, and the lenses are crystal clear. Incredible value for the price!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#C9B194] rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(160, 137, 99, 0.15)', transition: { duration: 0.3 } }}
            >
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"I was hesitant about buying glasses online, but the virtual try-on feature made it so easy! The glasses arrived quickly and fit perfectly. I'll definitely be ordering again."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#C9B194] rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Davis</h4>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(160, 137, 99, 0.15)', transition: { duration: 0.3 } }}
            >
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"The customer service team was incredibly helpful when I needed to adjust my prescription. They guided me through the process and ensured I got exactly what I needed. Fantastic experience!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#C9B194] rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Emma Wilson</h4>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-[#A08963] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6"
          >
            Join Our Newsletter
          </motion.h2>
          <p className="max-w-2xl mx-auto mb-8">Subscribe to receive updates on new arrivals, special offers, and exclusive discounts.</p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
          >
            <input type="email" placeholder="Enter your email address" className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="bg-[#706D54] hover:bg-[#706D54]/90 text-white px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;
