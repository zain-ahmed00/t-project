
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from "sonner";
import { ShoppingCart, Trash2, ArrowLeft, PlusCircle, MinusCircle, ArrowRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Sample cart data
const cartItems = [
  {
    id: 1,
    name: "Classic Wayfarer",
    price: 129.99,
    quantity: 1,
    color: "Black",
    size: "Medium",
    image: "/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
  },
  {
    id: 2,
    name: "Aviator Sunglasses",
    price: 149.99,
    quantity: 2,
    color: "Gold",
    size: "Large",
    image: "/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
  }
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item removed from cart!");
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared!");
  };
  
  const proceedToCheckout = () => {
    toast.success("Proceeding to checkout...");
    // Redirect to checkout page would happen here
  };
  
  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08; // Assuming 8% tax
  const total = subtotal + shipping + tax;

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
    <div className="min-h-screen flex flex-col bg-[#F5F3EE]">
      <Navbar />
      
      <motion.div 
        className="flex-grow pt-28 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-[#706D54] mb-2 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ShoppingCart className="inline-block text-[#A08963]" /> 
                <span className="bg-gradient-to-r from-[#A08963] to-[#706D54] bg-clip-text text-transparent">
                  Your Shopping Cart
                </span>
              </motion.h1>
              <motion.p 
                className="text-[#8A8778]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </motion.p>
            </div>
            
            {items.length > 0 && (
              <motion.button 
                onClick={clearCart}
                className="mt-4 md:mt-0 flex items-center text-[#8A8778] hover:text-[#A08963] transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Trash2 size={16} className="mr-1" />
                Clear Cart
              </motion.button>
            )}
          </motion.div>
        
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-6 mb-6 border border-[#D8CCBB]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold text-[#706D54] mb-6 border-b border-[#D8CCBB] pb-3">
                    Items in Your Cart
                  </h2>
                  
                  {/* Cart Item List */}
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row border-b border-[#D8CCBB] pb-6 last:border-0 last:pb-0"
                        custom={index}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="sm:w-28 h-28 bg-[#F5F3EE] rounded-xl overflow-hidden mb-4 sm:mb-0 sm:mr-6 border border-[#D8CCBB]">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row justify-between mb-2">
                            <h3 className="font-semibold text-[#4A4638] text-lg">{item.name}</h3>
                            <span className="font-semibold text-[#A08963]">${item.price.toFixed(2)}</span>
                          </div>
                          
                          <div className="text-sm text-[#8A8778] mb-4">
                            <p>Color: <span className="text-[#706D54]">{item.color}</span></p>
                            <p>Size: <span className="text-[#706D54]">{item.size}</span></p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0 border border-[#D8CCBB] rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#706D54] hover:bg-[#F5F3EE] transition-colors"
                              >
                                <MinusCircle size={18} />
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 h-10 text-center text-[#4A4638] bg-white focus:outline-none"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#706D54] hover:bg-[#F5F3EE] transition-colors"
                              >
                                <PlusCircle size={18} />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between sm:w-auto">
                              <span className="mr-4 font-medium text-[#A08963] text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 rounded-full hover:bg-[#F5F3EE] text-[#8A8778] hover:text-[#C9796A] transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <Link 
                      to="/products"
                      className="inline-flex items-center text-[#A08963] hover:text-[#8A7352] hover:underline transition-colors"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Continue Shopping
                    </Link>
                    
                    <Button variant="outline" asChild>
                      <Link to="/wishlist">
                        View Wishlist
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Shipping & Payment Info */}
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-6 mb-6 border border-[#D8CCBB]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold text-[#706D54] mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border border-[#D8CCBB] rounded-lg flex items-center gap-3 hover:bg-[#F5F3EE] transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full bg-[#F5F3EE] group-hover:bg-white transition-colors">
                        <Truck className="text-[#A08963]" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-[#4A4638]">Standard Shipping</p>
                        <p className="text-sm text-[#8A8778]">3-5 business days</p>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-[#D8CCBB] rounded-lg flex items-center gap-3 hover:bg-[#F5F3EE] transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full bg-[#F5F3EE] group-hover:bg-white transition-colors">
                        <Truck className="text-[#A08963]" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-[#4A4638]">Express Shipping</p>
                        <p className="text-sm text-[#8A8778]">1-2 business days</p>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-[#D8CCBB] rounded-lg flex items-center gap-3 hover:bg-[#F5F3EE] transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full bg-[#F5F3EE] group-hover:bg-white transition-colors">
                        <ShieldCheck className="text-[#A08963]" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-[#4A4638]">Free Returns</p>
                        <p className="text-sm text-[#8A8778]">Within 30 days</p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-[#706D54] mb-4">Payment Methods</h2>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="p-3 border border-[#D8CCBB] rounded-lg hover:bg-[#F5F3EE] transition-colors cursor-pointer">
                      <CreditCard className="text-[#706D54]" size={30} />
                    </div>
                    <div className="p-3 border border-[#D8CCBB] rounded-lg hover:bg-[#F5F3EE] transition-colors cursor-pointer">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 14H17.5" stroke="#706D54" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M6.5 10.4286H17.5" stroke="#706D54" strokeWidth="1.5" strokeLinecap="round"/>
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#706D54" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div className="p-3 border border-[#D8CCBB] rounded-lg hover:bg-[#F5F3EE] transition-colors cursor-pointer">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 9.01L14.01 8.99889" stroke="#706D54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 9.01L8.01 8.99889" stroke="#706D54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 13V16" stroke="#706D54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13V16" stroke="#706D54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="#706D54" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Order Summary */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-[#D8CCBB]">
                  <h2 className="text-xl font-semibold text-[#706D54] mb-6 pb-3 border-b border-[#D8CCBB]">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#8A8778]">Subtotal</span>
                      <span className="text-[#4A4638] font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8778]">Shipping</span>
                      <span className="text-[#4A4638] font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8778]">Tax</span>
                      <span className="text-[#4A4638] font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-[#D8CCBB]">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#4A4638]">Total</span>
                        <span className="text-[#A08963] text-xl">${total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-[#8A8778] mt-1">Taxes and shipping calculated at checkout</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <motion.button 
                      onClick={proceedToCheckout}
                      className="w-full bg-gradient-to-r from-[#A08963] to-[#706D54] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#A08963]/20 transition-all transform hover:-translate-y-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Proceed to Checkout
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#8A8778] text-sm">
                      <ShieldCheck size={16} className="text-[#7C9978]" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8A8778] text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C9978]">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                      </svg>
                      <span>Satisfaction Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8A8778] text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C9978]">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <span>Multiple Payment Options</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="text-center py-16 bg-white rounded-xl shadow-md border border-[#D8CCBB]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block p-6 bg-[#F5F3EE] rounded-full mb-4"
              >
                <ShoppingCart className="w-20 h-20 text-[#A08963]/30" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-[#706D54] mb-4">Your cart is empty</h2>
              <p className="text-[#8A8778] mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet.</p>
              <Button variant="elegant" asChild className="px-8 py-6 text-base">
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
            </motion.div>
          )}
          
          {/* Related Products Suggestion */}
          {items.length > 0 && (
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-[#706D54] mb-6 text-center">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Display suggested products here */}
                <div className="bg-white rounded-xl shadow-sm border border-[#D8CCBB] overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img src="/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#4A4638]">Crystal Blue Lenses</h3>
                    <p className="text-[#A08963] font-semibold mt-1">$49.99</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-[#D8CCBB] overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img src="/lovable-uploads/f8dad3d4-214c-471a-bdea-3959d13b1743.png" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#4A4638]">Emerald Green Lenses</h3>
                    <p className="text-[#A08963] font-semibold mt-1">$59.99</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-[#D8CCBB] overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img src="/lovable-uploads/6c27d112-8b53-4476-8975-d60811e25c46.png" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#4A4638]">Honey Amber Lenses</h3>
                    <p className="text-[#A08963] font-semibold mt-1">$54.99</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-[#D8CCBB] overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img src="/lovable-uploads/3a97c9b9-0f8c-496b-9c5a-30825a795c3a.png" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#4A4638]">Travel Solution Kit</h3>
                    <p className="text-[#A08963] font-semibold mt-1">$29.99</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Cart;
