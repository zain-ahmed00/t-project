import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';

// Mock product data for the frontend demo
const productData = {
  1: {
    id: 1,
    name: "Classic Wayfarer",
    price: 129.99,
    rating: 4.5,
    reviewCount: 24,
    description: "The Classic Wayfarer is our modern take on the iconic eyewear style that has defined generations. These versatile frames feature premium acetate construction, comfortable nose pads, and spring hinges for a perfect fit.",
    features: [
      "Premium acetate frames",
      "Durable spring hinges",
      "Comfortable nose pads",
      "100% UV protection (for sunglasses)",
      "Available with prescription lenses",
      "Anti-reflective coating option",
      "Blue light filtering option"
    ],
    specs: {
      "Frame Material": "Acetate",
      "Frame Width": "138mm (Medium)",
      "Lens Width": "50mm",
      "Bridge Width": "18mm",
      "Temple Length": "145mm",
      "Weight": "28g",
      "Lens Material": "Polycarbonate (Standard)",
      "Hinge Type": "Spring Hinge"
    },
    colors: ["Black", "Tortoise", "Navy Blue", "Burgundy"],
    sizes: ["S", "M", "L"],
    images: [
      "/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png",
      "/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png",
      "/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"
    ],
    relatedProducts: [2, 3, 4]
  },
  2: {
    id: 2,
    name: "Aviator Sunglasses",
    price: 149.99,
    rating: 5,
    reviewCount: 18,
    description: "Classic aviator design with modern touches for improved comfort and durability.",
    images: ["/public/lovable-uploads/5dc838c5-d739-47cf-844e-5919a7f55070.png"]
  },
  3: {
    id: 3,
    name: "Round Eyeglasses",
    price: 119.99,
    rating: 4,
    reviewCount: 12,
    description: "Vintage-inspired round frames that add character to any face shape.",
    images: ["/public/lovable-uploads/7fca9bc4-c1db-45ba-9247-77a15dbe8b1d.png"]
  },
  4: {
    id: 4,
    name: "Monthly Contact Lenses",
    price: 49.99,
    rating: 4.5,
    reviewCount: 36,
    description: "Premium monthly replacement contact lenses for comfortable all-day wear.",
    images: ["/public/lovable-uploads/f35bc998-9649-48f8-b0c4-75b86c3cb69e.png"]
  }
};

