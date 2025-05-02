
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube,MessageCircleDashed, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-[#706D54] text-white py-6">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-base font-bold mb-2">Lensyz</h3>
            <p className="text-[#DBDBDB] mb-2 text-xs">
              Premium eyewear for every style and prescription.
            </p>
            <div className="flex space-x-2">
              <motion.a 
                href="#" 
                className="text-white hover:text-[#C9B194] transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Facebook size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-white hover:text-[#C9B194] transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Instagram size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-white hover:text-[#C9B194] transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Twitter size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-white hover:text-[#C9B194] transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <MessageCircleDashed size={16} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-base font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link to="/" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Customer Service */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="#" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> Prescription Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-[#DBDBDB] hover:text-white transition-colors flex items-center">
                  <span className="mr-1">→</span> Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-base font-bold mb-2">Contact Us</h3>
            <address className="not-italic text-[#DBDBDB] space-y-1 text-xs">
              <p className="flex items-center">
                <MapPin size={14} className="mr-1 text-[#C9B194]" />
                123 Vision Street, Eyewear City
              </p>
              <p className="flex items-center">
                <Mail size={14} className="mr-1 text-[#C9B194]" />
                support@lensyz.com
              </p>
              <p className="flex items-center">
                <Phone size={14} className="mr-1 text-[#C9B194]" />
                (123) 456-7890
              </p>
            </address>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-[#A08963]/30 mt-4 pt-3 text-center text-[#DBDBDB] text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {new Date().getFullYear()} Lensyz. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
