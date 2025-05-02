
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-cover bg-center h-[350px] flex items-center" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/public/lovable-uploads/fea27007-7451-4d78-9624-77796c6f6ce2.png")' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Lensyz</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Crafting premium eyewear for every style and vision need since 2010
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Lensyz was founded in 2010 with a simple mission: to make high-quality eyewear accessible to everyone. Our founder, Dr. Elizabeth Chen, an optometrist with over 20 years of experience, was frustrated by the limited options and high prices her patients faced when purchasing glasses and contact lenses.
            </p>
            <p className="text-gray-700 mb-6">
              She envisioned a company that would combine premium materials, cutting-edge lens technology, and stylish designs - all at prices that wouldn't break the bank. Starting with just five frame styles and a small online store, Lensyz has grown into a leading eyewear brand with thousands of satisfied customers across the country.
            </p>
            <p className="text-gray-700">
              Today, we continue to uphold our founding principles, focusing on quality, style, and customer satisfaction. Every pair of glasses and contact lenses we sell is backed by our commitment to helping you see the world more clearly and look great doing it.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Mission & Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-700">
                We never compromise on the quality of our products. From the materials we source to the craftsmanship that goes into each pair of frames, excellence is our standard.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Affordability</h3>
              <p className="text-gray-700">
                We believe everyone deserves access to quality eyewear without paying a premium. Our direct-to-consumer model allows us to offer exceptional value without sacrificing quality.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
              <p className="text-gray-700">
                Your happiness is our priority. From our easy-to-use website to our responsive customer service team, we're committed to providing an exceptional experience from browse to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                {/* Team member photo would go here */}
              </div>
              <h3 className="text-xl font-semibold">Dr. Elizabeth Chen</h3>
              <p className="text-primary">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                {/* Team member photo would go here */}
              </div>
              <h3 className="text-xl font-semibold">Michael Rodriguez</h3>
              <p className="text-primary">Head of Design</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                {/* Team member photo would go here */}
              </div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-primary">Chief Optical Officer</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                {/* Team member photo would go here */}
              </div>
              <h3 className="text-xl font-semibold">David Kim</h3>
              <p className="text-primary">Customer Experience Director</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Design with Purpose</h3>
                <p className="text-gray-700">
                  Our design team works tirelessly to create frames that are not only stylish but also comfortable and durable. Each design goes through multiple iterations and testing phases to ensure it meets our high standards.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Source Quality Materials</h3>
                <p className="text-gray-700">
                  We partner with responsible suppliers who share our commitment to quality. From premium acetate to lightweight titanium, we select materials that will look great and stand the test of time.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Precision Manufacturing</h3>
                <p className="text-gray-700">
                  Our eyewear is crafted with meticulous attention to detail. Expert technicians and modern equipment ensure that every pair meets precise specifications for fit, finish, and durability.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">Rigorous Quality Control</h3>
                <p className="text-gray-700">
                  Before any product reaches you, it undergoes comprehensive quality checks. We test for frame durability, lens clarity, and overall performance to ensure you receive nothing but the best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