// Mock reviews
const reviews = [
  {
    id: 1,
    name: "John D.",
    date: "May 15, 2023",
    rating: 5,
    comment: "These glasses are exactly what I was looking for. The fit is perfect and the quality is exceptional. I've received many compliments on them already!"
  },
  {
    id: 2,
    name: "Ashley M.",
    date: "April 3, 2023",
    rating: 4,
    comment: "For the price, these are excellent quality frames. The prescription is accurate and the anti-reflective coating works well. Would have given 5 stars but they took longer than expected to arrive."
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id || "1");
  const product = productData[productId] || productData[1];
  const isMobile = useIsMobile();
  
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : "Black");
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[1] : "M");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const addToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };

  const addToWishlist = () => {
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Product Detail Section - More compact for mobile */}
      <section className="py-3 sm:py-12">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Product Content (Image gallery and details) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 mb-4 sm:mb-12">
            {/* Product Images - Smaller on mobile */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-2 sm:mb-4">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-[200px] sm:h-[400px] object-contain p-2 sm:p-4"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-1 sm:gap-4">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer border-2 ${image === mainImage ? 'border-[706D54]' : 'border-transparent'}`}
                    onClick={() => setMainImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-12 sm:h-24 object-contain p-1 sm:p-2"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info - More compact on mobile */}
            <div>
              <h1 className="text-lg sm:text-3xl font-bold mb-1 sm:mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-1 sm:mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && '½'}
                  {'☆'.repeat(5 - Math.ceil(product.rating))}
                </div>
                <span className="text-gray-500 text-xs sm:text-sm">({product.reviewCount} reviews)</span>
              </div>
              
              <p className="text-lg sm:text-2xl font-bold text-theme-primary mb-2 sm:mb-6">${product.price.toFixed(2)}</p>
              
              {/* Shortened description on mobile */}
              <p className="text-xs sm:text-base text-gray-700 mb-2 sm:mb-6 line-clamp-2 sm:line-clamp-none">{product.description}</p>
              
              {/* Color Selection - More compact on mobile */}
              {product.colors && (
                <div className="mb-2 sm:mb-6">
                  <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-3">Color</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        type="button"
                        className={
                          `btn ${selectedColor === color ? 'bg-[#C9B194] btn-theme-primary text-white' : 'btn-outline-theme-primary text-theme-whitw'} btn-sm rounded-pill`
                        }
                        style={{ transition: 'transform 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection - More compact on mobile */}
              {product.sizes && (
                <div className="mb-2 sm:mb-6">
                  <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-3">Frame Size</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        type="button"
                        className={
                          `btn ${selectedSize === size ? 'bg-[#C9B194] btn-theme-primary text-white' : 'btn-outline-theme-primary text-theme-white'} btn-sm rounded-circle d-flex align-items-center justify-content-center position-relative`
                        }
                        style={{ width: '40px', height: '40px', transition: 'transform 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity - More compact on mobile */}
              <div className="mb-2 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    className="w-6 h-6 sm:w-10 sm:h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-8 sm:w-16 h-6 sm:h-10 border-t border-b border-gray-300 text-center text-xs sm:text-sm"
                  />
                  <button 
                    className="w-6 h-6 sm:w-10 sm:h-10 border border-gray-300 rounded-r-md flex items-center justify-center"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Buttons - More compact on mobile */}
              <div className="mb-2">
  {/* Mobile View: Stacked Buttons */}
  <div className="d-block d-sm-none">
    <button
      type="button"
      onClick={addToWishlist}
      className="btn bg-[#C9B194] text-white w-100 mb-2"
    >
      Add to Wishlist
    </button>
    <button
      type="button"
      onClick={addToCart}
      className="btn btn-theme-primary text-white w-100"
    >
      Add to Cart
    </button>
  </div>

  {/* Desktop View: Side-by-Side Buttons with Hover Effects */}
  <div className="d-none d-sm-flex gap-2">
  <button 
                  className=" hover:bg-[#C9B194] hover:text-white  transition-colors px-5 rounded-md  duration-300 text-xs sm:text-sm md:text-base"
                  onClick={addToCart}
                >
                  Add to Whishlist
                </button>
                <button 
                  className="flex-1 bg-[#A08963] hover:bg-[#C9B194] text-white  py-3 rounded-md transition-all duration-300
                  transform hover:-translate-y-1 hover:shadow-lg font-medium inline-block "
                  onClick={addToWishlist}
                >
                 Add to Cart 
                </button>
  </div>
</div>
            </div>
          </div>
          {/* Product Tabs - More compact for mobile */}
          <Tabs defaultValue="description" className="w-full mb-5 sm:mb-12">
            <TabsList className="w-full grid grid-cols-3 mb-2 sm:mb-8">
              <TabsTrigger value="description" className="text-xs py-1 sm:py-2">Details</TabsTrigger>
              <TabsTrigger value="specifications" className="text-xs py-1 sm:py-2">Specs</TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs py-1 sm:py-2">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="bg-white shadow-md rounded-lg p-2 sm:p-6">
              <h2 className="text-base sm:text-xl font-semibold mb-1 sm:mb-4">Details</h2>
              {/* Show shorter description on mobile */}
              <p className="text-xs sm:text-base mb-2 sm:mb-4">{isMobile ? product.description.substring(0, 120) + "..." : product.description}</p>
              
              {product.features && !isMobile && (
                <>
                  <h3 className="font-semibold mt-2 sm:mt-6 mb-1 sm:mb-3 text-xs sm:text-base">Key Features</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs sm:text-sm">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {/* On mobile, only show first 3 features */}
              {product.features && isMobile && (
                <>
                  <h3 className="font-semibold mt-1 mb-1 text-xs">Key Features</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs">
                    {product.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="specifications" className="bg-white shadow-md rounded-lg p-2 sm:p-6">
              <h2 className="text-base sm:text-xl font-semibold mb-1 sm:mb-4">Specifications</h2>
              
              {product.specs && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs sm:text-sm">
                    <tbody>
                      {/* On mobile, only show first 4 specs */}
                      {Object.entries(product.specs).slice(0, isMobile ? 4 : Object.entries(product.specs).length).map(([key, value]) => (
                        <tr key={key} className="border-b">
                          <td className="py-1 sm:py-3 font-medium">{key}</td>
                          <td className="py-1 sm:py-3">{value as React.ReactNode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="bg-white shadow-md rounded-lg p-2 sm:p-6">
              <div className="flex justify-between items-center mb-2 sm:mb-6">
                <h2 className="text-base sm:text-xl font-semibold">Reviews</h2>
                <button className="bg-primary text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-primary-dark transition-colors text-xs">
                  Write
                </button>
              </div>
              
              {reviews.length > 0 ? (
                <div className="space-y-2 sm:space-y-6">
                  {/* On mobile, only show first review */}
                  {reviews.slice(0, isMobile ? 1 : reviews.length).map(review => (
                    <div key={review.id} className="border-b pb-2 sm:pb-6">
                      <div className="flex justify-between mb-0.5 sm:mb-2">
                        <h3 className="font-semibold text-xs sm:text-base">{review.name}</h3>
                        <span className="text-gray-500 text-xs">{review.date}</span>
                      </div>
                      
                      <div className="flex text-yellow-400 mb-0.5 sm:mb-2 text-xs sm:text-sm">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                      
                      <p className="text-gray-700 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">{review.comment}</p>
                    </div>
                  ))}
                  {isMobile && reviews.length > 1 && (
                    <div className="text-center text-xs text-primary mt-1">
                      + {reviews.length - 1} more reviews
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">No reviews yet.</p>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Related Products - More compact on mobile */}
          <div>
            <h2 className="text-base sm:text-2xl font-bold mb-2 sm:mb-6">You May Also Like</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
              {product.relatedProducts && product.relatedProducts.slice(0, isMobile ? 2 : 4).map((relatedId: number) => {
                const relatedProduct = productData[relatedId];
                return (
                  <div key={relatedId} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]">
                    <Link to={`/product/${relatedId}`} className="block h-24 sm:h-48 overflow-hidden">
                      <img 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                    <div className="p-1 sm:p-4">
                      <Link to={`/product/${relatedId}`} className="block">
                        <h3 className="font-semibold text-xs sm:text-lg mb-0.5 sm:mb-2 truncate">{relatedProduct.name}</h3>
                      </Link>
                      <div className="text-theme-primary font-bold text-xs sm:text-base mb-0.5 sm:mb-2">${relatedProduct.price.toFixed(2)}</div>
                      <div className="flex text-yellow-400 mb-1 sm:mb-3 text-xs">
                        {'★'.repeat(Math.floor(relatedProduct.rating))}
                        {relatedProduct.rating % 1 !== 0 && '½'}
                        {'☆'.repeat(5 - Math.ceil(relatedProduct.rating))}
                      </div>
                      <button 
                        className="w-full bg-theme-primary text-white py-0.5 sm:py-2 rounded-md hover:bg-primary-dark transition-colors text-xs"
                        onClick={() => toast.success(`${relatedProduct.name} added to cart!`)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
