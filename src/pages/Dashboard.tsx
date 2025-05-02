
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock order data
const orderHistory = [
  {
    id: "ORD-2023-1234",
    date: "June 15, 2023",
    status: "Delivered",
    total: 279.98,
    items: [
      {
        id: 1,
        name: "Classic Wayfarer",
        price: 129.99,
        quantity: 1,
        image: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
      },
      {
        id: 2,
        name: "Aviator Sunglasses",
        price: 149.99,
        quantity: 1,
        image: "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"
      }
    ]
  },
  {
    id: "ORD-2023-0987",
    date: "May 22, 2023",
    status: "Delivered",
    total: 49.99,
    items: [
      {
        id: 4,
        name: "Monthly Contact Lenses",
        price: 49.99,
        quantity: 1,
        image: "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
      }
    ]
  }
];

// Mock wishlist data
const wishlistItems = [
  {
    id: 3,
    name: "Round Eyeglasses",
    price: 119.99,
    image: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
  },
  {
    id: 5,
    name: "Cat-Eye Frames",
    price: 139.99,
    image: "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"
  }
];

const Dashboard = () => {
  // User data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: {
      street: "123 Vision Street",
      city: "Eyewear City",
      state: "EC",
      zip: "12345",
      country: "United States"
    }
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  const addToCart = (item: any) => {
    toast.success(`${item.name} added to cart!`);
  };
  
  const removeFromWishlist = (id: number) => {
    toast.success("Item removed from wishlist!");
  };
  
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-gray-600 mb-4">{userData.email}</p>
              <p className="text-sm text-gray-500">Member since 2023</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary text-white p-4">
                <h3 className="font-semibold">Quick Links</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#orders" className="text-gray-700 hover:text-primary transition-colors">My Orders</a>
                  </li>
                  <li>
                    <a href="#wishlist" className="text-gray-700 hover:text-primary transition-colors">My Wishlist</a>
                  </li>
                  <li>
                    <a href="#profile" className="text-gray-700 hover:text-primary transition-colors">Edit Profile</a>
                  </li>
                  <li>
                    <a href="#password" className="text-gray-700 hover:text-primary transition-colors">Change Password</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-8">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="bg-white shadow-md rounded-lg p-6" id="orders">
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                
                {orderHistory.length > 0 ? (
                  <div className="space-y-8">
                    {orderHistory.map(order => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 border-b">
                          <div>
                            <div className="flex items-center mb-2 md:mb-0">
                              <h3 className="font-semibold mr-2">{order.id}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">Order Date: {order.date}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="font-semibold text-primary">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200 mr-4">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <div className="font-medium">${item.price.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <a href="#" className="text-primary hover:underline text-sm">View Order Details</a>
                          <button className="text-sm bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition-colors">
                            Track Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <a 
                      href="/products" 
                      className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded inline-block transition-colors"
                    >
                      Start Shopping
                    </a>
                  </div>
                )}
              </TabsContent>
              
              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="bg-white shadow-md rounded-lg p-6" id="wishlist">
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistItems.map(item => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                          <p className="text-primary font-medium mb-4">${item.price.toFixed(2)}</p>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => addToCart(item)}
                              className="flex-grow bg-primary hover:bg-primary-dark text-white py-2 rounded transition-colors"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You don't have any items in your wishlist.</p>
                    <a 
                      href="/products" 
                      className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded inline-block transition-colors"
                    >
                      Browse Products
                    </a>
                  </div>
                )}
              </TabsContent>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="bg-white shadow-md rounded-lg p-6" id="profile">
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-4">Address Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <label htmlFor="street" className="block text-gray-700 font-medium mb-2">Street Address</label>
                      <input 
                        type="text" 
                        id="street" 
                        value={userData.address.street}
                        onChange={(e) => setUserData({...userData, address: {...userData.address, street: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                      <input 
                        type="text" 
                        id="city" 
                        value={userData.address.city}
                        onChange={(e) => setUserData({...userData, address: {...userData.address, city: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State/Province</label>
                      <input 
                        type="text" 
                        id="state" 
                        value={userData.address.state}
                        onChange={(e) => setUserData({...userData, address: {...userData.address, state: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">ZIP/Postal Code</label>
                      <input 
                        type="text" 
                        id="zip" 
                        value={userData.address.zip}
                        onChange={(e) => setUserData({...userData, address: {...userData.address, zip: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
                      <input 
                        type="text" 
                        id="country" 
                        value={userData.address.country}
                        onChange={(e) => setUserData({...userData, address: {...userData.address, country: e.target.value}})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </TabsContent>
              
              {/* Password Tab */}
              <TabsContent value="password" className="bg-white shadow-md rounded-lg p-6" id="password">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-6 mb-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">Current Password</label>
                      <input 
                        type="password" 
                        id="currentPassword" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">New Password</label>
                      <input 
                        type="password" 
                        id="newPassword" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        minLength={6}
                      />
                      <p className="text-sm text-gray-500 mt-1">Password must be at least 6 characters</p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
